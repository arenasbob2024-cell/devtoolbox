import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to YAML Converter Online - Free Tool with Live Preview', description: 'Convert JSON to YAML online with real-time live preview. Free, fast, and secure client-side JSON to YAML conversion tool for developers.' },
  fr: { title: 'Convertisseur JSON vers YAML en Ligne Gratuit', description: 'Convertissez JSON en YAML en ligne avec apercu en direct. Outil gratuit et securise.' },
  de: { title: 'JSON zu YAML Konverter Online Kostenlos', description: 'Konvertieren Sie JSON online in YAML mit Live-Vorschau. Kostenloses und sicheres Tool.' },
  it: { title: 'Convertitore JSON a YAML Online Gratis', description: 'Converti JSON in YAML online con anteprima in tempo reale. Strumento gratuito e sicuro.' },
  es: { title: 'Convertidor JSON a YAML en Linea Gratis', description: 'Convierta JSON a YAML en linea con vista previa en tiempo real. Herramienta gratuita y segura.' },
  pt: { title: 'Conversor JSON para YAML Online Gratis', description: 'Converta JSON para YAML online com pre-visualizacao em tempo real.' },
  nl: { title: 'JSON naar YAML Converter Online Gratis', description: 'Converteer JSON naar YAML online met live voorbeeld. Gratis en veilig.' },
  pl: { title: 'Konwerter JSON do YAML Online Za Darmo', description: 'Konwertuj JSON na YAML online z podgladem na zywo.' },
  sv: { title: 'JSON till YAML Konverterare Online Gratis', description: 'Konvertera JSON till YAML online med live forhandsvisning.' },
  no: { title: 'JSON til YAML Konverterer Online Gratis', description: 'Konverter JSON til YAML online med live forhandsvisning.' },
  zh: { title: 'JSON 转 YAML 在线转换器 - 免费工具', description: '在线将 JSON 转换为 YAML，支持实时预览。免费、快速、安全的客户端转换工具。' },
  ja: { title: 'JSON から YAML コンバーター オンライン 無料', description: 'JSONをYAMLにオンラインで変換。リアルタイムプレビュー付き無料ツール。' },
  ko: { title: 'JSON to YAML 변환기 온라인 무료', description: 'JSON을 YAML로 온라인 변환. 실시간 미리보기 무료 도구.' },
  id: { title: 'Konverter JSON ke YAML Online Gratis', description: 'Konversi JSON ke YAML online dengan pratinjau langsung. Alat gratis dan aman.' },
  th: { title: 'ตัวแปลง JSON เป็น YAML ออนไลน์ฟรี', description: 'แปลง JSON เป็น YAML ออนไลน์พร้อมตัวอย่างแบบเรียลไทม์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-yaml-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-yaml-converter`])), 'x-default': `https://viadreams.cc/en/tools/json-to-yaml-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
