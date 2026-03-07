"use client";

import { useState, useEffect, useCallback } from "react";
import { FileText, Loader2, CheckCircle, Zap } from "lucide-react";

// ── Demo content ──────────────────────────────────────────────────────────────

const DEMO_NAME = "Acme Corporation";
const DEMO_TYPE = "Web Design";
const DEMO_SCOPE = "Full website redesign with modern UI and mobile-first approach";

const DEMO_PROPOSAL = `## Executive Summary

Dear Acme Corporation, I'm excited to present this proposal for your website redesign. My focus is a fast, modern site that converts visitors into customers and reflects your brand's quality.

## Scope & Deliverables
- Custom responsive design (8 core pages)
- Brand-aligned component library
- Mobile-first development & optimization
- SEO structure & analytics setup

## Timeline & Milestones
**Phase 1** — Discovery & Wireframes (Week 1–2)
**Phase 2** — Design & Prototype (Week 3–4)
**Phase 3** — Build, Test & Launch (Week 5–8)

## Investment
Project total: **$4,500**
50% upfront · 50% on delivery

## Next Steps
Reply to this proposal to schedule a 30-min kickoff call. I'm ready to start immediately.`;

// ── Animation state machine ────────────────────────────────────────────────────
// idle → typingName → typingScope → waitingClick → generating → typing → done → reset → idle

type Phase =
  | "idle"
  | "typingName"
  | "typingScope"
  | "waitingClick"
  | "generating"
  | "typingProposal"
  | "done";

function useTypewriter(target: string, active: boolean, speed = 45) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) { setText(""); return; }
    if (text.length >= target.length) return;
    const t = setTimeout(() => setText(target.slice(0, text.length + 1)), speed);
    return () => clearTimeout(t);
  }, [active, text, target, speed]);

  const done = text.length === target.length;
  return { text, done };
}

