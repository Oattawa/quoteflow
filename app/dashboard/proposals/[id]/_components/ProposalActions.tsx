"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Printer, Zap, Share2, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProposalActions({
  proposalId,
  proposal,
  isPro,
}: {
  proposalId: string;
  proposal: string;
  isPro: boolean;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShareLink() {
    const url = `${window.location.origin}/share/${proposalId}`;
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  }

  async function handleDelete() {
    if (!confirm("Delete this proposal? This cannot be undone.")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/proposals/${proposalId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/dashboard/proposals");
        router.refresh();
      } else {
        setDeleteError("Failed to delete. Please try again.");
        setDeleting(false);
      }
    } catch {
      setDeleteError("Network error. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2 print:hidden">
      {deleteError && (
        <p className="text-xs text-red-500">{deleteError}</p>
      )}
    <div className="flex items-center gap-2 flex-wrap">
      {/* Copy text */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors"
      >
        {copied ? (
          <><Check className="w-4 h-4 text-green-500" />Copied!</>
        ) : (
          <><Copy className="w-4 h-4" />Copy</>
        )}
      </button>

      {/* Share link */}
      <button
        onClick={handleShareLink}
        className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors"
      >
        {linkCopied ? (
          <><Check className="w-4 h-4 text-green-500" />Link copied!</>
        ) : (
          <><Share2 className="w-4 h-4" />Share link</>
        )}
      </button>

      {/* PDF */}
      {isPro ? (
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          <Printer className="w-4 h-4" />
          Download PDF
        </button>
      ) : (
        <Link
          href="/dashboard/upgrade"
          className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-xl transition-colors"
        >
          <Zap className="w-4 h-4" />
          PDF (Pro)
        </Link>
      )}

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-gray-200 text-red-500 hover:bg-red-50 hover:border-red-200 px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
      >
        {deleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
    </div>
  );
}
