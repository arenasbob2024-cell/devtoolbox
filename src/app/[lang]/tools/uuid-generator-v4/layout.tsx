import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'UUID v4 Generator - Generate Random UUID/GUID Online Free', description: 'Free online UUID v4 generator. Generate random UUID v4 and GUID identifiers in bulk. Copy UUIDs instantly with uppercase and no-dash format options.' },
  fr: { title: 'Generateur UUID v4 - Generer UUID/GUID Aleatoire en Ligne', description: 'Generateur UUID v4 gratuit en ligne. Generez des identifiants UUID v4 et GUID aleatoires en masse.' },
  de: { title: 'UUID v4 Generator - Zufaellige UUID/GUID Online Generieren', description: 'Kostenloser Online UUID v4 Generator. Generieren Sie zufaellige UUID v4 und GUID Bezeichner in Massen.' },
  it: { title: 'Generatore UUID v4 - Genera UUID/GUID Casuali Online Gratis', description: 'Generatore UUID v4 gratuito online. Genera identificatori UUID v4 e GUID casuali in blocco.' },
  es: { title: 'Generador UUID v4 - Generar UUID/GUID Aleatorio en Linea Gratis', description: 'Generador UUID v4 gratuito en linea. Genera identificadores UUID v4 y GUID aleatorios en masa.' },
  pt: { title: 'Gerador UUID v4 - Gerar UUID/GUID Aleatorio Online Gratis', description: 'Gerador UUID v4 gratuito online. Gere identificadores UUID v4 e GUID aleatorios em massa.' },
  nl: { title: 'UUID v4 Generator - Genereer Willekeurige UUID/GUID Online Gratis', description: 'Gratis online UUID v4 generator. Genereer willekeurige UUID v4 en GUID identifiers in bulk.' },
  pl: { title: 'Generator UUID v4 - Generuj Losowe UUID/GUID Online Za Darmo', description: 'Darmowy generator UUID v4 online. Generuj losowe identyfikatory UUID v4 i GUID hurtowo.' },
  sv: { title: 'UUID v4 Generator - Generera Slumpmassiga UUID/GUID Online Gratis', description: 'Gratis online UUID v4 generator. Generera slumpmassiga UUID v4 och GUID identifierare i bulk.' },
  no: { title: 'UUID v4 Generator - Generer Tilfeldige UUID/GUID Online Gratis', description: 'Gratis online UUID v4 generator. Generer tilfeldige UUID v4 og GUID identifikatorer i bulk.' },
  zh: { title: 'UUID v4 生成器 - 免费在线生成随机 UUID/GUID', description: '免费在线 UUID v4 生成器。批量生成随机 UUID v4 和 GUID 标识符，支持大写和无连字符格式。' },
  ja: { title: 'UUID v4 ジェネレーター - ランダム UUID/GUID 無料生成', description: '無料オンライン UUID v4 ジェネレーター。ランダムな UUID v4 と GUID 識別子を一括生成。' },
  ko: { title: 'UUID v4 생성기 - 무료 온라인 랜덤 UUID/GUID 생성', description: '무료 온라인 UUID v4 생성기. 랜덤 UUID v4 및 GUID 식별자를 대량 생성합니다.' },
  id: { title: 'Generator UUID v4 - Generate UUID/GUID Acak Online Gratis', description: 'Generator UUID v4 online gratis. Generate identifier UUID v4 dan GUID acak secara massal.' },
  th: { title: 'ตัวสร้าง UUID v4 - สร้าง UUID/GUID แบบสุ่มออนไลน์ฟรี', description: 'ตัวสร้าง UUID v4 ออนไลน์ฟรี สร้าง UUID v4 และ GUID แบบสุ่มจำนวนมาก' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/uuid-generator-v4`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/uuid-generator-v4`])), 'x-default': `https://viadreams.cc/en/tools/uuid-generator-v4` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
