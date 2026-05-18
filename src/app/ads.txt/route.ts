const OWNER_DOMAIN = 'viadreams.cc';
const SELLER_LINE_ENV = 'ADSTERRA_ADS_TXT_SELLER_LINE';
const ADSTERRA_SELLER_LINE_PATTERN =
  /^adsterra\.com\s*,\s*([a-z0-9_-]+)\s*,\s*DIRECT(?:\s*,\s*[a-z0-9_-]+)?\s*$/i;

export const dynamic = 'force-dynamic';

function isValidAdsterraSellerLine(line: string) {
  const match = line.match(ADSTERRA_SELLER_LINE_PATTERN);
  if (!match) return false;

  return !match[1].toLowerCase().includes('placeholder');
}

function getSellerLines() {
  const raw = process.env[SELLER_LINE_ENV] || '';

  return raw
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && isValidAdsterraSellerLine(line));
}

export function GET() {
  const sellerLines = getSellerLines();
  const body = [
    '# DevToolBox ads.txt - https://viadreams.cc',
    '# Authorized digital sellers (IAB ads.txt 1.1)',
    '',
    `OWNERDOMAIN=${OWNER_DOMAIN}`,
    '',
    sellerLines.length > 0
      ? '# Adsterra'
      : '# Adsterra - set ADSTERRA_ADS_TXT_SELLER_LINE from the publisher dashboard',
    ...(sellerLines.length > 0
      ? sellerLines
      : [
          '# Format: adsterra.com, <publisher-id>, DIRECT, <optional-cert>',
          '# Copy the exact seller line from the Adsterra publisher dashboard.',
        ]),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
