'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import AdsterraIframeBanner from './AdsterraIframeBanner';
import { useLang } from '@/i18n/LangContext';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';
import { useConsent } from './CookieConsent';

interface Props {
  adKey?: string;
  width?: number;
  height?: number;
  fallbackToSponsor?: boolean;
}

const CLOSE_STORAGE_KEY = 'devtoolbox-mobile-sticky-closed-until';
const CLOSE_TTL_MS = 24 * 60 * 60 * 1000;

const fallbackCopy = {
  en: {
    label: 'Sponsor DevToolBox',
    title: 'Reach developer traffic on mobile',
    cta: 'Advertise',
    directLabel: 'Sponsored offer',
    directTitle: 'Open a matched developer offer',
    directCta: 'Open',
  },
  zh: {
    label: '赞助 DevToolBox',
    title: '触达移动端开发者流量',
    cta: '投放广告',
    directLabel: '赞助推荐',
    directTitle: '打开匹配的开发者推荐',
    directCta: '打开',
  },
  ru: {
    label: 'Спонсор DevToolBox',
    title: 'Охватите мобильный трафик разработчиков',
    cta: 'Реклама',
    directLabel: 'Спонсорский оффер',
    directTitle: 'Открыть подходящее предложение',
    directCta: 'Открыть',
  },
};

function MobileSponsorFallback({
  width,
  height,
  placement,
}: {
  width: number;
  height: number;
  placement: string;
}) {
  const { lang } = useLang();
  const t = fallbackCopy[lang as keyof typeof fallbackCopy] || fallbackCopy.en;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackedRef = useRef(false);
  const directLink = useMemo(
    () => getAdsterraDirectLink({ placement, category: 'mobile', lang }),
    [lang, placement]
  );
  const sponsorHref = `/${lang}/advertise/?source=${encodeURIComponent(placement)}&category=mobile`;
  const activeOffer = directLink
    ? {
        href: directLink.url,
        label: t.directLabel,
        title: t.directTitle,
        cta: t.directCta,
        type: 'adsterra' as const,
        id: directLink.id,
        external: true,
      }
    : {
        href: sponsorHref,
        label: t.label,
        title: t.title,
        cta: t.cta,
        type: 'sponsor' as const,
        id: `${placement}-sponsor`,
        external: false,
      };

  useEffect(() => {
    const element = containerRef.current;
    if (!element || trackedRef.current) return;

    const track = () => {
      if (trackedRef.current) return;
      trackedRef.current = true;
      trackMonetizationImpression({
        type: activeOffer.type,
        id: activeOffer.id,
        category: 'mobile',
        placement,
      });
    };

    if (!('IntersectionObserver' in window)) {
      track();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        track();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [activeOffer.id, activeOffer.type, placement]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: width,
        minHeight: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        padding: '7px 10px',
        borderRadius: 8,
        border: '1px solid rgba(16,185,129,0.35)',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(59,130,246,0.16))',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{
          margin: '0 0 2px',
          color: 'var(--accent-emerald)',
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 0,
          textTransform: 'uppercase',
          lineHeight: 1.2,
        }}>
          {activeOffer.label}
        </p>
        <p style={{
          margin: 0,
          color: 'var(--text-primary)',
          fontSize: 12,
          fontWeight: 750,
          lineHeight: 1.25,
        }}>
          {activeOffer.title}
        </p>
      </div>
      <a
        href={activeOffer.href}
        target={activeOffer.external ? '_blank' : undefined}
        rel={activeOffer.external ? 'noopener sponsored nofollow' : undefined}
        onClick={() => trackMonetizationClick({
          type: activeOffer.type,
          id: activeOffer.id,
          category: 'mobile',
          placement,
        })}
        style={{
          flex: '0 0 auto',
          padding: '7px 9px',
          borderRadius: 7,
          background: 'var(--accent-blue)',
          color: '#fff',
          fontSize: 11,
          fontWeight: 800,
          textDecoration: 'none',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {activeOffer.cta}
      </a>
    </div>
  );
}

export default function AdsterraMobileStickyBanner({
  adKey,
  width = 320,
  height = 50,
  fallbackToSponsor = false,
}: Props) {
  const consent = useConsent();
  const [ready, setReady] = useState(false);
  const [closed, setClosed] = useState(false);
  const fallbackPlacement = adKey ? 'mobile-sticky-ad-empty' : 'mobile-sticky-ad-fallback';

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const closedUntil = Number(window.localStorage.getItem(CLOSE_STORAGE_KEY));
        if (closedUntil > Date.now()) {
          setClosed(true);
        } else if (closedUntil) {
          window.localStorage.removeItem(CLOSE_STORAGE_KEY);
        }
      } catch {
        // localStorage can be unavailable in hardened browsers; keep the bar usable.
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setClosed(true);
    try {
      window.localStorage.setItem(CLOSE_STORAGE_KEY, String(Date.now() + CLOSE_TTL_MS));
    } catch {
      // Closing still works for the current page even if persistence is blocked.
    }
  };

  if (consent === null || !ready || closed || (!adKey && !fallbackToSponsor)) return null;

  const fallbackContent = fallbackToSponsor ? (
    <MobileSponsorFallback
      width={width}
      height={height}
      placement={fallbackPlacement}
    />
  ) : undefined;

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
            onClick={close}
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
          {adKey ? (
            <AdsterraIframeBanner
              adKey={adKey}
              width={width}
              height={height}
              placement="mobile-sticky"
              style={{ margin: 0 }}
              fallbackToSponsor={fallbackToSponsor}
              fallbackPlacement={fallbackPlacement}
              fallbackId={`${fallbackPlacement}-sponsor`}
              fallbackContent={fallbackContent}
            />
          ) : fallbackContent}
        </div>
      </div>
    </>
  );
}
