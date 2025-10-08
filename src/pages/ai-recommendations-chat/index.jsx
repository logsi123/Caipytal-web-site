import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '../../components/ui/AuthenticatedLayout';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeMessage from './components/WelcomeMessage';

const AIRecommendationsChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock user data
  const mockUser = {
    name: "Marie Dubois",
    email: "marie.dubois@email.com"
  };

  // Mock AI responses with recommendations
  const mockAIResponses = [
    {
      content: `Basé sur l'analyse de votre portefeuille et les conditions actuelles du marché, voici mes recommandations personnalisées :`,
      recommendations: [
        {
          symbol: 'AAPL',
          companyName: 'Apple Inc.',
          exchange: 'NASDAQ',
          action: 'Acheter',
          currentPrice: 175.43,
          targetPrice: 195.00,
          potentialReturn: 11.16,
          riskLevel: 'Modéré',
          confidenceLevel: 4,
          reasoning: `Apple présente une valorisation attractive avec un P/E de 28.5x, inférieur à sa moyenne historique. Les ventes d'iPhone 15 dépassent les attentes et les services continuent leur croissance à deux chiffres. La position de trésorerie solide et les rachats d'actions soutiennent le cours.`,
          metrics: {
            'P/E': 28.5,
            'ROE': 15.2,
            'Marge': 23.8
          }
        },
        {
          symbol: 'MSFT',
          companyName: 'Microsoft Corporation',
          exchange: 'NASDAQ',
          action: 'Conserver',
          currentPrice: 378.85,
          targetPrice: 385.00,
          potentialReturn: 1.62,
          riskLevel: 'Faible',
          confidenceLevel: 5,
          reasoning: `Microsoft maintient sa position dominante dans le cloud avec Azure qui croît de 29% en glissement annuel. L'intégration de l'IA dans ses produits Office et la stabilité des revenus récurrents justifient une position de conservation.`,
          metrics: {
            'P/E': 32.1,
            'ROE': 18.7,
            'Marge': 31.2
          }
        }
      ]
    },
    {
      content: `Voici une analyse sectorielle basée sur les tendances actuelles du marché :`,
      recommendations: [
        {
          symbol: 'NVDA',
          companyName: 'NVIDIA Corporation',
          exchange: 'NASDAQ',
          action: 'Acheter',
          currentPrice: 455.32,
          targetPrice: 520.00,
          potentialReturn: 14.21,
          riskLevel: 'Élevé',
          confidenceLevel: 4,
          reasoning: `NVIDIA bénéficie de la révolution de l'IA avec une demande explosive pour ses puces H100. Les revenus du datacenter ont augmenté de 206% en glissement annuel. Malgré la valorisation élevée, la position monopolistique dans l'IA justifie l'investissement.`,
          metrics: {
            'P/E': 65.8,
            'ROE': 22.3,
            'Croissance': 126.0
          }
        }
      ]
    },
    {
      content: `Pour une stratégie défensive, je recommande une approche diversifiée avec des actifs de qualité :`,
      recommendations: [
        {
          symbol: 'JNJ',
          companyName: 'Johnson & Johnson',
          exchange: 'NYSE',
          action: 'Acheter',
          currentPrice: 155.67,
          targetPrice: 170.00,
          potentialReturn: 9.21,
          riskLevel: 'Faible',
          confidenceLevel: 5,
          reasoning: `J&J offre stabilité et croissance défensive avec un dividende de 3.1% versé depuis 61 ans consécutifs. Le pipeline pharmaceutique robuste et la diversification des activités réduisent les risques sectoriels.`,
          metrics: {
            'Dividende': 3.1,
            'Beta': 0.68,
            'Dette/Cap': 0.45
          }
        }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('portefeuille') || lowerMessage.includes('analyser')) {
      return mockAIResponses[0];
    } else if (lowerMessage.includes('secteur') || lowerMessage.includes('tech')) {
      return mockAIResponses[1];
    } else if (lowerMessage.includes('défensif') || lowerMessage.includes('sûr') || lowerMessage.includes('protéger')) {
      return mockAIResponses[2];
    } else {
      return {
        content: `Merci pour votre question. Basé sur l'analyse des données de marché actuelles, voici ce que je peux vous dire :\n\n${userMessage.includes('diversif') ? 'La diversification géographique est essentielle pour réduire les risques. Je recommande une exposition aux marchés émergents (15-20%) et aux marchés développés européens (25-30%).' : 'Je peux vous aider avec l\'analyse de portefeuille, les recommandations sectorielles, et les stratégies d\'investissement. Pouvez-vous préciser votre question ?'}`,
        recommendations: []
      };
    }
  };

  const handleSendMessage = async (messageText) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageText,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: aiResponse.content,
        recommendations: aiResponse.recommendations,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleClearChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  const handlePromptClick = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleExecuteRecommendation = (recommendation) => {
    console.log('Executing recommendation:', recommendation);
    // In a real app, this would navigate to portfolio management or execute the trade
  };

  const handleSaveRecommendation = (recommendation) => {
    console.log('Saving recommendation:', recommendation);
    // In a real app, this would save to user's saved recommendations
  };

  return (
    <AuthenticatedLayout user={mockUser}>
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
        {/* Chat Header */}
        <ChatHeader 
          onClearChat={handleClearChat}
          messageCount={messages.length}
        />

        {/* Chat Messages Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
        >
          {messages.length === 0 ? (
            <WelcomeMessage onPromptClick={handlePromptClick} />
          ) : (
            <div className="p-6 space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onExecute={handleExecuteRecommendation}
                  onSave={handleSaveRecommendation}
                />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <ChatMessage
                  message={{ sender: 'ai' }}
                  isTyping={true}
                />
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isTyping}
        />
      </div>
    </AuthenticatedLayout>
  );
};

export default AIRecommendationsChat;