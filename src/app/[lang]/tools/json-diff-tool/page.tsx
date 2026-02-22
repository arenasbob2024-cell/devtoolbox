'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Diff Tool',
    description: 'Compare two JSON objects and visualize the differences. Find added, removed, and changed values instantly.',
    leftLabel: 'JSON A (Original)',
    rightLabel: 'JSON B (Modified)',
    leftPlaceholder: 'Paste your first JSON here...',
    rightPlaceholder: 'Paste your second JSON here...',
    compareBtn: 'Compare',
    clear: 'Clear',
    loadSample: 'Load Sample',
    swap: 'Swap',
    results: 'Differences',
    noDiff: 'No differences found. Both JSON objects are identical.',
    added: 'Added',
    removed: 'Removed',
    changed: 'Changed',
    path: 'Path',
    oldValue: 'Old Value',
    newValue: 'New Value',
    invalidLeft: 'Invalid JSON in the left panel. Please check the syntax.',
    invalidRight: 'Invalid JSON in the right panel. Please check the syntax.',
    summary: 'Summary',
    totalChanges: 'Total Changes',
    introTitle: 'Free Online JSON Diff & Compare Tool',
    introText: 'Compare two JSON objects side by side and instantly see the differences. This tool performs a deep recursive comparison of JSON structures, identifying added keys, removed keys, and changed values at every nesting level. Ideal for API response comparison, configuration file diffing, debugging data transformations, and reviewing JSON schema changes.',
    tipTitle: 'JSON Comparison Tips',
    tip1: 'Format your JSON before comparing for better readability',
    tip2: 'The tool compares nested objects and arrays recursively',
    tip3: 'Array elements are compared by index position',
    tip4: 'Use this tool to verify API response changes between versions',
    tip5: 'Changed values show both old and new values for easy reference',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does JSON diff comparison work?',
    faq1a: 'The tool recursively traverses both JSON objects, comparing values at each key path. It identifies three types of differences: added keys (present in the second JSON but not the first), removed keys (present in the first but not the second), and changed values (same key but different values). The comparison works with nested objects and arrays.',
    faq2q: 'Can it compare nested JSON objects?',
    faq2a: 'Yes, the comparison is fully recursive. It traverses all levels of nesting in both objects and arrays, reporting the exact path where each difference occurs. For example, a change at data.users[0].name would be reported with its full path.',
    faq3q: 'How are arrays compared?',
    faq3a: 'Arrays are compared element by element based on their index position. If one array is longer than the other, the extra elements are reported as additions or removals. For reordered arrays, each index position is compared independently.',
    faq4q: 'Is my JSON data secure?',
    faq4a: 'Yes, all comparison is performed entirely in your browser using JavaScript. No data is sent to any server. Your JSON never leaves your device, making this tool safe for comparing sensitive configuration files or API responses.',
    faq5q: 'What JSON formats are supported?',
    faq5a: 'Any valid JSON is supported, including objects, arrays, strings, numbers, booleans, and null values. The tool handles deeply nested structures, large arrays, and complex object hierarchies. Both minified and formatted JSON are accepted.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 差异对比工具',
    description: '比较两个 JSON 对象并可视化差异。即时发现新增、删除和更改的值。',
    leftLabel: 'JSON A（原始）', rightLabel: 'JSON B（修改后）',
    leftPlaceholder: '在此粘贴第一个 JSON...', rightPlaceholder: '在此粘贴第二个 JSON...',
    compareBtn: '比较', clear: '清除', loadSample: '加载示例', swap: '交换',
    results: '差异', noDiff: '未发现差异，两个 JSON 对象完全相同。',
    added: '新增', removed: '删除', changed: '修改',
    path: '路径', oldValue: '旧值', newValue: '新值',
    invalidLeft: '左侧面板的 JSON 无效，请检查语法。', invalidRight: '右侧面板的 JSON 无效，请检查语法。',
    summary: '摘要', totalChanges: '总变更数',
    introTitle: '免费在线 JSON 差异对比工具',
    introText: '并排比较两个 JSON 对象，即时查看差异。支持深度递归比较，识别每个嵌套层级的新增、删除和修改。',
    tipTitle: 'JSON 对比技巧',
    tip1: '比较前先格式化 JSON 以提高可读性', tip2: '工具递归比较嵌套对象和数组',
    tip3: '数组元素按索引位置比较', tip4: '用于验证不同版本间的 API 响应变化',
    tip5: '修改的值同时显示旧值和新值',
    faqTitle: '常见问题',
    faq1q: 'JSON 差异比较如何工作？', faq1a: '工具递归遍历两个 JSON 对象，在每个键路径比较值，识别新增、删除和修改三种差异。',
    faq2q: '能比较嵌套 JSON 对象吗？', faq2a: '是的，比较完全递归，遍历所有嵌套层级并报告差异的精确路径。',
    faq3q: '数组如何比较？', faq3a: '数组按索引位置逐元素比较。如果一个数组更长，多余的元素将被报告为新增或删除。',
    faq4q: 'JSON 数据安全吗？', faq4a: '是的，所有比较完全在浏览器中进行，不会发送到任何服务器。',
    faq5q: '支持什么 JSON 格式？', faq5a: '支持任何有效的 JSON，包括对象、数组、字符串、数字、布尔值和 null。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Outil de Comparaison JSON',
    description: 'Comparez deux objets JSON et visualisez les differences. Trouvez les valeurs ajoutees, supprimees et modifiees.',
    leftLabel: 'JSON A (Original)', rightLabel: 'JSON B (Modifie)',
    leftPlaceholder: 'Collez votre premier JSON ici...', rightPlaceholder: 'Collez votre second JSON ici...',
    compareBtn: 'Comparer', clear: 'Effacer', loadSample: 'Charger un exemple', swap: 'Echanger',
    results: 'Differences', noDiff: 'Aucune difference trouvee. Les deux objets JSON sont identiques.',
    added: 'Ajoute', removed: 'Supprime', changed: 'Modifie',
    path: 'Chemin', oldValue: 'Ancienne valeur', newValue: 'Nouvelle valeur',
    invalidLeft: 'JSON invalide dans le panneau gauche.', invalidRight: 'JSON invalide dans le panneau droit.',
    summary: 'Resume', totalChanges: 'Total des changements',
    introTitle: 'Outil de comparaison JSON gratuit', introText: 'Comparez deux objets JSON cote a cote et voyez les differences instantanement.',
    tipTitle: 'Conseils de comparaison JSON',
    tip1: 'Formatez votre JSON avant de comparer', tip2: 'L\'outil compare les objets et tableaux de maniere recursive',
    tip3: 'Les elements de tableau sont compares par position d\'index', tip4: 'Utilisez pour verifier les changements d\'API',
    tip5: 'Les valeurs modifiees montrent l\'ancienne et la nouvelle valeur',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne la comparaison JSON?', faq1a: 'L\'outil parcourt recursivement les deux objets JSON, comparant les valeurs a chaque chemin.',
    faq2q: 'Peut-il comparer des objets imbriques?', faq2a: 'Oui, la comparaison est entierement recursive a tous les niveaux.',
    faq3q: 'Comment les tableaux sont-ils compares?', faq3a: 'Les tableaux sont compares element par element selon leur position d\'index.',
    faq4q: 'Mes donnees sont-elles securisees?', faq4a: 'Oui, toute la comparaison est effectuee dans votre navigateur. Aucune donnee n\'est envoyee a un serveur.',
    faq5q: 'Quels formats JSON sont supportes?', faq5a: 'Tout JSON valide est supporte, y compris les objets, tableaux, chaines, nombres, booleens et null.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON Vergleichstool',
    description: 'Vergleichen Sie zwei JSON-Objekte und visualisieren Sie die Unterschiede.',
    leftLabel: 'JSON A (Original)', rightLabel: 'JSON B (Geaendert)',
    leftPlaceholder: 'Erstes JSON hier einfuegen...', rightPlaceholder: 'Zweites JSON hier einfuegen...',
    compareBtn: 'Vergleichen', clear: 'Loeschen', loadSample: 'Beispiel laden', swap: 'Tauschen',
    results: 'Unterschiede', noDiff: 'Keine Unterschiede gefunden. Beide JSON-Objekte sind identisch.',
    added: 'Hinzugefuegt', removed: 'Entfernt', changed: 'Geaendert',
    path: 'Pfad', oldValue: 'Alter Wert', newValue: 'Neuer Wert',
    invalidLeft: 'Ungueltiges JSON im linken Panel.', invalidRight: 'Ungueltiges JSON im rechten Panel.',
    summary: 'Zusammenfassung', totalChanges: 'Gesamtaenderungen',
    introTitle: 'Kostenloses JSON Vergleichstool', introText: 'Vergleichen Sie zwei JSON-Objekte nebeneinander und sehen Sie sofort die Unterschiede.',
    tipTitle: 'JSON-Vergleich Tipps',
    tip1: 'Formatieren Sie JSON vor dem Vergleich', tip2: 'Rekursiver Vergleich verschachtelter Objekte',
    tip3: 'Array-Elemente werden nach Index verglichen', tip4: 'Zur Ueberpruefung von API-Aenderungen nutzen',
    tip5: 'Geaenderte Werte zeigen alten und neuen Wert',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert der JSON-Vergleich?', faq1a: 'Das Tool durchlaeuft rekursiv beide Objekte und vergleicht Werte an jedem Pfad.',
    faq2q: 'Kann es verschachtelte Objekte vergleichen?', faq2a: 'Ja, der Vergleich ist vollstaendig rekursiv auf allen Ebenen.',
    faq3q: 'Wie werden Arrays verglichen?', faq3a: 'Arrays werden Element fuer Element nach ihrer Indexposition verglichen.',
    faq4q: 'Sind meine Daten sicher?', faq4a: 'Ja, der Vergleich findet vollstaendig im Browser statt. Keine Daten werden an Server gesendet.',
    faq5q: 'Welche JSON-Formate werden unterstuetzt?', faq5a: 'Jedes gueltige JSON wird unterstuetzt, einschliesslich Objekte, Arrays, Strings, Zahlen und Booleans.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Herramienta de Comparacion JSON',
    description: 'Compare dos objetos JSON y visualice las diferencias. Encuentre valores agregados, eliminados y cambiados.',
    leftLabel: 'JSON A (Original)', rightLabel: 'JSON B (Modificado)',
    leftPlaceholder: 'Pegue su primer JSON aqui...', rightPlaceholder: 'Pegue su segundo JSON aqui...',
    compareBtn: 'Comparar', clear: 'Limpiar', loadSample: 'Cargar ejemplo', swap: 'Intercambiar',
    results: 'Diferencias', noDiff: 'No se encontraron diferencias. Ambos JSON son identicos.',
    added: 'Agregado', removed: 'Eliminado', changed: 'Cambiado',
    path: 'Ruta', oldValue: 'Valor anterior', newValue: 'Valor nuevo',
    invalidLeft: 'JSON invalido en el panel izquierdo.', invalidRight: 'JSON invalido en el panel derecho.',
    summary: 'Resumen', totalChanges: 'Cambios totales',
    introTitle: 'Herramienta de comparacion JSON gratuita', introText: 'Compare dos objetos JSON lado a lado y vea las diferencias instantaneamente.',
    tipTitle: 'Consejos de comparacion JSON',
    tip1: 'Formatee su JSON antes de comparar', tip2: 'La herramienta compara objetos recursivamente',
    tip3: 'Los elementos del arreglo se comparan por posicion', tip4: 'Use para verificar cambios en respuestas de API',
    tip5: 'Los valores cambiados muestran el valor anterior y el nuevo',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funciona la comparacion JSON?', faq1a: 'La herramienta recorre recursivamente ambos objetos JSON comparando valores en cada ruta.',
    faq2q: 'Puede comparar objetos anidados?', faq2a: 'Si, la comparacion es completamente recursiva en todos los niveles.',
    faq3q: 'Como se comparan los arreglos?', faq3a: 'Los arreglos se comparan elemento por elemento segun su posicion de indice.',
    faq4q: 'Son seguros mis datos?', faq4a: 'Si, toda la comparacion se realiza en su navegador. No se envia ningun dato a servidores.',
    faq5q: 'Que formatos JSON se soportan?', faq5a: 'Cualquier JSON valido es soportado, incluyendo objetos, arreglos, cadenas, numeros y booleanos.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JSON 差分ツール',
    description: '2つの JSON オブジェクトを比較し、差分を視覚化。追加、削除、変更された値を即座に発見。',
    leftLabel: 'JSON A（元）', rightLabel: 'JSON B（変更後）',
    leftPlaceholder: '最初の JSON をここに貼り付け...', rightPlaceholder: '2番目の JSON をここに貼り付け...',
    compareBtn: '比較', clear: 'クリア', loadSample: 'サンプル読込', swap: '入れ替え',
    results: '差分', noDiff: '差分はありません。両方の JSON オブジェクトは同一です。',
    added: '追加', removed: '削除', changed: '変更',
    path: 'パス', oldValue: '旧値', newValue: '新値',
    invalidLeft: '左パネルの JSON が無効です。', invalidRight: '右パネルの JSON が無効です。',
    summary: '概要', totalChanges: '総変更数',
    introTitle: '無料 JSON 差分比較ツール', introText: '2つの JSON オブジェクトを横に並べて比較し、差分を即座に確認できます。',
    tipTitle: 'JSON 比較のコツ',
    tip1: '比較前に JSON をフォーマット', tip2: 'ネストされたオブジェクトを再帰的に比較',
    tip3: '配列要素はインデックス位置で比較', tip4: 'API レスポンスの変更確認に活用',
    tip5: '変更された値は旧値と新値の両方を表示',
    faqTitle: 'よくある質問',
    faq1q: 'JSON 差分比較の仕組みは？', faq1a: 'ツールが両方の JSON オブジェクトを再帰的に走査し、各パスで値を比較します。',
    faq2q: 'ネストされたオブジェクトを比較できますか？', faq2a: 'はい、すべてのネストレベルで完全な再帰比較を行います。',
    faq3q: '配列はどのように比較されますか？', faq3a: '配列はインデックス位置に基づいて要素ごとに比較されます。',
    faq4q: 'データは安全ですか？', faq4a: 'はい、すべての比較はブラウザ内で行われます。サーバーにデータは送信されません。',
    faq5q: 'どの JSON 形式がサポートされていますか？', faq5a: 'オブジェクト、配列、文字列、数値、ブール値、null を含むすべての有効な JSON をサポートします。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON 비교 도구',
    description: '두 JSON 객체를 비교하고 차이점을 시각화합니다. 추가, 삭제, 변경된 값을 즉시 확인.',
    leftLabel: 'JSON A (원본)', rightLabel: 'JSON B (수정본)',
    leftPlaceholder: '첫 번째 JSON을 여기에 붙여넣기...', rightPlaceholder: '두 번째 JSON을 여기에 붙여넣기...',
    compareBtn: '비교', clear: '지우기', loadSample: '샘플 로드', swap: '교환',
    results: '차이점', noDiff: '차이점이 없습니다. 두 JSON 객체가 동일합니다.',
    added: '추가됨', removed: '삭제됨', changed: '변경됨',
    path: '경로', oldValue: '이전 값', newValue: '새 값',
    invalidLeft: '왼쪽 패널의 JSON이 유효하지 않습니다.', invalidRight: '오른쪽 패널의 JSON이 유효하지 않습니다.',
    summary: '요약', totalChanges: '총 변경 수',
    introTitle: '무료 JSON 비교 도구', introText: '두 JSON 객체를 나란히 비교하고 차이점을 즉시 확인하세요.',
    tipTitle: 'JSON 비교 팁',
    tip1: '비교 전에 JSON을 포맷팅하세요', tip2: '중첩된 객체와 배열을 재귀적으로 비교',
    tip3: '배열 요소는 인덱스 위치로 비교', tip4: 'API 응답 변경 확인에 활용',
    tip5: '변경된 값은 이전 값과 새 값 모두 표시',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON 비교는 어떻게 작동하나요?', faq1a: '도구가 두 JSON 객체를 재귀적으로 순회하며 각 경로에서 값을 비교합니다.',
    faq2q: '중첩된 객체를 비교할 수 있나요?', faq2a: '네, 모든 중첩 수준에서 완전한 재귀 비교를 수행합니다.',
    faq3q: '배열은 어떻게 비교되나요?', faq3a: '배열은 인덱스 위치에 따라 요소별로 비교됩니다.',
    faq4q: '데이터는 안전한가요?', faq4a: '네, 모든 비교는 브라우저에서 수행됩니다. 서버로 데이터가 전송되지 않습니다.',
    faq5q: '어떤 JSON 형식이 지원되나요?', faq5a: '객체, 배열, 문자열, 숫자, 불리언, null을 포함한 모든 유효한 JSON을 지원합니다.',
    relatedTitle: '관련 도구',
  },
  pt: {
    title: 'Ferramenta de Comparacao JSON',
    description: 'Compare dois objetos JSON e visualize as diferencas. Encontre valores adicionados, removidos e alterados.',
    leftLabel: 'JSON A (Original)', rightLabel: 'JSON B (Modificado)',
    leftPlaceholder: 'Cole seu primeiro JSON aqui...', rightPlaceholder: 'Cole seu segundo JSON aqui...',
    compareBtn: 'Comparar', clear: 'Limpar', loadSample: 'Carregar exemplo', swap: 'Trocar',
    results: 'Diferencas', noDiff: 'Nenhuma diferenca encontrada. Ambos os objetos JSON sao identicos.',
    added: 'Adicionado', removed: 'Removido', changed: 'Alterado',
    path: 'Caminho', oldValue: 'Valor antigo', newValue: 'Novo valor',
    invalidLeft: 'JSON invalido no painel esquerdo.', invalidRight: 'JSON invalido no painel direito.',
    summary: 'Resumo', totalChanges: 'Total de alteracoes',
    introTitle: 'Ferramenta de comparacao JSON gratis', introText: 'Compare dois objetos JSON lado a lado e veja as diferencas instantaneamente.',
    tipTitle: 'Dicas de comparacao JSON',
    tip1: 'Formate seu JSON antes de comparar', tip2: 'A ferramenta compara objetos recursivamente',
    tip3: 'Elementos de array sao comparados por posicao', tip4: 'Use para verificar mudancas em respostas de API',
    tip5: 'Valores alterados mostram o valor antigo e o novo',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Como funciona a comparacao JSON?', faq1a: 'A ferramenta percorre recursivamente ambos os objetos JSON comparando valores em cada caminho.',
    faq2q: 'Pode comparar objetos aninhados?', faq2a: 'Sim, a comparacao e totalmente recursiva em todos os niveis.',
    faq3q: 'Como os arrays sao comparados?', faq3a: 'Arrays sao comparados elemento por elemento com base na posicao do indice.',
    faq4q: 'Meus dados estao seguros?', faq4a: 'Sim, toda a comparacao e feita no seu navegador. Nenhum dado e enviado a servidores.',
    faq5q: 'Quais formatos JSON sao suportados?', faq5a: 'Qualquer JSON valido e suportado, incluindo objetos, arrays, strings, numeros e booleanos.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  it: {
    title: 'Strumento di Confronto JSON',
    description: 'Confronta due oggetti JSON e visualizza le differenze. Trova valori aggiunti, rimossi e modificati.',
    leftLabel: 'JSON A (Originale)', rightLabel: 'JSON B (Modificato)',
    leftPlaceholder: 'Incolla il primo JSON qui...', rightPlaceholder: 'Incolla il secondo JSON qui...',
    compareBtn: 'Confronta', clear: 'Cancella', loadSample: 'Carica esempio', swap: 'Scambia',
    results: 'Differenze', noDiff: 'Nessuna differenza trovata. I due oggetti JSON sono identici.',
    added: 'Aggiunto', removed: 'Rimosso', changed: 'Modificato',
    path: 'Percorso', oldValue: 'Vecchio valore', newValue: 'Nuovo valore',
    invalidLeft: 'JSON non valido nel pannello sinistro.', invalidRight: 'JSON non valido nel pannello destro.',
    summary: 'Riepilogo', totalChanges: 'Modifiche totali',
    introTitle: 'Strumento di confronto JSON gratuito', introText: 'Confronta due oggetti JSON fianco a fianco e vedi le differenze istantaneamente.',
    tipTitle: 'Consigli per il confronto JSON',
    tip1: 'Formatta il JSON prima di confrontare', tip2: 'Lo strumento confronta oggetti in modo ricorsivo',
    tip3: 'Gli elementi dell\'array vengono confrontati per posizione', tip4: 'Usa per verificare cambiamenti nelle risposte API',
    tip5: 'I valori modificati mostrano sia il vecchio che il nuovo valore',
    faqTitle: 'Domande frequenti',
    faq1q: 'Come funziona il confronto JSON?', faq1a: 'Lo strumento attraversa ricorsivamente entrambi gli oggetti JSON confrontando i valori in ogni percorso.',
    faq2q: 'Puo confrontare oggetti annidati?', faq2a: 'Si, il confronto e completamente ricorsivo a tutti i livelli.',
    faq3q: 'Come vengono confrontati gli array?', faq3a: 'Gli array vengono confrontati elemento per elemento in base alla posizione dell\'indice.',
    faq4q: 'I miei dati sono sicuri?', faq4a: 'Si, tutto il confronto avviene nel browser. Nessun dato viene inviato a server.',
    faq5q: 'Quali formati JSON sono supportati?', faq5a: 'Qualsiasi JSON valido e supportato, inclusi oggetti, array, stringhe, numeri e booleani.',
    relatedTitle: 'Strumenti correlati',
  },
  nl: {
    title: 'JSON Vergelijkingstool',
    description: 'Vergelijk twee JSON-objecten en visualiseer de verschillen.',
    leftLabel: 'JSON A (Origineel)', rightLabel: 'JSON B (Gewijzigd)',
    leftPlaceholder: 'Plak uw eerste JSON hier...', rightPlaceholder: 'Plak uw tweede JSON hier...',
    compareBtn: 'Vergelijken', clear: 'Wissen', loadSample: 'Voorbeeld laden', swap: 'Wisselen',
    results: 'Verschillen', noDiff: 'Geen verschillen gevonden. Beide JSON-objecten zijn identiek.',
    added: 'Toegevoegd', removed: 'Verwijderd', changed: 'Gewijzigd',
    path: 'Pad', oldValue: 'Oude waarde', newValue: 'Nieuwe waarde',
    invalidLeft: 'Ongeldige JSON in het linkerpaneel.', invalidRight: 'Ongeldige JSON in het rechterpaneel.',
    summary: 'Samenvatting', totalChanges: 'Totaal wijzigingen',
    introTitle: 'Gratis JSON vergelijkingstool', introText: 'Vergelijk twee JSON-objecten naast elkaar en zie de verschillen direct.',
    tipTitle: 'JSON vergelijking tips',
    tip1: 'Formatteer JSON voor het vergelijken', tip2: 'Recursieve vergelijking van geneste objecten',
    tip3: 'Array-elementen worden vergeleken op indexpositie', tip4: 'Gebruik om API-wijzigingen te verifieren',
    tip5: 'Gewijzigde waarden tonen zowel oude als nieuwe waarde',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Hoe werkt JSON-vergelijking?', faq1a: 'De tool doorloopt recursief beide JSON-objecten en vergelijkt waarden op elk pad.',
    faq2q: 'Kan het geneste objecten vergelijken?', faq2a: 'Ja, de vergelijking is volledig recursief op alle niveaus.',
    faq3q: 'Hoe worden arrays vergeleken?', faq3a: 'Arrays worden element voor element vergeleken op basis van indexpositie.',
    faq4q: 'Zijn mijn gegevens veilig?', faq4a: 'Ja, alle vergelijking vindt plaats in uw browser. Er worden geen gegevens naar servers gestuurd.',
    faq5q: 'Welke JSON-formaten worden ondersteund?', faq5a: 'Elke geldige JSON wordt ondersteund, inclusief objecten, arrays, strings, getallen en booleans.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Narzedzie Porownywania JSON',
    description: 'Porownaj dwa obiekty JSON i wizualizuj roznice.',
    leftLabel: 'JSON A (Oryginal)', rightLabel: 'JSON B (Zmodyfikowany)',
    leftPlaceholder: 'Wklej pierwszy JSON tutaj...', rightPlaceholder: 'Wklej drugi JSON tutaj...',
    compareBtn: 'Porownaj', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', swap: 'Zamien',
    results: 'Roznice', noDiff: 'Nie znaleziono roznic. Oba obiekty JSON sa identyczne.',
    added: 'Dodane', removed: 'Usuniete', changed: 'Zmienione',
    path: 'Sciezka', oldValue: 'Stara wartosc', newValue: 'Nowa wartosc',
    invalidLeft: 'Nieprawidlowy JSON w lewym panelu.', invalidRight: 'Nieprawidlowy JSON w prawym panelu.',
    summary: 'Podsumowanie', totalChanges: 'Lacznie zmian',
    introTitle: 'Darmowe narzedzie porownywania JSON', introText: 'Porownaj dwa obiekty JSON obok siebie i zobacz roznice natychmiast.',
    tipTitle: 'Wskazowki dotyczace porownywania JSON',
    tip1: 'Sformatuj JSON przed porownaniem', tip2: 'Rekursywne porownywanie zagniezdzonychobiektow',
    tip3: 'Elementy tablicy porownywane wedlug pozycji', tip4: 'Uzyj do weryfikacji zmian w API',
    tip5: 'Zmienione wartosci pokazuja stara i nowa wartosc',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jak dziala porownywanie JSON?', faq1a: 'Narzedzie rekursywnie przechodzi oba obiekty JSON, porownujac wartosci na kazdej sciezce.',
    faq2q: 'Czy moze porownywac zagniezdzone obiekty?', faq2a: 'Tak, porownanie jest calkowicie rekursywne na wszystkich poziomach.',
    faq3q: 'Jak porownywane sa tablice?', faq3a: 'Tablice sa porownywane element po elemencie wedlug pozycji indeksu.',
    faq4q: 'Czy moje dane sa bezpieczne?', faq4a: 'Tak, porownanie odbywa sie calkowicie w przegladarce. Zadne dane nie sa wysylane na serwery.',
    faq5q: 'Jakie formaty JSON sa obslugiwane?', faq5a: 'Obslugiwany jest kazdy prawidlowy JSON, w tym obiekty, tablice, stringi, liczby i booleany.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JSON Jaemfoerelsverktyg',
    description: 'Jaemfoer tvaa JSON-objekt och visualisera skillnaderna.',
    leftLabel: 'JSON A (Original)', rightLabel: 'JSON B (Modifierad)',
    leftPlaceholder: 'Klistra in foersta JSON haer...', rightPlaceholder: 'Klistra in andra JSON haer...',
    compareBtn: 'Jaemfoer', clear: 'Rensa', loadSample: 'Ladda exempel', swap: 'Byt',
    results: 'Skillnader', noDiff: 'Inga skillnader hittades. Baada JSON-objekten aer identiska.',
    added: 'Tillagd', removed: 'Borttagen', changed: 'Aendrad',
    path: 'Soekvaeg', oldValue: 'Gammalt vaerde', newValue: 'Nytt vaerde',
    invalidLeft: 'Ogiltig JSON i vaenstra panelen.', invalidRight: 'Ogiltig JSON i hoegra panelen.',
    summary: 'Sammanfattning', totalChanges: 'Totala aendringar',
    introTitle: 'Gratis JSON jaemfoerelsverktyg', introText: 'Jaemfoer tvaa JSON-objekt sida vid sida och se skillnaderna direkt.',
    tipTitle: 'JSON jaemfoerelsetips', tip1: 'Formatera JSON foere jaemfoerelse', tip2: 'Rekursiv jaemfoerelse av naestlade objekt',
    tip3: 'Array-element jaemfoers efter indexposition', tip4: 'Anvaend foer att verifiera API-aendringar',
    tip5: 'Aendrade vaerden visar baade gammalt och nytt vaerde',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Hur fungerar JSON-jaemfoerelse?', faq1a: 'Verktyget traverserar rekursivt baada JSON-objekten och jaemfoer vaerden paa varje soekvaeg.',
    faq2q: 'Kan det jaemfoera naestlade objekt?', faq2a: 'Ja, jaemfoerelsen aer helt rekursiv paa alla nivaaer.',
    faq3q: 'Hur jaemfoers arrayer?', faq3a: 'Arrayer jaemfoers element foer element baserat paa indexposition.',
    faq4q: 'Aer mina data saekra?', faq4a: 'Ja, all jaemfoerelse sker i din webblaesare. Inga data skickas till servrar.',
    faq5q: 'Vilka JSON-format stoeds?', faq5a: 'Alla giltiga JSON stoeds, inklusive objekt, arrayer, straengar, tal och booleans.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JSON Sammenligningsverktoy',
    description: 'Sammenlign to JSON-objekter og visualiser forskjellene.',
    leftLabel: 'JSON A (Original)', rightLabel: 'JSON B (Modifisert)',
    leftPlaceholder: 'Lim inn foerste JSON her...', rightPlaceholder: 'Lim inn andre JSON her...',
    compareBtn: 'Sammenlign', clear: 'Toemme', loadSample: 'Last eksempel', swap: 'Bytt',
    results: 'Forskjeller', noDiff: 'Ingen forskjeller funnet. Begge JSON-objektene er identiske.',
    added: 'Lagt til', removed: 'Fjernet', changed: 'Endret',
    path: 'Sti', oldValue: 'Gammel verdi', newValue: 'Ny verdi',
    invalidLeft: 'Ugyldig JSON i venstre panel.', invalidRight: 'Ugyldig JSON i hoeyre panel.',
    summary: 'Sammendrag', totalChanges: 'Totale endringer',
    introTitle: 'Gratis JSON sammenligningsverktoy', introText: 'Sammenlign to JSON-objekter side om side og se forskjellene umiddelbart.',
    tipTitle: 'JSON sammenligningstips', tip1: 'Formater JSON foer sammenligning', tip2: 'Rekursiv sammenligning av nestede objekter',
    tip3: 'Array-elementer sammenlignes etter indeksposisjon', tip4: 'Bruk for aa verifisere API-endringer',
    tip5: 'Endrede verdier viser baade gammel og ny verdi',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Hvordan fungerer JSON-sammenligning?', faq1a: 'Verktoyet traverserer begge JSON-objektene rekursivt og sammenligner verdier paa hver sti.',
    faq2q: 'Kan det sammenligne nestede objekter?', faq2a: 'Ja, sammenligningen er helt rekursiv paa alle nivaaer.',
    faq3q: 'Hvordan sammenlignes arrayer?', faq3a: 'Arrayer sammenlignes element for element basert paa indeksposisjon.',
    faq4q: 'Er dataene mine sikre?', faq4a: 'Ja, all sammenligning skjer i nettleseren din. Ingen data sendes til servere.',
    faq5q: 'Hvilke JSON-formater stoettes?', faq5a: 'Alle gyldige JSON stoettes, inkludert objekter, arrayer, strenger, tall og booleans.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Alat Perbandingan JSON',
    description: 'Bandingkan dua objek JSON dan visualisasikan perbedaannya.',
    leftLabel: 'JSON A (Asli)', rightLabel: 'JSON B (Dimodifikasi)',
    leftPlaceholder: 'Tempel JSON pertama di sini...', rightPlaceholder: 'Tempel JSON kedua di sini...',
    compareBtn: 'Bandingkan', clear: 'Hapus', loadSample: 'Muat Contoh', swap: 'Tukar',
    results: 'Perbedaan', noDiff: 'Tidak ada perbedaan ditemukan. Kedua objek JSON identik.',
    added: 'Ditambahkan', removed: 'Dihapus', changed: 'Diubah',
    path: 'Path', oldValue: 'Nilai lama', newValue: 'Nilai baru',
    invalidLeft: 'JSON tidak valid di panel kiri.', invalidRight: 'JSON tidak valid di panel kanan.',
    summary: 'Ringkasan', totalChanges: 'Total perubahan',
    introTitle: 'Alat perbandingan JSON gratis', introText: 'Bandingkan dua objek JSON secara berdampingan dan lihat perbedaannya secara instan.',
    tipTitle: 'Tips perbandingan JSON', tip1: 'Format JSON sebelum membandingkan', tip2: 'Perbandingan rekursif objek bersarang',
    tip3: 'Elemen array dibandingkan berdasarkan posisi indeks', tip4: 'Gunakan untuk memverifikasi perubahan API',
    tip5: 'Nilai yang diubah menampilkan nilai lama dan baru',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Bagaimana perbandingan JSON bekerja?', faq1a: 'Alat ini melintasi kedua objek JSON secara rekursif, membandingkan nilai di setiap jalur.',
    faq2q: 'Bisa membandingkan objek bersarang?', faq2a: 'Ya, perbandingan sepenuhnya rekursif di semua tingkat.',
    faq3q: 'Bagaimana array dibandingkan?', faq3a: 'Array dibandingkan elemen per elemen berdasarkan posisi indeks.',
    faq4q: 'Apakah data saya aman?', faq4a: 'Ya, semua perbandingan dilakukan di browser Anda. Tidak ada data yang dikirim ke server.',
    faq5q: 'Format JSON apa yang didukung?', faq5a: 'Semua JSON valid didukung, termasuk objek, array, string, angka, dan boolean.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือเปรียบเทียบ JSON',
    description: 'เปรียบเทียบ JSON สองออบเจกต์และแสดงผลความแตกต่าง',
    leftLabel: 'JSON A (ต้นฉบับ)', rightLabel: 'JSON B (แก้ไขแล้ว)',
    leftPlaceholder: 'วาง JSON แรกที่นี่...', rightPlaceholder: 'วาง JSON ที่สองที่นี่...',
    compareBtn: 'เปรียบเทียบ', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', swap: 'สลับ',
    results: 'ความแตกต่าง', noDiff: 'ไม่พบความแตกต่าง ทั้งสอง JSON เหมือนกัน',
    added: 'เพิ่ม', removed: 'ลบ', changed: 'เปลี่ยน',
    path: 'เส้นทาง', oldValue: 'ค่าเก่า', newValue: 'ค่าใหม่',
    invalidLeft: 'JSON ไม่ถูกต้องในแผงซ้าย', invalidRight: 'JSON ไม่ถูกต้องในแผงขวา',
    summary: 'สรุป', totalChanges: 'การเปลี่ยนแปลงทั้งหมด',
    introTitle: 'เครื่องมือเปรียบเทียบ JSON ฟรี', introText: 'เปรียบเทียบ JSON สองออบเจกต์คู่กันและดูความแตกต่างทันที',
    tipTitle: 'เคล็ดลับการเปรียบเทียบ JSON', tip1: 'จัดรูปแบบ JSON ก่อนเปรียบเทียบ', tip2: 'เปรียบเทียบออบเจกต์ซ้อนแบบเรียกซ้ำ',
    tip3: 'องค์ประกอบอาร์เรย์เปรียบเทียบตามตำแหน่งดัชนี', tip4: 'ใช้ตรวจสอบการเปลี่ยนแปลง API',
    tip5: 'ค่าที่เปลี่ยนแสดงทั้งค่าเก่าและใหม่',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'การเปรียบเทียบ JSON ทำงานอย่างไร?', faq1a: 'เครื่องมือสำรวจทั้งสอง JSON ซ้ำๆ เปรียบเทียบค่าในแต่ละเส้นทาง',
    faq2q: 'เปรียบเทียบออบเจกต์ซ้อนได้ไหม?', faq2a: 'ได้ การเปรียบเทียบเป็นแบบเรียกซ้ำทุกระดับ',
    faq3q: 'อาร์เรย์เปรียบเทียบอย่างไร?', faq3a: 'อาร์เรย์เปรียบเทียบทีละองค์ประกอบตามตำแหน่งดัชนี',
    faq4q: 'ข้อมูลปลอดภัยหรือไม่?', faq4a: 'ใช่ การเปรียบเทียบทั้งหมดเกิดขึ้นในเบราว์เซอร์ ไม่มีข้อมูลส่งไปเซิร์ฟเวอร์',
    faq5q: 'รองรับรูปแบบ JSON ใดบ้าง?', faq5a: 'รองรับ JSON ที่ถูกต้องทั้งหมด รวมถึงออบเจกต์ อาร์เรย์ สตริง ตัวเลข และบูลีน',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface DiffEntry {
  path: string;
  type: 'added' | 'removed' | 'changed';
  oldValue?: string;
  newValue?: string;
}

function deepDiff(a: unknown, b: unknown, path: string = ''): DiffEntry[] {
  const diffs: DiffEntry[] = [];

  if (a === b) return diffs;
  if (a === null || b === null || typeof a !== typeof b) {
    if (a === undefined) {
      diffs.push({ path: path || '(root)', type: 'added', newValue: JSON.stringify(b) });
    } else if (b === undefined) {
      diffs.push({ path: path || '(root)', type: 'removed', oldValue: JSON.stringify(a) });
    } else {
      diffs.push({ path: path || '(root)', type: 'changed', oldValue: JSON.stringify(a), newValue: JSON.stringify(b) });
    }
    return diffs;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
      const childPath = path ? `${path}[${i}]` : `[${i}]`;
      if (i >= a.length) {
        diffs.push({ path: childPath, type: 'added', newValue: JSON.stringify(b[i]) });
      } else if (i >= b.length) {
        diffs.push({ path: childPath, type: 'removed', oldValue: JSON.stringify(a[i]) });
      } else {
        diffs.push(...deepDiff(a[i], b[i], childPath));
      }
    }
    return diffs;
  }

  if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const allKeys = new Set([...Object.keys(aObj), ...Object.keys(bObj)]);
    for (const key of allKeys) {
      const childPath = path ? `${path}.${key}` : key;
      if (!(key in aObj)) {
        diffs.push({ path: childPath, type: 'added', newValue: JSON.stringify(bObj[key]) });
      } else if (!(key in bObj)) {
        diffs.push({ path: childPath, type: 'removed', oldValue: JSON.stringify(aObj[key]) });
      } else {
        diffs.push(...deepDiff(aObj[key], bObj[key], childPath));
      }
    }
    return diffs;
  }

  diffs.push({ path: path || '(root)', type: 'changed', oldValue: JSON.stringify(a), newValue: JSON.stringify(b) });
  return diffs;
}

