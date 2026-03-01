import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Pixel to REM Converter - PX to REM/EM Conversion Online Free', description: 'Convert between px, rem, and em units. Set custom base font size. Instant pixel to rem converter with conversion table.' },
  fr: { title: 'Convertisseur Pixel en REM - Conversion PX vers REM en Ligne', description: 'Convertissez entre px, rem et em. Definissez une taille de police de base personnalisee.' },
  de: { title: 'Pixel zu REM Konverter - PX zu REM/EM Online Konvertieren', description: 'Konvertieren Sie zwischen px, rem und em. Legen Sie eine benutzerdefinierte Basis-Schriftgrosse fest.' },
  it: { title: 'Convertitore Pixel in REM - Conversione PX in REM Online', description: 'Converti tra px, rem e em. Imposta una dimensione del carattere base personalizzata.' },
  es: { title: 'Convertidor de Pixel a REM - Conversion PX a REM Online', description: 'Convierte entre px, rem y em. Establece un tamano de fuente base personalizado.' },
  pt: { title: 'Conversor de Pixel para REM - Conversao PX para REM Online', description: 'Converta entre px, rem e em. Defina um tamanho de fonte base personalizado.' },
  nl: { title: 'Pixel naar REM Converter - PX naar REM/EM Online Converteren', description: 'Converteer tussen px, rem en em. Stel een aangepaste basis lettergrootte in.' },
  pl: { title: 'Konwerter Pikseli na REM - Konwersja PX na REM Online', description: 'Konwertuj miedzy px, rem i em. Ustaw niestandardowy podstawowy rozmiar czcionki.' },
  sv: { title: 'Pixel till REM Konverterare - PX till REM/EM Online', description: 'Konvertera mellan px, rem och em. Ange en anpassad basteckensnittsstorlek.' },
  no: { title: 'Piksel til REM Konverter - PX til REM/EM Online', description: 'Konverter mellom px, rem og em. Angi en tilpasset grunnleggende skriftstorrelse.' },
  zh: { title: 'Pixel 转 REM 转换器 - PX 与 REM/EM 在线转换', description: '在线转换 px、rem 和 em 单位。自定义基础字体大小，附带转换对照表。' },
  ja: { title: 'ピクセルからREMへのコンバーター - PX/REM/EMをオンラインで変換', description: 'px、rem、em 単位を変換します。カスタムベースフォントサイズを設定できます。' },
  ko: { title: '픽셀을 REM으로 변환기 - PX/REM/EM 온라인 변환', description: 'px, rem, em 단위를 변환합니다. 사용자 정의 기본 글꼴 크기를 설정할 수 있습니다.' },
  id: { title: 'Konverter Piksel ke REM - Konversi PX ke REM Online', description: 'Konversi antara px, rem, dan em. Atur ukuran font dasar kustom.' },
  th: { title: 'แปลง Pixel เป็น REM - แปลง PX เป็น REM/EM ออนไลน์', description: 'แปลงระหว่าง px, rem และ em ตั้งค่าขนาดฟอนต์พื้นฐานแบบกำหนดเอง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/pixel-to-rem-converter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/pixel-to-rem-converter`])), 'x-default': `https://viadreams.cc/en/tools/pixel-to-rem-converter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
