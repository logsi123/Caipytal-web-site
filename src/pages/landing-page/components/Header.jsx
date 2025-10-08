import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Comment ça marche', href: '#how-it-works' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'À propos', href: '#about' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would update the theme context
    document.documentElement?.classList?.toggle('dark');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-300 ${
      isScrolled 
        ? 'bg-surface/95 backdrop-blur-lg border-b border-border shadow-custom-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/landing-page" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-heading font-heading-bold text-lg">C</span>
            </div>
            <span className={`text-2xl font-heading font-heading-bold transition-colors duration-200 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}>
              Caipytal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <a
                key={item?.name}
                href={item?.href}
                className={`text-sm font-body font-body-medium transition-colors duration-200 hover:text-accent ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/80'
                }`}
              >
                {item?.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled 
                  ? 'hover:bg-muted text-muted-foreground hover:text-foreground' 
                  : 'hover:bg-white/10 text-white/80 hover:text-white'
              }`}
              aria-label="Changer de thème"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
            </button>

            {/* Login Link */}
            <Link
              to="/dashboard-home"
              className={`text-sm font-body font-body-medium transition-colors duration-200 hover:text-accent ${
                isScrolled ? 'text-muted-foreground' : 'text-white/80'
              }`}
            >
              Se connecter
            </Link>

            {/* CTA Button */}
            <Button
              size="default"
              className="bg-accent hover:bg-accent/90 text-white shadow-custom-md hover:shadow-custom-lg transform hover:scale-105 transition-all duration-200"
              iconName="Sparkles"
              iconPosition="left"
            >
              Essai gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled 
                  ? 'hover:bg-muted text-muted-foreground' 
                  : 'hover:bg-white/10 text-white/80'
              }`}
              aria-label="Changer de thème"
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={18} />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isScrolled 
                  ? 'hover:bg-muted text-muted-foreground' 
                  : 'hover:bg-white/10 text-white/80'
              }`}
              aria-label="Menu principal"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-surface/95 backdrop-blur-lg border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              {/* Navigation Links */}
              {navigationItems?.map((item) => (
                <a
                  key={item?.name}
                  href={item?.href}
                  className="block py-3 text-foreground hover:text-accent transition-colors duration-200 font-body font-body-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item?.name}
                </a>
              ))}

              <hr className="border-border" />

              {/* Mobile Actions */}
              <div className="space-y-3 pt-2">
                <Link
                  to="/dashboard-home"
                  className="block py-3 text-muted-foreground hover:text-foreground transition-colors duration-200 font-body font-body-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                
                <Button
                  size="lg"
                  fullWidth
                  className="bg-accent hover:bg-accent/90 text-white"
                  iconName="Sparkles"
                  iconPosition="left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Commencer l'essai gratuit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;