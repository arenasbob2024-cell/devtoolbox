'use client';

import { useEffect, useMemo } from 'react';
import { trackMonetizationImpression } from '@/lib/analytics';

interface Props {
  scriptSrc?: string;
  placement?: string;
  delayMs?: number;
  sessionCap?: boolean;
}

const SCRIPT_ATTR = 'data-adsterra-social-bar';
const SESSION_STORAGE_KEY = 'devtoolbox-adsterra-social-bar-loaded';

function normalizeScriptSrc(scriptSrc: string) {
  const trimmedScriptSrc = scriptSrc.trim();
  if (trimmedScriptSrc.startsWith('http')) return trimmedScriptSrc;
  if (trimmedScriptSrc.startsWith('//')) return `https:${trimmedScriptSrc}`;
  return trimmedScriptSrc;
}

/**
 * Optional high-yield Adsterra script slot.
 * Disabled unless NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT is configured.
 */
export default function AdsterraSocialBar({
  scriptSrc,
  placement = 'site-social-bar',
  delayMs = 15000,
  sessionCap = true,
}: Props) {
  const normalizedScriptSrc = useMemo(
    () => (scriptSrc ? normalizeScriptSrc(scriptSrc) : ''),
    [scriptSrc]
  );

  useEffect(() => {
    if (!normalizedScriptSrc) return;

    const safeDelayMs = Number.isFinite(delayMs) && delayMs > 0 ? delayMs : 0;
    const timer = window.setTimeout(() => {
      if (sessionCap) {
        try {
          if (window.sessionStorage.getItem(SESSION_STORAGE_KEY) === '1') {
            return;
          }
        } catch {
          // sessionStorage may be unavailable; still allow the configured test to run.
        }
      }

      const existing = document.querySelector(`script[${SCRIPT_ATTR}="true"]`);
      if (existing) return;

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute(SCRIPT_ATTR, 'true');
      script.src = normalizedScriptSrc;
      document.body.appendChild(script);

      if (sessionCap) {
        try {
          window.sessionStorage.setItem(SESSION_STORAGE_KEY, '1');
        } catch {
          // A blocked write should not break the ad experiment.
        }
      }

      trackMonetizationImpression({
        type: 'adsterra',
        id: placement,
        placement,
      });
    }, safeDelayMs);

    return () => window.clearTimeout(timer);
  }, [delayMs, normalizedScriptSrc, placement, sessionCap]);

  return null;
}
