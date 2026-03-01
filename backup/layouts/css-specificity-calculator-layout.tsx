import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Specificity Calculator - Calculate Selector Scores', description: 'Free online CSS specificity calculator. Calculate and compare CSS selector specificity scores instantly. Understand the cascade and avoid !important overuse.' },
  fr: { title: 'Calculateur de Specificite CSS - Scores de Selecteurs', description: 'Calculateur de specificite CSS gratuit. Calculez et comparez les scores de specificite des selecteurs CSS.' },
  de: { title: 'CSS Spezifitaet Rechner - Selektor-Scores Berechnen', description: 'Kostenloser CSS Spezifitaet Rechner. Berechnen und vergleichen Sie CSS-Selektor-Spezifitaets-Scores.' },
  it: { title: 'Calcolatore Specificita CSS - Punteggi Selettori', description: 'Calcolatore di specificita CSS gratuito. Calcola e confronta i punteggi di specificita dei selettori CSS.' },
  es: { title: 'Calculadora de Especificidad CSS - Puntajes de Selectores', description: 'Calculadora de especificidad CSS gratuita. Calcula y compara los puntajes de especificidad de los selectores CSS.' },
  pt: { title: 'Calculadora de Especificidade CSS - Pontuacoes de Seletores', description: 'Calculadora de especificidade CSS gratuita. Calcule e compare as pontuacoes de especificidade dos seletores CSS.' },
  nl: { title: 'CSS Specificiteit Calculator - Selector Scores', description: 'Gratis CSS specificiteit calculator. Bereken en vergelijk CSS selector specificiteit scores.' },
  pl: { title: 'Kalkulator Specyficznosci CSS - Wyniki Selektor', description: 'Darmowy kalkulator specyficznosci CSS. Oblicz i porownaj wyniki specyficznosci selektorow CSS.' },
  sv: { title: 'CSS Specificitetskalkylator - Selektorpoang', description: 'Gratis CSS specificitetskalkylator. Berakna och jamfor CSS-selektor specificitetspoang.' },
  no: { title: 'CSS Spesifisitetskalkulator - Selektorpoeng', description: 'Gratis CSS spesifisitetskalkulator. Beregn og sammenlign CSS selektorspesifisitetspoeng.' },
  zh: { title: 'CSS 优先级计算器 - 选择器权重计算', description: '免费在线 CSS 优先级计算器。即时计算和比较 CSS 选择器的优先级分数，理解层叠规则。' },
  ja: { title: 'CSS 詳細度計算ツール - セレクタースコア計算', description: '無料オンライン CSS 詳細度計算ツール。CSS セレクターの詳細度スコアを即時計算・比較できます。' },
  ko: { title: 'CSS 명시도 계산기 - 선택자 점수 계산', description: '무료 온라인 CSS 명시도 계산기. CSS 선택자의 명시도 점수를 즉시 계산하고 비교하세요.' },
  id: { title: 'Kalkulator Spesifisitas CSS - Skor Selektor', description: 'Kalkulator spesifisitas CSS gratis. Hitung dan bandingkan skor spesifisitas selektor CSS secara instan.' },
  th: { title: 'เครื่องคำนวณความเฉพาะเจาะจง CSS - คะแนน Selector', description: 'เครื่องคำนวณความเฉพาะเจาะจง CSS ฟรีออนไลน์ คำนวณและเปรียบเทียบคะแนนความเฉพาะเจาะจงของ CSS selector' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-specificity-calculator`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['css specificity calculator', 'css selector specificity', 'specificity score', 'css cascade', 'selector weight'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-specificity-calculator`])), 'x-default': `https://viadreams.cc/en/tools/css-specificity-calculator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
