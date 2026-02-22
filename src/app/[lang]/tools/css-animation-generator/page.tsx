'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Animation Generator',
    description: 'Create CSS keyframe animations visually with live preview, timing controls, and code export.',
    animName: 'Animation Name',
    duration: 'Duration (s)',
    timing: 'Timing Function',
    delay: 'Delay (s)',
    iterations: 'Iterations',
    direction: 'Direction',
    fillMode: 'Fill Mode',
    preview: 'Live Preview',
    cssOutput: 'CSS Output',
    presets: 'Animation Presets',
    bounce: 'Bounce',
    fadeIn: 'Fade In',
    slideIn: 'Slide In',
    pulse: 'Pulse',
    shake: 'Shake',
    spin: 'Spin',
    flip: 'Flip',
    swing: 'Swing',
    infinite: 'Infinite',
    reset: 'Reset',
    introTitle: 'Free Online CSS Animation Generator',
    introText: 'Create CSS keyframe animations visually with real-time preview. Customize duration, timing functions, delays, iteration counts, direction, and fill modes. Choose from preset animations or build custom ones. Export clean CSS code ready for production. All processing happens in your browser.',
    tipTitle: 'CSS Animation Tips',
    tip1: 'Use ease-in-out for smooth, natural-feeling animations',
    tip2: 'Keep animations under 300ms for UI interactions',
    tip3: 'Use transform and opacity for best performance',
    tip4: 'The fill-mode forwards keeps the final state after animation ends',
    tip5: 'Use animation-delay to stagger multiple animations',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What are CSS keyframe animations?',
    faq1a: 'CSS keyframe animations allow you to define intermediate steps in an animation sequence using @keyframes rules. You can control properties at different percentages (0% to 100%) of the animation timeline, creating complex multi-step animations with pure CSS.',
    faq2q: 'What timing functions are available?',
    faq2a: 'Available timing functions include: ease (default smooth curve), linear (constant speed), ease-in (slow start), ease-out (slow end), ease-in-out (slow start and end), and step functions. You can also use cubic-bezier for custom curves.',
    faq3q: 'How do I make an animation loop?',
    faq3a: 'Set the iteration count to "infinite" to make an animation loop forever. You can also use a specific number like 3 to repeat exactly three times.',
    faq4q: 'What is fill-mode?',
    faq4a: 'Fill-mode determines how styles are applied before and after the animation. "forwards" keeps the final state, "backwards" applies the initial state during delay, "both" applies both behaviors, and "none" (default) removes all animation styles when not running.',
    faq5q: 'Is this tool free?',
    faq5a: 'Yes, completely free with no limitations. All animation generation happens client-side in your browser.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSS 动画生成器',
    description: '可视化创建 CSS 关键帧动画，支持实时预览和代码导出。',
    animName: '动画名称', duration: '持续时间 (秒)', timing: '时间函数', delay: '延迟 (秒)', iterations: '迭代次数', direction: '方向', fillMode: '填充模式',
    preview: '实时预览', cssOutput: 'CSS 输出', presets: '动画预设',
    bounce: '弹跳', fadeIn: '淡入', slideIn: '滑入', pulse: '脉冲', shake: '抖动', spin: '旋转', flip: '翻转', swing: '摇摆',
    infinite: '无限', reset: '重置',
    introTitle: '免费在线 CSS 动画生成器', introText: '使用实时预览可视化创建 CSS 关键帧动画。自定义持续时间、时间函数、延迟等。从预设动画中选择或构建自定义动画。',
    tipTitle: '提示', tip1: '使用 ease-in-out 获得流畅自然的动画', tip2: 'UI 交互动画保持在 300ms 以内', tip3: '使用 transform 和 opacity 获得最佳性能', tip4: 'fill-mode forwards 保持动画结束后的最终状态', tip5: '使用 animation-delay 错开多个动画',
    faqTitle: '常见问题',
    faq1q: '什么是 CSS 关键帧动画？', faq1a: 'CSS 关键帧动画允许使用 @keyframes 规则在动画序列中定义中间步骤，控制动画时间线不同百分比处的属性。',
    faq2q: '有哪些时间函数？', faq2a: '包括 ease、linear、ease-in、ease-out、ease-in-out 和阶梯函数。还可以使用 cubic-bezier 自定义曲线。',
    faq3q: '如何让动画循环？', faq3a: '将迭代次数设为 infinite 可使动画永远循环。',
    faq4q: '什么是 fill-mode？', faq4a: 'fill-mode 决定动画前后如何应用样式。forwards 保持最终状态，backwards 在延迟期间应用初始状态。',
    faq5q: '免费吗？', faq5a: '完全免费。所有动画生成都在浏览器端完成。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur d\'Animations CSS', description: 'Creez des animations CSS visuellement avec apercu en direct.',
    animName: 'Nom de l\'animation', duration: 'Duree (s)', timing: 'Fonction de timing', delay: 'Delai (s)', iterations: 'Iterations', direction: 'Direction', fillMode: 'Mode de remplissage',
    preview: 'Apercu en direct', cssOutput: 'Sortie CSS', presets: 'Presets',
    bounce: 'Rebond', fadeIn: 'Fondu', slideIn: 'Glissement', pulse: 'Pulsation', shake: 'Tremblement', spin: 'Rotation', flip: 'Retournement', swing: 'Balancement',
    infinite: 'Infini', reset: 'Reinitialiser',
    introTitle: 'Generateur d\'animations CSS gratuit', introText: 'Creez des animations CSS avec apercu en temps reel et export de code.',
    tipTitle: 'Conseils', tip1: 'Utilisez ease-in-out pour des animations fluides', tip2: 'Gardez les animations sous 300ms pour les interactions', tip3: 'Utilisez transform et opacity pour la performance', tip4: 'forwards conserve l\'etat final', tip5: 'Utilisez animation-delay pour decaler les animations',
    faqTitle: 'FAQ', faq1q: 'Que sont les animations CSS keyframe?', faq1a: 'Les animations keyframe permettent de definir des etapes intermediaires avec @keyframes.',
    faq2q: 'Quelles fonctions de timing?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out et cubic-bezier personnalise.',
    faq3q: 'Comment boucler une animation?', faq3a: 'Mettez le nombre d\'iterations a "infinite".',
    faq4q: 'Qu\'est-ce que fill-mode?', faq4a: 'fill-mode determine comment les styles sont appliques avant et apres l\'animation.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, entierement gratuit.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSS-Animationsgenerator', description: 'CSS-Keyframe-Animationen visuell mit Live-Vorschau erstellen.',
    animName: 'Animationsname', duration: 'Dauer (s)', timing: 'Timing-Funktion', delay: 'Verzoegerung (s)', iterations: 'Wiederholungen', direction: 'Richtung', fillMode: 'Fuellmodus',
    preview: 'Live-Vorschau', cssOutput: 'CSS-Ausgabe', presets: 'Vorlagen',
    bounce: 'Hüpfen', fadeIn: 'Einblenden', slideIn: 'Gleiten', pulse: 'Pulsieren', shake: 'Schuetteln', spin: 'Drehen', flip: 'Umdrehen', swing: 'Schwingen',
    infinite: 'Unendlich', reset: 'Zuruecksetzen',
    introTitle: 'Kostenloser CSS-Animationsgenerator', introText: 'Erstellen Sie CSS-Animationen visuell mit Echtzeit-Vorschau und Code-Export.',
    tipTitle: 'Tipps', tip1: 'ease-in-out fuer fliessende Animationen', tip2: 'Animationen unter 300ms fuer UI-Interaktionen', tip3: 'transform und opacity fuer beste Performance', tip4: 'forwards behalt den Endzustand', tip5: 'animation-delay zum Staffeln mehrerer Animationen',
    faqTitle: 'FAQ', faq1q: 'Was sind CSS-Keyframe-Animationen?', faq1a: 'CSS-Keyframe-Animationen definieren Zwischenschritte mit @keyframes-Regeln.',
    faq2q: 'Welche Timing-Funktionen?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out und benutzerdefiniertes cubic-bezier.',
    faq3q: 'Animation wiederholen?', faq3a: 'Setzen Sie die Wiederholungen auf "infinite".',
    faq4q: 'Was ist fill-mode?', faq4a: 'fill-mode bestimmt, wie Stile vor und nach der Animation angewendet werden.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Animaciones CSS', description: 'Cree animaciones CSS keyframe visualmente con vista previa en vivo.',
    animName: 'Nombre animacion', duration: 'Duracion (s)', timing: 'Funcion de tiempo', delay: 'Retardo (s)', iterations: 'Iteraciones', direction: 'Direccion', fillMode: 'Modo de relleno',
    preview: 'Vista previa', cssOutput: 'Salida CSS', presets: 'Presets',
    bounce: 'Rebote', fadeIn: 'Aparecer', slideIn: 'Deslizar', pulse: 'Pulso', shake: 'Sacudir', spin: 'Girar', flip: 'Voltear', swing: 'Balancear',
    infinite: 'Infinito', reset: 'Reiniciar',
    introTitle: 'Generador de animaciones CSS gratuito', introText: 'Cree animaciones CSS con vista previa en tiempo real y exportacion de codigo.',
    tipTitle: 'Consejos', tip1: 'Use ease-in-out para animaciones fluidas', tip2: 'Mantenga animaciones bajo 300ms', tip3: 'Use transform y opacity para rendimiento', tip4: 'forwards mantiene el estado final', tip5: 'Use animation-delay para escalonar',
    faqTitle: 'FAQ', faq1q: 'Que son las animaciones keyframe CSS?', faq1a: 'Permiten definir pasos intermedios con reglas @keyframes.',
    faq2q: 'Que funciones de tiempo hay?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out y cubic-bezier.',
    faq3q: 'Como hacer bucle?', faq3a: 'Establezca las iteraciones en "infinite".',
    faq4q: 'Que es fill-mode?', faq4a: 'fill-mode determina como se aplican los estilos antes y despues de la animacion.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Generatore Animazioni CSS', description: 'Crea animazioni CSS keyframe visivamente con anteprima dal vivo.',
    animName: 'Nome animazione', duration: 'Durata (s)', timing: 'Funzione di timing', delay: 'Ritardo (s)', iterations: 'Iterazioni', direction: 'Direzione', fillMode: 'Modalita riempimento',
    preview: 'Anteprima dal vivo', cssOutput: 'Output CSS', presets: 'Preset',
    bounce: 'Rimbalzo', fadeIn: 'Dissolvenza', slideIn: 'Scorrimento', pulse: 'Pulsazione', shake: 'Scuotimento', spin: 'Rotazione', flip: 'Capovolgimento', swing: 'Oscillazione',
    infinite: 'Infinito', reset: 'Reset',
    introTitle: 'Generatore di animazioni CSS gratuito', introText: 'Crea animazioni CSS con anteprima in tempo reale ed esportazione codice.',
    tipTitle: 'Suggerimenti', tip1: 'Usa ease-in-out per animazioni fluide', tip2: 'Mantieni le animazioni sotto 300ms', tip3: 'Usa transform e opacity per le prestazioni', tip4: 'forwards mantiene lo stato finale', tip5: 'Usa animation-delay per sfalsare',
    faqTitle: 'FAQ', faq1q: 'Cosa sono le animazioni CSS keyframe?', faq1a: 'Permettono di definire passi intermedi con regole @keyframes.',
    faq2q: 'Quali funzioni di timing?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out e cubic-bezier.',
    faq3q: 'Come ripetere?', faq3a: 'Imposta le iterazioni su "infinite".',
    faq4q: 'Cos\'e fill-mode?', faq4a: 'fill-mode determina come gli stili vengono applicati prima e dopo l\'animazione.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Gerador de Animacoes CSS', description: 'Crie animacoes CSS keyframe visualmente com preview ao vivo.',
    animName: 'Nome da animacao', duration: 'Duracao (s)', timing: 'Funcao de timing', delay: 'Atraso (s)', iterations: 'Iteracoes', direction: 'Direcao', fillMode: 'Modo de preenchimento',
    preview: 'Preview ao vivo', cssOutput: 'Saida CSS', presets: 'Presets',
    bounce: 'Salto', fadeIn: 'Aparecer', slideIn: 'Deslizar', pulse: 'Pulsar', shake: 'Sacudir', spin: 'Girar', flip: 'Virar', swing: 'Balancar',
    infinite: 'Infinito', reset: 'Reiniciar',
    introTitle: 'Gerador de animacoes CSS gratuito', introText: 'Crie animacoes CSS com preview em tempo real e exportacao de codigo.',
    tipTitle: 'Dicas', tip1: 'Use ease-in-out para animacoes fluidas', tip2: 'Mantenha animacoes abaixo de 300ms', tip3: 'Use transform e opacity para desempenho', tip4: 'forwards mantem o estado final', tip5: 'Use animation-delay para escalonar',
    faqTitle: 'FAQ', faq1q: 'O que sao animacoes CSS keyframe?', faq1a: 'Permitem definir etapas intermediarias com regras @keyframes.',
    faq2q: 'Quais funcoes de timing?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out e cubic-bezier.',
    faq3q: 'Como repetir?', faq3a: 'Defina as iteracoes como "infinite".',
    faq4q: 'O que e fill-mode?', faq4a: 'fill-mode determina como os estilos sao aplicados antes e depois da animacao.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'CSS Animatie Generator', description: 'Maak CSS keyframe-animaties visueel met live preview.',
    animName: 'Animatienaam', duration: 'Duur (s)', timing: 'Timing-functie', delay: 'Vertraging (s)', iterations: 'Herhalingen', direction: 'Richting', fillMode: 'Vulmodus',
    preview: 'Live preview', cssOutput: 'CSS Output', presets: 'Presets',
    bounce: 'Stuiteren', fadeIn: 'Invervagen', slideIn: 'Inschuiven', pulse: 'Pulseren', shake: 'Schudden', spin: 'Draaien', flip: 'Omdraaien', swing: 'Zwaaien',
    infinite: 'Oneindig', reset: 'Reset',
    introTitle: 'Gratis CSS animatie generator', introText: 'Maak CSS-animaties met realtime preview en code-export.',
    tipTitle: 'Tips', tip1: 'Gebruik ease-in-out voor vloeiende animaties', tip2: 'Houd animaties onder 300ms', tip3: 'Gebruik transform en opacity voor prestaties', tip4: 'forwards behoudt de eindstaat', tip5: 'Gebruik animation-delay om te spreiden',
    faqTitle: 'FAQ', faq1q: 'Wat zijn CSS keyframe-animaties?', faq1a: 'CSS keyframe-animaties definiëren tussenstappen met @keyframes regels.',
    faq2q: 'Welke timing-functies?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out en cubic-bezier.',
    faq3q: 'Hoe herhalen?', faq3a: 'Stel herhalingen in op "infinite".',
    faq4q: 'Wat is fill-mode?', faq4a: 'fill-mode bepaalt hoe stijlen worden toegepast voor en na de animatie.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Generator Animacji CSS', description: 'Twórz animacje CSS keyframe wizualnie z podgladem na zywo.',
    animName: 'Nazwa animacji', duration: 'Czas trwania (s)', timing: 'Funkcja czasowa', delay: 'Opoznienie (s)', iterations: 'Iteracje', direction: 'Kierunek', fillMode: 'Tryb wypelnienia',
    preview: 'Podglad na zywo', cssOutput: 'Wyjscie CSS', presets: 'Presets',
    bounce: 'Odbijanie', fadeIn: 'Pojawianie', slideIn: 'Wsuwanie', pulse: 'Pulsowanie', shake: 'Trzesienie', spin: 'Obrót', flip: 'Przewracanie', swing: 'Wahanie',
    infinite: 'Nieskonczone', reset: 'Resetuj',
    introTitle: 'Darmowy generator animacji CSS', introText: 'Twórz animacje CSS z podgladem w czasie rzeczywistym i eksportem kodu.',
    tipTitle: 'Wskazowki', tip1: 'Uzyj ease-in-out dla plynnych animacji', tip2: 'Animacje ponizej 300ms dla interakcji', tip3: 'Uzyj transform i opacity dla wydajnosci', tip4: 'forwards zachowuje stan koncowy', tip5: 'Uzyj animation-delay do rozlozenia',
    faqTitle: 'FAQ', faq1q: 'Czym sa animacje CSS keyframe?', faq1a: 'Animacje keyframe definiuja posrednie kroki z regulami @keyframes.',
    faq2q: 'Jakie funkcje czasowe?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out i cubic-bezier.',
    faq3q: 'Jak zapetlic?', faq3a: 'Ustaw iteracje na "infinite".',
    faq4q: 'Czym jest fill-mode?', faq4a: 'fill-mode okresla jak style sa stosowane przed i po animacji.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'CSS Animation Generator', description: 'Skapa CSS keyframe-animationer visuellt med live-foerhandsvisning.',
    animName: 'Animationsnamn', duration: 'Varaktighet (s)', timing: 'Tidsfunktion', delay: 'Foerdroejning (s)', iterations: 'Upprepningar', direction: 'Riktning', fillMode: 'Fyllnadslaege',
    preview: 'Live-foerhandsvisning', cssOutput: 'CSS-utdata', presets: 'Foerval',
    bounce: 'Studsa', fadeIn: 'Tona in', slideIn: 'Glid in', pulse: 'Pulsera', shake: 'Skaka', spin: 'Snurra', flip: 'Vaend', swing: 'Svinga',
    infinite: 'Oaendligt', reset: 'Aaterstaell',
    introTitle: 'Gratis CSS-animationsgenerator', introText: 'Skapa CSS-animationer med realtidsfoerhandsvisning och kodexport.',
    tipTitle: 'Tips', tip1: 'Anvaend ease-in-out foer mjuka animationer', tip2: 'Haall animationer under 300ms', tip3: 'Anvaend transform och opacity foer prestanda', tip4: 'forwards behaaller slutstadiet', tip5: 'Anvaend animation-delay foer att sprida',
    faqTitle: 'FAQ', faq1q: 'Vad aer CSS keyframe-animationer?', faq1a: 'CSS keyframe-animationer definierar mellansteg med @keyframes-regler.',
    faq2q: 'Vilka tidsfunktioner?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out och cubic-bezier.',
    faq3q: 'Hur upprepa?', faq3a: 'Saett upprepningar till "infinite".',
    faq4q: 'Vad aer fill-mode?', faq4a: 'fill-mode bestammer hur stilar tillaempas foere och efter animationen.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'CSS Animasjonsgenerator', description: 'Lag CSS keyframe-animasjoner visuelt med live forhåndsvisning.',
    animName: 'Animasjonsnavn', duration: 'Varighet (s)', timing: 'Tidsfunksjon', delay: 'Forsinkelse (s)', iterations: 'Gjentakelser', direction: 'Retning', fillMode: 'Fyllmodus',
    preview: 'Live forhåndsvisning', cssOutput: 'CSS-utdata', presets: 'Forhåndsvalg',
    bounce: 'Sprette', fadeIn: 'Tone inn', slideIn: 'Gli inn', pulse: 'Pulsere', shake: 'Riste', spin: 'Spinne', flip: 'Snu', swing: 'Svinge',
    infinite: 'Uendelig', reset: 'Tilbakestill',
    introTitle: 'Gratis CSS-animasjonsgenerator', introText: 'Lag CSS-animasjoner med sanntidsforhåndsvisning og kodeeksport.',
    tipTitle: 'Tips', tip1: 'Bruk ease-in-out for myke animasjoner', tip2: 'Hold animasjoner under 300ms', tip3: 'Bruk transform og opacity for ytelse', tip4: 'forwards beholder slutttilstanden', tip5: 'Bruk animation-delay for å spre',
    faqTitle: 'FAQ', faq1q: 'Hva er CSS keyframe-animasjoner?', faq1a: 'CSS keyframe-animasjoner definerer mellomtrinn med @keyframes-regler.',
    faq2q: 'Hvilke tidsfunksjoner?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out og cubic-bezier.',
    faq3q: 'Hvordan gjenta?', faq3a: 'Sett gjentakelser til "infinite".',
    faq4q: 'Hva er fill-mode?', faq4a: 'fill-mode bestemmer hvordan stiler brukes foer og etter animasjonen.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'CSS アニメーション生成ツール', description: 'ライブプレビュー付きでCSSキーフレームアニメーションを作成。',
    animName: 'アニメーション名', duration: '期間 (秒)', timing: 'タイミング関数', delay: '遅延 (秒)', iterations: '繰り返し', direction: '方向', fillMode: 'フィルモード',
    preview: 'ライブプレビュー', cssOutput: 'CSS 出力', presets: 'プリセット',
    bounce: 'バウンス', fadeIn: 'フェードイン', slideIn: 'スライドイン', pulse: 'パルス', shake: 'シェイク', spin: 'スピン', flip: 'フリップ', swing: 'スイング',
    infinite: '無限', reset: 'リセット',
    introTitle: '無料CSSアニメーション生成ツール', introText: 'リアルタイムプレビューでCSSアニメーションを視覚的に作成。',
    tipTitle: 'ヒント', tip1: 'ease-in-outで滑らかなアニメーション', tip2: 'UI操作は300ms以内', tip3: 'transformとopacityでパフォーマンス向上', tip4: 'forwardsで終了状態を保持', tip5: 'animation-delayでずらす',
    faqTitle: 'FAQ', faq1q: 'CSSキーフレームアニメーションとは？', faq1a: '@keyframesルールで中間ステップを定義するアニメーションです。',
    faq2q: 'どのタイミング関数がある？', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier。',
    faq3q: 'ループさせるには？', faq3a: '繰り返しを"infinite"に設定します。',
    faq4q: 'fill-modeとは？', faq4a: 'アニメーション前後のスタイル適用方法を決定します。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'CSS 애니메이션 생성기', description: '실시간 미리보기로 CSS 키프레임 애니메이션을 시각적으로 생성.',
    animName: '애니메이션 이름', duration: '지속 시간 (초)', timing: '타이밍 함수', delay: '지연 (초)', iterations: '반복', direction: '방향', fillMode: '채우기 모드',
    preview: '실시간 미리보기', cssOutput: 'CSS 출력', presets: '프리셋',
    bounce: '바운스', fadeIn: '페이드인', slideIn: '슬라이드인', pulse: '펄스', shake: '흔들기', spin: '회전', flip: '뒤집기', swing: '스윙',
    infinite: '무한', reset: '초기화',
    introTitle: '무료 CSS 애니메이션 생성기', introText: '실시간 미리보기로 CSS 애니메이션을 시각적으로 생성합니다.',
    tipTitle: '팁', tip1: 'ease-in-out으로 부드러운 애니메이션', tip2: 'UI 상호작용은 300ms 이내', tip3: 'transform과 opacity로 성능 향상', tip4: 'forwards로 최종 상태 유지', tip5: 'animation-delay로 시차 적용',
    faqTitle: 'FAQ', faq1q: 'CSS 키프레임 애니메이션이란?', faq1a: '@keyframes 규칙으로 중간 단계를 정의하는 애니메이션입니다.',
    faq2q: '어떤 타이밍 함수가 있나요?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier.',
    faq3q: '반복하려면?', faq3a: '반복을 "infinite"로 설정합니다.',
    faq4q: 'fill-mode란?', faq4a: '애니메이션 전후에 스타일이 어떻게 적용되는지 결정합니다.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Generator Animasi CSS', description: 'Buat animasi keyframe CSS secara visual dengan preview langsung.',
    animName: 'Nama animasi', duration: 'Durasi (s)', timing: 'Fungsi timing', delay: 'Tunda (s)', iterations: 'Iterasi', direction: 'Arah', fillMode: 'Mode isi',
    preview: 'Preview langsung', cssOutput: 'Output CSS', presets: 'Preset',
    bounce: 'Memantul', fadeIn: 'Muncul', slideIn: 'Geser masuk', pulse: 'Berdenyut', shake: 'Bergetar', spin: 'Berputar', flip: 'Membalik', swing: 'Berayun',
    infinite: 'Tak terbatas', reset: 'Reset',
    introTitle: 'Generator animasi CSS gratis', introText: 'Buat animasi CSS dengan preview real-time dan ekspor kode.',
    tipTitle: 'Tips', tip1: 'Gunakan ease-in-out untuk animasi halus', tip2: 'Pertahankan animasi di bawah 300ms', tip3: 'Gunakan transform dan opacity untuk performa', tip4: 'forwards mempertahankan status akhir', tip5: 'Gunakan animation-delay untuk menyebar',
    faqTitle: 'FAQ', faq1q: 'Apa itu animasi CSS keyframe?', faq1a: 'Animasi keyframe mendefinisikan langkah menengah dengan aturan @keyframes.',
    faq2q: 'Fungsi timing apa saja?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out dan cubic-bezier.',
    faq3q: 'Bagaimana mengulang?', faq3a: 'Atur iterasi ke "infinite".',
    faq4q: 'Apa itu fill-mode?', faq4a: 'fill-mode menentukan bagaimana gaya diterapkan sebelum dan sesudah animasi.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือสร้าง CSS Animation', description: 'สร้าง CSS keyframe animation แบบเห็นภาพพร้อมตัวอย่างสด',
    animName: 'ชื่อแอนิเมชัน', duration: 'ระยะเวลา (วินาที)', timing: 'ฟังก์ชันเวลา', delay: 'หน่วงเวลา (วินาที)', iterations: 'จำนวนรอบ', direction: 'ทิศทาง', fillMode: 'โหมดเติม',
    preview: 'ตัวอย่างสด', cssOutput: 'ผลลัพธ์ CSS', presets: 'พรีเซ็ต',
    bounce: 'เด้ง', fadeIn: 'จางเข้า', slideIn: 'เลื่อนเข้า', pulse: 'เต้น', shake: 'สั่น', spin: 'หมุน', flip: 'พลิก', swing: 'แกว่ง',
    infinite: 'ไม่จำกัด', reset: 'รีเซ็ต',
    introTitle: 'เครื่องมือสร้าง CSS Animation ฟรี', introText: 'สร้าง CSS animation พร้อมตัวอย่างแบบเรียลไทม์และส่งออกโค้ด',
    tipTitle: 'เคล็ดลับ', tip1: 'ใช้ ease-in-out สำหรับแอนิเมชันที่ลื่นไหล', tip2: 'แอนิเมชัน UI ควรต่ำกว่า 300ms', tip3: 'ใช้ transform และ opacity เพื่อประสิทธิภาพ', tip4: 'forwards รักษาสถานะสุดท้าย', tip5: 'ใช้ animation-delay เพื่อกระจาย',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'CSS keyframe animation คืออะไร?', faq1a: 'แอนิเมชันที่กำหนดขั้นตอนกลางด้วยกฎ @keyframes',
    faq2q: 'มีฟังก์ชันเวลาอะไรบ้าง?', faq2a: 'ease, linear, ease-in, ease-out, ease-in-out และ cubic-bezier',
    faq3q: 'ทำให้วนซ้ำอย่างไร?', faq3a: 'ตั้งค่าจำนวนรอบเป็น "infinite"',
    faq4q: 'fill-mode คืออะไร?', faq4a: 'fill-mode กำหนดว่าสไตล์จะถูกใช้อย่างไรก่อนและหลังแอนิเมชัน',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface AnimPreset {
  name: string;
  key: string;
  keyframes: string;
}

