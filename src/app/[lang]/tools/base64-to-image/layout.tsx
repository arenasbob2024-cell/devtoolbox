import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 to Image Converter Online - Free Tool', description: 'Decode Base64 strings to images online. Paste a Base64-encoded image and instantly preview and download it as PNG, JPEG, or other formats.' },
  fr: { title: 'Convertisseur Base64 vers Image en Ligne Gratuit', description: 'Decodez les chaines Base64 en images en ligne. Collez une image encodee en Base64 et previsualiser et telecharger.' },
  de: { title: 'Base64 zu Bild Konverter Online Kostenlos', description: 'Base64-Zeichenketten online in Bilder dekodieren. Base64-kodiertes Bild einfuegen und sofort anzeigen und herunterladen.' },
  it: { title: 'Convertitore Base64 in Immagine Online Gratis', description: 'Decodifica stringhe Base64 in immagini online. Incolla un\'immagine codificata Base64 e visualizzala e scaricala.' },
  es: { title: 'Convertidor Base64 a Imagen en Linea Gratis', description: 'Decodifique cadenas Base64 a imagenes en linea. Pegue una imagen codificada en Base64 y previsualize y descargue.' },
  pt: { title: 'Conversor Base64 para Imagem Online Gratis', description: 'Decodifique strings Base64 para imagens online. Cole uma imagem codificada em Base64 e visualize e baixe.' },
  nl: { title: 'Base64 naar Afbeelding Converter Online Gratis', description: 'Decodeer Base64-strings naar afbeeldingen online. Plak een Base64-gecodeerde afbeelding en bekijk en download direct.' },
  pl: { title: 'Konwerter Base64 do Obrazu Online Za Darmo', description: 'Dekoduj ciagi Base64 do obrazow online. Wklej obraz zakodowany w Base64 i wyswietl i pobierz.' },
  sv: { title: 'Base64 till Bild Konverterare Online Gratis', description: 'Avkoda Base64-straengar till bilder online. Klistra in en Base64-kodad bild och foerhandsgranska och ladda ner.' },
  no: { title: 'Base64 til Bilde Konverterer Online Gratis', description: 'Dekod Base64-strenger til bilder online. Lim inn et Base64-kodet bilde og forhaaandsvis og last ned.' },
  zh: { title: 'Base64 转图片在线转换器 - 免费工具', description: '在线将 Base64 字符串解码为图片。粘贴 Base64 编码的图片，即时预览和下载。' },
  ja: { title: 'Base64 から画像コンバーター オンライン 無料', description: 'Base64 文字列をオンラインで画像にデコード。Base64 エンコードされた画像を貼り付けてプレビューしてダウンロード。' },
  ko: { title: 'Base64 to 이미지 변환기 온라인 무료', description: 'Base64 문자열을 온라인에서 이미지로 디코딩. Base64 인코딩된 이미지를 붙여넣고 미리보기 및 다운로드.' },
  id: { title: 'Konverter Base64 ke Gambar Online Gratis', description: 'Decode string Base64 ke gambar online. Tempel gambar Base64 dan preview serta download langsung.' },
  th: { title: 'แปลง Base64 เป็นรูปภาพ ออนไลน์ฟรี', description: 'ถอดรหัส Base64 เป็นรูปภาพออนไลน์ วางข้อความ Base64 แล้วดูตัวอย่างและดาวน์โหลดทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-to-image`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-to-image`])), 'x-default': `https://viadreams.cc/en/tools/base64-to-image` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
