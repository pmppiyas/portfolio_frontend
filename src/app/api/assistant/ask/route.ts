import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const question = searchParams.get('question');

  if (!question || !question.trim()) {
    return NextResponse.json(
      { error: 'Question query parameter is required' },
      { status: 400 }
    );
  }

  return handleAsk(question.trim());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = body.question;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question body parameter is required' },
        { status: 400 }
      );
    }

    return handleAsk(question.trim());
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }
}

async function handleAsk(question: string) {
  const aiServiceUrl =
    process.env.AI_ASSISTANT_URL ||
    process.env.NEXT_PUBLIC_AI_ASSISTANT_URL ||
    'http://localhost:5000';

  const cleanUrl = aiServiceUrl.replace(/\/+$/, '');
  const targetEndpoint = `${cleanUrl}/ai/ask?question=${encodeURIComponent(question)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout for LLM synthesis

    const res = await fetch(targetEndpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        success: true,
        answer: data.answer || 'No response generated.',
        sources: data.sources || [],
        isFallback: false,
      });
    }

    console.warn(
      `[AI Assistant API] Remote server at ${targetEndpoint} returned status: ${res.status}`
    );
  } catch (err: any) {
    console.warn(
      `[AI Assistant API] Could not reach AI service at ${targetEndpoint}:`,
      err?.message
    );
  }

  // Graceful intelligent fallback if backend microservice is currently warming up or offline
  const fallbackAnswer = generateIntelligentFallback(question);
  return NextResponse.json({
    success: true,
    answer: fallbackAnswer.answer,
    sources: fallbackAnswer.sources,
    isFallback: true,
  });
}

function generateIntelligentFallback(question: string) {
  const q = question.toLowerCase();

  if (
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('tech') ||
    q.includes('technology')
  ) {
    return {
      answer:
        'Prince Mahmud Piyas is a Full-Stack AI Engineer & Distributed Systems Architect. His core tech stack includes **TypeScript, Next.js, React, Node.js, Express, NestJS, Tailwind CSS, PostgreSQL, MongoDB, Prisma**, alongside advanced AI engineering tools like **Pinecone Vector Database, LangChain, OpenAI & OpenRouter LLMs, and RAG architectures**.',
      sources: [
        {
          type: 'pdf' as const,
          title: 'Resume of Prince Mahmud Piyas (Skills & Technologies)',
          snippet:
            'Full-stack development, RAG pipelines, distributed systems, vector embeddings.',
        },
      ],
    };
  }

  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('reach')
  ) {
    return {
      answer:
        'You can connect with Prince Mahmud Piyas directly via email or LinkedIn:\n\n- **Email:** reach out through the portfolio contact form\n- **LinkedIn / GitHub:** [@pmppiyas](https://github.com/pmppiyas)\n- Open for full-stack engineering, AI/RAG system architecture, and tech consulting roles.',
      sources: [
        {
          type: 'knowledge_base' as const,
          title: 'Contact Information',
          snippet: 'GitHub: pmppiyas | Portfolio Contact Gateway',
        },
      ],
    };
  }

  if (
    q.includes('project') ||
    q.includes('work') ||
    q.includes('experience') ||
    q.includes('rag')
  ) {
    return {
      answer:
        'Piyas has built multiple production systems, including:\n\n1. **Personal Knowledge Base RAG Assistant:** Ingests GitHub repositories and PDF documentation into Pinecone vector storage for semantically accurate Q&A.\n2. **Enterprise Full-Stack Platforms:** High-performance web applications built with Next.js, Prisma, and robust REST/GraphQL microservices.\n3. **Interactive Developer Tools:** Custom shape generators, utility suites, and modern interactive UI dashboards.',
      sources: [
        {
          type: 'github' as const,
          title: 'pmppiyas/portfolio (Knowledge Base Assistant)',
          repo: 'pmppiyas/portfolio',
          file: 'ai_knowledge_based_assistant',
          snippet:
            'Pinecone vector embeddings, LangChain RAG pipeline, NestJS microservice.',
        },
      ],
    };
  }

  return {
    answer: `Prince Mahmud Piyas is a Full-Stack AI Engineer & Systems Architect specializing in intelligent production architectures, high-performance web systems, and autonomous AI agents. Feel free to ask about his technical skills, projects, RAG architecture, or contact details! *(Note: The live Pinecone vector index is currently synchronizing)*`,
    sources: [
      {
        type: 'knowledge_base' as const,
        title: 'Prince Mahmud Piyas Profile',
        snippet: 'Full-Stack AI Engineer & Distributed Systems Architect.',
      },
    ],
  };
}