const ANIMATION_PRESETS: AnimPreset[] = [
  { name: 'Bounce', key: 'bounce', keyframes: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }\n}` },
  { name: 'Fade In', key: 'fadeIn', keyframes: `@keyframes fadeIn {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}` },
  { name: 'Slide In', key: 'slideIn', keyframes: `@keyframes slideIn {\n  0% { transform: translateX(-100%); opacity: 0; }\n  100% { transform: translateX(0); opacity: 1; }\n}` },
  { name: 'Pulse', key: 'pulse', keyframes: `@keyframes pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.15); }\n}` },
  { name: 'Shake', key: 'shake', keyframes: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  25% { transform: translateX(-10px); }\n  75% { transform: translateX(10px); }\n}` },
  { name: 'Spin', key: 'spin', keyframes: `@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}` },
  { name: 'Flip', key: 'flip', keyframes: `@keyframes flip {\n  0% { transform: perspective(400px) rotateY(0); }\n  100% { transform: perspective(400px) rotateY(360deg); }\n}` },
  { name: 'Swing', key: 'swing', keyframes: `@keyframes swing {\n  0%, 100% { transform: rotate(0deg); }\n  25% { transform: rotate(15deg); }\n  75% { transform: rotate(-15deg); }\n}` },
];

const TIMING_FUNCTIONS = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const FILL_MODES = ['none', 'forwards', 'backwards', 'both'];

