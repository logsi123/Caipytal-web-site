import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RecommendationRequest {
  subscriptionPlan: 'BASIC' | 'MEDIUM' | 'PREMIUM';
  userProfile?: {
    riskTolerance?: string;
    investmentGoals?: string;
    currentBalance?: number;
  };
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  expectedReturn: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string;
  reasoning: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { subscriptionPlan, userProfile }: RecommendationRequest = await req.json();

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY') || Deno.env.get('VITE_OPENAI_API_KEY');
    if (!openaiApiKey || openaiApiKey === 'your-openai-api-key-here') {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const numberOfRecommendations = subscriptionPlan === 'PREMIUM' ? 5 : subscriptionPlan === 'MEDIUM' ? 3 : 2;
    const complexityLevel = subscriptionPlan === 'PREMIUM' ? 'advanced with detailed analysis' : subscriptionPlan === 'MEDIUM' ? 'intermediate with good insights' : 'basic and straightforward';

    const systemPrompt = `You are an expert financial advisor for Caipytal, an AI-powered investment platform. 
Provide ${numberOfRecommendations} personalized investment recommendations with ${complexityLevel} level.
Each recommendation should include: title, description, expected return percentage, risk level (LOW/MEDIUM/HIGH), category (Stocks/Bonds/Crypto/Real Estate/ETF), and detailed reasoning.
Format as JSON array.`;

    const userPrompt = `User subscription: ${subscriptionPlan}
User profile: ${JSON.stringify(userProfile || {})}
Provide ${numberOfRecommendations} investment recommendations tailored to this user.`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate recommendations', details: errorData }),
        { 
          status: openaiResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const openaiData = await openaiResponse.json();
    const recommendationsText = openaiData.choices[0]?.message?.content;

    let recommendations: Recommendation[];
    try {
      const jsonMatch = recommendationsText.match(/\[([\s\S]*?)\]/)?.[0];
      recommendations = JSON.parse(jsonMatch || recommendationsText);
    } catch {
      recommendations = [
        {
          id: '1',
          title: 'S&P 500 Index Fund',
          description: 'Diversified exposure to 500 leading US companies',
          expectedReturn: '8-10%',
          riskLevel: 'MEDIUM',
          category: 'ETF',
          reasoning: 'Long-term stable growth with broad market exposure'
        },
        {
          id: '2',
          title: 'US Treasury Bonds',
          description: 'Government-backed fixed income securities',
          expectedReturn: '4-5%',
          riskLevel: 'LOW',
          category: 'Bonds',
          reasoning: 'Safe, guaranteed returns with minimal risk'
        }
      ].slice(0, numberOfRecommendations);
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscriptionPlan,
        recommendations: recommendations.slice(0, numberOfRecommendations),
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});