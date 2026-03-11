'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type Alignment = 'left' | 'center' | 'right';

export default function MarkdownTableGenerator() {
  const { dict } = useLang();
  const t = dict.tools['markdown-table-generator'];
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>([
    ['Header 1', 'Header 2', 'Header 3'],
    ['Row 1 Col 1', 'Row 1 Col 2', 'Row 1 Col 3'],
    ['Row 2 Col 1', 'Row 2 Col 2', 'Row 2 Col 3'],
  ]);
  const [alignments, setAlignments] = useState<Alignment[]>(['left', 'left', 'left']);
  const [output, setOutput] = useState('');

  const updateCell = (row: number, col: number, value: string) => {
    const newData = data.map(r => [...r]);
    newData[row][col] = value;
    setData(newData);
  };

  const addRow = () => {
    const newRow = new Array(cols).fill('');
    setData([...data, newRow]);
    setRows(rows + 1);
  };

  const addCol = () => {
    const newData = data.map(row => [...row, '']);
    const newAlignments = [...alignments, 'left' as Alignment];
    setData(newData);
    setAlignments(newAlignments);
    setCols(cols + 1);
  };

  const removeRow = () => {
    if (rows <= 2) return;
    setData(data.slice(0, -1));
    setRows(rows - 1);
  };

  const removeCol = () => {
    if (cols <= 1) return;
    const newData = data.map(row => row.slice(0, -1));
    setData(newData);
    setAlignments(alignments.slice(0, -1));
    setCols(cols - 1);
  };

  const toggleAlignment = (colIndex: number) => {
    const order: Alignment[] = ['left', 'center', 'right'];
    const currentIndex = order.indexOf(alignments[colIndex]);
    const newAlignments = [...alignments];
    newAlignments[colIndex] = order[(currentIndex + 1) % 3];
    setAlignments(newAlignments);
  };

  const generateMarkdown = () => {
    if (data.length < 1) return;
    const headers = data[0];
    const colWidths = headers.map((_, ci) =>
      Math.max(...data.map(row => (row[ci] || '').length), 3)
    );

    const padCell = (text: string, width: number, align: Alignment) => {
      const pad = width - text.length;
      if (pad <= 0) return text;
      if (align === 'center') {
        const left = Math.floor(pad / 2);
        return ' '.repeat(left) + text + ' '.repeat(pad - left);
      }
      if (align === 'right') return ' '.repeat(pad) + text;
      return text + ' '.repeat(pad);
    };

    const headerLine = '| ' + headers.map((h, i) => padCell(h, colWidths[i], alignments[i])).join(' | ') + ' |';
    const separatorLine = '| ' + colWidths.map((w, i) => {
      const a = alignments[i];
      const dashes = '-'.repeat(w);
      if (a === 'center') return ':' + dashes.slice(1, -1) + ':';
      if (a === 'right') return dashes.slice(0, -1) + ':';
      return dashes;
    }).join(' | ') + ' |';

    const bodyLines = data.slice(1).map(row =>
      '| ' + row.map((cell, i) => padCell(cell || '', colWidths[i], alignments[i])).join(' | ') + ' |'
    );

    const result = [headerLine, separatorLine, ...bodyLines].join('\n');
    setOutput(result);
  };

  const loadSample = () => {
    setRows(4);
    setCols(4);
    setData([
      ['Feature', 'React', 'Vue', 'Angular'],
      ['Language', 'JSX', 'Template', 'TypeScript'],
      ['Size', '42KB', '33KB', '143KB'],
      ['Learning Curve', 'Medium', 'Easy', 'Hard'],
    ]);
    setAlignments(['left', 'center', 'center', 'center']);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="markdown-table-generator"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={generateMarkdown} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={addRow} className="btn btn-secondary">+ Row</button>
        <button onClick={addCol} className="btn btn-secondary">+ Column</button>
        <button onClick={removeRow} className="btn btn-secondary">- Row</button>
        <button onClick={removeCol} className="btn btn-secondary">- Column</button>
      </div>

      {/* Table Editor */}
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: 4, fontSize: 12, color: 'var(--text-secondary)' }}>#</th>
              {data[0]?.map((_, ci) => (
                <th key={ci} style={{ padding: 4 }}>
                  <button
                    onClick={() => toggleAlignment(ci)}
                    style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 4,
                      padding: '2px 8px',
                      fontSize: 11,
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {alignments[ci] === 'left' ? '⬅' : alignments[ci] === 'center' ? '⬌' : '➡'}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, ri) => (
              <tr key={ri} style={{ background: ri === 0 ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}>
                <td style={{ padding: 4, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
                  {ri === 0 ? 'H' : ri}
                </td>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: 2 }}>
                    <input
                      type="text"
                      value={cell}
                      onChange={e => updateCell(ri, ci, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        fontSize: 13,
                        fontWeight: ri === 0 ? 600 : 400,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output */}
      {output && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <pre style={{
            background: 'var(--bg-input)',
            borderRadius: 8,
            padding: 16,
            fontSize: 13,
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            overflowX: 'auto',
            border: '1px solid var(--border-color)',
          }}>
            {output}
          </pre>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
