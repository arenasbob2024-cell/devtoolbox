import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'ASCII Table Generator - Create ASCII Art Tables from CSV Online Free', description: 'Generate formatted ASCII art tables from CSV or delimiter-separated input. Customize borders, alignment, and styles. Free online ASCII table creator.' },
  fr: { title: 'Generateur de Tableaux ASCII - Creer des Tableaux ASCII en Ligne', description: 'Generez des tableaux ASCII formates a partir d\'entrees CSV ou delimitees.' },
  de: { title: 'ASCII Tabellen Generator - ASCII Tabellen aus CSV Online Erstellen', description: 'Erstellen Sie formatierte ASCII-Tabellen aus CSV-Eingaben kostenlos online.' },
  it: { title: 'Generatore di Tabelle ASCII - Crea Tabelle ASCII da CSV Online', description: 'Genera tabelle ASCII formattate da input CSV o delimitati.' },
  es: { title: 'Generador de Tablas ASCII - Crear Tablas ASCII desde CSV en Linea', description: 'Genera tablas ASCII formateadas desde entrada CSV o delimitada.' },
  pt: { title: 'Gerador de Tabelas ASCII - Criar Tabelas ASCII de CSV Online', description: 'Gere tabelas ASCII formatadas de entrada CSV ou delimitada.' },
  nl: { title: 'ASCII Tabelgenerator - ASCII Tabellen Maken van CSV Online', description: 'Genereer geformatteerde ASCII-tabellen van CSV of gescheiden invoer.' },
  pl: { title: 'Generator Tabel ASCII - Tworzenie Tabel ASCII z CSV Online', description: 'Generuj sformatowane tabele ASCII z wejscia CSV lub rozdzielanego.' },
  sv: { title: 'ASCII Tabellgenerator - Skapa ASCII Tabeller fran CSV Online', description: 'Generera formaterade ASCII-tabeller fran CSV eller avgransad inmatning.' },
  no: { title: 'ASCII Tabellgenerator - Lag ASCII Tabeller fra CSV Online', description: 'Generer formaterte ASCII-tabeller fra CSV eller avgrenset inndata.' },
  zh: { title: 'ASCII 表格生成器 - 从 CSV 创建 ASCII 艺术表格', description: '从 CSV 或分隔符分隔的输入生成格式化的 ASCII 艺术表格。免费在线 ASCII 表格创建器。' },
  ja: { title: 'ASCII テーブルジェネレーター - CSV から ASCII アートテーブルを作成', description: 'CSV や区切り文字で区切られた入力からフォーマットされた ASCII アートテーブルを生成します。' },
  ko: { title: 'ASCII 테이블 생성기 - CSV에서 ASCII 아트 테이블 만들기 온라인', description: 'CSV 또는 구분자로 구분된 입력에서 형식화된 ASCII 아트 테이블을 생성합니다.' },
  id: { title: 'Generator Tabel ASCII - Buat Tabel ASCII dari CSV Online', description: 'Hasilkan tabel ASCII yang diformat dari input CSV atau yang dibatasi.' },
  th: { title: 'เครื่องมือสร้างตาราง ASCII - สร้างตาราง ASCII จาก CSV ออนไลน์', description: 'สร้างตาราง ASCII ที่จัดรูปแบบจากอินพุต CSV หรือที่คั่นด้วยตัวคั่น' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/ascii-table-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/ascii-table-generator`])), 'x-default': `https://viadreams.cc/en/tools/ascii-table-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
