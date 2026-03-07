import type { SupabaseClient } from "@supabase/supabase-js";

export const FREE_TIER_LIMIT = 3;

export interface ProposalSummary {
  id: string;
  client_name: string;
  project_type: string;
  budget_range: string;
  created_at: string;
}

export interface ProposalRow extends ProposalSummary {
  scope: string;
  timeline: string;
  proposal_content: string;
}

export async function getUserPlan(
  supabase: SupabaseClient,
  userId: string
): Promise<"free" | "pro"> {
  const { data } = await supabase
    .from("subscriptions")
    .select("plan")
    .eq("user_id", userId)
    .single();

  return (data?.plan as "free" | "pro") ?? "free";
}

export async function getProposalCountThisMonth(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("proposals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfMonth.toISOString());

  return count ?? 0;
}

export async function saveProposal(
  supabase: SupabaseClient,
  userId: string,
  formData: {
    clientName: string;
    projectType: string;
    scope: string;
    timeline: string;
    budgetRange: string;
  },
  proposalContent: string
): Promise<string> {
  const { data, error } = await supabase
    .from("proposals")
    .insert({
      user_id: userId,
      client_name: formData.clientName,
      project_type: formData.projectType,
      scope: formData.scope,
      timeline: formData.timeline,
      budget_range: formData.budgetRange,
      proposal_content: proposalContent,
    })
    .select("id")
    .single();

  if (error) throw new Error("Failed to save proposal.");
  return data.id as string;
}

export async function getProposals(
  supabase: SupabaseClient,
  userId: string,
  limit = 50
): Promise<ProposalSummary[]> {
  const { data, error } = await supabase
    .from("proposals")
    .select("id, client_name, project_type, budget_range, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error("Failed to fetch proposals.");
  return (data ?? []) as ProposalSummary[];
}

export async function getProposal(
  supabase: SupabaseClient,
  proposalId: string,
  userId: string
): Promise<ProposalRow | null> {
  const { data } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
    .eq("user_id", userId)
    .single();

  return (data as ProposalRow) ?? null;
}

export async function updateProposal(
  supabase: SupabaseClient,
  proposalId: string,
  userId: string,
  proposalContent: string
): Promise<void> {
  const { error } = await supabase
    .from("proposals")
    .update({ proposal_content: proposalContent })
    .eq("id", proposalId)
    .eq("user_id", userId);

  if (error) throw new Error("Failed to update proposal.");
}
