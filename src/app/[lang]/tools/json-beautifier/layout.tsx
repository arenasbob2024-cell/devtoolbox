import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'JSON Beautifier - Pretty Print JSON Online Free', description: 'Beautify and pretty print JSON data online for free. Format messy JSON with customizable indentation (2 spaces, 4 spaces, tabs). Instant JSON beautifier tool for developers.' },
  fr: { title: 'Embellisseur JSON - Formater JSON en Ligne Gratuit', description: 'Embellissez et formatez vos donnees JSON en ligne gratuitement. Formatez le JSON avec indentation personnalisable (2 espaces, 4 espaces, tabulations).' },
  de: { title: 'JSON Beautifier - JSON Online Formatieren Kostenlos', description: 'JSON-Daten online kostenlos verschoenern und formatieren. Unordentliches JSON mit anpassbarer Einrueckung formatieren (2 Leerzeichen, 4 Leerzeichen, Tabs).' },
  it: { title: 'Abbellitore JSON - Formattare JSON Online Gratis', description: 'Abbellisci e formatta i dati JSON online gratuitamente. Formatta JSON disordinato con indentazione personalizzabile (2 spazi, 4 spazi, tab).' },
  es: { title: 'Embellecedor JSON - Formatear JSON en Linea Gratis', description: 'Embellece y formatea datos JSON en linea gratis. Formatea JSON desordenado con indentacion personalizable (2 espacios, 4 espacios, tabulaciones).' },
  pt: { title: 'Embelezador JSON - Formatar JSON Online Gratis', description: 'Embeleze e formate dados JSON online gratuitamente. Formate JSON desorganizado com indentacao personalizavel (2 espacos, 4 espacos, tabs).' },
  nl: { title: 'JSON Beautifier - JSON Online Formatteren Gratis', description: 'Verfraai en formatteer JSON-gegevens gratis online. Formatteer rommelige JSON met aanpasbare inspringing (2 spaties, 4 spaties, tabs).' },
  pl: { title: 'Upiększacz JSON - Formatuj JSON Online Za Darmo', description: 'Upiekszaj i formatuj dane JSON online za darmo. Formatuj nieurzadzony JSON z konfigurowalnym wcienciem (2 spacje, 4 spacje, tabulatory).' },
  sv: { title: 'JSON Beautifier - Formatera JSON Online Gratis', description: 'Forskoena och formatera JSON-data online gratis. Formatera ostadad JSON med anpassningsbar indrag (2 mellanslag, 4 mellanslag, tabbar).' },
  no: { title: 'JSON Beautifier - Formater JSON Online Gratis', description: 'Forskjoenn og formater JSON-data online gratis. Formater rotete JSON med tilpassbar innrykk (2 mellomrom, 4 mellomrom, tabulatorer).' },
  zh: { title: 'JSON 美化器 - 免费在线 JSON 格式化工具', description: '免费在线美化和格式化 JSON 数据。支持自定义缩进（2 空格、4 空格、制表符），即时美化混乱的 JSON 代码。' },
  ja: { title: 'JSON 整形ツール - 無料オンライン JSON フォーマッター', description: 'JSON データを無料でオンラインで整形・フォーマット。カスタマイズ可能なインデント（2 スペース、4 スペース、タブ）で乱雑な JSON を整形します。' },
  ko: { title: 'JSON 뷰티파이어 - 무료 온라인 JSON 포맷터', description: 'JSON 데이터를 무료로 온라인에서 정리하고 포맷하세요. 사용자 정의 들여쓰기(2 스페이스, 4 스페이스, 탭)로 지저분한 JSON을 정리합니다.' },
  id: { title: 'JSON Beautifier - Format JSON Online Gratis', description: 'Percantik dan format data JSON online gratis. Format JSON berantakan dengan indentasi yang dapat disesuaikan (2 spasi, 4 spasi, tab).' },
  th: { title: 'JSON Beautifier - จัดรูปแบบ JSON ออนไลน์ฟรี', description: 'ตกแต่งและจัดรูปแบบข้อมูล JSON ออนไลน์ฟรี จัดรูปแบบ JSON ที่ยุ่งเหยิงด้วยการเยื้องที่ปรับแต่งได้ (2 ช่องว่าง, 4 ช่องว่าง, แท็บ)' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/json-beautifier`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/json-beautifier`])), 'x-default': `https://viadreams.cc/en/tools/json-beautifier` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
