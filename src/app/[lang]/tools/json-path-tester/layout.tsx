import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSONPath Tester - Test JSONPath Expressions Online', description: 'Test JSONPath expressions against JSON data with real-time results. Debug and validate JSONPath queries with syntax highlighting and instant feedback.' },
  fr: { title: 'Testeur JSONPath - Testez les Expressions en Ligne', description: 'Testez les expressions JSONPath sur des donnees JSON avec des resultats en temps reel.' },
  de: { title: 'JSONPath Tester - JSONPath-Ausdruecke Online Testen', description: 'Testen Sie JSONPath-Ausdruecke gegen JSON-Daten mit Echtzeit-Ergebnissen.' },
  it: { title: 'Tester JSONPath - Testa Espressioni Online', description: 'Testa espressioni JSONPath su dati JSON con risultati in tempo reale.' },
  es: { title: 'Probador JSONPath - Pruebe Expresiones en Linea', description: 'Pruebe expresiones JSONPath contra datos JSON con resultados en tiempo real.' },
  pt: { title: 'Testador JSONPath - Teste Expressoes Online', description: 'Teste expressoes JSONPath contra dados JSON com resultados em tempo real.' },
  nl: { title: 'JSONPath Tester - Test Expressies Online', description: 'Test JSONPath-expressies tegen JSON-data met realtime resultaten.' },
  pl: { title: 'Tester JSONPath - Testuj Wyrazenia Online', description: 'Testuj wyrazenia JSONPath na danych JSON z wynikami w czasie rzeczywistym.' },
  sv: { title: 'JSONPath Testare - Testa Uttryck Online', description: 'Testa JSONPath-uttryck mot JSON-data med realtidsresultat.' },
  no: { title: 'JSONPath Tester - Test Uttrykk Online', description: 'Test JSONPath-uttrykk mot JSON-data med sanntidsresultater.' },
  zh: { title: 'JSONPath 测试工具 - 在线测试 JSONPath 表达式', description: '使用实时结果测试 JSONPath 表达式。调试和验证 JSONPath 查询，支持语法高亮和即时反馈。' },
  ja: { title: 'JSONPath テスター - オンラインで式をテスト', description: 'リアルタイム結果でJSONPathの式をテスト。構文ハイライトと即座のフィードバック。' },
  ko: { title: 'JSONPath 테스터 - 온라인 표현식 테스트', description: '실시간 결과로 JSONPath 표현식을 테스트합니다. 구문 강조 및 즉각적인 피드백.' },
  id: { title: 'Penguji JSONPath - Uji Ekspresi Online', description: 'Uji ekspresi JSONPath terhadap data JSON dengan hasil real-time.' },
  th: { title: 'JSONPath Tester - ทดสอบนิพจน์ออนไลน์', description: 'ทดสอบนิพจน์ JSONPath กับข้อมูล JSON พร้อมผลลัพธ์แบบเรียลไทม์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-path-tester`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-path-tester`])), 'x-default': `https://viadreams.cc/en/tools/json-path-tester` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
