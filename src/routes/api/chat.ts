import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { saveLeadToDb } from "@/lib/leads.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `You are "Nexa", the friendly AI assistant for Glass Nexus Academy — a tech training centre in Ijebu-Ode, Ogun State, Nigeria.

Your job:
- Answer questions about courses, pricing, schedules, and the academy.
- Help visitors choose the right course track based on their goals.
- Collect enrolment leads using the save_lead tool when a visitor shows interest.
- Hand off to WhatsApp (+234 915 433 8312) or the contact page for human follow-up when useful.

Be warm, concise, and practical. Use short paragraphs and bullet points.

== COURSES (all ₦25,000 / course unless noted) ==
1. Python Programming — 12-week intensive. Beginner to OOP. Backend scripts & automation.
2. Web Development — HTML, CSS, JavaScript. Build responsive sites, hosting & domains.
3. Data Analysis — Advanced Excel + basic SQL. Cleaning, analysis, visualisation.
4. Hardware & Repairs — Diagnostics & repair for PCs, laptops, smartphones. 100% practical.
5. Microsoft Office — Word, Excel, PowerPoint, Outlook.
6. AI & Automation — Prompt engineering, AI tools integration, simple automation scripts.
7. Cybersecurity Basics — Network safety, threats, encryption, password hygiene.

== PRICING PLANS ==
- Basic ₦20,000/course: 1 course track, materials, certificate, weekend classes.
- Standard ₦35,000/course (Most Popular): adds 1-on-1 mentorship and project-based assessment.
- Premium ₦85,000/bundle: up to 3 tracks, priority mentorship, job placement support.

== CLASSES ==
- Both virtual (Zoom / Google Meet, live, recorded backups in 2h) and physical (Ijebu-Ode lab).
- Office hours: Mon–Sat 8am–5pm.
- Payment splitting available (e.g. 50% + 50%) via bank transfer or Paystack.

== LEAD CAPTURE RULES ==
- When a visitor wants to enrol, asks for prices/details about a specific course, or asks to be contacted, OFFER to take their details. Don't be pushy.
- Ask for: name (required), phone number, email, and the course they're interested in.
- Once they share at least name + phone OR email, call the save_lead tool.
- After saving, tell them an advisor will reach out within 2 hours and offer the WhatsApp link: https://wa.me/2349154338312

Keep responses under ~120 words unless a longer breakdown is needed.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const messages = body.messages as UIMessage[];

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
          stopWhen: stepCountIs(50),
          tools: {
            save_lead: tool({
              description:
                "Save a potential student's enquiry/lead so a human advisor can follow up. Call this when the visitor has shared at least their name plus phone or email.",
              inputSchema: z.object({
                name: z.string().min(1).max(120).describe("Visitor's full name"),
                phone: z.string().max(40).optional().describe("Phone or WhatsApp number"),
                email: z.string().email().max(200).optional().describe("Email address"),
                course_interest: z
                  .string()
                  .max(120)
                  .optional()
                  .describe("Course track they're interested in"),
                notes: z
                  .string()
                  .max(800)
                  .optional()
                  .describe("Short summary of what they want / goals"),
              }),
              execute: async (input) => {
                try {
                  const row = await saveLeadToDb(input);
                  return {
                    ok: true,
                    id: row?.id,
                    message: "Lead saved. An advisor will reach out shortly.",
                  };
                } catch (err) {
                  return {
                    ok: false,
                    message:
                      "Could not save the lead right now. Please use WhatsApp 09154338312 or the contact page.",
                  };
                }
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
