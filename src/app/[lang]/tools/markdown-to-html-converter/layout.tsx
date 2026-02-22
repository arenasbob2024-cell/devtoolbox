import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Markdown to HTML Converter - Convert MD to HTML Online Free', description: 'Convert Markdown to HTML instantly with this free online tool. Supports headings, lists, links, code blocks, tables, and GitHub Flavored Markdown.' },
  zh: { title: 'Markdown 转 HTML 转换器 - 免费在线 MD 转 HTML 工具', description: '使用此免费在线工具即时将 Markdown 转换为 HTML。支持标题、列表、链接、代码块和表格。' },
  ja: { title: 'Markdown から HTML への変換ツール - 無料オンライン MD to HTML', description: 'Markdown を HTML に即座に変換。見出し、リスト、リンク、コードブロック対応。' },
  ko: { title: 'Markdown to HTML 변환기 - 무료 온라인 MD to HTML 변환', description: 'Markdown을 HTML로 즉시 변환하세요. 제목, 목록, 링크, 코드 블록 지원.' },
  fr: { title: 'Convertisseur Markdown vers HTML - Convertir MD en HTML en Ligne', description: 'Convertissez Markdown en HTML instantanement avec cet outil gratuit en ligne.' },
  de: { title: 'Markdown zu HTML Konverter - MD zu HTML Online Konvertieren', description: 'Konvertieren Sie Markdown sofort in HTML mit diesem kostenlosen Online-Tool.' },
  es: { title: 'Convertidor Markdown a HTML - Convertir MD a HTML en Linea', description: 'Convierte Markdown a HTML al instante con esta herramienta gratuita en linea.' },
  pt: { title: 'Conversor Markdown para HTML - Converter MD para HTML Online', description: 'Converta Markdown para HTML instantaneamente com esta ferramenta online gratuita.' },
  it: { title: 'Convertitore Markdown in HTML - Converti MD in HTML Online', description: 'Converti Markdown in HTML istantaneamente con questo strumento online gratuito.' },
  nl: { title: 'Markdown naar HTML Converter - MD naar HTML Online Converteren', description: 'Converteer Markdown direct naar HTML met deze gratis online tool.' },
  pl: { title: 'Konwerter Markdown do HTML - Konwertuj MD na HTML Online', description: 'Konwertuj Markdown do HTML natychmiast za darmo online.' },
  sv: { title: 'Markdown till HTML Konverterare - Konvertera MD till HTML Online', description: 'Konvertera Markdown till HTML direkt med detta gratis onlineverktyg.' },
  no: { title: 'Markdown til HTML Konverter - Konverter MD til HTML Online', description: 'Konverter Markdown til HTML umiddelbart med dette gratis nettverktoeyet.' },
  id: { title: 'Konverter Markdown ke HTML - Konversi MD ke HTML Online', description: 'Konversi Markdown ke HTML secara instan dengan alat online gratis ini.' },
  th: { title: 'แปลง Markdown เป็น HTML - แปลง MD เป็น HTML ออนไลน์ฟรี', description: 'แปลง Markdown เป็น HTML ทันทีด้วยเครื่องมือออนไลน์ฟรีนี้' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/markdown-to-html-converter`;
  return {
    title: t.title, description: t.description,
    keywords: ['markdown to html', 'md to html', 'markdown converter', 'convert markdown', 'markdown to html online'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/markdown-to-html-converter`])), 'x-default': 'https://viadreams.cc/en/tools/markdown-to-html-converter' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
