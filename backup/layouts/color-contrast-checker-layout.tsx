import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Color Contrast Checker - WCAG Accessibility Tool', description: 'Check WCAG color contrast ratios instantly. Test if your color combinations meet AA and AAA accessibility standards for web content.' },
  fr: { title: 'Verificateur de Contraste Couleur - Outil Accessibilite WCAG', description: 'Verifiez les ratios de contraste des couleurs WCAG instantanement. Testez si vos combinaisons de couleurs respectent les normes AA et AAA.' },
  de: { title: 'Farbkontrast Checker - WCAG Barrierefreiheit Tool', description: 'Ueberpruefen Sie WCAG Farbkontrastverhältnisse sofort. Testen Sie, ob Ihre Farbkombinationen die AA- und AAA-Standards erfuellen.' },
  it: { title: 'Verificatore Contrasto Colori - Strumento Accessibilita WCAG', description: 'Controlla i rapporti di contrasto dei colori WCAG istantaneamente. Verifica se le tue combinazioni di colori soddisfano gli standard AA e AAA.' },
  es: { title: 'Verificador de Contraste de Color - Herramienta WCAG', description: 'Verifica los ratios de contraste de color WCAG al instante. Comprueba si tus combinaciones cumplen los estandares AA y AAA.' },
  pt: { title: 'Verificador de Contraste de Cor - Ferramenta WCAG', description: 'Verifique os ratios de contraste de cor WCAG instantaneamente. Teste se suas combinacoes atendem aos padroes AA e AAA.' },
  nl: { title: 'Kleurcontrast Checker - WCAG Toegankelijkheidstool', description: 'Controleer WCAG kleurcontrastverhoudingen direct. Test of uw kleurencombinaties voldoen aan AA en AAA normen.' },
  pl: { title: 'Sprawdzacz Kontrastu Kolorow - Narzedzie WCAG', description: 'Sprawdz wspolczynniki kontrastu kolorow WCAG natychmiast. Przetestuj, czy twoje kombinacje kolorow spelniaja standardy AA i AAA.' },
  sv: { title: 'Faergkontrast Kontrollant - WCAG Tillgaenglighetsverktyg', description: 'Kontrollera WCAG faergkontrastforhallanden direkt. Testa om dina fargkombinationer moeter AA och AAA normer.' },
  no: { title: 'Fargekontrast Sjekker - WCAG Tilgjengelighetsverktoey', description: 'Sjekk WCAG fargekontrastverdier umiddelbart. Test om fargekombinasjonene dine tilfredsstiller AA og AAA standardene.' },
  zh: { title: '颜色对比度检查器 - WCAG 无障碍工具', description: '即时检查 WCAG 颜色对比度比率。测试您的颜色组合是否符合 Web 内容无障碍 AA 和 AAA 标准。' },
  ja: { title: 'カラーコントラストチェッカー - WCAG アクセシビリティツール', description: 'WCAG カラーコントラスト比を即時確認。カラーの組み合わせが AA・AAA のアクセシビリティ基準を満たすかテストします。' },
  ko: { title: '색상 대비 검사기 - WCAG 접근성 도구', description: 'WCAG 색상 대비 비율을 즉시 확인하세요. 색상 조합이 AA 및 AAA 접근성 표준을 충족하는지 테스트하세요.' },
  id: { title: 'Pemeriksa Kontras Warna - Alat Aksesibilitas WCAG', description: 'Periksa rasio kontras warna WCAG secara instan. Uji apakah kombinasi warna Anda memenuhi standar AA dan AAA.' },
  th: { title: 'เครื่องตรวจสอบความคมชัดของสี - เครื่องมือ WCAG', description: 'ตรวจสอบอัตราส่วนความคมชัดของสี WCAG ทันที ทดสอบว่าการรวมสีของคุณตรงตามมาตรฐาน AA และ AAA หรือไม่' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/color-contrast-checker`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['color contrast checker', 'WCAG contrast', 'accessibility checker', 'contrast ratio', 'AA AAA compliance'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/color-contrast-checker`])), 'x-default': `https://viadreams.cc/en/tools/color-contrast-checker` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
