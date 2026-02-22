import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Password Strength Checker - Test Password Security Free', description: 'Free online password strength checker. Test your password security with real-time strength scoring, crack time estimation, and improvement tips.' },
  fr: { title: 'Verificateur de Force de Mot de Passe en Ligne Gratuit', description: 'Verificateur de force de mot de passe gratuit en ligne. Testez la securite de votre mot de passe avec un score de force et estimation du temps de craquage.' },
  de: { title: 'Passwortstärke Prüfer - Passwort Sicherheit Testen Kostenlos', description: 'Kostenloser Online Passwortstärke Prüfer. Testen Sie Ihre Passwortsicherheit mit Echtzeit-Bewertung und Schätzung der Knackzeit.' },
  it: { title: 'Verificatore Sicurezza Password Online Gratis', description: 'Verificatore gratuito della forza della password online. Testa la sicurezza della tua password con punteggio in tempo reale e stima del tempo di crack.' },
  es: { title: 'Verificador de Seguridad de Contrasena en Linea Gratis', description: 'Verificador de fuerza de contrasena gratuito en linea. Prueba la seguridad de tu contrasena con puntuacion en tiempo real y estimacion de tiempo de crackeo.' },
  pt: { title: 'Verificador de Forca de Senha Online Gratis', description: 'Verificador de forca de senha gratuito online. Teste a seguranca da sua senha com pontuacao em tempo real e estimativa de tempo de quebra.' },
  nl: { title: 'Wachtwoordsterkte Checker Online Gratis', description: 'Gratis online wachtwoordsterkte checker. Test je wachtwoordbeveiliging met realtime score en schattingen van kraaktijd.' },
  pl: { title: 'Sprawdzanie Sily Hasla Online Za Darmo', description: 'Darmowe sprawdzanie sily hasla online. Przetestuj bezpieczenstwo hasla z ocena w czasie rzeczywistym i oszacowaniem czasu lamania.' },
  sv: { title: 'Losenordsstyrka Kontroll Online Gratis', description: 'Gratis online kontroll av losenordsstyrka. Testa din losenordssäkerhet med realtidsbedomning och uppskattning av knackningstid.' },
  no: { title: 'Passordstyrke Sjekker Online Gratis', description: 'Gratis online passordstyrke sjekker. Test passordets sikkerhet med sanntidsvurdering og estimat for knekkingstid.' },
  zh: { title: '密码强度检测器 - 免费在线密码安全测试', description: '免费在线密码强度检测工具。实时评估密码安全性，估算破解时间，提供改进建议。' },
  ja: { title: 'パスワード強度チェッカー - 無料オンラインパスワードセキュリティテスト', description: '無料オンラインパスワード強度チェッカー。リアルタイムの強度スコア、クラック時間推定、改善提案でパスワードセキュリティをテスト。' },
  ko: { title: '비밀번호 강도 검사기 - 무료 온라인 비밀번호 보안 테스트', description: '무료 온라인 비밀번호 강도 검사기. 실시간 강도 점수, 크래킹 시간 추정, 개선 팁으로 비밀번호 보안을 테스트.' },
  id: { title: 'Pemeriksa Kekuatan Kata Sandi Online Gratis', description: 'Pemeriksa kekuatan kata sandi online gratis. Uji keamanan kata sandi Anda dengan skor kekuatan real-time dan estimasi waktu pembobolan.' },
  th: { title: 'ตรวจสอบความแข็งแกร่งรหัสผ่านออนไลน์ฟรี', description: 'เครื่องมือตรวจสอบความแข็งแกร่งรหัสผ่านออนไลน์ฟรี ทดสอบความปลอดภัยรหัสผ่านแบบเรียลไทม์' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/password-strength-checker`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/password-strength-checker`])), 'x-default': `https://viadreams.cc/en/tools/password-strength-checker` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
