'use client';

import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Path Finder',
    description: 'Paste JSON, click any node in the interactive tree to get its JSONPath. Copy paths like $.store.books[0].title instantly.',
    inputLabel: 'JSON Input',
    treeLabel: 'JSON Tree',
    placeholder: 'Paste your JSON here...',
    parseBtn: 'Parse JSON',
    clearBtn: 'Clear',
    sampleBtn: 'Load Sample',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    path: 'Path',
    value: 'Value',
    type: 'Type',
    searchPlaceholder: 'Search keys or values...',
    emptyState: 'Paste JSON and click Parse to explore the tree',
    invalidJson: 'Invalid JSON. Please check your input.',
    selectedNode: 'Selected Node',
    copyPath: 'Copy Path',
    noResults: 'No matching nodes found',
    introTitle: 'Free Online JSON Path Finder',
    introText: 'Explore JSON data with an interactive tree view. Click any node to instantly get its full JSONPath expression (e.g., $.store.books[0].title). Perfect for working with REST APIs, configuration files, and complex nested JSON structures. Search and filter nodes, copy paths with one click.',
    howTitle: 'How to Find JSON Paths',
    step1: 'Paste your JSON data into the input area',
    step2: 'Click Parse JSON to render the interactive tree',
    step3: 'Click any node in the tree to see its full JSONPath',
    step4: 'Use the search bar to filter nodes by key or value',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is JSONPath?',
    faq1a: 'JSONPath is a query language for JSON, similar to XPath for XML. It uses dot notation ($.store.name) and bracket notation ($.store.books[0]) to reference specific values within a JSON document. The $ symbol represents the root object.',
    faq2q: 'What is the difference between dot notation and bracket notation?',
    faq2a: 'Dot notation ($.store.name) is simpler and used for standard property names. Bracket notation ($["store"]["name"]) is required when keys contain special characters, spaces, or start with numbers.',
    faq3q: 'Can I use JSONPath with arrays?',
    faq3a: 'Yes. Array elements are accessed with bracket notation using zero-based indices, like $.books[0] for the first element, $.books[1] for the second, and so on.',
    faq4q: 'How deep can the JSON tree be?',
    faq4a: 'This tool supports deeply nested JSON structures. The tree view can handle hundreds of levels, though very deep nesting may impact rendering performance for extremely large documents.',
    faq5q: 'Is my JSON data safe?',
    faq5a: 'Yes. All processing happens entirely in your browser using JavaScript. No data is sent to any server. Your JSON remains completely private.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 路径查找器',
    description: '粘贴 JSON，点击交互式树中的任何节点获取其 JSONPath。',
    inputLabel: 'JSON 输入', treeLabel: 'JSON 树',
    placeholder: '在此粘贴 JSON...', parseBtn: '解析 JSON', clearBtn: '清除', sampleBtn: '加载示例',
    expandAll: '全部展开', collapseAll: '全部折叠',
    path: '路径', value: '值', type: '类型',
    searchPlaceholder: '搜索键或值...', emptyState: '粘贴 JSON 并点击解析以浏览树',
    invalidJson: '无效 JSON，请检查输入。', selectedNode: '选中节点', copyPath: '复制路径', noResults: '未找到匹配节点',
    introTitle: '免费在线 JSON 路径查找器',
    introText: '使用交互式树视图探索 JSON 数据。点击任意节点即可获取完整的 JSONPath 表达式。',
    howTitle: '如何查找 JSON 路径', step1: '粘贴 JSON 数据', step2: '点击解析渲染树', step3: '点击节点查看路径', step4: '使用搜索栏过滤',
    faqTitle: '常见问题',
    faq1q: '什么是 JSONPath？', faq1a: 'JSONPath 是 JSON 的查询语言，使用点表示法和方括号表示法引用 JSON 中的特定值。',
    faq2q: '点表示法和方括号表示法有什么区别？', faq2a: '点表示法更简单，方括号表示法用于包含特殊字符的键。',
    faq3q: '能在数组中使用吗？', faq3a: '可以。数组元素使用从零开始的索引访问，如 $.books[0]。',
    faq4q: 'JSON 树可以多深？', faq4a: '支持深度嵌套的 JSON 结构，可处理数百层。',
    faq5q: '数据安全吗？', faq5a: '安全。所有处理在浏览器中完成，数据不会发送到任何服务器。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Chercheur de Chemin JSON',
    description: 'Collez du JSON, cliquez sur n\'importe quel noeud pour obtenir son JSONPath.',
    inputLabel: 'JSON', treeLabel: 'Arbre JSON',
    placeholder: 'Collez votre JSON...', parseBtn: 'Analyser', clearBtn: 'Effacer', sampleBtn: 'Exemple',
    expandAll: 'Tout deployer', collapseAll: 'Tout replier',
    path: 'Chemin', value: 'Valeur', type: 'Type',
    searchPlaceholder: 'Rechercher...', emptyState: 'Collez du JSON et cliquez Analyser',
    invalidJson: 'JSON invalide.', selectedNode: 'Noeud selectionne', copyPath: 'Copier', noResults: 'Aucun resultat',
    introTitle: 'Chercheur JSON gratuit', introText: 'Explorez vos donnees JSON avec un arbre interactif.',
    howTitle: 'Comment utiliser', step1: 'Collez votre JSON', step2: 'Cliquez Analyser', step3: 'Cliquez sur un noeud', step4: 'Recherchez par cle ou valeur',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que JSONPath ?', faq1a: 'Un langage de requete pour JSON, similaire a XPath.',
    faq2q: 'Notation par point vs crochets ?', faq2a: 'Point pour les noms simples, crochets pour les cles speciales.',
    faq3q: 'Tableaux supportes ?', faq3a: 'Oui, avec des indices de base zero.',
    faq4q: 'Profondeur maximale ?', faq4a: 'Supporte des centaines de niveaux.',
    faq5q: 'Donnees securisees ?', faq5a: 'Oui, tout est traite dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON-Pfad-Finder',
    description: 'JSON einfuegen, Knoten anklicken und JSONPath erhalten.',
    inputLabel: 'JSON', treeLabel: 'JSON-Baum',
    placeholder: 'JSON einfuegen...', parseBtn: 'Parsen', clearBtn: 'Loeschen', sampleBtn: 'Beispiel',
    expandAll: 'Alle aufklappen', collapseAll: 'Alle zuklappen',
    path: 'Pfad', value: 'Wert', type: 'Typ',
    searchPlaceholder: 'Suchen...', emptyState: 'JSON einfuegen und Parsen klicken',
    invalidJson: 'Ungueltiges JSON.', selectedNode: 'Ausgewaehlter Knoten', copyPath: 'Kopieren', noResults: 'Keine Ergebnisse',
    introTitle: 'Kostenloser JSON-Pfad-Finder', introText: 'JSON-Daten mit interaktivem Baum erkunden.',
    howTitle: 'Anleitung', step1: 'JSON einfuegen', step2: 'Parsen klicken', step3: 'Knoten anklicken', step4: 'Nach Schluessel oder Wert suchen',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist JSONPath?', faq1a: 'Eine Abfragesprache fuer JSON, aehnlich wie XPath.',
    faq2q: 'Punkt- vs. Klammernotation?', faq2a: 'Punkt fuer einfache Namen, Klammern fuer Sonderzeichen.',
    faq3q: 'Arrays unterstuetzt?', faq3a: 'Ja, mit nullbasierten Indizes.',
    faq4q: 'Maximale Tiefe?', faq4a: 'Unterstuetzt hunderte Ebenen.',
    faq5q: 'Daten sicher?', faq5a: 'Ja, alles laeuft im Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Buscador de Rutas JSON',
    description: 'Pega JSON, haz clic en cualquier nodo para obtener su JSONPath.',
    inputLabel: 'JSON', treeLabel: 'Arbol JSON',
    placeholder: 'Pega tu JSON...', parseBtn: 'Analizar', clearBtn: 'Borrar', sampleBtn: 'Ejemplo',
    expandAll: 'Expandir todo', collapseAll: 'Colapsar todo',
    path: 'Ruta', value: 'Valor', type: 'Tipo',
    searchPlaceholder: 'Buscar...', emptyState: 'Pega JSON y haz clic en Analizar',
    invalidJson: 'JSON invalido.', selectedNode: 'Nodo seleccionado', copyPath: 'Copiar', noResults: 'Sin resultados',
    introTitle: 'Buscador de Rutas JSON gratuito', introText: 'Explora datos JSON con un arbol interactivo.',
    howTitle: 'Como usar', step1: 'Pega tu JSON', step2: 'Clic en Analizar', step3: 'Clic en un nodo', step4: 'Busca por clave o valor',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es JSONPath?', faq1a: 'Un lenguaje de consulta para JSON, similar a XPath.',
    faq2q: 'Notacion punto vs corchetes?', faq2a: 'Punto para nombres simples, corchetes para claves especiales.',
    faq3q: 'Soporta arrays?', faq3a: 'Si, con indices de base cero.',
    faq4q: 'Profundidad maxima?', faq4a: 'Soporta cientos de niveles.',
    faq5q: 'Datos seguros?', faq5a: 'Si, todo se procesa en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JSONパスファインダー',
    description: 'JSONを貼り付け、ツリーのノードをクリックしてJSONPathを取得。',
    inputLabel: 'JSON入力', treeLabel: 'JSONツリー',
    placeholder: 'JSONを貼り付け...', parseBtn: '解析', clearBtn: 'クリア', sampleBtn: 'サンプル',
    expandAll: '全展開', collapseAll: '全折畳',
    path: 'パス', value: '値', type: '型',
    searchPlaceholder: '検索...', emptyState: 'JSONを貼り付けて解析をクリック',
    invalidJson: '無効なJSONです。', selectedNode: '選択ノード', copyPath: 'コピー', noResults: '結果なし',
    introTitle: '無料JSONパスファインダー', introText: 'インタラクティブなツリーでJSONデータを探索します。',
    howTitle: '使い方', step1: 'JSONを貼り付け', step2: '解析をクリック', step3: 'ノードをクリック', step4: 'キーや値で検索',
    faqTitle: 'よくある質問',
    faq1q: 'JSONPathとは？', faq1a: 'JSONのクエリ言語で、XPathに似ています。',
    faq2q: 'ドット記法とブラケット記法？', faq2a: 'ドットは単純な名前に、ブラケットは特殊文字を含むキーに使用。',
    faq3q: '配列対応？', faq3a: 'はい。ゼロベースのインデックスで。',
    faq4q: '最大深度？', faq4a: '数百レベルに対応。',
    faq5q: 'データは安全？', faq5a: 'はい。すべてブラウザ内で処理されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON 경로 찾기',
    description: 'JSON을 붙여넣고 트리의 노드를 클릭하여 JSONPath를 가져옵니다.',
    inputLabel: 'JSON 입력', treeLabel: 'JSON 트리',
    placeholder: 'JSON 붙여넣기...', parseBtn: '파싱', clearBtn: '지우기', sampleBtn: '샘플',
    expandAll: '모두 펼치기', collapseAll: '모두 접기',
    path: '경로', value: '값', type: '타입',
    searchPlaceholder: '검색...', emptyState: 'JSON을 붙여넣고 파싱을 클릭하세요',
    invalidJson: '잘못된 JSON입니다.', selectedNode: '선택된 노드', copyPath: '복사', noResults: '결과 없음',
    introTitle: '무료 JSON 경로 찾기', introText: '인터랙티브 트리로 JSON 데이터를 탐색합니다.',
    howTitle: '사용 방법', step1: 'JSON 붙여넣기', step2: '파싱 클릭', step3: '노드 클릭', step4: '키나 값으로 검색',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSONPath란?', faq1a: 'JSON용 쿼리 언어로, XPath와 유사합니다.',
    faq2q: '점 표기법 vs 괄호 표기법?', faq2a: '점은 간단한 이름에, 괄호는 특수 문자가 있는 키에 사용.',
    faq3q: '배열 지원?', faq3a: '네. 0 기반 인덱스로 접근합니다.',
    faq4q: '최대 깊이?', faq4a: '수백 레벨을 지원합니다.',
    faq5q: '데이터 안전?', faq5a: '네. 모든 처리가 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
};

