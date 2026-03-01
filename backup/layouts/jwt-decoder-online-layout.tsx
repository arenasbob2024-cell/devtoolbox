import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT Decoder Online - Decode JWT Token Free', description: 'Decode JWT tokens online for free. View header, payload, claims, and expiration instantly. No signup required. Secure client-side JWT decoder tool for developers.' },
  fr: { title: 'Decodeur JWT en Ligne - Decoder Token JWT Gratuit', description: 'Decodez des tokens JWT en ligne gratuitement. Visualisez le header, le payload, les claims et l\'expiration instantanement.' },
  de: { title: 'JWT Decoder Online - JWT Token Kostenlos Dekodieren', description: 'JWT-Tokens kostenlos online dekodieren. Header, Payload, Claims und Ablaufzeit sofort anzeigen.' },
  it: { title: 'JWT Decoder Online - Decodifica Token JWT Gratis', description: 'Decodifica token JWT online gratuitamente. Visualizza header, payload, claims e scadenza istantaneamente.' },
  es: { title: 'JWT Decoder Online - Decodificar Token JWT Gratis', description: 'Decodifica tokens JWT en linea gratis. Visualiza header, payload, claims y expiracion al instante.' },
  pt: { title: 'JWT Decoder Online - Decodificar Token JWT Gratis', description: 'Decodifique tokens JWT online gratuitamente. Visualize header, payload, claims e expiracao instantaneamente.' },
  nl: { title: 'JWT Decoder Online - JWT Token Gratis Decoderen', description: 'Decodeer JWT-tokens gratis online. Bekijk header, payload, claims en vervaltijd direct.' },
  pl: { title: 'JWT Decoder Online - Dekoduj Token JWT Za Darmo', description: 'Dekoduj tokeny JWT online za darmo. Wyswietl header, payload, claims i czas wygasniecia natychmiast.' },
  sv: { title: 'JWT Decoder Online - Avkoda JWT Token Gratis', description: 'Avkoda JWT-tokens online gratis. Visa header, payload, claims och utgangstid direkt.' },
  no: { title: 'JWT Decoder Online - Dekod JWT Token Gratis', description: 'Dekod JWT-tokens online gratis. Vis header, payload, claims og utlopstid umiddelbart.' },
  zh: { title: 'JWT 在线解码器 - 免费解码 JWT Token', description: '免费在线解码 JWT 令牌。即时查看 Header、Payload、Claims 和过期时间。无需注册，安全的客户端 JWT 解码工具。' },
  ja: { title: 'JWT デコーダーオンライン - JWT トークン無料デコード', description: 'JWTトークンを無料でオンラインデコード。ヘッダー、ペイロード、クレーム、有効期限を即座に表示。' },
  ko: { title: 'JWT 디코더 온라인 - JWT 토큰 무료 디코딩', description: 'JWT 토큰을 무료로 온라인 디코딩. 헤더, 페이로드, 클레임, 만료 시간을 즉시 확인합니다.' },
  id: { title: 'JWT Decoder Online - Decode Token JWT Gratis', description: 'Decode token JWT online gratis. Lihat header, payload, claims, dan waktu kedaluwarsa secara instan.' },
  th: { title: 'JWT Decoder ออนไลน์ - ถอดรหัส JWT Token ฟรี', description: 'ถอดรหัส JWT token ออนไลน์ฟรี ดู header, payload, claims และเวลาหมดอายุได้ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-decoder-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-decoder-online`])), 'x-default': `https://viadreams.cc/en/tools/jwt-decoder-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
