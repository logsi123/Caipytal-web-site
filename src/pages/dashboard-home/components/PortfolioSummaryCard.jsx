import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummaryCard = ({ title, value, change, changePercentage, isPositive, icon, currency = 'EUR' }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatChange = (amount, percentage, isPositive) => {
    const sign = isPositive ? '+' : '';
    const formattedAmount = formatCurrency(Math.abs(amount));
    const formattedPercentage = Math.abs(percentage)?.toFixed(2);
    return `${sign}${formattedAmount} (${sign}${formattedPercentage}%)`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-custom-sm hover:shadow-custom-md transition-all duration-200 micro-feedback">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-muted-foreground" />
            <h3 className="text-sm font-body font-body-medium text-muted-foreground">
              {title}
            </h3>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-data font-data-medium text-foreground">
              {formatCurrency(value)}
            </p>
            {change !== undefined && changePercentage !== undefined && (
              <div className={`flex items-center space-x-1 text-sm ${
                isPositive ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span className="font-body font-body-medium">
                  {formatChange(change, changePercentage, isPositive)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;