const SAMPLE_JSON = `{
  "store": {
    "name": "My Bookstore",
    "books": [
      {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 12.99,
        "inStock": true,
        "tags": ["fiction", "classic"]
      },
      {
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "price": 34.50,
        "inStock": false,
        "tags": ["programming", "best-practices"]
      }
    ],
    "location": {
      "city": "New York",
      "zipCode": "10001"
    }
  }
}`;

interface SelectedInfo {
  path: string;
  value: string;
  type: string;
}

function getType(val: unknown): string {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}

function stringifyValue(val: unknown): string {
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'object') {
    if (Array.isArray(val)) return `Array(${val.length})`;
    return `Object(${Object.keys(val as object).length} keys)`;
  }
  return String(val);
}

function TreeNode({
  keyName,
  value,
  path,
  depth,
  selectedPath,
  onSelect,
  search,
  expandedSet,
  onToggle,
}: {
  keyName: string | number;
  value: unknown;
  path: string;
  depth: number;
  selectedPath: string;
  onSelect: (info: SelectedInfo) => void;
  search: string;
  expandedSet: Set<string>;
  onToggle: (path: string) => void;
}) {
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isExpanded = expandedSet.has(path);
  const type = getType(value);
  const keyStr = String(keyName);
  const valStr = stringifyValue(value);

  // Search filter
  const lowerSearch = search.toLowerCase();
  const matchesSearch = !search || keyStr.toLowerCase().includes(lowerSearch) || valStr.toLowerCase().includes(lowerSearch);

  const isSelected = selectedPath === path;
  const hasChildren = isObject && Object.keys(value as object).length > 0;

  const handleClick = () => {
    onSelect({ path, value: valStr, type });
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(path);
  };

  // Color based on type
  const valueColor = type === 'string' ? '#22c55e' : type === 'number' ? '#3b82f6' : type === 'boolean' ? '#f59e0b' : type === 'null' ? '#94a3b8' : 'var(--text-primary)';

  if (!matchesSearch && !isObject) return null;

  return (
    <div style={{ marginLeft: depth > 0 ? 16 : 0 }}>
      <div
        onClick={handleClick}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '3px 8px',
          borderRadius: 4, cursor: 'pointer', fontSize: 13, fontFamily: 'monospace',
          background: isSelected ? 'var(--accent-blue)' : 'transparent',
          color: isSelected ? '#fff' : 'var(--text-primary)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--bg-input)'; }}
        onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
      >
        {hasChildren && (
          <span onClick={handleToggle} style={{ cursor: 'pointer', width: 14, textAlign: 'center', fontSize: 10, userSelect: 'none', flexShrink: 0 }}>
            {isExpanded ? '\u25BC' : '\u25B6'}
          </span>
        )}
        {!hasChildren && <span style={{ width: 14, flexShrink: 0 }} />}
        <span style={{ fontWeight: 600, color: isSelected ? '#fff' : '#e879f9' }}>{keyStr}</span>
        <span style={{ color: isSelected ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)' }}>:</span>
        {isObject ? (
          <span style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', fontSize: 12 }}>
            {isArray ? `[${(value as unknown[]).length}]` : `{${Object.keys(value as object).length}}`}
          </span>
        ) : (
          <span style={{ color: isSelected ? '#fff' : valueColor }}>{valStr}</span>
        )}
      </div>
      {isExpanded && hasChildren && (
        <div>
          {(isArray ? (value as unknown[]) : Object.entries(value as object)).map((item, i) => {
            if (isArray) {
              const childPath = `${path}[${i}]`;
              return (
                <TreeNode key={childPath} keyName={i} value={item} path={childPath}
                  depth={depth + 1} selectedPath={selectedPath} onSelect={onSelect}
                  search={search} expandedSet={expandedSet} onToggle={onToggle} />
              );
            } else {
              const [k, v] = item as [string, unknown];
              const childPath = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? `${path}.${k}` : `${path}["${k}"]`;
              return (
                <TreeNode key={childPath} keyName={k} value={v} path={childPath}
                  depth={depth + 1} selectedPath={selectedPath} onSelect={onSelect}
                  search={search} expandedSet={expandedSet} onToggle={onToggle} />
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

function getAllPaths(obj: unknown, prefix: string): string[] {
  const paths: string[] = [prefix];
  if (obj !== null && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      obj.forEach((_, i) => {
        paths.push(...getAllPaths(obj[i], `${prefix}[${i}]`));
      });
    } else {
      Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => {
        const childPath = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? `${prefix}.${k}` : `${prefix}["${k}"]`;
        paths.push(...getAllPaths(v, childPath));
      });
    }
  }
  return paths;
}

export default function JsonPathFinder() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<unknown>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<SelectedInfo | null>(null);
  const [search, setSearch] = useState('');
  const [expandedSet, setExpandedSet] = useState<Set<string>>(new Set(['$']));

  const handleParse = useCallback(() => {
    setError('');
    setSelected(null);
    try {
      const obj = JSON.parse(input);
      setParsed(obj);
      // Auto-expand first 2 levels
      const paths = getAllPaths(obj, '$');
      const autoExpand = new Set(paths.filter(p => (p.match(/[.[\]]/g) || []).length <= 4));
      setExpandedSet(autoExpand);
    } catch {
      setError(t.invalidJson);
      setParsed(null);
    }
  }, [input, t.invalidJson]);

  const handleClear = () => { setInput(''); setParsed(null); setError(''); setSelected(null); setSearch(''); };
  const handleSample = () => { setInput(SAMPLE_JSON); };

  const handleToggle = useCallback((path: string) => {
    setExpandedSet(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    if (parsed) {
      const paths = getAllPaths(parsed, '$');
      setExpandedSet(new Set(paths));
    }
  }, [parsed]);

  const collapseAll = useCallback(() => {
    setExpandedSet(new Set(['$']));
  }, []);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  }), [t]);

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-path-finder">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleParse} className="btn btn-primary">{t.parseBtn}</button>
        <button onClick={handleSample} className="btn btn-secondary">{t.sampleBtn}</button>
        <button onClick={handleClear} className="btn btn-secondary">{t.clearBtn}</button>
        {parsed !== null && (
          <>
            <button onClick={expandAll} className="btn btn-secondary">{t.expandAll}</button>
            <button onClick={collapseAll} className="btn btn-secondary">{t.collapseAll}</button>
          </>
        )}
      </div>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {/* Left: JSON input */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 400, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.5 }}
          />
        </div>

        {/* Right: Tree view */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>{t.treeLabel}</label>
          </div>
          {parsed !== null && (
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{ width: '100%', marginBottom: 8, fontSize: 12, padding: '6px 10px' }}
            />
          )}
          <div style={{
            minHeight: 400, maxHeight: 500, overflowY: 'auto',
            background: 'var(--bg-input)', borderRadius: 8, padding: '12px 8px',
            border: '1px solid var(--border-color)',
          }}>
            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 6, background: '#fee2e2', color: '#dc2626', fontSize: 13 }}>{error}</div>
            )}
            {parsed ? (
              Array.isArray(parsed) ? (
                (parsed as unknown[]).map((item, i) => (
                  <TreeNode key={i} keyName={i} value={item} path={`$[${i}]`}
                    depth={0} selectedPath={selected?.path || ''} onSelect={setSelected}
                    search={search} expandedSet={expandedSet} onToggle={handleToggle} />
                ))
              ) : typeof parsed === 'object' ? (
                Object.entries(parsed as Record<string, unknown>).map(([k, v]) => {
                  const childPath = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? `$.${k}` : `$["${k}"]`;
                  return (
                    <TreeNode key={k} keyName={k} value={v} path={childPath}
                      depth={0} selectedPath={selected?.path || ''} onSelect={setSelected}
                      search={search} expandedSet={expandedSet} onToggle={handleToggle} />
                  );
                })
              ) : (
                <div style={{ padding: 8, fontFamily: 'monospace', fontSize: 13 }}>{String(parsed)}</div>
              )
            ) : (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 14 }}>{t.emptyState}</div>
            )}
          </div>
        </div>
      </div>

      {/* Selected node info */}
      {selected && (
        <div style={{
          marginTop: 16, padding: '14px 18px', borderRadius: 8,
          background: 'var(--bg-input)', border: '1px solid var(--accent-blue)',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: 'var(--accent-blue)' }}>{t.selectedNode}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: t.path, value: selected.path },
              { label: t.value, value: selected.value },
              { label: t.type, value: selected.type },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginRight: 8 }}>{row.label}:</span>
                  <code style={{ fontSize: 13, wordBreak: 'break-all' }}>{row.value}</code>
                </div>
                <CopyButton text={row.value} />
              </div>
            ))}
          </div>
        </div>
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
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-viewer`, label: 'JSON Viewer / Tree' },
            { href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
          ].map(link => (
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
