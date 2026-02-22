import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Password Generator Online - Create Strong Random Passwords Free', description: 'Generate strong, random passwords online. Customize length, uppercase, lowercase, numbers, and symbols. Check password strength instantly with our free tool.' },
  fr: { title: 'Generateur de Mot de Passe en Ligne Gratuit', description: 'Generez des mots de passe forts et aleatoires en ligne. Personnalisez la longueur, les majuscules, les chiffres et les symboles.' },
  de: { title: 'Passwort Generator Online Kostenlos', description: 'Starke, zufaellige Passwoerter online generieren. Laenge, Gross-/Kleinbuchstaben, Zahlen und Symbole anpassen.' },
  it: { title: 'Generatore di Password Online Gratis', description: 'Genera password forti e casuali online. Personalizza lunghezza, maiuscole, numeri e simboli.' },
  es: { title: 'Generador de Contrasenas en Linea Gratis', description: 'Genera contrasenas fuertes y aleatorias en linea. Personaliza longitud, mayusculas, numeros y simbolos.' },
  pt: { title: 'Gerador de Senhas Online Gratis', description: 'Gere senhas fortes e aleatorias online. Personalize comprimento, maiusculas, numeros e simbolos.' },
  nl: { title: 'Wachtwoord Generator Online Gratis', description: 'Genereer sterke, willekeurige wachtwoorden online. Pas lengte, hoofdletters, cijfers en symbolen aan.' },
  pl: { title: 'Generator Hasel Online Za Darmo', description: 'Generuj silne, losowe hasla online. Dostosuj dlugosc, wielkie litery, cyfry i symbole.' },
  sv: { title: 'Loesenordsgenerator Online Gratis', description: 'Generera starka, slumpaessiga loesenord online. Anpassa laengd, versaler, siffror och symboler.' },
  no: { title: 'Passordgenerator Online Gratis', description: 'Generer sterke, tilfeldige passord online. Tilpass lengde, store bokstaver, tall og symboler.' },
  zh: { title: '在线密码生成器 - 免费生成强随机密码', description: '在线生成强随机密码。自定义长度、大小写字母、数字和特殊符号。即时检测密码强度。' },
  ja: { title: 'パスワード生成器オンライン - 強力なランダムパスワードを無料で生成', description: '強力なランダムパスワードをオンラインで生成。長さ、大文字、小文字、数字、記号をカスタマイズ。' },
  ko: { title: '온라인 비밀번호 생성기 - 무료 강력한 랜덤 비밀번호 생성', description: '강력한 랜덤 비밀번호를 온라인으로 생성합니다. 길이, 대소문자, 숫자, 기호를 사용자 정의하세요.' },
  id: { title: 'Password Generator Online Gratis', description: 'Buat kata sandi kuat dan acak secara online. Sesuaikan panjang, huruf besar, angka, dan simbol.' },
  th: { title: 'สร้างรหัสผ่านออนไลน์ฟรี', description: 'สร้างรหัสผ่านที่แข็งแกร่งและสุ่มออนไลน์ กำหนดความยาว ตัวพิมพ์ใหญ่ ตัวเลข และสัญลักษณ์ได้' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/password-generator-online`;
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
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/password-generator-online`])), 'x-default': `https://viadreams.cc/en/tools/password-generator-online` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  return <>{children}</>;
}
