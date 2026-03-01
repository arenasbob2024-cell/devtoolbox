import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Docker vs Kubernetes: What\'s the Difference?', description: 'Compare Docker and Kubernetes side by side. Differences in purpose, scope, complexity, scaling, learning curve, and when to use each.' },
  fr: { title: 'Docker vs Kubernetes : Quelle est la difference ?', description: 'Comparez Docker et Kubernetes cote a cote. Differences d\'objectif, portee, complexite, mise a l\'echelle et cas d\'utilisation.' },
  de: { title: 'Docker vs Kubernetes: Was ist der Unterschied?', description: 'Vergleichen Sie Docker und Kubernetes. Unterschiede bei Zweck, Umfang, Komplexitaet, Skalierung und Anwendungsfaellen.' },
  it: { title: 'Docker vs Kubernetes: Qual e la differenza?', description: 'Confronta Docker e Kubernetes fianco a fianco. Differenze di scopo, ambito, complessita, scalabilita e casi d\'uso.' },
  es: { title: 'Docker vs Kubernetes: Cual es la diferencia?', description: 'Compara Docker y Kubernetes lado a lado. Diferencias en proposito, alcance, complejidad, escalado y casos de uso.' },
  pt: { title: 'Docker vs Kubernetes: Qual a diferenca?', description: 'Compare Docker e Kubernetes lado a lado. Diferencas em proposito, escopo, complexidade, escalabilidade e casos de uso.' },
  nl: { title: 'Docker vs Kubernetes: Wat is het verschil?', description: 'Vergelijk Docker en Kubernetes naast elkaar. Verschillen in doel, reikwijdte, complexiteit, schaling en gebruiksscenario\'s.' },
  pl: { title: 'Docker vs Kubernetes: Jaka jest roznica?', description: 'Porownaj Docker i Kubernetes obok siebie. Roznice w celu, zakresie, zlozonosci, skalowaniu i zastosowaniach.' },
  sv: { title: 'Docker vs Kubernetes: Vad ar skillnaden?', description: 'Jamfor Docker och Kubernetes sida vid sida. Skillnader i syfte, omfang, komplexitet, skalning och anvandningsfall.' },
  no: { title: 'Docker vs Kubernetes: Hva er forskjellen?', description: 'Sammenlign Docker og Kubernetes side om side. Forskjeller i formal, omfang, kompleksitet, skalering og bruksomrader.' },
  zh: { title: 'Docker vs Kubernetes：有什么区别？', description: '并排比较 Docker 和 Kubernetes。用途、范围、复杂性、扩展性、学习曲线及使用场景的差异。' },
  ja: { title: 'Docker vs Kubernetes：何が違う？', description: 'DockerとKubernetesを並べて比較。目的、範囲、複雑さ、スケーリング、使用ケースの違い。' },
  ko: { title: 'Docker vs Kubernetes: 차이점은?', description: 'Docker와 Kubernetes를 나란히 비교합니다. 목적, 범위, 복잡성, 스케일링 및 사용 사례의 차이점.' },
  id: { title: 'Docker vs Kubernetes: Apa Bedanya?', description: 'Bandingkan Docker dan Kubernetes. Perbedaan tujuan, cakupan, kompleksitas, skalabilitas, dan kasus penggunaan.' },
  th: { title: 'Docker vs Kubernetes: อะไรคือความแตกต่าง?', description: 'เปรียบเทียบ Docker และ Kubernetes วัตถุประสงค์ ขอบเขต ความซับซ้อน การปรับขนาด และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/docker-vs-kubernetes`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/docker-vs-kubernetes`])
        ),
        'x-default': `https://viadreams.cc/en/tools/docker-vs-kubernetes`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
