'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Color Palette Generator',
    description: 'Generate harmonious color palettes using color theory. Create complementary, analogous, triadic, and split-complementary schemes.',
    baseColor: 'Base Color',
    harmony: 'Color Harmony',
    complementary: 'Complementary',
    analogous: 'Analogous',
    triadic: 'Triadic',
    splitComp: 'Split-Complementary',
    tetradic: 'Tetradic',
    monochromatic: 'Monochromatic',
    palette: 'Generated Palette',
    copyAll: 'Copy All',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    randomize: 'Random Base',
    shades: 'Shades & Tints',
    shade: 'Shade',
    tint: 'Tint',
    introTitle: 'Free Online Color Palette Generator',
    introText: 'Create harmonious color palettes based on color theory principles. Generate complementary, analogous, triadic, split-complementary, tetradic, and monochromatic color schemes from any base color. Perfect for web design, UI/UX, branding, and graphic design projects. All processing happens in your browser.',
    tipTitle: 'Color Harmony Tips',
    tip1: 'Complementary colors create high contrast and visual tension',
    tip2: 'Analogous colors provide a harmonious, unified feel',
    tip3: 'Triadic schemes offer vibrant contrast while maintaining balance',
    tip4: 'Monochromatic palettes are clean and elegant for minimalist designs',
    tip5: 'Split-complementary offers contrast without the tension of complementary',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is color harmony?',
    faq1a: 'Color harmony refers to the arrangement of colors that is aesthetically pleasing. It uses the color wheel to identify relationships between colors, such as complementary (opposite), analogous (adjacent), and triadic (evenly spaced) combinations.',
    faq2q: 'How do I choose the right color scheme?',
    faq2a: 'Choose complementary for high contrast designs, analogous for a calm unified look, triadic for vibrant balanced designs, monochromatic for elegant minimalism, and split-complementary for nuanced contrast.',
    faq3q: 'Can I use these palettes in my projects?',
    faq3a: 'Yes, all generated palettes are free to use in any project including commercial work. Simply copy the color codes in HEX, RGB, or HSL format.',
    faq4q: 'What color formats are supported?',
    faq4a: 'The generator displays colors in HEX, RGB, and HSL formats. You can copy any format with one click for use in CSS, design tools, or any application.',
    faq5q: 'Is this tool free?',
    faq5a: 'Yes, completely free with no limitations. All color calculations happen client-side in your browser with no server required.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '调色板生成器',
    description: '使用色彩理论生成和谐配色方案。',
    baseColor: '基础颜色',
    harmony: '配色规则',
    complementary: '互补色',
    analogous: '类似色',
    triadic: '三色组',
    splitComp: '分裂互补',
    tetradic: '四色组',
    monochromatic: '单色系',
    palette: '生成的调色板',
    copyAll: '复制全部',
    hex: 'HEX',
    rgb: 'RGB',
    hsl: 'HSL',
    randomize: '随机颜色',
    shades: '深浅色调',
    shade: '暗色',
    tint: '亮色',
    introTitle: '免费在线调色板生成器',
    introText: '基于色彩理论原理创建和谐的调色板。从任意基础颜色生成互补色、类似色、三色组等配色方案。适用于网页设计、UI/UX 和品牌设计项目。',
    tipTitle: '配色技巧',
    tip1: '互补色创建高对比度和视觉张力', tip2: '类似色提供和谐统一的感觉', tip3: '三色组在保持平衡的同时提供鲜明对比', tip4: '单色系适合简约优雅的设计', tip5: '分裂互补提供对比但不如互补色那么强烈',
    faqTitle: '常见问题',
    faq1q: '什么是色彩和谐？', faq1a: '色彩和谐是指视觉上令人愉悦的颜色排列。它使用色轮来识别颜色之间的关系，如互补色、类似色和三色组合。',
    faq2q: '如何选择合适的配色方案？', faq2a: '高对比设计选互补色，柔和统一选类似色，活力平衡选三色组，优雅简约选单色系。',
    faq3q: '可以在项目中使用这些调色板吗？', faq3a: '可以，所有生成的调色板可自由用于任何项目，包括商业用途。',
    faq4q: '支持哪些颜色格式？', faq4a: '生成器显示 HEX、RGB 和 HSL 格式，可一键复制。',
    faq5q: '这个工具免费吗？', faq5a: '完全免费，没有限制。所有颜色计算都在浏览器端完成。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur de Palettes',
    description: 'Generez des palettes de couleurs harmonieuses avec la theorie des couleurs.',
    baseColor: 'Couleur de base', harmony: 'Harmonie', complementary: 'Complementaire', analogous: 'Analogue', triadic: 'Triadique', splitComp: 'Complementaire divisee', tetradic: 'Tetradique', monochromatic: 'Monochromatique',
    palette: 'Palette generee', copyAll: 'Copier tout', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Aleatoire', shades: 'Nuances et teintes', shade: 'Nuance', tint: 'Teinte',
    introTitle: 'Generateur de palettes gratuit', introText: 'Creez des palettes harmonieuses basees sur la theorie des couleurs. Parfait pour le design web et la conception graphique.',
    tipTitle: 'Conseils', tip1: 'Les complementaires creent un fort contraste', tip2: 'Les analogues donnent une sensation harmonieuse', tip3: 'Les triadiques offrent un contraste vibrant', tip4: 'Le monochromatique est elegant et minimaliste', tip5: 'Le complementaire divise offre du contraste sans tension',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que l\'harmonie des couleurs?', faq1a: 'L\'harmonie des couleurs est l\'arrangement esthetique des couleurs utilisant la roue chromatique.',
    faq2q: 'Comment choisir le bon schema?', faq2a: 'Complementaire pour le contraste, analogue pour l\'unite, triadique pour l\'equilibre vibrant.',
    faq3q: 'Utilisation commerciale possible?', faq3a: 'Oui, toutes les palettes sont libres d\'utilisation.',
    faq4q: 'Quels formats?', faq4a: 'HEX, RGB et HSL. Copiez en un clic.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, entierement gratuit.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Farbpaletten-Generator',
    description: 'Harmonische Farbpaletten basierend auf Farbtheorie erstellen.',
    baseColor: 'Grundfarbe', harmony: 'Farbharmonie', complementary: 'Komplementaer', analogous: 'Analog', triadic: 'Triadisch', splitComp: 'Gespalten-Komplementaer', tetradic: 'Tetradisch', monochromatic: 'Monochromatisch',
    palette: 'Generierte Palette', copyAll: 'Alle kopieren', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Zufaellig', shades: 'Schattierungen & Toene', shade: 'Schatten', tint: 'Ton',
    introTitle: 'Kostenloser Farbpaletten-Generator', introText: 'Erstellen Sie harmonische Farbpaletten basierend auf Farbtheorie. Perfekt fuer Webdesign und Grafikdesign.',
    tipTitle: 'Tipps', tip1: 'Komplementaerfarben erzeugen starken Kontrast', tip2: 'Analoge Farben wirken harmonisch', tip3: 'Triadische Schemata bieten lebhaften Kontrast', tip4: 'Monochromatisch ist elegant und minimalistisch', tip5: 'Gespalten-Komplementaer bietet Kontrast ohne Spannung',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Farbharmonie?', faq1a: 'Farbharmonie ist die aesthetisch ansprechende Anordnung von Farben mit dem Farbkreis.',
    faq2q: 'Wie waehle ich das richtige Schema?', faq2a: 'Komplementaer fuer Kontrast, Analog fuer Einheit, Triadisch fuer lebhafte Balance.',
    faq3q: 'Kommerzielle Nutzung?', faq3a: 'Ja, alle Paletten sind frei nutzbar.',
    faq4q: 'Welche Formate?', faq4a: 'HEX, RGB und HSL. Ein Klick zum Kopieren.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Paletas',
    description: 'Genere paletas de colores armoniosas con teoria del color.',
    baseColor: 'Color base', harmony: 'Armonia', complementary: 'Complementario', analogous: 'Analogo', triadic: 'Triadico', splitComp: 'Complementario dividido', tetradic: 'Tetradico', monochromatic: 'Monocromatico',
    palette: 'Paleta generada', copyAll: 'Copiar todo', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Aleatorio', shades: 'Tonos y matices', shade: 'Sombra', tint: 'Tinte',
    introTitle: 'Generador de paletas gratuito', introText: 'Cree paletas armoniosas basadas en teoria del color. Perfecto para diseno web y grafico.',
    tipTitle: 'Consejos', tip1: 'Los complementarios crean alto contraste', tip2: 'Los analogos dan sensacion armoniosa', tip3: 'Los triadicos ofrecen contraste vibrante', tip4: 'El monocromatico es elegante y minimalista', tip5: 'El complementario dividido ofrece contraste sin tension',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la armonia del color?', faq1a: 'Es la disposicion estetica de colores usando la rueda cromatica.',
    faq2q: 'Como elegir el esquema correcto?', faq2a: 'Complementario para contraste, analogo para unidad, triadico para equilibrio vibrante.',
    faq3q: 'Uso comercial posible?', faq3a: 'Si, todas las paletas son de uso libre.',
    faq4q: 'Que formatos?', faq4a: 'HEX, RGB y HSL. Copie con un clic.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Generatore Palette Colori',
    description: 'Genera palette di colori armoniose con la teoria dei colori.',
    baseColor: 'Colore base', harmony: 'Armonia', complementary: 'Complementare', analogous: 'Analogo', triadic: 'Triadico', splitComp: 'Complementare diviso', tetradic: 'Tetradico', monochromatic: 'Monocromatico',
    palette: 'Palette generata', copyAll: 'Copia tutto', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Casuale', shades: 'Ombre e tinte', shade: 'Ombra', tint: 'Tinta',
    introTitle: 'Generatore di palette gratuito', introText: 'Crea palette armoniose basate sulla teoria dei colori. Perfetto per web design e grafica.',
    tipTitle: 'Suggerimenti', tip1: 'I complementari creano alto contrasto', tip2: 'Gli analoghi danno sensazione armoniosa', tip3: 'I triadici offrono contrasto vibrante', tip4: 'Il monocromatico e elegante e minimalista', tip5: 'Il complementare diviso offre contrasto senza tensione',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e l\'armonia dei colori?', faq1a: 'E la disposizione estetica dei colori usando la ruota cromatica.',
    faq2q: 'Come scegliere lo schema giusto?', faq2a: 'Complementare per contrasto, analogo per unita, triadico per equilibrio vibrante.',
    faq3q: 'Uso commerciale possibile?', faq3a: 'Si, tutte le palette sono di libero utilizzo.',
    faq4q: 'Quali formati?', faq4a: 'HEX, RGB e HSL. Copia con un clic.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Gerador de Paletas de Cores',
    description: 'Gere paletas de cores harmoniosas com teoria das cores.',
    baseColor: 'Cor base', harmony: 'Harmonia', complementary: 'Complementar', analogous: 'Analogo', triadic: 'Triadico', splitComp: 'Complementar dividido', tetradic: 'Tetradico', monochromatic: 'Monocromatico',
    palette: 'Paleta gerada', copyAll: 'Copiar tudo', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Aleatorio', shades: 'Sombras e tons', shade: 'Sombra', tint: 'Tom',
    introTitle: 'Gerador de paletas gratuito', introText: 'Crie paletas harmoniosas baseadas na teoria das cores. Perfeito para web design e design grafico.',
    tipTitle: 'Dicas', tip1: 'Complementares criam alto contraste', tip2: 'Analogos dao sensacao harmoniosa', tip3: 'Triadicos oferecem contraste vibrante', tip4: 'Monocromatico e elegante e minimalista', tip5: 'Complementar dividido oferece contraste sem tensao',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e harmonia de cores?', faq1a: 'E a disposicao estetica de cores usando a roda cromatica.',
    faq2q: 'Como escolher o esquema certo?', faq2a: 'Complementar para contraste, analogo para unidade, triadico para equilibrio vibrante.',
    faq3q: 'Uso comercial possivel?', faq3a: 'Sim, todas as paletas sao de uso livre.',
    faq4q: 'Quais formatos?', faq4a: 'HEX, RGB e HSL. Copie com um clique.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Kleurenpalet Generator',
    description: 'Genereer harmonieuze kleurenpaletten met kleurtheorie.',
    baseColor: 'Basiskleur', harmony: 'Kleurharmonie', complementary: 'Complementair', analogous: 'Analoog', triadic: 'Triadisch', splitComp: 'Gesplitst complementair', tetradic: 'Tetradisch', monochromatic: 'Monochromatisch',
    palette: 'Gegenereerd palet', copyAll: 'Alles kopieren', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Willekeurig', shades: 'Schaduwen & tinten', shade: 'Schaduw', tint: 'Tint',
    introTitle: 'Gratis kleurenpalet generator', introText: 'Maak harmonieuze kleurenpaletten op basis van kleurtheorie. Perfect voor webdesign en grafisch ontwerp.',
    tipTitle: 'Tips', tip1: 'Complementaire kleuren creeren hoog contrast', tip2: 'Analoge kleuren geven een harmonieus gevoel', tip3: 'Triadische schema\'s bieden levendig contrast', tip4: 'Monochromatisch is elegant en minimalistisch', tip5: 'Gesplitst complementair biedt contrast zonder spanning',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is kleurharmonie?', faq1a: 'Kleurharmonie is de esthetische rangschikking van kleuren met het kleurenwiel.',
    faq2q: 'Hoe kies ik het juiste schema?', faq2a: 'Complementair voor contrast, analoog voor eenheid, triadisch voor levendige balans.',
    faq3q: 'Commercieel gebruik mogelijk?', faq3a: 'Ja, alle paletten zijn vrij te gebruiken.',
    faq4q: 'Welke formaten?', faq4a: 'HEX, RGB en HSL. Kopieer met een klik.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Generator Palet Kolorow',
    description: 'Generuj harmonijne palety kolorow z teoria kolorow.',
    baseColor: 'Kolor bazowy', harmony: 'Harmonia', complementary: 'Komplementarny', analogous: 'Analogiczny', triadic: 'Triadyczny', splitComp: 'Podzielony komplementarny', tetradic: 'Tetradyczny', monochromatic: 'Monochromatyczny',
    palette: 'Wygenerowana paleta', copyAll: 'Kopiuj wszystko', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Losowy', shades: 'Odcienie i tony', shade: 'Cien', tint: 'Ton',
    introTitle: 'Darmowy generator palet', introText: 'Twórz harmonijne palety kolorow oparte na teorii kolorow. Idealny do projektowania stron i grafiki.',
    tipTitle: 'Wskazowki', tip1: 'Komplementarne tworza silny kontrast', tip2: 'Analogiczne daja harmonijne wrazenie', tip3: 'Triadyczne oferuja zywy kontrast', tip4: 'Monochromatyczne sa eleganckie i minimalistyczne', tip5: 'Podzielony komplementarny oferuje kontrast bez napiecia',
    faqTitle: 'FAQ',
    faq1q: 'Czym jest harmonia kolorow?', faq1a: 'Harmonia kolorow to estetyczne ukladanie kolorow z uzyciem kola barw.',
    faq2q: 'Jak wybrac odpowiedni schemat?', faq2a: 'Komplementarny na kontrast, analogiczny na jednosc, triadyczny na zywiolowosc.',
    faq3q: 'Mozna uzywac komercyjnie?', faq3a: 'Tak, wszystkie palety sa wolne do uzycia.',
    faq4q: 'Jakie formaty?', faq4a: 'HEX, RGB i HSL. Kopiuj jednym kliknieciem.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Fargpalettgenerator',
    description: 'Generera harmoniska faergpaletter med faergteori.',
    baseColor: 'Grundfaerg', harmony: 'Faergharmoni', complementary: 'Komplementaer', analogous: 'Analog', triadic: 'Triadisk', splitComp: 'Delad komplementaer', tetradic: 'Tetradisk', monochromatic: 'Monokromatisk',
    palette: 'Genererad palett', copyAll: 'Kopiera allt', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Slumpa', shades: 'Nyanser & toningar', shade: 'Nyans', tint: 'Toning',
    introTitle: 'Gratis faergpalettgenerator', introText: 'Skapa harmoniska faergpaletter baserade paa faergteori. Perfekt foer webbdesign och grafisk design.',
    tipTitle: 'Tips', tip1: 'Komplementaera faerger skapar stark kontrast', tip2: 'Analoga faerger ger harmoniskt intryck', tip3: 'Triadiska scheman erbjuder livfull kontrast', tip4: 'Monokromatiskt aer elegant och minimalistiskt', tip5: 'Delad komplementaer erbjuder kontrast utan spaenning',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer faergharmoni?', faq1a: 'Faergharmoni aer den estetiska arrangeringen av faerger med faerghjulet.',
    faq2q: 'Hur vaeljer jag raett schema?', faq2a: 'Komplementaer foer kontrast, analog foer enhet, triadisk foer livfull balans.',
    faq3q: 'Kommersiell anvaendning?', faq3a: 'Ja, alla paletter aer fria att anvaenda.',
    faq4q: 'Vilka format?', faq4a: 'HEX, RGB och HSL. Kopiera med ett klick.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Fargepalettgenerator',
    description: 'Generer harmoniske fargepaletter med fargeteori.',
    baseColor: 'Grunnfarge', harmony: 'Fargeharmoni', complementary: 'Komplementaer', analogous: 'Analog', triadic: 'Triadisk', splitComp: 'Delt komplementaer', tetradic: 'Tetradisk', monochromatic: 'Monokromatisk',
    palette: 'Generert palett', copyAll: 'Kopier alt', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Tilfeldig', shades: 'Nyanser og toner', shade: 'Nyanse', tint: 'Tone',
    introTitle: 'Gratis fargepalettgenerator', introText: 'Lag harmoniske fargepaletter basert paa fargeteori. Perfekt for webdesign og grafisk design.',
    tipTitle: 'Tips', tip1: 'Komplementaere farger skaper sterk kontrast', tip2: 'Analoge farger gir harmonisk foelelse', tip3: 'Triadiske skjemaer gir livlig kontrast', tip4: 'Monokromatisk er elegant og minimalistisk', tip5: 'Delt komplementaer gir kontrast uten spenning',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er fargeharmoni?', faq1a: 'Fargeharmoni er den estetiske arrangereringen av farger med fargehjulet.',
    faq2q: 'Hvordan velge riktig skjema?', faq2a: 'Komplementaer for kontrast, analog for enhet, triadisk for livlig balanse.',
    faq3q: 'Kommersiell bruk?', faq3a: 'Ja, alle paletter er frie til bruk.',
    faq4q: 'Hvilke formater?', faq4a: 'HEX, RGB og HSL. Kopier med ett klikk.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'カラーパレット生成ツール',
    description: '色彩理論に基づいて調和的なカラーパレットを生成。',
    baseColor: '基本色', harmony: '配色規則', complementary: '補色', analogous: '類似色', triadic: 'トライアド', splitComp: '分裂補色', tetradic: 'テトラード', monochromatic: 'モノクロマティック',
    palette: '生成されたパレット', copyAll: '全てコピー', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'ランダム', shades: 'シェード＆ティント', shade: 'シェード', tint: 'ティント',
    introTitle: '無料カラーパレット生成ツール', introText: '色彩理論に基づいて調和的なカラーパレットを作成。ウェブデザインやグラフィックデザインに最適。',
    tipTitle: 'ヒント', tip1: '補色は高コントラストを生み出す', tip2: '類似色は調和した印象を与える', tip3: 'トライアドは鮮やかなコントラストを提供', tip4: 'モノクロマティックはエレガントでミニマル', tip5: '分裂補色は緊張感なくコントラストを提供',
    faqTitle: 'よくある質問',
    faq1q: '色の調和とは？', faq1a: '色の調和とは、色相環を使って美的に心地よい色の配置を行うことです。',
    faq2q: '適切な配色をどう選ぶ？', faq2a: 'コントラストには補色、統一感には類似色、鮮やかなバランスにはトライアド。',
    faq3q: '商用利用できますか？', faq3a: 'はい、全てのパレットは自由に使用できます。',
    faq4q: 'どのフォーマット？', faq4a: 'HEX、RGB、HSL。ワンクリックでコピー。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '색상 팔레트 생성기',
    description: '색상 이론을 사용하여 조화로운 색상 팔레트를 생성합니다.',
    baseColor: '기본 색상', harmony: '색상 조화', complementary: '보색', analogous: '유사색', triadic: '삼색', splitComp: '분할 보색', tetradic: '사색', monochromatic: '단색',
    palette: '생성된 팔레트', copyAll: '모두 복사', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: '랜덤', shades: '셰이드 & 틴트', shade: '셰이드', tint: '틴트',
    introTitle: '무료 색상 팔레트 생성기', introText: '색상 이론에 기반한 조화로운 색상 팔레트를 만드세요. 웹 디자인과 그래픽 디자인에 적합합니다.',
    tipTitle: '팁', tip1: '보색은 높은 대비를 만듭니다', tip2: '유사색은 조화로운 느낌을 줍니다', tip3: '삼색은 생동감 있는 대비를 제공합니다', tip4: '단색은 우아하고 미니멀합니다', tip5: '분할 보색은 긴장감 없는 대비를 제공합니다',
    faqTitle: '자주 묻는 질문',
    faq1q: '색상 조화란?', faq1a: '색상 조화는 색상환을 사용하여 미적으로 만족스러운 색상 배치입니다.',
    faq2q: '적절한 배색을 어떻게 선택하나요?', faq2a: '대비에는 보색, 통일감에는 유사색, 생동감에는 삼색.',
    faq3q: '상업적으로 사용할 수 있나요?', faq3a: '네, 모든 팔레트를 자유롭게 사용할 수 있습니다.',
    faq4q: '어떤 포맷을 지원하나요?', faq4a: 'HEX, RGB, HSL. 원클릭 복사.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Generator Palet Warna',
    description: 'Hasilkan palet warna harmonis menggunakan teori warna.',
    baseColor: 'Warna dasar', harmony: 'Harmoni warna', complementary: 'Komplementer', analogous: 'Analog', triadic: 'Triadik', splitComp: 'Split-komplementer', tetradic: 'Tetradik', monochromatic: 'Monokromatik',
    palette: 'Palet yang dihasilkan', copyAll: 'Salin semua', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'Acak', shades: 'Bayangan & warna', shade: 'Bayangan', tint: 'Warna',
    introTitle: 'Generator palet warna gratis', introText: 'Buat palet warna harmonis berdasarkan teori warna. Sempurna untuk desain web dan grafis.',
    tipTitle: 'Tips', tip1: 'Komplementer menciptakan kontras tinggi', tip2: 'Analog memberikan kesan harmonis', tip3: 'Triadik menawarkan kontras hidup', tip4: 'Monokromatik elegan dan minimalis', tip5: 'Split-komplementer menawarkan kontras tanpa ketegangan',
    faqTitle: 'FAQ',
    faq1q: 'Apa itu harmoni warna?', faq1a: 'Harmoni warna adalah pengaturan warna yang estetis menggunakan roda warna.',
    faq2q: 'Bagaimana memilih skema yang tepat?', faq2a: 'Komplementer untuk kontras, analog untuk kesatuan, triadik untuk keseimbangan.',
    faq3q: 'Bisa digunakan komersial?', faq3a: 'Ya, semua palet bebas digunakan.',
    faq4q: 'Format apa saja?', faq4a: 'HEX, RGB dan HSL. Salin dengan satu klik.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือสร้างพาเลทสี',
    description: 'สร้างพาเลทสีที่กลมกลืนโดยใช้ทฤษฎีสี',
    baseColor: 'สีพื้นฐาน', harmony: 'ความกลมกลืนของสี', complementary: 'สีคู่ตรงข้าม', analogous: 'สีใกล้เคียง', triadic: 'สีสามเส้า', splitComp: 'สีคู่ตรงข้ามแยก', tetradic: 'สีสี่เส้า', monochromatic: 'สีเดียว',
    palette: 'พาเลทที่สร้าง', copyAll: 'คัดลอกทั้งหมด', hex: 'HEX', rgb: 'RGB', hsl: 'HSL', randomize: 'สุ่ม', shades: 'เฉดสีและโทนสี', shade: 'เฉดสี', tint: 'โทนสี',
    introTitle: 'เครื่องมือสร้างพาเลทสีฟรี', introText: 'สร้างพาเลทสีที่กลมกลืนตามหลักทฤษฎีสี เหมาะสำหรับงานออกแบบเว็บและกราฟิก',
    tipTitle: 'เคล็ดลับ', tip1: 'สีคู่ตรงข้ามสร้างคอนทราสต์สูง', tip2: 'สีใกล้เคียงให้ความรู้สึกกลมกลืน', tip3: 'สีสามเส้าให้คอนทราสต์ที่มีชีวิตชีวา', tip4: 'สีเดียวหรูหราและเรียบง่าย', tip5: 'สีคู่ตรงข้ามแยกให้คอนทราสต์โดยไม่ตึงเครียด',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ความกลมกลืนของสีคืออะไร?', faq1a: 'ความกลมกลืนของสีคือการจัดเรียงสีที่สวยงามโดยใช้วงล้อสี',
    faq2q: 'เลือกรูปแบบที่ถูกต้องอย่างไร?', faq2a: 'คู่ตรงข้ามสำหรับคอนทราสต์ ใกล้เคียงสำหรับความเป็นหนึ่ง สามเส้าสำหรับความสมดุล',
    faq3q: 'ใช้เชิงพาณิชย์ได้ไหม?', faq3a: 'ได้ พาเลททั้งหมดใช้ได้อย่างอิสระ',
    faq4q: 'รองรับรูปแบบอะไรบ้าง?', faq4a: 'HEX, RGB และ HSL คัดลอกได้ด้วยคลิกเดียว',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

