import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Crontab Generator - Free Online Cron Expression Builder & Maker', description: 'Free online crontab generator and cron expression builder. Create cron schedules visually with dropdowns, presets, and next run time preview. Supports all cron syntax.' },
  fr: { title: 'Generateur Crontab - Constructeur de Cron en Ligne Gratuit', description: 'Generateur crontab et constructeur d\'expressions cron gratuit en ligne. Creez des planifications cron visuellement avec presets et apercu.' },
  de: { title: 'Crontab Generator - Kostenloser Online Cron Ausdruck Builder', description: 'Kostenloser Online Crontab Generator und Cron Ausdruck Builder. Erstellen Sie Cron-Zeitplaene visuell mit Dropdowns und Vorschau.' },
  it: { title: 'Generatore Crontab - Costruttore Espressioni Cron Online Gratis', description: 'Generatore crontab e costruttore di espressioni cron gratuito online. Crea pianificazioni cron visualmente con preset e anteprima.' },
  es: { title: 'Generador Crontab - Constructor de Expresiones Cron en Linea Gratis', description: 'Generador crontab y constructor de expresiones cron gratuito en linea. Cree planificaciones cron visualmente con presets y vista previa.' },
  pt: { title: 'Gerador Crontab - Construtor de Expressoes Cron Online Gratis', description: 'Gerador crontab e construtor de expressoes cron gratuito online. Crie agendamentos cron visualmente com presets e pre-visualizacao.' },
  nl: { title: 'Crontab Generator - Gratis Online Cron Expressie Bouwer', description: 'Gratis online crontab generator en cron expressie bouwer. Maak cron-schema\'s visueel met dropdowns en voorvertoning.' },
  pl: { title: 'Generator Crontab - Darmowy Kreator Wyrazen Cron Online', description: 'Darmowy generator crontab i kreator wyrazen cron online. Tworzenie harmonogramow cron wizualnie z presetami i podgladem.' },
  sv: { title: 'Crontab Generator - Gratis Online Cron Uttryck Byggare', description: 'Gratis online crontab generator och cron uttryck byggare. Skapa cron-scheman visuellt med rullgardinsmenyer och forhandsvisning.' },
  no: { title: 'Crontab Generator - Gratis Online Cron Uttrykk Bygger', description: 'Gratis online crontab generator og cron uttrykk bygger. Lag cron-planer visuelt med nedtrekksmenyer og forhåndsvisning.' },
  zh: { title: 'Crontab 生成器 - 免费在线 Cron 表达式构建工具', description: '免费在线 crontab 生成器和 cron 表达式构建工具。通过下拉菜单和预设可视化创建 cron 调度计划，支持所有 cron 语法。' },
  ja: { title: 'Crontab ジェネレーター - 無料オンライン Cron 式ビルダー', description: '無料オンライン crontab ジェネレーターと cron 式ビルダー。ドロップダウンとプリセットで cron スケジュールを視覚的に作成。' },
  ko: { title: 'Crontab 생성기 - 무료 온라인 Cron 표현식 빌더', description: '무료 온라인 crontab 생성기 및 cron 표현식 빌더. 드롭다운과 프리셋으로 cron 스케줄을 시각적으로 생성하세요.' },
  id: { title: 'Generator Crontab - Pembuat Ekspresi Cron Online Gratis', description: 'Generator crontab dan pembuat ekspresi cron online gratis. Buat jadwal cron secara visual dengan dropdown dan pratinjau.' },
  th: { title: 'Crontab Generator - เครื่องมือสร้างนิพจน์ Cron ออนไลน์ฟรี', description: 'เครื่องมือสร้าง crontab และนิพจน์ cron ออนไลน์ฟรี สร้างตารางเวลา cron แบบเห็นภาพด้วยเมนูแบบเลื่อนลงและพรีเซ็ต' },
};

const slug = 'crontab-generator';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['crontab generator', 'cron expression', 'cron builder', 'crontab maker', 'cron job generator', 'crontab syntax', 'cron schedule', 'crontab online'],
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])),
        'x-default': `https://viadreams.cc/en/tools/${slug}`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
