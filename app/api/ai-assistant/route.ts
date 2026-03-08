import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

type Message = { role: "user" | "assistant"; content: string };

const CONTEXT_PROMPTS: Record<string, string> = {
  "new-proposal":
    "The user is filling out the New Proposal form with fields: Client Name, Your Name, Project Type, Project Scope, Timeline, and Budget Range. Help them write compelling scope descriptions, choose appropriate budgets, set realistic timelines, and craft proposals that win clients.",
  proposals:
    "The user is on their Proposals list page, viewing proposals with statuses: Pending (sent, not yet viewed), Viewed (client opened it), and Accepted (client accepted). Help them understand these statuses, follow-up strategies, and how to improve their win rate.",
  "proposal-detail":
    "The user is viewing a specific proposal. They can copy it, share a public link, download as PDF (Pro only), or delete it. Help them improve the proposal content, share it effectively with clients, and plan their follow-up approach.",
  upgrade:
    "The user is on the Upgrade page. Free plan: 3 proposals/month, clipboard copy, public share link. Pro plan ($19/month): unlimited proposals, full library, PDF export, client Accept button on share page, view tracking (see when client opens proposal), priority support. Help them understand the value and decide if upgrading makes sense for them.",
  dashboard:
    "The user is on their dashboard showing current plan, monthly usage, and recent proposals. Help them get started, understand their usage stats, navigate the platform, and make the most of QuoteFlow.",
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { success, resetInMs } = checkRateLimit(ip, 15, 60_000);

  if (!success) {
    return NextResponse.json(
      { error: `Too many requests. Please wait ${Math.ceil(resetInMs / 1000)}s.` },
      { status: 429 }
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let body: { message: string; context: string; history?: Message[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { message, context, history = [] } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  if (message.length > 600) {
    return NextResponse.json(
      { error: "Message too long (max 600 chars)." },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 500 });
  }

  const contextInstructions =
    CONTEXT_PROMPTS[context] ?? CONTEXT_PROMPTS["dashboard"];

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 350,
      system: `You are QuoteFlow's AI assistant — a friendly, practical helper for freelancers.

Current page context: ${contextInstructions}

Guidelines:
- Keep responses concise (under 120 words) unless the user asks for something detailed
- Be practical and actionable, not generic
- Answer in the same language the user writes in (English or Thai)
- Don't repeat the question back to the user
- When relevant, mention that Pro unlocks unlimited proposals, PDF export, and client view tracking`,
      messages: [
        ...history.slice(-6).map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: "user" as const, content: message.trim() },
      ],
    });

    const block = msg.content.find((b) => b.type === "text");
    const reply =
      block?.type === "text"
        ? block.text.trim()
        : "Sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI assistant error:", error);
    return NextResponse.json(
      { error: "Failed to get a response. Please try again." },
      { status: 500 }
    );
  }
}
