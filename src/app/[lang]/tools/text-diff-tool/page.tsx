'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Text Diff Tool',
    description: 'Compare two texts side by side. Highlight additions, deletions, and changes line by line.',
    originalLabel: 'Original Text',
    modifiedLabel: 'Modified Text',
    compareBtn: 'Compare',
    clearBtn: 'Clear',
    loadSampleBtn: 'Load Sample',
    statsLabel: 'Summary',
    addedLines: 'added',
    removedLines: 'removed',
    unchangedLines: 'unchanged',
    noChanges: 'No differences found — texts are identical.',
    copyDiff: 'Copy Diff',
    placeholder: 'Paste original text here...',
    placeholder2: 'Paste modified text here...',
    viewLabel: 'View',
    sideBySide: 'Side by Side',
    unified: 'Unified',
  },
  fr: { title: 'Outil de Diff Texte', description: 'Comparez deux textes côte à côte.', originalLabel: 'Texte original', modifiedLabel: 'Texte modifié', compareBtn: 'Comparer', clearBtn: 'Effacer', loadSampleBtn: 'Exemple', statsLabel: 'Résumé', addedLines: 'ajoutées', removedLines: 'supprimées', unchangedLines: 'inchangées', noChanges: 'Aucune différence — les textes sont identiques.', copyDiff: 'Copier le diff', placeholder: 'Collez le texte original...', placeholder2: 'Collez le texte modifié...', viewLabel: 'Affichage', sideBySide: 'Côte à côte', unified: 'Unifié' },
  de: { title: 'Text Diff Tool', description: 'Zwei Texte nebeneinander vergleichen.', originalLabel: 'Originaltext', modifiedLabel: 'Geänderter Text', compareBtn: 'Vergleichen', clearBtn: 'Löschen', loadSampleBtn: 'Beispiel laden', statsLabel: 'Zusammenfassung', addedLines: 'hinzugefügt', removedLines: 'entfernt', unchangedLines: 'unverändert', noChanges: 'Keine Unterschiede — Texte sind identisch.', copyDiff: 'Diff kopieren', placeholder: 'Originaltext einfügen...', placeholder2: 'Geänderten Text einfügen...', viewLabel: 'Ansicht', sideBySide: 'Nebeneinander', unified: 'Vereint' },
  it: { title: 'Strumento Diff Testo', description: 'Confronta due testi affiancati.', originalLabel: 'Testo originale', modifiedLabel: 'Testo modificato', compareBtn: 'Confronta', clearBtn: 'Cancella', loadSampleBtn: 'Esempio', statsLabel: 'Riepilogo', addedLines: 'aggiunte', removedLines: 'rimosse', unchangedLines: 'invariate', noChanges: 'Nessuna differenza — i testi sono identici.', copyDiff: 'Copia diff', placeholder: 'Incolla il testo originale...', placeholder2: 'Incolla il testo modificato...', viewLabel: 'Vista', sideBySide: 'Affiancati', unified: 'Unificato' },
  es: { title: 'Herramienta de Diff de Texto', description: 'Compara dos textos lado a lado.', originalLabel: 'Texto original', modifiedLabel: 'Texto modificado', compareBtn: 'Comparar', clearBtn: 'Limpiar', loadSampleBtn: 'Ejemplo', statsLabel: 'Resumen', addedLines: 'añadidas', removedLines: 'eliminadas', unchangedLines: 'sin cambios', noChanges: 'Sin diferencias — los textos son idénticos.', copyDiff: 'Copiar diff', placeholder: 'Pega el texto original...', placeholder2: 'Pega el texto modificado...', viewLabel: 'Vista', sideBySide: 'Lado a lado', unified: 'Unificado' },
  pt: { title: 'Ferramenta de Diff de Texto', description: 'Compare dois textos lado a lado.', originalLabel: 'Texto original', modifiedLabel: 'Texto modificado', compareBtn: 'Comparar', clearBtn: 'Limpar', loadSampleBtn: 'Exemplo', statsLabel: 'Resumo', addedLines: 'adicionadas', removedLines: 'removidas', unchangedLines: 'inalteradas', noChanges: 'Sem diferenças — os textos são idênticos.', copyDiff: 'Copiar diff', placeholder: 'Cole o texto original...', placeholder2: 'Cole o texto modificado...', viewLabel: 'Visualização', sideBySide: 'Lado a lado', unified: 'Unificado' },
  nl: { title: 'Tekst Diff Tool', description: 'Vergelijk twee teksten naast elkaar.', originalLabel: 'Originele tekst', modifiedLabel: 'Gewijzigde tekst', compareBtn: 'Vergelijk', clearBtn: 'Wissen', loadSampleBtn: 'Voorbeeld', statsLabel: 'Samenvatting', addedLines: 'toegevoegd', removedLines: 'verwijderd', unchangedLines: 'ongewijzigd', noChanges: 'Geen verschillen — teksten zijn identiek.', copyDiff: 'Diff kopiëren', placeholder: 'Plak originele tekst...', placeholder2: 'Plak gewijzigde tekst...', viewLabel: 'Weergave', sideBySide: 'Naast elkaar', unified: 'Samengevoegd' },
  pl: { title: 'Narzędzie Diff Tekstu', description: 'Porównaj dwa teksty obok siebie.', originalLabel: 'Tekst oryginalny', modifiedLabel: 'Tekst zmodyfikowany', compareBtn: 'Porównaj', clearBtn: 'Wyczyść', loadSampleBtn: 'Przykład', statsLabel: 'Podsumowanie', addedLines: 'dodane', removedLines: 'usunięte', unchangedLines: 'niezmienione', noChanges: 'Brak różnic — teksty są identyczne.', copyDiff: 'Kopiuj diff', placeholder: 'Wklej oryginalny tekst...', placeholder2: 'Wklej zmodyfikowany tekst...', viewLabel: 'Widok', sideBySide: 'Obok siebie', unified: 'Zunifikowany' },
  sv: { title: 'Text Diff-verktyg', description: 'Jämför två texter sida vid sida.', originalLabel: 'Originaltext', modifiedLabel: 'Ändrad text', compareBtn: 'Jämför', clearBtn: 'Rensa', loadSampleBtn: 'Exempel', statsLabel: 'Sammanfattning', addedLines: 'tillagda', removedLines: 'borttagna', unchangedLines: 'oförändrade', noChanges: 'Inga skillnader — texterna är identiska.', copyDiff: 'Kopiera diff', placeholder: 'Klistra in originaltext...', placeholder2: 'Klistra in ändrad text...', viewLabel: 'Vy', sideBySide: 'Sida vid sida', unified: 'Enhetlig' },
  no: { title: 'Tekst Diff-verktøy', description: 'Sammenlign to tekster side om side.', originalLabel: 'Originaltekst', modifiedLabel: 'Endret tekst', compareBtn: 'Sammenlign', clearBtn: 'Tøm', loadSampleBtn: 'Eksempel', statsLabel: 'Sammendrag', addedLines: 'lagt til', removedLines: 'fjernet', unchangedLines: 'uendret', noChanges: 'Ingen forskjeller — tekstene er identiske.', copyDiff: 'Kopier diff', placeholder: 'Lim inn originaltekst...', placeholder2: 'Lim inn endret tekst...', viewLabel: 'Visning', sideBySide: 'Side om side', unified: 'Samlet' },
  zh: { title: '文本差异对比工具', description: '并排比较两段文本，高亮显示新增、删除和修改。', originalLabel: '原始文本', modifiedLabel: '修改后文本', compareBtn: '比较', clearBtn: '清除', loadSampleBtn: '加载示例', statsLabel: '摘要', addedLines: '新增', removedLines: '删除', unchangedLines: '未变', noChanges: '没有差异 — 两段文本完全相同。', copyDiff: '复制差异', placeholder: '粘贴原始文本...', placeholder2: '粘贴修改后文本...', viewLabel: '视图', sideBySide: '并排', unified: '统一' },
  ja: { title: 'テキスト差分ツール', description: '2つのテキストを並べて比較。追加・削除・変更を行単位でハイライト。', originalLabel: '元のテキスト', modifiedLabel: '変更後のテキスト', compareBtn: '比較', clearBtn: 'クリア', loadSampleBtn: 'サンプル', statsLabel: 'サマリー', addedLines: '追加', removedLines: '削除', unchangedLines: '変更なし', noChanges: '差分なし — テキストは同一です。', copyDiff: '差分をコピー', placeholder: '元のテキストを貼り付け...', placeholder2: '変更後のテキストを貼り付け...', viewLabel: '表示', sideBySide: '並列表示', unified: '統合表示' },
  ko: { title: '텍스트 Diff 도구', description: '두 텍스트를 나란히 비교하고 추가/삭제/변경 사항을 강조 표시합니다.', originalLabel: '원본 텍스트', modifiedLabel: '수정된 텍스트', compareBtn: '비교', clearBtn: '지우기', loadSampleBtn: '샘플', statsLabel: '요약', addedLines: '추가됨', removedLines: '제거됨', unchangedLines: '변경없음', noChanges: '차이 없음 — 텍스트가 동일합니다.', copyDiff: 'Diff 복사', placeholder: '원본 텍스트 붙여넣기...', placeholder2: '수정된 텍스트 붙여넣기...', viewLabel: '보기', sideBySide: '나란히', unified: '통합' },
  id: { title: 'Alat Diff Teks', description: 'Bandingkan dua teks secara berdampingan.', originalLabel: 'Teks Asli', modifiedLabel: 'Teks Dimodifikasi', compareBtn: 'Bandingkan', clearBtn: 'Hapus', loadSampleBtn: 'Contoh', statsLabel: 'Ringkasan', addedLines: 'ditambahkan', removedLines: 'dihapus', unchangedLines: 'tidak berubah', noChanges: 'Tidak ada perbedaan — teks identik.', copyDiff: 'Salin Diff', placeholder: 'Tempel teks asli...', placeholder2: 'Tempel teks yang dimodifikasi...', viewLabel: 'Tampilan', sideBySide: 'Berdampingan', unified: 'Terpadu' },
  th: { title: 'เครื่องมือเปรียบเทียบข้อความ', description: 'เปรียบเทียบข้อความสองส่วนเคียงข้างกัน', originalLabel: 'ข้อความต้นฉบับ', modifiedLabel: 'ข้อความที่แก้ไข', compareBtn: 'เปรียบเทียบ', clearBtn: 'ล้าง', loadSampleBtn: 'ตัวอย่าง', statsLabel: 'สรุป', addedLines: 'เพิ่ม', removedLines: 'ลบ', unchangedLines: 'ไม่เปลี่ยน', noChanges: 'ไม่มีความแตกต่าง — ข้อความเหมือนกัน', copyDiff: 'คัดลอก Diff', placeholder: 'วางข้อความต้นฉบับ...', placeholder2: 'วางข้อความที่แก้ไข...', viewLabel: 'มุมมอง', sideBySide: 'เคียงข้าง', unified: 'รวมกัน' },
};

