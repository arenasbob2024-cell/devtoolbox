import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT Parser - Parse JWT Claims & Payload Online Free', description: 'Parse JWT tokens and extract all claims with human-readable labels. View issuer, subject, audience, expiration dates, and custom claims. Free online JWT parser.' },
  fr: { title: 'Analyseur JWT - Analyser les Claims JWT en Ligne', description: 'Analysez les tokens JWT et extrayez tous les claims avec des libelles lisibles. Visualisez l\'emetteur, le sujet, l\'audience et les dates d\'expiration.' },
  de: { title: 'JWT Parser - JWT Claims Online Analysieren', description: 'Analysieren Sie JWT-Tokens und extrahieren Sie alle Claims mit lesbaren Bezeichnungen. Aussteller, Betreff, Ablaufdaten anzeigen.' },
  it: { title: 'Parser JWT - Analizza Claims JWT Online', description: 'Analizza i token JWT ed estrai tutti i claims con etichette leggibili. Visualizza emittente, soggetto, pubblico e date di scadenza.' },
  es: { title: 'Parser JWT - Analizar Claims JWT Online', description: 'Analiza tokens JWT y extrae todos los claims con etiquetas legibles. Visualiza emisor, sujeto, audiencia y fechas de expiracion.' },
  pt: { title: 'Parser JWT - Analisar Claims JWT Online', description: 'Analise tokens JWT e extraia todos os claims com rotulos legiveis. Visualize emissor, assunto, audiencia e datas de expiracao.' },
  nl: { title: 'JWT Parser - JWT Claims Online Parseren', description: 'Parseer JWT-tokens en extraheer alle claims met leesbare labels. Bekijk uitgever, onderwerp, doelgroep en vervaldatums.' },
  pl: { title: 'Parser JWT - Analizuj Claims JWT Online', description: 'Analizuj tokeny JWT i wyodrebnij wszystkie claims z czytelnymi etykietami. Wyswietl wystawce, temat, odbiorce i daty wygasniecia.' },
  sv: { title: 'JWT Parser - Analysera JWT Claims Online', description: 'Analysera JWT-tokens och extrahera alla claims med lasbara etiketter. Visa utfardare, amne, malgrupp och utgangsdatum.' },
  no: { title: 'JWT Parser - Analyser JWT Claims Online', description: 'Analyser JWT-tokens og ekstraher alle claims med lesbare etiketter. Vis utsteder, emne, publikum og utlopsdatoer.' },
  zh: { title: 'JWT 解析器 - 在线解析 JWT 声明和载荷', description: '解析 JWT 令牌并提取所有带有人类可读标签的声明。查看发行者、主题、受众、过期时间和自定义声明。免费在线 JWT 解析器。' },
  ja: { title: 'JWT パーサー - JWT クレームをオンラインで解析', description: 'JWTトークンを解析し、人間が読めるラベル付きですべてのクレームを抽出します。発行者、サブジェクト、有効期限を表示します。' },
  ko: { title: 'JWT 파서 - 온라인 JWT 클레임 파싱', description: 'JWT 토큰을 파싱하고 사람이 읽을 수 있는 레이블로 모든 클레임을 추출합니다. 발급자, 주제, 대상, 만료일을 확인합니다.' },
  id: { title: 'Parser JWT - Parse Klaim JWT Online', description: 'Parse token JWT dan ekstrak semua klaim dengan label yang mudah dibaca. Lihat penerbit, subjek, audiens, dan tanggal kedaluwarsa.' },
  th: { title: 'JWT Parser - แยกวิเคราะห์ JWT Claims ออนไลน์', description: 'แยกวิเคราะห์ JWT token และดึงข้อมูล claims ทั้งหมดพร้อมป้ายกำกับที่อ่านง่าย ดูผู้ออก, หัวข้อ, ผู้รับ และวันหมดอายุ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-parser`;
  return {
    title: t.title,
    description: t.description,
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
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-parser`])
        ),
        'x-default': `https://viadreams.cc/en/tools/jwt-parser`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
