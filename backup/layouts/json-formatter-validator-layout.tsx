import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Formatter & Validator Online - Format & Lint JSON Free', description: 'Free online JSON formatter and validator. Format, beautify, and validate JSON data with syntax checking. Find JSON errors instantly with detailed error messages.' },
  fr: { title: 'Formateur & Validateur JSON en Ligne Gratuit', description: 'Formateur et validateur JSON gratuit en ligne. Formatez, embellissez et validez les donnees JSON avec verification de syntaxe.' },
  de: { title: 'JSON Formatierer & Validator Online Kostenlos', description: 'Kostenloser Online JSON Formatierer und Validator. JSON-Daten formatieren, verschoenern und mit Syntaxpruefung validieren.' },
  it: { title: 'Formattatore & Validatore JSON Online Gratis', description: 'Formattatore e validatore JSON gratuito online. Formatta, abbellisci e valida i dati JSON con controllo della sintassi.' },
  es: { title: 'Formateador y Validador JSON en Linea Gratis', description: 'Formateador y validador JSON gratuito en linea. Formatea, embellece y valida datos JSON con verificacion de sintaxis.' },
  pt: { title: 'Formatador e Validador JSON Online Gratis', description: 'Formatador e validador JSON gratuito online. Formate, embeleze e valide dados JSON com verificacao de sintaxe.' },
  nl: { title: 'JSON Formatter & Validator Online Gratis', description: 'Gratis online JSON formatter en validator. Formatteer, verfraai en valideer JSON-gegevens met syntaxcontrole.' },
  pl: { title: 'Formatowanie i Walidacja JSON Online Za Darmo', description: 'Darmowy formatator i walidator JSON online. Formatuj, upiekszaj i waliduj dane JSON ze sprawdzaniem skladni.' },
  sv: { title: 'JSON Formaterare & Validerare Online Gratis', description: 'Gratis online JSON formaterare och validerare. Formatera, forskoena och validera JSON-data med syntaxkontroll.' },
  no: { title: 'JSON Formatter & Validator Online Gratis', description: 'Gratis online JSON formatter og validator. Formater, forskjoenn og valider JSON-data med syntakssjekk.' },
  zh: { title: 'JSON 格式化验证器 - 免费在线 JSON 格式化与验证', description: '免费在线 JSON 格式化验证工具。格式化、美化和验证 JSON 数据，快速定位语法错误，支持自定义缩进。' },
  ja: { title: 'JSON フォーマッター＆バリデーター - 無料オンライン JSON 検証', description: '無料オンライン JSON フォーマッターとバリデーター。JSON データのフォーマット、美化、構文検証をワンステップで。' },
  ko: { title: 'JSON 포맷터 & 검증기 - 무료 온라인 JSON 포맷 및 검증', description: '무료 온라인 JSON 포맷터 및 검증기. JSON 데이터 포맷, 정리, 구문 검증을 한 번에.' },
  id: { title: 'JSON Formatter & Validator Online Gratis', description: 'Formatter dan validator JSON online gratis. Format, percantik, dan validasi data JSON dengan pengecekan sintaksis.' },
  th: { title: 'JSON Formatter & Validator ออนไลน์ฟรี', description: 'เครื่องมือจัดรูปแบบและตรวจสอบ JSON ออนไลน์ฟรี จัดรูปแบบ ตกแต่ง และตรวจสอบข้อมูล JSON' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-formatter-validator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-formatter-validator`])), 'x-default': `https://viadreams.cc/en/tools/json-formatter-validator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
