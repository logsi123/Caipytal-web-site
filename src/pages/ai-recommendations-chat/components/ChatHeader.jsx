import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onClearChat, messageCount = 0 }) => {
  return (
    <div className="border-b border-border bg-surface/95 backdrop-blur-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Header Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-heading font-heading-semibold text-foreground">
              Assistant IA Investissements
            </h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <p className="text-sm text-muted-foreground">
                En ligne • {messageCount} message{messageCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            iconName="RotateCcw"
            onClick={onClearChat}
            disabled={messageCount === 0}
            aria-label="Effacer la conversation"
          />
          
          <Button
            variant="ghost"
            size="icon"
            iconName="Settings"
            aria-label="Paramètres de l'assistant"
          />
        </div>
      </div>

      {/* AI Capabilities Banner */}
      <div className="mt-4 bg-accent/5 border border-accent/20 rounded-xl p-3">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-body font-body-medium text-foreground">
              Assistant IA spécialisé en investissements
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Analyse de portefeuille • Recommandations personnalisées • Analyse technique • Gestion des risques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;