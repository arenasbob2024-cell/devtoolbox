import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Diff Tool - Compare JSON Objects Online Free', description: 'Compare two JSON objects side by side and visualize differences. Find added, removed, and changed values instantly. Free online JSON diff and compare tool.' },
  fr: { title: 'Outil de Comparaison JSON en Ligne Gratuit', description: 'Comparez deux objets JSON cote a cote et visualisez les differences. Trouvez les valeurs ajoutees, supprimees et modifiees.' },
  de: { title: 'JSON Vergleichstool Online Kostenlos', description: 'Vergleichen Sie zwei JSON-Objekte nebeneinander und visualisieren Sie die Unterschiede.' },
  it: { title: 'Strumento di Confronto JSON Online Gratis', description: 'Confronta due oggetti JSON fianco a fianco e visualizza le differenze.' },
  es: { title: 'Herramienta de Comparacion JSON en Linea Gratis', description: 'Compare dos objetos JSON lado a lado y visualice las diferencias.' },
  pt: { title: 'Ferramenta de Comparacao JSON Online Gratis', description: 'Compare dois objetos JSON lado a lado e visualize as diferencas.' },
  nl: { title: 'JSON Vergelijkingstool Online Gratis', description: 'Vergelijk twee JSON-objecten naast elkaar en visualiseer de verschillen.' },
  pl: { title: 'Narzedzie Porownywania JSON Online Za Darmo', description: 'Porownaj dwa obiekty JSON obok siebie i wizualizuj roznice.' },
  sv: { title: 'JSON Jaemfoerelsverktyg Online Gratis', description: 'Jaemfoer tvaa JSON-objekt sida vid sida och visualisera skillnaderna.' },
  no: { title: 'JSON Sammenligningsverktoy Online Gratis', description: 'Sammenlign to JSON-objekter side om side og visualiser forskjellene.' },
  zh: { title: 'JSON 差异对比工具 - 免费在线比较 JSON', description: '并排比较两个 JSON 对象并可视化差异。即时发现新增、删除和更改的值。免费在线 JSON 差异对比工具。' },
  ja: { title: 'JSON 差分ツール - オンラインで JSON を比較', description: '2つの JSON オブジェクトを並べて比較し、差分を視覚化。追加、削除、変更された値を即座に発見。' },
  ko: { title: 'JSON 비교 도구 - 무료 온라인 JSON 차이 비교', description: '두 JSON 객체를 나란히 비교하고 차이점을 시각화합니다. 추가, 삭제, 변경된 값을 즉시 확인.' },
  id: { title: 'Alat Perbandingan JSON Online Gratis', description: 'Bandingkan dua objek JSON secara berdampingan dan visualisasikan perbedaannya.' },
  th: { title: 'เครื่องมือเปรียบเทียบ JSON ออนไลน์ฟรี', description: 'เปรียบเทียบ JSON สองออบเจกต์คู่กันและแสดงผลความแตกต่าง ค้นหาค่าที่เพิ่ม ลบ และเปลี่ยนแปลง' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-diff-tool`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-diff-tool`])), 'x-default': `https://viadreams.cc/en/tools/json-diff-tool` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
