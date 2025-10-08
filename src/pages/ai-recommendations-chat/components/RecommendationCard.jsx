import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation, onExecute, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const getActionColor = (action) => {
    switch (action?.toLowerCase()) {
      case 'acheter': case'buy':
        return 'text-success bg-success/10 border-success/20';
      case 'vendre': case'sell':
        return 'text-error bg-error/10 border-error/20';
      case 'conserver': case'hold':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted/50 border-border';
    }
  };

  const getActionIcon = (action) => {
    switch (action?.toLowerCase()) {
      case 'acheter': case'buy':
        return 'TrendingUp';
      case 'vendre': case'sell':
        return 'TrendingDown';
      case 'conserver': case'hold':
        return 'Minus';
      default:
        return 'Activity';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'faible': case'low':
        return 'text-success bg-success/10';
      case 'modéré': case'moderate':
        return 'text-warning bg-warning/10';
      case 'élevé': case'high':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value?.toFixed(2)}%`;
  };

  const handleSave = () => {
    setIsSaved(true);
    onSave(recommendation);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-muted/30 border border-border rounded-xl p-4 space-y-4">
      {/* Header with Symbol and Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="font-data font-data-medium text-sm text-primary">
              {recommendation?.symbol}
            </span>
          </div>
          <div>
            <h4 className="font-body font-body-semibold text-foreground">
              {recommendation?.companyName}
            </h4>
            <p className="text-xs text-muted-foreground">
              {recommendation?.symbol} • {recommendation?.exchange}
            </p>
          </div>
        </div>
        
        <div className={`px-3 py-1.5 rounded-lg border text-sm font-body font-body-medium flex items-center space-x-1 ${
          getActionColor(recommendation?.action)
        }`}>
          <Icon name={getActionIcon(recommendation?.action)} size={14} />
          <span>{recommendation?.action?.toUpperCase()}</span>
        </div>
      </div>
      {/* Price Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Prix actuel</p>
          <p className="font-data font-data-medium text-lg text-foreground">
            {formatCurrency(recommendation?.currentPrice)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Objectif</p>
          <div className="flex items-center space-x-2">
            <p className="font-data font-data-medium text-lg text-foreground">
              {formatCurrency(recommendation?.targetPrice)}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded ${
              recommendation?.potentialReturn >= 0 ? 'text-success bg-success/10' : 'text-error bg-error/10'
            }`}>
              {formatPercentage(recommendation?.potentialReturn)}
            </span>
          </div>
        </div>
      </div>
      {/* Risk and Confidence */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Risque:</span>
            <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(recommendation?.riskLevel)}`}>
              {recommendation?.riskLevel}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Confiance:</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={`${
                    i < recommendation?.confidenceLevel 
                      ? 'text-warning fill-current' :'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Reasoning */}
      <div className="bg-surface/50 rounded-lg p-3">
        <h5 className="text-sm font-body font-body-medium text-foreground mb-2 flex items-center space-x-2">
          <Icon name="MessageSquare" size={14} />
          <span>Analyse</span>
        </h5>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {recommendation?.reasoning}
        </p>
      </div>
      {/* Key Metrics */}
      {recommendation?.metrics && (
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(recommendation?.metrics)?.map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <p className="font-data font-data-medium text-sm text-foreground">
                {typeof value === 'number' ? value?.toFixed(2) : value}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center space-x-3 pt-2 border-t border-border/50">
        <Button
          variant="default"
          size="sm"
          iconName={getActionIcon(recommendation?.action)}
          iconPosition="left"
          onClick={() => onExecute(recommendation)}
          className="flex-1"
        >
          Exécuter {recommendation?.action}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName={isSaved ? "Check" : "Bookmark"}
          iconPosition="left"
          onClick={handleSave}
          disabled={isSaved}
        >
          {isSaved ? 'Sauvé' : 'Sauver'}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          iconName="MoreHorizontal"
          aria-label="Plus d'options"
        />
      </div>
    </div>
  );
};

export default RecommendationCard;