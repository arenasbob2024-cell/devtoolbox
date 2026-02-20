/**
 * URL hash state utilities for sharing tool state via URL.
 * Uses URL hash (#) to keep data client-side only.
 */

export function encodeForUrl(text: string): string {
  try {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(text))));
  } catch {
    return '';
  }
}

export function decodeFromUrl(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(decodeURIComponent(encoded))));
  } catch {
    return '';
  }
}

export function getHashParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const hash = window.location.hash.slice(1);
  if (!hash) return {};
  const params: Record<string, string> = {};
  hash.split('&').forEach(pair => {
    const eqIndex = pair.indexOf('=');
    if (eqIndex > 0) {
      const key = pair.slice(0, eqIndex);
      const val = pair.slice(eqIndex + 1);
      if (key && val) params[key] = val;
    }
  });
  return params;
}

export function setHashParams(params: Record<string, string>) {
  const hash = Object.entries(params)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  if (hash) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${hash}`);
  }
}
