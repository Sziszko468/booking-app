"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "@/locales/translations";

type Language = "en" | "hu" | "nl" | "de" | "fr" | "es" | "it";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize from localStorage on first render
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      const validLanguages: Language[] = ["en", "hu", "nl", "de", "fr", "es", "it"];
      if (saved && validLanguages.includes(saved)) {
        return saved;
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] as Record<string, string>;
    return langTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
