import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Triangle Generator - Generate CSS Triangles Online Free', description: 'Generate pure CSS triangles with customizable direction, color, and size. Live preview and instant CSS code output. Free online CSS triangle generator.' },
  fr: { title: 'Generateur de Triangles CSS - Creer des Triangles CSS en Ligne', description: 'Generez des triangles CSS purs avec direction, couleur et taille personnalisables.' },
  de: { title: 'CSS Dreieck Generator - CSS Dreiecke Online Erstellen', description: 'Erstellen Sie reine CSS-Dreiecke mit anpassbarer Richtung, Farbe und Groesse.' },
  it: { title: 'Generatore di Triangoli CSS - Crea Triangoli CSS Online', description: 'Genera triangoli CSS puri con direzione, colore e dimensione personalizzabili.' },
  es: { title: 'Generador de Triangulos CSS - Crear Triangulos CSS en Linea', description: 'Genera triangulos CSS puros con direccion, color y tamano personalizables.' },
  pt: { title: 'Gerador de Triangulos CSS - Criar Triangulos CSS Online', description: 'Gera triangulos CSS puros com direcao, cor e tamanho personalizaveis.' },
  nl: { title: 'CSS Driehoek Generator - CSS Driehoeken Online Maken', description: 'Genereer pure CSS-driehoeken met aanpasbare richting, kleur en grootte.' },
  pl: { title: 'Generator Trojkatow CSS - Tworzenie Trojkatow CSS Online', description: 'Generuj czyste trojkaty CSS z konfigurowalnym kierunkiem, kolorem i rozmiarem.' },
  sv: { title: 'CSS Triangelgenerator - Skapa CSS Trianglar Online', description: 'Generera rena CSS-trianglar med anpassningsbar riktning, farg och storlek.' },
  no: { title: 'CSS Trekantgenerator - Lag CSS Trekanter Online', description: 'Generer rene CSS-trekanter med tilpassbar retning, farge og storrelse.' },
  zh: { title: 'CSS 三角形生成器 - 在线生成 CSS 三角形', description: '生成具有可自定义方向、颜色和大小的纯 CSS 三角形。实时预览和即时 CSS 代码输出。' },
  ja: { title: 'CSS 三角形ジェネレーター - オンラインで CSS 三角形を生成', description: 'カスタマイズ可能な方向、色、サイズの純粋な CSS 三角形を生成。リアルタイムプレビュー付き。' },
  ko: { title: 'CSS 삼각형 생성기 - 온라인으로 CSS 삼각형 생성', description: '사용자 정의 가능한 방향, 색상, 크기로 순수 CSS 삼각형을 생성합니다. 실시간 미리보기.' },
  id: { title: 'Generator Segitiga CSS - Buat Segitiga CSS Online', description: 'Hasilkan segitiga CSS murni dengan arah, warna, dan ukuran yang dapat disesuaikan.' },
  th: { title: 'เครื่องมือสร้างสามเหลี่ยม CSS - สร้างสามเหลี่ยม CSS ออนไลน์', description: 'สร้างสามเหลี่ยม CSS แบบบริสุทธิ์ด้วยทิศทาง สี และขนาดที่กำหนดเอง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-triangle-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-triangle-generator`])), 'x-default': `https://viadreams.cc/en/tools/css-triangle-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
