import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 to Hex Converter - Convert Base64 to Hexadecimal Online', description: 'Convert between Base64 and hexadecimal formats instantly. Free online Base64-to-Hex and Hex-to-Base64 converter. Bidirectional conversion in your browser.' },
  fr: { title: 'Convertisseur Base64 en Hex - Convertir Base64 en Hexadecimal', description: 'Convertissez entre Base64 et hexadecimal instantanement. Convertisseur gratuit Base64-Hex bidirectionnel en ligne.' },
  de: { title: 'Base64 zu Hex Konverter - Base64 in Hexadezimal Umwandeln', description: 'Konvertieren Sie sofort zwischen Base64 und Hexadezimalformaten. Kostenloser bidirektionaler Online-Base64-Hex-Konverter.' },
  it: { title: 'Convertitore Base64 in Hex - Converti Base64 in Esadecimale', description: 'Converti tra Base64 e formato esadecimale istantaneamente. Convertitore bidirezionale Base64-Hex online gratuito.' },
  es: { title: 'Convertidor Base64 a Hex - Convertir Base64 a Hexadecimal', description: 'Convierte entre Base64 y hexadecimal al instante. Convertidor bidireccional Base64-Hex gratuito en linea.' },
  pt: { title: 'Conversor Base64 para Hex - Converter Base64 em Hexadecimal', description: 'Converta entre Base64 e hexadecimal instantaneamente. Conversor bidirecional Base64-Hex online gratuito.' },
  nl: { title: 'Base64 naar Hex Converter - Base64 naar Hexadecimaal', description: 'Converteer direct tussen Base64 en hexadecimale formaten. Gratis online bidirectionele Base64-Hex-converter.' },
  pl: { title: 'Konwerter Base64 na Hex - Konwertuj Base64 na Szesnastkowy', description: 'Konwertuj miedzy Base64 a formatem szesnastkowym natychmiast. Darmowy dwukierunkowy konwerter Base64-Hex online.' },
  sv: { title: 'Base64 till Hex Konverterare - Konvertera Base64 till Hexadecimal', description: 'Konvertera mellan Base64 och hexadecimala format direkt. Gratis online dubbelriktad Base64-Hex-konverterare.' },
  no: { title: 'Base64 til Hex Konverter - Konverter Base64 til Heksadesimal', description: 'Konverter mellom Base64 og heksadesimale formater umiddelbart. Gratis online toveis Base64-Hex-konverter.' },
  zh: { title: 'Base64 转 Hex 转换器 - 在线 Base64 十六进制互转', description: '即时在 Base64 和十六进制格式之间转换。免费在线双向 Base64-Hex 转换器。所有处理在浏览器本地完成。' },
  ja: { title: 'Base64 Hex 変換 - Base64 と16進数のオンライン変換ツール', description: 'Base64 と16進数形式を即座に変換。無料オンライン双方向 Base64-Hex コンバーター。すべての処理はブラウザ内で完結。' },
  ko: { title: 'Base64 Hex 변환기 - Base64와 16진수 온라인 변환', description: 'Base64와 16진수 형식을 즉시 변환하세요. 무료 온라인 양방향 Base64-Hex 변환기. 모든 처리는 브라우저에서 이루어집니다.' },
  id: { title: 'Konverter Base64 ke Hex - Konversi Base64 ke Heksadesimal Online', description: 'Konversi antara Base64 dan format heksadesimal secara instan. Konverter dua arah Base64-Hex online gratis.' },
  th: { title: 'ตัวแปลง Base64 เป็น Hex - แปลง Base64 เป็นเลขฐานสิบหกออนไลน์', description: 'แปลงระหว่างรูปแบบ Base64 และเลขฐานสิบหกทันที เครื่องมือแปลง Base64-Hex สองทิศทางออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-to-hex`;
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-to-hex`])),
        'x-default': `https://viadreams.cc/en/tools/base64-to-hex`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
