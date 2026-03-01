import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Minifier - Minify CSS Online Free', description: 'Free online CSS minifier. Minify and compress CSS code by removing comments, whitespace, and unnecessary characters. Show original vs minified size with savings percentage.' },
  fr: { title: 'Minificateur CSS - Minifier CSS en Ligne Gratuit', description: 'Minificateur CSS gratuit en ligne. Minifiez et compressez le code CSS en supprimant les commentaires et espaces.' },
  de: { title: 'CSS Minifier - CSS Online Kostenlos Minifizieren', description: 'Kostenloser Online CSS Minifier. Minifizieren und komprimieren Sie CSS-Code.' },
  it: { title: 'Minificatore CSS - Minifica CSS Online Gratis', description: 'Minificatore CSS gratuito online. Minifica e comprimi il codice CSS.' },
  es: { title: 'Minificador CSS - Minificar CSS en Linea Gratis', description: 'Minificador CSS gratuito en linea. Minifica y comprime codigo CSS.' },
  pt: { title: 'Minificador CSS - Minificar CSS Online Gratis', description: 'Minificador CSS gratuito online. Minifique e comprima codigo CSS.' },
  nl: { title: 'CSS Minifier - CSS Online Gratis Minificeren', description: 'Gratis online CSS minifier. Minificeer en comprimeer CSS-code.' },
  pl: { title: 'Minifikator CSS - Minifikuj CSS Online Za Darmo', description: 'Darmowy minifikator CSS online. Minifikuj i kompresuj kod CSS.' },
  sv: { title: 'CSS Minifier - Minifiera CSS Online Gratis', description: 'Gratis online CSS minifier. Minifiera och komprimera CSS-kod.' },
  no: { title: 'CSS Minifier - Minifiser CSS Online Gratis', description: 'Gratis online CSS minifier. Minifiser og komprimer CSS-kode.' },
  zh: { title: 'CSS 压缩工具 - 免费在线 CSS 压缩', description: '免费在线 CSS 压缩工具。通过删除注释、空格和不必要的字符来压缩 CSS 代码。显示原始大小与压缩后大小的对比和节省百分比。' },
  ja: { title: 'CSS 圧縮ツール - CSS を無料でオンライン圧縮', description: '無料オンライン CSS 圧縮ツール。コメント、空白、不要な文字を削除して CSS コードを圧縮。' },
  ko: { title: 'CSS 압축 도구 - CSS 온라인 무료 압축', description: '무료 온라인 CSS 압축 도구. 주석, 공백 및 불필요한 문자를 제거하여 CSS 코드를 압축.' },
  id: { title: 'CSS Minifier - Minifikasi CSS Online Gratis', description: 'Minifier CSS online gratis. Minifikasi dan kompres kode CSS.' },
  th: { title: 'CSS Minifier - ย่อ CSS ออนไลน์ฟรี', description: 'เครื่องมือย่อ CSS ออนไลน์ฟรี ย่อและบีบอัดโค้ด CSS' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-minifier`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-minifier`])), 'x-default': `https://viadreams.cc/en/tools/css-minifier` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
