"use client";

import { useState } from "react";
import { Copy, Check, Printer, Zap } from "lucide-react";
import Link from "next/link";

export default function ProposalActions({
  proposal,
  isPro,
}: {
  proposal: string;
  isPro: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 print:hidden">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>

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
    </div>
  );
}
