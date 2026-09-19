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

  const response = await fetch(`/api/assistant/ask?question=${encodeURIComponent(trimmed)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to query AI knowledge base (Status: ${response.status})`);
  }

  const data = await response.json();
  return {
    answer: data.answer || 'No response returned.',
    sources: data.sources || [],
    isFallback: Boolean(data.isFallback),
  };
}
