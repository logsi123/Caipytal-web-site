import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const rotatingTexts = ['Intelligemment', 'Précisément', 'Automatiquement', 'Efficacement'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts?.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/5 to-transparent rounded-full" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-heading-bold text-white leading-tight">
              Investissez{' '}
              <div className="relative inline-block h-16 md:h-20 lg:h-24 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"
                  >
                    {rotatingTexts?.[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              L'intelligence artificielle révolutionne vos investissements avec des recommandations personnalisées et une gestion de portefeuille automatisée.
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button
              size="xl"
              className="bg-accent hover:bg-accent/90 text-white shadow-custom-lg hover:shadow-custom-xl transform hover:scale-105 transition-all duration-200 px-8 py-4"
              iconName="Sparkles"
              iconPosition="left"
            >
              Essai gratuit 14 jours
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Voir les tarifs
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-12 flex flex-col items-center space-y-4"
          >
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              Approuvé par plus de 10 000 investisseurs
            </p>
            <div className="flex items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-green-400" />
                <span className="text-sm text-gray-300">RGPD</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={20} className="text-green-400" />
                <span className="text-sm text-gray-300">AES-256</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-yellow-400" />
                <span className="text-sm text-gray-300">4.9/5</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-wider">Découvrir</span>
          <Icon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;