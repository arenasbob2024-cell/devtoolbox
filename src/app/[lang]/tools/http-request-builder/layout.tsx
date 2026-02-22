import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'HTTP Request Builder - Build & Preview HTTP Requests Online Free', description: 'Free online HTTP request builder. Build GET, POST, PUT, DELETE requests with headers and body. Preview and copy request code in multiple formats.' },
  fr: { title: 'Constructeur de Requetes HTTP - Creer des Requetes HTTP Gratuit', description: 'Constructeur de requetes HTTP gratuit en ligne. Creez des requetes GET, POST, PUT, DELETE avec en-tetes et corps.' },
  de: { title: 'HTTP-Anfrage Builder - HTTP-Anfragen Erstellen Kostenlos', description: 'Kostenloser Online HTTP-Anfrage Builder. Erstellen Sie GET, POST, PUT, DELETE Anfragen mit Headern und Body.' },
  it: { title: 'Costruttore Richieste HTTP - Crea Richieste HTTP Gratis', description: 'Costruttore richieste HTTP gratuito. Crea richieste GET, POST, PUT, DELETE con intestazioni e corpo.' },
  es: { title: 'Constructor de Solicitudes HTTP - Crear Solicitudes HTTP Gratis', description: 'Constructor de solicitudes HTTP gratuito en linea. Cree solicitudes GET, POST, PUT, DELETE con cabeceras y cuerpo.' },
  pt: { title: 'Construtor de Requisicoes HTTP - Criar Requisicoes HTTP Gratis', description: 'Construtor de requisicoes HTTP gratuito online. Crie requisicoes GET, POST, PUT, DELETE com cabecalhos e corpo.' },
  nl: { title: 'HTTP Request Builder - Bouw HTTP Verzoeken Gratis', description: 'Gratis online HTTP request builder. Bouw GET, POST, PUT, DELETE verzoeken met headers en body.' },
  pl: { title: 'Konstruktor Zadan HTTP - Tworzenie Zadan HTTP Za Darmo', description: 'Darmowy konstruktor zadan HTTP online. Tworzenie zadan GET, POST, PUT, DELETE z naglowkami i trescia.' },
  sv: { title: 'HTTP-foerfraagningsbyggare - Skapa HTTP-foerfraagningar Gratis', description: 'Gratis online HTTP-foerfraagningsbyggare. Skapa GET, POST, PUT, DELETE foerfraagningar med rubriker och kropp.' },
  no: { title: 'HTTP-foresporselsbygger - Lag HTTP-foresporsler Gratis', description: 'Gratis online HTTP-foresporselsbygger. Lag GET, POST, PUT, DELETE foresporsler med hoder og kropp.' },
  zh: { title: 'HTTP 请求构建器 - 免费在线构建和预览 HTTP 请求', description: '免费在线 HTTP 请求构建器。构建 GET、POST、PUT、DELETE 请求，包含头信息和请求体。以多种格式预览和复制请求代码。' },
  ja: { title: 'HTTPリクエストビルダー - HTTPリクエストを無料で作成', description: '無料オンラインHTTPリクエストビルダー。GET、POST、PUT、DELETEリクエストをヘッダーとボディ付きで作成。' },
  ko: { title: 'HTTP 요청 빌더 - HTTP 요청 무료 생성', description: '무료 온라인 HTTP 요청 빌더. GET, POST, PUT, DELETE 요청을 헤더와 본문과 함께 생성합니다.' },
  id: { title: 'Pembuat Permintaan HTTP - Buat Permintaan HTTP Gratis', description: 'Pembuat permintaan HTTP gratis online. Buat permintaan GET, POST, PUT, DELETE dengan header dan body.' },
  th: { title: 'ตัวสร้างคำขอ HTTP - สร้างคำขอ HTTP ฟรี', description: 'ตัวสร้างคำขอ HTTP ออนไลน์ฟรี สร้างคำขอ GET, POST, PUT, DELETE พร้อม headers และ body' },
};

const slug = 'http-request-builder';

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
    keywords: ['http request builder', 'http client', 'api tester', 'rest client', 'curl generator', 'fetch code', 'http methods', 'api request builder'],
    openGraph: { title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website', siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: { canonical: url, languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/${slug}`])), 'x-default': `https://viadreams.cc/en/tools/${slug}` } },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
