import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const MetricCard = ({ title, value, subtitle, icon, trend, isPercentage = false }) => {
    const isPositive = trend > 0;
    
    return (
      <div className="bg-surface rounded-xl border border-border p-4 hover:shadow-custom-md transition-all duration-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={16} className="text-accent" />
            </div>
            <span className="text-sm font-body font-body-medium text-muted-foreground">
              {title}
            </span>
          </div>
          {trend !== undefined && (
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={isPositive ? 'ArrowUp' : 'ArrowDown'} 
                size={12} 
              />
              <span className="text-xs font-body font-body-medium">
                {Math.abs(trend)?.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-data font-data-bold text-foreground">
            {isPercentage ? `${value}%` : value}
          </div>
          {subtitle && (
            <div className="text-xs text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Rendement Total"
        value={metrics?.totalReturn}
        subtitle="Depuis création"
        icon="TrendingUp"
        trend={metrics?.totalReturnTrend}
        isPercentage={true}
      />
      <MetricCard
        title="Rendement Annualisé"
        value={metrics?.annualizedReturn}
        subtitle="12 derniers mois"
        icon="Calendar"
        trend={metrics?.annualizedReturnTrend}
        isPercentage={true}
      />
      <MetricCard
        title="Volatilité"
        value={metrics?.volatility}
        subtitle="Écart-type"
        icon="Activity"
        trend={metrics?.volatilityTrend}
        isPercentage={true}
      />
      <MetricCard
        title="Ratio de Sharpe"
        value={metrics?.sharpeRatio}
        subtitle="Rendement/Risque"
        icon="Target"
        trend={metrics?.sharpeRatioTrend}
      />
    </div>
  );
};

export default PerformanceMetrics;