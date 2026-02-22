'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Responsive Breakpoint Tester', description: 'Test your website at different screen sizes and CSS breakpoints. Preview mobile, tablet, and desktop views side by side.',
    urlLabel: 'Website URL', load: 'Load', rotate: 'Rotate', landscape: 'Landscape', portrait: 'Portrait',
    width: 'Width', height: 'Height', custom: 'Custom', presets: 'Device Presets',
    iframeBlock: 'Note: Some websites block embedding in iframes (X-Frame-Options). Try with your own site.',
    introTitle: 'Responsive Design Breakpoint Tester',
    introText: 'Test how your website looks at various screen widths and device sizes. This tool helps web developers and designers verify that their responsive layouts work correctly across different breakpoints. Test common CSS frameworks like Tailwind CSS (sm: 640px, md: 768px, lg: 1024px, xl: 1280px) and Bootstrap (sm: 576px, md: 768px, lg: 992px, xl: 1200px) breakpoints.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are CSS breakpoints?', faq1a: 'CSS breakpoints are specific screen widths at which a responsive design changes its layout. They are defined using CSS media queries (@media rules). Common breakpoints correspond to different device sizes: mobile phones (< 640px), tablets (640-1024px), laptops (1024-1440px), and desktops (> 1440px). Frameworks like Bootstrap and Tailwind CSS have their own predefined breakpoints.',
    faq2q: 'What are the standard CSS framework breakpoints?', faq2a: 'Tailwind CSS breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). Bootstrap 5 breakpoints: sm (576px), md (768px), lg (992px), xl (1200px), xxl (1400px). Material UI breakpoints: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px).',
    faq3q: 'Why does my site look different in this tool vs real devices?', faq3a: 'This tool uses an iframe with a fixed width to simulate different screen sizes, but real devices also have different pixel densities (DPR), touch capabilities, OS fonts, and browser engines. Always test on real devices for final QA. The tool is best for quick layout checks during development.',
    faq4q: 'Why can\'t I preview some websites?', faq4a: 'Many websites use the X-Frame-Options or Content-Security-Policy HTTP headers to prevent being embedded in iframes. This is a security measure to prevent clickjacking attacks. You can test sites that allow embedding, including your own sites during development (localhost).',
    faq5q: 'What is mobile-first design?', faq5a: 'Mobile-first design is an approach where you design for small screens first, then progressively enhance for larger screens using min-width media queries. This approach is recommended because mobile users are the majority on the web, and it typically results in better performance and simpler CSS.',
  },
  fr: {
    title: 'Testeur de Points de Rupture Responsive', description: 'Testez votre site a differentes tailles d\'ecran.',
    urlLabel: 'URL du Site', load: 'Charger', rotate: 'Pivoter', landscape: 'Paysage', portrait: 'Portrait',
    width: 'Largeur', height: 'Hauteur', custom: 'Personnalise', presets: 'Presets d\'Appareils',
    iframeBlock: 'Remarque: Certains sites bloquent l\'intégration dans les iframes (X-Frame-Options).',
    introTitle: 'Testeur de Points de Rupture de Design Responsive',
    introText: 'Testez l\'apparence de votre site a differentes largeurs d\'ecran. Verifiez les points de rupture Tailwind et Bootstrap.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Que sont les points de rupture CSS?', faq1a: 'Les points de rupture CSS sont des largeurs d\'ecran specifiques auxquelles le design responsive change de mise en page.',
    faq2q: 'Points de rupture standard?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px), xl (1280px). Bootstrap: sm (576px), md (768px), lg (992px).',
    faq3q: 'Pourquoi mon site est different?', faq3a: 'Cet outil utilise un iframe qui simule differentes tailles d\'ecran.',
    faq4q: 'Pourquoi certains sites ne s\'affichent pas?', faq4a: 'Les sites utilisent X-Frame-Options pour prevenir l\'inclusion dans des iframes.',
    faq5q: 'Qu\'est-ce que le design mobile-first?', faq5a: 'Design pour petits ecrans d\'abord, puis amelioration pour les grands ecrans.',
  },
  de: {
    title: 'Responsive Breakpoint Tester', description: 'Testen Sie Ihre Website bei verschiedenen Bildschirmgroessen.',
    urlLabel: 'Website URL', load: 'Laden', rotate: 'Drehen', landscape: 'Querformat', portrait: 'Hochformat',
    width: 'Breite', height: 'Hoehe', custom: 'Benutzerdefiniert', presets: 'Gerat-Voreinstellungen',
    iframeBlock: 'Hinweis: Einige Websites blockieren die Einbettung in iframes (X-Frame-Options).',
    introTitle: 'Responsive Design Breakpoint Tester',
    introText: 'Testen Sie, wie Ihre Website bei verschiedenen Bildschirmbreiten und Gerategrossen aussieht.',
    faqTitle: 'Haeufig Gestellte Fragen',
    faq1q: 'Was sind CSS-Breakpoints?', faq1a: 'CSS-Breakpoints sind spezifische Bildschirmbreiten, bei denen ein responsives Design sein Layout andert.',
    faq2q: 'Standard CSS-Framework-Breakpoints?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).',
    faq3q: 'Warum sieht meine Website unterschiedlich aus?', faq3a: 'Dieses Tool verwendet einen iframe, der verschiedene Bildschirmgroessen simuliert.',
    faq4q: 'Warum kann ich einige Websites nicht anzeigen?', faq4a: 'Websites verwenden X-Frame-Options, um die Einbettung in iframes zu verhindern.',
    faq5q: 'Was ist Mobile-First-Design?', faq5a: 'Design zuerst fuer kleine Bildschirme, dann Erweiterung fuer groessere Bildschirme.',
  },
  it: { title: 'Tester Breakpoint Responsive', description: 'Testa il tuo sito a diverse dimensioni dello schermo.', urlLabel: 'URL del Sito', load: 'Carica', rotate: 'Ruota', landscape: 'Orizzontale', portrait: 'Verticale', width: 'Larghezza', height: 'Altezza', custom: 'Personalizzato', presets: 'Preset Dispositivo', iframeBlock: 'Nota: Alcuni siti bloccano l\'incorporamento in iframe (X-Frame-Options).', introTitle: 'Tester Breakpoint Design Responsive', introText: 'Testa l\'aspetto del tuo sito a diverse larghezze dello schermo.', faqTitle: 'Domande Frequenti', faq1q: 'Cosa sono i breakpoint CSS?', faq1a: 'I breakpoint CSS sono larghezze dello schermo specifiche in cui il design responsive cambia layout.', faq2q: 'Breakpoint standard?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Perche il mio sito appare diverso?', faq3a: 'Questo strumento usa un iframe che simula diverse dimensioni dello schermo.', faq4q: 'Perche non posso vedere alcuni siti?', faq4a: 'I siti usano X-Frame-Options per prevenire l\'incorporamento in iframe.', faq5q: 'Cos\'e il design mobile-first?', faq5a: 'Progettare prima per schermi piccoli, poi migliorare per schermi piu grandi.' },
  es: { title: 'Probador de Breakpoints Responsive', description: 'Prueba tu sitio en diferentes tamanos de pantalla.', urlLabel: 'URL del Sitio', load: 'Cargar', rotate: 'Rotar', landscape: 'Horizontal', portrait: 'Vertical', width: 'Ancho', height: 'Alto', custom: 'Personalizado', presets: 'Preajustes de Dispositivo', iframeBlock: 'Nota: Algunos sitios bloquean la incrustacion en iframes (X-Frame-Options).', introTitle: 'Probador de Breakpoints de Diseno Responsive', introText: 'Prueba el aspecto de tu sitio en diferentes anchos de pantalla.', faqTitle: 'Preguntas Frecuentes', faq1q: '¿Que son los breakpoints CSS?', faq1a: 'Los breakpoints CSS son anchos de pantalla especificos en los que el diseno responsive cambia su maquetacion.', faq2q: 'Breakpoints estandar?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: '¿Por que mi sitio se ve diferente?', faq3a: 'Esta herramienta usa un iframe que simula diferentes tamanos de pantalla.', faq4q: '¿Por que no puedo ver algunos sitios?', faq4a: 'Los sitios usan X-Frame-Options para prevenir la incrustacion en iframes.', faq5q: '¿Que es el diseno mobile-first?', faq5a: 'Disenar primero para pantallas pequenas, luego mejorar para pantallas mas grandes.' },
  pt: { title: 'Testador de Breakpoints Responsivos', description: 'Teste seu site em diferentes tamanhos de tela.', urlLabel: 'URL do Site', load: 'Carregar', rotate: 'Girar', landscape: 'Horizontal', portrait: 'Vertical', width: 'Largura', height: 'Altura', custom: 'Personalizado', presets: 'Predefincoes de Dispositivo', iframeBlock: 'Nota: Alguns sites bloqueiam a incorporacao em iframes (X-Frame-Options).', introTitle: 'Testador de Breakpoints de Design Responsivo', introText: 'Teste a aparencia do seu site em diferentes larguras de tela.', faqTitle: 'Perguntas Frequentes', faq1q: 'O que sao breakpoints CSS?', faq1a: 'Breakpoints CSS sao larguras de tela especificas em que o design responsivo muda seu layout.', faq2q: 'Breakpoints padrao?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Por que meu site parece diferente?', faq3a: 'Esta ferramenta usa um iframe que simula diferentes tamanhos de tela.', faq4q: 'Por que nao consigo ver alguns sites?', faq4a: 'Sites usam X-Frame-Options para prevenir incorporacao em iframes.', faq5q: 'O que e design mobile-first?', faq5a: 'Projetar primeiro para telas pequenas, depois melhorar para telas maiores.' },
  nl: { title: 'Responsive Breekpunt Tester', description: 'Test uw website op verschillende schermformaten.', urlLabel: 'Website URL', load: 'Laden', rotate: 'Roteren', landscape: 'Landschap', portrait: 'Portret', width: 'Breedte', height: 'Hoogte', custom: 'Aangepast', presets: 'Apparaatinstellingen', iframeBlock: 'Opmerking: Sommige sites blokkeren insluiting in iframes (X-Frame-Options).', introTitle: 'Responsive Design Breekpunt Tester', introText: 'Test hoe uw website eruitziet bij verschillende schermbreedtes.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat zijn CSS breekpunten?', faq1a: 'CSS breekpunten zijn specifieke schermbreedte waarbij het responsieve ontwerp zijn layout wijzigt.', faq2q: 'Standaard breekpunten?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Waarom ziet mijn site er anders uit?', faq3a: 'Dit hulpmiddel gebruikt een iframe dat verschillende schermformaten simuleert.', faq4q: 'Waarom kan ik sommige sites niet bekijken?', faq4a: 'Sites gebruiken X-Frame-Options om insluiting in iframes te voorkomen.', faq5q: 'Wat is mobile-first design?', faq5a: 'Ontwerpen eerst voor kleine schermen, dan verbeteren voor grotere schermen.' },
  pl: { title: 'Tester Punktow Przelamania', description: 'Przetestuj swoja strone w roznych rozmiarach ekranu.', urlLabel: 'URL Witryny', load: 'Zaladuj', rotate: 'Obróc', landscape: 'Poziomy', portrait: 'Pionowy', width: 'Szerokosc', height: 'Wysokosc', custom: 'Niestandardowy', presets: 'Urzadzenia', iframeBlock: 'Uwaga: Niektore strony blokuja osadzanie w ramkach iframe (X-Frame-Options).', introTitle: 'Tester Punktow Przelamania Responsywnego Projektu', introText: 'Testuj wyglad swojej strony przy roznych szerokosciach ekranu.', faqTitle: 'FAQ', faq1q: 'Czym sa punkty przelamania CSS?', faq1a: 'Punkty przelamania CSS to szerokosci ekranu, przy ktorych responsywny projekt zmienia uklad.', faq2q: 'Standardowe punkty przelamania?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Dlaczego moja strona wyglada inaczej?', faq3a: 'To narzedzie uzywa iframe symulujacego rozne rozmiary ekranu.', faq4q: 'Dlaczego nie moge przejrzec niektorych stron?', faq4a: 'Strony uzywaja X-Frame-Options, aby zapobiec osadzaniu w iframe.', faq5q: 'Czym jest projekt mobile-first?', faq5a: 'Projektowanie najpierw dla malych ekranow, pozniej ulepszanie dla wiekszych.' },
  sv: { title: 'Responsiv Brytpunktstestare', description: 'Testa din webbplats pa olika skaermstorlekar.', urlLabel: 'Webbplats URL', load: 'Ladda', rotate: 'Rotera', landscape: 'Liggande', portrait: 'Staende', width: 'Bredd', height: 'Hojd', custom: 'Anpassad', presets: 'Enhetsforsval', iframeBlock: 'Obs: Vissa webbplatser blockerar inbaeddning i iframes (X-Frame-Options).', introTitle: 'Responsiv Design Brytpunktstestare', introText: 'Testa hur din webbplats ser ut vid olika skaermbredder.', faqTitle: 'Vanliga Fragor', faq1q: 'Vad ar CSS-brytpunkter?', faq1a: 'CSS-brytpunkter ar specifika skaermbredder dar en responsiv design andrar sin layout.', faq2q: 'Standard brytpunkter?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Varfor ser min webbplats annorlunda ut?', faq3a: 'Det har verktyget anvander en iframe som simulerar olika skaermstorlekar.', faq4q: 'Varfor kan jag inte forhandsgranska vissa webbplatser?', faq4a: 'Webbplatser anvander X-Frame-Options for att forhindra inbaeddning i iframes.', faq5q: 'Vad ar mobile-first-design?', faq5a: 'Designa forst for sma skaermar, sedan forbattra for storre skaermar.' },
  no: { title: 'Responsiv Brytningstestare', description: 'Test nettstedet ditt pa ulike skaermstorrelser.', urlLabel: 'Nettstedsadresse', load: 'Last', rotate: 'Roter', landscape: 'Liggende', portrait: 'Staende', width: 'Bredde', height: 'Hoyde', custom: 'Egendefinert', presets: 'Enhetsforsinnstillinger', iframeBlock: 'Obs: Noen nettsteder blokkerer innebygging i iframes (X-Frame-Options).', introTitle: 'Responsiv Design Brytningstestare', introText: 'Test hvordan nettstedet ditt ser ut ved ulike skjermbredder.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hva er CSS-brytninge?', faq1a: 'CSS-brytningspunkter er spesifikke skjermbredder der et responsivt design endrer oppsettet.', faq2q: 'Standard CSS-rammeverk bryting?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Hvorfor ser nettstedet mitt annerledes ut?', faq3a: 'Dette verktøyet bruker en iframe som simulerer ulike skaermstorrelser.', faq4q: 'Hvorfor kan jeg ikke forhandsvisning noen nettsteder?', faq4a: 'Nettsteder bruker X-Frame-Options for a forhindre innebygging i iframes.', faq5q: 'Hva er mobile-first-design?', faq5a: 'Designe forst for sma skaermer, deretter forbedre for storre skaermer.' },
  zh: {
    title: '响应式断点测试器', description: '在不同屏幕尺寸和断点下测试您的网站，预览移动端、平板和桌面视图。',
    urlLabel: '网站 URL', load: '加载', rotate: '旋转', landscape: '横屏', portrait: '竖屏',
    width: '宽度', height: '高度', custom: '自定义', presets: '设备预设',
    iframeBlock: '注意：某些网站使用 X-Frame-Options 阻止 iframe 嵌入，请尝试使用您自己的网站。',
    introTitle: '响应式设计断点测试工具',
    introText: '测试您的网站在各种屏幕宽度和设备尺寸下的外观。此工具帮助开发者验证响应式布局在不同断点下是否正确工作。',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 断点？', faq1a: 'CSS 断点是响应式设计改变布局的特定屏幕宽度，通过 CSS 媒体查询（@media 规则）定义。',
    faq2q: '标准 CSS 框架断点有哪些？', faq2a: 'Tailwind CSS: sm(640px), md(768px), lg(1024px), xl(1280px)。Bootstrap 5: sm(576px), md(768px), lg(992px), xl(1200px)。',
    faq3q: '为什么我的网站在此工具中看起来不同？', faq3a: '此工具使用固定宽度的 iframe 模拟不同屏幕尺寸，但实际设备还有不同的像素密度、触控支持等差异。',
    faq4q: '为什么某些网站无法预览？', faq4a: '许多网站使用 X-Frame-Options 或 CSP 头阻止在 iframe 中嵌入，这是防止点击劫持的安全措施。',
    faq5q: '什么是移动端优先设计？', faq5a: '移动端优先是先为小屏幕设计，再使用 min-width 媒体查询逐步增强大屏幕体验的方法。',
  },
  ja: {
    title: 'レスポンシブブレークポイントテスター', description: '異なる画面サイズとブレークポイントでウェブサイトをテストします。',
    urlLabel: 'ウェブサイト URL', load: '読み込む', rotate: '回転', landscape: '横向き', portrait: '縦向き',
    width: '幅', height: '高さ', custom: 'カスタム', presets: 'デバイスプリセット',
    iframeBlock: '注意: 一部のウェブサイトは iframe への埋め込みをブロックしています（X-Frame-Options）。',
    introTitle: 'レスポンシブデザインブレークポイントテスター',
    introText: 'さまざまな画面幅とデバイスサイズでウェブサイトの見た目をテストします。',
    faqTitle: 'よくある質問',
    faq1q: 'CSS ブレークポイントとは何ですか？', faq1a: 'CSS ブレークポイントはレスポンシブデザインがレイアウトを変える特定の画面幅で、@media ルールで定義されます。',
    faq2q: '標準的な CSS フレームワークのブレークポイントは？', faq2a: 'Tailwind: sm(640px), md(768px), lg(1024px)。Bootstrap: sm(576px), md(768px), lg(992px)。',
    faq3q: 'なぜ実際のデバイスと異なって見えますか？', faq3a: 'このツールは固定幅の iframe を使用しており、実際のデバイスとは DPR やタッチ機能が異なります。',
    faq4q: 'なぜ一部のサイトをプレビューできないのですか？', faq4a: 'X-Frame-Options ヘッダーを使用して iframe への埋め込みをブロックしているサイトがあります。',
    faq5q: 'モバイルファーストデザインとは何ですか？', faq5a: '小さい画面から設計し、min-width のメディアクエリで大きい画面に対応する手法です。',
  },
  ko: {
    title: '반응형 브레이크포인트 테스터', description: '다양한 화면 크기에서 웹사이트를 테스트하세요.',
    urlLabel: '웹사이트 URL', load: '불러오기', rotate: '회전', landscape: '가로', portrait: '세로',
    width: '너비', height: '높이', custom: '사용자 정의', presets: '기기 프리셋',
    iframeBlock: '참고: 일부 웹사이트는 X-Frame-Options로 iframe 임베딩을 차단합니다.',
    introTitle: '반응형 디자인 브레이크포인트 테스터',
    introText: '다양한 화면 너비와 기기 크기에서 웹사이트가 어떻게 보이는지 테스트하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSS 브레이크포인트란 무엇인가요?', faq1a: 'CSS 브레이크포인트는 반응형 디자인이 레이아웃을 변경하는 특정 화면 너비로, @media 규칙으로 정의됩니다.',
    faq2q: '표준 CSS 프레임워크 브레이크포인트는?', faq2a: 'Tailwind: sm(640px), md(768px), lg(1024px). Bootstrap: sm(576px), md(768px), lg(992px).',
    faq3q: '왜 실제 기기와 다르게 보이나요?', faq3a: '이 도구는 고정 너비 iframe을 사용하며, 실제 기기는 픽셀 밀도와 터치 기능이 다릅니다.',
    faq4q: '왜 일부 사이트를 미리보기 할 수 없나요?', faq4a: 'X-Frame-Options 헤더를 사용해 iframe 임베딩을 차단하는 사이트가 있습니다.',
    faq5q: '모바일 퍼스트 디자인이란?', faq5a: '작은 화면부터 설계한 후 min-width 미디어 쿼리로 큰 화면을 개선하는 접근법입니다.',
  },
  id: { title: 'Penguji Breakpoint Responsif', description: 'Uji website Anda di berbagai ukuran layar.', urlLabel: 'URL Website', load: 'Muat', rotate: 'Putar', landscape: 'Lanskap', portrait: 'Potret', width: 'Lebar', height: 'Tinggi', custom: 'Kustom', presets: 'Preset Perangkat', iframeBlock: 'Catatan: Beberapa situs memblokir penyematan di iframe (X-Frame-Options).', introTitle: 'Penguji Breakpoint Desain Responsif', introText: 'Uji tampilan website Anda di berbagai lebar layar.', faqTitle: 'FAQ', faq1q: 'Apa itu breakpoint CSS?', faq1a: 'Breakpoint CSS adalah lebar layar spesifik di mana desain responsif mengubah tata letaknya.', faq2q: 'Breakpoint standar?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px).', faq3q: 'Mengapa situs saya terlihat berbeda?', faq3a: 'Alat ini menggunakan iframe yang mensimulasikan ukuran layar yang berbeda.', faq4q: 'Mengapa tidak bisa melihat beberapa situs?', faq4a: 'Situs menggunakan X-Frame-Options untuk mencegah penyematan di iframe.', faq5q: 'Apa itu desain mobile-first?', faq5a: 'Merancang terlebih dahulu untuk layar kecil, kemudian meningkatkan untuk layar yang lebih besar.' },
  th: { title: 'ตัวทดสอบ Responsive Breakpoint', description: 'ทดสอบเว็บไซต์ที่ขนาดหน้าจอต่างๆ', urlLabel: 'URL เว็บไซต์', load: 'โหลด', rotate: 'หมุน', landscape: 'แนวนอน', portrait: 'แนวตั้ง', width: 'ความกว้าง', height: 'ความสูง', custom: 'กำหนดเอง', presets: 'ค่าล่วงหน้าอุปกรณ์', iframeBlock: 'หมายเหตุ: บางเว็บไซต์บล็อกการฝังใน iframe (X-Frame-Options)', introTitle: 'ตัวทดสอบ Breakpoint การออกแบบ Responsive', introText: 'ทดสอบว่าเว็บไซต์ของคุณมีลักษณะอย่างไรที่ความกว้างหน้าจอต่างๆ', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'CSS breakpoint คืออะไร?', faq1a: 'CSS breakpoint คือความกว้างหน้าจอเฉพาะที่การออกแบบ responsive เปลี่ยนเค้าโครง', faq2q: 'Breakpoint มาตรฐาน?', faq2a: 'Tailwind: sm (640px), md (768px), lg (1024px). Bootstrap: sm (576px), md (768px), lg (992px)', faq3q: 'ทำไมเว็บไซต์ดูแตกต่างกัน?', faq3a: 'เครื่องมือนี้ใช้ iframe ที่จำลองขนาดหน้าจอต่างๆ', faq4q: 'ทำไมดูบางเว็บไซต์ไม่ได้?', faq4a: 'เว็บไซต์ใช้ X-Frame-Options เพื่อป้องกันการฝังใน iframe', faq5q: 'การออกแบบ mobile-first คืออะไร?', faq5a: 'ออกแบบสำหรับหน้าจอขนาดเล็กก่อน จากนั้นปรับปรุงสำหรับหน้าจอขนาดใหญ่' },
};

