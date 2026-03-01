import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JWT vs Session: Which Authentication Method Should You Use?', description: 'Compare JWT tokens and session-based authentication. Differences in storage, scalability, security, statelessness, and best practices.' },
  fr: { title: 'JWT vs Session : Quelle methode d\'authentification choisir ?', description: 'Comparez les tokens JWT et l\'authentification par session. Differences de stockage, scalabilite, securite et bonnes pratiques.' },
  de: { title: 'JWT vs Session: Welche Authentifizierungsmethode sollten Sie verwenden?', description: 'Vergleichen Sie JWT-Tokens und sitzungsbasierte Authentifizierung. Unterschiede bei Speicherung, Skalierbarkeit, Sicherheit und Best Practices.' },
  it: { title: 'JWT vs Session: Quale metodo di autenticazione scegliere?', description: 'Confronta i token JWT e l\'autenticazione basata su sessione. Differenze di archiviazione, scalabilita, sicurezza e best practice.' },
  es: { title: 'JWT vs Session: Que metodo de autenticacion deberias usar?', description: 'Compara tokens JWT y autenticacion basada en sesiones. Diferencias en almacenamiento, escalabilidad, seguridad y mejores practicas.' },
  pt: { title: 'JWT vs Session: Qual metodo de autenticacao voce deve usar?', description: 'Compare tokens JWT e autenticacao baseada em sessao. Diferencas em armazenamento, escalabilidade, seguranca e melhores praticas.' },
  nl: { title: 'JWT vs Session: Welke authenticatiemethode moet je gebruiken?', description: 'Vergelijk JWT-tokens en sessiegebaseerde authenticatie. Verschillen in opslag, schaalbaarheid, beveiliging en best practices.' },
  pl: { title: 'JWT vs Session: Ktora metode uwierzytelniania wybrac?', description: 'Porownaj tokeny JWT i uwierzytelnianie sesyjne. Roznice w przechowywaniu, skalowalnosci, bezpieczenstwie i najlepszych praktykach.' },
  sv: { title: 'JWT vs Session: Vilken autentiseringsmetod ska du anvanda?', description: 'Jamfor JWT-tokens och sessionsbaserad autentisering. Skillnader i lagring, skalbarhet, sakerhet och basta praxis.' },
  no: { title: 'JWT vs Session: Hvilken autentiseringsmetode bor du bruke?', description: 'Sammenlign JWT-tokens og sesjonsbasert autentisering. Forskjeller i lagring, skalerbarhet, sikkerhet og beste praksis.' },
  zh: { title: 'JWT vs Session：应该使用哪种认证方式？', description: '比较 JWT 令牌和基于会话的认证。存储方式、可扩展性、安全性、无状态性及最佳实践的差异。' },
  ja: { title: 'JWT vs Session：どちらの認証方式を使うべき？', description: 'JWTトークンとセッションベース認証を比較。ストレージ、スケーラビリティ、セキュリティ、ベストプラクティスの違い。' },
  ko: { title: 'JWT vs Session: 어떤 인증 방식을 사용해야 할까요?', description: 'JWT 토큰과 세션 기반 인증을 비교합니다. 저장소, 확장성, 보안 및 모범 사례의 차이점.' },
  id: { title: 'JWT vs Session: Metode Autentikasi Mana yang Harus Anda Gunakan?', description: 'Bandingkan token JWT dan autentikasi berbasis sesi. Perbedaan penyimpanan, skalabilitas, keamanan, dan praktik terbaik.' },
  th: { title: 'JWT vs Session: ควรใช้วิธีการยืนยันตัวตนแบบไหน?', description: 'เปรียบเทียบ JWT token และการยืนยันตัวตนแบบ session พื้นที่จัดเก็บ ความสามารถในการขยาย ความปลอดภัย' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/jwt-vs-session`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/jwt-vs-session`])
        ),
        'x-default': `https://viadreams.cc/en/tools/jwt-vs-session`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
