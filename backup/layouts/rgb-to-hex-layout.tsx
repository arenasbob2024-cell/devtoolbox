import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'RGB to HEX Converter - Convert RGB to Hexadecimal Free', description: 'Free online RGB to HEX converter. Convert RGB color values to hexadecimal color codes with interactive sliders and live color preview.' },
  fr: { title: 'Convertisseur RGB vers HEX en Ligne Gratuit', description: 'Convertisseur RGB vers HEX gratuit en ligne. Convertissez les valeurs de couleur RGB en codes hexadecimaux avec des curseurs interactifs.' },
  de: { title: 'RGB zu HEX Konverter - RGB in Hexadezimal Umwandeln Kostenlos', description: 'Kostenloser Online RGB zu HEX Konverter. RGB-Farbwerte mit interaktiven Schiebereglern und Live-Vorschau in Hexadezimalcodes umwandeln.' },
  it: { title: 'Convertitore RGB a HEX Online Gratis', description: 'Convertitore RGB a HEX gratuito online. Converti i valori di colore RGB in codici esadecimali con cursori interattivi e anteprima dal vivo.' },
  es: { title: 'Convertidor RGB a HEX en Linea Gratis', description: 'Convertidor RGB a HEX gratuito en linea. Convierte valores de color RGB a codigos hexadecimales con controles deslizantes interactivos.' },
  pt: { title: 'Conversor RGB para HEX Online Gratis', description: 'Conversor RGB para HEX gratuito online. Converta valores de cor RGB para codigos hexadecimais com controles deslizantes interativos.' },
  nl: { title: 'RGB naar HEX Converter Online Gratis', description: 'Gratis online RGB naar HEX converter. Converteer RGB-kleurwaarden naar hexadecimale codes met interactieve schuifregelaars.' },
  pl: { title: 'Konwerter RGB na HEX Online Za Darmo', description: 'Darmowy konwerter RGB na HEX online. Konwertuj wartosci kolorow RGB na kody szesnastkowe z interaktywnymi suwakami.' },
  sv: { title: 'RGB till HEX Konverterare Online Gratis', description: 'Gratis online RGB till HEX konverterare. Konvertera RGB fargvarden till hexadecimala fargkoder med interaktiva reglage.' },
  no: { title: 'RGB til HEX Konverterer Online Gratis', description: 'Gratis online RGB til HEX konverterer. Konverter RGB fargeverdier til heksadesimale fargekoder med interaktive glidere.' },
  zh: { title: 'RGB 转 HEX 转换器 - 免费在线 RGB 转十六进制', description: '免费在线 RGB 转 HEX 工具。使用交互式滑块和实时颜色预览将 RGB 颜色值转换为十六进制颜色代码。' },
  ja: { title: 'RGB から HEX 変換ツール - 無料オンライン RGB to HEX', description: '無料オンライン RGB から HEX 変換ツール。インタラクティブスライダーとリアルタイムプレビューで RGB を16進数に変換。' },
  ko: { title: 'RGB에서 HEX 변환기 - 무료 온라인 RGB to HEX', description: '무료 온라인 RGB에서 HEX 변환기. 대화형 슬라이더와 실시간 색상 미리보기로 RGB 색상 값을 16진수 코드로 변환.' },
  id: { title: 'Konverter RGB ke HEX Online Gratis', description: 'Konverter RGB ke HEX online gratis. Konversikan nilai warna RGB ke kode heksadesimal dengan slider interaktif dan pratinjau warna langsung.' },
  th: { title: 'ตัวแปลง RGB เป็น HEX ออนไลน์ฟรี', description: 'เครื่องมือแปลง RGB เป็น HEX ออนไลน์ฟรี แปลงค่าสี RGB เป็นรหัสสีฐานสิบหกด้วยแถบเลื่อนแบบโต้ตอบ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/rgb-to-hex`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/rgb-to-hex`])), 'x-default': `https://viadreams.cc/en/tools/rgb-to-hex` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
