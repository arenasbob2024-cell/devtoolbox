import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to CSV Converter Online - Free Tool', description: 'Convert JSON arrays and objects to CSV format online for free. Supports nested JSON, custom delimiters, and instant download of CSV files.' },
  fr: { title: 'Convertisseur JSON vers CSV en Ligne Gratuit', description: 'Convertissez des tableaux et objets JSON en format CSV en ligne gratuitement. Supporte le JSON imbrique et les delimiteurs personnalises.' },
  de: { title: 'JSON zu CSV Konverter Online Kostenlos', description: 'JSON-Arrays und -Objekte kostenlos online in CSV-Format konvertieren. Unterstuetzt verschachteltes JSON und benutzerdefinierte Trennzeichen.' },
  it: { title: 'Convertitore JSON in CSV Online Gratis', description: 'Converti array e oggetti JSON in formato CSV online gratuitamente. Supporta JSON annidato e delimitatori personalizzati.' },
  es: { title: 'Convertidor JSON a CSV en Linea Gratis', description: 'Convierta arrays y objetos JSON a formato CSV en linea gratis. Soporta JSON anidado y delimitadores personalizados.' },
  pt: { title: 'Conversor JSON para CSV Online Gratis', description: 'Converta arrays e objetos JSON para formato CSV online gratuitamente. Suporta JSON aninhado e delimitadores personalizados.' },
  nl: { title: 'JSON naar CSV Converter Online Gratis', description: 'Converteer JSON-arrays en objecten naar CSV-formaat online gratis. Ondersteunt genest JSON en aangepaste scheidingstekens.' },
  pl: { title: 'Konwerter JSON do CSV Online Za Darmo', description: 'Konwertuj tablice i obiekty JSON na format CSV online za darmo. Obsluguje zagniezdzone JSON i niestandardowe separatory.' },
  sv: { title: 'JSON till CSV Konverterare Online Gratis', description: 'Konvertera JSON-arrayer och objekt till CSV-format online gratis. Stoeder naestlad JSON och anpassade avgransare.' },
  no: { title: 'JSON til CSV Konverterer Online Gratis', description: 'Konverter JSON-arrayer og objekter til CSV-format online gratis. Stoetter nestet JSON og tilpassede skilletegn.' },
  zh: { title: 'JSON 转 CSV 在线转换器 - 免费工具', description: '免费在线将 JSON 数组和对象转换为 CSV 格式。支持嵌套 JSON、自定义分隔符和即时下载 CSV 文件。' },
  ja: { title: 'JSON から CSV コンバーター オンライン 無料', description: 'JSON 配列やオブジェクトを無料でオンラインで CSV 形式に変換。ネストされた JSON やカスタム区切り文字をサポート。' },
  ko: { title: 'JSON to CSV 변환기 온라인 무료', description: 'JSON 배열과 객체를 무료로 온라인에서 CSV 형식으로 변환. 중첩 JSON과 사용자 정의 구분자 지원.' },
  id: { title: 'Konverter JSON ke CSV Online Gratis', description: 'Konversi array dan objek JSON ke format CSV online gratis. Mendukung JSON bersarang dan delimiter kustom.' },
  th: { title: 'แปลง JSON เป็น CSV ออนไลน์ฟรี', description: 'แปลง JSON array และ object เป็น CSV ออนไลน์ฟรี รองรับ JSON ซ้อน ตัวคั่นที่กำหนดเอง และดาวน์โหลดไฟล์ CSV ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-csv-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-csv-converter`])), 'x-default': `https://viadreams.cc/en/tools/json-to-csv-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
