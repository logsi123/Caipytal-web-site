import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const suggestedPrompts = [
    "Analysez mon portefeuille",
    "Actions tech prometteuses",
    "Stratégie défensive",
    "Opportunités sectorielles",
    "Diversification géographique"
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handlePromptClick = (prompt) => {
    if (!isLoading) {
      onSendMessage(prompt);
    }
  };

  return (
    <div className="border-t border-border bg-surface/95 backdrop-blur-md">
      {/* Suggested Prompts */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts?.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(prompt)}
              disabled={isLoading}
              className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed micro-feedback"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="px-6 pb-6">
        <div className="relative bg-background border border-border rounded-2xl shadow-custom-sm">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question sur les investissements..."
            disabled={isLoading}
            className="w-full px-4 py-3 pr-12 bg-transparent border-none outline-none resize-none text-sm text-foreground placeholder-muted-foreground min-h-[48px] max-h-[120px]"
            rows={1}
          />
          
          {/* Send Button */}
          <div className="absolute right-2 bottom-2">
            <Button
              type="submit"
              variant="default"
              size="icon"
              iconName="Send"
              disabled={!message?.trim() || isLoading}
              loading={isLoading}
              aria-label="Envoyer le message"
            />
          </div>
        </div>

        {/* Input Helper Text */}
        <div className="flex items-center justify-between mt-2 px-2">
          <p className="text-xs text-muted-foreground">
            Appuyez sur Entrée pour envoyer, Maj+Entrée pour une nouvelle ligne
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={12} />
            <span>IA activée</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;