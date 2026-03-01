import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';
const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Formatter & Beautifier Online Free', description: 'Free online CSS formatter and beautifier. Format, indent, and beautify minified CSS code instantly in your browser.' },
  fr: { title: 'Formateur CSS en Ligne Gratuit', description: 'Formatez et embellissez du code CSS minifie dans votre navigateur.' },
  de: { title: 'CSS Formatierer Online Kostenlos', description: 'CSS-Code formatieren und verschoenern im Browser.' },
  it: { title: 'Formattatore CSS Online Gratis', description: 'Formatta e abbellisci codice CSS minificato nel browser.' },
  es: { title: 'Formateador CSS en Linea Gratis', description: 'Formatea y embellece codigo CSS minificado en tu navegador.' },
  pt: { title: 'Formatador CSS Online Gratis', description: 'Formate e embeleze codigo CSS minificado no navegador.' },
  nl: { title: 'CSS Formatter Online Gratis', description: 'CSS-code formatteren en verfraaien in uw browser.' },
  pl: { title: 'Formater CSS Online Za Darmo', description: 'Formatuj i upieksz zminifikowany kod CSS w przegladarce.' },
  sv: { title: 'CSS Formaterare Online Gratis', description: 'Formatera och foerskoena CSS-kod i webblaasaren.' },
  no: { title: 'CSS Formatterer Online Gratis', description: 'Formater og forskjonn CSS-kode i nettleseren.' },
  zh: { title: 'CSS 格式化工具 - 免费在线 CSS 美化器', description: '免费在线 CSS 格式化工具。在浏览器中即时格式化和美化压缩的 CSS 代码。' },
  ja: { title: 'CSS フォーマッター - 無料オンライン CSS 整形ツール', description: '無料 CSS フォーマッター。ブラウザで即座に CSS コードを整形・美化。' },
  ko: { title: 'CSS 포맷터 - 무료 온라인 CSS 정리 도구', description: '무료 CSS 포맷터. 브라우저에서 즉시 CSS 코드 정리 및 미화.' },
  id: { title: 'CSS Formatter Online Gratis', description: 'Format dan percantik kode CSS yang diminifikasi di browser.' },
  th: { title: 'ตัวจัดรูปแบบ CSS ออนไลน์ฟรี', description: 'จัดรูปแบบและตกแต่งโค้ด CSS ที่ถูกบีบอัดทันทีในเบราว์เซอร์' },
};
const slug = 'css-formatter';
export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params; const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en; const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return { title: t.title, description: t.description, keywords: ['css formatter', 'css beautifier', 'format css online', 'css prettifier', 'beautify css', 'css indent'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } } };
}
export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
