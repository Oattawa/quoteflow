"use client";

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
import { AnimatedHero } from "./AnimatedHero";
import { ScrollReveal } from "./ScrollReveal";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/lib/language-context";

const FEATURE_ICONS = [Sparkles, Clock, LayoutList, Download, FileText, Zap];
const HOW_ICONS = [PenLine, Sparkles, Send];

export function HomePageClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-violet-600 rounded-lg p-1.5">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">QuoteFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors hidden sm:block"
          >
            {t.nav.pricing}
          </Link>
          <LanguageToggle />
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t.nav.signIn}
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {t.nav.signUpFree}
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
              {t.howItWorks.label}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {t.howItWorks.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.howItWorks.steps.map(({ title, description }, i) => {
              const Icon = HOW_ICONS[i];
              return (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-50 mb-4 relative">
                      <Icon className="w-5 h-5 text-violet-600" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
              {t.features.label}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              {t.features.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map(({ title, description }, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 mb-4">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
              {t.pricing.label}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">{t.pricing.heading}</h2>
            <p className="text-gray-500 mt-3">{t.pricing.subheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <ScrollReveal delay={0}>
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-7 flex flex-col h-full">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  {t.pricing.starter.label}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-gray-900">{t.prices.symbol}{t.prices.free}</span>
                  <span className="text-gray-400">{t.pricing.starter.per}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{t.pricing.starter.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.freeFeatures.map((f) => (
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
                  {t.pricing.starter.cta}
                </Link>
              </div>
            </ScrollReveal>

            {/* Pro */}
            <ScrollReveal delay={120}>
              <div className="bg-violet-600 rounded-2xl p-7 relative overflow-hidden shadow-lg shadow-violet-200 flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full blur-2xl opacity-40 -translate-y-8 translate-x-8" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-violet-200 uppercase tracking-widest">
                      {t.pricing.pro.label}
                    </p>
                    <span className="text-xs bg-white/20 text-white font-medium px-2 py-0.5 rounded-full">
                      {t.pricing.pro.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-white">{t.prices.symbol}{t.prices.proMonthly}</span>
                    <span className="text-violet-200">{t.pricing.pro.per}</span>
                  </div>
                  <p className="text-sm text-violet-200 mb-6">{t.pricing.pro.description}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {t.proFeatures.map((f) => (
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
                    {t.pricing.pro.cta}
                  </Link>
                  <p className="text-center text-violet-300 text-xs mt-3">{t.pricing.pro.note}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Business */}
            <ScrollReveal delay={240}>
              <div className="bg-gray-900 rounded-2xl border border-gray-700 p-7 flex flex-col h-full">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  {t.pricing.business.label}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white">{t.prices.symbol}{t.prices.business}</span>
                  <span className="text-gray-400">{t.pricing.business.per}</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">{t.pricing.business.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {t.businessFeatures.map((f) => (
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
                  {t.pricing.business.cta}
                </Link>
                <p className="text-center text-gray-500 text-xs mt-3">{t.pricing.business.note}</p>
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
              {t.faq.label}
            </p>
            <h2 className="text-3xl font-bold text-gray-900">{t.faq.heading}</h2>
          </div>
          <dl className="space-y-6">
            {t.faq.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <div className="border border-gray-100 rounded-2xl px-6 py-5 bg-gray-50 hover:border-violet-200 hover:bg-violet-50/40 transition-colors duration-200">
                  <dt className="text-base font-semibold text-gray-900 mb-2">{item.q}</dt>
                  <dd className="text-sm text-gray-500 leading-relaxed">{item.a}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.cta.heading}</h2>
          <p className="text-gray-500 mb-8">{t.cta.body}</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4" />
            {t.cta.button}
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white text-center text-sm text-gray-400 py-6">
        © {new Date().getFullYear()} QuoteFlow. {t.footer}
      </footer>
    </main>
  );
}
