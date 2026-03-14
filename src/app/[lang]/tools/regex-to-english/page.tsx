'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface RegexToken {
  type: string;
  pattern: string;
  explanation: string;
}

function parseRegexToEnglish(pattern: string): { tokens: RegexToken[]; fullExplanation: string; error: string } {
  const tokens: RegexToken[] = [];
  let error = '';

  try {
    new RegExp(pattern);
  } catch (e) {
    return { tokens: [], fullExplanation: '', error: e instanceof Error ? e.message : 'Invalid regex pattern' };
  }

  if (!pattern) {
    return { tokens: [], fullExplanation: '', error: '' };
  }

  let i = 0;
  const parts: string[] = [];

  while (i < pattern.length) {
    const char = pattern[i];
    const nextChar = pattern[i + 1];

    if (char === '\\' && i + 1 < pattern.length) {
      const escaped = pattern[i + 1];
      switch (escaped) {
        case 'd':
          tokens.push({ type: 'digit', pattern: '\\d', explanation: 'any digit (0-9)' });
          parts.push('any digit (0-9)');
          i += 2;
          break;
        case 'D':
          tokens.push({ type: 'not-digit', pattern: '\\D', explanation: 'any non-digit character' });
          parts.push('any non-digit character');
          i += 2;
          break;
        case 'w':
          tokens.push({ type: 'word', pattern: '\\w', explanation: 'any word character (a-z, A-Z, 0-9, _)' });
          parts.push('any word character (a-z, A-Z, 0-9, _)');
          i += 2;
          break;
        case 'W':
          tokens.push({ type: 'not-word', pattern: '\\W', explanation: 'any non-word character' });
          parts.push('any non-word character');
          i += 2;
          break;
        case 's':
          tokens.push({ type: 'space', pattern: '\\s', explanation: 'any whitespace character (space, tab, newline)' });
          parts.push('any whitespace character (space, tab, newline)');
          i += 2;
          break;
        case 'S':
          tokens.push({ type: 'not-space', pattern: '\\S', explanation: 'any non-whitespace character' });
          parts.push('any non-whitespace character');
          i += 2;
          break;
        case 'b':
          tokens.push({ type: 'boundary', pattern: '\\b', explanation: 'word boundary (transition between word and non-word)' });
          parts.push('word boundary (transition between word and non-word)');
          i += 2;
          break;
        case 'B':
          tokens.push({ type: 'not-boundary', pattern: '\\B', explanation: 'non-word boundary' });
          parts.push('non-word boundary');
          i += 2;
          break;
        case '.':
        case '*':
        case '+':
        case '?':
        case '[':
        case ']':
        case '{':
        case '}':
        case '(':
        case ')':
        case '|':
        case '^':
        case '$':
          tokens.push({ type: 'escaped-char', pattern: '\\' + escaped, explanation: `literal '${escaped}'` });
          parts.push(`literal '${escaped}'`);
          i += 2;
          break;
        default:
          tokens.push({ type: 'escaped-char', pattern: '\\' + escaped, explanation: `literal '${escaped}'` });
          parts.push(`literal '${escaped}'`);
          i += 2;
      }
    } else if (char === '.') {
      tokens.push({ type: 'any-char', pattern: '.', explanation: 'any character except newline' });
      parts.push('any character except newline');
      i++;
    } else if (char === '^') {
      tokens.push({ type: 'start', pattern: '^', explanation: 'start of string or line' });
      parts.push('start of string or line');
      i++;
    } else if (char === '$') {
      tokens.push({ type: 'end', pattern: '$', explanation: 'end of string or line' });
      parts.push('end of string or line');
      i++;
    } else if (char === '*') {
      if (tokens.length === 0) {
        return { tokens: [], fullExplanation: '', error: 'Nothing to repeat before *' };
      }
      const lastToken = tokens[tokens.length - 1];
      tokens.push({ type: 'quantifier-zero-or-more', pattern: '*', explanation: `${lastToken.explanation} (zero or more times)` });
      parts[parts.length - 1] = `${parts[parts.length - 1]} (zero or more times)`;
      i++;
    } else if (char === '+') {
      if (tokens.length === 0) {
        return { tokens: [], fullExplanation: '', error: 'Nothing to repeat before +' };
      }
      const lastToken = tokens[tokens.length - 1];
      tokens.push({ type: 'quantifier-one-or-more', pattern: '+', explanation: `${lastToken.explanation} (one or more times)` });
      parts[parts.length - 1] = `${parts[parts.length - 1]} (one or more times)`;
      i++;
    } else if (char === '?') {
      if (i > 0 && ['+', '*', '?', '}'].includes(pattern[i - 1])) {
        tokens.push({ type: 'lazy-quantifier', pattern: '?', explanation: 'non-greedy (match as few as possible)' });
        parts[parts.length - 1] = `${parts[parts.length - 1]} non-greedy`;
        i++;
      } else if (tokens.length === 0) {
        return { tokens: [], fullExplanation: '', error: 'Nothing to repeat before ?' };
      } else {
        const lastToken = tokens[tokens.length - 1];
        tokens.push({ type: 'quantifier-optional', pattern: '?', explanation: `${lastToken.explanation} (optional, 0 or 1 time)` });
        parts[parts.length - 1] = `${parts[parts.length - 1]} (optional, 0 or 1 time)`;
        i++;
      }
    } else if (char === '{') {
      const closeIdx = pattern.indexOf('}', i);
      if (closeIdx === -1) {
        return { tokens: [], fullExplanation: '', error: 'Unmatched { in pattern' };
      }
      const quantifier = pattern.substring(i + 1, closeIdx);
      let explanation = '';
      if (quantifier.includes(',')) {
        const [min, max] = quantifier.split(',').map(s => s.trim());
        if (max === '') {
          explanation = `the previous element ${min} or more times`;
        } else {
          explanation = `the previous element between ${min} and ${max} times`;
        }
      } else {
        explanation = `the previous element exactly ${quantifier} times`;
      }
      tokens.push({ type: 'quantifier-exact', pattern: `{${quantifier}}`, explanation });
      parts[parts.length - 1] = `${parts[parts.length - 1]} (${explanation})`;
      i = closeIdx + 1;
    } else if (char === '[') {
      const closeIdx = pattern.indexOf(']', i);
      if (closeIdx === -1) {
        return { tokens: [], fullExplanation: '', error: 'Unmatched [ in pattern' };
      }
      const charClass = pattern.substring(i, closeIdx + 1);
      const isNegated = pattern[i + 1] === '^';
      let explanation = '';
      if (isNegated) {
        explanation = `any character except ${charClass.substring(3, charClass.length - 1)}`;
      } else {
        explanation = `any of these characters: ${charClass.substring(1, charClass.length - 1)}`;
      }
      tokens.push({ type: 'character-class', pattern: charClass, explanation });
      parts.push(explanation);
      i = closeIdx + 1;
    } else if (char === '(') {
      let closeIdx = i + 1;
      let parenCount = 1;
      while (closeIdx < pattern.length && parenCount > 0) {
        if (pattern[closeIdx] === '(') parenCount++;
        if (pattern[closeIdx] === ')') parenCount--;
        closeIdx++;
      }
      if (parenCount !== 0) {
        return { tokens: [], fullExplanation: '', error: 'Unmatched ( in pattern' };
      }
      const groupContent = pattern.substring(i + 1, closeIdx - 1);
      let explanation = '';
      if (groupContent.startsWith('?:')) {
        explanation = `non-capturing group: ${groupContent.substring(2)}`;
      } else if (groupContent.startsWith('?=')) {
        explanation = `positive lookahead: ${groupContent.substring(2)}`;
      } else if (groupContent.startsWith('?!')) {
        explanation = `negative lookahead: ${groupContent.substring(2)}`;
      } else if (groupContent.startsWith('?<=')) {
        explanation = `positive lookbehind: ${groupContent.substring(3)}`;
      } else if (groupContent.startsWith('?<!')) {
        explanation = `negative lookbehind: ${groupContent.substring(3)}`;
      } else {
        explanation = `capturing group: ${groupContent}`;
      }
      tokens.push({ type: 'group', pattern: pattern.substring(i, closeIdx), explanation });
      parts.push(explanation);
      i = closeIdx;
    } else if (char === '|') {
      tokens.push({ type: 'alternation', pattern: '|', explanation: 'or' });
      parts.push('or');
      i++;
    } else if (char === ')') {
      return { tokens: [], fullExplanation: '', error: 'Unmatched ) in pattern' };
    } else {
      tokens.push({ type: 'literal', pattern: char, explanation: `literal '${char}'` });
      parts.push(`literal '${char}'`);
      i++;
    }
  }

  let fullExplanation = '';
  if (tokens.length === 1) {
    fullExplanation = tokens[0].explanation;
  } else {
    fullExplanation = parts.join(' followed by ');
  }

  return { tokens, fullExplanation, error };
}

