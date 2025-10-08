import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() || attachedFile) {
      onSendMessage({
        content: message?.trim(),
        attachment: attachedFile,
        timestamp: new Date()
      });
      setMessage('');
      setAttachedFile(null);
    }
  };

  const handleFileAttach = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file type (images only for screenshots)
      if (file?.type?.startsWith('image/')) {
        setAttachedFile({
          file,
          name: file?.name,
          size: file?.size,
          type: file?.type,
          preview: URL.createObjectURL(file)
        });
      } else {
        alert('Seules les images sont acceptées pour les captures d\'écran.');
      }
    }
  };

  const removeAttachment = () => {
    if (attachedFile?.preview) {
      URL.revokeObjectURL(attachedFile?.preview);
    }
    setAttachedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="border-t border-border bg-surface/95 backdrop-blur-md p-4">
      {/* File Attachment Preview */}
      {attachedFile && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Image" size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-body font-body-medium text-foreground">
                  {attachedFile?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(attachedFile?.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={removeAttachment}
              aria-label="Supprimer la pièce jointe"
            />
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              placeholder="Décrivez votre problème ou posez votre question..."
              className="w-full min-h-[44px] max-h-32 px-4 py-3 bg-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 text-sm"
              disabled={disabled}
              rows={1}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' && !e?.shiftKey) {
                  e?.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            {/* File Attachment Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              iconName="Paperclip"
              onClick={() => fileInputRef?.current?.click()}
              disabled={disabled}
              aria-label="Joindre une capture d'écran"
            />
            
            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="icon"
              iconName="Send"
              disabled={disabled || (!message?.trim() && !attachedFile)}
              aria-label="Envoyer le message"
            />
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileAttach}
          className="hidden"
        />

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {[
            'Je ne trouve pas une fonctionnalité',
            'Problème de connexion',
            'Erreur lors d\'un virement',
            'Question sur les recommandations'
          ]?.map((quickAction, index) => (
            <button
              key={index}
              type="button"
              className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-colors duration-200"
              onClick={() => setMessage(quickAction)}
              disabled={disabled}
            >
              {quickAction}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;