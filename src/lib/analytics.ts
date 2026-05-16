'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface MonetizationClick {
  type: 'adsterra' | 'affiliate' | 'support' | 'sponsor';
  id: string;
  category?: string;
  placement?: string;
}

interface ToolShareEvent {
  method: 'x' | 'linkedin' | 'copy-link';
  toolId?: string;
  category?: string;
  placement?: string;
}

export function trackMonetizationClick({
  type,
  id,
  category,
  placement,
}: MonetizationClick) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'monetization_click', {
    monetization_type: type,
    monetization_id: id,
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackToolShare({
  method,
  toolId,
  category,
  placement,
}: ToolShareEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'tool_share', {
    share_method: method,
    tool_id: toolId || 'unknown',
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackMonetizationImpression({
  type,
  id,
  category,
  placement,
}: MonetizationClick) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'monetization_impression', {
    monetization_type: type,
    monetization_id: id,
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}
