import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Grid Generator - Visual Grid Layout Builder Free', description: 'Build CSS Grid layouts visually with this free online generator. Adjust columns, rows, gaps, and alignment. Get production-ready CSS and HTML code instantly.' },
  fr: { title: 'Generateur CSS Grid - Constructeur Visuel Gratuit', description: 'Construisez des layouts CSS Grid visuellement avec ce generateur gratuit.' },
  de: { title: 'CSS Grid Generator - Visueller Layout Builder Kostenlos', description: 'Erstellen Sie CSS Grid Layouts visuell mit diesem kostenlosen Generator.' },
  it: { title: 'Generatore CSS Grid - Costruttore Visuale Gratis', description: 'Costruisci layout CSS Grid visivamente con questo generatore gratuito.' },
  es: { title: 'Generador CSS Grid - Constructor Visual Gratis', description: 'Construya layouts CSS Grid visualmente con este generador gratuito.' },
  pt: { title: 'Gerador CSS Grid - Construtor Visual Gratis', description: 'Construa layouts CSS Grid visualmente com este gerador gratuito.' },
  nl: { title: 'CSS Grid Generator - Visuele Layout Builder Gratis', description: 'Bouw CSS Grid layouts visueel met deze gratis generator.' },
  pl: { title: 'Generator CSS Grid - Wizualny Kreator Za Darmo', description: 'Tworzenie ukladow CSS Grid wizualnie za darmo.' },
  sv: { title: 'CSS Grid Generator - Visuell Layoutbyggare Gratis', description: 'Bygg CSS Grid-layouts visuellt med denna gratis generator.' },
  no: { title: 'CSS Grid Generator - Visuell Layoutbygger Gratis', description: 'Bygg CSS Grid-layouts visuelt med denne gratis generatoren.' },
  zh: { title: 'CSS Grid 生成器 - 可视化布局构建器 免费', description: '使用此免费在线生成器可视化构建 CSS Grid 布局。调整列、行、间距和对齐属性。' },
  ja: { title: 'CSS Grid ジェネレーター - ビジュアルレイアウトビルダー 無料', description: 'CSS Gridレイアウトをビジュアルに構築する無料オンラインジェネレーター。' },
  ko: { title: 'CSS Grid 생성기 - 비주얼 레이아웃 빌더 무료', description: '무료 온라인 생성기로 CSS Grid 레이아웃을 시각적으로 구축.' },
  id: { title: 'Generator CSS Grid - Pembuat Layout Visual Gratis', description: 'Bangun layout CSS Grid secara visual dengan generator gratis ini.' },
  th: { title: 'เครื่องสร้าง CSS Grid - ตัวสร้างเลย์เอาต์วิชวลฟรี', description: 'สร้างเลย์เอาต์ CSS Grid แบบวิชวลด้วยเครื่องมือฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-grid-generator`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-grid-generator`])), 'x-default': `https://viadreams.cc/en/tools/css-grid-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
