'use client';

import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'CSS Animation Playground', description: 'Build CSS animations visually with keyframes, timing functions, and live preview. Generate ready-to-use animation code.', nameLabel: 'Animation Name', durationLabel: 'Duration (s)', timingLabel: 'Timing Function', delayLabel: 'Delay (s)', iterationLabel: 'Iterations', directionLabel: 'Direction', fillLabel: 'Fill Mode', presetLabel: 'Presets', copyLabel: 'Copy CSS', previewLabel: 'Preview', codeLabel: 'Generated CSS', resetAnim: 'Replay', introTitle: 'Free Online CSS Animation Playground', introText: 'Create CSS animations visually by adjusting keyframes, timing functions, and properties. See a live preview and copy the generated code.', howTitle: 'How to Create CSS Animations', step1: 'Select a preset or customize properties', step2: 'Adjust duration, timing, delay, and iteration', step3: 'Preview the animation in real-time', step4: 'Copy the generated CSS code', featuresTitle: 'Features', feature1: 'Live animation preview', feature2: 'Multiple preset animations', feature3: 'Custom keyframe editing', feature4: 'All timing functions supported', feature5: 'One-click code copy', faqTitle: 'Frequently Asked Questions', faq1q: 'What CSS animation properties can I customize?', faq1a: 'You can customize animation name, duration, timing function, delay, iteration count, direction, and fill mode.', faq2q: 'What are timing functions?', faq2a: 'Timing functions define the speed curve of an animation. Common ones include ease, linear, ease-in, ease-out, ease-in-out, and custom cubic-bezier values.', faq3q: 'What is fill mode?', faq3a: 'Fill mode defines how styles are applied before and after the animation. "forwards" keeps the final state, "backwards" applies the initial state during delay, and "both" combines them.', faq4q: 'Can I create custom keyframes?', faq4a: 'Yes. You can edit the keyframe CSS directly in the textarea to create any custom animation you want.', faq5q: 'Is this tool free?', faq5a: 'Yes. The CSS Animation Playground is completely free, runs in your browser, and no data is sent to any server.', relatedTitle: 'Related Tools' },
  zh: { title: 'CSS 动画工坊', description: '可视化构建 CSS 动画，使用关键帧、时间函数和实时预览。生成可直接使用的动画代码。', nameLabel: '动画名称', durationLabel: '持续时间 (秒)', timingLabel: '时间函数', delayLabel: '延迟 (秒)', iterationLabel: '迭代次数', directionLabel: '方向', fillLabel: '填充模式', presetLabel: '预设', copyLabel: '复制 CSS', previewLabel: '预览', codeLabel: '生成的 CSS', resetAnim: '重播', introTitle: '免费在线 CSS 动画工坊', introText: '通过调整关键帧、时间函数和属性可视化创建 CSS 动画。', howTitle: '如何创建 CSS 动画', step1: '选择预设或自定义属性', step2: '调整持续时间、时间函数、延迟和迭代', step3: '实时预览动画', step4: '复制生成的 CSS 代码', featuresTitle: '功能', feature1: '实时动画预览', feature2: '多种预设动画', feature3: '自定义关键帧编辑', feature4: '所有时间函数支持', feature5: '一键复制代码', faqTitle: '常见问题', faq1q: '可以自定义哪些 CSS 动画属性？', faq1a: '可以自定义动画名称、持续时间、时间函数、延迟、迭代次数、方向和填充模式。', faq2q: '什么是时间函数？', faq2a: '时间函数定义动画的速度曲线。', faq3q: '什么是填充模式？', faq3a: '填充模式定义动画前后样式的应用方式。', faq4q: '可以创建自定义关键帧吗？', faq4a: '可以。', faq5q: '此工具免费吗？', faq5a: '是的。', relatedTitle: '相关工具' },
  ja: { title: 'CSSアニメーションプレイグラウンド', description: 'キーフレーム、タイミング関数、ライブプレビューでCSSアニメーションを視覚的に構築。', nameLabel: 'アニメーション名', durationLabel: '持続時間 (秒)', timingLabel: 'タイミング関数', delayLabel: '遅延 (秒)', iterationLabel: '繰り返し', directionLabel: '方向', fillLabel: 'フィルモード', presetLabel: 'プリセット', copyLabel: 'CSSをコピー', previewLabel: 'プレビュー', codeLabel: '生成CSS', resetAnim: '再生', introTitle: '無料CSSアニメーションプレイグラウンド', introText: 'キーフレームとタイミング関数を調整してCSSアニメーションを視覚的に作成します。', howTitle: 'CSSアニメーションの作成方法', step1: 'プリセットを選択またはカスタマイズ', step2: '時間、タイミング、遅延を調整', step3: 'リアルタイムプレビュー', step4: 'CSSコードをコピー', featuresTitle: '機能', feature1: 'ライブプレビュー', feature2: 'プリセットアニメーション', feature3: 'カスタムキーフレーム', feature4: '全タイミング関数対応', feature5: 'ワンクリックコピー', faqTitle: 'よくある質問', faq1q: 'カスタマイズ可能なプロパティは？', faq1a: '名前、持続時間、タイミング、遅延、繰り返し、方向、フィルモード。', faq2q: 'タイミング関数とは？', faq2a: '速度曲線を定義します。', faq3q: 'フィルモードとは？', faq3a: 'アニメーション前後のスタイル適用方法を定義します。', faq4q: 'カスタムキーフレーム可能？', faq4a: 'はい。', faq5q: '無料ですか？', faq5a: 'はい。', relatedTitle: '関連ツール' },
  ko: { title: 'CSS 애니메이션 플레이그라운드', description: '키프레임, 타이밍 함수, 라이브 프리뷰로 CSS 애니메이션을 시각적으로 구축합니다.', nameLabel: '애니메이션 이름', durationLabel: '지속 시간 (초)', timingLabel: '타이밍 함수', delayLabel: '지연 (초)', iterationLabel: '반복', directionLabel: '방향', fillLabel: '채우기 모드', presetLabel: '프리셋', copyLabel: 'CSS 복사', previewLabel: '미리보기', codeLabel: '생성된 CSS', resetAnim: '다시 재생', introTitle: '무료 CSS 애니메이션 플레이그라운드', introText: '키프레임과 타이밍 함수를 조정하여 CSS 애니메이션을 시각적으로 만듭니다.', howTitle: 'CSS 애니메이션 만드는 방법', step1: '프리셋 선택 또는 커스터마이즈', step2: '시간, 타이밍, 지연 조정', step3: '실시간 미리보기', step4: 'CSS 코드 복사', featuresTitle: '기능', feature1: '라이브 미리보기', feature2: '프리셋 애니메이션', feature3: '커스텀 키프레임', feature4: '모든 타이밍 함수 지원', feature5: '원클릭 복사', faqTitle: '자주 묻는 질문', faq1q: '커스터마이즈 가능한 속성은?', faq1a: '이름, 지속 시간, 타이밍, 지연, 반복, 방향, 채우기 모드.', faq2q: '타이밍 함수란?', faq2a: '속도 곡선을 정의합니다.', faq3q: '채우기 모드란?', faq3a: '애니메이션 전후 스타일 적용 방법입니다.', faq4q: '커스텀 키프레임 가능?', faq4a: '네.', faq5q: '무료인가요?', faq5a: '네.', relatedTitle: '관련 도구' },
  fr: { title: 'CSS Animation Playground', description: 'Construisez des animations CSS visuellement avec keyframes et apercu en direct.', nameLabel: 'Nom', durationLabel: 'Duree (s)', timingLabel: 'Fonction de timing', delayLabel: 'Delai (s)', iterationLabel: 'Iterations', directionLabel: 'Direction', fillLabel: 'Mode de remplissage', presetLabel: 'Presets', copyLabel: 'Copier CSS', previewLabel: 'Apercu', codeLabel: 'CSS genere', resetAnim: 'Rejouer', introTitle: 'CSS Animation Playground Gratuit', introText: 'Creez des animations CSS visuellement.', howTitle: 'Comment creer des animations', step1: 'Selectionnez un preset', step2: 'Ajustez les proprietes', step3: 'Apercu en direct', step4: 'Copiez le code', featuresTitle: 'Fonctionnalites', feature1: 'Apercu en direct', feature2: 'Presets multiples', feature3: 'Keyframes personnalises', feature4: 'Toutes les fonctions de timing', feature5: 'Copie en un clic', faqTitle: 'Questions frequentes', faq1q: 'Quelles proprietes ?', faq1a: 'Nom, duree, timing, delai, iterations, direction, remplissage.', faq2q: 'Fonctions de timing ?', faq2a: 'Definissent la courbe de vitesse.', faq3q: 'Mode de remplissage ?', faq3a: 'Definit l\'application des styles.', faq4q: 'Keyframes personnalises ?', faq4a: 'Oui.', faq5q: 'Gratuit ?', faq5a: 'Oui.', relatedTitle: 'Outils connexes' },
  de: { title: 'CSS Animation Playground', description: 'Erstellen Sie CSS-Animationen visuell mit Keyframes und Live-Vorschau.', nameLabel: 'Name', durationLabel: 'Dauer (s)', timingLabel: 'Timing-Funktion', delayLabel: 'Verzoegerung (s)', iterationLabel: 'Wiederholungen', directionLabel: 'Richtung', fillLabel: 'Fuellmodus', presetLabel: 'Vorlagen', copyLabel: 'CSS kopieren', previewLabel: 'Vorschau', codeLabel: 'Generiertes CSS', resetAnim: 'Wiederholen', introTitle: 'CSS Animation Playground Kostenlos', introText: 'CSS-Animationen visuell erstellen.', howTitle: 'So erstellen Sie Animationen', step1: 'Vorlage waehlen', step2: 'Eigenschaften anpassen', step3: 'Live-Vorschau', step4: 'Code kopieren', featuresTitle: 'Funktionen', feature1: 'Live-Vorschau', feature2: 'Vorlagen', feature3: 'Eigene Keyframes', feature4: 'Alle Timing-Funktionen', feature5: 'Ein-Klick-Kopie', faqTitle: 'FAQ', faq1q: 'Welche Eigenschaften?', faq1a: 'Name, Dauer, Timing, Verzoegerung, Wiederholungen, Richtung, Fuellmodus.', faq2q: 'Timing-Funktionen?', faq2a: 'Definieren die Geschwindigkeit.', faq3q: 'Fuellmodus?', faq3a: 'Definiert Stilanwendung.', faq4q: 'Eigene Keyframes?', faq4a: 'Ja.', faq5q: 'Kostenlos?', faq5a: 'Ja.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'CSS Animation Playground', description: 'Construya animaciones CSS visualmente.', nameLabel: 'Nombre', durationLabel: 'Duracion (s)', timingLabel: 'Funcion', delayLabel: 'Retardo (s)', iterationLabel: 'Iteraciones', directionLabel: 'Direccion', fillLabel: 'Modo', presetLabel: 'Presets', copyLabel: 'Copiar CSS', previewLabel: 'Vista previa', codeLabel: 'CSS generado', resetAnim: 'Replay', introTitle: 'CSS Animation Playground Gratis', introText: 'Cree animaciones CSS visualmente.', howTitle: 'Como crear animaciones', step1: 'Seleccione preset', step2: 'Ajuste propiedades', step3: 'Vista previa en vivo', step4: 'Copie el codigo', featuresTitle: 'Caracteristicas', feature1: 'Vista previa en vivo', feature2: 'Presets multiples', feature3: 'Keyframes personalizados', feature4: 'Todas las funciones de timing', feature5: 'Copia en un clic', faqTitle: 'FAQ', faq1q: 'Que propiedades?', faq1a: 'Nombre, duracion, timing, retardo, iteraciones, direccion, modo.', faq2q: 'Funciones de timing?', faq2a: 'Definen la curva de velocidad.', faq3q: 'Modo de relleno?', faq3a: 'Define la aplicacion de estilos.', faq4q: 'Keyframes personalizados?', faq4a: 'Si.', faq5q: 'Gratis?', faq5a: 'Si.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'CSS Animation Playground', description: 'Construa animacoes CSS visualmente.', nameLabel: 'Nome', durationLabel: 'Duracao (s)', timingLabel: 'Funcao', delayLabel: 'Atraso (s)', iterationLabel: 'Iteracoes', directionLabel: 'Direcao', fillLabel: 'Modo', presetLabel: 'Presets', copyLabel: 'Copiar CSS', previewLabel: 'Preview', codeLabel: 'CSS gerado', resetAnim: 'Replay', introTitle: 'CSS Animation Playground Gratis', introText: 'Crie animacoes CSS visualmente.', howTitle: 'Como criar animacoes', step1: 'Selecione preset', step2: 'Ajuste propriedades', step3: 'Preview ao vivo', step4: 'Copie o codigo', featuresTitle: 'Recursos', feature1: 'Preview ao vivo', feature2: 'Presets multiplos', feature3: 'Keyframes customizados', feature4: 'Todas funcoes de timing', feature5: 'Copia em um clique', faqTitle: 'FAQ', faq1q: 'Quais propriedades?', faq1a: 'Nome, duracao, timing, atraso, iteracoes, direcao, modo.', faq2q: 'Funcoes de timing?', faq2a: 'Definem a curva de velocidade.', faq3q: 'Modo de preenchimento?', faq3a: 'Define aplicacao de estilos.', faq4q: 'Keyframes customizados?', faq4a: 'Sim.', faq5q: 'Gratis?', faq5a: 'Sim.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'CSS Animation Playground', description: 'Costruisci animazioni CSS visivamente.', nameLabel: 'Nome', durationLabel: 'Durata (s)', timingLabel: 'Funzione', delayLabel: 'Ritardo (s)', iterationLabel: 'Iterazioni', directionLabel: 'Direzione', fillLabel: 'Modo', presetLabel: 'Preset', copyLabel: 'Copia CSS', previewLabel: 'Anteprima', codeLabel: 'CSS generato', resetAnim: 'Replay', introTitle: 'CSS Animation Playground Gratis', introText: 'Crea animazioni CSS visivamente.', howTitle: 'Come creare animazioni', step1: 'Seleziona preset', step2: 'Regola proprieta', step3: 'Anteprima dal vivo', step4: 'Copia il codice', featuresTitle: 'Funzionalita', feature1: 'Anteprima dal vivo', feature2: 'Preset multipli', feature3: 'Keyframes personalizzati', feature4: 'Tutte le funzioni di timing', feature5: 'Copia con un clic', faqTitle: 'FAQ', faq1q: 'Quali proprieta?', faq1a: 'Nome, durata, timing, ritardo, iterazioni, direzione, modo.', faq2q: 'Funzioni di timing?', faq2a: 'Definiscono la curva di velocita.', faq3q: 'Modo di riempimento?', faq3a: 'Definisce l\'applicazione degli stili.', faq4q: 'Keyframes personalizzati?', faq4a: 'Si.', faq5q: 'Gratis?', faq5a: 'Si.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'CSS Animatie Playground', description: 'Bouw CSS-animaties visueel.', nameLabel: 'Naam', durationLabel: 'Duur (s)', timingLabel: 'Timing', delayLabel: 'Vertraging (s)', iterationLabel: 'Herhalingen', directionLabel: 'Richting', fillLabel: 'Vulmodus', presetLabel: 'Presets', copyLabel: 'CSS kopieren', previewLabel: 'Preview', codeLabel: 'CSS code', resetAnim: 'Opnieuw', introTitle: 'Gratis CSS Animatie Playground', introText: 'Maak CSS-animaties visueel.', howTitle: 'Hoe animaties te maken', step1: 'Selecteer preset', step2: 'Pas aan', step3: 'Live preview', step4: 'Kopieer code', featuresTitle: 'Functies', feature1: 'Live preview', feature2: 'Presets', feature3: 'Custom keyframes', feature4: 'Alle timing functies', feature5: 'Een-klik kopieren', faqTitle: 'FAQ', faq1q: 'Welke eigenschappen?', faq1a: 'Naam, duur, timing, vertraging, herhalingen, richting, vulmodus.', faq2q: 'Timing functies?', faq2a: 'Snelheidscurve.', faq3q: 'Vulmodus?', faq3a: 'Stijltoepassing.', faq4q: 'Custom keyframes?', faq4a: 'Ja.', faq5q: 'Gratis?', faq5a: 'Ja.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'CSS Animation Playground', description: 'Tworzenie animacji CSS wizualnie.', nameLabel: 'Nazwa', durationLabel: 'Czas (s)', timingLabel: 'Timing', delayLabel: 'Opoznienie (s)', iterationLabel: 'Powtorzenia', directionLabel: 'Kierunek', fillLabel: 'Tryb', presetLabel: 'Presety', copyLabel: 'Kopiuj CSS', previewLabel: 'Podglad', codeLabel: 'CSS', resetAnim: 'Powtorz', introTitle: 'Darmowy CSS Animation Playground', introText: 'Tworzenie animacji CSS wizualnie.', howTitle: 'Jak tworzyc animacje', step1: 'Wybierz preset', step2: 'Dostosuj', step3: 'Podglad na zywo', step4: 'Skopiuj kod', featuresTitle: 'Funkcje', feature1: 'Podglad na zywo', feature2: 'Presety', feature3: 'Wlasne keyframes', feature4: 'Wszystkie funkcje timingu', feature5: 'Kopiowanie jednym kliknieciem', faqTitle: 'FAQ', faq1q: 'Jakie wlasciwosci?', faq1a: 'Nazwa, czas, timing, opoznienie, powtorzenia, kierunek, tryb.', faq2q: 'Funkcje timingu?', faq2a: 'Krzywa predkosci.', faq3q: 'Tryb wypelnienia?', faq3a: 'Zastosowanie stylow.', faq4q: 'Wlasne keyframes?', faq4a: 'Tak.', faq5q: 'Darmowe?', faq5a: 'Tak.', relatedTitle: 'Powiazane' },
  sv: { title: 'CSS Animation Playground', description: 'Skapa CSS-animationer visuellt.', nameLabel: 'Namn', durationLabel: 'Varaktighet (s)', timingLabel: 'Timing', delayLabel: 'Foerdroejning (s)', iterationLabel: 'Upprepningar', directionLabel: 'Riktning', fillLabel: 'Fyllningslaege', presetLabel: 'Foerval', copyLabel: 'Kopiera CSS', previewLabel: 'Foerhandsgranskning', codeLabel: 'CSS', resetAnim: 'Spela om', introTitle: 'Gratis CSS Animation Playground', introText: 'Skapa CSS-animationer visuellt.', howTitle: 'Hur man skapar animationer', step1: 'Valj foerval', step2: 'Justera', step3: 'Live foerhandsgranskning', step4: 'Kopiera kod', featuresTitle: 'Funktioner', feature1: 'Live foerhandsgranskning', feature2: 'Foerval', feature3: 'Egna keyframes', feature4: 'Alla timing-funktioner', feature5: 'Kopiera med ett klick', faqTitle: 'FAQ', faq1q: 'Vilka egenskaper?', faq1a: 'Namn, varaktighet, timing, foerdroejning, upprepningar, riktning, fyllning.', faq2q: 'Timing-funktioner?', faq2a: 'Hastighetskurva.', faq3q: 'Fyllningslaege?', faq3a: 'Stiltillaempning.', faq4q: 'Egna keyframes?', faq4a: 'Ja.', faq5q: 'Gratis?', faq5a: 'Ja.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'CSS Animation Playground', description: 'Lag CSS-animasjoner visuelt.', nameLabel: 'Navn', durationLabel: 'Varighet (s)', timingLabel: 'Timing', delayLabel: 'Forsinkelse (s)', iterationLabel: 'Gjentakelser', directionLabel: 'Retning', fillLabel: 'Fyllmodus', presetLabel: 'Maler', copyLabel: 'Kopier CSS', previewLabel: 'Forhaandsvisning', codeLabel: 'CSS', resetAnim: 'Spill av', introTitle: 'Gratis CSS Animation Playground', introText: 'Lag CSS-animasjoner visuelt.', howTitle: 'Hvordan lage animasjoner', step1: 'Velg mal', step2: 'Juster', step3: 'Direktevisning', step4: 'Kopier kode', featuresTitle: 'Funksjoner', feature1: 'Direktevisning', feature2: 'Maler', feature3: 'Egne keyframes', feature4: 'Alle timing-funksjoner', feature5: 'Kopier med ett klikk', faqTitle: 'FAQ', faq1q: 'Hvilke egenskaper?', faq1a: 'Navn, varighet, timing, forsinkelse, gjentakelser, retning, fyll.', faq2q: 'Timing-funksjoner?', faq2a: 'Hastighetskurve.', faq3q: 'Fyllmodus?', faq3a: 'Stilanvendelse.', faq4q: 'Egne keyframes?', faq4a: 'Ja.', faq5q: 'Gratis?', faq5a: 'Ja.', relatedTitle: 'Relaterte verktoy' },
  id: { title: 'CSS Animation Playground', description: 'Buat animasi CSS secara visual.', nameLabel: 'Nama', durationLabel: 'Durasi (d)', timingLabel: 'Timing', delayLabel: 'Delay (d)', iterationLabel: 'Iterasi', directionLabel: 'Arah', fillLabel: 'Mode Isi', presetLabel: 'Preset', copyLabel: 'Salin CSS', previewLabel: 'Preview', codeLabel: 'CSS', resetAnim: 'Putar ulang', introTitle: 'CSS Animation Playground Gratis', introText: 'Buat animasi CSS secara visual.', howTitle: 'Cara membuat animasi', step1: 'Pilih preset', step2: 'Sesuaikan', step3: 'Preview langsung', step4: 'Salin kode', featuresTitle: 'Fitur', feature1: 'Preview langsung', feature2: 'Preset', feature3: 'Keyframe kustom', feature4: 'Semua fungsi timing', feature5: 'Salin sekali klik', faqTitle: 'FAQ', faq1q: 'Properti apa?', faq1a: 'Nama, durasi, timing, delay, iterasi, arah, mode isi.', faq2q: 'Fungsi timing?', faq2a: 'Kurva kecepatan.', faq3q: 'Mode isi?', faq3a: 'Penerapan gaya.', faq4q: 'Keyframe kustom?', faq4a: 'Ya.', faq5q: 'Gratis?', faq5a: 'Ya.', relatedTitle: 'Alat terkait' },
  th: { title: 'CSS Animation Playground', description: 'สร้าง CSS animation ด้วย keyframes และตัวอย่างแบบเรียลไทม์', nameLabel: 'ชื่อ', durationLabel: 'ระยะเวลา (วิ)', timingLabel: 'Timing', delayLabel: 'หน่วง (วิ)', iterationLabel: 'ซ้ำ', directionLabel: 'ทิศทาง', fillLabel: 'โหมดเติม', presetLabel: 'Preset', copyLabel: 'คัดลอก CSS', previewLabel: 'ตัวอย่าง', codeLabel: 'CSS', resetAnim: 'เล่นซ้ำ', introTitle: 'CSS Animation Playground ฟรี', introText: 'สร้าง CSS animation แบบภาพ', howTitle: 'วิธีสร้าง animation', step1: 'เลือก preset', step2: 'ปรับแต่ง', step3: 'ตัวอย่างแบบเรียลไทม์', step4: 'คัดลอกโค้ด', featuresTitle: 'คุณสมบัติ', feature1: 'ตัวอย่างแบบเรียลไทม์', feature2: 'Preset หลายแบบ', feature3: 'Keyframe กำหนดเอง', feature4: 'ทุก timing function', feature5: 'คัดลอกคลิกเดียว', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'คุณสมบัติอะไรบ้าง?', faq1a: 'ชื่อ ระยะเวลา timing หน่วง ซ้ำ ทิศทาง โหมดเติม', faq2q: 'Timing function คืออะไร?', faq2a: 'กำหนดเส้นโค้งความเร็ว', faq3q: 'โหมดเติมคืออะไร?', faq3a: 'กำหนดการใช้สไตล์', faq4q: 'Keyframe กำหนดเองได้ไหม?', faq4a: 'ได้', faq5q: 'ฟรีไหม?', faq5a: 'ฟรี', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const TIMINGS = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'];
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const FILLS = ['none', 'forwards', 'backwards', 'both'];

const PRESETS: Record<string, string> = {
  bounce: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-40px); }\n}`,
  fadeIn: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`,
  slideIn: `@keyframes slideIn {\n  from { transform: translateX(-100%); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}`,
  rotate: `@keyframes rotate {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
  pulse: `@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.15); }\n  100% { transform: scale(1); }\n}`,
  shake: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20% { transform: translateX(-10px); }\n  40% { transform: translateX(10px); }\n  60% { transform: translateX(-10px); }\n  80% { transform: translateX(10px); }\n}`,
  swing: `@keyframes swing {\n  20% { transform: rotate(15deg); }\n  40% { transform: rotate(-10deg); }\n  60% { transform: rotate(5deg); }\n  80% { transform: rotate(-5deg); }\n  100% { transform: rotate(0deg); }\n}`,
};

