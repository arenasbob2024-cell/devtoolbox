import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Cron Expression Generator - Build Cron Schedules Online Free', description: 'Free online cron expression generator and builder. Create cron schedules visually with presets, human-readable descriptions, and next run time previews.' },
  fr: { title: 'Generateur d\'Expression Cron - Creer des Planifications Cron en Ligne', description: 'Generateur d\'expressions cron gratuit en ligne. Creez des planifications cron visuellement avec des presets et des descriptions lisibles.' },
  de: { title: 'Cron-Ausdruck Generator - Cron Zeitplaene Online Erstellen', description: 'Kostenloser Online Cron-Ausdruck Generator. Erstellen Sie Cron-Zeitplaene visuell mit Presets und lesbaren Beschreibungen.' },
  it: { title: 'Generatore Espressioni Cron - Crea Pianificazioni Cron Online', description: 'Generatore di espressioni cron gratuito online. Crea pianificazioni cron visivamente con preset e descrizioni leggibili.' },
  es: { title: 'Generador de Expresiones Cron - Crear Programaciones Cron en Linea', description: 'Generador de expresiones cron gratuito en linea. Crea programaciones cron visualmente con presets y descripciones legibles.' },
  pt: { title: 'Gerador de Expressoes Cron - Criar Agendamentos Cron Online', description: 'Gerador de expressoes cron gratuito online. Crie agendamentos cron visualmente com presets e descricoes legiveis.' },
  nl: { title: 'Cron Expressie Generator - Cron Schema\'s Online Maken', description: 'Gratis online cron expressie generator. Maak cron schema\'s visueel met presets en leesbare beschrijvingen.' },
  pl: { title: 'Generator Wyrazen Cron - Tworzenie Harmonogramow Cron Online', description: 'Darmowy generator wyrazen cron online. Tworzenie harmonogramow cron wizualnie z presetami i czytelnymi opisami.' },
  sv: { title: 'Cron-uttryck Generator - Skapa Cron-scheman Online Gratis', description: 'Gratis online cron-uttryck generator. Skapa cron-scheman visuellt med presets och lasbara beskrivningar.' },
  no: { title: 'Cron-uttrykk Generator - Lag Cron-planer Online Gratis', description: 'Gratis online cron-uttrykk generator. Lag cron-planer visuelt med presets og lesbare beskrivelser.' },
  zh: { title: 'Cron 表达式生成器 - 免费在线构建 Cron 调度', description: '免费在线 Cron 表达式生成器。可视化构建 Cron 调度，提供常用预设、可读描述和下次执行时间预览。' },
  ja: { title: 'Cron 式ジェネレーター - 無料オンライン Cron スケジュール構築', description: '無料オンライン Cron 式ジェネレーター。プリセット、読みやすい説明、次回実行時間プレビュー付きで Cron スケジュールを構築。' },
  ko: { title: 'Cron 표현식 생성기 - 무료 온라인 Cron 스케줄 구축', description: '무료 온라인 Cron 표현식 생성기. 프리셋, 읽기 쉬운 설명, 다음 실행 시간 미리보기로 Cron 스케줄을 시각적으로 구축.' },
  id: { title: 'Generator Ekspresi Cron - Buat Jadwal Cron Online Gratis', description: 'Generator ekspresi cron online gratis. Buat jadwal cron secara visual dengan preset dan deskripsi yang mudah dibaca.' },
  th: { title: 'ตัวสร้าง Cron Expression - สร้างตาราง Cron ออนไลน์ฟรี', description: 'ตัวสร้าง cron expression ออนไลน์ฟรี สร้างตาราง cron ด้วยภาพพร้อมพรีเซ็ตและคำอธิบายที่อ่านง่าย' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/cron-expression-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/cron-expression-generator`])), 'x-default': `https://viadreams.cc/en/tools/cron-expression-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
