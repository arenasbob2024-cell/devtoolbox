import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 vs URL Encoding: What\'s the Difference?', description: 'Compare Base64 encoding and URL encoding side by side. Differences in purpose, character sets, size overhead, reversibility, and when to use each.' },
  fr: { title: 'Base64 vs Encodage URL : Quelle est la difference ?', description: 'Comparez l\'encodage Base64 et l\'encodage URL. Differences d\'objectif, jeux de caracteres, surcharge de taille et cas d\'utilisation.' },
  de: { title: 'Base64 vs URL-Encoding: Was ist der Unterschied?', description: 'Vergleichen Sie Base64-Kodierung und URL-Kodierung. Unterschiede bei Zweck, Zeichensaetzen, Groessenoverhead und Anwendungsfaellen.' },
  it: { title: 'Base64 vs URL Encoding: Qual e la differenza?', description: 'Confronta la codifica Base64 e URL encoding. Differenze di scopo, set di caratteri, overhead di dimensione e casi d\'uso.' },
  es: { title: 'Base64 vs URL Encoding: Cual es la diferencia?', description: 'Compara la codificacion Base64 y URL encoding. Diferencias en proposito, conjuntos de caracteres, sobrecarga de tamano y casos de uso.' },
  pt: { title: 'Base64 vs URL Encoding: Qual a diferenca?', description: 'Compare a codificacao Base64 e URL encoding lado a lado. Diferencas em proposito, conjuntos de caracteres e casos de uso.' },
  nl: { title: 'Base64 vs URL Encoding: Wat is het verschil?', description: 'Vergelijk Base64-codering en URL-codering naast elkaar. Verschillen in doel, tekensets, overhead en gebruiksscenario\'s.' },
  pl: { title: 'Base64 vs URL Encoding: Jaka jest roznica?', description: 'Porownaj kodowanie Base64 i URL encoding. Roznice w celu, zestawach znakow, narzucie rozmiaru i zastosowaniach.' },
  sv: { title: 'Base64 vs URL-kodning: Vad ar skillnaden?', description: 'Jamfor Base64-kodning och URL-kodning sida vid sida. Skillnader i syfte, teckenuppsattningar och anvandningsfall.' },
  no: { title: 'Base64 vs URL-koding: Hva er forskjellen?', description: 'Sammenlign Base64-koding og URL-koding side om side. Forskjeller i formal, tegnsett og bruksomrader.' },
  zh: { title: 'Base64 vs URL 编码：有什么区别？', description: '并排比较 Base64 编码和 URL 编码。用途、字符集、大小开销、可逆性及使用场景的差异。' },
  ja: { title: 'Base64 vs URLエンコーディング：何が違う？', description: 'Base64エンコーディングとURLエンコーディングを並べて比較。目的、文字セット、サイズオーバーヘッド、使用ケースの違い。' },
  ko: { title: 'Base64 vs URL 인코딩: 차이점은?', description: 'Base64 인코딩과 URL 인코딩을 나란히 비교합니다. 목적, 문자 세트, 크기 오버헤드 및 사용 사례의 차이점.' },
  id: { title: 'Base64 vs URL Encoding: Apa Bedanya?', description: 'Bandingkan encoding Base64 dan URL encoding. Perbedaan tujuan, set karakter, overhead ukuran, dan kasus penggunaan.' },
  th: { title: 'Base64 vs URL Encoding: อะไรคือความแตกต่าง?', description: 'เปรียบเทียบ Base64 encoding และ URL encoding วัตถุประสงค์ ชุดอักขระ ขนาดที่เพิ่มขึ้น และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-vs-url-encoding`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-vs-url-encoding`])
        ),
        'x-default': `https://viadreams.cc/en/tools/base64-vs-url-encoding`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