export default function CssAnimationPlayground() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [animName, setAnimName] = useState('bounce');
  const [duration, setDuration] = useState('1');
  const [timing, setTiming] = useState('ease');
  const [delay, setDelay] = useState('0');
  const [iteration, setIteration] = useState('infinite');
  const [direction, setDirection] = useState('normal');
  const [fill, setFill] = useState('none');
  const [keyframes, setKeyframes] = useState(PRESETS.bounce);
  const [animKey, setAnimKey] = useState(0);

  const loadPreset = useCallback((name: string) => {
    setAnimName(name);
    setKeyframes(PRESETS[name] || '');
    setAnimKey(k => k + 1);
  }, []);

  const cssCode = useMemo(() => {
    return `${keyframes}\n\n.animated-element {\n  animation: ${animName} ${duration}s ${timing} ${delay}s ${iteration} ${direction} ${fill};\n}`;
  }, [keyframes, animName, duration, timing, delay, iteration, direction, fill]);

  const styleTag = useMemo(() => {
    return `${keyframes.replace(/@keyframes\s+\w+/, `@keyframes anim_preview_${animKey}`)}\n.anim-preview-box-${animKey} { animation: anim_preview_${animKey} ${duration}s ${timing} ${delay}s ${iteration} ${direction} ${fill}; }`;
  }, [keyframes, duration, timing, delay, iteration, direction, fill, animKey]);

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
    <ToolLayout title={t.title} description={t.description} toolId="css-animation-playground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, fontWeight: 600, lineHeight: '32px' }}>{t.presetLabel}:</label>
        {Object.keys(PRESETS).map(name => (
          <button key={name} onClick={() => loadPreset(name)} className={name === animName ? 'btn btn-primary' : 'btn btn-secondary'} style={{ fontSize: 12, padding: '6px 12px' }}>{name}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.nameLabel}</label>
          <input type="text" value={animName} onChange={(e) => setAnimName(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: 13, fontFamily: 'monospace', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.durationLabel}</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="0.1" step="0.1" style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.timingLabel}</label>
          <select value={timing} onChange={(e) => setTiming(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
            {TIMINGS.map(tf => <option key={tf} value={tf}>{tf}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.delayLabel}</label>
          <input type="number" value={delay} onChange={(e) => setDelay(e.target.value)} min="0" step="0.1" style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.iterationLabel}</label>
          <input type="text" value={iteration} onChange={(e) => setIteration(e.target.value)} placeholder="infinite" style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.directionLabel}</label>
          <select value={direction} onChange={(e) => setDirection(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
            {DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.fillLabel}</label>
          <select value={fill} onChange={(e) => setFill(e.target.value)} style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
            {FILLS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.previewLabel}</label>
            <button onClick={() => setAnimKey(k => k + 1)} className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }}>{t.resetAnim}</button>
          </div>
          <div style={{ height: 200, border: '1px solid var(--border-color)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', overflow: 'hidden' }}>
            <div key={animKey} className={`anim-preview-box-${animKey}`} style={{ width: 60, height: 60, borderRadius: 12, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Keyframes</label>
          <textarea value={keyframes} onChange={(e) => { setKeyframes(e.target.value); setAnimKey(k => k + 1); }} spellCheck={false}
            style={{ width: '100%', height: 200, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', padding: '10px 14px' }} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.codeLabel}</label>
          <CopyButton text={cssCode} label={t.copyLabel} />
        </div>
        <pre style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12, lineHeight: 1.6, fontFamily: 'JetBrains Mono, Fira Code, monospace', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{cssCode}</pre>
      </div>

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' }, { href: `/${lang}/tools/css-flexbox-playground`, label: 'CSS Flexbox Playground' }].map((link) => (
            <a key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</a>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
