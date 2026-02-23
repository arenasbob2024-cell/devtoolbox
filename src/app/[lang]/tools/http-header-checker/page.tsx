'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTTP Header Checker',
    description: 'Check HTTP response headers for any URL. Inspect security headers, CORS, cache control, and more.',
    urlLabel: 'URL to Check',
    urlPlaceholder: 'https://example.com',
    checkBtn: 'Check Headers',
    clearBtn: 'Clear',
    loading: 'Fetching headers...',
    errorMsg: 'Failed to fetch headers. The URL may be unreachable or block CORS.',
    status: 'Status',
    headersLabel: 'Response Headers',
    headerName: 'Header',
    headerValue: 'Value',
    securityTitle: 'Security Analysis',
    present: 'Present',
    missing: 'Missing',
    noResults: 'Enter a URL and click Check Headers',
    copyAll: 'Copy All',
    note: 'Note: This tool uses a public CORS proxy. For sensitive URLs, check headers from your server directly.',
  },
  fr: {
    title: 'Vérificateur d\'en-têtes HTTP',
    description: 'Vérifiez les en-têtes de réponse HTTP pour n\'importe quelle URL.',
    urlLabel: 'URL à vérifier', urlPlaceholder: 'https://exemple.com',
    checkBtn: 'Vérifier', clearBtn: 'Effacer', loading: 'Chargement...',
    errorMsg: 'Impossible de récupérer les en-têtes.', status: 'Statut',
    headersLabel: 'En-têtes de réponse', headerName: 'En-tête', headerValue: 'Valeur',
    securityTitle: 'Analyse de sécurité', present: 'Présent', missing: 'Absent',
    noResults: 'Entrez une URL et cliquez sur Vérifier', copyAll: 'Tout copier',
    note: 'Note : Cet outil utilise un proxy CORS public.',
  },
  de: {
    title: 'HTTP Header Prüfer',
    description: 'HTTP-Antwort-Header für eine beliebige URL prüfen.',
    urlLabel: 'URL prüfen', urlPlaceholder: 'https://beispiel.de',
    checkBtn: 'Header prüfen', clearBtn: 'Löschen', loading: 'Lädt...',
    errorMsg: 'Header konnten nicht abgerufen werden.', status: 'Status',
    headersLabel: 'Antwort-Header', headerName: 'Header', headerValue: 'Wert',
    securityTitle: 'Sicherheitsanalyse', present: 'Vorhanden', missing: 'Fehlend',
    noResults: 'URL eingeben und Header prüfen', copyAll: 'Alles kopieren',
    note: 'Hinweis: Dieses Tool verwendet einen öffentlichen CORS-Proxy.',
  },
  it: { title: 'Controllo Header HTTP', description: 'Controlla gli header di risposta HTTP per qualsiasi URL.', urlLabel: 'URL', urlPlaceholder: 'https://esempio.it', checkBtn: 'Controlla', clearBtn: 'Cancella', loading: 'Caricamento...', errorMsg: 'Impossibile recuperare gli header.', status: 'Stato', headersLabel: 'Header di risposta', headerName: 'Header', headerValue: 'Valore', securityTitle: 'Analisi sicurezza', present: 'Presente', missing: 'Mancante', noResults: 'Inserisci URL e clicca Controlla', copyAll: 'Copia tutto', note: 'Nota: questo strumento usa un proxy CORS pubblico.' },
  es: { title: 'Verificador de Cabeceras HTTP', description: 'Verifica las cabeceras de respuesta HTTP de cualquier URL.', urlLabel: 'URL', urlPlaceholder: 'https://ejemplo.com', checkBtn: 'Verificar', clearBtn: 'Limpiar', loading: 'Cargando...', errorMsg: 'No se pudieron obtener las cabeceras.', status: 'Estado', headersLabel: 'Cabeceras de respuesta', headerName: 'Cabecera', headerValue: 'Valor', securityTitle: 'Análisis de seguridad', present: 'Presente', missing: 'Ausente', noResults: 'Ingresa URL y haz clic en Verificar', copyAll: 'Copiar todo', note: 'Nota: Esta herramienta usa un proxy CORS público.' },
  pt: { title: 'Verificador de Cabeçalhos HTTP', description: 'Verifique os cabeçalhos de resposta HTTP de qualquer URL.', urlLabel: 'URL', urlPlaceholder: 'https://exemplo.com', checkBtn: 'Verificar', clearBtn: 'Limpar', loading: 'Carregando...', errorMsg: 'Não foi possível buscar os cabeçalhos.', status: 'Status', headersLabel: 'Cabeçalhos de resposta', headerName: 'Cabeçalho', headerValue: 'Valor', securityTitle: 'Análise de segurança', present: 'Presente', missing: 'Ausente', noResults: 'Digite uma URL e clique em Verificar', copyAll: 'Copiar tudo', note: 'Nota: Esta ferramenta usa um proxy CORS público.' },
  nl: { title: 'HTTP Header Checker', description: 'Controleer HTTP-reactieheaders voor elke URL.', urlLabel: 'URL', urlPlaceholder: 'https://voorbeeld.nl', checkBtn: 'Controleer', clearBtn: 'Wissen', loading: 'Laden...', errorMsg: 'Headers konden niet worden opgehaald.', status: 'Status', headersLabel: 'Reactieheaders', headerName: 'Header', headerValue: 'Waarde', securityTitle: 'Beveiligingsanalyse', present: 'Aanwezig', missing: 'Ontbreekt', noResults: 'Voer een URL in en klik op Controleer', copyAll: 'Alles kopiëren', note: 'Opmerking: dit hulpmiddel gebruikt een publieke CORS-proxy.' },
  pl: { title: 'Sprawdzarka Nagłówków HTTP', description: 'Sprawdź nagłówki odpowiedzi HTTP dla dowolnego URL.', urlLabel: 'URL', urlPlaceholder: 'https://przyklad.pl', checkBtn: 'Sprawdź', clearBtn: 'Wyczyść', loading: 'Ładowanie...', errorMsg: 'Nie można pobrać nagłówków.', status: 'Status', headersLabel: 'Nagłówki odpowiedzi', headerName: 'Nagłówek', headerValue: 'Wartość', securityTitle: 'Analiza bezpieczeństwa', present: 'Obecny', missing: 'Brakujący', noResults: 'Wpisz URL i kliknij Sprawdź', copyAll: 'Kopiuj wszystko', note: 'Uwaga: to narzędzie używa publicznego proxy CORS.' },
  sv: { title: 'HTTP Header Checker', description: 'Kontrollera HTTP-svarsrubriker för valfri URL.', urlLabel: 'URL', urlPlaceholder: 'https://exempel.se', checkBtn: 'Kontrollera', clearBtn: 'Rensa', loading: 'Laddar...', errorMsg: 'Kunde inte hämta headers.', status: 'Status', headersLabel: 'Svarsheaders', headerName: 'Header', headerValue: 'Värde', securityTitle: 'Säkerhetsanalys', present: 'Finns', missing: 'Saknas', noResults: 'Ange URL och klicka på Kontrollera', copyAll: 'Kopiera allt', note: 'Obs: det här verktyget använder en offentlig CORS-proxy.' },
  no: { title: 'HTTP Header Checker', description: 'Sjekk HTTP-svarhoder for enhver URL.', urlLabel: 'URL', urlPlaceholder: 'https://eksempel.no', checkBtn: 'Sjekk', clearBtn: 'Tøm', loading: 'Laster...', errorMsg: 'Kunne ikke hente headers.', status: 'Status', headersLabel: 'Svarhoder', headerName: 'Header', headerValue: 'Verdi', securityTitle: 'Sikkerhetsanalyse', present: 'Til stede', missing: 'Mangler', noResults: 'Skriv inn URL og klikk Sjekk', copyAll: 'Kopier alt', note: 'Merk: dette verktøyet bruker en offentlig CORS-proxy.' },
  zh: { title: 'HTTP 头部检查器', description: '检查任意 URL 的 HTTP 响应头部信息。', urlLabel: 'URL 地址', urlPlaceholder: 'https://example.com', checkBtn: '检查头部', clearBtn: '清除', loading: '正在获取头部信息...', errorMsg: '无法获取头部信息，URL 可能无法访问。', status: '状态', headersLabel: '响应头部', headerName: '头部', headerValue: '值', securityTitle: '安全分析', present: '存在', missing: '缺失', noResults: '输入 URL 并点击检查', copyAll: '复制全部', note: '注意：此工具使用公共 CORS 代理。' },
  ja: { title: 'HTTP ヘッダーチェッカー', description: '任意のURLのHTTPレスポンスヘッダーを確認。', urlLabel: 'URL', urlPlaceholder: 'https://example.com', checkBtn: 'ヘッダー確認', clearBtn: 'クリア', loading: '取得中...', errorMsg: 'ヘッダーを取得できませんでした。', status: 'ステータス', headersLabel: 'レスポンスヘッダー', headerName: 'ヘッダー', headerValue: '値', securityTitle: 'セキュリティ分析', present: '存在', missing: '未設定', noResults: 'URLを入力してヘッダー確認をクリック', copyAll: 'すべてコピー', note: '注意：このツールは公開CORSプロキシを使用します。' },
  ko: { title: 'HTTP 헤더 검사기', description: '모든 URL의 HTTP 응답 헤더 확인.', urlLabel: 'URL', urlPlaceholder: 'https://example.com', checkBtn: '헤더 확인', clearBtn: '지우기', loading: '로딩 중...', errorMsg: '헤더를 가져올 수 없습니다.', status: '상태', headersLabel: '응답 헤더', headerName: '헤더', headerValue: '값', securityTitle: '보안 분석', present: '있음', missing: '없음', noResults: 'URL을 입력하고 헤더 확인 클릭', copyAll: '모두 복사', note: '참고: 이 도구는 공개 CORS 프록시를 사용합니다.' },
  id: { title: 'Pemeriksa Header HTTP', description: 'Periksa header respons HTTP untuk URL apa pun.', urlLabel: 'URL', urlPlaceholder: 'https://contoh.com', checkBtn: 'Periksa', clearBtn: 'Hapus', loading: 'Memuat...', errorMsg: 'Gagal mengambil header.', status: 'Status', headersLabel: 'Header Respons', headerName: 'Header', headerValue: 'Nilai', securityTitle: 'Analisis Keamanan', present: 'Ada', missing: 'Tidak Ada', noResults: 'Masukkan URL dan klik Periksa', copyAll: 'Salin Semua', note: 'Catatan: alat ini menggunakan proxy CORS publik.' },
  th: { title: 'ตรวจสอบ HTTP Header', description: 'ตรวจสอบ HTTP response headers ของ URL ใดก็ได้', urlLabel: 'URL', urlPlaceholder: 'https://example.com', checkBtn: 'ตรวจสอบ', clearBtn: 'ล้าง', loading: 'กำลังโหลด...', errorMsg: 'ไม่สามารถดึง headers ได้', status: 'สถานะ', headersLabel: 'Response Headers', headerName: 'Header', headerValue: 'ค่า', securityTitle: 'การวิเคราะห์ความปลอดภัย', present: 'มี', missing: 'ไม่มี', noResults: 'ใส่ URL แล้วคลิกตรวจสอบ', copyAll: 'คัดลอกทั้งหมด', note: 'หมายเหตุ: เครื่องมือนี้ใช้ CORS proxy สาธารณะ' },
};

