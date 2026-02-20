import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Regex Matcher - Find All Matches & Capture Groups Online', description: 'Find all regex matches in text with capture groups, named groups, and match positions. Free online regex matcher with detailed match table.' },
  fr: { title: 'Regex Matcher - Trouver Toutes les Correspondances et Groupes de Capture', description: 'Trouvez toutes les correspondances regex dans le texte avec groupes de capture, groupes nommes et positions. Matcher regex gratuit en ligne.' },
  de: { title: 'Regex Matcher - Alle Treffer und Capture Groups Finden', description: 'Finden Sie alle Regex-Treffer im Text mit Capture Groups, benannten Gruppen und Positionen. Kostenloser Online Regex-Matcher.' },
  it: { title: 'Regex Matcher - Trova Tutte le Corrispondenze e Gruppi di Cattura', description: 'Trova tutte le corrispondenze regex nel testo con gruppi di cattura, gruppi nominati e posizioni. Matcher regex online gratuito.' },
  es: { title: 'Regex Matcher - Encontrar Todas las Coincidencias y Grupos de Captura', description: 'Encuentra todas las coincidencias regex en texto con grupos de captura, grupos nombrados y posiciones. Matcher regex online gratuito.' },
  pt: { title: 'Regex Matcher - Encontrar Todas as Correspondencias e Grupos de Captura', description: 'Encontre todas as correspondencias regex no texto com grupos de captura, grupos nomeados e posicoes. Matcher regex online gratuito.' },
  nl: { title: 'Regex Matcher - Vind Alle Overeenkomsten en Capture Groups', description: 'Vind alle regex-overeenkomsten in tekst met capture groups, benoemde groepen en posities. Gratis online regex matcher.' },
  pl: { title: 'Regex Matcher - Znajdz Wszystkie Dopasowania i Grupy Przechwytywania', description: 'Znajdz wszystkie dopasowania regex w tekscie z grupami przechwytywania, grupami nazwanymi i pozycjami. Darmowy matcher regex online.' },
  sv: { title: 'Regex Matcher - Hitta Alla Matchningar och Capture Groups', description: 'Hitta alla regex-matchningar i text med capture groups, namngivna grupper och positioner. Gratis online regex-matcher.' },
  no: { title: 'Regex Matcher - Finn Alle Treff og Capture Groups', description: 'Finn alle regex-treff i tekst med capture groups, navngitte grupper og posisjoner. Gratis online regex-matcher.' },
  zh: { title: '正则匹配器 - 在线查找所有匹配和捕获组', description: '在文本中查找所有正则匹配，包含捕获组、命名组和匹配位置。免费在线正则匹配器，提供详细匹配表格。' },
  ja: { title: '正規表現マッチャー - 全マッチとキャプチャグループの検索', description: 'テキスト内の全正規表現マッチをキャプチャグループ、名前付きグループ、位置情報と共に検索。無料オンライン正規表現マッチャー。' },
  ko: { title: '정규식 매처 - 모든 매칭 및 캡처 그룹 찾기', description: '텍스트에서 캡처 그룹, 명명된 그룹, 매칭 위치와 함께 모든 정규식 매칭을 찾습니다. 무료 온라인 정규식 매처.' },
  id: { title: 'Regex Matcher - Temukan Semua Kecocokan dan Capture Group', description: 'Temukan semua kecocokan regex dalam teks dengan capture group, named group, dan posisi. Matcher regex online gratis.' },
  th: { title: 'Regex Matcher - ค้นหาผลลัพธ์และ Capture Groups ทั้งหมด', description: 'ค้นหาผลลัพธ์ regex ทั้งหมดในข้อความพร้อม capture groups, named groups และตำแหน่ง เครื่องมือ regex matcher ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/regex-matcher`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/regex-matcher`])
        ),
        'x-default': `https://viadreams.cc/en/tools/regex-matcher`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
