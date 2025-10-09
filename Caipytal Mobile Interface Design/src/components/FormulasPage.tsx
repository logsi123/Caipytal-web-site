import { motion } from "motion/react";
import { Check, TrendingUp } from "lucide-react";
import { Progress } from "./ui/progress";

const formulas = [
  {
    id: "essential",
    name: "Formule Essentielle",
    price: 20,
    return: "4-6%",
    risk: 20,
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-900",
    features: [
      "Investissement mensuel minimum",
      "Diversification automatique",
      "Rééquilibrage trimestriel",
      "Support par email",
    ],
  },
  {
    id: "balanced",
    name: "Formule Équilibrée",
    price: 50,
    return: "8-12%",
    risk: 50,
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-900",
    featured: true,
    features: [
      "Tous les avantages Essentielle",
      "Optimisation IA hebdomadaire",
      "Accès aux analyses premium",
      "Support prioritaire",
    ],
  },
  {
    id: "aggressive",
    name: "Formule Agressive",
    price: 100,
    return: "15-25%",
    risk: 85,
    color: "from-red-500 to-pink-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-900",
    features: [
      "Tous les avantages Équilibrée",
      "Trading haute fréquence IA",
      "Opportunities exclusives",
      "Gestionnaire dédié",
    ],
  },
];

export function FormulasPage() {
  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#1e2749] px-6 pt-12 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl text-white mb-1">Mes Formules</h1>
          <p className="text-[#c5cee0] text-sm">Choisissez la stratégie adaptée à vos objectifs</p>
        </motion.div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {formulas.map((formula, index) => (
          <motion.div
            key={formula.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`relative ${formula.bgColor} border-2 ${formula.borderColor} rounded-2xl p-6 shadow-lg overflow-hidden`}
          >
            {/* Featured badge */}
            {formula.featured && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full">
                Recommandé
              </div>
            )}

            {/* Gradient overlay */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${formula.color} opacity-10 blur-3xl`}></div>

            <div className="relative">
              {/* Header */}
              <div className="mb-4">
                <h3 className="mb-1">{formula.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl">{formula.price}€</span>
                  <span className="text-sm text-muted-foreground">/mois</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rendement estimé</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{formula.return}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Niveau de risque</p>
                  <Progress value={formula.risk} className="h-2" />
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {formula.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full bg-gradient-to-r ${formula.color} text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all`}
              >
                Choisir cette formule
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info footer */}
      <div className="px-6 mt-8 pb-6">
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 Vous pouvez changer de formule à tout moment. Les performances passées ne garantissent pas les résultats futurs.
          </p>
        </div>
      </div>
    </div>
  );
}
