import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to TypeScript Online - Convert JSON to TS Interfaces', description: 'Convert JSON to TypeScript interfaces online. Generate type-safe TypeScript types from any JSON data with optional settings. Free developer tool.' },
  zh: { title: 'JSON 转 TypeScript 在线工具 - JSON 转 TS 接口', description: '在线将 JSON 转换为 TypeScript 接口。从任意 JSON 数据生成类型安全的 TypeScript 类型。' },
  ja: { title: 'JSON to TypeScript オンライン - JSON を TS インターフェースに変換', description: 'JSONをTypeScriptインターフェースにオンライン変換。型安全なTypeScript型を生成。' },
  ko: { title: 'JSON to TypeScript 온라인 - JSON을 TS 인터페이스로 변환', description: 'JSON을 TypeScript 인터페이스로 온라인 변환. 타입 안전한 TypeScript 타입을 생성합니다.' },
  fr: { title: 'JSON vers TypeScript en Ligne - Convertir JSON en Interfaces TS', description: 'Convertissez JSON en interfaces TypeScript en ligne. Generez des types TypeScript type-safe.' },
  de: { title: 'JSON zu TypeScript Online - JSON in TS-Interfaces umwandeln', description: 'Konvertieren Sie JSON online in TypeScript-Interfaces. Generieren Sie typsichere TypeScript-Typen.' },
  es: { title: 'JSON a TypeScript Online - Convertir JSON a Interfaces TS', description: 'Convierta JSON a interfaces TypeScript en linea. Genere tipos TypeScript seguros.' },
  pt: { title: 'JSON para TypeScript Online - Converter JSON para Interfaces TS', description: 'Converta JSON para interfaces TypeScript online. Gere tipos TypeScript seguros.' },
  it: { title: 'JSON a TypeScript Online - Converti JSON in Interfacce TS', description: 'Converti JSON in interfacce TypeScript online. Genera tipi TypeScript sicuri.' },
  nl: { title: 'JSON naar TypeScript Online - Converteer JSON naar TS Interfaces', description: 'Converteer JSON online naar TypeScript-interfaces. Genereer type-veilige TypeScript-typen.' },
  pl: { title: 'JSON do TypeScript Online - Konwertuj JSON na Interfejsy TS', description: 'Konwertuj JSON na interfejsy TypeScript online. Generuj bezpieczne typy TypeScript.' },
  sv: { title: 'JSON till TypeScript Online - Konvertera JSON till TS', description: 'Konvertera JSON till TypeScript-interfaces online. Generera typsaekra TypeScript-typer.' },
  no: { title: 'JSON til TypeScript Online - Konverter JSON til TS', description: 'Konverter JSON til TypeScript-interfaces online. Generer typesikre TypeScript-typer.' },
  id: { title: 'JSON ke TypeScript Online - Konversi JSON ke Interface TS', description: 'Konversi JSON ke interface TypeScript online. Hasilkan tipe TypeScript yang aman.' },
  th: { title: 'JSON เป็น TypeScript ออนไลน์ - แปลง JSON เป็น TS Interface', description: 'แปลง JSON เป็น TypeScript interface ออนไลน์ สร้างประเภท TypeScript ที่ปลอดภัย' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-typescript-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-typescript-online`])), 'x-default': `https://viadreams.cc/en/tools/json-to-typescript-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
