import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON vs YAML: Which Data Format Should You Use?', description: 'Compare JSON and YAML data formats side by side. Differences in syntax, comments, readability, data types, file size, and best use cases.' },
  fr: { title: 'JSON vs YAML : Quel format de donnees choisir ?', description: 'Comparez JSON et YAML cote a cote. Differences de syntaxe, commentaires, lisibilite, types de donnees et cas d\'utilisation.' },
  de: { title: 'JSON vs YAML: Welches Datenformat sollten Sie verwenden?', description: 'Vergleichen Sie JSON und YAML Datenformate. Unterschiede bei Syntax, Kommentaren, Lesbarkeit, Datentypen und Anwendungsfaellen.' },
  it: { title: 'JSON vs YAML: Quale formato dati scegliere?', description: 'Confronta JSON e YAML fianco a fianco. Differenze di sintassi, commenti, leggibilita, tipi di dati e casi d\'uso.' },
  es: { title: 'JSON vs YAML: Que formato de datos deberias usar?', description: 'Compara JSON y YAML lado a lado. Diferencias en sintaxis, comentarios, legibilidad, tipos de datos y casos de uso.' },
  pt: { title: 'JSON vs YAML: Qual formato de dados voce deve usar?', description: 'Compare JSON e YAML lado a lado. Diferencas em sintaxe, comentarios, legibilidade, tipos de dados e casos de uso.' },
  nl: { title: 'JSON vs YAML: Welk dataformaat moet je gebruiken?', description: 'Vergelijk JSON en YAML dataformaten naast elkaar. Verschillen in syntaxis, opmerkingen, leesbaarheid en gebruiksscenario\'s.' },
  pl: { title: 'JSON vs YAML: Ktorego formatu danych uzyc?', description: 'Porownaj JSON i YAML obok siebie. Roznice w skladni, komentarzach, czytelnosci, typach danych i zastosowaniach.' },
  sv: { title: 'JSON vs YAML: Vilket dataformat ska du anvanda?', description: 'Jamfor JSON och YAML dataformat sida vid sida. Skillnader i syntax, kommentarer, lasbarhet och anvandningsfall.' },
  no: { title: 'JSON vs YAML: Hvilket dataformat bor du bruke?', description: 'Sammenlign JSON og YAML dataformater side om side. Forskjeller i syntaks, kommentarer, lesbarhet og bruksomrader.' },
  zh: { title: 'JSON vs YAML：应该使用哪种数据格式？', description: '并排比较 JSON 和 YAML 数据格式。语法、注释支持、可读性、数据类型、文件大小及使用场景的差异。' },
  ja: { title: 'JSON vs YAML：どちらのデータ形式を使うべき？', description: 'JSONとYAMLデータ形式を並べて比較。構文、コメント、可読性、データ型、使用ケースの違い。' },
  ko: { title: 'JSON vs YAML: 어떤 데이터 형식을 사용해야 할까요?', description: 'JSON과 YAML 데이터 형식을 나란히 비교합니다. 구문, 주석, 가독성, 데이터 유형 및 사용 사례의 차이점.' },
  id: { title: 'JSON vs YAML: Format Data Mana yang Harus Anda Gunakan?', description: 'Bandingkan format data JSON dan YAML. Perbedaan sintaks, komentar, keterbacaan, tipe data, dan kasus penggunaan.' },
  th: { title: 'JSON vs YAML: ควรใช้รูปแบบข้อมูลไหน?', description: 'เปรียบเทียบ JSON และ YAML ไวยากรณ์ ความสามารถในการอ่าน ประเภทข้อมูล และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-vs-yaml`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-vs-yaml`])
        ),
        'x-default': `https://viadreams.cc/en/tools/json-vs-yaml`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
