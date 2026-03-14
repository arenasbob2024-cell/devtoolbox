'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const sampleYaml = `# Application Configuration
app:
  name: MyApp
  version: 1.2.3
  debug: true

server:
  host: localhost
  port: 8080
  timeouts:
    read: 30
    write: 60

database:
  connections:
    - name: primary
      host: db.example.com
      port: 5432
    - name: replica
      host: replica.example.com
      port: 5432

features:
  - auth
  - logging
  - caching
`;

interface ParsedYaml {
  [key: string]: unknown;
}

const parseYaml = (input: string): ParsedYaml | null => {
  try {
    const lines = input.split('\n');
    const result: ParsedYaml = {};
    const stack: Array<{ obj: unknown; key: string; indent: number }> = [{ obj: result, key: '', indent: -1 }];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const indent = line.search(/\S/);
      const content = line.trim();

      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop();
      }

      const parent = stack[stack.length - 1];

      if (content.startsWith('- ')) {
        const value = content.slice(2).trim();
        if (!Array.isArray(parent.obj[parent.key])) {
          parent.obj[parent.key] = [];
        }
        (parent.obj[parent.key] as unknown[]).push(parseValue(value));
      } else if (content.includes(':')) {
        const colonIndex = content.indexOf(':');
        const key = content.slice(0, colonIndex).trim();
        const valueStr = content.slice(colonIndex + 1).trim();

        if (!valueStr || valueStr === '{' || valueStr === '[') {
          const newObj: ParsedYaml = {};
          parent.obj[key] = newObj;
          stack.push({ obj: newObj, key, indent });
        } else {
          parent.obj[key] = parseValue(valueStr);
        }
      }
    }

    return result;
  } catch {
    return null;
  }
};

const parseValue = (value: string): unknown => {
  if (!value) return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null' || value === '~') return null;
  if (!isNaN(Number(value)) && value.length > 0) return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((v) => parseValue(v.trim()));
  }
  return value;
};

const tomlStringify = (obj: ParsedYaml, prefix = ''): string => {
  let result = '';
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    const value = obj[key];

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      if (Object.keys(value as ParsedYaml).length > 0) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        result += `\n[${fullKey}]\n`;
        result += tomlStringify(value as ParsedYaml, fullKey);
      }
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        for (const item of value) {
          result += `\n[[${fullKey}]]\n`;
          result += tomlStringify(item as ParsedYaml, fullKey);
        }
      } else {
        const valueStr = `[${value.map((v) => formatTomlValue(v)).join(', ')}]`;
        result += `${key} = ${valueStr}\n`;
      }
    } else {
      result += `${key} = ${formatTomlValue(value)}\n`;
    }
  }

  return result;
};

const formatTomlValue = (value: unknown): string => {
  if (value === true) return 'true';
  if (value === false) return 'false';
  if (value === null) return '""';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;
  if (Array.isArray(value)) {
    return `[${value.map((v) => formatTomlValue(v)).join(', ')}]`;
  }
  return '""';
};

interface ParsedToml {
  [key: string]: unknown;
}

const parseToml = (input: string): ParsedToml | null => {
  try {
    const result: ParsedToml = {};
    const stack: string[] = [];
    let arrayStacks: string[] = [];

    const lines = input.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (trimmed.startsWith('[[') && trimmed.endsWith(']]')) {
        const arrayKey = trimmed.slice(2, -2).trim();
        arrayStacks.push(arrayKey);
      } else if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        const section = trimmed.slice(1, -1).trim();
        stack.push(section);
        arrayStacks = [];
      } else if (trimmed.includes('=')) {
        const eqIdx = trimmed.indexOf('=');
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        const parsedValue = parseTomlValue(value);

        let target: ParsedToml = result;
        for (const part of stack) {
          if (!target[part]) target[part] = {};
          target = target[part] as ParsedToml;
        }
        target[key] = parsedValue;
      }
    }

    return result;
  } catch {
    return null;
  }
};

const parseTomlValue = (value: string): unknown => {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (!isNaN(Number(trimmed)) && trimmed.length > 0) return Number(trimmed);
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((v) => parseTomlValue(v.trim()));
  }
  return trimmed;
};

const tomlToYaml = (obj: ParsedToml, indent = 0): string => {
  let result = '';
  const spaces = ' '.repeat(indent);

  for (const key of Object.keys(obj).sort()) {
    const value = obj[key];

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'boolean') {
      result += `${spaces}${key}: ${value ? 'true' : 'false'}\n`;
    } else if (typeof value === 'number') {
      result += `${spaces}${key}: ${value}\n`;
    } else if (typeof value === 'string') {
      result += `${spaces}${key}: ${value}\n`;
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        result += `${spaces}${key}:\n`;
        for (const item of value) {
          result += `${spaces}  - `;
          const itemYaml = tomlToYaml(item as ParsedToml, indent + 4);
          result += itemYaml.trim().replace(/\n/g, `\n${spaces}    `) + '\n';
        }
      } else {
        result += `${spaces}${key}: [${value.map((v) => (typeof v === 'string' ? `"${v}"` : v)).join(', ')}]\n`;
      }
    } else if (typeof value === 'object') {
      result += `${spaces}${key}:\n`;
      result += tomlToYaml(value as ParsedToml, indent + 2);
    }
  }

  return result;
};

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML to TOML Converter',
    description: 'Convert YAML to TOML and vice versa online. Free, instant conversion with no server required.',
    inputLabel: 'Input',
    outputLabel: 'Output',
    inputPlaceholder: 'Paste your YAML or TOML here...',
    outputPlaceholder: 'Output will appear here...',
    convert: 'Convert',
    clear: 'Clear',
    loadSample: 'Load Sample',
    copyLabel: 'Copy Output',
    switchMode: 'Switch to TOML → YAML',
    valid: 'Conversion successful',
    error: 'Parse Error',
    introTitle: 'Free Online YAML ↔ TOML Converter',
    introText: 'Convert between YAML and TOML formats instantly in your browser. This bidirectional converter handles all standard YAML and TOML syntax including nested objects, arrays, key-value pairs, comments, and all data types. Perfect for converting configuration files between Kubernetes manifests, Rust Cargo.toml, Docker Compose, and other configuration systems.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is TOML?',
    faq1a: 'TOML (Tom\'s Obvious, Minimal Language) is a configuration file format designed to be minimal and easy to read. It is commonly used in Rust (Cargo.toml), Python, and other projects. Unlike YAML, TOML uses explicit syntax with [sections] and key = value pairs, making it less ambiguous.',
    faq2q: 'What is YAML?',
    faq2a: 'YAML (YAML Ain\'t Markup Language) is a human-friendly data serialization format widely used for configuration in Kubernetes, Docker Compose, Ansible, CI/CD pipelines, and many other tools. It uses indentation-based syntax and is designed to be readable.',
    faq3q: 'When should I use YAML vs TOML?',
    faq3a: 'Use YAML for hierarchical configuration with deep nesting (Kubernetes, Docker Compose). Use TOML for simpler, flatter configurations (Cargo.toml, Python setup.cfg). TOML is stricter and less error-prone, while YAML is more flexible and expressive.',
    faq4q: 'What happens to comments during conversion?',
    faq4a: 'Comments in YAML (lines starting with #) are not preserved during conversion since the output format may not support them in the same way. The actual data values are preserved exactly.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'YAML 转 TOML 转换器',
    description: '在线将 YAML 转换为 TOML，反之亦然。免费、即时转换，无需服务器。',
    inputLabel: '输入',
    outputLabel: '输出',
    inputPlaceholder: '粘贴你的 YAML 或 TOML...',
    outputPlaceholder: '输出将显示在此...',
    convert: '转换',
    clear: '清除',
    loadSample: '加载示例',
    copyLabel: '复制输出',
    switchMode: '切换到 TOML → YAML',
    valid: '转换成功',
    error: '解析错误',
    introTitle: '免费在线 YAML ↔ TOML 转换工具',
    introText: '在浏览器中即时转换 YAML 和 TOML 格式。这个双向转换器处理所有标准 YAML 和 TOML 语法，包括嵌套对象、数组、键值对、注释和所有数据类型。非常适合在 Kubernetes 清单、Rust Cargo.toml、Docker Compose 和其他配置系统之间转换配置文件。',
    faqTitle: '常见问题',
    faq1q: '什么是 TOML？',
    faq1a: 'TOML（Tom\'s Obvious, Minimal Language）是一种配置文件格式，设计目标是最小化和易读。它常用于 Rust（Cargo.toml）、Python 和其他项目。与 YAML 不同，TOML 使用显式语法，包含 [sections] 和 key = value 对，更不易出错。',
    faq2q: '什么是 YAML？',
    faq2a: 'YAML（YAML Ain\'t Markup Language）是一种人类友好的数据序列化格式，广泛用于 Kubernetes、Docker Compose、Ansible、CI/CD 管道等工具的配置中。它使用基于缩进的语法，设计目标是易读。',
    faq3q: '何时应该使用 YAML 而不是 TOML？',
    faq3a: '对于深层嵌套的分层配置（Kubernetes、Docker Compose），使用 YAML。对于更简单、更扁平的配置（Cargo.toml、Python setup.cfg），使用 TOML。TOML 更严格，不易出错，而 YAML 更灵活和表达性强。',
    faq4q: '转换过程中注释会发生什么？',
    faq4a: '由于输出格式可能不以相同方式支持注释，YAML 中的注释（以 # 开头的行）不会被保留。实际数据值将被完全保留。',
    relatedTitle: '相关工具',
  },
  es: {
    title: 'Convertidor de YAML a TOML',
    description: 'Convierte YAML a TOML y viceversa en línea. Conversión gratuita e instantánea sin servidor.',
    inputLabel: 'Entrada',
    outputLabel: 'Salida',
    inputPlaceholder: 'Pega tu YAML o TOML aquí...',
    outputPlaceholder: 'La salida aparecerá aquí...',
    convert: 'Convertir',
    clear: 'Limpiar',
    loadSample: 'Cargar Ejemplo',
    copyLabel: 'Copiar Salida',
    switchMode: 'Cambiar a TOML → YAML',
    valid: 'Conversión exitosa',
    error: 'Error de Análisis',
    introTitle: 'Convertidor Gratuito de YAML ↔ TOML en Línea',
    introText: 'Convierte entre formatos YAML y TOML instantáneamente en tu navegador. Este convertidor bidireccional maneja toda la sintaxis estándar de YAML y TOML, incluyendo objetos anidados, matrices, pares clave-valor, comentarios y todos los tipos de datos.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: '¿Qué es TOML?',
    faq1a: 'TOML (Tom\'s Obvious, Minimal Language) es un formato de archivo de configuración diseñado para ser mínimo y fácil de leer. Se usa comúnmente en Rust (Cargo.toml), Python y otros proyectos.',
    faq2q: '¿Qué es YAML?',
    faq2a: 'YAML (YAML Ain\'t Markup Language) es un formato de serialización de datos amigable con los humanos ampliamente utilizado para configuración en Kubernetes, Docker Compose, Ansible y muchas otras herramientas.',
    faq3q: '¿Cuándo debo usar YAML en lugar de TOML?',
    faq3a: 'Usa YAML para configuración jerárquica con anidamiento profundo. Usa TOML para configuraciones más simples y planas. TOML es más estricto, mientras que YAML es más flexible.',
    faq4q: '¿Qué sucede con los comentarios durante la conversión?',
    faq4a: 'Los comentarios en YAML no se conservan durante la conversión ya que el formato de salida puede no soportarlos de la misma manera. Los valores de datos reales se conservan exactamente.',
    relatedTitle: 'Herramientas Relacionadas',
  },
  fr: {
    title: 'Convertisseur YAML vers TOML',
    description: 'Convertissez YAML en TOML et vice versa en ligne. Conversion gratuite et instantanée sans serveur.',
    inputLabel: 'Entrée',
    outputLabel: 'Sortie',
    inputPlaceholder: 'Collez votre YAML ou TOML ici...',
    outputPlaceholder: 'La sortie apparaîtra ici...',
    convert: 'Convertir',
    clear: 'Effacer',
    loadSample: 'Charger un Exemple',
    copyLabel: 'Copier la Sortie',
    switchMode: 'Basculer vers TOML → YAML',
    valid: 'Conversion réussie',
    error: 'Erreur d\'analyse',
    introTitle: 'Convertisseur Gratuit YAML ↔ TOML en Ligne',
    introText: 'Convertissez instantanément entre les formats YAML et TOML dans votre navigateur. Ce convertisseur bidirectionnel gère toute la syntaxe standard YAML et TOML, y compris les objets imbriqués, les tableaux, les paires clé-valeur, les commentaires et tous les types de données.',
    faqTitle: 'Questions Fréquemment Posées',
    faq1q: 'Qu\'est-ce que TOML ?',
    faq1a: 'TOML (Tom\'s Obvious, Minimal Language) est un format de fichier de configuration conçu pour être minimal et facile à lire. Il est couramment utilisé en Rust (Cargo.toml), Python et autres projets.',
    faq2q: 'Qu\'est-ce que YAML ?',
    faq2a: 'YAML (YAML Ain\'t Markup Language) est un format de sérialisation de données convivial largement utilisé pour la configuration dans Kubernetes, Docker Compose, Ansible et de nombreux autres outils.',
    faq3q: 'Quand dois-je utiliser YAML plutôt que TOML ?',
    faq3a: 'Utilisez YAML pour la configuration hiérarchique avec imbrication profonde. Utilisez TOML pour les configurations plus simples et plus plates. TOML est plus strict, tandis que YAML est plus flexible.',
    faq4q: 'Que deviennent les commentaires lors de la conversion ?',
    faq4a: 'Les commentaires YAML ne sont pas conservés lors de la conversion car le format de sortie peut ne pas les supporter de la même manière. Les valeurs de données réelles sont conservées exactement.',
    relatedTitle: 'Outils Connexes',
  },
  de: {
    title: 'YAML zu TOML Konverter',
    description: 'Konvertieren Sie YAML zu TOML und umgekehrt online. Kostenlose und sofortige Konvertierung ohne Server.',
    inputLabel: 'Eingabe',
    outputLabel: 'Ausgabe',
    inputPlaceholder: 'Geben Sie Ihr YAML oder TOML hier ein...',
    outputPlaceholder: 'Die Ausgabe wird hier angezeigt...',
    convert: 'Konvertieren',
    clear: 'Löschen',
    loadSample: 'Beispiel Laden',
    copyLabel: 'Ausgabe Kopieren',
    switchMode: 'Zu TOML → YAML Wechseln',
    valid: 'Konvertierung erfolgreich',
    error: 'Analysefehler',
    introTitle: 'Kostenloser Online YAML ↔ TOML Konverter',
    introText: 'Konvertieren Sie sofort zwischen YAML- und TOML-Formaten in Ihrem Browser. Dieser bidirektionale Konverter handhabt alle Standard-YAML- und TOML-Syntax, einschließlich verschachtelter Objekte, Arrays, Schlüssel-Wert-Paare, Kommentare und alle Datentypen.',
    faqTitle: 'Häufig Gestellte Fragen',
    faq1q: 'Was ist TOML?',
    faq1a: 'TOML (Tom\'s Obvious, Minimal Language) ist ein Konfigurationsdateiformat, das minimal und leicht zu lesen sein soll. Es wird häufig in Rust (Cargo.toml), Python und anderen Projekten verwendet.',
    faq2q: 'Was ist YAML?',
    faq2a: 'YAML (YAML Ain\'t Markup Language) ist ein benutzerfreundliches Datenserialisierungsformat, das häufig für die Konfiguration in Kubernetes, Docker Compose, Ansible und vielen anderen Tools verwendet wird.',
    faq3q: 'Wann sollte ich YAML statt TOML verwenden?',
    faq3a: 'Verwenden Sie YAML für hierarchische Konfiguration mit tiefem Verschachtelungsgrad. Verwenden Sie TOML für einfachere, flachere Konfigurationen. TOML ist strenger, während YAML flexibler ist.',
    faq4q: 'Was passiert mit Kommentaren während der Konvertierung?',
    faq4a: 'YAML-Kommentare werden während der Konvertierung nicht beibehalten, da das Ausgabeformat diese möglicherweise nicht auf die gleiche Weise unterstützt. Die tatsächlichen Datenwerte bleiben exakt erhalten.',
    relatedTitle: 'Verwandte Tools',
  },
};

export default function YamlToTomlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isYamlToToml, setIsYamlToToml] = useState(true);
  const { dict } = useLang();
  const t = dict.tools['yaml-to-toml'] as Record<string, unknown>;
  const common = dict.common as Record<string, unknown>;
  const i18nText = ui[(dict.common.langCode as string) || 'en'] || ui.en;

  const handleConvert = () => {
    setError('');
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      if (isYamlToToml) {
        const parsed = parseYaml(input);
        if (!parsed) {
          setError(i18nText.error);
          setOutput('');
          return;
        }
        const result = tomlStringify(parsed).trim();
        setOutput(result);
      } else {
        const parsed = parseToml(input);
        if (!parsed) {
          setError(i18nText.error);
          setOutput('');
          return;
        }
        const result = tomlToYaml(parsed).trim();
        setOutput(result);
      }
    } catch (err) {
      setError(i18nText.error);
      setOutput('');
    }
  };

  const handleLoadSample = () => {
    setInput(sampleYaml);
    setError('');
    setOutput('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleSwitchMode = () => {
    setIsYamlToToml(!isYamlToToml);
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout toolId="yaml-to-toml" title={t.pageTitle as string} description={t.pageDescription as string}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handleConvert} className="btn btn-primary">
              {i18nText.convert}
            </button>
            <button onClick={handleLoadSample} className="btn btn-secondary">
              {i18nText.loadSample}
            </button>
            <button onClick={handleClear} className="btn btn-secondary">
              {i18nText.clear}
            </button>
            <button onClick={handleSwitchMode} className="btn btn-secondary">
              {i18nText.switchMode}
            </button>
          </div>
          {!error && output && (
            <span style={{ color: 'var(--color-success, #22c55e)', fontSize: '14px' }}>
              ✓ {i18nText.valid}
            </span>
          )}
          {error && <span style={{ color: 'var(--color-error, #ef4444)', fontSize: '14px' }}>✗ {error}</span>}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              {i18nText.inputLabel}
              {isYamlToToml ? ' (YAML)' : ' (TOML)'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={i18nText.inputPlaceholder}
              style={{
                width: '100%',
                height: '400px',
                padding: '12px',
                border: '1px solid var(--color-border, #e5e7eb)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: '1.5',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              {i18nText.outputLabel}
              {isYamlToToml ? ' (TOML)' : ' (YAML)'}
            </label>
            <textarea
              value={output}
              readOnly
              placeholder={i18nText.outputPlaceholder}
              style={{
                width: '100%',
                height: '400px',
                padding: '12px',
                border: '1px solid var(--color-border, #e5e7eb)',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '13px',
                lineHeight: '1.5',
                backgroundColor: 'var(--color-bg-secondary, #f9fafb)',
              }}
            />
          </div>
        </div>

        {output && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CopyButton text={output} label={i18nText.copyLabel} />
          </div>
        )}
      </div>

      <section style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--color-border, #e5e7eb)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{i18nText.introTitle}</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>{i18nText.introText}</p>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>{i18nText.faqTitle}</h2>
        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{i18nText.faq1q}</h3>
            <p style={{ lineHeight: '1.6' }}>{i18nText.faq1a}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{i18nText.faq2q}</h3>
            <p style={{ lineHeight: '1.6' }}>{i18nText.faq2a}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{i18nText.faq3q}</h3>
            <p style={{ lineHeight: '1.6' }}>{i18nText.faq3a}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{i18nText.faq4q}</h3>
            <p style={{ lineHeight: '1.6' }}>{i18nText.faq4a}</p>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
