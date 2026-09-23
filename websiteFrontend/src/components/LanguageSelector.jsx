import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { LANGUAGES } from "../i18n/translations";

export default function LanguageSelector({ compact = false }) {
  const { lang, setLang } = useLanguage();
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      title="Language / भाषा"
      className={
        compact
          ? "text-xs font-semibold border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-amber-500"
          : "text-xs font-semibold border border-slate-200 rounded-xl px-2.5 py-2 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-amber-500"
      }
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
