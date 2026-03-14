import type { SupabaseClient } from "@supabase/supabase-js";

export const FREE_TIER_LIMIT = 3;

export type ProposalStatus = "pending" | "viewed" | "accepted" | "declined";

export interface ProposalSummary {
  id: string;
  client_name: string;
  project_type: string;
  budget_range: string;
  created_at: string;
  status: ProposalStatus;
  viewed_at: string | null;
  accepted_at: string | null;
}

export interface ProposalRow extends ProposalSummary {
  scope: string;
  timeline: string;
  proposal_content: string;
  client_message: string | null;
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
    .select("id, client_name, project_type, budget_range, created_at, status, viewed_at, accepted_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!error) return (data ?? []) as ProposalSummary[];

  // Fallback: status columns may not exist yet (migration not applied).
  // Return proposals without status rather than crashing the page.
  const { data: fallback, error: fallbackError } = await supabase
    .from("proposals")
    .select("id, client_name, project_type, budget_range, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (fallbackError) throw new Error("Failed to fetch proposals.");

  return (fallback ?? []).map((p) => ({
    ...p,
    status: "pending" as ProposalStatus,
    viewed_at: null,
    accepted_at: null,
  }));
}

export async function getTotalProposalCount(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { count } = await supabase
    .from("proposals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  return count ?? 0;
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

export async function deleteProposal(
  supabase: SupabaseClient,
  proposalId: string,
  userId: string
): Promise<void> {
  const { error } = await supabase
    .from("proposals")
    .delete()
    .eq("id", proposalId)
    .eq("user_id", userId);

  if (error) throw new Error("Failed to delete proposal.");
}

// Fetches a proposal by ID with no user filter — for public share pages.
// Security relies on the UUID being unguessable (128-bit random).
export async function getProposalPublic(
  adminSupabase: SupabaseClient,
  proposalId: string
): Promise<ProposalRow | null> {
  const { data } = await adminSupabase
    .from("proposals")
    .select("*")
    .eq("id", proposalId)
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

// Mark a proposal as viewed (first time only — won't overwrite accepted status).
// Uses the admin client so no auth is needed (called from the public share page).
export async function markProposalViewed(
  adminSupabase: SupabaseClient,
  proposalId: string
): Promise<void> {
  await adminSupabase
    .from("proposals")
    .update({ status: "viewed", viewed_at: new Date().toISOString() })
    .eq("id", proposalId)
    .eq("status", "pending"); // only advance from pending → viewed
}

// Record a client's acceptance of a proposal.
// Uses the admin client — no auth required (public share page action).
export async function acceptProposal(
  adminSupabase: SupabaseClient,
  proposalId: string,
  clientMessage: string
): Promise<void> {
  const { error } = await adminSupabase
    .from("proposals")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
      client_message: clientMessage || null,
    })
    .eq("id", proposalId)
    .in("status", ["pending", "viewed"]); // can only accept a live proposal

  if (error) throw new Error("Failed to record acceptance.");
}
