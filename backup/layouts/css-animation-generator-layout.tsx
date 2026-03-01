import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Animation Generator - Keyframe Builder with Preview', description: 'Create CSS keyframe animations visually with live preview, timing controls, and code export. Free online CSS animation builder tool.' },
  fr: { title: 'Generateur d\'Animations CSS - Constructeur de Keyframes', description: 'Creez des animations CSS visuellement avec apercu en direct et controles de timing.' },
  de: { title: 'CSS-Animationsgenerator - Keyframe-Builder mit Vorschau', description: 'Erstellen Sie CSS-Keyframe-Animationen visuell mit Live-Vorschau und Timing-Steuerung.' },
  it: { title: 'Generatore Animazioni CSS - Builder Keyframe con Anteprima', description: 'Crea animazioni CSS keyframe visivamente con anteprima dal vivo e controlli di timing.' },
  es: { title: 'Generador de Animaciones CSS - Constructor de Keyframes', description: 'Cree animaciones CSS keyframe visualmente con vista previa en vivo y controles de tiempo.' },
  pt: { title: 'Gerador de Animacoes CSS - Construtor de Keyframes', description: 'Crie animacoes CSS keyframe visualmente com preview ao vivo e controles de timing.' },
  nl: { title: 'CSS Animatie Generator - Keyframe Builder met Preview', description: 'Maak CSS keyframe-animaties visueel met live preview en timing-besturing.' },
  pl: { title: 'Generator Animacji CSS - Kreator Keyframe z Podgladem', description: 'Twórz animacje CSS keyframe wizualnie z podgladem na zywo i kontrola czasu.' },
  sv: { title: 'CSS Animation Generator - Keyframe-byggare med Foerhandsvisning', description: 'Skapa CSS keyframe-animationer visuellt med live-foerhandsvisning och tidskontroller.' },
  no: { title: 'CSS Animasjonsgenerator - Keyframe-bygger med Forhåndsvisning', description: 'Lag CSS keyframe-animasjoner visuelt med live forhåndsvisning og tidskontroller.' },
  zh: { title: 'CSS 动画生成器 - 可视化关键帧构建工具', description: '可视化创建 CSS 关键帧动画，支持实时预览、时间控制和代码导出。免费在线 CSS 动画生成工具。' },
  ja: { title: 'CSS アニメーション生成ツール - キーフレームビルダー', description: 'ライブプレビュー付きでCSSキーフレームアニメーションをビジュアルに作成。タイミング制御とコードエクスポート。' },
  ko: { title: 'CSS 애니메이션 생성기 - 키프레임 빌더', description: '실시간 미리보기와 타이밍 제어로 CSS 키프레임 애니메이션을 시각적으로 생성합니다.' },
  id: { title: 'Generator Animasi CSS - Pembuat Keyframe dengan Preview', description: 'Buat animasi keyframe CSS secara visual dengan preview langsung dan kontrol timing.' },
  th: { title: 'เครื่องมือสร้าง CSS Animation - สร้าง Keyframe พร้อมตัวอย่าง', description: 'สร้าง CSS keyframe animation แบบเห็นภาพพร้อมตัวอย่างสดและการควบคุมเวลา' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-animation-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-animation-generator`])), 'x-default': `https://viadreams.cc/en/tools/css-animation-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
