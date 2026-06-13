import { supabaseAdmin } from "@/integrations/supabase/client.server";

export async function saveLeadToDb(input: {
  name: string;
  phone?: string;
  email?: string;
  course_interest?: string;
  notes?: string;
}) {
  const { error, data } = await supabaseAdmin
    .from("leads")
    .insert({
      name: input.name,
      phone: input.phone ?? null,
      email: input.email ?? null,
      course_interest: input.course_interest ?? null,
      notes: input.notes ?? null,
      source: "ai_agent",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[leads] insert failed", error);
    throw new Error("Failed to save lead");
  }
  return data;
}
