import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Minifier - Compress JSON Online Free', description: 'Minify and compress JSON data online for free. Remove all whitespace and formatting to reduce JSON file size. See size savings instantly with our JSON compressor tool.' },
  fr: { title: 'Minificateur JSON - Compresser JSON en Ligne Gratuit', description: 'Minifiez et compressez des donnees JSON en ligne gratuitement. Supprimez tous les espaces et le formatage pour reduire la taille des fichiers JSON.' },
  de: { title: 'JSON Minifier - JSON Online Komprimieren Kostenlos', description: 'JSON-Daten kostenlos online minifizieren und komprimieren. Entfernen Sie alle Leerzeichen und Formatierungen um die JSON-Dateigroesse zu reduzieren.' },
  it: { title: 'Minificatore JSON - Comprimi JSON Online Gratis', description: 'Minifica e comprimi dati JSON online gratuitamente. Rimuovi tutti gli spazi e la formattazione per ridurre la dimensione dei file JSON.' },
  es: { title: 'Minificador JSON - Comprimir JSON en Linea Gratis', description: 'Minifica y comprime datos JSON en linea gratis. Elimina todos los espacios y el formato para reducir el tamano de los archivos JSON.' },
  pt: { title: 'Minificador JSON - Comprimir JSON Online Gratis', description: 'Minifique e comprima dados JSON online gratuitamente. Remova todos os espacos e formatacao para reduzir o tamanho dos arquivos JSON.' },
  nl: { title: 'JSON Minifier - Comprimeer JSON Online Gratis', description: 'Minificeer en comprimeer JSON-gegevens gratis online. Verwijder alle witruimte en opmaak om de JSON-bestandsgrootte te verkleinen.' },
  pl: { title: 'Minifikator JSON - Kompresuj JSON Online Za Darmo', description: 'Minifikuj i kompresuj dane JSON online za darmo. Usun wszystkie biale znaki i formatowanie, aby zmniejszyc rozmiar pliku JSON.' },
  sv: { title: 'JSON Minifier - Komprimera JSON Online Gratis', description: 'Minifiera och komprimera JSON-data online gratis. Ta bort alla mellanslag och formatering for att minska JSON-filstorleken.' },
  no: { title: 'JSON Minifier - Komprimer JSON Online Gratis', description: 'Minifiser og komprimer JSON-data online gratis. Fjern alle mellomrom og formatering for a redusere JSON-filstorrelsen.' },
  zh: { title: 'JSON 压缩器 - 免费在线 JSON 压缩工具', description: '免费在线压缩和精简 JSON 数据。移除所有空白和格式化以减小 JSON 文件大小。即时查看压缩节省的空间。' },
  ja: { title: 'JSON 圧縮ツール - 無料オンライン JSON ミニファイヤー', description: 'JSON データを無料でオンラインで圧縮・ミニファイ。すべての空白とフォーマットを削除して JSON ファイルサイズを削減します。' },
  ko: { title: 'JSON 압축기 - 무료 온라인 JSON 압축 도구', description: 'JSON 데이터를 무료로 온라인에서 압축하세요. 모든 공백과 포맷을 제거하여 JSON 파일 크기를 줄입니다. 즉시 크기 절감을 확인하세요.' },
  id: { title: 'JSON Minifier - Kompres JSON Online Gratis', description: 'Minifikasi dan kompres data JSON online gratis. Hapus semua spasi dan pemformatan untuk mengurangi ukuran file JSON.' },
  th: { title: 'JSON Minifier - บีบอัด JSON ออนไลน์ฟรี', description: 'ย่อและบีบอัดข้อมูล JSON ออนไลน์ฟรี ลบช่องว่างและการจัดรูปแบบทั้งหมดเพื่อลดขนาดไฟล์ JSON ดูการประหยัดขนาดได้ทันที' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-minifier`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-minifier`])), 'x-default': `https://viadreams.cc/en/tools/json-minifier` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
