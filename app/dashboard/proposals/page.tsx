import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, FileText, Zap, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  getUserPlan,
  getProposals,
  FREE_TIER_LIMIT,
} from "@/lib/supabase/proposals";

export default async function ProposalsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [plan, proposals] = await Promise.all([
    getUserPlan(supabase, user.id),
    getProposals(supabase, user.id, 50),
  ]);

  const isPro = plan === "pro";
  // Free users see their last 3 proposals as a teaser
  const visibleProposals = isPro ? proposals : proposals.slice(0, FREE_TIER_LIMIT);
  const hiddenCount = isPro ? 0 : Math.max(0, proposals.length - FREE_TIER_LIMIT);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {isPro
                ? `${proposals.length} proposal${proposals.length !== 1 ? "s" : ""} total`
                : `Showing ${visibleProposals.length} of ${proposals.length} proposals`}
            </p>
          </div>
          <Link
            href="/dashboard/new-proposal"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-violet-200"
          >
            <PlusCircle className="w-4 h-4" />
            New
          </Link>
        </div>

        {/* Upgrade banner for free users with hidden proposals */}
        {!isPro && hiddenCount > 0 && (
          <div className="flex items-center justify-between bg-violet-50 border border-violet-200 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-violet-100 rounded-lg p-2">
                <Zap className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {hiddenCount} older proposal{hiddenCount !== 1 ? "s" : ""} hidden
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Upgrade to Pro to access your full proposal library
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/upgrade"
              className="shrink-0 text-sm font-semibold text-violet-700 bg-white border border-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-600 px-4 py-2 rounded-xl transition-colors"
            >
              Upgrade →
            </Link>
          </div>
        )}

        {/* Proposals list */}
        {visibleProposals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-16 text-center">
            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No proposals yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Generate your first proposal and it will appear here.
            </p>
            <Link
              href="/dashboard/new-proposal"
              className="inline-flex items-center gap-2 mt-5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Generate Proposal
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-50">
              {visibleProposals.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/dashboard/proposals/${p.id}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="bg-violet-50 rounded-lg p-2 shrink-0">
                        <FileText className="w-4 h-4 text-violet-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {p.client_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {p.project_type} · {p.budget_range}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-xs text-gray-400">
                        {new Date(p.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 transition-colors" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pro upsell for free users */}
        {!isPro && (
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl px-6 py-6 text-white shadow-lg shadow-violet-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">Unlock the full library</p>
                <p className="text-violet-200 text-sm mt-1">
                  Pro includes unlimited proposals, full history, and PDF export.
                </p>
              </div>
              <Link
                href="/dashboard/upgrade"
                className="shrink-0 bg-white text-violet-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors ml-4"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
