import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Color Palette Generator - Create Harmonious Color Schemes', description: 'Generate harmonious color palettes using color theory. Create complementary, analogous, triadic, and split-complementary schemes. Free online tool.' },
  fr: { title: 'Generateur de Palettes de Couleurs - Schemes Harmonieux', description: 'Generez des palettes de couleurs harmonieuses basees sur la theorie des couleurs.' },
  de: { title: 'Farbpaletten-Generator - Harmonische Farbschemata', description: 'Generieren Sie harmonische Farbpaletten basierend auf Farbtheorie.' },
  it: { title: 'Generatore di Palette Colori - Schemi Armoniosi', description: 'Genera palette di colori armoniose basate sulla teoria dei colori.' },
  es: { title: 'Generador de Paletas de Colores - Esquemas Armoniosos', description: 'Genere paletas de colores armoniosas basadas en teoria del color.' },
  pt: { title: 'Gerador de Paletas de Cores - Esquemas Harmoniosos', description: 'Gere paletas de cores harmoniosas baseadas na teoria das cores.' },
  nl: { title: 'Kleurenpalet Generator - Harmonieuze Kleurenschema\'s', description: 'Genereer harmonieuze kleurenpaletten op basis van kleurtheorie.' },
  pl: { title: 'Generator Palet Kolorow - Harmonijne Schematy', description: 'Generuj harmonijne palety kolorow oparte na teorii kolorow.' },
  sv: { title: 'Fargpalettgenerator - Harmoniska Faergscheman', description: 'Generera harmoniska faergpaletter baserade paa faergteori.' },
  no: { title: 'Fargepalettgenerator - Harmoniske Fargeskjemaer', description: 'Generer harmoniske fargepaletter basert paa fargeteori.' },
  zh: { title: '调色板生成器 - 创建和谐配色方案', description: '使用色彩理论生成和谐的调色板。创建互补色、类似色、三色和分裂互补配色方案。免费在线工具。' },
  ja: { title: 'カラーパレット生成ツール - 調和的な配色', description: '色彩理論に基づいて調和的なカラーパレットを生成。補色、類似色、トライアドなどの配色スキーム。' },
  ko: { title: '색상 팔레트 생성기 - 조화로운 배색 만들기', description: '색상 이론을 사용하여 조화로운 색상 팔레트를 생성합니다. 보색, 유사색, 삼색 배색 스킴.' },
  id: { title: 'Generator Palet Warna - Skema Warna Harmonis', description: 'Hasilkan palet warna harmonis menggunakan teori warna.' },
  th: { title: 'เครื่องมือสร้างพาเลทสี - สร้างโทนสีที่กลมกลืน', description: 'สร้างพาเลทสีที่กลมกลืนโดยใช้ทฤษฎีสี สร้างสีคู่ตรงข้าม สีใกล้เคียง และสีสามเส้า' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/color-palette-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/color-palette-generator`])), 'x-default': `https://viadreams.cc/en/tools/color-palette-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
