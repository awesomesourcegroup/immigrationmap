import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { citizenship, path, budget, age, education, experience, languages, topCountry, topScore } = body;

  const { error } = await getSupabase().from("quiz_submissions").insert({
    citizenship,
    path,
    budget,
    age,
    education,
    experience,
    languages,
    top_country: topCountry,
    top_score: topScore,
  });

  if (error) {
    console.error("Supabase insert error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
