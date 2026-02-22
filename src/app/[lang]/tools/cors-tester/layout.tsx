import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CORS Tester - Test Cross-Origin Headers Online Free', description: 'Free online CORS tester. Test CORS headers for any URL. Check Access-Control-Allow-Origin, methods, and credentials support.' },
  fr: { title: 'Testeur CORS - Tester les En-tetes Cross-Origin Gratuit', description: 'Testeur CORS gratuit en ligne. Testez les en-tetes CORS pour n\'importe quelle URL.' },
  de: { title: 'CORS-Tester - Cross-Origin Header Testen Kostenlos', description: 'Kostenloser Online CORS-Tester. Testen Sie CORS-Header fuer jede URL.' },
  it: { title: 'Tester CORS - Testa Intestazioni Cross-Origin Gratis', description: 'Tester CORS gratuito online. Testa le intestazioni CORS per qualsiasi URL.' },
  es: { title: 'Probador CORS - Probar Cabeceras Cross-Origin Gratis', description: 'Probador CORS gratuito en linea. Pruebe las cabeceras CORS para cualquier URL.' },
  pt: { title: 'Testador CORS - Testar Cabecalhos Cross-Origin Gratis', description: 'Testador CORS gratuito online. Teste cabecalhos CORS para qualquer URL.' },
  nl: { title: 'CORS Tester - Test Cross-Origin Headers Gratis', description: 'Gratis online CORS tester. Test CORS-headers voor elke URL.' },
  pl: { title: 'Tester CORS - Testuj Naglowki Cross-Origin Za Darmo', description: 'Darmowy tester CORS online. Testuj naglowki CORS dla dowolnego URL.' },
  sv: { title: 'CORS-testare - Testa Cross-Origin Rubriker Gratis', description: 'Gratis CORS-testare online. Testa CORS-rubriker foer alla URL:er.' },
  no: { title: 'CORS-tester - Test Cross-Origin Hoder Gratis', description: 'Gratis CORS-tester online. Test CORS-hoder for enhver URL.' },
  zh: { title: 'CORS 测试工具 - 免费在线测试跨域头信息', description: '免费在线 CORS 测试工具。测试任意 URL 的 CORS 头信息。检查 Access-Control-Allow-Origin、方法和凭据支持。' },
  ja: { title: 'CORSテスター - クロスオリジンヘッダー無料テスト', description: '無料オンラインCORSテスター。任意のURLのCORSヘッダーをテストします。' },
  ko: { title: 'CORS 테스터 - 교차 출처 헤더 무료 테스트', description: '무료 온라인 CORS 테스터. 모든 URL의 CORS 헤더를 테스트합니다.' },
  id: { title: 'Penguji CORS - Uji Header Cross-Origin Gratis', description: 'Penguji CORS gratis online. Uji header CORS untuk URL apa pun.' },
  th: { title: 'ทดสอบ CORS - ทดสอบ Cross-Origin Headers ฟรี', description: 'ทดสอบ CORS ออนไลน์ฟรี ทดสอบ CORS headers สำหรับ URL ใดก็ได้' },
};

const slug = 'cors-tester';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/${slug}`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['cors tester', 'cors checker', 'cross-origin', 'cors headers', 'access-control-allow-origin', 'preflight request', 'cors test online'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
