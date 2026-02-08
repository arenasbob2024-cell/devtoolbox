'use client';

interface AdSlotProps {
  size?: 'banner' | 'rectangle' | 'leaderboard';
  style?: React.CSSProperties;
}

export default function AdSlot({ size = 'banner', style }: AdSlotProps) {
  const sizes = {
    banner: { width: '100%', minHeight: 90, maxWidth: 728 },
    rectangle: { width: 300, minHeight: 250 },
    leaderboard: { width: '100%', minHeight: 90, maxWidth: '100%' },
  };

  const s = sizes[size];

  return (
    <div
      className="ad-slot"
      style={{
        ...s,
        margin: '20px auto',
        ...style,
      }}
    >
      {/* Google AdSense will be placed here */}
      {/* <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" /> */}
      <span>Ad Space</span>
    </div>
  );
}
