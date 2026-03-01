import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Markdown Link Checker - Extract and Check Links from Markdown Online', description: 'Paste Markdown and instantly extract all links with anchor text in a table. Find broken link patterns and validate URL formats. Free online Markdown link extractor.' },
  fr: { title: 'Verificateur de Liens Markdown - Extraire les Liens de Markdown en Ligne', description: 'Collez du Markdown et extrayez instantanement tous les liens avec le texte d\'ancrage.' },
  de: { title: 'Markdown Link-Prufer - Links aus Markdown Online Extrahieren', description: 'Fuegen Sie Markdown ein und extrahieren Sie sofort alle Links mit Ankertext.' },
  it: { title: 'Controllore Link Markdown - Estrai Link da Markdown Online', description: 'Incolla Markdown ed estrai istantaneamente tutti i link con testo ancora.' },
  es: { title: 'Verificador de Enlaces Markdown - Extraer Enlaces de Markdown en Linea', description: 'Pega Markdown y extrae instantaneamente todos los enlaces con texto de anclaje.' },
  pt: { title: 'Verificador de Links Markdown - Extrair Links de Markdown Online', description: 'Cole Markdown e extraia instantaneamente todos os links com texto ancora.' },
  nl: { title: 'Markdown Link Checker - Links Extraheren uit Markdown Online', description: 'Plak Markdown en extraheer direct alle links met ankertekst.' },
  pl: { title: 'Sprawdzarka Linkow Markdown - Wyodrebnianie Linkow z Markdown Online', description: 'Wklej Markdown i natychmiast wyodrebnij wszystkie linki z tekstem zakotwiczenia.' },
  sv: { title: 'Markdown Lankontrollant - Extrahera Lankar fran Markdown Online', description: 'Klistra in Markdown och extrahera omedelbart alla lankar med ankartext.' },
  no: { title: 'Markdown Lenkesjekker - Trekk ut Lenker fra Markdown Online', description: 'Lim inn Markdown og trekk umiddelbart ut alle lenker med ankertekst.' },
  zh: { title: 'Markdown 链接检查器 - 从 Markdown 提取链接在线', description: '粘贴 Markdown 并即时提取所有链接及锚文本到表格中。免费在线 Markdown 链接提取器。' },
  ja: { title: 'Markdown リンクチェッカー - Markdown からリンクをオンラインで抽出', description: 'Markdown を貼り付けてすべてのリンクとアンカーテキストを即座に抽出します。' },
  ko: { title: 'Markdown 링크 체커 - Markdown에서 링크 추출 온라인', description: 'Markdown을 붙여넣어 앵커 텍스트와 함께 모든 링크를 즉시 추출합니다.' },
  id: { title: 'Pemeriksa Tautan Markdown - Ekstrak Tautan dari Markdown Online', description: 'Tempel Markdown dan ekstrak semua tautan dengan teks jangkar secara instan.' },
  th: { title: 'ตัวตรวจสอบลิงก์ Markdown - แยกลิงก์จาก Markdown ออนไลน์', description: 'วาง Markdown และแยกลิงก์ทั้งหมดพร้อมข้อความจุดยึดได้ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/markdown-link-checker`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/markdown-link-checker`])), 'x-default': `https://viadreams.cc/en/tools/markdown-link-checker` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
