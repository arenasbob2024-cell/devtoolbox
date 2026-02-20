import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'String to Base64 Converter - UTF-8 Text to Base64 Online', description: 'Convert strings to Base64 encoding with full UTF-8 support. Get both standard and URL-safe Base64 output. Free online string to Base64 encoder.' },
  fr: { title: 'Convertisseur String en Base64 - Texte UTF-8 en Base64', description: 'Convertissez des chaines en encodage Base64 avec support UTF-8 complet. Obtenez Base64 standard et URL-safe. Encodeur string vers Base64 gratuit.' },
  de: { title: 'String zu Base64 Konverter - UTF-8 Text in Base64 Online', description: 'Konvertieren Sie Strings mit voller UTF-8-Unterstutzung in Base64. Standard und URL-sicheres Base64. Kostenloser Online-String-zu-Base64-Encoder.' },
  it: { title: 'Convertitore Stringa in Base64 - Testo UTF-8 in Base64', description: 'Converti stringhe in codifica Base64 con supporto UTF-8 completo. Output Base64 standard e URL-safe. Encoder stringa-Base64 online gratuito.' },
  es: { title: 'Convertidor String a Base64 - Texto UTF-8 a Base64 en Linea', description: 'Convierte cadenas a codificacion Base64 con soporte UTF-8 completo. Base64 estandar y URL-safe. Codificador string-Base64 gratuito en linea.' },
  pt: { title: 'Conversor String para Base64 - Texto UTF-8 para Base64 Online', description: 'Converta strings para codificacao Base64 com suporte UTF-8 completo. Saida Base64 padrao e URL-safe. Codificador string-Base64 online gratuito.' },
  nl: { title: 'String naar Base64 Converter - UTF-8 Tekst naar Base64', description: 'Converteer strings naar Base64-codering met volledige UTF-8-ondersteuning. Standaard en URL-veilige Base64-uitvoer. Gratis online string-naar-Base64-encoder.' },
  pl: { title: 'Konwerter String na Base64 - Tekst UTF-8 na Base64 Online', description: 'Konwertuj ciagi znakow na kodowanie Base64 z pelna obsluga UTF-8. Standardowe i URL-safe Base64. Darmowy enkoder string-Base64 online.' },
  sv: { title: 'String till Base64 Konverterare - UTF-8 Text till Base64', description: 'Konvertera strangar till Base64-kodning med fullt UTF-8-stod. Standard och URL-saker Base64-utdata. Gratis online string-till-Base64-kodare.' },
  no: { title: 'String til Base64 Konverter - UTF-8 Tekst til Base64 Online', description: 'Konverter strenger til Base64-koding med full UTF-8-stotte. Standard og URL-sikker Base64-utdata. Gratis online string-til-Base64-koder.' },
  zh: { title: '字符串转 Base64 转换器 - UTF-8 文本转 Base64 在线工具', description: '将字符串转换为 Base64 编码，完整支持 UTF-8。同时输出标准 Base64 和 URL 安全 Base64。免费在线字符串转 Base64 编码器。' },
  ja: { title: '文字列 Base64 変換 - UTF-8 テキストを Base64 にオンライン変換', description: '文字列を完全な UTF-8 サポートで Base64 エンコーディングに変換。標準と URL セーフの Base64 出力。無料オンライン文字列 Base64 エンコーダー。' },
  ko: { title: '문자열 Base64 변환기 - UTF-8 텍스트를 Base64로 온라인 변환', description: '문자열을 완전한 UTF-8 지원으로 Base64 인코딩으로 변환하세요. 표준 및 URL 안전 Base64 출력. 무료 온라인 문자열-Base64 인코더.' },
  id: { title: 'Konverter String ke Base64 - Teks UTF-8 ke Base64 Online', description: 'Konversi string ke encoding Base64 dengan dukungan UTF-8 penuh. Output Base64 standar dan URL-safe. Encoder string-ke-Base64 online gratis.' },
  th: { title: 'ตัวแปลง String เป็น Base64 - แปลงข้อความ UTF-8 เป็น Base64 ออนไลน์', description: 'แปลงสตริงเป็นการเข้ารหัส Base64 พร้อมรองรับ UTF-8 เต็มรูปแบบ ผลลัพธ์ Base64 มาตรฐานและ URL-safe เครื่องมือแปลง string เป็น Base64 ออนไลน์ฟรี' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/string-to-base64`;
  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: `${t.title} | DevToolBox`,
      description: t.description,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | DevToolBox`,
      description: t.description,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/string-to-base64`])),
        'x-default': `https://viadreams.cc/en/tools/string-to-base64`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
