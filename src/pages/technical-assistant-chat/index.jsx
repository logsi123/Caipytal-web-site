import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedLayout from '../../components/ui/AuthenticatedLayout';
import ChatMessage from './components/ChatMessage';
import SuggestedTopics from './components/SuggestedTopics';
import ChatInput from './components/ChatInput';
import ConversationSearch from './components/ConversationSearch';
import KnowledgeBasePreview from './components/KnowledgeBasePreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { sendTechnicalAssistantMessage } from '../../services/aiService';

const TechnicalAssistantChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [conversationCategory, setConversationCategory] = useState(null);
  const messagesEndRef = useRef(null);

  const { user: authUser } = useAuth();
  const user = {
    id: authUser?.id || 1,
    name: authUser?.user_metadata?.full_name || "Utilisateur",
    email: authUser?.email || "user@email.com",
    subscription: "Premium"
  };

  // Mock conversation history for search
  const conversationHistory = [
    {
      id: 1,
      title: "Problème de virement bancaire",
      category: "Virements",
      lastMessage: new Date(Date.now() - 86400000),
      preview: "Mon virement vers mon compte épargne n\'apparaît pas...",
      messages: []
    },
    {
      id: 2,
      title: "Configuration des recommandations IA",
      category: "IA",
      lastMessage: new Date(Date.now() - 172800000),
      preview: "Comment personnaliser les recommandations d\'investissement...",
      messages: []
    },
    {
      id: 3,
      title: "Sécurité du compte",
      category: "Sécurité",
      lastMessage: new Date(Date.now() - 259200000),
      preview: "Activation de l'authentification à deux facteurs...",
      messages: []
    }
  ];

  // Mock knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: 1,
      title: "Guide complet des virements bancaires",
      category: "Virements",
      excerpt: "Apprenez à effectuer des virements en toute sécurité, comprendre les délais et résoudre les problèmes courants.",
      keyPoints: [
        "Validation IBAN automatique",
        "Délais de traitement selon le type",
        "Limites de virement par plan",
        "Procédure d\'annulation"
      ],
      relatedTopics: ["SEPA", "Virement instantané", "Sécurité"],
      readTime: 5,
      difficulty: "Débutant",
      icon: "ArrowUpRight",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      views: 1247,
      likes: 89
    },
    {
      id: 2,
      title: "Optimiser vos recommandations IA",
      category: "Intelligence Artificielle",
      excerpt: "Découvrez comment personnaliser et maximiser l\'efficacité des conseils d\'investissement de notre IA.",
      keyPoints: [
        "Paramétrage du profil de risque",
        "Historique des recommandations",
        "Feedback et apprentissage",
        "Intégration avec votre portefeuille"
      ],
      relatedTopics: ["Profil investisseur", "Analyse technique", "Diversification"],
      readTime: 8,
      difficulty: "Intermédiaire",
      icon: "Brain",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      views: 892,
      likes: 156
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAssistantResponse = async (userMessage) => {
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'assistant')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

      const aiResponse = await sendTechnicalAssistantMessage(
        userMessage?.content,
        conversationHistory
      );

      const response = {
        id: Date.now(),
        sender: 'assistant',
        content: aiResponse.response,
        timestamp: new Date(),
        category: 'Support',
        quickReplies: [
          "En savoir plus",
          "Autre question",
          "Parler à un humain"
        ]
      };

      setIsTyping(false);
      setMessages(prev => [...prev, response]);
      setConversationCategory(response?.category);
      return;
    } catch (error) {
      console.error('Error getting AI response:', error);
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    let response = {
      id: Date.now(),
      sender: 'assistant',
      timestamp: new Date(),
      category: 'Support'
    };

    const messageContent = userMessage?.content?.toLowerCase();
    
    if (messageContent?.includes('virement') || messageContent?.includes('transfer')) {
      response = {
        ...response,
        content: `Je vais vous aider avec votre question sur les virements bancaires.\n\nPour effectuer un virement sur Caipytal, voici la procédure :`,
        steps: [
          "Cliquez sur le bouton 'Virement' dans la barre supérieure",
          "Saisissez l'IBAN du bénéficiaire (validation automatique)",
          "Indiquez le montant et la référence",
          "Vérifiez les informations dans l'écran de confirmation",
          "Confirmez le virement - vous avez 5 secondes pour l'annuler"
        ],
        category: 'Virements',
        screenshot: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
        links: [
          {
            title: "Guide complet des virements",
            url: "#"
          }
        ],
        quickReplies: [
          "Pourquoi mon virement est refusé ?",
          "Combien de temps prend un virement ?",
          "Comment annuler un virement ?"
        ]
      };
    } else if (messageContent?.includes('recommandation') || messageContent?.includes('ia') || messageContent?.includes('conseil')) {
      response = {
        ...response,
        content: `Les recommandations IA de Caipytal analysent votre profil et le marché en temps réel.\n\nVoici comment elles fonctionnent :`,
        steps: [
          "Analyse de votre portefeuille actuel et historique",
          "Évaluation de votre profil de risque et objectifs",
          "Analyse technique et fondamentale des marchés",
          "Génération de recommandations personnalisées",
          "Suivi des performances et ajustements automatiques"
        ],
        category: 'IA',
        links: [
          {
            title: "Guide des recommandations IA",
            url: "#"
          },
          {
            title: "Configurer votre profil de risque",
            url: "#"
          }
        ],
        quickReplies: [
          "Comment personnaliser les conseils ?",
          "Les recommandations sont-elles fiables ?",
          "Puis-je ignorer une recommandation ?"
        ]
      };
    } else if (messageContent?.includes('portefeuille') || messageContent?.includes('portfolio')) {
      response = {
        ...response,
        content: `Votre portefeuille Caipytal vous donne une vue complète de vos investissements.\n\nVoici les principales fonctionnalités :`,
        steps: [
          "Vue d'ensemble avec balance totale et évolution",
          "Graphiques de performance avec différentes périodes",
          "Répartition par secteur et géographie",
          "Tableau détaillé de vos positions avec P&L",
          "Historique des transactions et dividendes"
        ],
        category: 'Portefeuille',
        screenshot: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop",
        quickReplies: [
          "Comment lire les graphiques ?",
          "Que signifie P&L ?",
          "Comment exporter mes données ?"
        ]
      };
    } else if (messageContent?.includes('sécurité') || messageContent?.includes('mot de passe') || messageContent?.includes('compte')) {
      response = {
        ...response,
        content: `La sécurité de votre compte Caipytal est notre priorité absolue.\n\nMesures de sécurité en place :`,
        steps: [
          "Chiffrement AES-256 de toutes vos données",
          "Authentification à deux facteurs (2FA)",
          "Surveillance continue des connexions suspectes",
          "Isolation des fonds sur comptes ségrégués",
          "Conformité RGPD et régulations européennes"
        ],
        category: 'Sécurité',
        links: [
          {
            title: "Guide de sécurité complet",
            url: "#"
          },
          {
            title: "Activer l'authentification 2FA",
            url: "#"
          }
        ],
        quickReplies: [
          "Comment changer mon mot de passe ?",
          "Activer la 2FA",
          "Que faire si je soupçonne une intrusion ?"
        ]
      };
    } else {
      response = {
        ...response,
        content: `Je comprends votre question. Laissez-moi vous aider à trouver la meilleure solution.\n\nEn attendant, voici quelques ressources qui pourraient vous être utiles :`,
        links: [
          {
            title: "Centre d'aide Caipytal",
            url: "#"
          },
          {
            title: "FAQ - Questions fréquentes",
            url: "#"
          },
          {
            title: "Tutoriels vidéo",
            url: "#"
          }
        ],
        quickReplies: [
          "Parler à un humain",
          "Voir les tutoriels",
          "Rechercher dans l'aide"
        ]
      };
    }

    setIsTyping(false);
    setMessages(prev => [...prev, response]);
    setConversationCategory(response?.category);
  };

  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: messageData?.content,
      attachment: messageData?.attachment,
      timestamp: messageData?.timestamp
    };

    setMessages(prev => [...prev, userMessage]);
    await generateAssistantResponse(userMessage);
  };

  const handleTopicSelect = (topic, specificQuestion = null) => {
    const message = specificQuestion || `Je voudrais en savoir plus sur ${topic?.title?.toLowerCase()}`;
    handleSendMessage({
      content: message,
      timestamp: new Date()
    });
  };

  const handleQuickReply = (reply) => {
    handleSendMessage({
      content: reply,
      timestamp: new Date()
    });
  };

  const handleSearchResults = (results) => {
    console.log('Search results:', results);
  };

  const handleViewArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleEscalateToHuman = () => {
    const escalationMessage = {
      id: Date.now(),
      sender: 'assistant',
      content: `Je vais transférer votre demande à notre équipe support humaine.\n\nUn de nos experts vous contactera dans les plus brefs délais. Temps de réponse moyen : 15 minutes pendant les heures ouvrables.`,
      category: 'Escalation',
      timestamp: new Date(),
      quickReplies: [
        "Merci",
        "C\'est urgent",
        "Préférence par email"
      ]
    };
    
    setMessages(prev => [...prev, escalationMessage]);
  };

  // Add welcome message on component mount
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      sender: 'assistant',
      content: `Bonjour ${user?.name} ! 👋\n\nJe suis votre assistant technique Caipytal. Je suis là pour vous aider avec toutes vos questions sur la plateforme.\n\nComment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
      category: 'Accueil',
      quickReplies: [
        "Problème technique",
        "Question sur les fonctionnalités",
        "Aide avec un virement",
        "Support recommandations IA"
      ]
    };
    
    setMessages([welcomeMessage]);
  }, [user?.name]);

  return (
    <>
      <Helmet>
        <title>Assistant Technique - Caipytal</title>
        <meta name="description" content="Obtenez de l'aide instantanée avec l'assistant technique Caipytal. Support IA et accès à la base de connaissances." />
      </Helmet>
      <AuthenticatedLayout user={user}>
        <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon name="HelpCircle" size={20} className="text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-heading-semibold text-foreground">
                  Assistant Technique
                </h1>
                <p className="text-sm text-muted-foreground">
                  Support instantané et base de connaissances
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="Search"
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Rechercher dans les conversations"
              />
              <Button
                variant="outline"
                size="sm"
                iconName="User"
                iconPosition="left"
                onClick={handleEscalateToHuman}
              >
                Support humain
              </Button>
            </div>
          </div>

          {/* Search Panel */}
          <ConversationSearch
            conversations={conversationHistory}
            onSearchResults={handleSearchResults}
            isVisible={showSearch}
          />

          {/* Knowledge Base Article Preview */}
          {selectedArticle && (
            <div className="p-4 border-b border-border">
              <KnowledgeBasePreview
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
                onViewFull={(article) => {
                  console.log('View full article:', article?.id);
                  // In real app, this would open the full article
                }}
              />
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages?.length === 0 ? (
              <SuggestedTopics onTopicSelect={handleTopicSelect} />
            ) : (
              <>
                {messages?.map((message) => (
                  <ChatMessage
                    key={message?.id}
                    message={{
                      ...message,
                      onQuickReply: handleQuickReply
                    }}
                  />
                ))}
                
                {isTyping && <ChatMessage message={{ sender: 'assistant', isTyping: true }} />}
                
                {/* Suggested Articles */}
                {messages?.length > 2 && conversationCategory && (
                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    <h3 className="text-sm font-body font-body-medium text-foreground">
                      Articles recommandés
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {knowledgeBaseArticles?.filter(article => article?.category?.toLowerCase()?.includes(conversationCategory?.toLowerCase()))?.slice(0, 2)?.map((article) => (
                          <div
                            key={article?.id}
                            className="bg-surface border border-border rounded-lg p-3 hover:shadow-custom-sm transition-all duration-200 cursor-pointer"
                            onClick={() => handleViewArticle(article)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Icon name={article?.icon} size={16} className="text-accent" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-body font-body-medium text-foreground mb-1">
                                  {article?.title}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {article?.excerpt}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default TechnicalAssistantChat;