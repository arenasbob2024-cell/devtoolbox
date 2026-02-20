import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Crontab Generator - Free Online Crontab Maker & Builder', description: 'Generate crontab expressions with a visual builder. Select minute, hour, day, month, weekday with dropdowns. Free online crontab syntax generator with next run times.' },
  fr: { title: 'Generateur Crontab - Createur de Crontab en Ligne Gratuit', description: 'Generez des expressions crontab avec un editeur visuel. Selectionnez minute, heure, jour, mois, jour de semaine. Generateur de syntaxe crontab gratuit.' },
  de: { title: 'Crontab Generator - Kostenloser Online Crontab Builder', description: 'Erstellen Sie Crontab-Ausdruecke mit einem visuellen Builder. Waehlen Sie Minute, Stunde, Tag, Monat, Wochentag. Kostenloser Crontab-Syntax-Generator.' },
  it: { title: 'Generatore Crontab - Creatore Crontab Online Gratuito', description: 'Genera espressioni crontab con un editor visuale. Seleziona minuto, ora, giorno, mese, giorno della settimana. Generatore di sintassi crontab gratuito.' },
  es: { title: 'Generador de Crontab - Creador de Crontab en Linea Gratis', description: 'Genera expresiones crontab con un editor visual. Selecciona minuto, hora, dia, mes, dia de la semana. Generador de sintaxis crontab gratuito.' },
  pt: { title: 'Gerador de Crontab - Criador de Crontab Online Gratis', description: 'Gere expressoes crontab com um editor visual. Selecione minuto, hora, dia, mes, dia da semana. Gerador de sintaxe crontab gratuito.' },
  nl: { title: 'Crontab Generator - Gratis Online Crontab Bouwer', description: 'Genereer crontab-expressies met een visuele builder. Selecteer minuut, uur, dag, maand, weekdag. Gratis crontab-syntax generator.' },
  pl: { title: 'Generator Crontab - Darmowy Kreator Crontab Online', description: 'Generuj wyrazenia crontab za pomoca wizualnego edytora. Wybierz minute, godzine, dzien, miesiac, dzien tygodnia. Darmowy generator skladni crontab.' },
  sv: { title: 'Crontab Generator - Gratis Online Crontab Byggare', description: 'Generera crontab-uttryck med en visuell byggare. Valj minut, timme, dag, manad, veckodag. Gratis crontab-syntax generator.' },
  no: { title: 'Crontab Generator - Gratis Online Crontab Bygger', description: 'Generer crontab-uttrykk med en visuell bygger. Velg minutt, time, dag, maned, ukedag. Gratis crontab-syntaks generator.' },
  zh: { title: 'Crontab 生成器 - 免费在线 Crontab 构建工具', description: '使用可视化构建器生成 crontab 表达式。选择分钟、小时、日期、月份、星期。免费在线 crontab 语法生成器，显示下次运行时间。' },
  ja: { title: 'Crontab ジェネレーター - 無料オンライン Crontab ビルダー', description: 'ビジュアルビルダーで crontab 式を生成。分、時、日、月、曜日をドロップダウンで選択。無料オンライン crontab 構文ジェネレーター。' },
  ko: { title: 'Crontab 생성기 - 무료 온라인 Crontab 빌더', description: '비주얼 빌더로 crontab 표현식을 생성하세요. 분, 시, 일, 월, 요일을 선택하세요. 무료 온라인 crontab 구문 생성기.' },
  id: { title: 'Generator Crontab - Pembuat Crontab Online Gratis', description: 'Buat ekspresi crontab dengan builder visual. Pilih menit, jam, hari, bulan, hari dalam seminggu. Generator sintaks crontab online gratis.' },
  th: { title: 'Crontab Generator - เครื่องมือสร้าง Crontab ออนไลน์ฟรี', description: 'สร้างนิพจน์ crontab ด้วยตัวสร้างภาพ เลือกนาที ชั่วโมง วัน เดือน วันในสัปดาห์ เครื่องมือสร้างไวยากรณ์ crontab ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const slug = 'crontab-generator';
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
