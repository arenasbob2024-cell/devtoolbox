import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Validator Online - Validate JSON Syntax Free', description: 'Validate your JSON data online for free. Check for syntax errors, formatting issues, and get detailed error messages with line numbers.' },
  zh: { title: 'JSON 在线验证器 - 免费验证 JSON 语法', description: '免费在线验证 JSON 数据。检查语法错误并获取详细的错误消息。' },
  ja: { title: 'JSON バリデーター オンライン - JSON 構文を無料で検証', description: 'JSON データをオンラインで無料検証。構文エラーを検出し詳細なエラーメッセージを表示。' },
  ko: { title: 'JSON 유효성 검사기 온라인 - JSON 구문 무료 검증', description: 'JSON 데이터를 온라인에서 무료로 검증하세요. 구문 오류를 확인하세요.' },
  fr: { title: 'Validateur JSON en Ligne - Valider la Syntaxe JSON Gratuit', description: 'Validez vos donnees JSON en ligne gratuitement.' },
  de: { title: 'JSON Validator Online - JSON Syntax Kostenlos Pruefen', description: 'Validieren Sie Ihre JSON-Daten kostenlos online.' },
  es: { title: 'Validador JSON en Linea - Validar Sintaxis JSON Gratis', description: 'Valida tus datos JSON en linea gratis.' },
  pt: { title: 'Validador JSON Online - Validar Sintaxe JSON Gratis', description: 'Valide seus dados JSON online gratuitamente.' },
  it: { title: 'Validatore JSON Online - Valida Sintassi JSON Gratis', description: 'Valida i tuoi dati JSON online gratuitamente.' },
  nl: { title: 'JSON Validator Online - JSON Syntax Gratis Valideren', description: 'Valideer uw JSON-gegevens gratis online.' },
  pl: { title: 'Walidator JSON Online - Waliduj Skladnie JSON Za Darmo', description: 'Zwaliduj dane JSON online za darmo.' },
  sv: { title: 'JSON Validator Online - Validera JSON Syntax Gratis', description: 'Validera dina JSON-data online gratis.' },
  no: { title: 'JSON Validator Online - Valider JSON Syntaks Gratis', description: 'Valider dine JSON-data online gratis.' },
  id: { title: 'JSON Validator Online - Validasi Sintaks JSON Gratis', description: 'Validasi data JSON Anda secara online gratis.' },
  th: { title: 'JSON Validator ออนไลน์ - ตรวจสอบ JSON ฟรี', description: 'ตรวจสอบความถูกต้องของ JSON ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-validator-online`;
  return {
    title: t.title, description: t.description,
    keywords: ['json validator', 'json validator online', 'validate json', 'json syntax checker', 'json lint', 'json checker'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-validator-online`])), 'x-default': 'https://viadreams.cc/en/tools/json-validator-online' } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
