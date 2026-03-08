'use client';

import { useState, useEffect, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

interface ModelPricing {
  name: string;
  inputPer1k: number;
  outputPer1k: number;
  contextWindow: string;
}

const MODELS: ModelPricing[] = [
  { name: 'GPT-4o', inputPer1k: 0.0025, outputPer1k: 0.01, contextWindow: '128K' },
  { name: 'GPT-4o mini', inputPer1k: 0.00015, outputPer1k: 0.0006, contextWindow: '128K' },
  { name: 'GPT-4 Turbo', inputPer1k: 0.01, outputPer1k: 0.03, contextWindow: '128K' },
  { name: 'Claude 3.5 Sonnet', inputPer1k: 0.003, outputPer1k: 0.015, contextWindow: '200K' },
  { name: 'Claude 3 Haiku', inputPer1k: 0.00025, outputPer1k: 0.00125, contextWindow: '200K' },
  { name: 'Claude 3 Opus', inputPer1k: 0.015, outputPer1k: 0.075, contextWindow: '200K' },
  { name: 'Gemini 1.5 Pro', inputPer1k: 0.00125, outputPer1k: 0.005, contextWindow: '1M' },
  { name: 'Gemini 1.5 Flash', inputPer1k: 0.000075, outputPer1k: 0.0003, contextWindow: '1M' },
  { name: 'Llama 3.1 70B', inputPer1k: 0.00059, outputPer1k: 0.00079, contextWindow: '128K' },
  { name: 'Mistral Large', inputPer1k: 0.002, outputPer1k: 0.006, contextWindow: '128K' },
];

// Approximate token count: ~4 chars per token for English, ~2 for CJK
function estimateTokens(text: string): number {
  if (!text) return 0;
  let tokens = 0;
  // CJK characters count as ~1 token per 1-2 chars
  const cjkPattern = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g;
  const cjkChars = text.match(cjkPattern)?.length || 0;
  const nonCjkText = text.replace(cjkPattern, '');
  // English: ~4 chars per token, split by whitespace/punctuation
  const words = nonCjkText.split(/\s+/).filter(Boolean);
  tokens += words.reduce((sum, word) => {
    // Long words get split into subwords
    return sum + Math.ceil(word.length / 4);
  }, 0);
  // CJK: roughly 1 token per 1.5 characters
  tokens += Math.ceil(cjkChars / 1.5);
  return Math.max(tokens, text.length > 0 ? 1 : 0);
}

export default function AiTokenCounterTool() {
  const { dict } = useLang();
  const t = dict.tools['ai-token-counter'];
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const tokens = estimateTokens(text);
    const chars = text.length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const lines = text.split('\n').length;
    return { tokens, chars, words, lines };
  }, [text]);

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ai-token-counter">
      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20,
      }}>
        {[
          { label: t.tokens || 'Tokens', value: stats.tokens.toLocaleString(), color: '#3b82f6' },
          { label: t.characters || 'Characters', value: stats.chars.toLocaleString(), color: '#8b5cf6' },
          { label: t.words || 'Words', value: stats.words.toLocaleString(), color: '#10b981' },
          { label: t.lines || 'Lines', value: stats.lines.toLocaleString(), color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-input)', borderRadius: 10, padding: '16px 20px',
            border: '1px solid var(--border-color)', textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Text input */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel || 'Enter your text'}</label>
          <button onClick={() => setText('')} className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: 12 }}>{dict.common.clear}</button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={t.inputPlaceholder || 'Paste or type your text here to count tokens...'}
          style={{ minHeight: 200, fontSize: 14 }}
        />
      </div>

      {/* Cost estimation table */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.costEstimate || 'Cost Estimate by Model'}</h3>
        <div style={{
          borderRadius: 10, border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid var(--border-color)' }}>{t.model || 'Model'}</th>
                <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600, borderBottom: '1px solid var(--border-color)' }}>{t.context || 'Context'}</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, borderBottom: '1px solid var(--border-color)' }}>{t.inputCost || 'Input Cost'}</th>
                <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, borderBottom: '1px solid var(--border-color)' }}>{t.outputCost || 'Output Cost'}</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => (
                <tr key={m.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>{m.name}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--text-secondary)' }}>{m.contextWindow}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>
                    ${(stats.tokens * m.inputPer1k / 1000).toFixed(6)}
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'monospace' }}>
                    ${(stats.tokens * m.outputPer1k / 1000).toFixed(6)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 8 }}>
          {t.disclaimer || '* Token count is an approximation (~4 characters per token for English). Actual tokenization varies by model. Prices are estimates based on published API pricing.'}
        </p>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About AI Token Counter'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Tokens are the basic units that AI language models use to process text. This tool estimates the token count for your text across popular models like GPT-4, Claude, Gemini, and Llama. It also calculates the approximate API cost for each model. Useful for optimizing prompts, estimating API costs, and staying within context window limits.'}
        </p>
      </div>
    </ToolLayout>
  );
}
