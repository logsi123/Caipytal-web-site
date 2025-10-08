import React from 'react';
import Icon from '../../../components/AppIcon';
import RecommendationCard from './RecommendationCard';

const ChatMessage = ({ message, isTyping = false }) => {
  const isUser = message?.sender === 'user';
  const isAI = message?.sender === 'ai';

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Brain" size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-surface border border-border rounded-2xl rounded-tl-sm p-4 shadow-custom-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-muted-foreground">L'IA analyse...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-gradient-to-br from-accent to-accent/80 text-white'
      }`}>
        <Icon 
          name={isUser ? 'User' : 'Brain'} 
          size={16} 
        />
      </div>
      {/* Message Content */}
      <div className="flex-1 max-w-3xl">
        <div className={`rounded-2xl p-4 shadow-custom-sm ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-sm' 
            : 'bg-surface border border-border rounded-tl-sm'
        }`}>
          {/* Message Text */}
          {message?.content && (
            <div className={`text-sm leading-relaxed ${
              isUser ? 'text-primary-foreground' : 'text-foreground'
            }`}>
              {message?.content?.split('\n')?.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < message?.content?.split('\n')?.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Recommendation Cards */}
          {message?.recommendations && message?.recommendations?.length > 0 && (
            <div className="mt-4 space-y-3">
              {message?.recommendations?.map((recommendation, index) => (
                <RecommendationCard 
                  key={index} 
                  recommendation={recommendation}
                  onExecute={(action) => console.log('Execute:', action)}
                  onSave={(rec) => console.log('Save:', rec)}
                />
              ))}
            </div>
          )}

          {/* Legal Disclaimer for AI messages */}
          {isAI && message?.recommendations && message?.recommendations?.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Avertissement :</strong> Ces recommandations sont générées par IA à titre informatif uniquement. 
                  Elles ne constituent pas des conseils financiers personnalisés. Consultez un conseiller financier 
                  qualifié avant de prendre des décisions d'investissement.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Timestamp and Status */}
        <div className={`flex items-center mt-2 space-x-2 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(message?.timestamp)}
          </span>
          {isUser && (
            <Icon 
              name={message?.status === 'sent' ? 'Check' : 'Clock'} 
              size={12} 
              className={`${
                message?.status === 'sent' ? 'text-success' : 'text-muted-foreground'
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;