'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
  size?: 'banner' | 'rectangle' | 'leaderboard';
  style?: React.CSSProperties;
}

export default function AdSlot({ size = 'banner', style }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      ((window as unknown as Record<string, unknown[]>).adsbygoogle =
        (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* adsbygoogle not loaded yet */
    }
  }, []);

  const sizeMap = {
    banner: { display: 'block', width: '100%', height: '90px' } as React.CSSProperties,
    rectangle: { display: 'inline-block', width: '300px', height: '250px' } as React.CSSProperties,
    leaderboard: { display: 'block', width: '100%', height: '90px' } as React.CSSProperties,
  };

  return (
    <div className="ad-slot" style={{ margin: '20px auto', textAlign: 'center', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={sizeMap[size]}
        data-ad-client="ca-pub-4725521983849501"
        data-ad-format={size === 'rectangle' ? 'auto' : 'horizontal'}
        data-full-width-responsive="true"
      />
    </div>
  );
}
