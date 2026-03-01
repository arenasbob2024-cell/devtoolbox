import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTML Beautifier & Formatter Online - Format HTML Free', description: 'Free online HTML beautifier and formatter. Format, indent, and clean up messy HTML code with customizable indentation. Beautify HTML instantly.' },
  fr: { title: 'Embellisseur HTML en Ligne Gratuit - Formater HTML', description: 'Embellisseur et formateur HTML gratuit en ligne. Formatez, indentez et nettoyez le code HTML avec indentation personnalisable.' },
  de: { title: 'HTML Beautifier & Formatierer Online Kostenlos', description: 'Kostenloser Online HTML Beautifier und Formatierer. HTML-Code formatieren, einruecken und bereinigen mit anpassbarer Einrueckung.' },
  it: { title: 'Abbellitore HTML & Formattatore Online Gratis', description: 'Abbellitore e formattatore HTML gratuito online. Formatta, indenta e pulisci il codice HTML con indentazione personalizzabile.' },
  es: { title: 'Embellecedor HTML y Formateador en Linea Gratis', description: 'Embellecedor y formateador HTML gratuito en linea. Formatea, indenta y limpia el codigo HTML con indentacion personalizable.' },
  pt: { title: 'Embelezador HTML & Formatador Online Gratis', description: 'Embelezador e formatador HTML gratuito online. Formate, indente e limpe codigo HTML com indentacao personalizavel.' },
  nl: { title: 'HTML Beautifier & Formatter Online Gratis', description: 'Gratis online HTML beautifier en formatter. Formatteer, inspringingen en opschonen van HTML-code met aanpasbare inspringing.' },
  pl: { title: 'Upieksacz HTML i Formatowanie Online Za Darmo', description: 'Darmowy upieksacz i formatator HTML online. Formatuj, wcinaj i oczyszczaj kod HTML z konfigurowalnym wcieciem.' },
  sv: { title: 'HTML Beautifier & Formaterare Online Gratis', description: 'Gratis online HTML beautifier och formaterare. Formatera, indentera och stada upp HTML-kod med anpassningsbar indentering.' },
  no: { title: 'HTML Beautifier & Formateringsverktoy Online Gratis', description: 'Gratis online HTML beautifier og formateringsverktoy. Formater, indenter og rydd opp i HTML-kode med tilpassbar innrykk.' },
  zh: { title: 'HTML 美化格式化工具 - 免费在线格式化 HTML', description: '免费在线 HTML 美化和格式化工具。格式化、缩进和清理混乱的 HTML 代码，支持自定义缩进。' },
  ja: { title: 'HTML ビューティファイア＆フォーマッター - 無料オンライン', description: '無料オンライン HTML ビューティファイアとフォーマッター。カスタマイズ可能なインデントで HTML コードを整形・清掃。' },
  ko: { title: 'HTML 뷰티파이어 & 포맷터 - 무료 온라인 HTML 포맷', description: '무료 온라인 HTML 뷰티파이어 및 포맷터. 사용자 지정 들여쓰기로 HTML 코드를 포맷, 정리.' },
  id: { title: 'HTML Beautifier & Formatter Online Gratis', description: 'HTML beautifier dan formatter online gratis. Format, indent, dan bersihkan kode HTML dengan indentasi yang dapat disesuaikan.' },
  th: { title: 'HTML Beautifier & Formatter ออนไลน์ฟรี', description: 'เครื่องมือตกแต่งและจัดรูปแบบ HTML ออนไลน์ฟรี จัดรูปแบบ เยื้อง และทำความสะอาดโค้ด HTML' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/html-beautifier`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/html-beautifier`])), 'x-default': `https://viadreams.cc/en/tools/html-beautifier` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
