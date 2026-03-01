import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Chmod Visualizer - Interactive Permission Calculator', description: 'Interactive chmod permission calculator. Convert between symbolic and numeric file permissions. Visualize and understand Unix/Linux file permissions.' },
  zh: { title: 'Chmod 可视化工具 - 交互式权限计算器', description: '交互式 chmod 权限计算器。在符号和数字文件权限之间转换。可视化理解 Unix/Linux 文件权限。' },
  ja: { title: 'Chmod ビジュアライザー - インタラクティブ権限計算', description: 'インタラクティブなchmod権限計算ツール。シンボリックと数値のファイル権限を変換。' },
  ko: { title: 'Chmod 시각화 도구 - 대화형 권한 계산기', description: '대화형 chmod 권한 계산기. 심볼릭과 숫자 파일 권한 간 변환.' },
  fr: { title: 'Chmod Visualiseur - Calculateur de Permissions', description: 'Calculateur interactif de permissions chmod. Convertissez entre permissions symboliques et numeriques.' },
  de: { title: 'Chmod Visualisierer - Interaktiver Rechte-Rechner', description: 'Interaktiver chmod-Berechtigungsrechner. Konvertierung zwischen symbolischen und numerischen Dateiberechtigungen.' },
  es: { title: 'Chmod Visualizador - Calculadora de Permisos', description: 'Calculadora interactiva de permisos chmod. Convierte entre permisos simbolicos y numericos.' },
  pt: { title: 'Chmod Visualizador - Calculadora de Permissoes', description: 'Calculadora interativa de permissoes chmod. Converta entre permissoes simbolicas e numericas.' },
  it: { title: 'Chmod Visualizzatore - Calcolatore Permessi', description: 'Calcolatore interattivo di permessi chmod. Converti tra permessi simbolici e numerici.' },
  nl: { title: 'Chmod Visualisatie - Interactieve Rechten Calculator', description: 'Interactieve chmod-rechten calculator. Converteer tussen symbolische en numerieke bestandsrechten.' },
  pl: { title: 'Chmod Wizualizator - Kalkulator Uprawnien', description: 'Interaktywny kalkulator uprawnien chmod. Konwertuj miedzy uprawnieniami symbolicznymi i numerycznymi.' },
  sv: { title: 'Chmod Visualiserare - Interaktiv Raettighetskalkylatorn', description: 'Interaktiv chmod-raettighetskalkylatorn. Konvertera mellan symboliska och numeriska filraettigheter.' },
  no: { title: 'Chmod Visualisering - Interaktiv Rettighetskalkulator', description: 'Interaktiv chmod-rettighetskalkulator. Konverter mellom symboliske og numeriske filtilganger.' },
  id: { title: 'Chmod Visualizer - Kalkulator Izin Interaktif', description: 'Kalkulator izin chmod interaktif. Konversi antara izin file simbolik dan numerik.' },
  th: { title: 'Chmod Visualizer - เครื่องคำนวณสิทธิ์แบบโต้ตอบ', description: 'เครื่องคำนวณสิทธิ์ chmod แบบโต้ตอบ แปลงระหว่างสิทธิ์ไฟล์แบบสัญลักษณ์และตัวเลข' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/chmod-visualizer`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/chmod-visualizer`])), 'x-default': `https://viadreams.cc/en/tools/chmod-visualizer` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
