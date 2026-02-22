import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Lorem Ipsum Generator - Free Placeholder Text Tool', description: 'Generate Lorem Ipsum placeholder text for your designs. Choose paragraphs, sentences, or words. Copy instantly.' },
  fr: { title: 'Generateur Lorem Ipsum - Outil Gratuit de Texte de Remplissage', description: 'Generez du texte Lorem Ipsum pour vos designs. Choisissez paragraphes, phrases ou mots. Copiez instantanement.' },
  de: { title: 'Lorem Ipsum Generator - Kostenloses Platzhaltertext-Tool', description: 'Lorem Ipsum Platzhaltertext fur Ihre Designs generieren. Wahlen Sie Absatze, Satze oder Worter.' },
  it: { title: 'Generatore Lorem Ipsum - Strumento Testo Segnaposto Gratis', description: 'Genera testo Lorem Ipsum segnaposto per i tuoi design. Scegli paragrafi, frasi o parole.' },
  es: { title: 'Generador Lorem Ipsum - Herramienta de Texto de Relleno Gratis', description: 'Genere texto Lorem Ipsum de relleno para sus disenos. Elija parrafos, oraciones o palabras.' },
  pt: { title: 'Gerador Lorem Ipsum - Ferramenta de Texto Placeholder Gratis', description: 'Gere texto Lorem Ipsum placeholder para seus designs. Escolha paragrafos, frases ou palavras.' },
  nl: { title: 'Lorem Ipsum Generator - Gratis Opvultekst Tool', description: 'Genereer Lorem Ipsum placeholdertekst voor uw ontwerpen. Kies alinea\'s, zinnen of woorden.' },
  pl: { title: 'Generator Lorem Ipsum - Darmowe Narzedzie Tekstu Zastepczego', description: 'Generuj tekst Lorem Ipsum dla swoich projektow. Wybierz akapity, zdania lub slowa.' },
  sv: { title: 'Lorem Ipsum Generator - Gratis Platshallartextverktyg', description: 'Generera Lorem Ipsum platshallaretext for dina designer. Valj stycken, meningar eller ord.' },
  no: { title: 'Lorem Ipsum Generator - Gratis Plassholdertekstverktoy', description: 'Generer Lorem Ipsum plassholdertekst for dine design. Velg avsnitt, setninger eller ord.' },
  zh: { title: 'Lorem Ipsum 生成器 - 免费占位文本工具', description: '为设计生成 Lorem Ipsum 占位文本。选择段落、句子或单词数量，即时复制。' },
  ja: { title: 'Lorem Ipsum ジェネレーター - 無料プレースホルダーテキストツール', description: 'デザイン用の Lorem Ipsum プレースホルダーテキストを生成。段落、文、単語を選択して即座にコピー。' },
  ko: { title: 'Lorem Ipsum 생성기 - 무료 자리 표시 텍스트 도구', description: '디자인을 위한 Lorem Ipsum 자리 표시 텍스트 생성. 문단, 문장, 단어를 선택하고 즉시 복사.' },
  id: { title: 'Generator Lorem Ipsum - Alat Teks Placeholder Gratis', description: 'Hasilkan teks Lorem Ipsum placeholder untuk desain Anda. Pilih paragraf, kalimat, atau kata.' },
  th: { title: 'ตัวสร้าง Lorem Ipsum - เครื่องมือข้อความตัวอย่างฟรี', description: 'สร้างข้อความ Lorem Ipsum สำหรับการออกแบบ เลือกย่อหน้า ประโยค หรือคำ คัดลอกทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/lorem-ipsum-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/lorem-ipsum-generator`])), 'x-default': `https://viadreams.cc/en/tools/lorem-ipsum-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
