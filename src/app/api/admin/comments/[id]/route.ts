import { NextRequest, NextResponse } from 'next/server';
import { approveComment, replyToComment, deleteComment } from '@/lib/db';

function checkAuth(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get('x-admin-secret') === secret;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const commentId = parseInt(id);
  if (isNaN(commentId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json();
  const { action, reply } = body;

  if (action === 'approve') {
    approveComment(commentId);
    return NextResponse.json({ ok: true });
  }

  if (action === 'reply' && reply) {
    replyToComment(commentId, reply.trim());
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const commentId = parseInt(id);
  if (isNaN(commentId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  deleteComment(commentId);
  return NextResponse.json({ ok: true });
}