export default function ProductDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [proposalText, setProposalText] = useState("");
  const [btnPressed, setBtnPressed] = useState(false);

  const name = useTypewriter(DEMO_NAME, phase === "typingName" || phase === "typingScope" || phase === "waitingClick" || phase === "generating" || phase === "typingProposal" || phase === "done", 55);
  const scope = useTypewriter(DEMO_SCOPE, phase === "typingScope" || phase === "waitingClick" || phase === "generating" || phase === "typingProposal" || phase === "done", 30);

  // Orchestrate the whole sequence
  const runSequence = useCallback(() => {
    setPhase("idle");
    setProposalText("");
    setBtnPressed(false);

    const t1 = setTimeout(() => setPhase("typingName"), 600);
    // name finishes ~1.3s after start (DEMO_NAME.length * 55ms)
    const nameMs = DEMO_NAME.length * 55 + 300;
    const t2 = setTimeout(() => setPhase("typingScope"), 600 + nameMs);
    const scopeMs = DEMO_SCOPE.length * 30 + 400;
    const t3 = setTimeout(() => setPhase("waitingClick"), 600 + nameMs + scopeMs);
    const t4 = setTimeout(() => setBtnPressed(true), 600 + nameMs + scopeMs + 700);
    const t5 = setTimeout(() => { setBtnPressed(false); setPhase("generating"); }, 600 + nameMs + scopeMs + 1000);
    const t6 = setTimeout(() => setPhase("typingProposal"), 600 + nameMs + scopeMs + 3200);
    return [t1, t2, t3, t4, t5, t6];
  }, []);

  // Typewrite the proposal
  useEffect(() => {
    if (phase !== "typingProposal") return;
    if (proposalText.length >= DEMO_PROPOSAL.length) {
      setPhase("done");
      return;
    }
    const t = setTimeout(
      () => setProposalText(DEMO_PROPOSAL.slice(0, proposalText.length + 2)),
      8
    );
    return () => clearTimeout(t);
  }, [phase, proposalText]);

  // Auto-restart loop
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => runSequence(), 5500);
    return () => clearTimeout(t);
  }, [phase, runSequence]);

  // Kick off on mount
  useEffect(() => {
    const timers = runSequence();
    return () => timers.forEach(clearTimeout);
  }, [runSequence]);

  const showForm = phase !== "idle";
  const showResult = phase === "typingProposal" || phase === "done";
  const showLoader = phase === "generating";

  // ── Render helpers ────────────────────────────────────────────────────────

  function renderProposal(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## "))
        return (
          <p key={i} className="text-xs font-bold text-gray-900 mt-3 mb-1">
            {line.replace("## ", "")}
          </p>
        );
      if (line.startsWith("**") && line.endsWith("**"))
        return (
          <p key={i} className="text-xs font-semibold text-gray-800">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      if (line.startsWith("- "))
        return (
          <p key={i} className="text-xs text-gray-600 pl-3">
            • {line.slice(2)}
          </p>
        );
      if (line === "") return <div key={i} className="h-1" />;
      // Handle inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-xs text-gray-700 leading-relaxed">
          {parts.map((part, j) =>
            part.startsWith("**") ? (
              <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  }

  return (
    <div className="flex flex-col items-center">
      {/* Live demo badge */}
      <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        Live demo — watch it generate a real proposal
      </div>

      {/* Browser chrome */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl shadow-violet-200/60 border border-gray-200 bg-white">

        {/* Browser top bar */}
        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200">
            quoteflow.app/dashboard/new-proposal
          </div>
        </div>

        {/* App nav */}
        <div className="border-b border-gray-100 bg-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="bg-violet-600 rounded p-1">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-900">QuoteFlow</span>
          </div>
          <span className="text-xs text-gray-400">demo@quoteflow.app</span>
        </div>

        {/* App content */}
        <div className="p-5 min-h-[380px] bg-gradient-to-br from-violet-50/40 via-white to-purple-50/30">
          <div className="grid grid-cols-2 gap-4 h-full">

            {/* ── Left: Form ────────────────────────────────────────── */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-700">New Proposal</p>

              {/* Client Name */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Client Name</label>
                <div className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-900 min-h-[28px] flex items-center">
                  <span>{name.text}</span>
                  {(phase === "typingName") && (
                    <span className="w-0.5 h-3 bg-violet-500 ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Project Type</label>
                <div className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs min-h-[28px] flex items-center transition-all duration-300 ${
                  phase === "typingName" || phase === "idle"
                    ? "border-gray-100 bg-gray-50 text-gray-300"
                    : "border-gray-200 bg-white text-gray-900"
                }`}>
                  {phase !== "typingName" && phase !== "idle" ? DEMO_TYPE : (
                    <span className="text-gray-300">Select type…</span>
                  )}
                </div>
              </div>

              {/* Scope */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Project Scope</label>
                <div className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 min-h-[52px]">
                  <span>{scope.text}</span>
                  {phase === "typingScope" && (
                    <span className="w-0.5 h-3 bg-violet-500 ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Generate button */}
              <button
                className={`w-full py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  phase === "waitingClick" || phase === "generating" || showResult
                    ? btnPressed
                      ? "bg-violet-800 text-white scale-95"
                      : "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-400 cursor-default"
                }`}
              >
                {showLoader ? (
                  <span className="inline-flex items-center gap-1.5 justify-center">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Generating…
                  </span>
                ) : showResult ? (
                  <span className="inline-flex items-center gap-1.5 justify-center">
                    <CheckCircle className="w-3 h-3" />
                    Proposal ready
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 justify-center">
                    <Zap className="w-3 h-3" />
                    Generate Proposal
                  </span>
                )}
              </button>
            </div>

            {/* ── Right: Output ──────────────────────────────────────── */}
            <div className="rounded-xl border border-gray-100 bg-white p-3 overflow-hidden relative min-h-[300px]">
              {!showResult && !showLoader && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-violet-300" />
                  </div>
                  <p className="text-xs text-gray-400">
                    Your proposal will appear here
                  </p>
                </div>
              )}

              {showLoader && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-violet-400 rounded-full animate-bounce"
                        style={{
                          height: `${12 + Math.sin(i) * 6}px`,
                          animationDelay: `${i * 0.12}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    AI is writing your proposal…
                  </p>
                </div>
              )}

              {showResult && (
                <div className="h-full overflow-hidden">
                  <div className="space-y-0.5">
                    {renderProposal(proposalText)}
                    {phase === "typingProposal" && (
                      <span className="w-0.5 h-3 bg-violet-500 inline-block ml-0.5 animate-pulse" />
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">Free plan · 2 proposals remaining</span>
          {phase === "done" && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium animate-fade-in">
              <CheckCircle className="w-3 h-3" />
              Saved to your library
            </span>
          )}
        </div>

      </div>

      <p className="text-xs text-gray-400 mt-3">
        Real AI · Real output · No signup needed to try
      </p>
    </div>
  );
}
