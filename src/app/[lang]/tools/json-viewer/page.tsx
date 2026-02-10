'use client';

import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

/* ---------- helpers ---------- */

function getType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function buildPath(parent: string, key: string | number, isArrayItem: boolean): string {
  if (isArrayItem) return `${parent}[${key}]`;
  if (parent === '$') return `$.${key}`;
  return `${parent}.${key}`;
}

function matchesSearch(key: string | number, value: unknown, search: string): boolean {
  if (!search) return false;
  const lower = search.toLowerCase();
  if (String(key).toLowerCase().includes(lower)) return true;
  if (value === null) return 'null'.includes(lower);
  if (typeof value !== 'object') return String(value).toLowerCase().includes(lower);
  return false;
}

/* ---------- TreeNode ---------- */

interface TreeNodeProps {
  keyName: string | number;
  value: unknown;
  path: string;
  depth: number;
  isArrayItem: boolean;
  search: string;
  onSelectPath: (p: string) => void;
  defaultExpanded: boolean;
}

function TreeNode({ keyName, value, path, depth, isArrayItem, search, onSelectPath, defaultExpanded }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const type = getType(value);
  const isExpandable = type === 'object' || type === 'array';
  const highlighted = matchesSearch(keyName, value, search);

  const colorMap: Record<string, string> = {
    string: 'var(--accent-emerald)',
    number: 'var(--accent-blue)',
    boolean: 'var(--accent-orange)',
    null: 'var(--accent-rose)',
  };

  const handleToggle = () => {
    if (isExpandable) setExpanded(prev => !prev);
  };

  const handlePathClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectPath(path);
  };

  /* Render value for primitives */
  const renderValue = () => {
    if (type === 'string') return <span style={{ color: colorMap.string }}>&quot;{String(value)}&quot;</span>;
    if (type === 'number') return <span style={{ color: colorMap.number }}>{String(value)}</span>;
    if (type === 'boolean') return <span style={{ color: colorMap.boolean }}>{String(value)}</span>;
    if (type === 'null') return <span style={{ color: colorMap.null }}>null</span>;
    return null;
  };

  /* Summary label for expandable nodes */
  const summary = () => {
    if (type === 'array') {
      const arr = value as unknown[];
      return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>Array [{arr.length}]</span>;
    }
    if (type === 'object') {
      const keys = Object.keys(value as Record<string, unknown>);
      return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{'Object {'}{keys.length}{'}'}</span>;
    }
    return null;
  };

  /* Children for expandable */
  const renderChildren = () => {
    if (!expanded || !isExpandable) return null;
    if (type === 'array') {
      return (value as unknown[]).map((item, index) => (
        <TreeNode
          key={index}
          keyName={index}
          value={item}
          path={buildPath(path, index, true)}
          depth={depth + 1}
          isArrayItem={true}
          search={search}
          onSelectPath={onSelectPath}
          defaultExpanded={false}
        />
      ));
    }
    if (type === 'object') {
      return Object.entries(value as Record<string, unknown>).map(([k, v]) => (
        <TreeNode
          key={k}
          keyName={k}
          value={v}
          path={buildPath(path, k, false)}
          depth={depth + 1}
          isArrayItem={false}
          search={search}
          onSelectPath={onSelectPath}
          defaultExpanded={false}
        />
      ));
    }
    return null;
  };

  const arrowChar = expanded ? '\u25BC' : '\u25B6';

  return (
    <div style={{ marginLeft: depth * 18, userSelect: 'none' }}>
      <div
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '3px 6px',
          borderRadius: 4,
          cursor: isExpandable ? 'pointer' : 'default',
          background: highlighted ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = highlighted ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255,255,255,0.04)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = highlighted ? 'rgba(59, 130, 246, 0.15)' : 'transparent'; }}
      >
        {/* expand/collapse arrow */}
        <span style={{
          fontSize: 10,
          width: 14,
          textAlign: 'center',
          color: 'var(--text-secondary)',
          flexShrink: 0,
          visibility: isExpandable ? 'visible' : 'hidden',
        }}>
          {arrowChar}
        </span>

        {/* key */}
        <span
          onClick={handlePathClick}
          style={{
            fontWeight: 600,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontSize: 13,
          }}
          title={`Click to copy path: ${path}`}
        >
          {isArrayItem ? `[${keyName}]` : `"${keyName}"`}
        </span>

        <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>:</span>

        {/* value or summary */}
        {isExpandable ? summary() : (
          <span style={{ fontSize: 13, fontFamily: 'monospace' }}>{renderValue()}</span>
        )}
      </div>

      {/* child nodes */}
      {renderChildren()}
    </div>
  );
}

