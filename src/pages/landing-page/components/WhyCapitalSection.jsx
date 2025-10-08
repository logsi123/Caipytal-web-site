import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WhyCapitalSection = () => {
  const features = [
    {
      id: 1,
      icon: 'Brain',
      title: 'IA Recommandations',
      description: 'Algorithmes avancés analysent les marchés 24/7 pour vous proposer les meilleures opportunités d\'investissement personnalisées.',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 2,
      icon: 'TrendingUp',
      title: 'Gestion de Portefeuille',
      description: 'Suivez vos performances en temps réel avec des analyses détaillées et des rapports complets sur vos investissements.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      icon: 'CreditCard',
      title: 'Intégration Bancaire',
      description: 'Virements instantanés et sécurisés directement depuis votre tableau de bord avec validation IBAN automatique.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      icon: 'Shield',
      title: 'Sécurité Maximale',
      description: 'Chiffrement AES-256, conformité RGPD et authentification multi-facteurs pour protéger vos données financières.',
      gradient: 'from-orange-500 to-red-600'
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
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-heading-bold text-foreground mb-6">
            Pourquoi choisir{' '}
            <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">
              Caipytal
            </span>
            ?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une plateforme complète qui combine intelligence artificielle, gestion de portefeuille et services bancaires pour optimiser vos investissements.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-surface rounded-2xl border border-border shadow-custom-sm hover:shadow-custom-lg transition-all duration-300 micro-feedback">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature?.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon 
                    name={feature?.icon} 
                    size={32} 
                    className="text-white w-full h-full" 
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-heading-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature?.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-body font-body-medium">
            <Icon name="Zap" size={16} />
            <span>Commencez dès aujourd'hui</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCapitalSection;