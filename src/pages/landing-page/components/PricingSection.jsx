import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const [currentPlan, setCurrentPlan] = useState(1); // For mobile slider

  const plans = [
    {
      id: 0,
      name: 'Starter',
      price: 29,
      period: 'mois',
      description: 'Parfait pour débuter avec l\'IA',
      popular: false,
      features: [
        'Recommandations IA basiques',
        'Portefeuille jusqu\'à 10 000€',
        '5 virements par mois',
        'Support par email',
        'Analyses de marché hebdomadaires',
        'Interface mobile'
      ],
      limitations: [
        'Pas d\'analyses avancées',
        'Support limité'
      ],
      color: 'from-blue-500 to-indigo-600',
      buttonVariant: 'outline'
    },
    {
      id: 1,
      name: 'Premium',
      price: 79,
      period: 'mois',
      description: 'Le plus populaire pour investisseurs actifs',
      popular: true,
      features: [
        'Recommandations IA avancées',
        'Portefeuille illimité',
        'Virements illimités',
        'Support prioritaire 24/7',
        'Analyses en temps réel',
        'API d\'intégration',
        'Alertes personnalisées',
        'Rapports détaillés'
      ],
      limitations: [],
      color: 'from-accent to-purple-600',
      buttonVariant: 'default'
    },
    {
      id: 2,
      name: 'Pro',
      price: 149,
      period: 'mois',
      description: 'Pour les investisseurs professionnels',
      popular: false,
      features: [
        'IA personnalisée sur mesure',
        'Gestion multi-portefeuilles',
        'Trading algorithmique',
        'Gestionnaire dédié',
        'Analyses institutionnelles',
        'Intégrations avancées',
        'Backtesting historique',
        'Conformité réglementaire'
      ],
      limitations: [],
      color: 'from-orange-500 to-red-600',
      buttonVariant: 'outline'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-heading-bold text-foreground mb-6">
            Tarifs{' '}
            <span className="bg-gradient-to-r from-accent to-green-600 bg-clip-text text-transparent">
              transparents
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choisissez le plan qui correspond à vos objectifs d'investissement. Changez ou annulez à tout moment.
          </p>
          
          {/* Free Trial Banner */}
          <div className="inline-flex items-center space-x-2 mt-6 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-body font-body-medium">
            <Icon name="Gift" size={16} />
            <span>14 jours d'essai gratuit sur tous les plans</span>
          </div>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid lg:grid-cols-3 gap-8"
        >
          {plans?.map((plan) => (
            <motion.div
              key={plan?.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className={`relative h-full p-8 bg-surface rounded-3xl border-2 shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 ${
                plan?.popular 
                  ? 'border-accent scale-105 lg:scale-110' :'border-border hover:border-accent/30'
              }`}>
                {/* Popular Badge */}
                {plan?.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-2 rounded-full text-sm font-body font-body-medium shadow-custom-md">
                      Le plus populaire
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan?.color} p-4`}>
                    <Icon 
                      name={plan?.id === 0 ? 'Zap' : plan?.id === 1 ? 'Crown' : 'Rocket'} 
                      size={32} 
                      className="text-white w-full h-full" 
                    />
                  </div>
                  <h3 className="text-2xl font-heading font-heading-bold text-foreground mb-2">
                    {plan?.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {plan?.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-data font-data-bold text-foreground">
                        {plan?.price}€
                      </span>
                      <span className="text-muted-foreground">
                        /{plan?.period}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Facturation mensuelle
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon 
                        name="Check" 
                        size={16} 
                        className="text-green-600 mt-0.5 flex-shrink-0" 
                      />
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                  
                  {plan?.limitations?.map((limitation, index) => (
                    <div key={index} className="flex items-start space-x-3 opacity-60">
                      <Icon 
                        name="X" 
                        size={16} 
                        className="text-muted-foreground mt-0.5 flex-shrink-0" 
                      />
                      <span className="text-sm text-muted-foreground line-through">
                        {limitation}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  variant={plan?.buttonVariant}
                  size="lg"
                  fullWidth
                  className={plan?.popular ? 'bg-accent hover:bg-accent/90 text-white' : ''}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {plan?.popular ? 'Commencer l\'essai' : 'Choisir ce plan'}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Slider */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentPlan * 100}%)` }}
            >
              {plans?.map((plan) => (
                <div key={plan?.id} className="w-full flex-shrink-0 px-4">
                  <div className={`relative p-6 bg-surface rounded-3xl border-2 shadow-custom-lg ${
                    plan?.popular 
                      ? 'border-accent' :'border-border'
                  }`}>
                    {/* Popular Badge */}
                    {plan?.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-accent to-purple-600 text-white px-4 py-1 rounded-full text-xs font-body font-body-medium">
                          Le plus populaire
                        </div>
                      </div>
                    )}

                    {/* Plan Content */}
                    <div className="text-center mb-6">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${plan?.color} p-3`}>
                        <Icon 
                          name={plan?.id === 0 ? 'Zap' : plan?.id === 1 ? 'Crown' : 'Rocket'} 
                          size={24} 
                          className="text-white w-full h-full" 
                        />
                      </div>
                      <h3 className="text-xl font-heading font-heading-bold text-foreground mb-1">
                        {plan?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan?.description}
                      </p>
                      
                      <div className="flex items-baseline justify-center space-x-1 mb-4">
                        <span className="text-3xl font-data font-data-bold text-foreground">
                          {plan?.price}€
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /{plan?.period}
                        </span>
                      </div>
                    </div>

                    {/* Key Features (Limited for mobile) */}
                    <div className="space-y-2 mb-6">
                      {plan?.features?.slice(0, 4)?.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Icon 
                            name="Check" 
                            size={14} 
                            className="text-green-600 mt-0.5 flex-shrink-0" 
                          />
                          <span className="text-xs text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {plan?.features?.length > 4 && (
                        <div className="text-xs text-muted-foreground text-center pt-2">
                          +{plan?.features?.length - 4} autres fonctionnalités
                        </div>
                      )}
                    </div>

                    <Button
                      variant={plan?.buttonVariant}
                      size="default"
                      fullWidth
                      className={plan?.popular ? 'bg-accent hover:bg-accent/90 text-white' : ''}
                    >
                      {plan?.popular ? 'Essai gratuit' : 'Choisir'}
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {plans?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPlan(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentPlan === index 
                    ? 'bg-accent w-6' :'bg-border'
                }`}
                aria-label={`Plan ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-accent/5 to-purple-600/5 rounded-2xl p-8">
            <h3 className="text-xl font-heading font-heading-semibold text-foreground mb-2">
              Questions sur nos tarifs ?
            </h3>
            <p className="text-muted-foreground mb-4">
              Notre équipe est là pour vous aider à choisir le plan idéal
            </p>
            <Button
              variant="outline"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Contacter un conseiller
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;