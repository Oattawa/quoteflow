import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserPlan, getProposal } from "@/lib/supabase/proposals";
import { ProposalRenderer } from "@/lib/markdown-renderer";
import ProposalActions from "./_components/ProposalActions";

export default async function ProposalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [proposal, plan] = await Promise.all([
    getProposal(supabase, params.id, user.id),
    getUserPlan(supabase, user.id),
  ]);

  if (!proposal) notFound();

  const isPro = plan === "pro";

  return (
    <>
      {/* Print-only header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Proposal for {proposal.client_name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {proposal.project_type} · {proposal.budget_range}
        </p>
      </div>

      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10 print:bg-white print:p-0">
        <div className="max-w-3xl mx-auto">

          {/* Toolbar — hidden on print */}
          <div className="flex items-center justify-between mb-6 print:hidden">
            <Link
              href="/dashboard/proposals"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              My Proposals
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/new-proposal?regenerate=${proposal.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 bg-white border border-gray-200 px-3 py-2 rounded-xl transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </Link>
              <ProposalActions proposalId={proposal.id} proposal={proposal.proposal_content} isPro={isPro} />
            </div>
          </div>

          {/* Proposal metadata card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 mb-4 print:hidden">
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
              <span><span className="font-medium text-gray-700">Client:</span> {proposal.client_name}</span>
              <span><span className="font-medium text-gray-700">Type:</span> {proposal.project_type}</span>
              <span><span className="font-medium text-gray-700">Budget:</span> {proposal.budget_range}</span>
              <span><span className="font-medium text-gray-700">Timeline:</span> {proposal.timeline}</span>
              <span>
                <span className="font-medium text-gray-700">Created:</span>{" "}
                {new Date(proposal.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Proposal content */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-8 print:border-none print:shadow-none print:p-0">
            <ProposalRenderer text={proposal.proposal_content} />
          </div>

          {/* Bottom actions — hidden on print */}
          <div className="flex justify-center mt-6 print:hidden">
            <ProposalActions proposalId={proposal.id} proposal={proposal.proposal_content} isPro={isPro} />
          </div>

        </div>
      </main>
    </>
  );
}
