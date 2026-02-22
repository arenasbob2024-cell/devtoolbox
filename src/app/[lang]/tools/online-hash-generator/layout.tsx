import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Online Hash Generator (MD5, SHA-256, SHA-512) - Free Tool', description: 'Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes online. Fast, free, and secure client-side hash calculator for developers.' },
  fr: { title: 'Generateur de Hash en Ligne (MD5, SHA-256, SHA-512) Gratuit', description: 'Generez des hachages MD5, SHA-1, SHA-256, SHA-384 et SHA-512 en ligne. Calculateur de hachage rapide et securise.' },
  de: { title: 'Online Hash Generator (MD5, SHA-256, SHA-512) Kostenlos', description: 'Generieren Sie MD5, SHA-1, SHA-256, SHA-384 und SHA-512 Hashes online. Schneller und sicherer Hash-Rechner.' },
  it: { title: 'Generatore di Hash Online (MD5, SHA-256, SHA-512) Gratis', description: 'Genera hash MD5, SHA-1, SHA-256, SHA-384 e SHA-512 online. Calcolatore di hash veloce e sicuro.' },
  es: { title: 'Generador de Hash en Linea (MD5, SHA-256, SHA-512) Gratis', description: 'Genere hashes MD5, SHA-1, SHA-256, SHA-384 y SHA-512 en linea. Calculadora de hash rapida y segura.' },
  pt: { title: 'Gerador de Hash Online (MD5, SHA-256, SHA-512) Gratis', description: 'Gere hashes MD5, SHA-1, SHA-256, SHA-384 e SHA-512 online. Calculadora de hash rapida e segura.' },
  nl: { title: 'Online Hash Generator (MD5, SHA-256, SHA-512) Gratis', description: 'Genereer MD5, SHA-1, SHA-256, SHA-384 en SHA-512 hashes online. Snelle en veilige hash-calculator.' },
  pl: { title: 'Generator Hashy Online (MD5, SHA-256, SHA-512) Za Darmo', description: 'Generuj hashe MD5, SHA-1, SHA-256, SHA-384 i SHA-512 online. Szybki i bezpieczny kalkulator haszy.' },
  sv: { title: 'Online Hash Generator (MD5, SHA-256, SHA-512) Gratis', description: 'Generera MD5, SHA-1, SHA-256, SHA-384 och SHA-512 hashar online. Snabb och saker hash-kalkylator.' },
  no: { title: 'Online Hash Generator (MD5, SHA-256, SHA-512) Gratis', description: 'Generer MD5, SHA-1, SHA-256, SHA-384 og SHA-512 hasher online. Rask og sikker hash-kalkulator.' },
  zh: { title: '在线哈希生成器 (MD5, SHA-256, SHA-512) - 免费工具', description: '在线生成 MD5, SHA-1, SHA-256, SHA-384, SHA-512 哈希值。快速、免费、安全的客户端哈希计算器。' },
  ja: { title: 'オンラインハッシュジェネレーター (MD5, SHA-256, SHA-512) 無料', description: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512ハッシュをオンラインで生成。高速で安全なクライアントサイドハッシュ計算。' },
  ko: { title: '온라인 해시 생성기 (MD5, SHA-256, SHA-512) 무료', description: 'MD5, SHA-1, SHA-256, SHA-384, SHA-512 해시를 온라인으로 생성. 빠르고 안전한 클라이언트 사이드 해시 계산기.' },
  id: { title: 'Generator Hash Online (MD5, SHA-256, SHA-512) Gratis', description: 'Generate hash MD5, SHA-1, SHA-256, SHA-384, dan SHA-512 online. Kalkulator hash cepat dan aman.' },
  th: { title: 'เครื่องมือสร้าง Hash ออนไลน์ (MD5, SHA-256, SHA-512) ฟรี', description: 'สร้างแฮช MD5, SHA-1, SHA-256, SHA-384 และ SHA-512 ออนไลน์ เครื่องคำนวณแฮชที่รวดเร็วและปลอดภัย' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/online-hash-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/online-hash-generator`])), 'x-default': `https://viadreams.cc/en/tools/online-hash-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
