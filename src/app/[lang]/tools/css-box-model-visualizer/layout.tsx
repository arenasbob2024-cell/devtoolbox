import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Box Model Visualizer - Interactive Box Model Tool Free', description: 'Free interactive CSS box model visualizer. Adjust margin, border, padding, and content dimensions to understand the CSS box model. Generate ready-to-use CSS code.' },
  fr: { title: 'Visualiseur Modele de Boite CSS - Outil Box Model Interactif Gratuit', description: 'Visualiseur interactif gratuit du modele de boite CSS. Ajustez marge, bordure, rembourrage et contenu pour comprendre le modele de boite CSS.' },
  de: { title: 'CSS Box-Modell Visualisierer - Interaktives Box-Modell Tool Kostenlos', description: 'Kostenloser interaktiver CSS Box-Modell Visualisierer. Passen Sie Margin, Border, Padding und Content an, um das CSS Box-Modell zu verstehen.' },
  it: { title: 'Visualizzatore Modello a Scatola CSS - Strumento Box Model Interattivo Gratis', description: 'Visualizzatore interattivo gratuito del modello a scatola CSS. Regola margine, bordo, padding e contenuto per capire il modello a scatola CSS.' },
  es: { title: 'Visualizador Modelo de Caja CSS - Herramienta Box Model Interactiva Gratis', description: 'Visualizador interactivo gratuito del modelo de caja CSS. Ajusta margen, borde, relleno y contenido para entender el modelo de caja CSS.' },
  pt: { title: 'Visualizador Modelo de Caixa CSS - Ferramenta Box Model Interativa Gratis', description: 'Visualizador interativo gratuito do modelo de caixa CSS. Ajuste margem, borda, preenchimento e conteudo para entender o modelo de caixa CSS.' },
  nl: { title: 'CSS Box Model Visualiseerder - Interactieve Box Model Tool Gratis', description: 'Gratis interactieve CSS box model visualiseerder. Pas marge, rand, padding en inhoud aan om het CSS box model te begrijpen.' },
  pl: { title: 'Wizualizator Modelu Pudelkowego CSS - Interaktywne Narzedzie Box Model Za Darmo', description: 'Darmowy interaktywny wizualizator modelu pudelkowego CSS. Dostosuj margines, obramowanie, padding i zawartosc.' },
  sv: { title: 'CSS Boxmodell Visualiserare - Interaktivt Boxmodell Verktyg Gratis', description: 'Gratis interaktiv CSS boxmodell visualiserare. Justera marginal, ram, padding och innehall for att forsta CSS boxmodellen.' },
  no: { title: 'CSS Boksmodell Visualiserer - Interaktivt Boksmodell Verktoy Gratis', description: 'Gratis interaktiv CSS boksmodell visualiserer. Juster marg, ramme, padding og innhold for a forsta CSS boksmodellen.' },
  zh: { title: 'CSS 盒模型可视化工具 - 免费交互式盒模型工具', description: '免费交互式 CSS 盒模型可视化工具。调整外边距、边框、内边距和内容尺寸，理解 CSS 盒模型。生成即用的 CSS 代码。' },
  ja: { title: 'CSS ボックスモデル ビジュアライザー - 無料インタラクティブツール', description: '無料インタラクティブ CSS ボックスモデルビジュアライザー。マージン、ボーダー、パディング、コンテンツを調整して CSS ボックスモデルを理解。' },
  ko: { title: 'CSS 박스 모델 시각화 도구 - 무료 인터랙티브 박스 모델 도구', description: '무료 인터랙티브 CSS 박스 모델 시각화 도구. 마진, 보더, 패딩, 콘텐츠를 조절하여 CSS 박스 모델을 이해합니다.' },
  id: { title: 'Visualisator Model Kotak CSS - Alat Box Model Interaktif Gratis', description: 'Visualisator model kotak CSS interaktif gratis. Sesuaikan margin, border, padding, dan konten untuk memahami CSS box model.' },
  th: { title: 'เครื่องมือแสดงภาพ CSS Box Model - เครื่องมือ Box Model อินเทอร์แอคทีฟฟรี', description: 'เครื่องมือแสดงภาพ CSS Box Model แบบอินเทอร์แอคทีฟฟรี ปรับ margin, border, padding และ content เพื่อเข้าใจ CSS Box Model' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-box-model-visualizer`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-box-model-visualizer`])), 'x-default': `https://viadreams.cc/en/tools/css-box-model-visualizer` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
