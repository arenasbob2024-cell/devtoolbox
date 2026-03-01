import type { Metadata } from 'next';
import { i18n, type Locale } from '@/i18n/config';

const meta: Record<string, { title: string; description: string }> = {
  en: { title: 'Responsive Breakpoint Tester - Test Your Website at Different Screen Sizes', description: 'Test your website at different screen sizes and breakpoints. Preview how your design looks on mobile, tablet, and desktop devices with common CSS breakpoints.' },
  fr: { title: 'Testeur de Points de Rupture Responsive - Tester a Differentes Tailles d\'Ecran', description: 'Testez votre site a differentes tailles d\'ecran. Apercu de votre design sur mobile, tablette et bureau.' },
  de: { title: 'Responsive Breakpoint Tester - Website bei Verschiedenen Bildschirmgroessen Testen', description: 'Testen Sie Ihre Website bei verschiedenen Bildschirmgroessen. Vorschau Ihres Designs auf Mobil, Tablet und Desktop.' },
  it: { title: 'Tester Breakpoint Responsive - Testa il Tuo Sito a Diverse Dimensioni dello Schermo', description: 'Testa il tuo sito a diverse dimensioni dello schermo. Anteprima del tuo design su mobile, tablet e desktop.' },
  es: { title: 'Probador de Breakpoints Responsive - Probar en Diferentes Tamanos de Pantalla', description: 'Prueba tu sitio en diferentes tamanos de pantalla. Vista previa de tu diseno en movil, tablet y escritorio.' },
  pt: { title: 'Testador de Breakpoints Responsivos - Testar em Diferentes Tamanhos de Tela', description: 'Teste seu site em diferentes tamanhos de tela. Visualize seu design em dispositivos moveis, tablets e desktops.' },
  nl: { title: 'Responsive Breekpunt Tester - Website Testen op Verschillende Schermformaten', description: 'Test uw website op verschillende schermformaten. Bekijk uw ontwerp op mobiel, tablet en desktop.' },
  pl: { title: 'Tester Punktow Przelamania - Testowanie w Roznych Rozmiarach Ekranu', description: 'Przetestuj swoja strone w roznych rozmiarach ekranu. Podglad projektu na urzadzeniach mobilnych, tabletach i komputerach stacjonarnych.' },
  sv: { title: 'Responsiv Brytpunktstestare - Testa Webbplatsen pa Olika Skaermstorlekar', description: 'Testa din webbplats pa olika skaermstorlekar. Forhandsgranska din design pa mobil, surfplatta och dator.' },
  no: { title: 'Responsiv Brytningstestare - Test Nettstedet pa Ulike Skaermstorrelser', description: 'Test nettstedet ditt pa ulike skaermstorrelser. Forhandsvis designet pa mobil, nettbrett og stasjonaer.' },
  zh: { title: '响应式断点测试器 - 在不同屏幕尺寸下测试网站', description: '在不同屏幕尺寸和断点下测试您的网站。预览您的设计在移动端、平板电脑和桌面设备上的外观。' },
  ja: { title: 'レスポンシブブレークポイントテスター - 異なる画面サイズでウェブサイトをテスト', description: '異なる画面サイズとブレークポイントでウェブサイトをテストします。モバイル、タブレット、デスクトップでのデザインをプレビュー。' },
  ko: { title: '반응형 브레이크포인트 테스터 - 다양한 화면 크기에서 웹사이트 테스트', description: '다양한 화면 크기와 브레이크포인트에서 웹사이트를 테스트하세요. 모바일, 태블릿, 데스크탑 기기에서의 디자인을 미리보기하세요.' },
  id: { title: 'Penguji Breakpoint Responsif - Uji Website di Berbagai Ukuran Layar', description: 'Uji website Anda di berbagai ukuran layar. Pratinjau desain Anda di perangkat mobile, tablet, dan desktop.' },
  th: { title: 'ตัวทดสอบ Responsive Breakpoint - ทดสอบเว็บไซต์ที่ขนาดหน้าจอต่างๆ', description: 'ทดสอบเว็บไซต์ของคุณที่ขนาดหน้าจอและ breakpoint ต่างๆ ดูตัวอย่างว่าการออกแบบของคุณมีลักษณะอย่างไรบนอุปกรณ์ต่างๆ' },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const t = meta[lang] || meta.en;
  const url = `https://viadreams.cc/${lang}/tools/responsive-breakpoint-tester`;
  return {
    title: t.title,
    description: t.description,
    keywords: ['responsive tester', 'breakpoint tester', 'screen size tester', 'mobile preview', 'responsive design checker'],
    openGraph: {
      title: `${t.title} | DevToolBox`, description: t.description, url, type: 'website',
      siteName: 'DevToolBox', images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${t.title} | DevToolBox`, description: t.description, images: ['https://viadreams.cc/og-image.png'] },
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/responsive-breakpoint-tester`])), 'x-default': `https://viadreams.cc/en/tools/responsive-breakpoint-tester` },
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
