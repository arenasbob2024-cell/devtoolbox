import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'MD5 Hash Generator - Free Online MD5 Checksum Calculator', description: 'Generate MD5 hashes from text instantly. Free online MD5 hash generator and checksum calculator. Learn about MD5 security and compare with SHA alternatives.' },
  fr: { title: 'Generateur MD5 - Calculateur de Hachage MD5 en Ligne', description: 'Generez des hachages MD5 a partir de texte instantanement. Generateur de hachage MD5 gratuit en ligne et calculateur de somme de controle.' },
  de: { title: 'MD5 Hash Generator - Kostenloser Online MD5 Prufsummenrechner', description: 'Generieren Sie MD5-Hashes aus Text sofort. Kostenloser Online-MD5-Hash-Generator und Prufsummenrechner.' },
  it: { title: 'Generatore Hash MD5 - Calcolatore MD5 Online Gratuito', description: 'Genera hash MD5 dal testo istantaneamente. Generatore di hash MD5 online gratuito e calcolatore di checksum.' },
  es: { title: 'Generador de Hash MD5 - Calculadora MD5 en Linea Gratis', description: 'Genera hashes MD5 a partir de texto al instante. Generador de hash MD5 en linea gratuito y calculadora de checksum.' },
  pt: { title: 'Gerador de Hash MD5 - Calculadora MD5 Online Gratis', description: 'Gere hashes MD5 a partir de texto instantaneamente. Gerador de hash MD5 online gratuito e calculadora de checksum.' },
  nl: { title: 'MD5 Hash Generator - Gratis Online MD5 Checksum Calculator', description: 'Genereer MD5-hashes van tekst direct. Gratis online MD5-hash-generator en checksum-calculator.' },
  pl: { title: 'Generator Hash MD5 - Darmowy Kalkulator MD5 Online', description: 'Generuj hasze MD5 z tekstu natychmiast. Darmowy generator haszy MD5 online i kalkulator sum kontrolnych.' },
  sv: { title: 'MD5 Hash Generator - Gratis MD5 Checksumma Kalkylator Online', description: 'Generera MD5-hashar fran text direkt. Gratis online MD5-hash-generator och checksumma-kalkylator.' },
  no: { title: 'MD5 Hash Generator - Gratis MD5 Sjekksum Kalkulator Online', description: 'Generer MD5-hasher fra tekst umiddelbart. Gratis online MD5-hash-generator og sjekksum-kalkulator.' },
  zh: { title: 'MD5 哈希生成器 - 免费在线 MD5 校验和计算器', description: '即时从文本生成 MD5 哈希值。免费在线 MD5 哈希生成器和校验和计算器。了解 MD5 安全性并与 SHA 替代方案进行比较。' },
  ja: { title: 'MD5 ハッシュジェネレーター - 無料オンライン MD5 チェックサム計算機', description: 'テキストから MD5 ハッシュを即座に生成。無料オンライン MD5 ハッシュジェネレーターとチェックサム計算機。' },
  ko: { title: 'MD5 해시 생성기 - 무료 온라인 MD5 체크섬 계산기', description: '텍스트에서 MD5 해시를 즉시 생성합니다. 무료 온라인 MD5 해시 생성기 및 체크섬 계산기.' },
  id: { title: 'Generator Hash MD5 - Kalkulator Checksum MD5 Online Gratis', description: 'Hasilkan hash MD5 dari teks secara instan. Generator hash MD5 online gratis dan kalkulator checksum.' },
  th: { title: 'เครื่องมือสร้าง MD5 Hash - เครื่องคำนวณ MD5 Checksum ออนไลน์ฟรี', description: 'สร้าง MD5 hash จากข้อความทันที เครื่องมือสร้าง MD5 hash ออนไลน์ฟรีและเครื่องคำนวณ checksum' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/md5-hash-generator`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/md5-hash-generator`])
        ),
        'x-default': `https://viadreams.cc/en/tools/md5-hash-generator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
