import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'XML Formatter Online - Format & Beautify XML Free', description: 'Free online XML formatter. Format, indent, and beautify XML data instantly in your browser with customizable indentation.' },
  fr: { title: 'Formateur XML en Ligne Gratuit', description: 'Formatez et embellissez XML dans votre navigateur.' },
  de: { title: 'XML Formatierer Online Kostenlos', description: 'XML formatieren und verschoenern im Browser.' },
  it: { title: 'Formattatore XML Online Gratis', description: 'Formatta e abbellisci XML nel browser.' },
  es: { title: 'Formateador XML en Linea Gratis', description: 'Formatea y embellece XML en tu navegador.' },
  pt: { title: 'Formatador XML Online Gratis', description: 'Formate e embeleze XML no navegador.' },
  nl: { title: 'XML Formatter Online Gratis', description: 'XML formatteren en verfraaien in uw browser.' },
  pl: { title: 'Formater XML Online Za Darmo', description: 'Formatuj i upieksz XML w przegladarce.' },
  sv: { title: 'XML Formaterare Online Gratis', description: 'Formatera och foerskoena XML i webblaasaren.' },
  no: { title: 'XML Formatterer Online Gratis', description: 'Formater og forskjonn XML i nettleseren.' },
  zh: { title: 'XML 在线格式化工具 - 免费 XML 美化器', description: '免费在线 XML 格式化工具。在浏览器中即时格式化和美化 XML 数据。' },
  ja: { title: 'XML フォーマッター オンライン - 無料 XML 整形ツール', description: '無料 XML フォーマッター。ブラウザで即座に XML を整形。' },
  ko: { title: 'XML 포맷터 온라인 - 무료 XML 정리 도구', description: '무료 XML 포맷터. 브라우저에서 즉시 XML 정리.' },
  id: { title: 'XML Formatter Online Gratis', description: 'Format dan percantik XML di browser.' },
  th: { title: 'ตัวจัดรูปแบบ XML ออนไลน์ฟรี', description: 'จัดรูปแบบและตกแต่ง XML ทันทีในเบราว์เซอร์' },
};
const slug = 'xml-formatter-online';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params; const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['xml formatter', 'xml formatter online', 'format xml', 'xml beautifier', 'xml prettifier', 'xml indent'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
