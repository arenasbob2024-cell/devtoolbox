import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SVG to CSS Converter - Convert SVG to CSS Background', description: 'Convert SVG code to CSS background-image property. Generate data URI CSS backgrounds from SVG files instantly for use in stylesheets.' },
  fr: { title: 'Convertisseur SVG en CSS - Convertir SVG en Arriere-plan CSS', description: 'Convertissez le code SVG en propriete CSS background-image. Generez des fonds CSS data URI a partir de fichiers SVG.' },
  de: { title: 'SVG zu CSS Konverter - SVG in CSS Hintergrund Konvertieren', description: 'SVG-Code in CSS background-image-Eigenschaft konvertieren. Data-URI-CSS-Hintergruende aus SVG-Dateien generieren.' },
  it: { title: 'Convertitore SVG in CSS - Convertire SVG in Sfondo CSS', description: 'Converti codice SVG in proprieta CSS background-image. Genera sfondi CSS data URI da file SVG istantaneamente.' },
  es: { title: 'Convertidor SVG a CSS - Convertir SVG a Fondo CSS', description: 'Convierte codigo SVG en propiedad CSS background-image. Genera fondos CSS data URI desde archivos SVG al instante.' },
  pt: { title: 'Conversor SVG para CSS - Converter SVG em Fundo CSS', description: 'Converta codigo SVG em propriedade CSS background-image. Gere fundos CSS data URI de arquivos SVG instantaneamente.' },
  nl: { title: 'SVG naar CSS Converter - SVG naar CSS Achtergrond', description: 'Converteer SVG-code naar CSS background-image eigenschap. Genereer data URI CSS achtergronden van SVG-bestanden.' },
  pl: { title: 'Konwerter SVG do CSS - Konwertuj SVG do Tla CSS', description: 'Konwertuj kod SVG na wlasciwosc CSS background-image. Generuj tla CSS data URI z plikow SVG natychmiast.' },
  sv: { title: 'SVG till CSS Konverterare - Konvertera SVG till CSS Bakgrund', description: 'Konvertera SVG-kod till CSS background-image egenskap. Generera data URI CSS bakgrunder fran SVG-filer direkt.' },
  no: { title: 'SVG til CSS Konverter - Konverter SVG til CSS Bakgrunn', description: 'Konverter SVG-kode til CSS background-image egenskap. Generer data URI CSS bakgrunner fra SVG-filer umiddelbart.' },
  zh: { title: 'SVG 转 CSS 转换器 - 将 SVG 转换为 CSS 背景', description: '将 SVG 代码转换为 CSS background-image 属性。即时从 SVG 文件生成 data URI CSS 背景，用于样式表中。' },
  ja: { title: 'SVG から CSS への変換ツール - SVG を CSS 背景に変換', description: 'SVG コードを CSS background-image プロパティに変換します。SVG ファイルから data URI CSS 背景を即時生成。' },
  ko: { title: 'SVG를 CSS로 변환기 - SVG를 CSS 배경으로 변환', description: 'SVG 코드를 CSS background-image 속성으로 변환하세요. SVG 파일에서 data URI CSS 배경을 즉시 생성하세요.' },
  id: { title: 'Konverter SVG ke CSS - Mengonversi SVG ke Latar Belakang CSS', description: 'Konversi kode SVG ke properti CSS background-image. Hasilkan latar belakang CSS data URI dari file SVG secara instan.' },
  th: { title: 'ตัวแปลง SVG เป็น CSS - แปลง SVG เป็นพื้นหลัง CSS', description: 'แปลงโค้ด SVG เป็นคุณสมบัติ CSS background-image สร้างพื้นหลัง CSS data URI จากไฟล์ SVG ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/svg-to-css-converter`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['svg to css', 'svg background css', 'data uri svg', 'svg to background-image', 'css background svg'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/svg-to-css-converter`])), 'x-default': `https://viadreams.cc/en/tools/svg-to-css-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
