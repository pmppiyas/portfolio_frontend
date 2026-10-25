import { IAskResponse } from '@/types/assistant';

export const STARTER_PROMPTS = [
  {
    label: 'Core Skills & Tech Stack',
    question: 'What are your core technical skills and stack?',
  },
  {
    label: 'RAG & AI Architecture',
    question: 'How does your Personal Knowledge Base RAG system work with Pinecone and GitHub?',
  },
  {
    label: 'Featured Projects',
    question: 'What are the most notable production projects you have built?',
  },
  {
    label: 'Contact & Collaboration',
    question: 'How can I hire or collaborate with you?',
  },
];

export async function askKnowledgeBase(question: string): Promise<IAskResponse> {
  const trimmed = question.trim();
  if (!trimmed) {
    throw new Error('Question cannot be empty');
  }

  // 1. Direct call to Render AI microservice
  // This completely eliminates Vercel's 10s-15s Serverless Function 504 Gateway Timeout!
  const directBase = (
    process.env.NEXT_PUBLIC_AI_ASSISTANT_URL ||
    'https://ai-knowledge-based-assistant.onrender.com'
  ).replace(/\/+$/, '');

  const directUrl = `${directBase}/ai/ask?question=${encodeURIComponent(trimmed)}`;
  const proxyUrl = `/api/assistant/ask?question=${encodeURIComponent(trimmed)}`;

  let res: Response | null = null;

  // Try direct AI microservice call first
  try {
    const directRes = await fetch(directUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (directRes.ok) {
      res = directRes;
    }
  } catch (err) {
    console.warn('[AI Assistant] Direct fetch failed, trying proxy fallback:', err);
  }

  // Fallback to Next.js API proxy if direct fetch did not succeed
  if (!res) {
    res = await fetch(proxyUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
  }

  if (!res.ok) {
    throw new Error(`Failed to query AI knowledge base (Status: ${res.status})`);
  }

  const data = await res.json();
  return {
    answer: data.answer || 'No response returned.',
    sources: data.sources || [],
    isFallback: Boolean(data.isFallback),
  };
}
