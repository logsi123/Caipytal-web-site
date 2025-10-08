import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = ({ onPromptClick }) => {
  const quickActions = [
    {
      icon: 'TrendingUp',
      title: 'Analyser mon portefeuille',
      description: 'Obtenez une analyse complète de vos positions actuelles',
      prompt: 'Pouvez-vous analyser mon portefeuille actuel et me donner des recommandations d\'optimisation ?'
    },
    {
      icon: 'Target',
      title: 'Recommandations sectorielles',
      description: 'Découvrez les secteurs les plus prometteurs',
      prompt: 'Quels sont les secteurs les plus prometteurs pour investir en ce moment ?'
    },
    {
      icon: 'Shield',
      title: 'Stratégie défensive',
      description: 'Protégez votre capital avec des investissements sûrs',
      prompt: 'Je cherche une stratégie d\'investissement défensive pour protéger mon capital.'
    },
    {
      icon: 'Globe',
      title: 'Diversification géographique',
      description: 'Explorez les opportunités internationales',
      prompt: 'Comment puis-je diversifier géographiquement mon portefeuille ?'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Welcome Header */}
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto">
            <Icon name="Brain" size={32} className="text-white" />
          </div>
          
          <div>
            <h2 className="text-2xl font-heading font-heading-bold text-foreground mb-2">
              Bienvenue dans votre Assistant IA
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Je suis votre assistant personnel spécialisé en investissements. 
              Posez-moi vos questions ou choisissez l'une des options ci-dessous pour commencer.
            </p>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action, index) => (
            <button
              key={index}
              onClick={() => onPromptClick(action?.prompt)}
              className="group p-4 bg-surface border border-border rounded-xl hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 text-left micro-feedback"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent/10 group-hover:bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <Icon name={action?.icon} size={20} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-body-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                    {action?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-accent transition-colors duration-200 mt-1" 
                />
              </div>
            </button>
          ))}
        </div>

        {/* Features List */}
        <div className="bg-muted/30 rounded-xl p-6">
          <h3 className="font-body font-body-semibold text-foreground mb-4 flex items-center justify-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span>Capacités de l'Assistant IA</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              'Analyse technique avancée',
              'Recommandations personnalisées',
              'Évaluation des risques',
              'Optimisation de portefeuille',
              'Veille sectorielle',
              'Stratégies d\'investissement'
            ]?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-body font-body-medium text-foreground">
                Avertissement Important
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Les recommandations fournies par cet assistant IA sont à titre informatif uniquement 
                et ne constituent pas des conseils financiers personnalisés. Consultez toujours un 
                conseiller financier qualifié avant de prendre des décisions d'investissement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;