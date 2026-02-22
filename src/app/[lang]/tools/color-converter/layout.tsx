import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Color Converter - HEX to RGB, HSL, CMYK Online Free', description: 'Free online color converter. Convert between HEX, RGB, HSL, and CMYK color formats with live preview and color picker. Hex to RGB, RGB to HEX instant conversion.' },
  fr: { title: 'Convertisseur de Couleurs - HEX RGB HSL CMJN en Ligne', description: 'Convertisseur de couleurs gratuit. Convertissez entre HEX, RGB, HSL et CMJN avec apercu.' },
  de: { title: 'Farbkonverter - HEX zu RGB, HSL, CMYK Online Kostenlos', description: 'Kostenloser Farbkonverter. Konvertieren Sie zwischen HEX, RGB, HSL und CMYK mit Vorschau.' },
  it: { title: 'Convertitore di Colori - HEX RGB HSL CMYK Online Gratis', description: 'Convertitore di colori gratuito. Converti tra HEX, RGB, HSL e CMYK con anteprima.' },
  es: { title: 'Convertidor de Colores - HEX RGB HSL CMYK en Linea', description: 'Convertidor de colores gratuito. Convierte entre HEX, RGB, HSL y CMYK con vista previa.' },
  pt: { title: 'Conversor de Cores - HEX RGB HSL CMYK Online Gratis', description: 'Conversor de cores gratuito. Converta entre HEX, RGB, HSL e CMYK com preview.' },
  nl: { title: 'Kleurenconverter - HEX RGB HSL CMYK Online Gratis', description: 'Gratis kleurenconverter. Converteer tussen HEX, RGB, HSL en CMYK met preview.' },
  pl: { title: 'Konwerter Kolorow - HEX RGB HSL CMYK Online Za Darmo', description: 'Darmowy konwerter kolorow. Konwertuj miedzy HEX, RGB, HSL i CMYK z podgladem.' },
  sv: { title: 'Fargkonverterare - HEX RGB HSL CMYK Online Gratis', description: 'Gratis fargkonverterare. Konvertera mellan HEX, RGB, HSL och CMYK med forhandsvisning.' },
  no: { title: 'Fargekonverterer - HEX RGB HSL CMYK Online Gratis', description: 'Gratis fargekonverterer. Konverter mellom HEX, RGB, HSL og CMYK med forhondsvisning.' },
  zh: { title: '颜色转换器 - HEX RGB HSL CMYK 免费在线转换', description: '免费在线颜色转换器。在 HEX、RGB、HSL 和 CMYK 颜色格式之间转换，支持实时预览和拾色器。' },
  ja: { title: 'カラーコンバーター - HEX RGB HSL CMYK 無料変換', description: '無料オンラインカラーコンバーター。HEX、RGB、HSL、CMYK間でカラー変換。ライブプレビュー付き。' },
  ko: { title: '색상 변환기 - HEX RGB HSL CMYK 무료 변환', description: '무료 온라인 색상 변환기. HEX, RGB, HSL, CMYK 색상 형식 간 변환. 실시간 미리보기 지원.' },
  id: { title: 'Konverter Warna - HEX RGB HSL CMYK Online Gratis', description: 'Konverter warna online gratis. Konversi antara HEX, RGB, HSL dan CMYK dengan preview.' },
  th: { title: 'ตัวแปลงสี - HEX RGB HSL CMYK ออนไลน์ฟรี', description: 'ตัวแปลงสีออนไลน์ฟรี แปลงระหว่าง HEX, RGB, HSL และ CMYK พร้อมตัวอย่างสด' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/color-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/color-converter`])), 'x-default': `https://viadreams.cc/en/tools/color-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
