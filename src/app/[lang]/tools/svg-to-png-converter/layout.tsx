import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SVG to PNG Converter - Convert SVG to PNG Online Free', description: 'Convert SVG code to PNG image online. Preview SVG in browser and export as PNG. Free SVG to PNG converter with custom dimensions.' },
  fr: { title: 'Convertisseur SVG en PNG - Convertir SVG en PNG en Ligne', description: 'Convertissez du code SVG en image PNG en ligne. Previsualisation SVG et export PNG.' },
  de: { title: 'SVG zu PNG Konverter - SVG in PNG Online Konvertieren', description: 'SVG-Code online in PNG-Bild konvertieren. SVG-Vorschau und PNG-Export.' },
  it: { title: 'Convertitore SVG in PNG - Converti SVG in PNG Online', description: 'Converti codice SVG in immagine PNG online. Anteprima SVG ed esporta come PNG.' },
  es: { title: 'Convertidor SVG a PNG - Convertir SVG a PNG en Linea', description: 'Convierte codigo SVG a imagen PNG en linea. Vista previa SVG y exportacion PNG.' },
  pt: { title: 'Conversor SVG para PNG - Converter SVG em PNG Online', description: 'Converta codigo SVG em imagem PNG online. Visualizacao SVG e exportacao PNG.' },
  nl: { title: 'SVG naar PNG Converter - SVG naar PNG Online Converteren', description: 'Converteer SVG-code naar PNG-afbeelding online. SVG-preview en PNG-export.' },
  pl: { title: 'Konwerter SVG na PNG - Konwersja SVG do PNG Online', description: 'Konwertuj kod SVG do obrazu PNG online. Podglad SVG i eksport do PNG.' },
  sv: { title: 'SVG till PNG Konverterare - Konvertera SVG till PNG Online', description: 'Konvertera SVG-kod till PNG-bild online. SVG-forhandsgranskning och PNG-export.' },
  no: { title: 'SVG til PNG Konverter - Konverter SVG til PNG Online', description: 'Konverter SVG-kode til PNG-bilde online. SVG-forhandsvisning og PNG-eksport.' },
  zh: { title: 'SVG 转 PNG 转换器 - 在线将 SVG 转为 PNG', description: '在线将 SVG 代码转换为 PNG 图片，支持浏览器预览 SVG 和导出 PNG，自定义尺寸。' },
  ja: { title: 'SVGからPNGへのコンバーター - SVGをPNGにオンラインで変換', description: 'SVGコードをPNG画像にオンラインで変換します。SVGプレビューとPNGエクスポート対応。' },
  ko: { title: 'SVG를 PNG로 변환기 - SVG에서 PNG 온라인 변환', description: 'SVG 코드를 PNG 이미지로 온라인으로 변환합니다. SVG 미리보기 및 PNG 내보내기 지원.' },
  id: { title: 'Konverter SVG ke PNG - Konversi SVG ke PNG Online', description: 'Konversi kode SVG ke gambar PNG secara online. Pratinjau SVG dan ekspor PNG.' },
  th: { title: 'แปลง SVG เป็น PNG - แปลง SVG เป็น PNG ออนไลน์', description: 'แปลงโค้ด SVG เป็นรูป PNG ออนไลน์ ดูตัวอย่าง SVG และส่งออกเป็น PNG' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/svg-to-png-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/svg-to-png-converter`])), 'x-default': `https://viadreams.cc/en/tools/svg-to-png-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
