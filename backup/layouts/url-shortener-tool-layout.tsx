import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'URL Encoder Decoder Online - Free URL Encoding Tool', description: 'Encode and decode URLs online for free. Convert special characters to percent-encoded format and decode URL-encoded strings. Supports UTF-8 and all URI components.' },
  fr: { title: 'Encodeur Decodeur URL en Ligne Gratuit', description: 'Encodez et decodez les URLs en ligne gratuitement. Convertissez les caracteres speciaux en format encode par pourcentage.' },
  de: { title: 'URL Encoder Decoder Online Kostenlos', description: 'URLs kostenlos online kodieren und dekodieren. Sonderzeichen in prozent-kodiertes Format konvertieren.' },
  it: { title: 'Codificatore Decodificatore URL Online Gratis', description: 'Codifica e decodifica URL online gratuitamente. Converti caratteri speciali in formato codificato percentuale.' },
  es: { title: 'Codificador Decodificador URL en Linea Gratis', description: 'Codifique y decodifique URLs en linea gratis. Convierta caracteres especiales a formato codificado por porcentaje.' },
  pt: { title: 'Codificador Decodificador URL Online Gratis', description: 'Codifique e decodifique URLs online gratuitamente. Converta caracteres especiais para formato codificado por porcentagem.' },
  nl: { title: 'URL Encoder Decoder Online Gratis', description: 'URLs online gratis coderen en decoderen. Speciale tekens converteren naar procent-gecodeerd formaat.' },
  pl: { title: 'Koder Dekoder URL Online Za Darmo', description: 'Koduj i dekoduj adresy URL online za darmo. Konwertuj znaki specjalne na format kodowany procentowo.' },
  sv: { title: 'URL Encoder Decoder Online Gratis', description: 'Koda och avkoda URL:er online gratis. Konvertera specialtecken till procentkodat format.' },
  no: { title: 'URL Encoder Decoder Online Gratis', description: 'Kod og dekod URL-er online gratis. Konverter spesialtegn til prosentkodert format.' },
  zh: { title: 'URL 编码解码器在线 - 免费工具', description: '免费在线编码和解码 URL。将特殊字符转换为百分号编码格式，支持 UTF-8 和所有 URI 组件。' },
  ja: { title: 'URL エンコーダー デコーダー オンライン 無料', description: 'URL を無料でオンラインでエンコード・デコード。特殊文字をパーセントエンコード形式に変換。UTF-8 対応。' },
  ko: { title: 'URL 인코더 디코더 온라인 무료', description: 'URL을 무료로 온라인에서 인코딩 및 디코딩. 특수 문자를 퍼센트 인코딩 형식으로 변환. UTF-8 지원.' },
  id: { title: 'Encoder Decoder URL Online Gratis', description: 'Encode dan decode URL online gratis. Konversi karakter khusus ke format persen-encoded.' },
  th: { title: 'เข้ารหัสถอดรหัส URL ออนไลน์ฟรี', description: 'เข้ารหัสและถอดรหัส URL ออนไลน์ฟรี แปลงอักขระพิเศษเป็นรูปแบบเปอร์เซ็นต์เข้ารหัส รองรับ UTF-8' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/url-shortener-tool`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/url-shortener-tool`])), 'x-default': `https://viadreams.cc/en/tools/url-shortener-tool` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
