import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Text Diff Checker - Compare Two Texts Online', description: 'Compare two texts and highlight differences line by line. Free online text diff checker with added, removed, and unchanged line counts.' },
  zh: { title: '文本差异对比 - 在线比较两段文本', description: '逐行比较两段文本并高亮差异。免费在线文本差异检查工具。' },
  ja: { title: 'テキスト差分チェッカー - 2つのテキストを比較', description: '2つのテキストを行ごとに比較し差分をハイライト表示。無料オンラインツール。' },
  ko: { title: '텍스트 비교 도구 - 두 텍스트 온라인 비교', description: '두 텍스트를 줄 단위로 비교하고 차이점을 강조 표시합니다.' },
  fr: { title: 'Comparateur de Texte - Comparer Deux Textes', description: 'Comparez deux textes et mettez en evidence les differences ligne par ligne.' },
  de: { title: 'Text-Diff-Checker - Zwei Texte Vergleichen', description: 'Vergleichen Sie zwei Texte und heben Sie Unterschiede zeilenweise hervor.' },
  es: { title: 'Comparador de Texto - Comparar Dos Textos', description: 'Compare dos textos y resalte las diferencias linea por linea.' },
  pt: { title: 'Comparador de Texto - Comparar Dois Textos', description: 'Compare dois textos e destaque as diferencas linha por linha.' },
  it: { title: 'Confronto Testo - Confronta Due Testi', description: 'Confronta due testi e evidenzia le differenze riga per riga.' },
  nl: { title: 'Tekst Diff Checker - Twee Teksten Vergelijken', description: 'Vergelijk twee teksten en markeer de verschillen regel voor regel.' },
  pl: { title: 'Porownywarke Tekstow - Porownaj Dwa Teksty', description: 'Porownaj dwa teksty i podswietl roznice linia po linii.' },
  sv: { title: 'Text-Diff-Kontroll - Jaemfoer Tvaa Texter', description: 'Jaemfoer tvaa texter och markera skillnader rad foer rad.' },
  no: { title: 'Tekst-Diff-Sjekker - Sammenlign To Tekster', description: 'Sammenlign to tekster og fremhev forskjeller linje for linje.' },
  id: { title: 'Text Diff Checker - Bandingkan Dua Teks', description: 'Bandingkan dua teks dan sorot perbedaan baris per baris.' },
  th: { title: 'ตรวจสอบความแตกต่างข้อความ - เปรียบเทียบสองข้อความ', description: 'เปรียบเทียบสองข้อความและไฮไลท์ความแตกต่างทีละบรรทัด' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/text-diff-checker`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/text-diff-checker`])), 'x-default': `https://viadreams.cc/en/tools/text-diff-checker` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
