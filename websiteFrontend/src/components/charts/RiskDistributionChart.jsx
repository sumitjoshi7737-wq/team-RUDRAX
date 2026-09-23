import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

export default function RiskDistributionChart({ summary, animals = [] }) {
  const { t } = useLanguage();
  const categories = [
    { key: 'healthy', label: t("healthyLowRisk"), value: summary?.healthy || 0, color: '#10b981', match: (a) => a.riskScore < 45 },
    { key: 'attention', label: t("needsAttention"), value: summary?.mediumRisk || 0, color: '#f59e0b', match: (a) => a.riskScore >= 45 && a.riskScore < 70 },
    { key: 'high', label: t("highRisk"), value: summary?.highRisk || 0, color: '#f43f5e', match: (a) => a.riskScore >= 70 },
  ];
  const data = categories
    .filter((item) => item.value > 0)
    .map((item) => ({ name: item.label, value: item.value, color: item.color, key: item.key }));

  const getIdsForCategory = (key) => {
    const list = Array.isArray(animals) ? animals : [];
    const cat = categories.find((c) => c.key === key);
    if (!cat) return [];
    return list.filter(cat.match).map((a) => a.id);
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => {
              const ids = getIdsForCategory(props?.payload?.key);
              return [ids.length ? ids.join(', ') : `${value} ${t("animals")}`, name];
            }}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
          />
          <Legend
            verticalAlign="bottom"
            height={52}
            iconType="circle"
            formatter={(value, entry) => {
              const ids = getIdsForCategory(entry?.payload?.key);
              return (
                <span className="text-xs text-slate-600 font-medium" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                  <span style={{ display: 'block', lineHeight: '1.2' }}>{value}</span>
                  {ids.length ? (
                    <span style={{ display: 'block', lineHeight: '1.2', fontWeight: 700 }}>{ids.join(', ')}</span>
                  ) : null}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}