const SAMPLE_ORIGINAL = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const users = ["Alice", "Bob"];
users.forEach(u => greet(u));`;

const SAMPLE_MODIFIED = `function greet(name, greeting = "Hello") {
  console.log(\`\${greeting}, \${name}!\`);
  return { success: true, name };
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach(u => greet(u, "Hi"));`;

type DiffType = 'added' | 'removed' | 'unchanged';
interface DiffLine { type: DiffType; text: string; lineNum?: number; lineNum2?: number }

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split('\n');
  const modLines = modified.split('\n');

  // Simple LCS-based diff
  const m = origLines.length;
  const n = modLines.length;

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Trace back
  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.unshift({ type: 'unchanged', text: origLines[i - 1], lineNum: i, lineNum2: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', text: modLines[j - 1], lineNum2: j });
      j--;
    } else {
      result.unshift({ type: 'removed', text: origLines[i - 1], lineNum: i });
      i--;
    }
  }
  return result;
}

export default function TextDiffTool() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diff, setDiff] = useState<DiffLine[] | null>(null);
  const [view, setView] = useState<'side' | 'unified'>('unified');

  const compare = useCallback(() => {
    if (!original && !modified) return;
    setDiff(computeDiff(original, modified));
  }, [original, modified]);

  const loadSample = () => {
    setOriginal(SAMPLE_ORIGINAL);
    setModified(SAMPLE_MODIFIED);
    setDiff(computeDiff(SAMPLE_ORIGINAL, SAMPLE_MODIFIED));
  };

  const stats = diff
    ? {
        added: diff.filter(d => d.type === 'added').length,
        removed: diff.filter(d => d.type === 'removed').length,
        unchanged: diff.filter(d => d.type === 'unchanged').length,
      }
    : null;

  const unifiedDiffText = diff
    ? diff.map(d => (d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  ') + d.text).join('\n')
    : '';

  const getLineStyle = (type: DiffType): React.CSSProperties => {
    if (type === 'added') return { background: 'rgba(34,197,94,0.12)', borderLeft: '3px solid #22c55e' };
    if (type === 'removed') return { background: 'rgba(244,63,94,0.12)', borderLeft: '3px solid #f43f5e' };
    return { borderLeft: '3px solid transparent' };
  };

  const getLinePrefix = (type: DiffType) => {
    if (type === 'added') return <span style={{ color: '#22c55e', fontWeight: 700, marginRight: 8, userSelect: 'none' }}>+</span>;
    if (type === 'removed') return <span style={{ color: '#f43f5e', fontWeight: 700, marginRight: 8, userSelect: 'none' }}>-</span>;
    return <span style={{ color: 'var(--text-secondary)', marginRight: 8, userSelect: 'none' }}>&nbsp;</span>;
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="text-diff-tool">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.originalLabel}</label>
          <textarea
            value={original}
            onChange={e => setOriginal(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.modifiedLabel}</label>
          <textarea
            value={modified}
            onChange={e => setModified(e.target.value)}
            placeholder={t.placeholder2}
            style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={compare} className="btn btn-primary">{t.compareBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSampleBtn}</button>
        <button onClick={() => { setOriginal(''); setModified(''); setDiff(null); }} className="btn btn-secondary">{t.clearBtn}</button>
        {diff && (
          <>
            <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>|</span>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.viewLabel}:</label>
            <button onClick={() => setView('unified')} className={view === 'unified' ? 'btn btn-primary' : 'btn btn-secondary'} style={{ fontSize: 12 }}>{t.unified}</button>
            <button onClick={() => setView('side')} className={view === 'side' ? 'btn btn-primary' : 'btn btn-secondary'} style={{ fontSize: 12 }}>{t.sideBySide}</button>
            <div style={{ marginLeft: 'auto' }}>
              <CopyButton text={unifiedDiffText} />
            </div>
          </>
        )}
      </div>

      {diff && stats && (
        <>
          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, padding: '10px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13 }}>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>+{stats.added}</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: 4 }}>{t.addedLines}</span>
            </span>
            <span style={{ fontSize: 13 }}>
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>-{stats.removed}</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: 4 }}>{t.removedLines}</span>
            </span>
            <span style={{ fontSize: 13 }}>
              <span style={{ fontWeight: 700 }}>{stats.unchanged}</span>
              <span style={{ color: 'var(--text-secondary)', marginLeft: 4 }}>{t.unchangedLines}</span>
            </span>
            {stats.added === 0 && stats.removed === 0 && (
              <span style={{ color: 'var(--accent-blue)', fontSize: 13 }}>{t.noChanges}</span>
            )}
          </div>

          {/* Unified diff view */}
          {view === 'unified' && (
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', fontFamily: 'monospace', fontSize: 12 }}>
              {diff.map((line, idx) => (
                <div key={idx} style={{ display: 'flex', ...getLineStyle(line.type), padding: '2px 0' }}>
                  <span style={{ minWidth: 36, textAlign: 'right', padding: '0 8px', color: 'var(--text-secondary)', userSelect: 'none', fontSize: 11 }}>
                    {line.lineNum ?? ''}
                  </span>
                  <span style={{ minWidth: 36, textAlign: 'right', padding: '0 8px', color: 'var(--text-secondary)', userSelect: 'none', fontSize: 11 }}>
                    {line.lineNum2 ?? ''}
                  </span>
                  {getLinePrefix(line.type)}
                  <span style={{ flex: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-all', padding: '0 8px 0 0' }}>{line.text || ' '}</span>
                </div>
              ))}
            </div>
          )}

          {/* Side by side view */}
          {view === 'side' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', fontFamily: 'monospace', fontSize: 12 }}>
              <div style={{ borderRight: '2px solid var(--border-color)' }}>
                {diff.filter(d => d.type !== 'added').map((line, idx) => (
                  <div key={idx} style={{ ...getLineStyle(line.type), padding: '2px 8px', display: 'flex', gap: 8 }}>
                    <span style={{ minWidth: 28, textAlign: 'right', color: 'var(--text-secondary)', userSelect: 'none', fontSize: 11 }}>{line.lineNum}</span>
                    <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>{line.text || ' '}</span>
                  </div>
                ))}
              </div>
              <div>
                {diff.filter(d => d.type !== 'removed').map((line, idx) => (
                  <div key={idx} style={{ ...getLineStyle(line.type), padding: '2px 8px', display: 'flex', gap: 8 }}>
                    <span style={{ minWidth: 28, textAlign: 'right', color: 'var(--text-secondary)', userSelect: 'none', fontSize: 11 }}>{line.lineNum2}</span>
                    <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', flex: 1 }}>{line.text || ' '}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </ToolLayout>
  );
}
