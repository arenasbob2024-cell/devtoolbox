'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTTP Request Builder',
    description: 'Build and preview HTTP requests visually. Generate code for cURL, fetch, and axios. Supports GET, POST, PUT, DELETE with headers and body.',
    urlLabel: 'Request URL',
    urlPlaceholder: 'https://api.example.com/users',
    methodLabel: 'Method',
    headersLabel: 'Headers',
    headerKeyPlaceholder: 'Key',
    headerValuePlaceholder: 'Value',
    addHeader: 'Add Header',
    bodyLabel: 'Request Body',
    bodyPlaceholder: '{\n  "name": "John",\n  "email": "john@example.com"\n}',
    generate: 'Generate Code',
    clear: 'Clear',
    outputFormat: 'Output Format',
    copyLabel: 'Copy Code',
    introTitle: 'Free Online HTTP Request Builder',
    introText: 'Build HTTP requests visually by specifying the URL, method, headers, and body. Generate ready-to-use code snippets in cURL, JavaScript fetch, and axios formats.',
    howTitle: 'How to Build HTTP Requests',
    step1: 'Enter the request URL',
    step2: 'Select the HTTP method (GET, POST, PUT, DELETE, PATCH)',
    step3: 'Add custom headers (optional)',
    step4: 'Add a request body for POST/PUT/PATCH (optional)',
    featuresTitle: 'Features',
    feature1: 'Support for all common HTTP methods',
    feature2: 'Generate cURL, fetch, and axios code',
    feature3: 'Add multiple custom headers',
    feature4: 'JSON body editor with syntax highlighting',
    feature5: 'One-click copy for generated code',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What HTTP methods are supported?',
    faq1a: 'This tool supports GET, POST, PUT, DELETE, PATCH, and HEAD methods. Each method serves a different purpose in RESTful APIs.',
    faq2q: 'What output formats are available?',
    faq2a: 'You can generate code in three formats: cURL (command line), JavaScript fetch API, and axios (popular HTTP library). Each format produces ready-to-use code.',
    faq3q: 'Can I add custom headers?',
    faq3a: 'Yes. Click "Add Header" to add key-value pairs. Common headers include Content-Type, Authorization, Accept, and custom API keys.',
    faq4q: 'When should I include a request body?',
    faq4a: 'Request bodies are typically used with POST, PUT, and PATCH methods to send data to the server. GET and DELETE requests usually do not include a body.',
    faq5q: 'Is my request data sent to a server?',
    faq5a: 'No. This tool only generates code locally in your browser. No actual HTTP requests are sent, and no data leaves your device.',
    relatedTitle: 'Related Tools',
    errorEmpty: 'Please enter a URL.',
    removeHeader: 'Remove',
  },
  zh: {
    title: 'HTTP 请求构建器',
    description: '可视化构建和预览 HTTP 请求。生成 cURL、fetch 和 axios 代码。支持 GET、POST、PUT、DELETE 带头信息和请求体。',
    urlLabel: '请求 URL', urlPlaceholder: 'https://api.example.com/users', methodLabel: '方法', headersLabel: '头信息', headerKeyPlaceholder: '键', headerValuePlaceholder: '值', addHeader: '添加头信息', bodyLabel: '请求体', bodyPlaceholder: '{\n  "name": "张三",\n  "email": "zhang@example.com"\n}', generate: '生成代码', clear: '清除', outputFormat: '输出格式', copyLabel: '复制代码',
    introTitle: '免费在线 HTTP 请求构建器', introText: '可视化构建 HTTP 请求，指定 URL、方法、头信息和请求体。生成 cURL、JavaScript fetch 和 axios 格式的代码片段。',
    howTitle: '如何构建 HTTP 请求', step1: '输入请求 URL', step2: '选择 HTTP 方法', step3: '添加自定义头信息（可选）', step4: '为 POST/PUT/PATCH 添加请求体（可选）',
    featuresTitle: '功能特性', feature1: '支持所有常见 HTTP 方法', feature2: '生成 cURL、fetch 和 axios 代码', feature3: '添加多个自定义头信息', feature4: 'JSON 请求体编辑器', feature5: '一键复制生成的代码',
    faqTitle: '常见问题', faq1q: '支持哪些 HTTP 方法？', faq1a: '支持 GET、POST、PUT、DELETE、PATCH 和 HEAD 方法。', faq2q: '有哪些输出格式？', faq2a: '可以生成 cURL、JavaScript fetch API 和 axios 三种格式的代码。', faq3q: '可以添加自定义头信息吗？', faq3a: '可以。点击"添加头信息"添加键值对。', faq4q: '什么时候需要请求体？', faq4a: '请求体通常用于 POST、PUT 和 PATCH 方法向服务器发送数据。', faq5q: '我的数据会发送到服务器吗？', faq5a: '不会。此工具仅在浏览器中本地生成代码，不会发送实际请求。',
    relatedTitle: '相关工具', errorEmpty: '请输入 URL。', removeHeader: '移除',
  },
  ja: {
    title: 'HTTPリクエストビルダー',
    description: 'HTTPリクエストを視覚的に構築してプレビュー。cURL、fetch、axiosのコードを生成。',
    urlLabel: 'リクエストURL', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'メソッド', headersLabel: 'ヘッダー', headerKeyPlaceholder: 'キー', headerValuePlaceholder: '値', addHeader: 'ヘッダー追加', bodyLabel: 'リクエストボディ', bodyPlaceholder: '{\n  "name": "太郎",\n  "email": "taro@example.com"\n}', generate: 'コード生成', clear: 'クリア', outputFormat: '出力形式', copyLabel: 'コードをコピー',
    introTitle: '無料オンラインHTTPリクエストビルダー', introText: 'URL、メソッド、ヘッダー、ボディを指定してHTTPリクエストを視覚的に構築します。',
    howTitle: 'HTTPリクエストの構築方法', step1: 'リクエストURLを入力', step2: 'HTTPメソッドを選択', step3: 'カスタムヘッダーを追加（任意）', step4: 'リクエストボディを追加（任意）',
    featuresTitle: '機能', feature1: '全般的なHTTPメソッドに対応', feature2: 'cURL、fetch、axiosコードを生成', feature3: '複数のカスタムヘッダー追加', feature4: 'JSONボディエディター', feature5: 'ワンクリックコピー',
    faqTitle: 'よくある質問', faq1q: 'サポートされるHTTPメソッドは？', faq1a: 'GET、POST、PUT、DELETE、PATCH、HEADをサポートしています。', faq2q: '出力形式は？', faq2a: 'cURL、JavaScript fetch API、axiosの3形式で生成できます。', faq3q: 'カスタムヘッダーを追加できますか？', faq3a: 'はい。「ヘッダー追加」でキーバリューペアを追加できます。', faq4q: 'リクエストボディはいつ必要ですか？', faq4a: 'POST、PUT、PATCHメソッドでサーバーにデータを送信する際に使用します。', faq5q: 'データはサーバーに送信されますか？', faq5a: 'いいえ。ブラウザ内でのみコードが生成されます。',
    relatedTitle: '関連ツール', errorEmpty: 'URLを入力してください。', removeHeader: '削除',
  },
  ko: {
    title: 'HTTP 요청 빌더',
    description: 'HTTP 요청을 시각적으로 구축하고 미리 봅니다. cURL, fetch, axios 코드를 생성합니다.',
    urlLabel: '요청 URL', urlPlaceholder: 'https://api.example.com/users', methodLabel: '메서드', headersLabel: '헤더', headerKeyPlaceholder: '키', headerValuePlaceholder: '값', addHeader: '헤더 추가', bodyLabel: '요청 본문', bodyPlaceholder: '{\n  "name": "홍길동",\n  "email": "hong@example.com"\n}', generate: '코드 생성', clear: '지우기', outputFormat: '출력 형식', copyLabel: '코드 복사',
    introTitle: '무료 온라인 HTTP 요청 빌더', introText: 'URL, 메서드, 헤더, 본문을 지정하여 HTTP 요청을 시각적으로 구축합니다.',
    howTitle: 'HTTP 요청 구축 방법', step1: '요청 URL 입력', step2: 'HTTP 메서드 선택', step3: '커스텀 헤더 추가(선택)', step4: '요청 본문 추가(선택)',
    featuresTitle: '기능', feature1: '모든 일반 HTTP 메서드 지원', feature2: 'cURL, fetch, axios 코드 생성', feature3: '다중 커스텀 헤더 추가', feature4: 'JSON 본문 편집기', feature5: '원클릭 코드 복사',
    faqTitle: '자주 묻는 질문', faq1q: '어떤 HTTP 메서드를 지원하나요?', faq1a: 'GET, POST, PUT, DELETE, PATCH, HEAD를 지원합니다.', faq2q: '출력 형식은?', faq2a: 'cURL, JavaScript fetch API, axios 3가지 형식으로 생성 가능합니다.', faq3q: '커스텀 헤더를 추가할 수 있나요?', faq3a: '네. "헤더 추가"로 키-값 쌍을 추가할 수 있습니다.', faq4q: '요청 본문은 언제 필요한가요?', faq4a: 'POST, PUT, PATCH 메서드로 서버에 데이터를 보낼 때 사용합니다.', faq5q: '데이터가 서버로 전송되나요?', faq5a: '아니요. 브라우저에서만 코드가 생성됩니다.',
    relatedTitle: '관련 도구', errorEmpty: 'URL을 입력하세요.', removeHeader: '제거',
  },
  fr: {
    title: 'Constructeur de Requetes HTTP', description: 'Construisez et previsualez des requetes HTTP. Generez du code cURL, fetch et axios.',
    urlLabel: 'URL de la requete', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Methode', headersLabel: 'En-tetes', headerKeyPlaceholder: 'Cle', headerValuePlaceholder: 'Valeur', addHeader: 'Ajouter en-tete', bodyLabel: 'Corps de la requete', bodyPlaceholder: '{\n  "name": "Jean",\n  "email": "jean@example.com"\n}', generate: 'Generer le code', clear: 'Effacer', outputFormat: 'Format de sortie', copyLabel: 'Copier le code',
    introTitle: 'Constructeur de Requetes HTTP Gratuit', introText: 'Construisez des requetes HTTP visuellement en specifiant l\'URL, la methode, les en-tetes et le corps.',
    howTitle: 'Comment construire des requetes HTTP', step1: 'Entrez l\'URL', step2: 'Selectionnez la methode HTTP', step3: 'Ajoutez des en-tetes personnalises', step4: 'Ajoutez un corps de requete',
    featuresTitle: 'Fonctionnalites', feature1: 'Toutes les methodes HTTP courantes', feature2: 'Generation de code cURL, fetch, axios', feature3: 'En-tetes personnalises multiples', feature4: 'Editeur JSON pour le corps', feature5: 'Copie en un clic',
    faqTitle: 'Questions frequentes', faq1q: 'Quelles methodes HTTP sont supportees ?', faq1a: 'GET, POST, PUT, DELETE, PATCH et HEAD.', faq2q: 'Quels formats de sortie ?', faq2a: 'cURL, JavaScript fetch API et axios.', faq3q: 'Puis-je ajouter des en-tetes ?', faq3a: 'Oui, cliquez sur "Ajouter en-tete".', faq4q: 'Quand utiliser un corps de requete ?', faq4a: 'Avec POST, PUT et PATCH pour envoyer des donnees.', faq5q: 'Mes donnees sont-elles envoyees ?', faq5a: 'Non, le code est genere localement.',
    relatedTitle: 'Outils connexes', errorEmpty: 'Entrez une URL.', removeHeader: 'Supprimer',
  },
  de: {
    title: 'HTTP-Anfrage Builder', description: 'Erstellen und Vorschau von HTTP-Anfragen. Code fuer cURL, fetch und axios generieren.',
    urlLabel: 'Anfrage-URL', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Methode', headersLabel: 'Header', headerKeyPlaceholder: 'Schluessel', headerValuePlaceholder: 'Wert', addHeader: 'Header hinzufuegen', bodyLabel: 'Anfragekoeprper', bodyPlaceholder: '{\n  "name": "Hans",\n  "email": "hans@example.com"\n}', generate: 'Code generieren', clear: 'Leeren', outputFormat: 'Ausgabeformat', copyLabel: 'Code kopieren',
    introTitle: 'Kostenloser HTTP-Anfrage Builder', introText: 'Erstellen Sie HTTP-Anfragen visuell durch Angabe von URL, Methode, Headern und Body.',
    howTitle: 'So erstellen Sie HTTP-Anfragen', step1: 'URL eingeben', step2: 'HTTP-Methode waehlen', step3: 'Benutzerdefinierte Header hinzufuegen', step4: 'Anfragebody hinzufuegen',
    featuresTitle: 'Funktionen', feature1: 'Alle gaengigen HTTP-Methoden', feature2: 'cURL, fetch, axios Code-Generierung', feature3: 'Mehrere benutzerdefinierte Header', feature4: 'JSON-Body-Editor', feature5: 'Ein-Klick-Kopie',
    faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Welche HTTP-Methoden?', faq1a: 'GET, POST, PUT, DELETE, PATCH und HEAD.', faq2q: 'Welche Ausgabeformate?', faq2a: 'cURL, JavaScript fetch und axios.', faq3q: 'Kann ich Header hinzufuegen?', faq3a: 'Ja, klicken Sie auf "Header hinzufuegen".', faq4q: 'Wann einen Body verwenden?', faq4a: 'Bei POST, PUT und PATCH zum Senden von Daten.', faq5q: 'Werden Daten gesendet?', faq5a: 'Nein, Code wird lokal generiert.',
    relatedTitle: 'Verwandte Tools', errorEmpty: 'URL eingeben.', removeHeader: 'Entfernen',
  },
  es: { title: 'Constructor de Solicitudes HTTP', description: 'Construya y previsualice solicitudes HTTP. Genere codigo cURL, fetch y axios.', urlLabel: 'URL de solicitud', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metodo', headersLabel: 'Cabeceras', headerKeyPlaceholder: 'Clave', headerValuePlaceholder: 'Valor', addHeader: 'Agregar cabecera', bodyLabel: 'Cuerpo', bodyPlaceholder: '{\n  "name": "Juan",\n  "email": "juan@example.com"\n}', generate: 'Generar codigo', clear: 'Limpiar', outputFormat: 'Formato', copyLabel: 'Copiar codigo', introTitle: 'Constructor HTTP Gratuito', introText: 'Construya solicitudes HTTP visualmente.', howTitle: 'Como construir solicitudes', step1: 'Ingrese la URL', step2: 'Seleccione el metodo', step3: 'Agregue cabeceras', step4: 'Agregue un cuerpo', featuresTitle: 'Caracteristicas', feature1: 'Todos los metodos HTTP', feature2: 'Codigo cURL, fetch, axios', feature3: 'Cabeceras personalizadas', feature4: 'Editor JSON', feature5: 'Copia en un clic', faqTitle: 'Preguntas frecuentes', faq1q: 'Que metodos soporta?', faq1a: 'GET, POST, PUT, DELETE, PATCH y HEAD.', faq2q: 'Que formatos de salida?', faq2a: 'cURL, fetch y axios.', faq3q: 'Puedo agregar cabeceras?', faq3a: 'Si, haga clic en "Agregar cabecera".', faq4q: 'Cuando usar un cuerpo?', faq4a: 'Con POST, PUT y PATCH.', faq5q: 'Se envian mis datos?', faq5a: 'No, el codigo se genera localmente.', relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Ingrese una URL.', removeHeader: 'Eliminar' },
  pt: { title: 'Construtor de Requisicoes HTTP', description: 'Construa e visualize requisicoes HTTP. Gere codigo cURL, fetch e axios.', urlLabel: 'URL da requisicao', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metodo', headersLabel: 'Cabecalhos', headerKeyPlaceholder: 'Chave', headerValuePlaceholder: 'Valor', addHeader: 'Adicionar cabecalho', bodyLabel: 'Corpo', bodyPlaceholder: '{\n  "name": "Joao",\n  "email": "joao@example.com"\n}', generate: 'Gerar codigo', clear: 'Limpar', outputFormat: 'Formato', copyLabel: 'Copiar codigo', introTitle: 'Construtor HTTP Gratuito', introText: 'Construa requisicoes HTTP visualmente.', howTitle: 'Como construir requisicoes', step1: 'Insira a URL', step2: 'Selecione o metodo', step3: 'Adicione cabecalhos', step4: 'Adicione um corpo', featuresTitle: 'Recursos', feature1: 'Todos os metodos HTTP', feature2: 'Codigo cURL, fetch, axios', feature3: 'Cabecalhos personalizados', feature4: 'Editor JSON', feature5: 'Copia em um clique', faqTitle: 'Perguntas frequentes', faq1q: 'Quais metodos?', faq1a: 'GET, POST, PUT, DELETE, PATCH e HEAD.', faq2q: 'Quais formatos?', faq2a: 'cURL, fetch e axios.', faq3q: 'Posso adicionar cabecalhos?', faq3a: 'Sim.', faq4q: 'Quando usar corpo?', faq4a: 'Com POST, PUT e PATCH.', faq5q: 'Dados sao enviados?', faq5a: 'Nao, o codigo e gerado localmente.', relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira uma URL.', removeHeader: 'Remover' },
  it: { title: 'Costruttore Richieste HTTP', description: 'Costruisci e visualizza richieste HTTP. Genera codice cURL, fetch e axios.', urlLabel: 'URL richiesta', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metodo', headersLabel: 'Intestazioni', headerKeyPlaceholder: 'Chiave', headerValuePlaceholder: 'Valore', addHeader: 'Aggiungi intestazione', bodyLabel: 'Corpo', bodyPlaceholder: '{\n  "name": "Marco",\n  "email": "marco@example.com"\n}', generate: 'Genera codice', clear: 'Cancella', outputFormat: 'Formato', copyLabel: 'Copia codice', introTitle: 'Costruttore HTTP Gratuito', introText: 'Costruisci richieste HTTP visivamente.', howTitle: 'Come costruire richieste', step1: 'Inserisci l\'URL', step2: 'Seleziona il metodo', step3: 'Aggiungi intestazioni', step4: 'Aggiungi un corpo', featuresTitle: 'Funzionalita', feature1: 'Tutti i metodi HTTP', feature2: 'Codice cURL, fetch, axios', feature3: 'Intestazioni personalizzate', feature4: 'Editor JSON', feature5: 'Copia in un clic', faqTitle: 'Domande frequenti', faq1q: 'Quali metodi?', faq1a: 'GET, POST, PUT, DELETE, PATCH e HEAD.', faq2q: 'Quali formati?', faq2a: 'cURL, fetch e axios.', faq3q: 'Posso aggiungere intestazioni?', faq3a: 'Si.', faq4q: 'Quando usare il corpo?', faq4a: 'Con POST, PUT e PATCH.', faq5q: 'I dati vengono inviati?', faq5a: 'No, il codice e generato localmente.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci un URL.', removeHeader: 'Rimuovi' },
  nl: { title: 'HTTP Request Builder', description: 'Bouw en preview HTTP verzoeken. Genereer cURL, fetch en axios code.', urlLabel: 'Verzoek URL', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Methode', headersLabel: 'Headers', headerKeyPlaceholder: 'Sleutel', headerValuePlaceholder: 'Waarde', addHeader: 'Header toevoegen', bodyLabel: 'Body', bodyPlaceholder: '{\n  "name": "Jan",\n  "email": "jan@example.com"\n}', generate: 'Code genereren', clear: 'Wissen', outputFormat: 'Formaat', copyLabel: 'Code kopieren', introTitle: 'Gratis HTTP Request Builder', introText: 'Bouw HTTP verzoeken visueel.', howTitle: 'Hoe HTTP verzoeken te bouwen', step1: 'Voer URL in', step2: 'Selecteer methode', step3: 'Voeg headers toe', step4: 'Voeg body toe', featuresTitle: 'Functies', feature1: 'Alle HTTP methoden', feature2: 'cURL, fetch, axios code', feature3: 'Aangepaste headers', feature4: 'JSON editor', feature5: 'Kopieer met een klik', faqTitle: 'Veelgestelde vragen', faq1q: 'Welke methoden?', faq1a: 'GET, POST, PUT, DELETE, PATCH en HEAD.', faq2q: 'Welke formaten?', faq2a: 'cURL, fetch en axios.', faq3q: 'Kan ik headers toevoegen?', faq3a: 'Ja.', faq4q: 'Wanneer body gebruiken?', faq4a: 'Bij POST, PUT en PATCH.', faq5q: 'Worden data verzonden?', faq5a: 'Nee, code wordt lokaal gegenereerd.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer een URL in.', removeHeader: 'Verwijderen' },
  pl: { title: 'Konstruktor Zadan HTTP', description: 'Buduj i podgladaj zadania HTTP. Generuj kod cURL, fetch i axios.', urlLabel: 'URL zadania', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metoda', headersLabel: 'Naglowki', headerKeyPlaceholder: 'Klucz', headerValuePlaceholder: 'Wartosc', addHeader: 'Dodaj naglowek', bodyLabel: 'Tresc', bodyPlaceholder: '{\n  "name": "Jan",\n  "email": "jan@example.com"\n}', generate: 'Generuj kod', clear: 'Wyczysc', outputFormat: 'Format', copyLabel: 'Kopiuj kod', introTitle: 'Darmowy Konstruktor HTTP', introText: 'Buduj zadania HTTP wizualnie.', howTitle: 'Jak budowac zadania', step1: 'Wpisz URL', step2: 'Wybierz metode', step3: 'Dodaj naglowki', step4: 'Dodaj tresc', featuresTitle: 'Funkcje', feature1: 'Wszystkie metody HTTP', feature2: 'Kod cURL, fetch, axios', feature3: 'Niestandardowe naglowki', feature4: 'Edytor JSON', feature5: 'Kopiowanie jednym kliknieciem', faqTitle: 'FAQ', faq1q: 'Jakie metody?', faq1a: 'GET, POST, PUT, DELETE, PATCH i HEAD.', faq2q: 'Jakie formaty?', faq2a: 'cURL, fetch i axios.', faq3q: 'Moge dodac naglowki?', faq3a: 'Tak.', faq4q: 'Kiedy uzywac tresci?', faq4a: 'Z POST, PUT i PATCH.', faq5q: 'Dane sa wysylane?', faq5a: 'Nie, kod generowany lokalnie.', relatedTitle: 'Powiazane narzedzia', errorEmpty: 'Wpisz URL.', removeHeader: 'Usun' },
  sv: { title: 'HTTP-foerfraagningsbyggare', description: 'Bygg och foerhandsgranska HTTP-foerfraagningar. Generera cURL, fetch och axios kod.', urlLabel: 'URL', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metod', headersLabel: 'Rubriker', headerKeyPlaceholder: 'Nyckel', headerValuePlaceholder: 'Vaerde', addHeader: 'Lagg till rubrik', bodyLabel: 'Kropp', bodyPlaceholder: '{\n  "name": "Erik",\n  "email": "erik@example.com"\n}', generate: 'Generera kod', clear: 'Rensa', outputFormat: 'Format', copyLabel: 'Kopiera kod', introTitle: 'Gratis HTTP-foerfraagningsbyggare', introText: 'Bygg HTTP-foerfraagningar visuellt.', howTitle: 'Hur man bygger foerfraagningar', step1: 'Ange URL', step2: 'Valj metod', step3: 'Lagg till rubriker', step4: 'Lagg till kropp', featuresTitle: 'Funktioner', feature1: 'Alla HTTP-metoder', feature2: 'cURL, fetch, axios kod', feature3: 'Anpassade rubriker', feature4: 'JSON-redigerare', feature5: 'Kopiera med ett klick', faqTitle: 'Vanliga fraagor', faq1q: 'Vilka metoder?', faq1a: 'GET, POST, PUT, DELETE, PATCH och HEAD.', faq2q: 'Vilka format?', faq2a: 'cURL, fetch och axios.', faq3q: 'Kan jag laegga till rubriker?', faq3a: 'Ja.', faq4q: 'Naer anvaenda kropp?', faq4a: 'Med POST, PUT och PATCH.', faq5q: 'Skickas data?', faq5a: 'Nej, kod genereras lokalt.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange en URL.', removeHeader: 'Ta bort' },
  no: { title: 'HTTP-foresporselsbygger', description: 'Bygg og forhaandsvis HTTP-foresporsler. Generer cURL, fetch og axios kode.', urlLabel: 'URL', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metode', headersLabel: 'Hoder', headerKeyPlaceholder: 'Nokkel', headerValuePlaceholder: 'Verdi', addHeader: 'Legg til hode', bodyLabel: 'Kropp', bodyPlaceholder: '{\n  "name": "Erik",\n  "email": "erik@example.com"\n}', generate: 'Generer kode', clear: 'Toom', outputFormat: 'Format', copyLabel: 'Kopier kode', introTitle: 'Gratis HTTP-foresporselsbygger', introText: 'Bygg HTTP-foresporsler visuelt.', howTitle: 'Hvordan bygge foresporsler', step1: 'Skriv inn URL', step2: 'Velg metode', step3: 'Legg til hoder', step4: 'Legg til kropp', featuresTitle: 'Funksjoner', feature1: 'Alle HTTP-metoder', feature2: 'cURL, fetch, axios kode', feature3: 'Egendefinerte hoder', feature4: 'JSON-editor', feature5: 'Kopier med ett klikk', faqTitle: 'Ofte stilte sporsmal', faq1q: 'Hvilke metoder?', faq1a: 'GET, POST, PUT, DELETE, PATCH og HEAD.', faq2q: 'Hvilke formater?', faq2a: 'cURL, fetch og axios.', faq3q: 'Kan jeg legge til hoder?', faq3a: 'Ja.', faq4q: 'Naar bruke kropp?', faq4a: 'Med POST, PUT og PATCH.', faq5q: 'Sendes data?', faq5a: 'Nei, kode genereres lokalt.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn en URL.', removeHeader: 'Fjern' },
  id: { title: 'Pembuat Permintaan HTTP', description: 'Bangun dan preview permintaan HTTP. Hasilkan kode cURL, fetch dan axios.', urlLabel: 'URL Permintaan', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'Metode', headersLabel: 'Header', headerKeyPlaceholder: 'Kunci', headerValuePlaceholder: 'Nilai', addHeader: 'Tambah header', bodyLabel: 'Body', bodyPlaceholder: '{\n  "name": "Budi",\n  "email": "budi@example.com"\n}', generate: 'Hasilkan kode', clear: 'Hapus', outputFormat: 'Format', copyLabel: 'Salin kode', introTitle: 'Pembuat HTTP Gratis', introText: 'Bangun permintaan HTTP secara visual.', howTitle: 'Cara membangun permintaan', step1: 'Masukkan URL', step2: 'Pilih metode', step3: 'Tambahkan header', step4: 'Tambahkan body', featuresTitle: 'Fitur', feature1: 'Semua metode HTTP', feature2: 'Kode cURL, fetch, axios', feature3: 'Header kustom', feature4: 'Editor JSON', feature5: 'Salin sekali klik', faqTitle: 'FAQ', faq1q: 'Metode apa yang didukung?', faq1a: 'GET, POST, PUT, DELETE, PATCH dan HEAD.', faq2q: 'Format output?', faq2a: 'cURL, fetch dan axios.', faq3q: 'Bisa menambah header?', faq3a: 'Ya.', faq4q: 'Kapan pakai body?', faq4a: 'Dengan POST, PUT dan PATCH.', faq5q: 'Data dikirim ke server?', faq5a: 'Tidak, kode dihasilkan lokal.', relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan URL.', removeHeader: 'Hapus' },
  th: { title: 'ตัวสร้างคำขอ HTTP', description: 'สร้างและดูตัวอย่างคำขอ HTTP สร้างโค้ด cURL, fetch และ axios', urlLabel: 'URL คำขอ', urlPlaceholder: 'https://api.example.com/users', methodLabel: 'เมธอด', headersLabel: 'Headers', headerKeyPlaceholder: 'คีย์', headerValuePlaceholder: 'ค่า', addHeader: 'เพิ่ม Header', bodyLabel: 'Body', bodyPlaceholder: '{\n  "name": "สมชาย",\n  "email": "somchai@example.com"\n}', generate: 'สร้างโค้ด', clear: 'ล้าง', outputFormat: 'รูปแบบ', copyLabel: 'คัดลอกโค้ด', introTitle: 'ตัวสร้าง HTTP ฟรี', introText: 'สร้างคำขอ HTTP แบบภาพ', howTitle: 'วิธีสร้างคำขอ', step1: 'กรอก URL', step2: 'เลือกเมธอด', step3: 'เพิ่ม headers', step4: 'เพิ่ม body', featuresTitle: 'คุณสมบัติ', feature1: 'ทุกเมธอด HTTP', feature2: 'โค้ด cURL, fetch, axios', feature3: 'Headers กำหนดเอง', feature4: 'ตัวแก้ไข JSON', feature5: 'คัดลอกคลิกเดียว', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'รองรับเมธอดอะไรบ้าง?', faq1a: 'GET, POST, PUT, DELETE, PATCH และ HEAD', faq2q: 'รูปแบบเอาต์พุต?', faq2a: 'cURL, fetch และ axios', faq3q: 'เพิ่ม headers ได้ไหม?', faq3a: 'ได้', faq4q: 'ใช้ body เมื่อไหร่?', faq4a: 'กับ POST, PUT และ PATCH', faq5q: 'ส่งข้อมูลไหม?', faq5a: 'ไม่ สร้างโค้ดในเครื่อง', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณากรอก URL', removeHeader: 'ลบ' },
};

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];
const FORMATS = ['cURL', 'fetch', 'axios'];

interface Header { key: string; value: string; }

function generateCurl(url: string, method: string, headers: Header[], body: string): string {
  let cmd = `curl -X ${method} '${url}'`;
  headers.forEach(h => { if (h.key && h.value) cmd += ` \\\n  -H '${h.key}: ${h.value}'`; });
  if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) {
    cmd += ` \\\n  -d '${body.trim()}'`;
  }
  return cmd;
}

function generateFetch(url: string, method: string, headers: Header[], body: string): string {
  const opts: string[] = [`  method: '${method}'`];
  const hdrs = headers.filter(h => h.key && h.value);
  if (hdrs.length > 0) {
    const hdrObj = hdrs.map(h => `    '${h.key}': '${h.value}'`).join(',\n');
    opts.push(`  headers: {\n${hdrObj}\n  }`);
  }
  if (body.trim() && ['POST', 'PUT', 'PATCH'].includes(method)) {
    opts.push(`  body: JSON.stringify(${body.trim()})`);
  }
  return `fetch('${url}', {\n${opts.join(',\n')}\n})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
}

function generateAxios(url: string, method: string, headers: Header[], body: string): string {
  const m = method.toLowerCase();
  const hdrs = headers.filter(h => h.key && h.value);
  const hasBody = body.trim() && ['post', 'put', 'patch'].includes(m);
  const parts: string[] = [`  method: '${m}'`, `  url: '${url}'`];
  if (hdrs.length > 0) {
    const hdrObj = hdrs.map(h => `    '${h.key}': '${h.value}'`).join(',\n');
    parts.push(`  headers: {\n${hdrObj}\n  }`);
  }
  if (hasBody) parts.push(`  data: ${body.trim()}`);
  return `axios({\n${parts.join(',\n')}\n})\n  .then(res => console.log(res.data))\n  .catch(err => console.error(err));`;
}

export default function HttpRequestBuilder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<Header[]>([{ key: 'Content-Type', value: 'application/json' }]);
  const [body, setBody] = useState('');
  const [format, setFormat] = useState('cURL');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = useCallback(() => {
    setError('');
    if (!url.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    let code = '';
    if (format === 'cURL') code = generateCurl(url.trim(), method, headers, body);
    else if (format === 'fetch') code = generateFetch(url.trim(), method, headers, body);
    else code = generateAxios(url.trim(), method, headers, body);
    setOutput(code);
  }, [url, method, headers, body, format, t]);

  const handleClear = useCallback(() => {
    setUrl(''); setMethod('GET'); setHeaders([{ key: 'Content-Type', value: 'application/json' }]); setBody(''); setOutput(''); setError('');
  }, []);

  const addHeader = useCallback(() => setHeaders(prev => [...prev, { key: '', value: '' }]), []);
  const removeHeader = useCallback((idx: number) => setHeaders(prev => prev.filter((_, i) => i !== idx)), []);
  const updateHeader = useCallback((idx: number, field: 'key' | 'value', val: string) => {
    setHeaders(prev => prev.map((h, i) => i === idx ? { ...h, [field]: val } : h));
  }, []);

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
    <ToolLayout title={t.title} description={t.description} toolId="http-request-builder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ minWidth: 120 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.methodLabel}</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}>
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.urlLabel}</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.urlPlaceholder}
            style={{ width: '100%', padding: '10px 14px', fontSize: 14, fontFamily: 'JetBrains Mono, Fira Code, monospace', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.headersLabel}</label>
        {headers.map((h, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <input type="text" value={h.key} onChange={(e) => updateHeader(i, 'key', e.target.value)} placeholder={t.headerKeyPlaceholder}
              style={{ flex: '1 1 180px', padding: '8px 12px', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
            <input type="text" value={h.value} onChange={(e) => updateHeader(i, 'value', e.target.value)} placeholder={t.headerValuePlaceholder}
              style={{ flex: '2 1 250px', padding: '8px 12px', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }} />
            <button onClick={() => removeHeader(i)} className="btn btn-secondary" style={{ fontSize: 12, padding: '8px 12px' }}>{t.removeHeader}</button>
          </div>
        ))}
        <button onClick={addHeader} className="btn btn-secondary" style={{ fontSize: 12, marginTop: 4 }}>+ {t.addHeader}</button>
      </div>

      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.bodyLabel}</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={t.bodyPlaceholder} spellCheck={false}
            style={{ width: '100%', minHeight: 150, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', padding: '10px 14px' }} />
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleGenerate} className="btn btn-primary" style={{ fontSize: 13 }}>{t.generate}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {FORMATS.map(f => (
            <button key={f} onClick={() => setFormat(f)} className={f === format ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, padding: '6px 12px' }}>{f}</button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f43f5e' }}>
          {'\u2715'} {error}
        </div>
      )}

      {output && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{format}</label>
            <CopyButton text={output} label={t.copyLabel} />
          </div>
          <pre style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 12, lineHeight: 1.6, fontFamily: 'JetBrains Mono, Fira Code, monospace', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {output}
          </pre>
        </div>
      )}

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li>
        </ul>
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
          {[{ href: `/${lang}/tools/cors-tester`, label: 'CORS Tester' }, { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' }, { href: `/${lang}/tools/url-parser`, label: 'URL Parser' }].map((link) => (
            <a key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</a>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
