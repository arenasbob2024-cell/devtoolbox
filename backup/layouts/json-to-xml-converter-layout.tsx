import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON to XML Converter - Convert JSON to XML Online Free', description: 'Free online JSON to XML converter. Convert JSON to XML and XML to JSON instantly with customizable indentation and root element options. No server processing.' },
  fr: { title: 'Convertisseur JSON vers XML - Convertir JSON en XML en Ligne Gratuit', description: 'Convertisseur JSON vers XML en ligne gratuit. Convertissez JSON en XML et XML en JSON avec indentation et options d\'element racine personnalisables.' },
  de: { title: 'JSON zu XML Konverter - JSON in XML Online Kostenlos Konvertieren', description: 'Kostenloser Online JSON zu XML Konverter. Konvertieren Sie JSON in XML und XML in JSON mit anpassbarer Einrueckung und Wurzelelement-Optionen.' },
  it: { title: 'Convertitore JSON in XML - Converti JSON in XML Online Gratis', description: 'Convertitore JSON in XML online gratuito. Converti JSON in XML e XML in JSON con indentazione personalizzabile e opzioni elemento radice.' },
  es: { title: 'Convertidor JSON a XML - Convertir JSON a XML en Linea Gratis', description: 'Convertidor JSON a XML en linea gratuito. Convierte JSON a XML y XML a JSON con indentacion personalizable y opciones de elemento raiz.' },
  pt: { title: 'Conversor JSON para XML - Converter JSON em XML Online Gratis', description: 'Conversor JSON para XML online gratuito. Converta JSON para XML e XML para JSON com indentacao personalizavel e opcoes de elemento raiz.' },
  nl: { title: 'JSON naar XML Converter - Converteer JSON naar XML Online Gratis', description: 'Gratis online JSON naar XML converter. Converteer JSON naar XML en XML naar JSON met aanpasbare inspringing en root-element opties.' },
  pl: { title: 'Konwerter JSON na XML - Konwertuj JSON na XML Online Za Darmo', description: 'Darmowy konwerter JSON na XML online. Konwertuj JSON na XML i XML na JSON z dostosowywalnym wciecziem i opcjami elementu glownego.' },
  sv: { title: 'JSON till XML Konverterare - Konvertera JSON till XML Online Gratis', description: 'Gratis online JSON till XML konverterare. Konvertera JSON till XML och XML till JSON med anpassningsbar indragning och rotelement-alternativ.' },
  no: { title: 'JSON til XML Konverterer - Konverter JSON til XML Online Gratis', description: 'Gratis online JSON til XML konverterer. Konverter JSON til XML og XML til JSON med tilpassbar innrykk og rotelement-alternativer.' },
  zh: { title: 'JSON 转 XML 转换器 - 免费在线 JSON 转 XML 工具', description: '免费在线 JSON 转 XML 转换器。即时将 JSON 转换为 XML 或将 XML 转换为 JSON，支持自定义缩进和根元素选项。无需服务器处理。' },
  ja: { title: 'JSON to XML 変換ツール - 無料オンライン JSON XML 変換', description: '無料オンライン JSON to XML 変換ツール。JSON を XML に、XML を JSON に即座に変換。カスタムインデントとルート要素オプション付き。' },
  ko: { title: 'JSON to XML 변환기 - 무료 온라인 JSON XML 변환 도구', description: '무료 온라인 JSON to XML 변환기. JSON을 XML로, XML을 JSON으로 즉시 변환. 사용자 정의 들여쓰기 및 루트 요소 옵션.' },
  id: { title: 'Konverter JSON ke XML - Konversi JSON ke XML Online Gratis', description: 'Konverter JSON ke XML online gratis. Konversi JSON ke XML dan XML ke JSON secara instan dengan indentasi yang dapat disesuaikan dan opsi elemen root.' },
  th: { title: 'ตัวแปลง JSON เป็น XML - แปลง JSON เป็น XML ออนไลน์ฟรี', description: 'ตัวแปลง JSON เป็น XML ออนไลน์ฟรี แปลง JSON เป็น XML และ XML เป็น JSON ทันทีพร้อมการเยื้องที่ปรับแต่งได้และตัวเลือกอิลิเมนต์รูท' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-to-xml-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-to-xml-converter`])), 'x-default': `https://viadreams.cc/en/tools/json-to-xml-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
