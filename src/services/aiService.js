import { callEdgeFunction } from '../lib/supabase';

export const getAIRecommendations = async (subscriptionPlan = 'BASIC', userProfile = {}) => {
  try {
    const response = await callEdgeFunction('ai-recommendations', {
      subscriptionPlan,
      userProfile,
    });
    return response;
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    throw error;
  }
};

export const sendTechnicalAssistantMessage = async (message, conversationHistory = []) => {
  try {
    const response = await callEdgeFunction('technical-assistant', {
      message,
      conversationHistory,
    });
    return response;
  } catch (error) {
    console.error('Error sending message to technical assistant:', error);
    throw error;
  }
};
