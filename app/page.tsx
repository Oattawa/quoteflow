import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Zap,
  PenLine,
  Sparkles,
  Send,
  LayoutList,
  Download,
  Clock,
  Check,
} from "lucide-react";
import { AnimatedHero } from "./_components/AnimatedHero";
import { ScrollReveal } from "./_components/ScrollReveal";

export const metadata: Metadata = {
  title: "QuoteFlow — Write Winning Freelance Proposals in 60 Seconds",
  description:
    "AI-powered proposal generator for freelancers. Fill in your project details and get a professional, client-ready proposal instantly. Free to start.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "QuoteFlow — Write Winning Freelance Proposals in 60 Seconds",
    description:
      "AI-powered proposal generator for freelancers. Get a professional proposal instantly. Free to start.",
    url: "/",
  },
};

// Schema 1 — SoftwareApplication with pricing
const schemaApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QuoteFlow",
  description:
    "AI-powered freelance proposal generator. Write professional proposals in 60 seconds.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://quoteflow.app",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "3 AI-generated proposals per month, copy to clipboard",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "19",
      priceCurrency: "USD",
      description: "Unlimited proposals, full library, PDF export, priority support",
    },
  ],
};

// Schema 2 — FAQPage (shows in Google's People Also Ask)
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I write a freelance proposal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With QuoteFlow, enter your client name, project type, scope, timeline, and budget. The AI generates a structured, professional proposal — including scope of work, pricing, timeline, and next steps — in under 60 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Is QuoteFlow free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. QuoteFlow is free to start with 3 AI-generated proposals per month, no credit card required. Pro plans are $19/month for unlimited proposals, a full proposal library, and PDF export.",
      },
    },
    {
      "@type": "Question",
      name: "What should a freelance proposal include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong freelance proposal includes a personalised introduction, clear scope of work, estimated timeline, pricing, your relevant experience, and specific next steps. QuoteFlow's AI automatically structures all of these based on your project details.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export my proposal as a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. QuoteFlow Pro users can download any proposal as a clean, print-ready PDF to send directly to clients.",
      },
    },
    {
      "@type": "Question",
      name: "How is QuoteFlow different from proposal templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike static templates, QuoteFlow uses AI to write a unique proposal tailored to your specific client, project type, scope, and budget — not generic fill-in-the-blank text. Every proposal is different.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to generate a proposal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most proposals are ready in under 60 seconds. Fill in your project details (about 30 seconds), click Generate, and QuoteFlow delivers a complete, professional proposal instantly.",
      },
    },
  ],
};

// Schema 3 — WebSite for sitelinks
const schemaWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "QuoteFlow",
  url: "https://quoteflow.app",
  description:
    "AI-powered freelance proposal generator. Write professional proposals in 60 seconds.",
};

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: PenLine,
    title: "Fill in your project details",
    description:
      "Enter the client name, project type, scope, timeline, and budget. Takes about 30 seconds.",
  },
  {
    step: "2",
    icon: Sparkles,
    title: "AI writes your proposal",
    description:
      "QuoteFlow instantly generates a structured, professional proposal tailored to your project.",
  },
  {
    step: "3",
    icon: Send,
    title: "Send it and win the job",
    description:
      "Copy, export as PDF, or paste directly into your email. Close more clients.",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-powered writing",
    description: "Powered by Claude — the same AI used by top companies worldwide.",
  },
  {
    icon: Clock,
    title: "Ready in 60 seconds",
    description: "Stop spending hours writing proposals. Generate one in under a minute.",
  },
  {
    icon: LayoutList,
    title: "Proposal library",
    description: "Every proposal is saved. Browse, revisit, and share past work anytime.",
  },
  {
    icon: Download,
    title: "PDF export",
    description: "Download a clean, print-ready PDF to send directly to your client.",
  },
  {
    icon: FileText,
    title: "Professional structure",
    description: "Scope, timeline, pricing, and next steps — structured to win trust.",
  },
  {
    icon: Zap,
    title: "Unlimited proposals",
    description: "On Pro, generate as many proposals as you need with no monthly cap.",
  },
];

const FREE_FEATURES = [
  "3 proposals per month",
  "AI-powered generation",
  "Copy to clipboard",
  "Public share link",
];
const PRO_FEATURES = [
  "Unlimited proposals",
  "Full proposal library",
  "PDF export",
  "Client 'Accept' button on share page",
  "View tracking (see when client opens proposal)",
  "AI-powered generation",
  "Priority support",
];
const BUSINESS_FEATURES = [
  "Everything in Pro",
  "Custom branding on share page",
  "Follow-up reminders",
  "Proposal analytics",
  "5 team seats",
  "Dedicated support",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite) }} />

      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-violet-600 rounded-lg p-1.5">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">QuoteFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors hidden sm:block"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign up free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <AnimatedHero />

      {/* How it works */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
              How it works
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              From blank page to sent proposal in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, description }, i) => (
              <ScrollReveal key={step} delay={i * 120}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-50 mb-4 relative">
                    <Icon className="w-5 h-5 text-violet-600" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
              Features
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Everything a freelancer needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }, i) => (
              <ScrollReveal key={title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 mb-4">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
              Pricing
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Simple, honest pricing</h2>
            <p className="text-gray-500 mt-3">Start free. Upgrade when you&apos;re ready.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <ScrollReveal delay={0}>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-7 flex flex-col h-full">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Starter</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Great for trying QuoteFlow</p>
              <ul className="space-y-3 mb-8 flex-1">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Get started free
              </Link>
            </div>
            </ScrollReveal>

            {/* Pro */}
            <ScrollReveal delay={120}>
            <div className="bg-violet-600 rounded-2xl p-7 relative overflow-hidden shadow-lg shadow-violet-200 flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full blur-2xl opacity-40 -translate-y-8 translate-x-8" />
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-violet-200 uppercase tracking-widest">Pro</p>
                  <span className="text-xs bg-white/20 text-white font-medium px-2 py-0.5 rounded-full">
                    Most popular
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-violet-200">/month</span>
                </div>
                <p className="text-sm text-violet-200 mb-6">For active freelancers</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {PRO_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-violet-100">
                      <Check className="w-4 h-4 text-violet-300 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="block w-full text-center py-3 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors"
                >
                  Start free, then upgrade
                </Link>
                <p className="text-center text-violet-300 text-xs mt-3">Cancel anytime.</p>
              </div>
            </div>
            </ScrollReveal>

            {/* Business */}
            <ScrollReveal delay={240}>
            <div className="bg-gray-900 rounded-2xl border border-gray-700 p-7 flex flex-col h-full">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Business</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$39</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">For agencies &amp; teams</p>
              <ul className="space-y-3 mb-8 flex-1">
                {BUSINESS_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors"
              >
                Contact us
              </Link>
              <p className="text-center text-gray-500 text-xs mt-3">Coming soon.</p>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
              FAQ
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Common questions about QuoteFlow
            </h2>
          </div>
          <dl className="space-y-6">
            {schemaFaq.mainEntity.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 70}>
                <div className="border border-gray-100 rounded-2xl px-6 py-5 bg-gray-50 hover:border-violet-200 hover:bg-violet-50/40 transition-colors duration-200">
                  <dt className="text-base font-semibold text-gray-900 mb-2">{item.name}</dt>
                  <dd className="text-sm text-gray-500 leading-relaxed">{item.acceptedAnswer.text}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop losing jobs to slow proposals
          </h2>
          <p className="text-gray-500 mb-8">
            Freelancers who respond faster win more. Start generating professional
            proposals in under 60 seconds — for free.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4" />
            Start for free today
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white text-center text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} QuoteFlow. All rights reserved.
      </footer>
    </main>
  );
}
