import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function ForecastChart({ data }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            unit="%"
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Predicted Risk']}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
          />
          <ReferenceLine y={70} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'High Risk (70%)', fill: '#f43f5e', fontSize: 10, position: 'insideTopRight' }} />
          <ReferenceLine y={45} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Needs Attention (45%)', fill: '#f59e0b', fontSize: 10, position: 'insideTopRight' }} />
          
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#6366f1"
            strokeWidth={2.5}
            strokeDasharray="4 4"
            dot={{ r: 4, fill: '#6366f1', strokeWidth: 1, stroke: '#ffffff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