const SAMPLE_A = `{
  "name": "DevToolBox",
  "version": "1.0.0",
  "features": ["JSON Formatter", "Base64 Encoder"],
  "config": {
    "theme": "dark",
    "language": "en",
    "notifications": true
  },
  "users": 15000
}`;

const SAMPLE_B = `{
  "name": "DevToolBox",
  "version": "2.0.0",
  "features": ["JSON Formatter", "Base64 Encoder", "JSON Diff"],
  "config": {
    "theme": "light",
    "language": "en",
    "autoSave": true
  },
  "users": 25000,
  "premium": true
}`;

export default function JsonDiffTool() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [leftJson, setLeftJson] = useState('');
  const [rightJson, setRightJson] = useState('');
  const [diffs, setDiffs] = useState<DiffEntry[] | null>(null);
  const [error, setError] = useState('');

  const handleCompare = useCallback(() => {
    setError('');
    setDiffs(null);

    let parsedA: unknown;
    let parsedB: unknown;
    try {
      parsedA = JSON.parse(leftJson);
    } catch {
      setError(t.invalidLeft);
      return;
    }
    try {
      parsedB = JSON.parse(rightJson);
    } catch {
      setError(t.invalidRight);
      return;
    }

    const result = deepDiff(parsedA, parsedB);
    setDiffs(result);
  }, [leftJson, rightJson, t]);

  const handleSwap = () => {
    setLeftJson(rightJson);
    setRightJson(leftJson);
    setDiffs(null);
  };

  const colorMap = { added: '#22c55e', removed: '#ef4444', changed: '#f59e0b' };
  const bgMap = { added: 'rgba(34,197,94,0.1)', removed: 'rgba(239,68,68,0.1)', changed: 'rgba(245,158,11,0.1)' };

  const summary = diffs ? {
    added: diffs.filter(d => d.type === 'added').length,
    removed: diffs.filter(d => d.type === 'removed').length,
    changed: diffs.filter(d => d.type === 'changed').length,
  } : null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-diff-tool">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleCompare} className="btn btn-primary">{t.compareBtn}</button>
        <button onClick={handleSwap} className="btn btn-secondary">{t.swap}</button>
        <button onClick={() => { setLeftJson(SAMPLE_A); setRightJson(SAMPLE_B); setDiffs(null); setError(''); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setLeftJson(''); setRightJson(''); setDiffs(null); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {/* Input panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.leftLabel}</label>
          <textarea
            value={leftJson}
            onChange={e => setLeftJson(e.target.value)}
            placeholder={t.leftPlaceholder}
            style={{ minHeight: 250, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.rightLabel}</label>
          <textarea
            value={rightJson}
            onChange={e => setRightJson(e.target.value)}
            placeholder={t.rightPlaceholder}
            style={{ minHeight: 250, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
      </div>

      {/* Results */}
      {diffs !== null && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.results}</label>
            {diffs.length > 0 && <CopyButton text={diffs.map(d => `${d.type}: ${d.path}${d.oldValue ? ` (${d.oldValue})` : ''}${d.newValue ? ` -> ${d.newValue}` : ''}`).join('\n')} />}
          </div>

          {/* Summary badges */}
          {summary && diffs.length > 0 && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: bgMap.added, color: colorMap.added, fontWeight: 600 }}>+ {summary.added} {t.added}</span>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: bgMap.removed, color: colorMap.removed, fontWeight: 600 }}>- {summary.removed} {t.removed}</span>
              <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: bgMap.changed, color: colorMap.changed, fontWeight: 600 }}>~ {summary.changed} {t.changed}</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', alignSelf: 'center' }}>{t.totalChanges}: {diffs.length}</span>
            </div>
          )}

          {diffs.length === 0 ? (
            <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '14px 16px', fontSize: 13, color: '#22c55e' }}>
              {t.noDiff}
            </div>
          ) : (
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-input)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', width: 80 }}></th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>{t.path}</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>{t.oldValue}</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>{t.newValue}</th>
                  </tr>
                </thead>
                <tbody>
                  {diffs.map((diff, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: bgMap[diff.type] }}>
                      <td style={{ padding: '8px 14px', fontWeight: 700, color: colorMap[diff.type], fontSize: 12 }}>
                        {diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : '~'} {t[diff.type]}
                      </td>
                      <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>{diff.path}</td>
                      <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', color: diff.type === 'removed' || diff.type === 'changed' ? colorMap.removed : 'var(--text-secondary)' }}>
                        {diff.oldValue || '-'}
                      </td>
                      <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', color: diff.type === 'added' || diff.type === 'changed' ? colorMap.added : 'var(--text-secondary)' }}>
                        {diff.newValue || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-beautifier-online`, label: 'JSON Beautifier' },
            { href: `/${lang}/tools/json-to-yaml-converter`, label: 'JSON to YAML' },
            { href: `/${lang}/tools/online-json-editor`, label: 'JSON Editor' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
