import type { Metadata } from "next";
import { HomePageClient } from "./_components/HomePageClient";

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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite) }} />
      <HomePageClient />
    </>
  );
}
