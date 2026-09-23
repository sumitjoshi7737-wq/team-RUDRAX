import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function RiskBadge({ level, score }) {
  const { t } = useLanguage();
  let badgeStyle = "bg-amber-100 text-amber-900 border-amber-200";
  let dotStyle = "bg-amber-600";
  let label = level || t("healthy");

  const upper = String(level || "").toUpperCase();

  if (upper.includes("HIGH") || (typeof score === 'number' && score >= 70)) {
    badgeStyle = "bg-rose-100 text-rose-900 border-rose-200";
    dotStyle = "bg-rose-600 animate-pulse";
    label = t("highRisk");
  } else if (upper.includes("ATTENTION") || upper.includes("MED") || upper.includes("NEEDS") || upper.includes("MODERATE") || (typeof score === 'number' && score >= 45)) {
    badgeStyle = "bg-amber-100 text-amber-900 border-amber-200";
    dotStyle = "bg-amber-600";
    label = t("needsAttention");
  } else {
    badgeStyle = "bg-amber-100 text-amber-900 border-amber-200";
    dotStyle = "bg-amber-600";
    label = t("lowRisk");
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>
      <span>{label}</span>
      {typeof score === 'number' && <span className="opacity-80">({score}%)</span>}
    </span>
  );
}
