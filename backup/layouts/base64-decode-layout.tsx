import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Decode Online - Decode Base64 to Text Free', description: 'Free online Base64 decoder. Decode Base64 encoded strings to plain text instantly in your browser. Also encode text to Base64.' },
  fr: { title: 'Decodeur Base64 en Ligne Gratuit', description: 'Decodez des chaines Base64 en texte brut instantanement dans votre navigateur.' },
  de: { title: 'Base64 Decoder Online Kostenlos', description: 'Dekodieren Sie Base64-Strings sofort in Klartext im Browser.' },
  it: { title: 'Decodificatore Base64 Online Gratis', description: 'Decodifica stringhe Base64 in testo normale istantaneamente nel browser.' },
  es: { title: 'Decodificador Base64 en Linea Gratis', description: 'Decodifica cadenas Base64 a texto plano al instante en tu navegador.' },
  pt: { title: 'Decodificador Base64 Online Gratis', description: 'Decodifique strings Base64 para texto simples instantaneamente no navegador.' },
  nl: { title: 'Base64 Decoder Online Gratis', description: 'Decodeer Base64-strings naar platte tekst direct in uw browser.' },
  pl: { title: 'Dekoder Base64 Online Za Darmo', description: 'Dekoduj ciagi Base64 na tekst natychmiast w przegladarce.' },
  sv: { title: 'Base64 Avkodare Online Gratis', description: 'Avkoda Base64-straengar till klartext direkt i webblaasaren.' },
  no: { title: 'Base64 Dekoder Online Gratis', description: 'Dekod Base64-strenger til ren tekst umiddelbart i nettleseren.' },
  zh: { title: 'Base64 解码器 - 免费在线 Base64 解码工具', description: '免费在线 Base64 解码工具。在浏览器中即时将 Base64 编码字符串解码为纯文本。' },
  ja: { title: 'Base64 デコーダー - 無料オンラインデコードツール', description: '無料 Base64 デコーダー。ブラウザで即座に Base64 文字列をプレーンテキストにデコード。' },
  ko: { title: 'Base64 디코더 - 무료 온라인 디코드 도구', description: '무료 Base64 디코더. 브라우저에서 즉시 Base64 문자열을 일반 텍스트로 디코드.' },
  id: { title: 'Dekoder Base64 Online Gratis', description: 'Dekode string Base64 ke teks biasa secara instan di browser.' },
  th: { title: 'ตัวถอดรหัส Base64 ออนไลน์ฟรี', description: 'ถอดรหัสสตริง Base64 เป็นข้อความธรรมดาทันทีในเบราว์เซอร์' },
};

const slug = 'base64-decode';

export async function generateStaticParams() { return i18n.locales.map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title, description: t.description,
    keywords: ['base64 decode', 'base64 decoder', 'decode base64', 'base64 to text', 'base64 decode online', 'base64 converter'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
