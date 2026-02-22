import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Schema Generator - Generate JSON Schema Online Free', description: 'Free online JSON Schema generator. Generate JSON Schema from JSON data automatically. Create JSON Schema with proper types, required fields, and validation rules. Schema JSON generator tool.' },
  fr: { title: 'Generateur de Schema JSON - Generer un Schema JSON en Ligne', description: 'Generateur de schema JSON gratuit en ligne. Generez automatiquement un schema JSON a partir de donnees JSON.' },
  de: { title: 'JSON Schema Generator - JSON Schema Online Generieren', description: 'Kostenloser Online-JSON-Schema-Generator. Generieren Sie JSON Schema aus JSON-Daten automatisch.' },
  it: { title: 'Generatore di JSON Schema - Genera JSON Schema Online Gratis', description: 'Generatore di JSON Schema online gratuito. Genera automaticamente JSON Schema dai dati JSON.' },
  es: { title: 'Generador de JSON Schema - Generar JSON Schema en Linea Gratis', description: 'Generador de JSON Schema gratuito en linea. Genera JSON Schema a partir de datos JSON automaticamente.' },
  pt: { title: 'Gerador de JSON Schema - Gerar JSON Schema Online Gratis', description: 'Gerador de JSON Schema online gratuito. Gere JSON Schema a partir de dados JSON automaticamente.' },
  nl: { title: 'JSON Schema Generator - JSON Schema Online Genereren', description: 'Gratis online JSON Schema-generator. Genereer automatisch JSON Schema vanuit JSON-gegevens.' },
  pl: { title: 'Generator JSON Schema - Generuj JSON Schema Online', description: 'Darmowy generator JSON Schema online. Generuj JSON Schema z danych JSON automatycznie.' },
  sv: { title: 'JSON Schema Generator - Generera JSON Schema Online', description: 'Gratis online JSON Schema-generator. Generera JSON Schema fran JSON-data automatiskt.' },
  no: { title: 'JSON Schema Generator - Generer JSON Schema Online', description: 'Gratis online JSON Schema-generator. Generer JSON Schema fra JSON-data automatisk.' },
  zh: { title: 'JSON Schema 生成器 - 免费在线生成 JSON Schema', description: '免费在线 JSON Schema 生成器。从 JSON 数据自动生成 JSON Schema，包含类型、必填字段和验证规则。' },
  ja: { title: 'JSON Schema ジェネレーター - 無料オンライン JSON Schema 生成', description: '無料オンライン JSON Schema ジェネレーター。JSON データから自動的に JSON Schema を生成します。' },
  ko: { title: 'JSON Schema 생성기 - 무료 온라인 JSON Schema 생성', description: '무료 온라인 JSON Schema 생성기. JSON 데이터에서 자동으로 JSON Schema를 생성합니다.' },
  id: { title: 'JSON Schema Generator - Buat JSON Schema Online Gratis', description: 'Generator JSON Schema online gratis. Buat JSON Schema dari data JSON secara otomatis.' },
  th: { title: 'JSON Schema Generator - สร้าง JSON Schema ออนไลน์ฟรี', description: 'เครื่องมือสร้าง JSON Schema ออนไลน์ฟรี สร้าง JSON Schema จากข้อมูล JSON โดยอัตโนมัติ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-schema-generator`;
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-schema-generator`])),
        'x-default': `https://viadreams.cc/en/tools/json-schema-generator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
