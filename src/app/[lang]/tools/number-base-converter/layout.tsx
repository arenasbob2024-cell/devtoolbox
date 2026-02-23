import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Number Base Converter - Binary Octal Decimal Hex Online Free', description: 'Convert numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) instantly with bit representation. Free online number base converter.' },
  fr: { title: 'Convertisseur de Base Numerique - Binaire Octal Decimal Hex en Ligne', description: 'Convertissez des nombres entre binaire, octal, decimal et hexadecimal instantanement.' },
  de: { title: 'Zahlensystem Konverter - Binaer Oktal Dezimal Hex Online', description: 'Konvertieren Sie Zahlen zwischen binaer, oktal, dezimal und hexadezimal sofort.' },
  it: { title: 'Convertitore di Base Numerica - Binario Ottale Decimale Esadecimale Online', description: 'Converti numeri tra binario, ottale, decimale ed esadecimale istantaneamente.' },
  es: { title: 'Convertidor de Base Numerica - Binario Octal Decimal Hex en Linea', description: 'Convierte numeros entre binario, octal, decimal y hexadecimal al instante.' },
  pt: { title: 'Conversor de Base Numerica - Binario Octal Decimal Hex Online', description: 'Converta numeros entre binario, octal, decimal e hexadecimal instantaneamente.' },
  nl: { title: 'Getalsbasis Converter - Binair Octaal Decimaal Hex Online', description: 'Converteer getallen tussen binaer, octaal, decimaal en hexadecimaal direct.' },
  pl: { title: 'Konwerter Podstawy Liczbowej - Binarny Oktalny Dziesietny Hex Online', description: 'Konwertuj liczby miedzy binarnym, oktalnym, dziesietnym i szesnastkowym natychmiast.' },
  sv: { title: 'Talbas Konverterare - Binaer Oktal Decimal Hex Online', description: 'Konvertera tal mellan binaer, oktal, decimal och hexadecimal omedelbart.' },
  no: { title: 'Tallbase Konverter - Binaer Oktal Desimal Hex Online', description: 'Konverter tall mellom binaer, oktal, desimal og heksadesimal umiddelbart.' },
  zh: { title: '数制转换器 - 二进制八进制十进制十六进制在线转换', description: '在二进制、八进制、十进制、十六进制之间即时转换数字，并显示位表示。免费在线数制转换器。' },
  ja: { title: '進数変換ツール - 2進数 8進数 10進数 16進数 オンライン', description: '2進数、8進数、10進数、16進数の間で数値を即時変換。ビット表現付き。' },
  ko: { title: '진법 변환기 - 이진수 팔진수 십진수 십육진수 온라인', description: '이진수, 팔진수, 십진수, 십육진수 사이에서 숫자를 즉시 변환하세요. 비트 표현 포함.' },
  id: { title: 'Konverter Basis Bilangan - Biner Oktal Desimal Hex Online', description: 'Konversi angka antara biner, oktal, desimal, dan heksadesimal secara instan.' },
  th: { title: 'ตัวแปลงฐานตัวเลข - ไบนารี ออกทัล ทศนิยม เลขฐานสิบหก ออนไลน์', description: 'แปลงตัวเลขระหว่างไบนารี ออกทัล ทศนิยม และเลขฐานสิบหกได้ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/number-base-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/number-base-converter`])), 'x-default': `https://viadreams.cc/en/tools/number-base-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
