'use client';

import { useState, useCallback } from 'react';
import yaml from 'js-yaml';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

/* ── Sample data ──────────────────────────────────────────────── */
const sampleYaml = `# Docker Compose Configuration
version: "3.9"
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./html:/usr/share/nginx/html:ro
    environment:
      - NGINX_HOST=example.com
      - NGINX_PORT=80
    depends_on:
      - api
    restart: unless-stopped

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: myapp
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    ports:
      - "5432:5432"

volumes:
  pgdata:
    driver: local`;

const sampleJson = `{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0"
  },
  "config": {
    "port": 3000,
    "debug": false,
    "features": ["auth", "api", "dashboard"]
  }
}`;

/* ── i18n ──────────────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML to JSON Converter',
    description: 'Convert between YAML and JSON formats instantly. Bidirectional conversion with syntax validation and formatting options.',
    yamlLabel: 'YAML',
    jsonLabel: 'JSON',
    yamlToJson: 'YAML \u2192 JSON',
    jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Clear',
    loadYamlSample: 'Load YAML Sample',
    loadJsonSample: 'Load JSON Sample',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    compact: 'Compact',
    yamlPlaceholder: 'Paste YAML here...',
    jsonPlaceholder: 'Paste JSON here...',
    success: 'Conversion successful',
    error: 'Parse Error',
    flowLevel: 'YAML Flow Level',
    noFlow: 'Block style',
    introTitle: 'Free Online YAML to JSON Converter',
    introText: 'Convert between YAML and JSON formats with this free online tool. YAML (YAML Ain\'t Markup Language) is widely used for configuration files in Kubernetes, Docker Compose, GitHub Actions, Ansible, and many DevOps tools. JSON (JavaScript Object Notation) is the standard data interchange format for APIs and web applications. This converter handles all YAML features including nested objects, arrays, multi-line strings, anchors, aliases, and all data types.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do I convert YAML to JSON?',
    faq1a: 'Paste your YAML content into the left editor and click the "YAML to JSON" button. The tool parses the YAML syntax and generates equivalent JSON output with proper formatting. It handles nested objects, arrays, comments (which are removed in JSON), multi-line strings, and all YAML data types.',
    faq2q: 'Can I convert JSON back to YAML?',
    faq2a: 'Yes! This is a bidirectional converter. Paste your JSON into the right editor and click "JSON to YAML" to get properly formatted YAML output. You can choose between block style and flow style YAML output.',
    faq3q: 'What YAML features are supported?',
    faq3a: 'This converter supports all standard YAML 1.2 features: key-value pairs, nested objects, arrays (sequences), multi-line strings (literal | and folded >), anchors (&) and aliases (*), comments (stripped in JSON), and all data types including strings, numbers, booleans, null, dates, and binary data.',
    faq4q: 'Are YAML comments preserved when converting to JSON?',
    faq4a: 'No, JSON does not support comments. When converting YAML to JSON, all YAML comments (lines starting with #) are removed. The data values are preserved exactly. If you need comments, keep the original YAML file alongside the JSON.',
    faq5q: 'What is the difference between YAML and JSON?',
    faq5a: 'YAML uses indentation for structure and supports comments, making it human-friendly for configuration files. JSON uses braces and brackets, making it ideal for data interchange between systems. YAML is a superset of JSON, meaning valid JSON is also valid YAML.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'YAML 转 JSON 转换器',
    description: '即时在 YAML 和 JSON 格式之间互转。支持双向转换、语法验证和格式化选项。',
    yamlLabel: 'YAML',
    jsonLabel: 'JSON',
    yamlToJson: 'YAML \u2192 JSON',
    jsonToYaml: 'JSON \u2192 YAML',
    clear: '清除',
    loadYamlSample: '加载 YAML 示例',
    loadJsonSample: '加载 JSON 示例',
    indent: '缩进',
    spaces: '空格',
    tab: 'Tab',
    compact: '紧凑',
    yamlPlaceholder: '在此粘贴 YAML...',
    jsonPlaceholder: '在此粘贴 JSON...',
    success: '转换成功',
    error: '解析错误',
    flowLevel: 'YAML 流样式级别',
    noFlow: '块样式',
    introTitle: '免费在线 YAML JSON 互转工具',
    introText: '使用此免费在线工具在 YAML 和 JSON 格式之间转换。YAML 广泛用于 Kubernetes、Docker Compose、GitHub Actions、Ansible 等 DevOps 工具的配置文件。JSON 是 API 和 Web 应用的标准数据交换格式。此转换器处理所有 YAML 特性。',
    faqTitle: '常见问题',
    faq1q: '如何将 YAML 转换为 JSON？',
    faq1a: '将 YAML 内容粘贴到左侧编辑器中，然后点击"YAML → JSON"按钮。工具会解析 YAML 语法并生成格式化的 JSON 输出。',
    faq2q: '可以将 JSON 转换回 YAML 吗？',
    faq2a: '可以！这是双向转换器。将 JSON 粘贴到右侧编辑器中，点击"JSON → YAML"即可获得格式化的 YAML 输出。',
    faq3q: '支持哪些 YAML 特性？',
    faq3a: '此转换器支持所有标准 YAML 1.2 特性：键值对、嵌套对象、数组、多行字符串、锚点和别名、注释（在 JSON 中被移除）以及所有数据类型。',
    faq4q: '转换为 JSON 时会保留 YAML 注释吗？',
    faq4a: '不会，JSON 不支持注释。转换时所有 YAML 注释会被移除，但数据值会被完整保留。',
    faq5q: 'YAML 和 JSON 有什么区别？',
    faq5a: 'YAML 使用缩进来表示结构并支持注释，适合配置文件。JSON 使用花括号和方括号，适合系统间的数据交换。YAML 是 JSON 的超集。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'YAML JSON 変換ツール',
    description: 'YAML と JSON 形式間を即座に変換。双方向変換、構文検証、フォーマットオプション対応。',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'クリア', loadYamlSample: 'YAML サンプル', loadJsonSample: 'JSON サンプル',
    indent: 'インデント', spaces: 'スペース', tab: 'タブ', compact: 'コンパクト',
    yamlPlaceholder: 'YAML を貼り付け...', jsonPlaceholder: 'JSON を貼り付け...',
    success: '変換成功', error: 'パースエラー', flowLevel: 'YAML フロースタイル', noFlow: 'ブロックスタイル',
    introTitle: '無料オンライン YAML JSON 変換ツール',
    introText: 'この無料オンラインツールで YAML と JSON 形式間を変換できます。',
    faqTitle: 'よくある質問',
    faq1q: 'YAML を JSON に変換するには？', faq1a: '左のエディタに YAML を貼り付けて「YAML → JSON」ボタンをクリックします。',
    faq2q: 'JSON を YAML に戻せますか？', faq2a: 'はい！右のエディタに JSON を貼り付けて「JSON → YAML」をクリックします。',
    faq3q: 'どの YAML 機能がサポートされていますか？', faq3a: 'YAML 1.2 のすべての標準機能をサポートしています。',
    faq4q: 'JSON 変換時に YAML コメントは保持されますか？', faq4a: 'いいえ、JSON はコメントをサポートしていないため、変換時に削除されます。',
    faq5q: 'YAML と JSON の違いは？', faq5a: 'YAML はインデントで構造を表しコメントをサポート。JSON は括弧を使用しデータ交換に最適。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'YAML JSON 변환기',
    description: 'YAML과 JSON 형식 간 즉시 변환. 양방향 변환, 구문 검증 및 포맷 옵션 지원.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: '지우기', loadYamlSample: 'YAML 샘플', loadJsonSample: 'JSON 샘플',
    indent: '들여쓰기', spaces: '칸', tab: '탭', compact: '압축',
    yamlPlaceholder: 'YAML을 붙여넣으세요...', jsonPlaceholder: 'JSON을 붙여넣으세요...',
    success: '변환 성공', error: '파싱 오류', flowLevel: 'YAML 플로우 레벨', noFlow: '블록 스타일',
    introTitle: '무료 온라인 YAML JSON 변환기',
    introText: '이 무료 온라인 도구로 YAML과 JSON 형식 간을 변환하세요.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'YAML을 JSON으로 변환하는 방법?', faq1a: '왼쪽 에디터에 YAML을 붙여넣고 "YAML → JSON" 버튼을 클릭하세요.',
    faq2q: 'JSON을 YAML로 다시 변환할 수 있나요?', faq2a: '네! 오른쪽 에디터에 JSON을 붙여넣고 "JSON → YAML"을 클릭하세요.',
    faq3q: '어떤 YAML 기능이 지원되나요?', faq3a: '모든 표준 YAML 1.2 기능을 지원합니다.',
    faq4q: 'JSON 변환 시 YAML 주석이 유지되나요?', faq4a: '아니요, JSON은 주석을 지원하지 않으므로 변환 시 제거됩니다.',
    faq5q: 'YAML과 JSON의 차이점은?', faq5a: 'YAML은 들여쓰기로 구조를 표현하고 주석을 지원합니다. JSON은 중괄호를 사용하여 데이터 교환에 적합합니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Convertisseur YAML JSON',
    description: 'Convertissez entre les formats YAML et JSON instantanement. Conversion bidirectionnelle avec validation et formatage.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Effacer', loadYamlSample: 'Exemple YAML', loadJsonSample: 'Exemple JSON',
    indent: 'Indentation', spaces: 'espaces', tab: 'Tab', compact: 'Compact',
    yamlPlaceholder: 'Collez le YAML ici...', jsonPlaceholder: 'Collez le JSON ici...',
    success: 'Conversion reussie', error: 'Erreur d\'analyse', flowLevel: 'Niveau de flux YAML', noFlow: 'Style bloc',
    introTitle: 'Convertisseur YAML JSON en Ligne Gratuit',
    introText: 'Convertissez entre les formats YAML et JSON avec cet outil gratuit en ligne.',
    faqTitle: 'Questions Frequentes',
    faq1q: 'Comment convertir YAML en JSON ?', faq1a: 'Collez votre contenu YAML dans l\'editeur de gauche et cliquez sur le bouton "YAML → JSON".',
    faq2q: 'Peut-on convertir JSON en YAML ?', faq2a: 'Oui ! Collez votre JSON dans l\'editeur de droite et cliquez sur "JSON → YAML".',
    faq3q: 'Quelles fonctionnalites YAML sont supportees ?', faq3a: 'Toutes les fonctionnalites standard YAML 1.2 sont supportees.',
    faq4q: 'Les commentaires YAML sont-ils preserves en JSON ?', faq4a: 'Non, JSON ne supporte pas les commentaires. Ils sont supprimes lors de la conversion.',
    faq5q: 'Quelle est la difference entre YAML et JSON ?', faq5a: 'YAML utilise l\'indentation et supporte les commentaires. JSON utilise des accolades et est ideal pour l\'echange de donnees.',
    relatedTitle: 'Outils associes',
  },
  de: {
    title: 'YAML JSON Konverter',
    description: 'Konvertieren Sie sofort zwischen YAML und JSON Formaten. Bidirektionale Konvertierung mit Validierung.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Loeschen', loadYamlSample: 'YAML Beispiel', loadJsonSample: 'JSON Beispiel',
    indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab', compact: 'Kompakt',
    yamlPlaceholder: 'YAML hier einfuegen...', jsonPlaceholder: 'JSON hier einfuegen...',
    success: 'Konvertierung erfolgreich', error: 'Parse-Fehler', flowLevel: 'YAML Flow-Ebene', noFlow: 'Block-Stil',
    introTitle: 'Kostenloser Online YAML JSON Konverter',
    introText: 'Konvertieren Sie zwischen YAML und JSON Formaten mit diesem kostenlosen Online-Tool.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie konvertiere ich YAML zu JSON?', faq1a: 'Fuegen Sie Ihren YAML-Inhalt in den linken Editor ein und klicken Sie auf "YAML → JSON".',
    faq2q: 'Kann ich JSON zurueck zu YAML konvertieren?', faq2a: 'Ja! Fuegen Sie Ihr JSON in den rechten Editor ein und klicken Sie auf "JSON → YAML".',
    faq3q: 'Welche YAML-Funktionen werden unterstuetzt?', faq3a: 'Alle Standard YAML 1.2 Funktionen werden unterstuetzt.',
    faq4q: 'Bleiben YAML-Kommentare bei der JSON-Konvertierung erhalten?', faq4a: 'Nein, JSON unterstuetzt keine Kommentare. Sie werden bei der Konvertierung entfernt.',
    faq5q: 'Was ist der Unterschied zwischen YAML und JSON?', faq5a: 'YAML verwendet Einrueckung und unterstuetzt Kommentare. JSON verwendet Klammern und ist ideal fuer den Datenaustausch.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor YAML JSON',
    description: 'Convierte entre formatos YAML y JSON al instante. Conversion bidireccional con validacion y formateo.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Limpiar', loadYamlSample: 'Ejemplo YAML', loadJsonSample: 'Ejemplo JSON',
    indent: 'Sangria', spaces: 'espacios', tab: 'Tab', compact: 'Compacto',
    yamlPlaceholder: 'Pega YAML aqui...', jsonPlaceholder: 'Pega JSON aqui...',
    success: 'Conversion exitosa', error: 'Error de analisis', flowLevel: 'Nivel de flujo YAML', noFlow: 'Estilo bloque',
    introTitle: 'Convertidor YAML JSON en Linea Gratis',
    introText: 'Convierte entre formatos YAML y JSON con esta herramienta gratuita en linea.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Como convertir YAML a JSON?', faq1a: 'Pega tu contenido YAML en el editor izquierdo y haz clic en "YAML → JSON".',
    faq2q: 'Se puede convertir JSON a YAML?', faq2a: 'Si! Pega tu JSON en el editor derecho y haz clic en "JSON → YAML".',
    faq3q: 'Que caracteristicas YAML son soportadas?', faq3a: 'Todas las caracteristicas estandar de YAML 1.2 son soportadas.',
    faq4q: 'Se preservan los comentarios YAML en JSON?', faq4a: 'No, JSON no soporta comentarios. Se eliminan durante la conversion.',
    faq5q: 'Cual es la diferencia entre YAML y JSON?', faq5a: 'YAML usa indentacion y soporta comentarios. JSON usa llaves y es ideal para intercambio de datos.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Convertitore YAML JSON',
    description: 'Converti tra formati YAML e JSON istantaneamente. Conversione bidirezionale con validazione e formattazione.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Cancella', loadYamlSample: 'Esempio YAML', loadJsonSample: 'Esempio JSON',
    indent: 'Indentazione', spaces: 'spazi', tab: 'Tab', compact: 'Compatto',
    yamlPlaceholder: 'Incolla YAML qui...', jsonPlaceholder: 'Incolla JSON qui...',
    success: 'Conversione riuscita', error: 'Errore di analisi', flowLevel: 'Livello flusso YAML', noFlow: 'Stile blocco',
    introTitle: 'Convertitore YAML JSON Online Gratuito',
    introText: 'Converti tra formati YAML e JSON con questo strumento gratuito online.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Come convertire YAML in JSON?', faq1a: 'Incolla il tuo contenuto YAML nell\'editor sinistro e clicca su "YAML → JSON".',
    faq2q: 'Si puo convertire JSON in YAML?', faq2a: 'Si! Incolla il tuo JSON nell\'editor destro e clicca su "JSON → YAML".',
    faq3q: 'Quali funzionalita YAML sono supportate?', faq3a: 'Tutte le funzionalita standard YAML 1.2 sono supportate.',
    faq4q: 'I commenti YAML vengono preservati in JSON?', faq4a: 'No, JSON non supporta i commenti. Vengono rimossi durante la conversione.',
    faq5q: 'Qual e la differenza tra YAML e JSON?', faq5a: 'YAML usa l\'indentazione e supporta i commenti. JSON usa le parentesi ed e ideale per lo scambio dati.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Conversor YAML JSON',
    description: 'Converta entre formatos YAML e JSON instantaneamente. Conversao bidirecional com validacao e formatacao.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Limpar', loadYamlSample: 'Exemplo YAML', loadJsonSample: 'Exemplo JSON',
    indent: 'Recuo', spaces: 'espacos', tab: 'Tab', compact: 'Compacto',
    yamlPlaceholder: 'Cole YAML aqui...', jsonPlaceholder: 'Cole JSON aqui...',
    success: 'Conversao bem-sucedida', error: 'Erro de analise', flowLevel: 'Nivel de fluxo YAML', noFlow: 'Estilo bloco',
    introTitle: 'Conversor YAML JSON Online Gratuito',
    introText: 'Converta entre formatos YAML e JSON com esta ferramenta gratuita online.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'Como converter YAML para JSON?', faq1a: 'Cole seu conteudo YAML no editor esquerdo e clique em "YAML → JSON".',
    faq2q: 'Posso converter JSON de volta para YAML?', faq2a: 'Sim! Cole seu JSON no editor direito e clique em "JSON → YAML".',
    faq3q: 'Quais recursos YAML sao suportados?', faq3a: 'Todos os recursos padroes do YAML 1.2 sao suportados.',
    faq4q: 'Os comentarios YAML sao preservados no JSON?', faq4a: 'Nao, JSON nao suporta comentarios. Eles sao removidos durante a conversao.',
    faq5q: 'Qual a diferenca entre YAML e JSON?', faq5a: 'YAML usa indentacao e suporta comentarios. JSON usa chaves e e ideal para intercambio de dados.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'YAML JSON Converter',
    description: 'Converteer direct tussen YAML en JSON formaten. Bidirectionele conversie met validatie en opmaakopties.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Wissen', loadYamlSample: 'YAML Voorbeeld', loadJsonSample: 'JSON Voorbeeld',
    indent: 'Inspringing', spaces: 'spaties', tab: 'Tab', compact: 'Compact',
    yamlPlaceholder: 'Plak YAML hier...', jsonPlaceholder: 'Plak JSON hier...',
    success: 'Conversie geslaagd', error: 'Parseerfout', flowLevel: 'YAML Flow Niveau', noFlow: 'Blokstijl',
    introTitle: 'Gratis Online YAML JSON Converter',
    introText: 'Converteer tussen YAML en JSON formaten met deze gratis online tool.',
    faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Hoe converteer ik YAML naar JSON?', faq1a: 'Plak uw YAML-inhoud in de linker editor en klik op "YAML → JSON".',
    faq2q: 'Kan ik JSON terug converteren naar YAML?', faq2a: 'Ja! Plak uw JSON in de rechter editor en klik op "JSON → YAML".',
    faq3q: 'Welke YAML-functies worden ondersteund?', faq3a: 'Alle standaard YAML 1.2 functies worden ondersteund.',
    faq4q: 'Worden YAML-commentaren behouden in JSON?', faq4a: 'Nee, JSON ondersteunt geen commentaren. Ze worden verwijderd tijdens de conversie.',
    faq5q: 'Wat is het verschil tussen YAML en JSON?', faq5a: 'YAML gebruikt inspringing en ondersteunt commentaren. JSON gebruikt accolades en is ideaal voor gegevensuitwisseling.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Konwerter YAML JSON',
    description: 'Konwertuj miedzy formatami YAML i JSON natychmiast. Dwukierunkowa konwersja z walidacja i formatowaniem.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Wyczysc', loadYamlSample: 'Przyklad YAML', loadJsonSample: 'Przyklad JSON',
    indent: 'Wciecie', spaces: 'spacje', tab: 'Tab', compact: 'Kompaktowy',
    yamlPlaceholder: 'Wklej YAML tutaj...', jsonPlaceholder: 'Wklej JSON tutaj...',
    success: 'Konwersja udana', error: 'Blad parsowania', flowLevel: 'Poziom przeplywu YAML', noFlow: 'Styl blokowy',
    introTitle: 'Darmowy Online Konwerter YAML JSON',
    introText: 'Konwertuj miedzy formatami YAML i JSON za pomoca tego darmowego narzedzia online.',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jak skonwertowac YAML na JSON?', faq1a: 'Wklej zawartosc YAML do lewego edytora i kliknij "YAML → JSON".',
    faq2q: 'Czy mozna skonwertowac JSON z powrotem na YAML?', faq2a: 'Tak! Wklej JSON do prawego edytora i kliknij "JSON → YAML".',
    faq3q: 'Jakie funkcje YAML sa obslugiwane?', faq3a: 'Wszystkie standardowe funkcje YAML 1.2 sa obslugiwane.',
    faq4q: 'Czy komentarze YAML sa zachowywane w JSON?', faq4a: 'Nie, JSON nie obsluguje komentarzy. Sa usuwane podczas konwersji.',
    faq5q: 'Jaka jest roznica miedzy YAML a JSON?', faq5a: 'YAML uzywa wciecia i obsluguje komentarze. JSON uzywa nawiasow i jest idealny do wymiany danych.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'YAML JSON Konverterare',
    description: 'Konvertera mellan YAML och JSON format direkt. Dubbelriktad konvertering med validering och formatering.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Rensa', loadYamlSample: 'YAML Exempel', loadJsonSample: 'JSON Exempel',
    indent: 'Indrag', spaces: 'mellanslag', tab: 'Tab', compact: 'Kompakt',
    yamlPlaceholder: 'Klistra in YAML har...', jsonPlaceholder: 'Klistra in JSON har...',
    success: 'Konvertering lyckades', error: 'Tolkningsfel', flowLevel: 'YAML Flodesniva', noFlow: 'Blockstil',
    introTitle: 'Gratis Online YAML JSON Konverterare',
    introText: 'Konvertera mellan YAML och JSON format med detta gratis onlineverktyg.',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Hur konverterar jag YAML till JSON?', faq1a: 'Klistra in ditt YAML-innehall i den vanstra editorn och klicka pa "YAML → JSON".',
    faq2q: 'Kan jag konvertera JSON tillbaka till YAML?', faq2a: 'Ja! Klistra in din JSON i den hogra editorn och klicka pa "JSON → YAML".',
    faq3q: 'Vilka YAML-funktioner stods?', faq3a: 'Alla standard YAML 1.2 funktioner stods.',
    faq4q: 'Bevaras YAML-kommentarer i JSON?', faq4a: 'Nej, JSON stoder inte kommentarer. De tas bort vid konvertering.',
    faq5q: 'Vad ar skillnaden mellan YAML och JSON?', faq5a: 'YAML anvaender indrag och stoder kommentarer. JSON anvaender klammrar och ar idealiskt for datautbyte.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'YAML JSON Konverterer',
    description: 'Konverter mellom YAML og JSON formater umiddelbart. Toveis konvertering med validering og formatering.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Toemme', loadYamlSample: 'YAML Eksempel', loadJsonSample: 'JSON Eksempel',
    indent: 'Innrykk', spaces: 'mellomrom', tab: 'Tab', compact: 'Kompakt',
    yamlPlaceholder: 'Lim inn YAML her...', jsonPlaceholder: 'Lim inn JSON her...',
    success: 'Konvertering vellykket', error: 'Parsingfeil', flowLevel: 'YAML Flytniva', noFlow: 'Blokkstil',
    introTitle: 'Gratis Online YAML JSON Konverterer',
    introText: 'Konverter mellom YAML og JSON formater med dette gratis nettverktoeyet.',
    faqTitle: 'Vanlige sporrsmal',
    faq1q: 'Hvordan konverterer jeg YAML til JSON?', faq1a: 'Lim inn YAML-innholdet ditt i den venstre editoren og klikk pa "YAML → JSON".',
    faq2q: 'Kan jeg konvertere JSON tilbake til YAML?', faq2a: 'Ja! Lim inn JSON i den hoeyre editoren og klikk pa "JSON → YAML".',
    faq3q: 'Hvilke YAML-funksjoner stoettes?', faq3a: 'Alle standard YAML 1.2 funksjoner stoettes.',
    faq4q: 'Bevares YAML-kommentarer i JSON?', faq4a: 'Nei, JSON stoetter ikke kommentarer. De fjernes under konvertering.',
    faq5q: 'Hva er forskjellen mellom YAML og JSON?', faq5a: 'YAML bruker innrykk og stoetter kommentarer. JSON bruker klammer og er ideelt for datautveksling.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Konverter YAML JSON',
    description: 'Konversi antara format YAML dan JSON secara instan. Konversi dua arah dengan validasi dan opsi pemformatan.',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'Hapus', loadYamlSample: 'Contoh YAML', loadJsonSample: 'Contoh JSON',
    indent: 'Indentasi', spaces: 'spasi', tab: 'Tab', compact: 'Kompak',
    yamlPlaceholder: 'Tempel YAML di sini...', jsonPlaceholder: 'Tempel JSON di sini...',
    success: 'Konversi berhasil', error: 'Error parsing', flowLevel: 'Level aliran YAML', noFlow: 'Gaya blok',
    introTitle: 'Konverter YAML JSON Online Gratis',
    introText: 'Konversi antara format YAML dan JSON dengan alat online gratis ini.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Bagaimana cara mengonversi YAML ke JSON?', faq1a: 'Tempel konten YAML di editor kiri dan klik "YAML → JSON".',
    faq2q: 'Bisakah JSON dikonversi kembali ke YAML?', faq2a: 'Ya! Tempel JSON di editor kanan dan klik "JSON → YAML".',
    faq3q: 'Fitur YAML apa saja yang didukung?', faq3a: 'Semua fitur standar YAML 1.2 didukung.',
    faq4q: 'Apakah komentar YAML dipertahankan di JSON?', faq4a: 'Tidak, JSON tidak mendukung komentar. Komentar dihapus saat konversi.',
    faq5q: 'Apa perbedaan YAML dan JSON?', faq5a: 'YAML menggunakan indentasi dan mendukung komentar. JSON menggunakan tanda kurung dan ideal untuk pertukaran data.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวแปลง YAML JSON',
    description: 'แปลงระหว่างรูปแบบ YAML และ JSON ทันที การแปลงสองทิศทางพร้อมการตรวจสอบและตัวเลือกการจัดรูปแบบ',
    yamlLabel: 'YAML', jsonLabel: 'JSON', yamlToJson: 'YAML \u2192 JSON', jsonToYaml: 'JSON \u2192 YAML',
    clear: 'ล้าง', loadYamlSample: 'ตัวอย่าง YAML', loadJsonSample: 'ตัวอย่าง JSON',
    indent: 'การเยื้อง', spaces: 'ช่องว่าง', tab: 'แท็บ', compact: 'กระชับ',
    yamlPlaceholder: 'วาง YAML ที่นี่...', jsonPlaceholder: 'วาง JSON ที่นี่...',
    success: 'แปลงสำเร็จ', error: 'ข้อผิดพลาดในการแยกวิเคราะห์', flowLevel: 'ระดับโฟลว์ YAML', noFlow: 'สไตล์บล็อก',
    introTitle: 'ตัวแปลง YAML JSON ออนไลน์ฟรี',
    introText: 'แปลงระหว่างรูปแบบ YAML และ JSON ด้วยเครื่องมือออนไลน์ฟรีนี้',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'วิธีแปลง YAML เป็น JSON?', faq1a: 'วาง YAML ในตัวแก้ไขด้านซ้ายแล้วคลิก "YAML → JSON"',
    faq2q: 'สามารถแปลง JSON กลับเป็น YAML ได้ไหม?', faq2a: 'ได้! วาง JSON ในตัวแก้ไขด้านขวาแล้วคลิก "JSON → YAML"',
    faq3q: 'รองรับฟีเจอร์ YAML อะไรบ้าง?', faq3a: 'รองรับฟีเจอร์มาตรฐาน YAML 1.2 ทั้งหมด',
    faq4q: 'ความคิดเห็น YAML จะถูกเก็บไว้ใน JSON หรือไม่?', faq4a: 'ไม่ JSON ไม่รองรับความคิดเห็น จะถูกลบออกระหว่างการแปลง',
    faq5q: 'ความแตกต่างระหว่าง YAML และ JSON คืออะไร?', faq5a: 'YAML ใช้การเยื้องและรองรับความคิดเห็น JSON ใช้วงเล็บปีกกาและเหมาะสำหรับการแลกเปลี่ยนข้อมูล',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function YamlToJsonConverterPage() {
  const { lang } = useLang();
  const t = ui[(lang as string) || 'en'] || ui.en;

  const [yamlInput, setYamlInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [indent, setIndent] = useState(2);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'yaml' | 'json'>('yaml');

  const convertYamlToJson = useCallback(() => {
    if (!yamlInput.trim()) { setStatus({ type: 'error', message: 'No YAML input provided' }); return; }
    try {
      const parsed = yaml.load(yamlInput);
      const result = indent === -1 ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent === 0 ? '\t' : indent);
      setJsonInput(result);
      setStatus({ type: 'success', message: t.success });
      setActiveTab('json');
    } catch (e: unknown) {
      setStatus({ type: 'error', message: `${t.error}: ${e instanceof Error ? e.message : String(e)}` });
    }
  }, [yamlInput, indent, t]);

  const convertJsonToYaml = useCallback(() => {
    if (!jsonInput.trim()) { setStatus({ type: 'error', message: 'No JSON input provided' }); return; }
    try {
      const parsed = JSON.parse(jsonInput);
      const result = yaml.dump(parsed, { indent: indent <= 0 ? 2 : indent, lineWidth: -1, noRefs: true });
      setYamlInput(result);
      setStatus({ type: 'success', message: t.success });
      setActiveTab('yaml');
    } catch (e: unknown) {
      setStatus({ type: 'error', message: `${t.error}: ${e instanceof Error ? e.message : String(e)}` });
    }
  }, [jsonInput, indent, t]);

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

  const textareaStyle: React.CSSProperties = {
    width: '100%', minHeight: 320, fontFamily: 'monospace', fontSize: 13, padding: 14,
    background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)',
    borderRadius: 8, resize: 'vertical', lineHeight: 1.5, outline: 'none',
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="yaml-to-json-converter">
      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <button className="btn btn-primary" onClick={convertYamlToJson} style={{ fontWeight: 700 }}>{t.yamlToJson}</button>
        <button className="btn btn-primary" onClick={convertJsonToYaml} style={{ fontWeight: 700 }}>{t.jsonToYaml}</button>
        <button className="btn btn-ghost" onClick={() => { setYamlInput(''); setJsonInput(''); setStatus(null); }}>{t.clear}</button>
        <button className="btn btn-ghost" onClick={() => { setYamlInput(sampleYaml); setStatus(null); setActiveTab('yaml'); }}>{t.loadYamlSample}</button>
        <button className="btn btn-ghost" onClick={() => { setJsonInput(sampleJson); setStatus(null); setActiveTab('json'); }}>{t.loadJsonSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select
            value={indent}
            onChange={e => setIndent(parseInt(e.target.value))}
            style={{ padding: '4px 8px', borderRadius: 6, background: 'var(--bg-input)', border: '1px solid var(--border-color)', fontSize: 12 }}
          >
            <option value={2}>2 {t.spaces}</option>
            <option value={4}>4 {t.spaces}</option>
            <option value={0}>{t.tab}</option>
            <option value={-1}>{t.compact}</option>
          </select>
        </div>
      </div>

      {/* Status */}
      {status && (
        <div style={{
          padding: '8px 14px', borderRadius: 8, marginBottom: 12, fontSize: 13, fontWeight: 600,
          background: status.type === 'success' ? 'var(--accent-emerald)15' : 'var(--accent-rose)15',
          color: status.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
          border: `1px solid ${status.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
        }}>
          {status.message}
        </div>
      )}

      {/* Editors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: activeTab === 'yaml' ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>{t.yamlLabel}</label>
            {yamlInput && <CopyButton text={yamlInput} />}
          </div>
          <textarea
            value={yamlInput}
            onChange={e => { setYamlInput(e.target.value); setStatus(null); }}
            placeholder={t.yamlPlaceholder}
            style={{ ...textareaStyle, borderColor: activeTab === 'yaml' ? 'var(--accent-blue)' : 'var(--border-color)' }}
            onFocus={() => setActiveTab('yaml')}
            spellCheck={false}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: activeTab === 'json' ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>{t.jsonLabel}</label>
            {jsonInput && <CopyButton text={jsonInput} />}
          </div>
          <textarea
            value={jsonInput}
            onChange={e => { setJsonInput(e.target.value); setStatus(null); }}
            placeholder={t.jsonPlaceholder}
            style={{ ...textareaStyle, borderColor: activeTab === 'json' ? 'var(--accent-blue)' : 'var(--border-color)' }}
            onFocus={() => setActiveTab('json')}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Intro */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t.faqTitle}</h2>
        {[
          { q: t.faq1q, a: t.faq1a },
          { q: t.faq2q, a: t.faq2a },
          { q: t.faq3q, a: t.faq3a },
          { q: t.faq4q, a: t.faq4a },
          { q: t.faq5q, a: t.faq5a },
        ].map((faq, i) => (
          <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <summary style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{faq.q}</summary>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ToolLayout>
  );
}
