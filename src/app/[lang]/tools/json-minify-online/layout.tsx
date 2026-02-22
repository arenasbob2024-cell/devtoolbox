import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Minifier Online - Free Minify JSON Tool', description: 'Minify JSON online instantly. Remove whitespace, compress JSON data, and see compression ratio. Free JSON minification tool.' },
  fr: { title: 'Minifieur JSON en Ligne - Outil Gratuit', description: 'Minifiez JSON en ligne instantanement. Supprimez les espaces blancs, compressez les donnees JSON et voyez le taux de compression.' },
  de: { title: 'JSON Minifizierer Online - Kostenloses Tool', description: 'JSON online sofort minifizieren. Leerzeichen entfernen, JSON-Daten komprimieren und Komprimierungsrate sehen.' },
  it: { title: 'Minificatore JSON Online - Strumento Gratis', description: 'Minifica JSON online istantaneamente. Rimuovi spazi bianchi, comprimi dati JSON e vedi il rapporto di compressione.' },
  es: { title: 'Minificador JSON en Linea - Herramienta Gratis', description: 'Minifique JSON en linea al instante. Elimine espacios en blanco, comprima datos JSON y vea la tasa de compresion.' },
  pt: { title: 'Minificador JSON Online - Ferramenta Gratis', description: 'Minifique JSON online instantaneamente. Remova espacos em branco, comprima dados JSON e veja a taxa de compressao.' },
  nl: { title: 'JSON Minifier Online - Gratis Tool', description: 'Minify JSON online direct. Verwijder witruimte, comprimeer JSON-gegevens en bekijk de compressieverhouding.' },
  pl: { title: 'Minifikator JSON Online - Darmowe Narzedzie', description: 'Minifikuj JSON online natychmiast. Usun biale znaki, skompresuj dane JSON i zobacz wspolczynnik kompresji.' },
  sv: { title: 'JSON Minifierare Online - Gratis Verktyg', description: 'Minifiera JSON online direkt. Ta bort blanksteg, komprimera JSON-data och se komprimeringsfoerhaallande.' },
  no: { title: 'JSON Minifiserer Online - Gratis Verktoy', description: 'Minifiser JSON online umiddelbart. Fjern mellomrom, komprimer JSON-data og se komprimeringsforhold.' },
  zh: { title: 'JSON 压缩器在线 - 免费 JSON 压缩工具', description: '在线即时压缩 JSON。移除空白字符，压缩 JSON 数据，查看压缩比。' },
  ja: { title: 'JSON ミニファイア オンライン - 無料ツール', description: 'JSON をオンラインで即座に圧縮。空白を削除し、JSON データを圧縮し、圧縮率を確認。' },
  ko: { title: 'JSON 압축기 온라인 - 무료 도구', description: 'JSON을 온라인에서 즉시 압축. 공백을 제거하고 JSON 데이터를 압축하고 압축률을 확인하세요.' },
  id: { title: 'JSON Minifier Online - Alat Gratis', description: 'Minifikasi JSON online secara instan. Hapus spasi, kompres data JSON, dan lihat rasio kompresi.' },
  th: { title: 'JSON Minifier ออนไลน์ - เครื่องมือฟรี', description: 'บีบอัด JSON ออนไลน์ทันที ลบช่องว่าง บีบอัดข้อมูล JSON และดูอัตราการบีบอัด' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-minify-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-minify-online`])), 'x-default': `https://viadreams.cc/en/tools/json-minify-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
