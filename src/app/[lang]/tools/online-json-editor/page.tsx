'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

interface JsonNode {
  key: string;
  value: unknown;
  type: string;
  path: string;
  expanded: boolean;
  children?: JsonNode[];
}

function buildTree(data: unknown, path: string = '$', key: string = 'root'): JsonNode {
  const type = Array.isArray(data) ? 'array' : typeof data === 'object' && data !== null ? 'object' : typeof data;
  const node: JsonNode = { key, value: data, type, path, expanded: true };
  if (type === 'object' && data !== null) {
    node.children = Object.entries(data as Record<string, unknown>).map(([k, v]) => buildTree(v, `${path}.${k}`, k));
  } else if (type === 'array') {
    node.children = (data as unknown[]).map((v, i) => buildTree(v, `${path}[${i}]`, `[${i}]`));
  }
  return node;
}

function TreeNodeView({ node, depth, onToggle }: { node: JsonNode; depth: number; onToggle: (path: string) => void }) {
  const indent = depth * 20;
  const isExpandable = node.type === 'object' || node.type === 'array';
  const childCount = node.children?.length ?? 0;
  const typeColor = node.type === 'string' ? '#22c55e' : node.type === 'number' ? '#3b82f6' : node.type === 'boolean' ? '#f59e0b' : node.type === 'object' ? '#a855f7' : node.type === 'array' ? '#ec4899' : '#6b7280';

  return (
    <div>
      <div style={{ paddingLeft: indent, padding: '3px 8px 3px ' + indent + 'px', fontSize: 13, fontFamily: 'monospace', cursor: isExpandable ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 6, borderRadius: 4 }}
        onClick={() => isExpandable && onToggle(node.path)}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-input)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
        {isExpandable && <span style={{ fontSize: 10, color: 'var(--text-secondary)', width: 12, textAlign: 'center' }}>{node.expanded ? '\u25BC' : '\u25B6'}</span>}
        {!isExpandable && <span style={{ width: 12 }} />}
        <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{node.key}</span>
        <span style={{ color: 'var(--text-secondary)' }}>:</span>
        {isExpandable ? (
          <span style={{ color: typeColor, fontSize: 11 }}>{node.type === 'array' ? `Array(${childCount})` : `Object{${childCount}}`}</span>
        ) : (
          <span style={{ color: typeColor }}>{node.type === 'string' ? `"${String(node.value)}"` : String(node.value)}</span>
        )}
      </div>
      {isExpandable && node.expanded && node.children?.map((child, i) => (
        <TreeNodeView key={i} node={child} depth={depth + 1} onToggle={onToggle} />
      ))}
    </div>
  );
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Online JSON Editor',
    description: 'Edit JSON data with a tree view editor or raw text editor. Format, validate, and manipulate JSON online for free.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste or type your JSON here...',
    treeView: 'Tree View',
    rawEditor: 'Raw Editor',
    format: 'Format',
    minify: 'Minify',
    clear: 'Clear',
    loadSample: 'Load Sample',
    valid: 'Valid JSON',
    invalid: 'Invalid JSON',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    noData: 'Enter or paste JSON to see the tree view',
    introTitle: 'Free Online JSON Editor',
    introText: 'This online JSON editor lets you view and edit JSON data in two modes: a visual tree view that displays JSON structure as collapsible nodes, and a raw text editor for direct editing. The tree view makes it easy to understand complex nested JSON structures, while the raw editor is perfect for quick edits. Both modes validate your JSON in real time and support formatting with customizable indentation.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a JSON editor?',
    faq1a: 'A JSON editor is a tool designed for viewing and editing JSON (JavaScript Object Notation) data. Unlike a plain text editor, a JSON editor understands JSON structure, provides syntax highlighting, validates your JSON in real-time, and can display data as a navigable tree. This makes it much easier to work with complex nested JSON objects and arrays.',
    faq2q: 'What is the difference between tree view and raw editor?',
    faq2a: 'Tree view displays JSON as an interactive hierarchy of collapsible nodes, making it easy to navigate large JSON structures and understand nesting. Raw editor mode shows the JSON as formatted text, which is better for quick edits, copy-paste operations, and making bulk changes. This tool supports both modes so you can switch between them.',
    faq3q: 'Can I edit JSON directly in the tree view?',
    faq3a: 'The tree view in this editor is read-only for navigation and visualization. To edit values, use the raw editor mode where you can modify the JSON text directly. Changes are validated in real-time and the tree view updates automatically when you switch back.',
    faq4q: 'How do I validate JSON online?',
    faq4a: 'Simply paste your JSON into the editor. The tool automatically validates JSON syntax and shows a green "Valid JSON" indicator when the syntax is correct, or a red error message pinpointing the exact location of any syntax errors. Common errors include trailing commas, single quotes instead of double quotes, and unquoted keys.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '在线 JSON 编辑器',
    description: '使用树形视图编辑器或原始文本编辑器编辑 JSON 数据。免费在线格式化、验证和操作 JSON。',
    inputLabel: 'JSON 输入',
    inputPlaceholder: '在此粘贴或输入 JSON...',
    treeView: '树形视图',
    rawEditor: '原始编辑器',
    format: '格式化',
    minify: '压缩',
    clear: '清除',
    loadSample: '加载示例',
    valid: 'JSON 有效',
    invalid: 'JSON 无效',
    expandAll: '展开全部',
    collapseAll: '折叠全部',
    indent: '缩进',
    spaces: '空格',
    tab: '制表符',
    noData: '输入或粘贴 JSON 以查看树形视图',
    introTitle: '免费在线 JSON 编辑器',
    introText: '这个在线 JSON 编辑器支持两种模式：可视化树形视图显示 JSON 结构，以及原始文本编辑器用于直接编辑。两种模式都支持实时验证和可自定义缩进的格式化。',
    faqTitle: '常见问题',
    faq1q: '什么是 JSON 编辑器？',
    faq1a: 'JSON 编辑器是专为查看和编辑 JSON 数据设计的工具。它理解 JSON 结构，提供语法高亮，实时验证并可以树形方式显示数据。',
    faq2q: '树形视图和原始编辑器有什么区别？',
    faq2a: '树形视图将 JSON 显示为可折叠的节点层次结构，方便导航大型 JSON。原始编辑器显示格式化文本，适合快速编辑。',
    faq3q: '可以在树形视图中直接编辑 JSON 吗？',
    faq3a: '树形视图为只读模式，用于导航和可视化。要编辑值，请使用原始编辑器模式直接修改文本。',
    faq4q: '如何在线验证 JSON？',
    faq4a: '只需将 JSON 粘贴到编辑器中。工具会自动验证语法并显示有效或错误状态。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Editeur JSON en Ligne',
    description: 'Modifiez les donnees JSON avec un editeur en vue arborescente ou en texte brut. Formatez et validez le JSON gratuitement.',
    inputLabel: 'Entree JSON', inputPlaceholder: 'Collez ou tapez votre JSON ici...',
    treeView: 'Vue arborescente', rawEditor: 'Editeur brut', format: 'Formater', minify: 'Minifier', clear: 'Effacer',
    loadSample: 'Charger un exemple', valid: 'JSON valide', invalid: 'JSON invalide',
    expandAll: 'Tout developper', collapseAll: 'Tout replier', indent: 'Indentation', spaces: 'espaces', tab: 'Tab',
    noData: 'Entrez du JSON pour voir la vue arborescente',
    introTitle: 'Editeur JSON en ligne gratuit', introText: 'Cet editeur JSON en ligne propose deux modes : une vue arborescente visuelle et un editeur de texte brut. Les deux modes valident le JSON en temps reel.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'un editeur JSON ?', faq1a: 'Un editeur JSON est un outil concu pour visualiser et modifier les donnees JSON avec validation en temps reel et vue en arbre.',
    faq2q: 'Difference entre vue arborescente et editeur brut ?', faq2a: 'La vue arborescente affiche le JSON comme une hierarchie interactive. L\'editeur brut montre le texte formate pour les modifications rapides.',
    faq3q: 'Peut-on modifier le JSON dans la vue arborescente ?', faq3a: 'La vue arborescente est en lecture seule. Utilisez l\'editeur brut pour les modifications.',
    faq4q: 'Comment valider le JSON en ligne ?', faq4a: 'Collez votre JSON dans l\'editeur. L\'outil valide automatiquement la syntaxe et affiche les erreurs.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Online JSON Editor',
    description: 'JSON-Daten mit Baumansicht oder Texteditor bearbeiten. JSON kostenlos formatieren und validieren.',
    inputLabel: 'JSON-Eingabe', inputPlaceholder: 'JSON hier einfuegen oder eingeben...',
    treeView: 'Baumansicht', rawEditor: 'Text-Editor', format: 'Formatieren', minify: 'Minifizieren', clear: 'Loeschen',
    loadSample: 'Beispiel laden', valid: 'Gueltiges JSON', invalid: 'Ungueltiges JSON',
    expandAll: 'Alle aufklappen', collapseAll: 'Alle zuklappen', indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab',
    noData: 'JSON eingeben um Baumansicht zu sehen',
    introTitle: 'Kostenloser Online JSON Editor', introText: 'Dieser Online JSON Editor bietet zwei Modi: eine visuelle Baumansicht und einen Text-Editor. Beide Modi validieren JSON in Echtzeit.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein JSON Editor?', faq1a: 'Ein JSON Editor ist ein Werkzeug zum Anzeigen und Bearbeiten von JSON-Daten mit Echtzeit-Validierung und Baumdarstellung.',
    faq2q: 'Unterschied zwischen Baumansicht und Texteditor?', faq2a: 'Die Baumansicht zeigt JSON als interaktive Hierarchie. Der Texteditor zeigt formatierten Text fuer schnelle Aenderungen.',
    faq3q: 'Kann man JSON in der Baumansicht bearbeiten?', faq3a: 'Die Baumansicht ist schreibgeschuetzt. Verwenden Sie den Texteditor fuer Aenderungen.',
    faq4q: 'Wie validiert man JSON online?', faq4a: 'Fuegen Sie JSON in den Editor ein. Das Tool validiert automatisch die Syntax und zeigt Fehler an.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Editor JSON en Linea',
    description: 'Edita datos JSON con un editor de vista de arbol o texto sin formato. Formatea y valida JSON gratis.',
    inputLabel: 'Entrada JSON', inputPlaceholder: 'Pega o escribe tu JSON aqui...',
    treeView: 'Vista de arbol', rawEditor: 'Editor de texto', format: 'Formatear', minify: 'Minificar', clear: 'Limpiar',
    loadSample: 'Cargar ejemplo', valid: 'JSON valido', invalid: 'JSON invalido',
    expandAll: 'Expandir todo', collapseAll: 'Colapsar todo', indent: 'Indentacion', spaces: 'espacios', tab: 'Tab',
    noData: 'Ingresa JSON para ver la vista de arbol',
    introTitle: 'Editor JSON en linea gratuito', introText: 'Este editor JSON en linea ofrece dos modos: una vista de arbol visual y un editor de texto. Ambos modos validan JSON en tiempo real.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un editor JSON?', faq1a: 'Un editor JSON es una herramienta para visualizar y editar datos JSON con validacion en tiempo real y vista de arbol.',
    faq2q: 'Diferencia entre vista de arbol y editor de texto?', faq2a: 'La vista de arbol muestra JSON como jerarquia interactiva. El editor de texto muestra texto formateado para ediciones rapidas.',
    faq3q: 'Se puede editar JSON en la vista de arbol?', faq3a: 'La vista de arbol es de solo lectura. Use el editor de texto para las modificaciones.',
    faq4q: 'Como validar JSON en linea?', faq4a: 'Pegue su JSON en el editor. La herramienta valida automaticamente la sintaxis y muestra errores.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'オンライン JSON エディター',
    description: 'ツリービューまたはテキストエディターで JSON データを編集。無料で JSON をフォーマット、検証。',
    inputLabel: 'JSON 入力', inputPlaceholder: 'JSON をここに貼り付けまたは入力...',
    treeView: 'ツリービュー', rawEditor: 'テキストエディター', format: 'フォーマット', minify: '圧縮', clear: 'クリア',
    loadSample: 'サンプル読込', valid: '有効な JSON', invalid: '無効な JSON',
    expandAll: 'すべて展開', collapseAll: 'すべて折りたたむ', indent: 'インデント', spaces: 'スペース', tab: 'タブ',
    noData: 'JSON を入力するとツリービューが表示されます',
    introTitle: '無料オンライン JSON エディター', introText: 'このオンライン JSON エディターは、ビジュアルツリービューとテキストエディターの2つのモードを提供します。どちらもリアルタイムで JSON を検証します。',
    faqTitle: 'よくある質問',
    faq1q: 'JSON エディターとは？', faq1a: 'JSON エディターは、リアルタイム検証とツリー表示を備えた JSON データの表示・編集ツールです。',
    faq2q: 'ツリービューとテキストエディターの違いは？', faq2a: 'ツリービューは JSON をインタラクティブな階層として表示。テキストエディターはフォーマットされたテキストを表示し、素早い編集に適しています。',
    faq3q: 'ツリービューで JSON を直接編集できますか？', faq3a: 'ツリービューは読み取り専用です。編集にはテキストエディターモードを使用してください。',
    faq4q: 'オンラインで JSON を検証するには？', faq4a: 'JSON をエディターに貼り付けるだけです。ツールが自動的に構文を検証しエラーを表示します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: '온라인 JSON 편집기',
    description: '트리 뷰 또는 텍스트 편집기로 JSON 데이터를 편집. 무료로 JSON 포맷, 검증.',
    inputLabel: 'JSON 입력', inputPlaceholder: 'JSON을 여기에 붙여넣기 또는 입력...',
    treeView: '트리 뷰', rawEditor: '텍스트 편집기', format: '포맷', minify: '압축', clear: '지우기',
    loadSample: '샘플 로드', valid: '유효한 JSON', invalid: '유효하지 않은 JSON',
    expandAll: '모두 펼치기', collapseAll: '모두 접기', indent: '들여쓰기', spaces: '스페이스', tab: '탭',
    noData: 'JSON을 입력하면 트리 뷰가 표시됩니다',
    introTitle: '무료 온라인 JSON 편집기', introText: '이 온라인 JSON 편집기는 비주얼 트리 뷰와 텍스트 편집기 두 가지 모드를 제공합니다. 두 모드 모두 실시간으로 JSON을 검증합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON 편집기란?', faq1a: 'JSON 편집기는 실시간 검증과 트리 표시를 갖춘 JSON 데이터 보기 및 편집 도구입니다.',
    faq2q: '트리 뷰와 텍스트 편집기의 차이점은?', faq2a: '트리 뷰는 JSON을 대화형 계층 구조로 표시합니다. 텍스트 편집기는 포맷된 텍스트를 표시하여 빠른 편집에 적합합니다.',
    faq3q: '트리 뷰에서 JSON을 직접 편집할 수 있나요?', faq3a: '트리 뷰는 읽기 전용입니다. 편집은 텍스트 편집기 모드를 사용하세요.',
    faq4q: '온라인에서 JSON을 검증하는 방법은?', faq4a: 'JSON을 편집기에 붙여넣기만 하면 됩니다. 도구가 자동으로 구문을 검증하고 오류를 표시합니다.',
    relatedTitle: '관련 도구',
  },
};

