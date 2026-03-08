import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Zap } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProposalPublic } from "@/lib/supabase/proposals";
import { ProposalRenderer } from "@/lib/markdown-renderer";
import { ViewTracker } from "./_components/ViewTracker";
import { AcceptProposal } from "./_components/AcceptProposal";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const admin = createAdminClient();
  const proposal = await getProposalPublic(admin, params.id);
  if (!proposal) return { title: "Proposal not found" };

  return {
    title: `Proposal for ${proposal.client_name} — QuoteFlow`,
    description: `${proposal.project_type} proposal · ${proposal.budget_range}`,
    robots: { index: false, follow: false },
  };
}

export default async function SharedProposalPage({
  params,
}: {
  params: { id: string };
}) {
  const admin = createAdminClient();
  const proposal = await getProposalPublic(admin, params.id);

  if (!proposal) notFound();

  const isAccepted = proposal.status === "accepted";

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 print:bg-white">

      {/* Fire view tracking silently after page loads */}
      <ViewTracker proposalId={params.id} />

      {/* Top bar */}
      <div className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm print:hidden">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-violet-600 rounded-lg p-1">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">QuoteFlow</span>
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Zap className="w-3 h-3" />
            Create free proposals
          </Link>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-10 print:px-0 print:py-0">

        {/* Accepted banner */}
        {isAccepted && (
          <div className="mb-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4 print:hidden">
            <span className="text-lg">✅</span>
            <div>
              <p className="text-sm font-semibold text-green-800">
                This proposal has been accepted
              </p>
              {proposal.client_message && (
                <p className="text-xs text-green-700 mt-0.5 italic">
                  &ldquo;{proposal.client_message}&rdquo;
                </p>
              )}
            </div>
          </div>
        )}

        {/* Proposal metadata */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 mb-4 print:hidden">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
            <span>
              <span className="font-medium text-gray-700">Client:</span>{" "}
              {proposal.client_name}
            </span>
            <span>
              <span className="font-medium text-gray-700">Type:</span>{" "}
              {proposal.project_type}
            </span>
            <span>
              <span className="font-medium text-gray-700">Budget:</span>{" "}
              {proposal.budget_range}
            </span>
            <span>
              <span className="font-medium text-gray-700">Timeline:</span>{" "}
              {proposal.timeline}
            </span>
          </div>
        </div>

        {/* Proposal content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-8 print:border-none print:shadow-none print:p-0">
          <ProposalRenderer text={proposal.proposal_content} />
        </div>

        {/* Client action: Accept this proposal */}
        {!isAccepted && (
          <div className="mt-6 print:hidden">
            <p className="text-xs text-gray-400 mb-3 text-center">
              Ready to move forward? Let the freelancer know.
            </p>
            <div className="flex justify-center">
              <AcceptProposal
                proposalId={params.id}
                clientName={proposal.client_name}
                alreadyAccepted={false}
                acceptedAt={null}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between print:mt-12">
          <p className="text-sm text-gray-400">
            This proposal was created with{" "}
            <Link
              href="/"
              className="text-violet-600 font-medium hover:underline print:no-underline"
            >
              QuoteFlow
            </Link>
            {" "}— AI proposals for freelancers
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors print:hidden"
          >
            <Zap className="w-3 h-3" />
            Create your own free proposals
          </Link>
        </div>

      </main>
    </div>
  );
}
