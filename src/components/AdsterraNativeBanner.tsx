'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from './CookieConsent';

/**
 * Adsterra Native Banner
 * --------------------------------------------------
 * Renders the Adsterra Native Banner ad unit.
 * Loads the invoke.js script ONLY after the user has explicitly
 * accepted cookies via the CookieConsent banner (GDPR compliant).
 *
 * Configure via env vars (set in Vercel project settings):
 *   NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT
 *     e.g. //pl12345678.profitableratecpm.com/abc123def456/invoke.js
 *   NEXT_PUBLIC_ADSTERRA_NATIVE_KEY
 *     e.g. abc123def456  (the key in container-XXXX)
 */
export default function AdsterraNativeBanner({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const scriptSrc = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT;
  const containerKey = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const consent = useConsent();
  const allowed = consent === 'accepted';

  useEffect(() => {
    if (!allowed || loadedRef.current) return;
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
  }, [allowed, scriptSrc, containerKey]);

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
