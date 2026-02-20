import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'SHA-512 Hash Generator - Free Online SHA512 Calculator', description: 'Generate SHA-512 hashes from text instantly. Free online SHA512 hash generator. The strongest common SHA hash at 512 bits (128 hex characters).' },
  fr: { title: 'Generateur SHA-512 - Calculateur de Hachage SHA512 en Ligne', description: 'Generez des hachages SHA-512 a partir de texte instantanement. Le hachage SHA le plus puissant avec 512 bits (128 caracteres hexadecimaux).' },
  de: { title: 'SHA-512 Hash Generator - Kostenloser Online SHA512 Rechner', description: 'Generieren Sie SHA-512-Hashes aus Text sofort. Der starkste gangige SHA-Hash mit 512 Bit (128 Hex-Zeichen).' },
  it: { title: 'Generatore Hash SHA-512 - Calcolatore SHA512 Online Gratuito', description: 'Genera hash SHA-512 dal testo istantaneamente. L\'hash SHA piu forte con 512 bit (128 caratteri esadecimali).' },
  es: { title: 'Generador de Hash SHA-512 - Calculadora SHA512 en Linea Gratis', description: 'Genera hashes SHA-512 a partir de texto al instante. El hash SHA mas fuerte con 512 bits (128 caracteres hexadecimales).' },
  pt: { title: 'Gerador de Hash SHA-512 - Calculadora SHA512 Online Gratis', description: 'Gere hashes SHA-512 a partir de texto instantaneamente. O hash SHA mais forte com 512 bits (128 caracteres hexadecimais).' },
  nl: { title: 'SHA-512 Hash Generator - Gratis Online SHA512 Calculator', description: 'Genereer SHA-512-hashes van tekst direct. De sterkste gangbare SHA-hash met 512 bits (128 hex-tekens).' },
  pl: { title: 'Generator Hash SHA-512 - Darmowy Kalkulator SHA512 Online', description: 'Generuj hasze SHA-512 z tekstu natychmiast. Najsilniejszy popularny hash SHA z 512 bitami (128 znakow szesnastkowych).' },
  sv: { title: 'SHA-512 Hash Generator - Gratis SHA512 Kalkylator Online', description: 'Generera SHA-512-hashar fran text direkt. Den starkaste vanliga SHA-hashen med 512 bitar (128 hex-tecken).' },
  no: { title: 'SHA-512 Hash Generator - Gratis SHA512 Kalkulator Online', description: 'Generer SHA-512-hasher fra tekst umiddelbart. Den sterkeste vanlige SHA-hashen med 512 biter (128 hex-tegn).' },
  zh: { title: 'SHA-512 哈希生成器 - 免费在线 SHA512 计算器', description: '即时从文本生成 SHA-512 哈希值。免费在线 SHA512 哈希生成器。512 位 (128 个十六进制字符) 的最强通用 SHA 哈希。' },
  ja: { title: 'SHA-512 ハッシュジェネレーター - 無料オンライン SHA512 計算機', description: 'テキストから SHA-512 ハッシュを即座に生成。512ビット (128文字の16進数) の最も強力な一般的な SHA ハッシュ。' },
  ko: { title: 'SHA-512 해시 생성기 - 무료 온라인 SHA512 계산기', description: '텍스트에서 SHA-512 해시를 즉시 생성합니다. 512비트 (128개의 16진수 문자)의 가장 강력한 일반 SHA 해시.' },
  id: { title: 'Generator Hash SHA-512 - Kalkulator SHA512 Online Gratis', description: 'Hasilkan hash SHA-512 dari teks secara instan. Hash SHA terkuat dengan 512 bit (128 karakter heksadesimal).' },
  th: { title: 'เครื่องมือสร้าง SHA-512 Hash - เครื่องคำนวณ SHA512 ออนไลน์ฟรี', description: 'สร้าง SHA-512 hash จากข้อความทันที SHA hash ที่แข็งแกร่งที่สุด 512 บิต (128 ตัวอักษรฐานสิบหก)' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/sha512-hash-generator`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/sha512-hash-generator`])
        ),
        'x-default': `https://viadreams.cc/en/tools/sha512-hash-generator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
