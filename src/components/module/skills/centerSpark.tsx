'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import assets from '@/assets/assets';
import { useInView } from '@/hooks/useInView';
import CustomHeading from '@/components/module/shared/Heading';
import {
  Terminal,
  Cpu,
  Layers,
  Database,
  Bot,
  Search,
  CheckCircle2,
  Activity,
  Code2,
  Sparkles,
} from 'lucide-react';

const { skills: skillAssets } = assets;

interface SkillData {
  id: string;
  name: string;
  category: 'all' | 'frontend' | 'backend' | 'database' | 'ai';
  icon: any;
  level: number;
  code: string;
  badge: string;
  description: string;
  status: 'CORE_STACK' | 'PRODUCTION' | 'ACTIVE_MATRIX';
}

const ALL_SKILLS: SkillData[] = [
  // FRONTEND
  {
    id: 'nextjs',
    name: 'Next.js 16',
    category: 'frontend',
    icon: skillAssets.frontend[3],
    level: 96,
    code: 'SSR // ISR // APP_ROUTER',
    badge: 'PROD_READY',
    description:
      'Server Components, Turbopack, Dynamic Caching & Optimized Rendering.',
    status: 'CORE_STACK',
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'frontend',
    icon: skillAssets.frontend[1],
    level: 95,
    code: 'CONCURRENT // HOOKS // VDOM',
    badge: 'FRAMEWORK',
    description:
      'Component Architecture, Custom Hooks, Performance Memoization.',
    status: 'CORE_STACK',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: skillAssets.frontend[2],
    level: 92,
    code: 'STRICT_MODE // GENERICS',
    badge: 'TYPE_SAFE',
    description:
      'Static Type-Checking, Advanced Generics, Enterprise Reliability.',
    status: 'CORE_STACK',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: skillAssets.frontend[0],
    level: 98,
    code: 'JIT // UTILITY // RESPONSIVE',
    badge: 'UI_SYSTEM',
    description:
      'Modern Responsive Layouts, Fluid Micro-interactions, Dark Mode.',
    status: 'PRODUCTION',
  },
  {
    id: 'redux',
    name: 'Redux Toolkit',
    category: 'frontend',
    icon: skillAssets.frontend[4],
    level: 88,
    code: 'RTK_QUERY // GLOBAL_STORE',
    badge: 'STATE_MGT',
    description:
      'Predictable State Management, Normalized Cache & Async Thunks.',
    status: 'ACTIVE_MATRIX',
  },

  // BACKEND
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'backend',
    icon: skillAssets.backend[6],
    level: 94,
    code: 'MICROSERVICES // DI // MODULAR',
    badge: 'ENTERPRISE',
    description:
      'Scalable Enterprise Backends, Dependency Injection, Clean Architecture.',
    status: 'CORE_STACK',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: skillAssets.backend[0],
    level: 92,
    code: 'EVENT_LOOP // STREAMS // HTTP',
    badge: 'RUNTIME',
    description:
      'Asynchronous High-Throughput I/O, Cluster Workers, REST Architecture.',
    status: 'CORE_STACK',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    icon: skillAssets.backend[1],
    level: 90,
    code: 'MIDDLEWARE // ROUTING // REST',
    badge: 'API_SERVER',
    description:
      'Robust API Routing, Custom Auth Middleware, Request Pipelines.',
    status: 'PRODUCTION',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    icon: skillAssets.backend[2],
    level: 85,
    code: 'SCHEMA // RESOLVER // QUERY',
    badge: 'DATA_API',
    description:
      'Declarative Data Fetching, Type-Safe Resolvers & Subscriptions.',
    status: 'ACTIVE_MATRIX',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'backend',
    icon: skillAssets.backend[4],
    level: 82,
    code: 'CONTAINERS // MULTI_STAGE',
    badge: 'DEVOPS',
    description:
      'Containerized Deployment, Multi-Stage Builds, Isolated Environments.',
    status: 'ACTIVE_MATRIX',
  },
  {
    id: 'stripe',
    name: 'Stripe API',
    category: 'backend',
    icon: skillAssets.backend[5],
    level: 88,
    code: 'WEBHOOKS // BILLING // CHECKOUT',
    badge: 'PAYMENT_GATEWAY',
    description:
      'Secure Payment Flow, Subscription Lifecycles, Webhook Verification.',
    status: 'PRODUCTION',
  },
  {
    id: 'jest',
    name: 'Jest & Unit Testing',
    category: 'backend',
    icon: skillAssets.backend[3],
    level: 84,
    code: 'TEST_COVERAGE // MOCKING',
    badge: 'QA_SYSTEM',
    description:
      'Automated Unit Tests, Integration Testing, Mock Service Workers.',
    status: 'ACTIVE_MATRIX',
  },

  // DATABASE
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    icon: skillAssets.database[2],
    level: 92,
    code: 'SQL // RELATIONAL // ACID',
    badge: 'RDBMS',
    description:
      'Complex SQL Queries, Index Optimization, ACID Transaction Guarantees.',
    status: 'CORE_STACK',
  },
  {
    id: 'prisma',
    name: 'Prisma ORM',
    category: 'database',
    icon: skillAssets.database[4],
    level: 94,
    code: 'MIGRATIONS // CLIENT_GEN',
    badge: 'ORM_TOOL',
    description:
      'Type-Safe Database Modeling, Auto Migrations, Relation Queries.',
    status: 'CORE_STACK',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    icon: skillAssets.database[0],
    level: 90,
    code: 'NOSQL // AGGREGATION // DOCS',
    badge: 'DOCUMENT_DB',
    description:
      'High-Volume Document Storage, Aggregation Pipelines, Sharding.',
    status: 'CORE_STACK',
  },
  {
    id: 'mongoose',
    name: 'Mongoose',
    category: 'database',
    icon: skillAssets.database[1],
    level: 90,
    code: 'SCHEMA_VALIDATION // POPULATE',
    badge: 'ODM_LAYER',
    description: 'Schema Validation, Hooks, Virtuals, Relational Population.',
    status: 'PRODUCTION',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    icon: skillAssets.database[3],
    level: 86,
    code: 'INDEXING // JOIN_QUERIES',
    badge: 'SQL_CORE',
    description:
      'Relational Database Management, Foreign Keys, Stored Procedures.',
    status: 'ACTIVE_MATRIX',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'database',
    icon: skillAssets.database[5],
    level: 80,
    code: 'S3 // EC2 // CLOUDFRONT',
    badge: 'CLOUD_INFRA',
    description: 'S3 Asset Buckets, Server Deployment, CDN Acceleration, IAM.',
    status: 'ACTIVE_MATRIX',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'database',
    icon: skillAssets.database[6],
    level: 85,
    code: 'AUTH // FIRESTORE // RULES',
    badge: 'BAAS_CLOUD',
    description: 'Realtime Database, OAuth Authentication, Cloud Functions.',
    status: 'PRODUCTION',
  },

  // AI & INTELLIGENCE
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    icon: skillAssets.ai[5],
    level: 92,
    code: 'AGENTS // TOOL_CALLING // MEMORY',
    badge: 'AI_FRAMEWORK',
    description:
      'Autonomous AI Agents, Prompt Engineering, Structured Tool Execution.',
    status: 'CORE_STACK',
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'ai',
    icon: skillAssets.ai[1],
    level: 95,
    code: 'GPT_4O // EMBEDDINGS // JSON',
    badge: 'LLM_ENGINE',
    description:
      'Large Language Models, Embeddings Vectorization, Function Calling.',
    status: 'CORE_STACK',
  },
  {
    id: 'rag',
    name: 'RAG Architecture',
    category: 'ai',
    icon: skillAssets.ai[3],
    level: 90,
    code: 'RETRIEVAL // CONTEXT_INJECT',
    badge: 'AI_PIPELINE',
    description:
      'Custom Knowledge Base Ingestion, Hybrid Search, Context Augmentation.',
    status: 'CORE_STACK',
  },
  {
    id: 'pinecone',
    name: 'Pinecone Vector DB',
    category: 'ai',
    icon: skillAssets.ai[2],
    level: 88,
    code: 'VECTOR_INDEX // COSINE_SIM',
    badge: 'VECTOR_STORE',
    description:
      'High-Dimensional Vector Search, Low Latency Semantic Querying.',
    status: 'PRODUCTION',
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    category: 'ai',
    icon: skillAssets.ai[4],
    level: 90,
    code: 'CLAUDE_SONNET // LONG_CONTEXT',
    badge: 'REASONING_AI',
    description:
      'Complex Multi-Step Logic, Code Generation, Extended Context Windows.',
    status: 'PRODUCTION',
  },
  {
    id: 'ollama',
    name: 'Ollama Local LLMs',
    category: 'ai',
    icon: skillAssets.ai[0],
    level: 85,
    code: 'LLAMA3 // DEEPSEEK // ON_PREM',
    badge: 'LOCAL_INFERENCE',
    description:
      'On-Device Private LLM Deployment, GPU Acceleration, Offline AI.',
    status: 'ACTIVE_MATRIX',
  },
];

