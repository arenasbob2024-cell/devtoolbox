import { NextRequest, NextResponse } from 'next/server';
import { getAllComments } from '@/lib/db';

function checkAuth(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get('x-admin-secret') === secret;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const comments = getAllComments();
  return NextResponse.json({ comments });
}
