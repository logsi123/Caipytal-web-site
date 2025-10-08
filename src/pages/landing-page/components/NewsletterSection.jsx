import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email?.trim()) {
      setError('Veuillez saisir votre adresse email');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Veuillez saisir une adresse email valide');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
  };

  const benefits = [
    {
      icon: 'TrendingUp',
      title: 'Analyses de marché',
      description: 'Recevez nos analyses hebdomadaires des tendances du marché'
    },
    {
      icon: 'Brain',
      title: 'Conseils IA',
      description: 'Tips exclusifs pour optimiser vos stratégies d\'investissement'
    },
    {
      icon: 'Bell',
      title: 'Alertes importantes',
      description: 'Soyez informé des opportunités et des risques en temps réel'
    }
  ];

  if (isSubmitted) {
    return (
      <section className="py-20 lg:py-32 bg-gradient-to-br from-accent to-purple-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={40} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-heading-bold text-white">
              Merci pour votre inscription !
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Vous recevrez bientôt nos dernières analyses et conseils d'investissement directement dans votre boîte mail.
            </p>
            <div className="pt-6">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => setIsSubmitted(false)}
              >
                S'inscrire avec un autre email
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-accent to-purple-600">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-heading-bold text-white leading-tight">
                Restez informé des{' '}
                <span className="text-white/80">
                  dernières tendances
                </span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Recevez chaque semaine nos analyses exclusives, conseils d'experts et alertes sur les meilleures opportunités d'investissement.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit?.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-heading-semibold text-white mb-1">
                      {benefit?.title}
                    </h3>
                    <p className="text-white/80">
                      {benefit?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />
              
              <div className="relative space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Icon name="Mail" size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-heading-bold text-white mb-2">
                    Newsletter gratuite
                  </h3>
                  <p className="text-white/80">
                    Rejoignez plus de 5 000 investisseurs qui nous font confiance
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e?.target?.value);
                      if (error) setError('');
                    }}
                    error={error}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    required
                  />
                  
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    className="bg-white text-accent hover:bg-white/90 font-body font-body-semibold"
                    iconName="Send"
                    iconPosition="right"
                  >
                    S'abonner gratuitement
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-xs text-white/60">
                    En vous inscrivant, vous acceptez de recevoir nos emails marketing.{' '}
                    <br className="hidden sm:inline" />
                    Vous pouvez vous désabonner à tout moment.
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-white/60" />
                    <span className="text-sm text-white/80">5 000+ abonnés</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-white/60" />
                    <span className="text-sm text-white/80">Zéro spam</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;