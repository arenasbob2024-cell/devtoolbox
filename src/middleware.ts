import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n/config';
import type { Locale } from './i18n/config';

// Locales that were removed — 301 redirect to English equivalent
const REMOVED_LOCALES = ['nl', 'pl', 'sv', 'no', 'id', 'th'];

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q] = lang.trim().split(';q=');
      return { code: code.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of languages) {
    if (i18n.locales.includes(code as Locale)) {
      return code as Locale;
    }
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  // Skip for static files, API routes, admin, Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return;
  }

  // www → non-www redirect (fixes duplicate page issues in Search Console)
  if (host.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.host = host.replace('www.', '');
    return NextResponse.redirect(newUrl, 301);
  }

  // 301 redirect removed locales to English equivalent
  // e.g. /id/blog/coolify-guide/ → /en/blog/coolify-guide/
  for (const removedLocale of REMOVED_LOCALES) {
    if (pathname.startsWith(`/${removedLocale}/`) || pathname === `/${removedLocale}`) {
      const rest = pathname.slice(removedLocale.length + 1); // strip /{locale}
      const newUrl = new URL(`/en${rest}`, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)'],
};
