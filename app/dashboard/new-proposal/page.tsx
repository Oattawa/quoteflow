"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProposalForm } from "./_components/ProposalForm";
import { ProposalOutput } from "./_components/ProposalOutput";
import { generateProposalRequest } from "@/lib/proposal-api";
import { LimitReachedError } from "@/types/proposal";
import type { ProposalFormData } from "@/types/proposal";
import { Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

const initialForm: ProposalFormData = {
  clientName: "",
  projectType: "",
  projectScope: "",
  timeline: "",
  budgetRange: "",
  yourName: "",
};

interface PlanInfo {
  plan: "free" | "pro";
  usedThisMonth: number;
  limit: number | null;
}

function NewProposalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const upgraded = searchParams.get("upgraded") === "true";

  const regenerateId = searchParams.get("regenerate");

  const [form, setForm] = useState<ProposalFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);

  // Pre-fill form when coming from the detail page "Regenerate" button
  useEffect(() => {
    if (!regenerateId) return;
    fetch(`/api/proposals/${regenerateId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.id) return;
        setForm((prev) => ({
          ...prev,
          clientName: data.client_name ?? "",
          projectType: data.project_type ?? "",
          projectScope: data.scope ?? "",
          timeline: data.timeline ?? "",
          budgetRange: data.budget_range ?? "",
        }));
        setProposalId(data.id);
        setProposal(data.proposal_content);
      })
      .catch(() => {});
  }, [regenerateId]);

  useEffect(() => {
    fetch("/api/user/plan")
      .then((r) => r.json())
      .then((data) => { if (data.plan) setPlanInfo(data as PlanInfo); })
      .catch(() => {});
  }, [proposal]); // re-fetch after each generation to keep count current

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function generate(isRegeneration = false) {
    setLoading(true);
    setError(null);
    if (!isRegeneration) {
      setCopied(false);
      setProposalId(null);
    }
    try {
      const result = await generateProposalRequest({
        clientName: form.clientName,
        projectType: form.projectType,
        scope: form.projectScope,
        timeline: form.timeline,
        budgetRange: form.budgetRange,
        yourName: form.yourName,
        proposalId: isRegeneration ? (proposalId ?? undefined) : undefined,
      });
      setProposal(result.proposal);
      setProposalId(result.proposalId);
    } catch (err) {
      if (err instanceof LimitReachedError) {
        router.push("/dashboard/upgrade");
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await generate(false);
  }

  async function handleCopy() {
    if (!proposal) return;
    await navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isFree = planInfo?.plan === "free";
  const usedThisMonth = planInfo?.usedThisMonth ?? 0;
  const limit = planInfo?.limit ?? 3;
  const remaining = Math.max(0, limit - usedThisMonth);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-4 py-10">
      {/* Upgrade success banner */}
      {upgraded && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>Welcome to Pro! You now have unlimited proposals.</span>
          </div>
        </div>
      )}

      {/* Free tier usage banner */}
      {isFree && !upgraded && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between bg-white border border-violet-100 rounded-xl px-4 py-3 text-sm shadow-sm">
            <span className="text-gray-600">
              <span className="font-semibold text-gray-900">{remaining}</span>
              /{limit} free proposals remaining this month
            </span>
            {remaining === 0 ? (
              <Link
                href="/dashboard/upgrade"
                className="inline-flex items-center gap-1 text-violet-700 font-semibold hover:text-violet-800 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                Upgrade to Pro
              </Link>
            ) : (
              <Link
                href="/dashboard/upgrade"
                className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
              >
                View plans
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 pt-2">
        <h1 className="text-2xl font-bold text-gray-900">New Proposal</h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details below and we&apos;ll generate a professional
          proposal for your client.
        </p>
      </div>

      <ProposalForm
        form={form}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <ProposalOutput
        proposal={proposal}
        error={error}
        loading={loading}
        copied={copied}
        saved={Boolean(proposalId)}
        onCopy={handleCopy}
        onRegenerate={() => generate(true)}
      />
    </main>
  );
}

// useSearchParams() requires a Suspense boundary in Next.js App Router —
// without it the server throws during rendering.
export default function NewProposalPage() {
  return (
    <Suspense>
      <NewProposalContent />
    </Suspense>
  );
}
