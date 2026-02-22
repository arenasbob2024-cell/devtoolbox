import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Meta Tag Generator - Free HTML Meta Tags for SEO', description: 'Generate HTML meta tags for SEO instantly. Create title, description, keywords, Open Graph, and Twitter Card meta tags with live preview.' },
  fr: { title: 'Generateur de Balises Meta - Balises HTML SEO Gratuites', description: 'Generez des balises meta HTML pour le SEO instantanement. Creez des balises title, description, mots-cles, Open Graph et Twitter Card.' },
  de: { title: 'Meta-Tag Generator - Kostenlose HTML Meta-Tags fuer SEO', description: 'Generieren Sie HTML-Meta-Tags fuer SEO sofort. Erstellen Sie Titel-, Beschreibungs-, Schlagwort-, Open-Graph- und Twitter-Card-Meta-Tags.' },
  it: { title: 'Generatore Meta Tag - Meta Tag HTML Gratuiti per SEO', description: 'Genera meta tag HTML per SEO istantaneamente. Crea title, description, keyword, Open Graph e Twitter Card meta tag.' },
  es: { title: 'Generador de Meta Tags - Meta Tags HTML Gratuitos para SEO', description: 'Genera meta tags HTML para SEO al instante. Crea tags de titulo, descripcion, palabras clave, Open Graph y Twitter Card.' },
  pt: { title: 'Gerador de Meta Tags - Meta Tags HTML Gratuitas para SEO', description: 'Gere meta tags HTML para SEO instantaneamente. Crie tags de titulo, descricao, palavras-chave, Open Graph e Twitter Card.' },
  nl: { title: 'Meta Tag Generator - Gratis HTML Meta Tags voor SEO', description: 'Genereer HTML meta tags voor SEO direct. Maak titel, beschrijving, trefwoorden, Open Graph en Twitter Card meta tags.' },
  pl: { title: 'Generator Meta Tagow - Darmowe Tagi HTML dla SEO', description: 'Generuj tagi meta HTML dla SEO natychmiast. Tworzenie tytulow, opisow, slow kluczowych, Open Graph i Twitter Card meta tagow.' },
  sv: { title: 'Meta-Tag Generator - Gratis HTML Meta-Taggar for SEO', description: 'Generera HTML-meta-taggar for SEO direkt. Skapa rubrik, beskrivning, nyckelord, Open Graph och Twitter Card meta-taggar.' },
  no: { title: 'Meta-Tag Generator - Gratis HTML Meta-Tagger for SEO', description: 'Generer HTML meta-tagger for SEO umiddelbart. Lag tittel, beskrivelse, nokkelord, Open Graph og Twitter Card meta-tagger.' },
  zh: { title: 'Meta 标签生成器 - 免费 SEO HTML Meta 标签工具', description: '即时生成 SEO 所需的 HTML meta 标签。创建标题、描述、关键词、Open Graph 和 Twitter Card 标签，带实时预览。' },
  ja: { title: 'メタタグジェネレーター - 無料 SEO HTML メタタグ', description: 'SEO 用の HTML メタタグを即時生成。タイトル、説明、キーワード、Open Graph、Twitter Card メタタグを作成できます。' },
  ko: { title: '메타 태그 생성기 - 무료 SEO HTML 메타 태그', description: 'SEO를 위한 HTML 메타 태그를 즉시 생성하세요. 제목, 설명, 키워드, Open Graph, Twitter Card 메타 태그를 만드세요.' },
  id: { title: 'Generator Meta Tag - Meta Tag HTML Gratis untuk SEO', description: 'Buat meta tag HTML untuk SEO secara instan. Buat tag judul, deskripsi, kata kunci, Open Graph, dan Twitter Card.' },
  th: { title: 'ตัวสร้าง Meta Tag - Meta Tag HTML ฟรีสำหรับ SEO', description: 'สร้าง meta tag HTML สำหรับ SEO ทันที สร้างแท็กชื่อ คำอธิบาย คำสำคัญ Open Graph และ Twitter Card' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/meta-tag-generator`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['meta tag generator', 'HTML meta tags', 'SEO meta tags', 'open graph generator', 'twitter card generator'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/meta-tag-generator`])), 'x-default': `https://viadreams.cc/en/tools/meta-tag-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
