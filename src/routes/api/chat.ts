import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { saveLeadToDb } from "@/lib/leads.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `You are "Nexa", the friendly AI assistant for Glass Nexus Academy — a tech training centre in Ikorodu, Lagos, Nigeria. Contact: WhatsApp 09154338312 / 08102434954, email glassnexusacademy@gmail.com.

Your job:
- Answer questions about courses, pricing, schedules, tutors, and the academy.
- Help visitors choose the right course track based on their goals.
- Collect enrolment leads using the save_lead tool when a visitor shows interest.
- Hand off to WhatsApp (+234 915 433 8312) or the contact page for human follow-up when useful.

Be warm, concise, and practical. Use short paragraphs and bullet points.

== TECH COURSES (monthly fees) ==
- Python Programming (Basic) — ₦25,000/month, 2 classes/week (teaching + practical).
- Computer Operations (Microsoft Packages: Word, Excel, PowerPoint) — ₦25,000/month, 2 classes/week (teaching + practical).
- Web Design Frontend (HTML, CSS, React) — ₦25,000/month, 2 classes/week (teaching + practical).
- Web Design Backend (PHP) — ₦25,000/month, 2 classes/week (teaching + practical).
- Cyber Security — ₦30,000/month, 2 classes/week (teaching + practical).
- UI/UX Design & Video Editing — ₦25,000/month, 2 classes/week (teaching + practical).
- Data Analysis — ₦25,000/month, 2 classes/week (teaching + practical).
- Also available: Hardware Repair (ask for current schedule).

== O-LEVEL & JAMB ONLINE CLASSES (₦12,000/month each, online) ==
- WAEC, NECO, GCE and JAMB (UTME) preparation.
- Subjects covered: Mathematics, English, Further Mathematics, ICT and more.
- Available for SS1, SS2 and SS3 students. Held online via video call.
- We also help with educational advice and school subject registrations.

== FREELANCE & TECH SERVICES ==
- Website Development — Frontend only ₦40,000; Full stack (Frontend + Backend + Hosting) ₦70,000.
- App Development — from ₦50,000 (custom mobile/web apps).
- Dashboard Development — custom admin dashboards (quote-based).
- Database Design & Management — setup, management, optimisation (quote-based).
- Video Editing & Content Creation — YouTube/social content (quote-based).
- Payments accepted online via Flutterwave / Paystack.

== TUTORS ==
- Omolayo Paul Adeyemi — Founder & Lead Instructor. Tech educator, full-stack developer, AI integration specialist. TASUED Computer Science graduate. Teaches Maths, Further Maths, ICT, Web/App Dev, Databases (Snowflake), Data Analytics, Python.
- Amos (Amos Edits) — Professional content creator and digital editor. Video editing, social content, brand storytelling.
- Babatunde Segun (babsiedits) — UI/UX developer and Vibe Programmer. Figma, Tailwind, React, design systems.
- Loveeth — Digital marketing & content strategy specialist. SEO, Meta/Google Ads, email marketing, copywriting.
- More tutors joining soon.

== CLASSES ==
- Both virtual (Zoom / Google Meet, live, recorded backups within 2h) and physical (Ikorodu, Lagos lab).
- Office hours: Mon–Sat 8am–5pm.
- Payment splitting available via bank transfer, Flutterwave or Paystack.

== LEAD CAPTURE RULES ==
- When a visitor wants to enrol, asks for prices/details about a specific course or service, or asks to be contacted, OFFER to take their details. Don't be pushy.
- Ask for: name (required), phone number, email, and the course/service they're interested in.
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
                      "Could not save the lead right now. Please use WhatsApp 09154338312 / 08102434954 or email glassnexusacademy@gmail.com.",
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
