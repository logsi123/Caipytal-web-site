import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatMessage = ({ message, isTyping = false }) => {
  const isUser = message?.sender === 'user';
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="HelpCircle" size={16} className="text-accent-foreground" />
        </div>
        <div className="flex-1">
          <div className="bg-surface border border-border rounded-2xl rounded-tl-sm p-4 shadow-custom-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-muted-foreground">Assistant écrit...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-accent text-accent-foreground'
      }`}>
        <Icon 
          name={isUser ? 'User' : 'HelpCircle'} 
          size={16} 
        />
      </div>
      <div className="flex-1 max-w-[80%]">
        <div className={`rounded-2xl p-4 shadow-custom-sm ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-tr-sm' 
            : 'bg-surface border border-border rounded-tl-sm'
        }`}>
          <div className="space-y-3">
            {message?.content && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message?.content}
              </p>
            )}
            
            {message?.steps && (
              <div className="space-y-2">
                <p className="text-sm font-body font-body-medium">Étapes à suivre :</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {message?.steps?.map((step, index) => (
                    <li key={index} className="leading-relaxed">{step}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {message?.screenshot && (
              <div className="mt-3">
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <Image
                    src={message?.screenshot}
                    alt="Capture d'écran d'aide"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            
            {message?.links && message?.links?.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-body font-body-medium">Liens utiles :</p>
                <div className="space-y-1">
                  {message?.links?.map((link, index) => (
                    <a
                      key={index}
                      href={link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-accent hover:text-accent/80 transition-colors duration-200"
                    >
                      <Icon name="ExternalLink" size={14} />
                      <span>{link?.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {message?.quickReplies && message?.quickReplies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message?.quickReplies?.map((reply, index) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors duration-200"
                    onClick={() => message?.onQuickReply?.(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className={`flex items-center mt-2 text-xs text-muted-foreground ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span>{formatTimestamp(message?.timestamp)}</span>
          {message?.category && !isUser && (
            <>
              <span className="mx-2">•</span>
              <span className="px-2 py-0.5 bg-muted rounded-full">
                {message?.category}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;