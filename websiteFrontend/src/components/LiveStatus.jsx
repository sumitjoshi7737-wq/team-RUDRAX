import React from "react";
import { useLanguage } from "../context/LanguageContext";

export function LiveLoading({ message }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm text-center">
      <div className="w-8 h-8 mx-auto rounded-full border-2 border-amber-600 border-t-transparent animate-spin" />
      <p className="mt-3 text-sm font-semibold text-slate-600">{message ?? (t("loading") + "…")}</p>
      <p className="mt-1 text-xs text-slate-400">{t("readingHistory")}</p>
    </div>
  );
}

export function LiveError({ message }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-2xl p-8 border border-rose-200 shadow-sm text-center">
      <p className="text-sm font-bold text-rose-700">{message ?? t("unableToLoadLive")}</p>
      <p className="mt-1 text-xs text-slate-500">{t("checkFirebaseConnection")}</p>
    </div>
  );
}

export function LiveBadge({ timestamp, dataSource }) {
  const { t } = useLanguage();
  const isHistory = dataSource === "history";
  const timeLabel = timestamp ? new Date(timestamp).toLocaleString() : isHistory ? t("previousData") : t("live");
  if (isHistory) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        <span>{t("lastAvailableData")} • {timeLabel}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span>{t("liveData")} • {timeLabel}</span>
    </span>
  );
}