import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PositionsTable = ({ positions, onTradeClick, onAnalyzeClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'marketValue', direction: 'desc' });
  const [filterType, setFilterType] = useState('all');

  const filterTypes = [
    { key: 'all', label: 'Toutes' },
    { key: 'stocks', label: 'Actions' },
    { key: 'bonds', label: 'Obligations' },
    { key: 'etf', label: 'ETF' },
    { key: 'crypto', label: 'Crypto' }
  ];

  const filteredAndSortedPositions = useMemo(() => {
    let filtered = positions?.filter(position => {
      const matchesSearch = position?.symbol?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           position?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesFilter = filterType === 'all' || position?.type === filterType;
      return matchesSearch && matchesFilter;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }
        
        if (aValue < bValue) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [positions, searchTerm, sortConfig, filterType]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    const isPositive = value >= 0;
    return (
      <span className={`flex items-center space-x-1 ${
        isPositive ? 'text-success' : 'text-error'
      }`}>
        <Icon 
          name={isPositive ? 'ArrowUp' : 'ArrowDown'} 
          size={12} 
        />
        <span>{Math.abs(value)?.toFixed(2)}%</span>
      </span>
    );
  };

  const SortableHeader = ({ label, sortKey }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-body font-body-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-200"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <div className="flex flex-col">
          <Icon 
            name="ChevronUp" 
            size={12} 
            className={`${
              sortConfig?.key === sortKey && sortConfig?.direction === 'asc' ?'text-accent' :'text-muted-foreground/50'
            }`}
          />
          <Icon 
            name="ChevronDown" 
            size={12} 
            className={`-mt-1 ${
              sortConfig?.key === sortKey && sortConfig?.direction === 'desc' ?'text-accent' :'text-muted-foreground/50'
            }`}
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-surface rounded-xl border border-border shadow-custom-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-heading font-heading-semibold text-foreground">
            Positions ({filteredAndSortedPositions?.length})
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {filterTypes?.map((type) => (
                <Button
                  key={type?.key}
                  variant={filterType === type?.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType(type?.key)}
                  className="text-xs"
                >
                  {type?.label}
                </Button>
              ))}
            </div>
            
            <div className="w-full sm:w-64">
              <Input
                type="search"
                placeholder="Rechercher une position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <SortableHeader label="Symbole" sortKey="symbol" />
              <SortableHeader label="Quantité" sortKey="quantity" />
              <SortableHeader label="Prix" sortKey="currentPrice" />
              <SortableHeader label="Valeur" sortKey="marketValue" />
              <SortableHeader label="P&L" sortKey="unrealizedPL" />
              <SortableHeader label="Allocation" sortKey="allocation" />
              <th className="px-4 py-3 text-right text-xs font-body font-body-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedPositions?.map((position) => (
              <tr key={position?.symbol} className="hover:bg-muted/30 transition-colors duration-200">
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-body font-body-bold text-accent">
                        {position?.symbol?.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-body font-body-semibold text-foreground">
                        {position?.symbol}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-32">
                        {position?.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-data text-foreground">
                  {position?.quantity?.toLocaleString('fr-FR')}
                </td>
                <td className="px-4 py-4 text-sm font-data text-foreground">
                  {formatCurrency(position?.currentPrice)}
                </td>
                <td className="px-4 py-4 text-sm font-data font-data-medium text-foreground">
                  {formatCurrency(position?.marketValue)}
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="text-sm font-data font-data-medium">
                      {formatCurrency(position?.unrealizedPL)}
                    </div>
                    <div className="text-xs">
                      {formatPercentage(position?.unrealizedPLPercent)}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-data text-foreground">
                      {position?.allocation?.toFixed(1)}%
                    </div>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(position?.allocation, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="TrendingUp"
                      onClick={() => onAnalyzeClick(position)}
                      aria-label="Analyser"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ArrowUpDown"
                      onClick={() => onTradeClick(position)}
                    >
                      Trader
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {filteredAndSortedPositions?.map((position) => (
          <div key={position?.symbol} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-body font-body-bold text-accent">
                    {position?.symbol?.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-body font-body-semibold text-foreground">
                    {position?.symbol}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {position?.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-data font-data-medium text-foreground">
                  {formatCurrency(position?.marketValue)}
                </div>
                <div className="text-xs">
                  {formatPercentage(position?.unrealizedPLPercent)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Quantité:</span>
                <span className="ml-2 font-data text-foreground">
                  {position?.quantity?.toLocaleString('fr-FR')}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Prix:</span>
                <span className="ml-2 font-data text-foreground">
                  {formatCurrency(position?.currentPrice)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">P&L:</span>
                <span className="ml-2 font-data text-foreground">
                  {formatCurrency(position?.unrealizedPL)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Allocation:</span>
                <span className="ml-2 font-data text-foreground">
                  {position?.allocation?.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="TrendingUp"
                onClick={() => onAnalyzeClick(position)}
              >
                Analyser
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowUpDown"
                onClick={() => onTradeClick(position)}
              >
                Trader
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedPositions?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-heading-medium text-foreground mb-2">
            Aucune position trouvée
          </h3>
          <p className="text-sm text-muted-foreground">
            Essayez de modifier vos critères de recherche ou de filtrage.
          </p>
        </div>
      )}
    </div>
  );
};

export default PositionsTable;