export default function OnlineJsonEditor() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'tree' | 'raw'>('tree');
  const [indent, setIndent] = useState<string>('2');
  const [error, setError] = useState('');
  const [tree, setTree] = useState<JsonNode | null>(null);

  const parseInput = useCallback((text: string) => {
    setInput(text);
    if (!text.trim()) { setTree(null); setError(''); return; }
    try {
      const parsed = JSON.parse(text);
      setTree(buildTree(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setTree(null);
    }
  }, []);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const indentVal = indent === 'tab' ? '\t' : Number(indent);
      const formatted = JSON.stringify(parsed, null, indentVal);
      setInput(formatted);
      setTree(buildTree(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setTree(buildTree(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const loadSample = () => {
    const sample = JSON.stringify({
      name: 'DevToolBox',
      version: '2.0',
      features: ['JSON Editor', 'Tree View', 'Formatter', 'Validator'],
      config: { theme: 'dark', language: 'en', debug: false },
      stats: { users: 15000, tools: 144, languages: 15 },
      active: true,
    }, null, 2);
    parseInput(sample);
  };

  const toggleNode = useCallback((path: string) => {
    setTree(prev => {
      if (!prev) return prev;
      const toggle = (node: JsonNode): JsonNode => {
        if (node.path === path) return { ...node, expanded: !node.expanded };
        if (node.children) return { ...node, children: node.children.map(toggle) };
        return node;
      };
      return toggle(prev);
    });
  }, []);

  const setAllExpanded = useCallback((expanded: boolean) => {
    setTree(prev => {
      if (!prev) return prev;
      const update = (node: JsonNode): JsonNode => ({
        ...node, expanded,
        children: node.children?.map(update),
      });
      return update(prev);
    });
  }, []);

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
    <ToolLayout title={t.title} description={t.description} toolId="online-json-editor">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <button onClick={() => setMode('tree')} style={{ padding: '6px 14px', fontSize: 13, fontWeight: mode === 'tree' ? 700 : 400, background: mode === 'tree' ? 'var(--accent-blue)' : 'transparent', color: mode === 'tree' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}>{t.treeView}</button>
          <button onClick={() => setMode('raw')} style={{ padding: '6px 14px', fontSize: 13, fontWeight: mode === 'raw' ? 700 : 400, background: mode === 'raw' ? 'var(--accent-blue)' : 'transparent', color: mode === 'raw' ? '#fff' : 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}>{t.rawEditor}</button>
        </div>
        <button onClick={handleFormat} className="btn btn-primary">{t.format}</button>
        <button onClick={handleMinify} className="btn btn-secondary">{t.minify}</button>
        <button onClick={() => { setInput(''); setTree(null); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        {mode === 'tree' && tree && (
          <>
            <button onClick={() => setAllExpanded(true)} className="btn btn-secondary">{t.expandAll}</button>
            <button onClick={() => setAllExpanded(false)} className="btn btn-secondary">{t.collapseAll}</button>
          </>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select value={indent} onChange={e => setIndent(e.target.value)} style={{ width: 100, padding: '4px 8px', fontSize: 12 }}>
            <option value="2">2 {t.spaces}</option>
            <option value="4">4 {t.spaces}</option>
            <option value="tab">{t.tab}</option>
          </select>
          <CopyButton text={input} />
        </div>
      </div>

      {/* Validation status */}
      {input.trim() && (
        <div style={{
          background: error ? 'rgba(244,63,94,0.1)' : 'rgba(34,197,94,0.1)',
          border: `1px solid ${error ? 'rgba(244,63,94,0.3)' : 'rgba(34,197,94,0.3)'}`,
          borderRadius: 8, padding: '8px 14px', marginBottom: 16, fontSize: 13,
          color: error ? 'var(--accent-rose)' : '#22c55e',
        }}>
          {error ? `${t.invalid}: ${error}` : t.valid}
        </div>
      )}

      {/* Editor area */}
      {mode === 'raw' ? (
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => parseInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 450, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
            <textarea value={input} onChange={e => parseInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 450, fontFamily: 'monospace', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.treeView}</label>
            <div style={{ minHeight: 450, border: '1px solid var(--border-color)', borderRadius: 8, padding: 12, overflow: 'auto', background: 'var(--bg-card)' }}>
              {tree ? (
                <TreeNodeView node={tree} depth={0} onToggle={toggleNode} />
              ) : (
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, textAlign: 'center', paddingTop: 40 }}>{t.noData}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

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
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-viewer`, label: 'JSON Viewer / Tree' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
            { href: `/${lang}/tools/json-beautifier`, label: 'JSON Beautifier' },
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
