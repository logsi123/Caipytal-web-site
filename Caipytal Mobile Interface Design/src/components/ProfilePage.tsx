import { motion } from "motion/react";
import { User, Mail, Phone, Bell, Moon, Sun, Lock, CreditCard, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Switch } from "./ui/switch";

export function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#1e2749] px-6 pt-12 pb-16 rounded-b-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl text-white mb-1">Profil</h1>
          <p className="text-[#c5cee0] text-sm">Gérez vos informations et préférences</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-8">
        {/* Profile card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-[#1a1f3a] rounded-2xl p-6 shadow-xl mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl">
              M
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Mathys Dubois</h3>
              <p className="text-sm text-muted-foreground">mathys.dubois@email.com</p>
            </div>
          </div>

          {/* Subscription status */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Abonnement actuel</p>
                <p className="text-sm">Formule Équilibrée</p>
              </div>
              <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs">
                Actif
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personal information */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="mb-3">Informations personnelles</h3>
          <div className="bg-white dark:bg-[#1a1f3a] border border-border rounded-2xl overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b border-border">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm">Nom complet</p>
                <p className="text-xs text-muted-foreground">Mathys Dubois</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b border-border">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm">Email</p>
                <p className="text-xs text-muted-foreground">mathys.dubois@email.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm">Téléphone</p>
                <p className="text-xs text-muted-foreground">+33 6 12 34 56 78</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="mb-3">Paramètres</h3>
          <div className="bg-white dark:bg-[#1a1f3a] border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">Notifications</p>
                <p className="text-xs text-muted-foreground">Recevoir les alertes importantes</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center gap-3 p-4">
              {darkMode ? (
                <Moon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground" />
              )}
              <div className="flex-1">
                <p className="text-sm">Mode sombre</p>
                <p className="text-xs text-muted-foreground">Thème de l'application</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
        </motion.div>

        {/* Other options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="mb-3">Autres options</h3>
          <div className="bg-white dark:bg-[#1a1f3a] border border-border rounded-2xl overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b border-border">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm">Moyens de paiement</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors border-b border-border">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm">Sécurité et confidentialité</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 text-left">
                <p className="text-sm">Contacter le support</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Logout button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pb-6"
        >
          <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Se déconnecter</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
