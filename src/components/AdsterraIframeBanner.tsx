'use client';

import { useEffect, useRef, useState } from 'react';
import { trackMonetizationImpression } from '@/lib/analytics';
import SponsorCta from './SponsorCta';

/**
 * Adsterra iframe Banner (traditional format with fixed size: 728x90, 300x250, etc.)
 * --------------------------------------------------
 * Uses Adsterra's `atOptions` + invoke.js loading pattern. Because atOptions is
 * a SHARED global on the page, mounting multiple banners directly would let
 * later instances overwrite earlier ones before their invoke.js script can read
 * them. To avoid that race, each banner renders inside its own srcDoc iframe —
 * isolated execution context, no global collision.
 *
 * Configure per-instance via props or env vars (set NEXT_PUBLIC_*_KEY in Vercel).
 */

interface Props {
  /** Adsterra ad unit key (the 32-char hex string from the Adsterra dashboard). */
  adKey?: string;
  /** Banner width in px (must match what was created in Adsterra: 728/300/468/160/320). */
  width: number;
  /** Banner height in px (must match: 90/250/600/300/50/60). */
  height: number;
  className?: string;
  style?: React.CSSProperties;
  placement?: string;
  category?: string;
  fallbackToSponsor?: boolean;
  fallbackPlacement?: string;
  fallbackId?: string;
  fallbackDelayMs?: number;
}

export default function AdsterraIframeBanner({
  adKey,
  width,
  height,
  className,
  style,
  placement = 'adsterra-iframe',
  category,
  fallbackToSponsor = false,
  fallbackPlacement,
  fallbackId,
  fallbackDelayMs = 6000,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const trackedRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current || !adKey) return;

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
  }, [adKey, category, placement]);

  useEffect(() => {
    if (!adKey || !fallbackToSponsor || showFallback) return;

    const timer = window.setTimeout(() => {
      let renderedAd = false;

      try {
        const frame = iframeRef.current;
        const body = frame?.contentDocument?.body;
        renderedAd = Boolean(body?.querySelector('iframe, img, a, ins, object, embed'));
      } catch {
        renderedAd = true;
      }

      if (!renderedAd) {
        setShowFallback(true);
      }
    }, fallbackDelayMs);

    return () => window.clearTimeout(timer);
  }, [adKey, fallbackDelayMs, fallbackToSponsor, showFallback]);

  if (!adKey) return null;

  if (showFallback) {
    return (
      <SponsorCta
        placement={fallbackPlacement || `${placement}-ad-empty`}
        category={category}
        id={fallbackId || `${placement}-ad-empty-sponsor`}
      />
    );
  }

  // Inline document loaded into the sandboxed iframe.
  const srcDoc = `<!doctype html><html><head><style>body{margin:0;padding:0;background:transparent}</style></head><body><script type="text/javascript">atOptions={'key':'${adKey}','format':'iframe','height':${height},'width':${width},'params':{}};</script><script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script></body></html>`;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        margin: '20px auto',
        width: '100%',
        maxWidth: width,
        textAlign: 'center',
        ...style,
      }}
      aria-label="Sponsored content"
    >
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        width={width}
        height={height}
        scrolling="no"
        style={{
          border: 0,
          display: 'block',
          margin: '0 auto',
          maxWidth: '100%',
        }}
        // Adsterra's invoke.js needs scripts and the click-through must be able
        // to open the advertiser's destination in a new tab.
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
        title="Sponsored"
        loading="lazy"
      />
    </div>
  );
}
