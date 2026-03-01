import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Beautifier & Pretty Print Online - Free Tool', description: 'Beautify and pretty-print JSON data online. Transform minified JSON into readable, well-indented format with key sorting and syntax validation.' },
  fr: { title: 'Embellisseur JSON & Pretty Print en Ligne Gratuit', description: 'Embellissez et imprimez joliment les donnees JSON en ligne. Transformez le JSON minifie en format lisible et indente.' },
  de: { title: 'JSON Verschoenerer & Pretty Print Online Kostenlos', description: 'JSON-Daten online verschoenern und huebsch drucken. Minifiziertes JSON in lesbares Format umwandeln.' },
  it: { title: 'Abbellitore JSON & Pretty Print Online Gratis', description: 'Abbellisci e stampa in modo leggibile i dati JSON online. Trasforma JSON minimizzato in formato leggibile.' },
  es: { title: 'Embellecedor JSON & Pretty Print en Linea Gratis', description: 'Embellezca e imprima bonito datos JSON en linea. Transforme JSON minificado en formato legible.' },
  pt: { title: 'Embelezador JSON & Pretty Print Online Gratis', description: 'Embeleze e imprima bonito dados JSON online. Transforme JSON minificado em formato legivel.' },
  nl: { title: 'JSON Verfraaiier & Pretty Print Online Gratis', description: 'Verfraai en print JSON-gegevens mooi online. Transformeer geminificeerde JSON naar leesbaar formaat.' },
  pl: { title: 'Upiekszczacz JSON & Pretty Print Online Za Darmo', description: 'Upiekszaj i drukuj ladnie dane JSON online. Przeksztalc zminifikowany JSON w czytelny format.' },
  sv: { title: 'JSON Forskonare & Pretty Print Online Gratis', description: 'Forskoena och skriv ut JSON-data snyggt online. Omvandla minifierad JSON till lasbart format.' },
  no: { title: 'JSON Forskjonner & Pretty Print Online Gratis', description: 'Forskjoenn og skriv ut JSON-data pent online. Omform minifisert JSON til lesbart format.' },
  zh: { title: 'JSON \u7f8e\u5316\u5668 & Pretty Print \u5728\u7ebf - \u514d\u8d39\u5de5\u5177', description: '\u5728\u7ebf\u7f8e\u5316\u548c\u683c\u5f0f\u5316\u6253\u5370 JSON \u6570\u636e\u3002\u5c06\u538b\u7f29\u7684 JSON \u8f6c\u6362\u4e3a\u53ef\u8bfb\u7684\u7f29\u8fdb\u683c\u5f0f\u3002' },
  ja: { title: 'JSON \u30d3\u30e5\u30fc\u30c6\u30a3\u30d5\u30a1\u30a4\u30a2\u30fc & Pretty Print \u30aa\u30f3\u30e9\u30a4\u30f3 \u7121\u6599', description: 'JSON \u30c7\u30fc\u30bf\u3092\u30aa\u30f3\u30e9\u30a4\u30f3\u3067\u7f8e\u5316\u30fb\u6574\u5f62\u5370\u5237\u3002\u5727\u7e2e\u3055\u308c\u305f JSON \u3092\u8aad\u307f\u3084\u3059\u3044\u5f62\u5f0f\u306b\u5909\u63db\u3002' },
  ko: { title: 'JSON \ubbf8\ud654 \ub3c4\uad6c & Pretty Print \uc628\ub77c\uc778 \ubb34\ub8cc', description: 'JSON \ub370\uc774\ud130\ub97c \uc628\ub77c\uc778\uc73c\ub85c \ubbf8\ud654 \ubc0f \uc815\ub82c \uc778\uc1c4. \uc555\ucd95\ub41c JSON\uc744 \uc77d\uae30 \uc26c\uc6b4 \ud615\uc2dd\uc73c\ub85c \ubcc0\ud658.' },
  id: { title: 'JSON Beautifier & Pretty Print Online Gratis', description: 'Beautify dan pretty-print data JSON online. Ubah JSON yang diminifikasi menjadi format yang mudah dibaca.' },
  th: { title: 'JSON Beautifier & Pretty Print \u0e2d\u0e2d\u0e19\u0e44\u0e25\u0e19\u0e4c\u0e1f\u0e23\u0e35', description: '\u0e15\u0e01\u0e41\u0e15\u0e48\u0e07\u0e41\u0e25\u0e30\u0e1e\u0e34\u0e21\u0e1e\u0e4c\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25 JSON \u0e2d\u0e2d\u0e19\u0e44\u0e25\u0e19\u0e4c \u0e41\u0e1b\u0e25\u0e07 JSON \u0e17\u0e35\u0e48\u0e22\u0e48\u0e2d\u0e40\u0e1b\u0e47\u0e19\u0e23\u0e39\u0e1b\u0e41\u0e1a\u0e1a\u0e17\u0e35\u0e48\u0e2d\u0e48\u0e32\u0e19\u0e44\u0e14\u0e49' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-beautifier-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-beautifier-online`])), 'x-default': `https://viadreams.cc/en/tools/json-beautifier-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
