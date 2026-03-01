import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTML Minifier Online - Free HTML Compressor Tool', description: 'Minify and compress HTML code online for free. Remove whitespace, comments, and optional tags to reduce file size and improve page load speed.' },
  fr: { title: 'Minificateur HTML en Ligne Gratuit', description: 'Minifiez et compressez le code HTML en ligne gratuitement. Supprimez les espaces blancs, commentaires et balises optionnelles.' },
  de: { title: 'HTML Minifier Online - Kostenloses Komprimierungstool', description: 'HTML-Code kostenlos online minifizieren und komprimieren. Leerzeichen, Kommentare und optionale Tags entfernen.' },
  it: { title: 'Minificatore HTML Online Gratuito', description: 'Minifica e comprimi il codice HTML online gratuitamente. Rimuovi spazi bianchi, commenti e tag opzionali.' },
  es: { title: 'Minificador HTML en Linea Gratis', description: 'Minifique y comprima codigo HTML en linea gratis. Elimine espacios en blanco, comentarios y etiquetas opcionales.' },
  pt: { title: 'Minificador HTML Online Gratis', description: 'Minifique e comprima codigo HTML online gratuitamente. Remova espacos em branco, comentarios e tags opcionais.' },
  nl: { title: 'HTML Minifier Online - Gratis Compressietool', description: 'HTML-code online gratis minificeren en comprimeren. Verwijder witruimte, opmerkingen en optionele tags.' },
  pl: { title: 'Minifikator HTML Online Za Darmo', description: 'Minifikuj i kompresuj kod HTML online za darmo. Usun biale znaki, komentarze i opcjonalne tagi.' },
  sv: { title: 'HTML Minifierare Online - Gratis Komprimeringsverktyg', description: 'Minifiera och komprimera HTML-kod online gratis. Ta bort blanksteg, kommentarer och valfria taggar.' },
  no: { title: 'HTML Minifier Online - Gratis Komprimeringsverktoy', description: 'Minifiser og komprimer HTML-kode online gratis. Fjern mellomrom, kommentarer og valgfrie tagger.' },
  zh: { title: 'HTML 压缩器在线 - 免费 HTML 压缩工具', description: '免费在线压缩 HTML 代码。删除空白、注释和可选标签，减小文件大小，提高页面加载速度。' },
  ja: { title: 'HTML 圧縮ツール オンライン 無料', description: 'HTML コードを無料でオンラインで圧縮。空白、コメント、オプションタグを削除してファイルサイズを削減。' },
  ko: { title: 'HTML 압축기 온라인 - 무료 도구', description: 'HTML 코드를 무료로 온라인에서 압축. 공백, 주석, 선택적 태그를 제거하여 파일 크기 축소.' },
  id: { title: 'HTML Minifier Online - Alat Kompresi HTML Gratis', description: 'Minifikasi dan kompres kode HTML online gratis. Hapus spasi, komentar, dan tag opsional.' },
  th: { title: 'บีบอัด HTML ออนไลน์ - เครื่องมือบีบอัด HTML ฟรี', description: 'บีบอัดและลดขนาดโค้ด HTML ออนไลน์ฟรี ลบช่องว่าง คอมเมนต์ และแท็กที่ไม่จำเป็น' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/html-minifier-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/html-minifier-online`])), 'x-default': `https://viadreams.cc/en/tools/html-minifier-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
