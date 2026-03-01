import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JavaScript to TypeScript Converter - Convert JS to TS Online Free', description: 'Free online JavaScript to TypeScript converter tool. Convert JS to TS, JS to TSX, and add type annotations. JavaScript to TypeScript conversion tool for developers.' },
  fr: { title: 'Convertisseur JavaScript vers TypeScript - JS vers TS en Ligne', description: 'Outil de conversion JavaScript vers TypeScript gratuit en ligne. Convertissez JS en TS et ajoutez des annotations de type.' },
  de: { title: 'JavaScript zu TypeScript Konverter - JS zu TS Online', description: 'Kostenloses Online-Tool zur JavaScript-zu-TypeScript-Konvertierung. Konvertieren Sie JS zu TS und fugen Sie Typ-Annotationen hinzu.' },
  it: { title: 'Convertitore JavaScript in TypeScript - JS in TS Online', description: 'Strumento gratuito online per convertire JavaScript in TypeScript. Converti JS in TS e aggiungi annotazioni di tipo.' },
  es: { title: 'Convertidor JavaScript a TypeScript - JS a TS en Linea', description: 'Herramienta gratuita en linea para convertir JavaScript a TypeScript. Convierte JS a TS y agrega anotaciones de tipo.' },
  pt: { title: 'Conversor JavaScript para TypeScript - JS para TS Online', description: 'Ferramenta gratuita online para converter JavaScript para TypeScript. Converta JS para TS e adicione anotacoes de tipo.' },
  nl: { title: 'JavaScript naar TypeScript Converter - JS naar TS Online', description: 'Gratis online JavaScript naar TypeScript converter. Converteer JS naar TS en voeg type-annotaties toe.' },
  pl: { title: 'Konwerter JavaScript do TypeScript - JS do TS Online', description: 'Darmowe narzedzie online do konwersji JavaScript na TypeScript. Konwertuj JS na TS i dodaj adnotacje typow.' },
  sv: { title: 'JavaScript till TypeScript Konverterare - JS till TS Online', description: 'Gratis online JavaScript till TypeScript konverterare. Konvertera JS till TS och lagg till typannoteringar.' },
  no: { title: 'JavaScript til TypeScript Konverterer - JS til TS Online', description: 'Gratis online JavaScript til TypeScript konverterer. Konverter JS til TS og legg til typeannotasjoner.' },
  zh: { title: 'JavaScript 转 TypeScript 转换器 - 免费在线 JS 转 TS', description: '免费在线 JavaScript 转 TypeScript 转换工具。将 JS 转换为 TS，添加类型注解。' },
  ja: { title: 'JavaScript から TypeScript コンバーター - JS から TS に変換', description: '無料オンライン JavaScript から TypeScript への変換ツール。JS を TS に変換し、型注釈を追加します。' },
  ko: { title: 'JavaScript to TypeScript 변환기 - JS to TS 온라인', description: '무료 온라인 JavaScript to TypeScript 변환 도구. JS를 TS로 변환하고 타입 어노테이션을 추가합니다.' },
  id: { title: 'Konverter JavaScript ke TypeScript - JS ke TS Online', description: 'Alat konversi JavaScript ke TypeScript online gratis. Konversi JS ke TS dan tambahkan anotasi tipe.' },
  th: { title: 'JavaScript เป็น TypeScript Converter - แปลง JS เป็น TS', description: 'เครื่องมือแปลง JavaScript เป็น TypeScript ออนไลน์ฟรี แปลง JS เป็น TS และเพิ่ม type annotations' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/js-to-typescript-converter`;
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/js-to-typescript-converter`])),
        'x-default': `https://viadreams.cc/en/tools/js-to-typescript-converter`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
