import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Markdown Table Generator - Create Tables Visually', description: 'Free online Markdown table generator. Create and edit tables visually, then copy the Markdown syntax instantly. Supports alignment options.' },
  fr: { title: 'Generateur de Tableaux Markdown - Creer des Tableaux', description: 'Generateur de tableaux Markdown gratuit. Creez et editez des tableaux visuellement, puis copiez la syntaxe Markdown instantanement.' },
  de: { title: 'Markdown Tabellen Generator - Tabellen Erstellen', description: 'Kostenloser Markdown Tabellen Generator. Tabellen visuell erstellen und bearbeiten, dann Markdown-Syntax sofort kopieren.' },
  it: { title: 'Generatore Tabelle Markdown - Crea Tabelle Visivamente', description: 'Generatore di tabelle Markdown gratuito. Crea e modifica tabelle visivamente, poi copia la sintassi Markdown istantaneamente.' },
  es: { title: 'Generador de Tablas Markdown - Crear Tablas Visualmente', description: 'Generador gratuito de tablas Markdown. Crea y edita tablas visualmente, luego copia la sintaxis Markdown al instante.' },
  pt: { title: 'Gerador de Tabelas Markdown - Criar Tabelas', description: 'Gerador gratuito de tabelas Markdown. Crie e edite tabelas visualmente e copie a sintaxe Markdown instantaneamente.' },
  nl: { title: 'Markdown Tabel Generator - Tabellen Maken', description: 'Gratis Markdown tabel generator. Maak en bewerk tabellen visueel en kopieer de Markdown-syntaxis direct.' },
  pl: { title: 'Generator Tabel Markdown - Tworzenie Tabel', description: 'Darmowy generator tabel Markdown. Tworzenie i edytowanie tabel wizualnie, a nastepnie kopiowanie skladni Markdown natychmiast.' },
  sv: { title: 'Markdown Tabellgenerator - Skapa Tabeller', description: 'Gratis Markdown tabellgenerator. Skapa och redigera tabeller visuellt och kopiera Markdown-syntaxen direkt.' },
  no: { title: 'Markdown Tabellgenerator - Lag Tabeller', description: 'Gratis Markdown tabellgenerator. Lag og rediger tabeller visuelt og kopier Markdown-syntaksen umiddelbart.' },
  zh: { title: 'Markdown 表格生成器 - 可视化创建表格', description: '免费在线 Markdown 表格生成器。可视化创建和编辑表格，即时复制 Markdown 语法。支持对齐选项。' },
  ja: { title: 'Markdown テーブルジェネレーター - 表を視覚的に作成', description: '無料オンライン Markdown テーブルジェネレーター。表を視覚的に作成・編集して Markdown 構文を即座にコピー。' },
  ko: { title: 'Markdown 표 생성기 - 시각적으로 표 만들기', description: '무료 온라인 Markdown 표 생성기. 표를 시각적으로 만들고 편집한 다음 Markdown 구문을 즉시 복사하세요.' },
  id: { title: 'Generator Tabel Markdown - Buat Tabel Secara Visual', description: 'Generator tabel Markdown gratis. Buat dan edit tabel secara visual, lalu salin sintaks Markdown secara instan.' },
  th: { title: 'ตัวสร้างตาราง Markdown - สร้างตารางแบบภาพ', description: 'ตัวสร้างตาราง Markdown ฟรีออนไลน์ สร้างและแก้ไขตารางแบบภาพแล้วคัดลอกรูปแบบ Markdown ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/markdown-table-generator`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['markdown table generator', 'markdown table', 'table generator', 'markdown editor', 'table to markdown'],
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

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
