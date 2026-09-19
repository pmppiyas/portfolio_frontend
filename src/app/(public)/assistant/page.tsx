'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bot,
  User,
  Sparkles,
  Send,
  RotateCcw,
  Copy,
  Check,
  ArrowLeft,
  Cpu,
  Layers,
  Mail,
} from 'lucide-react';
import { askKnowledgeBase } from '@/services/ai-assistant.service';
import { IChatMessage } from '@/types/assistant';
import { MarkdownMessage } from '@/components/module/ai-assistant/MarkdownMessage';

const READY_QUESTIONS = [
  {
    title: 'Core Skills & Stack',
    desc: 'TypeScript, Next.js, NestJS, Prisma & System Architecture',
    prompt: 'What are your primary technical skills, backend proficiencies, and architecture stack?',
    icon: Cpu,
  },
  {
    title: 'RAG & AI Engineering',
    desc: 'Pinecone vector database, embeddings, and LangChain pipelines',
    prompt: 'How does your Personal Knowledge Base RAG system work with Pinecone and GitHub repositories?',
    icon: Sparkles,
  },
  {
    title: 'Featured Projects',
    desc: 'Production applications, developer tools, and microservices',
    prompt: 'What are the top production-grade systems and tools you have built?',
    icon: Layers,
  },
  {
    title: 'Hire & Collaborate',
    desc: 'Availability for contracts, engineering roles, and contact channels',
    prompt: 'How can I hire or get in touch with you for collaboration?',
    icon: Mail,
  },
];

export default function AssistantPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<IChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I am Prince Mahmud Piyas's Digital Twin AI Assistant. I have indexed his codebases, GitHub repositories, systems architecture, and resume using Pinecone vector embeddings. Choose a ready question below or ask me anything directly!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messages.length <= 1) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === 'assistant') {
      latestMessageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: IChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const response = await askKnowledgeBase(textToSend);
      const assistantMessage: IChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: IChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Error connecting to the knowledge base microservice. Please verify if the AI service is active, or reach out to Piyas directly.',
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Conversation reset! Ask any question about Piyas's technical background, projects, or architecture.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const hasOnlyWelcome = messages.length <= 1;

  return (
    <div className="h-[100dvh] pt-16 sm:pt-20 pb-3 bg-neutral-950 text-neutral-100 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Minimal Bar */}
        <div className="flex-shrink-0 flex items-center justify-between py-2.5 border-b border-neutral-800/80">
          <Link
            href="/"
            className="text-xs text-neutral-400 hover:text-cyan-400 flex items-center gap-1.5 transition group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition" />
            <span>Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-300">
              Piyas AI Knowledge Base
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono">
              RAG
            </span>
          </div>

          <button
            onClick={resetChat}
            className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Dedicated Messages Scroll Area (Hidden mid-screen scrollbar, smooth scroll) */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 py-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {messages.map((msg, idx) => {
            const isLatest = idx === messages.length - 1;
            return (
              <motion.div
                key={msg.id}
                ref={isLatest ? latestMessageRef : null}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`scroll-mt-4 flex gap-3 sm:gap-4 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-950 to-indigo-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-neutral-900/90 border border-neutral-800 text-neutral-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <MarkdownMessage
                    content={msg.content}
                    isUser={msg.role === 'user'}
                  />

                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-800/40 text-[10px] text-neutral-500">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-neutral-300 transition flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Ready Questions Grid (Shown on welcome screen) */}
          {hasOnlyWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-2"
            >
              <p className="text-xs text-neutral-400 mb-3 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Ready Questions — Click to ask:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {READY_QUESTIONS.map((q, idx) => {
                  const Icon = q.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(q.prompt)}
                      disabled={loading}
                      className="text-left p-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/60 border border-neutral-800 hover:border-cyan-500/50 transition duration-200 group cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-cyan-400 group-hover:border-cyan-500/40 transition">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-neutral-200 group-hover:text-cyan-300 transition">
                          {q.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 group-hover:text-neutral-300 transition">
                        {q.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-cyan-400 text-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-300" />
                <span className="text-xs ml-1 text-neutral-300">
                  Generating response from knowledge base...
                </span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dedicated Bottom Input Section (Fixed below the messages, completely opaque & isolated) */}
        <div className="flex-shrink-0 pt-2 pb-1 bg-neutral-950 border-t border-neutral-800/80 z-20">
          {/* Quick Prompt Pills when in ongoing conversation */}
          {!hasOnlyWelcome && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-1">
              {READY_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  disabled={loading}
                  onClick={() => handleSend(q.prompt)}
                  className="text-[11px] whitespace-nowrap bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-400 hover:text-cyan-300 px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  {q.title}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center bg-neutral-900 border border-neutral-800 focus-within:border-cyan-500/60 rounded-2xl p-2 shadow-2xl transition"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Prince Mahmud Piyas's software architecture or projects..."
              disabled={loading}
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none resize-none max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 disabled:opacity-40 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-sm shadow-cyan-500/20 cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-1.5 px-1">
            <span>RAG Assistant connected to Pinecone Vector Base</span>
            <span>Enter to send • Shift + Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
