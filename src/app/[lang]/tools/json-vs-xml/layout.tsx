import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON vs XML: Which Data Format Should You Use?', description: 'Compare JSON and XML data formats side by side. Differences in syntax, readability, file size, parsing speed, schema support, and use cases.' },
  fr: { title: 'JSON vs XML : Quel format de donnees choisir ?', description: 'Comparez JSON et XML cote a cote. Differences de syntaxe, lisibilite, taille de fichier, vitesse d\'analyse et cas d\'utilisation.' },
  de: { title: 'JSON vs XML: Welches Datenformat sollten Sie verwenden?', description: 'Vergleichen Sie JSON und XML Datenformate. Unterschiede bei Syntax, Lesbarkeit, Dateigroesse, Parsing-Geschwindigkeit und Anwendungsfaellen.' },
  it: { title: 'JSON vs XML: Quale formato dati scegliere?', description: 'Confronta JSON e XML fianco a fianco. Differenze di sintassi, leggibilita, dimensione file, velocita di parsing e casi d\'uso.' },
  es: { title: 'JSON vs XML: Que formato de datos deberias usar?', description: 'Compara JSON y XML lado a lado. Diferencias en sintaxis, legibilidad, tamano de archivo, velocidad de analisis y casos de uso.' },
  pt: { title: 'JSON vs XML: Qual formato de dados voce deve usar?', description: 'Compare JSON e XML lado a lado. Diferencas em sintaxe, legibilidade, tamanho de arquivo, velocidade de parsing e casos de uso.' },
  nl: { title: 'JSON vs XML: Welk dataformaat moet je gebruiken?', description: 'Vergelijk JSON en XML dataformaten naast elkaar. Verschillen in syntaxis, leesbaarheid, bestandsgrootte en gebruiksscenario\'s.' },
  pl: { title: 'JSON vs XML: Ktory format danych wybrac?', description: 'Porownaj JSON i XML obok siebie. Roznice w skladni, czytelnosci, rozmiarze pliku, szybkosci parsowania i zastosowaniach.' },
  sv: { title: 'JSON vs XML: Vilket dataformat ska du anvanda?', description: 'Jamfor JSON och XML dataformat sida vid sida. Skillnader i syntax, lasbarhet, filstorlek och anvandningsfall.' },
  no: { title: 'JSON vs XML: Hvilket dataformat bor du bruke?', description: 'Sammenlign JSON og XML dataformater side om side. Forskjeller i syntaks, lesbarhet, filstorrelse og bruksomrader.' },
  zh: { title: 'JSON vs XML：应该使用哪种数据格式？', description: '并排比较 JSON 和 XML 数据格式。语法、可读性、文件大小、解析速度、Schema 支持及使用场景的差异。' },
  ja: { title: 'JSON vs XML：どちらのデータ形式を使うべき？', description: 'JSONとXMLデータ形式を並べて比較。構文、可読性、ファイルサイズ、パース速度、使用ケースの違い。' },
  ko: { title: 'JSON vs XML: 어떤 데이터 형식을 사용해야 할까요?', description: 'JSON과 XML 데이터 형식을 나란히 비교합니다. 구문, 가독성, 파일 크기, 파싱 속도 및 사용 사례의 차이점.' },
  id: { title: 'JSON vs XML: Format Data Mana yang Harus Anda Gunakan?', description: 'Bandingkan format data JSON dan XML. Perbedaan sintaks, keterbacaan, ukuran file, kecepatan parsing, dan kasus penggunaan.' },
  th: { title: 'JSON vs XML: ควรใช้รูปแบบข้อมูลไหน?', description: 'เปรียบเทียบ JSON และ XML ไวยากรณ์ ความสามารถในการอ่าน ขนาดไฟล์ ความเร็วในการแยกวิเคราะห์ และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-vs-xml`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-vs-xml`])
        ),
        'x-default': `https://viadreams.cc/en/tools/json-vs-xml`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
