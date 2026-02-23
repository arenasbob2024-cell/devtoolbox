import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'IP Subnet Calculator - CIDR Network Calculator Online Free', description: 'Calculate IP subnet details: network address, broadcast address, usable IP range, subnet mask, CIDR notation, and number of hosts. Free online IP subnet calculator.' },
  fr: { title: 'Calculateur de Sous-reseau IP - Calculateur CIDR en Ligne', description: 'Calculez les details du sous-reseau IP: adresse reseau, broadcast, plage d\'adresses utiles et notation CIDR.' },
  de: { title: 'IP Subnetz-Rechner - CIDR Netzwerk-Rechner Online', description: 'Berechnen Sie IP-Subnetz-Details: Netzwerkadresse, Broadcast, nutzbare IPs und CIDR-Notation.' },
  it: { title: 'Calcolatore di Sottorete IP - Calcolatore CIDR Online', description: 'Calcola i dettagli della sottorete IP: indirizzo di rete, broadcast, intervallo IP utilizzabile e notazione CIDR.' },
  es: { title: 'Calculadora de Subred IP - Calculadora CIDR en Linea', description: 'Calcula detalles de subred IP: direccion de red, broadcast, rango de IP utilizable y notacion CIDR.' },
  pt: { title: 'Calculadora de Sub-rede IP - Calculadora CIDR Online', description: 'Calcule detalhes de sub-rede IP: endereco de rede, broadcast, intervalo de IP utilizavel e notacao CIDR.' },
  nl: { title: 'IP Subnetcalculator - CIDR Netwerkcalculator Online', description: 'Bereken IP-subnetdetails: netwerkadres, broadcast, bruikbaar IP-bereik en CIDR-notatie.' },
  pl: { title: 'Kalkulator Podsieci IP - Kalkulator CIDR Online', description: 'Oblicz szczegoly podsieci IP: adres sieciowy, broadcast, uzyteczny zakres IP i notacja CIDR.' },
  sv: { title: 'IP Underna\'t-kalkylator - CIDR Natkalkylator Online', description: 'Beraekna IP-undernaetsdetaljer: naetverksadress, broadcast, anvaendbart IP-intervall och CIDR-notation.' },
  no: { title: 'IP Subnett-kalkulator - CIDR Nettverkskalkulator Online', description: 'Beregn IP-subnettdetaljer: nettverksadresse, broadcast, brukbart IP-omraade og CIDR-notasjon.' },
  zh: { title: 'IP 子网计算器 - CIDR 网络计算器在线', description: '计算 IP 子网详细信息：网络地址、广播地址、可用 IP 范围、子网掩码、CIDR 表示法和主机数量。' },
  ja: { title: 'IP サブネット計算機 - CIDR ネットワーク計算機オンライン', description: 'IP サブネットの詳細を計算：ネットワークアドレス、ブロードキャスト、使用可能 IP 範囲、CIDR 表記。' },
  ko: { title: 'IP 서브넷 계산기 - CIDR 네트워크 계산기 온라인', description: 'IP 서브넷 세부 정보 계산: 네트워크 주소, 브로드캐스트, 사용 가능한 IP 범위, CIDR 표기법.' },
  id: { title: 'Kalkulator Subnet IP - Kalkulator Jaringan CIDR Online', description: 'Hitung detail subnet IP: alamat jaringan, broadcast, rentang IP yang dapat digunakan, dan notasi CIDR.' },
  th: { title: 'เครื่องคำนวณซับเน็ต IP - เครื่องคำนวณเครือข่าย CIDR ออนไลน์', description: 'คำนวณรายละเอียดซับเน็ต IP: ที่อยู่เครือข่าย บรอดแคสต์ ช่วง IP ที่ใช้ได้ และรูปแบบ CIDR' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/ip-subnet-calculator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/ip-subnet-calculator`])), 'x-default': `https://viadreams.cc/en/tools/ip-subnet-calculator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
