"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./translations";
import translations from "./translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "th") {
      setLangState(stored);
    }
  }, []);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  }

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
