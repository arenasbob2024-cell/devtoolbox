import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Image Decoder - Decode Base64 to Image Online Free', description: 'Free online Base64 image decoder and encoder. Decode Base64 strings to images and encode images to Base64 with drag and drop. Supports PNG, JPG, GIF, SVG, WebP.' },
  fr: { title: 'Decodeur Image Base64 - Decoder Base64 en Image en Ligne Gratuit', description: 'Decodeur et encodeur d\'image Base64 gratuit en ligne. Decodez des chaines Base64 en images et encodez des images en Base64 par glisser-deposer.' },
  de: { title: 'Base64 Bild Decoder - Base64 zu Bild Online Kostenlos Dekodieren', description: 'Kostenloser Online Base64 Bild Decoder und Encoder. Dekodieren Sie Base64-Strings zu Bildern und kodieren Sie Bilder zu Base64 per Drag & Drop.' },
  it: { title: 'Decodificatore Immagini Base64 - Decodifica Base64 in Immagine Online Gratis', description: 'Decodificatore e codificatore immagini Base64 online gratuito. Decodifica stringhe Base64 in immagini e codifica immagini in Base64 con drag and drop.' },
  es: { title: 'Decodificador de Imagen Base64 - Decodificar Base64 a Imagen Online Gratis', description: 'Decodificador y codificador de imagen Base64 gratuito en linea. Decodifica cadenas Base64 a imagenes y codifica imagenes a Base64 con arrastrar y soltar.' },
  pt: { title: 'Decodificador de Imagem Base64 - Decodificar Base64 para Imagem Online Gratis', description: 'Decodificador e codificador de imagem Base64 online gratuito. Decodifique strings Base64 em imagens e codifique imagens em Base64 com arrastar e soltar.' },
  nl: { title: 'Base64 Afbeelding Decoder - Decodeer Base64 naar Afbeelding Online Gratis', description: 'Gratis online Base64 afbeelding decoder en encoder. Decodeer Base64 strings naar afbeeldingen en codeer afbeeldingen naar Base64 met slepen en neerzetten.' },
  pl: { title: 'Dekoder Obrazow Base64 - Dekoduj Base64 na Obraz Online Za Darmo', description: 'Darmowy dekoder i koder obrazow Base64 online. Dekoduj ciagi Base64 na obrazy i koduj obrazy na Base64 przez przeciaganie i upuszczanie.' },
  sv: { title: 'Base64 Bild Avkodare - Avkoda Base64 till Bild Online Gratis', description: 'Gratis online Base64 bild avkodare och kodare. Avkoda Base64-strangar till bilder och koda bilder till Base64 med dra och slapp.' },
  no: { title: 'Base64 Bilde Dekoder - Dekod Base64 til Bilde Online Gratis', description: 'Gratis online Base64 bilde dekoder og koder. Dekod Base64-strenger til bilder og kod bilder til Base64 med dra og slipp.' },
  zh: { title: 'Base64 图片解码器 - 免费在线 Base64 转图片工具', description: '免费在线 Base64 图片解码器和编码器。将 Base64 字符串解码为图片，将图片编码为 Base64。支持拖放，支持 PNG、JPG、GIF、SVG、WebP。' },
  ja: { title: 'Base64 画像デコーダー - Base64を画像に無料変換オンライン', description: '無料オンライン Base64 画像デコーダー＆エンコーダー。Base64文字列を画像にデコード、画像をBase64にエンコード。ドラッグ＆ドロップ対応。' },
  ko: { title: 'Base64 이미지 디코더 - Base64를 이미지로 무료 온라인 변환', description: '무료 온라인 Base64 이미지 디코더 및 인코더. Base64 문자열을 이미지로 디코딩하고 이미지를 Base64로 인코딩. 드래그 앤 드롭 지원.' },
  id: { title: 'Dekoder Gambar Base64 - Dekode Base64 ke Gambar Online Gratis', description: 'Dekoder dan enkoder gambar Base64 online gratis. Dekode string Base64 menjadi gambar dan enkode gambar menjadi Base64 dengan seret dan lepas.' },
  th: { title: 'ตัวถอดรหัสภาพ Base64 - ถอดรหัส Base64 เป็นรูปภาพออนไลน์ฟรี', description: 'ตัวถอดรหัสและเข้ารหัสภาพ Base64 ออนไลน์ฟรี ถอดรหัสสตริง Base64 เป็นรูปภาพและเข้ารหัสรูปภาพเป็น Base64 ด้วยการลากและวาง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-image-decoder`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-image-decoder`])), 'x-default': `https://viadreams.cc/en/tools/base64-image-decoder` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
