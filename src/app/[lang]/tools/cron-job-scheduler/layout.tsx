import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Cron Job Scheduler - Free Online Cron Schedule Builder', description: 'Schedule cron jobs with an interactive visual editor. Quick schedule buttons, next 10 run times, platform-specific examples for Linux, GitHub Actions, AWS, and Kubernetes.' },
  fr: { title: 'Planificateur de Taches Cron - Editeur de Planification Cron en Ligne', description: 'Planifiez des taches cron avec un editeur visuel interactif. Boutons de planification rapide, 10 prochaines executions, exemples pour Linux, GitHub Actions, AWS et Kubernetes.' },
  de: { title: 'Cron Job Scheduler - Kostenloser Online Cron Zeitplaner', description: 'Planen Sie Cron-Jobs mit einem interaktiven visuellen Editor. Schnellplanungs-Buttons, naechste 10 Ausfuehrungen, plattformspezifische Beispiele fuer Linux, GitHub Actions, AWS und Kubernetes.' },
  it: { title: 'Pianificatore Cron Job - Editor Cron Schedule Online Gratuito', description: 'Pianifica cron job con un editor visuale interattivo. Pulsanti di pianificazione rapida, prossime 10 esecuzioni, esempi per Linux, GitHub Actions, AWS e Kubernetes.' },
  es: { title: 'Programador de Cron Jobs - Editor de Horarios Cron en Linea', description: 'Programa tareas cron con un editor visual interactivo. Botones de programacion rapida, proximas 10 ejecuciones, ejemplos para Linux, GitHub Actions, AWS y Kubernetes.' },
  pt: { title: 'Agendador de Cron Jobs - Editor de Agendamento Cron Online', description: 'Agende cron jobs com um editor visual interativo. Botoes de agendamento rapido, proximas 10 execucoes, exemplos para Linux, GitHub Actions, AWS e Kubernetes.' },
  nl: { title: 'Cron Job Planner - Gratis Online Cron Schema Bouwer', description: 'Plan cron jobs met een interactieve visuele editor. Snelle planningsknoppen, volgende 10 uitvoertijden, platformspecifieke voorbeelden voor Linux, GitHub Actions, AWS en Kubernetes.' },
  pl: { title: 'Harmonogram Cron Job - Darmowy Edytor Harmonogramu Cron Online', description: 'Zaplanuj zadania cron za pomoca interaktywnego edytora wizualnego. Przyciski szybkiego planowania, nastepne 10 uruchomien, przyklady dla Linux, GitHub Actions, AWS i Kubernetes.' },
  sv: { title: 'Cron Job Schemalaggaree - Gratis Online Cron Schema Byggare', description: 'Schemalagga cron-jobb med en interaktiv visuell redigerare. Snabbschemaknappar, nasta 10 korningar, plattformsspecifika exempel for Linux, GitHub Actions, AWS och Kubernetes.' },
  no: { title: 'Cron Job Planlegger - Gratis Online Cron Tidsplan Bygger', description: 'Planlegg cron-jobber med en interaktiv visuell editor. Hurtigplanleggingsknapper, neste 10 kjoringer, plattformspesifikke eksempler for Linux, GitHub Actions, AWS og Kubernetes.' },
  zh: { title: 'Cron 任务调度器 - 免费在线 Cron 计划构建工具', description: '使用交互式可视化编辑器调度 cron 任务。快速调度按钮，显示下 10 次运行时间，提供 Linux、GitHub Actions、AWS 和 Kubernetes 平台示例。' },
  ja: { title: 'Cron ジョブスケジューラー - 無料オンライン Cron スケジュールビルダー', description: 'インタラクティブなビジュアルエディターで cron ジョブをスケジュール。クイックスケジュールボタン、次の10回の実行時間、Linux・GitHub Actions・AWS・Kubernetes のプラットフォーム別例。' },
  ko: { title: 'Cron 작업 스케줄러 - 무료 온라인 Cron 스케줄 빌더', description: '대화형 비주얼 에디터로 cron 작업을 예약하세요. 빠른 스케줄 버튼, 다음 10회 실행 시간, Linux, GitHub Actions, AWS, Kubernetes 플랫폼별 예제.' },
  id: { title: 'Penjadwal Cron Job - Pembuat Jadwal Cron Online Gratis', description: 'Jadwalkan cron job dengan editor visual interaktif. Tombol jadwal cepat, 10 waktu eksekusi berikutnya, contoh untuk Linux, GitHub Actions, AWS, dan Kubernetes.' },
  th: { title: 'Cron Job Scheduler - เครื่องมือจัดตารางเวลา Cron ออนไลน์ฟรี', description: 'จัดตารางเวลา cron job ด้วยตัวแก้ไขภาพแบบโต้ตอบ ปุ่มจัดตารางเวลาด่วน แสดง 10 เวลาทำงานถัดไป ตัวอย่างสำหรับ Linux, GitHub Actions, AWS และ Kubernetes' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const slug = 'cron-job-scheduler';
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