const PRESETS = [
  { name: 'iPhone SE', w: 375, h: 667, icon: '📱' },
  { name: 'iPhone 14 Pro', w: 393, h: 852, icon: '📱' },
  { name: 'Galaxy S23', w: 412, h: 915, icon: '📱' },
  { name: 'iPad', w: 768, h: 1024, icon: '📟' },
  { name: 'iPad Pro', w: 1024, h: 1366, icon: '📟' },
  { name: 'Laptop', w: 1280, h: 800, icon: '💻' },
  { name: 'Desktop HD', w: 1440, h: 900, icon: '🖥️' },
  { name: '4K', w: 2560, h: 1440, icon: '🖥️' },
  // CSS breakpoints
  { name: 'TW sm', w: 640, h: 800, icon: '📐' },
  { name: 'TW md', w: 768, h: 800, icon: '📐' },
  { name: 'TW lg', w: 1024, h: 800, icon: '📐' },
  { name: 'TW xl', w: 1280, h: 800, icon: '📐' },
  { name: 'BS sm', w: 576, h: 800, icon: '📐' },
  { name: 'BS lg', w: 992, h: 800, icon: '📐' },
];

export default function ResponsiveBreakpointTester() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [url, setUrl] = useState('https://viadreams.cc');
  const [loadedUrl, setLoadedUrl] = useState('https://viadreams.cc');
  const [width, setWidth] = useState(375);
  const [height, setHeight] = useState(812);
  const [landscape, setLandscape] = useState(false);

  const displayW = landscape ? height : width;
  const displayH = landscape ? width : height;

  const load = () => setLoadedUrl(url);

  return (
    <ToolLayout title={t.title} description={t.description} toolId="responsive-breakpoint-tester">
      {/* URL Input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load()}
          placeholder="https://example.com"
          style={{ flex: 1, padding: '8px 12px', fontSize: 13 }}
        />
        <button onClick={load} className="btn btn-primary">{t.load}</button>
        <button onClick={() => setLandscape(l => !l)} className="btn btn-secondary">
          {landscape ? t.portrait : t.landscape}
        </button>
      </div>

      {/* Presets */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {PRESETS.map(p => (
          <button key={p.name} onClick={() => { setWidth(p.w); setHeight(p.h); setLandscape(false); }} style={{
            padding: '4px 10px', fontSize: 11, borderRadius: 4, border: '1px solid var(--border-color)',
            background: width === p.w && height === p.h ? 'var(--accent-blue)' : 'var(--bg-input)',
            color: width === p.w && height === p.h ? 'white' : 'var(--text-primary)', cursor: 'pointer',
          }}>
            {p.icon} {p.name} {p.w}×{p.h}
          </button>
        ))}
      </div>

      {/* Custom size */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.width}:</label>
          <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>px</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.height}:</label>
          <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>px</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {t.width}: <strong>{displayW}px</strong> × {t.height}: <strong>{displayH}px</strong>
        </div>
      </div>

      {/* Notice */}
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, padding: '8px 12px', background: 'rgba(234,179,8,0.1)', borderRadius: 6, border: '1px solid rgba(234,179,8,0.3)' }}>
        ⚠️ {t.iframeBlock}
      </div>

      {/* Preview */}
      <div style={{ overflowX: 'auto', paddingBottom: 12 }}>
        <div style={{ display: 'inline-block', border: '2px solid var(--border-color)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <div style={{ background: 'var(--bg-input)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#f43f5e', '#f59e0b', '#22c55e'].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 4, padding: '3px 8px', fontSize: 11, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {loadedUrl}
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{displayW}×{displayH}</span>
          </div>
          <iframe
            src={loadedUrl}
            style={{ width: displayW, height: Math.min(displayH, 600), border: 'none', display: 'block', background: '#fff' }}
            title="Responsive Preview"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>

      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h2>
        {[1, 2, 3, 4, 5].map(n => (
          <details key={n} style={{ border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              {t[`faq${n}q` as keyof typeof t]}
            </summary>
            <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t[`faq${n}a` as keyof typeof t]}
            </div>
          </details>
        ))}
      </div>
    </ToolLayout>
  );
}
