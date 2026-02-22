'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

type Align = 'left' | 'center' | 'right';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown Table Generator',
    description: 'Generate Markdown tables with a visual editor. Add or remove rows and columns, set alignment, and copy the Markdown output.',
    rows: 'Rows',
    cols: 'Columns',
    addRow: '+ Row',
    addCol: '+ Column',
    removeRow: '- Row',
    removeCol: '- Column',
    clear: 'Clear All',
    loadSample: 'Load Sample',
    outputLabel: 'Markdown Output',
    previewLabel: 'Preview',
    alignLeft: 'Left',
    alignCenter: 'Center',
    alignRight: 'Right',
    headerPlaceholder: 'Header',
    cellPlaceholder: 'Cell',
    introTitle: 'Free Online Markdown Table Generator',
    introText: 'Create Markdown tables visually without memorizing the syntax. Simply edit cells in the grid, add or remove rows and columns, and set column alignment. The tool generates valid Markdown table syntax in real-time. Perfect for GitHub READMEs, documentation, blog posts, and any Markdown-compatible platform. Copy the generated Markdown with one click.',
    cheatTitle: 'Markdown Table Syntax Reference',
    ruleCol: 'Feature',
    descCol: 'Syntax',
    exampleCol: 'Description',
    rule1: 'Basic table',
    rule1Desc: '| Col1 | Col2 |',
    rule1Ex: 'Pipe characters separate columns',
    rule2: 'Header separator',
    rule2Desc: '|------|------|',
    rule2Ex: 'Dashes separate header from body',
    rule3: 'Left align',
    rule3Desc: '|:-----|',
    rule3Ex: 'Colon on left side',
    rule4: 'Center align',
    rule4Desc: '|:----:|',
    rule4Ex: 'Colons on both sides',
    rule5: 'Right align',
    rule5Desc: '|-----:|',
    rule5Ex: 'Colon on right side',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do Markdown tables work?',
    faq1a: 'Markdown tables use pipe characters (|) to separate columns and dashes (-) to separate the header row from data rows. Each row is a single line. The alignment row (second line) uses colons to indicate left, center, or right alignment. Not all Markdown renderers support tables, but GitHub, GitLab, and most modern Markdown processors do.',
    faq2q: 'Can I use Markdown tables in GitHub?',
    faq2a: 'Yes, GitHub Flavored Markdown (GFM) fully supports tables. You can use them in README files, issues, pull requests, comments, and wiki pages. GitHub renders the table with proper formatting, alignment, and borders.',
    faq3q: 'What are the limitations of Markdown tables?',
    faq3a: 'Markdown tables have some limitations: no cell merging (colspan/rowspan), no nested tables, limited formatting within cells (only inline elements like bold, italic, code, and links work). For complex tables, consider using HTML tables directly in your Markdown document.',
    faq4q: 'How do I set column alignment in Markdown tables?',
    faq4a: 'Column alignment is controlled by the separator row (second row). Use :--- for left align (default), :---: for center align, and ---: for right align. The colons in the separator row determine how text is aligned within each column.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Markdown 表格生成器',
    description: '使用可视化编辑器生成 Markdown 表格。添加或删除行列、设置对齐方式，一键复制 Markdown 输出。',
    rows: '行', cols: '列',
    addRow: '+ 行', addCol: '+ 列', removeRow: '- 行', removeCol: '- 列',
    clear: '全部清除', loadSample: '加载示例',
    outputLabel: 'Markdown 输出', previewLabel: '预览',
    alignLeft: '左对齐', alignCenter: '居中', alignRight: '右对齐',
    headerPlaceholder: '表头', cellPlaceholder: '单元格',
    introTitle: '免费在线 Markdown 表格生成器',
    introText: '无需记忆语法即可可视化创建 Markdown 表格。在网格中编辑单元格、添加或删除行列、设置列对齐方式。实时生成有效的 Markdown 表格语法。适用于 GitHub README、文档、博客等。',
    cheatTitle: 'Markdown 表格语法参考',
    ruleCol: '功能', descCol: '语法', exampleCol: '说明',
    rule1: '基本表格', rule1Desc: '| 列1 | 列2 |', rule1Ex: '竖线分隔列',
    rule2: '表头分隔', rule2Desc: '|------|------|', rule2Ex: '破折号分隔表头和内容',
    rule3: '左对齐', rule3Desc: '|:-----|', rule3Ex: '冒号在左侧',
    rule4: '居中', rule4Desc: '|:----:|', rule4Ex: '冒号在两侧',
    rule5: '右对齐', rule5Desc: '|-----:|', rule5Ex: '冒号在右侧',
    faqTitle: '常见问题',
    faq1q: 'Markdown 表格如何工作？', faq1a: 'Markdown 表格使用竖线(|)分隔列，使用破折号(-)分隔表头和数据行。对齐行使用冒号指示左、中、右对齐。',
    faq2q: '可以在 GitHub 中使用 Markdown 表格吗？', faq2a: '是的，GitHub Flavored Markdown (GFM) 完全支持表格。可在 README、Issue、PR、评论和 Wiki 页面中使用。',
    faq3q: 'Markdown 表格有什么限制？', faq3a: '不支持合并单元格、嵌套表格，单元格内只能使用内联元素（粗体、斜体、代码、链接）。复杂表格建议直接使用 HTML 表格。',
    faq4q: '如何设置列对齐？', faq4a: '通过分隔行控制：:--- 左对齐（默认），:---: 居中对齐，---: 右对齐。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Generateur de Tableaux Markdown',
    description: 'Generez des tableaux Markdown avec un editeur visuel. Ajoutez ou supprimez des lignes et colonnes.',
    rows: 'Lignes', cols: 'Colonnes',
    addRow: '+ Ligne', addCol: '+ Colonne', removeRow: '- Ligne', removeCol: '- Colonne',
    clear: 'Tout effacer', loadSample: 'Charger un exemple',
    outputLabel: 'Sortie Markdown', previewLabel: 'Apercu',
    alignLeft: 'Gauche', alignCenter: 'Centre', alignRight: 'Droite',
    headerPlaceholder: 'En-tete', cellPlaceholder: 'Cellule',
    introTitle: 'Generateur de tableaux Markdown gratuit', introText: 'Creez des tableaux Markdown visuellement sans memoriser la syntaxe.',
    cheatTitle: 'Syntaxe des tableaux Markdown', ruleCol: 'Fonction', descCol: 'Syntaxe', exampleCol: 'Description',
    rule1: 'Tableau simple', rule1Desc: '| Col1 | Col2 |', rule1Ex: 'Les pipes separent les colonnes',
    rule2: 'Separateur', rule2Desc: '|------|------|', rule2Ex: 'Tirets separent l\'en-tete du corps',
    rule3: 'Aligner a gauche', rule3Desc: '|:-----|', rule3Ex: 'Deux-points a gauche',
    rule4: 'Centrer', rule4Desc: '|:----:|', rule4Ex: 'Deux-points des deux cotes',
    rule5: 'Aligner a droite', rule5Desc: '|-----:|', rule5Ex: 'Deux-points a droite',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionnent les tableaux Markdown?', faq1a: 'Ils utilisent des pipes (|) pour les colonnes et des tirets (-) pour separer l\'en-tete.',
    faq2q: 'Compatible avec GitHub?', faq2a: 'Oui, GitHub Flavored Markdown supporte les tableaux.',
    faq3q: 'Quelles limitations?', faq3a: 'Pas de fusion de cellules, pas de tableaux imbriques, formatage inline uniquement.',
    faq4q: 'Comment aligner les colonnes?', faq4a: ':--- gauche, :---: centre, ---: droite.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Markdown Tabellen Generator',
    description: 'Markdown-Tabellen mit einem visuellen Editor erstellen. Zeilen und Spalten hinzufuegen oder entfernen.',
    rows: 'Zeilen', cols: 'Spalten',
    addRow: '+ Zeile', addCol: '+ Spalte', removeRow: '- Zeile', removeCol: '- Spalte',
    clear: 'Alles loeschen', loadSample: 'Beispiel laden',
    outputLabel: 'Markdown-Ausgabe', previewLabel: 'Vorschau',
    alignLeft: 'Links', alignCenter: 'Zentriert', alignRight: 'Rechts',
    headerPlaceholder: 'Kopfzeile', cellPlaceholder: 'Zelle',
    introTitle: 'Kostenloser Markdown Tabellen Generator', introText: 'Erstellen Sie Markdown-Tabellen visuell ohne die Syntax auswendig zu kennen.',
    cheatTitle: 'Markdown-Tabellensyntax', ruleCol: 'Funktion', descCol: 'Syntax', exampleCol: 'Beschreibung',
    rule1: 'Einfache Tabelle', rule1Desc: '| Sp1 | Sp2 |', rule1Ex: 'Pipes trennen Spalten',
    rule2: 'Trennzeile', rule2Desc: '|------|------|', rule2Ex: 'Striche trennen Kopf vom Koerper',
    rule3: 'Linksbuendig', rule3Desc: '|:-----|', rule3Ex: 'Doppelpunkt links',
    rule4: 'Zentriert', rule4Desc: '|:----:|', rule4Ex: 'Doppelpunkte beidseitig',
    rule5: 'Rechtsbuendig', rule5Desc: '|-----:|', rule5Ex: 'Doppelpunkt rechts',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktionieren Markdown-Tabellen?', faq1a: 'Pipes (|) fuer Spalten und Striche (-) fuer die Trennung von Kopf und Koerper.',
    faq2q: 'GitHub-kompatibel?', faq2a: 'Ja, GitHub Flavored Markdown unterstuetzt Tabellen.',
    faq3q: 'Welche Einschraenkungen?', faq3a: 'Keine Zellenverschmelzung, keine verschachtelten Tabellen, nur Inline-Formatierung.',
    faq4q: 'Wie werden Spalten ausgerichtet?', faq4a: ':--- links, :---: zentriert, ---: rechts.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Generador de Tablas Markdown',
    description: 'Genera tablas Markdown con un editor visual. Agrega o elimina filas y columnas.',
    rows: 'Filas', cols: 'Columnas',
    addRow: '+ Fila', addCol: '+ Columna', removeRow: '- Fila', removeCol: '- Columna',
    clear: 'Limpiar todo', loadSample: 'Cargar ejemplo',
    outputLabel: 'Salida Markdown', previewLabel: 'Vista previa',
    alignLeft: 'Izquierda', alignCenter: 'Centro', alignRight: 'Derecha',
    headerPlaceholder: 'Encabezado', cellPlaceholder: 'Celda',
    introTitle: 'Generador de tablas Markdown gratuito', introText: 'Cree tablas Markdown visualmente sin memorizar la sintaxis.',
    cheatTitle: 'Sintaxis de tablas Markdown', ruleCol: 'Funcion', descCol: 'Sintaxis', exampleCol: 'Descripcion',
    rule1: 'Tabla basica', rule1Desc: '| Col1 | Col2 |', rule1Ex: 'Pipes separan columnas',
    rule2: 'Separador', rule2Desc: '|------|------|', rule2Ex: 'Guiones separan encabezado del cuerpo',
    rule3: 'Izquierda', rule3Desc: '|:-----|', rule3Ex: 'Dos puntos a la izquierda',
    rule4: 'Centro', rule4Desc: '|:----:|', rule4Ex: 'Dos puntos en ambos lados',
    rule5: 'Derecha', rule5Desc: '|-----:|', rule5Ex: 'Dos puntos a la derecha',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funcionan las tablas Markdown?', faq1a: 'Usan pipes (|) para columnas y guiones (-) para separar el encabezado.',
    faq2q: 'Compatible con GitHub?', faq2a: 'Si, GitHub Flavored Markdown soporta tablas.',
    faq3q: 'Que limitaciones tienen?', faq3a: 'No hay fusion de celdas, ni tablas anidadas, solo formato inline.',
    faq4q: 'Como se alinean las columnas?', faq4a: ':--- izquierda, :---: centro, ---: derecha.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Markdown テーブル生成器',
    description: 'ビジュアルエディターで Markdown テーブルを生成。行列の追加・削除、配置設定、Markdown 出力のコピー。',
    rows: '行', cols: '列',
    addRow: '+ 行', addCol: '+ 列', removeRow: '- 行', removeCol: '- 列',
    clear: 'すべてクリア', loadSample: 'サンプル読込',
    outputLabel: 'Markdown 出力', previewLabel: 'プレビュー',
    alignLeft: '左揃え', alignCenter: '中央揃え', alignRight: '右揃え',
    headerPlaceholder: 'ヘッダー', cellPlaceholder: 'セル',
    introTitle: '無料 Markdown テーブル生成器', introText: '構文を覚えなくても視覚的に Markdown テーブルを作成できます。',
    cheatTitle: 'Markdown テーブル構文', ruleCol: '機能', descCol: '構文', exampleCol: '説明',
    rule1: '基本テーブル', rule1Desc: '| 列1 | 列2 |', rule1Ex: 'パイプで列を区切る',
    rule2: '区切り行', rule2Desc: '|------|------|', rule2Ex: 'ダッシュでヘッダーと本体を区切る',
    rule3: '左揃え', rule3Desc: '|:-----|', rule3Ex: 'コロンが左側',
    rule4: '中央揃え', rule4Desc: '|:----:|', rule4Ex: 'コロンが両側',
    rule5: '右揃え', rule5Desc: '|-----:|', rule5Ex: 'コロンが右側',
    faqTitle: 'よくある質問',
    faq1q: 'Markdown テーブルの仕組みは？', faq1a: 'パイプ(|)で列を区切り、ダッシュ(-)でヘッダーとボディを分けます。',
    faq2q: 'GitHub で使えますか？', faq2a: 'はい、GitHub Flavored Markdown はテーブルをサポートしています。',
    faq3q: '制限は？', faq3a: 'セル結合、入れ子テーブルは不可。インライン書式のみ対応。',
    faq4q: '列の配置を設定するには？', faq4a: ':--- 左揃え、:---: 中央揃え、---: 右揃え。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Markdown 테이블 생성기',
    description: '비주얼 편집기로 Markdown 테이블을 생성합니다. 행/열 추가, 정렬 설정, Markdown 출력 복사.',
    rows: '행', cols: '열',
    addRow: '+ 행', addCol: '+ 열', removeRow: '- 행', removeCol: '- 열',
    clear: '모두 지우기', loadSample: '샘플 로드',
    outputLabel: 'Markdown 출력', previewLabel: '미리보기',
    alignLeft: '왼쪽', alignCenter: '가운데', alignRight: '오른쪽',
    headerPlaceholder: '헤더', cellPlaceholder: '셀',
    introTitle: '무료 Markdown 테이블 생성기', introText: '문법을 외우지 않고도 시각적으로 Markdown 테이블을 만들 수 있습니다.',
    cheatTitle: 'Markdown 테이블 구문', ruleCol: '기능', descCol: '구문', exampleCol: '설명',
    rule1: '기본 테이블', rule1Desc: '| 열1 | 열2 |', rule1Ex: '파이프로 열 구분',
    rule2: '구분 행', rule2Desc: '|------|------|', rule2Ex: '대시로 헤더와 본문 구분',
    rule3: '왼쪽 정렬', rule3Desc: '|:-----|', rule3Ex: '콜론이 왼쪽',
    rule4: '가운데 정렬', rule4Desc: '|:----:|', rule4Ex: '콜론이 양쪽',
    rule5: '오른쪽 정렬', rule5Desc: '|-----:|', rule5Ex: '콜론이 오른쪽',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Markdown 테이블은 어떻게 작동하나요?', faq1a: '파이프(|)로 열을 구분하고 대시(-)로 헤더와 본문을 구분합니다.',
    faq2q: 'GitHub에서 사용할 수 있나요?', faq2a: '네, GitHub Flavored Markdown은 테이블을 지원합니다.',
    faq3q: '제한 사항은?', faq3a: '셀 병합, 중첩 테이블 불가. 인라인 서식만 지원.',
    faq4q: '열 정렬을 설정하려면?', faq4a: ':--- 왼쪽, :---: 가운데, ---: 오른쪽.',
    relatedTitle: '관련 도구',
  },
};

