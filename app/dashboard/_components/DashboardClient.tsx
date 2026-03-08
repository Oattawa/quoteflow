"use client";

import Link from "next/link";
import { PlusCircle, LayoutList, Zap, FileText } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

type Proposal = {
  id: string;
  client_name: string;
  project_type: string;
  budget_range: string;
  created_at: string;
};

type Props = {
  email: string;
  isPro: boolean;
  usedThisMonth: number;
  remaining: number | null;
  recentProposals: Proposal[];
  freeTierLimit: number;
};

export function DashboardClient({
  email,
  isPro,
  usedThisMonth,
  remaining,
  recentProposals,
  freeTierLimit,
}: Props) {
  const { t } = useLanguage();
  const d = t.dashboard;

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{d.title}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{email}</p>
          </div>
          <Link
            href="/dashboard/new-proposal"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-violet-200"
          >
            <PlusCircle className="w-4 h-4" />
            {d.newProposal}
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{d.plan}</p>
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
                {d.upgradeToPro}
              </Link>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{d.thisMonth}</p>
            <span className="text-xl font-bold text-gray-900">{usedThisMonth}</span>
            <span className="text-sm text-gray-400 ml-1">
              {isPro ? d.proposals : `/ ${freeTierLimit} ${d.proposals}`}
            </span>
            {!isPro && remaining === 0 && (
              <p className="text-xs text-red-500 mt-1 font-medium">{d.limitReached}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{d.totalProposals}</p>
            <span className="text-xl font-bold text-gray-900">
              {recentProposals.length === 5 ? "5+" : recentProposals.length}
            </span>
            <span className="text-sm text-gray-400 ml-1">{d.saved}</span>
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">{d.recentProposals}</h2>
            <Link
              href="/dashboard/proposals"
              className="inline-flex items-center gap-1 text-xs text-violet-600 font-medium hover:underline"
            >
              <LayoutList className="w-3.5 h-3.5" />
              {d.viewAll}
            </Link>
          </div>

          {recentProposals.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">{d.noProposals}</p>
              <Link
                href="/dashboard/new-proposal"
                className="inline-block mt-3 text-sm text-violet-600 font-medium hover:underline"
              >
                {d.generateFirst}
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
                        {d.view}
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
              <p className="font-semibold">{d.newProposal}</p>
              <p className="text-sm text-violet-200">{d.generateIn60}</p>
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
              <p className="font-semibold text-gray-900">{d.myProposals}</p>
              <p className="text-sm text-gray-400">{d.viewManageAll}</p>
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}
