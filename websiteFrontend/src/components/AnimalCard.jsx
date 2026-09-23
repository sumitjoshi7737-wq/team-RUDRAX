import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { useLanguage } from '../context/LanguageContext';

export default function AnimalCard({ animal, basePath = "/farmer/animals" }) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-slate-800 break-words">{animal.id}</h3>
            <p className="text-xs text-slate-500">SCC {animal.scc ?? "—"} x10³/mL</p>
          </div>
          <RiskBadge level={animal.riskLevel} score={animal.riskScore} />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 py-3 px-3 bg-slate-50 rounded-lg text-center">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Yield</span>
            <span className="text-xs font-bold text-slate-700">{animal.milkYield ?? "—"} kg</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Temp</span>
            <span className={`text-xs font-bold ${animal.milkTemperature >= 39.4 ? 'text-rose-600' : 'text-slate-700'}`}>
              {animal.milkTemperature ?? "—"}°C
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Cond.</span>
            <span className={`text-xs font-bold ${animal.milkConductivity >= 6.5 ? 'text-rose-600' : 'text-slate-700'}`}>
              {animal.milkConductivity ?? "—"}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>SCC {animal.scc ?? "—"} x10³/mL</span>
          <span>Lactose {animal.lactose != null ? Number(animal.lactose).toFixed(1) : "—"}%</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
        <Link
          to={`${basePath}/${animal.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
        >
          <span>{t("viewAnimal")}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
