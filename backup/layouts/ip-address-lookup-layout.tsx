import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'IP Address Lookup Tool - Find IP Geolocation Free', description: 'Look up any IP address to find geolocation, ISP, timezone, and more. Automatically detects your current IP. Free online IP lookup tool.' },
  fr: { title: 'Outil de Recherche d\'Adresse IP Gratuit', description: 'Recherchez n\'importe quelle adresse IP pour trouver la geolocalisation, le FAI et le fuseau horaire. Detecte automatiquement votre IP.' },
  de: { title: 'IP-Adresse Nachschlagen Kostenlos', description: 'Jede IP-Adresse nachschlagen um Geolokalisierung, ISP und Zeitzone zu finden. Erkennt automatisch Ihre aktuelle IP.' },
  it: { title: 'Ricerca Indirizzo IP Online Gratis', description: 'Cerca qualsiasi indirizzo IP per trovare geolocalizzazione, ISP e fuso orario. Rileva automaticamente il tuo IP attuale.' },
  es: { title: 'Herramienta de Busqueda de IP Gratis', description: 'Busque cualquier direccion IP para encontrar geolocalizacion, ISP y zona horaria. Detecta automaticamente su IP actual.' },
  pt: { title: 'Ferramenta de Consulta de IP Gratis', description: 'Consulte qualquer endereco IP para encontrar geolocalizacao, ISP e fuso horario. Detecta automaticamente seu IP atual.' },
  nl: { title: 'IP-Adres Opzoeken Gratis', description: 'Zoek elk IP-adres op voor geolocatie, ISP en tijdzone. Detecteert automatisch uw huidige IP.' },
  pl: { title: 'Wyszukiwanie Adresu IP Za Darmo', description: 'Wyszukaj dowolny adres IP aby znalezc geolokalizacje, ISP i strefe czasowa. Automatycznie wykrywa Twoj aktualny IP.' },
  sv: { title: 'IP-Adress Sokning Online Gratis', description: 'Slaa upp vilken IP-adress som helst foer att hitta geolokalisering, ISP och tidszon. Detekterar automatiskt din nuvarande IP.' },
  no: { title: 'IP-Adresse Oppslag Online Gratis', description: 'Slaa opp enhver IP-adresse for aa finne geolokalisering, ISP og tidssone. Oppdager automatisk din naavaaerende IP.' },
  zh: { title: 'IP 地址查询工具 - 免费查找 IP 地理位置', description: '查询任何 IP 地址的地理位置、ISP、时区等信息。自动检测您的当前 IP 地址。免费在线 IP 查询工具。' },
  ja: { title: 'IP アドレス検索ツール - 無料で IP 地理位置を確認', description: 'IP アドレスの地理位置、ISP、タイムゾーンなどを検索。現在の IP を自動検出。無料オンラインツール。' },
  ko: { title: 'IP 주소 조회 도구 - 무료 IP 지리적 위치 확인', description: 'IP 주소의 지리적 위치, ISP, 시간대 등을 조회합니다. 현재 IP를 자동 감지합니다.' },
  id: { title: 'Alat Pencarian Alamat IP Gratis', description: 'Cari alamat IP apa pun untuk menemukan geolokasi, ISP, dan zona waktu. Mendeteksi IP Anda saat ini secara otomatis.' },
  th: { title: 'เครื่องมือค้นหาที่อยู่ IP ออนไลน์ฟรี', description: 'ค้นหาที่อยู่ IP เพื่อดูตำแหน่งทางภูมิศาสตร์ ISP เขตเวลา และอื่นๆ ตรวจจับ IP ปัจจุบันของคุณอัตโนมัติ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/ip-address-lookup`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/ip-address-lookup`])), 'x-default': `https://viadreams.cc/en/tools/ip-address-lookup` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
