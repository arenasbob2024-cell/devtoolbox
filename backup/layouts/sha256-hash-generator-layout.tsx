import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SHA-256 Hash Generator - Free Online SHA256 Calculator', description: 'Generate SHA-256 hashes from text instantly. Free online SHA256 hash generator used in Bitcoin, TLS, and Git. Secure cryptographic hash calculator.' },
  fr: { title: 'Generateur SHA-256 - Calculateur de Hachage SHA256 en Ligne', description: 'Generez des hachages SHA-256 a partir de texte instantanement. Generateur de hachage SHA256 gratuit utilise dans Bitcoin, TLS et Git.' },
  de: { title: 'SHA-256 Hash Generator - Kostenloser Online SHA256 Rechner', description: 'Generieren Sie SHA-256-Hashes aus Text sofort. Kostenloser Online-SHA256-Hash-Generator, verwendet in Bitcoin, TLS und Git.' },
  it: { title: 'Generatore Hash SHA-256 - Calcolatore SHA256 Online Gratuito', description: 'Genera hash SHA-256 dal testo istantaneamente. Generatore di hash SHA256 online gratuito usato in Bitcoin, TLS e Git.' },
  es: { title: 'Generador de Hash SHA-256 - Calculadora SHA256 en Linea Gratis', description: 'Genera hashes SHA-256 a partir de texto al instante. Generador de hash SHA256 en linea gratuito usado en Bitcoin, TLS y Git.' },
  pt: { title: 'Gerador de Hash SHA-256 - Calculadora SHA256 Online Gratis', description: 'Gere hashes SHA-256 a partir de texto instantaneamente. Gerador de hash SHA256 online gratuito usado em Bitcoin, TLS e Git.' },
  nl: { title: 'SHA-256 Hash Generator - Gratis Online SHA256 Calculator', description: 'Genereer SHA-256-hashes van tekst direct. Gratis online SHA256-hash-generator gebruikt in Bitcoin, TLS en Git.' },
  pl: { title: 'Generator Hash SHA-256 - Darmowy Kalkulator SHA256 Online', description: 'Generuj hasze SHA-256 z tekstu natychmiast. Darmowy generator haszy SHA256 online uzywany w Bitcoin, TLS i Git.' },
  sv: { title: 'SHA-256 Hash Generator - Gratis SHA256 Kalkylator Online', description: 'Generera SHA-256-hashar fran text direkt. Gratis online SHA256-hash-generator anvands i Bitcoin, TLS och Git.' },
  no: { title: 'SHA-256 Hash Generator - Gratis SHA256 Kalkulator Online', description: 'Generer SHA-256-hasher fra tekst umiddelbart. Gratis online SHA256-hash-generator brukt i Bitcoin, TLS og Git.' },
  zh: { title: 'SHA-256 哈希生成器 - 免费在线 SHA256 计算器', description: '即时从文本生成 SHA-256 哈希值。免费在线 SHA256 哈希生成器，广泛用于比特币、TLS 和 Git。安全加密哈希计算器。' },
  ja: { title: 'SHA-256 ハッシュジェネレーター - 無料オンライン SHA256 計算機', description: 'テキストから SHA-256 ハッシュを即座に生成。Bitcoin、TLS、Git で使用される無料オンライン SHA256 ハッシュジェネレーター。' },
  ko: { title: 'SHA-256 해시 생성기 - 무료 온라인 SHA256 계산기', description: '텍스트에서 SHA-256 해시를 즉시 생성합니다. 비트코인, TLS, Git에서 사용되는 무료 온라인 SHA256 해시 생성기.' },
  id: { title: 'Generator Hash SHA-256 - Kalkulator SHA256 Online Gratis', description: 'Hasilkan hash SHA-256 dari teks secara instan. Generator hash SHA256 online gratis digunakan di Bitcoin, TLS, dan Git.' },
  th: { title: 'เครื่องมือสร้าง SHA-256 Hash - เครื่องคำนวณ SHA256 ออนไลน์ฟรี', description: 'สร้าง SHA-256 hash จากข้อความทันที เครื่องมือสร้าง SHA256 hash ออนไลน์ฟรี ใช้ใน Bitcoin, TLS และ Git' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/sha256-hash-generator`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/sha256-hash-generator`])
        ),
        'x-default': `https://viadreams.cc/en/tools/sha256-hash-generator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
