'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

function jsonToYaml(obj: unknown, indent: number = 0): string {
  const prefix = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (obj === undefined) return 'null';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    if (obj === '' || obj.includes('\n') || obj.includes(':') || obj.includes('#') ||
        obj.includes('{') || obj.includes('}') || obj.includes('[') || obj.includes(']') ||
        obj.includes(',') || obj.includes('&') || obj.includes('*') || obj.includes('?') ||
        obj.includes('|') || obj.includes('-') || obj.includes('<') || obj.includes('>') ||
        obj.includes('=') || obj.includes('!') || obj.includes('%') || obj.includes('@') ||
        obj.includes('`') || /^\s/.test(obj) || /\s$/.test(obj) ||
        obj === 'true' || obj === 'false' || obj === 'null' || obj === 'yes' || obj === 'no' ||
        !isNaN(Number(obj))) {
      return JSON.stringify(obj);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj.map(item => {
      const val = jsonToYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const lines = val.split('\n');
        return `${prefix}- ${lines[0]}\n${lines.slice(1).map(l => `${prefix}  ${l}`).join('\n')}`;
      }
      return `${prefix}- ${val}`;
    }).join('\n');
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([key, value]) => {
      const safeKey = /[:\s#\[\]{},&*?|>'"!%@`]/.test(key) || key === '' ? JSON.stringify(key) : key;
      if (typeof value === 'object' && value !== null) {
        const nested = jsonToYaml(value, indent + 1);
        return `${prefix}${safeKey}:\n${nested}`;
      }
      return `${prefix}${safeKey}: ${jsonToYaml(value, indent + 1)}`;
    }).join('\n');
  }
  return String(obj);
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to YAML Converter',
    description: 'Convert JSON to YAML online with live preview. Free, fast, and secure client-side conversion tool.',
    jsonLabel: 'JSON Input',
    jsonPlaceholder: '{\n  "name": "John",\n  "age": 30,\n  "hobbies": ["reading", "coding"]\n}',
    yamlLabel: 'YAML Output',
    convertBtn: 'Convert to YAML',
    clear: 'Clear',
    sampleBtn: 'Load Sample',
    livePreview: 'Live Preview',
    autoConvert: 'Auto-convert as you type',
    invalidJson: 'Invalid JSON input',
    introTitle: 'Free JSON to YAML Converter',
    introText: 'Convert JSON data to YAML format instantly with real-time preview. YAML (YAML Ain\'t Markup Language) is a human-friendly data serialization format commonly used for configuration files in Docker, Kubernetes, GitHub Actions, and many other tools. This converter runs entirely in your browser -- your data never leaves your device.',
    comparisonTitle: 'JSON vs YAML at a Glance',
    colFeature: 'Feature', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Comments', row1j: 'Not supported', row1y: 'Supported (#)',
    row2f: 'Readability', row2j: 'Moderate', row2y: 'High (indentation-based)',
    row3f: 'Data types', row3j: 'string, number, bool, null, array, object', row3y: 'Same + dates, timestamps',
    row4f: 'File size', row4j: 'Larger (brackets, quotes)', row4y: 'Smaller (minimal syntax)',
    row5f: 'Common use', row5j: 'APIs, web data', row5y: 'Config files, DevOps',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between JSON and YAML?',
    faq1a: 'JSON uses braces and brackets for structure while YAML uses indentation. YAML supports comments, is more readable, and is commonly used for configuration files. JSON is more popular for APIs and data interchange.',
    faq2q: 'Why convert JSON to YAML?',
    faq2a: 'You might convert JSON to YAML when creating Kubernetes manifests, Docker Compose files, CI/CD pipelines, or any configuration that prefers YAML format. YAML is easier to read and write for human operators.',
    faq3q: 'Is the conversion lossless?',
    faq3a: 'Yes, JSON to YAML conversion is lossless for all standard JSON data types. Both formats support strings, numbers, booleans, null, arrays, and objects. The only difference is in presentation format.',
    faq4q: 'Is my data safe?',
    faq4a: 'Absolutely. All conversion happens locally in your browser using JavaScript. No data is ever sent to any server. You can verify this by disconnecting from the internet.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 转 YAML 转换器',
    description: '在线将 JSON 转换为 YAML，实时预览。免费、快速、安全的客户端转换工具。',
    jsonLabel: 'JSON 输入', jsonPlaceholder: '{\n  "name": "张三",\n  "age": 30,\n  "hobbies": ["阅读", "编程"]\n}',
    yamlLabel: 'YAML 输出', convertBtn: '转换为 YAML', clear: '清除', sampleBtn: '加载示例',
    livePreview: '实时预览', autoConvert: '输入时自动转换', invalidJson: '无效的 JSON 输入',
    introTitle: '免费 JSON 转 YAML 转换器', introText: '即时将 JSON 数据转换为 YAML 格式。YAML 是一种人类友好的数据序列化格式，常用于 Docker、Kubernetes、GitHub Actions 等配置文件。',
    comparisonTitle: 'JSON vs YAML 对比',
    colFeature: '特性', colJson: 'JSON', colYaml: 'YAML',
    row1f: '注释', row1j: '不支持', row1y: '支持 (#)',
    row2f: '可读性', row2j: '中等', row2y: '高（基于缩进）',
    row3f: '数据类型', row3j: '字符串、数字、布尔、null、数组、对象', row3y: '相同 + 日期、时间戳',
    row4f: '文件大小', row4j: '较大（括号、引号）', row4y: '较小（最少语法）',
    row5f: '常见用途', row5j: 'API、Web 数据', row5y: '配置文件、DevOps',
    faqTitle: '常见问题',
    faq1q: 'JSON 和 YAML 有什么区别？', faq1a: 'JSON 使用大括号和方括号表示结构，而 YAML 使用缩进。YAML 支持注释，可读性更强。',
    faq2q: '为什么要将 JSON 转换为 YAML？', faq2a: '创建 Kubernetes 清单、Docker Compose 文件或 CI/CD 流水线时，通常需要 YAML 格式。',
    faq3q: '转换是无损的吗？', faq3a: '是的，JSON 到 YAML 的转换对所有标准数据类型都是无损的。',
    faq4q: '我的数据安全吗？', faq4a: '完全安全。所有转换都在浏览器中本地执行，不会发送任何数据。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur JSON vers YAML',
    description: 'Convertissez JSON en YAML en ligne avec apercu en direct.',
    jsonLabel: 'Entree JSON', jsonPlaceholder: '{\n  "nom": "Jean",\n  "age": 30\n}',
    yamlLabel: 'Sortie YAML', convertBtn: 'Convertir en YAML', clear: 'Effacer', sampleBtn: 'Exemple',
    livePreview: 'Apercu en direct', autoConvert: 'Convertir automatiquement', invalidJson: 'JSON invalide',
    introTitle: 'Convertisseur JSON vers YAML gratuit', introText: 'Convertissez des donnees JSON en format YAML instantanement. YAML est un format lisible couramment utilise pour les fichiers de configuration.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Fonctionnalite', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Commentaires', row1j: 'Non supporte', row1y: 'Supporte (#)',
    row2f: 'Lisibilite', row2j: 'Moderee', row2y: 'Elevee',
    row3f: 'Types', row3j: 'string, number, bool, null, array, object', row3y: 'Idem + dates',
    row4f: 'Taille', row4j: 'Plus grande', row4y: 'Plus petite',
    row5f: 'Usage', row5j: 'APIs', row5y: 'Configuration, DevOps',
    faqTitle: 'Questions frequentes',
    faq1q: 'Difference entre JSON et YAML ?', faq1a: 'JSON utilise des accolades, YAML utilise l\'indentation. YAML supporte les commentaires.',
    faq2q: 'Pourquoi convertir ?', faq2a: 'Pour creer des fichiers de configuration Kubernetes, Docker Compose ou CI/CD.',
    faq3q: 'La conversion est-elle sans perte ?', faq3a: 'Oui, pour tous les types de donnees JSON standards.',
    faq4q: 'Mes donnees sont-elles securisees ?', faq4a: 'Oui, tout se passe dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON zu YAML Konverter',
    description: 'Konvertieren Sie JSON online in YAML mit Live-Vorschau.',
    jsonLabel: 'JSON Eingabe', jsonPlaceholder: '{\n  "name": "Max",\n  "alter": 30\n}',
    yamlLabel: 'YAML Ausgabe', convertBtn: 'In YAML konvertieren', clear: 'Loeschen', sampleBtn: 'Beispiel',
    livePreview: 'Live-Vorschau', autoConvert: 'Automatisch konvertieren', invalidJson: 'Ungueltiges JSON',
    introTitle: 'Kostenloser JSON zu YAML Konverter', introText: 'Konvertieren Sie JSON-Daten sofort in YAML-Format. YAML wird haeufig fuer Konfigurationsdateien verwendet.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Merkmal', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Kommentare', row1j: 'Nicht unterstuetzt', row1y: 'Unterstuetzt (#)',
    row2f: 'Lesbarkeit', row2j: 'Mittel', row2y: 'Hoch',
    row3f: 'Datentypen', row3j: 'String, Number, Bool, Null, Array, Object', row3y: 'Gleich + Daten',
    row4f: 'Dateigroesse', row4j: 'Groesser', row4y: 'Kleiner',
    row5f: 'Verwendung', row5j: 'APIs', row5y: 'Konfiguration, DevOps',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Unterschied zwischen JSON und YAML?', faq1a: 'JSON verwendet Klammern, YAML verwendet Einrueckung. YAML unterstuetzt Kommentare.',
    faq2q: 'Warum konvertieren?', faq2a: 'Fuer Kubernetes-Manifeste, Docker Compose oder CI/CD-Pipelines.',
    faq3q: 'Ist die Konvertierung verlustfrei?', faq3a: 'Ja, fuer alle Standard-JSON-Datentypen.',
    faq4q: 'Sind meine Daten sicher?', faq4a: 'Ja, alles laeuft lokal in Ihrem Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor JSON a YAML',
    description: 'Convierta JSON a YAML en linea con vista previa en tiempo real.',
    jsonLabel: 'Entrada JSON', jsonPlaceholder: '{\n  "nombre": "Juan",\n  "edad": 30\n}',
    yamlLabel: 'Salida YAML', convertBtn: 'Convertir a YAML', clear: 'Limpiar', sampleBtn: 'Ejemplo',
    livePreview: 'Vista previa en vivo', autoConvert: 'Convertir automaticamente', invalidJson: 'JSON invalido',
    introTitle: 'Convertidor JSON a YAML gratuito', introText: 'Convierta datos JSON a formato YAML instantaneamente. YAML es un formato legible para archivos de configuracion.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Caracteristica', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Comentarios', row1j: 'No soportado', row1y: 'Soportado (#)',
    row2f: 'Legibilidad', row2j: 'Moderada', row2y: 'Alta',
    row3f: 'Tipos', row3j: 'string, number, bool, null, array, object', row3y: 'Iguales + fechas',
    row4f: 'Tamano', row4j: 'Mayor', row4y: 'Menor',
    row5f: 'Uso', row5j: 'APIs', row5y: 'Configuracion, DevOps',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Diferencia entre JSON y YAML?', faq1a: 'JSON usa llaves, YAML usa indentacion. YAML soporta comentarios.',
    faq2q: 'Por que convertir?', faq2a: 'Para crear manifiestos de Kubernetes, Docker Compose o pipelines CI/CD.',
    faq3q: 'La conversion es sin perdida?', faq3a: 'Si, para todos los tipos de datos JSON estandar.',
    faq4q: 'Mis datos estan seguros?', faq4a: 'Si, todo se procesa localmente en su navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Convertitore JSON a YAML',
    description: 'Converti JSON in YAML online con anteprima in tempo reale.',
    jsonLabel: 'Input JSON', jsonPlaceholder: '{\n  "nome": "Mario",\n  "eta": 30\n}',
    yamlLabel: 'Output YAML', convertBtn: 'Converti in YAML', clear: 'Cancella', sampleBtn: 'Esempio',
    livePreview: 'Anteprima live', autoConvert: 'Converti automaticamente', invalidJson: 'JSON non valido',
    introTitle: 'Convertitore JSON a YAML gratuito', introText: 'Converti dati JSON in formato YAML istantaneamente. YAML e un formato leggibile per file di configurazione.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Funzionalita', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Commenti', row1j: 'Non supportato', row1y: 'Supportato (#)',
    row2f: 'Leggibilita', row2j: 'Moderata', row2y: 'Alta',
    row3f: 'Tipi', row3j: 'string, number, bool, null, array, object', row3y: 'Stessi + date',
    row4f: 'Dimensione', row4j: 'Maggiore', row4y: 'Minore',
    row5f: 'Uso', row5j: 'API', row5y: 'Configurazione, DevOps',
    faqTitle: 'Domande frequenti',
    faq1q: 'Differenza tra JSON e YAML?', faq1a: 'JSON usa parentesi, YAML usa indentazione. YAML supporta commenti.',
    faq2q: 'Perche convertire?', faq2a: 'Per creare manifest Kubernetes, Docker Compose o pipeline CI/CD.',
    faq3q: 'La conversione e senza perdita?', faq3a: 'Si, per tutti i tipi di dati JSON standard.',
    faq4q: 'I miei dati sono sicuri?', faq4a: 'Si, tutto avviene localmente nel tuo browser.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Conversor JSON para YAML',
    description: 'Converta JSON para YAML online com pre-visualizacao em tempo real.',
    jsonLabel: 'Entrada JSON', jsonPlaceholder: '{\n  "nome": "Joao",\n  "idade": 30\n}',
    yamlLabel: 'Saida YAML', convertBtn: 'Converter para YAML', clear: 'Limpar', sampleBtn: 'Exemplo',
    livePreview: 'Pre-visualizacao', autoConvert: 'Converter automaticamente', invalidJson: 'JSON invalido',
    introTitle: 'Conversor JSON para YAML gratuito', introText: 'Converta dados JSON para YAML instantaneamente.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Recurso', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Comentarios', row1j: 'Nao suportado', row1y: 'Suportado (#)',
    row2f: 'Legibilidade', row2j: 'Moderada', row2y: 'Alta', row3f: 'Tipos', row3j: 'Mesmos', row3y: '+ datas',
    row4f: 'Tamanho', row4j: 'Maior', row4y: 'Menor', row5f: 'Uso', row5j: 'APIs', row5y: 'Configuracao',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Diferenca entre JSON e YAML?', faq1a: 'JSON usa chaves, YAML usa indentacao.',
    faq2q: 'Por que converter?', faq2a: 'Para ficheiros de configuracao Kubernetes, Docker ou CI/CD.',
    faq3q: 'A conversao e sem perdas?', faq3a: 'Sim, para todos os tipos JSON padrao.',
    faq4q: 'Os dados estao seguros?', faq4a: 'Sim, tudo e processado localmente.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'JSON naar YAML Converter',
    description: 'Converteer JSON naar YAML online met live voorbeeld.',
    jsonLabel: 'JSON Invoer', jsonPlaceholder: '{\n  "naam": "Jan",\n  "leeftijd": 30\n}',
    yamlLabel: 'YAML Uitvoer', convertBtn: 'Naar YAML', clear: 'Wissen', sampleBtn: 'Voorbeeld',
    livePreview: 'Live voorbeeld', autoConvert: 'Automatisch converteren', invalidJson: 'Ongeldige JSON',
    introTitle: 'Gratis JSON naar YAML Converter', introText: 'Converteer JSON-gegevens naar YAML-formaat.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Kenmerk', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Commentaar', row1j: 'Niet ondersteund', row1y: 'Ondersteund (#)',
    row2f: 'Leesbaarheid', row2j: 'Matig', row2y: 'Hoog', row3f: 'Types', row3j: 'Dezelfde', row3y: '+ datums',
    row4f: 'Grootte', row4j: 'Groter', row4y: 'Kleiner', row5f: 'Gebruik', row5j: 'APIs', row5y: 'Configuratie',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Verschil tussen JSON en YAML?', faq1a: 'JSON gebruikt haakjes, YAML gebruikt inspringen.',
    faq2q: 'Waarom converteren?', faq2a: 'Voor Kubernetes, Docker Compose of CI/CD configuraties.',
    faq3q: 'Is de conversie verliesvrij?', faq3a: 'Ja, voor alle standaard JSON-gegevenstypen.',
    faq4q: 'Zijn mijn gegevens veilig?', faq4a: 'Ja, alles draait lokaal in uw browser.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Konwerter JSON do YAML',
    description: 'Konwertuj JSON na YAML online z podgladem na zywo.',
    jsonLabel: 'Wejscie JSON', jsonPlaceholder: '{\n  "imie": "Jan",\n  "wiek": 30\n}',
    yamlLabel: 'Wyjscie YAML', convertBtn: 'Konwertuj na YAML', clear: 'Wyczysc', sampleBtn: 'Przyklad',
    livePreview: 'Podglad na zywo', autoConvert: 'Automatyczna konwersja', invalidJson: 'Nieprawidlowy JSON',
    introTitle: 'Darmowy konwerter JSON do YAML', introText: 'Konwertuj dane JSON na format YAML natychmiast.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Cecha', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Komentarze', row1j: 'Nieobslugiwane', row1y: 'Obslugiwane (#)',
    row2f: 'Czytelnosc', row2j: 'Srednia', row2y: 'Wysoka', row3f: 'Typy', row3j: 'Te same', row3y: '+ daty',
    row4f: 'Rozmiar', row4j: 'Wiekszy', row4y: 'Mniejszy', row5f: 'Uzycie', row5j: 'API', row5y: 'Konfiguracja',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Roznica miedzy JSON a YAML?', faq1a: 'JSON uzywa nawiasow, YAML uzywa wciec.',
    faq2q: 'Dlaczego konwertowac?', faq2a: 'Dla plikow konfiguracyjnych Kubernetes, Docker lub CI/CD.',
    faq3q: 'Czy konwersja jest bezstratna?', faq3a: 'Tak, dla wszystkich standardowych typow JSON.',
    faq4q: 'Czy moje dane sa bezpieczne?', faq4a: 'Tak, wszystko dziala lokalnie w przegladarce.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JSON till YAML Konverterare',
    description: 'Konvertera JSON till YAML online med live forhandsvisning.',
    jsonLabel: 'JSON Indata', jsonPlaceholder: '{\n  "namn": "Erik",\n  "alder": 30\n}',
    yamlLabel: 'YAML Utdata', convertBtn: 'Konvertera till YAML', clear: 'Rensa', sampleBtn: 'Exempel',
    livePreview: 'Live forhandsvisning', autoConvert: 'Konvertera automatiskt', invalidJson: 'Ogiltig JSON',
    introTitle: 'Gratis JSON till YAML', introText: 'Konvertera JSON-data till YAML-format.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Funktion', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Kommentarer', row1j: 'Ej stott', row1y: 'Stott (#)',
    row2f: 'Lasbarhet', row2j: 'Mattig', row2y: 'Hog', row3f: 'Typer', row3j: 'Samma', row3y: '+ datum',
    row4f: 'Storlek', row4j: 'Storre', row4y: 'Mindre', row5f: 'Anvandning', row5j: 'API:er', row5y: 'Konfiguration',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Skillnad mellan JSON och YAML?', faq1a: 'JSON anvander klammerparenteser, YAML anvander indrag.',
    faq2q: 'Varfor konvertera?', faq2a: 'For Kubernetes, Docker Compose eller CI/CD-konfigurationer.',
    faq3q: 'Ar konverteringen forlustfri?', faq3a: 'Ja, for alla standard JSON-datatyper.',
    faq4q: 'Ar mina data sakra?', faq4a: 'Ja, allt kor lokalt i din webblasare.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JSON til YAML Konverterer',
    description: 'Konverter JSON til YAML online med live forhandsvisning.',
    jsonLabel: 'JSON Inndata', jsonPlaceholder: '{\n  "navn": "Erik",\n  "alder": 30\n}',
    yamlLabel: 'YAML Utdata', convertBtn: 'Konverter til YAML', clear: 'Toemm', sampleBtn: 'Eksempel',
    livePreview: 'Live forhandsvisning', autoConvert: 'Konverter automatisk', invalidJson: 'Ugyldig JSON',
    introTitle: 'Gratis JSON til YAML', introText: 'Konverter JSON-data til YAML-format.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Egenskap', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Kommentarer', row1j: 'Ikke stottet', row1y: 'Stottet (#)',
    row2f: 'Lesbarhet', row2j: 'Middels', row2y: 'Hoy', row3f: 'Typer', row3j: 'Samme', row3y: '+ datoer',
    row4f: 'Storrelse', row4j: 'Storre', row4y: 'Mindre', row5f: 'Bruk', row5j: 'API-er', row5y: 'Konfigurasjon',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Forskjell mellom JSON og YAML?', faq1a: 'JSON bruker klammer, YAML bruker innrykk.',
    faq2q: 'Hvorfor konvertere?', faq2a: 'For Kubernetes, Docker Compose eller CI/CD.',
    faq3q: 'Er konverteringen tapsfri?', faq3a: 'Ja, for alle standard JSON-datatyper.',
    faq4q: 'Er dataene mine trygge?', faq4a: 'Ja, alt kjorer lokalt i nettleseren.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'JSON から YAML コンバーター',
    description: 'JSONをYAMLにオンラインで変換。リアルタイムプレビュー付き。',
    jsonLabel: 'JSON 入力', jsonPlaceholder: '{\n  "名前": "太郎",\n  "年齢": 30\n}',
    yamlLabel: 'YAML 出力', convertBtn: 'YAMLに変換', clear: 'クリア', sampleBtn: 'サンプル',
    livePreview: 'ライブプレビュー', autoConvert: '自動変換', invalidJson: '無効なJSON',
    introTitle: '無料 JSON to YAML コンバーター', introText: 'JSONデータをYAML形式に即座に変換。YAMLはDockerやKubernetesの設定ファイルで使われます。',
    comparisonTitle: 'JSON vs YAML', colFeature: '機能', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'コメント', row1j: '非対応', row1y: '対応 (#)',
    row2f: '可読性', row2j: '中', row2y: '高', row3f: '型', row3j: '同じ', row3y: '+ 日付',
    row4f: 'サイズ', row4j: '大きい', row4y: '小さい', row5f: '用途', row5j: 'API', row5y: '設定ファイル',
    faqTitle: 'よくある質問',
    faq1q: 'JSONとYAMLの違いは？', faq1a: 'JSONは括弧を使い、YAMLはインデントを使います。',
    faq2q: 'なぜ変換するのですか？', faq2a: 'Kubernetes、Docker Compose、CI/CDの設定ファイル作成のため。',
    faq3q: '変換は無損失ですか？', faq3a: 'はい、すべての標準JSONデータ型で無損失です。',
    faq4q: 'データは安全ですか？', faq4a: 'はい、すべてブラウザでローカルに実行されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON to YAML 변환기',
    description: 'JSON을 YAML로 온라인 변환. 실시간 미리보기.',
    jsonLabel: 'JSON 입력', jsonPlaceholder: '{\n  "이름": "홍길동",\n  "나이": 30\n}',
    yamlLabel: 'YAML 출력', convertBtn: 'YAML로 변환', clear: '지우기', sampleBtn: '예제',
    livePreview: '실시간 미리보기', autoConvert: '자동 변환', invalidJson: '잘못된 JSON',
    introTitle: '무료 JSON to YAML 변환기', introText: 'JSON 데이터를 YAML 형식으로 즉시 변환합니다.',
    comparisonTitle: 'JSON vs YAML', colFeature: '기능', colJson: 'JSON', colYaml: 'YAML',
    row1f: '주석', row1j: '미지원', row1y: '지원 (#)',
    row2f: '가독성', row2j: '보통', row2y: '높음', row3f: '타입', row3j: '동일', row3y: '+ 날짜',
    row4f: '크기', row4j: '더 큼', row4y: '더 작음', row5f: '용도', row5j: 'API', row5y: '설정 파일',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON과 YAML의 차이점은?', faq1a: 'JSON은 괄호를, YAML은 들여쓰기를 사용합니다.',
    faq2q: '왜 변환하나요?', faq2a: 'Kubernetes, Docker Compose, CI/CD 설정 파일 작성을 위해.',
    faq3q: '변환은 무손실인가요?', faq3a: '네, 모든 표준 JSON 데이터 타입에 대해 무손실입니다.',
    faq4q: '데이터는 안전한가요?', faq4a: '네, 모두 브라우저에서 로컬로 실행됩니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Konverter JSON ke YAML',
    description: 'Konversi JSON ke YAML online dengan pratinjau langsung.',
    jsonLabel: 'Input JSON', jsonPlaceholder: '{\n  "nama": "Budi",\n  "umur": 30\n}',
    yamlLabel: 'Output YAML', convertBtn: 'Konversi ke YAML', clear: 'Hapus', sampleBtn: 'Contoh',
    livePreview: 'Pratinjau langsung', autoConvert: 'Konversi otomatis', invalidJson: 'JSON tidak valid',
    introTitle: 'Konverter JSON ke YAML Gratis', introText: 'Konversi data JSON ke format YAML secara instan.',
    comparisonTitle: 'JSON vs YAML', colFeature: 'Fitur', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'Komentar', row1j: 'Tidak didukung', row1y: 'Didukung (#)',
    row2f: 'Keterbacaan', row2j: 'Sedang', row2y: 'Tinggi', row3f: 'Tipe', row3j: 'Sama', row3y: '+ tanggal',
    row4f: 'Ukuran', row4j: 'Lebih besar', row4y: 'Lebih kecil', row5f: 'Penggunaan', row5j: 'API', row5y: 'Konfigurasi',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Perbedaan JSON dan YAML?', faq1a: 'JSON menggunakan kurung, YAML menggunakan indentasi.',
    faq2q: 'Mengapa mengkonversi?', faq2a: 'Untuk file konfigurasi Kubernetes, Docker atau CI/CD.',
    faq3q: 'Apakah konversi tanpa kehilangan?', faq3a: 'Ya, untuk semua tipe data JSON standar.',
    faq4q: 'Apakah data saya aman?', faq4a: 'Ya, semua berjalan di browser Anda.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวแปลง JSON เป็น YAML',
    description: 'แปลง JSON เป็น YAML ออนไลน์พร้อมตัวอย่างแบบเรียลไทม์',
    jsonLabel: 'อินพุต JSON', jsonPlaceholder: '{\n  "ชื่อ": "สมชาย",\n  "อายุ": 30\n}',
    yamlLabel: 'เอาต์พุต YAML', convertBtn: 'แปลงเป็น YAML', clear: 'ล้าง', sampleBtn: 'ตัวอย่าง',
    livePreview: 'ตัวอย่างสด', autoConvert: 'แปลงอัตโนมัติ', invalidJson: 'JSON ไม่ถูกต้อง',
    introTitle: 'ตัวแปลง JSON เป็น YAML ฟรี', introText: 'แปลงข้อมูล JSON เป็นรูปแบบ YAML ทันที',
    comparisonTitle: 'JSON vs YAML', colFeature: 'คุณสมบัติ', colJson: 'JSON', colYaml: 'YAML',
    row1f: 'ความคิดเห็น', row1j: 'ไม่รองรับ', row1y: 'รองรับ (#)',
    row2f: 'อ่านง่าย', row2j: 'ปานกลาง', row2y: 'สูง', row3f: 'ชนิด', row3j: 'เหมือนกัน', row3y: '+ วันที่',
    row4f: 'ขนาด', row4j: 'ใหญ่กว่า', row4y: 'เล็กกว่า', row5f: 'การใช้งาน', row5j: 'API', row5y: 'การตั้งค่า',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'ความแตกต่างระหว่าง JSON และ YAML?', faq1a: 'JSON ใช้วงเล็บ YAML ใช้การเยื้อง',
    faq2q: 'ทำไมต้องแปลง?', faq2a: 'สำหรับไฟล์คอนฟิก Kubernetes, Docker หรือ CI/CD',
    faq3q: 'การแปลงไม่มีการสูญเสียหรือไม่?', faq3a: 'ใช่ สำหรับทุกชนิดข้อมูล JSON มาตรฐาน',
    faq4q: 'ข้อมูลของฉันปลอดภัยหรือไม่?', faq4a: 'ใช่ ทุกอย่างทำงานในเบราว์เซอร์ของคุณ',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const sampleJson = `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "nginx-deployment",
    "labels": {
      "app": "nginx"
    }
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "matchLabels": {
        "app": "nginx"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "nginx"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "nginx",
            "image": "nginx:1.25",
            "ports": [
              {
                "containerPort": 80
              }
            ]
          }
        ]
      }
    }
  }
}`;

export default function JsonToYamlConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [jsonInput, setJsonInput] = useState('');
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState('');
  const [autoMode, setAutoMode] = useState(true);

  const convert = useCallback((input: string) => {
    setError('');
    if (!input.trim()) { setYamlOutput(''); return; }
    try {
      const parsed = JSON.parse(input);
      const yaml = jsonToYaml(parsed);
      setYamlOutput(yaml);
    } catch {
      setError(t.invalidJson);
      setYamlOutput('');
    }
  }, [t.invalidJson]);

  const handleInputChange = (val: string) => {
    setJsonInput(val);
    if (autoMode) convert(val);
  };

  const loadSample = () => {
    setJsonInput(sampleJson);
    convert(sampleJson);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-to-yaml-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => convert(jsonInput)} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => { setJsonInput(''); setYamlOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.sampleBtn}</button>
        <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer' }}>
          <input type="checkbox" checked={autoMode} onChange={e => setAutoMode(e.target.checked)} />
          {t.autoConvert}
        </label>
      </div>

      {error && <div style={{ padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.jsonLabel}</label>
          <textarea
            value={jsonInput}
            onChange={e => handleInputChange(e.target.value)}
            placeholder={t.jsonPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.yamlLabel}</label>
            {yamlOutput && <CopyButton text={yamlOutput} />}
          </div>
          <textarea
            value={yamlOutput}
            readOnly
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13, background: 'var(--bg-input)' }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.comparisonTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.colFeature}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.colJson}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.colYaml}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.row1f, t.row1j, t.row1y],
                [t.row2f, t.row2j, t.row2y],
                [t.row3f, t.row3j, t.row3y],
                [t.row4f, t.row4j, t.row4y],
                [t.row5f, t.row5j, t.row5y],
              ].map(([f, j, y], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{f}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{j}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-yaml`, label: 'JSON ↔ YAML' },
            { href: `/${lang}/tools/yaml-json-converter`, label: 'YAML ↔ JSON Converter' },
            { href: `/${lang}/tools/yaml-to-json`, label: 'YAML to JSON' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/yaml-validator`, label: 'YAML Validator' },
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
