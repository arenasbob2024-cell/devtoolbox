import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Chmod Calculator - Unix File Permissions Calculator Online Free', description: 'Free online chmod calculator. Calculate Unix/Linux file permissions with interactive checkboxes, numeric and symbolic notation. Generate chmod commands instantly.' },
  fr: { title: 'Calculateur Chmod - Calculateur de Permissions Unix en Ligne Gratuit', description: 'Calculateur chmod gratuit en ligne. Calculez les permissions de fichiers Unix/Linux avec des cases a cocher interactives, notation numerique et symbolique.' },
  de: { title: 'Chmod Rechner - Unix Dateiberechtigungen Rechner Online Kostenlos', description: 'Kostenloser Online Chmod Rechner. Berechnen Sie Unix/Linux Dateiberechtigungen mit interaktiven Kontrollkaestchen, numerischer und symbolischer Notation.' },
  it: { title: 'Calcolatore Chmod - Calcolatore Permessi File Unix Online Gratis', description: 'Calcolatore chmod gratuito online. Calcola i permessi dei file Unix/Linux con checkbox interattive, notazione numerica e simbolica.' },
  es: { title: 'Calculadora Chmod - Calculadora de Permisos Unix en Linea Gratis', description: 'Calculadora chmod gratuita en linea. Calcule permisos de archivos Unix/Linux con casillas interactivas, notacion numerica y simbolica.' },
  pt: { title: 'Calculadora Chmod - Calculadora de Permissoes Unix Online Gratis', description: 'Calculadora chmod gratuita online. Calcule permissoes de arquivos Unix/Linux com caixas de selecao interativas, notacao numerica e simbolica.' },
  nl: { title: 'Chmod Calculator - Unix Bestandsrechten Calculator Online Gratis', description: 'Gratis online chmod calculator. Bereken Unix/Linux bestandsrechten met interactieve selectievakjes, numerieke en symbolische notatie.' },
  pl: { title: 'Kalkulator Chmod - Kalkulator Uprawnien Unix Online Za Darmo', description: 'Darmowy kalkulator chmod online. Oblicz uprawnienia plikow Unix/Linux z interaktywnymi polami wyboru, notacja numeryczna i symboliczna.' },
  sv: { title: 'Chmod Kalkylator - Unix Filrattighetskalkylator Online Gratis', description: 'Gratis online chmod kalkylator. Berakna Unix/Linux filrattigheter med interaktiva kryssrutor, numerisk och symbolisk notation.' },
  no: { title: 'Chmod Kalkulator - Unix Filtillatelseskalkulator Online Gratis', description: 'Gratis online chmod kalkulator. Beregn Unix/Linux filtillatelser med interaktive avkrysningsbokser, numerisk og symbolsk notasjon.' },
  zh: { title: 'Chmod 计算器 - 免费在线 Unix 文件权限计算器', description: '免费在线 chmod 计算器。使用交互式复选框计算 Unix/Linux 文件权限，支持数字和符号表示法。即时生成 chmod 命令。' },
  ja: { title: 'Chmod 計算機 - 無料オンライン Unix ファイルパーミッション計算ツール', description: '無料オンライン chmod 計算機。インタラクティブなチェックボックスで Unix/Linux ファイルパーミッションを計算。数値・シンボリック表記に対応。' },
  ko: { title: 'Chmod 계산기 - 무료 온라인 Unix 파일 권한 계산기', description: '무료 온라인 chmod 계산기. 대화형 체크박스로 Unix/Linux 파일 권한을 계산하세요. 숫자 및 기호 표기법 지원.' },
  id: { title: 'Kalkulator Chmod - Kalkulator Izin File Unix Online Gratis', description: 'Kalkulator chmod online gratis. Hitung izin file Unix/Linux dengan kotak centang interaktif, notasi numerik dan simbolik.' },
  th: { title: 'เครื่องคำนวณ Chmod - เครื่องคำนวณสิทธิ์ไฟล์ Unix ออนไลน์ฟรี', description: 'เครื่องคำนวณ chmod ออนไลน์ฟรี คำนวณสิทธิ์ไฟล์ Unix/Linux ด้วยช่องทำเครื่องหมายแบบโต้ตอบ สัญกรณ์ตัวเลขและสัญลักษณ์' },
};

const slug = 'chmod-calculator';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['chmod calculator', 'chmod', 'file permissions', 'unix permissions', 'linux permissions', 'chmod command', 'permission calculator', 'chmod 777', 'chmod 755', 'chmod 644'],
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
