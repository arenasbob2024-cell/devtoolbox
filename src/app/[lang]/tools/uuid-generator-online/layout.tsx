import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'UUID Generator Online - Free UUID v4 Bulk Generator', description: 'Generate UUID v4 identifiers online. Bulk generate 1-100 UUIDs, copy individual or all. Cryptographically secure random generation.' },
  fr: { title: 'Generateur UUID en Ligne - UUID v4 en Masse Gratuit', description: 'Generez des identifiants UUID v4 en ligne. Generation en masse de 1 a 100 UUID, copie individuelle ou groupee.' },
  de: { title: 'UUID Generator Online - Kostenlose UUID v4 Massengenerierung', description: 'UUID v4 Identifikatoren online generieren. Massengenerierung von 1-100 UUIDs, einzeln oder alle kopieren.' },
  it: { title: 'Generatore UUID Online - UUID v4 in Massa Gratis', description: 'Genera identificatori UUID v4 online. Generazione in massa da 1 a 100 UUID, copia singola o tutti.' },
  es: { title: 'Generador UUID en Linea - UUID v4 Masivo Gratis', description: 'Genere identificadores UUID v4 en linea. Generacion masiva de 1-100 UUID, copie individual o todos.' },
  pt: { title: 'Gerador UUID Online - UUID v4 em Massa Gratis', description: 'Gere identificadores UUID v4 online. Geracao em massa de 1-100 UUIDs, copie individual ou todos.' },
  nl: { title: 'UUID Generator Online - Gratis UUID v4 Bulkgenerator', description: 'Genereer UUID v4 identificatoren online. Bulkgeneratie van 1-100 UUIDs, kopieer individueel of alles.' },
  pl: { title: 'Generator UUID Online - Darmowy Masowy Generator UUID v4', description: 'Generuj identyfikatory UUID v4 online. Masowe generowanie 1-100 UUID, kopiuj pojedynczo lub wszystkie.' },
  sv: { title: 'UUID Generator Online - Gratis UUID v4 Bulkgenerator', description: 'Generera UUID v4 identifierare online. Bulkgenerering av 1-100 UUIDs, kopiera individuellt eller alla.' },
  no: { title: 'UUID Generator Online - Gratis UUID v4 Bulkgenerator', description: 'Generer UUID v4 identifikatorer online. Bulkgenerering av 1-100 UUIDs, kopier enkeltvis eller alle.' },
  zh: { title: 'UUID 在线生成器 - 免费批量 UUID v4 生成工具', description: '在线生成 UUID v4 标识符。批量生成 1-100 个 UUID，复制单个或全部。加密安全随机生成。' },
  ja: { title: 'UUID オンラインジェネレーター - 無料一括 UUID v4 生成', description: 'UUID v4 識別子をオンラインで生成。1-100個を一括生成、個別または全てコピー。暗号学的に安全。' },
  ko: { title: 'UUID 온라인 생성기 - 무료 대량 UUID v4 생성기', description: 'UUID v4 식별자를 온라인으로 생성. 1-100개 대량 생성, 개별 또는 전체 복사. 암호학적으로 안전한 랜덤 생성.' },
  id: { title: 'Generator UUID Online - Generator UUID v4 Massal Gratis', description: 'Hasilkan identifier UUID v4 online. Generasi massal 1-100 UUID, salin individu atau semua.' },
  th: { title: 'ตัวสร้าง UUID ออนไลน์ - ตัวสร้าง UUID v4 จำนวนมากฟรี', description: 'สร้างตัวระบุ UUID v4 ออนไลน์ สร้างจำนวนมาก 1-100 UUID คัดลอกทีละตัวหรือทั้งหมด' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/uuid-generator-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/uuid-generator-online`])), 'x-default': `https://viadreams.cc/en/tools/uuid-generator-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
