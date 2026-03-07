import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getUserPlan,
  getProposalCountThisMonth,
} from "@/lib/supabase/proposals";

const FREE_TIER_LIMIT = 3;

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [plan, usedThisMonth] = await Promise.all([
    getUserPlan(supabase),
    getProposalCountThisMonth(supabase, user.id),
  ]);

  return NextResponse.json({
    plan,
    usedThisMonth,
    limit: plan === "pro" ? null : FREE_TIER_LIMIT,
  });
}
