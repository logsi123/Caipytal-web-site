import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ recommendations, onApplyRecommendation, onDismissRecommendation }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'buy': return 'TrendingUp';
      case 'sell': return 'TrendingDown';
      case 'hold': return 'Minus';
      case 'rebalance': return 'RotateCcw';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'buy': return 'text-success bg-success/10 border-success/20';
      case 'sell': return 'text-error bg-error/10 border-error/20';
      case 'hold': return 'text-warning bg-warning/10 border-warning/20';
      case 'rebalance': return 'text-accent bg-accent/10 border-accent/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-success/10 text-success border-success/20'
    };
    
    const labels = {
      high: 'Haute',
      medium: 'Moyenne',
      low: 'Faible'
    };

    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-body font-body-medium border ${colors?.[priority]}`}>
        {labels?.[priority]}
      </span>
    );
  };

  if (!recommendations || recommendations?.length === 0) {
    return (
      <div className="bg-surface rounded-xl border border-border p-6 shadow-custom-sm">
        <div className="text-center py-8">
          <Icon name="Brain" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-heading-medium text-foreground mb-2">
            Aucune recommandation disponible
          </h3>
          <p className="text-sm text-muted-foreground">
            L'IA analyse votre portefeuille pour générer des recommandations personnalisées.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-6 shadow-custom-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-accent" />
          </div>
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">
            Recommandations IA
          </h2>
        </div>
        <div className="text-xs text-muted-foreground">
          Mis à jour il y a {Math.floor(Math.random() * 30) + 1} minutes
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className={`border rounded-xl p-4 transition-all duration-200 hover:shadow-custom-md ${
              getRecommendationColor(recommendation?.type)
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-current/10">
                  <Icon 
                    name={getRecommendationIcon(recommendation?.type)} 
                    size={20} 
                    className="text-current"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-sm font-body font-body-semibold text-foreground">
                      {recommendation?.title}
                    </h3>
                    {getPriorityBadge(recommendation?.priority)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {recommendation?.description}
                  </p>
                  
                  {recommendation?.symbol && (
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                      <span>Symbole: <span className="font-data text-foreground">{recommendation?.symbol}</span></span>
                      {recommendation?.targetPrice && (
                        <span>Prix cible: <span className="font-data text-foreground">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                          })?.format(recommendation?.targetPrice)}
                        </span></span>
                      )}
                      {recommendation?.confidence && (
                        <span>Confiance: <span className="font-data text-foreground">{recommendation?.confidence}%</span></span>
                      )}
                    </div>
                  )}
                  
                  {expandedCard === recommendation?.id && (
                    <div className="mt-3 p-3 bg-surface/50 rounded-lg">
                      <h4 className="text-xs font-body font-body-semibold text-foreground mb-2 uppercase tracking-wider">
                        Analyse détaillée
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {recommendation?.analysis}
                      </p>
                      {recommendation?.risks && (
                        <div className="mb-3">
                          <h5 className="text-xs font-body font-body-semibold text-foreground mb-1">
                            Risques identifiés:
                          </h5>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {recommendation?.risks?.map((risk, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Icon name="AlertTriangle" size={12} className="text-warning mt-0.5" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={expandedCard === recommendation?.id ? "ChevronUp" : "ChevronDown"}
                  onClick={() => setExpandedCard(
                    expandedCard === recommendation?.id ? null : recommendation?.id
                  )}
                  aria-label="Voir détails"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => onDismissRecommendation(recommendation?.id)}
                  aria-label="Ignorer"
                />
              </div>
            </div>
            
            {recommendation?.type !== 'hold' && (
              <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t border-current/10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onApplyRecommendation(recommendation)}
                  iconName="Check"
                  iconPosition="left"
                >
                  Appliquer
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;