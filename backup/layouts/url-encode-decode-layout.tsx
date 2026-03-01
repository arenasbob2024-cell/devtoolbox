import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'URL Encode Decode Online - Free URL Encoder Decoder Tool', description: 'Encode and decode URLs online for free. Handle special characters, query parameters, and Unicode in URLs with this browser-based tool.' },
  zh: { title: 'URL 编码解码 - 免费在线 URL 编码器解码器', description: '免费在线编码和解码 URL。处理 URL 中的特殊字符、查询参数和 Unicode。' },
  ja: { title: 'URL エンコード デコード オンライン - 無料 URL 変換ツール', description: 'URL をオンラインで無料エンコード・デコード。特殊文字と Unicode 対応。' },
  ko: { title: 'URL 인코딩 디코딩 온라인 - 무료 URL 인코더 디코더', description: 'URL을 온라인에서 무료로 인코딩 및 디코딩하세요.' },
  fr: { title: 'URL Encode Decode en Ligne - Encodeur Decodeur URL Gratuit', description: 'Encodez et decodez les URL en ligne gratuitement.' },
  de: { title: 'URL Encode Decode Online - Kostenloser URL Encoder Decoder', description: 'URLs online kostenlos kodieren und dekodieren.' },
  es: { title: 'URL Encode Decode Online - Codificador Decodificador URL Gratis', description: 'Codifica y decodifica URLs en linea gratis.' },
  pt: { title: 'URL Encode Decode Online - Codificador Decodificador URL Gratis', description: 'Codifique e decodifique URLs online gratuitamente.' },
  it: { title: 'URL Encode Decode Online - Codificatore Decodificatore URL Gratis', description: 'Codifica e decodifica URL online gratuitamente.' },
  nl: { title: 'URL Encode Decode Online - Gratis URL Encoder Decoder', description: 'Codeer en decodeer URLs online gratis.' },
  pl: { title: 'URL Encode Decode Online - Darmowy Enkoder Dekoder URL', description: 'Koduj i dekoduj URL-e online za darmo.' },
  sv: { title: 'URL Encode Decode Online - Gratis URL Encoder Decoder', description: 'Koda och avkoda URL:er online gratis.' },
  no: { title: 'URL Encode Decode Online - Gratis URL Encoder Decoder', description: 'Kod og dekod URL-er online gratis.' },
  id: { title: 'URL Encode Decode Online - Encoder Decoder URL Gratis', description: 'Encode dan decode URL secara online gratis.' },
  th: { title: 'URL Encode Decode ออนไลน์ - เครื่องมือเข้ารหัสถอดรหัส URL ฟรี', description: 'เข้ารหัสและถอดรหัส URL ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/url-encode-decode`;
  return {
    title: t.title, description: t.description,
    keywords: ['url encode', 'url decode', 'url encoder decoder', 'percent encoding', 'url encode online', 'urlencode'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/url-encode-decode`])), 'x-default': 'https://viadreams.cc/en/tools/url-encode-decode' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
