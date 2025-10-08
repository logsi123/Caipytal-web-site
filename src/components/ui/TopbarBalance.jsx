import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const TopbarBalance = ({ user, onWireTransferClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock balance data - in real app this would come from props or context
  const balanceData = {
    totalBalance: 125847.32,
    currency: 'EUR',
    changeAmount: 2847.12,
    changePercentage: 2.31,
    isPositive: true,
    lastUpdated: new Date()?.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatChange = (amount, percentage, isPositive) => {
    const sign = isPositive ? '+' : '-';
    const formattedAmount = formatCurrency(Math.abs(amount));
    const formattedPercentage = Math.abs(percentage)?.toFixed(2);
    return `${sign}${formattedAmount} (${sign}${formattedPercentage}%)`;
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 bg-surface/95 backdrop-blur-md border-b border-border z-200 transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Menu principal"
          >
            <Icon name="Menu" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Balance Display */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="font-data font-data-medium text-2xl lg:text-3xl text-foreground">
                {formatCurrency(balanceData?.totalBalance)}
              </span>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-body font-body-medium ${
                balanceData?.isPositive 
                  ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                <Icon 
                  name={balanceData?.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>
                  {formatChange(balanceData?.changeAmount, balanceData?.changePercentage, balanceData?.isPositive)}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Mis à jour à {balanceData?.lastUpdated}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowUpRight"
            iconPosition="left"
            onClick={onWireTransferClick}
            className="hidden sm:flex"
          >
            Virement
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            iconName="ArrowUpRight"
            onClick={onWireTransferClick}
            className="sm:hidden"
            aria-label="Effectuer un virement"
          />

          <Button
            variant="ghost"
            size="icon"
            iconName="Bell"
            className="relative"
            aria-label="Notifications"
          >
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              iconPosition="left"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hidden lg:flex"
            >
              {user?.name || 'Utilisateur'}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              iconName="User"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
              aria-label="Menu utilisateur"
            />

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-xl shadow-custom-lg z-300">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm font-body font-body-medium text-popover-foreground border-b border-border mb-2">
                    {user?.email || 'user@example.com'}
                  </div>
                  <button className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Paramètres</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Aide</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                    <Icon name="LogOut" size={16} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopbarBalance;