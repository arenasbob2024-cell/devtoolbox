import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Docker Run to Compose Converter - Convert docker run to docker-compose.yml Free', description: 'Free online tool to convert docker run commands to docker-compose.yml format. Supports ports, volumes, environment variables, and more.' },
  fr: { title: 'Docker Run vers Compose - Convertir docker run en docker-compose.yml Gratuit', description: 'Outil gratuit pour convertir les commandes docker run en format docker-compose.yml.' },
  de: { title: 'Docker Run zu Compose Konverter - docker run in docker-compose.yml Kostenlos', description: 'Kostenloses Tool zum Konvertieren von docker run Befehlen in docker-compose.yml Format.' },
  it: { title: 'Docker Run a Compose - Converti docker run in docker-compose.yml Gratis', description: 'Strumento gratuito per convertire comandi docker run in formato docker-compose.yml.' },
  es: { title: 'Docker Run a Compose - Convertir docker run a docker-compose.yml Gratis', description: 'Herramienta gratuita para convertir comandos docker run a formato docker-compose.yml.' },
  pt: { title: 'Docker Run para Compose - Converter docker run para docker-compose.yml Gratis', description: 'Ferramenta gratuita para converter comandos docker run para formato docker-compose.yml.' },
  nl: { title: 'Docker Run naar Compose - Converteer docker run naar docker-compose.yml Gratis', description: 'Gratis tool om docker run commando\'s te converteren naar docker-compose.yml formaat.' },
  pl: { title: 'Docker Run do Compose - Konwertuj docker run na docker-compose.yml Za Darmo', description: 'Darmowe narzedzie do konwersji polecen docker run na format docker-compose.yml.' },
  sv: { title: 'Docker Run till Compose - Konvertera docker run till docker-compose.yml Gratis', description: 'Gratis verktyg foer att konvertera docker run kommandon till docker-compose.yml format.' },
  no: { title: 'Docker Run til Compose - Konverter docker run til docker-compose.yml Gratis', description: 'Gratis verktoy for aa konvertere docker run kommandoer til docker-compose.yml format.' },
  zh: { title: 'Docker Run 转 Compose - 免费将 docker run 转换为 docker-compose.yml', description: '免费在线工具，将 docker run 命令转换为 docker-compose.yml 格式。支持端口、卷、环境变量等。' },
  ja: { title: 'Docker Run to Compose 変換 - docker runをdocker-compose.ymlに無料変換', description: 'docker runコマンドをdocker-compose.yml形式に変換する無料ツール。' },
  ko: { title: 'Docker Run to Compose 변환기 - docker run을 docker-compose.yml로 무료 변환', description: 'docker run 명령을 docker-compose.yml 형식으로 변환하는 무료 도구.' },
  id: { title: 'Docker Run ke Compose - Konversi docker run ke docker-compose.yml Gratis', description: 'Alat gratis untuk mengkonversi perintah docker run ke format docker-compose.yml.' },
  th: { title: 'Docker Run เป็น Compose - แปลง docker run เป็น docker-compose.yml ฟรี', description: 'เครื่องมือฟรีสำหรับแปลงคำสั่ง docker run เป็นรูปแบบ docker-compose.yml' },
};

const slug = 'docker-run-to-compose';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['docker run to compose', 'docker-compose converter', 'docker run converter', 'docker-compose.yml', 'docker compose generator', 'docker to yaml'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
