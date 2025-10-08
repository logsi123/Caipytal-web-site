import React from 'react';

import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: {
      title: 'Produit',
      links: [
        { name: 'Fonctionnalités', href: '#features' },
        { name: 'Tarifs', href: '#pricing' },
        { name: 'Sécurité', href: '#security' },
        { name: 'API', href: '#api' }
      ]
    },
    company: {
      title: 'Entreprise',
      links: [
        { name: 'À propos', href: '#about' },
        { name: 'Blog', href: '#blog' },
        { name: 'Carrières', href: '#careers' },
        { name: 'Presse', href: '#press' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Centre d\'aide', href: '#help' },
        { name: 'Documentation', href: '#docs' },
        { name: 'Contact', href: '#contact' },
        { name: 'Statut', href: '#status' }
      ]
    },
    legal: {
      title: 'Légal',
      links: [
        { name: 'Confidentialité', href: '#privacy' },
        { name: 'Conditions', href: '#terms' },
        { name: 'RGPD', href: '#gdpr' },
        { name: 'Cookies', href: '#cookies' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' },
    { name: 'GitHub', icon: 'Github', href: '#github' },
    { name: 'Discord', icon: 'MessageSquare', href: '#discord' }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-heading font-heading-bold text-lg">C</span>
                </div>
                <span className="text-2xl font-heading font-heading-bold">Caipytal</span>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                L'intelligence artificielle au service de vos investissements. 
                Recommandations personnalisées, gestion de portefeuille et services bancaires intégrés.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-200 group"
                    aria-label={social?.name}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={18} 
                      className="text-gray-300 group-hover:text-white transition-colors duration-200" 
                    />
                  </a>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-green-400" />
                  <span className="text-sm text-gray-400">RGPD Conforme</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-green-400" />
                  <span className="text-sm text-gray-400">AES-256</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks)?.map(([key, section]) => (
              <div key={key} className="space-y-4">
                <h3 className="text-lg font-heading font-heading-semibold text-white">
                  {section?.title}
                </h3>
                <ul className="space-y-3">
                  {section?.links?.map((link) => (
                    <li key={link?.name}>
                      <a
                        href={link?.href}
                        className="text-gray-300 hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-400">
                © {currentYear} Caipytal. Tous droits réservés.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Version 2.1.0</span>
                <span>•</span>
                <span>Dernière mise à jour: Oct 2025</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-gray-400" />
                <select className="bg-transparent text-sm text-gray-300 border-none focus:outline-none cursor-pointer">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Tous les systèmes opérationnels</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 py-6">
          <div className="text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong>Avertissement sur les risques :</strong> Les investissements comportent des risques de perte en capital. 
              Les performances passées ne préjugent pas des performances futures. Les recommandations de notre IA sont fournies à titre informatif uniquement et ne constituent pas des conseils en investissement personnalisés.
            </p>
            <p>
              Caipytal est une marque de Caipytal SAS, société par actions simplifiée au capital de 100 000€, 
              immatriculée au RCS de Paris sous le numéro 123 456 789, 
              agréée par l'ACPR sous le numéro 12345. Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;