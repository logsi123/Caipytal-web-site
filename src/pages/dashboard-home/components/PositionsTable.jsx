import React from 'react';
import Icon from '../../../components/AppIcon';

const PositionsTable = ({ positions }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatPercentage = (percentage) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage?.toFixed(2)}%`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl shadow-custom-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground">
            Positions actuelles
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Mis à jour il y a 2 min</span>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 text-sm font-body font-body-medium text-muted-foreground">
                Actif
              </th>
              <th className="text-right p-4 text-sm font-body font-body-medium text-muted-foreground">
                Quantité
              </th>
              <th className="text-right p-4 text-sm font-body font-body-medium text-muted-foreground">
                Prix moyen
              </th>
              <th className="text-right p-4 text-sm font-body font-body-medium text-muted-foreground">
                Valeur actuelle
              </th>
              <th className="text-right p-4 text-sm font-body font-body-medium text-muted-foreground">
                P&L
              </th>
              <th className="text-right p-4 text-sm font-body font-body-medium text-muted-foreground">
                Performance
              </th>
            </tr>
          </thead>
          <tbody>
            {positions?.map((position, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/20 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-heading font-heading-bold text-accent">
                        {position?.symbol?.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-body font-body-medium text-foreground">
                        {position?.symbol}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {position?.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-data text-foreground">
                  {position?.quantity}
                </td>
                <td className="p-4 text-right font-data text-foreground">
                  {formatCurrency(position?.avgPrice)}
                </td>
                <td className="p-4 text-right font-data text-foreground">
                  {formatCurrency(position?.currentValue)}
                </td>
                <td className={`p-4 text-right font-data ${
                  position?.pnl >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {formatCurrency(position?.pnl)}
                </td>
                <td className="p-4 text-right">
                  <div className={`flex items-center justify-end space-x-1 ${
                    position?.performance >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={position?.performance >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                    />
                    <span className="font-body font-body-medium text-sm">
                      {formatPercentage(position?.performance)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {positions?.map((position, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-heading font-heading-bold text-accent">
                    {position?.symbol?.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-body font-body-medium text-foreground">
                    {position?.symbol}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {position?.name}
                  </div>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${
                position?.performance >= 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={position?.performance >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span className="font-body font-body-medium text-sm">
                  {formatPercentage(position?.performance)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Quantité</div>
                <div className="font-data text-foreground">{position?.quantity}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Prix moyen</div>
                <div className="font-data text-foreground">{formatCurrency(position?.avgPrice)}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Valeur actuelle</div>
                <div className="font-data text-foreground">{formatCurrency(position?.currentValue)}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">P&L</div>
                <div className={`font-data ${position?.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatCurrency(position?.pnl)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionsTable;