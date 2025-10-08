import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';

const PortfolioChart = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  
  const periods = [
    { key: '1D', label: '1J' },
    { key: '1W', label: '1S' },
    { key: '1M', label: '1M' },
    { key: '1Y', label: '1A' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-custom-lg">
          <p className="text-sm font-body font-body-medium text-popover-foreground">
            {new Date(label)?.toLocaleDateString('fr-FR')}
          </p>
          <p className="text-lg font-data font-data-medium text-accent">
            {formatCurrency(payload?.[0]?.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-custom-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-foreground">
          Évolution du Portefeuille
        </h2>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {periods?.map((period) => (
            <Button
              key={period?.key}
              variant={selectedPeriod === period?.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(period?.key)}
              className="text-xs"
            >
              {period?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data?.[selectedPeriod] || data?.['1M']}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
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