import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Regex Generator - Common Regex Patterns & Builder Online', description: 'Generate regular expressions from common patterns. Copy-ready regex for email, URL, phone, date, IP address and more. Free online regex pattern generator.' },
  fr: { title: 'Generateur Regex - Modeles Regex Courants et Constructeur en Ligne', description: 'Generez des expressions regulieres a partir de modeles courants. Regex prets a copier pour email, URL, telephone, date et plus. Generateur de regex gratuit.' },
  de: { title: 'Regex Generator - Gaengige Regex-Muster und Builder Online', description: 'Generieren Sie regulaere Ausdruecke aus gaengigen Mustern. Kopierbereite Regex fuer E-Mail, URL, Telefon, Datum und mehr. Kostenloser Online Regex-Generator.' },
  it: { title: 'Generatore Regex - Pattern Regex Comuni e Builder Online', description: 'Genera espressioni regolari da pattern comuni. Regex pronti da copiare per email, URL, telefono, data e altro. Generatore regex online gratuito.' },
  es: { title: 'Generador Regex - Patrones Regex Comunes y Constructor Online', description: 'Genera expresiones regulares a partir de patrones comunes. Regex listos para copiar para email, URL, telefono, fecha y mas. Generador regex online gratuito.' },
  pt: { title: 'Gerador Regex - Padroes Regex Comuns e Construtor Online', description: 'Gere expressoes regulares a partir de padroes comuns. Regex prontos para copiar para email, URL, telefone, data e mais. Gerador regex online gratuito.' },
  nl: { title: 'Regex Generator - Veelgebruikte Regex-Patronen en Builder Online', description: 'Genereer reguliere expressies van veelgebruikte patronen. Kopieerklare regex voor e-mail, URL, telefoon, datum en meer. Gratis online regex-generator.' },
  pl: { title: 'Generator Regex - Popularne Wzorce Regex i Builder Online', description: 'Generuj wyrazenia regularne z popularnych wzorcow. Gotowe do skopiowania regex dla email, URL, telefonu, daty i wiecej. Darmowy generator regex online.' },
  sv: { title: 'Regex Generator - Vanliga Regex-Monster och Builder Online', description: 'Generera reguljara uttryck fran vanliga monster. Kopierfardiga regex for e-post, URL, telefon, datum och mer. Gratis online regex-generator.' },
  no: { title: 'Regex Generator - Vanlige Regex-Monstre og Builder Online', description: 'Generer regulaere uttrykk fra vanlige monstre. Kopierklare regex for e-post, URL, telefon, dato og mer. Gratis online regex-generator.' },
  zh: { title: '正则生成器 - 常用正则模式和在线构建器', description: '从常用模式生成正则表达式。可直接复制的邮箱、URL、电话、日期、IP地址等正则。免费在线正则模式生成器。' },
  ja: { title: '正規表現ジェネレーター - よく使う正規表現パターンとビルダー', description: 'よく使うパターンから正規表現を生成。メール、URL、電話、日付などのコピー可能な正規表現。無料オンライン正規表現ジェネレーター。' },
  ko: { title: '정규식 생성기 - 자주 쓰는 정규식 패턴 및 빌더', description: '자주 쓰는 패턴에서 정규 표현식을 생성합니다. 이메일, URL, 전화번호, 날짜 등 바로 복사 가능한 정규식. 무료 온라인 정규식 생성기.' },
  id: { title: 'Generator Regex - Pola Regex Umum dan Builder Online', description: 'Hasilkan ekspresi reguler dari pola umum. Regex siap salin untuk email, URL, telepon, tanggal dan lainnya. Generator pola regex online gratis.' },
  th: { title: 'Regex Generator - รูปแบบ Regex ทั่วไปและเครื่องมือสร้างออนไลน์', description: 'สร้าง regular expression จากรูปแบบทั่วไป คัดลอก regex สำเร็จรูปสำหรับอีเมล URL โทรศัพท์ วันที่และอื่นๆ เครื่องมือสร้าง regex ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/regex-generator`;
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
          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/regex-generator`])
        ),
        'x-default': `https://viadreams.cc/en/tools/regex-generator`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
