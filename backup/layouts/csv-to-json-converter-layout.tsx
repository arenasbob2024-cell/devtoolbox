import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSV to JSON Converter Online - Free Tool', description: 'Convert CSV data to JSON online. Supports custom delimiters, header detection, and nested object generation.' },
  fr: { title: 'Convertisseur CSV vers JSON en Ligne Gratuit', description: 'Convertissez CSV en JSON en ligne. Prend en charge les delimiteurs personnalises et la detection des en-tetes.' },
  de: { title: 'CSV zu JSON Konverter Online Kostenlos', description: 'CSV-Daten online in JSON umwandeln. Unterstuetzt benutzerdefinierte Trennzeichen und Header-Erkennung.' },
  it: { title: 'Convertitore CSV in JSON Online Gratis', description: 'Converti CSV in JSON online. Supporta delimitatori personalizzati e rilevamento intestazioni.' },
  es: { title: 'Convertidor CSV a JSON en Linea Gratis', description: 'Convierta CSV a JSON en linea. Soporta delimitadores personalizados y deteccion de encabezados.' },
  pt: { title: 'Conversor CSV para JSON Online Gratis', description: 'Converta CSV para JSON online. Suporta delimitadores personalizados e deteccao de cabecalhos.' },
  nl: { title: 'CSV naar JSON Converter Online Gratis', description: 'Converteer CSV naar JSON online. Ondersteunt aangepaste scheidingstekens en header-detectie.' },
  pl: { title: 'Konwerter CSV do JSON Online Za Darmo', description: 'Konwertuj CSV do JSON online. Obsluguje niestandardowe separatory i wykrywanie naglowkow.' },
  sv: { title: 'CSV till JSON Konverterare Online Gratis', description: 'Konvertera CSV till JSON online. Stoeder anpassade avgransare och rubrikdetektering.' },
  no: { title: 'CSV til JSON Konverterer Online Gratis', description: 'Konverter CSV til JSON online. Stoetter egendefinerte skilletegn og overskriftsdeteksjon.' },
  zh: { title: 'CSV 转 JSON 在线转换器 - 免费工具', description: '在线将 CSV 数据转换为 JSON。支持自定义分隔符、表头检测和嵌套对象生成。' },
  ja: { title: 'CSV から JSON コンバーター オンライン 無料', description: 'CSV データを JSON にオンラインで変換。カスタム区切り文字とヘッダー検出をサポート。' },
  ko: { title: 'CSV to JSON 변환기 온라인 무료', description: 'CSV 데이터를 온라인에서 JSON으로 변환. 사용자 정의 구분자와 헤더 감지를 지원합니다.' },
  id: { title: 'Konverter CSV ke JSON Online Gratis', description: 'Konversi CSV ke JSON online. Mendukung delimiter kustom dan deteksi header.' },
  th: { title: 'แปลง CSV เป็น JSON ออนไลน์ฟรี', description: 'แปลงข้อมูล CSV เป็น JSON ออนไลน์ รองรับตัวคั่นที่กำหนดเองและการตรวจจับส่วนหัว' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/csv-to-json-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/csv-to-json-converter`])), 'x-default': `https://viadreams.cc/en/tools/csv-to-json-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
