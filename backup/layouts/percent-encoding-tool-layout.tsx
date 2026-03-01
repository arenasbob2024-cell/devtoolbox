import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Percent Encoding Tool - RFC 3986 URL Encoding Reference', description: 'Complete percent encoding tool and RFC 3986 reference. Convert characters to percent-encoded form, view character-by-character breakdown, and explore reserved vs unreserved character sets.' },
  fr: { title: 'Outil d\'Encodage Pourcent - Reference RFC 3986', description: 'Outil complet d\'encodage pourcent et reference RFC 3986. Convertissez les caracteres en forme encodee, visualisez la decomposition caractere par caractere.' },
  de: { title: 'Prozent-Encoding Tool - RFC 3986 URL-Kodierung Referenz', description: 'Vollstandiges Prozent-Encoding-Tool und RFC 3986-Referenz. Zeichen in prozentkodierte Form konvertieren und Zeichen-fur-Zeichen-Aufschlusselung ansehen.' },
  it: { title: 'Strumento Percent Encoding - Riferimento RFC 3986', description: 'Strumento completo di percent encoding e riferimento RFC 3986. Converti caratteri in forma percent-encoded e visualizza la scomposizione carattere per carattere.' },
  es: { title: 'Herramienta Percent Encoding - Referencia RFC 3986', description: 'Herramienta completa de percent encoding y referencia RFC 3986. Convierte caracteres a forma percent-encoded y visualiza el desglose caracter por caracter.' },
  pt: { title: 'Ferramenta Percent Encoding - Referencia RFC 3986', description: 'Ferramenta completa de percent encoding e referencia RFC 3986. Converta caracteres para forma percent-encoded e visualize a decomposicao caractere por caractere.' },
  nl: { title: 'Percent Encoding Tool - RFC 3986 Referentie', description: 'Compleet percent encoding tool en RFC 3986 referentie. Converteer tekens naar percent-encoded vorm en bekijk teken-voor-teken uitsplitsing.' },
  pl: { title: 'Narzedzie Percent Encoding - Referencja RFC 3986', description: 'Kompletne narzedzie percent encoding i referencja RFC 3986. Konwertuj znaki do formy percent-encoded i wyswietl rozklad znak po znaku.' },
  sv: { title: 'Percent Encoding Verktyg - RFC 3986 Referens', description: 'Komplett percent encoding-verktyg och RFC 3986-referens. Konvertera tecken till procentkodad form och visa tecken-for-tecken-nedbrytning.' },
  no: { title: 'Percent Encoding Verktoy - RFC 3986 Referanse', description: 'Komplett percent encoding-verktoy og RFC 3986-referanse. Konverter tegn til prosentkodad form og vis tegn-for-tegn-nedbryting.' },
  zh: { title: '百分号编码工具 - RFC 3986 URL 编码参考', description: '完整的百分号编码工具和 RFC 3986 参考。将字符转换为百分号编码形式，查看逐字符分解，探索保留字符和非保留字符集。' },
  ja: { title: 'パーセントエンコーディングツール - RFC 3986 URL エンコーディング参照', description: '完全なパーセントエンコーディングツールとRFC 3986リファレンス。文字をパーセントエンコード形式に変換し、文字ごとの分解を表示します。' },
  ko: { title: '퍼센트 인코딩 도구 - RFC 3986 URL 인코딩 레퍼런스', description: '완전한 퍼센트 인코딩 도구와 RFC 3986 레퍼런스. 문자를 퍼센트 인코딩 형식으로 변환하고 문자별 분석을 확인하세요.' },
  id: { title: 'Percent Encoding Tool - Referensi RFC 3986', description: 'Alat percent encoding lengkap dan referensi RFC 3986. Konversi karakter ke bentuk percent-encoded dan lihat breakdown karakter per karakter.' },
  th: { title: 'เครื่องมือ Percent Encoding - อ้างอิง RFC 3986', description: 'เครื่องมือ percent encoding ที่สมบูรณ์และอ้างอิง RFC 3986 แปลงอักขระเป็นรูปแบบ percent-encoded และดูการแยกอักขระทีละตัว' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const slug = 'percent-encoding-tool';
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
