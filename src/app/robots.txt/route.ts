import { NextResponse } from 'next/server';

export async function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: https://viadreams.cc/sitemap.xml
`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
