import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SVG to React Component Converter Online Free', description: 'Convert SVG files to React components instantly. Transforms SVG markup into JSX with proper React syntax and camelCase attributes.' },
  fr: { title: 'Convertisseur SVG en Composant React Gratuit', description: 'Convertissez SVG en composants React avec syntaxe JSX.' },
  de: { title: 'SVG zu React Komponente Konverter Kostenlos', description: 'SVG in React-Komponenten mit JSX-Syntax konvertieren.' },
  it: { title: 'Convertitore SVG in Componente React Gratis', description: 'Converti SVG in componenti React con sintassi JSX.' },
  es: { title: 'Convertidor SVG a Componente React Gratis', description: 'Convierte SVG a componentes React con sintaxis JSX.' },
  pt: { title: 'Conversor SVG para Componente React Gratis', description: 'Converta SVG para componentes React com sintaxe JSX.' },
  nl: { title: 'SVG naar React Component Converter Gratis', description: 'Converteer SVG naar React-componenten met JSX-syntax.' },
  pl: { title: 'Konwerter SVG na Komponent React Za Darmo', description: 'Konwertuj SVG na komponenty React z skladnia JSX.' },
  sv: { title: 'SVG till React Komponent Konverterare Gratis', description: 'Konvertera SVG till React-komponenter med JSX-syntax.' },
  no: { title: 'SVG til React Komponent Konverterer Gratis', description: 'Konverter SVG til React-komponenter med JSX-syntaks.' },
  zh: { title: 'SVG 转 React 组件转换器 - 免费在线工具', description: '免费将 SVG 转换为 React 组件。自动转换为 JSX 语法。' },
  ja: { title: 'SVG to React コンポーネント変換ツール', description: 'SVGをReactコンポーネントに変換。JSX構文に自動変換。' },
  ko: { title: 'SVG to React 컴포넌트 변환기', description: 'SVG를 React 컴포넌트로 변환. JSX 구문 자동 변환.' },
  id: { title: 'Konverter SVG ke Komponen React Gratis', description: 'Konversi SVG ke komponen React dengan sintaks JSX.' },
  th: { title: 'ตัวแปลง SVG เป็นคอมโพเนนต์ React ฟรี', description: 'แปลง SVG เป็นคอมโพเนนต์ React พร้อม JSX' },
};
const slug = 'svg-to-react';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params; const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['svg to react', 'svg to react component', 'svg react converter', 'convert svg to jsx', 'svg component generator'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
