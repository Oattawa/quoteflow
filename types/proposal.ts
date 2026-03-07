export interface ProposalFormData {
  clientName: string;
  projectType: string;
  projectScope: string;
  timeline: string;
  budgetRange: string;
  yourName: string;
}

export interface GenerateProposalRequest {
  clientName: string;
  projectType: string;
  scope: string;
  timeline: string;
  budgetRange: string;
  yourName: string;
  /** Pass existing proposalId when regenerating — skips free tier limit check */
  proposalId?: string;
}

export interface GenerateProposalResponse {
  proposal: string;
  proposalId: string;
}

export interface GenerateProposalError {
  error: string;
  limitReached?: boolean;
}

/** Thrown by generateProposalRequest when the user hits the free tier limit */
export class LimitReachedError extends Error {
  constructor() {
    super("LIMIT_REACHED");
    this.name = "LimitReachedError";
  }
}
