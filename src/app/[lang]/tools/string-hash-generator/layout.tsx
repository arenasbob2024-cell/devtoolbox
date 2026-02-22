import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'String Hash Generator - MD5, SHA-1, SHA-256 Online Free', description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any string. Free online cryptographic hash generator using the Web Crypto API.' },
  fr: { title: 'Generateur de Hash de Chaine - MD5, SHA-1, SHA-256 Gratuit', description: 'Generez des hachages MD5, SHA-1, SHA-256 et SHA-512 a partir de n\'importe quelle chaine. Generateur de hash cryptographique gratuit en ligne.' },
  de: { title: 'String-Hash-Generator - MD5, SHA-1, SHA-256 Kostenlos Online', description: 'Erzeugen Sie MD5-, SHA-1-, SHA-256- und SHA-512-Hashes aus beliebigen Strings. Kostenloser kryptografischer Hash-Generator.' },
  it: { title: 'Generatore di Hash - MD5, SHA-1, SHA-256 Online Gratis', description: 'Genera hash MD5, SHA-1, SHA-256 e SHA-512 da qualsiasi stringa. Generatore di hash crittografico gratuito online.' },
  es: { title: 'Generador de Hash de Cadena - MD5, SHA-1, SHA-256 Gratis', description: 'Genera hashes MD5, SHA-1, SHA-256 y SHA-512 de cualquier cadena. Generador de hash criptografico gratuito en linea.' },
  pt: { title: 'Gerador de Hash de String - MD5, SHA-1, SHA-256 Gratis Online', description: 'Gere hashes MD5, SHA-1, SHA-256 e SHA-512 de qualquer string. Gerador de hash criptografico gratuito online.' },
  nl: { title: 'String Hash Generator - MD5, SHA-1, SHA-256 Gratis Online', description: 'Genereer MD5-, SHA-1-, SHA-256- en SHA-512-hashes van elke string. Gratis online cryptografische hashgenerator.' },
  pl: { title: 'Generator Hashu Ciagu - MD5, SHA-1, SHA-256 Darmowy Online', description: 'Generuj hasze MD5, SHA-1, SHA-256 i SHA-512 z dowolnego ciagu. Darmowy kryptograficzny generator hashy online.' },
  sv: { title: 'String Hash Generator - MD5, SHA-1, SHA-256 Gratis Online', description: 'Generera MD5-, SHA-1-, SHA-256- och SHA-512-hashar fran valfri strang. Gratis kryptografisk hashgenerator online.' },
  no: { title: 'String Hash Generator - MD5, SHA-1, SHA-256 Gratis Online', description: 'Generer MD5-, SHA-1-, SHA-256- og SHA-512-hasher fra enhver streng. Gratis kryptografisk hashgenerator pa nett.' },
  zh: { title: '字符串哈希生成器 - 在线免费生成 MD5、SHA-1、SHA-256', description: '在线从任意字符串生成 MD5、SHA-1、SHA-256 和 SHA-512 哈希值。免费的在线加密哈希生成工具，使用 Web Crypto API。' },
  ja: { title: '文字列ハッシュ生成器 - MD5、SHA-1、SHA-256 無料オンライン', description: '任意の文字列から MD5、SHA-1、SHA-256、SHA-512 ハッシュを生成します。Web Crypto API を使用した無料のオンライン暗号ハッシュジェネレーター。' },
  ko: { title: '문자열 해시 생성기 - MD5, SHA-1, SHA-256 무료 온라인', description: '임의의 문자열에서 MD5, SHA-1, SHA-256, SHA-512 해시를 생성합니다. Web Crypto API를 사용한 무료 온라인 암호화 해시 생성기.' },
  id: { title: 'Generator Hash String - MD5, SHA-1, SHA-256 Gratis Online', description: 'Buat hash MD5, SHA-1, SHA-256, dan SHA-512 dari string apa pun. Generator hash kriptografi gratis menggunakan Web Crypto API.' },
  th: { title: 'เครื่องมือสร้าง Hash - MD5, SHA-1, SHA-256 ฟรีออนไลน์', description: 'สร้าง hash MD5, SHA-1, SHA-256 และ SHA-512 จากข้อความใดก็ได้ เครื่องมือสร้าง hash แบบเข้ารหัสฟรีออนไลน์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/string-hash-generator`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['hash generator', 'MD5 hash', 'SHA-1 hash', 'SHA-256 hash', 'SHA-512 hash', 'string hash', 'checksum generator', 'crypto hash online'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image', title: `${t.title} | DevToolBox`,
      description: t.description, images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/string-hash-generator`])),
        'x-default': 'https://viadreams.cc/en/tools/string-hash-generator',
      },
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
