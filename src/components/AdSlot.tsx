'use client';

import { useSyncExternalStore } from 'react';
import AdsterraIframeBanner from './AdsterraIframeBanner';
import SponsorCta from './SponsorCta';

type AdSlotSize = 'leaderboard' | 'rectangle';
type AdSlotPlacement =
  | 'home-inline'
  | 'tool-top'
  | 'tool-mid'
  | 'tool-sidebar-secondary'
  | 'tool-bottom'
  | 'tools-index-top'
  | 'tools-index-bottom'
  | 'blog-list-top'
  | 'blog-list-bottom'
  | 'blog-article-top'
  | 'blog-article-mid'
  | 'blog-article-bottom'
  | 'category-top'
  | 'category-bottom';

interface AdSlotProps {
  size?: AdSlotSize;
  placement?: AdSlotPlacement;
  category?: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackToSponsor?: boolean;
}

declare global {
  interface Window {
    __DEVTOOLBOX_ADS__?: {
      topKey?: string;
    };
  }
}

const AD_KEYS: Record<AdSlotPlacement, string | undefined> = {
  'home-inline': process.env.NEXT_PUBLIC_ADSTERRA_HOME_INLINE_KEY,
  'tool-top': process.env.NEXT_PUBLIC_ADSTERRA_TOOL_TOP_KEY,
  'tool-mid': process.env.NEXT_PUBLIC_ADSTERRA_TOOL_MID_KEY,
  'tool-sidebar-secondary': process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY,
  'tool-bottom': process.env.NEXT_PUBLIC_ADSTERRA_TOOL_BOTTOM_KEY,
  'tools-index-top': process.env.NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_TOP_KEY,
  'tools-index-bottom': process.env.NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_BOTTOM_KEY,
  'blog-list-top': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_TOP_KEY,
  'blog-list-bottom': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_BOTTOM_KEY,
  'blog-article-top': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_TOP_KEY,
  'blog-article-mid': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_MID_KEY,
  'blog-article-bottom': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_BOTTOM_KEY,
  'category-top': process.env.NEXT_PUBLIC_ADSTERRA_CATEGORY_TOP_KEY,
  'category-bottom': process.env.NEXT_PUBLIC_ADSTERRA_CATEGORY_BOTTOM_KEY,
};

const GLOBAL_LEADERBOARD_KEY = process.env.NEXT_PUBLIC_ADSTERRA_TOP_KEY || undefined;

const GLOBAL_LEADERBOARD_FALLBACK_PLACEMENTS = new Set<AdSlotPlacement>([
  'home-inline',
  'tool-top',
  'tool-mid',
  'tool-bottom',
  'tools-index-top',
  'tools-index-bottom',
  'blog-list-top',
  'blog-list-bottom',
  'blog-article-top',
  'blog-article-mid',
  'blog-article-bottom',
  'category-top',
  'category-bottom',
]);

function canUseGlobalLeaderboardFallback(placement: AdSlotPlacement | undefined, size: AdSlotSize) {
  return Boolean(
    placement &&
    size === 'leaderboard' &&
    GLOBAL_LEADERBOARD_FALLBACK_PLACEMENTS.has(placement)
  );
}

function subscribeRuntimeAds(onStoreChange: () => void) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(onStoreChange);
  } else {
    window.setTimeout(onStoreChange, 0);
  }

  return () => {};
}

function getClientRuntimeAdSnapshot() {
  const topKey = window.__DEVTOOLBOX_ADS__?.topKey || GLOBAL_LEADERBOARD_KEY || '';
  return `1:${topKey}`;
}

function getServerRuntimeAdSnapshot() {
  return GLOBAL_LEADERBOARD_KEY ? `1:${GLOBAL_LEADERBOARD_KEY}` : '0:';
}

function getAdKey(
  placement: AdSlotPlacement | undefined,
  size: AdSlotSize,
  runtimeLeaderboardKey?: string
) {
  if (!placement) return undefined;

  const placementKey = AD_KEYS[placement];
  if (placementKey) return placementKey;

  if (canUseGlobalLeaderboardFallback(placement, size)) {
    return runtimeLeaderboardKey || GLOBAL_LEADERBOARD_KEY;
  }

  return undefined;
}

function getDimensions(size: AdSlotSize) {
  if (size === 'rectangle') {
    return { width: 300, height: 250 };
  }
  return { width: 728, height: 90 };
}

export default function AdSlot({
  size = 'leaderboard',
  placement,
  category,
  className,
  style,
  fallbackToSponsor = false,
}: AdSlotProps) {
  const runtimeAdSnapshot = useSyncExternalStore(
    subscribeRuntimeAds,
    getClientRuntimeAdSnapshot,
    getServerRuntimeAdSnapshot
  );
  const runtimeChecked = runtimeAdSnapshot.startsWith('1:');
  const runtimeLeaderboardKey = runtimeAdSnapshot.slice(2) || undefined;
  const canUseRuntimeLeaderboard = canUseGlobalLeaderboardFallback(placement, size);
  const adKey = getAdKey(placement, size, runtimeLeaderboardKey);

  if (!adKey) {
    if (!fallbackToSponsor || !placement) return null;
    if (canUseRuntimeLeaderboard && !runtimeChecked) return null;

    return (
      <SponsorCta
        placement={`${placement}-ad-fallback`}
        category={category}
        id={`${placement}-ad-fallback-sponsor`}
      />
    );
  }

  const { width, height } = getDimensions(size);

  return (
    <AdsterraIframeBanner
      adKey={adKey}
      width={width}
      height={height}
      placement={placement}
      category={category}
      className={className}
      style={style}
      fallbackToSponsor={fallbackToSponsor}
      fallbackPlacement={placement ? `${placement}-ad-empty` : undefined}
      fallbackId={placement ? `${placement}-ad-empty-sponsor` : undefined}
    />
  );
}
