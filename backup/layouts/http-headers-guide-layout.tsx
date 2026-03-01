import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTTP Headers Guide - Complete Reference with Examples Online', description: 'Comprehensive reference guide for common HTTP request and response headers with examples, usage notes, and searchable interface. Free online HTTP headers reference.' },
  fr: { title: 'Guide des En-tetes HTTP - Reference Complete avec Exemples', description: 'Guide de reference complet pour les en-tetes HTTP courants avec exemples et notes d\'utilisation.' },
  de: { title: 'HTTP-Header-Leitfaden - Vollstandige Referenz mit Beispielen', description: 'Umfassender Referenzleitfaden fuer gaengige HTTP-Header mit Beispielen und Verwendungshinweisen.' },
  it: { title: 'Guida agli Header HTTP - Riferimento Completo con Esempi', description: 'Guida di riferimento completa per gli header HTTP comuni con esempi e note sull\'uso.' },
  es: { title: 'Guia de Cabeceras HTTP - Referencia Completa con Ejemplos', description: 'Guia de referencia completa para las cabeceras HTTP comunes con ejemplos y notas de uso.' },
  pt: { title: 'Guia de Cabecalhos HTTP - Referencia Completa com Exemplos', description: 'Guia de referencia completo para cabecalhos HTTP comuns com exemplos e notas de uso.' },
  nl: { title: 'HTTP Headers Gids - Volledige Referentie met Voorbeelden', description: 'Uitgebreide referentiegids voor veelgebruikte HTTP-headers met voorbeelden en gebruiksnotities.' },
  pl: { title: 'Przewodnik po Naglowkach HTTP - Pelna Dokumentacja z Przykladami', description: 'Kompleksowy przewodnik po typowych naglowkach HTTP z przykladami i uwagami dotyczacymi uzycia.' },
  sv: { title: 'Guide till HTTP-Headers - Komplett Referens med Exempel', description: 'Komplett referensguide for vanliga HTTP-headers med exempel och anvandningsnoter.' },
  no: { title: 'Guide til HTTP-Headers - Komplett Referanse med Eksempler', description: 'Komplett referanseguide for vanlige HTTP-headers med eksempler og bruksnotater.' },
  zh: { title: 'HTTP 请求头指南 - 带示例的完整参考', description: '常见 HTTP 请求和响应头的完整参考指南，包含示例和使用说明。免费在线 HTTP 请求头参考。' },
  ja: { title: 'HTTP ヘッダーガイド - サンプル付き完全リファレンス', description: 'よく使われる HTTP リクエストおよびレスポンスヘッダーのサンプルと使用上の注意を含む完全なリファレンスガイド。' },
  ko: { title: 'HTTP 헤더 가이드 - 예제가 있는 완전한 참조', description: '예제와 사용 참고사항이 있는 일반적인 HTTP 요청 및 응답 헤더에 대한 포괄적인 참조 가이드.' },
  id: { title: 'Panduan Header HTTP - Referensi Lengkap dengan Contoh', description: 'Panduan referensi komprehensif untuk header HTTP umum dengan contoh dan catatan penggunaan.' },
  th: { title: 'คู่มือ HTTP Headers - อ้างอิงสมบูรณ์พร้อมตัวอย่าง', description: 'คู่มืออ้างอิงที่ครอบคลุมสำหรับ HTTP headers ทั่วไปพร้อมตัวอย่างและหมายเหตุการใช้งาน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/http-headers-guide`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/http-headers-guide`])), 'x-default': `https://viadreams.cc/en/tools/http-headers-guide` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
