import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JavaScript Event Loop Visualizer - Interactive Simulation', description: 'Visualize the JavaScript event loop with call stack, task queue, and microtask queue. Understand async JavaScript execution interactively.' },
  fr: { title: 'Visualiseur de Boucle d\'Evenements JavaScript', description: 'Visualisez la boucle d\'evenements JavaScript avec pile d\'appels, file de taches et file de microtaches. Comprenez l\'execution asynchrone.' },
  de: { title: 'JavaScript Event Loop Visualisierer Online', description: 'Visualisieren Sie die JavaScript Event Loop mit Call Stack, Task Queue und Microtask Queue. Verstehen Sie asynchrones JavaScript.' },
  it: { title: 'Visualizzatore Event Loop JavaScript Online', description: 'Visualizza l\'event loop JavaScript con call stack, coda dei task e coda dei microtask. Comprendi l\'esecuzione asincrona.' },
  es: { title: 'Visualizador del Event Loop JavaScript Gratis', description: 'Visualice el bucle de eventos de JavaScript con pila de llamadas, cola de tareas y cola de microtareas.' },
  pt: { title: 'Visualizador do Event Loop JavaScript Online', description: 'Visualize o event loop do JavaScript com call stack, fila de tarefas e fila de microtarefas.' },
  nl: { title: 'JavaScript Event Loop Visualizer Gratis', description: 'Visualiseer de JavaScript event loop met call stack, taakwachtrij en microtask wachtrij.' },
  pl: { title: 'Wizualizator Petli Zdarzen JavaScript', description: 'Wizualizuj petle zdarzen JavaScript ze stosem wywolan, kolejka zadan i kolejka mikrozadan.' },
  sv: { title: 'JavaScript Event Loop Visualiserare', description: 'Visualisera JavaScript event loop med anropsstack, uppgiftskoer och mikrouppgiftskoer.' },
  no: { title: 'JavaScript Event Loop Visualiseringsverktoy', description: 'Visualiser JavaScript event loop med kallstabel, oppgavekoer og mikrooppgavekoer.' },
  zh: { title: 'JavaScript 事件循环可视化工具 - 交互式模拟', description: '可视化 JavaScript 事件循环，包含调用栈、任务队列和微任务队列。交互式理解异步 JavaScript 执行机制。' },
  ja: { title: 'JavaScript イベントループ ビジュアライザー', description: 'JavaScript イベントループをコールスタック、タスクキュー、マイクロタスクキューで視覚化。非同期実行を理解。' },
  ko: { title: 'JavaScript 이벤트 루프 시각화 도구', description: 'JavaScript 이벤트 루프를 콜 스택, 태스크 큐, 마이크로태스크 큐와 함께 시각화합니다.' },
  id: { title: 'Visualisasi Event Loop JavaScript Online', description: 'Visualisasikan event loop JavaScript dengan call stack, antrian tugas, dan antrian microtask.' },
  th: { title: 'เครื่องมือแสดง Event Loop ของ JavaScript', description: 'แสดง Event Loop ของ JavaScript พร้อม Call Stack, Task Queue และ Microtask Queue แบบโต้ตอบ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/javascript-event-loop-visualizer`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/javascript-event-loop-visualizer`])), 'x-default': `https://viadreams.cc/en/tools/javascript-event-loop-visualizer` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
