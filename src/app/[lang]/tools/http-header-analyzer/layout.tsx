import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTTP Header Analyzer - Parse & Explain HTTP Headers', description: 'Parse and analyze HTTP response headers. Understand each header\'s purpose, security implications, and best practices. Free online HTTP header tool.' },
  fr: { title: 'Analyseur d\'En-tetes HTTP en Ligne Gratuit', description: 'Analysez et comprenez les en-tetes de reponse HTTP. Decouvrez le role de chaque en-tete et les bonnes pratiques de securite.' },
  de: { title: 'HTTP-Header Analysator Online Kostenlos', description: 'HTTP-Antwort-Header analysieren und verstehen. Erfahren Sie den Zweck jedes Headers und Sicherheitsimplikationen.' },
  it: { title: 'Analizzatore di Header HTTP Online Gratis', description: 'Analizza e comprendi gli header di risposta HTTP. Scopri lo scopo di ogni header e le implicazioni di sicurezza.' },
  es: { title: 'Analizador de Encabezados HTTP Gratis', description: 'Analice y comprenda los encabezados de respuesta HTTP. Descubra el proposito de cada encabezado y las implicaciones de seguridad.' },
  pt: { title: 'Analisador de Cabecalhos HTTP Online', description: 'Analise e entenda os cabecalhos de resposta HTTP. Descubra o proposito de cada cabecalho e as implicacoes de seguranca.' },
  nl: { title: 'HTTP Header Analysator Gratis Online', description: 'Analyseer en begrijp HTTP response headers. Ontdek het doel van elke header en beveiligingsimplicaties.' },
  pl: { title: 'Analizator Naglowkow HTTP Online', description: 'Analizuj i zrozum naglowki odpowiedzi HTTP. Poznaj cel kazdego naglowka i implikacje bezpieczenstwa.' },
  sv: { title: 'HTTP Header Analysator Online Gratis', description: 'Analysera och foerstaa HTTP-svarshuvuden. Laer dig syftet med varje header och saekerhetskimplikationer.' },
  no: { title: 'HTTP Header Analyseverktoy Online Gratis', description: 'Analyser og forstaa HTTP-svarhoder. Laer om formalet med hver header og sikkerhetsimplikasjoner.' },
  zh: { title: 'HTTP 请求头分析工具 - 在线解析与说明', description: '解析和分析 HTTP 响应头。了解每个请求头的用途、安全含义和最佳实践。免费在线 HTTP 头部工具。' },
  ja: { title: 'HTTP ヘッダー分析ツール - 無料オンライン', description: 'HTTP レスポンスヘッダーを解析・分析。各ヘッダーの目的、セキュリティへの影響、ベストプラクティスを理解。' },
  ko: { title: 'HTTP 헤더 분석 도구 - 무료 온라인', description: 'HTTP 응답 헤더를 파싱하고 분석합니다. 각 헤더의 목적, 보안 영향 및 모범 사례를 이해하세요.' },
  id: { title: 'Penganalisis Header HTTP Online Gratis', description: 'Parse dan analisis header respons HTTP. Pahami tujuan setiap header dan implikasi keamanan.' },
  th: { title: 'เครื่องมือวิเคราะห์ HTTP Header ออนไลน์ฟรี', description: 'แยกวิเคราะห์และทำความเข้าใจ HTTP Response Headers ดูจุดประสงค์และผลกระทบด้านความปลอดภัย' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/http-header-analyzer`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/http-header-analyzer`])), 'x-default': `https://viadreams.cc/en/tools/http-header-analyzer` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
