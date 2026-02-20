import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SHA-1 Hash Generator - Free Online SHA1 Calculator', description: 'Generate SHA-1 hashes from text instantly. Free online SHA1 hash generator and checksum calculator. Learn about SHA-1 usage in Git and its deprecation status.' },
  fr: { title: 'Generateur SHA-1 - Calculateur de Hachage SHA1 en Ligne', description: 'Generez des hachages SHA-1 a partir de texte instantanement. Generateur de hachage SHA1 gratuit en ligne et calculateur de somme de controle.' },
  de: { title: 'SHA-1 Hash Generator - Kostenloser Online SHA1 Rechner', description: 'Generieren Sie SHA-1-Hashes aus Text sofort. Kostenloser Online-SHA1-Hash-Generator und Prufsummenrechner.' },
  it: { title: 'Generatore Hash SHA-1 - Calcolatore SHA1 Online Gratuito', description: 'Genera hash SHA-1 dal testo istantaneamente. Generatore di hash SHA1 online gratuito e calcolatore di checksum.' },
  es: { title: 'Generador de Hash SHA-1 - Calculadora SHA1 en Linea Gratis', description: 'Genera hashes SHA-1 a partir de texto al instante. Generador de hash SHA1 en linea gratuito y calculadora de checksum.' },
  pt: { title: 'Gerador de Hash SHA-1 - Calculadora SHA1 Online Gratis', description: 'Gere hashes SHA-1 a partir de texto instantaneamente. Gerador de hash SHA1 online gratuito e calculadora de checksum.' },
  nl: { title: 'SHA-1 Hash Generator - Gratis Online SHA1 Calculator', description: 'Genereer SHA-1-hashes van tekst direct. Gratis online SHA1-hash-generator en checksum-calculator.' },
  pl: { title: 'Generator Hash SHA-1 - Darmowy Kalkulator SHA1 Online', description: 'Generuj hasze SHA-1 z tekstu natychmiast. Darmowy generator haszy SHA1 online i kalkulator sum kontrolnych.' },
  sv: { title: 'SHA-1 Hash Generator - Gratis SHA1 Checksumma Kalkylator Online', description: 'Generera SHA-1-hashar fran text direkt. Gratis online SHA1-hash-generator och checksumma-kalkylator.' },
  no: { title: 'SHA-1 Hash Generator - Gratis SHA1 Sjekksum Kalkulator Online', description: 'Generer SHA-1-hasher fra tekst umiddelbart. Gratis online SHA1-hash-generator og sjekksum-kalkulator.' },
  zh: { title: 'SHA-1 哈希生成器 - 免费在线 SHA1 计算器', description: '即时从文本生成 SHA-1 哈希值。免费在线 SHA1 哈希生成器和校验和计算器。了解 SHA-1 在 Git 中的使用及其弃用状态。' },
  ja: { title: 'SHA-1 ハッシュジェネレーター - 無料オンライン SHA1 計算機', description: 'テキストから SHA-1 ハッシュを即座に生成。無料オンライン SHA1 ハッシュジェネレーターとチェックサム計算機。' },
  ko: { title: 'SHA-1 해시 생성기 - 무료 온라인 SHA1 계산기', description: '텍스트에서 SHA-1 해시를 즉시 생성합니다. 무료 온라인 SHA1 해시 생성기 및 체크섬 계산기.' },
  id: { title: 'Generator Hash SHA-1 - Kalkulator Checksum SHA1 Online Gratis', description: 'Hasilkan hash SHA-1 dari teks secara instan. Generator hash SHA1 online gratis dan kalkulator checksum.' },
  th: { title: 'เครื่องมือสร้าง SHA-1 Hash - เครื่องคำนวณ SHA1 ออนไลน์ฟรี', description: 'สร้าง SHA-1 hash จากข้อความทันที เครื่องมือสร้าง SHA1 hash ออนไลน์ฟรีและเครื่องคำนวณ checksum' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/sha1-hash-generator`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/sha1-hash-generator`])
        ),
        'x-default': `https://viadreams.cc/en/tools/sha1-hash-generator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
