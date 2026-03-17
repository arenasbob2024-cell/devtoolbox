import { NextRequest, NextResponse } from 'next/server';
import { getApprovedComments, addComment } from '@/lib/db';

export async function GET(req: NextRequest) {
  const toolId = req.nextUrl.searchParams.get('toolId');
  if (!toolId) {
    return NextResponse.json({ error: 'toolId required' }, { status: 400 });
  }
  const comments = getApprovedComments(toolId);
  return NextResponse.json({ comments });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolId, authorName, content } = body;

    if (!toolId || !authorName || !content) {
      return NextResponse.json({ error: 'toolId, authorName, content required' }, { status: 400 });
    }
    if (authorName.length > 50 || content.length > 2000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    addComment(toolId, authorName.trim(), content.trim());
    return NextResponse.json({ ok: true, message: 'Comment submitted for review' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