type Harmony = 'complementary' | 'analogous' | 'triadic' | 'splitComp' | 'tetradic' | 'monochromatic';

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const s1 = s / 100, l1 = l / 100;
  const c = (1 - Math.abs(2 * l1 - 1)) * s1;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l1 - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function generatePalette(hex: string, harmony: Harmony): string[] {
  const [h, s, l] = hexToHsl(hex);
  switch (harmony) {
    case 'complementary': return [hex, hslToHex((h + 180) % 360, s, l)];
    case 'analogous': return [hslToHex((h + 330) % 360, s, l), hex, hslToHex((h + 30) % 360, s, l), hslToHex((h + 60) % 360, s, l)];
    case 'triadic': return [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case 'splitComp': return [hex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    case 'tetradic': return [hex, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    case 'monochromatic': return [hslToHex(h, s, Math.max(l - 30, 5)), hslToHex(h, s, Math.max(l - 15, 10)), hex, hslToHex(h, s, Math.min(l + 15, 90)), hslToHex(h, s, Math.min(l + 30, 95))];
    default: return [hex];
  }
}

function generateShades(hex: string): { shades: string[]; tints: string[] } {
  const [h, s, l] = hexToHsl(hex);
  const shades = [1, 2, 3, 4].map(i => hslToHex(h, s, Math.max(l - i * 12, 3)));
  const tints = [1, 2, 3, 4].map(i => hslToHex(h, s, Math.min(l + i * 12, 97)));
  return { shades, tints };
}

function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? '#000000' : '#ffffff';
}

const HARMONIES: Harmony[] = ['complementary', 'analogous', 'triadic', 'splitComp', 'tetradic', 'monochromatic'];

export default function ColorPaletteGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [harmony, setHarmony] = useState<Harmony>('analogous');
  const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');

  const palette = useMemo(() => generatePalette(baseColor, harmony), [baseColor, harmony]);
  const { shades, tints } = useMemo(() => generateShades(baseColor), [baseColor]);

  const formatColor = useCallback((hex: string) => {
    if (format === 'rgb') return hexToRgb(hex);
    if (format === 'hsl') { const [h, s, l] = hexToHsl(hex); return `hsl(${h}, ${s}%, ${l}%)`; }
    return hex;
  }, [format]);

  const allColors = palette.map(c => formatColor(c)).join('\n');
  const randomize = () => setBaseColor('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));

  const harmonyLabel = (h: Harmony) => t[h] || h;

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="color-palette-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Base color + random */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.baseColor}</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} style={{ width: 48, height: 40, border: 'none', cursor: 'pointer', borderRadius: 6 }} />
            <input type="text" value={baseColor} onChange={e => /^#[0-9a-fA-F]{6}$/.test(e.target.value) && setBaseColor(e.target.value)} style={{ width: 100, padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'monospace' }} />
          </div>
        </div>
        <button onClick={randomize} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>{t.randomize}</button>
      </div>

      {/* Harmony selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.harmony}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {HARMONIES.map(h => (
            <button key={h} onClick={() => setHarmony(h)}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                border: h === harmony ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: h === harmony ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)',
                color: 'var(--text-primary)', fontWeight: h === harmony ? 700 : 400,
              }}>
              {harmonyLabel(h)}
            </button>
          ))}
        </div>
      </div>

      {/* Format toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['hex', 'rgb', 'hsl'] as const).map(f => (
          <button key={f} onClick={() => setFormat(f)}
            style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', textTransform: 'uppercase',
              border: f === format ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
              background: f === format ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)',
              color: 'var(--text-primary)', fontWeight: f === format ? 700 : 400,
            }}>
            {t[f]}
          </button>
        ))}
      </div>

      {/* Palette output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.palette}</label>
          <CopyButton text={allColors} label={t.copyAll} />
        </div>
        <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          {palette.map((color, i) => (
            <div key={i} style={{ flex: 1, minHeight: 120, background: color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 10, cursor: 'pointer', position: 'relative' }}
              onClick={() => navigator.clipboard.writeText(formatColor(color))}>
              <span style={{ fontSize: 11, fontWeight: 600, color: contrastText(color), fontFamily: 'monospace', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{formatColor(color)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shades & Tints */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.shades}</label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.shade}</div>
            <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              {shades.map((c, i) => (
                <div key={i} style={{ flex: 1, height: 48, background: c, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 4 }}
                  onClick={() => navigator.clipboard.writeText(c)}>
                  <span style={{ fontSize: 8, color: contrastText(c), fontFamily: 'monospace' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.tint}</div>
            <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              {tints.map((c, i) => (
                <div key={i} style={{ flex: 1, height: 48, background: c, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 4 }}
                  onClick={() => navigator.clipboard.writeText(c)}>
                  <span style={{ fontSize: 8, color: contrastText(c), fontFamily: 'monospace' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Variables */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Variables</label>
          <CopyButton text={palette.map((c, i) => `--color-${i + 1}: ${formatColor(c)};`).join('\n')} />
        </div>
        <pre style={{ background: '#0a0a0a', color: '#22c55e', padding: 16, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', border: '1px solid var(--border-color)', margin: 0 }}>
          {palette.map((c, i) => `--color-${i + 1}: ${formatColor(c)};`).join('\n')}
        </pre>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' },
            { href: `/${lang}/tools/color-picker-online`, label: 'Color Picker' },
            { href: `/${lang}/tools/css-animation-generator`, label: 'CSS Animation Generator' },
            { href: `/${lang}/tools/tailwind-color`, label: 'Tailwind Color Finder' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
