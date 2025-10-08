import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const PortfolioChart = ({ data, height = 200 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const value = payload?.[0]?.value;
      const formattedValue = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      })?.format(value);

      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-custom-md">
          <p className="text-sm font-body font-body-medium text-popover-foreground">
            {label}
          </p>
          <p className="text-sm font-data text-accent">
            {formattedValue}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-custom-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-heading-semibold text-foreground">
          Évolution du portefeuille
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span>7 derniers jours</span>
        </div>
      </div>
      
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis 
              hide
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-accent)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;