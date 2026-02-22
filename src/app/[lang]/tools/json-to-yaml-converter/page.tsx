'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to YAML Converter', description: 'Convert JSON to YAML format instantly with syntax validation and proper indentation.',
    inputLabel: 'JSON Input', outputLabel: 'YAML Output', convert: 'Convert to YAML',
    clear: 'Clear', loadSample: 'Load Sample', indent: 'Indent',
    introTitle: 'Free JSON to YAML Converter Online',
    introText: 'Convert JSON data to YAML format instantly with this free online tool. YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format commonly used for configuration files in Docker, Kubernetes, CI/CD pipelines, and many other tools. This converter validates your JSON before converting and produces clean, properly indented YAML output.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is YAML?', faq1a: 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format. It uses indentation to represent structure, making it more readable than JSON or XML for configuration files. It is widely used in Docker Compose, Kubernetes, Ansible, GitHub Actions, and other DevOps tools.',
    faq2q: 'What is the difference between JSON and YAML?', faq2a: 'JSON uses curly braces and square brackets for structure while YAML uses indentation. YAML supports comments (with #) while JSON does not. YAML allows multi-line strings more naturally. Both formats can represent the same data types. YAML is generally considered more human-readable for configuration files.',
    faq3q: 'Is this converter lossless?', faq3a: 'Yes, converting from JSON to YAML is lossless. All data types (strings, numbers, booleans, arrays, objects, null) are accurately represented in YAML. However, YAML supports features that JSON does not (like comments and anchors), which cannot be represented when converting from JSON.',
    faq4q: 'Can I convert YAML back to JSON?', faq4a: 'This tool converts JSON to YAML. For YAML to JSON conversion, you can use other tools. The conversion is bidirectional and lossless for standard data types.',
    faq5q: 'Where is YAML commonly used?', faq5a: 'YAML is used in Docker Compose files (docker-compose.yml), Kubernetes manifests, GitHub Actions workflows, CircleCI and Travis CI configuration, Ansible playbooks, and many application configuration files. Its readability makes it popular for DevOps and infrastructure as code.',
  },
  fr: {
    title: 'Convertisseur JSON vers YAML', description: 'Convertissez JSON en format YAML instantanement avec validation de syntaxe.',
    inputLabel: 'Entree JSON', outputLabel: 'Sortie YAML', convert: 'Convertir en YAML',
    clear: 'Effacer', loadSample: 'Exemple', indent: 'Indentation',
    introTitle: 'Convertisseur JSON vers YAML Gratuit en Ligne',
    introText: 'Convertissez les donnees JSON en format YAML instantanement. YAML est utilise pour les fichiers de configuration dans Docker, Kubernetes et les pipelines CI/CD.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Qu\'est-ce que YAML?', faq1a: 'YAML est un format de serialisation de donnees lisible par l\'humain utilisant l\'indentation pour representer la structure.',
    faq2q: 'Difference entre JSON et YAML?', faq2a: 'JSON utilise des accolades, YAML utilise l\'indentation. YAML supporte les commentaires, pas JSON.',
    faq3q: 'La conversion est-elle sans perte?', faq3a: 'Oui, tous les types de donnees sont correctement representes dans YAML.',
    faq4q: 'Puis-je convertir YAML en JSON?', faq4a: 'Cet outil convertit JSON en YAML. Pour l\'inverse, utilisez d\'autres outils.',
    faq5q: 'Ou est utilise YAML?', faq5a: 'Docker Compose, Kubernetes, GitHub Actions, Ansible et autres outils DevOps.',
  },
  de: {
    title: 'JSON zu YAML Konverter', description: 'Konvertieren Sie JSON sofort in YAML-Format mit Syntaxvalidierung.',
    inputLabel: 'JSON Eingabe', outputLabel: 'YAML Ausgabe', convert: 'In YAML konvertieren',
    clear: 'Loeschen', loadSample: 'Beispiel', indent: 'Einzug',
    introTitle: 'Kostenloser JSON zu YAML Konverter Online',
    introText: 'Konvertieren Sie JSON-Daten sofort in YAML-Format. YAML wird fuer Konfigurationsdateien in Docker, Kubernetes und CI/CD-Pipelines verwendet.',
    faqTitle: 'Haeufig Gestellte Fragen',
    faq1q: 'Was ist YAML?', faq1a: 'YAML ist ein menschenlesbares Datenserialisierungsformat, das Einrueckungen verwendet.',
    faq2q: 'Unterschied zwischen JSON und YAML?', faq2a: 'JSON verwendet geschweifte Klammern, YAML Einrueckungen. YAML unterstuetzt Kommentare.',
    faq3q: 'Ist die Konvertierung verlustfrei?', faq3a: 'Ja, alle Datentypen werden korrekt in YAML dargestellt.',
    faq4q: 'Kann ich YAML in JSON konvertieren?', faq4a: 'Dieses Tool konvertiert JSON in YAML. Fuer die Umkehrung verwenden Sie andere Tools.',
    faq5q: 'Wo wird YAML verwendet?', faq5a: 'Docker Compose, Kubernetes, GitHub Actions, Ansible und andere DevOps-Tools.',
  },
  it: {
    title: 'Convertitore JSON in YAML', description: 'Converti JSON in YAML istantaneamente.',
    inputLabel: 'Input JSON', outputLabel: 'Output YAML', convert: 'Converti in YAML',
    clear: 'Cancella', loadSample: 'Esempio', indent: 'Indentazione',
    introTitle: 'Convertitore JSON in YAML Gratuito Online',
    introText: 'Converti dati JSON in formato YAML. YAML e usato per file di configurazione in Docker, Kubernetes e pipeline CI/CD.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Cos\'e YAML?', faq1a: 'YAML e un formato di serializzazione dati leggibile dall\'uomo che usa l\'indentazione.',
    faq2q: 'Differenza tra JSON e YAML?', faq2a: 'JSON usa parentesi graffe, YAML usa l\'indentazione. YAML supporta i commenti.',
    faq3q: 'La conversione e senza perdita?', faq3a: 'Si, tutti i tipi di dati sono correttamente rappresentati in YAML.',
    faq4q: 'Posso convertire YAML in JSON?', faq4a: 'Questo strumento converte JSON in YAML. Per il contrario, usa altri strumenti.',
    faq5q: 'Dove e usato YAML?', faq5a: 'Docker Compose, Kubernetes, GitHub Actions, Ansible e altri strumenti DevOps.',
  },
  es: {
    title: 'Convertidor JSON a YAML', description: 'Convierte JSON a formato YAML al instante.',
    inputLabel: 'Entrada JSON', outputLabel: 'Salida YAML', convert: 'Convertir a YAML',
    clear: 'Limpiar', loadSample: 'Ejemplo', indent: 'Sangria',
    introTitle: 'Convertidor JSON a YAML Gratuito en Linea',
    introText: 'Convierte datos JSON a formato YAML. YAML se usa para archivos de configuracion en Docker, Kubernetes y pipelines CI/CD.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Que es YAML?', faq1a: 'YAML es un formato de serializacion de datos legible por humanos que usa indentacion.',
    faq2q: 'Diferencia entre JSON y YAML?', faq2a: 'JSON usa llaves, YAML usa indentacion. YAML soporta comentarios, JSON no.',
    faq3q: 'La conversion es sin perdida?', faq3a: 'Si, todos los tipos de datos se representan correctamente en YAML.',
    faq4q: 'Puedo convertir YAML a JSON?', faq4a: 'Esta herramienta convierte JSON a YAML. Para el inverso, usa otras herramientas.',
    faq5q: 'Donde se usa YAML?', faq5a: 'Docker Compose, Kubernetes, GitHub Actions, Ansible y otras herramientas DevOps.',
  },
  pt: {
    title: 'Conversor JSON para YAML', description: 'Converta JSON para YAML instantaneamente.',
    inputLabel: 'Entrada JSON', outputLabel: 'Saida YAML', convert: 'Converter para YAML',
    clear: 'Limpar', loadSample: 'Exemplo', indent: 'Indentacao',
    introTitle: 'Conversor JSON para YAML Gratuito Online',
    introText: 'Converta dados JSON para formato YAML. YAML e usado para arquivos de configuracao no Docker, Kubernetes e pipelines CI/CD.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'O que e YAML?', faq1a: 'YAML e um formato de serializacao de dados legivelmente humano que usa indentacao.',
    faq2q: 'Diferenca entre JSON e YAML?', faq2a: 'JSON usa chaves, YAML usa indentacao. YAML suporta comentarios.',
    faq3q: 'A conversao e sem perdas?', faq3a: 'Sim, todos os tipos de dados sao representados corretamente em YAML.',
    faq4q: 'Posso converter YAML para JSON?', faq4a: 'Esta ferramenta converte JSON para YAML. Para o inverso, use outras ferramentas.',
    faq5q: 'Onde o YAML e usado?', faq5a: 'Docker Compose, Kubernetes, GitHub Actions, Ansible e outras ferramentas DevOps.',
  },
  nl: { title: 'JSON naar YAML Converter', description: 'Converteer JSON naar YAML-formaat direct.', inputLabel: 'JSON Invoer', outputLabel: 'YAML Uitvoer', convert: 'Naar YAML', clear: 'Wissen', loadSample: 'Voorbeeld', indent: 'Inspringing', introTitle: 'Gratis JSON naar YAML Converter', introText: 'Converteer JSON-gegevens naar YAML-formaat.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Wat is YAML?', faq1a: 'YAML is een voor mensen leesbaar gegevensserialisatieformaat.', faq2q: 'Verschil JSON en YAML?', faq2a: 'JSON gebruikt accolades, YAML inspringing.', faq3q: 'Is conversie verliesvrij?', faq3a: 'Ja.', faq4q: 'YAML naar JSON?', faq4a: 'Gebruik andere tools.', faq5q: 'Waar YAML?', faq5a: 'Docker, Kubernetes, GitHub Actions.' },
  pl: { title: 'Konwerter JSON do YAML', description: 'Konwertuj JSON do YAML natychmiast.', inputLabel: 'Wejscie JSON', outputLabel: 'Wyjscie YAML', convert: 'Konwertuj do YAML', clear: 'Wyczysc', loadSample: 'Przyklad', indent: 'Wciecia', introTitle: 'Darmowy Konwerter JSON do YAML', introText: 'Konwertuj dane JSON do formatu YAML.', faqTitle: 'FAQ', faq1q: 'Co to jest YAML?', faq1a: 'YAML to czytelny dla czlowieka format serializacji danych.', faq2q: 'Roznica JSON i YAML?', faq2a: 'JSON uzywa nawiasow klamrowych, YAML wciecia.', faq3q: 'Konwersja bez strat?', faq3a: 'Tak.', faq4q: 'YAML do JSON?', faq4a: 'Uzyj innych narzedzi.', faq5q: 'Gdzie YAML?', faq5a: 'Docker, Kubernetes, GitHub Actions.' },
  sv: { title: 'JSON till YAML Konverterare', description: 'Konvertera JSON till YAML direkt.', inputLabel: 'JSON Indata', outputLabel: 'YAML Utdata', convert: 'Konvertera till YAML', clear: 'Rensa', loadSample: 'Exempel', indent: 'Indrag', introTitle: 'Gratis JSON till YAML Konverterare', introText: 'Konvertera JSON-data till YAML-format.', faqTitle: 'Vanliga Fragor', faq1q: 'Vad ar YAML?', faq1a: 'YAML ar ett manskligt laesbart dataserialiseringsformat.', faq2q: 'Skillnad JSON och YAML?', faq2a: 'JSON anvander klammerparenteser, YAML indragning.', faq3q: 'Foerlustefri konvertering?', faq3a: 'Ja.', faq4q: 'YAML till JSON?', faq4a: 'Anvand andra verktyg.', faq5q: 'Var YAML?', faq5a: 'Docker, Kubernetes, GitHub Actions.' },
  no: { title: 'JSON til YAML Konverter', description: 'Konverter JSON til YAML umiddelbart.', inputLabel: 'JSON Inndata', outputLabel: 'YAML Utdata', convert: 'Konverter til YAML', clear: 'Tom', loadSample: 'Eksempel', indent: 'Innrykk', introTitle: 'Gratis JSON til YAML Konverter', introText: 'Konverter JSON-data til YAML-format.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hva er YAML?', faq1a: 'YAML er et menneskelig lesbart dataserialiseringsformat.', faq2q: 'Forskjell JSON og YAML?', faq2a: 'JSON bruker klammerparenteser, YAML innrykk.', faq3q: 'Tapsfri konvertering?', faq3a: 'Ja.', faq4q: 'YAML til JSON?', faq4a: 'Bruk andre verktoy.', faq5q: 'Hvor YAML?', faq5a: 'Docker, Kubernetes, GitHub Actions.' },
  zh: {
    title: 'JSON 转 YAML 转换器', description: '即时将 JSON 转换为 YAML 格式，支持语法验证。',
    inputLabel: 'JSON 输入', outputLabel: 'YAML 输出', convert: '转换为 YAML',
    clear: '清除', loadSample: '加载示例', indent: '缩进',
    introTitle: '免费在线 JSON 转 YAML 转换工具',
    introText: '即时将 JSON 数据转换为 YAML 格式。YAML 广泛用于 Docker、Kubernetes 和 CI/CD 配置文件。',
    faqTitle: '常见问题',
    faq1q: '什么是 YAML？', faq1a: 'YAML 是一种人类可读的数据序列化格式，使用缩进表示层次结构。',
    faq2q: 'JSON 和 YAML 的区别？', faq2a: 'JSON 使用大括号，YAML 使用缩进。YAML 支持注释，JSON 不支持。',
    faq3q: '转换是无损的吗？', faq3a: '是的，所有数据类型在 YAML 中都能准确表示。',
    faq4q: '能将 YAML 转回 JSON 吗？', faq4a: '此工具仅转换 JSON 到 YAML，反向转换请使用其他工具。',
    faq5q: 'YAML 常用在哪里？', faq5a: 'Docker Compose、Kubernetes、GitHub Actions、Ansible 等 DevOps 工具。',
  },
  ja: {
    title: 'JSON から YAML への変換', description: 'JSON を YAML 形式に即時変換します。',
    inputLabel: 'JSON 入力', outputLabel: 'YAML 出力', convert: 'YAML に変換',
    clear: 'クリア', loadSample: 'サンプル', indent: 'インデント',
    introTitle: '無料オンライン JSON から YAML 変換ツール',
    introText: 'JSON データを YAML 形式に変換します。YAML は Docker、Kubernetes、CI/CD の設定ファイルで広く使用されています。',
    faqTitle: 'よくある質問',
    faq1q: 'YAML とは何ですか？', faq1a: 'YAML は人間が読みやすいデータシリアライゼーション形式で、インデントで構造を表します。',
    faq2q: 'JSON と YAML の違いは？', faq2a: 'JSON は中括弧を使用し、YAML はインデントを使用します。YAML はコメントをサポートします。',
    faq3q: '変換はロスレスですか？', faq3a: 'はい、すべてのデータ型が YAML で正確に表現されます。',
    faq4q: 'YAML を JSON に戻せますか？', faq4a: 'このツールは JSON から YAML への変換のみです。逆変換は他のツールを使用してください。',
    faq5q: 'YAML はどこで使われますか？', faq5a: 'Docker Compose、Kubernetes、GitHub Actions、Ansible などの DevOps ツールで使用されています。',
  },
  ko: {
    title: 'JSON에서 YAML로 변환기', description: 'JSON을 YAML 형식으로 즉시 변환하세요.',
    inputLabel: 'JSON 입력', outputLabel: 'YAML 출력', convert: 'YAML로 변환',
    clear: '초기화', loadSample: '샘플', indent: '들여쓰기',
    introTitle: '무료 온라인 JSON to YAML 변환기',
    introText: 'JSON 데이터를 YAML 형식으로 변환하세요. YAML은 Docker, Kubernetes, CI/CD 설정 파일에 널리 사용됩니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'YAML이란 무엇인가요?', faq1a: 'YAML은 들여쓰기로 구조를 나타내는 사람이 읽기 쉬운 데이터 직렬화 형식입니다.',
    faq2q: 'JSON과 YAML의 차이점은?', faq2a: 'JSON은 중괄호를 사용하고 YAML은 들여쓰기를 사용합니다. YAML은 주석을 지원합니다.',
    faq3q: '변환이 무손실인가요?', faq3a: '네, 모든 데이터 유형이 YAML에서 정확하게 표현됩니다.',
    faq4q: 'YAML을 JSON으로 변환할 수 있나요?', faq4a: '이 도구는 JSON을 YAML로만 변환합니다. 역변환은 다른 도구를 사용하세요.',
    faq5q: 'YAML은 어디에서 사용되나요?', faq5a: 'Docker Compose, Kubernetes, GitHub Actions, Ansible 등 DevOps 도구에서 사용됩니다.',
  },
  id: { title: 'Konverter JSON ke YAML', description: 'Ubah JSON ke format YAML secara instan.', inputLabel: 'Input JSON', outputLabel: 'Output YAML', convert: 'Konversi ke YAML', clear: 'Bersihkan', loadSample: 'Contoh', indent: 'Indentasi', introTitle: 'Konverter JSON ke YAML Gratis Online', introText: 'Ubah data JSON ke format YAML secara instan.', faqTitle: 'FAQ', faq1q: 'Apa itu YAML?', faq1a: 'YAML adalah format serialisasi data yang mudah dibaca manusia menggunakan indentasi.', faq2q: 'Perbedaan JSON dan YAML?', faq2a: 'JSON menggunakan kurung kurawal, YAML menggunakan indentasi.', faq3q: 'Konversi tanpa kehilangan?', faq3a: 'Ya.', faq4q: 'YAML ke JSON?', faq4a: 'Gunakan alat lain.', faq5q: 'Di mana YAML digunakan?', faq5a: 'Docker, Kubernetes, GitHub Actions.' },
  th: { title: 'แปลง JSON เป็น YAML', description: 'แปลง JSON เป็น YAML ทันที', inputLabel: 'JSON อินพุต', outputLabel: 'YAML เอาต์พุต', convert: 'แปลงเป็น YAML', clear: 'ล้าง', loadSample: 'ตัวอย่าง', indent: 'การเยื้อง', introTitle: 'ตัวแปลง JSON เป็น YAML ฟรีออนไลน์', introText: 'แปลงข้อมูล JSON เป็นรูปแบบ YAML', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'YAML คืออะไร?', faq1a: 'YAML เป็นรูปแบบการซีเรียลไลซ์ข้อมูลที่มนุษย์อ่านได้ใช้การเยื้อง', faq2q: 'ความแตกต่างของ JSON และ YAML?', faq2a: 'JSON ใช้วงเล็บปีกกา YAML ใช้การเยื้อง', faq3q: 'การแปลงไม่มีการสูญหาย?', faq3a: 'ใช่', faq4q: 'YAML เป็น JSON?', faq4a: 'ใช้เครื่องมืออื่น', faq5q: 'YAML ใช้ที่ไหน?', faq5a: 'Docker, Kubernetes, GitHub Actions' },
};

