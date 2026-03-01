import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTML to Markdown Converter Online - Free Tool', description: 'Convert HTML to Markdown online for free. Supports headings, links, images, lists, tables, code blocks, and more. All processing in your browser.' },
  fr: { title: 'Convertisseur HTML vers Markdown en Ligne Gratuit', description: 'Convertissez HTML en Markdown en ligne gratuitement. Supporte titres, liens, images, listes, tableaux.' },
  de: { title: 'HTML zu Markdown Konverter Online Kostenlos', description: 'Konvertieren Sie HTML online kostenlos in Markdown. Unterstuetzt Ueberschriften, Links, Bilder, Listen, Tabellen.' },
  it: { title: 'Convertitore HTML a Markdown Online Gratis', description: 'Converti HTML in Markdown online gratis. Supporta intestazioni, link, immagini, liste, tabelle.' },
  es: { title: 'Convertidor HTML a Markdown en Linea Gratis', description: 'Convierta HTML a Markdown en linea gratis. Soporta encabezados, enlaces, imagenes, listas, tablas.' },
  pt: { title: 'Conversor HTML para Markdown Online Gratis', description: 'Converta HTML para Markdown online gratis. Suporta titulos, links, imagens, listas, tabelas.' },
  nl: { title: 'HTML naar Markdown Converter Online Gratis', description: 'Converteer HTML naar Markdown online gratis. Ondersteunt koppen, links, afbeeldingen, lijsten, tabellen.' },
  pl: { title: 'Konwerter HTML do Markdown Online Za Darmo', description: 'Konwertuj HTML na Markdown online za darmo. Obsluguje naglowki, linki, obrazy, listy, tabele.' },
  sv: { title: 'HTML till Markdown Konverterare Online Gratis', description: 'Konvertera HTML till Markdown online gratis.' },
  no: { title: 'HTML til Markdown Konverterer Online Gratis', description: 'Konverter HTML til Markdown online gratis.' },
  zh: { title: 'HTML 转 Markdown 在线转换器 - 免费工具', description: '免费在线将 HTML 转换为 Markdown。支持标题、链接、图片、列表、表格、代码块等。' },
  ja: { title: 'HTML から Markdown コンバーター オンライン 無料', description: 'HTMLをMarkdownにオンラインで無料変換。見出し、リンク、画像、リスト、テーブルに対応。' },
  ko: { title: 'HTML to Markdown 변환기 온라인 무료', description: 'HTML을 Markdown으로 무료 온라인 변환. 제목, 링크, 이미지, 목록, 표 지원.' },
  id: { title: 'Konverter HTML ke Markdown Online Gratis', description: 'Konversi HTML ke Markdown online gratis. Mendukung judul, tautan, gambar, daftar, tabel.' },
  th: { title: 'ตัวแปลง HTML เป็น Markdown ออนไลน์ฟรี', description: 'แปลง HTML เป็น Markdown ออนไลน์ฟรี รองรับหัวข้อ ลิงก์ รูปภาพ รายการ ตาราง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/html-to-markdown-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/html-to-markdown-converter`])), 'x-default': `https://viadreams.cc/en/tools/html-to-markdown-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
