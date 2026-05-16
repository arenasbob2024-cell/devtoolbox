import { NextResponse } from 'next/server';

const BASE_URL = 'https://viadreams.cc';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;

  if (!file.endsWith('.xml')) {
    return new NextResponse('Not found', { status: 404 });
  }

  const chunkMatch = file.match(/^(\d+)\.xml$/);
  const destination = chunkMatch
    ? `${BASE_URL}/api/sitemap/?id=${chunkMatch[1]}`
    : `${BASE_URL}/api/sitemap/`;

  return NextResponse.redirect(destination, 301);
}
