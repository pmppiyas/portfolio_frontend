export interface IAiSourceItem {
  type: 'pdf' | 'github' | 'knowledge_base';
  title: string;
  repo?: string;
  file?: string;
  snippet: string;
}

export interface IChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: IAiSourceItem[];
  isError?: boolean;
}

export interface IAskResponse {
  answer: string;
  sources?: IAiSourceItem[];
  isFallback?: boolean;
}