type CategoryKey = 'all' | 'frontend' | 'backend' | 'database' | 'ai';

const CATEGORIES: {
  id: CategoryKey;
  label: string;
  icon: any;
  count: number;
}[] = [
  { id: 'all', label: 'FULL_MATRIX', icon: Layers, count: ALL_SKILLS.length },
  {
    id: 'frontend',
    label: 'FRONTEND_CORE',
    icon: Cpu,
    count: ALL_SKILLS.filter((s) => s.category === 'frontend').length,
  },
  {
    id: 'backend',
    label: 'BACKEND_ENGINE',
    icon: Terminal,
    count: ALL_SKILLS.filter((s) => s.category === 'backend').length,
  },
  {
    id: 'database',
    label: 'DATABASE_INFRA',
    icon: Database,
    count: ALL_SKILLS.filter((s) => s.category === 'database').length,
  },
  {
    id: 'ai',
    label: 'AI_INTELLIGENCE',
    icon: Bot,
    count: ALL_SKILLS.filter((s) => s.category === 'ai').length,
  },
];

export default function SkillsPage() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillData>(ALL_SKILLS[0]);

  const filteredSkills = useMemo(() => {
    return ALL_SKILLS.filter((skill) => {
      const matchesCategory =
        activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div
      id="skills-matrix"
      ref={ref as any}
      className="relative w-full py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Cyberpunk Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Section Heading */}
        <CustomHeading
          heading="Tech Matrix"
          badge="CYBER_MODULE // CAPABILITIES_V2"
          subtitle="Advanced Tech Stack, Scalable Architectures & AI Systems"
        />

        {/* Top Control HUD: Filter Tabs + Search Terminal */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-950/80 border border-cyan-500/20 shadow-md fade-in-up ${
            inView ? 'visible' : ''
          }`}
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <Icon
                    size={12}
                    className={isActive ? 'text-cyan-400' : 'text-gray-500'}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-0.5 px-1 py-0.2 text-[9px] rounded-full font-bold ${
                      isActive
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Terminal Input */}
          <div className="relative w-full sm:w-56">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cyan-400/60"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="> grep --skill..."
              className="w-full pl-7 pr-4 py-1.5 text-xs font-mono bg-black/50 text-cyan-300 placeholder:text-gray-600 rounded-lg border border-cyan-500/20 focus:border-cyan-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout: Grid Cards + Side HUD Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Left / Center 2 Cols: Tech Cards Matrix */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.id === skill.id;

              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  className={`group relative p-3.5 rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.15)] -translate-y-0.5'
                      : 'bg-gray-950/70 border-white/5 hover:border-cyan-500/30 hover:bg-gray-900/60'
                  }`}
                >
                  {/* Cyber Corner Markers */}
                  <div
                    className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-200 ${
                      isSelected
                        ? 'border-cyan-400'
                        : 'border-transparent group-hover:border-cyan-500/40'
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-200 ${
                      isSelected
                        ? 'border-cyan-400'
                        : 'border-transparent group-hover:border-cyan-500/40'
                    }`}
                  />

                  <div className="flex items-start gap-3">
                    {/* Icon Container */}
                    <div
                      className={`relative w-9 h-9 rounded-lg flex items-center justify-center p-1.5 transition-colors duration-200 shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400/40'
                          : 'bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30'
                      }`}
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4
                          className={`text-sm font-bold truncate transition-colors duration-200 ${
                            isSelected
                              ? 'text-cyan-300'
                              : 'text-white group-hover:text-cyan-400'
                          }`}
                        >
                          {skill.name}
                        </h4>
                        <span className="text-[8.5px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white/5 text-gray-400 uppercase">
                          {skill.badge}
                        </span>
                      </div>

                      {/* Code Tag */}
                      <p className="text-[10px] font-mono text-cyan-400/70 truncate mt-0.5 tracking-tight">
                        {'> '}
                        {skill.code}
                      </p>

                      {/* Power Level Bar */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-mono font-bold text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Col: Cyber HUD Inspector Console */}
          <div className="lg:col-span-1 sticky top-20 space-y-4">
            <div className="relative p-4 rounded-xl bg-gray-950/85 border border-cyan-500/30 shadow-md">
              {/* Terminal Header Bar */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/80" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  <span className="text-[10px] font-mono text-gray-400 ml-1">
                    NODE_INSPECTOR.sh
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  LIVE
                </span>
              </div>

              {/* Selected Node Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center p-2 shadow-sm">
                    <Image
                      src={selectedSkill.icon}
                      alt={selectedSkill.name}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase">
                      // {selectedSkill.category.toUpperCase()}
                    </span>
                    <h3 className="text-base font-black text-white">
                      {selectedSkill.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-xs text-gray-300 leading-relaxed">
                  <p className="text-cyan-400/80 mb-0.5 text-[10px]">
                    {'> system.describe():'}
                  </p>
                  <p className="text-gray-300 text-xs">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[9px] text-gray-500 block">
                      PROFICIENCY
                    </span>
                    <span className="text-base font-bold text-cyan-300">
                      {selectedSkill.level}%
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[9px] text-gray-500 block">
                      STATUS
                    </span>
                    <span className="text-[10px] font-bold text-green-400 flex items-center gap-1 mt-0.5">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      {selectedSkill.status}
                    </span>
                  </div>
                </div>

                {/* Capabilities Checklist */}
                <div className="space-y-1.5 pt-1 border-t border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 block mb-1">
                    INTEGRATIONS:
                  </span>
                  {selectedSkill.code.split('//').map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5"
                    >
                      <CheckCircle2
                        size={11}
                        className="text-cyan-400 shrink-0"
                      />
                      <span className="truncate">{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="p-2.5 rounded-xl bg-gray-900/40 border border-white/5 font-mono text-[11px] flex items-center justify-between text-gray-400">
              <div className="flex items-center gap-1.5">
                <Activity size={13} className="text-cyan-400" />
                <span>ACTIVE_MODULES</span>
              </div>
              <span className="font-bold text-cyan-300">
                {ALL_SKILLS.length} STACKS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
