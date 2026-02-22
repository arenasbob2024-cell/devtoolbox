import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'DNS Lookup Tool - Query DNS Records Online Free', description: 'Perform DNS lookups to find A, AAAA, CNAME, MX, NS, TXT, and SOA records for any domain. Free online DNS query tool for developers.' },
  fr: { title: 'Outil de Recherche DNS - Requete DNS en Ligne Gratuit', description: 'Effectuez des recherches DNS pour trouver les enregistrements A, AAAA, CNAME, MX, NS, TXT et SOA pour tout domaine.' },
  de: { title: 'DNS-Lookup Tool - DNS-Abfrage Online Kostenlos', description: 'DNS-Abfragen durchfuehren fuer A, AAAA, CNAME, MX, NS, TXT und SOA-Eintraege jeder Domain.' },
  it: { title: 'Strumento di Ricerca DNS Online Gratis', description: 'Esegui ricerche DNS per trovare record A, AAAA, CNAME, MX, NS, TXT e SOA per qualsiasi dominio.' },
  es: { title: 'Herramienta de Busqueda DNS Online Gratis', description: 'Realice busquedas DNS para encontrar registros A, AAAA, CNAME, MX, NS, TXT y SOA de cualquier dominio.' },
  pt: { title: 'Ferramenta de Consulta DNS Online Gratis', description: 'Realize consultas DNS para encontrar registros A, AAAA, CNAME, MX, NS, TXT e SOA para qualquer dominio.' },
  nl: { title: 'DNS Lookup Tool - DNS Query Online Gratis', description: 'Voer DNS-lookups uit om A, AAAA, CNAME, MX, NS, TXT en SOA-records te vinden voor elk domein.' },
  pl: { title: 'Narzedzie Wyszukiwania DNS Online Za Darmo', description: 'Wykonuj wyszukiwania DNS aby znalezc rekordy A, AAAA, CNAME, MX, NS, TXT i SOA dla dowolnej domeny.' },
  sv: { title: 'DNS Lookup Verktyg - DNS-Fraaga Online Gratis', description: 'Utfoer DNS-uppslag foer att hitta A, AAAA, CNAME, MX, NS, TXT och SOA-poster foer alla domaner.' },
  no: { title: 'DNS Oppslag Verktoy - DNS-Sporrring Online Gratis', description: 'Utfoer DNS-oppslag for aa finne A, AAAA, CNAME, MX, NS, TXT og SOA-poster for alle domener.' },
  zh: { title: 'DNS 查询工具 - 免费在线查询 DNS 记录', description: '查询任何域名的 A、AAAA、CNAME、MX、NS、TXT 和 SOA 记录。免费在线 DNS 查询工具。' },
  ja: { title: 'DNS ルックアップツール - 無料オンライン DNS クエリ', description: '任意のドメインの A、AAAA、CNAME、MX、NS、TXT、SOA レコードを検索。無料オンラインツール。' },
  ko: { title: 'DNS 조회 도구 - 무료 온라인 DNS 레코드 검색', description: '모든 도메인의 A, AAAA, CNAME, MX, NS, TXT, SOA 레코드를 조회합니다. 무료 온라인 DNS 도구.' },
  id: { title: 'Alat Pencarian DNS Online Gratis', description: 'Lakukan pencarian DNS untuk menemukan record A, AAAA, CNAME, MX, NS, TXT, dan SOA untuk domain apa pun.' },
  th: { title: 'เครื่องมือค้นหา DNS ออนไลน์ฟรี', description: 'ค้นหา DNS เพื่อดู record A, AAAA, CNAME, MX, NS, TXT และ SOA สำหรับโดเมนใดก็ได้' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/dns-lookup-tool`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/dns-lookup-tool`])), 'x-default': `https://viadreams.cc/en/tools/dns-lookup-tool` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
