import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Inscription Rapide',
      description: 'Créez votre compte en moins de 2 minutes avec une vérification d\'identité simplifiée et sécurisée.',
      icon: 'UserPlus',
      mockupImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Configuration IA',
      description: 'Notre intelligence artificielle analyse votre profil de risque et vos objectifs pour personnaliser vos recommandations.',
      icon: 'Settings',
      mockupImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Investissement Intelligent',
      description: 'Recevez des recommandations personnalisées et exécutez vos investissements avec un simple clic.',
      icon: 'TrendingUp',
      mockupImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
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
            Comment ça{' '}
            <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
              fonctionne
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trois étapes simples pour transformer votre approche de l'investissement avec l'intelligence artificielle.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-20"
        >
          {steps?.map((step, index) => (
            <motion.div
              key={step?.id}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-16`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step?.color} flex items-center justify-center`}>
                    <span className="text-white font-heading font-heading-bold text-lg">
                      {step?.id}
                    </span>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step?.color} p-4`}>
                    <Icon 
                      name={step?.icon} 
                      size={32} 
                      className="text-white w-full h-full" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-heading font-heading-semibold text-foreground">
                    {step?.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                    {step?.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  {steps?.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i <= index 
                          ? `bg-gradient-to-r ${step?.color} w-8` 
                          : 'bg-border w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mockup Image */}
              <div className="flex-1 relative">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
                  <div className="relative bg-surface rounded-3xl p-4 shadow-custom-xl border border-border overflow-hidden">
                    <div className="aspect-video rounded-2xl overflow-hidden">
                      <Image
                        src={step?.mockupImage}
                        alt={`${step?.title} dashboard mockup`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Overlay UI Elements */}
                    <div className="absolute top-8 left-8 right-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </div>
                        <div className="text-xs text-muted-foreground bg-surface/80 backdrop-blur-sm px-2 py-1 rounded">
                          Caipytal Dashboard
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <span className="text-lg text-muted-foreground">
              Prêt à commencer votre parcours d'investissement ?
            </span>
            <div className="flex items-center space-x-2 text-accent font-body font-body-medium">
              <Icon name="ArrowRight" size={16} />
              <span>Démarrer maintenant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;