import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTML to Markdown Converter - Convert HTML to MD Online Free', description: 'Free online HTML to Markdown converter. Convert HTML tags to Markdown syntax including headers, links, images, lists, tables, and code blocks. Fast and private.' },
  fr: { title: 'Convertisseur HTML vers Markdown - Convertir HTML en MD en Ligne', description: 'Convertisseur HTML vers Markdown gratuit en ligne. Convertissez les balises HTML en syntaxe Markdown.' },
  de: { title: 'HTML zu Markdown Konverter - HTML in MD Online Kostenlos', description: 'Kostenloser Online HTML-zu-Markdown-Konverter. Konvertieren Sie HTML-Tags in Markdown-Syntax.' },
  it: { title: 'Convertitore HTML in Markdown - Converti HTML in MD Online', description: 'Convertitore HTML in Markdown gratuito online. Converti tag HTML in sintassi Markdown.' },
  es: { title: 'Convertidor HTML a Markdown - Convertir HTML a MD en Linea', description: 'Convertidor HTML a Markdown gratuito en linea. Convierte etiquetas HTML a sintaxis Markdown.' },
  pt: { title: 'Conversor HTML para Markdown - Converter HTML para MD Online', description: 'Conversor HTML para Markdown gratuito online. Converta tags HTML para sintaxe Markdown.' },
  nl: { title: 'HTML naar Markdown Converter - HTML naar MD Online Gratis', description: 'Gratis online HTML naar Markdown converter. Converteer HTML-tags naar Markdown-syntax.' },
  pl: { title: 'Konwerter HTML na Markdown - Konwertuj HTML na MD Online', description: 'Darmowy konwerter HTML na Markdown online. Konwertuj tagi HTML na skladnie Markdown.' },
  sv: { title: 'HTML till Markdown Konverterare - Konvertera HTML till MD Online', description: 'Gratis online HTML till Markdown konverterare. Konvertera HTML-taggar till Markdown-syntax.' },
  no: { title: 'HTML til Markdown Konverterer - Konverter HTML til MD Online', description: 'Gratis online HTML til Markdown konverterer. Konverter HTML-tagger til Markdown-syntaks.' },
  zh: { title: 'HTML 转 Markdown 转换器 - 免费在线 HTML 转 MD', description: '免费在线 HTML 转 Markdown 转换器。将 HTML 标签转换为 Markdown 语法，支持标题、链接、图片、列表、表格和代码块。' },
  ja: { title: 'HTML to Markdown 変換ツール - HTML を MD に無料変換', description: '無料オンライン HTML to Markdown 変換ツール。HTMLタグをMarkdown構文に変換。' },
  ko: { title: 'HTML을 Markdown으로 변환기 - HTML을 MD로 무료 변환', description: '무료 온라인 HTML to Markdown 변환기. HTML 태그를 Markdown 구문으로 변환.' },
  id: { title: 'Konverter HTML ke Markdown - Konversi HTML ke MD Online Gratis', description: 'Konverter HTML ke Markdown online gratis. Konversi tag HTML ke sintaks Markdown.' },
  th: { title: 'ตัวแปลง HTML เป็น Markdown - แปลง HTML เป็น MD ออนไลน์ฟรี', description: 'ตัวแปลง HTML เป็น Markdown ออนไลน์ฟรี แปลงแท็ก HTML เป็นไวยากรณ์ Markdown' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/html-to-markdown`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/html-to-markdown`])), 'x-default': `https://viadreams.cc/en/tools/html-to-markdown` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
