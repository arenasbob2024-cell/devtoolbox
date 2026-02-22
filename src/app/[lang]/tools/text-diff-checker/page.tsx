'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Text Diff Checker',
    description: 'Compare two texts side by side and highlight differences. See added, removed, and unchanged lines with a clear visual diff output.',
    originalLabel: 'Original Text',
    modifiedLabel: 'Modified Text',
    originalPlaceholder: 'Paste original text here...',
    modifiedPlaceholder: 'Paste modified text here...',
    compareBtn: 'Compare',
    clearBtn: 'Clear',
    swapBtn: 'Swap',
    added: 'Added',
    removed: 'Removed',
    unchanged: 'Unchanged',
    diffOutput: 'Diff Output',
    copyDiff: 'Copy Diff',
    emptyState: 'Paste two texts and click Compare to see differences',
    introTitle: 'Free Online Text Diff Checker',
    introText: 'Compare two blocks of text and instantly see the differences highlighted line by line. This tool performs a line-by-line comparison showing added lines in green, removed lines in red, and unchanged lines in their original form. Perfect for comparing code versions, document revisions, configuration files, and more. All processing happens in your browser.',
    howTitle: 'How to Compare Texts',
    step1: 'Paste the original text in the left panel',
    step2: 'Paste the modified text in the right panel',
    step3: 'Click Compare to generate the diff',
    step4: 'Review highlighted differences and copy the diff output',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does the text comparison work?',
    faq1a: 'The tool performs a line-by-line diff using the Longest Common Subsequence (LCS) algorithm. Lines present only in the original are marked as removed (red), lines only in the modified version are marked as added (green), and matching lines remain unchanged.',
    faq2q: 'Can I compare code with this tool?',
    faq2a: 'Yes, this tool works great for comparing code, configuration files, JSON, XML, YAML, and any other text-based content. The monospace font and line numbers make it easy to review code differences.',
    faq3q: 'Is there a size limit?',
    faq3a: 'There is no hard limit, but very large texts (over 100,000 lines) may slow down your browser since all processing happens client-side. For most use cases, performance is instant.',
    faq4q: 'Is my data safe?',
    faq4a: 'Absolutely. All comparison is done entirely in your browser using JavaScript. No text data is ever sent to any server. Your content remains completely private.',
    faq5q: 'Can I copy the diff output?',
    faq5a: 'Yes, use the Copy Diff button to copy the unified diff output in a standard format with + and - prefixes, ready to share or save.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '文本差异对比',
    description: '并排比较两段文本并高亮差异。查看添加、删除和未更改的行。',
    originalLabel: '原始文本', modifiedLabel: '修改后文本',
    originalPlaceholder: '在此粘贴原始文本...', modifiedPlaceholder: '在此粘贴修改后文本...',
    compareBtn: '比较', clearBtn: '清除', swapBtn: '交换',
    added: '添加', removed: '删除', unchanged: '未变',
    diffOutput: '差异输出', copyDiff: '复制差异',
    emptyState: '粘贴两段文本并点击比较以查看差异',
    introTitle: '免费在线文本差异对比工具', introText: '逐行比较两段文本并即时高亮显示差异。适用于比较代码版本、文档修订和配置文件。所有处理在浏览器中完成。',
    howTitle: '如何比较文本', step1: '在左侧粘贴原始文本', step2: '在右侧粘贴修改后文本', step3: '点击比较生成差异', step4: '查看高亮差异并复制输出',
    faqTitle: '常见问题',
    faq1q: '比较如何工作？', faq1a: '使用逐行差异算法比较。仅在原始文本中的行标记为删除，仅在修改版本中的行标记为添加。',
    faq2q: '可以比较代码吗？', faq2a: '可以，适用于代码、配置文件、JSON、XML 等任何文本内容。',
    faq3q: '有大小限制吗？', faq3a: '没有硬性限制，但超大文本可能影响浏览器性能。',
    faq4q: '数据安全吗？', faq4a: '完全安全，所有比较在浏览器中完成，不会发送到服务器。',
    faq5q: '可以复制差异输出吗？', faq5a: '可以，使用复制按钮即可复制标准格式的差异输出。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'テキスト差分チェッカー', description: '2つのテキストを並べて比較し差分をハイライト。',
    originalLabel: '元のテキスト', modifiedLabel: '変更後テキスト',
    originalPlaceholder: '元のテキストを貼り付け...', modifiedPlaceholder: '変更後テキストを貼り付け...',
    compareBtn: '比較', clearBtn: 'クリア', swapBtn: '入替',
    added: '追加', removed: '削除', unchanged: '変更なし',
    diffOutput: '差分出力', copyDiff: '差分をコピー',
    emptyState: '2つのテキストを貼り付けて比較をクリック',
    introTitle: '無料テキスト差分チェッカー', introText: '2つのテキストを行ごとに比較し差分をハイライト表示します。',
    howTitle: '使い方', step1: '左に元のテキストを貼り付け', step2: '右に変更後テキストを貼り付け', step3: '比較をクリック', step4: '差分を確認してコピー',
    faqTitle: 'よくある質問',
    faq1q: 'どう比較する？', faq1a: '行ごとの差分アルゴリズムで比較します。',
    faq2q: 'コードも比較できる？', faq2a: 'はい、あらゆるテキストに対応しています。',
    faq3q: 'サイズ制限は？', faq3a: '特にありませんが、非常に大きなテキストはブラウザが遅くなる場合があります。',
    faq4q: 'データは安全？', faq4a: 'はい、すべてブラウザ内で処理されます。',
    faq5q: '差分をコピーできる？', faq5a: 'はい、コピーボタンで標準形式の差分を取得できます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '텍스트 비교 도구', description: '두 텍스트를 나란히 비교하고 차이점을 강조 표시합니다.',
    originalLabel: '원본 텍스트', modifiedLabel: '수정된 텍스트',
    originalPlaceholder: '원본 텍스트를 붙여넣기...', modifiedPlaceholder: '수정된 텍스트를 붙여넣기...',
    compareBtn: '비교', clearBtn: '지우기', swapBtn: '교환',
    added: '추가', removed: '삭제', unchanged: '변경 없음',
    diffOutput: '비교 결과', copyDiff: '결과 복사',
    emptyState: '두 텍스트를 붙여넣고 비교를 클릭하세요',
    introTitle: '무료 텍스트 비교 도구', introText: '두 텍스트를 줄 단위로 비교하고 차이점을 즉시 강조 표시합니다.',
    howTitle: '사용 방법', step1: '왼쪽에 원본 텍스트 붙여넣기', step2: '오른쪽에 수정된 텍스트 붙여넣기', step3: '비교 클릭', step4: '차이점 확인 후 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: '비교는 어떻게 작동하나요?', faq1a: '줄 단위 비교 알고리즘을 사용합니다.',
    faq2q: '코드도 비교할 수 있나요?', faq2a: '네, 모든 텍스트에 사용할 수 있습니다.',
    faq3q: '크기 제한이 있나요?', faq3a: '특별한 제한은 없지만 매우 큰 텍스트는 느려질 수 있습니다.',
    faq4q: '데이터가 안전한가요?', faq4a: '네, 모든 처리가 브라우저에서 이루어집니다.',
    faq5q: '결과를 복사할 수 있나요?', faq5a: '네, 복사 버튼으로 표준 형식의 비교 결과를 얻을 수 있습니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Comparateur de Texte', description: 'Comparez deux textes cote a cote et mettez en evidence les differences.',
    originalLabel: 'Texte original', modifiedLabel: 'Texte modifie',
    originalPlaceholder: 'Collez le texte original...', modifiedPlaceholder: 'Collez le texte modifie...',
    compareBtn: 'Comparer', clearBtn: 'Effacer', swapBtn: 'Echanger',
    added: 'Ajoute', removed: 'Supprime', unchanged: 'Inchange',
    diffOutput: 'Resultat', copyDiff: 'Copier', emptyState: 'Collez deux textes et cliquez Comparer',
    introTitle: 'Comparateur de texte gratuit', introText: 'Comparez deux textes ligne par ligne et voyez les differences instantanement.',
    howTitle: 'Comment comparer', step1: 'Collez le texte original a gauche', step2: 'Collez le texte modifie a droite', step3: 'Cliquez Comparer', step4: 'Examinez les differences',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne la comparaison?', faq1a: 'Comparaison ligne par ligne avec algorithme LCS.',
    faq2q: 'Peut-on comparer du code?', faq2a: 'Oui, pour tout contenu textuel.',
    faq3q: 'Y a-t-il une limite?', faq3a: 'Pas de limite stricte, mais les tres grands textes peuvent ralentir.',
    faq4q: 'Mes donnees sont securisees?', faq4a: 'Oui, tout se passe dans votre navigateur.',
    faq5q: 'Peut-on copier le resultat?', faq5a: 'Oui, avec le bouton Copier.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Text-Diff-Checker', description: 'Vergleichen Sie zwei Texte und heben Sie Unterschiede hervor.',
    originalLabel: 'Originaltext', modifiedLabel: 'Geaenderter Text',
    originalPlaceholder: 'Originaltext einfuegen...', modifiedPlaceholder: 'Geaenderten Text einfuegen...',
    compareBtn: 'Vergleichen', clearBtn: 'Loeschen', swapBtn: 'Tauschen',
    added: 'Hinzugefuegt', removed: 'Entfernt', unchanged: 'Unveraendert',
    diffOutput: 'Diff-Ausgabe', copyDiff: 'Kopieren', emptyState: 'Texte einfuegen und Vergleichen klicken',
    introTitle: 'Kostenloser Text-Diff-Checker', introText: 'Vergleichen Sie zwei Texte zeilenweise und sehen Sie die Unterschiede sofort.',
    howTitle: 'So vergleichen Sie', step1: 'Originaltext links einfuegen', step2: 'Geaenderten Text rechts einfuegen', step3: 'Vergleichen klicken', step4: 'Unterschiede pruefen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert der Vergleich?', faq1a: 'Zeilenweiser Vergleich mit LCS-Algorithmus.',
    faq2q: 'Kann man Code vergleichen?', faq2a: 'Ja, fuer alle Textinhalte.',
    faq3q: 'Gibt es Grenzen?', faq3a: 'Keine feste Grenze, sehr grosse Texte koennen langsam sein.',
    faq4q: 'Sind meine Daten sicher?', faq4a: 'Ja, alles laeuft im Browser.',
    faq5q: 'Kann man das Ergebnis kopieren?', faq5a: 'Ja, mit dem Kopieren-Button.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Comparador de Texto', description: 'Compare dos textos y resalte las diferencias.',
    originalLabel: 'Texto original', modifiedLabel: 'Texto modificado',
    originalPlaceholder: 'Pega el texto original...', modifiedPlaceholder: 'Pega el texto modificado...',
    compareBtn: 'Comparar', clearBtn: 'Borrar', swapBtn: 'Intercambiar',
    added: 'Agregado', removed: 'Eliminado', unchanged: 'Sin cambios',
    diffOutput: 'Resultado', copyDiff: 'Copiar', emptyState: 'Pega dos textos y haz clic en Comparar',
    introTitle: 'Comparador de texto gratuito', introText: 'Compara dos textos linea por linea y ve las diferencias al instante.',
    howTitle: 'Como comparar', step1: 'Pega el texto original a la izquierda', step2: 'Pega el modificado a la derecha', step3: 'Clic en Comparar', step4: 'Revisa las diferencias',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funciona?', faq1a: 'Comparacion linea por linea con algoritmo LCS.',
    faq2q: 'Se puede comparar codigo?', faq2a: 'Si, para cualquier contenido de texto.',
    faq3q: 'Hay limite de tamano?', faq3a: 'Sin limite estricto, textos muy grandes pueden ser lentos.',
    faq4q: 'Mis datos estan seguros?', faq4a: 'Si, todo se procesa en tu navegador.',
    faq5q: 'Se puede copiar el resultado?', faq5a: 'Si, con el boton Copiar.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: {
    title: 'Comparador de Texto', description: 'Compare dois textos e destaque as diferencas.',
    originalLabel: 'Texto original', modifiedLabel: 'Texto modificado',
    originalPlaceholder: 'Cole o texto original...', modifiedPlaceholder: 'Cole o texto modificado...',
    compareBtn: 'Comparar', clearBtn: 'Limpar', swapBtn: 'Trocar',
    added: 'Adicionado', removed: 'Removido', unchanged: 'Inalterado',
    diffOutput: 'Resultado', copyDiff: 'Copiar', emptyState: 'Cole dois textos e clique em Comparar',
    introTitle: 'Comparador de texto gratuito', introText: 'Compare dois textos linha por linha e veja as diferencas instantaneamente.',
    howTitle: 'Como comparar', step1: 'Cole o texto original a esquerda', step2: 'Cole o modificado a direita', step3: 'Clique em Comparar', step4: 'Revise as diferencas',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Como funciona?', faq1a: 'Comparacao linha por linha com algoritmo LCS.',
    faq2q: 'Posso comparar codigo?', faq2a: 'Sim, para qualquer conteudo de texto.',
    faq3q: 'Ha limite de tamanho?', faq3a: 'Sem limite estrito, textos muito grandes podem ficar lentos.',
    faq4q: 'Meus dados estao seguros?', faq4a: 'Sim, tudo e processado no seu navegador.',
    faq5q: 'Posso copiar o resultado?', faq5a: 'Sim, com o botao Copiar.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Confronto Testo', description: 'Confronta due testi e evidenzia le differenze.',
    originalLabel: 'Testo originale', modifiedLabel: 'Testo modificato',
    originalPlaceholder: 'Incolla il testo originale...', modifiedPlaceholder: 'Incolla il testo modificato...',
    compareBtn: 'Confronta', clearBtn: 'Cancella', swapBtn: 'Scambia',
    added: 'Aggiunto', removed: 'Rimosso', unchanged: 'Invariato',
    diffOutput: 'Risultato', copyDiff: 'Copia', emptyState: 'Incolla due testi e clicca Confronta',
    introTitle: 'Confronto testo gratuito', introText: 'Confronta due testi riga per riga e visualizza le differenze istantaneamente.',
    howTitle: 'Come confrontare', step1: 'Incolla il testo originale a sinistra', step2: 'Incolla il modificato a destra', step3: 'Clicca Confronta', step4: 'Esamina le differenze',
    faqTitle: 'Domande frequenti',
    faq1q: 'Come funziona?', faq1a: 'Confronto riga per riga con algoritmo LCS.',
    faq2q: 'Si puo confrontare codice?', faq2a: 'Si, per qualsiasi contenuto testuale.',
    faq3q: 'C\'e un limite?', faq3a: 'Nessun limite rigido, testi molto grandi potrebbero essere lenti.',
    faq4q: 'I miei dati sono sicuri?', faq4a: 'Si, tutto avviene nel browser.',
    faq5q: 'Si puo copiare il risultato?', faq5a: 'Si, con il pulsante Copia.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'Tekst Diff Checker', description: 'Vergelijk twee teksten en markeer de verschillen.',
    originalLabel: 'Originele tekst', modifiedLabel: 'Gewijzigde tekst',
    originalPlaceholder: 'Plak de originele tekst...', modifiedPlaceholder: 'Plak de gewijzigde tekst...',
    compareBtn: 'Vergelijken', clearBtn: 'Wissen', swapBtn: 'Wisselen',
    added: 'Toegevoegd', removed: 'Verwijderd', unchanged: 'Ongewijzigd',
    diffOutput: 'Resultaat', copyDiff: 'Kopieren', emptyState: 'Plak twee teksten en klik Vergelijken',
    introTitle: 'Gratis tekst diff checker', introText: 'Vergelijk twee teksten regel voor regel.',
    howTitle: 'Hoe te vergelijken', step1: 'Plak links de originele tekst', step2: 'Plak rechts de gewijzigde tekst', step3: 'Klik Vergelijken', step4: 'Bekijk de verschillen',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Hoe werkt het?', faq1a: 'Regel-voor-regel vergelijking met LCS-algoritme.',
    faq2q: 'Kan ik code vergelijken?', faq2a: 'Ja, voor alle tekstinhoud.',
    faq3q: 'Is er een limiet?', faq3a: 'Geen harde limiet, zeer grote teksten kunnen traag zijn.',
    faq4q: 'Zijn mijn gegevens veilig?', faq4a: 'Ja, alles draait in je browser.',
    faq5q: 'Kan ik het resultaat kopieren?', faq5a: 'Ja, met de kopieerknop.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Porownywarke Tekstow', description: 'Porownaj dwa teksty i podswietl roznice.',
    originalLabel: 'Tekst oryginalny', modifiedLabel: 'Tekst zmieniony',
    originalPlaceholder: 'Wklej oryginalny tekst...', modifiedPlaceholder: 'Wklej zmieniony tekst...',
    compareBtn: 'Porownaj', clearBtn: 'Wyczysc', swapBtn: 'Zamien',
    added: 'Dodane', removed: 'Usuniete', unchanged: 'Bez zmian',
    diffOutput: 'Wynik', copyDiff: 'Kopiuj', emptyState: 'Wklej dwa teksty i kliknij Porownaj',
    introTitle: 'Darmowe porownywanie tekstow', introText: 'Porownaj dwa teksty linia po linii.',
    howTitle: 'Jak porownywac', step1: 'Wklej oryginalny tekst po lewej', step2: 'Wklej zmieniony tekst po prawej', step3: 'Kliknij Porownaj', step4: 'Sprawdz roznice',
    faqTitle: 'FAQ',
    faq1q: 'Jak to dziala?', faq1a: 'Porownanie linia po linii z algorytmem LCS.',
    faq2q: 'Mozna porownywac kod?', faq2a: 'Tak, dla kazdej zawartosci tekstowej.',
    faq3q: 'Jest limit?', faq3a: 'Brak limitu, bardzo duze teksty moga byc wolne.',
    faq4q: 'Dane sa bezpieczne?', faq4a: 'Tak, wszystko dziala w przegladarce.',
    faq5q: 'Mozna skopiowac wynik?', faq5a: 'Tak, przyciskiem Kopiuj.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Text-Diff-Kontroll', description: 'Jaemfoer tvaa texter och markera skillnader.',
    originalLabel: 'Originaltext', modifiedLabel: 'Aendrad text',
    originalPlaceholder: 'Klistra in originaltext...', modifiedPlaceholder: 'Klistra in aendrad text...',
    compareBtn: 'Jaemfoer', clearBtn: 'Rensa', swapBtn: 'Byt',
    added: 'Tillagd', removed: 'Borttagen', unchanged: 'Ofoerndrad',
    diffOutput: 'Resultat', copyDiff: 'Kopiera', emptyState: 'Klistra in tvaa texter och klicka Jaemfoer',
    introTitle: 'Gratis text-diff-kontroll', introText: 'Jaemfoer tvaa texter rad foer rad.',
    howTitle: 'Hur man jaemfoer', step1: 'Klistra in originaltexten till vaenster', step2: 'Klistra in aendrad text till hoeger', step3: 'Klicka Jaemfoer', step4: 'Granska skillnaderna',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Hur fungerar det?', faq1a: 'Rad-foer-rad jaemfoerelse med LCS-algoritm.',
    faq2q: 'Kan man jaemfoera kod?', faq2a: 'Ja, foer allt textinnehall.',
    faq3q: 'Finns det en graens?', faq3a: 'Ingen haerd graens, stora texter kan vara langsamma.',
    faq4q: 'Aer data saekert?', faq4a: 'Ja, allt koers i webblaesaren.',
    faq5q: 'Kan man kopiera resultatet?', faq5a: 'Ja, med kopierings-knappen.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Tekst-Diff-Sjekker', description: 'Sammenlign to tekster og fremhev forskjeller.',
    originalLabel: 'Original tekst', modifiedLabel: 'Endret tekst',
    originalPlaceholder: 'Lim inn original tekst...', modifiedPlaceholder: 'Lim inn endret tekst...',
    compareBtn: 'Sammenlign', clearBtn: 'Slett', swapBtn: 'Bytt',
    added: 'Lagt til', removed: 'Fjernet', unchanged: 'Uendret',
    diffOutput: 'Resultat', copyDiff: 'Kopier', emptyState: 'Lim inn to tekster og klikk Sammenlign',
    introTitle: 'Gratis tekst-diff-sjekker', introText: 'Sammenlign to tekster linje for linje.',
    howTitle: 'Hvordan sammenligne', step1: 'Lim inn originaltekst til venstre', step2: 'Lim inn endret tekst til hoeyre', step3: 'Klikk Sammenlign', step4: 'Se over forskjellene',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hvordan fungerer det?', faq1a: 'Linje-for-linje sammenligning med LCS-algoritme.',
    faq2q: 'Kan man sammenligne kode?', faq2a: 'Ja, for alt tekstinnhold.',
    faq3q: 'Er det en grense?', faq3a: 'Ingen fast grense, veldig store tekster kan vaere trege.',
    faq4q: 'Er dataene trygge?', faq4a: 'Ja, alt kjoeres i nettleseren.',
    faq5q: 'Kan man kopiere resultatet?', faq5a: 'Ja, med kopier-knappen.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Text Diff Checker', description: 'Bandingkan dua teks dan sorot perbedaan.',
    originalLabel: 'Teks asli', modifiedLabel: 'Teks diubah',
    originalPlaceholder: 'Tempel teks asli...', modifiedPlaceholder: 'Tempel teks diubah...',
    compareBtn: 'Bandingkan', clearBtn: 'Hapus', swapBtn: 'Tukar',
    added: 'Ditambahkan', removed: 'Dihapus', unchanged: 'Tidak berubah',
    diffOutput: 'Hasil', copyDiff: 'Salin', emptyState: 'Tempel dua teks dan klik Bandingkan',
    introTitle: 'Pembanding teks gratis', introText: 'Bandingkan dua teks baris per baris.',
    howTitle: 'Cara membandingkan', step1: 'Tempel teks asli di kiri', step2: 'Tempel teks diubah di kanan', step3: 'Klik Bandingkan', step4: 'Tinjau perbedaan',
    faqTitle: 'FAQ',
    faq1q: 'Bagaimana cara kerjanya?', faq1a: 'Perbandingan baris per baris dengan algoritma LCS.',
    faq2q: 'Bisa membandingkan kode?', faq2a: 'Ya, untuk semua konten teks.',
    faq3q: 'Ada batas ukuran?', faq3a: 'Tidak ada batas ketat, teks sangat besar mungkin lambat.',
    faq4q: 'Apakah data aman?', faq4a: 'Ya, semua proses di browser Anda.',
    faq5q: 'Bisa menyalin hasil?', faq5a: 'Ya, dengan tombol Salin.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตรวจสอบความแตกต่างข้อความ', description: 'เปรียบเทียบสองข้อความและไฮไลท์ความแตกต่าง',
    originalLabel: 'ข้อความต้นฉบับ', modifiedLabel: 'ข้อความที่แก้ไข',
    originalPlaceholder: 'วางข้อความต้นฉบับ...', modifiedPlaceholder: 'วางข้อความที่แก้ไข...',
    compareBtn: 'เปรียบเทียบ', clearBtn: 'ล้าง', swapBtn: 'สลับ',
    added: 'เพิ่ม', removed: 'ลบ', unchanged: 'ไม่เปลี่ยน',
    diffOutput: 'ผลลัพธ์', copyDiff: 'คัดลอก', emptyState: 'วางสองข้อความแล้วคลิกเปรียบเทียบ',
    introTitle: 'เครื่องมือเปรียบเทียบข้อความฟรี', introText: 'เปรียบเทียบสองข้อความทีละบรรทัด',
    howTitle: 'วิธีใช้', step1: 'วางข้อความต้นฉบับทางซ้าย', step2: 'วางข้อความที่แก้ไขทางขวา', step3: 'คลิกเปรียบเทียบ', step4: 'ตรวจสอบความแตกต่าง',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ทำงานอย่างไร?', faq1a: 'เปรียบเทียบทีละบรรทัดด้วยอัลกอริทึม LCS',
    faq2q: 'เปรียบเทียบโค้ดได้ไหม?', faq2a: 'ได้ สำหรับเนื้อหาข้อความทุกประเภท',
    faq3q: 'มีจำกัดขนาดไหม?', faq3a: 'ไม่มีจำกัด แต่ข้อความใหญ่มากอาจช้า',
    faq4q: 'ข้อมูลปลอดภัยไหม?', faq4a: 'ใช่ ทุกอย่างทำงานในเบราว์เซอร์',
    faq5q: 'คัดลอกผลลัพธ์ได้ไหม?', faq5a: 'ได้ ด้วยปุ่มคัดลอก',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface DiffLine {
  type: 'same' | 'add' | 'remove';
  text: string;
  lineNum1?: number;
  lineNum2?: number;
}

function computeLcsDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const m = lines1.length, n = lines2.length;

  // LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = lines1[i - 1] === lines2[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Backtrack
  const result: DiffLine[] = [];
  let i = m, j = n;
  const stack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      stack.push({ type: 'same', text: lines1[i - 1], lineNum1: i, lineNum2: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: 'add', text: lines2[j - 1], lineNum2: j });
      j--;
    } else {
      stack.push({ type: 'remove', text: lines1[i - 1], lineNum1: i });
      i--;
    }
  }
  while (stack.length) result.push(stack.pop()!);
  return result;
}

export default function TextDiffChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => showDiff ? computeLcsDiff(text1, text2) : [], [text1, text2, showDiff]);

  const stats = useMemo(() => ({
    added: diff.filter(d => d.type === 'add').length,
    removed: diff.filter(d => d.type === 'remove').length,
    same: diff.filter(d => d.type === 'same').length,
  }), [diff]);

  const diffText = useMemo(() => diff.map(d => {
    const prefix = d.type === 'add' ? '+ ' : d.type === 'remove' ? '- ' : '  ';
    return prefix + d.text;
  }).join('\n'), [diff]);

  const handleCompare = useCallback(() => setShowDiff(true), []);
  const handleClear = useCallback(() => { setText1(''); setText2(''); setShowDiff(false); }, []);
  const handleSwap = useCallback(() => { const tmp = text1; setText1(text2); setText2(tmp); setShowDiff(false); }, [text1, text2]);

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
    <ToolLayout title={t.title} description={t.description} toolId="text-diff-checker">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Input panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.originalLabel}</label>
          <textarea value={text1} onChange={e => { setText1(e.target.value); setShowDiff(false); }}
            placeholder={t.originalPlaceholder}
            style={{ minHeight: 220, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.modifiedLabel}</label>
          <textarea value={text2} onChange={e => { setText2(e.target.value); setShowDiff(false); }}
            placeholder={t.modifiedPlaceholder}
            style={{ minHeight: 220, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleCompare} className="btn btn-primary">{t.compareBtn}</button>
        <button onClick={handleSwap} className="btn btn-secondary">{t.swapBtn}</button>
        <button onClick={handleClear} className="btn btn-secondary">{t.clearBtn}</button>
      </div>

      {/* Diff output */}
      {showDiff && diff.length > 0 ? (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 13, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>+ {stats.added} {t.added}</span>
            <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>- {stats.removed} {t.removed}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{stats.same} {t.unchanged}</span>
            <div style={{ marginLeft: 'auto' }}><CopyButton text={diffText} label={t.copyDiff} /></div>
          </div>
          <div style={{
            background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8,
            overflow: 'auto', maxHeight: 500, fontFamily: 'monospace', fontSize: 13,
          }}>
            {diff.map((line, i) => (
              <div key={i} style={{
                display: 'flex',
                background: line.type === 'add' ? 'rgba(16, 185, 129, 0.1)' : line.type === 'remove' ? 'rgba(244, 63, 94, 0.1)' : 'transparent',
                borderBottom: '1px solid rgba(42, 42, 74, 0.3)',
              }}>
                <span style={{ width: 36, textAlign: 'right', padding: '4px 6px', color: 'var(--text-secondary)', fontSize: 11, borderRight: '1px solid var(--border-color)', userSelect: 'none', flexShrink: 0 }}>
                  {line.lineNum1 || ''}
                </span>
                <span style={{ width: 36, textAlign: 'right', padding: '4px 6px', color: 'var(--text-secondary)', fontSize: 11, borderRight: '1px solid var(--border-color)', userSelect: 'none', flexShrink: 0 }}>
                  {line.lineNum2 || ''}
                </span>
                <span style={{
                  width: 20, textAlign: 'center', padding: '4px 0', fontWeight: 700, flexShrink: 0,
                  color: line.type === 'add' ? 'var(--accent-emerald)' : line.type === 'remove' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                }}>
                  {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                </span>
                <span style={{ padding: '4px 8px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>{line.text}</span>
              </div>
            ))}
          </div>
        </>
      ) : showDiff ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>{t.unchanged}</div>
      ) : (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>{t.emptyState}</div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, i) => (
            <details key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/text-diff`, label: 'Text Diff' },
            { href: `/${lang}/tools/word-counter`, label: 'Word Counter' },
            { href: `/${lang}/tools/line-sorter`, label: 'Line Sorter' },
            { href: `/${lang}/tools/string-case`, label: 'String Case Converter' },
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
