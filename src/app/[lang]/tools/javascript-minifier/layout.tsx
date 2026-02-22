import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JavaScript Minifier - Minify JS Online Free', description: 'Free online JavaScript minifier. Minify JS code by removing comments, whitespace, and newlines. Compare original vs minified size. Fast, private, no signup.' },
  fr: { title: 'Minificateur JavaScript - Minifier JS en Ligne Gratuit', description: 'Minificateur JavaScript gratuit en ligne. Minifiez le code JS en supprimant commentaires et espaces.' },
  de: { title: 'JavaScript Minifier - JS Online Kostenlos Minifizieren', description: 'Kostenloser Online JavaScript Minifier. Minifizieren Sie JS-Code durch Entfernung von Kommentaren und Leerzeichen.' },
  it: { title: 'Minificatore JavaScript - Minifica JS Online Gratis', description: 'Minificatore JavaScript gratuito online. Minifica il codice JS rimuovendo commenti e spazi.' },
  es: { title: 'Minificador JavaScript - Minificar JS en Linea Gratis', description: 'Minificador JavaScript gratuito en linea. Minifica codigo JS eliminando comentarios y espacios.' },
  pt: { title: 'Minificador JavaScript - Minificar JS Online Gratis', description: 'Minificador JavaScript gratuito online. Minifique codigo JS removendo comentarios e espacos.' },
  nl: { title: 'JavaScript Minifier - JS Online Gratis Minificeren', description: 'Gratis online JavaScript minifier. Minificeer JS-code door opmerkingen en spaties te verwijderen.' },
  pl: { title: 'Minifikator JavaScript - Minifikuj JS Online Za Darmo', description: 'Darmowy minifikator JavaScript online. Minifikuj kod JS usuwajac komentarze i spacje.' },
  sv: { title: 'JavaScript Minifier - Minifiera JS Online Gratis', description: 'Gratis online JavaScript minifier. Minifiera JS-kod genom att ta bort kommentarer och blanksteg.' },
  no: { title: 'JavaScript Minifier - Minifiser JS Online Gratis', description: 'Gratis online JavaScript minifier. Minifiser JS-kode ved a fjerne kommentarer og mellomrom.' },
  zh: { title: 'JavaScript 压缩工具 - 免费在线 JS 压缩', description: '免费在线 JavaScript 压缩工具。通过删除注释、空格和换行来压缩 JS 代码。比较原始大小与压缩后大小。' },
  ja: { title: 'JavaScript 圧縮ツール - JS を無料でオンライン圧縮', description: '無料オンライン JavaScript 圧縮ツール。コメント、空白、改行を削除して JS コードを圧縮。' },
  ko: { title: 'JavaScript 압축 도구 - JS 온라인 무료 압축', description: '무료 온라인 JavaScript 압축 도구. 주석, 공백 및 줄바꿈을 제거하여 JS 코드를 압축.' },
  id: { title: 'JavaScript Minifier - Minifikasi JS Online Gratis', description: 'Minifier JavaScript online gratis. Minifikasi kode JS dengan menghapus komentar dan spasi.' },
  th: { title: 'JavaScript Minifier - ย่อ JS ออนไลน์ฟรี', description: 'เครื่องมือย่อ JavaScript ออนไลน์ฟรี ย่อโค้ด JS โดยลบคอมเมนต์และช่องว่าง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/javascript-minifier`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/javascript-minifier`])), 'x-default': `https://viadreams.cc/en/tools/javascript-minifier` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
