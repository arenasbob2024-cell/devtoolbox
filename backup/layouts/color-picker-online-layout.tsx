import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Color Picker Online - Free Visual Color Selection Tool', description: 'Pick any color visually with a gradient area, hue slider, and convert between HEX, RGB, and HSL formats in real-time.' },
  fr: { title: 'Selecteur de Couleurs en Ligne - Outil Visuel Gratuit', description: 'Choisissez une couleur visuellement avec un degrade, un curseur de teinte et convertissez entre HEX, RGB et HSL en temps reel.' },
  de: { title: 'Farbauswahl Online - Kostenloses Visuelles Werkzeug', description: 'Wahlen Sie eine Farbe visuell mit Verlaufsbereich, Farbton-Regler und konvertieren Sie zwischen HEX, RGB und HSL in Echtzeit.' },
  it: { title: 'Selettore Colori Online - Strumento Visuale Gratuito', description: 'Scegli qualsiasi colore visivamente con area gradiente, cursore tonalita e converti tra HEX, RGB e HSL in tempo reale.' },
  es: { title: 'Selector de Color en Linea - Herramienta Visual Gratuita', description: 'Seleccione cualquier color visualmente con area de degradado, control de tono y convierta entre HEX, RGB y HSL en tiempo real.' },
  pt: { title: 'Seletor de Cores Online - Ferramenta Visual Gratuita', description: 'Escolha qualquer cor visualmente com area de gradiente, controle de matiz e converta entre HEX, RGB e HSL em tempo real.' },
  nl: { title: 'Online Kleurkiezer - Gratis Visueel Gereedschap', description: 'Kies visueel een kleur met verloopgebied, tintregelaar en converteer tussen HEX, RGB en HSL in realtime.' },
  pl: { title: 'Selektor Kolorow Online - Darmowe Narzedzie Wizualne', description: 'Wybierz dowolny kolor wizualnie z obszarem gradientu, suwakiem odcienia i konwertuj miedzy HEX, RGB i HSL w czasie rzeczywistym.' },
  sv: { title: 'Fargvaljare Online - Gratis Visuellt Verktyg', description: 'Valj nagon farg visuellt med gradientomrade, nyansreglage och konvertera mellan HEX, RGB och HSL i realtid.' },
  no: { title: 'Fargevelger Online - Gratis Visuelt Verktoy', description: 'Velg hvilken som helst farge visuelt med gradientomrade, fargetonekontroll og konverter mellom HEX, RGB og HSL i sanntid.' },
  zh: { title: '在线颜色选择器 - 免费可视化选色工具', description: '使用渐变区域和色相滑块可视化选择颜色，实时转换 HEX、RGB 和 HSL 格式。' },
  ja: { title: 'オンラインカラーピッカー - 無料ビジュアルツール', description: 'グラデーションエリアと色相スライダーで視覚的に色を選択し、HEX、RGB、HSL形式間でリアルタイム変換。' },
  ko: { title: '온라인 색상 선택기 - 무료 시각적 도구', description: '그라데이션 영역과 색조 슬라이더로 시각적으로 색상을 선택하고 HEX, RGB, HSL 형식 간 실시간 변환.' },
  id: { title: 'Pemilih Warna Online - Alat Visual Gratis', description: 'Pilih warna secara visual dengan area gradien, penggeser rona, dan konversi antara HEX, RGB, dan HSL secara real-time.' },
  th: { title: 'ตัวเลือกสีออนไลน์ - เครื่องมือเลือกสีฟรี', description: 'เลือกสีด้วยตาจากพื้นที่ไล่ระดับ แถบเลื่อนเฉดสี และแปลงระหว่าง HEX, RGB และ HSL แบบเรียลไทม์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/color-picker-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/color-picker-online`])), 'x-default': `https://viadreams.cc/en/tools/color-picker-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