export default function CssAnimationGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [presetIdx, setPresetIdx] = useState(0);
  const [duration, setDuration] = useState(1);
  const [timing, setTiming] = useState('ease');
  const [delay, setDelay] = useState(0);
  const [iterations, setIterations] = useState('infinite');
  const [direction, setDirection] = useState('normal');
  const [fillMode, setFillMode] = useState('none');
  const [animKey, setAnimKey] = useState(0);

  const preset = ANIMATION_PRESETS[presetIdx];

  const animationProp = `${preset.key} ${duration}s ${timing} ${delay}s ${iterations} ${direction} ${fillMode}`;

  const fullCSS = useMemo(() => {
    return `${preset.keyframes}\n\n.animated-element {\n  animation: ${animationProp};\n}`;
  }, [preset, animationProp]);

  const restart = () => setAnimKey(k => k + 1);

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
    <ToolLayout title={t.title} description={t.description} toolId="css-animation-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: preset.keyframes }} />

      {/* Presets */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.presets}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ANIMATION_PRESETS.map((p, i) => (
            <button key={p.key} onClick={() => { setPresetIdx(i); restart(); }}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                border: i === presetIdx ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: i === presetIdx ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)',
                color: 'var(--text-primary)', fontWeight: i === presetIdx ? 700 : 400,
              }}>
              {t[p.key as keyof typeof t] || p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.duration}</label>
          <input type="range" min="0.1" max="5" step="0.1" value={duration} onChange={e => { setDuration(Number(e.target.value)); restart(); }}
            style={{ width: '100%' }} />
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center' }}>{duration}s</div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.timing}</label>
          <select value={timing} onChange={e => { setTiming(e.target.value); restart(); }}
            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12 }}>
            {TIMING_FUNCTIONS.map(tf => <option key={tf} value={tf}>{tf}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.delay}</label>
          <input type="range" min="0" max="3" step="0.1" value={delay} onChange={e => { setDelay(Number(e.target.value)); restart(); }}
            style={{ width: '100%' }} />
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center' }}>{delay}s</div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.iterations}</label>
          <div style={{ display: 'flex', gap: 4 }}>
            <input type="number" min="1" max="100" value={iterations === 'infinite' ? '' : iterations}
              onChange={e => { setIterations(e.target.value || '1'); restart(); }}
              placeholder="1"
              style={{ flex: 1, padding: '6px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12 }} />
            <button onClick={() => { setIterations(iterations === 'infinite' ? '1' : 'infinite'); restart(); }}
              style={{ padding: '6px 10px', borderRadius: 6, fontSize: 10, cursor: 'pointer', border: iterations === 'infinite' ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)', background: iterations === 'infinite' ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)', color: 'var(--text-primary)', fontWeight: 600 }}>
              {t.infinite}
            </button>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.direction}</label>
          <select value={direction} onChange={e => { setDirection(e.target.value); restart(); }}
            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12 }}>
            {DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.fillMode}</label>
          <select value={fillMode} onChange={e => { setFillMode(e.target.value); restart(); }}
            style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 12 }}>
            {FILL_MODES.map(fm => <option key={fm} value={fm}>{fm}</option>)}
          </select>
        </div>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.preview}</label>
          <button onClick={restart} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>{t.reset}</button>
        </div>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160, overflow: 'hidden' }}>
          <div key={animKey} style={{
            width: 80, height: 80, borderRadius: 12, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            animation: animationProp,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: '#fff', fontWeight: 700, boxShadow: '0 8px 32px rgba(59,130,246,0.3)',
          }}>
            A
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.cssOutput}</label>
          <CopyButton text={fullCSS} />
        </div>
        <pre style={{ background: '#0a0a0a', color: '#22c55e', padding: 20, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', lineHeight: 1.5, border: '1px solid var(--border-color)', whiteSpace: 'pre', margin: 0 }}>
          {fullCSS}
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
            { href: `/${lang}/tools/color-palette-generator`, label: 'Color Palette Generator' },
            { href: `/${lang}/tools/css-grid`, label: 'CSS Grid Generator' },
            { href: `/${lang}/tools/box-shadow`, label: 'Box Shadow Generator' },
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
