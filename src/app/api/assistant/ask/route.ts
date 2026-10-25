import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60; // Allow up to 60 seconds on Vercel Serverless
export const dynamic = 'force-dynamic';

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
  const rawUrl =
    process.env.AI_ASSISTANT_URL ||
    process.env.NEXT_PUBLIC_AI_ASSISTANT_URL ||
    'https://ai-knowledge-based-assistant.onrender.com';

  const cleanUrl = rawUrl.replace(/\/+$/, '');
  const targetEndpoint = `${cleanUrl}/ai/ask?question=${encodeURIComponent(question)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

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
      });
    }

    const errText = await res.text();
    return NextResponse.json(
      { error: `AI service returned HTTP ${res.status}: ${errText}` },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Could not reach AI service: ${err?.message || err}` },
      { status: 503 }
    );
  }
}
