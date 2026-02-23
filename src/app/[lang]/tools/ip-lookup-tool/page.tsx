'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'IP Address Lookup',
    description: 'Look up geolocation, ISP, ASN, and details for any IP address or your own IP.',
    ipLabel: 'IP Address',
    ipPlaceholder: 'Enter IP address or leave blank for your IP',
    lookupBtn: 'Lookup IP',
    myIpBtn: 'My IP',
    clearBtn: 'Clear',
    loading: 'Looking up...',
    errorMsg: 'Failed to look up IP address. Please check the input.',
    ipField: 'IP Address',
    country: 'Country',
    region: 'Region',
    city: 'City',
    timezone: 'Timezone',
    isp: 'ISP',
    org: 'Organization',
    asn: 'ASN',
    lat: 'Latitude',
    lon: 'Longitude',
    postal: 'Postal Code',
    proxy: 'Proxy/VPN',
    hosting: 'Hosting',
    yes: 'Yes',
    no: 'No',
    noResult: 'Enter an IP address and click Lookup',
  },
  fr: { title: 'Recherche d\'adresse IP', description: 'Recherchez la géolocalisation et les détails d\'une adresse IP.', ipLabel: 'Adresse IP', ipPlaceholder: 'Entrez une adresse IP ou laissez vide pour votre IP', lookupBtn: 'Rechercher', myIpBtn: 'Mon IP', clearBtn: 'Effacer', loading: 'Recherche...', errorMsg: 'Impossible de rechercher l\'adresse IP.', ipField: 'Adresse IP', country: 'Pays', region: 'Région', city: 'Ville', timezone: 'Fuseau horaire', isp: 'FAI', org: 'Organisation', asn: 'ASN', lat: 'Latitude', lon: 'Longitude', postal: 'Code postal', proxy: 'Proxy/VPN', hosting: 'Hébergement', yes: 'Oui', no: 'Non', noResult: 'Entrez une adresse IP et cliquez sur Rechercher' },
  de: { title: 'IP-Adresse nachschlagen', description: 'Geolokalisierung und Details für eine IP-Adresse abrufen.', ipLabel: 'IP-Adresse', ipPlaceholder: 'IP-Adresse eingeben oder leer lassen für Ihre IP', lookupBtn: 'Nachschlagen', myIpBtn: 'Meine IP', clearBtn: 'Löschen', loading: 'Suche...', errorMsg: 'IP-Adresse konnte nicht abgerufen werden.', ipField: 'IP-Adresse', country: 'Land', region: 'Region', city: 'Stadt', timezone: 'Zeitzone', isp: 'ISP', org: 'Organisation', asn: 'ASN', lat: 'Breite', lon: 'Länge', postal: 'PLZ', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Ja', no: 'Nein', noResult: 'IP-Adresse eingeben und Nachschlagen klicken' },
  it: { title: 'Ricerca Indirizzo IP', description: 'Cerca geolocalizzazione e dettagli per qualsiasi indirizzo IP.', ipLabel: 'Indirizzo IP', ipPlaceholder: 'Inserisci un IP o lascia vuoto per il tuo IP', lookupBtn: 'Cerca', myIpBtn: 'Mio IP', clearBtn: 'Cancella', loading: 'Ricerca...', errorMsg: 'Impossibile cercare l\'indirizzo IP.', ipField: 'Indirizzo IP', country: 'Paese', region: 'Regione', city: 'Città', timezone: 'Fuso orario', isp: 'ISP', org: 'Organizzazione', asn: 'ASN', lat: 'Latitudine', lon: 'Longitudine', postal: 'CAP', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Sì', no: 'No', noResult: 'Inserisci un IP e clicca Cerca' },
  es: { title: 'Búsqueda de Dirección IP', description: 'Busca geolocalización y detalles de cualquier dirección IP.', ipLabel: 'Dirección IP', ipPlaceholder: 'Ingresa una IP o deja en blanco para tu IP', lookupBtn: 'Buscar', myIpBtn: 'Mi IP', clearBtn: 'Limpiar', loading: 'Buscando...', errorMsg: 'No se pudo buscar la dirección IP.', ipField: 'Dirección IP', country: 'País', region: 'Región', city: 'Ciudad', timezone: 'Zona horaria', isp: 'ISP', org: 'Organización', asn: 'ASN', lat: 'Latitud', lon: 'Longitud', postal: 'Código postal', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Sí', no: 'No', noResult: 'Ingresa una IP y haz clic en Buscar' },
  pt: { title: 'Pesquisa de Endereço IP', description: 'Pesquise geolocalização e detalhes de qualquer endereço IP.', ipLabel: 'Endereço IP', ipPlaceholder: 'Digite um IP ou deixe em branco para seu IP', lookupBtn: 'Pesquisar', myIpBtn: 'Meu IP', clearBtn: 'Limpar', loading: 'Pesquisando...', errorMsg: 'Não foi possível pesquisar o endereço IP.', ipField: 'Endereço IP', country: 'País', region: 'Região', city: 'Cidade', timezone: 'Fuso horário', isp: 'ISP', org: 'Organização', asn: 'ASN', lat: 'Latitude', lon: 'Longitude', postal: 'CEP', proxy: 'Proxy/VPN', hosting: 'Hospedagem', yes: 'Sim', no: 'Não', noResult: 'Digite um IP e clique em Pesquisar' },
  nl: { title: 'IP-adres Opzoeken', description: 'Zoek geolokalisatie en details op voor elk IP-adres.', ipLabel: 'IP-adres', ipPlaceholder: 'Voer IP in of laat leeg voor uw IP', lookupBtn: 'Opzoeken', myIpBtn: 'Mijn IP', clearBtn: 'Wissen', loading: 'Zoeken...', errorMsg: 'IP-adres kon niet worden opgezocht.', ipField: 'IP-adres', country: 'Land', region: 'Regio', city: 'Stad', timezone: 'Tijdzone', isp: 'ISP', org: 'Organisatie', asn: 'ASN', lat: 'Breedte', lon: 'Lengte', postal: 'Postcode', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Ja', no: 'Nee', noResult: 'Voer een IP in en klik op Opzoeken' },
  pl: { title: 'Wyszukiwanie adresu IP', description: 'Wyszukaj geolokalizację i szczegóły dowolnego adresu IP.', ipLabel: 'Adres IP', ipPlaceholder: 'Wpisz IP lub zostaw puste dla swojego IP', lookupBtn: 'Szukaj', myIpBtn: 'Moje IP', clearBtn: 'Wyczyść', loading: 'Szukanie...', errorMsg: 'Nie można wyszukać adresu IP.', ipField: 'Adres IP', country: 'Kraj', region: 'Region', city: 'Miasto', timezone: 'Strefa czasowa', isp: 'ISP', org: 'Organizacja', asn: 'ASN', lat: 'Szerokość', lon: 'Długość', postal: 'Kod pocztowy', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Tak', no: 'Nie', noResult: 'Wpisz IP i kliknij Szukaj' },
  sv: { title: 'IP-adress Sökning', description: 'Slå upp geolokalisering och detaljer för valfri IP-adress.', ipLabel: 'IP-adress', ipPlaceholder: 'Ange IP eller lämna tomt för din IP', lookupBtn: 'Sök', myIpBtn: 'Min IP', clearBtn: 'Rensa', loading: 'Söker...', errorMsg: 'Kunde inte slå upp IP-adressen.', ipField: 'IP-adress', country: 'Land', region: 'Region', city: 'Stad', timezone: 'Tidszon', isp: 'ISP', org: 'Organisation', asn: 'ASN', lat: 'Latitud', lon: 'Longitud', postal: 'Postnummer', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Ja', no: 'Nej', noResult: 'Ange en IP och klicka på Sök' },
  no: { title: 'IP-adresse Søk', description: 'Slå opp geolokalisering og detaljer for en IP-adresse.', ipLabel: 'IP-adresse', ipPlaceholder: 'Skriv inn IP eller la det stå tomt for din IP', lookupBtn: 'Søk', myIpBtn: 'Min IP', clearBtn: 'Tøm', loading: 'Søker...', errorMsg: 'Kunne ikke slå opp IP-adressen.', ipField: 'IP-adresse', country: 'Land', region: 'Region', city: 'By', timezone: 'Tidssone', isp: 'ISP', org: 'Organisasjon', asn: 'ASN', lat: 'Breddegrad', lon: 'Lengdegrad', postal: 'Postnummer', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Ja', no: 'Nei', noResult: 'Skriv inn en IP og klikk Søk' },
  zh: { title: 'IP 地址查询', description: '查询任何 IP 地址的地理位置、ISP、ASN 等信息。', ipLabel: 'IP 地址', ipPlaceholder: '输入 IP 地址，留空查询您的 IP', lookupBtn: '查询', myIpBtn: '我的 IP', clearBtn: '清除', loading: '查询中...', errorMsg: '无法查询 IP 地址，请检查输入。', ipField: 'IP 地址', country: '国家', region: '地区', city: '城市', timezone: '时区', isp: 'ISP', org: '组织', asn: 'ASN', lat: '纬度', lon: '经度', postal: '邮编', proxy: '代理/VPN', hosting: '托管', yes: '是', no: '否', noResult: '输入 IP 地址并点击查询' },
  ja: { title: 'IPアドレス検索', description: '任意のIPアドレスの地理情報、ISP、ASNを検索。', ipLabel: 'IPアドレス', ipPlaceholder: 'IPを入力、空白で自分のIPを確認', lookupBtn: '検索', myIpBtn: '自分のIP', clearBtn: 'クリア', loading: '検索中...', errorMsg: 'IPアドレスを検索できませんでした。', ipField: 'IPアドレス', country: '国', region: '地域', city: '都市', timezone: 'タイムゾーン', isp: 'ISP', org: '組織', asn: 'ASN', lat: '緯度', lon: '経度', postal: '郵便番号', proxy: 'プロキシ/VPN', hosting: 'ホスティング', yes: 'はい', no: 'いいえ', noResult: 'IPを入力して検索をクリック' },
  ko: { title: 'IP 주소 조회', description: '모든 IP 주소의 지리 정보, ISP, ASN 조회.', ipLabel: 'IP 주소', ipPlaceholder: 'IP 입력 또는 비워두면 내 IP 조회', lookupBtn: '조회', myIpBtn: '내 IP', clearBtn: '지우기', loading: '조회 중...', errorMsg: 'IP 주소를 조회할 수 없습니다.', ipField: 'IP 주소', country: '국가', region: '지역', city: '도시', timezone: '시간대', isp: 'ISP', org: '조직', asn: 'ASN', lat: '위도', lon: '경도', postal: '우편번호', proxy: '프록시/VPN', hosting: '호스팅', yes: '예', no: '아니오', noResult: 'IP를 입력하고 조회 클릭' },
  id: { title: 'Pencarian Alamat IP', description: 'Cari geolokasi, ISP, ASN untuk alamat IP apa pun.', ipLabel: 'Alamat IP', ipPlaceholder: 'Masukkan IP atau kosongkan untuk IP Anda', lookupBtn: 'Cari', myIpBtn: 'IP Saya', clearBtn: 'Hapus', loading: 'Mencari...', errorMsg: 'Gagal mencari alamat IP.', ipField: 'Alamat IP', country: 'Negara', region: 'Wilayah', city: 'Kota', timezone: 'Zona Waktu', isp: 'ISP', org: 'Organisasi', asn: 'ASN', lat: 'Lintang', lon: 'Bujur', postal: 'Kode Pos', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'Ya', no: 'Tidak', noResult: 'Masukkan IP dan klik Cari' },
  th: { title: 'ค้นหา IP Address', description: 'ค้นหาตำแหน่งทางภูมิศาสตร์, ISP, ASN ของ IP ใดก็ได้', ipLabel: 'IP Address', ipPlaceholder: 'ใส่ IP หรือเว้นว่างเพื่อค้นหา IP ของคุณ', lookupBtn: 'ค้นหา', myIpBtn: 'IP ของฉัน', clearBtn: 'ล้าง', loading: 'กำลังค้นหา...', errorMsg: 'ไม่สามารถค้นหา IP address ได้', ipField: 'IP Address', country: 'ประเทศ', region: 'ภูมิภาค', city: 'เมือง', timezone: 'เขตเวลา', isp: 'ISP', org: 'องค์กร', asn: 'ASN', lat: 'ละติจูด', lon: 'ลองจิจูด', postal: 'รหัสไปรษณีย์', proxy: 'Proxy/VPN', hosting: 'Hosting', yes: 'ใช่', no: 'ไม่', noResult: 'ใส่ IP แล้วคลิกค้นหา' },
};

interface IpInfo {
  ip: string;
  country_name?: string;
  region?: string;
  city?: string;
  timezone?: string;
  org?: string;
  asn?: string;
  latitude?: number;
  longitude?: number;
  postal?: string;
  hostname?: string;
}

export default function IpLookupTool() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IpInfo | null>(null);
  const [error, setError] = useState('');

  const lookupIp = async (targetIp?: string) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const query = targetIp ?? ip.trim();
      const url = query ? `https://ipapi.co/${query}/json/` : 'https://ipapi.co/json/';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      if (data.error) throw new Error(data.reason || 'Failed');
      setResult(data);
    } catch {
      setError(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-load current IP on mount
  }, []);

  const fields = result ? [
    { label: t.ipField, value: result.ip },
    { label: t.country, value: result.country_name },
    { label: t.region, value: result.region },
    { label: t.city, value: result.city },
    { label: t.timezone, value: result.timezone },
    { label: t.isp, value: result.org },
    { label: t.asn, value: result.asn },
    { label: t.lat, value: result.latitude?.toString() },
    { label: t.lon, value: result.longitude?.toString() },
    { label: t.postal, value: result.postal },
  ].filter(f => f.value) : [];

  const copyText = result ? fields.map(f => `${f.label}: ${f.value}`).join('\n') : '';

  return (
    <ToolLayout title={t.title} description={t.description} toolId="ip-lookup-tool">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={ip}
          onChange={e => setIp(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lookupIp()}
          placeholder={t.ipPlaceholder}
          style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', minWidth: 200 }}
        />
        <button onClick={() => lookupIp()} disabled={loading} className="btn btn-primary">
          {loading ? t.loading : t.lookupBtn}
        </button>
        <button onClick={() => { setIp(''); lookupIp(''); }} className="btn btn-secondary">{t.myIpBtn}</button>
        <button onClick={() => { setIp(''); setResult(null); setError(''); }} className="btn btn-secondary">{t.clearBtn}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {!result && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)', fontSize: 14 }}>
          {t.noResult}
        </div>
      )}

      {result && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{result.ip}</h3>
            <CopyButton text={copyText} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {fields.map((f, idx) => (
              <div key={idx} style={{ padding: '12px 14px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, wordBreak: 'break-word' }}>{f.value}</div>
              </div>
            ))}
          </div>
          {result.latitude && result.longitude && (
            <div style={{ marginTop: 16 }}>
              <a
                href={`https://www.openstreetmap.org/?mlat=${result.latitude}&mlon=${result.longitude}&zoom=10`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'inline-block', fontSize: 13 }}
              >
                View on Map →
              </a>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
