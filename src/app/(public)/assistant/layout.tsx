import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI Assistant // Digital Twin Knowledge Base',
  description:
    'Interact with Prince Mahmud Piyas’s Digital Twin AI Assistant trained on system architectures, codebases, and vector embeddings.',
  alternates: {
    canonical: 'https://www.pmppiyas.dev/assistant',
  },
  openGraph: {
    title: 'AI Assistant // Prince Mahmud Piyas',
    description: 'RAG-powered Knowledge Base Assistant with Pinecone and LangChain.',
    url: 'https://www.pmppiyas.dev/assistant',
  },
};

export default function AssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