// Simple JSON to YAML converter
function jsonToYaml(obj: unknown, indent = 0): string {
  const spaces = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    // Quote strings that need it
    if (obj === '' || /[:#\[\]{},&*?|<>=!%@`]/.test(obj) || /^(true|false|null|yes|no|on|off)$/i.test(obj) || /^\s|\s$/.test(obj)) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return '\n' + obj.map(item => {
      const val = jsonToYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        return `${spaces}- ${val.trimStart()}`;
      }
      return `${spaces}- ${val}`;
    }).join('\n');
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return (indent === 0 ? '' : '\n') + entries.map(([key, val]) => {
      const yamlVal = jsonToYaml(val, indent + 1);
      if (typeof val === 'object' && val !== null) {
        return `${spaces}${key}:${yamlVal}`;
      }
      return `${spaces}${key}: ${yamlVal}`;
    }).join('\n');
  }
  return String(obj);
}

const SAMPLE_JSON = `{
  "name": "my-app",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "mydb",
    "ssl": true
  },
  "features": ["auth", "api", "webhooks"],
  "limits": {
    "maxRequests": 1000,
    "timeout": 30
  },
  "debug": false,
  "description": null
}`;

export default function JsonToYamlConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const yaml = jsonToYaml(parsed);
      setOutput(yaml.startsWith('\n') ? yaml.slice(1) : yaml);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  }, [input]);

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    try {
      const parsed = JSON.parse(SAMPLE_JSON);
      const yaml = jsonToYaml(parsed);
      setOutput(yaml.startsWith('\n') ? yaml.slice(1) : yaml);
      setError('');
    } catch { /* ignore */ }
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-to-yaml-converter">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{t.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{ "key": "value" }' style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="YAML output will appear here..." style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h2>
        {[1, 2, 3, 4, 5].map(n => (
          <details key={n} style={{ border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              {t[`faq${n}q` as keyof typeof t]}
            </summary>
            <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t[`faq${n}a` as keyof typeof t]}
            </div>
          </details>
        ))}
      </div>
    </ToolLayout>
  );
}
