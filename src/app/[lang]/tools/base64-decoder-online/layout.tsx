import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Decoder Online - Decode Base64 Strings & Images Free', description: 'Decode Base64 strings, files, and images online for free. Fast, secure client-side Base64 decoding tool with image preview and file download.' },
  fr: { title: 'Decodeur Base64 en Ligne Gratuit', description: 'Decodez des chaines Base64, fichiers et images en ligne gratuitement. Outil rapide et securise.' },
  de: { title: 'Base64 Decoder Online Kostenlos', description: 'Base64-Strings, Dateien und Bilder online kostenlos dekodieren. Schnelles, sicheres Tool.' },
  it: { title: 'Decodificatore Base64 Online Gratis', description: 'Decodifica stringhe Base64, file e immagini online gratis. Strumento veloce e sicuro.' },
  es: { title: 'Decodificador Base64 en Linea Gratis', description: 'Decodifique cadenas Base64, archivos e imagenes en linea gratis. Herramienta rapida y segura.' },
  pt: { title: 'Decodificador Base64 Online Gratis', description: 'Decodifique strings Base64, ficheiros e imagens online gratuitamente.' },
  nl: { title: 'Base64 Decoder Online Gratis', description: 'Decodeer Base64-strings, bestanden en afbeeldingen online gratis.' },
  pl: { title: 'Dekoder Base64 Online Za Darmo', description: 'Dekoduj ciagi Base64, pliki i obrazy online za darmo.' },
  sv: { title: 'Base64 Avkodare Online Gratis', description: 'Avkoda Base64-strangar, filer och bilder online gratis.' },
  no: { title: 'Base64 Dekoder Online Gratis', description: 'Dekod Base64-strenger, filer og bilder online gratis.' },
  zh: { title: 'Base64 在线解码器 - 免费工具', description: '免费在线解码 Base64 字符串、文件和图片。快速安全的客户端 Base64 解码工具。' },
  ja: { title: 'Base64 オンラインデコーダー 無料', description: 'Base64文字列、ファイル、画像を無料でオンラインデコード。高速で安全なツール。' },
  ko: { title: 'Base64 온라인 디코더 무료', description: 'Base64 문자열, 파일, 이미지를 무료로 온라인 디코딩.' },
  id: { title: 'Dekoder Base64 Online Gratis', description: 'Dekode string Base64, file, dan gambar online gratis.' },
  th: { title: 'ตัวถอดรหัส Base64 ออนไลน์ฟรี', description: 'ถอดรหัสสตริง Base64 ไฟล์ และรูปภาพออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-decoder-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-decoder-online`])), 'x-default': `https://viadreams.cc/en/tools/base64-decoder-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
