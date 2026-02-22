import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'CSS Flexbox Generator & Playground - Free Tool', description: 'Visual CSS Flexbox generator with live preview. Configure flex container and item properties, generate CSS and HTML code instantly.' },
  fr: { title: 'Generateur CSS Flexbox & Playground Gratuit', description: 'Generateur visuel CSS Flexbox avec apercu en direct. Configurez les proprietes et generez le code CSS et HTML.' },
  de: { title: 'CSS Flexbox Generator & Playground Kostenlos', description: 'Visueller CSS Flexbox Generator mit Live-Vorschau. Konfigurieren Sie Flex-Eigenschaften und generieren Sie CSS- und HTML-Code.' },
  it: { title: 'Generatore CSS Flexbox & Playground Gratis', description: 'Generatore visuale CSS Flexbox con anteprima dal vivo. Configura le proprieta flex e genera codice CSS e HTML.' },
  es: { title: 'Generador CSS Flexbox & Playground Gratis', description: 'Generador visual de CSS Flexbox con vista previa en vivo. Configure propiedades flex y genere codigo CSS y HTML.' },
  pt: { title: 'Gerador CSS Flexbox & Playground Gratis', description: 'Gerador visual de CSS Flexbox com visualizacao ao vivo. Configure propriedades flex e gere codigo CSS e HTML.' },
  nl: { title: 'CSS Flexbox Generator & Playground Gratis', description: 'Visuele CSS Flexbox generator met live preview. Configureer flex-eigenschappen en genereer CSS- en HTML-code.' },
  pl: { title: 'Generator CSS Flexbox & Playground Za Darmo', description: 'Wizualny generator CSS Flexbox z podgladem na zywo. Skonfiguruj wlasciwosci flex i wygeneruj kod CSS i HTML.' },
  sv: { title: 'CSS Flexbox Generator & Playground Gratis', description: 'Visuell CSS Flexbox-generator med live-forhandsvisning. Konfigurera flex-egenskaper och generera CSS- och HTML-kod.' },
  no: { title: 'CSS Flexbox Generator & Playground Gratis', description: 'Visuell CSS Flexbox-generator med live forhåndsvisning. Konfigurer flex-egenskaper og generer CSS- og HTML-kode.' },
  zh: { title: 'CSS Flexbox \u751f\u6210\u5668 & \u6f14\u7ec3\u573a - \u514d\u8d39\u5de5\u5177', description: '\u53ef\u89c6\u5316 CSS Flexbox \u751f\u6210\u5668\uff0c\u5b9e\u65f6\u9884\u89c8\u3002\u914d\u7f6e flex \u5bb9\u5668\u548c\u9879\u76ee\u5c5e\u6027\uff0c\u5373\u65f6\u751f\u6210 CSS \u548c HTML \u4ee3\u7801\u3002' },
  ja: { title: 'CSS Flexbox \u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc & \u30d7\u30ec\u30a4\u30b0\u30e9\u30a6\u30f3\u30c9 \u7121\u6599', description: '\u30e9\u30a4\u30d6\u30d7\u30ec\u30d3\u30e5\u30fc\u4ed8\u304d\u306e\u30d3\u30b8\u30e5\u30a2\u30eb CSS Flexbox \u30b8\u30a7\u30cd\u30ec\u30fc\u30bf\u30fc\u3002CSS \u3068 HTML \u30b3\u30fc\u30c9\u3092\u5373\u5ea7\u306b\u751f\u6210\u3002' },
  ko: { title: 'CSS Flexbox \uc0dd\uc131\uae30 & \ud50c\ub808\uc774\uadf8\ub77c\uc6b4\ub4dc \ubb34\ub8cc', description: '\ub77c\uc774\ube0c \ubbf8\ub9ac\ubcf4\uae30\uac00 \uc788\ub294 \ube44\uc8fc\uc5bc CSS Flexbox \uc0dd\uc131\uae30. CSS\uc640 HTML \ucf54\ub4dc\ub97c \uc989\uc2dc \uc0dd\uc131\ud569\ub2c8\ub2e4.' },
  id: { title: 'Generator CSS Flexbox & Playground Gratis', description: 'Generator visual CSS Flexbox dengan pratinjau langsung. Konfigurasi properti flex dan hasilkan kode CSS dan HTML.' },
  th: { title: 'CSS Flexbox Generator & Playground \u0e1f\u0e23\u0e35', description: '\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07 CSS Flexbox \u0e41\u0e1a\u0e1a\u0e20\u0e32\u0e1e\u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e14\u0e39\u0e15\u0e31\u0e27\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e2a\u0e14 \u0e2a\u0e23\u0e49\u0e32\u0e07\u0e42\u0e04\u0e49\u0e14 CSS \u0e41\u0e25\u0e30 HTML \u0e17\u0e31\u0e19\u0e17\u0e35' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/css-flexbox-generator`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/css-flexbox-generator`])), 'x-default': `https://viadreams.cc/en/tools/css-flexbox-generator` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
