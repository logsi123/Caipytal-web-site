import React from 'react';
import Icon from '../../../components/AppIcon';

const SuggestedTopics = ({ onTopicSelect }) => {
  const topics = [
    {
      id: 'portfolio',
      title: 'Gestion de portefeuille',
      description: 'Comment gérer vos positions et analyser les performances',
      icon: 'TrendingUp',
      questions: [
        'Comment lire mon tableau de bord ?',
        'Que signifient les graphiques ?',
        'Comment analyser mes performances ?'
      ]
    },
    {
      id: 'wire-transfer',
      title: 'Virements bancaires',
      description: 'Effectuer des virements et gérer vos transactions',
      icon: 'ArrowUpRight',
      questions: [
        'Comment faire un virement ?',
        'Pourquoi mon virement est refusé ?',
        'Combien de temps prend un virement ?'
      ]
    },
    {
      id: 'ai-recommendations',
      title: 'Recommandations IA',
      description: 'Comprendre et utiliser les conseils d\'investissement',
      icon: 'Brain',
      questions: [
        'Comment fonctionnent les recommandations ?',
        'Puis-je personnaliser les conseils ?',
        'Les recommandations sont-elles fiables ?'
      ]
    },
    {
      id: 'account-security',
      title: 'Sécurité du compte',
      description: 'Protéger votre compte et vos données',
      icon: 'Shield',
      questions: [
        'Comment sécuriser mon compte ?',
        'Que faire si je soupçonne une intrusion ?',
        'Comment changer mon mot de passe ?'
      ]
    },
    {
      id: 'subscription',
      title: 'Abonnement et facturation',
      description: 'Gérer votre abonnement et vos paiements',
      icon: 'CreditCard',
      questions: [
        'Comment changer mon plan ?',
        'Où voir mes factures ?',
        'Comment annuler mon abonnement ?'
      ]
    },
    {
      id: 'mobile-app',
      title: 'Application mobile',
      description: 'Utiliser Caipytal sur votre smartphone',
      icon: 'Smartphone',
      questions: [
        'Comment télécharger l\'app ?',
        'Synchronisation avec le web',
        'Notifications push'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
          Comment puis-je vous aider ?
        </h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez un sujet ou posez directement votre question
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics?.map((topic) => (
          <div
            key={topic?.id}
            className="bg-surface border border-border rounded-xl p-4 hover:shadow-custom-md transition-all duration-200 cursor-pointer micro-feedback"
            onClick={() => onTopicSelect(topic)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={topic?.icon} size={20} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-body font-body-medium text-foreground mb-1">
                  {topic?.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {topic?.description}
                </p>
                <div className="space-y-1">
                  {topic?.questions?.slice(0, 2)?.map((question, index) => (
                    <button
                      key={index}
                      className="block w-full text-left text-xs text-accent hover:text-accent/80 transition-colors duration-200"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onTopicSelect(topic, question);
                      }}
                    >
                      • {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;