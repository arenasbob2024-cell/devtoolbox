import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'TypeScript vs JavaScript: Which Should You Use?', description: 'Compare TypeScript and JavaScript side by side. Differences in type system, IDE support, build step, learning curve, ecosystem, and when to use each.' },
  fr: { title: 'TypeScript vs JavaScript : Lequel choisir ?', description: 'Comparez TypeScript et JavaScript cote a cote. Differences de systeme de types, support IDE, etape de compilation et cas d\'utilisation.' },
  de: { title: 'TypeScript vs JavaScript: Was sollten Sie verwenden?', description: 'Vergleichen Sie TypeScript und JavaScript. Unterschiede bei Typsystem, IDE-Unterstuetzung, Build-Schritt und Anwendungsfaellen.' },
  it: { title: 'TypeScript vs JavaScript: Quale dovresti usare?', description: 'Confronta TypeScript e JavaScript fianco a fianco. Differenze di sistema dei tipi, supporto IDE, step di build e casi d\'uso.' },
  es: { title: 'TypeScript vs JavaScript: Cual deberias usar?', description: 'Compara TypeScript y JavaScript lado a lado. Diferencias en sistema de tipos, soporte IDE, paso de compilacion y casos de uso.' },
  pt: { title: 'TypeScript vs JavaScript: Qual voce deve usar?', description: 'Compare TypeScript e JavaScript lado a lado. Diferencas em sistema de tipos, suporte IDE, etapa de build e casos de uso.' },
  nl: { title: 'TypeScript vs JavaScript: Welke moet je gebruiken?', description: 'Vergelijk TypeScript en JavaScript naast elkaar. Verschillen in typesysteem, IDE-ondersteuning, build-stap en gebruiksscenario\'s.' },
  pl: { title: 'TypeScript vs JavaScript: Ktory wybrac?', description: 'Porownaj TypeScript i JavaScript obok siebie. Roznice w systemie typow, wsparciu IDE, etapie budowania i zastosowaniach.' },
  sv: { title: 'TypeScript vs JavaScript: Vilket ska du anvanda?', description: 'Jamfor TypeScript och JavaScript sida vid sida. Skillnader i typsystem, IDE-stod, byggsteg och anvandningsfall.' },
  no: { title: 'TypeScript vs JavaScript: Hvilket bor du bruke?', description: 'Sammenlign TypeScript og JavaScript side om side. Forskjeller i typesystem, IDE-stotte, byggsteg og bruksomrader.' },
  zh: { title: 'TypeScript vs JavaScript：应该使用哪个？', description: '并排比较 TypeScript 和 JavaScript。类型系统、IDE 支持、构建步骤、学习曲线、生态系统及使用场景的差异。' },
  ja: { title: 'TypeScript vs JavaScript：どちらを使うべき？', description: 'TypeScriptとJavaScriptを並べて比較。型システム、IDEサポート、ビルドステップ、使用ケースの違い。' },
  ko: { title: 'TypeScript vs JavaScript: 어떤 것을 사용해야 할까요?', description: 'TypeScript와 JavaScript를 나란히 비교합니다. 타입 시스템, IDE 지원, 빌드 단계 및 사용 사례의 차이점.' },
  id: { title: 'TypeScript vs JavaScript: Mana yang Harus Anda Gunakan?', description: 'Bandingkan TypeScript dan JavaScript. Perbedaan sistem tipe, dukungan IDE, langkah build, dan kasus penggunaan.' },
  th: { title: 'TypeScript vs JavaScript: ควรใช้ตัวไหน?', description: 'เปรียบเทียบ TypeScript และ JavaScript ระบบชนิดข้อมูล การรองรับ IDE ขั้นตอนการ build และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/typescript-vs-javascript`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/typescript-vs-javascript`])
        ),
        'x-default': `https://viadreams.cc/en/tools/typescript-vs-javascript`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
