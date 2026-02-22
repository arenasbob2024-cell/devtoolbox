import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Markdown Table Generator - Create Tables Visually Free', description: 'Generate Markdown tables with a visual editor. Add or remove rows and columns, set alignment, and copy the Markdown output. Free online tool.' },
  fr: { title: 'Generateur de Tableaux Markdown en Ligne Gratuit', description: 'Generez des tableaux Markdown avec un editeur visuel. Ajoutez ou supprimez des lignes et colonnes, definissez l\'alignement.' },
  de: { title: 'Markdown Tabellen Generator Online Kostenlos', description: 'Markdown-Tabellen mit einem visuellen Editor erstellen. Zeilen und Spalten hinzufuegen oder entfernen, Ausrichtung festlegen.' },
  it: { title: 'Generatore di Tabelle Markdown Online Gratis', description: 'Genera tabelle Markdown con un editor visivo. Aggiungi o rimuovi righe e colonne, imposta l\'allineamento.' },
  es: { title: 'Generador de Tablas Markdown en Linea Gratis', description: 'Genera tablas Markdown con un editor visual. Agrega o elimina filas y columnas, establece la alineacion.' },
  pt: { title: 'Gerador de Tabelas Markdown Online Gratis', description: 'Gere tabelas Markdown com um editor visual. Adicione ou remova linhas e colunas, defina o alinhamento.' },
  nl: { title: 'Markdown Tabel Generator Online Gratis', description: 'Genereer Markdown-tabellen met een visuele editor. Voeg rijen en kolommen toe of verwijder ze, stel uitlijning in.' },
  pl: { title: 'Generator Tabel Markdown Online Za Darmo', description: 'Generuj tabele Markdown za pomoca edytora wizualnego. Dodawaj lub usuwaj wiersze i kolumny, ustawiaj wyrownanie.' },
  sv: { title: 'Markdown Tabellgenerator Online Gratis', description: 'Generera Markdown-tabeller med en visuell redigerare. Laegg till eller ta bort rader och kolumner, staell in justering.' },
  no: { title: 'Markdown Tabellgenerator Online Gratis', description: 'Generer Markdown-tabeller med en visuell redigerer. Legg til eller fjern rader og kolonner, sett justering.' },
  zh: { title: 'Markdown 表格生成器 - 免费可视化创建表格', description: '使用可视化编辑器生成 Markdown 表格。添加或删除行列、设置对齐方式，一键复制 Markdown 输出。' },
  ja: { title: 'Markdown テーブル生成器 - 無料で視覚的にテーブル作成', description: 'ビジュアルエディターで Markdown テーブルを生成。行列の追加・削除、配置設定、Markdown 出力のコピー。' },
  ko: { title: 'Markdown 테이블 생성기 - 무료 시각적 테이블 만들기', description: '비주얼 편집기로 Markdown 테이블을 생성합니다. 행/열 추가·삭제, 정렬 설정, Markdown 출력 복사.' },
  id: { title: 'Markdown Table Generator Online Gratis', description: 'Buat tabel Markdown dengan editor visual. Tambah atau hapus baris dan kolom, atur perataan, dan salin output Markdown.' },
  th: { title: 'Markdown Table Generator ออนไลน์ฟรี', description: 'สร้างตาราง Markdown ด้วยโปรแกรมแก้ไขภาพ เพิ่มหรือลบแถวและคอลัมน์ ตั้งค่าการจัดตำแหน่ง และคัดลอกผลลัพธ์ Markdown' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/markdown-table-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/markdown-table-generator`])), 'x-default': `https://viadreams.cc/en/tools/markdown-table-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
