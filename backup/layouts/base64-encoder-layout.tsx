import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Encoder - Encode Text to Base64 Online Free', description: 'Encode text and strings to Base64 format instantly. Free online Base64 encoding tool with UTF-8 support. All processing in your browser, no data sent to server.' },
  fr: { title: 'Encodeur Base64 - Encoder du Texte en Base64 en Ligne', description: 'Encodez du texte en Base64 instantanement. Outil d\'encodage Base64 gratuit en ligne avec support UTF-8. Traitement entierement dans votre navigateur.' },
  de: { title: 'Base64 Encoder - Text Online in Base64 Kodieren', description: 'Text sofort in Base64 kodieren. Kostenloses Online-Base64-Encoding-Tool mit UTF-8-Unterstutzung. Alle Verarbeitung in Ihrem Browser.' },
  it: { title: 'Encoder Base64 - Codifica Testo in Base64 Online Gratis', description: 'Codifica testo in formato Base64 istantaneamente. Strumento di codifica Base64 online gratuito con supporto UTF-8. Elaborazione nel tuo browser.' },
  es: { title: 'Codificador Base64 - Codificar Texto a Base64 en Linea', description: 'Codifica texto a formato Base64 al instante. Herramienta de codificacion Base64 gratuita en linea con soporte UTF-8. Todo el procesamiento en tu navegador.' },
  pt: { title: 'Codificador Base64 - Codificar Texto em Base64 Online', description: 'Codifique texto em formato Base64 instantaneamente. Ferramenta de codificacao Base64 online gratuita com suporte UTF-8. Processamento no seu navegador.' },
  nl: { title: 'Base64 Encoder - Tekst Online naar Base64 Coderen', description: 'Codeer tekst direct naar Base64-formaat. Gratis online Base64-coderingstool met UTF-8-ondersteuning. Alle verwerking in uw browser.' },
  pl: { title: 'Enkoder Base64 - Koduj Tekst do Base64 Online', description: 'Koduj tekst do formatu Base64 natychmiast. Darmowe narzedzie kodowania Base64 online z obsluga UTF-8. Przetwarzanie w przegladarce.' },
  sv: { title: 'Base64 Encoder - Koda Text till Base64 Online Gratis', description: 'Koda text till Base64-format direkt. Gratis online Base64-kodningsverktyg med UTF-8-stod. All bearbetning i din webblasare.' },
  no: { title: 'Base64 Encoder - Kod Tekst til Base64 Online Gratis', description: 'Kod tekst til Base64-format umiddelbart. Gratis online Base64-kodingsverktoy med UTF-8-stotte. All prosessering i nettleseren din.' },
  zh: { title: 'Base64 编码器 - 免费在线文本转 Base64 工具', description: '即时将文本编码为 Base64 格式。免费在线 Base64 编码工具，支持 UTF-8。所有处理在浏览器本地完成，数据不会发送到服务器。' },
  ja: { title: 'Base64 エンコーダー - テキストを Base64 に無料オンラインエンコード', description: 'テキストを即座に Base64 形式にエンコード。UTF-8 対応の無料オンライン Base64 エンコーディングツール。すべての処理はブラウザ内で完結します。' },
  ko: { title: 'Base64 인코더 - 텍스트를 Base64로 무료 온라인 인코딩', description: '텍스트를 즉시 Base64 형식으로 인코딩하세요. UTF-8 지원 무료 온라인 Base64 인코딩 도구. 모든 처리는 브라우저에서 이루어집니다.' },
  id: { title: 'Base64 Encoder - Encode Teks ke Base64 Online Gratis', description: 'Encode teks ke format Base64 secara instan. Alat encoding Base64 online gratis dengan dukungan UTF-8. Semua pemrosesan di browser Anda.' },
  th: { title: 'Base64 Encoder - เข้ารหัสข้อความเป็น Base64 ออนไลน์ฟรี', description: 'เข้ารหัสข้อความเป็นรูปแบบ Base64 ทันที เครื่องมือเข้ารหัส Base64 ออนไลน์ฟรีพร้อมรองรับ UTF-8 ประมวลผลทั้งหมดในเบราว์เซอร์ของคุณ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-encoder`;
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-encoder`])),
        'x-default': `https://viadreams.cc/en/tools/base64-encoder`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
