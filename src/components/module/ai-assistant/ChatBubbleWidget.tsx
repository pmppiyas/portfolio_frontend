'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  BookOpen,
  FileText,
  Github,
  Database,
  Copy,
  Check,
} from 'lucide-react';
import { askKnowledgeBase, STARTER_PROMPTS } from '@/services/ai-assistant.service';
import { IChatMessage, IAiSourceItem } from '@/types/assistant';

export default function ChatBubbleWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<IChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm Prince Mahmud Piyas's AI Assistant. I have direct RAG access to his GitHub repositories, tech stack, and experience indexed in Pinecone. Ask me anything!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (messages.length > 1) {
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
        }
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

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
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: IChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I encountered an error connecting to the knowledge base. Please verify if the AI service is active, or reach out to Piyas directly.",
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

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Chat reset! Ask me anything about Piyas's software architecture, projects, or background.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end">
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-[92vw] sm:w-[410px] h-[550px] max-h-[82vh] mb-3 flex flex-col rounded-2xl bg-neutral-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_12px_45px_rgba(0,0,0,0.7)] text-neutral-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/60">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-sm shadow-cyan-500/30">
                  <Bot className="w-4 h-4" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold tracking-wide text-neutral-100 uppercase">
                      Piyas AI Assistant
                    </h3>
                    <span className="px-1.5 py-0.2 text-[9px] font-medium uppercase tracking-wider bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 rounded-full">
                      RAG Live
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 flex items-center gap-1">
                    <Database className="w-2.5 h-2.5 text-cyan-400 inline" /> Pinecone Vector Base
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/assistant"
                  title="Open dedicated full page"
                  className="p-1.5 rounded-md text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800/80 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 transition"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((msg, idx) => {
                const isLatest = idx === messages.length - 1;
                return (
                  <div
                    key={msg.id}
                    ref={isLatest ? latestMessageRef : null}
                    className={`scroll-mt-2 flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-xl px-3.5 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-neutral-900/90 border border-neutral-800/90 text-neutral-200 rounded-bl-none'
                    }`}
                  >
                    {/* Content */}
                    <div className="whitespace-pre-wrap leading-relaxed break-words font-sans">
                      {msg.content}
                    </div>

                    {/* Footer Actions */}
                    {msg.role === 'assistant' && (
                      <div className="flex items-center justify-between mt-1.5 text-[9px] text-neutral-500">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-neutral-300 transition flex items-center gap-0.5"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center gap-2 text-cyan-400 text-xs">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 animate-spin" />
                  </div>
                  <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-300" />
                    <span className="text-[11px] ml-1 text-neutral-300">
                      Querying Pinecone vector base...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips (when few messages) */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 border-t border-neutral-800/60 bg-neutral-950/40">
                <p className="text-[10px] text-neutral-400 mb-1.5 flex items-center gap-1 font-medium">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> Suggested queries:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.slice(0, 3).map((prompt, i) => (
                    <button
                      key={i}
                      disabled={loading}
                      onClick={() => handleSend(prompt.question)}
                      className="text-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-cyan-300 border border-neutral-800 hover:border-cyan-500/40 px-2 py-1 rounded-md transition text-left"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-2.5 bg-neutral-900/80 border-t border-neutral-800 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, RAG architecture..."
                disabled={loading}
                className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-cyan-500/60 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 disabled:opacity-40 disabled:hover:scale-100 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-sm shadow-cyan-500/30"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 text-white shadow-[0_4px_25px_rgba(6,182,212,0.4)] border border-cyan-400/40 focus:outline-none cursor-pointer"
        aria-label="Toggle AI Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 ring-2 ring-neutral-950" />
        </span>

        {isOpen ? (
          <X className="w-5 h-5 transition-transform duration-200 rotate-90 group-hover:rotate-0" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <Sparkles className="w-2.5 h-2.5 absolute -top-1 -right-1 text-cyan-200" />
          </div>
        )}

        {/* Hover Tooltip when closed */}
        {!isOpen && (
          <span className="absolute right-16 whitespace-nowrap bg-neutral-900/90 text-cyan-300 text-[11px] font-medium px-2.5 py-1 rounded-md border border-cyan-500/30 shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Ask Piyas AI ⚡
          </span>
        )}
      </motion.button>
    </div>
  );
}
