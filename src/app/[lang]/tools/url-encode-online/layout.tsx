import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'URL Encode Online - Free URL Encoding Tool', description: 'Encode text for safe URL use with encodeURIComponent and encodeURI. Free online URL encoding tool with real-time encoding, character count, and mode comparison.' },
  fr: { title: 'Encodage URL en Ligne - Outil d\'Encodage URL Gratuit', description: 'Encodez du texte pour une utilisation sure dans les URL avec encodeURIComponent et encodeURI. Outil d\'encodage URL gratuit en ligne avec encodage en temps reel.' },
  de: { title: 'URL Online Kodieren - Kostenloses URL-Kodierungstool', description: 'Text fur sichere URL-Verwendung kodieren mit encodeURIComponent und encodeURI. Kostenloses Online-URL-Kodierungstool mit Echtzeit-Kodierung.' },
  it: { title: 'Codifica URL Online - Strumento di Codifica URL Gratuito', description: 'Codifica testo per un uso sicuro negli URL con encodeURIComponent e encodeURI. Strumento di codifica URL online gratuito con codifica in tempo reale.' },
  es: { title: 'Codificar URL Online - Herramienta de Codificacion URL Gratis', description: 'Codifica texto para uso seguro en URLs con encodeURIComponent y encodeURI. Herramienta de codificacion URL gratuita con codificacion en tiempo real.' },
  pt: { title: 'Codificar URL Online - Ferramenta de Codificacao URL Gratis', description: 'Codifique texto para uso seguro em URLs com encodeURIComponent e encodeURI. Ferramenta de codificacao URL online gratuita com codificacao em tempo real.' },
  nl: { title: 'URL Online Coderen - Gratis URL-Coderingstool', description: 'Codeer tekst voor veilig URL-gebruik met encodeURIComponent en encodeURI. Gratis online URL-coderingstool met realtime codering.' },
  pl: { title: 'Kodowanie URL Online - Darmowe Narzedzie do Kodowania URL', description: 'Koduj tekst do bezpiecznego uzycia w URL za pomoca encodeURIComponent i encodeURI. Darmowe narzedzie do kodowania URL online z kodowaniem w czasie rzeczywistym.' },
  sv: { title: 'URL-kodning Online - Gratis URL-kodningsverktyg', description: 'Koda text for saker URL-anvandning med encodeURIComponent och encodeURI. Gratis online URL-kodningsverktyg med realtidskodning.' },
  no: { title: 'URL-koding Online - Gratis URL-kodingsverktoy', description: 'Kod tekst for sikker URL-bruk med encodeURIComponent og encodeURI. Gratis online URL-kodingsverktoy med sanntidskoding.' },
  zh: { title: 'URL 在线编码 - 免费 URL 编码工具', description: '使用 encodeURIComponent 和 encodeURI 将文本编码为安全的 URL 格式。免费在线 URL 编码工具，支持实时编码、字符计数和模式对比。' },
  ja: { title: 'URL オンラインエンコード - 無料 URL エンコーディングツール', description: 'encodeURIComponentとencodeURIでテキストを安全なURL用にエンコード。リアルタイムエンコーディング対応の無料オンラインURLエンコードツール。' },
  ko: { title: 'URL 온라인 인코딩 - 무료 URL 인코딩 도구', description: 'encodeURIComponent와 encodeURI로 텍스트를 안전한 URL용으로 인코딩하세요. 실시간 인코딩을 지원하는 무료 온라인 URL 인코딩 도구.' },
  id: { title: 'URL Encode Online - Alat Encoding URL Gratis', description: 'Encode teks untuk penggunaan URL yang aman dengan encodeURIComponent dan encodeURI. Alat encoding URL online gratis dengan encoding real-time.' },
  th: { title: 'เข้ารหัส URL ออนไลน์ - เครื่องมือเข้ารหัส URL ฟรี', description: 'เข้ารหัสข้อความสำหรับการใช้งาน URL อย่างปลอดภัยด้วย encodeURIComponent และ encodeURI เครื่องมือเข้ารหัส URL ออนไลน์ฟรีพร้อมการเข้ารหัสแบบเรียลไทม์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const slug = 'url-encode-online';
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