const SECURITY_HEADERS = [
  'strict-transport-security',
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'x-xss-protection',
];

interface HeaderResult {
  status: number;
  statusText: string;
  headers: Array<{ name: string; value: string }>;
}

export default function HttpHeaderChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HeaderResult | null>(null);
  const [error, setError] = useState('');

  const checkHeaders = async () => {
    if (!url.trim()) return;
    let target = url.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      // Use allorigins as a CORS proxy to fetch headers
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;
      const res = await fetch(proxyUrl);
      const data = await res.json();

      // allorigins returns status and headers info
      const status = data.status?.http_code ?? 200;
      const rawHeaders: Record<string, string> = data.status?.response_headers ?? {};
      const headers = Object.entries(rawHeaders).map(([name, value]) => ({ name: name.toLowerCase(), value: String(value) }));

      setResult({ status, statusText: getStatusText(status), headers });
    } catch {
      setError(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (code: number) => {
    const map: Record<number, string> = { 200: 'OK', 201: 'Created', 301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error', 503: 'Service Unavailable' };
    return map[code] ?? 'Unknown';
  };

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return 'var(--accent-green, #22c55e)';
    if (code >= 300 && code < 400) return '#f59e0b';
    return 'var(--accent-rose, #f43f5e)';
  };

  const allHeadersText = result ? result.headers.map(h => `${h.name}: ${h.value}`).join('\n') : '';

  return (
    <ToolLayout title={t.title} description={t.description} toolId="http-header-checker">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && checkHeaders()}
          placeholder={t.urlPlaceholder}
          style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
        />
        <button onClick={checkHeaders} disabled={loading} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          {loading ? t.loading : t.checkBtn}
        </button>
        <button onClick={() => { setUrl(''); setResult(null); setError(''); }} className="btn btn-secondary">{t.clearBtn}</button>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.note}</div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {!result && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)', fontSize: 14 }}>
          {t.noResults}
        </div>
      )}

      {result && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{t.status}:</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: getStatusColor(result.status) }}>{result.status}</span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{result.statusText}</span>
            <div style={{ marginLeft: 'auto' }}>
              <CopyButton text={allHeadersText} />
            </div>
          </div>

          {/* Security headers analysis */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.securityTitle}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SECURITY_HEADERS.map(header => {
                const found = result.headers.find(h => h.name === header);
                return (
                  <div key={header} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, border: `1px solid ${found ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.3)'}`, background: found ? 'rgba(34,197,94,0.08)' : 'rgba(244,63,94,0.08)', fontSize: 12 }}>
                    <span>{found ? '✓' : '✗'}</span>
                    <span style={{ fontFamily: 'monospace' }}>{header}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All headers */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{t.headersLabel} ({result.headers.length})</h3>
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--bg-input)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, width: '35%', borderBottom: '1px solid var(--border-color)' }}>{t.headerName}</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '1px solid var(--border-color)' }}>{t.headerValue}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.headers.map((h, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)', verticalAlign: 'top', wordBreak: 'break-word' }}>{h.name}</td>
                      <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-word', color: 'var(--text-secondary)' }}>{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </ToolLayout>
  );
}
