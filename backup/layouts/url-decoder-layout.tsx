import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'URL Decoder - Decode URL-Encoded Text Online Free', description: 'Decode URL-encoded strings back to readable text instantly. Free online URL decoding tool with decodeURIComponent support. Handles %20, %2F, %3A and all percent-encoded characters.' },
  fr: { title: 'Decodeur URL - Decoder du Texte Encode en URL en Ligne', description: 'Decodez les chaines encodees en URL en texte lisible instantanement. Outil de decodage URL gratuit en ligne avec support decodeURIComponent.' },
  de: { title: 'URL Decoder - URL-kodierten Text Online Dekodieren', description: 'URL-kodierte Zeichenfolgen sofort in lesbaren Text dekodieren. Kostenloses Online-URL-Dekodierungstool mit decodeURIComponent-Unterstutzung.' },
  it: { title: 'Decodificatore URL - Decodifica Testo URL Online Gratis', description: 'Decodifica stringhe con codifica URL in testo leggibile istantaneamente. Strumento di decodifica URL online gratuito con supporto decodeURIComponent.' },
  es: { title: 'Decodificador URL - Decodificar Texto URL en Linea Gratis', description: 'Decodifica cadenas codificadas en URL a texto legible al instante. Herramienta de decodificacion URL gratuita en linea con soporte decodeURIComponent.' },
  pt: { title: 'Decodificador URL - Decodificar Texto URL Online Gratis', description: 'Decodifique strings codificadas em URL para texto legivel instantaneamente. Ferramenta de decodificacao URL online gratuita com suporte decodeURIComponent.' },
  nl: { title: 'URL Decoder - URL-gecodeerde Tekst Online Decoderen', description: 'Decodeer URL-gecodeerde strings direct naar leesbare tekst. Gratis online URL-decoderingstool met decodeURIComponent-ondersteuning.' },
  pl: { title: 'Dekoder URL - Dekoduj Tekst Zakodowany w URL Online', description: 'Dekoduj zakodowane ciagi URL do czytelnego tekstu natychmiast. Darmowe narzedzie do dekodowania URL online z obsluga decodeURIComponent.' },
  sv: { title: 'URL Decoder - Avkoda URL-kodad Text Online Gratis', description: 'Avkoda URL-kodade strangar till lasbar text direkt. Gratis online URL-avkodningsverktyg med decodeURIComponent-stod.' },
  no: { title: 'URL Decoder - Dekod URL-kodet Tekst Online Gratis', description: 'Dekod URL-kodede strenger til lesbar tekst umiddelbart. Gratis online URL-dekodingsverktoy med decodeURIComponent-stotte.' },
  zh: { title: 'URL 解码器 - 免费在线解码 URL 编码文本', description: '即时将 URL 编码字符串解码为可读文本。免费在线 URL 解码工具，支持 decodeURIComponent。处理 %20、%2F、%3A 及所有百分号编码字符。' },
  ja: { title: 'URL デコーダー - URL エンコード文字列を無料オンラインでデコード', description: 'URLエンコードされた文字列を読み取り可能なテキストに即座にデコード。decodeURIComponent対応の無料オンラインURLデコードツール。' },
  ko: { title: 'URL 디코더 - URL 인코딩된 텍스트 무료 온라인 디코딩', description: 'URL 인코딩된 문자열을 읽을 수 있는 텍스트로 즉시 디코딩하세요. decodeURIComponent 지원 무료 온라인 URL 디코딩 도구.' },
  id: { title: 'URL Decoder - Decode Teks URL-Encoded Online Gratis', description: 'Decode string URL-encoded menjadi teks yang dapat dibaca secara instan. Alat decoding URL online gratis dengan dukungan decodeURIComponent.' },
  th: { title: 'URL Decoder - ถอดรหัส URL ออนไลน์ฟรี', description: 'ถอดรหัสสตริงที่เข้ารหัส URL เป็นข้อความที่อ่านได้ทันที เครื่องมือถอดรหัส URL ออนไลน์ฟรีรองรับ decodeURIComponent' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const slug = 'url-decoder';
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
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
        ...Object.fromEntries(i18n.locales.map(l => [l, `https://viadreams.cc/${l}/tools/${slug}`])),
        'x-default': `https://viadreams.cc/en/tools/${slug}`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
