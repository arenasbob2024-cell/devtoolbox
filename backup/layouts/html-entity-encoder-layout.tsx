import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTML Entity Encoder Decoder - Free Online Tool', description: 'Encode special characters to HTML entities or decode HTML entities to readable text. Supports named, numeric, and hexadecimal entities. Free online tool.' },
  fr: { title: 'Encodeur Decodeur Entites HTML Gratuit', description: 'Encodez les caracteres speciaux en entites HTML ou decodez les entites en texte lisible.' },
  de: { title: 'HTML Entity Encoder Decoder Kostenlos', description: 'Kodieren Sie Sonderzeichen in HTML-Entities oder dekodieren Sie Entities in lesbaren Text.' },
  it: { title: 'Codificatore Decodificatore Entita HTML Gratis', description: 'Codifica caratteri speciali in entita HTML o decodifica entita in testo leggibile.' },
  es: { title: 'Codificador Decodificador Entidades HTML Gratis', description: 'Codifique caracteres especiales a entidades HTML o decodifique entidades a texto legible.' },
  pt: { title: 'Codificador Decodificador Entidades HTML Gratis', description: 'Codifique caracteres especiais em entidades HTML ou decodifique entidades em texto legivel.' },
  nl: { title: 'HTML Entity Encoder Decoder Gratis', description: 'Codeer speciale tekens naar HTML-entities of decodeer entities naar leesbare tekst.' },
  pl: { title: 'Koder Dekoder Encji HTML Za Darmo', description: 'Koduj znaki specjalne do encji HTML lub dekoduj encje do czytelnego tekstu.' },
  sv: { title: 'HTML Entity Encoder Decoder Gratis', description: 'Koda specialtecken till HTML-entiteter eller avkoda entiteter till laesbar text.' },
  no: { title: 'HTML Entity Encoder Decoder Gratis', description: 'Kod spesialtegn til HTML-entiteter eller dekod entiteter til lesbar tekst.' },
  zh: { title: 'HTML 实体编码解码器 - 免费在线工具', description: '将特殊字符编码为 HTML 实体或将实体解码为可读文本。支持命名、数字和十六进制实体。' },
  ja: { title: 'HTML エンティティ エンコーダー デコーダー 無料', description: '特殊文字を HTML エンティティにエンコード、またはエンティティを読み取り可能なテキストにデコード。' },
  ko: { title: 'HTML 엔티티 인코더 디코더 무료', description: '특수 문자를 HTML 엔티티로 인코딩하거나 엔티티를 읽을 수 있는 텍스트로 디코딩합니다.' },
  id: { title: 'Encoder Decoder Entitas HTML Gratis', description: 'Encode karakter khusus ke entitas HTML atau decode entitas ke teks yang dapat dibaca.' },
  th: { title: 'ตัวเข้ารหัส ถอดรหัส HTML Entity ฟรี', description: 'เข้ารหัสอักขระพิเศษเป็น HTML entity หรือถอดรหัส entity เป็นข้อความที่อ่านได้' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/html-entity-encoder`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/html-entity-encoder`])), 'x-default': `https://viadreams.cc/en/tools/html-entity-encoder` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
