"use client";

import { Copy, Check, RefreshCw, AlertCircle, BookmarkCheck } from "lucide-react";
import { ProposalRenderer } from "@/lib/markdown-renderer";

interface ProposalOutputProps {
  proposal: string | null;
  error: string | null;
  loading: boolean;
  copied: boolean;
  saved: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export function ProposalOutput({
  proposal,
  error,
  loading,
  copied,
  saved,
  onCopy,
  onRegenerate,
}: ProposalOutputProps) {
  return (
    <>
      {/* Error banner */}
      {error && (
        <div className="max-w-2xl mx-auto mt-6">
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Proposal card */}
      {proposal && (
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {/* Card header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Generated Proposal
                </h2>
                {saved && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                    <BookmarkCheck className="w-3 h-3" />
                    Saved
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onRegenerate}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-violet-600 disabled:opacity-50 transition-colors px-3 py-1.5 rounded-lg hover:bg-violet-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Regenerate
                </button>
                <button
                  onClick={onCopy}
                  className="inline-flex items-center gap-1.5 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Rendered markdown */}
            <div className="prose prose-sm prose-gray max-w-none">
              <ProposalRenderer text={proposal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
