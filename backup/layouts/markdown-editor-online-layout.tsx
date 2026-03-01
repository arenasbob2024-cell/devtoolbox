import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Online Markdown Editor - Live Preview & Export HTML Free', description: 'Free online Markdown editor with real-time live preview. Split pane editing, export to HTML, word count. Write Markdown for README, docs, and blog posts.' },
  fr: { title: 'Editeur Markdown en Ligne - Apercu en Direct et Export HTML Gratuit', description: 'Editeur Markdown en ligne gratuit avec apercu en temps reel. Panneau divise, export HTML, compteur de mots. Ecrivez Markdown pour README et articles.' },
  de: { title: 'Online Markdown Editor - Live Vorschau & HTML Export Kostenlos', description: 'Kostenloser Online Markdown Editor mit Echtzeit-Vorschau. Geteilte Ansicht, HTML-Export, Wortzaehler. Schreiben Sie Markdown fuer README und Dokumentation.' },
  it: { title: 'Editor Markdown Online - Anteprima Live ed Esportazione HTML Gratis', description: 'Editor Markdown online gratuito con anteprima in tempo reale. Pannello diviso, esportazione HTML, contatore parole. Scrivi Markdown per README e documentazione.' },
  es: { title: 'Editor Markdown en Linea - Vista Previa en Vivo y Exportar HTML Gratis', description: 'Editor Markdown en linea gratuito con vista previa en tiempo real. Panel dividido, exportar HTML, contador de palabras. Escribe Markdown para README y documentacion.' },
  pt: { title: 'Editor Markdown Online - Visualizacao ao Vivo e Exportar HTML Gratis', description: 'Editor Markdown online gratuito com visualizacao em tempo real. Painel dividido, exportar HTML, contador de palavras. Escreva Markdown para README e documentacao.' },
  nl: { title: 'Online Markdown Editor - Live Voorbeeld & HTML Export Gratis', description: 'Gratis online Markdown editor met realtime voorbeeld. Gesplitst paneel, HTML export, woordteller. Schrijf Markdown voor README en documentatie.' },
  pl: { title: 'Edytor Markdown Online - Podglad na Zywo i Eksport HTML Za Darmo', description: 'Darmowy edytor Markdown online z podgladem w czasie rzeczywistym. Podzielony panel, eksport HTML, licznik slow. Pisz Markdown dla README i dokumentacji.' },
  sv: { title: 'Markdown-redigerare Online - Live Forhandsvisning & HTML-export Gratis', description: 'Gratis online Markdown-redigerare med realtidsforhandsvisning. Delad vy, HTML-export, ordraknare. Skriv Markdown for README och dokumentation.' },
  no: { title: 'Markdown-redigerer Online - Direkte Forhandsvisning og HTML-eksport Gratis', description: 'Gratis online Markdown-redigerer med sanntidsforhandsvisning. Delt panel, HTML-eksport, ordteller. Skriv Markdown for README og dokumentasjon.' },
  zh: { title: '在线 Markdown 编辑器 - 实时预览和导出 HTML 免费工具', description: '免费在线 Markdown 编辑器，支持实时预览。分栏编辑、导出 HTML、字数统计。适合编写 README、文档和博客文章。' },
  ja: { title: 'オンライン Markdown エディタ - ライブプレビュー & HTML エクスポート無料', description: '無料オンライン Markdown エディタ。リアルタイムプレビュー付き。分割ペイン、HTML エクスポート、ワードカウント。README やドキュメント作成に最適。' },
  ko: { title: '온라인 Markdown 에디터 - 실시간 미리보기 & HTML 내보내기 무료', description: '무료 온라인 Markdown 에디터. 실시간 미리보기 지원. 분할 창, HTML 내보내기, 단어 수 카운터. README 및 문서 작성에 최적.' },
  id: { title: 'Editor Markdown Online - Pratinjau Langsung & Ekspor HTML Gratis', description: 'Editor Markdown online gratis dengan pratinjau waktu nyata. Panel terpisah, ekspor HTML, penghitung kata. Tulis Markdown untuk README dan dokumentasi.' },
  th: { title: 'Markdown Editor ออนไลน์ - ตัวอย่างสดและส่งออก HTML ฟรี', description: 'เครื่องมือแก้ไข Markdown ออนไลน์ฟรีพร้อมตัวอย่างแบบเรียลไทม์ แบ่งหน้าจอ ส่งออก HTML นับจำนวนคำ เขียน Markdown สำหรับ README และเอกสาร' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/markdown-editor-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/markdown-editor-online`])), 'x-default': `https://viadreams.cc/en/tools/markdown-editor-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
