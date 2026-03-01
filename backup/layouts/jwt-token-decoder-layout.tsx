import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT Token Decoder - Decode JWT Tokens Online Free', description: 'Decode JWT tokens online instantly. View header, payload, and signature from any JSON Web Token. Free JWT token decoder tool with base64url decoding.' },
  fr: { title: 'Decodeur de Token JWT - Decoder des Tokens JWT en Ligne', description: 'Decodez les tokens JWT en ligne instantanement. Affichez le header, le payload et la signature de tout JSON Web Token.' },
  de: { title: 'JWT Token Decoder - JWT Tokens Online Dekodieren', description: 'Dekodieren Sie JWT-Tokens sofort online. Header, Payload und Signatur jedes JSON Web Tokens anzeigen.' },
  it: { title: 'Decoder Token JWT - Decodifica Token JWT Online', description: 'Decodifica i token JWT online istantaneamente. Visualizza header, payload e firma di qualsiasi JSON Web Token.' },
  es: { title: 'Decodificador de Token JWT - Decodificar JWT Online', description: 'Decodifica tokens JWT en linea al instante. Visualiza header, payload y firma de cualquier JSON Web Token.' },
  pt: { title: 'Decodificador de Token JWT - Decodificar JWT Online', description: 'Decodifique tokens JWT online instantaneamente. Visualize header, payload e assinatura de qualquer JSON Web Token.' },
  nl: { title: 'JWT Token Decoder - JWT Tokens Online Decoderen', description: 'Decodeer JWT-tokens direct online. Bekijk header, payload en handtekening van elk JSON Web Token.' },
  pl: { title: 'Dekoder Tokenow JWT - Dekoduj Tokeny JWT Online', description: 'Dekoduj tokeny JWT online natychmiast. Wyswietl naglowek, ladunek i podpis dowolnego JSON Web Token.' },
  sv: { title: 'JWT Token Avkodare - Avkoda JWT Tokens Online', description: 'Avkoda JWT-tokens online direkt. Visa header, payload och signatur fran valfri JSON Web Token.' },
  no: { title: 'JWT Token Dekoder - Dekod JWT Tokens Online', description: 'Dekod JWT-tokens online umiddelbart. Vis header, payload og signatur fra hvilken som helst JSON Web Token.' },
  zh: { title: 'JWT Token 解码器 - 在线解码 JWT 令牌', description: '在线即时解码 JWT 令牌。查看任何 JSON Web Token 的 Header、Payload 和 Signature。免费 JWT Token 解码工具。' },
  ja: { title: 'JWT トークンデコーダー - JWT トークンをオンラインでデコード', description: 'JWTトークンをオンラインで即座にデコード。JSON Web Tokenのヘッダー、ペイロード、署名を表示します。' },
  ko: { title: 'JWT 토큰 디코더 - 온라인 JWT 토큰 디코딩', description: 'JWT 토큰을 온라인으로 즉시 디코딩하세요. JSON Web Token의 헤더, 페이로드, 서명을 확인합니다.' },
  id: { title: 'Dekoder Token JWT - Dekode Token JWT Online', description: 'Dekode token JWT secara online secara instan. Lihat header, payload, dan tanda tangan dari JSON Web Token apa pun.' },
  th: { title: 'ตัวถอดรหัส JWT Token - ถอดรหัส JWT Token ออนไลน์', description: 'ถอดรหัส JWT token ออนไลน์ทันที ดู header, payload และ signature ของ JSON Web Token ใดก็ได้' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-token-decoder`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-token-decoder`])
        ),
        'x-default': `https://viadreams.cc/en/tools/jwt-token-decoder`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
