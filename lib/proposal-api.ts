import type {
  GenerateProposalRequest,
  GenerateProposalResponse,
  GenerateProposalError,
} from "@/types/proposal";
import { LimitReachedError } from "@/types/proposal";

export async function generateProposalRequest(
  data: GenerateProposalRequest
): Promise<GenerateProposalResponse> {
  const res = await fetch("/api/generate-proposal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();

  let parsed: Partial<GenerateProposalResponse & GenerateProposalError>;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Unexpected server response (${res.status}).`);
  }

  if (res.status === 403 && parsed.limitReached) {
    throw new LimitReachedError();
  }

  if (!res.ok) {
    throw new Error(parsed.error ?? "Something went wrong. Please try again.");
  }

  if (!parsed.proposal || !parsed.proposalId) {
    throw new Error("No proposal content was returned. Please try again.");
  }

  return { proposal: parsed.proposal, proposalId: parsed.proposalId };
}
