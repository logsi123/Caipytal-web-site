import { motion } from "motion/react";
import { Bot, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

const recommendations = [
  {
    type: "opportunity",
    icon: Sparkles,
    title: "Nouvelle opportunité détectée",
    message: "Le secteur technologique montre des signaux d'achat intéressants. Recommandation : augmenter l'exposition de 5%.",
    time: "Il y a 2h",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "rebalance",
    icon: TrendingUp,
    title: "Rééquilibrage suggéré",
    message: "Votre portefeuille s'écarte de l'allocation cible. Je recommande de réduire les actions (+8%) et d'augmenter les obligations.",
    time: "Il y a 5h",
    color: "from-green-500 to-emerald-500",
  },
  {
    type: "alert",
    icon: AlertCircle,
    title: "Attention au marché",
    message: "Volatilité accrue détectée sur vos positions énergétiques. Envisagez de sécuriser une partie des gains (+12%).",
    time: "Hier",
    color: "from-orange-500 to-red-500",
  },
];

export function AIPage() {
  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#1e2749] px-6 pt-12 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-[#c5cee0] rounded-2xl blur-md"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-br from-[#c5cee0] to-[#8b95b0] w-12 h-12 rounded-2xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#0a0e27]" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl text-white">Assistant IA</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-[#c5cee0]">En ligne</span>
              </div>
            </div>
          </div>
          <p className="text-[#c5cee0] text-sm mt-2">Conseils personnalisés pour optimiser vos investissements</p>
        </motion.div>
      </div>

      <div className="px-6 mt-6">
        {/* AI Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-white">Analyse du jour</h3>
              <p className="text-sm text-white/90">
                Votre portefeuille performe 2,3% au-dessus de la moyenne du marché. Excellente diversification !
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-xs text-white/70 mb-1">Score IA</p>
              <p className="text-xl text-white">8.5/10</p>
            </div>
            <div>
              <p className="text-xs text-white/70 mb-1">Risque</p>
              <p className="text-xl text-white">Modéré</p>
            </div>
            <div>
              <p className="text-xs text-white/70 mb-1">Actions</p>
              <p className="text-xl text-white">3</p>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="mb-4">Recommandations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-[#1a1f3a] border border-border rounded-xl p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className={`bg-gradient-to-br ${rec.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <rec.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 text-sm">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{rec.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{rec.time}</span>
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                        Voir les détails →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6"
        >
          <div className="bg-white dark:bg-[#1a1f3a] border border-border rounded-xl p-4 shadow-sm">
            <p className="text-sm mb-3">Posez une question à l'IA</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: Comment optimiser mon portefeuille ?"
                className="flex-1 bg-accent px-4 py-2 rounded-lg text-sm outline-none"
              />
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                Envoyer
              </button>
            </div>
          </div>
        </motion.div>

        {/* Suggested questions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 pb-6"
        >
          <p className="text-xs text-muted-foreground mb-3">Questions fréquentes</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Quel est mon niveau de risque ?",
              "Quand vendre mes actions ?",
              "Comment améliorer ma diversification ?",
            ].map((question, i) => (
              <button
                key={i}
                className="bg-accent hover:bg-accent/80 px-3 py-2 rounded-lg text-xs transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
