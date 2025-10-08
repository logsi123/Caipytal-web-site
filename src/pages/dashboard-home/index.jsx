import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedLayout from '../../components/ui/AuthenticatedLayout';
import PortfolioSummaryCard from './components/PortfolioSummaryCard';
import PortfolioChart from './components/PortfolioChart';
import AllocationChart from './components/AllocationChart';
import QuickActionCard from './components/QuickActionCard';
import PositionsTable from './components/PositionsTable';
import RecentActivityFeed from './components/RecentActivityFeed';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [isWireTransferOpen, setIsWireTransferOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    id: "user_123"
  };

  // Mock portfolio summary data
  const portfolioSummary = [
    {
      title: "Valeur totale du portefeuille",
      value: 125847.32,
      change: 2847.12,
      changePercentage: 2.31,
      isPositive: true,
      icon: "TrendingUp"
    },
    {
      title: "Liquidités disponibles",
      value: 8420.50,
      change: -150.00,
      changePercentage: -1.75,
      isPositive: false,
      icon: "Wallet"
    },
    {
      title: "Gain/Perte du jour",
      value: 1247.85,
      change: 1247.85,
      changePercentage: 1.01,
      isPositive: true,
      icon: "Calendar"
    },
    {
      title: "Performance totale",
      value: 15847.32,
      change: 15847.32,
      changePercentage: 14.42,
      isPositive: true,
      icon: "Target"
    }
  ];

  // Mock chart data for portfolio evolution
  const chartData = [
    { date: '01/10', value: 122000 },
    { date: '02/10', value: 123500 },
    { date: '03/10', value: 121800 },
    { date: '04/10', value: 124200 },
    { date: '05/10', value: 125847 },
    { date: '06/10', value: 125847 }
  ];

  // Mock allocation data
  const allocationData = [
    { name: 'Actions', value: 75508.39, percentage: 60 },
    { name: 'Obligations', value: 25169.46, percentage: 20 },
    { name: 'ETF', value: 12584.73, percentage: 10 },
    { name: 'Crypto', value: 6292.37, percentage: 5 },
    { name: 'Liquidités', value: 6292.37, percentage: 5 }
  ];

  // Mock positions data
  const positions = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 50,
      avgPrice: 150.25,
      currentValue: 8750.00,
      pnl: 1237.50,
      performance: 16.47
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 30,
      avgPrice: 280.50,
      currentValue: 9150.00,
      pnl: 735.00,
      performance: 8.74
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 25,
      avgPrice: 2650.00,
      currentValue: 68750.00,
      pnl: 2500.00,
      performance: 3.77
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      quantity: 40,
      avgPrice: 220.75,
      currentValue: 8200.00,
      pnl: -630.00,
      performance: -7.14
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      quantity: 20,
      avgPrice: 3200.00,
      currentValue: 66000.00,
      pnl: 2000.00,
      performance: 3.13
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      type: 'recommendation',
      title: 'Nouvelle recommandation IA',
      description: 'Achat recommandé: NVDA - Secteur technologique en croissance',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'pending'
    },
    {
      type: 'wire_transfer',
      title: 'Virement sortant',
      description: 'Vers compte IBAN FR76****7890 - Marie Dubois',
      amount: -2500.00,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'completed'
    },
    {
      type: 'trade',
      title: 'Ordre exécuté',
      description: 'Achat de 10 actions AAPL à 175.50€',
      amount: -1755.00,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'completed'
    },
    {
      type: 'recommendation',
      title: 'Recommandation suivie',
      description: 'Vente de 25 actions TSLA selon recommandation IA',
      amount: 5500.00,
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      status: 'completed'
    },
    {
      type: 'system',
      title: 'Mise à jour du portefeuille',
      description: 'Rééquilibrage automatique effectué selon votre profil de risque',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      status: 'completed'
    }
  ];

  const handleWireTransferClick = () => {
    setIsWireTransferOpen(true);
  };

  const handleQuickActionClick = (action) => {
    switch (action) {
      case 'recommendations': navigate('/ai-recommendations-chat');
        break;
      case 'assistant': navigate('/technical-assistant-chat');
        break;
      case 'portfolio': navigate('/portfolio-management');
        break;
      default:
        break;
    }
  };

  return (
    <AuthenticatedLayout user={user}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-heading-bold mb-2">
                  Bonjour, {user?.name?.split(' ')?.[0]} 👋
                </h1>
                <p className="text-white/80 text-lg">
                  Voici un aperçu de votre portefeuille d'investissement
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm mb-1">Dernière mise à jour</p>
                <p className="text-white font-data">
                  {new Date()?.toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioSummary?.map((item, index) => (
              <PortfolioSummaryCard
                key={index}
                title={item?.title}
                value={item?.value}
                change={item?.change}
                changePercentage={item?.changePercentage}
                isPositive={item?.isPositive}
                icon={item?.icon}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PortfolioChart data={chartData} />
            <AllocationChart data={allocationData} />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickActionCard
              title="Recommandations IA"
              description="Obtenez des conseils d'investissement personnalisés basés sur l'analyse de marché"
              icon="Brain"
              variant="primary"
              onClick={() => handleQuickActionClick('recommendations')}
            />
            <QuickActionCard
              title="Effectuer un virement"
              description="Transférez des fonds vers votre compte bancaire ou vers un tiers"
              icon="ArrowUpRight"
              variant="success"
              onClick={handleWireTransferClick}
            />
            <QuickActionCard
              title="Assistant technique"
              description="Posez vos questions sur la plateforme et obtenez de l'aide instantanée"
              icon="HelpCircle"
              onClick={() => handleQuickActionClick('assistant')}
            />
          </div>

          {/* Positions and Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <PositionsTable positions={positions} />
            </div>
            <div className="xl:col-span-1">
              <RecentActivityFeed activities={recentActivities} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DashboardHome;