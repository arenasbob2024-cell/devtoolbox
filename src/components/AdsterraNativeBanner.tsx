'use client';

import { useEffect, useRef, useState } from 'react';
import { trackMonetizationImpression } from '@/lib/analytics';
import SponsorCta from './SponsorCta';

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
  placement?: string;
  category?: string;
  fallbackToSponsor?: boolean;
  fallbackDelayMs?: number;
}

export default function AdsterraNativeBanner({
  className,
  style,
  scriptSrc: overrideScript,
  containerKey: overrideKey,
  placement = 'site-bottom-native',
  category,
  fallbackToSponsor = false,
  fallbackDelayMs = 8000,
}: Props) {
  const scriptSrc = overrideScript || process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT;
  const containerKey = overrideKey || process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef(false);
  const trackedRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

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

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || trackedRef.current || !scriptSrc || !containerKey) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;
      trackMonetizationImpression({
        type: 'adsterra',
        id: placement,
        category,
        placement,
      });
    };

    if (!('IntersectionObserver' in window)) {
      track();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        track();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [category, containerKey, placement, scriptSrc]);

  useEffect(() => {
    if (!fallbackToSponsor || showFallback) return;
    if (!scriptSrc || !containerKey) return;

    const timer = window.setTimeout(() => {
      const container = containerRef.current;
      const hasRenderedNativeAd = Boolean(
        container && (container.children.length > 0 || container.textContent?.trim())
      );

      if (!hasRenderedNativeAd) {
        setShowFallback(true);
      }
    }, fallbackDelayMs);

    return () => window.clearTimeout(timer);
  }, [containerKey, fallbackDelayMs, fallbackToSponsor, scriptSrc, showFallback]);

  if (!scriptSrc || !containerKey || showFallback) {
    if (!fallbackToSponsor) return null;

    const fallbackPlacement = !scriptSrc || !containerKey
      ? `${placement}-ad-fallback`
      : `${placement}-ad-empty`;

    return (
      <SponsorCta
        placement={fallbackPlacement}
        category={category}
        id={`${fallbackPlacement}-sponsor`}
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        margin: '24px auto',
        width: '100%',
        maxWidth: 1100,
        minHeight: 90,
        ...style,
      }}
      aria-label="Sponsored content"
      data-ad-provider="adsterra"
      data-ad-placement={placement}
      data-ad-category={category}
    >
      <div ref={containerRef} id={`container-${containerKey}`} />
    </div>
  );
}
