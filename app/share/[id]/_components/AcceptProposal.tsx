"use client";

import { useState } from "react";
import { CheckCircle, ThumbsUp, X } from "lucide-react";

type Phase = "idle" | "open" | "submitting" | "done";

export function AcceptProposal({
  proposalId,
  clientName,
  alreadyAccepted,
  acceptedAt,
}: {
  proposalId: string;
  clientName: string;
  alreadyAccepted: boolean;
  acceptedAt: string | null;
}) {
  const [phase, setPhase] = useState<Phase>(alreadyAccepted ? "done" : "idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (phase === "done") {
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Proposal accepted!</p>
          {acceptedAt && (
            <p className="text-xs text-green-600 mt-0.5">
              Accepted on{" "}
              {new Date(acceptedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    );
  }

  async function handleAccept() {
    setPhase("submitting");
    setError("");
    try {
      const res = await fetch(`/api/proposals/${proposalId}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error("Could not record acceptance.");
      setPhase("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setPhase("open");
    }
  }

  return (
    <>
      {phase === "idle" && (
        <button
          onClick={() => setPhase("open")}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm shadow-green-200"
        >
          <ThumbsUp className="w-4 h-4" />
          Accept this Proposal
        </button>
      )}

      {(phase === "open" || phase === "submitting") && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Accept proposal for {clientName}</h3>
            <button
              onClick={() => setPhase("idle")}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Message to the freelancer{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Looks great — let's schedule a kick-off call this week."
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 placeholder:text-gray-400"
              maxLength={1000}
              disabled={phase === "submitting"}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button
              onClick={handleAccept}
              disabled={phase === "submitting"}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
            >
              {phase === "submitting" ? "Confirming…" : "Confirm Acceptance"}
            </button>
            <button
              onClick={() => setPhase("idle")}
              disabled={phase === "submitting"}
              className="px-4 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
