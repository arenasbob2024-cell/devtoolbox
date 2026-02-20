import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'MD5 vs SHA-256: Which Hash Algorithm Should You Use?', description: 'Compare MD5 and SHA-256 hash algorithms side by side. Differences in speed, security, output length, collision resistance, and when to use each.' },
  fr: { title: 'MD5 vs SHA-256 : Quel algorithme de hachage choisir ?', description: 'Comparez MD5 et SHA-256 cote a cote. Differences de vitesse, securite, longueur de sortie et cas d\'utilisation.' },
  de: { title: 'MD5 vs SHA-256: Welchen Hash-Algorithmus sollten Sie verwenden?', description: 'Vergleichen Sie MD5 und SHA-256 Hash-Algorithmen. Unterschiede bei Geschwindigkeit, Sicherheit, Ausgabelaenge und Anwendungsfaellen.' },
  it: { title: 'MD5 vs SHA-256: Quale algoritmo hash scegliere?', description: 'Confronta MD5 e SHA-256 fianco a fianco. Differenze di velocita, sicurezza, lunghezza output e casi d\'uso.' },
  es: { title: 'MD5 vs SHA-256: Cual algoritmo hash deberias usar?', description: 'Compara MD5 y SHA-256 lado a lado. Diferencias en velocidad, seguridad, longitud de salida y casos de uso.' },
  pt: { title: 'MD5 vs SHA-256: Qual algoritmo hash voce deve usar?', description: 'Compare MD5 e SHA-256 lado a lado. Diferencas em velocidade, seguranca, comprimento da saida e casos de uso.' },
  nl: { title: 'MD5 vs SHA-256: Welk hash-algoritme moet je gebruiken?', description: 'Vergelijk MD5 en SHA-256 naast elkaar. Verschillen in snelheid, beveiliging, uitvoerlengte en gebruiksscenario\'s.' },
  pl: { title: 'MD5 vs SHA-256: Ktorego algorytmu haszujacego uzyc?', description: 'Porownaj MD5 i SHA-256 obok siebie. Roznice w szybkosci, bezpieczenstwie, dlugosci wyjscia i zastosowaniach.' },
  sv: { title: 'MD5 vs SHA-256: Vilken hashalgoritm ska du anvanda?', description: 'Jamfor MD5 och SHA-256 sida vid sida. Skillnader i hastighet, sakerhet, utdatalangd och anvandningsfall.' },
  no: { title: 'MD5 vs SHA-256: Hvilken hash-algoritme bor du bruke?', description: 'Sammenlign MD5 og SHA-256 side om side. Forskjeller i hastighet, sikkerhet, utdatalengde og bruksomrader.' },
  zh: { title: 'MD5 vs SHA-256：应该使用哪种哈希算法？', description: '并排比较 MD5 和 SHA-256 哈希算法。速度、安全性、输出长度、碰撞抗性及使用场景的差异。' },
  ja: { title: 'MD5 vs SHA-256：どちらのハッシュアルゴリズムを使うべき？', description: 'MD5とSHA-256を並べて比較。速度、セキュリティ、出力長、衝突耐性、使用ケースの違い。' },
  ko: { title: 'MD5 vs SHA-256: 어떤 해시 알고리즘을 사용해야 할까요?', description: 'MD5와 SHA-256 해시 알고리즘을 나란히 비교합니다. 속도, 보안, 출력 길이, 충돌 저항성 및 사용 사례의 차이점.' },
  id: { title: 'MD5 vs SHA-256: Algoritma Hash Mana yang Harus Anda Gunakan?', description: 'Bandingkan MD5 dan SHA-256 secara berdampingan. Perbedaan kecepatan, keamanan, panjang output, dan kasus penggunaan.' },
  th: { title: 'MD5 vs SHA-256: ควรใช้อัลกอริทึมแฮชตัวไหน?', description: 'เปรียบเทียบ MD5 และ SHA-256 แบบเคียงข้างกัน ความแตกต่างด้านความเร็ว ความปลอดภัย ความยาวเอาต์พุต และกรณีการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/md5-vs-sha256`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/md5-vs-sha256`])
        ),
        'x-default': `https://viadreams.cc/en/tools/md5-vs-sha256`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
