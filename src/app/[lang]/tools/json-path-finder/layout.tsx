import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Path Finder - Find JSONPath Online Free', description: 'Free online JSON Path Finder. Paste JSON, click any node in the interactive tree to get its full JSONPath expression. Copy paths like $.store.books[0].title instantly.' },
  fr: { title: 'Chercheur de Chemin JSON - JSONPath en Ligne Gratuit', description: 'Trouvez le chemin JSONPath de n\'importe quel noeud dans votre JSON avec un arbre interactif.' },
  de: { title: 'JSON-Pfad-Finder - JSONPath Online Kostenlos', description: 'Finden Sie den JSONPath fuer jeden Knoten in Ihrem JSON mit interaktivem Baum.' },
  it: { title: 'Trova Percorso JSON - JSONPath Online Gratis', description: 'Trova il percorso JSONPath per qualsiasi nodo nel tuo JSON con albero interattivo.' },
  es: { title: 'Buscador de Rutas JSON - JSONPath Online Gratis', description: 'Encuentra la ruta JSONPath de cualquier nodo en tu JSON con arbol interactivo.' },
  pt: { title: 'Buscador de Caminho JSON - JSONPath Online Gratis', description: 'Encontre o caminho JSONPath de qualquer no no seu JSON com arvore interativa.' },
  nl: { title: 'JSON Pad Finder - JSONPath Online Gratis', description: 'Vind het JSONPath voor elk knooppunt in uw JSON met interactieve boom.' },
  pl: { title: 'JSON Path Finder - JSONPath Online Za Darmo', description: 'Znajdz sciezke JSONPath dla kazdego wezla w JSON z interaktywnym drzewem.' },
  sv: { title: 'JSON-sokvagsfinnare - JSONPath Online Gratis', description: 'Hitta JSONPath for varje nod i din JSON med interaktivt trad.' },
  no: { title: 'JSON Sti Finner - JSONPath Online Gratis', description: 'Finn JSONPath for enhver node i din JSON med interaktivt tre.' },
  zh: { title: 'JSON 路径查找器 - 在线免费查找 JSONPath', description: '免费在线 JSON 路径查找器。粘贴 JSON，点击交互式树中的任何节点获取完整 JSONPath 表达式。' },
  ja: { title: 'JSONパスファインダー - JSONPath 無料オンラインツール', description: '無料オンラインJSONパスファインダー。JSONを貼り付け、インタラクティブツリーのノードをクリックしてJSONPathを取得。' },
  ko: { title: 'JSON 경로 찾기 - JSONPath 무료 온라인 도구', description: '무료 온라인 JSON 경로 찾기. JSON을 붙여넣고 트리의 노드를 클릭하여 JSONPath를 가져옵니다.' },
  id: { title: 'JSON Path Finder - JSONPath Online Gratis', description: 'Temukan JSONPath untuk setiap node dalam JSON Anda dengan pohon interaktif.' },
  th: { title: 'JSON Path Finder - ค้นหา JSONPath ออนไลน์ฟรี', description: 'ค้นหา JSONPath สำหรับทุกโหนดใน JSON ของคุณด้วยทรีแบบอินเทอร์แอคทีฟ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-path-finder`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-path-finder`])), 'x-default': `https://viadreams.cc/en/tools/json-path-finder` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
