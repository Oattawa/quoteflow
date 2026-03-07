import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import {
  getUserPlan,
  getProposalCountThisMonth,
  saveProposal,
  updateProposal,
} from "@/lib/supabase/proposals";

const FIELD_LIMITS = {
  clientName: 100,
  yourName: 100,
  projectType: 50,
  timeline: 50,
  budgetRange: 50,
  scope: 2000,
};

const FREE_TIER_LIMIT = 3;

export async function POST(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { success, remaining, resetInMs } = checkRateLimit(ip, 10, 60_000);

  if (!success) {
    return NextResponse.json(
      { error: `Too many requests. Please wait ${Math.ceil(resetInMs / 1000)}s and try again.` },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(resetInMs / 1000)) },
      }
    );
  }

  try {
    // ── Auth ──────────────────────────────────────────────────
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Please sign in to generate proposals." }, { status: 401 });
    }

    // ── Parse body ────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const {
      clientName,
      projectType,
      scope,
      timeline,
      budgetRange,
      yourName,
      proposalId,
    } = body as Record<string, string>;

    const isRegeneration = Boolean(proposalId);

    // ── Presence check ────────────────────────────────────────
    if (!clientName || !projectType || !scope || !timeline || !budgetRange || !yourName) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // ── Length validation ─────────────────────────────────────
    const fields: [string, string, number][] = [
      ["Client Name", clientName, FIELD_LIMITS.clientName],
      ["Your Name", yourName, FIELD_LIMITS.yourName],
      ["Project Type", projectType, FIELD_LIMITS.projectType],
      ["Timeline", timeline, FIELD_LIMITS.timeline],
      ["Budget Range", budgetRange, FIELD_LIMITS.budgetRange],
      ["Project Scope", scope, FIELD_LIMITS.scope],
    ];

    for (const [label, value, max] of fields) {
      if (typeof value !== "string") {
        return NextResponse.json({ error: `${label} must be a string.` }, { status: 400 });
      }
      if (value.trim().length === 0) {
        return NextResponse.json({ error: `${label} cannot be empty.` }, { status: 400 });
      }
      if (value.length > max) {
        return NextResponse.json(
          { error: `${label} must be ${max} characters or fewer.` },
          { status: 400 }
        );
      }
    }

    // ── Tier check (only for new proposals) ───────────────────
    if (!isRegeneration) {
      const [plan, usedThisMonth] = await Promise.all([
        getUserPlan(supabase),
        getProposalCountThisMonth(supabase, user.id),
      ]);

      if (plan === "free" && usedThisMonth >= FREE_TIER_LIMIT) {
        return NextResponse.json(
          {
            error: `You've used all ${FREE_TIER_LIMIT} free proposals this month. Upgrade to Pro for unlimited proposals.`,
            limitReached: true,
          },
          { status: 403 }
        );
      }
    }

    // ── API key check ─────────────────────────────────────────
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // ── Generate proposal ─────────────────────────────────────
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system:
        "You are an expert freelance proposal writer. Write professional, persuasive proposals that win clients. Be specific, confident, and concise.",
      messages: [
        {
          role: "user",
          content: `Write a professional freelance proposal with these details:
- Freelancer Name: ${yourName}
- Client Name: ${clientName}
- Project Type: ${projectType}
- Project Scope: ${scope}
- Timeline: ${timeline}
- Budget: ${budgetRange}

Structure the proposal with these sections:
1. Executive Summary (2-3 sentences, warm and confident)
2. Project Scope & Deliverables (4-6 bullet points)
3. Timeline & Milestones (broken into phases)
4. Investment (pricing breakdown based on budget range)
5. Why Work With Me (3 bullet points, based on project type)
6. Next Steps (clear call to action)

Format it professionally. Use the client and freelancer names throughout to make it personal.`,
        },
      ],
    });

    // ── Extract text ──────────────────────────────────────────
    const block = message.content.find((b) => b.type === "text");
    const proposal = block?.type === "text" ? block.text.trim() : "";

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal generation returned empty content. Please try again." },
        { status: 500 }
      );
    }

    // ── Save / update proposal in Supabase ────────────────────
    let savedProposalId: string;

    if (isRegeneration && proposalId) {
      await updateProposal(supabase, proposalId, proposal);
      savedProposalId = proposalId;
    } else {
      savedProposalId = await saveProposal(
        supabase,
        user.id,
        { clientName, projectType, scope, timeline, budgetRange },
        proposal
      );
    }

    return NextResponse.json(
      { proposal, proposalId: savedProposalId },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (error) {
    console.error("Proposal generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate proposal. Please try again." },
      { status: 500 }
    );
  }
}
