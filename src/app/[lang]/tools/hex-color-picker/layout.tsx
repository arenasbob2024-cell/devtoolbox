import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HEX Color Picker & Converter - Pick Colors Online Free', description: 'Free online HEX color picker and converter. Pick any color and get HEX, RGB, HSL, and CMYK values instantly. Visual color picker with live preview.' },
  fr: { title: 'Selecteur de Couleur HEX & Convertisseur en Ligne Gratuit', description: 'Selecteur et convertisseur de couleur HEX gratuit en ligne. Selectionnez une couleur et obtenez les valeurs HEX, RGB, HSL et CMYK.' },
  de: { title: 'HEX Farbwaehler & Konverter - Farben Online Waehlen Kostenlos', description: 'Kostenloser Online HEX Farbwaehler und Konverter. Waehlen Sie eine Farbe und erhalten Sie HEX, RGB, HSL und CMYK Werte.' },
  it: { title: 'Selettore Colore HEX & Convertitore Online Gratis', description: 'Selettore e convertitore colore HEX gratuito online. Seleziona un colore e ottieni valori HEX, RGB, HSL e CMYK.' },
  es: { title: 'Selector de Color HEX & Convertidor en Linea Gratis', description: 'Selector y convertidor de color HEX gratuito en linea. Selecciona cualquier color y obtiene valores HEX, RGB, HSL y CMYK.' },
  pt: { title: 'Seletor de Cor HEX & Conversor Online Gratis', description: 'Seletor e conversor de cor HEX gratuito online. Selecione qualquer cor e obtenha valores HEX, RGB, HSL e CMYK.' },
  nl: { title: 'HEX Kleurenkiezer & Converter Online Gratis', description: 'Gratis online HEX kleurenkiezer en converter. Kies een kleur en krijg HEX, RGB, HSL en CMYK waarden.' },
  pl: { title: 'Selektor Kolorow HEX & Konwerter Online Za Darmo', description: 'Darmowy selektor kolorow HEX i konwerter online. Wybierz kolor i uzyskaj wartosci HEX, RGB, HSL i CMYK.' },
  sv: { title: 'HEX Fargvaeljare & Konverterare Online Gratis', description: 'Gratis online HEX fargvaeljare och konverterare. Vaelj en farg och fa HEX, RGB, HSL och CMYK varden.' },
  no: { title: 'HEX Fargevelger & Konverterer Online Gratis', description: 'Gratis online HEX fargevelger og konverterer. Velg en farge og fa HEX, RGB, HSL og CMYK verdier.' },
  zh: { title: 'HEX 颜色选择器和转换器 - 免费在线选色工具', description: '免费在线 HEX 颜色选择器和转换器。选择任意颜色即时获取 HEX、RGB、HSL 和 CMYK 值，支持可视化选色和实时预览。' },
  ja: { title: 'HEX カラーピッカー＆変換ツール - 無料オンライン', description: '無料オンライン HEX カラーピッカーと変換ツール。色を選択して HEX、RGB、HSL、CMYK の値を即座に取得。' },
  ko: { title: 'HEX 컬러 피커 & 변환기 - 무료 온라인 색상 선택 도구', description: '무료 온라인 HEX 컬러 피커 및 변환기. 색상을 선택하여 HEX, RGB, HSL, CMYK 값을 즉시 얻으세요.' },
  id: { title: 'Pemilih Warna HEX & Konverter Online Gratis', description: 'Pemilih warna HEX dan konverter online gratis. Pilih warna apa saja dan dapatkan nilai HEX, RGB, HSL, dan CMYK.' },
  th: { title: 'ตัวเลือกสี HEX & ตัวแปลงออนไลน์ฟรี', description: 'ตัวเลือกและตัวแปลงสี HEX ออนไลน์ฟรี เลือกสีและรับค่า HEX, RGB, HSL และ CMYK ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/hex-color-picker`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/hex-color-picker`])), 'x-default': `https://viadreams.cc/en/tools/hex-color-picker` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
