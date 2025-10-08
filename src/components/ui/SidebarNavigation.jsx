import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarNavigation = ({ isCollapsed = false, onToggleCollapse, isMobile = false }) => {
  const location = useLocation();

  const navigationItems = [
    {
      path: '/dashboard-home',
      label: 'Accueil',
      icon: 'Home',
      description: 'Vue d\'ensemble du portefeuille'
    },
    {
      path: '/ai-recommendations-chat',
      label: 'Recommandations IA',
      icon: 'Brain',
      description: 'Conseils d\'investissement personnalisés'
    },
    {
      path: '/portfolio-management',
      label: 'Portefeuille',
      icon: 'TrendingUp',
      description: 'Gestion et analyse des positions'
    },
    {
      path: '/technical-assistant-chat',
      label: 'Assistant',
      icon: 'HelpCircle',
      description: 'Support technique et aide'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  if (isMobile) {
    return (
      <nav className="bg-surface border-t border-border shadow-custom-lg">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                isActiveRoute(item?.path)
                  ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className="mb-1"
              />
              <span className="text-xs font-caption font-body-normal leading-tight">
                {item?.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 h-full bg-surface border-r border-border shadow-custom-md z-100 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-60'
    } hidden lg:block`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className={`flex items-center p-4 border-b border-border ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-heading-bold text-sm">C</span>
            </div>
            {!isCollapsed && (
              <span className="font-heading font-heading-bold text-xl text-foreground">
                Caipytal
              </span>
            )}
          </div>
          {!isCollapsed && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors duration-200"
              aria-label="Réduire la navigation"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group flex items-center p-3 rounded-xl transition-all duration-200 micro-feedback ${
                isActiveRoute(item?.path)
                  ? 'bg-accent text-accent-foreground shadow-custom-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item?.description : undefined}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                  isActiveRoute(item?.path) ? 'text-accent-foreground' : ''
                }`}
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-body font-body-medium text-sm">
                    {item?.label}
                  </div>
                  <div className="text-xs text-current opacity-70 truncate">
                    {item?.description}
                  </div>
                </div>
              )}
              {!isCollapsed && isActiveRoute(item?.path) && (
                <div className="w-2 h-2 bg-accent-foreground rounded-full opacity-60" />
              )}
            </Link>
          ))}
        </nav>

        {/* Collapse Toggle for Expanded State */}
        {isCollapsed && onToggleCollapse && (
          <div className="p-4 border-t border-border">
            <button
              onClick={onToggleCollapse}
              className="w-full p-3 rounded-xl hover:bg-muted transition-colors duration-200 flex items-center justify-center"
              aria-label="Étendre la navigation"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarNavigation;