import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'String Utilities - Online String Manipulation Tools Free', description: 'String manipulation tools: trim, reverse, capitalize, count words/chars/lines, remove duplicates, find/replace, and more. Free online string utilities.' },
  fr: { title: 'Utilitaires de Chaines - Outils de Manipulation de Texte en Ligne', description: 'Outils de manipulation de chaines: couper, inverser, capitaliser, compter mots/caracteres/lignes.' },
  de: { title: 'Zeichenketten-Dienstprogramme - Online Textmanipulations-Tools', description: 'Textmanipulations-Tools: Kuerzen, Umkehren, Grossschreiben, Woerter/Zeichen/Zeilen zaehlen.' },
  it: { title: 'Utilita Stringhe - Strumenti di Manipolazione Testo Online', description: 'Strumenti di manipolazione testo: taglia, inverti, capitalizza, conta parole/caratteri/righe.' },
  es: { title: 'Utilidades de Cadenas - Herramientas de Manipulacion de Texto en Linea', description: 'Herramientas de manipulacion de texto: recortar, invertir, capitalizar, contar palabras/caracteres/lineas.' },
  pt: { title: 'Utilitarios de String - Ferramentas de Manipulacao de Texto Online', description: 'Ferramentas de manipulacao de texto: cortar, reverter, capitalizar, contar palavras/caracteres/linhas.' },
  nl: { title: 'String Hulpmiddelen - Online Tekstmanipulatie Tools', description: 'Tekstmanipulatie tools: trimmen, omdraaien, hoofdletters, woorden/tekens/regels tellen.' },
  pl: { title: 'Narzedzia do Ciagow - Narzedzia do Manipulacji Tekstem Online', description: 'Narzedzia do manipulacji tekstem: przycinanie, odwracanie, wielkie litery, liczenie slow/znakow.' },
  sv: { title: 'Strangverktyg - Online Textmanipuleringsverktyg', description: 'Textmanipuleringsverktyg: trimma, vanda, kapitalisera, rakna ord/tecken/rader.' },
  no: { title: 'Strengverktoy - Online Tekstmanipuleringsverktoy', description: 'Tekstmanipuleringsverktoy: klippe, snu, kapitalisere, telle ord/tegn/linjer.' },
  zh: { title: '字符串工具 - 在线文本处理工具', description: '字符串处理工具：修剪、反转、大写、统计词数/字符/行数、删除重复、查找替换等。' },
  ja: { title: '文字列ユーティリティ - オンラインテキスト操作ツール', description: '文字列操作ツール：トリム、逆順、大文字化、単語/文字/行数のカウント、検索/置換。' },
  ko: { title: '문자열 유틸리티 - 온라인 문자열 조작 도구', description: '문자열 조작 도구: 자르기, 뒤집기, 대문자화, 단어/문자/줄 수 세기, 찾기/바꾸기.' },
  id: { title: 'Utilitas String - Alat Manipulasi Teks Online', description: 'Alat manipulasi teks: potong, balik, kapitalisasi, hitung kata/karakter/baris.' },
  th: { title: 'ยูทิลิตี้สตริง - เครื่องมือจัดการข้อความออนไลน์', description: 'เครื่องมือจัดการข้อความ: ตัด พลิก ทำตัวพิมพ์ใหญ่ นับคำ/อักขระ/บรรทัด' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/string-utilities`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/string-utilities`])), 'x-default': `https://viadreams.cc/en/tools/string-utilities` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
