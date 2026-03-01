import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Crontab Validator - Validate and Explain Cron Expressions Online', description: 'Validate cron expressions and see next 5 run times. Understand crontab syntax with human-readable explanations. Free online cron validator.' },
  fr: { title: 'Validateur Crontab - Valider les Expressions Cron en Ligne', description: 'Validez les expressions cron et voyez les 5 prochaines executions. Comprenez la syntaxe crontab.' },
  de: { title: 'Crontab-Validator - Cron-Ausdrucke Online Validieren', description: 'Cron-Ausdrucke validieren und die nachsten 5 Ausfuhrungszeiten anzeigen. Crontab-Syntax verstehen.' },
  it: { title: 'Validatore Crontab - Valida Espressioni Cron Online', description: 'Valida le espressioni cron e vedi i prossimi 5 tempi di esecuzione. Comprendi la sintassi crontab.' },
  es: { title: 'Validador Crontab - Validar Expresiones Cron en Linea', description: 'Valida expresiones cron y ve los proximos 5 tiempos de ejecucion. Comprende la sintaxis crontab.' },
  pt: { title: 'Validador Crontab - Validar Expressoes Cron Online', description: 'Valide expressoes cron e veja os proximos 5 tempos de execucao. Compreenda a sintaxe crontab.' },
  nl: { title: 'Crontab Validator - Cron Expressies Online Valideren', description: 'Valideer cron-expressies en zie de volgende 5 uitvoertijden. Begrijp crontab-syntaxis.' },
  pl: { title: 'Walidator Crontab - Walidacja Wyrazen Cron Online', description: 'Waliduj wyrazenia cron i sprawdz nastepne 5 czasow uruchomienia. Zrozum skladnie crontab.' },
  sv: { title: 'Crontab Validator - Validera Cron-Uttryck Online', description: 'Validera cron-uttryck och se nasta 5 exekveringstider. Forsta crontab-syntax.' },
  no: { title: 'Crontab Validator - Valider Cron-Uttrykk Online', description: 'Valider cron-uttrykk og se de neste 5 kjoretidene. Forsta crontab-syntaks.' },
  zh: { title: 'Crontab 验证器 - 在线验证并解释 Cron 表达式', description: '在线验证 cron 表达式，查看接下来5次运行时间，支持常见预设和人类可读的说明。' },
  ja: { title: 'Crontab バリデーター - Cron 式をオンラインで検証', description: 'Cron式を検証し、次の5回の実行時刻を確認します。人間が読めるcrontab構文の説明付き。' },
  ko: { title: 'Crontab 검증기 - Cron 표현식 온라인 검증', description: 'Cron 표현식을 검증하고 다음 5번의 실행 시간을 확인합니다. 사람이 읽기 쉬운 설명 포함.' },
  id: { title: 'Validator Crontab - Validasi Ekspresi Cron Online', description: 'Validasi ekspresi cron dan lihat 5 waktu eksekusi berikutnya. Pahami sintaks crontab.' },
  th: { title: 'ตรวจสอบ Crontab - ตรวจสอบ Cron Expression ออนไลน์', description: 'ตรวจสอบ cron expressions และดูเวลาทำงาน 5 ครั้งถัดไป เข้าใจไวยากรณ์ crontab' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/crontab-validator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/crontab-validator`])), 'x-default': `https://viadreams.cc/en/tools/crontab-validator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
