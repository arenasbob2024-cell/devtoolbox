'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface MonetizationClick {
  type: 'affiliate' | 'support' | 'sponsor';
  id: string;
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
