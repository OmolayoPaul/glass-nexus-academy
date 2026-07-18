import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { getCourse } from "@/lib/courseData";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type TutorRequestBody = { messages?: unknown; slug?: unknown };

function buildSystemPrompt(slug: string): string | null {
  const c = getCourse(slug);
  if (!c) return null;

  const curriculum = c.curriculum
    .map((w) => `- ${w.week}: ${w.topic} — ${w.details}`)
    .join("\n");
  const projects = c.projects.map((p) => `- ${p}`).join("\n");
  const careers = c.careers.map((r) => `- ${r.role}: ${r.salary}`).join("\n");
  const faqs = c.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  const objectives = c.objectives.map((o) => `- ${o}`).join("\n");

  return `You are "Nexa Tutor" — the dedicated AI teaching assistant for the ${c.name} course at Glass Nexus Academy.

Your job is to help the student understand this specific course. Answer questions using ONLY the course context below when possible. If asked something outside this course, gently redirect back to the course, or point them to WhatsApp 09154338312 for enrolment/admin questions.

Be warm, concise (short paragraphs, bullets when helpful), and encouraging. Explain concepts simply. When a student asks "what will I learn in week X" or "what projects", quote directly from the curriculum/projects below.

== COURSE: ${c.name} ==
Tagline: ${c.tagline}
Overview: ${c.overview}
Duration: ${c.duration}
Format: ${c.format}
Level: ${c.level}
Fee: ${c.price} (${c.installment})

== LEARNING OBJECTIVES ==
${objectives}

== WEEKLY CURRICULUM ==
${curriculum}

== PROJECTS YOU'LL BUILD ==
${projects}

== CAREER OPPORTUNITIES & SALARIES ==
${careers}

== CERTIFICATION ==
${c.certification}

== FAQ ==
${faqs}

Keep replies under ~150 words unless the student asks for a deeper explanation.`;
}

export const Route = createFileRoute("/api/tutor")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as TutorRequestBody;
        if (!Array.isArray(body.messages) || typeof body.slug !== "string") {
          return new Response("messages and slug are required", { status: 400 });
        }

        const system = buildSystemPrompt(body.slug);
        if (!system) return new Response("Unknown course", { status: 404 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const messages = body.messages as UIMessage[];

        const result = streamText({
          model,
          system,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
