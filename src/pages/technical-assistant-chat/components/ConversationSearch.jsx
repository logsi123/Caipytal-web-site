import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ConversationSearch = ({ conversations, onSearchResults, isVisible }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery?.trim()) {
      setSearchResults([]);
      onSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    const searchTimeout = setTimeout(() => {
      const results = conversations?.filter(conversation => {
        const query = searchQuery?.toLowerCase();
        return (conversation?.title?.toLowerCase()?.includes(query) ||
        conversation?.messages?.some(message => 
          message?.content?.toLowerCase()?.includes(query)
        ) || conversation?.category?.toLowerCase()?.includes(query));
      });

      setSearchResults(results);
      onSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, conversations, onSearchResults]);

  const highlightText = (text, query) => {
    if (!query?.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-accent/20 text-accent px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="border-b border-border bg-surface p-4 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Rechercher dans vos conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon 
            name={isSearching ? "Loader2" : "Search"} 
            size={16} 
            className={`text-muted-foreground ${isSearching ? 'animate-spin' : ''}`} 
          />
        </div>
      </div>
      {/* Search Results */}
      {searchQuery?.trim() && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-body font-body-medium text-foreground">
              Résultats de recherche
            </p>
            <span className="text-xs text-muted-foreground">
              {searchResults?.length} conversation{searchResults?.length !== 1 ? 's' : ''} trouvée{searchResults?.length !== 1 ? 's' : ''}
            </span>
          </div>

          {searchResults?.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {searchResults?.map((conversation) => (
                <div
                  key={conversation?.id}
                  className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    // Handle conversation selection
                    console.log('Selected conversation:', conversation?.id);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-body font-body-medium text-foreground">
                      {highlightText(conversation?.title || 'Conversation sans titre', searchQuery)}
                    </h4>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatDate(conversation?.lastMessage)}
                    </span>
                  </div>
                  
                  {conversation?.category && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-full">
                        {conversation?.category}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {highlightText(
                      conversation?.preview || 'Aucun aperçu disponible',
                      searchQuery
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Aucune conversation trouvée pour "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversationSearch;