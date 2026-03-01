import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Image Converter - Convert Image to Base64 Online Free', description: 'Free online Base64 image converter. Convert images to Base64 strings and Base64 to images instantly. Supports PNG, JPG, GIF, SVG, WebP. Drag & drop image to Base64 encoder.' },
  fr: { title: 'Convertisseur Image Base64 - Convertir Image en Base64 en Ligne', description: 'Convertisseur image Base64 gratuit en ligne. Convertissez des images en chaines Base64 et inversement. Supporte PNG, JPG, GIF, SVG, WebP.' },
  de: { title: 'Base64 Bild Konverter - Bild zu Base64 Online Kostenlos', description: 'Kostenloser Online Base64-Bildkonverter. Konvertieren Sie Bilder in Base64-Strings und umgekehrt. Unterstuetzt PNG, JPG, GIF, SVG, WebP.' },
  it: { title: 'Convertitore Immagine Base64 - Converti Immagine in Base64 Online', description: 'Convertitore immagine Base64 online gratuito. Converti immagini in stringhe Base64 e viceversa. Supporta PNG, JPG, GIF, SVG, WebP.' },
  es: { title: 'Convertidor de Imagen Base64 - Convertir Imagen a Base64 en Linea', description: 'Convertidor de imagen Base64 gratuito en linea. Convierte imagenes a cadenas Base64 y viceversa. Soporta PNG, JPG, GIF, SVG, WebP.' },
  pt: { title: 'Conversor de Imagem Base64 - Converter Imagem para Base64 Online', description: 'Conversor de imagem Base64 online gratuito. Converta imagens em strings Base64 e vice-versa. Suporta PNG, JPG, GIF, SVG, WebP.' },
  nl: { title: 'Base64 Afbeelding Converter - Afbeelding naar Base64 Online', description: 'Gratis online Base64 afbeelding converter. Converteer afbeeldingen naar Base64-strings en omgekeerd. Ondersteunt PNG, JPG, GIF, SVG, WebP.' },
  pl: { title: 'Konwerter Obrazow Base64 - Konwertuj Obraz na Base64 Online', description: 'Darmowy konwerter obrazow Base64 online. Konwertuj obrazy na ciagi Base64 i odwrotnie. Obsluguje PNG, JPG, GIF, SVG, WebP.' },
  sv: { title: 'Base64 Bildkonverterare - Konvertera Bild till Base64 Online', description: 'Gratis online Base64 bildkonverterare. Konvertera bilder till Base64-strangar och tillbaka. Stoder PNG, JPG, GIF, SVG, WebP.' },
  no: { title: 'Base64 Bildekonverterer - Konverter Bilde til Base64 Online', description: 'Gratis online Base64 bildekonverterer. Konverter bilder til Base64-strenger og tilbake. Stotter PNG, JPG, GIF, SVG, WebP.' },
  zh: { title: 'Base64 图片转换器 - 免费在线图片转 Base64', description: '免费在线 Base64 图片转换器。将图片转换为 Base64 字符串，或将 Base64 转换为图片。支持 PNG、JPG、GIF、SVG、WebP 格式。' },
  ja: { title: 'Base64 画像変換ツール - 画像をBase64に無料変換', description: '無料オンライン Base64 画像変換ツール。画像を Base64 文字列に変換、または Base64 を画像に変換。PNG、JPG、GIF、SVG、WebP 対応。' },
  ko: { title: 'Base64 이미지 변환기 - 이미지를 Base64로 무료 변환', description: '무료 온라인 Base64 이미지 변환기. 이미지를 Base64 문자열로 변환하거나 Base64를 이미지로 변환합니다. PNG, JPG, GIF, SVG, WebP 지원.' },
  id: { title: 'Konverter Gambar Base64 - Konversi Gambar ke Base64 Online Gratis', description: 'Konverter gambar Base64 online gratis. Konversi gambar ke string Base64 dan sebaliknya. Mendukung PNG, JPG, GIF, SVG, WebP.' },
  th: { title: 'ตัวแปลงรูปภาพ Base64 - แปลงรูปภาพเป็น Base64 ออนไลน์ฟรี', description: 'ตัวแปลงรูปภาพ Base64 ออนไลน์ฟรี แปลงรูปภาพเป็นสตริง Base64 และ Base64 เป็นรูปภาพ รองรับ PNG, JPG, GIF, SVG, WebP' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-image-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-image-converter`])), 'x-default': `https://viadreams.cc/en/tools/base64-image-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
