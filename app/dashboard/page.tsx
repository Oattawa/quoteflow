import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusCircle, LayoutList, Zap, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  getUserPlan,
  getProposalCountThisMonth,
  getProposals,
  FREE_TIER_LIMIT,
} from "@/lib/supabase/proposals";

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
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
          </div>
          <Link
            href="/dashboard/new-proposal"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-violet-200"
          >
            <PlusCircle className="w-4 h-4" />
            New Proposal
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Plan</p>
            <div className="flex items-center gap-2">
              {isPro ? (
                <>
                  <Zap className="w-5 h-5 text-violet-500" />
                  <span className="text-xl font-bold text-gray-900">Pro</span>
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 text-gray-400" />
                  <span className="text-xl font-bold text-gray-900">Free</span>
                </>
              )}
            </div>
            {!isPro && (
              <Link
                href="/dashboard/upgrade"
                className="inline-flex items-center gap-1 text-xs text-violet-600 font-medium mt-2 hover:underline"
              >
                <Zap className="w-3 h-3" />
                Upgrade to Pro
              </Link>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">This Month</p>
            <span className="text-xl font-bold text-gray-900">{usedThisMonth}</span>
            <span className="text-sm text-gray-400 ml-1">
              {isPro ? "proposals" : `/ ${FREE_TIER_LIMIT} proposals`}
            </span>
            {!isPro && remaining === 0 && (
              <p className="text-xs text-red-500 mt-1 font-medium">Limit reached</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Total Proposals</p>
            <span className="text-xl font-bold text-gray-900">{recentProposals.length === 5 ? "5+" : recentProposals.length}</span>
            <span className="text-sm text-gray-400 ml-1">saved</span>
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">Recent Proposals</h2>
            <Link
              href="/dashboard/proposals"
              className="inline-flex items-center gap-1 text-xs text-violet-600 font-medium hover:underline"
            >
              <LayoutList className="w-3.5 h-3.5" />
              View all
            </Link>
          </div>

          {recentProposals.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No proposals yet.</p>
              <Link
                href="/dashboard/new-proposal"
                className="inline-block mt-3 text-sm text-violet-600 font-medium hover:underline"
              >
                Generate your first proposal →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {recentProposals.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/dashboard/proposals/${p.id}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.client_name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.project_type} · {p.budget_range}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-xs text-gray-400">
                        {new Date(p.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-violet-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/new-proposal"
            className="flex items-center gap-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl px-6 py-5 transition-colors shadow-md shadow-violet-200"
          >
            <div className="bg-white/20 rounded-xl p-2.5">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">New Proposal</p>
              <p className="text-sm text-violet-200">Generate in 60 seconds</p>
            </div>
          </Link>

          <Link
            href="/dashboard/proposals"
            className="flex items-center gap-4 bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 transition-colors shadow-sm"
          >
            <div className="bg-violet-50 rounded-xl p-2.5">
              <LayoutList className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">My Proposals</p>
              <p className="text-sm text-gray-400">View & manage all</p>
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}
