"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "th" : "en")}
      className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-50"
      aria-label="Toggle language"
    >
      <span className="text-base leading-none">{lang === "en" ? "🇹🇭" : "🇬🇧"}</span>
      <span className="hidden sm:inline">{lang === "en" ? "ภาษาไทย" : "English"}</span>
    </button>
  );
}
