import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustBadgesSection = () => {
  const partners = [
    {
      id: 1,
      name: 'Alpaca',
      description: 'Courtage et exécution',
      logo: 'Building2',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 2,
      name: 'OpenAI GPT',
      description: 'Intelligence artificielle',
      logo: 'Brain',
      color: 'from-green-600 to-emerald-700'
    },
    {
      id: 3,
      name: 'AWS',
      description: 'Infrastructure cloud',
      logo: 'Cloud',
      color: 'from-orange-600 to-red-700'
    }
  ];

  const securityBadges = [
    {
      id: 1,
      title: 'RGPD',
      description: 'Conformité européenne',
      icon: 'Shield',
      color: 'text-green-600'
    },
    {
      id: 2,
      title: 'AES-256',
      description: 'Chiffrement militaire',
      icon: 'Lock',
      color: 'text-blue-600'
    },
    {
      id: 3,
      title: 'ISO 27001',
      description: 'Sécurité certifiée',
      icon: 'Award',
      color: 'text-purple-600'
    },
    {
      id: 4,
      title: '2FA',
      description: 'Double authentification',
      icon: 'Key',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { label: 'Utilisateurs actifs', value: '10,000+', icon: 'Users' },
    { label: 'Transactions sécurisées', value: '€50M+', icon: 'TrendingUp' },
    { label: 'Uptime garanti', value: '99.9%', icon: 'Activity' },
    { label: 'Support client', value: '24/7', icon: 'Headphones' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
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
            Une plateforme de{' '}
            <span className="bg-gradient-to-r from-accent to-green-600 bg-clip-text text-transparent">
              confiance
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Partenaires technologiques de premier plan et certifications de sécurité pour protéger vos investissements.
          </p>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-xl font-heading font-heading-semibold text-foreground mb-2">
              Nos partenaires technologiques
            </h3>
            <p className="text-muted-foreground">
              Intégrations avec les leaders du marché
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners?.map((partner) => (
              <motion.div
                key={partner?.id}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative p-8 bg-surface rounded-2xl border border-border shadow-custom-sm hover:shadow-custom-lg transition-all duration-300 micro-feedback text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${partner?.color} p-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon 
                      name={partner?.logo} 
                      size={40} 
                      className="text-white w-full h-full" 
                    />
                  </div>
                  <h4 className="text-xl font-heading font-heading-semibold text-foreground mb-2">
                    {partner?.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {partner?.description}
                  </p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Badges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-xl font-heading font-heading-semibold text-foreground mb-2">
              Sécurité et conformité
            </h3>
            <p className="text-muted-foreground">
              Certifications et standards de sécurité
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityBadges?.map((badge) => (
              <motion.div
                key={badge?.id}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative p-6 bg-surface rounded-xl border border-border shadow-custom-sm hover:shadow-custom-md transition-all duration-300 text-center">
                  <Icon 
                    name={badge?.icon} 
                    size={32} 
                    className={`mx-auto mb-3 ${badge?.color} group-hover:scale-110 transition-transform duration-300`} 
                  />
                  <h4 className="text-lg font-heading font-heading-semibold text-foreground mb-1">
                    {badge?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {badge?.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-gradient-to-br from-accent/5 to-purple-600/5 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-heading font-heading-semibold text-foreground mb-2">
              Chiffres clés
            </h3>
            <p className="text-muted-foreground">
              La confiance de milliers d'investisseurs
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon 
                    name={stat?.icon} 
                    size={28} 
                    className="text-accent group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="font-data font-data-bold text-2xl lg:text-3xl text-foreground mb-2">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;