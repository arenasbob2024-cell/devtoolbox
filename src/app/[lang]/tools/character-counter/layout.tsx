import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Character Counter - Count Characters, Words, Sentences Online Free', description: 'Count characters, words, sentences, paragraphs, and estimate reading time. Free online character counter and word count tool.' },
  fr: { title: 'Compteur de Caracteres - Compter Mots et Caracteres en Ligne', description: 'Comptez les caracteres, mots, phrases, paragraphes et estimez le temps de lecture.' },
  de: { title: 'Zeichenzahler - Zeichen, Worter und Satze Online Zahlen', description: 'Zahlen Sie Zeichen, Worter, Satze, Absatze und schatzen Sie die Lesezeit.' },
  it: { title: 'Contatore di Caratteri - Conta Caratteri e Parole Online', description: 'Conta caratteri, parole, frasi, paragrafi e stima il tempo di lettura.' },
  es: { title: 'Contador de Caracteres - Contar Palabras y Caracteres en Linea', description: 'Cuenta caracteres, palabras, oraciones, parrafos y estima el tiempo de lectura.' },
  pt: { title: 'Contador de Caracteres - Contar Palavras e Caracteres Online', description: 'Conte caracteres, palavras, frases, paragrafos e estime o tempo de leitura.' },
  nl: { title: 'Tekenteller - Tekens, Woorden en Zinnen Online Tellen', description: 'Tel tekens, woorden, zinnen, alineas en schat de leestijd.' },
  pl: { title: 'Licznik Znakow - Liczenie Znakow i Slow Online', description: 'Licz znaki, slowa, zdania, akapity i szacuj czas czytania.' },
  sv: { title: 'Teckentakare - Rakna Tecken, Ord och Meningar Online', description: 'Rakna tecken, ord, meningar, stycken och uppskatta lasttid.' },
  no: { title: 'Tegnteller - Tell Tegn, Ord og Setninger Online', description: 'Tell tegn, ord, setninger, avsnitt og estimer lesetid.' },
  zh: { title: '字符计数器 - 在线统计字符、单词、句子数', description: '统计字符数、单词数、句子数、段落数并估算阅读时间。免费在线字数统计工具。' },
  ja: { title: '文字数カウンター - 文字数、単語数、文章数をオンラインで計算', description: '文字数、単語数、文章数、段落数をカウントし、読書時間を推定します。' },
  ko: { title: '글자 수 세기 - 문자, 단어, 문장 수 온라인으로 계산', description: '문자 수, 단어 수, 문장 수, 단락 수를 세고 읽기 시간을 예측합니다.' },
  id: { title: 'Penghitung Karakter - Hitung Karakter dan Kata Online', description: 'Hitung karakter, kata, kalimat, paragraf dan perkirakan waktu membaca.' },
  th: { title: 'นับตัวอักษร - นับตัวอักษร คำ และประโยคออนไลน์', description: 'นับตัวอักษร คำ ประโยค ย่อหน้า และประมาณเวลาในการอ่าน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/character-counter`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/character-counter`])), 'x-default': `https://viadreams.cc/en/tools/character-counter` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
