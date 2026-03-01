import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Markdown Preview - Online Markdown Editor with Live Preview', description: 'Free online Markdown editor with live preview. Write Markdown and see rendered output side by side. Supports headings, bold, italic, links, tables, code blocks, and more.' },
  fr: { title: 'Apercu Markdown - Editeur Markdown en Ligne avec Apercu', description: 'Editeur Markdown gratuit avec apercu en direct. Ecrivez du Markdown et voyez le rendu cote a cote.' },
  de: { title: 'Markdown Vorschau - Online Markdown Editor mit Live-Vorschau', description: 'Kostenloser Online Markdown-Editor mit Live-Vorschau. Schreiben Sie Markdown und sehen Sie die gerenderte Ausgabe.' },
  it: { title: 'Anteprima Markdown - Editor Markdown Online con Anteprima', description: 'Editor Markdown gratuito con anteprima dal vivo. Scrivi Markdown e vedi il risultato renderizzato.' },
  es: { title: 'Vista Previa Markdown - Editor Markdown en Linea con Vista Previa', description: 'Editor Markdown gratuito con vista previa en vivo. Escribe Markdown y ve la salida renderizada.' },
  pt: { title: 'Preview Markdown - Editor Markdown Online com Preview', description: 'Editor Markdown gratuito com preview ao vivo. Escreva Markdown e veja a saida renderizada.' },
  nl: { title: 'Markdown Preview - Online Markdown Editor met Live Voorbeeld', description: 'Gratis online Markdown-editor met live voorbeeld. Schrijf Markdown en bekijk de gerenderde uitvoer.' },
  pl: { title: 'Podglad Markdown - Edytor Markdown Online z Podgladem', description: 'Darmowy edytor Markdown online z podgladem na zywo. Pisz Markdown i zobacz wyrenderowany wynik.' },
  sv: { title: 'Markdown Forhandsvisning - Online Markdown Editor', description: 'Gratis online Markdown-editor med forhandsvisning. Skriv Markdown och se renderad utdata.' },
  no: { title: 'Markdown Forhondsvisning - Online Markdown Editor', description: 'Gratis online Markdown-editor med forhondsvisning. Skriv Markdown og se gjengitt utdata.' },
  zh: { title: 'Markdown 预览 - 免费在线 Markdown 编辑器', description: '免费在线 Markdown 编辑器，支持实时预览。并排编写 Markdown 并查看渲染输出。支持标题、粗体、斜体、链接、表格、代码块等。' },
  ja: { title: 'Markdown プレビュー - オンライン Markdown エディタ', description: '無料オンライン Markdown エディタ。リアルタイムプレビュー付き。Markdownを書いてレンダリング結果を確認。' },
  ko: { title: 'Markdown 미리보기 - 온라인 Markdown 에디터', description: '무료 온라인 Markdown 에디터. 실시간 미리보기 지원. Markdown을 작성하고 렌더링된 출력을 확인.' },
  id: { title: 'Markdown Preview - Editor Markdown Online dengan Preview', description: 'Editor Markdown online gratis dengan preview langsung. Tulis Markdown dan lihat output yang dirender.' },
  th: { title: 'ตัวอย่าง Markdown - ตัวแก้ไข Markdown ออนไลน์', description: 'ตัวแก้ไข Markdown ออนไลน์ฟรีพร้อมตัวอย่างสด เขียน Markdown และดูผลลัพธ์ที่เรนเดอร์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/markdown-preview`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/markdown-preview`])), 'x-default': `https://viadreams.cc/en/tools/markdown-preview` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
