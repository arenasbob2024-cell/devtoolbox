import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Cron Expression Parser - Explain Cron in Plain English', description: 'Parse and explain cron expressions in plain English. Field-by-field breakdown, next 10 run times, validation, and 15+ common pattern examples. Free online cron to English converter.' },
  fr: { title: 'Analyseur d\'Expressions Cron - Explication en Francais', description: 'Analysez et expliquez les expressions cron en francais. Decomposition champ par champ, 10 prochaines executions, validation et plus de 15 exemples de modeles courants.' },
  de: { title: 'Cron Expression Parser - Cron verstaendlich erklaert', description: 'Analysieren und erklaeren Sie Cron-Ausdruecke in verstaendlicher Sprache. Feld-fuer-Feld-Aufschluesselung, naechste 10 Ausfuehrungen, Validierung und 15+ Beispielmuster.' },
  it: { title: 'Parser Espressioni Cron - Spiega Cron in Italiano', description: 'Analizza e spiega le espressioni cron in italiano. Scomposizione campo per campo, prossime 10 esecuzioni, validazione e oltre 15 esempi di pattern comuni.' },
  es: { title: 'Analizador de Expresiones Cron - Explicar Cron en Espanol', description: 'Analiza y explica expresiones cron en espanol. Desglose campo por campo, proximas 10 ejecuciones, validacion y mas de 15 ejemplos de patrones comunes.' },
  pt: { title: 'Analisador de Expressoes Cron - Explicar Cron em Portugues', description: 'Analise e explique expressoes cron em portugues. Detalhamento campo a campo, proximas 10 execucoes, validacao e mais de 15 exemplos de padroes comuns.' },
  nl: { title: 'Cron Expression Parser - Cron Uitleg in het Nederlands', description: 'Analyseer en leg cron-expressies uit in begrijpelijke taal. Veld-voor-veld uitsplitsing, volgende 10 uitvoertijden, validatie en 15+ veelgebruikte patronen.' },
  pl: { title: 'Parser Wyrazen Cron - Wyjasnienie Cron po Polsku', description: 'Analizuj i wyjasniaj wyrazenia cron w prostym jezyku. Rozbicie pole po polu, nastepne 10 uruchomien, walidacja i ponad 15 przykladow typowych wzorcow.' },
  sv: { title: 'Cron Expression Parser - Foerklara Cron pa Svenska', description: 'Analysera och foerklara cron-uttryck pa begriplig svenska. Faelt-foer-faelt-uppdelning, naesta 10 koerningar, validering och 15+ vanliga moenstexempel.' },
  no: { title: 'Cron Expression Parser - Forklar Cron pa Norsk', description: 'Analyser og forklar cron-uttrykk pa forstaelig norsk. Felt-for-felt-oppdeling, neste 10 kjoringer, validering og 15+ vanlige monster-eksempler.' },
  zh: { title: 'Cron 表达式解析器 - 用通俗语言解释 Cron', description: '用通俗语言解析和解释 cron 表达式。逐字段分解、下 10 次运行时间、验证以及 15+ 常见模式示例。免费在线 cron 表达式解释工具。' },
  ja: { title: 'Cron 式パーサー - Cron を分かりやすく説明', description: 'cron 式を分かりやすい言葉で解析・説明。フィールドごとの分解、次の10回の実行時間、バリデーション、15以上の一般的なパターン例。' },
  ko: { title: 'Cron 표현식 파서 - Cron을 쉽게 설명', description: 'cron 표현식을 쉬운 말로 해석하고 설명합니다. 필드별 분석, 다음 10회 실행 시간, 검증, 15개 이상의 일반적인 패턴 예제.' },
  id: { title: 'Parser Ekspresi Cron - Jelaskan Cron dalam Bahasa Sederhana', description: 'Parsing dan jelaskan ekspresi cron dalam bahasa sederhana. Rincian per field, 10 waktu eksekusi berikutnya, validasi, dan 15+ contoh pola umum.' },
  th: { title: 'Cron Expression Parser - อธิบาย Cron เป็นภาษาง่ายๆ', description: 'แยกวิเคราะห์และอธิบายนิพจน์ cron เป็นภาษาง่ายๆ แยกตามฟิลด์ แสดง 10 เวลาทำงานถัดไป ตรวจสอบ และตัวอย่างรูปแบบทั่วไปกว่า 15 แบบ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const slug = 'cron-expression-parser';
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])
        ),
        'x-default': `https://viadreams.cc/en/tools/${slug}`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
