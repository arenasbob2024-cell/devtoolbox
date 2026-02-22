import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'ASCII Art Generator - Convert Text to ASCII Art Free', description: 'Convert any text to ASCII art with multiple font styles. Choose from Banner, Block, Slant, and more. Free online ASCII art text generator.' },
  fr: { title: 'Generateur d\'Art ASCII - Texte en Art ASCII Gratuit', description: 'Convertissez du texte en art ASCII avec plusieurs styles de polices. Banner, Block, Slant et plus. Generateur gratuit.' },
  de: { title: 'ASCII-Art Generator - Text in ASCII-Kunst Kostenlos', description: 'Konvertieren Sie Text in ASCII-Art mit verschiedenen Schriftarten. Banner, Block, Slant und mehr. Kostenloser Online-Generator.' },
  it: { title: 'Generatore di ASCII Art - Testo in Arte ASCII Gratis', description: 'Converti testo in arte ASCII con diversi stili di font. Banner, Block, Slant e altro. Generatore online gratuito.' },
  es: { title: 'Generador de Arte ASCII - Texto a ASCII Art Gratis', description: 'Convierta texto en arte ASCII con multiples estilos de fuente. Banner, Block, Slant y mas. Generador online gratuito.' },
  pt: { title: 'Gerador de Arte ASCII - Texto para ASCII Art Gratis', description: 'Converta texto em arte ASCII com varios estilos de fonte. Banner, Block, Slant e mais. Gerador online gratuito.' },
  nl: { title: 'ASCII Art Generator - Tekst naar ASCII Kunst Gratis', description: 'Converteer tekst naar ASCII-kunst met meerdere lettertypes. Banner, Block, Slant en meer. Gratis online generator.' },
  pl: { title: 'Generator Sztuki ASCII - Tekst na ASCII Art', description: 'Konwertuj tekst na sztuke ASCII z wieloma stylami czcionek. Banner, Block, Slant i wiecej. Darmowy generator online.' },
  sv: { title: 'ASCII-konst Generator - Text till ASCII-konst Gratis', description: 'Konvertera text till ASCII-konst med flera teckensnitt. Banner, Block, Slant och mer. Gratis onlinegenerator.' },
  no: { title: 'ASCII-kunst Generator - Tekst til ASCII-kunst Gratis', description: 'Konverter tekst til ASCII-kunst med flere skrifttyper. Banner, Block, Slant og mer. Gratis online-generator.' },
  zh: { title: 'ASCII 艺术字生成器 - 免费在线文本转 ASCII 艺术', description: '将文本转换为 ASCII 艺术字，支持多种字体样式。Banner、Block、Slant 等多种风格。免费在线 ASCII 艺术生成器。' },
  ja: { title: 'ASCII アートジェネレーター - テキストを ASCII アートに変換', description: 'テキストを複数のフォントスタイルで ASCII アートに変換。Banner、Block、Slant など。無料オンラインツール。' },
  ko: { title: 'ASCII 아트 생성기 - 텍스트를 ASCII 아트로 변환', description: '다양한 글꼴 스타일로 텍스트를 ASCII 아트로 변환하세요. Banner, Block, Slant 등. 무료 온라인 생성기.' },
  id: { title: 'Generator Seni ASCII - Teks ke ASCII Art Gratis', description: 'Konversi teks menjadi seni ASCII dengan berbagai gaya font. Banner, Block, Slant, dan lainnya. Generator online gratis.' },
  th: { title: 'เครื่องมือสร้าง ASCII Art - แปลงข้อความเป็น ASCII ฟรี', description: 'แปลงข้อความเป็น ASCII Art ด้วยหลายสไตล์ฟอนต์ Banner, Block, Slant และอื่นๆ เครื่องมือออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/ascii-art-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/ascii-art-generator`])), 'x-default': `https://viadreams.cc/en/tools/ascii-art-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
