import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'TypeScript to JavaScript Converter - Convert TS to JS Online Free', description: 'Convert TypeScript code to JavaScript online for free. Removes type annotations, interfaces, enums, and generics to produce clean JavaScript output.' },
  zh: { title: 'TypeScript 转 JavaScript 转换器 - 免费在线 TS 转 JS 工具', description: '免费在线将 TypeScript 代码转换为 JavaScript。移除类型注解、接口和泛型。' },
  ja: { title: 'TypeScript から JavaScript への変換ツール - 無料オンライン TS to JS', description: 'TypeScript コードを JavaScript にオンラインで無料変換。型注釈、インターフェース、列挙型を除去。' },
  ko: { title: 'TypeScript to JavaScript 변환기 - 무료 온라인 TS to JS 변환', description: 'TypeScript 코드를 JavaScript로 온라인에서 무료로 변환하세요.' },
  fr: { title: 'Convertisseur TypeScript vers JavaScript - Convertir TS en JS en Ligne', description: 'Convertissez le code TypeScript en JavaScript en ligne gratuitement.' },
  de: { title: 'TypeScript zu JavaScript Konverter - TS zu JS Online Konvertieren', description: 'Konvertieren Sie TypeScript-Code kostenlos online in JavaScript.' },
  es: { title: 'Convertidor TypeScript a JavaScript - Convertir TS a JS en Linea', description: 'Convierte codigo TypeScript a JavaScript en linea gratis.' },
  pt: { title: 'Conversor TypeScript para JavaScript - Converter TS para JS Online', description: 'Converta codigo TypeScript para JavaScript online gratuitamente.' },
  it: { title: 'Convertitore TypeScript in JavaScript - Converti TS in JS Online', description: 'Converti codice TypeScript in JavaScript online gratuitamente.' },
  nl: { title: 'TypeScript naar JavaScript Converter - TS naar JS Online Converteren', description: 'Converteer TypeScript-code gratis online naar JavaScript.' },
  pl: { title: 'Konwerter TypeScript do JavaScript - Konwertuj TS na JS Online', description: 'Konwertuj kod TypeScript do JavaScript online za darmo.' },
  sv: { title: 'TypeScript till JavaScript Konverterare - Konvertera TS till JS', description: 'Konvertera TypeScript-kod till JavaScript online gratis.' },
  no: { title: 'TypeScript til JavaScript Konverter - Konverter TS til JS Online', description: 'Konverter TypeScript-kode til JavaScript online gratis.' },
  id: { title: 'Konverter TypeScript ke JavaScript - Konversi TS ke JS Online', description: 'Konversi kode TypeScript ke JavaScript secara online gratis.' },
  th: { title: 'แปลง TypeScript เป็น JavaScript - แปลง TS เป็น JS ออนไลน์ฟรี', description: 'แปลงโค้ด TypeScript เป็น JavaScript ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/typescript-to-javascript-converter`;
  return {
    title: t.title, description: t.description,
    keywords: ['typescript to javascript', 'ts to js', 'typescript converter', 'convert typescript', 'typescript to javascript online', 'ts to js converter'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/typescript-to-javascript-converter`])), 'x-default': 'https://viadreams.cc/en/tools/typescript-to-javascript-converter' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
