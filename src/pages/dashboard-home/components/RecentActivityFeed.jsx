import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'wire_transfer':
        return 'ArrowUpRight';
      case 'recommendation':
        return 'Brain';
      case 'trade':
        return 'TrendingUp';
      case 'system':
        return 'Settings';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'wire_transfer':
        return 'text-warning';
      case 'recommendation':
        return 'text-accent';
      case 'trade':
        return 'text-success';
      case 'system':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'wire_transfer':
        return 'bg-warning/10';
      case 'recommendation':
        return 'bg-accent/10';
      case 'trade':
        return 'bg-success/10';
      case 'system':
        return 'bg-muted/50';
      default:
        return 'bg-muted/50';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl shadow-custom-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground">
            Activité récente
          </h3>
          <button className="text-sm text-accent hover:text-accent/80 font-body font-body-medium transition-colors duration-200">
            Voir tout
          </button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={index} className="p-4 hover:bg-muted/20 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getActivityBgColor(activity?.type)} ${getActivityColor(activity?.type)} flex-shrink-0`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-body font-body-medium text-foreground mb-1">
                      {activity?.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {activity?.description}
                    </p>
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-3">
                    {activity?.amount && (
                      <p className={`text-sm font-data font-data-medium mb-1 ${
                        activity?.amount > 0 ? 'text-success' : 'text-error'
                      }`}>
                        {activity?.amount > 0 ? '+' : ''}{formatCurrency(activity?.amount)}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formatTime(activity?.timestamp)}
                    </p>
                  </div>
                </div>
                
                {activity?.status && (
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body font-body-medium ${
                      activity?.status === 'completed' 
                        ? 'bg-success/10 text-success'
                        : activity?.status === 'pending' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
                    }`}>
                      {activity?.status === 'completed' && 'Terminé'}
                      {activity?.status === 'pending' && 'En attente'}
                      {activity?.status === 'failed' && 'Échoué'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;