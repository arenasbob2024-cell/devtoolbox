import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to YAML Converter - Free Online Tool', description: 'Convert JSON to YAML format instantly. Free online JSON to YAML converter with syntax validation and pretty formatting.' },
  fr: { title: 'Convertisseur JSON vers YAML - Gratuit en Ligne', description: 'Convertissez JSON en format YAML instantanement. Convertisseur JSON vers YAML gratuit avec validation de syntaxe.' },
  de: { title: 'JSON zu YAML Konverter - Kostenlos Online', description: 'Konvertieren Sie JSON sofort in YAML-Format. Kostenloser JSON-zu-YAML-Konverter mit Syntaxvalidierung.' },
  it: { title: 'Convertitore JSON in YAML - Gratuito Online', description: 'Converti JSON in formato YAML istantaneamente. Convertitore JSON in YAML gratuito con validazione della sintassi.' },
  es: { title: 'Convertidor JSON a YAML - Gratis en Linea', description: 'Convierte JSON a formato YAML al instante. Convertidor JSON a YAML gratuito con validacion de sintaxis.' },
  pt: { title: 'Conversor JSON para YAML - Gratis Online', description: 'Converta JSON para formato YAML instantaneamente. Conversor JSON para YAML gratuito com validacao de sintaxe.' },
  nl: { title: 'JSON naar YAML Converter - Gratis Online', description: 'Converteer JSON naar YAML-formaat direct. Gratis JSON naar YAML converter met syntaxvalidatie.' },
  pl: { title: 'Konwerter JSON do YAML - Darmowy Online', description: 'Konwertuj JSON do formatu YAML natychmiast. Darmowy konwerter JSON do YAML z walidacja skladni.' },
  sv: { title: 'JSON till YAML Konverterare - Gratis Online', description: 'Konvertera JSON till YAML-format direkt. Gratis JSON till YAML konverterare med syntaxvalidering.' },
  no: { title: 'JSON til YAML Konverter - Gratis Online', description: 'Konverter JSON til YAML-format umiddelbart. Gratis JSON til YAML konverter med syntaksvalidering.' },
  zh: { title: 'JSON 转 YAML 转换器 - 免费在线工具', description: '即时将 JSON 转换为 YAML 格式。免费在线 JSON 转 YAML 转换器，支持语法验证和格式化输出。' },
  ja: { title: 'JSON から YAML への変換ツール - 無料オンライン', description: 'JSON を YAML 形式に即時変換。無料の JSON から YAML への変換ツール。構文検証と整形出力をサポート。' },
  ko: { title: 'JSON을 YAML로 변환 - 무료 온라인 도구', description: 'JSON을 YAML 형식으로 즉시 변환하세요. 구문 검증이 있는 무료 온라인 JSON to YAML 변환기.' },
  id: { title: 'Konverter JSON ke YAML - Gratis Online', description: 'Ubah JSON ke format YAML secara instan. Konverter JSON ke YAML gratis dengan validasi sintaks.' },
  th: { title: 'แปลง JSON เป็น YAML - ฟรีออนไลน์', description: 'แปลง JSON เป็นรูปแบบ YAML ทันที ตัวแปลง JSON เป็น YAML ฟรีพร้อมการตรวจสอบไวยากรณ์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-yaml-converter`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['json to yaml', 'json yaml converter', 'convert json yaml', 'yaml generator', 'json converter'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-yaml-converter`])), 'x-default': `https://viadreams.cc/en/tools/json-to-yaml-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
