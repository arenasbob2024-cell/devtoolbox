import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Image to Base64 Converter - Free Online Tool', description: 'Convert images to Base64 data URI encoding instantly. Supports PNG, JPG, GIF, WebP, SVG. Copy the result for use in HTML, CSS, or JavaScript.' },
  fr: { title: 'Convertisseur Image en Base64 - Outil Gratuit en Ligne', description: 'Convertissez des images en encodage data URI Base64 instantanement. Supports PNG, JPG, GIF, WebP, SVG.' },
  de: { title: 'Bild zu Base64 Konverter - Kostenloses Online-Tool', description: 'Konvertieren Sie Bilder sofort in Base64-Data-URI-Kodierung. Unterstuetzt PNG, JPG, GIF, WebP, SVG.' },
  it: { title: 'Convertitore Immagine in Base64 - Strumento Gratuito Online', description: 'Converti immagini in codifica data URI Base64 istantaneamente. Supporta PNG, JPG, GIF, WebP, SVG.' },
  es: { title: 'Convertidor de Imagen a Base64 - Herramienta Gratuita en Linea', description: 'Convierte imagenes a codificacion data URI Base64 al instante. Compatible con PNG, JPG, GIF, WebP, SVG.' },
  pt: { title: 'Conversor de Imagem para Base64 - Ferramenta Gratuita Online', description: 'Converta imagens para codificacao data URI Base64 instantaneamente. Suporta PNG, JPG, GIF, WebP, SVG.' },
  nl: { title: 'Afbeelding naar Base64 Converter - Gratis Online Tool', description: 'Converteer afbeeldingen direct naar Base64 data URI codering. Ondersteunt PNG, JPG, GIF, WebP, SVG.' },
  pl: { title: 'Konwerter Obrazu do Base64 - Darmowe Narzedzie Online', description: 'Konwertuj obrazy do kodowania data URI Base64 natychmiast. Obsluguje PNG, JPG, GIF, WebP, SVG.' },
  sv: { title: 'Bild till Base64 Konverterare - Gratis Onlineverktyg', description: 'Konvertera bilder till Base64 data URI-kodning direkt. Stodjer PNG, JPG, GIF, WebP, SVG.' },
  no: { title: 'Bilde til Base64 Konverter - Gratis Onlineverktoy', description: 'Konverter bilder til Base64 data URI-koding umiddelbart. Stotter PNG, JPG, GIF, WebP, SVG.' },
  zh: { title: '图片转 Base64 工具 - 免费在线转换', description: '即时将图片转换为 Base64 data URI 编码。支持 PNG、JPG、GIF、WebP、SVG 格式，复制结果用于 HTML、CSS 或 JavaScript。' },
  ja: { title: '画像を Base64 に変換 - 無料オンラインツール', description: '画像を Base64 データ URI エンコーディングに即時変換します。PNG、JPG、GIF、WebP、SVG をサポート。' },
  ko: { title: '이미지를 Base64로 변환 - 무료 온라인 도구', description: '이미지를 Base64 data URI 인코딩으로 즉시 변환하세요. PNG, JPG, GIF, WebP, SVG를 지원합니다.' },
  id: { title: 'Konverter Gambar ke Base64 - Alat Gratis Online', description: 'Konversi gambar ke pengkodean data URI Base64 secara instan. Mendukung PNG, JPG, GIF, WebP, SVG.' },
  th: { title: 'แปลงรูปภาพเป็น Base64 - เครื่องมือฟรีออนไลน์', description: 'แปลงรูปภาพเป็นการเข้ารหัส Base64 data URI ทันที รองรับ PNG, JPG, GIF, WebP, SVG' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/image-to-base64`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['image to base64', 'base64 encoder', 'image encoder', 'data URI', 'base64 image converter'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/image-to-base64`])), 'x-default': `https://viadreams.cc/en/tools/image-to-base64` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
