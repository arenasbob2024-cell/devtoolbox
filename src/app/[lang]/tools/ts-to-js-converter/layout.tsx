import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'TS to JS Converter - Convert TypeScript to JavaScript Online Free', description: 'Free online TS to JS converter. Convert TypeScript to JavaScript instantly. Remove type annotations, interfaces, and generics. TS to JS online tool.' },
  fr: { title: 'Convertisseur TS vers JS - Convertir TypeScript en JavaScript', description: 'Convertisseur TS vers JS gratuit en ligne. Convertissez TypeScript en JavaScript instantanement.' },
  de: { title: 'TS zu JS Konverter - TypeScript in JavaScript Umwandeln', description: 'Kostenloser Online TS zu JS Konverter. TypeScript sofort in JavaScript umwandeln.' },
  it: { title: 'Convertitore TS in JS - Converti TypeScript in JavaScript', description: 'Convertitore TS in JS online gratuito. Converti TypeScript in JavaScript istantaneamente.' },
  es: { title: 'Convertidor TS a JS - Convertir TypeScript a JavaScript', description: 'Convertidor TS a JS gratuito en linea. Convierte TypeScript a JavaScript al instante.' },
  pt: { title: 'Conversor TS para JS - Converter TypeScript para JavaScript', description: 'Conversor TS para JS online gratuito. Converta TypeScript para JavaScript instantaneamente.' },
  nl: { title: 'TS naar JS Converter - TypeScript naar JavaScript Omzetten', description: 'Gratis online TS naar JS converter. Converteer TypeScript naar JavaScript direct.' },
  pl: { title: 'Konwerter TS do JS - Konwertuj TypeScript na JavaScript', description: 'Darmowy konwerter TS do JS online. Konwertuj TypeScript na JavaScript natychmiast.' },
  sv: { title: 'TS till JS Konverterare - Konvertera TypeScript till JavaScript', description: 'Gratis online TS till JS konverterare. Konvertera TypeScript till JavaScript direkt.' },
  no: { title: 'TS til JS Konverterer - Konverter TypeScript til JavaScript', description: 'Gratis online TS til JS konverterer. Konverter TypeScript til JavaScript umiddelbart.' },
  zh: { title: 'TS 转 JS 转换器 - 免费在线 TypeScript 转 JavaScript', description: '免费在线 TS 转 JS 转换器。即时将 TypeScript 转换为 JavaScript，移除类型注解、接口和泛型。' },
  ja: { title: 'TS から JS コンバーター - TypeScript を JavaScript に変換', description: '無料オンライン TS から JS コンバーター。TypeScript を即座に JavaScript に変換します。' },
  ko: { title: 'TS to JS 변환기 - TypeScript를 JavaScript로 변환', description: '무료 온라인 TS to JS 변환기. TypeScript를 즉시 JavaScript로 변환합니다.' },
  id: { title: 'Konverter TS ke JS - Konversi TypeScript ke JavaScript', description: 'Konverter TS ke JS online gratis. Konversi TypeScript ke JavaScript secara instan.' },
  th: { title: 'TS เป็น JS Converter - แปลง TypeScript เป็น JavaScript', description: 'เครื่องมือแปลง TS เป็น JS ออนไลน์ฟรี แปลง TypeScript เป็น JavaScript ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/ts-to-js-converter`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/ts-to-js-converter`])),
        'x-default': `https://viadreams.cc/en/tools/ts-to-js-converter`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
