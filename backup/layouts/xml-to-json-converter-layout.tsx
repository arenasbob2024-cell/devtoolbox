import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'XML to JSON Converter Online - Convert XML to JSON & JSON to XML Free', description: 'Free online XML to JSON converter and JSON to XML converter. Bidirectional conversion with attribute handling, pretty printing, and instant output. Supports complex XML structures.' },
  fr: { title: 'Convertisseur XML vers JSON et JSON vers XML en Ligne Gratuit', description: 'Convertisseur bidirectionnel XML vers JSON et JSON vers XML gratuit en ligne. Gestion des attributs, affichage formate et sortie instantanee.' },
  de: { title: 'XML zu JSON Konverter Online - XML & JSON Konvertierung Kostenlos', description: 'Kostenloser Online XML zu JSON und JSON zu XML Konverter. Bidirektionale Konvertierung mit Attributbehandlung und sofortiger Ausgabe.' },
  it: { title: 'Convertitore XML a JSON e JSON a XML Online Gratis', description: 'Convertitore bidirezionale XML a JSON e JSON a XML gratuito online. Gestione attributi, stampa formattata e output istantaneo.' },
  es: { title: 'Convertidor XML a JSON y JSON a XML en Linea Gratis', description: 'Convertidor bidireccional XML a JSON y JSON a XML gratuito en linea. Manejo de atributos, formato legible y salida instantanea.' },
  pt: { title: 'Conversor XML para JSON e JSON para XML Online Gratis', description: 'Conversor bidirecional XML para JSON e JSON para XML gratuito online. Tratamento de atributos, impressao formatada e saida instantanea.' },
  nl: { title: 'XML naar JSON Converter en JSON naar XML Online Gratis', description: 'Gratis online bidirectionele XML naar JSON en JSON naar XML converter. Attribuutverwerking, mooie opmaak en directe uitvoer.' },
  pl: { title: 'Konwerter XML na JSON i JSON na XML Online Za Darmo', description: 'Darmowy dwukierunkowy konwerter XML na JSON i JSON na XML online. Obsluga atrybutow, formatowanie i natychmiastowy wynik.' },
  sv: { title: 'XML till JSON Konverterare Online Gratis', description: 'Gratis online dubbelriktad XML till JSON och JSON till XML konverterare. Attributhantering, snygg utskrift och direkt utdata.' },
  no: { title: 'XML til JSON Konverterer Online Gratis', description: 'Gratis online toveis XML til JSON og JSON til XML konverterer. Attributthandtering, pen utskrift og umiddelbar utdata.' },
  zh: { title: 'XML 转 JSON 转换器 - 免费在线 XML 与 JSON 互转工具', description: '免费在线 XML 转 JSON 和 JSON 转 XML 双向转换工具。支持属性处理、格式化输出和即时转换。支持复杂 XML 结构。' },
  ja: { title: 'XML JSON 変換ツール - 無料オンライン XML と JSON の相互変換', description: '無料オンライン XML から JSON および JSON から XML への双方向変換ツール。属性処理、整形出力、即座の変換をサポート。' },
  ko: { title: 'XML JSON 변환기 - 무료 온라인 XML과 JSON 상호 변환', description: '무료 온라인 XML에서 JSON 및 JSON에서 XML 양방향 변환기. 속성 처리, 포맷 출력 및 즉시 변환 지원.' },
  id: { title: 'Konverter XML ke JSON dan JSON ke XML Online Gratis', description: 'Konverter dua arah XML ke JSON dan JSON ke XML online gratis. Penanganan atribut, pencetakan rapi, dan output instan.' },
  th: { title: 'ตัวแปลง XML เป็น JSON และ JSON เป็น XML ออนไลน์ฟรี', description: 'เครื่องมือแปลง XML เป็น JSON และ JSON เป็น XML แบบสองทิศทางออนไลน์ฟรี รองรับการจัดการแอตทริบิวต์ การจัดรูปแบบ และผลลัพธ์ทันที' },
};

const slug = 'xml-to-json-converter';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['xml to json', 'json to xml', 'xml converter', 'xml parser', 'json converter online', 'xml to json online', 'convert xml', 'xml json converter'],
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])),
        'x-default': `https://viadreams.cc/en/tools/${slug}`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
