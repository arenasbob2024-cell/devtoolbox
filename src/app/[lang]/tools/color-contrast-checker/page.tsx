'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Color Contrast Checker', description: 'Check WCAG color contrast ratios for accessibility compliance. Test AA and AAA levels for normal and large text.',
    foreground: 'Foreground Color', background: 'Background Color', preview: 'Preview Text',
    ratio: 'Contrast Ratio', normalText: 'Normal Text', largeText: 'Large Text', graphicUI: 'Graphic / UI',
    pass: 'Pass', fail: 'Fail', aaLevel: 'AA Level', aaaLevel: 'AAA Level',
    previewText: 'The quick brown fox jumps over the lazy dog',
    swapColors: 'Swap Colors', suggestions: 'Suggestions',
    introTitle: 'WCAG Color Contrast Checker for Web Accessibility',
    introText: 'Ensure your website meets WCAG 2.1 accessibility guidelines for color contrast. The Web Content Accessibility Guidelines (WCAG) define minimum contrast ratios to ensure content is readable for users with visual impairments, including color blindness. Level AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is WCAG color contrast?', faq1a: 'WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios between text and its background to ensure readability for users with visual impairments. The contrast ratio is calculated based on the relative luminance of the foreground and background colors.',
    faq2q: 'What are the WCAG AA and AAA levels?', faq2a: 'WCAG AA (Level 2) is the minimum standard for most legal requirements. It requires a contrast ratio of at least 4.5:1 for normal text, 3:1 for large text (18pt+), and 3:1 for UI components and graphical objects. WCAG AAA (Level 3) requires 7:1 for normal text and 4.5:1 for large text. AAA is the highest level.',
    faq3q: 'What counts as large text?', faq3a: 'WCAG defines large text as at least 18 points (24px) or 14 points (approximately 18.67px) for bold text. For large text, the minimum contrast ratio is lower because larger text is inherently easier to read.',
    faq4q: 'Does contrast matter for icons and images?', faq4a: 'Yes, WCAG 1.4.11 (Non-text Contrast) requires that UI components, icons, and informational graphics have at least a 3:1 contrast ratio against adjacent colors. This applies to any visual information required to understand the content, not decorative elements.',
    faq5q: 'How do I fix poor color contrast?', faq5a: 'To improve contrast, darken your foreground color or lighten the background (or vice versa). You can also increase text size to use the more lenient large-text ratios. Avoid using red-green color combinations as they are problematic for colorblind users. Use this checker iteratively to find compliant color pairs.',
  },
  fr: {
    title: 'Verificateur de Contraste Couleur', description: 'Verifiez les ratios de contraste des couleurs WCAG.',
    foreground: 'Couleur de Premier Plan', background: 'Couleur d\'Arriere-plan', preview: 'Apercu du Texte',
    ratio: 'Rapport de Contraste', normalText: 'Texte Normal', largeText: 'Grand Texte', graphicUI: 'Graphique / UI',
    pass: 'Reussi', fail: 'Echoue', aaLevel: 'Niveau AA', aaaLevel: 'Niveau AAA',
    previewText: 'Le renard brun rapide saute par-dessus le chien paresseux',
    swapColors: 'Inverser Couleurs', suggestions: 'Suggestions',
    introTitle: 'Verificateur de Contraste WCAG pour l\'Accessibilite Web',
    introText: 'Assurez-vous que votre site respecte les directives d\'accessibilite WCAG 2.1 pour le contraste des couleurs.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Qu\'est-ce que le contraste WCAG?', faq1a: 'WCAG definit des ratios de contraste minimaux entre le texte et son fond pour assurer la lisibilite.',
    faq2q: 'Niveaux AA et AAA?', faq2a: 'AA requiert 4,5:1 pour le texte normal, 3:1 pour le grand texte. AAA requiert 7:1 et 4,5:1.',
    faq3q: 'Qu\'est-ce qu\'un grand texte?', faq3a: 'Au moins 18pt (24px) ou 14pt en gras.',
    faq4q: 'Le contraste pour les icones?', faq4a: 'Oui, les composants UI et icones doivent avoir un rapport de 3:1.',
    faq5q: 'Comment ameliorer le contraste?', faq5a: 'Assombrir la couleur de premier plan ou eclaircir le fond.',
  },
  de: {
    title: 'Farbkontrast Checker', description: 'Ueberpruefen Sie WCAG Farbkontrastverhältnisse fuer Barrierefreiheit.',
    foreground: 'Vordergrundfarbe', background: 'Hintergrundfarbe', preview: 'Textvorschau',
    ratio: 'Kontrast-Verhaltnis', normalText: 'Normaler Text', largeText: 'Grosser Text', graphicUI: 'Grafik / UI',
    pass: 'Bestanden', fail: 'Fehlgeschlagen', aaLevel: 'AA-Niveau', aaaLevel: 'AAA-Niveau',
    previewText: 'Der schnelle braune Fuchs springt ueber den faulen Hund',
    swapColors: 'Farben tauschen', suggestions: 'Vorschlaege',
    introTitle: 'WCAG Farbkontrast Checker fuer Web-Barrierefreiheit',
    introText: 'Stellen Sie sicher, dass Ihre Website die WCAG 2.1 Barrierefreiheitsrichtlinien fuer Farbkontrast einhalt.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist WCAG Farbkontrast?', faq1a: 'WCAG definiert Mindestkontrastverhältnisse zwischen Text und Hintergrund.',
    faq2q: 'AA- und AAA-Niveau?', faq2a: 'AA erfordert 4,5:1 fuer normalen Text, 3:1 fuer grossen Text. AAA erfordert 7:1 und 4,5:1.',
    faq3q: 'Was gilt als grosser Text?', faq3a: 'Mindestens 18pt (24px) oder 14pt fett.',
    faq4q: 'Kontrast fuer Symbole?', faq4a: 'Ja, UI-Komponenten benoetigen ein Verhaltnis von 3:1.',
    faq5q: 'Wie verbessere ich den Kontrast?', faq5a: 'Vordergrundfarbe dunkler oder Hintergrund heller machen.',
  },
  it: { title: 'Verificatore Contrasto Colori', description: 'Controlla i rapporti di contrasto WCAG.', foreground: 'Colore Primo Piano', background: 'Colore Sfondo', preview: 'Anteprima Testo', ratio: 'Rapporto di Contrasto', normalText: 'Testo Normale', largeText: 'Testo Grande', graphicUI: 'Grafica / UI', pass: 'Superato', fail: 'Fallito', aaLevel: 'Livello AA', aaaLevel: 'Livello AAA', previewText: 'Il rapido volpe marrone salta sopra il pigro cane', swapColors: 'Scambia Colori', suggestions: 'Suggerimenti', introTitle: 'Verificatore Contrasto WCAG per Accessibilita Web', introText: 'Assicurati che il tuo sito rispetti le linee guida WCAG 2.1 sul contrasto dei colori.', faqTitle: 'Domande Frequenti', faq1q: 'Cos\'e il contrasto WCAG?', faq1a: 'WCAG definisce rapporti di contrasto minimi tra testo e sfondo.', faq2q: 'Livelli AA e AAA?', faq2a: 'AA richiede 4,5:1 per testo normale, 3:1 per testo grande.', faq3q: 'Cos\'e il testo grande?', faq3a: 'Almeno 18pt (24px) o 14pt in grassetto.', faq4q: 'Contrasto per le icone?', faq4a: 'Si, i componenti UI richiedono un rapporto di 3:1.', faq5q: 'Come migliorare il contrasto?', faq5a: 'Scurisci il colore del testo o schiarisci lo sfondo.' },
  es: { title: 'Verificador de Contraste de Color', description: 'Verifica los ratios de contraste WCAG.', foreground: 'Color de Primer Plano', background: 'Color de Fondo', preview: 'Vista Previa del Texto', ratio: 'Ratio de Contraste', normalText: 'Texto Normal', largeText: 'Texto Grande', graphicUI: 'Grafico / UI', pass: 'Aprobado', fail: 'Fallido', aaLevel: 'Nivel AA', aaaLevel: 'Nivel AAA', previewText: 'El rapido zorro marron salta sobre el perro perezoso', swapColors: 'Intercambiar Colores', suggestions: 'Sugerencias', introTitle: 'Verificador de Contraste WCAG para Accesibilidad Web', introText: 'Asegurate de que tu sitio cumpla con las pautas de accesibilidad WCAG 2.1 para el contraste de colores.', faqTitle: 'Preguntas Frecuentes', faq1q: '¿Que es el contraste WCAG?', faq1a: 'WCAG define ratios de contraste minimos entre texto y fondo.', faq2q: 'Niveles AA y AAA?', faq2a: 'AA requiere 4,5:1 para texto normal, 3:1 para texto grande.', faq3q: '¿Que es texto grande?', faq3a: 'Al menos 18pt (24px) o 14pt en negrita.', faq4q: '¿Contraste para iconos?', faq4a: 'Si, los componentes UI requieren un ratio de 3:1.', faq5q: '¿Como mejorar el contraste?', faq5a: 'Oscurece el color del texto o aclara el fondo.' },
  pt: { title: 'Verificador de Contraste de Cor', description: 'Verifique os ratios de contraste WCAG.', foreground: 'Cor de Primeiro Plano', background: 'Cor de Fundo', preview: 'Visualizacao de Texto', ratio: 'Ratio de Contraste', normalText: 'Texto Normal', largeText: 'Texto Grande', graphicUI: 'Grafico / UI', pass: 'Aprovado', fail: 'Reprovado', aaLevel: 'Nivel AA', aaaLevel: 'Nivel AAA', previewText: 'A rapida raposa marrom salta sobre o cao preguicoso', swapColors: 'Trocar Cores', suggestions: 'Sugestoes', introTitle: 'Verificador de Contraste WCAG para Acessibilidade Web', introText: 'Verifique se seu site atende as diretrizes de acessibilidade WCAG 2.1 para contraste de cores.', faqTitle: 'Perguntas Frequentes', faq1q: 'O que e contraste WCAG?', faq1a: 'WCAG define ratios de contraste minimos entre texto e fundo.', faq2q: 'Niveis AA e AAA?', faq2a: 'AA requer 4,5:1 para texto normal, 3:1 para texto grande.', faq3q: 'O que e texto grande?', faq3a: 'Pelo menos 18pt (24px) ou 14pt em negrito.', faq4q: 'Contraste para icones?', faq4a: 'Sim, componentes UI requerem ratio de 3:1.', faq5q: 'Como melhorar o contraste?', faq5a: 'Escureca a cor do texto ou clareia o fundo.' },
  nl: { title: 'Kleurcontrast Checker', description: 'Controleer WCAG kleurcontrastverhoudingen.', foreground: 'Voorgrondkleur', background: 'Achtergrondkleur', preview: 'Tekstvoorbeeld', ratio: 'Contrastverhoudingen', normalText: 'Normale Tekst', largeText: 'Grote Tekst', graphicUI: 'Grafisch / UI', pass: 'Geslaagd', fail: 'Mislukt', aaLevel: 'AA Niveau', aaaLevel: 'AAA Niveau', previewText: 'De snelle bruine vos springt over de luie hond', swapColors: 'Kleuren Wisselen', suggestions: 'Suggesties', introTitle: 'WCAG Kleurcontrast Checker', introText: 'Zorg ervoor dat uw website voldoet aan de WCAG 2.1 richtlijnen voor kleurcontrast.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat is WCAG kleurcontrast?', faq1a: 'WCAG definieert minimale contrastverhoudingen tussen tekst en achtergrond.', faq2q: 'AA en AAA niveaus?', faq2a: 'AA vereist 4,5:1 voor normale tekst, 3:1 voor grote tekst.', faq3q: 'Wat is grote tekst?', faq3a: 'Ten minste 18pt (24px) of 14pt vet.', faq4q: 'Contrast voor iconen?', faq4a: 'Ja, UI-componenten vereisen een verhouding van 3:1.', faq5q: 'Hoe contrast verbeteren?', faq5a: 'Maak de voorgrondkleur donkerder of de achtergrond lichter.' },
  pl: { title: 'Sprawdzacz Kontrastu Kolorow', description: 'Sprawdz wspolczynniki kontrastu WCAG.', foreground: 'Kolor Pierwszego Planu', background: 'Kolor Tla', preview: 'Podglad Tekstu', ratio: 'Wspolczynnik Kontrastu', normalText: 'Normalny Tekst', largeText: 'Duzy Tekst', graphicUI: 'Grafika / UI', pass: 'Zaliczone', fail: 'Niezaliczone', aaLevel: 'Poziom AA', aaaLevel: 'Poziom AAA', previewText: 'Szybki braz lis przeskakuje nad leniwym psem', swapColors: 'Zamien Kolory', suggestions: 'Sugestie', introTitle: 'Sprawdzacz Kontrastu WCAG', introText: 'Upewnij sie, ze Twoja witryna spelnia wytyczne WCAG 2.1 dotyczace kontrastu kolorow.', faqTitle: 'FAQ', faq1q: 'Co to kontrast WCAG?', faq1a: 'WCAG definiuje minimalne wspolczynniki kontrastu.', faq2q: 'Poziomy AA i AAA?', faq2a: 'AA wymaga 4,5:1 dla normalnego tekstu, 3:1 dla duzego.', faq3q: 'Co to duzy tekst?', faq3a: 'Co najmniej 18pt (24px) lub 14pt pogrubiony.', faq4q: 'Kontrast dla ikon?', faq4a: 'Tak, komponenty UI wymagaja wspolczynnika 3:1.', faq5q: 'Jak poprawic kontrast?', faq5a: 'Przyciemnij kolor pierwszego planu lub rozjasn tlo.' },
  sv: { title: 'Faergkontrast Kontrollant', description: 'Kontrollera WCAG faergkontrastforhallanden.', foreground: 'Foergrundsfaerg', background: 'Bakgrundsfaerg', preview: 'Textfoerhandsvisning', ratio: 'Kontrastforhallande', normalText: 'Normal Text', largeText: 'Stor Text', graphicUI: 'Grafik / UI', pass: 'Godkand', fail: 'Underkand', aaLevel: 'AA-Niva', aaaLevel: 'AAA-Niva', previewText: 'Den snabba bruna raven hoppar over den lata hunden', swapColors: 'Byt Faerger', suggestions: 'Forslag', introTitle: 'WCAG Faergkontrast Kontrollant', introText: 'Se till att din webbplats foljer WCAG 2.1 riktlinjerna for faergkontrast.', faqTitle: 'Vanliga Fragor', faq1q: 'Vad ar WCAG faergkontrast?', faq1a: 'WCAG definierar minimala kontrastforhallanden.', faq2q: 'AA och AAA niva?', faq2a: 'AA kraver 4,5:1 for normal text, 3:1 for stor text.', faq3q: 'Vad ar stor text?', faq3a: 'Minst 18pt (24px) eller 14pt fet.', faq4q: 'Kontrast for ikoner?', faq4a: 'Ja, UI-komponenter kraver 3:1.', faq5q: 'Hur foerbattra kontrast?', faq5a: 'Gjor foergrundsfaergen morkare eller bakgrunden ljusare.' },
  no: { title: 'Fargekontrast Sjekker', description: 'Sjekk WCAG fargekontrastverdier.', foreground: 'Forgrunnsfargen', background: 'Bakgrunnsfargen', preview: 'Tekstforhandsvisning', ratio: 'Kontrastforhold', normalText: 'Normal Tekst', largeText: 'Stor Tekst', graphicUI: 'Grafikk / UI', pass: 'Bestatt', fail: 'Ikke Bestatt', aaLevel: 'AA-Niva', aaaLevel: 'AAA-Niva', previewText: 'Den raske brune reven hopper over den late hunden', swapColors: 'Bytt Farger', suggestions: 'Forslag', introTitle: 'WCAG Fargekontrast Sjekker', introText: 'Sorg for at nettstedet ditt oppfyller WCAG 2.1 retningslinjene for fargekontrast.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hva er WCAG fargekontrast?', faq1a: 'WCAG definerer minimale kontrastforholdtall.', faq2q: 'AA og AAA niva?', faq2a: 'AA krever 4,5:1 for normal tekst, 3:1 for stor tekst.', faq3q: 'Hva er stor tekst?', faq3a: 'Minst 18pt (24px) eller 14pt fet.', faq4q: 'Kontrast for ikoner?', faq4a: 'Ja, UI-komponenter krever 3:1.', faq5q: 'Hvordan forbedre kontrast?', faq5a: 'Gjor forgrunnsfargen morkere eller bakgrunnen lysere.' },
  zh: {
    title: '颜色对比度检查器', description: '检查 WCAG 颜色对比度，确保无障碍合规性，测试 AA 和 AAA 级别标准。',
    foreground: '前景色', background: '背景色', preview: '预览文字',
    ratio: '对比度', normalText: '正常文本', largeText: '大文本', graphicUI: '图形 / UI',
    pass: '通过', fail: '未通过', aaLevel: 'AA 级', aaaLevel: 'AAA 级',
    previewText: '快速的棕色狐狸跳过懒惰的狗',
    swapColors: '交换颜色', suggestions: '建议',
    introTitle: 'WCAG 颜色对比度检查工具',
    introText: '确保您的网站符合 WCAG 2.1 颜色对比度无障碍指南。AA 级要求正常文本的对比度至少为 4.5:1，大文本为 3:1。AAA 级要求正常文本为 7:1，大文本为 4.5:1。',
    faqTitle: '常见问题',
    faq1q: '什么是 WCAG 颜色对比度？', faq1a: 'WCAG 定义了文本与背景之间的最小对比度比率，以确保视觉障碍用户的可读性。',
    faq2q: 'AA 和 AAA 级别的区别？', faq2a: 'AA 是大多数法规要求的最低标准，正常文本需要 4.5:1。AAA 是最高标准，正常文本需要 7:1。',
    faq3q: '什么是大文本？', faq3a: 'WCAG 定义大文本为至少 18pt（24px）或粗体 14pt（约 18.67px）。',
    faq4q: '图标也需要对比度检查吗？', faq4a: '是的，UI 组件和图标需要与相邻颜色的对比度至少为 3:1。',
    faq5q: '如何改善颜色对比度？', faq5a: '加深前景色或提亮背景色，也可以增大文字大小使用更宽松的大文本标准。',
  },
  ja: {
    title: 'カラーコントラストチェッカー', description: 'WCAG カラーコントラスト比を確認し、アクセシビリティ基準への準拠をテストします。',
    foreground: '前景色', background: '背景色', preview: 'プレビューテキスト',
    ratio: 'コントラスト比', normalText: '通常テキスト', largeText: '大テキスト', graphicUI: 'グラフィック / UI',
    pass: '合格', fail: '不合格', aaLevel: 'AA レベル', aaaLevel: 'AAA レベル',
    previewText: '素早い茶色のキツネが怠け者の犬を飛び越えた',
    swapColors: '色を入れ替える', suggestions: '提案',
    introTitle: 'Web アクセシビリティのための WCAG カラーコントラストチェッカー',
    introText: 'WCAG 2.1 のカラーコントラストに関するアクセシビリティガイドラインに準拠しているか確認してください。',
    faqTitle: 'よくある質問',
    faq1q: 'WCAG カラーコントラストとは？', faq1a: 'WCAG は視覚障害者のためにテキストと背景の最小コントラスト比を定義しています。',
    faq2q: 'AA と AAA レベルの違い？', faq2a: 'AA は通常テキストで 4.5:1、大テキストで 3:1。AAA は通常テキストで 7:1、大テキストで 4.5:1。',
    faq3q: '大テキストとは？', faq3a: '少なくとも 18pt（24px）または太字で 14pt 以上のテキスト。',
    faq4q: 'アイコンのコントラストも重要ですか？', faq4a: 'はい、UI コンポーネントとアイコンは隣接する色との 3:1 のコントラスト比が必要です。',
    faq5q: 'コントラストを改善するには？', faq5a: '前景色を暗くするか背景色を明るくしてください。',
  },
  ko: {
    title: '색상 대비 검사기', description: 'WCAG 색상 대비 비율을 확인하고 접근성 기준 준수 여부를 테스트하세요.',
    foreground: '전경색', background: '배경색', preview: '미리보기 텍스트',
    ratio: '대비 비율', normalText: '일반 텍스트', largeText: '큰 텍스트', graphicUI: '그래픽 / UI',
    pass: '통과', fail: '실패', aaLevel: 'AA 레벨', aaaLevel: 'AAA 레벨',
    previewText: '빠른 갈색 여우가 게으른 개를 뛰어넘습니다',
    swapColors: '색상 교체', suggestions: '제안',
    introTitle: '웹 접근성을 위한 WCAG 색상 대비 검사기',
    introText: 'WCAG 2.1 색상 대비 접근성 지침을 준수하는지 확인하세요. AA 레벨은 일반 텍스트에 최소 4.5:1, 큰 텍스트에 3:1이 필요합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'WCAG 색상 대비란 무엇인가요?', faq1a: 'WCAG는 시각 장애가 있는 사용자의 가독성을 보장하기 위해 텍스트와 배경 간의 최소 대비 비율을 정의합니다.',
    faq2q: 'AA와 AAA 레벨의 차이는?', faq2a: 'AA는 일반 텍스트에 4.5:1, 큰 텍스트에 3:1. AAA는 일반 텍스트에 7:1, 큰 텍스트에 4.5:1이 필요합니다.',
    faq3q: '큰 텍스트는 무엇인가요?', faq3a: '최소 18pt(24px) 또는 굵은 14pt 이상의 텍스트입니다.',
    faq4q: '아이콘도 대비가 중요한가요?', faq4a: '네, UI 구성 요소와 아이콘은 인접한 색상과 3:1의 대비 비율이 필요합니다.',
    faq5q: '대비를 개선하는 방법은?', faq5a: '전경색을 어둡게 하거나 배경색을 밝게 하세요.',
  },
  id: { title: 'Pemeriksa Kontras Warna', description: 'Periksa rasio kontras warna WCAG.', foreground: 'Warna Latar Depan', background: 'Warna Latar Belakang', preview: 'Pratinjau Teks', ratio: 'Rasio Kontras', normalText: 'Teks Normal', largeText: 'Teks Besar', graphicUI: 'Grafis / UI', pass: 'Lulus', fail: 'Gagal', aaLevel: 'Level AA', aaaLevel: 'Level AAA', previewText: 'Rubah coklat cepat melompat di atas anjing malas', swapColors: 'Tukar Warna', suggestions: 'Saran', introTitle: 'Pemeriksa Kontras Warna WCAG', introText: 'Pastikan situs Anda memenuhi panduan aksesibilitas WCAG 2.1 untuk kontras warna.', faqTitle: 'FAQ', faq1q: 'Apa itu kontras warna WCAG?', faq1a: 'WCAG mendefinisikan rasio kontras minimum antara teks dan latar belakang.', faq2q: 'Level AA dan AAA?', faq2a: 'AA membutuhkan 4,5:1 untuk teks normal, 3:1 untuk teks besar.', faq3q: 'Apa itu teks besar?', faq3a: 'Setidaknya 18pt (24px) atau 14pt tebal.', faq4q: 'Kontras untuk ikon?', faq4a: 'Ya, komponen UI membutuhkan rasio 3:1.', faq5q: 'Cara meningkatkan kontras?', faq5a: 'Gelапkan warna latar depan atau terangkan latar belakang.' },
  th: { title: 'เครื่องตรวจสอบความคมชัดของสี', description: 'ตรวจสอบอัตราส่วนความคมชัด WCAG', foreground: 'สีพื้นหน้า', background: 'สีพื้นหลัง', preview: 'ตัวอย่างข้อความ', ratio: 'อัตราส่วนความคมชัด', normalText: 'ข้อความปกติ', largeText: 'ข้อความใหญ่', graphicUI: 'กราฟิก / UI', pass: 'ผ่าน', fail: 'ไม่ผ่าน', aaLevel: 'ระดับ AA', aaaLevel: 'ระดับ AAA', previewText: 'สุนัขจิ้งจอกสีน้ำตาลรวดเร็วกระโดดข้ามสุนัขขี้เกียจ', swapColors: 'สลับสี', suggestions: 'ข้อเสนอแนะ', introTitle: 'เครื่องตรวจสอบความคมชัดสี WCAG', introText: 'ตรวจสอบว่าเว็บไซต์ของคุณเป็นไปตามแนวทาง WCAG 2.1 สำหรับความคมชัดของสี', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ความคมชัดสี WCAG คืออะไร?', faq1a: 'WCAG กำหนดอัตราส่วนความคมชัดขั้นต่ำระหว่างข้อความและพื้นหลัง', faq2q: 'ระดับ AA และ AAA?', faq2a: 'AA ต้องการ 4.5:1 สำหรับข้อความปกติ 3:1 สำหรับข้อความใหญ่', faq3q: 'ข้อความใหญ่คืออะไร?', faq3a: 'อย่างน้อย 18pt (24px) หรือ 14pt ตัวหนา', faq4q: 'ความคมชัดสำหรับไอคอน?', faq4a: 'ใช่ ส่วนประกอบ UI ต้องการ 3:1', faq5q: 'วิธีปรับปรุงความคมชัด?', faq5a: 'ทำให้สีพื้นหน้าเข้มขึ้นหรือพื้นหลังสว่างขึ้น' },
};

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(fg: string, bg: string): number | null {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  if (!fgRgb || !bgRgb) return null;
  const l1 = relativeLuminance(...fgRgb);
  const l2 = relativeLuminance(...bgRgb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ColorContrastChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [fg, setFg] = useState('#1e293b');
  const [bg, setBg] = useState('#f8fafc');

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

  const passAA = ratio !== null && ratio >= 4.5;
  const passAALarge = ratio !== null && ratio >= 3;
  const passAAA = ratio !== null && ratio >= 7;
  const passAAALarge = ratio !== null && ratio >= 4.5;

  const badgeStyle = (pass: boolean) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
    background: pass ? 'rgba(34,197,94,0.15)' : 'rgba(244,63,94,0.15)',
    color: pass ? '#22c55e' : '#f43f5e',
    border: `1px solid ${pass ? '#22c55e40' : '#f43f5e40'}`,
  });

  const swap = () => { const tmp = fg; setFg(bg); setBg(tmp); };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="color-contrast-checker">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Color Pickers */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.foreground}</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={fg} onChange={e => setFg(e.target.value)} style={{ width: 48, height: 40, border: '1px solid var(--border-color)', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
            <input type="text" value={fg} onChange={e => setFg(e.target.value)} style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, padding: '8px 10px' }} placeholder="#000000" />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.background}</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{ width: 48, height: 40, border: '1px solid var(--border-color)', borderRadius: 6, cursor: 'pointer', padding: 2 }} />
            <input type="text" value={bg} onChange={e => setBg(e.target.value)} style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, padding: '8px 10px' }} placeholder="#ffffff" />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <button onClick={swap} className="btn btn-secondary">{t.swapColors}</button>
      </div>

      {/* Preview */}
      <div style={{ borderRadius: 12, padding: 24, marginBottom: 24, background: bg, border: '1px solid var(--border-color)' }}>
        <p style={{ color: fg, fontSize: 16, fontWeight: 400, marginBottom: 8, margin: 0 }}>{t.previewText}</p>
        <p style={{ color: fg, fontSize: 24, fontWeight: 700, marginTop: 12, margin: 0 }}>{t.previewText}</p>
      </div>

      {/* Ratio */}
      {ratio !== null && (
        <>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--text-primary)' }}>{ratio.toFixed(2)}:1</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.ratio}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: t.normalText, sub: '< 18px', aa: passAA, aaa: passAAA },
              { label: t.largeText, sub: '≥ 18px', aa: passAALarge, aaa: passAAALarge },
              { label: t.graphicUI, sub: 'UI / Icon', aa: passAALarge, aaa: passAALarge },
            ].map(({ label, sub, aa, aaa }) => (
              <div key={label} style={{ background: 'var(--bg-input)', borderRadius: 10, padding: 16, border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>{sub}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ ...badgeStyle(aa) }}>{aa ? '✓' : '✕'} {t.aaLevel}</div>
                  <div style={{ ...badgeStyle(aaa) }}>{aaa ? '✓' : '✕'} {t.aaaLevel}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {ratio === null && (
        <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-secondary)', fontSize: 13 }}>
          Please enter valid hex color codes (e.g., #ffffff)
        </div>
      )}

      {/* Intro */}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
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
