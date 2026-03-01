import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTML to React Converter Online Free', description: 'Convert HTML to React JSX components instantly. Transforms class to className, for to htmlFor, inline styles to objects, and more.' },
  fr: { title: 'Convertisseur HTML en React Gratuit', description: 'Convertissez HTML en composants React JSX. class vers className, styles inline en objets.' },
  de: { title: 'HTML zu React Konverter Kostenlos', description: 'HTML in React JSX Komponenten konvertieren. class zu className, Inline-Styles zu Objekten.' },
  it: { title: 'Convertitore HTML in React Gratis', description: 'Converti HTML in componenti React JSX. class in className, stili inline in oggetti.' },
  es: { title: 'Convertidor HTML a React Gratis', description: 'Convierte HTML a componentes React JSX. class a className, estilos inline a objetos.' },
  pt: { title: 'Conversor HTML para React Gratis', description: 'Converta HTML para componentes React JSX. class para className, estilos inline para objetos.' },
  nl: { title: 'HTML naar React Converter Gratis', description: 'Converteer HTML naar React JSX componenten.' },
  pl: { title: 'Konwerter HTML na React Za Darmo', description: 'Konwertuj HTML na komponenty React JSX.' },
  sv: { title: 'HTML till React Konverterare Gratis', description: 'Konvertera HTML till React JSX komponenter.' },
  no: { title: 'HTML til React Konverterer Gratis', description: 'Konverter HTML til React JSX komponenter.' },
  zh: { title: 'HTML 转 React 转换器 - 免费在线工具', description: '免费将 HTML 转换为 React JSX 组件。自动转换 class 为 className、内联样式为对象。' },
  ja: { title: 'HTML to React 変換ツール', description: 'HTMLをReact JSXコンポーネントに変換。classをclassNameに自動変換。' },
  ko: { title: 'HTML to React 변환기', description: 'HTML을 React JSX 컴포넌트로 변환. class를 className으로 자동 변환.' },
  id: { title: 'Konverter HTML ke React Gratis', description: 'Konversi HTML ke komponen React JSX.' },
  th: { title: 'ตัวแปลง HTML เป็น React ฟรี', description: 'แปลง HTML เป็นคอมโพเนนต์ React JSX' },
};
const slug = 'html-to-react';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params; const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['html to react', 'html to react converter', 'html to jsx', 'convert html to react', 'html react online'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
