'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ShadowLayer {
  id: number;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

function createDefaultLayer(id: number): ShadowLayer {
  return {
    id,
    offsetX: 5,
    offsetY: 5,
    blur: 15,
    spread: 0,
    color: '#000000',
    opacity: 0.3,
    inset: false,
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const match = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) };
}

function layerToCss(layer: ShadowLayer): string {
  const { r, g, b } = hexToRgb(layer.color);
  const insetStr = layer.inset ? 'inset ' : '';
  return `${insetStr}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px rgba(${r},${g},${b},${layer.opacity})`;
}

interface Preset {
  name: string;
  layers: ShadowLayer[];
}

const presets: Preset[] = [
  {
    name: 'Soft Elevation',
    layers: [
      { id: 1, offsetX: 0, offsetY: 4, blur: 20, spread: -2, color: '#000000', opacity: 0.15, inset: false },
    ],
  },
  {
    name: 'Hard Shadow',
    layers: [
      { id: 1, offsetX: 8, offsetY: 8, blur: 0, spread: 0, color: '#000000', opacity: 0.25, inset: false },
    ],
  },
  {
    name: 'Material Design',
    layers: [
      { id: 1, offsetX: 0, offsetY: 3, blur: 6, spread: 0, color: '#000000', opacity: 0.16, inset: false },
      { id: 2, offsetX: 0, offsetY: 6, blur: 20, spread: 0, color: '#000000', opacity: 0.12, inset: false },
    ],
  },
  {
    name: 'Neumorphism',
    layers: [
      { id: 1, offsetX: 10, offsetY: 10, blur: 20, spread: 0, color: '#000000', opacity: 0.15, inset: false },
      { id: 2, offsetX: -10, offsetY: -10, blur: 20, spread: 0, color: '#ffffff', opacity: 0.7, inset: false },
    ],
  },
  {
    name: 'Inner Glow',
    layers: [
      { id: 1, offsetX: 0, offsetY: 0, blur: 20, spread: 5, color: '#3b82f6', opacity: 0.4, inset: true },
    ],
  },
];

export default function BoxShadowGenerator() {
  const { dict } = useLang();
  const t = dict.tools['box-shadow'];

  const [layers, setLayers] = useState<ShadowLayer[]>([createDefaultLayer(1)]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [nextId, setNextId] = useState(2);

  const activeLayer = layers[activeLayerIndex] || layers[0];

  const updateLayer = (field: keyof ShadowLayer, value: number | string | boolean) => {
    setLayers(prev =>
      prev.map((l, i) => (i === activeLayerIndex ? { ...l, [field]: value } : l))
    );
  };

  const addLayer = () => {
    if (layers.length >= 4) return;
    const newLayer = createDefaultLayer(nextId);
    setNextId(prev => prev + 1);
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerIndex(layers.length);
  };

  const removeLayer = (index: number) => {
    if (layers.length <= 1) return;
    setLayers(prev => prev.filter((_, i) => i !== index));
    setActiveLayerIndex(prev => (prev >= layers.length - 1 ? Math.max(0, layers.length - 2) : prev));
  };

  const applyPreset = (preset: Preset) => {
    const newLayers = preset.layers.map((l, i) => ({ ...l, id: i + 1 }));
    setLayers(newLayers);
    setActiveLayerIndex(0);
    setNextId(newLayers.length + 1);
  };

  const cssValue = layers.map(layerToCss).join(', ');
  const cssOutput = `box-shadow: ${cssValue};`;

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    accentColor: 'var(--accent-blue)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
    color: 'var(--text-secondary)',
  };

  const controlGroupStyle: React.CSSProperties = {
    marginBottom: 14,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="box-shadow"
    >
      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          Presets
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
        {/* Controls Panel */}
        <div>
          {/* Layer Tabs */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Shadow Layers
              </span>
              <button
                onClick={addLayer}
                disabled={layers.length >= 4}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 4,
                  border: '1px solid var(--accent-blue)',
                  background: 'transparent',
                  color: 'var(--accent-blue)',
                  cursor: layers.length >= 4 ? 'not-allowed' : 'pointer',
                  opacity: layers.length >= 4 ? 0.4 : 1,
                }}
              >
                + Add
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <button
                    onClick={() => setActiveLayerIndex(index)}
                    style={{
                      padding: '5px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 5,
                      border: '1px solid',
                      borderColor: activeLayerIndex === index ? 'var(--accent-blue)' : 'var(--border-color)',
                      background: activeLayerIndex === index ? 'var(--accent-blue)' : 'var(--bg-input)',
                      color: activeLayerIndex === index ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {index + 1}
                  </button>
                  {layers.length > 1 && (
                    <button
                      onClick={() => removeLayer(index)}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        width: 18,
                        height: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-input)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: 0,
                        lineHeight: 1,
                      }}
                      title="Remove layer"
                    >
                      x
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Offset X */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Horizontal Offset</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{activeLayer.offsetX}px</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={activeLayer.offsetX}
              onChange={e => updateLayer('offsetX', Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Offset Y */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Vertical Offset</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{activeLayer.offsetY}px</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={activeLayer.offsetY}
              onChange={e => updateLayer('offsetY', Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Blur */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Blur Radius</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{activeLayer.blur}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={activeLayer.blur}
              onChange={e => updateLayer('blur', Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Spread */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Spread Radius</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{activeLayer.spread}px</span>
            </div>
            <input
              type="range"
              min={-50}
              max={50}
              value={activeLayer.spread}
              onChange={e => updateLayer('spread', Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Color */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Shadow Color</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={activeLayer.color}
                onChange={e => updateLayer('color', e.target.value)}
                style={{ width: 40, height: 32, border: 'none', cursor: 'pointer', borderRadius: 4, padding: 0 }}
              />
              <input
                type="text"
                value={activeLayer.color}
                onChange={e => updateLayer('color', e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          {/* Opacity */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Opacity</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{activeLayer.opacity.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(activeLayer.opacity * 100)}
              onChange={e => updateLayer('opacity', Number(e.target.value) / 100)}
              style={sliderStyle}
            />
          </div>

          {/* Inset Toggle */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            padding: '10px 12px',
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            marginTop: 4,
          }}>
            <span>Inset Shadow</span>
            <input
              type="checkbox"
              checked={activeLayer.inset}
              onChange={e => updateLayer('inset', e.target.checked)}
              style={{ accentColor: 'var(--accent-blue)' }}
            />
          </label>
        </div>

        {/* Preview & Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Preview */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-input)',
            borderRadius: 12,
            border: '1px solid var(--border-color)',
            padding: 40,
            minHeight: 280,
          }}>
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 16,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: cssValue,
                transition: 'box-shadow 0.15s ease',
              }}
            />
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
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                CSS Output
              </span>
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
              lineHeight: 1.6,
              overflowX: 'auto',
            }}>
              {cssOutput}
            </pre>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
