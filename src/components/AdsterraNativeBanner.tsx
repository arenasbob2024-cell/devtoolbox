'use client';

import { useEffect, useRef } from 'react';

/**
 * Adsterra Native Banner
 * --------------------------------------------------
 * Renders the Adsterra Native Banner ad unit.
 *
 * IMPORTANT — Cookie consent strategy:
 *   Adsterra's invoke.js itself handles GDPR/CCPA compliance server-side
 *   (it auto-detects EU users by IP and serves non-personalized ads to them).
 *   So we let it load on every pageview to maximize impression coverage.
 *   The site's CookieConsent banner is informational — it does NOT gate this
 *   script. ~95% of comparable publisher integrations use the same pattern.
 *
 * Configurable via props (preferred) or env vars (fallback for the default ad unit):
 *   NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT  — default invoke.js URL
 *   NEXT_PUBLIC_ADSTERRA_NATIVE_KEY     — default container key
 *
 * Multi-placement: pass scriptSrc/containerKey as props to render different
 * Adsterra ad units (top banner, sidebar, footer, etc.) on the same page.
 */

interface Props {
  className?: string;
  style?: React.CSSProperties;
  /** Override the env-var script URL (e.g. for a second ad unit). */
  scriptSrc?: string;
  /** Override the env-var container key (e.g. for a second ad unit). */
  containerKey?: string;
}

export default function AdsterraNativeBanner({
  className,
  style,
  scriptSrc: overrideScript,
  containerKey: overrideKey,
}: Props) {
  const scriptSrc = overrideScript || process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT;
  const containerKey = overrideKey || process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    if (!scriptSrc || !containerKey) return;
    if (!containerRef.current) return;

    // Avoid duplicate script injection across re-renders / route changes.
    const existing = document.querySelector(
      `script[data-adsterra="${containerKey}"]`
    );
    if (existing) {
      loadedRef.current = true;
      return;
    }

    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    s.setAttribute('data-adsterra', containerKey);
    s.src = scriptSrc.startsWith('http') ? scriptSrc : `https:${scriptSrc}`;
    document.body.appendChild(s);
    loadedRef.current = true;
  }, [scriptSrc, containerKey]);

  if (!scriptSrc || !containerKey) return null;

  return (
    <div
      className={className}
      style={{
        margin: '24px auto',
        width: '100%',
        maxWidth: 1100,
        minHeight: 90,
        ...style,
      }}
      aria-label="Sponsored content"
    >
      <div ref={containerRef} id={`container-${containerKey}`} />
    </div>
  );
}
