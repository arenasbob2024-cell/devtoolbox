import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'TypeScript Playground - TypeScript to JavaScript Converter Online Free', description: 'Free online TypeScript playground. Convert TypeScript to JavaScript with live preview. Strip types, interfaces, and generics instantly in your browser.' },
  fr: { title: 'TypeScript Playground - Convertir TypeScript en JavaScript Gratuit', description: 'Playground TypeScript gratuit. Convertissez TypeScript en JavaScript avec apercu en direct.' },
  de: { title: 'TypeScript Playground - TypeScript zu JavaScript Konverter Kostenlos', description: 'Kostenloses TypeScript Playground. Konvertieren Sie TypeScript in JavaScript mit Live-Vorschau.' },
  it: { title: 'TypeScript Playground - Convertitore TypeScript a JavaScript Gratis', description: 'TypeScript playground gratuito. Converti TypeScript in JavaScript con anteprima dal vivo.' },
  es: { title: 'TypeScript Playground - Convertidor TypeScript a JavaScript Gratis', description: 'Playground TypeScript gratuito. Convierta TypeScript a JavaScript con vista previa en vivo.' },
  pt: { title: 'TypeScript Playground - Converter TypeScript para JavaScript Gratis', description: 'Playground TypeScript gratuito. Converta TypeScript para JavaScript com preview ao vivo.' },
  nl: { title: 'TypeScript Playground - TypeScript naar JavaScript Converter Gratis', description: 'Gratis TypeScript playground. Converteer TypeScript naar JavaScript met live preview.' },
  pl: { title: 'TypeScript Playground - Konwerter TypeScript do JavaScript Za Darmo', description: 'Darmowy TypeScript playground. Konwersja TypeScript na JavaScript z podgladem na zywo.' },
  sv: { title: 'TypeScript Playground - TypeScript till JavaScript Konverterare Gratis', description: 'Gratis TypeScript playground. Konvertera TypeScript till JavaScript med foerhandsgranskning.' },
  no: { title: 'TypeScript Playground - TypeScript til JavaScript Konverterer Gratis', description: 'Gratis TypeScript playground. Konverter TypeScript til JavaScript med direkte forhaandsvisning.' },
  zh: { title: 'TypeScript Playground - 免费在线 TypeScript 转 JavaScript 转换器', description: '免费在线 TypeScript playground。实时预览将 TypeScript 转换为 JavaScript。在浏览器中即时剥离类型、接口和泛型。' },
  ja: { title: 'TypeScript Playground - TypeScriptからJavaScript無料変換', description: '無料TypeScript Playground。ライブプレビューでTypeScriptをJavaScriptに変換。' },
  ko: { title: 'TypeScript Playground - TypeScript를 JavaScript로 무료 변환', description: '무료 TypeScript Playground. 라이브 프리뷰로 TypeScript를 JavaScript로 변환합니다.' },
  id: { title: 'TypeScript Playground - Konversi TypeScript ke JavaScript Gratis', description: 'TypeScript playground gratis. Konversi TypeScript ke JavaScript dengan preview langsung.' },
  th: { title: 'TypeScript Playground - แปลง TypeScript เป็น JavaScript ฟรี', description: 'TypeScript playground ออนไลน์ฟรี แปลง TypeScript เป็น JavaScript พร้อมตัวอย่างแบบเรียลไทม์' },
};

const slug = 'typescript-playground';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['typescript playground', 'typescript to javascript', 'ts to js', 'typescript converter', 'typescript compiler', 'typescript online', 'strip types'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
