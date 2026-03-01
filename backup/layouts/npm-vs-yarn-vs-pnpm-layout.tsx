import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'npm vs Yarn vs pnpm: Which Package Manager Should You Use?', description: 'Compare npm, Yarn, and pnpm package managers side by side. Differences in speed, disk usage, lock files, workspaces, and features.' },
  fr: { title: 'npm vs Yarn vs pnpm : Quel gestionnaire de paquets choisir ?', description: 'Comparez npm, Yarn et pnpm cote a cote. Differences de vitesse, utilisation disque, fichiers de verrouillage et fonctionnalites.' },
  de: { title: 'npm vs Yarn vs pnpm: Welchen Paketmanager sollten Sie verwenden?', description: 'Vergleichen Sie npm, Yarn und pnpm Paketmanager. Unterschiede bei Geschwindigkeit, Speichernutzung, Lock-Dateien und Features.' },
  it: { title: 'npm vs Yarn vs pnpm: Quale gestore pacchetti scegliere?', description: 'Confronta npm, Yarn e pnpm fianco a fianco. Differenze di velocita, utilizzo disco, file di lock e funzionalita.' },
  es: { title: 'npm vs Yarn vs pnpm: Que gestor de paquetes deberias usar?', description: 'Compara npm, Yarn y pnpm lado a lado. Diferencias en velocidad, uso de disco, archivos de bloqueo y funcionalidades.' },
  pt: { title: 'npm vs Yarn vs pnpm: Qual gerenciador de pacotes voce deve usar?', description: 'Compare npm, Yarn e pnpm lado a lado. Diferencas em velocidade, uso de disco, arquivos lock e funcionalidades.' },
  nl: { title: 'npm vs Yarn vs pnpm: Welke pakketbeheerder moet je gebruiken?', description: 'Vergelijk npm, Yarn en pnpm naast elkaar. Verschillen in snelheid, schijfgebruik, lockbestanden en functies.' },
  pl: { title: 'npm vs Yarn vs pnpm: Ktorego menedzera pakietow uzyc?', description: 'Porownaj npm, Yarn i pnpm obok siebie. Roznice w szybkosci, uzyciu dysku, plikach lock i funkcjonalnosciach.' },
  sv: { title: 'npm vs Yarn vs pnpm: Vilken pakethanterare ska du anvanda?', description: 'Jamfor npm, Yarn och pnpm sida vid sida. Skillnader i hastighet, diskanvandning, lock-filer och funktioner.' },
  no: { title: 'npm vs Yarn vs pnpm: Hvilken pakkebehandler bor du bruke?', description: 'Sammenlign npm, Yarn og pnpm side om side. Forskjeller i hastighet, diskbruk, lock-filer og funksjoner.' },
  zh: { title: 'npm vs Yarn vs pnpm：应该使用哪个包管理器？', description: '并排比较 npm、Yarn 和 pnpm 包管理器。速度、磁盘使用、锁文件、工作区及功能的差异。' },
  ja: { title: 'npm vs Yarn vs pnpm：どのパッケージマネージャーを使うべき？', description: 'npm、Yarn、pnpmパッケージマネージャーを並べて比較。速度、ディスク使用量、ロックファイル、機能の違い。' },
  ko: { title: 'npm vs Yarn vs pnpm: 어떤 패키지 매니저를 사용해야 할까요?', description: 'npm, Yarn, pnpm 패키지 매니저를 나란히 비교합니다. 속도, 디스크 사용량, 락 파일 및 기능의 차이점.' },
  id: { title: 'npm vs Yarn vs pnpm: Package Manager Mana yang Harus Anda Gunakan?', description: 'Bandingkan npm, Yarn, dan pnpm. Perbedaan kecepatan, penggunaan disk, file lock, dan fitur.' },
  th: { title: 'npm vs Yarn vs pnpm: ควรใช้ตัวจัดการแพ็กเกจไหน?', description: 'เปรียบเทียบ npm, Yarn และ pnpm ความเร็ว การใช้ดิสก์ ไฟล์ล็อก และฟีเจอร์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/npm-vs-yarn-vs-pnpm`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/npm-vs-yarn-vs-pnpm`])
        ),
        'x-default': `https://viadreams.cc/en/tools/npm-vs-yarn-vs-pnpm`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
