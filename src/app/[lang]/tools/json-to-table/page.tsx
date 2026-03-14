'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface TableColumn {
  key: string;
  visible: boolean;
}

const sampleJSON = JSON.stringify(
  [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      age: 28,
      address: {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
      },
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      age: 35,
      address: {
        street: '456 Oak Ave',
        city: 'San Francisco',
        country: 'USA',
      },
    },
    {
      id: 3,
      name: 'Carol Williams',
      email: 'carol@example.com',
      age: 31,
      address: {
        street: '789 Pine Rd',
        city: 'Chicago',
        country: 'USA',
      },
    },
  ],
  null,
  2
);

type SortDirection = 'asc' | 'desc' | null;

export default function JsonToTable() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['json-to-table'];

  const [jsonInput, setJsonInput] = useState(sampleJSON);
  const [error, setError] = useState<string>('');
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [flattenNested, setFlattenNested] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Parse JSON and extract data
  const { tableData, isArray, singleObject } = useMemo(() => {
    try {
      setError('');
      const parsed = JSON.parse(jsonInput);

      if (Array.isArray(parsed)) {
        return { tableData: parsed, isArray: true, singleObject: null };
      } else if (typeof parsed === 'object' && parsed !== null) {
        return { tableData: [parsed], isArray: false, singleObject: parsed };
      } else {
        setError('JSON must be an object or array');
        return { tableData: [], isArray: false, singleObject: null };
      }
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
      return { tableData: [], isArray: false, singleObject: null };
    }
  }, [jsonInput]);

  // Extract columns from data
  useMemo(() => {
    if (tableData.length === 0) {
      setColumns([]);
      return;
    }

    const allKeys = new Set<string>();
    tableData.forEach((item: unknown) => {
      if (typeof item === 'object' && item !== null) {
        const obj = item as Record<string, unknown>;
        Object.keys(obj).forEach((key) => allKeys.add(key));
      }
    });

    const newColumns: TableColumn[] = Array.from(allKeys).map((key) => ({
      key,
      visible: true,
    }));

    setColumns(newColumns);
  }, [tableData]);

  // Flatten nested objects if needed
  const processedData = useMemo(() => {
    if (!flattenNested) {
      return tableData;
    }

    return tableData.map((item: unknown) => {
      if (typeof item !== 'object' || item === null) return item;

      const obj = item as Record<string, unknown>;
      const flattened: Record<string, unknown> = {};

      const flatten = (prefix: string, current: unknown) => {
        if (typeof current === 'object' && current !== null && !Array.isArray(current)) {
          const nested = current as Record<string, unknown>;
          Object.entries(nested).forEach(([key, value]) => {
            const newKey = prefix ? `${prefix}.${key}` : key;
            flatten(newKey, value);
          });
        } else {
          flattened[prefix] = current;
        }
      };

      Object.entries(obj).forEach(([key, value]) => {
        flatten(key, value);
      });

      return flattened;
    });
  }, [tableData, flattenNested]);

  // Update columns when flattening changes
  useMemo(() => {
    if (processedData.length === 0) {
      setColumns([]);
      return;
    }

    const allKeys = new Set<string>();
    processedData.forEach((item: unknown) => {
      if (typeof item === 'object' && item !== null) {
        const obj = item as Record<string, unknown>;
        Object.keys(obj).forEach((key) => allKeys.add(key));
      }
    });

    const newColumns: TableColumn[] = Array.from(allKeys).map((key) => ({
      key,
      visible: columns.find((c) => c.key === key)?.visible ?? true,
    }));

    setColumns(newColumns);
  }, [processedData]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection || processedData.length === 0) {
      return processedData;
    }

    const sorted = [...processedData];
    sorted.sort((a: unknown, b: unknown) => {
      const aObj = a as Record<string, unknown>;
      const bObj = b as Record<string, unknown>;
      const aVal = aObj[sortColumn];
      const bVal = bObj[sortColumn];

      if (aVal === null || aVal === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bVal === null || bVal === undefined) return sortDirection === 'asc' ? -1 : 1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });

    return sorted;
  }, [processedData, sortColumn, sortDirection]);

  const visibleColumns = columns.filter((c) => c.visible);

  const toggleColumn = useCallback((key: string) => {
    setColumns((prev) =>
      prev.map((c) => (c.key === key ? { ...c, visible: !c.visible } : c))
    );
  }, []);

  const handleSort = useCallback((key: string) => {
    if (sortColumn === key) {
      setSortDirection((prev) => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  }, [sortColumn]);

  const generateCSV = useCallback(() => {
    if (visibleColumns.length === 0 || sortedData.length === 0) return '';

    const headers = visibleColumns.map((c) => `"${c.key}"`).join(',');
    const rows = sortedData.map((item: unknown) => {
      const obj = item as Record<string, unknown>;
      return visibleColumns
        .map((col) => {
          const val = obj[col.key];
          if (val === null || val === undefined) return '';
          const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        })
        .join(',');
    });

    return [headers, ...rows].join('\n');
  }, [visibleColumns, sortedData]);

  const generateMarkdown = useCallback(() => {
    if (visibleColumns.length === 0 || sortedData.length === 0) return '';

    const headers = visibleColumns.map((c) => c.key).join(' | ');
    const divider = visibleColumns.map(() => '---').join(' | ');
    const rows = sortedData.map((item: unknown) => {
      const obj = item as Record<string, unknown>;
      return visibleColumns
        .map((col) => {
          const val = obj[col.key];
          if (val === null || val === undefined) return '';
          return typeof val === 'object' ? JSON.stringify(val) : String(val);
        })
        .join(' | ');
    });

    return [headers, divider, ...rows].join('\n');
  }, [visibleColumns, sortedData]);

  const generateHTML = useCallback(() => {
    if (visibleColumns.length === 0 || sortedData.length === 0) return '';

    let html = '<table border="1" cellpadding="8">\n<thead>\n<tr>\n';
    visibleColumns.forEach((col) => {
      html += `  <th>${col.key}</th>\n`;
    });
    html += '</tr>\n</thead>\n<tbody>\n';

    sortedData.forEach((item: unknown) => {
      const obj = item as Record<string, unknown>;
      html += '<tr>\n';
      visibleColumns.forEach((col) => {
        const val = obj[col.key];
        const content =
          val === null || val === undefined ? '' : typeof val === 'object' ? JSON.stringify(val) : String(val);
        html += `  <td>${content}</td>\n`;
      });
      html += '</tr>\n';
    });

    html += '</tbody>\n</table>';
    return html;
  }, [visibleColumns, sortedData]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    outline: 'none',
    minHeight: 200,
    resize: 'vertical',
  };

  const sectionStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="json-to-table">
      {/* JSON Input */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
          JSON Input
        </div>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON here..."
          style={inputStyle}
        />
        {error && (
          <div
            style={{
              marginTop: 8,
              padding: 8,
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: 4,
              fontSize: 13,
              color: '#c00',
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Options */}
      {tableData.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
            Options
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={flattenNested}
                onChange={(e) => setFlattenNested(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Flatten nested objects</span>
            </label>
          </div>
        </div>
      )}

      {/* Column Visibility */}
      {columns.length > 0 && (
        <div style={sectionStyle}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
            Columns
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {columns.map((col) => (
              <label
                key={col.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 4,
                  background: col.visible ? 'var(--accent-blue)20' : 'var(--border-color)',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="checkbox"
                  checked={col.visible}
                  onChange={() => toggleColumn(col.key)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {col.key}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Table Output */}
      {tableData.length > 0 && visibleColumns.length > 0 && (
        <div style={sectionStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
              Table ({sortedData.length} rows)
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <CopyButton text={generateCSV()} label="Copy CSV" />
              <CopyButton text={generateMarkdown()} label="Copy Markdown" />
              <CopyButton text={generateHTML()} label="Copy HTML" />
            </div>
          </div>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 13,
                minWidth: '100%',
              }}
            >
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                  {visibleColumns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        background:
                          sortColumn === col.key
                            ? 'var(--accent-blue)20'
                            : 'var(--bg-secondary)',
                        transition: 'background 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                      title="Click to sort"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {col.key}
                        {sortColumn === col.key && (
                          <span style={{ fontSize: 11, fontWeight: 600 }}>
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item: unknown, rowIdx: number) => {
                  const obj = item as Record<string, unknown>;
                  return (
                    <tr
                      key={rowIdx}
                      style={{
                        background:
                          rowIdx % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                        borderBottom: '1px solid var(--border-color)',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          'var(--accent-blue)10';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          rowIdx % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)';
                      }}
                    >
                      {visibleColumns.map((col) => {
                        const val = obj[col.key];
                        const display =
                          val === null || val === undefined
                            ? '—'
                            : typeof val === 'object'
                              ? JSON.stringify(val)
                              : String(val);
                        return (
                          <td
                            key={`${rowIdx}-${col.key}`}
                            style={{
                              padding: '10px 12px',
                              color: 'var(--text-primary)',
                              maxWidth: 300,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={display}
                          >
                            {display}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <div style={{ marginTop: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Common Use Cases:</h3>
          <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Convert API response JSON to readable table format</li>
            <li>Export database query results as CSV or Markdown</li>
            <li>Analyze nested JSON data structures visually</li>
            <li>Create data reports and documentation from JSON</li>
            <li>Share structured data in multiple formats (CSV, Markdown, HTML)</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
}