/* ---------- Main Component ---------- */

export default function JsonViewer() {
  const { dict } = useLang();
  const t = dict.tools['json-viewer'] as Record<string, unknown>;

  const [input, setInput] = useState('');
  const [parsedData, setParsedData] = useState<unknown>(undefined);
  const [isParsed, setIsParsed] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPath, setSelectedPath] = useState('');
  const [expandAll, setExpandAll] = useState(false);
  const [treeKey, setTreeKey] = useState(0);

  const handleParse = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to parse.');
      setParsedData(undefined);
      setIsParsed(false);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setIsParsed(true);
      setError('');
      setSelectedPath('');
      setExpandAll(false);
      setTreeKey(prev => prev + 1);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setParsedData(undefined);
      setIsParsed(false);
    }
  }, [input]);

  const handleClear = () => {
    setInput('');
    setParsedData(undefined);
    setIsParsed(false);
    setError('');
    setSearch('');
    setSelectedPath('');
  };

  const handleExpandAll = () => {
    setExpandAll(true);
    setTreeKey(prev => prev + 1);
  };

  const handleCollapseAll = () => {
    setExpandAll(false);
    setTreeKey(prev => prev + 1);
  };

  const handleSelectPath = useCallback((p: string) => {
    setSelectedPath(p);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(p).catch(() => {});
    }
  }, []);

  const loadSample = () => {
    const sample = {
      name: "DevToolBox",
      version: "2.0.0",
      features: ["JSON Viewer", "Tree View", "Path Finder"],
      config: {
        theme: "dark",
        language: "en",
        notifications: true,
        maxDepth: null
      },
      users: [
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false }
      ],
      stats: {
        daily: 1500,
        monthly: 45000,
        retention: 0.87
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  /* Count total nodes for stats */
  const nodeStats = useMemo(() => {
    if (!isParsed || parsedData === undefined) return null;
    let objects = 0;
    let arrays = 0;
    let primitives = 0;
    const count = (val: unknown) => {
      if (val === null || typeof val !== 'object') { primitives++; return; }
      if (Array.isArray(val)) { arrays++; val.forEach(count); }
      else { objects++; Object.values(val).forEach(count); }
    };
    count(parsedData);
    return { objects, arrays, primitives, total: objects + arrays + primitives };
  }, [isParsed, parsedData]);

  /* Render tree */
  const renderTree = () => {
    if (!isParsed || parsedData === undefined) return null;
    const type = getType(parsedData);
    if (type === 'object') {
      return Object.entries(parsedData as Record<string, unknown>).map(([k, v]) => (
        <TreeNode
          key={`${treeKey}-${k}`}
          keyName={k}
          value={v}
          path={buildPath('$', k, false)}
          depth={0}
          isArrayItem={false}
          search={search}
          onSelectPath={handleSelectPath}
          defaultExpanded={expandAll}
        />
      ));
    }
    if (type === 'array') {
      return (parsedData as unknown[]).map((item, i) => (
        <TreeNode
          key={`${treeKey}-${i}`}
          keyName={i}
          value={item}
          path={buildPath('$', i, true)}
          depth={0}
          isArrayItem={true}
          search={search}
          onSelectPath={handleSelectPath}
          defaultExpanded={expandAll}
        />
      ));
    }
    // Primitive root
    return (
      <div style={{ padding: '8px', fontFamily: 'monospace', fontSize: 13 }}>
        <span style={{
          color: type === 'string' ? 'var(--accent-emerald)'
            : type === 'number' ? 'var(--accent-blue)'
            : type === 'boolean' ? 'var(--accent-orange)'
            : 'var(--accent-rose)',
        }}>
          {type === 'string' ? `"${String(parsedData)}"` : String(parsedData)}
        </span>
      </div>
    );
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="json-viewer"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleParse} className="btn btn-primary">Parse</button>
        <button onClick={handleClear} className="btn btn-secondary">Clear</button>
        <button onClick={loadSample} className="btn btn-secondary">Load Sample</button>
        {isParsed && (
          <>
            <button onClick={handleExpandAll} className="btn btn-secondary">Expand All</button>
            <button onClick={handleCollapseAll} className="btn btn-secondary">Collapse All</button>
          </>
        )}
        {isParsed && (
          <div style={{ marginLeft: 'auto' }}>
            <CopyButton text={JSON.stringify(parsedData, null, 2)} label="Copy JSON" />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          Error: {error}
        </div>
      )}

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>JSON Input</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Paste your JSON here...'
          style={{ minHeight: 180 }}
        />
      </div>

      {/* Tree View */}
      {isParsed && (
        <div>
          {/* Stats bar */}
          {nodeStats && (
            <div style={{
              display: 'flex',
              gap: 16,
              padding: '8px 12px',
              marginBottom: 12,
              background: 'var(--bg-input)',
              borderRadius: 6,
              fontSize: 12,
              color: 'var(--text-secondary)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              <span>Total: <strong style={{ color: 'var(--text-primary)' }}>{nodeStats.total}</strong></span>
              <span>Objects: <strong style={{ color: 'var(--accent-blue)' }}>{nodeStats.objects}</strong></span>
              <span>Arrays: <strong style={{ color: 'var(--accent-orange)' }}>{nodeStats.arrays}</strong></span>
              <span>Primitives: <strong style={{ color: 'var(--accent-emerald)' }}>{nodeStats.primitives}</strong></span>
            </div>
          )}

          {/* Search */}
          <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search keys or values..."
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: 13,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="btn btn-secondary"
                style={{ fontSize: 11, padding: '6px 10px' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Selected Path */}
          {selectedPath && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              marginBottom: 12,
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: 6,
              fontSize: 13,
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>JSONPath:</span>
              <code style={{
                fontFamily: 'monospace',
                color: 'var(--accent-blue)',
                fontWeight: 600,
                flex: 1,
              }}>
                {selectedPath}
              </code>
              <CopyButton text={selectedPath} label="Copy" />
            </div>
          )}

          {/* Tree container */}
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: '12px 8px',
            maxHeight: 500,
            overflowY: 'auto',
            fontFamily: 'monospace',
          }}>
            {/* Root bracket */}
            {getType(parsedData) === 'object' && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '0 6px 4px', fontWeight: 600 }}>
                {'{ '}
                <span style={{ fontWeight: 400, fontSize: 12 }}>{Object.keys(parsedData as Record<string, unknown>).length} keys</span>
              </div>
            )}
            {getType(parsedData) === 'array' && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '0 6px 4px', fontWeight: 600 }}>
                {'[ '}
                <span style={{ fontWeight: 400, fontSize: 12 }}>{(parsedData as unknown[]).length} items</span>
              </div>
            )}

            {renderTree()}

            {getType(parsedData) === 'object' && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '4px 6px 0', fontWeight: 600 }}>{'}'}</div>
            )}
            {getType(parsedData) === 'array' && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '4px 6px 0', fontWeight: 600 }}>{']'}</div>
            )}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
      </div>
    </ToolLayout>
  );
}
