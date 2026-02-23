import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Email Validator Online - Validate Email Addresses Free', description: 'Validate email addresses online. Check syntax, format, and domain. Batch email validation support. Free email address checker.' },
  fr: { title: 'Validateur Email en Ligne - Valider des Adresses Email', description: 'Validez des adresses email en ligne. Verifiez la syntaxe, le format et le domaine.' },
  de: { title: 'E-Mail-Validator Online - E-Mail-Adressen Validieren', description: 'E-Mail-Adressen online validieren. Syntax, Format und Domain prüfen.' },
  it: { title: 'Validatore Email Online - Valida Indirizzi Email', description: 'Valida indirizzi email online. Controlla sintassi, formato e dominio.' },
  es: { title: 'Validador de Email Online - Validar Direcciones de Correo', description: 'Valida direcciones de email en linea. Verifica la sintaxis, el formato y el dominio.' },
  pt: { title: 'Validador de Email Online - Validar Enderecos de Email', description: 'Valide enderecos de email online. Verifique sintaxe, formato e dominio.' },
  nl: { title: 'E-mail Validator Online - E-mailadressen Valideren', description: 'Valideer e-mailadressen online. Controleer syntaxis, formaat en domein.' },
  pl: { title: 'Walidator Email Online - Walidacja Adresow Email', description: 'Waliduj adresy email online. Sprawdz skladnie, format i domene.' },
  sv: { title: 'E-postvalidator Online - Validera E-postadresser', description: 'Validera e-postadresser online. Kontrollera syntax, format och doman.' },
  no: { title: 'E-postvalidator Online - Valider E-postadresser', description: 'Valider e-postadresser online. Sjekk syntaks, format og doman.' },
  zh: { title: '邮箱验证工具 - 在线验证电子邮件地址', description: '在线验证电子邮件地址，检查语法格式和域名。支持批量邮箱验证。' },
  ja: { title: 'メールアドレス検証ツール - オンラインでメールアドレスを検証', description: 'メールアドレスをオンラインで検証します。構文、フォーマット、ドメインを確認できます。' },
  ko: { title: '이메일 유효성 검사기 - 이메일 주소 온라인 검증', description: '이메일 주소를 온라인으로 검증합니다. 문법, 형식, 도메인을 확인할 수 있습니다.' },
  id: { title: 'Validator Email Online - Validasi Alamat Email', description: 'Validasi alamat email secara online. Periksa sintaks, format, dan domain.' },
  th: { title: 'ตรวจสอบอีเมล - ตรวจสอบที่อยู่อีเมลออนไลน์', description: 'ตรวจสอบที่อยู่อีเมลออนไลน์ ตรวจสอบไวยากรณ์ รูปแบบ และโดเมน' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/email-validator-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/email-validator-online`])), 'x-default': `https://viadreams.cc/en/tools/email-validator-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