export default function RegexToEnglish() {
  const { dict } = useLang();
  const t = dict.tools['regex-to-english'] as Record<string, unknown>;
  const common = dict.common;
  const [regex, setRegex] = useState('');
  const { tokens, fullExplanation, error } = parseRegexToEnglish(regex);

  const handleLoadExample = (exampleRegex: string) => {
    setRegex(exampleRegex);
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="regex-to-english"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => { setRegex(''); }} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>{common.clear}</button>
        <button onClick={() => handleLoadExample('([a-z0-9._%-]+@[a-z0-9.-]+\\.[a-z]{2,})')} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>{t.emailExample}</button>
        <button onClick={() => handleLoadExample('https?://[^\\s]+')} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>{t.urlExample}</button>
        <button onClick={() => handleLoadExample('^\\+?1?\\d{9,15}$')} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>{t.phoneExample}</button>
        <button onClick={() => handleLoadExample('(\\d{1,3}\\.){3}\\d{1,3}')} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>{t.ipExample}</button>
        <button onClick={() => handleLoadExample('(0[1-9]|1[0-2])/([0-2][0-9]|3[0-1])/(19|20)\\d{2}')} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>{t.dateExample}</button>
      </div>

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
          {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.regexInputLabel}</label>
          <textarea
            value={regex}
            onChange={e => setRegex(e.target.value)}
            placeholder={t.regexInputPlaceholder as string}
            style={{ minHeight: 100 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.englishLabel}</label>
          {fullExplanation && (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: 12,
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', gap: 8 }}>
                <span>{fullExplanation}</span>
                <CopyButton text={fullExplanation} />
              </div>
            </div>
          )}
          {!fullExplanation && !error && (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: 12,
              fontSize: 13,
              color: 'var(--text-secondary)',
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
            }}>
              {t.enterRegex}
            </div>
          )}
        </div>
      </div>

      {tokens.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.breakdownTitle}</h3>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            {tokens.map((token, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 16,
                  padding: '12px 16px',
                  borderBottom: idx < tokens.length - 1 ? '1px solid var(--border-color)' : 'none',
                  fontSize: 13,
                }}
              >
                <div style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>
                  {token.pattern}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {token.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
