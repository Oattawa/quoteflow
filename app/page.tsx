import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Zap, CheckCircle } from "lucide-react";

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

const jsonLd = {
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
      description: "3 proposals per month",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "19",
      priceCurrency: "USD",
      description: "Unlimited proposals per month",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-4 h-4" />
          AI-powered proposals
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl mb-4">
          Write winning proposals{" "}
          <span className="text-violet-600">in 60 seconds</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-xl mb-10">
          Fill in a few details about your project and let QuoteFlow generate a
          professional, client-ready proposal instantly.
        </p>

        <Link
          href="/dashboard/new-proposal"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5"
        >
          Get Started
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {[
            "No templates needed",
            "Fully customizable",
            "Export as PDF",
          ].map((feat) => (
            <span key={feat} className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-violet-400" />
              {feat}
            </span>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} QuoteFlow. All rights reserved.
      </footer>
    </main>
  );
}
