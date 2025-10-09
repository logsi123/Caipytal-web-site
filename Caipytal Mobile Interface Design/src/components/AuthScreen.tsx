import { motion } from "motion/react";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AuthScreenProps {
  onAuth: () => void;
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#1e2749] overflow-hidden">
      {/* Animated network background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-[#c5cee0] to-transparent"
            style={{
              left: `${(i + 1) * 6}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6 pb-8">
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="bg-gradient-to-br from-[#c5cee0] to-[#8b95b0] w-16 h-16 rounded-2xl flex items-center justify-center">
            <span className="text-2xl text-[#0a0e27] font-bold">C</span>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
        >
          <h1 className="text-3xl text-white mb-2">
            {isLogin ? "Bon retour !" : "Bienvenue"}
          </h1>
          <p className="text-[#c5cee0] mb-8">
            {isLogin
              ? "Connectez-vous pour accéder à votre portefeuille"
              : "Créez votre compte et commencez à investir intelligemment"}
          </p>

          <div className="space-y-4">
            {/* Email input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5cee0]" />
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-[#c5cee0]/60 pl-12 h-14 rounded-xl backdrop-blur-sm"
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c5cee0]" />
              <Input
                type="password"
                placeholder="Mot de passe"
                className="bg-white/10 border-white/20 text-white placeholder:text-[#c5cee0]/60 pl-12 h-14 rounded-xl backdrop-blur-sm"
              />
            </div>

            {/* CTA Button */}
            <Button
              onClick={onAuth}
              className="w-full h-14 bg-gradient-to-r from-[#c5cee0] to-[#8b95b0] text-[#0a0e27] hover:opacity-90 rounded-xl shadow-lg shadow-[#c5cee0]/20 transition-all"
            >
              {isLogin ? "Se connecter" : "Créer mon compte"}
            </Button>

            {/* Bank connection button */}
            <Button
              variant="outline"
              className="w-full h-14 bg-white/5 border-white/20 text-white hover:bg-white/10 rounded-xl backdrop-blur-sm transition-all"
            >
              <Lock className="w-5 h-5 mr-2" />
              Connexion sécurisée avec ma banque
            </Button>

            {/* Toggle auth mode */}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-[#c5cee0] hover:text-white transition-colors mt-4"
            >
              {isLogin
                ? "Pas encore de compte ? S'inscrire"
                : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-[#c5cee0]/60 text-center"
        >
          En continuant, vous acceptez nos conditions d'utilisation
        </motion.p>
      </div>
    </div>
  );
}
