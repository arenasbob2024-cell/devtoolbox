import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Base64 Decoder - Decode Base64 to Text Online Free', description: 'Decode Base64 strings back to plain text instantly. Free online Base64 decoding tool. Handles data URIs, JWT tokens, and MIME content. Browser-only processing.' },
  fr: { title: 'Decodeur Base64 - Decoder Base64 en Texte en Ligne', description: 'Decodez les chaines Base64 en texte brut instantanement. Outil de decodage Base64 gratuit en ligne. Gere les URI de donnees, jetons JWT et contenu MIME.' },
  de: { title: 'Base64 Decoder - Base64 Online in Text Dekodieren', description: 'Base64-Zeichenketten sofort in Klartext dekodieren. Kostenloses Online-Base64-Dekodierungstool. Verarbeitet Data-URIs, JWT-Tokens und MIME-Inhalte.' },
  it: { title: 'Decoder Base64 - Decodifica Base64 in Testo Online Gratis', description: 'Decodifica stringhe Base64 in testo semplice istantaneamente. Strumento di decodifica Base64 online gratuito. Gestisce data URI, token JWT e contenuto MIME.' },
  es: { title: 'Decodificador Base64 - Decodificar Base64 a Texto en Linea', description: 'Decodifica cadenas Base64 a texto plano al instante. Herramienta de decodificacion Base64 gratuita en linea. Maneja URIs de datos, tokens JWT y contenido MIME.' },
  pt: { title: 'Decodificador Base64 - Decodificar Base64 para Texto Online', description: 'Decodifique strings Base64 para texto simples instantaneamente. Ferramenta de decodificacao Base64 online gratuita. Lida com data URIs, tokens JWT e conteudo MIME.' },
  nl: { title: 'Base64 Decoder - Base64 Online naar Tekst Decoderen', description: 'Decodeer Base64-strings direct naar platte tekst. Gratis online Base64-decoderingstool. Verwerkt data-URI\'s, JWT-tokens en MIME-inhoud.' },
  pl: { title: 'Dekoder Base64 - Dekoduj Base64 do Tekstu Online', description: 'Dekoduj ciagi Base64 do tekstu natychmiast. Darmowe narzedzie dekodowania Base64 online. Obsluguje URI danych, tokeny JWT i tresc MIME.' },
  sv: { title: 'Base64 Decoder - Avkoda Base64 till Text Online Gratis', description: 'Avkoda Base64-strangar till vanlig text direkt. Gratis online Base64-avkodningsverktyg. Hanterar data-URI:er, JWT-tokens och MIME-innehall.' },
  no: { title: 'Base64 Decoder - Dekod Base64 til Tekst Online Gratis', description: 'Dekod Base64-strenger til ren tekst umiddelbart. Gratis online Base64-dekodingsverktoy. Handterer data-URIer, JWT-tokens og MIME-innhold.' },
  zh: { title: 'Base64 解码器 - 免费在线 Base64 转文本工具', description: '即时将 Base64 字符串解码为纯文本。免费在线 Base64 解码工具。支持处理 data URI、JWT 令牌和 MIME 内容。所有处理在浏览器本地完成。' },
  ja: { title: 'Base64 デコーダー - Base64 をテキストに無料オンラインデコード', description: 'Base64 文字列を即座にプレーンテキストにデコード。無料オンライン Base64 デコードツール。データ URI、JWT トークン、MIME コンテンツに対応。' },
  ko: { title: 'Base64 디코더 - Base64를 텍스트로 무료 온라인 디코딩', description: 'Base64 문자열을 즉시 일반 텍스트로 디코딩하세요. 무료 온라인 Base64 디코딩 도구. 데이터 URI, JWT 토큰, MIME 콘텐츠를 처리합니다.' },
  id: { title: 'Base64 Decoder - Decode Base64 ke Teks Online Gratis', description: 'Decode string Base64 ke teks biasa secara instan. Alat decoding Base64 online gratis. Menangani data URI, token JWT, dan konten MIME.' },
  th: { title: 'Base64 Decoder - ถอดรหัส Base64 เป็นข้อความออนไลน์ฟรี', description: 'ถอดรหัสสตริง Base64 เป็นข้อความธรรมดาทันที เครื่องมือถอดรหัส Base64 ออนไลน์ฟรี รองรับ data URI, JWT token และ MIME content' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/base64-decoder`;
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
        ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/base64-decoder`])),
        'x-default': `https://viadreams.cc/en/tools/base64-decoder`,
      },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
