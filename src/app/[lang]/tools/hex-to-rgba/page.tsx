'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'HEX to RGBA Converter', description: 'Convert HEX color codes to RGBA format with adjustable alpha transparency. Live preview, instant output, runs in your browser.', inputLabel: 'HEX Color', outputLabel: 'RGBA Output', hexPlaceholder: '#3b82f6', alphaLabel: 'Alpha:', convert: 'Convert', clear: 'Clear', copyLabel: 'Copy RGBA', previewLabel: 'Preview', introTitle: 'Free Online HEX to RGBA Converter', introText: 'Enter a HEX color code and adjust the alpha slider to get the RGBA equivalent. See a live preview of the color with transparency applied. All processing runs in your browser.', howTitle: 'How to Convert HEX to RGBA', step1: 'Enter a HEX color code (with or without #)', step2: 'Adjust the alpha slider for transparency (0-1)', step3: 'See the live color preview and RGBA output', step4: 'Click Copy to use the RGBA value in your CSS', featuresTitle: 'Features', feature1: 'Supports 3-digit (#RGB), 6-digit (#RRGGBB), and 8-digit (#RRGGBBAA) HEX codes', feature2: 'Adjustable alpha transparency slider from 0 to 1', feature3: 'Live color preview with checkerboard background for transparency', feature4: 'Outputs CSS-ready rgba() function syntax', feature5: 'Also shows HSL and RGB values for reference', faqTitle: 'Frequently Asked Questions', faq1q: 'What is the difference between HEX and RGBA?', faq1a: 'HEX colors use hexadecimal notation (#RRGGBB) with 6 characters representing red, green, and blue channels. RGBA adds an alpha channel (0-1) for transparency control, written as rgba(R, G, B, A) in CSS.', faq2q: 'How does the alpha value work in RGBA?', faq2a: 'The alpha value ranges from 0 (fully transparent) to 1 (fully opaque). For example, rgba(59, 130, 246, 0.5) makes the blue color 50% transparent.', faq3q: 'Can I use 8-digit HEX codes?', faq3a: 'Yes! 8-digit HEX codes (#RRGGBBAA) include alpha in the last two digits. The converter will extract the alpha value and include it in the RGBA output.', faq4q: 'Is my data sent to a server?', faq4a: 'No. All color conversion happens in your browser using JavaScript. No data is transmitted.', faq5q: 'What CSS color formats are supported?', faq5a: 'This tool converts HEX to RGBA. For other conversions, check our related color tools including HEX to RGB, HSL converter, and more.', relatedTitle: 'Related Tools', errorInvalid: 'Invalid HEX color code' },
  zh: { title: 'HEX 转 RGBA 转换器', description: '将 HEX 颜色代码转换为带可调透明度的 RGBA 格式。实时预览，即时输出。', inputLabel: 'HEX 颜色', outputLabel: 'RGBA 输出', hexPlaceholder: '#3b82f6', alphaLabel: '透明度：', convert: '转换', clear: '清除', copyLabel: '复制 RGBA', previewLabel: '预览', introTitle: '免费在线 HEX 转 RGBA 转换器', introText: '输入 HEX 颜色代码并调整 Alpha 滑块获取 RGBA 等效值。实时预览颜色透明度效果。', howTitle: '如何将 HEX 转换为 RGBA', step1: '输入 HEX 颜色代码', step2: '调整 Alpha 滑块设置透明度', step3: '查看实时颜色预览和 RGBA 输出', step4: '点击复制在 CSS 中使用', featuresTitle: '功能', feature1: '支持 3 位、6 位和 8 位 HEX 代码', feature2: '可调 Alpha 透明度滑块 (0-1)', feature3: '棋盘格背景的实时颜色预览', feature4: '输出 CSS rgba() 函数语法', feature5: '同时显示 HSL 和 RGB 值', faqTitle: '常见问题', faq1q: 'HEX 和 RGBA 有什么区别？', faq1a: 'HEX 使用十六进制表示法，RGBA 添加了 Alpha 通道用于控制透明度。', faq2q: 'Alpha 值如何工作？', faq2a: 'Alpha 值从 0（完全透明）到 1（完全不透明）。', faq3q: '可以使用 8 位 HEX 代码吗？', faq3a: '可以！8 位 HEX 代码最后两位包含 Alpha 值。', faq4q: '数据会发送到服务器吗？', faq4a: '不会。所有颜色转换在浏览器中进行。', faq5q: '支持哪些 CSS 颜色格式？', faq5a: '本工具将 HEX 转换为 RGBA。其他格式请查看相关颜色工具。', relatedTitle: '相关工具', errorInvalid: 'HEX 颜色代码无效' },
  ja: { title: 'HEX to RGBA 変換ツール', description: 'HEXカラーコードを調整可能なアルファ透明度付きRGBA形式に変換。ライブプレビュー。', inputLabel: 'HEXカラー', outputLabel: 'RGBA出力', hexPlaceholder: '#3b82f6', alphaLabel: 'アルファ：', convert: '変換', clear: 'クリア', copyLabel: 'RGBAコピー', previewLabel: 'プレビュー', introTitle: '無料 HEX to RGBA 変換ツール', introText: 'HEXカラーコードを入力してアルファスライダーでRGBA値を取得。', howTitle: 'HEXをRGBAに変換する方法', step1: 'HEXカラーコードを入力', step2: 'アルファスライダーで透明度を調整', step3: 'ライブプレビューとRGBA出力を確認', step4: 'コピーしてCSSで使用', featuresTitle: '機能', feature1: '3桁・6桁・8桁HEXコード対応', feature2: 'アルファ透明度スライダー(0-1)', feature3: 'チェッカーボード背景のライブプレビュー', feature4: 'CSS rgba()関数構文出力', feature5: 'HSL/RGB値も表示', faqTitle: 'よくある質問', faq1q: 'HEXとRGBAの違いは？', faq1a: 'HEXは16進表記、RGBAはアルファチャンネルで透明度を制御します。', faq2q: 'アルファ値の仕組みは？', faq2a: '0(完全透明)から1(完全不透明)です。', faq3q: '8桁HEXコードは使えますか？', faq3a: 'はい！最後の2桁がアルファ値です。', faq4q: 'データは送信されますか？', faq4a: 'いいえ。すべてブラウザ内です。', faq5q: '対応CSSカラー形式は？', faq5a: 'HEXからRGBA変換です。他は関連ツールをご覧ください。', relatedTitle: '関連ツール', errorInvalid: '無効なHEXカラーコード' },
  ko: { title: 'HEX to RGBA 변환기', description: 'HEX 색상 코드를 조절 가능한 알파 투명도가 있는 RGBA 형식으로 변환.', inputLabel: 'HEX 색상', outputLabel: 'RGBA 출력', hexPlaceholder: '#3b82f6', alphaLabel: '알파:', convert: '변환', clear: '지우기', copyLabel: 'RGBA 복사', previewLabel: '미리보기', introTitle: '무료 HEX to RGBA 변환기', introText: 'HEX 색상 코드를 입력하고 알파 슬라이더로 RGBA 값을 얻으세요.', howTitle: 'HEX를 RGBA로 변환하는 방법', step1: 'HEX 색상 코드 입력', step2: '알파 슬라이더로 투명도 조절', step3: '실시간 미리보기와 RGBA 출력 확인', step4: '복사하여 CSS에서 사용', featuresTitle: '기능', feature1: '3자리/6자리/8자리 HEX 코드 지원', feature2: '알파 투명도 슬라이더(0-1)', feature3: '체커보드 배경 실시간 미리보기', feature4: 'CSS rgba() 함수 구문 출력', feature5: 'HSL/RGB 값도 표시', faqTitle: 'FAQ', faq1q: 'HEX와 RGBA의 차이는?', faq1a: 'HEX는 16진수 표기, RGBA는 알파 채널로 투명도를 제어합니다.', faq2q: '알파 값은 어떻게 작동하나요?', faq2a: '0(완전 투명)에서 1(완전 불투명)입니다.', faq3q: '8자리 HEX 코드를 사용할 수 있나요?', faq3a: '네! 마지막 2자리가 알파 값입니다.', faq4q: '데이터가 서버로 전송되나요?', faq4a: '아니요. 모두 브라우저 내에서 처리됩니다.', faq5q: '지원되는 CSS 색상 형식은?', faq5a: 'HEX에서 RGBA 변환입니다. 다른 형식은 관련 도구를 확인하세요.', relatedTitle: '관련 도구', errorInvalid: '유효하지 않은 HEX 색상 코드' },
  fr: { title: 'Convertisseur HEX vers RGBA', description: 'Convertissez les codes HEX en RGBA avec transparence alpha. Apercu en direct.', inputLabel: 'Couleur HEX', outputLabel: 'Sortie RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'Alpha :', convert: 'Convertir', clear: 'Effacer', copyLabel: 'Copier RGBA', previewLabel: 'Apercu', introTitle: 'Convertisseur HEX vers RGBA Gratuit', introText: 'Entrez un code HEX et ajustez le curseur alpha pour obtenir la valeur RGBA.', howTitle: 'Comment convertir', step1: 'Entrez le code HEX', step2: 'Ajustez le curseur alpha', step3: "Voyez l'apercu et la sortie RGBA", step4: 'Copiez pour utiliser en CSS', featuresTitle: 'Fonctionnalites', feature1: 'Support HEX 3, 6 et 8 chiffres', feature2: 'Curseur alpha (0-1)', feature3: 'Apercu en direct', feature4: 'Sortie rgba() CSS', feature5: 'Valeurs HSL/RGB aussi', faqTitle: 'FAQ', faq1q: 'Difference entre HEX et RGBA ?', faq1a: 'HEX utilise la notation hexadecimale, RGBA ajoute un canal alpha.', faq2q: "Comment fonctionne l'alpha ?", faq2a: 'De 0 (transparent) a 1 (opaque).', faq3q: 'HEX 8 chiffres ?', faq3a: 'Oui ! Les 2 derniers chiffres sont alpha.', faq4q: 'Donnees envoyees ?', faq4a: 'Non, tout dans le navigateur.', faq5q: 'Formats CSS supportes ?', faq5a: 'HEX vers RGBA. Voir outils connexes.', relatedTitle: 'Outils connexes', errorInvalid: 'Code HEX invalide' },
  de: { title: 'HEX zu RGBA Konverter', description: 'HEX-Farbcodes in RGBA mit Alpha-Transparenz konvertieren.', inputLabel: 'HEX Farbe', outputLabel: 'RGBA Ausgabe', hexPlaceholder: '#3b82f6', alphaLabel: 'Alpha:', convert: 'Konvertieren', clear: 'Leeren', copyLabel: 'RGBA kopieren', previewLabel: 'Vorschau', introTitle: 'Kostenloser HEX zu RGBA Konverter', introText: 'HEX-Farbcode eingeben und Alpha-Regler fuer RGBA-Wert anpassen.', howTitle: 'Konvertierung', step1: 'HEX-Code eingeben', step2: 'Alpha-Regler anpassen', step3: 'Vorschau und RGBA-Ausgabe sehen', step4: 'Kopieren fuer CSS', featuresTitle: 'Funktionen', feature1: '3/6/8-stellige HEX-Codes', feature2: 'Alpha-Regler (0-1)', feature3: 'Live-Vorschau', feature4: 'CSS rgba() Ausgabe', feature5: 'HSL/RGB auch', faqTitle: 'FAQ', faq1q: 'Unterschied HEX und RGBA?', faq1a: 'HEX nutzt Hex-Notation, RGBA fuegt Alpha-Kanal hinzu.', faq2q: 'Wie funktioniert Alpha?', faq2a: '0 (transparent) bis 1 (opak).', faq3q: '8-stellige HEX-Codes?', faq3a: 'Ja! Letzte 2 Stellen sind Alpha.', faq4q: 'Daten gesendet?', faq4a: 'Nein, alles im Browser.', faq5q: 'CSS-Formate?', faq5a: 'HEX zu RGBA. Siehe verwandte Tools.', relatedTitle: 'Verwandte Tools', errorInvalid: 'Ungueltiger HEX-Code' },
  es: { title: 'Convertidor HEX a RGBA', description: 'Convierte codigos HEX a RGBA con transparencia alfa.', inputLabel: 'Color HEX', outputLabel: 'Salida RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'Alfa:', convert: 'Convertir', clear: 'Limpiar', copyLabel: 'Copiar RGBA', previewLabel: 'Vista previa', introTitle: 'Convertidor HEX a RGBA Gratis', introText: 'Ingresa un codigo HEX y ajusta el control alfa para obtener el valor RGBA.', howTitle: 'Como convertir', step1: 'Ingresa el codigo HEX', step2: 'Ajusta el control alfa', step3: 'Ve la vista previa y salida RGBA', step4: 'Copia para usar en CSS', featuresTitle: 'Caracteristicas', feature1: 'Soporte HEX 3/6/8 digitos', feature2: 'Control alfa (0-1)', feature3: 'Vista previa en vivo', feature4: 'Salida rgba() CSS', feature5: 'Valores HSL/RGB tambien', faqTitle: 'FAQ', faq1q: 'Diferencia entre HEX y RGBA?', faq1a: 'HEX usa notacion hexadecimal, RGBA agrega canal alfa.', faq2q: 'Como funciona alfa?', faq2a: 'De 0 (transparente) a 1 (opaco).', faq3q: 'HEX 8 digitos?', faq3a: 'Si! Ultimos 2 digitos son alfa.', faq4q: 'Datos enviados?', faq4a: 'No, todo en el navegador.', faq5q: 'Formatos CSS?', faq5a: 'HEX a RGBA. Ver herramientas relacionadas.', relatedTitle: 'Herramientas relacionadas', errorInvalid: 'Codigo HEX invalido' },
  pt: { title: 'Conversor HEX para RGBA', description: 'Converta codigos HEX para RGBA com transparencia alfa.', inputLabel: 'Cor HEX', outputLabel: 'Saida RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'Alfa:', convert: 'Converter', clear: 'Limpar', copyLabel: 'Copiar RGBA', previewLabel: 'Preview', introTitle: 'Conversor HEX para RGBA Gratis', introText: 'Insira um codigo HEX e ajuste o controle alfa para obter o valor RGBA.', howTitle: 'Como converter', step1: 'Insira o codigo HEX', step2: 'Ajuste o controle alfa', step3: 'Veja o preview e saida RGBA', step4: 'Copie para usar no CSS', featuresTitle: 'Recursos', feature1: 'Suporte HEX 3/6/8 digitos', feature2: 'Controle alfa (0-1)', feature3: 'Preview em tempo real', feature4: 'Saida rgba() CSS', feature5: 'Valores HSL/RGB tambem', faqTitle: 'FAQ', faq1q: 'Diferenca entre HEX e RGBA?', faq1a: 'HEX usa notacao hexadecimal, RGBA adiciona canal alfa.', faq2q: 'Como funciona alfa?', faq2a: 'De 0 (transparente) a 1 (opaco).', faq3q: 'HEX 8 digitos?', faq3a: 'Sim! Ultimos 2 digitos sao alfa.', faq4q: 'Dados enviados?', faq4a: 'Nao, tudo no navegador.', faq5q: 'Formatos CSS?', faq5a: 'HEX para RGBA. Veja ferramentas relacionadas.', relatedTitle: 'Ferramentas relacionadas', errorInvalid: 'Codigo HEX invalido' },
  it: { title: 'Convertitore HEX in RGBA', description: 'Converti codici HEX in RGBA con trasparenza alfa.', inputLabel: 'Colore HEX', outputLabel: 'Output RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'Alpha:', convert: 'Converti', clear: 'Cancella', copyLabel: 'Copia RGBA', previewLabel: 'Anteprima', introTitle: 'Convertitore HEX in RGBA Gratuito', introText: 'Inserisci un codice HEX e regola il cursore alfa per ottenere il valore RGBA.', howTitle: 'Come convertire', step1: 'Inserisci il codice HEX', step2: 'Regola il cursore alfa', step3: "Vedi l'anteprima e l'output RGBA", step4: 'Copia per usare nel CSS', featuresTitle: 'Funzionalita', feature1: 'Supporto HEX 3/6/8 cifre', feature2: 'Cursore alfa (0-1)', feature3: 'Anteprima in tempo reale', feature4: 'Output rgba() CSS', feature5: 'Valori HSL/RGB anche', faqTitle: 'FAQ', faq1q: 'Differenza tra HEX e RGBA?', faq1a: 'HEX usa notazione esadecimale, RGBA aggiunge canale alfa.', faq2q: 'Come funziona alfa?', faq2a: 'Da 0 (trasparente) a 1 (opaco).', faq3q: 'HEX 8 cifre?', faq3a: 'Si! Ultime 2 cifre sono alfa.', faq4q: 'Dati inviati?', faq4a: 'No, tutto nel browser.', faq5q: 'Formati CSS?', faq5a: 'HEX a RGBA. Vedi strumenti correlati.', relatedTitle: 'Strumenti correlati', errorInvalid: 'Codice HEX non valido' },
  nl: { title: 'HEX naar RGBA Converter', description: 'Converteer HEX-kleurcodes naar RGBA met alfa-transparantie.', inputLabel: 'HEX Kleur', outputLabel: 'RGBA Uitvoer', hexPlaceholder: '#3b82f6', alphaLabel: 'Alpha:', convert: 'Converteren', clear: 'Wissen', copyLabel: 'RGBA kopieren', previewLabel: 'Voorbeeld', introTitle: 'Gratis HEX naar RGBA Converter', introText: 'Voer een HEX-kleurcode in en pas de alfa-schuifregelaar aan.', howTitle: 'Hoe te converteren', step1: 'Voer HEX-code in', step2: 'Pas alfa aan', step3: 'Bekijk voorbeeld en RGBA', step4: 'Kopieer voor CSS', featuresTitle: 'Functies', feature1: '3/6/8-cijferige HEX-codes', feature2: 'Alfa-schuif (0-1)', feature3: 'Live voorbeeld', feature4: 'CSS rgba() uitvoer', feature5: 'HSL/RGB ook', faqTitle: 'FAQ', faq1q: 'Verschil HEX en RGBA?', faq1a: 'HEX gebruikt hex-notatie, RGBA voegt alfa-kanaal toe.', faq2q: 'Hoe werkt alfa?', faq2a: '0 (transparant) tot 1 (ondoorzichtig).', faq3q: '8-cijferige HEX?', faq3a: 'Ja! Laatste 2 cijfers zijn alfa.', faq4q: 'Data verzonden?', faq4a: 'Nee, alles in de browser.', faq5q: 'CSS-formaten?', faq5a: 'HEX naar RGBA. Zie gerelateerde tools.', relatedTitle: 'Gerelateerde tools', errorInvalid: 'Ongeldige HEX-code' },
  pl: { title: 'Konwerter HEX na RGBA', description: 'Konwertuj kody HEX na RGBA z przezroczystoscia alfa.', inputLabel: 'Kolor HEX', outputLabel: 'Wyjscie RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'Alfa:', convert: 'Konwertuj', clear: 'Wyczysc', copyLabel: 'Kopiuj RGBA', previewLabel: 'Podglad', introTitle: 'Darmowy Konwerter HEX na RGBA', introText: 'Wpisz kod HEX i dostosuj suwak alfa.', howTitle: 'Jak konwertowac', step1: 'Wpisz kod HEX', step2: 'Dostosuj suwak alfa', step3: 'Zobacz podglad i RGBA', step4: 'Kopiuj do CSS', featuresTitle: 'Funkcje', feature1: 'Kody HEX 3/6/8 cyfr', feature2: 'Suwak alfa (0-1)', feature3: 'Podglad na zywo', feature4: 'Wyjscie CSS rgba()', feature5: 'Wartosci HSL/RGB tez', faqTitle: 'FAQ', faq1q: 'Roznica HEX i RGBA?', faq1a: 'HEX uzywa notacji szesnastkowej, RGBA dodaje kanal alfa.', faq2q: 'Jak dziala alfa?', faq2a: '0 (przezroczysty) do 1 (nieprzezroczysty).', faq3q: '8-cyfrowy HEX?', faq3a: 'Tak! Ostatnie 2 cyfry to alfa.', faq4q: 'Dane wysylane?', faq4a: 'Nie, wszystko w przegladarce.', faq5q: 'Formaty CSS?', faq5a: 'HEX na RGBA. Zobacz powiazane.', relatedTitle: 'Powiazane narzedzia', errorInvalid: 'Nieprawidlowy kod HEX' },
  sv: { title: 'HEX till RGBA Konverterare', description: 'Konvertera HEX-fargkoder till RGBA med alfa-transparens.', inputLabel: 'HEX Faerg', outputLabel: 'RGBA Utdata', hexPlaceholder: '#3b82f6', alphaLabel: 'Alfa:', convert: 'Konvertera', clear: 'Rensa', copyLabel: 'Kopiera RGBA', previewLabel: 'Foerhandsvisning', introTitle: 'Gratis HEX till RGBA Konverterare', introText: 'Ange en HEX-faergkod och justera alfa-reglaget.', howTitle: 'Hur man konverterar', step1: 'Ange HEX-kod', step2: 'Justera alfa', step3: 'Se foerhandsvisning och RGBA', step4: 'Kopiera foer CSS', featuresTitle: 'Funktioner', feature1: '3/6/8-siffriga HEX-koder', feature2: 'Alfa-reglage (0-1)', feature3: 'Live-foerhandsvisning', feature4: 'CSS rgba() utdata', feature5: 'HSL/RGB ocksaa', faqTitle: 'FAQ', faq1q: 'Skillnad HEX och RGBA?', faq1a: 'HEX anvaender hex-notation, RGBA laegger till alfa-kanal.', faq2q: 'Hur fungerar alfa?', faq2a: '0 (transparent) till 1 (opak).', faq3q: '8-siffrig HEX?', faq3a: 'Ja! Sista 2 siffrorna aer alfa.', faq4q: 'Data skickad?', faq4a: 'Nej, allt i webblaasaren.', faq5q: 'CSS-format?', faq5a: 'HEX till RGBA. Se relaterade verktyg.', relatedTitle: 'Relaterade verktyg', errorInvalid: 'Ogiltig HEX-kod' },
  no: { title: 'HEX til RGBA Konverterer', description: 'Konverter HEX-fargekoder til RGBA med alfa-gjennomsiktighet.', inputLabel: 'HEX Farge', outputLabel: 'RGBA Utdata', hexPlaceholder: '#3b82f6', alphaLabel: 'Alfa:', convert: 'Konverter', clear: 'Toom', copyLabel: 'Kopier RGBA', previewLabel: 'Forhåndsvisning', introTitle: 'Gratis HEX til RGBA Konverterer', introText: 'Skriv inn en HEX-fargekode og juster alfa-glidebryteren.', howTitle: 'Slik konverterer du', step1: 'Skriv inn HEX-kode', step2: 'Juster alfa', step3: 'Se forhandsvisning og RGBA', step4: 'Kopier for CSS', featuresTitle: 'Funksjoner', feature1: '3/6/8-sifrede HEX-koder', feature2: 'Alfa-glidebryter (0-1)', feature3: 'Live forhandsvisning', feature4: 'CSS rgba() utdata', feature5: 'HSL/RGB ogsa', faqTitle: 'FAQ', faq1q: 'Forskjell HEX og RGBA?', faq1a: 'HEX bruker hex-notasjon, RGBA legger til alfa-kanal.', faq2q: 'Hvordan fungerer alfa?', faq2a: '0 (gjennomsiktig) til 1 (ugjennomsiktig).', faq3q: '8-sifret HEX?', faq3a: 'Ja! Siste 2 siffer er alfa.', faq4q: 'Data sendt?', faq4a: 'Nei, alt i nettleseren.', faq5q: 'CSS-formater?', faq5a: 'HEX til RGBA. Se relaterte verktoy.', relatedTitle: 'Relaterte verktoy', errorInvalid: 'Ugyldig HEX-kode' },
  id: { title: 'Konverter HEX ke RGBA', description: 'Konversi kode warna HEX ke RGBA dengan transparansi alfa.', inputLabel: 'Warna HEX', outputLabel: 'Output RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'Alfa:', convert: 'Konversi', clear: 'Hapus', copyLabel: 'Salin RGBA', previewLabel: 'Pratinjau', introTitle: 'Konverter HEX ke RGBA Gratis', introText: 'Masukkan kode HEX dan sesuaikan slider alfa.', howTitle: 'Cara konversi', step1: 'Masukkan kode HEX', step2: 'Sesuaikan alfa', step3: 'Lihat pratinjau dan RGBA', step4: 'Salin untuk CSS', featuresTitle: 'Fitur', feature1: 'Kode HEX 3/6/8 digit', feature2: 'Slider alfa (0-1)', feature3: 'Pratinjau langsung', feature4: 'Output CSS rgba()', feature5: 'Nilai HSL/RGB juga', faqTitle: 'FAQ', faq1q: 'Beda HEX dan RGBA?', faq1a: 'HEX pakai notasi heksadesimal, RGBA tambah kanal alfa.', faq2q: 'Bagaimana alfa bekerja?', faq2a: '0 (transparan) sampai 1 (buram).', faq3q: 'HEX 8 digit?', faq3a: 'Ya! 2 digit terakhir adalah alfa.', faq4q: 'Data dikirim?', faq4a: 'Tidak, semua di browser.', faq5q: 'Format CSS?', faq5a: 'HEX ke RGBA. Lihat alat terkait.', relatedTitle: 'Alat terkait', errorInvalid: 'Kode HEX tidak valid' },
  th: { title: 'ตัวแปลง HEX เป็น RGBA', description: 'แปลงรหัสสี HEX เป็น RGBA พร้อมความโปร่งใสอัลฟ่า', inputLabel: 'สี HEX', outputLabel: 'เอาต์พุต RGBA', hexPlaceholder: '#3b82f6', alphaLabel: 'อัลฟ่า:', convert: 'แปลง', clear: 'ล้าง', copyLabel: 'คัดลอก RGBA', previewLabel: 'ตัวอย่าง', introTitle: 'ตัวแปลง HEX เป็น RGBA ฟรี', introText: 'ป้อนรหัสสี HEX และปรับตัวเลื่อนอัลฟ่า', howTitle: 'วิธีแปลง', step1: 'ป้อนรหัส HEX', step2: 'ปรับอัลฟ่า', step3: 'ดูตัวอย่างและ RGBA', step4: 'คัดลอกไปใช้ใน CSS', featuresTitle: 'คุณสมบัติ', feature1: 'รหัส HEX 3/6/8 หลัก', feature2: 'ตัวเลื่อนอัลฟ่า (0-1)', feature3: 'ตัวอย่างสด', feature4: 'เอาต์พุต CSS rgba()', feature5: 'ค่า HSL/RGB ด้วย', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'HEX กับ RGBA ต่างกันอย่างไร?', faq1a: 'HEX ใช้เลขฐานสิบหก RGBA เพิ่มช่องอัลฟ่า', faq2q: 'อัลฟ่าทำงานอย่างไร?', faq2a: '0 (โปร่งใส) ถึง 1 (ทึบ)', faq3q: 'HEX 8 หลักได้ไหม?', faq3a: 'ได้! 2 หลักสุดท้ายคืออัลฟ่า', faq4q: 'ข้อมูลถูกส่งไปไหม?', faq4a: 'ไม่ ทุกอย่างในเบราว์เซอร์', faq5q: 'รูปแบบ CSS?', faq5a: 'HEX เป็น RGBA ดูเครื่องมือที่เกี่ยวข้อง', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorInvalid: 'รหัส HEX ไม่ถูกต้อง' },
};

function parseHex(hex: string): { r: number; g: number; b: number; a: number } | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  if (h.length === 4) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];
  if (h.length === 6) h += 'ff';
  if (h.length !== 8 || !/^[0-9a-fA-F]{8}$/.test(h)) return null;
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16), a: parseInt(h.slice(6,8),16)/255 };
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rr = r/255, gg = g/255, bb = b/255;
  const max = Math.max(rr,gg,bb), min = Math.min(rr,gg,bb);
  const l = (max+min)/2;
  if (max === min) return [0, 0, Math.round(l*100)];
  const d = max - min;
  const s = l > 0.5 ? d/(2-max-min) : d/(max+min);
  let h = 0;
  if (max === rr) h = ((gg-bb)/d + (gg<bb?6:0))/6;
  else if (max === gg) h = ((bb-rr)/d+2)/6;
  else h = ((rr-gg)/d+4)/6;
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

export default function HexToRgbaConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [hex, setHex] = useState('#3b82f6');
  const [alpha, setAlpha] = useState(1);
  const [error, setError] = useState('');

  const parsed = parseHex(hex);
  const r = parsed?.r ?? 0, g = parsed?.g ?? 0, b = parsed?.b ?? 0;
  const rgbaStr = parsed ? `rgba(${r}, ${g}, ${b}, ${alpha})` : '';
  const rgbStr = parsed ? `rgb(${r}, ${g}, ${b})` : '';
  const [h, s, l] = parsed ? rgbToHsl(r, g, b) : [0, 0, 0];
  const hslStr = parsed ? `hsl(${h}, ${s}%, ${l}%)` : '';

  const handleHexChange = useCallback((val: string) => {
    setHex(val);
    setError(val.trim() && !parseHex(val) ? t.errorInvalid : '');
  }, [t]);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
    { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
    { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
  ]};

  return (
    <ToolLayout title={t.title} description={t.description} toolId="hex-to-rgba">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <input type="text" value={hex} onChange={(e) => handleHexChange(e.target.value)} placeholder={t.hexPlaceholder} style={{ width: '100%', padding: '10px 14px', fontSize: 14, fontFamily: 'monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }} />
          {error && <div style={{ color: 'var(--accent-rose,#f43f5e)', fontSize: 12, marginTop: 6 }}>{error}</div>}

          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.alphaLabel} {alpha.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} style={{ width: '100%', marginTop: 4 }} />
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.previewLabel}</label>
            <div style={{ position: 'relative', width: '100%', height: 100, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)', backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', backgroundSize: '16px 16px', backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: parsed ? rgbaStr : 'transparent' }} />
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.outputLabel}</label>
          {parsed ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>RGBA</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: 14, fontFamily: 'monospace' }}>{rgbaStr}</code>
                  <CopyButton text={rgbaStr} label={t.copyLabel} />
                </div>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>RGB</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: 14, fontFamily: 'monospace' }}>{rgbStr}</code>
                  <CopyButton text={rgbStr} label={t.copyLabel} />
                </div>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>HSL</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: 14, fontFamily: 'monospace' }}>{hslStr}</code>
                  <CopyButton text={hslStr} label={t.copyLabel} />
                </div>
              </div>
              <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>R / G / B / A</div>
                <code style={{ fontSize: 14, fontFamily: 'monospace' }}>{r} / {g} / {b} / {alpha.toFixed(2)}</code>
              </div>
            </div>
          ) : <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 13 }}>Enter a valid HEX color</div>}
        </div>
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
          {[{ q: t.faq1q, a: t.faq1a },{ q: t.faq2q, a: t.faq2a },{ q: t.faq3q, a: t.faq3a },{ q: t.faq4q, a: t.faq4a },{ q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/hex-to-rgb`, label: 'HEX to RGB' },{ href: `/${lang}/tools/color-picker-online`, label: 'Color Picker' },{ href: `/${lang}/tools/css-gradient-generator`, label: 'CSS Gradient Generator' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
