import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: '.gitignore Generator - Generate gitignore Files Online Free', description: 'Generate .gitignore files for Node.js, Python, Java, Go, Rust, React, Next.js, Vue, macOS, Windows, Linux, and IDE presets. Free online tool.' },
  fr: { title: 'Generateur .gitignore - Generer des Fichiers gitignore en Ligne', description: 'Generez des fichiers .gitignore pour Node.js, Python, Java, Go, Rust, React, Next.js, Vue et plus.' },
  de: { title: '.gitignore Generator - gitignore Dateien Online Erstellen', description: 'Generieren Sie .gitignore-Dateien fur Node.js, Python, Java, Go, Rust, React, Next.js, Vue und mehr.' },
  it: { title: 'Generatore .gitignore - Genera File gitignore Online', description: 'Genera file .gitignore per Node.js, Python, Java, Go, Rust, React, Next.js, Vue e altro.' },
  es: { title: 'Generador .gitignore - Generar Archivos gitignore en Linea', description: 'Genera archivos .gitignore para Node.js, Python, Java, Go, Rust, React, Next.js, Vue y mas.' },
  pt: { title: 'Gerador .gitignore - Gerar Arquivos gitignore Online', description: 'Gere arquivos .gitignore para Node.js, Python, Java, Go, Rust, React, Next.js, Vue e mais.' },
  nl: { title: '.gitignore Generator - gitignore Bestanden Online Maken', description: 'Genereer .gitignore-bestanden voor Node.js, Python, Java, Go, Rust, React, Next.js, Vue en meer.' },
  pl: { title: 'Generator .gitignore - Tworzenie Plikow gitignore Online', description: 'Generuj pliki .gitignore dla Node.js, Python, Java, Go, Rust, React, Next.js, Vue i wiecej.' },
  sv: { title: '.gitignore Generator - Skapa gitignore Filer Online', description: 'Generera .gitignore-filer for Node.js, Python, Java, Go, Rust, React, Next.js, Vue och mer.' },
  no: { title: '.gitignore Generator - Lag gitignore Filer Online', description: 'Generer .gitignore-filer for Node.js, Python, Java, Go, Rust, React, Next.js, Vue og mer.' },
  zh: { title: '.gitignore 生成器 - 在线生成 gitignore 文件', description: '为 Node.js、Python、Java、Go、Rust、React、Next.js、Vue、macOS、Windows、Linux 生成 .gitignore 文件。' },
  ja: { title: '.gitignore ジェネレーター - gitignore ファイルをオンラインで生成', description: 'Node.js、Python、Java、Go、Rust、React、Next.js、Vue など向けの .gitignore ファイルを生成します。' },
  ko: { title: '.gitignore 생성기 - gitignore 파일 온라인으로 생성', description: 'Node.js, Python, Java, Go, Rust, React, Next.js, Vue 등을 위한 .gitignore 파일을 생성합니다.' },
  id: { title: 'Generator .gitignore - Buat File gitignore Online', description: 'Hasilkan file .gitignore untuk Node.js, Python, Java, Go, Rust, React, Next.js, Vue dan lainnya.' },
  th: { title: 'สร้างไฟล์ .gitignore - สร้าง gitignore ออนไลน์', description: 'สร้างไฟล์ .gitignore สำหรับ Node.js, Python, Java, Go, Rust, React, Next.js, Vue และอื่นๆ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/git-ignore-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/git-ignore-generator`])), 'x-default': `https://viadreams.cc/en/tools/git-ignore-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
