"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, CheckCircle } from "lucide-react";

const WORDS = ["proposals", "pitches", "quotes", "bids"];

type ProposalLine = {
  id: string;
  label?: string;
  value: string;
  style: "meta" | "divider" | "body" | "heading" | "list" | "highlight";
};

const PROPOSAL_LINES: ProposalLine[] = [
  { id: "to", label: "To", value: "Sarah Miller", style: "meta" },
  { id: "proj", label: "Project", value: "E-commerce Redesign", style: "meta" },
  { id: "div", value: "", style: "divider" },
  {
    id: "intro",
    value:
      "Dear Sarah, thank you for considering me. Based on your requirements, I can deliver a high-converting storefront on time and budget.",
    style: "body",
  },
  { id: "scope-h", value: "Scope of Work", style: "heading" },
  { id: "s1", value: "Homepage + 5 product pages", style: "list" },
  { id: "s2", value: "Mobile-responsive layout", style: "list" },
  { id: "s3", value: "Stripe payment integration", style: "list" },
  { id: "price-h", value: "Investment", style: "heading" },
  { id: "price", value: "$3,500  ·  3 weeks  ·  Available now", style: "highlight" },
];

export function AnimatedHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [generating, setGenerating] = useState(true);
  const [done, setDone] = useState(false);

  // Cycle headline word
  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Proposal card typing animation
  useEffect(() => {
    const genTimer = setTimeout(() => {
      setGenerating(false);
      let idx = 0;
      const lineTimer = setInterval(() => {
        idx++;
        setVisibleLines(idx);
        if (idx >= PROPOSAL_LINES.length) {
          clearInterval(lineTimer);
          setTimeout(() => setDone(true), 200);
        }
      }, 140);
      return () => clearInterval(lineTimer);
    }, 700);
    return () => clearTimeout(genTimer);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-16 px-6 pt-16 pb-16 max-w-6xl mx-auto w-full">
      {/* ── Left: headline + CTA ── */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up">
          <Zap className="w-4 h-4" />
          AI-powered proposals
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-xl mb-4 animate-fade-up-1">
          Write winning{" "}
          <span key={wordIdx} className="text-violet-600 inline-block animate-word-in">
            {WORDS[wordIdx]}
          </span>
          <br />
          in 60 seconds
        </h1>

        <p className="text-lg text-gray-500 max-w-lg mb-10 animate-fade-up-2">
          Fill in a few details about your project and let QuoteFlow generate a
          professional, client-ready proposal instantly.
        </p>

        <div className="animate-fade-up-3 mb-8">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 animate-cta-glow"
          >
            Start for free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-500 animate-fade-up-4">
          {["No credit card required", "Free to start", "Export as PDF"].map((feat) => (
            <span key={feat} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-violet-400" />
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right: animated proposal card ── */}
      <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md animate-float">
        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-violet-100/60 overflow-hidden">
          {/* Window chrome */}
          <div className="bg-violet-600 px-5 py-3 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/25" />
            <span className="ml-2 text-white/70 text-xs font-medium">proposal.txt — QuoteFlow</span>
            {done && (
              <span className="ml-auto text-xs bg-green-400/20 text-green-300 border border-green-400/30 px-2 py-0.5 rounded-full font-medium animate-fade-in">
                ✓ Ready to send
              </span>
            )}
          </div>

          {/* Content */}
          <div className="px-5 py-4 min-h-[264px] font-mono text-sm">
            {generating ? (
              <div className="flex items-center gap-2.5 mt-4 text-gray-400 text-xs">
                <span className="flex gap-1">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </span>
                Generating proposal…
              </div>
            ) : (
              <div className="space-y-1.5">
                {PROPOSAL_LINES.slice(0, visibleLines).map((line) => {
                  if (line.style === "divider") {
                    return <hr key={line.id} className="border-gray-100 my-2" />;
                  }
                  if (line.style === "meta") {
                    return (
                      <div key={line.id} className="flex gap-2">
                        <span className="text-gray-400 w-14 shrink-0 text-xs">{line.label}:</span>
                        <span className="text-gray-800 font-semibold text-xs">{line.value}</span>
                      </div>
                    );
                  }
                  if (line.style === "heading") {
                    return (
                      <p key={line.id} className="text-violet-700 font-bold mt-3 text-xs uppercase tracking-wide">
                        {line.value}
                      </p>
                    );
                  }
                  if (line.style === "list") {
                    return (
                      <p key={line.id} className="text-gray-600 pl-2 text-xs">
                        · {line.value}
                      </p>
                    );
                  }
                  if (line.style === "highlight") {
                    return (
                      <p key={line.id} className="text-violet-700 font-semibold text-xs mt-1">
                        {line.value}
                      </p>
                    );
                  }
                  return (
                    <p key={line.id} className="text-gray-600 leading-relaxed text-xs">
                      {line.value}
                    </p>
                  );
                })}
                {!done && visibleLines < PROPOSAL_LINES.length && (
                  <span className="inline-block w-0.5 h-3.5 bg-violet-500 animate-blink ml-0.5 align-middle" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
