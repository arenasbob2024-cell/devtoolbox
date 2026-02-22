'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Open Graph Preview', description: 'Preview how your web pages look when shared on social media. Test Open Graph and Twitter Card tags with realistic previews.',
    url: 'Page URL (optional)', ogTitle: 'OG Title', ogDesc: 'OG Description', ogImage: 'OG Image URL', ogSiteName: 'Site Name', twCard: 'Twitter Card Type',
    facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack',
    loadSample: 'Load Sample', clear: 'Clear', by: 'by',
    noImage: 'No image provided',
    introTitle: 'Social Media Link Preview Tool',
    introText: 'Test how your web pages will look when shared on Facebook, Twitter, LinkedIn, Slack, and other social media platforms. Open Graph meta tags control the title, description, and image that appear in social media link cards. This preview tool helps you verify your OG tags before publishing.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are Open Graph tags?', faq1a: 'Open Graph (OG) meta tags are HTML tags in the <head> section of a page that control how the page appears when shared on social media. They define the title, description, image, and type of your content. Facebook created the OG protocol, and it has been widely adopted by other platforms.',
    faq2q: 'Which platforms use Open Graph?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord, and many other platforms use Open Graph tags to generate link previews. Twitter uses its own Twitter Card protocol but falls back to OG tags when Twitter Card tags are not present.',
    faq3q: 'What size should my OG image be?', faq3a: 'For best results across platforms, use a 1200x630 pixel image (1.91:1 aspect ratio). This size works well on Facebook, Twitter, and LinkedIn. Use a PNG or JPEG format. Avoid text near the edges as some platforms crop images. The minimum recommended size is 200x200 pixels.',
    faq4q: 'Why is my OG image not updating?', faq4a: 'Social media platforms cache OG data when your URL is first shared. To force a refresh, use platform-specific tools: Facebook Sharing Debugger, Twitter Card Validator, or LinkedIn Post Inspector. These tools scrape your page and update the cache.',
    faq5q: 'Can I have different previews on different platforms?', faq5a: 'Yes, Twitter Card tags take precedence over OG tags on Twitter, so you can set different images/text for Twitter vs other platforms. For other platforms, they all use the same OG tags, so you cannot differentiate between them without technical workarounds.',
  },
  fr: {
    title: 'Apercu Open Graph', description: 'Previsualiser l\'apparence de vos pages web sur les reseaux sociaux.',
    url: 'URL de Page (optionnel)', ogTitle: 'Titre OG', ogDesc: 'Description OG', ogImage: 'URL Image OG', ogSiteName: 'Nom du Site', twCard: 'Type de Carte Twitter',
    facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack',
    loadSample: 'Exemple', clear: 'Effacer', by: 'par',
    noImage: 'Aucune image fournie',
    introTitle: 'Outil d\'Apercu de Liens sur les Reseaux Sociaux',
    introText: 'Testez l\'apparence de vos pages web sur Facebook, Twitter, LinkedIn et d\'autres reseaux sociaux.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Que sont les tags Open Graph?', faq1a: 'Les tags OG controlent l\'apparence de la page sur les reseaux sociaux.',
    faq2q: 'Quelles plateformes utilisent OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram et Discord.',
    faq3q: 'Quelle taille pour l\'image OG?', faq3a: '1200x630 pixels (ratio 1.91:1) pour de meilleurs resultats.',
    faq4q: 'Pourquoi mon image OG ne se met-elle pas a jour?', faq4a: 'Les reseaux sociaux mettent en cache les donnees OG. Utilisez leurs outils de debogage.',
    faq5q: 'Puis-je avoir des apercus differents?', faq5a: 'Oui, les tags Twitter Card ont la priorite sur OG pour Twitter.',
  },
  de: {
    title: 'Open Graph Vorschau', description: 'Vorschau, wie Ihre Webseiten in sozialen Netzwerken aussehen.',
    url: 'Seiten-URL (optional)', ogTitle: 'OG Titel', ogDesc: 'OG Beschreibung', ogImage: 'OG Bild URL', ogSiteName: 'Seitenname', twCard: 'Twitter-Kartentyp',
    facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack',
    loadSample: 'Beispiel', clear: 'Loeschen', by: 'von',
    noImage: 'Kein Bild angegeben',
    introTitle: 'Social-Media-Link-Vorschau-Tool',
    introText: 'Testen Sie, wie Ihre Webseiten auf Facebook, Twitter, LinkedIn und anderen sozialen Netzwerken aussehen.',
    faqTitle: 'Haeufig Gestellte Fragen',
    faq1q: 'Was sind Open-Graph-Tags?', faq1a: 'OG-Tags steuern, wie die Seite in sozialen Netzwerken erscheint.',
    faq2q: 'Welche Plattformen verwenden OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram und Discord.',
    faq3q: 'Welche Groesse fuer das OG-Bild?', faq3a: '1200x630 Pixel (Verhaeltnis 1,91:1) fuer beste Ergebnisse.',
    faq4q: 'Warum wird mein OG-Bild nicht aktualisiert?', faq4a: 'Soziale Netzwerke speichern OG-Daten im Cache. Verwenden Sie deren Debug-Tools.',
    faq5q: 'Kann ich verschiedene Vorschauen haben?', faq5a: 'Ja, Twitter-Card-Tags haben Vorrang vor OG-Tags auf Twitter.',
  },
  it: { title: 'Anteprima Open Graph', description: 'Anteprima dell\'aspetto delle pagine web sui social media.', url: 'URL Pagina (opzionale)', ogTitle: 'Titolo OG', ogDesc: 'Descrizione OG', ogImage: 'URL Immagine OG', ogSiteName: 'Nome Sito', twCard: 'Tipo Carta Twitter', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Esempio', clear: 'Cancella', by: 'da', noImage: 'Nessuna immagine fornita', introTitle: 'Strumento di Anteprima Link Social', introText: 'Testa l\'aspetto delle tue pagine web su Facebook, Twitter, LinkedIn.', faqTitle: 'Domande Frequenti', faq1q: 'Cosa sono i tag Open Graph?', faq1a: 'I tag OG controllano l\'aspetto della pagina sui social media.', faq2q: 'Quali piattaforme usano OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Dimensione immagine OG?', faq3a: '1200x630 pixel (rapporto 1.91:1) per migliori risultati.', faq4q: 'Perche l\'immagine OG non si aggiorna?', faq4a: 'I social memorizzano i dati OG nella cache. Usa i loro strumenti di debug.', faq5q: 'Posso avere anteprime diverse?', faq5a: 'Si, i tag Twitter Card hanno la priorita sugli OG su Twitter.' },
  es: { title: 'Vista Previa Open Graph', description: 'Previsualizar el aspecto de las paginas web en redes sociales.', url: 'URL de Pagina (opcional)', ogTitle: 'Titulo OG', ogDesc: 'Descripcion OG', ogImage: 'URL Imagen OG', ogSiteName: 'Nombre del Sitio', twCard: 'Tipo de Tarjeta Twitter', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Ejemplo', clear: 'Limpiar', by: 'por', noImage: 'No se proporciono imagen', introTitle: 'Herramienta de Vista Previa de Enlace Social', introText: 'Prueba el aspecto de tus paginas web en Facebook, Twitter, LinkedIn.', faqTitle: 'Preguntas Frecuentes', faq1q: '¿Que son los Open Graph tags?', faq1a: 'Los tags OG controlan el aspecto de la pagina en redes sociales.', faq2q: '¿Que plataformas usan OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: '¿Tamano de imagen OG?', faq3a: '1200x630 pixels (proporcion 1.91:1) para mejores resultados.', faq4q: '¿Por que no se actualiza la imagen OG?', faq4a: 'Las redes sociales guardan datos OG en cache. Usa sus herramientas de depuracion.', faq5q: '¿Puedo tener vistas previas diferentes?', faq5a: 'Si, los Twitter Card tags tienen prioridad sobre OG en Twitter.' },
  pt: { title: 'Visualizacao Open Graph', description: 'Visualizar a aparencia das paginas web nas redes sociais.', url: 'URL da Pagina (opcional)', ogTitle: 'Titulo OG', ogDesc: 'Descricao OG', ogImage: 'URL Imagem OG', ogSiteName: 'Nome do Site', twCard: 'Tipo de Cartao Twitter', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Exemplo', clear: 'Limpar', by: 'por', noImage: 'Nenhuma imagem fornecida', introTitle: 'Ferramenta de Pre-visualizacao de Link Social', introText: 'Teste a aparencia das suas paginas web no Facebook, Twitter, LinkedIn.', faqTitle: 'Perguntas Frequentes', faq1q: 'O que sao Open Graph tags?', faq1a: 'Tags OG controlam a aparencia da pagina nas redes sociais.', faq2q: 'Quais plataformas usam OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Tamanho da imagem OG?', faq3a: '1200x630 pixels (proporcao 1.91:1) para melhores resultados.', faq4q: 'Por que a imagem OG nao atualiza?', faq4a: 'Redes sociais armazenam dados OG em cache. Use suas ferramentas de debug.', faq5q: 'Posso ter visualizacoes diferentes?', faq5a: 'Sim, Twitter Card tags tem prioridade sobre OG no Twitter.' },
  nl: { title: 'Open Graph Voorbeeld', description: 'Bekijk hoe uw webpaginas eruitzien op sociale media.', url: 'Pagina URL (optioneel)', ogTitle: 'OG Titel', ogDesc: 'OG Beschrijving', ogImage: 'OG Afbeelding URL', ogSiteName: 'Sitenaam', twCard: 'Twitter Kaarttype', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Voorbeeld', clear: 'Wissen', by: 'door', noImage: 'Geen afbeelding opgegeven', introTitle: 'Social Media Link Voorbeeld Tool', introText: 'Test hoe uw webpaginas eruit zien op Facebook, Twitter, LinkedIn.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat zijn Open Graph tags?', faq1a: 'OG tags bepalen hoe de pagina eruit ziet op sociale media.', faq2q: 'Welke platforms gebruiken OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Afbeeldingsgrootte OG?', faq3a: '1200x630 pixels (verhouding 1.91:1) voor beste resultaten.', faq4q: 'Waarom wordt mijn OG-afbeelding niet bijgewerkt?', faq4a: 'Sociale media cachen OG-gegevens. Gebruik hun debug-tools.', faq5q: 'Kan ik verschillende voorbeelden hebben?', faq5a: 'Ja, Twitter Card tags hebben voorrang op OG op Twitter.' },
  pl: { title: 'Podglad Open Graph', description: 'Podglad wygladu stron internetowych w mediach spolecznosciowych.', url: 'URL Strony (opcjonalny)', ogTitle: 'Tytul OG', ogDesc: 'Opis OG', ogImage: 'URL Obrazu OG', ogSiteName: 'Nazwa Strony', twCard: 'Typ Karty Twitter', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Przyklad', clear: 'Wyczysc', by: 'przez', noImage: 'Nie podano obrazu', introTitle: 'Narzedzie Podgladu Linkow w Mediach Spolecznosciowych', introText: 'Testuj wyglad swoich stron na Facebooku, Twitterze, LinkedIn.', faqTitle: 'FAQ', faq1q: 'Co to sa tagi Open Graph?', faq1a: 'Tagi OG kontroluja wyglad strony w mediach spolecznosciowych.', faq2q: 'Jakie platformy uzywaja OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Rozmiar obrazu OG?', faq3a: '1200x630 pikseli (stosunek 1.91:1) dla najlepszych wynikow.', faq4q: 'Dlaczego obraz OG nie jest aktualizowany?', faq4a: 'Media spolecznosciowe buforuja dane OG. Uzyj ich narzedzi do debugowania.', faq5q: 'Czy moge miec rozne podglady?', faq5a: 'Tak, tagi Twitter Card maja pierwszenstwo przed OG na Twitterze.' },
  sv: { title: 'Open Graph Forhandsvisning', description: 'Forhandsgranska hur webbsidor ser ut pa sociala medier.', url: 'Sid-URL (valfri)', ogTitle: 'OG Rubrik', ogDesc: 'OG Beskrivning', ogImage: 'OG Bild URL', ogSiteName: 'Webbplatsnamn', twCard: 'Twitter Korttyp', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Exempel', clear: 'Rensa', by: 'av', noImage: 'Ingen bild angiven', introTitle: 'Social Medier Lankforhandsvisning Verktyg', introText: 'Testa hur dina webbsidor ser ut pa Facebook, Twitter, LinkedIn.', faqTitle: 'Vanliga Fragor', faq1q: 'Vad ar Open Graph taggar?', faq1a: 'OG taggar styr hur sidan visas pa sociala medier.', faq2q: 'Vilka plattformar anvander OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Bildstorlek OG?', faq3a: '1200x630 pixlar (forhallande 1.91:1) for basta resultat.', faq4q: 'Varfor uppdateras inte min OG-bild?', faq4a: 'Sociala medier cachelagrar OG-data. Anvand deras felsokningsverktyg.', faq5q: 'Kan jag ha olika forhandsvisningar?', faq5a: 'Ja, Twitter Card taggar har foretrade over OG pa Twitter.' },
  no: { title: 'Open Graph Forhandsvisning', description: 'Forhandsvis hvordan nettsider ser ut pa sosiale medier.', url: 'Side URL (valgfritt)', ogTitle: 'OG Tittel', ogDesc: 'OG Beskrivelse', ogImage: 'OG Bilde URL', ogSiteName: 'Nettstedsnavn', twCard: 'Twitter Korttype', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Eksempel', clear: 'Tom', by: 'av', noImage: 'Ingen bilde oppgitt', introTitle: 'Social Media Linkforhandsvisning Verktoey', introText: 'Test hvordan sidene dine ser ut pa Facebook, Twitter, LinkedIn.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hva er Open Graph tagger?', faq1a: 'OG tagger styrer hvordan siden vises pa sosiale medier.', faq2q: 'Hvilke plattformer bruker OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Bildestorrelse OG?', faq3a: '1200x630 piksler (forhold 1.91:1) for beste resultater.', faq4q: 'Hvorfor oppdateres ikke OG-bildet mitt?', faq4a: 'Sosiale medier bufrer OG-data. Bruk debug-verktoyene deres.', faq5q: 'Kan jeg ha forskjellige forhandsvisninger?', faq5a: 'Ja, Twitter Card tagger har forrang over OG pa Twitter.' },
  zh: {
    title: 'Open Graph 预览', description: '预览您的网页在社交媒体分享时的外观，测试 Open Graph 和 Twitter Card 标签。',
    url: '页面 URL（可选）', ogTitle: 'OG 标题', ogDesc: 'OG 描述', ogImage: 'OG 图片 URL', ogSiteName: '网站名称', twCard: 'Twitter 卡片类型',
    facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack',
    loadSample: '加载示例', clear: '清除', by: '来自',
    noImage: '未提供图片',
    introTitle: '社交媒体链接预览工具',
    introText: '测试您的网页在 Facebook、Twitter、LinkedIn、Slack 等社交媒体平台上分享时的外观。Open Graph meta 标签控制链接卡片中显示的标题、描述和图片。',
    faqTitle: '常见问题',
    faq1q: '什么是 Open Graph 标签？', faq1a: 'Open Graph (OG) meta 标签是控制页面在社交媒体上分享时外观的 HTML 标签，定义标题、描述、图片和内容类型。',
    faq2q: '哪些平台使用 Open Graph？', faq2a: 'Facebook、LinkedIn、Slack、Pinterest、WhatsApp、Telegram、Discord 等平台都使用 OG 标签生成链接预览。',
    faq3q: 'OG 图片应该是什么尺寸？', faq3a: '最佳尺寸为 1200x630 像素（1.91:1 比例），PNG 或 JPEG 格式。',
    faq4q: '为什么我的 OG 图片没有更新？', faq4a: '社交媒体平台会缓存 OG 数据。请使用各平台的调试工具（如 Facebook Sharing Debugger）强制刷新。',
    faq5q: '能在不同平台显示不同预览吗？', faq5a: '可以，Twitter Card 标签在 Twitter 上优先于 OG 标签，因此可以为 Twitter 设置不同的图片和文字。',
  },
  ja: {
    title: 'Open Graph プレビュー', description: 'ソーシャルメディアでシェアした際の Web ページの表示をプレビューします。',
    url: 'ページ URL（オプション）', ogTitle: 'OG タイトル', ogDesc: 'OG 説明', ogImage: 'OG 画像 URL', ogSiteName: 'サイト名', twCard: 'Twitter カードタイプ',
    facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack',
    loadSample: 'サンプル', clear: 'クリア', by: '提供',
    noImage: '画像が提供されていません',
    introTitle: 'ソーシャルメディアリンクプレビューツール',
    introText: 'Facebook、Twitter、LinkedIn などのソーシャルメディアでページがどのように表示されるかをテストします。',
    faqTitle: 'よくある質問',
    faq1q: 'Open Graph タグとは何ですか？', faq1a: 'OG タグはページがソーシャルメディアでシェアされる際の表示を制御する HTML タグです。',
    faq2q: 'どのプラットフォームが OG を使用しますか？', faq2a: 'Facebook、LinkedIn、Slack、Pinterest、WhatsApp、Telegram、Discord など。',
    faq3q: 'OG 画像のサイズは？', faq3a: '1200x630 ピクセル（比率 1.91:1）が最適です。',
    faq4q: 'OG 画像が更新されないのはなぜですか？', faq4a: 'ソーシャルメディアは OG データをキャッシュします。各プラットフォームのデバッグツールを使用してください。',
    faq5q: 'プラットフォームごとに異なるプレビューができますか？', faq5a: 'はい、Twitter Card タグは Twitter では OG タグより優先されます。',
  },
  ko: {
    title: 'Open Graph 미리보기', description: '소셜 미디어에서 공유 시 웹 페이지가 어떻게 보이는지 미리보기하세요.',
    url: '페이지 URL (선택사항)', ogTitle: 'OG 제목', ogDesc: 'OG 설명', ogImage: 'OG 이미지 URL', ogSiteName: '사이트 이름', twCard: 'Twitter 카드 유형',
    facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack',
    loadSample: '샘플', clear: '초기화', by: '제공',
    noImage: '이미지가 제공되지 않음',
    introTitle: '소셜 미디어 링크 미리보기 도구',
    introText: 'Facebook, Twitter, LinkedIn 등의 소셜 미디어에서 페이지가 어떻게 표시되는지 테스트하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Open Graph 태그란 무엇인가요?', faq1a: 'OG 태그는 소셜 미디어에서 페이지가 공유될 때의 표시를 제어하는 HTML 태그입니다.',
    faq2q: '어떤 플랫폼이 OG를 사용하나요?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord 등.',
    faq3q: 'OG 이미지 크기는?', faq3a: '1200x630 픽셀 (1.91:1 비율)이 최적입니다.',
    faq4q: 'OG 이미지가 업데이트되지 않는 이유는?', faq4a: '소셜 미디어 플랫폼은 OG 데이터를 캐시합니다. 각 플랫폼의 디버그 도구를 사용하세요.',
    faq5q: '플랫폼마다 다른 미리보기를 가질 수 있나요?', faq5a: '네, Twitter Card 태그는 Twitter에서 OG 태그보다 우선합니다.',
  },
  id: { title: 'Pratinjau Open Graph', description: 'Pratinjau tampilan halaman web di media sosial.', url: 'URL Halaman (opsional)', ogTitle: 'Judul OG', ogDesc: 'Deskripsi OG', ogImage: 'URL Gambar OG', ogSiteName: 'Nama Situs', twCard: 'Jenis Kartu Twitter', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'Contoh', clear: 'Bersihkan', by: 'oleh', noImage: 'Tidak ada gambar yang diberikan', introTitle: 'Alat Pratinjau Tautan Media Sosial', introText: 'Uji tampilan halaman web Anda di Facebook, Twitter, LinkedIn.', faqTitle: 'FAQ', faq1q: 'Apa itu Open Graph tag?', faq1a: 'Tag OG mengontrol tampilan halaman di media sosial.', faq2q: 'Platform mana yang menggunakan OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord.', faq3q: 'Ukuran gambar OG?', faq3a: '1200x630 piksel (rasio 1.91:1) untuk hasil terbaik.', faq4q: 'Mengapa gambar OG tidak diperbarui?', faq4a: 'Media sosial menyimpan data OG dalam cache. Gunakan alat debug mereka.', faq5q: 'Bisakah memiliki pratinjau berbeda?', faq5a: 'Ya, tag Twitter Card lebih diprioritaskan daripada OG di Twitter.' },
  th: { title: 'ตัวอย่าง Open Graph', description: 'ดูตัวอย่างว่าหน้าเว็บมีลักษณะอย่างไรบนโซเชียลมีเดีย', url: 'URL หน้า (ไม่บังคับ)', ogTitle: 'ชื่อ OG', ogDesc: 'คำอธิบาย OG', ogImage: 'URL รูปภาพ OG', ogSiteName: 'ชื่อเว็บไซต์', twCard: 'ประเภทการ์ด Twitter', facebookTab: 'Facebook', twitterTab: 'Twitter / X', linkedinTab: 'LinkedIn', slackTab: 'Slack', loadSample: 'ตัวอย่าง', clear: 'ล้าง', by: 'โดย', noImage: 'ไม่มีรูปภาพที่ให้', introTitle: 'เครื่องมือดูตัวอย่างลิงก์โซเชียลมีเดีย', introText: 'ทดสอบว่าหน้าเว็บของคุณมีลักษณะอย่างไรบน Facebook, Twitter, LinkedIn', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'Open Graph tag คืออะไร?', faq1a: 'แท็ก OG ควบคุมวิธีที่หน้าปรากฏบนโซเชียลมีเดีย', faq2q: 'แพลตฟอร์มใดใช้ OG?', faq2a: 'Facebook, LinkedIn, Slack, Pinterest, WhatsApp, Telegram, Discord', faq3q: 'ขนาดรูปภาพ OG?', faq3a: '1200x630 พิกเซล (อัตราส่วน 1.91:1) เพื่อผลลัพธ์ที่ดีที่สุด', faq4q: 'ทำไมรูปภาพ OG ไม่อัปเดต?', faq4a: 'โซเชียลมีเดียแคชข้อมูล OG ใช้เครื่องมือดีบักของพวกเขา', faq5q: 'สามารถมีตัวอย่างที่แตกต่างกันได้ไหม?', faq5a: 'ได้ แท็ก Twitter Card มีความสำคัญเหนือ OG บน Twitter' },
};

const SAMPLE = {
  ogTitle: 'DevToolBox - Free Developer Tools Online',
  ogDesc: 'A collection of 200+ free developer tools including JSON formatter, Base64 encoder, UUID generator, and more. No registration required.',
  ogImage: 'https://viadreams.cc/og-image.png',
  ogSiteName: 'DevToolBox',
  url: 'https://viadreams.cc',
  twCard: 'summary_large_image',
};

type Platform = 'facebook' | 'twitter' | 'linkedin' | 'slack';

export default function OpenGraphPreview() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [form, setForm] = useState(SAMPLE);
  const [platform, setPlatform] = useState<Platform>('facebook');

  const set = (k: keyof typeof SAMPLE) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));
  const clear = () => setForm({ ogTitle: '', ogDesc: '', ogImage: '', ogSiteName: '', url: '', twCard: 'summary_large_image' });

  const domain = form.url ? (() => { try { return new URL(form.url).hostname; } catch { return form.url; } })() : 'example.com';

  const FacebookCard = () => (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #ddd', maxWidth: 500, background: '#fff' }}>
      {form.ogImage ? (
        <img src={form.ogImage} alt="OG" style={{ width: '100%', aspectRatio: '1.91/1', objectFit: 'cover', display: 'block', background: '#e4e6ea' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <div style={{ width: '100%', aspectRatio: '1.91/1', background: '#e4e6ea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#90949c', fontSize: 13 }}>{t.noImage}</div>
      )}
      <div style={{ padding: '12px 16px', background: '#f2f3f5' }}>
        <div style={{ fontSize: 11, color: '#90949c', textTransform: 'uppercase', marginBottom: 4 }}>{domain}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1c1e21', marginBottom: 4, lineHeight: 1.3 }}>{form.ogTitle || 'Page Title'}</div>
        <div style={{ fontSize: 13, color: '#606770', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{form.ogDesc || 'Page description'}</div>
      </div>
    </div>
  );

  const TwitterCard = () => (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e1e8ed', maxWidth: 500, background: '#fff' }}>
      {form.twCard === 'summary_large_image' ? (
        form.ogImage ? (
          <img src={form.ogImage} alt="TW" style={{ width: '100%', aspectRatio: '2/1', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div style={{ width: '100%', aspectRatio: '2/1', background: '#e1e8ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8899a6', fontSize: 13 }}>{t.noImage}</div>
        )
      ) : null}
      <div style={{ padding: 12, display: 'flex', gap: 10 }}>
        {form.twCard === 'summary' && form.ogImage && (
          <img src={form.ogImage} alt="TW" style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#14171a', marginBottom: 4 }}>{form.ogTitle || 'Page Title'}</div>
          <div style={{ fontSize: 12, color: '#657786', lineHeight: 1.4, marginBottom: 4 }}>{form.ogDesc || 'Page description'}</div>
          <div style={{ fontSize: 12, color: '#657786' }}>🔗 {domain}</div>
        </div>
      </div>
    </div>
  );

  const LinkedInCard = () => (
    <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e0dfdc', maxWidth: 500, background: '#fff' }}>
      {form.ogImage ? (
        <img src={form.ogImage} alt="LI" style={{ width: '100%', aspectRatio: '1.91/1', objectFit: 'cover', display: 'block', background: '#f3f2ef' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      ) : (
        <div style={{ width: '100%', aspectRatio: '1.91/1', background: '#f3f2ef', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86888a', fontSize: 13 }}>{t.noImage}</div>
      )}
      <div style={{ padding: 12, background: '#eef3f8' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#000000e0', marginBottom: 4 }}>{form.ogTitle || 'Page Title'}</div>
        <div style={{ fontSize: 12, color: '#00000099' }}>{form.ogSiteName || domain} • 1 min read</div>
      </div>
    </div>
  );

  const SlackCard = () => (
    <div style={{ padding: '8px 12px', borderRadius: '0 4px 4px 0', background: '#fff', maxWidth: 400, border: '1px solid #e8e8e8', borderLeft: '4px solid #36c5f0' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1264a3', marginBottom: 4 }}>{form.ogSiteName || domain}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1d1c1d', marginBottom: 4 }}>{form.ogTitle || 'Page Title'}</div>
      <div style={{ fontSize: 13, color: '#616061', lineHeight: 1.4, marginBottom: 8 }}>{form.ogDesc || 'Page description'}</div>
      {form.ogImage && <img src={form.ogImage} alt="Slack" style={{ maxWidth: '100%', borderRadius: 8, display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
    </div>
  );

  return (
    <ToolLayout title={t.title} description={t.description} toolId="open-graph-preview">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Input */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button onClick={() => setForm(SAMPLE)} className="btn btn-secondary">{t.loadSample}</button>
            <button onClick={clear} className="btn btn-secondary">{t.clear}</button>
          </div>
          {[
            { key: 'ogTitle' as const, label: t.ogTitle, placeholder: 'My Awesome Page' },
            { key: 'ogImage' as const, label: t.ogImage, placeholder: 'https://example.com/image.jpg' },
            { key: 'ogSiteName' as const, label: t.ogSiteName, placeholder: 'My Brand' },
            { key: 'url' as const, label: t.url, placeholder: 'https://example.com' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{label}</label>
              <input value={form[key]} onChange={set(key)} placeholder={placeholder} style={{ width: '100%', padding: '8px 10px', fontSize: 13, marginBottom: 12 }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.ogDesc}</label>
            <textarea value={form.ogDesc} onChange={e => setForm(f => ({ ...f, ogDesc: e.target.value }))} placeholder="A brief description..." style={{ width: '100%', padding: '8px 10px', fontSize: 13, marginBottom: 12, minHeight: 80 }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>{t.twCard}</label>
            <select value={form.twCard} onChange={set('twCard')} style={{ width: '100%', padding: '8px 10px', fontSize: 13 }}>
              <option value="summary_large_image">summary_large_image</option>
              <option value="summary">summary</option>
            </select>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid var(--border-color)', paddingBottom: 8 }}>
            {([['facebook', t.facebookTab], ['twitter', t.twitterTab], ['linkedin', t.linkedinTab], ['slack', t.slackTab]] as const).map(([p, label]) => (
              <button key={p} onClick={() => setPlatform(p)} style={{
                padding: '4px 12px', fontSize: 12, borderRadius: 4, border: '1px solid var(--border-color)',
                background: platform === p ? 'var(--accent-blue)' : 'transparent',
                color: platform === p ? 'white' : 'var(--text-secondary)', cursor: 'pointer',
              }}>{label}</button>
            ))}
          </div>
          <div style={{ background: '#f0f2f5', borderRadius: 12, padding: 16 }}>
            {platform === 'facebook' && <FacebookCard />}
            {platform === 'twitter' && <TwitterCard />}
            {platform === 'linkedin' && <LinkedInCard />}
            {platform === 'slack' && <SlackCard />}
          </div>
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
