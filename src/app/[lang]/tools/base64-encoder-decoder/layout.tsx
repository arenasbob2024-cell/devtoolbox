import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Encoder Decoder - Encode & Decode Base64 Online Free', description: 'Encode and decode Base64 strings online for free. Fast, browser-based Base64 encoder decoder with UTF-8 support. No data sent to any server.' },
  zh: { title: 'Base64 编码解码器 - 免费在线 Base64 编码和解码工具', description: '免费在线编码和解码 Base64 字符串。基于浏览器的 Base64 编码解码器，支持 UTF-8。' },
  ja: { title: 'Base64 エンコーダーデコーダー - 無料オンライン Base64 変換ツール', description: 'Base64 文字列をオンラインで無料エンコード・デコード。ブラウザベースの Base64 変換ツール。' },
  ko: { title: 'Base64 인코더 디코더 - 무료 온라인 Base64 변환 도구', description: 'Base64 문자열을 온라인에서 무료로 인코딩 및 디코딩하세요. 브라우저 기반 Base64 변환 도구.' },
  fr: { title: 'Encodeur Decodeur Base64 - Encoder et Decoder Base64 en Ligne', description: 'Encodez et decodez des chaines Base64 en ligne gratuitement.' },
  de: { title: 'Base64 Encoder Decoder - Base64 Online Kodieren und Dekodieren', description: 'Base64-Zeichenketten online kostenlos kodieren und dekodieren.' },
  es: { title: 'Codificador Decodificador Base64 - Codificar y Decodificar Base64', description: 'Codifica y decodifica cadenas Base64 en linea gratis.' },
  pt: { title: 'Codificador Decodificador Base64 - Codificar e Decodificar Base64', description: 'Codifique e decodifique strings Base64 online gratuitamente.' },
  it: { title: 'Encoder Decoder Base64 - Codifica e Decodifica Base64 Online', description: 'Codifica e decodifica stringhe Base64 online gratuitamente.' },
  nl: { title: 'Base64 Encoder Decoder - Base64 Online Coderen en Decoderen', description: 'Codeer en decodeer Base64-strings gratis online.' },
  pl: { title: 'Enkoder Dekoder Base64 - Koduj i Dekoduj Base64 Online', description: 'Koduj i dekoduj ciagi Base64 online za darmo.' },
  sv: { title: 'Base64 Encoder Decoder - Koda och Avkoda Base64 Online', description: 'Koda och avkoda Base64-strangar online gratis.' },
  no: { title: 'Base64 Encoder Decoder - Kod og Dekod Base64 Online', description: 'Kod og dekod Base64-strenger online gratis.' },
  id: { title: 'Base64 Encoder Decoder - Encode dan Decode Base64 Online', description: 'Encode dan decode string Base64 secara online gratis.' },
  th: { title: 'Base64 Encoder Decoder - เข้ารหัสและถอดรหัส Base64 ออนไลน์ฟรี', description: 'เข้ารหัสและถอดรหัสสตริง Base64 ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-encoder-decoder`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['base64 encoder decoder', 'base64 encode decode', 'base64 online', 'base64 converter', 'encode base64', 'decode base64'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-encoder-decoder`])), 'x-default': 'https://viadreams.cc/en/tools/base64-encoder-decoder' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
