import { motion } from "motion/react";
import { Home, Bot, Briefcase, User } from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Accueil" },
    { id: "ai", icon: Bot, label: "IA" },
    { id: "formulas", icon: Briefcase, label: "Portefeuille" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1a1f3a]/80 backdrop-blur-xl border-t border-border z-50"
    >
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center gap-1 py-2 px-4 transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-muted-foreground"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                    />
                  )}
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
