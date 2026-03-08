import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getUserPlan,
  getProposalCountThisMonth,
  getProposals,
  FREE_TIER_LIMIT,
} from "@/lib/supabase/proposals";
import { DashboardClient } from "./_components/DashboardClient";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [plan, usedThisMonth, recentProposals] = await Promise.all([
    getUserPlan(supabase, user.id),
    getProposalCountThisMonth(supabase, user.id),
    getProposals(supabase, user.id, 5),
  ]);

  const isPro = plan === "pro";
  const remaining = isPro ? null : Math.max(0, FREE_TIER_LIMIT - usedThisMonth);

  return (
    <DashboardClient
      email={user.email ?? ""}
      isPro={isPro}
      usedThisMonth={usedThisMonth}
      remaining={remaining}
      recentProposals={recentProposals}
      freeTierLimit={FREE_TIER_LIMIT}
    />
  );
}
