'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ITEM_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6',
  '#e11d48', '#84cc16',
];

const ITEM_SIZES = [
  { width: 80, height: 60 },
  { width: 100, height: 80 },
  { width: 60, height: 70 },
  { width: 90, height: 50 },
  { width: 70, height: 90 },
  { width: 110, height: 65 },
  { width: 75, height: 75 },
  { width: 95, height: 55 },
  { width: 65, height: 85 },
  { width: 85, height: 60 },
  { width: 100, height: 70 },
  { width: 70, height: 80 },
];

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export default function FlexboxGenerator() {
  const { dict } = useLang();
  const t = dict.tools['flexbox-generator'];

  const [direction, setDirection] = useState<FlexDirection>('row');
  const [justify, setJustify] = useState<JustifyContent>('flex-start');
  const [align, setAlign] = useState<AlignItems>('stretch');
  const [wrap, setWrap] = useState<FlexWrap>('nowrap');
  const [gap, setGap] = useState(10);
  const [itemCount, setItemCount] = useState(6);

  const cssOutput = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 6,
    color: 'var(--text-secondary)',
  };

  const controlGroupStyle: React.CSSProperties = {
    marginBottom: 16,
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: 13,
    fontFamily: 'monospace',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    cursor: 'pointer',
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    accentColor: 'var(--accent-blue)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
    marginBottom: 8,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="flexbox-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
        {/* Controls Panel */}
        <div>
          <div style={sectionTitleStyle}>Flex Container</div>

          {/* flex-direction */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}><span>flex-direction</span></div>
            <select value={direction} onChange={e => setDirection(e.target.value as FlexDirection)} style={selectStyle}>
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          {/* justify-content */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}><span>justify-content</span></div>
            <select value={justify} onChange={e => setJustify(e.target.value as JustifyContent)} style={selectStyle}>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          {/* align-items */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}><span>align-items</span></div>
            <select value={align} onChange={e => setAlign(e.target.value as AlignItems)} style={selectStyle}>
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          {/* flex-wrap */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}><span>flex-wrap</span></div>
            <select value={wrap} onChange={e => setWrap(e.target.value as FlexWrap)} style={selectStyle}>
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          {/* gap */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>gap</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{gap}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={gap}
              onChange={e => setGap(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Item count */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Items</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{itemCount}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => setItemCount(prev => Math.max(3, prev - 1))}
                disabled={itemCount <= 3}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: itemCount <= 3 ? 'not-allowed' : 'pointer',
                  opacity: itemCount <= 3 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                -
              </button>
              <div style={{
                flex: 1,
                height: 6,
                background: 'var(--border-color)',
                borderRadius: 3,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${((itemCount - 3) / 9) * 100}%`,
                  background: 'var(--accent-blue)',
                  borderRadius: 3,
                  transition: 'width 0.15s ease',
                }} />
              </div>
              <button
                onClick={() => setItemCount(prev => Math.min(12, prev + 1))}
                disabled={itemCount >= 12}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: itemCount >= 12 ? 'not-allowed' : 'pointer',
                  opacity: itemCount >= 12 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Preview & Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Preview */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 12,
            border: '1px solid var(--border-color)',
            padding: 20,
            minHeight: 300,
          }}>
            <div style={sectionTitleStyle}>Preview</div>
            <div
              style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                gap: `${gap}px`,
                minHeight: 240,
                padding: 12,
                background: 'var(--bg-card)',
                borderRadius: 8,
                border: '1px dashed var(--border-color)',
                overflow: 'auto',
              }}
            >
              {Array.from({ length: itemCount }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: ITEM_SIZES[i % ITEM_SIZES.length].width,
                    minHeight: align === 'stretch' ? undefined : ITEM_SIZES[i % ITEM_SIZES.length].height,
                    height: align === 'stretch' ? 'auto' : ITEM_SIZES[i % ITEM_SIZES.length].height,
                    background: ITEM_COLORS[i % ITEM_COLORS.length],
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 18,
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* CSS Output */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            padding: 16,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              <span style={sectionTitleStyle}>CSS Output</span>
              <CopyButton text={cssOutput} label="Copy CSS" />
            </div>
            <pre style={{
              margin: 0,
              padding: 12,
              background: 'var(--bg-card)',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              fontSize: 13,
              fontFamily: 'monospace',
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              lineHeight: 1.7,
              overflowX: 'auto',
            }}>
              {cssOutput}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
