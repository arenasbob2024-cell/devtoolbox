import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT Debugger - Decode & Inspect JWT Tokens Online', description: 'Debug and inspect JWT tokens. View decoded header, payload, signature verification, and expiration status. Free online JWT decoder tool.' },
  fr: { title: 'Debogueur JWT - Decoder et Inspecter les Tokens', description: 'Deboguez et inspectez les tokens JWT. Visualisez l\'en-tete, le payload et la verification de signature.' },
  de: { title: 'JWT Debugger - JWT-Token Online Dekodieren', description: 'JWT-Token debuggen und inspizieren. Header, Payload und Signaturverifizierung anzeigen.' },
  it: { title: 'JWT Debugger - Decodifica e Ispeziona Token', description: 'Debug e ispezione dei token JWT. Visualizza header, payload e verifica della firma.' },
  es: { title: 'Depurador JWT - Decodificar e Inspeccionar Tokens', description: 'Depure e inspeccione tokens JWT. Vea header, payload y verificacion de firma.' },
  pt: { title: 'Depurador JWT - Decodificar e Inspecionar Tokens', description: 'Depure e inspecione tokens JWT. Visualize header, payload e verificacao de assinatura.' },
  nl: { title: 'JWT Debugger - Decodeer en Inspecteer Tokens', description: 'Debug en inspecteer JWT-tokens. Bekijk header, payload en handtekeningverificatie.' },
  pl: { title: 'Debugger JWT - Dekoduj i Sprawdz Tokeny', description: 'Debuguj i sprawdzaj tokeny JWT. Zobacz naglowek, payload i weryfikacje podpisu.' },
  sv: { title: 'JWT Debugger - Avkoda och Inspektera Tokens', description: 'Felsok och inspektera JWT-tokens. Visa header, payload och signaturverifiering.' },
  no: { title: 'JWT Debugger - Dekod og Inspiser Tokens', description: 'Feilsok og inspiser JWT-tokens. Vis header, payload og signaturverifisering.' },
  zh: { title: 'JWT 调试器 - 在线解码和检查 JWT 令牌', description: '调试和检查 JWT 令牌。查看解码后的头部、载荷、签名验证和过期状态。免费在线 JWT 解码工具。' },
  ja: { title: 'JWT デバッガー - トークンをデコード・検査', description: 'JWTトークンをデバッグ・検査。ヘッダー、ペイロード、署名検証、有効期限を確認。' },
  ko: { title: 'JWT 디버거 - 토큰 디코딩 및 검사', description: 'JWT 토큰을 디버그하고 검사합니다. 헤더, 페이로드, 서명 검증을 확인하세요.' },
  id: { title: 'JWT Debugger - Dekode dan Periksa Token', description: 'Debug dan periksa token JWT. Lihat header, payload, dan verifikasi tanda tangan.' },
  th: { title: 'JWT Debugger - ถอดรหัสและตรวจสอบ Token', description: 'ดีบักและตรวจสอบ JWT Token ดู header, payload และการตรวจสอบลายเซ็น' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-debugger`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-debugger`])), 'x-default': `https://viadreams.cc/en/tools/jwt-debugger` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
