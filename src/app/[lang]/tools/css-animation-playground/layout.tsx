import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Animation Playground - Visual CSS Animation Builder Free', description: 'Free online CSS animation builder. Create CSS animations visually with keyframes, timing functions, and live preview. Generate and copy animation code.' },
  fr: { title: 'Terrain de Jeu CSS Animation - Constructeur d\'Animation CSS Gratuit', description: 'Constructeur d\'animations CSS gratuit. Creez des animations visuellement avec keyframes et apercu en direct.' },
  de: { title: 'CSS Animation Playground - Visueller CSS Animationsersteller Kostenlos', description: 'Kostenloser Online CSS Animation Builder. Erstellen Sie CSS-Animationen visuell mit Keyframes und Live-Vorschau.' },
  it: { title: 'CSS Animation Playground - Costruttore Animazioni CSS Gratis', description: 'Costruttore di animazioni CSS gratuito. Crea animazioni visivamente con keyframes e anteprima dal vivo.' },
  es: { title: 'CSS Animation Playground - Constructor de Animaciones CSS Gratis', description: 'Constructor de animaciones CSS gratuito. Cree animaciones visualmente con keyframes y vista previa en vivo.' },
  pt: { title: 'CSS Animation Playground - Construtor de Animacoes CSS Gratis', description: 'Construtor de animacoes CSS gratuito. Crie animacoes visualmente com keyframes e preview ao vivo.' },
  nl: { title: 'CSS Animatie Playground - Visuele CSS Animatie Bouwer Gratis', description: 'Gratis online CSS animatie bouwer. Maak CSS-animaties visueel met keyframes en live preview.' },
  pl: { title: 'CSS Animation Playground - Wizualny Konstruktor Animacji CSS Za Darmo', description: 'Darmowy konstruktor animacji CSS. Tworzenie animacji wizualnie z keyframes i podgladem na zywo.' },
  sv: { title: 'CSS Animation Playground - Visuell CSS Animationsbyggare Gratis', description: 'Gratis CSS animationsbyggare online. Skapa CSS-animationer visuellt med keyframes och foerhandsgranskning.' },
  no: { title: 'CSS Animation Playground - Visuell CSS Animasjonsbygger Gratis', description: 'Gratis CSS animasjonsbygger online. Lag CSS-animasjoner visuelt med keyframes og direkte forhaandsvisning.' },
  zh: { title: 'CSS 动画工坊 - 免费可视化 CSS 动画构建器', description: '免费在线 CSS 动画构建器。可视化创建关键帧、时间函数的 CSS 动画，实时预览。生成并复制动画代码。' },
  ja: { title: 'CSSアニメーションプレイグラウンド - ビジュアルCSSアニメーションビルダー無料', description: '無料CSSアニメーションビルダー。キーフレームとライブプレビューでCSSアニメーションを視覚的に作成。' },
  ko: { title: 'CSS 애니메이션 플레이그라운드 - 시각적 CSS 애니메이션 빌더 무료', description: '무료 CSS 애니메이션 빌더. 키프레임과 라이브 프리뷰로 CSS 애니메이션을 시각적으로 생성합니다.' },
  id: { title: 'CSS Animation Playground - Pembuat Animasi CSS Visual Gratis', description: 'Pembuat animasi CSS gratis. Buat animasi CSS secara visual dengan keyframe dan preview langsung.' },
  th: { title: 'CSS Animation Playground - ตัวสร้าง CSS Animation ฟรี', description: 'ตัวสร้าง CSS animation ออนไลน์ฟรี สร้าง CSS animation ด้วย keyframes และตัวอย่างแบบเรียลไทม์' },
};

const slug = 'css-animation-playground';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['css animation', 'animation builder', 'keyframes', 'css animation generator', 'animation playground', 'css transition', 'timing function'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
