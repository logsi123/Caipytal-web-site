import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, onClick, to, variant = 'default' }) => {
  const baseClasses = "bg-surface border border-border rounded-xl p-6 shadow-custom-sm hover:shadow-custom-md transition-all duration-200 micro-feedback cursor-pointer group";
  
  const variantClasses = {
    default: "hover:border-accent/30",
    primary: "bg-accent/5 border-accent/20 hover:border-accent/40",
    success: "bg-success/5 border-success/20 hover:border-success/40"
  };

  const iconColors = {
    default: "text-muted-foreground group-hover:text-accent",
    primary: "text-accent",
    success: "text-success"
  };

  const content = (
    <div className={`${baseClasses} ${variantClasses?.[variant]}`}>
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg bg-muted/50 ${iconColors?.[variant]} transition-colors duration-200`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <Icon 
          name="ArrowRight" 
          size={20} 
          className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" 
        />
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      {content}
    </div>
  );
};

export default QuickActionCard;