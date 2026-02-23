'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown Link Checker',
    description: 'Paste Markdown and instantly extract all links with anchor text in a searchable table.',
    inputLabel: 'Markdown Input', extractBtn: 'Extract Links', clear: 'Clear', loadSample: 'Load Sample',
    colAnchor: 'Anchor Text', colUrl: 'URL', colType: 'Type',
    noLinks: 'No links found in the Markdown content.',
    typeInternal: 'Internal', typeExternal: 'External', typeAnchor: 'Anchor', typeRelative: 'Relative',
    totalLinks: 'Total Links', externalLinks: 'External', internalLinks: 'Internal',
    searchPlaceholder: 'Filter links...',
    introTitle: 'Free Markdown Link Extractor and Checker',
    introText: 'Paste any Markdown document to instantly extract all hyperlinks in a structured table. Links are classified as External (http/https), Internal/Anchor (#), or Relative (relative paths). Use the search filter to quickly find specific links. Useful for documentation review, link audits, broken link detection, and content migration.',
    tipTitle: 'Markdown Link Tips',
    tip1: 'Standard Markdown links use [anchor text](URL) syntax',
    tip2: 'Reference links use [anchor text][ref] and [ref]: URL at the bottom',
    tip3: 'Anchor links starting with # link to headings within the same page',
    tip4: 'Relative links like ./page.md work in GitHub READMEs and documentation sites',
    tip5: 'Always test external links periodically as URLs can change or expire',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What types of Markdown links are extracted?',
    faq1a: 'The tool extracts inline links in [text](url) format and bare URLs starting with http:// or https://. Reference-style links ([text][ref] with [ref]: url) are also detected. Image links ![alt](url) are included as well.',
    faq2q: 'How are links classified?',
    faq2a: 'External links start with http:// or https:// and point to other websites. Anchor links start with # and reference headings or sections within the same page. Relative links use relative paths like ./file.md or ../parent/. Internal links point to paths on the same domain.',
    faq3q: 'Does this tool check if links are working?',
    faq3a: 'This tool extracts and classifies links from your Markdown but does not make HTTP requests to verify if they are live. For actual link validation, you would need to test each URL in a browser or use a dedicated link-checking tool that makes HTTP requests.',
    faq4q: 'How do I check for duplicate links?',
    faq4a: 'Look at the extracted link table for duplicate URLs in the URL column. The same URL appearing multiple times is fine but you may want to ensure each instance has appropriate anchor text. Duplicate anchor texts pointing to different URLs may indicate confusing link naming.',
    faq5q: 'Can I export the extracted links?',
    faq5a: 'Yes, click the Copy button next to each row to copy the URL, or you can manually select the table content. The links are displayed in a clean table format for easy copying to a spreadsheet or other tool.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Markdown 链接检查器', description: '粘贴 Markdown 并即时提取所有链接及锚文本到表格中。',
    inputLabel: 'Markdown 输入', extractBtn: '提取链接', clear: '清除', loadSample: '加载示例',
    colAnchor: '锚文本', colUrl: 'URL', colType: '类型',
    noLinks: '在 Markdown 内容中未找到链接。',
    typeInternal: '内部', typeExternal: '外部', typeAnchor: '锚点', typeRelative: '相对',
    totalLinks: '总链接数', externalLinks: '外部', internalLinks: '内部',
    searchPlaceholder: '筛选链接...',
    introTitle: '免费 Markdown 链接提取器', introText: '粘贴任何 Markdown 文档，即时提取所有超链接到结构化表格中。',
    tipTitle: 'Markdown 链接技巧', tip1: '标准链接使用 [锚文本](URL) 语法', tip2: '引用链接使用 [锚文本][ref] 和底部的 [ref]: URL',
    tip3: '以 # 开头的锚点链接指向同页标题', tip4: '像 ./page.md 的相对链接在 GitHub README 中有效', tip5: '定期测试外部链接，因为 URL 可能会变化或过期',
    faqTitle: '常见问题', faq1q: '提取哪些类型的 Markdown 链接？', faq1a: '工具提取 [文本](url) 格式的内联链接和以 http:// 或 https:// 开头的裸 URL。',
    faq2q: '链接如何分类？', faq2a: '外部链接以 http/https 开头，锚点链接以 # 开头，相对链接使用相对路径。',
    faq3q: '此工具检查链接是否有效吗？', faq3a: '工具只提取链接，不发送 HTTP 请求验证链接是否有效。',
    faq4q: '如何检查重复链接？', faq4a: '查看提取的链接表中 URL 列是否有重复项。',
    faq5q: '可以导出提取的链接吗？', faq5a: '是的，点击每行旁边的复制按钮，或手动选择表格内容。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Verificateur de Liens Markdown', description: 'Collez du Markdown et extrayez instantanement tous les liens.',
    inputLabel: 'Entree Markdown', extractBtn: 'Extraire les liens', clear: 'Effacer', loadSample: 'Charger exemple',
    colAnchor: 'Texte d\'ancrage', colUrl: 'URL', colType: 'Type',
    noLinks: 'Aucun lien trouve dans le contenu Markdown.',
    typeInternal: 'Interne', typeExternal: 'Externe', typeAnchor: 'Ancre', typeRelative: 'Relatif',
    totalLinks: 'Total liens', externalLinks: 'Externe', internalLinks: 'Interne',
    searchPlaceholder: 'Filtrer les liens...',
    introTitle: 'Extracteur de liens Markdown gratuit', introText: 'Collez un document Markdown pour extraire tous les liens dans un tableau structure.',
    tipTitle: 'Conseils liens Markdown', tip1: 'Liens standards: [texte](URL)', tip2: 'Liens de reference: [texte][ref]',
    tip3: 'Les liens d\'ancrage commencent par #', tip4: 'Les liens relatifs fonctionnent dans les READMEs GitHub', tip5: 'Testez les liens externes periodiquement',
    faqTitle: 'Questions frequentes', faq1q: 'Quels types de liens sont extraits?', faq1a: 'Liens inline [texte](url) et URLs directes http/https.',
    faq2q: 'Comment les liens sont-ils classes?', faq2a: 'Externes (http/https), ancres (#), relatifs (chemins relatifs).',
    faq3q: 'L\'outil verifie si les liens fonctionnent?', faq3a: 'Non, il extrait seulement les liens sans verifier leur validite.',
    faq4q: 'Comment verifier les liens en double?', faq4a: 'Cherchez les URL en double dans la colonne URL du tableau.',
    faq5q: 'Puis-je exporter les liens?', faq5a: 'Oui, copiez chaque lien ou selectionnez le tableau manuellement.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Markdown Link-Prufer', description: 'Fuegen Sie Markdown ein und extrahieren Sie sofort alle Links.',
    inputLabel: 'Markdown-Eingabe', extractBtn: 'Links extrahieren', clear: 'Loeschen', loadSample: 'Beispiel laden',
    colAnchor: 'Ankertext', colUrl: 'URL', colType: 'Typ',
    noLinks: 'Keine Links im Markdown-Inhalt gefunden.',
    typeInternal: 'Intern', typeExternal: 'Extern', typeAnchor: 'Anker', typeRelative: 'Relativ',
    totalLinks: 'Links gesamt', externalLinks: 'Extern', internalLinks: 'Intern',
    searchPlaceholder: 'Links filtern...',
    introTitle: 'Kostenloser Markdown-Link-Extraktor', introText: 'Markdown-Dokument einfuegen, um alle Links in einer strukturierten Tabelle zu extrahieren.',
    tipTitle: 'Markdown-Link Tipps', tip1: 'Standard-Links: [Text](URL)', tip2: 'Referenzlinks: [Text][Ref]',
    tip3: 'Ankerlinks beginnen mit #', tip4: 'Relative Links funktionieren in GitHub READMEs', tip5: 'Externe Links regelmaessig testen',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Welche Link-Typen werden extrahiert?', faq1a: 'Inline-Links [Text](URL) und direkte URLs.',
    faq2q: 'Wie werden Links klassifiziert?', faq2a: 'Extern (http/https), Anker (#), Relativ (relative Pfade).',
    faq3q: 'Prueft das Tool ob Links funktionieren?', faq3a: 'Nein, es extrahiert nur Links ohne ihre Gueltigkeit zu pruefen.',
    faq4q: 'Wie pruefen Sie auf doppelte Links?', faq4a: 'Suchen Sie nach doppelten URLs in der URL-Spalte der Tabelle.',
    faq5q: 'Kann ich die Links exportieren?', faq5a: 'Ja, kopieren Sie jeden Link oder waehlen Sie den Tabelleninhalt manuell.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Verificador de Enlaces Markdown', description: 'Pega Markdown y extrae instantaneamente todos los enlaces.',
    inputLabel: 'Entrada Markdown', extractBtn: 'Extraer enlaces', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    colAnchor: 'Texto de anclaje', colUrl: 'URL', colType: 'Tipo',
    noLinks: 'No se encontraron enlaces en el contenido Markdown.',
    typeInternal: 'Interno', typeExternal: 'Externo', typeAnchor: 'Ancla', typeRelative: 'Relativo',
    totalLinks: 'Total de enlaces', externalLinks: 'Externo', internalLinks: 'Interno',
    searchPlaceholder: 'Filtrar enlaces...',
    introTitle: 'Extractor de enlaces Markdown gratuito', introText: 'Pega un documento Markdown para extraer todos los enlaces en una tabla estructurada.',
    tipTitle: 'Consejos de enlaces Markdown', tip1: 'Enlaces estandar: [texto](URL)', tip2: 'Enlaces de referencia: [texto][ref]',
    tip3: 'Los enlaces de ancla empiezan con #', tip4: 'Los enlaces relativos funcionan en READMEs de GitHub', tip5: 'Prueba los enlaces externos periodicamente',
    faqTitle: 'Preguntas frecuentes', faq1q: 'Que tipos de enlaces se extraen?', faq1a: 'Enlaces inline [texto](url) y URLs directas.',
    faq2q: 'Como se clasifican los enlaces?', faq2a: 'Externos (http/https), anclas (#), relativos (rutas relativas).',
    faq3q: 'La herramienta verifica si los enlaces funcionan?', faq3a: 'No, solo extrae sin verificar la validez.',
    faq4q: 'Como busco enlaces duplicados?', faq4a: 'Busca URLs duplicadas en la columna URL de la tabla.',
    faq5q: 'Puedo exportar los enlaces?', faq5a: 'Si, copia cada enlace o selecciona el contenido de la tabla.',
    relatedTitle: 'Herramientas relacionadas',
  },
  pt: { title: 'Verificador de Links Markdown', description: 'Cole Markdown e extraia instantaneamente todos os links.',
    inputLabel: 'Entrada Markdown', extractBtn: 'Extrair links', clear: 'Limpar', loadSample: 'Carregar exemplo',
    colAnchor: 'Texto ancora', colUrl: 'URL', colType: 'Tipo',
    noLinks: 'Nenhum link encontrado no conteudo Markdown.',
    typeInternal: 'Interno', typeExternal: 'Externo', typeAnchor: 'Ancora', typeRelative: 'Relativo',
    totalLinks: 'Total de links', externalLinks: 'Externo', internalLinks: 'Interno', searchPlaceholder: 'Filtrar links...',
    introTitle: 'Extrator de links Markdown gratuito', introText: 'Cole um documento Markdown para extrair todos os links.',
    tipTitle: 'Dicas de links Markdown', tip1: 'Links padrao: [texto](URL)', tip2: 'Links de referencia: [texto][ref]',
    tip3: 'Links de ancora comecam com #', tip4: 'Links relativos funcionam em READMEs do GitHub', tip5: 'Teste links externos periodicamente',
    faqTitle: 'Perguntas frequentes', faq1q: 'Que tipos de links sao extraidos?', faq1a: 'Links inline [texto](url) e URLs diretas.',
    faq2q: 'Como os links sao classificados?', faq2a: 'Externos (http/https), ancoras (#), relativos.',
    faq3q: 'A ferramenta verifica se os links funcionam?', faq3a: 'Nao, apenas extrai sem verificar a validade.',
    faq4q: 'Como verificar links duplicados?', faq4a: 'Procure URLs duplicadas na coluna URL da tabela.',
    faq5q: 'Posso exportar os links?', faq5a: 'Sim, copie cada link ou selecione o conteudo da tabela.',
    relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Controllore Link Markdown', description: 'Incolla Markdown ed estrai istantaneamente tutti i link.',
    inputLabel: 'Input Markdown', extractBtn: 'Estrai link', clear: 'Cancella', loadSample: 'Carica esempio',
    colAnchor: 'Testo ancora', colUrl: 'URL', colType: 'Tipo',
    noLinks: 'Nessun link trovato nel contenuto Markdown.',
    typeInternal: 'Interno', typeExternal: 'Esterno', typeAnchor: 'Ancora', typeRelative: 'Relativo',
    totalLinks: 'Link totali', externalLinks: 'Esterno', internalLinks: 'Interno', searchPlaceholder: 'Filtra link...',
    introTitle: 'Estrattore di link Markdown gratuito', introText: 'Incolla un documento Markdown per estrarre tutti i link.',
    tipTitle: 'Suggerimenti link Markdown', tip1: 'Link standard: [testo](URL)', tip2: 'Link di riferimento: [testo][rif]',
    tip3: 'Link ancora iniziano con #', tip4: 'Link relativi funzionano nei README GitHub', tip5: 'Testa periodicamente i link esterni',
    faqTitle: 'Domande frequenti', faq1q: 'Quali tipi di link vengono estratti?', faq1a: 'Link inline [testo](url) e URL dirette.',
    faq2q: 'Come vengono classificati i link?', faq2a: 'Esterni (http/https), ancore (#), relativi.',
    faq3q: 'Lo strumento verifica se i link funzionano?', faq3a: 'No, estrae solo senza verificare la validita.',
    faq4q: 'Come verifico i link duplicati?', faq4a: 'Cerca URL duplicate nella colonna URL della tabella.',
    faq5q: 'Posso esportare i link?', faq5a: 'Si, copia ogni link o seleziona il contenuto della tabella.',
    relatedTitle: 'Strumenti correlati' },
  nl: { title: 'Markdown Link Checker', description: 'Plak Markdown en extraheer direct alle links.',
    inputLabel: 'Markdown invoer', extractBtn: 'Links extraheren', clear: 'Wissen', loadSample: 'Voorbeeld laden',
    colAnchor: 'Ankertekst', colUrl: 'URL', colType: 'Type',
    noLinks: 'Geen links gevonden in de Markdown-inhoud.',
    typeInternal: 'Intern', typeExternal: 'Extern', typeAnchor: 'Anker', typeRelative: 'Relatief',
    totalLinks: 'Totale links', externalLinks: 'Extern', internalLinks: 'Intern', searchPlaceholder: 'Links filteren...',
    introTitle: 'Gratis Markdown link extractor', introText: 'Plak een Markdown document om alle links te extraheren.',
    tipTitle: 'Markdown link tips', tip1: 'Standaard links: [tekst](URL)', tip2: 'Referentielinks: [tekst][ref]',
    tip3: 'Ankerlinks beginnen met #', tip4: 'Relatieve links werken in GitHub READMEs', tip5: 'Test externe links periodiek',
    faqTitle: 'Veelgestelde vragen', faq1q: 'Welke typen links worden geextraheerd?', faq1a: 'Inline links [tekst](url) en directe URL\'s.',
    faq2q: 'Hoe worden links geclassificeerd?', faq2a: 'Extern (http/https), anker (#), relatief.',
    faq3q: 'Controleert het hulpmiddel of links werken?', faq3a: 'Nee, het extraheert alleen zonder geldigheid te verifiëren.',
    faq4q: 'Hoe controleer ik op dubbele links?', faq4a: 'Zoek naar dubbele URL\'s in de URL-kolom van de tabel.',
    faq5q: 'Kan ik de links exporteren?', faq5a: 'Ja, kopieer elke link of selecteer de tabelinhoud handmatig.',
    relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Sprawdzarka Linkow Markdown', description: 'Wklej Markdown i natychmiast wyodrebnij wszystkie linki.',
    inputLabel: 'Wejscie Markdown', extractBtn: 'Wyodrebnij linki', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad',
    colAnchor: 'Tekst zakotwiczenia', colUrl: 'URL', colType: 'Typ',
    noLinks: 'Nie znaleziono linkow w tresci Markdown.',
    typeInternal: 'Wewnetrzny', typeExternal: 'Zewnetrzny', typeAnchor: 'Kotwica', typeRelative: 'Wzgledny',
    totalLinks: 'Lacznie linkow', externalLinks: 'Zewnetrzne', internalLinks: 'Wewnetrzne', searchPlaceholder: 'Filtruj linki...',
    introTitle: 'Darmowy ekstraktor linkow Markdown', introText: 'Wklej dokument Markdown, aby wyodrebnic wszystkie linki.',
    tipTitle: 'Wskazowki linkow Markdown', tip1: 'Standardowe linki: [tekst](URL)', tip2: 'Linki referencyjne: [tekst][ref]',
    tip3: 'Linki kotwicy zaczynaja sie od #', tip4: 'Wzgledne linki dzialaja w GitHub README', tip5: 'Regularnie testuj zewnetrzne linki',
    faqTitle: 'Czesto zadawane pytania', faq1q: 'Jakie typy linkow sa wyodrebniane?', faq1a: 'Linki inline [tekst](url) i bezposrednie URL.',
    faq2q: 'Jak klasyfikowane sa linki?', faq2a: 'Zewnetrzne (http/https), kotwice (#), wzgledne.',
    faq3q: 'Czy narzedzie sprawdza czy linki dzialaja?', faq3a: 'Nie, tylko wyodrenia bez weryfikacji waznosci.',
    faq4q: 'Jak sprawdzic duplikaty linkow?', faq4a: 'Szukaj zdublowanych URL w kolumnie URL tabeli.',
    faq5q: 'Czy moge eksportowac linki?', faq5a: 'Tak, skopiuj kazdy link lub reczna selekcje zawartosci tabeli.',
    relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'Markdown Lankontrollant', description: 'Klistra in Markdown och extrahera omedelbart alla lankar.',
    inputLabel: 'Markdown indata', extractBtn: 'Extrahera lankar', clear: 'Rensa', loadSample: 'Ladda exempel',
    colAnchor: 'Ankartext', colUrl: 'URL', colType: 'Typ',
    noLinks: 'Inga lankar hittades i Markdown-innehallet.',
    typeInternal: 'Intern', typeExternal: 'Extern', typeAnchor: 'Ankar', typeRelative: 'Relativ',
    totalLinks: 'Totalt lankar', externalLinks: 'Extern', internalLinks: 'Intern', searchPlaceholder: 'Filtrera lankar...',
    introTitle: 'Gratis Markdown lankextraktor', introText: 'Klistra in ett Markdown-dokument for att extrahera alla lankar.',
    tipTitle: 'Markdown lanktips', tip1: 'Standardlankar: [text](URL)', tip2: 'Referenslankar: [text][ref]',
    tip3: 'Ankarlankar boerjar med #', tip4: 'Relativa lankar fungerar i GitHub READMEs', tip5: 'Testa externa lankar periodiskt',
    faqTitle: 'Vanliga fragor', faq1q: 'Vilka typer av lankar extraheras?', faq1a: 'Inline lankar [text](url) och direkta URL:er.',
    faq2q: 'Hur klassificeras lankar?', faq2a: 'Externa (http/https), ankar (#), relativa.',
    faq3q: 'Kontrollerar verktyget om lankar fungerar?', faq3a: 'Nej, det extraherar bara utan att verifiera giltighet.',
    faq4q: 'Hur kontrollerar jag duplicerade lankar?', faq4a: 'Leta efter duplicerade URL:er i URL-kolumnen i tabellen.',
    faq5q: 'Kan jag exportera lankarna?', faq5a: 'Ja, kopiera varje lank eller markera tabellinnehallet manuellt.',
    relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Markdown Lenkesjekker', description: 'Lim inn Markdown og trekk umiddelbart ut alle lenker.',
    inputLabel: 'Markdown inndata', extractBtn: 'Trekk ut lenker', clear: 'Toemme', loadSample: 'Last eksempel',
    colAnchor: 'Ankertekst', colUrl: 'URL', colType: 'Type',
    noLinks: 'Ingen lenker funnet i Markdown-innholdet.',
    typeInternal: 'Intern', typeExternal: 'Ekstern', typeAnchor: 'Anker', typeRelative: 'Relativ',
    totalLinks: 'Totalt lenker', externalLinks: 'Ekstern', internalLinks: 'Intern', searchPlaceholder: 'Filtrer lenker...',
    introTitle: 'Gratis Markdown lenkeeksporterer', introText: 'Lim inn et Markdown-dokument for aa trekke ut alle lenker.',
    tipTitle: 'Markdown lenketips', tip1: 'Standardlenker: [tekst](URL)', tip2: 'Referanselenker: [tekst][ref]',
    tip3: 'Ankerlenker starter med #', tip4: 'Relative lenker fungerer i GitHub READMEs', tip5: 'Test eksterne lenker periodisk',
    faqTitle: 'Vanlige spoersmaal', faq1q: 'Hvilke typer lenker trekkes ut?', faq1a: 'Inline lenker [tekst](url) og direkte URL-er.',
    faq2q: 'Hvordan klassifiseres lenker?', faq2a: 'Eksterne (http/https), anker (#), relative.',
    faq3q: 'Sjekker verktoeyet om lenker fungerer?', faq3a: 'Nei, det trekker bare ut uten aa verifisere gyldighet.',
    faq4q: 'Hvordan sjekker jeg duplikate lenker?', faq4a: 'Se etter duplikate URL-er i URL-kolonnen i tabellen.',
    faq5q: 'Kan jeg eksportere lenkene?', faq5a: 'Ja, kopier hver lenke eller velg tabellinnholdet manuelt.',
    relatedTitle: 'Relaterte verktoy' },
  ja: { title: 'Markdown リンクチェッカー', description: 'Markdown を貼り付けてすべてのリンクとアンカーテキストを即座に抽出します。',
    inputLabel: 'Markdown 入力', extractBtn: 'リンク抽出', clear: 'クリア', loadSample: 'サンプル読込',
    colAnchor: 'アンカーテキスト', colUrl: 'URL', colType: 'タイプ',
    noLinks: 'Markdown コンテンツにリンクが見つかりません。',
    typeInternal: '内部', typeExternal: '外部', typeAnchor: 'アンカー', typeRelative: '相対',
    totalLinks: '総リンク数', externalLinks: '外部', internalLinks: '内部', searchPlaceholder: 'リンクを絞り込む...',
    introTitle: '無料 Markdown リンク抽出ツール', introText: 'Markdown ドキュメントを貼り付けてすべてのリンクを構造化テーブルで抽出します。',
    tipTitle: 'Markdown リンクのヒント', tip1: '標準リンク: [テキスト](URL)', tip2: '参照リンク: [テキスト][ref]',
    tip3: 'アンカーリンクは # で始まる', tip4: '相対リンクは GitHub README で機能', tip5: '外部リンクを定期的にテスト',
    faqTitle: 'よくある質問', faq1q: 'どのタイプのリンクが抽出されますか？', faq1a: 'インラインリンク [テキスト](url) と直接 URL。',
    faq2q: 'リンクはどのように分類されますか？', faq2a: '外部 (http/https)、アンカー (#)、相対。',
    faq3q: 'ツールはリンクが機能するか確認しますか？', faq3a: 'いいえ、有効性を確認せずに抽出のみ。',
    faq4q: '重複リンクを確認するには？', faq4a: 'テーブルの URL 列で重複 URL を探してください。',
    faq5q: 'リンクをエクスポートできますか？', faq5a: 'はい、各リンクをコピーするかテーブルを手動で選択。',
    relatedTitle: '関連ツール' },
  ko: { title: 'Markdown 링크 체커', description: 'Markdown을 붙여넣어 모든 링크와 앵커 텍스트를 즉시 추출합니다.',
    inputLabel: 'Markdown 입력', extractBtn: '링크 추출', clear: '지우기', loadSample: '샘플 로드',
    colAnchor: '앵커 텍스트', colUrl: 'URL', colType: '유형',
    noLinks: 'Markdown 콘텐츠에서 링크를 찾을 수 없습니다.',
    typeInternal: '내부', typeExternal: '외부', typeAnchor: '앵커', typeRelative: '상대',
    totalLinks: '총 링크', externalLinks: '외부', internalLinks: '내부', searchPlaceholder: '링크 필터링...',
    introTitle: '무료 Markdown 링크 추출기', introText: 'Markdown 문서를 붙여넣어 모든 링크를 구조화된 테이블로 추출합니다.',
    tipTitle: 'Markdown 링크 팁', tip1: '표준 링크: [텍스트](URL)', tip2: '참조 링크: [텍스트][ref]',
    tip3: '앵커 링크는 #으로 시작', tip4: '상대 링크는 GitHub README에서 작동', tip5: '외부 링크를 주기적으로 테스트',
    faqTitle: '자주 묻는 질문', faq1q: '어떤 유형의 링크가 추출되나요?', faq1a: '인라인 링크 [텍스트](url)와 직접 URL.',
    faq2q: '링크는 어떻게 분류되나요?', faq2a: '외부 (http/https), 앵커 (#), 상대.',
    faq3q: '도구가 링크가 작동하는지 확인하나요?', faq3a: '아니요, 유효성을 확인하지 않고 추출만 합니다.',
    faq4q: '중복 링크를 확인하는 방법?', faq4a: '테이블의 URL 열에서 중복 URL을 찾으세요.',
    faq5q: '링크를 내보낼 수 있나요?', faq5a: '예, 각 링크를 복사하거나 테이블 내용을 수동으로 선택하세요.',
    relatedTitle: '관련 도구' },
  id: { title: 'Pemeriksa Tautan Markdown', description: 'Tempel Markdown dan ekstrak semua tautan dengan teks jangkar secara instan.',
    inputLabel: 'Masukan Markdown', extractBtn: 'Ekstrak tautan', clear: 'Hapus', loadSample: 'Muat contoh',
    colAnchor: 'Teks jangkar', colUrl: 'URL', colType: 'Jenis',
    noLinks: 'Tidak ada tautan ditemukan dalam konten Markdown.',
    typeInternal: 'Internal', typeExternal: 'Eksternal', typeAnchor: 'Jangkar', typeRelative: 'Relatif',
    totalLinks: 'Total tautan', externalLinks: 'Eksternal', internalLinks: 'Internal', searchPlaceholder: 'Filter tautan...',
    introTitle: 'Ekstraktor tautan Markdown gratis', introText: 'Tempel dokumen Markdown untuk mengekstrak semua tautan dalam tabel terstruktur.',
    tipTitle: 'Tips tautan Markdown', tip1: 'Tautan standar: [teks](URL)', tip2: 'Tautan referensi: [teks][ref]',
    tip3: 'Tautan jangkar dimulai dengan #', tip4: 'Tautan relatif berfungsi di README GitHub', tip5: 'Uji tautan eksternal secara berkala',
    faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Jenis tautan apa yang diekstrak?', faq1a: 'Tautan inline [teks](url) dan URL langsung.',
    faq2q: 'Bagaimana tautan diklasifikasikan?', faq2a: 'Eksternal (http/https), jangkar (#), relatif.',
    faq3q: 'Apakah alat memeriksa apakah tautan berfungsi?', faq3a: 'Tidak, hanya mengekstrak tanpa memverifikasi validitas.',
    faq4q: 'Bagaimana memeriksa tautan duplikat?', faq4a: 'Cari URL duplikat di kolom URL tabel.',
    faq5q: 'Bisakah saya mengekspor tautan?', faq5a: 'Ya, salin setiap tautan atau pilih konten tabel secara manual.',
    relatedTitle: 'Alat terkait' },
  th: { title: 'ตัวตรวจสอบลิงก์ Markdown', description: 'วาง Markdown และแยกลิงก์ทั้งหมดพร้อมข้อความจุดยึดได้ทันที',
    inputLabel: 'อินพุต Markdown', extractBtn: 'แยกลิงก์', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง',
    colAnchor: 'ข้อความจุดยึด', colUrl: 'URL', colType: 'ประเภท',
    noLinks: 'ไม่พบลิงก์ในเนื้อหา Markdown',
    typeInternal: 'ภายใน', typeExternal: 'ภายนอก', typeAnchor: 'จุดยึด', typeRelative: 'สัมพัทธ์',
    totalLinks: 'ลิงก์ทั้งหมด', externalLinks: 'ภายนอก', internalLinks: 'ภายใน', searchPlaceholder: 'กรองลิงก์...',
    introTitle: 'เครื่องมือแยกลิงก์ Markdown ฟรี', introText: 'วาง Markdown เพื่อแยกลิงก์ทั้งหมดในตารางที่มีโครงสร้าง',
    tipTitle: 'เคล็ดลับลิงก์ Markdown', tip1: 'ลิงก์มาตรฐาน: [ข้อความ](URL)', tip2: 'ลิงก์อ้างอิง: [ข้อความ][ref]',
    tip3: 'ลิงก์จุดยึดเริ่มต้นด้วย #', tip4: 'ลิงก์สัมพัทธ์ใช้ได้ใน GitHub README', tip5: 'ทดสอบลิงก์ภายนอกเป็นระยะ',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ลิงก์ประเภทใดที่ถูกแยกออก?', faq1a: 'ลิงก์แบบ inline [ข้อความ](url) และ URL โดยตรง',
    faq2q: 'ลิงก์จัดประเภทอย่างไร?', faq2a: 'ภายนอก (http/https) จุดยึด (#) สัมพัทธ์',
    faq3q: 'เครื่องมือตรวจสอบว่าลิงก์ทำงานหรือไม่?', faq3a: 'ไม่ แยกเฉพาะโดยไม่ตรวจสอบความถูกต้อง',
    faq4q: 'จะตรวจสอบลิงก์ซ้ำได้อย่างไร?', faq4a: 'มองหา URL ซ้ำในคอลัมน์ URL ของตาราง',
    faq5q: 'ฉันสามารถส่งออกลิงก์ได้ไหม?', faq5a: 'ได้ คัดลอกแต่ละลิงก์หรือเลือกเนื้อหาตารางด้วยตนเอง',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const SAMPLE_MD = `# My Project

Welcome to [DevToolBox](https://viadreams.cc), the best developer tools site.

## Resources

- [GitHub Repository](https://github.com/example/repo)
- [Documentation](./docs/README.md)
- [API Reference](../api/reference.md)
- [Back to Top](#introduction)
- [Contact Us](mailto:hello@example.com)

See also the [changelog](CHANGELOG.md) and [license](LICENSE).

For issues, visit https://github.com/example/repo/issues

![Logo](./images/logo.png)`;

interface ExtractedLink {
  anchor: string;
  url: string;
  type: string;
}

function extractLinks(markdown: string, t: Record<string, string>): ExtractedLink[] {
  const links: ExtractedLink[] = [];
  const seen = new Set<string>();

  const inlineRegex = /!?\[([^\]]*)\]\(([^)]+)\)/g;
  let m;
  while ((m = inlineRegex.exec(markdown)) !== null) {
    const anchor = m[1] || '(image)';
    const url = m[2].trim();
    const key = `${anchor}::${url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    let type = t.typeRelative;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) type = t.typeExternal;
    else if (url.startsWith('#')) type = t.typeAnchor;
    links.push({ anchor, url, type });
  }

  const bareUrlRegex = /(?<!\()(https?:\/\/[^\s)\]]+)/g;
  while ((m = bareUrlRegex.exec(markdown)) !== null) {
    const url = m[1];
    const key = `::${url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    links.push({ anchor: url, url, type: t.typeExternal });
  }

  return links;
}

