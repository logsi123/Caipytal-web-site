import { motion } from "motion/react";
import { TrendingUp, Zap, History } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const mockChartData = [
  { value: 100 },
  { value: 120 },
  { value: 115 },
  { value: 140 },
  { value: 135 },
  { value: 160 },
  { value: 155 },
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#1e2749] px-6 pt-12 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl text-white mb-1">Bonjour Mathys 👋</h1>
          <p className="text-[#c5cee0] text-sm">Voici votre portefeuille aujourd'hui</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6">
        {/* Portfolio summary card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white dark:bg-[#1a1f3a] rounded-2xl p-6 shadow-xl"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Solde total</p>
              <h2 className="text-3xl">12 485,50 €</h2>
            </div>
            <div className="bg-green-500/10 px-3 py-1.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">+1,8%</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-4">Rendement du jour</p>

          {/* Mini chart */}
          <div className="h-20 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8"
        >
          <h3 className="mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => onNavigate("formulas")}
              className="bg-gradient-to-br from-[#10b981] to-[#059669] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-6 h-6" />
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-xl">→</span>
                </div>
              </div>
              <h4 className="mb-1">Mes Formules</h4>
              <p className="text-sm text-white/80">Gérez vos stratégies d'investissement</p>
            </button>

            <button
              onClick={() => onNavigate("ai")}
              className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm"></div>
                  <div className="relative w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm">AI</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-xl">→</span>
                </div>
              </div>
              <h4 className="mb-1">Recommandations IA</h4>
              <p className="text-sm text-white/80">Conseils personnalisés pour optimiser vos gains</p>
            </button>

            <button
              onClick={() => onNavigate("history")}
              className="bg-white dark:bg-[#1a1f3a] border border-border p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <History className="w-6 h-6" />
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-xl">→</span>
                </div>
              </div>
              <h4 className="mb-1">Historique des gains</h4>
              <p className="text-sm text-muted-foreground">Consultez vos performances passées</p>
            </button>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          <h3 className="mb-4">Activité récente</h3>
          <div className="space-y-3">
            {[
              { label: "Dividende reçu", amount: "+24,50 €", date: "Aujourd'hui" },
              { label: "Rééquilibrage automatique", amount: "—", date: "Hier" },
              { label: "Gain mensuel", amount: "+485,20 €", date: "Il y a 2 jours" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1a1f3a] border border-border p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="text-sm mb-0.5">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className="text-sm text-green-500">{item.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
