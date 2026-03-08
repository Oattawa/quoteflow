"use client";

import { useState } from "react";
import { Check, Zap, FileText } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function UpgradePage() {
  const { t } = useLanguage();
  const u = t.upgrade;
  const p = t.prices;

  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billing }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to start checkout.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const monthlyDisplay =
    billing === "annual" ? p.proAnnualPerMonth : p.proMonthly;

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-violet-600 text-sm font-medium bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-4">
            <Zap className="w-3.5 h-3.5" />
            {u.badge}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{u.heading}</h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">{u.subheading}</p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setBilling("monthly")}
            className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
              billing === "monthly"
                ? "bg-white shadow-sm border border-gray-200 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {u.monthly}
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
              billing === "annual"
                ? "bg-white shadow-sm border border-gray-200 text-gray-900"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {u.annual}
            <span className="ml-2 text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
              {u.save35}
            </span>
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm text-center">
            {error}
          </div>
        )}

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                {u.freePlan}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">{p.symbol}{p.free}</span>
                <span className="text-gray-500">{t.pricing.starter.per}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{u.freeDesc}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {u.freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-gray-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard/new-proposal"
              className="block w-full text-center py-3 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
            >
              {u.currentPlan}
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-violet-600 rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-violet-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full blur-2xl opacity-40 -translate-y-8 translate-x-8" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-medium text-violet-200 uppercase tracking-wide mb-1">
                    {u.proPlan}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {p.symbol}{monthlyDisplay}
                    </span>
                    <span className="text-violet-200">{t.pricing.pro.per}</span>
                  </div>
                  {billing === "annual" ? (
                    <p className="text-sm text-violet-200 mt-1">
                      {p.billedAnnually(p.proAnnualTotal, p.proAnnualSavings)}
                    </p>
                  ) : (
                    <p className="text-sm text-violet-200 mt-1">{p.billedMonthly}</p>
                  )}
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {u.proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-violet-100">
                    <Check className="w-4 h-4 text-violet-300 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-white text-violet-700 font-semibold py-3 rounded-xl hover:bg-violet-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? u.redirecting
                  : billing === "annual"
                  ? p.upgradeAnnual(p.proAnnualTotal)
                  : p.upgradeMonthly(p.proMonthly)}
              </button>

              <p className="text-center text-violet-300 text-xs mt-3">{u.cancelNote}</p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-8 text-sm text-gray-400">
          <Link href="/dashboard/new-proposal" className="hover:text-violet-600 transition-colors">
            {u.back}
          </Link>
        </p>
      </div>
    </main>
  );
}