export default function MarkdownLinkChecker() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [links, setLinks] = useState<ExtractedLink[] | null>(null);
  const [filter, setFilter] = useState('');

  const extract = useCallback(() => {
    setLinks(extractLinks(input, t));
  }, [input, t]);

  const filtered = links ? links.filter(l =>
    l.anchor.toLowerCase().includes(filter.toLowerCase()) ||
    l.url.toLowerCase().includes(filter.toLowerCase())
  ) : [];

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

  const typeColor = (type: string) => {
    if (type === t.typeExternal) return '#3b82f6';
    if (type === t.typeAnchor) return '#22c55e';
    return '#f59e0b';
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="markdown-link-checker">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={extract} className="btn btn-primary">{t.extractBtn}</button>
        <button onClick={() => { setInput(SAMPLE_MD); setLinks(null); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setLinks(null); setFilter(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} style={{ minHeight: 180, fontFamily: 'monospace', fontSize: 13 }} placeholder="# My Doc&#10;&#10;[Link text](https://example.com)" />
      </div>

      {links !== null && (
        <div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.totalLinks}: <strong>{links.length}</strong></span>
            <span style={{ fontSize: 13, color: '#3b82f6' }}>{t.externalLinks}: <strong>{links.filter(l => l.type === t.typeExternal).length}</strong></span>
            <span style={{ fontSize: 13, color: '#22c55e' }}>{t.internalLinks}: <strong>{links.filter(l => l.type !== t.typeExternal).length}</strong></span>
            <input value={filter} onChange={e => setFilter(e.target.value)} placeholder={t.searchPlaceholder} style={{ marginLeft: 'auto', width: 200, fontSize: 13 }} />
          </div>

          {links.length === 0 ? (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px', fontSize: 13, color: 'var(--text-secondary)' }}>
              {t.noLinks}
            </div>
          ) : (
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', background: 'var(--bg-input)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', width: 30 }}>#</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>{t.colAnchor}</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>{t.colUrl}</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', width: 90 }}>{t.colType}</th>
                    <th style={{ padding: '10px 14px', width: 50 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((link, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 14px', color: 'var(--text-secondary)', fontSize: 11 }}>{idx + 1}</td>
                      <td style={{ padding: '8px 14px', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.anchor}</td>
                      <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 12, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {link.url.startsWith('http') ? (
                          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{link.url}</a>
                        ) : link.url}
                      </td>
                      <td style={{ padding: '8px 14px' }}>
                        <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: `${typeColor(link.type)}22`, color: typeColor(link.type), fontWeight: 600 }}>{link.type}</span>
                      </td>
                      <td style={{ padding: '8px 14px' }}><CopyButton text={link.url} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

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
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/string-utilities`, label: 'String Utilities' },
            { href: `/${lang}/tools/yaml-validator-online`, label: 'YAML Validator' },
            { href: `/${lang}/tools/ascii-table-generator`, label: 'ASCII Table Generator' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
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
