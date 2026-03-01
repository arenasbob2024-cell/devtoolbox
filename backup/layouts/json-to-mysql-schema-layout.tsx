import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to MySQL Schema - Convert JSON to CREATE TABLE Statement Online', description: 'Convert JSON objects to MySQL CREATE TABLE statements automatically. Smart data type detection. Free online JSON to MySQL schema generator.' },
  fr: { title: 'JSON vers Schema MySQL - Convertir JSON en CREATE TABLE en Ligne', description: 'Convertissez des objets JSON en instructions MySQL CREATE TABLE automatiquement.' },
  de: { title: 'JSON zu MySQL Schema - JSON in CREATE TABLE Online Konvertieren', description: 'JSON-Objekte automatisch in MySQL CREATE TABLE-Anweisungen konvertieren.' },
  it: { title: 'JSON in Schema MySQL - Converti JSON in CREATE TABLE Online', description: 'Converti oggetti JSON in istruzioni MySQL CREATE TABLE automaticamente.' },
  es: { title: 'JSON a Esquema MySQL - Convertir JSON en CREATE TABLE en Linea', description: 'Convierte objetos JSON en sentencias MySQL CREATE TABLE automaticamente.' },
  pt: { title: 'JSON para Schema MySQL - Converter JSON em CREATE TABLE Online', description: 'Converta objetos JSON em instrucoes MySQL CREATE TABLE automaticamente.' },
  nl: { title: 'JSON naar MySQL Schema - JSON naar CREATE TABLE Online Converteren', description: 'Converteer JSON-objecten automatisch naar MySQL CREATE TABLE-instructies.' },
  pl: { title: 'JSON do Schematu MySQL - Konwersja JSON na CREATE TABLE Online', description: 'Konwertuj obiekty JSON na instrukcje MySQL CREATE TABLE automatycznie.' },
  sv: { title: 'JSON till MySQL Schema - Konvertera JSON till CREATE TABLE Online', description: 'Konvertera JSON-objekt till MySQL CREATE TABLE-satser automatiskt.' },
  no: { title: 'JSON til MySQL Schema - Konverter JSON til CREATE TABLE Online', description: 'Konverter JSON-objekter til MySQL CREATE TABLE-setninger automatisk.' },
  zh: { title: 'JSON 转 MySQL Schema - 在线生成 CREATE TABLE 语句', description: '自动将 JSON 对象转换为 MySQL CREATE TABLE 建表语句，智能推断数据类型。' },
  ja: { title: 'JSONからMySQLスキーマへ - JSONをCREATE TABLEに変換', description: 'JSONオブジェクトをMySQL CREATE TABLE文に自動変換します。スマートなデータ型検出付き。' },
  ko: { title: 'JSON을 MySQL 스키마로 - JSON에서 CREATE TABLE 온라인 변환', description: 'JSON 객체를 MySQL CREATE TABLE 문으로 자동 변환합니다. 스마트 데이터 유형 감지.' },
  id: { title: 'JSON ke Skema MySQL - Konversi JSON ke CREATE TABLE Online', description: 'Konversi objek JSON ke pernyataan MySQL CREATE TABLE secara otomatis.' },
  th: { title: 'JSON เป็น MySQL Schema - แปลง JSON เป็น CREATE TABLE ออนไลน์', description: 'แปลง JSON objects เป็น MySQL CREATE TABLE statements อัตโนมัติ ตรวจจับชนิดข้อมูลอัจฉริยะ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-mysql-schema`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-mysql-schema`])), 'x-default': `https://viadreams.cc/en/tools/json-to-mysql-schema` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
