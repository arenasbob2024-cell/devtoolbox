import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Validator - Check JSON Syntax Online Free', description: 'Validate JSON data online for free. Instant JSON syntax checker and linter with detailed error messages, line numbers, and structure analysis. Find and fix JSON errors quickly.' },
  fr: { title: 'Validateur JSON - Verifier la Syntaxe JSON en Ligne', description: 'Validez vos donnees JSON en ligne gratuitement. Verificateur de syntaxe JSON instantane avec messages d\'erreur detailles, numeros de ligne et analyse de structure.' },
  de: { title: 'JSON Validator - JSON Syntax Online Pruefen Kostenlos', description: 'JSON-Daten kostenlos online validieren. Sofortige JSON-Syntaxpruefung mit detaillierten Fehlermeldungen, Zeilennummern und Strukturanalyse.' },
  it: { title: 'Validatore JSON - Controlla Sintassi JSON Online Gratis', description: 'Valida i dati JSON online gratuitamente. Controllo istantaneo della sintassi JSON con messaggi di errore dettagliati, numeri di riga e analisi della struttura.' },
  es: { title: 'Validador JSON - Verificar Sintaxis JSON en Linea Gratis', description: 'Valida datos JSON en linea gratis. Verificador de sintaxis JSON instantaneo con mensajes de error detallados, numeros de linea y analisis de estructura.' },
  pt: { title: 'Validador JSON - Verificar Sintaxe JSON Online Gratis', description: 'Valide dados JSON online gratuitamente. Verificador de sintaxe JSON instantaneo com mensagens de erro detalhadas, numeros de linha e analise de estrutura.' },
  nl: { title: 'JSON Validator - Controleer JSON Syntax Online Gratis', description: 'Valideer JSON-gegevens gratis online. Directe JSON-syntaxiscontrole met gedetailleerde foutmeldingen, regelnummers en structuuranalyse.' },
  pl: { title: 'Walidator JSON - Sprawdz Skladnie JSON Online Za Darmo', description: 'Waliduj dane JSON online za darmo. Natychmiastowy sprawdzacz skladni JSON ze szczegolowymi komunikatami bledow, numerami linii i analiza struktury.' },
  sv: { title: 'JSON Validator - Kontrollera JSON Syntax Online Gratis', description: 'Validera JSON-data online gratis. Omedelbar JSON-syntaxkontroll med detaljerade felmeddelanden, radnummer och strukturanalys.' },
  no: { title: 'JSON Validator - Sjekk JSON Syntaks Online Gratis', description: 'Valider JSON-data online gratis. Umiddelbar JSON-syntakssjekk med detaljerte feilmeldinger, linjenumre og strukturanalyse.' },
  zh: { title: 'JSON 验证器 - 免费在线 JSON 语法检查工具', description: '免费在线验证 JSON 数据。即时 JSON 语法检查器，提供详细错误信息、行号定位和结构分析。快速发现和修复 JSON 错误。' },
  ja: { title: 'JSON バリデーター - 無料オンライン JSON 構文チェッカー', description: 'JSON データを無料でオンラインで検証。詳細なエラーメッセージ、行番号、構造分析を備えた即座の JSON 構文チェッカー。' },
  ko: { title: 'JSON 유효성 검사기 - 무료 온라인 JSON 구문 검사', description: 'JSON 데이터를 무료로 온라인에서 검증하세요. 상세한 오류 메시지, 줄 번호, 구조 분석을 제공하는 즉각적인 JSON 구문 검사기.' },
  id: { title: 'Validator JSON - Periksa Sintaks JSON Online Gratis', description: 'Validasi data JSON online gratis. Pemeriksa sintaks JSON instan dengan pesan error detail, nomor baris, dan analisis struktur.' },
  th: { title: 'ตัวตรวจสอบ JSON - ตรวจสอบไวยากรณ์ JSON ออนไลน์ฟรี', description: 'ตรวจสอบความถูกต้องของข้อมูล JSON ออนไลน์ฟรี ตัวตรวจสอบไวยากรณ์ JSON แบบทันทีพร้อมข้อความแสดงข้อผิดพลาดโดยละเอียด หมายเลขบรรทัด และการวิเคราะห์โครงสร้าง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-validator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-validator`])), 'x-default': `https://viadreams.cc/en/tools/json-validator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
