import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Crontab Guru - Interactive Cron Expression Builder', description: 'Build and understand cron expressions interactively. Get natural language explanations and see next scheduled run times. Free online crontab tool.' },
  fr: { title: 'Crontab Guru - Constructeur d\'Expressions Cron Interactif', description: 'Construisez et comprenez les expressions cron de maniere interactive avec des explications en langage naturel.' },
  de: { title: 'Crontab Guru - Interaktiver Cron-Ausdruck-Builder', description: 'Erstellen und verstehen Sie Cron-Ausdruecke interaktiv mit natuerlichsprachlichen Erklaerungen.' },
  it: { title: 'Crontab Guru - Costruttore Interattivo di Espressioni Cron', description: 'Costruisci e comprendi le espressioni cron in modo interattivo con spiegazioni in linguaggio naturale.' },
  es: { title: 'Crontab Guru - Constructor Interactivo de Expresiones Cron', description: 'Construya y comprenda expresiones cron interactivamente con explicaciones en lenguaje natural.' },
  pt: { title: 'Crontab Guru - Construtor Interativo de Expressoes Cron', description: 'Construa e entenda expressoes cron interativamente com explicacoes em linguagem natural.' },
  nl: { title: 'Crontab Guru - Interactieve Cron Expressie Builder', description: 'Bouw en begrijp cron-expressies interactief met uitleg in gewone taal.' },
  pl: { title: 'Crontab Guru - Interaktywny Kreator Wyrazen Cron', description: 'Buduj i rozumiej wyrazenia cron interaktywnie z objasnien w jezyku naturalnym.' },
  sv: { title: 'Crontab Guru - Interaktiv Cron-uttrycksbyggare', description: 'Bygg och foerstaa cron-uttryck interaktivt med foerklaringar paa vanligt spraak.' },
  no: { title: 'Crontab Guru - Interaktiv Cron-uttrykksbygger', description: 'Bygg og forstaa cron-uttrykk interaktivt med forklaringer paa vanlig spraak.' },
  zh: { title: 'Crontab 大师 - 交互式 Cron 表达式构建器', description: '交互式构建和理解 cron 表达式。获取自然语言解释并查看下次计划运行时间。免费在线 crontab 工具。' },
  ja: { title: 'Crontab Guru - インタラクティブ Cron 式ビルダー', description: 'Cron式をインタラクティブに構築・理解。自然言語の説明と次の実行予定時刻を表示。' },
  ko: { title: 'Crontab Guru - 대화형 Cron 표현식 빌더', description: '대화형으로 cron 표현식을 구축하고 이해합니다. 자연어 설명과 다음 실행 시간을 확인하세요.' },
  id: { title: 'Crontab Guru - Pembuat Ekspresi Cron Interaktif', description: 'Bangun dan pahami ekspresi cron secara interaktif dengan penjelasan bahasa alami.' },
  th: { title: 'Crontab Guru - สร้าง Cron Expression แบบอินเทอร์แอคทีฟ', description: 'สร้างและทำความเข้าใจ cron expression แบบอินเทอร์แอคทีฟพร้อมคำอธิบายภาษาธรรมชาติ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/crontab-guru`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/crontab-guru`])), 'x-default': `https://viadreams.cc/en/tools/crontab-guru` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
