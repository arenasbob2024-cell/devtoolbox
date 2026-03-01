import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Text to Binary Converter Online - Free Tool', description: 'Convert text to binary and binary to text online. Supports ASCII, UTF-8 encoding with space-separated binary output.' },
  fr: { title: 'Convertisseur Texte en Binaire en Ligne Gratuit', description: 'Convertissez texte en binaire et binaire en texte en ligne. Supporte ASCII et UTF-8.' },
  de: { title: 'Text zu Binaer Konverter Online Kostenlos', description: 'Text in Binaer und Binaer in Text online umwandeln. Unterstuetzt ASCII und UTF-8 Kodierung.' },
  it: { title: 'Convertitore Testo in Binario Online Gratis', description: 'Converti testo in binario e binario in testo online. Supporta codifica ASCII e UTF-8.' },
  es: { title: 'Convertidor Texto a Binario en Linea Gratis', description: 'Convierta texto a binario y binario a texto en linea. Soporta codificacion ASCII y UTF-8.' },
  pt: { title: 'Conversor Texto para Binario Online Gratis', description: 'Converta texto para binario e binario para texto online. Suporta codificacao ASCII e UTF-8.' },
  nl: { title: 'Tekst naar Binair Converter Online Gratis', description: 'Converteer tekst naar binair en binair naar tekst online. Ondersteunt ASCII en UTF-8 codering.' },
  pl: { title: 'Konwerter Tekstu na System Binarny Online Za Darmo', description: 'Konwertuj tekst na system binarny i binarny na tekst online. Obsluguje kodowanie ASCII i UTF-8.' },
  sv: { title: 'Text till Binaer Konverterare Online Gratis', description: 'Konvertera text till binaert och binaert till text online. Stoeder ASCII och UTF-8 kodning.' },
  no: { title: 'Tekst til Binaer Konverterer Online Gratis', description: 'Konverter tekst til binaert og binaert til tekst online. Stoetter ASCII og UTF-8 koding.' },
  zh: { title: '文本转二进制在线转换器 - 免费工具', description: '在线将文本转换为二进制，将二进制转换为文本。支持 ASCII 和 UTF-8 编码。' },
  ja: { title: 'テキストからバイナリ コンバーター オンライン 無料', description: 'テキストをバイナリに、バイナリをテキストにオンラインで変換。ASCII と UTF-8 エンコーディングをサポート。' },
  ko: { title: '텍스트 to 바이너리 변환기 온라인 무료', description: '텍스트를 바이너리로, 바이너리를 텍스트로 온라인에서 변환. ASCII 및 UTF-8 인코딩을 지원합니다.' },
  id: { title: 'Konverter Teks ke Biner Online Gratis', description: 'Konversi teks ke biner dan biner ke teks online. Mendukung encoding ASCII dan UTF-8.' },
  th: { title: 'แปลงข้อความเป็นไบนารี ออนไลน์ฟรี', description: 'แปลงข้อความเป็นไบนารีและไบนารีเป็นข้อความออนไลน์ รองรับ ASCII และ UTF-8' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/text-to-binary`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/text-to-binary`])), 'x-default': `https://viadreams.cc/en/tools/text-to-binary` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
