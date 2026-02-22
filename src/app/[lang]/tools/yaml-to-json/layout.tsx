import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'YAML to JSON Converter Online - Convert YAML to JSON Free', description: 'Free online YAML to JSON converter. Paste YAML and get clean JSON output instantly. Supports nested structures, arrays, and all YAML data types.' },
  fr: { title: 'Convertisseur YAML vers JSON en Ligne Gratuit', description: 'Convertisseur YAML vers JSON gratuit en ligne. Collez du YAML et obtenez du JSON propre instantanement.' },
  de: { title: 'YAML zu JSON Konverter Online Kostenlos', description: 'Kostenloser Online YAML zu JSON Konverter. YAML einfuegen und sofort sauberes JSON erhalten.' },
  it: { title: 'Convertitore YAML a JSON Online Gratis', description: 'Convertitore YAML a JSON gratuito online. Incolla YAML e ottieni JSON pulito istantaneamente.' },
  es: { title: 'Convertidor YAML a JSON en Linea Gratis', description: 'Convertidor YAML a JSON gratuito en linea. Pega YAML y obtiene JSON limpio al instante.' },
  pt: { title: 'Conversor YAML para JSON Online Gratis', description: 'Conversor YAML para JSON gratuito online. Cole YAML e obtenha JSON limpo instantaneamente.' },
  nl: { title: 'YAML naar JSON Converter Online Gratis', description: 'Gratis online YAML naar JSON converter. Plak YAML en krijg direct schone JSON uitvoer.' },
  pl: { title: 'Konwerter YAML na JSON Online Za Darmo', description: 'Darmowy konwerter YAML na JSON online. Wklej YAML i uzyskaj czyste wyjscie JSON natychmiast.' },
  sv: { title: 'YAML till JSON Konverterare Online Gratis', description: 'Gratis online YAML till JSON konverterare. Klistra in YAML och fa ren JSON utdata direkt.' },
  no: { title: 'YAML til JSON Konverterer Online Gratis', description: 'Gratis online YAML til JSON konverterer. Lim inn YAML og fa ren JSON utdata umiddelbart.' },
  zh: { title: 'YAML 转 JSON 在线转换器 - 免费 YAML 到 JSON 转换', description: '免费在线 YAML 转 JSON 工具。粘贴 YAML 即可获得整洁的 JSON 输出。支持嵌套结构、数组和所有 YAML 数据类型。' },
  ja: { title: 'YAML から JSON 変換ツール - 無料オンライン YAML to JSON', description: '無料オンライン YAML から JSON 変換ツール。YAML を貼り付けて即座にクリーンな JSON 出力を取得。' },
  ko: { title: 'YAML에서 JSON 변환기 - 무료 온라인 YAML to JSON', description: '무료 온라인 YAML에서 JSON 변환기. YAML을 붙여넣고 즉시 깔끔한 JSON 출력을 얻으세요.' },
  id: { title: 'Konverter YAML ke JSON Online Gratis', description: 'Konverter YAML ke JSON online gratis. Tempel YAML dan dapatkan output JSON bersih secara instan.' },
  th: { title: 'ตัวแปลง YAML เป็น JSON ออนไลน์ฟรี', description: 'เครื่องมือแปลง YAML เป็น JSON ออนไลน์ฟรี วาง YAML แล้วได้ JSON ที่สะอาดทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/yaml-to-json`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/yaml-to-json`])), 'x-default': `https://viadreams.cc/en/tools/yaml-to-json` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
