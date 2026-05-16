'use client';

import AdsterraIframeBanner from './AdsterraIframeBanner';

type AdSlotSize = 'leaderboard' | 'rectangle';
type AdSlotPlacement =
  | 'tool-top'
  | 'tool-sidebar-secondary'
  | 'tool-bottom'
  | 'blog-list-top'
  | 'blog-list-bottom'
  | 'blog-article-top'
  | 'blog-article-bottom';

interface AdSlotProps {
  size?: AdSlotSize;
  placement?: AdSlotPlacement;
  className?: string;
  style?: React.CSSProperties;
}

const AD_KEYS: Record<AdSlotPlacement, string | undefined> = {
  'tool-top': process.env.NEXT_PUBLIC_ADSTERRA_TOOL_TOP_KEY,
  'tool-sidebar-secondary': process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY,
  'tool-bottom': process.env.NEXT_PUBLIC_ADSTERRA_TOOL_BOTTOM_KEY,
  'blog-list-top': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_TOP_KEY,
  'blog-list-bottom': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_BOTTOM_KEY,
  'blog-article-top': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_TOP_KEY,
  'blog-article-bottom': process.env.NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_BOTTOM_KEY,
};

function getDimensions(size: AdSlotSize) {
  if (size === 'rectangle') {
    return { width: 300, height: 250 };
  }
  return { width: 728, height: 90 };
}

export default function AdSlot({
  size = 'leaderboard',
  placement,
  className,
  style,
}: AdSlotProps) {
  const adKey = placement ? AD_KEYS[placement] : undefined;
  if (!adKey) return null;

  const { width, height } = getDimensions(size);

  return (
    <AdsterraIframeBanner
      adKey={adKey}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}
