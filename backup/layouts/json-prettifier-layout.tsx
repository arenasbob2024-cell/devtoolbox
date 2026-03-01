import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Prettifier Online - Format & Beautify JSON Free', description: 'Free online JSON prettifier. Format, beautify, and validate JSON data instantly in your browser with customizable indentation.' },
  fr: { title: 'Embellisseur JSON en Ligne Gratuit', description: 'Formatez et embellissez JSON instantanement dans votre navigateur.' },
  de: { title: 'JSON Verschoenerer Online Kostenlos', description: 'JSON formatieren und verschoenern im Browser.' },
  it: { title: 'JSON Prettifier Online Gratis', description: 'Formatta e abbellisci JSON istantaneamente nel browser.' },
  es: { title: 'Embellecedor JSON en Linea Gratis', description: 'Formatea y embellece JSON al instante en tu navegador.' },
  pt: { title: 'Embelezador JSON Online Gratis', description: 'Formate e embeleze JSON instantaneamente no navegador.' },
  nl: { title: 'JSON Prettifier Online Gratis', description: 'JSON formatteren en verfraaien in uw browser.' },
  pl: { title: 'JSON Prettifier Online Za Darmo', description: 'Formatuj i upieksz JSON natychmiast w przegladarce.' },
  sv: { title: 'JSON Foerskoenare Online Gratis', description: 'Formatera och foerskoena JSON direkt i webblaasaren.' },
  no: { title: 'JSON Forskjonnelse Online Gratis', description: 'Formater og forskjonn JSON umiddelbart i nettleseren.' },
  zh: { title: 'JSON 美化器 - 免费在线 JSON 格式化工具', description: '免费在线 JSON 美化工具。在浏览器中即时格式化、美化和验证 JSON 数据。' },
  ja: { title: 'JSON 整形ツール - 無料オンライン JSON フォーマッター', description: '無料 JSON 整形ツール。ブラウザで即座に JSON を整形・美化。' },
  ko: { title: 'JSON 정리기 - 무료 온라인 JSON 포맷터', description: '무료 JSON 정리 도구. 브라우저에서 즉시 JSON 정리 및 미화.' },
  id: { title: 'JSON Prettifier Online Gratis', description: 'Format dan percantik JSON secara instan di browser.' },
  th: { title: 'ตัวจัดรูปแบบ JSON ออนไลน์ฟรี', description: 'จัดรูปแบบและตกแต่ง JSON ทันทีในเบราว์เซอร์' },
};
const slug = 'json-prettifier';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params; const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['json prettifier', 'json beautifier', 'json formatter', 'format json online', 'prettify json', 'json pretty print'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
