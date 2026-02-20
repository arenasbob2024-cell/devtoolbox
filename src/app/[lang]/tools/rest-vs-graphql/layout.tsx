import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'REST vs GraphQL: Which API Architecture Should You Use?', description: 'Compare REST APIs and GraphQL side by side. Differences in architecture, data fetching, over-fetching, caching, learning curve, and use cases.' },
  fr: { title: 'REST vs GraphQL : Quelle architecture API choisir ?', description: 'Comparez les API REST et GraphQL cote a cote. Differences d\'architecture, de recuperation de donnees, de cache et de cas d\'utilisation.' },
  de: { title: 'REST vs GraphQL: Welche API-Architektur sollten Sie verwenden?', description: 'Vergleichen Sie REST-APIs und GraphQL. Unterschiede bei Architektur, Datenabruf, Caching und Anwendungsfaellen.' },
  it: { title: 'REST vs GraphQL: Quale architettura API scegliere?', description: 'Confronta le API REST e GraphQL fianco a fianco. Differenze di architettura, recupero dati, caching e casi d\'uso.' },
  es: { title: 'REST vs GraphQL: Que arquitectura API deberias usar?', description: 'Compara APIs REST y GraphQL lado a lado. Diferencias en arquitectura, obtencion de datos, almacenamiento en cache y casos de uso.' },
  pt: { title: 'REST vs GraphQL: Qual arquitetura de API voce deve usar?', description: 'Compare APIs REST e GraphQL lado a lado. Diferencas em arquitetura, busca de dados, cache e casos de uso.' },
  nl: { title: 'REST vs GraphQL: Welke API-architectuur moet je gebruiken?', description: 'Vergelijk REST-API\'s en GraphQL naast elkaar. Verschillen in architectuur, data ophalen, caching en gebruiksscenario\'s.' },
  pl: { title: 'REST vs GraphQL: Ktora architekture API wybrac?', description: 'Porownaj API REST i GraphQL obok siebie. Roznice w architekturze, pobieraniu danych, cache\'owaniu i zastosowaniach.' },
  sv: { title: 'REST vs GraphQL: Vilken API-arkitektur ska du anvanda?', description: 'Jamfor REST-API:er och GraphQL sida vid sida. Skillnader i arkitektur, datahamtning, cachning och anvandningsfall.' },
  no: { title: 'REST vs GraphQL: Hvilken API-arkitektur bor du bruke?', description: 'Sammenlign REST-API-er og GraphQL side om side. Forskjeller i arkitektur, datahenting, caching og bruksomrader.' },
  zh: { title: 'REST vs GraphQL：应该使用哪种 API 架构？', description: '并排比较 REST API 和 GraphQL。架构、数据获取、过度获取、缓存、学习曲线及使用场景的差异。' },
  ja: { title: 'REST vs GraphQL：どちらのAPIアーキテクチャを使うべき？', description: 'REST APIとGraphQLを並べて比較。アーキテクチャ、データ取得、キャッシング、使用ケースの違い。' },
  ko: { title: 'REST vs GraphQL: 어떤 API 아키텍처를 사용해야 할까요?', description: 'REST API와 GraphQL을 나란히 비교합니다. 아키텍처, 데이터 가져오기, 캐싱 및 사용 사례의 차이점.' },
  id: { title: 'REST vs GraphQL: Arsitektur API Mana yang Harus Anda Gunakan?', description: 'Bandingkan REST API dan GraphQL. Perbedaan arsitektur, pengambilan data, caching, dan kasus penggunaan.' },
  th: { title: 'REST vs GraphQL: ควรใช้สถาปัตยกรรม API แบบไหน?', description: 'เปรียบเทียบ REST API และ GraphQL สถาปัตยกรรม การดึงข้อมูล แคช และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/rest-vs-graphql`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/rest-vs-graphql`])
        ),
        'x-default': `https://viadreams.cc/en/tools/rest-vs-graphql`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
