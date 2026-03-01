import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT Generator & Decoder - Create and Debug JWT Tokens', description: 'Generate and decode JWT tokens online. Create JSON Web Tokens with custom headers, payloads, and secrets. Supports HS256, HS384, HS512 algorithms.' },
  fr: { title: 'Generateur JWT - Creer et Decoder des Tokens JWT', description: 'Generez et decodez des tokens JWT en ligne. Creez des JSON Web Tokens avec des en-tetes, charges utiles et secrets personnalises.' },
  de: { title: 'JWT Generator - JWT-Tokens Erstellen und Debuggen', description: 'JWT-Tokens online generieren und decodieren. JSON Web Tokens mit benutzerdefinierten Headern, Payloads und Secrets erstellen.' },
  it: { title: 'Generatore JWT - Crea e Decodifica Token JWT', description: 'Genera e decodifica token JWT online. Crea JSON Web Token con header, payload e segreti personalizzati.' },
  es: { title: 'Generador JWT - Crear y Depurar Tokens JWT', description: 'Genera y decodifica tokens JWT en linea. Crea JSON Web Tokens con cabeceras, payloads y secretos personalizados.' },
  pt: { title: 'Gerador JWT - Criar e Depurar Tokens JWT', description: 'Gere e decodifique tokens JWT online. Crie JSON Web Tokens com cabecalhos, payloads e segredos personalizados.' },
  nl: { title: 'JWT Generator - JWT-Tokens Aanmaken en Debuggen', description: 'Genereer en decodeer JWT-tokens online. Maak JSON Web Tokens met aangepaste headers, payloads en secrets.' },
  pl: { title: 'Generator JWT - Tworzenie i Debugowanie Tokenow JWT', description: 'Generuj i dekoduj tokeny JWT online. Tworzenie JSON Web Tokenow z niestandardowymi naglowkami, payloadami i sekretami.' },
  sv: { title: 'JWT-generator - Skapa och Felsoka JWT-tokens', description: 'Generera och dekodera JWT-tokens online. Skapa JSON Web Tokens med anpassade huvuden, nyttolaster och hemligheter.' },
  no: { title: 'JWT-generator - Lag og Feilsok JWT-tokens', description: 'Generer og dekod JWT-tokens online. Lag JSON Web Tokens med tilpassede hoder, nyttelaster og hemmeligheter.' },
  zh: { title: 'JWT 生成器与解码器 - 创建和调试 JWT 令牌', description: '在线生成和解码 JWT 令牌。使用自定义 Header、Payload 和密钥创建 JSON Web Token，支持 HS256、HS384、HS512 算法。' },
  ja: { title: 'JWT ジェネレーター＆デコーダー - JWT トークンの作成とデバッグ', description: 'JWT トークンをオンラインで生成・デコードします。カスタムヘッダー、ペイロード、シークレットで JSON Web Token を作成。HS256/384/512 対応。' },
  ko: { title: 'JWT 생성기 & 디코더 - JWT 토큰 생성 및 디버그', description: 'JWT 토큰을 온라인으로 생성하고 디코딩하세요. 사용자 정의 헤더, 페이로드, 시크릿으로 JSON Web Token을 생성하세요.' },
  id: { title: 'Generator JWT - Buat dan Debug Token JWT', description: 'Generate dan decode token JWT secara online. Buat JSON Web Token dengan header, payload, dan secret kustom.' },
  th: { title: 'เครื่องมือสร้าง JWT - สร้างและถอดรหัส JWT Token', description: 'สร้างและถอดรหัส JWT token ออนไลน์ สร้าง JSON Web Token ด้วย header, payload และ secret ที่กำหนดเอง รองรับ HS256, HS384, HS512' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-generator`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['jwt generator', 'jwt decoder', 'json web token', 'jwt debugger', 'hs256 jwt', 'jwt token creator'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-generator`])), 'x-default': `https://viadreams.cc/en/tools/jwt-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
