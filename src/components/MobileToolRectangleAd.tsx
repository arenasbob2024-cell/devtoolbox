'use client';

import { useSyncExternalStore } from 'react';
import AdsterraIframeBanner from './AdsterraIframeBanner';

interface MobileToolRectangleAdProps {
  category?: string;
}

declare global {
  interface Window {
    __DEVTOOLBOX_ADS__?: {
      topKey?: string;
      sidebarKey?: string;
    };
  }
}

const MOBILE_QUERY = '(max-width: 900px)';

function subscribeMobileQuery(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerMobileSnapshot() {
  return false;
}

export default function MobileToolRectangleAd({ category }: MobileToolRectangleAdProps) {
  const isMobile = useSyncExternalStore(
    subscribeMobileQuery,
    getMobileSnapshot,
    getServerMobileSnapshot
  );

  if (!isMobile) return null;

  const adKey = window.__DEVTOOLBOX_ADS__?.sidebarKey || process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY;

  return (
    <AdsterraIframeBanner
      adKey={adKey}
      width={300}
      height={250}
      placement="tool-mobile-rectangle"
      category={category}
      fallbackToSponsor
      style={{ marginTop: 18, marginBottom: 16 }}
    />
  );
}
