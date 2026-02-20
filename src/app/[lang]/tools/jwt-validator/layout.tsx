import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT Validator - Validate JWT Structure & Expiration Online', description: 'Validate JWT token structure and check expiration status online. Verify header, payload, algorithm fields, and time-based claims. Free online JWT validator.' },
  fr: { title: 'Validateur JWT - Valider la Structure et l\'Expiration JWT', description: 'Validez la structure des tokens JWT et verifiez l\'expiration en ligne. Verifiez le header, le payload et les claims temporels.' },
  de: { title: 'JWT Validator - JWT Struktur und Ablauf Online Pruefen', description: 'Validieren Sie die JWT-Token-Struktur und pruefen Sie den Ablaufstatus online. Header, Payload und zeitbasierte Claims ueberpruefen.' },
  it: { title: 'Validatore JWT - Valida Struttura ed Scadenza JWT Online', description: 'Valida la struttura dei token JWT e controlla lo stato di scadenza online. Verifica header, payload e campi algoritmo.' },
  es: { title: 'Validador JWT - Validar Estructura y Expiracion JWT Online', description: 'Valida la estructura de tokens JWT y verifica el estado de expiracion online. Comprueba header, payload y campos de algoritmo.' },
  pt: { title: 'Validador JWT - Validar Estrutura e Expiracao JWT Online', description: 'Valide a estrutura de tokens JWT e verifique o status de expiracao online. Verifique header, payload e campos de algoritmo.' },
  nl: { title: 'JWT Validator - JWT Structuur en Verloopdatum Online Valideren', description: 'Valideer JWT-tokenstructuur en controleer de verloopdatum online. Controleer header, payload en algoritme-velden.' },
  pl: { title: 'Walidator JWT - Sprawdz Strukture i Wygasniecie JWT Online', description: 'Zwaliduj strukture tokenow JWT i sprawdz status wygasniecia online. Sprawdz naglowek, ladunek i pola algorytmu.' },
  sv: { title: 'JWT Validator - Validera JWT Struktur och Utgangsdatum Online', description: 'Validera JWT-tokenstruktur och kontrollera utgangsstatus online. Verifiera header, payload och algoritmfalt.' },
  no: { title: 'JWT Validator - Valider JWT Struktur og Utlop Online', description: 'Valider JWT-tokenstruktur og sjekk utlopsstatus online. Verifiser header, payload og algoritmefelt.' },
  zh: { title: 'JWT 验证器 - 在线验证 JWT 结构和过期状态', description: '在线验证 JWT 令牌结构并检查过期状态。验证 Header、Payload、算法字段和基于时间的声明。免费在线 JWT 验证器。' },
  ja: { title: 'JWT バリデーター - JWT構造と有効期限をオンラインで検証', description: 'JWTトークンの構造を検証し、有効期限ステータスをオンラインで確認します。ヘッダー、ペイロード、アルゴリズムフィールドを検証。' },
  ko: { title: 'JWT 검증기 - 온라인 JWT 구조 및 만료 검증', description: 'JWT 토큰 구조를 검증하고 만료 상태를 온라인으로 확인합니다. 헤더, 페이로드, 알고리즘 필드를 검증합니다.' },
  id: { title: 'Validator JWT - Validasi Struktur dan Kedaluwarsa JWT Online', description: 'Validasi struktur token JWT dan periksa status kedaluwarsa secara online. Verifikasi header, payload, dan bidang algoritma.' },
  th: { title: 'ตัวตรวจสอบ JWT - ตรวจสอบโครงสร้างและการหมดอายุ JWT ออนไลน์', description: 'ตรวจสอบโครงสร้าง JWT token และสถานะการหมดอายุออนไลน์ ยืนยัน header, payload และฟิลด์อัลกอริทึม' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-validator`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-validator`])
        ),
        'x-default': `https://viadreams.cc/en/tools/jwt-validator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
