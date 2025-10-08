import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Button from '../../../components/ui/Button';

const AllocationChart = ({ data }) => {
  const [viewType, setViewType] = useState('pie');
  const [allocationBy, setAllocationBy] = useState('sector');

  const COLORS = [
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-error)',
    '#8B5CF6',
    '#06B6D4',
    '#F59E0B',
    '#EF4444'
  ];

  const allocationTypes = [
    { key: 'sector', label: 'Secteur' },
    { key: 'geography', label: 'Géographie' },
    { key: 'assetType', label: 'Type d\'actif' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-custom-lg">
          <p className="text-sm font-body font-body-medium text-popover-foreground">
            {data?.name}
          </p>
          <p className="text-lg font-data font-data-medium text-accent">
            {data?.percentage}%
          </p>
          <p className="text-sm text-muted-foreground">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            })?.format(data?.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const currentData = data?.[allocationBy] || data?.sector;

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-custom-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-foreground">
          Répartition du Portefeuille
        </h2>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {allocationTypes?.map((type) => (
              <Button
                key={type?.key}
                variant={allocationBy === type?.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setAllocationBy(type?.key)}
                className="text-xs"
              >
                {type?.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('pie')}
              className="text-xs"
            >
              Camembert
            </Button>
            <Button
              variant={viewType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('bar')}
              className="text-xs"
            >
              Barres
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="percentage"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {currentData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="percentage" fill="var(--color-accent)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-heading font-heading-medium text-foreground">
            Détails de Répartition
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {currentData?.map((item, index) => (
              <div key={item?.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  />
                  <span className="text-sm font-body font-body-medium text-foreground">
                    {item?.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-data font-data-medium text-foreground">
                    {item?.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0
                    })?.format(item?.value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationChart;