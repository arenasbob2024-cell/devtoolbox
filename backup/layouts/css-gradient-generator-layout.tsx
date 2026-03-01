import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Gradient Generator - Create Linear, Radial & Conic Gradients', description: 'Free online CSS gradient generator with live preview. Create beautiful linear, radial, and conic gradients. Copy production-ready CSS code instantly.' },
  fr: { title: 'Generateur de Degrades CSS - Lineaire, Radial, Conique', description: 'Generateur de degrades CSS gratuit avec apercu en direct. Creez des degrades lineaires, radiaux et coniques.' },
  de: { title: 'CSS Farbverlauf Generator - Linear, Radial & Konisch', description: 'Kostenloser CSS Farbverlauf Generator mit Live-Vorschau. Erstellen Sie lineare, radiale und konische Verlaeufe.' },
  it: { title: 'Generatore Gradienti CSS - Lineare, Radiale e Conico', description: 'Generatore gradienti CSS gratuito con anteprima dal vivo. Crea gradienti lineari, radiali e conici.' },
  es: { title: 'Generador de Degradados CSS - Lineal, Radial y Conico', description: 'Generador de degradados CSS gratuito con vista previa en vivo. Cree degradados lineales, radiales y conicos.' },
  pt: { title: 'Gerador de Gradientes CSS - Linear, Radial e Conico', description: 'Gerador de gradientes CSS gratuito com pre-visualizacao ao vivo. Crie gradientes lineares, radiais e conicos.' },
  nl: { title: 'CSS Gradient Generator - Lineair, Radiaal & Conisch', description: 'Gratis CSS gradient generator met live voorbeeld. Maak lineaire, radiale en conische gradients.' },
  pl: { title: 'Generator Gradientow CSS - Liniowy, Radialny i Stozkowy', description: 'Darmowy generator gradientow CSS z podgladem na zywo. Tworzenie gradientow liniowych, radialnych i stozkowych.' },
  sv: { title: 'CSS Gradient Generator - Lineaer, Radiell & Konisk', description: 'Gratis CSS gradient generator med live foerhandsvisning. Skapa lineaera, radiella och koniska gradienter.' },
  no: { title: 'CSS Gradient Generator - Lineaer, Radiell & Konisk', description: 'Gratis CSS gradient generator med live foerhandsvisning. Lag lineaere, radielle og koniske gradienter.' },
  zh: { title: 'CSS 渐变生成器 - 线性、径向和锥形渐变', description: '免费在线 CSS 渐变生成器，实时预览。创建线性、径向和锥形渐变，即时复制可用的 CSS 代码。' },
  ja: { title: 'CSS グラデーションジェネレーター - 線形・放射・円錐', description: '無料オンライン CSS グラデーションジェネレーター。線形、放射、円錐グラデーションをライブプレビューで作成。' },
  ko: { title: 'CSS 그라데이션 생성기 - 선형, 방사형, 원뿔형', description: '무료 온라인 CSS 그라데이션 생성기. 선형, 방사형, 원뿔형 그라데이션을 실시간 미리보기로 생성.' },
  id: { title: 'Generator Gradien CSS - Linear, Radial & Kerucut', description: 'Generator gradien CSS gratis dengan pratinjau langsung. Buat gradien linear, radial, dan kerucut.' },
  th: { title: 'ตัวสร้างไล่ระดับสี CSS - เชิงเส้น รัศมี กรวย', description: 'ตัวสร้างไล่ระดับสี CSS ฟรีพร้อมดูตัวอย่างสด สร้างไล่ระดับสีเชิงเส้น รัศมี และกรวย' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-gradient-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-gradient-generator`])), 'x-default': `https://viadreams.cc/en/tools/css-gradient-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