export default function MarkdownTableGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [headers, setHeaders] = useState<string[]>(['Column 1', 'Column 2', 'Column 3']);
  const [aligns, setAligns] = useState<Align[]>(['left', 'left', 'left']);
  const [rows, setRows] = useState<string[][]>([['', '', ''], ['', '', '']]);

  const updateHeader = useCallback((col: number, value: string) => {
    setHeaders(prev => { const n = [...prev]; n[col] = value; return n; });
  }, []);

  const updateCell = useCallback((row: number, col: number, value: string) => {
    setRows(prev => { const n = prev.map(r => [...r]); n[row][col] = value; return n; });
  }, []);

  const updateAlign = useCallback((col: number, value: Align) => {
    setAligns(prev => { const n = [...prev]; n[col] = value; return n; });
  }, []);

  const addRow = () => setRows(prev => [...prev, new Array(headers.length).fill('')]);
  const addCol = () => {
    setHeaders(prev => [...prev, `Column ${prev.length + 1}`]);
    setAligns(prev => [...prev, 'left']);
    setRows(prev => prev.map(r => [...r, '']));
  };

  const removeRow = () => {
    if (rows.length <= 1) return;
    setRows(prev => prev.slice(0, -1));
  };
  const removeCol = () => {
    if (headers.length <= 1) return;
    setHeaders(prev => prev.slice(0, -1));
    setAligns(prev => prev.slice(0, -1));
    setRows(prev => prev.map(r => r.slice(0, -1)));
  };

  const clearAll = () => {
    setHeaders(['Column 1', 'Column 2', 'Column 3']);
    setAligns(['left', 'left', 'left']);
    setRows([['', '', ''], ['', '', '']]);
  };

  const loadSample = () => {
    setHeaders(['Feature', 'Free Plan', 'Pro Plan', 'Enterprise']);
    setAligns(['left', 'center', 'center', 'center']);
    setRows([
      ['Storage', '5 GB', '100 GB', 'Unlimited'],
      ['Users', '1', '10', 'Unlimited'],
      ['API Access', 'No', 'Yes', 'Yes'],
      ['Support', 'Community', 'Email', '24/7 Phone'],
      ['Price', '$0/mo', '$19/mo', 'Contact Us'],
    ]);
  };

  // Generate Markdown
  const generateMarkdown = (): string => {
    const escape = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
    const colWidths = headers.map((h, i) => Math.max(h.length, ...rows.map(r => (r[i] || '').length), 3));

    const pad = (s: string, w: number, align: Align) => {
      const diff = Math.max(0, w - s.length);
      if (align === 'center') { const l = Math.floor(diff / 2); return ' '.repeat(l) + s + ' '.repeat(diff - l); }
      if (align === 'right') return ' '.repeat(diff) + s;
      return s + ' '.repeat(diff);
    };

    const headerLine = '| ' + headers.map((h, i) => pad(escape(h), colWidths[i], aligns[i])).join(' | ') + ' |';
    const sepLine = '| ' + headers.map((_, i) => {
      const w = colWidths[i];
      const a = aligns[i];
      if (a === 'center') return ':' + '-'.repeat(Math.max(1, w - 2)) + ':';
      if (a === 'right') return '-'.repeat(Math.max(1, w - 1)) + ':';
      return ':' + '-'.repeat(Math.max(1, w - 1));
    }).join(' | ') + ' |';
    const bodyLines = rows.map(row =>
      '| ' + row.map((cell, i) => pad(escape(cell || ''), colWidths[i], aligns[i])).join(' | ') + ' |'
    );

    return [headerLine, sepLine, ...bodyLines].join('\n');
  };

  const markdown = generateMarkdown();

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

  const alignBtnStyle = (active: boolean) => ({
    padding: '2px 8px', fontSize: 11, borderRadius: 4, cursor: 'pointer',
    border: `1px solid ${active ? 'var(--accent-blue)' : 'var(--border-color)'}`,
    background: active ? 'rgba(59,130,246,0.1)' : 'transparent',
    color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
  });

  return (
    <ToolLayout title={t.title} description={t.description} toolId="markdown-table-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={addRow} className="btn btn-secondary">{t.addRow}</button>
        <button onClick={addCol} className="btn btn-secondary">{t.addCol}</button>
        <button onClick={removeRow} className="btn btn-secondary" disabled={rows.length <= 1}>{t.removeRow}</button>
        <button onClick={removeCol} className="btn btn-secondary" disabled={headers.length <= 1}>{t.removeCol}</button>
        <button onClick={clearAll} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-secondary)', alignSelf: 'center' }}>
          {headers.length} {t.cols} x {rows.length} {t.rows}
        </span>
      </div>

      {/* Visual editor */}
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: headers.length * 140 }}>
          {/* Alignment row */}
          <thead>
            <tr>
              {headers.map((_, ci) => (
                <th key={ci} style={{ padding: '4px 6px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    {(['left', 'center', 'right'] as Align[]).map(a => (
                      <button key={a} onClick={() => updateAlign(ci, a)} style={alignBtnStyle(aligns[ci] === a)}>
                        {a === 'left' ? t.alignLeft : a === 'center' ? t.alignCenter : t.alignRight}
                      </button>
                    ))}
                  </div>
                </th>
              ))}
            </tr>
            {/* Header inputs */}
            <tr style={{ background: 'var(--bg-input)' }}>
              {headers.map((h, ci) => (
                <th key={ci} style={{ padding: 4 }}>
                  <input
                    value={h}
                    onChange={e => updateHeader(ci, e.target.value)}
                    placeholder={`${t.headerPlaceholder} ${ci + 1}`}
                    style={{ width: '100%', padding: '6px 8px', fontSize: 13, fontWeight: 700, textAlign: aligns[ci], border: '1px solid var(--border-color)', borderRadius: 4, background: 'transparent' }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: 4 }}>
                    <input
                      value={cell}
                      onChange={e => updateCell(ri, ci, e.target.value)}
                      placeholder={`${t.cellPlaceholder} ${ri + 1},${ci + 1}`}
                      style={{ width: '100%', padding: '6px 8px', fontSize: 13, textAlign: aligns[ci], border: '1px solid var(--border-color)', borderRadius: 4, background: 'transparent' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Markdown output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
          <CopyButton text={markdown} />
        </div>
        <textarea value={markdown} readOnly style={{ minHeight: 160, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* Preview */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.previewLabel}</label>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'auto', padding: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                {headers.map((h, i) => (
                  <th key={i} style={{ padding: '8px 12px', textAlign: aligns[i] }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '8px 12px', textAlign: aligns[ci], color: cell ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {cell || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.ruleCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.exampleCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.rule1, t.rule1Desc, t.rule1Ex],
                [t.rule2, t.rule2Desc, t.rule2Ex],
                [t.rule3, t.rule3Desc, t.rule3Ex],
                [t.rule4, t.rule4Desc, t.rule4Ex],
                [t.rule5, t.rule5Desc, t.rule5Ex],
              ].map(([rule, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{rule}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{desc}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{ex}</td>
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
            { href: `/${lang}/tools/markdown-preview`, label: 'Markdown Preview' },
            { href: `/${lang}/tools/html-to-markdown`, label: 'HTML to Markdown' },
            { href: `/${lang}/tools/csv-json`, label: 'CSV to JSON' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
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
