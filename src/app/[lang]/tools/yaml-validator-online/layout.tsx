import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'YAML Validator Online - Check YAML Syntax Free', description: 'Validate YAML syntax online for free. Check for errors with line numbers and detailed error messages. Supports YAML 1.2 specification.' },
  fr: { title: 'Validateur YAML en Ligne Gratuit', description: 'Validez la syntaxe YAML en ligne gratuitement. Verifiez les erreurs avec numeros de ligne et messages detailles.' },
  de: { title: 'YAML Validator Online Kostenlos', description: 'YAML-Syntax online kostenlos validieren. Fehler mit Zeilennummern und detaillierten Fehlermeldungen pruefen.' },
  it: { title: 'Validatore YAML Online Gratis', description: 'Valida la sintassi YAML online gratuitamente. Controlla errori con numeri di riga e messaggi dettagliati.' },
  es: { title: 'Validador YAML en Linea Gratis', description: 'Valida la sintaxis YAML en linea gratis. Comprueba errores con numeros de linea y mensajes detallados.' },
  pt: { title: 'Validador YAML Online Gratis', description: 'Valide a sintaxe YAML online gratuitamente. Verifique erros com numeros de linha e mensagens detalhadas.' },
  nl: { title: 'YAML Validator Online Gratis', description: 'Valideer YAML-syntaxis online gratis. Controleer fouten met regelnummers en gedetailleerde foutmeldingen.' },
  pl: { title: 'Walidator YAML Online Za Darmo', description: 'Waliduj skladnie YAML online za darmo. Sprawdz bledy z numerami linii i szczegolowymi komunikatami.' },
  sv: { title: 'YAML Validator Online Gratis', description: 'Validera YAML-syntax online gratis. Kontrollera fel med radnummer och detaljerade felmeddelanden.' },
  no: { title: 'YAML Validator Online Gratis', description: 'Valider YAML-syntaks online gratis. Sjekk feil med linjenumre og detaljerte feilmeldinger.' },
  zh: { title: 'YAML 验证器在线 - 免费检查 YAML 语法', description: '免费在线验证 YAML 语法。显示行号和详细错误信息，支持 YAML 1.2 规范。' },
  ja: { title: 'YAML バリデーターオンライン - 無料で YAML 構文チェック', description: '無料でオンライン YAML 構文検証。行番号と詳細なエラーメッセージでエラーを確認。' },
  ko: { title: 'YAML 검증기 온라인 - 무료 YAML 구문 확인', description: '무료로 온라인 YAML 구문 검증. 줄 번호와 상세 오류 메시지로 오류를 확인합니다.' },
  id: { title: 'YAML Validator Online Gratis', description: 'Validasi sintaks YAML online gratis. Periksa kesalahan dengan nomor baris dan pesan error detail.' },
  th: { title: 'YAML Validator ออนไลน์ฟรี', description: 'ตรวจสอบไวยากรณ์ YAML ออนไลน์ฟรี ตรวจหาข้อผิดพลาดพร้อมหมายเลขบรรทัดและข้อความแสดงข้อผิดพลาดโดยละเอียด' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/yaml-validator-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/yaml-validator-online`])), 'x-default': `https://viadreams.cc/en/tools/yaml-validator-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
