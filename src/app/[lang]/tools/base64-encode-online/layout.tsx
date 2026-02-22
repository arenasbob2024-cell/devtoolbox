import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Encode Online - Free Base64 Encoder Tool', description: 'Encode text, files, and data to Base64 online for free. Supports UTF-8, ASCII, URL-safe Base64, and file encoding with instant output and copy.' },
  fr: { title: 'Encodeur Base64 en Ligne Gratuit', description: 'Encodez du texte et des fichiers en Base64 en ligne gratuitement. Supporte UTF-8, ASCII et Base64 URL-safe.' },
  de: { title: 'Base64 Online Encoder - Kostenloses Tool', description: 'Text und Dateien kostenlos online in Base64 kodieren. Unterstuetzt UTF-8, ASCII und URL-sicheres Base64.' },
  it: { title: 'Codificatore Base64 Online Gratuito', description: 'Codifica testo e file in Base64 online gratuitamente. Supporta UTF-8, ASCII e Base64 URL-safe.' },
  es: { title: 'Codificador Base64 en Linea Gratis', description: 'Codifique texto y archivos a Base64 en linea gratis. Soporta UTF-8, ASCII y Base64 seguro para URL.' },
  pt: { title: 'Codificador Base64 Online Gratis', description: 'Codifique texto e arquivos para Base64 online gratuitamente. Suporta UTF-8, ASCII e Base64 seguro para URL.' },
  nl: { title: 'Base64 Online Encoder - Gratis Tool', description: 'Codeer tekst en bestanden naar Base64 online gratis. Ondersteunt UTF-8, ASCII en URL-veilig Base64.' },
  pl: { title: 'Koder Base64 Online Za Darmo', description: 'Koduj tekst i pliki do Base64 online za darmo. Obsluguje UTF-8, ASCII i Base64 bezpieczny dla URL.' },
  sv: { title: 'Base64 Online Kodare - Gratis Verktyg', description: 'Koda text och filer till Base64 online gratis. Stoeder UTF-8, ASCII och URL-saeker Base64.' },
  no: { title: 'Base64 Online Koder - Gratis Verktoy', description: 'Kod tekst og filer til Base64 online gratis. Stoetter UTF-8, ASCII og URL-sikker Base64.' },
  zh: { title: 'Base64 在线编码器 - 免费工具', description: '免费在线将文本和文件编码为 Base64。支持 UTF-8、ASCII、URL 安全 Base64 和文件编码。' },
  ja: { title: 'Base64 オンラインエンコーダー - 無料ツール', description: 'テキストやファイルを無料でオンラインで Base64 にエンコード。UTF-8、ASCII、URL セーフ Base64 をサポート。' },
  ko: { title: 'Base64 온라인 인코더 - 무료 도구', description: '텍스트와 파일을 무료로 온라인에서 Base64로 인코딩. UTF-8, ASCII, URL 안전 Base64 지원.' },
  id: { title: 'Encoder Base64 Online Gratis', description: 'Encode teks dan file ke Base64 online gratis. Mendukung UTF-8, ASCII, dan Base64 yang aman untuk URL.' },
  th: { title: 'เข้ารหัส Base64 ออนไลน์ฟรี', description: 'เข้ารหัสข้อความและไฟล์เป็น Base64 ออนไลน์ฟรี รองรับ UTF-8, ASCII และ Base64 ที่ปลอดภัยสำหรับ URL' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-encode-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-encode-online`])), 'x-default': `https://viadreams.cc/en/tools/base64-encode-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
