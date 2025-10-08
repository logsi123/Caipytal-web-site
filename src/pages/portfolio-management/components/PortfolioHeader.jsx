import React from 'react';
import Icon from 'components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioHeader = ({ totalValue, dailyChange, dailyChangePercent, isPositive, onExport, onRefresh }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-custom-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-foreground mb-2">
            Gestion de Portefeuille
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-3xl lg:text-4xl font-data font-data-bold text-foreground">
              {formatCurrency(totalValue)}
            </div>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-body font-body-medium ${
              isPositive 
                ? 'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}>
              <Icon 
                name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>
                {formatCurrency(Math.abs(dailyChange))} ({Math.abs(dailyChangePercent)?.toFixed(2)}%)
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Dernière mise à jour: {new Date()?.toLocaleString('fr-FR')}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Exporter
          </Button>
          <Button
            variant="ghost"
            size="icon"
            iconName="RefreshCw"
            onClick={onRefresh}
            aria-label="Actualiser"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;