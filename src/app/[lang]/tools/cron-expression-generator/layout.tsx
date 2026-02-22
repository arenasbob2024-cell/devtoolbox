import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Cron Expression Generator - Visual Cron Job Builder', description: 'Build cron expressions visually with live preview of next 5 run times. Free online cron job scheduler and expression parser.' },
  fr: { title: 'Generateur d\'Expressions Cron - Constructeur Visuel', description: 'Construisez des expressions cron visuellement avec apercu des 5 prochaines executions.' },
  de: { title: 'Cron Ausdruck Generator - Visueller Cron Builder', description: 'Erstellen Sie Cron-Ausdruecke visuell mit Live-Vorschau der naechsten 5 Ausfuehrungen.' },
  it: { title: 'Generatore Espressioni Cron - Builder Visuale', description: 'Costruisci espressioni cron visivamente con anteprima delle prossime 5 esecuzioni.' },
  es: { title: 'Generador de Expresiones Cron - Constructor Visual', description: 'Construya expresiones cron visualmente con vista previa de las proximas 5 ejecuciones.' },
  pt: { title: 'Gerador de Expressoes Cron - Construtor Visual', description: 'Construa expressoes cron visualmente com previa das proximas 5 execucoes.' },
  nl: { title: 'Cron Expressie Generator - Visuele Cron Builder', description: 'Bouw cron-expressies visueel met live voorbeeld van de volgende 5 uitvoeringen.' },
  pl: { title: 'Generator Wyrazen Cron - Wizualny Kreator', description: 'Buduj wyrazenia cron wizualnie z podgladem nastepnych 5 uruchomien.' },
  sv: { title: 'Cron Uttryck Generator - Visuell Cron Byggare', description: 'Bygg cron-uttryck visuellt med foerhandsvisning av naesta 5 koerningar.' },
  no: { title: 'Cron Uttrykk Generator - Visuell Cron Bygger', description: 'Bygg cron-uttrykk visuelt med foerhandsvisning av neste 5 kjoringer.' },
  zh: { title: 'Cron 表达式生成器 - 可视化构建器', description: '可视化构建 cron 表达式，实时预览接下来 5 次运行时间。免费在线 cron 任务调度器。' },
  ja: { title: 'Cron 式ジェネレーター - ビジュアル Cron ビルダー', description: 'ビジュアルで cron 式を構築。次の 5 回の実行時刻をライブプレビュー。' },
  ko: { title: 'Cron 표현식 생성기 - 비주얼 Cron 빌더', description: '비주얼로 cron 표현식을 구축하고 다음 5회 실행 시간을 미리봅니다.' },
  id: { title: 'Generator Ekspresi Cron - Builder Visual', description: 'Bangun ekspresi cron secara visual dengan pratinjau 5 waktu eksekusi berikutnya.' },
  th: { title: 'ตัวสร้างนิพจน์ Cron - ตัวสร้างแบบเห็นภาพ', description: 'สร้างนิพจน์ cron แบบเห็นภาพพร้อมแสดงตัวอย่าง 5 เวลาทำงานถัดไป' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/cron-expression-generator`;
  return {
    title: t.title, description: t.description,
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/cron-expression-generator`])), 'x-default': `https://viadreams.cc/en/tools/cron-expression-generator` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
