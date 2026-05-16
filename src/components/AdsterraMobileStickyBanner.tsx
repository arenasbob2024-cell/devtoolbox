'use client';

import { useState } from 'react';
import AdsterraIframeBanner from './AdsterraIframeBanner';

interface Props {
  adKey?: string;
  width?: number;
  height?: number;
}

export default function AdsterraMobileStickyBanner({
  adKey,
  width = 320,
  height = 50,
}: Props) {
  const [closed, setClosed] = useState(false);

  if (!adKey || closed) return null;

  return (
    <>
      <style>{`
        .mobile-sticky-adsterra {
          display: none;
        }
        @media (max-width: 767px) {
          .mobile-sticky-adsterra {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9998;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding: 6px 8px max(6px, env(safe-area-inset-bottom));
            background: rgba(10, 10, 15, 0.92);
            border-top: 1px solid var(--border-color);
            box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.35);
          }
        }
      `}</style>
      <div className="mobile-sticky-adsterra" aria-label="Sponsored content">
        <div style={{ position: 'relative', width: '100%', maxWidth: width }}>
          <button
            type="button"
            aria-label="Close sponsored content"
            onClick={() => setClosed(true)}
            style={{
              position: 'absolute',
              right: 0,
              top: -24,
              width: 22,
              height: 22,
              borderRadius: 999,
              border: '1px solid var(--border-color)',
              background: 'rgba(15, 15, 22, 0.98)',
              color: 'var(--text-secondary)',
              fontSize: 15,
              lineHeight: '18px',
              cursor: 'pointer',
            }}
          >
            x
          </button>
          <AdsterraIframeBanner
            adKey={adKey}
            width={width}
            height={height}
            placement="mobile-sticky"
            style={{ margin: 0 }}
          />
        </div>
      </div>
    </>
  );
}
