import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'DNS Record Checker - Lookup A, AAAA, CNAME, MX, TXT, NS Records Free', description: 'Free online DNS record checker. Look up A, AAAA, CNAME, MX, TXT, and NS records for any domain. Fast, private DNS lookup using DNS-over-HTTPS.' },
  fr: { title: 'Verificateur DNS - Rechercher A, AAAA, CNAME, MX, TXT, NS Gratuit', description: 'Verificateur d\'enregistrements DNS gratuit en ligne. Recherchez les enregistrements A, AAAA, CNAME, MX, TXT et NS pour tout domaine.' },
  de: { title: 'DNS-Eintrag Pruefer - A, AAAA, CNAME, MX, TXT, NS Nachschlagen Kostenlos', description: 'Kostenloser Online DNS-Eintrag Pruefer. Schlagen Sie A, AAAA, CNAME, MX, TXT und NS Eintraege fuer jede Domain nach.' },
  it: { title: 'Verificatore Record DNS - Cerca A, AAAA, CNAME, MX, TXT, NS Gratis', description: 'Verificatore record DNS gratuito online. Cerca record A, AAAA, CNAME, MX, TXT e NS per qualsiasi dominio.' },
  es: { title: 'Verificador DNS - Buscar A, AAAA, CNAME, MX, TXT, NS Gratis', description: 'Verificador de registros DNS gratuito en linea. Busque registros A, AAAA, CNAME, MX, TXT y NS para cualquier dominio.' },
  pt: { title: 'Verificador DNS - Consultar A, AAAA, CNAME, MX, TXT, NS Gratis', description: 'Verificador de registros DNS gratuito online. Consulte registros A, AAAA, CNAME, MX, TXT e NS para qualquer dominio.' },
  nl: { title: 'DNS Record Checker - A, AAAA, CNAME, MX, TXT, NS Opzoeken Gratis', description: 'Gratis online DNS record checker. Zoek A, AAAA, CNAME, MX, TXT en NS records op voor elk domein.' },
  pl: { title: 'Sprawdzanie DNS - Wyszukaj A, AAAA, CNAME, MX, TXT, NS Za Darmo', description: 'Darmowe sprawdzanie rekordow DNS online. Wyszukaj rekordy A, AAAA, CNAME, MX, TXT i NS dla dowolnej domeny.' },
  sv: { title: 'DNS-postkontroll - Slaa upp A, AAAA, CNAME, MX, TXT, NS Gratis', description: 'Gratis online DNS-postkontroll. Slaa upp A, AAAA, CNAME, MX, TXT och NS poster foer alla domaner.' },
  no: { title: 'DNS-postkontroll - Slaa opp A, AAAA, CNAME, MX, TXT, NS Gratis', description: 'Gratis online DNS-postkontroll. Slaa opp A, AAAA, CNAME, MX, TXT og NS poster for alle domener.' },
  zh: { title: 'DNS 记录查询工具 - 免费查询 A, AAAA, CNAME, MX, TXT, NS 记录', description: '免费在线 DNS 记录查询工具。查询任意域名的 A、AAAA、CNAME、MX、TXT 和 NS 记录。使用 DNS-over-HTTPS 快速私密查询。' },
  ja: { title: 'DNS レコードチェッカー - A, AAAA, CNAME, MX, TXT, NS 無料検索', description: '無料オンラインDNSレコードチェッカー。任意のドメインのA、AAAA、CNAME、MX、TXT、NSレコードを検索。' },
  ko: { title: 'DNS 레코드 검사기 - A, AAAA, CNAME, MX, TXT, NS 무료 조회', description: '무료 온라인 DNS 레코드 검사기. 모든 도메인의 A, AAAA, CNAME, MX, TXT, NS 레코드를 조회합니다.' },
  id: { title: 'Pemeriksa DNS - Cari A, AAAA, CNAME, MX, TXT, NS Gratis', description: 'Pemeriksa rekaman DNS gratis online. Cari rekaman A, AAAA, CNAME, MX, TXT dan NS untuk domain apa pun.' },
  th: { title: 'ตรวจสอบระเบียน DNS - ค้นหา A, AAAA, CNAME, MX, TXT, NS ฟรี', description: 'ตรวจสอบระเบียน DNS ออนไลน์ฟรี ค้นหาระเบียน A, AAAA, CNAME, MX, TXT และ NS สำหรับโดเมนใดก็ได้' },
};

const slug = 'dns-record-checker';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['dns lookup', 'dns checker', 'dns record', 'a record', 'mx record', 'txt record', 'ns record', 'cname lookup', 'dns query'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
