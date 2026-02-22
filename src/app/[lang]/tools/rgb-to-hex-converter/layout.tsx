import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'RGB to HEX Converter - Convert RGB Colors to HEX Online Free', description: 'Convert RGB color values to HEX color codes instantly. Free online RGB to HEX converter with real-time color preview and CSS output.' },
  zh: { title: 'RGB 转 HEX 转换器 - 免费在线 RGB 转十六进制颜色工具', description: '即时将 RGB 颜色值转换为 HEX 颜色代码。免费在线 RGB 转 HEX 工具。' },
  ja: { title: 'RGB to HEX 変換ツール - RGB カラーを HEX に変換', description: 'RGB カラー値を HEX カラーコードに即座に変換。無料オンラインツール。' },
  ko: { title: 'RGB to HEX 변환기 - RGB 색상을 HEX로 변환', description: 'RGB 색상 값을 HEX 색상 코드로 즉시 변환하세요.' },
  fr: { title: 'Convertisseur RGB vers HEX - Convertir Couleurs RGB en HEX', description: 'Convertissez les valeurs de couleur RGB en codes HEX instantanement.' },
  de: { title: 'RGB zu HEX Konverter - RGB Farben in HEX Umwandeln', description: 'Konvertieren Sie RGB-Farbwerte sofort in HEX-Farbcodes.' },
  es: { title: 'Convertidor RGB a HEX - Convertir Colores RGB a HEX', description: 'Convierte valores de color RGB a codigos HEX al instante.' },
  pt: { title: 'Conversor RGB para HEX - Converter Cores RGB para HEX', description: 'Converta valores de cor RGB para codigos HEX instantaneamente.' },
  it: { title: 'Convertitore RGB in HEX - Converti Colori RGB in HEX', description: 'Converti valori colore RGB in codici HEX istantaneamente.' },
  nl: { title: 'RGB naar HEX Converter - RGB Kleuren naar HEX Converteren', description: 'Converteer RGB-kleurwaarden direct naar HEX-kleurcodes.' },
  pl: { title: 'Konwerter RGB do HEX - Konwertuj Kolory RGB na HEX', description: 'Konwertuj wartosci kolorow RGB na kody HEX natychmiast.' },
  sv: { title: 'RGB till HEX Konverterare - Konvertera RGB Farger till HEX', description: 'Konvertera RGB-fargvarden till HEX-fargkoder direkt.' },
  no: { title: 'RGB til HEX Konverter - Konverter RGB Farger til HEX', description: 'Konverter RGB-fargeverdier til HEX-fargekoder umiddelbart.' },
  id: { title: 'Konverter RGB ke HEX - Konversi Warna RGB ke HEX', description: 'Konversi nilai warna RGB ke kode HEX secara instan.' },
  th: { title: 'แปลง RGB เป็น HEX - แปลงสี RGB เป็น HEX ออนไลน์ฟรี', description: 'แปลงค่าสี RGB เป็นรหัสสี HEX ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/rgb-to-hex-converter`;
  return {
    title: t.title, description: t.description,
    keywords: ['rgb to hex', 'rgb to hex converter', 'color converter', 'rgb hex', 'color code converter'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/rgb-to-hex-converter`])), 'x-default': 'https://viadreams.cc/en/tools/rgb-to-hex-converter' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
