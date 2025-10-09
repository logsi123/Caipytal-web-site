import { motion } from "motion/react";
import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from "recharts";

const filters = ["Jour", "Semaine", "Mois", "Année"];

const mockData = {
  Jour: [
    { time: "9h", value: 12400 },
    { time: "11h", value: 12420 },
    { time: "13h", value: 12410 },
    { time: "15h", value: 12450 },
    { time: "17h", value: 12486 },
  ],
  Semaine: [
    { time: "Lun", value: 12200 },
    { time: "Mar", value: 12300 },
    { time: "Mer", value: 12250 },
    { time: "Jeu", value: 12400 },
    { time: "Ven", value: 12486 },
  ],
  Mois: [
    { time: "S1", value: 11800 },
    { time: "S2", value: 12000 },
    { time: "S3", value: 12200 },
    { time: "S4", value: 12486 },
  ],
  Année: [
    { time: "Jan", value: 10000 },
    { time: "Mar", value: 10500 },
    { time: "Mai", value: 11000 },
    { time: "Jul", value: 11500 },
    { time: "Sep", value: 12000 },
    { time: "Oct", value: 12486 },
  ],
};

const transactions = [
  {
    type: "gain",
    title: "Dividende Apple Inc.",
    amount: "+24,50 €",
    date: "9 Oct 2025",
    time: "14:32",
  },
  {
    type: "gain",
    title: "Plus-value Amazon",
    amount: "+156,80 €",
    date: "8 Oct 2025",
    time: "11:20",
  },
  {
    type: "neutral",
    title: "Rééquilibrage automatique",
    amount: "—",
    date: "8 Oct 2025",
    time: "09:00",
  },
  {
    type: "gain",
    title: "Dividende Microsoft",
    amount: "+18,30 €",
    date: "7 Oct 2025",
    time: "16:45",
  },
  {
    type: "loss",
    title: "Ajustement position Tesla",
    amount: "-42,10 €",
    date: "6 Oct 2025",
    time: "10:15",
  },
  {
    type: "gain",
    title: "Gain mensuel Octobre",
    amount: "+485,20 €",
    date: "5 Oct 2025",
    time: "00:01",
  },
];

export function HistoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("Mois");
  const chartData = mockData[selectedFilter as keyof typeof mockData];

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a0e27] via-[#141b3d] to-[#1e2749] px-6 pt-12 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl text-white mb-1">Historique</h1>
          <p className="text-[#c5cee0] text-sm">Suivez l'évolution de votre portefeuille</p>
        </motion.div>
      </div>

      <div className="px-6 mt-6">
        {/* Filter tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                  : "bg-accent text-foreground hover:bg-accent/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Performance chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white dark:bg-[#1a1f3a] rounded-2xl p-6 shadow-lg mb-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Performance</p>
              <h2 className="text-3xl">+5,82%</h2>
            </div>
            <div className="bg-green-500/10 px-3 py-1.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500">+686,00 €</span>
            </div>
          </div>

          <div className="h-48 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Plus haut</p>
              <p className="text-sm">12 486 €</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Plus bas</p>
              <p className="text-sm">11 800 €</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Moyenne</p>
              <p className="text-sm">12 122 €</p>
            </div>
          </div>
        </motion.div>

        {/* Transaction history */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="mb-4">Transactions récentes</h3>
          <div className="space-y-3 pb-6">
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                className="bg-white dark:bg-[#1a1f3a] border border-border rounded-xl p-4 flex items-center gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transaction.type === "gain"
                      ? "bg-green-500/10"
                      : transaction.type === "loss"
                      ? "bg-red-500/10"
                      : "bg-blue-500/10"
                  }`}
                >
                  {transaction.type === "gain" ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : transaction.type === "loss" ? (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm mb-0.5 truncate">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date} • {transaction.time}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    transaction.type === "gain"
                      ? "text-green-500"
                      : transaction.type === "loss"
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {transaction.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
