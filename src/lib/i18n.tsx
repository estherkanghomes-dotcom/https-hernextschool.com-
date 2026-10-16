import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Lang = "kr" | "en";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (kr: string, en: string) => string;
  font: string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("kr");
  const value: LangContextValue = {
    lang,
    setLang,
    t: (kr, en) => (lang === "kr" ? kr : en),
    font: lang === "kr" ? "font-kr" : "font-sans",
  };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}