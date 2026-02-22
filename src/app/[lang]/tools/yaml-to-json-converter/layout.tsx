import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'YAML to JSON Converter Online - Convert YAML to JSON & JSON to YAML Free', description: 'Free online YAML to JSON converter and JSON to YAML converter. Bidirectional conversion with syntax validation, formatting options, and instant output. Supports all YAML features.' },
  fr: { title: 'Convertisseur YAML vers JSON et JSON vers YAML en Ligne Gratuit', description: 'Convertisseur bidirectionnel YAML vers JSON et JSON vers YAML gratuit en ligne. Validation de syntaxe, options de formatage et sortie instantanee.' },
  de: { title: 'YAML zu JSON Konverter Online - YAML & JSON Konvertierung Kostenlos', description: 'Kostenloser Online YAML zu JSON und JSON zu YAML Konverter. Bidirektionale Konvertierung mit Syntaxvalidierung und sofortiger Ausgabe.' },
  it: { title: 'Convertitore YAML a JSON e JSON a YAML Online Gratis', description: 'Convertitore bidirezionale YAML a JSON e JSON a YAML gratuito online. Validazione della sintassi, opzioni di formattazione e output istantaneo.' },
  es: { title: 'Convertidor YAML a JSON y JSON a YAML en Linea Gratis', description: 'Convertidor bidireccional YAML a JSON y JSON a YAML gratuito en linea. Validacion de sintaxis, opciones de formato y salida instantanea.' },
  pt: { title: 'Conversor YAML para JSON e JSON para YAML Online Gratis', description: 'Conversor bidirecional YAML para JSON e JSON para YAML gratuito online. Validacao de sintaxe, opcoes de formatacao e saida instantanea.' },
  nl: { title: 'YAML naar JSON Converter en JSON naar YAML Online Gratis', description: 'Gratis online bidirectionele YAML naar JSON en JSON naar YAML converter. Syntaxvalidatie, opmaakopties en directe uitvoer.' },
  pl: { title: 'Konwerter YAML na JSON i JSON na YAML Online Za Darmo', description: 'Darmowy dwukierunkowy konwerter YAML na JSON i JSON na YAML online. Walidacja skladni, opcje formatowania i natychmiastowy wynik.' },
  sv: { title: 'YAML till JSON Konverterare Online Gratis', description: 'Gratis online dubbelriktad YAML till JSON och JSON till YAML konverterare. Syntaxvalidering, formateringsalternativ och direkt utdata.' },
  no: { title: 'YAML til JSON Konverterer Online Gratis', description: 'Gratis online toveis YAML til JSON og JSON til YAML konverterer. Syntaksvalidering, formateringsalternativer og umiddelbar utdata.' },
  zh: { title: 'YAML 转 JSON 转换器 - 免费在线 YAML 与 JSON 互转工具', description: '免费在线 YAML 转 JSON 和 JSON 转 YAML 双向转换工具。支持语法验证、格式化选项和即时输出。支持所有 YAML 特性。' },
  ja: { title: 'YAML JSON 変換ツール - 無料オンライン YAML と JSON の相互変換', description: '無料オンライン YAML から JSON および JSON から YAML への双方向変換ツール。構文検証、フォーマットオプション、即座の出力をサポート。' },
  ko: { title: 'YAML JSON 변환기 - 무료 온라인 YAML과 JSON 상호 변환', description: '무료 온라인 YAML에서 JSON 및 JSON에서 YAML 양방향 변환기. 구문 검증, 포맷 옵션 및 즉시 출력 지원.' },
  id: { title: 'Konverter YAML ke JSON dan JSON ke YAML Online Gratis', description: 'Konverter dua arah YAML ke JSON dan JSON ke YAML online gratis. Validasi sintaks, opsi pemformatan, dan output instan.' },
  th: { title: 'ตัวแปลง YAML เป็น JSON และ JSON เป็น YAML ออนไลน์ฟรี', description: 'เครื่องมือแปลง YAML เป็น JSON และ JSON เป็น YAML แบบสองทิศทางออนไลน์ฟรี รองรับการตรวจสอบไวยากรณ์ ตัวเลือกการจัดรูปแบบ และผลลัพธ์ทันที' },
};

const slug = 'yaml-to-json-converter';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'yaml parser', 'json converter online', 'yaml to json online', 'convert yaml', 'yaml json converter'],
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])),
        'x-default': `https://viadreams.cc/en/tools/${slug}`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
