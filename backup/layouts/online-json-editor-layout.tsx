import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Online JSON Editor - Edit JSON Data Free', description: 'Free online JSON editor with tree view and raw editor modes. Edit, format, validate, and manipulate JSON data visually with an interactive tree editor.' },
  fr: { title: 'Editeur JSON en Ligne Gratuit - Modifier JSON', description: 'Editeur JSON gratuit en ligne avec vue arborescente et editeur brut. Modifiez, formatez et validez les donnees JSON visuellement.' },
  de: { title: 'Online JSON Editor - JSON Daten Bearbeiten Kostenlos', description: 'Kostenloser Online JSON Editor mit Baumansicht und Roh-Editor. JSON-Daten visuell bearbeiten, formatieren und validieren.' },
  it: { title: 'Editor JSON Online Gratis - Modifica Dati JSON', description: 'Editor JSON online gratuito con vista ad albero ed editor grezzo. Modifica, formatta e valida dati JSON visivamente.' },
  es: { title: 'Editor JSON en Linea Gratis - Editar Datos JSON', description: 'Editor JSON gratuito en linea con vista de arbol y editor sin formato. Edita, formatea y valida datos JSON visualmente.' },
  pt: { title: 'Editor JSON Online Gratis - Editar Dados JSON', description: 'Editor JSON online gratuito com vista em arvore e editor bruto. Edite, formate e valide dados JSON visualmente.' },
  nl: { title: 'Online JSON Editor Gratis - JSON Data Bewerken', description: 'Gratis online JSON editor met boomweergave en ruwe editor. Bewerk, formatteer en valideer JSON-gegevens visueel.' },
  pl: { title: 'Edytor JSON Online Za Darmo - Edytuj Dane JSON', description: 'Darmowy edytor JSON online z widokiem drzewa i edytorem surowym. Edytuj, formatuj i waliduj dane JSON wizualnie.' },
  sv: { title: 'Online JSON Redigerare Gratis - Redigera JSON Data', description: 'Gratis online JSON redigerare med tradvy och radredigerare. Redigera, formatera och validera JSON-data visuellt.' },
  no: { title: 'Online JSON Redigeringsverktoy Gratis - Rediger JSON', description: 'Gratis online JSON redigeringsverktoy med trevisning og radredigerer. Rediger, formater og valider JSON-data visuelt.' },
  zh: { title: '在线 JSON 编辑器 - 免费编辑 JSON 数据', description: '免费在线 JSON 编辑器，支持树形视图和原始编辑器模式。可视化编辑、格式化和验证 JSON 数据。' },
  ja: { title: 'オンライン JSON エディター - 無料 JSON データ編集', description: '無料オンライン JSON エディター。ツリービューとテキストエディターモード。JSON データの視覚的な編集、フォーマット、検証。' },
  ko: { title: '온라인 JSON 편집기 - 무료 JSON 데이터 편집', description: '무료 온라인 JSON 편집기. 트리 뷰와 텍스트 편집기 모드. JSON 데이터를 시각적으로 편집, 포맷, 검증.' },
  id: { title: 'Editor JSON Online Gratis - Edit Data JSON', description: 'Editor JSON online gratis dengan tampilan pohon dan editor mentah. Edit, format, dan validasi data JSON secara visual.' },
  th: { title: 'ตัวแก้ไข JSON ออนไลน์ฟรี - แก้ไขข้อมูล JSON', description: 'ตัวแก้ไข JSON ออนไลน์ฟรีพร้อมมุมมองต้นไม้และตัวแก้ไขดิบ แก้ไข จัดรูปแบบ และตรวจสอบข้อมูล JSON' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/online-json-editor`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/online-json-editor`])), 'x-default': `https://viadreams.cc/en/tools/online-json-editor` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
