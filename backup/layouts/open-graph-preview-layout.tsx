import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Open Graph Preview - Test Social Media Link Previews', description: 'Preview how your website looks when shared on Facebook, Twitter, LinkedIn, and other social media platforms. Test Open Graph meta tags instantly.' },
  fr: { title: 'Apercu Open Graph - Tester les Apercus de Liens Sociaux', description: 'Previsualiser l\'apparence de votre site sur Facebook, Twitter, LinkedIn et d\'autres reseaux sociaux. Testez les balises Open Graph instantanement.' },
  de: { title: 'Open Graph Vorschau - Social Media Link-Vorschau Testen', description: 'Vorschau, wie Ihre Website auf Facebook, Twitter, LinkedIn aussieht. Testen Sie Open-Graph-Meta-Tags sofort.' },
  it: { title: 'Anteprima Open Graph - Testare Anteprime Link Social', description: 'Anteprima di come appare il tuo sito su Facebook, Twitter, LinkedIn. Testa i meta tag Open Graph istantaneamente.' },
  es: { title: 'Vista Previa Open Graph - Probar Vistas Previas de Redes Sociales', description: 'Previsualiza como se ve tu sitio en Facebook, Twitter, LinkedIn. Prueba los meta tags Open Graph al instante.' },
  pt: { title: 'Visualizacao Open Graph - Testar Previas de Redes Sociais', description: 'Visualize como seu site parece no Facebook, Twitter, LinkedIn. Teste meta tags Open Graph instantaneamente.' },
  nl: { title: 'Open Graph Voorbeeld - Sociale Media Link Voorbeeld Testen', description: 'Bekijk hoe uw website eruit ziet op Facebook, Twitter, LinkedIn. Test Open Graph meta tags direct.' },
  pl: { title: 'Podglad Open Graph - Testowanie Podgladow Linkow Spolecznosciowych', description: 'Podglad wygladu Twojej witryny na Facebooku, Twitterze, LinkedIn. Testuj tagi Open Graph natychmiast.' },
  sv: { title: 'Open Graph Forhandsvisning - Testa Sociala Medier Lankforhandsvisningar', description: 'Forhandsgranska hur din webbplats ser ut pa Facebook, Twitter, LinkedIn. Testa Open Graph meta-taggar direkt.' },
  no: { title: 'Open Graph Forhandsvisning - Test Sosiale Medier Linkforhandsvisninger', description: 'Forhandsvis hvordan nettstedet ditt ser ut pa Facebook, Twitter, LinkedIn. Test Open Graph meta-tagger umiddelbart.' },
  zh: { title: 'Open Graph 预览 - 测试社交媒体链接预览', description: '预览您的网站在 Facebook、Twitter、LinkedIn 等社交媒体平台上分享时的外观。即时测试 Open Graph meta 标签效果。' },
  ja: { title: 'Open Graph プレビュー - ソーシャルメディアリンクプレビューのテスト', description: 'Facebook、Twitter、LinkedIn などのソーシャルメディアでシェアした際の表示をプレビューします。Open Graph メタタグを即時テスト。' },
  ko: { title: 'Open Graph 미리보기 - 소셜 미디어 링크 미리보기 테스트', description: 'Facebook, Twitter, LinkedIn 등 소셜 미디어에서 공유 시 웹사이트가 어떻게 보이는지 미리보기하세요.' },
  id: { title: 'Pratinjau Open Graph - Uji Pratinjau Tautan Media Sosial', description: 'Pratinjau tampilan website Anda di Facebook, Twitter, LinkedIn. Uji meta tag Open Graph secara instan.' },
  th: { title: 'ตัวอย่าง Open Graph - ทดสอบตัวอย่างลิงก์โซเชียลมีเดีย', description: 'ดูตัวอย่างว่าเว็บไซต์ของคุณมีลักษณะอย่างไรเมื่อแชร์บน Facebook, Twitter, LinkedIn' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/open-graph-preview`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['open graph preview', 'social media preview', 'OG tag tester', 'facebook link preview', 'twitter card preview'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/open-graph-preview`])), 'x-default': `https://viadreams.cc/en/tools/open-graph-preview` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
