import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to Zod Converter - Convert JSON to Zod Schema Online Free', description: 'Free online JSON to Zod converter. Convert JSON data to Zod validation schemas instantly. Generate Zod schemas from JSON, convert JSON Schema to Zod. TypeScript-first schema validation.' },
  fr: { title: 'Convertisseur JSON vers Zod - Convertir JSON en Schema Zod', description: 'Convertisseur JSON vers Zod gratuit en ligne. Convertissez les donnees JSON en schemas de validation Zod instantanement.' },
  de: { title: 'JSON zu Zod Konverter - JSON in Zod Schema Umwandeln', description: 'Kostenloser Online JSON zu Zod Konverter. JSON-Daten sofort in Zod-Validierungsschemas umwandeln.' },
  it: { title: 'Convertitore JSON in Zod - Converti JSON in Schema Zod', description: 'Convertitore JSON in Zod online gratuito. Converti i dati JSON in schemi di validazione Zod istantaneamente.' },
  es: { title: 'Convertidor JSON a Zod - Convertir JSON a Schema Zod', description: 'Convertidor JSON a Zod gratuito en linea. Convierte datos JSON a esquemas de validacion Zod al instante.' },
  pt: { title: 'Conversor JSON para Zod - Converter JSON para Schema Zod', description: 'Conversor JSON para Zod online gratuito. Converta dados JSON para esquemas de validacao Zod instantaneamente.' },
  nl: { title: 'JSON naar Zod Converter - JSON naar Zod Schema Omzetten', description: 'Gratis online JSON naar Zod converter. Converteer JSON-gegevens direct naar Zod-validatieschemas.' },
  pl: { title: 'Konwerter JSON do Zod - Konwertuj JSON na Schema Zod', description: 'Darmowy konwerter JSON do Zod online. Konwertuj dane JSON na schematy walidacji Zod natychmiast.' },
  sv: { title: 'JSON till Zod Konverterare - Konvertera JSON till Zod Schema', description: 'Gratis online JSON till Zod konverterare. Konvertera JSON-data till Zod-valideringsscheman direkt.' },
  no: { title: 'JSON til Zod Konverterer - Konverter JSON til Zod Schema', description: 'Gratis online JSON til Zod konverterer. Konverter JSON-data til Zod-valideringsskjemaer umiddelbart.' },
  zh: { title: 'JSON 转 Zod 转换器 - 免费在线将 JSON 转换为 Zod Schema', description: '免费在线 JSON 转 Zod 转换器。即时将 JSON 数据转换为 Zod 验证 Schema。从 JSON 生成 Zod Schema。' },
  ja: { title: 'JSON to Zod コンバーター - JSON を Zod Schema に変換', description: '無料オンライン JSON to Zod コンバーター。JSON データを Zod バリデーションスキーマに即座に変換します。' },
  ko: { title: 'JSON to Zod 변환기 - JSON을 Zod Schema로 변환', description: '무료 온라인 JSON to Zod 변환기. JSON 데이터를 Zod 유효성 검사 스키마로 즉시 변환합니다.' },
  id: { title: 'Konverter JSON ke Zod - Konversi JSON ke Zod Schema Online', description: 'Konverter JSON ke Zod online gratis. Konversi data JSON ke skema validasi Zod secara instan.' },
  th: { title: 'JSON เป็น Zod Converter - แปลง JSON เป็น Zod Schema ออนไลน์', description: 'เครื่องมือแปลง JSON เป็น Zod ออนไลน์ฟรี แปลงข้อมูล JSON เป็น Zod validation schema ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-zod-converter`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-zod-converter`])),
        'x-default': `https://viadreams.cc/en/tools/json-to-zod-converter`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
