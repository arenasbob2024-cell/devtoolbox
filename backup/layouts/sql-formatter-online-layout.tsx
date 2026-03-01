import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SQL Formatter Online - Free SQL Query Beautifier & Prettifier', description: 'Free online SQL formatter and beautifier. Format, indent, and prettify SQL queries instantly. Supports SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, and complex joins.' },
  fr: { title: 'Formateur SQL en Ligne - Embellisseur de Requetes SQL Gratuit', description: 'Formateur et embellisseur SQL gratuit en ligne. Formatez, indentez et embellissez vos requetes SQL instantanement.' },
  de: { title: 'SQL Formatter Online - Kostenloser SQL Query Beautifier', description: 'Kostenloser Online SQL Formatter und Beautifier. Formatieren, einruecken und verschoenern Sie SQL-Abfragen sofort.' },
  it: { title: 'Formattatore SQL Online - Abbellitore Query SQL Gratuito', description: 'Formattatore e abbellitore SQL gratuito online. Formatta, indenta e abbellisci le query SQL istantaneamente.' },
  es: { title: 'Formateador SQL en Linea - Embellecedor de Consultas SQL Gratis', description: 'Formateador y embellecedor SQL gratuito en linea. Formatea, indenta y embellece consultas SQL al instante.' },
  pt: { title: 'Formatador SQL Online - Embelezador de Consultas SQL Gratis', description: 'Formatador e embelezador SQL gratuito online. Formate, indente e embeleze consultas SQL instantaneamente.' },
  nl: { title: 'SQL Formatter Online - Gratis SQL Query Beautifier', description: 'Gratis online SQL formatter en beautifier. Formatteer, inspringen en verfraai SQL-query\'s direct.' },
  pl: { title: 'Formatter SQL Online - Darmowy Upiększacz Zapytań SQL', description: 'Darmowy formatter i upiększacz SQL online. Formatuj, wcinaj i upiększaj zapytania SQL natychmiast.' },
  sv: { title: 'SQL Formatter Online - Gratis SQL Query Beautifier', description: 'Gratis online SQL formatter och beautifier. Formatera, indentera och forskoena SQL-fragor direkt.' },
  no: { title: 'SQL Formatter Online - Gratis SQL Query Beautifier', description: 'Gratis online SQL formatter og beautifier. Formater, innrykk og forskjoenn SQL-sporringer umiddelbart.' },
  zh: { title: 'SQL 格式化工具 - 免费在线 SQL 查询美化器', description: '免费在线 SQL 格式化和美化工具。即时格式化、缩进和美化 SQL 查询。支持 SELECT、INSERT、UPDATE、DELETE、CREATE TABLE 和复杂联接。' },
  ja: { title: 'SQL フォーマッター - 無料オンライン SQL クエリ整形ツール', description: '無料オンライン SQL フォーマッターと整形ツール。SQL クエリを即座にフォーマット、インデント、整形。' },
  ko: { title: 'SQL 포매터 온라인 - 무료 SQL 쿼리 정리 도구', description: '무료 온라인 SQL 포매터 및 뷰티파이어. SQL 쿼리를 즉시 포맷, 들여쓰기 및 정리하세요.' },
  id: { title: 'SQL Formatter Online - Alat Perapih Kueri SQL Gratis', description: 'Formatter dan perapih SQL online gratis. Format, indentasi, dan rapihkan kueri SQL secara instan.' },
  th: { title: 'SQL Formatter ออนไลน์ - เครื่องมือจัดรูปแบบ SQL ฟรี', description: 'เครื่องมือจัดรูปแบบและตกแต่ง SQL ออนไลน์ฟรี จัดรูปแบบ เยื้องบรรทัด และตกแต่ง SQL queries ทันที' },
};

const slug = 'sql-formatter-online';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['sql formatter', 'sql beautifier', 'sql formatter online', 'format sql', 'sql prettifier', 'sql query formatter', 'sql indent', 'sql format online'],
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])),
        'x-default': `https://viadreams.cc/en/tools/${slug}`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
