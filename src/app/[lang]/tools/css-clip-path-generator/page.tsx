'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssClipPathGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-clip-path-generator'];
  const [clipPathType, setClipPathType] = useState('polygon');
  const [polygonPoints, setPolygonPoints] = useState('0% 0%, 100% 0%, 100% 100%, 0% 100%');
  const [circleRadius, setCircleRadius] = useState('50%');
  const [circleX, setCircleX] = useState('50%');
  const [circleY, setCircleY] = useState('50%');
  const [ellipseRadiusX, setEllipseRadiusX] = useState('50%');
  const [ellipseRadiusY, setEllipseRadiusY] = useState('30%');
  const [ellipseX, setEllipseX] = useState('50%');
  const [ellipseY, setEllipseY] = useState('50%');
  const [insetTop, setInsetTop] = useState('10%');
  const [insetRight, setInsetRight] = useState('10%');
  const [insetBottom, setInsetBottom] = useState('10%');
  const [insetLeft, setInsetLeft] = useState('10%');
  const [insetRound, setInsetRound] = useState('0%');

  const getClipPathValue = (): string => {
    switch (clipPathType) {
      case 'polygon':
        return `polygon(${polygonPoints})`;
      case 'circle':
        return `circle(${circleRadius} at ${circleX} ${circleY})`;
      case 'ellipse':
        return `ellipse(${ellipseRadiusX} ${ellipseRadiusY} at ${ellipseX} ${ellipseY})`;
      case 'inset':
        return `inset(${insetTop} ${insetRight} ${insetBottom} ${insetLeft} round ${insetRound})`;
      default:
        return `polygon(${polygonPoints})`;
    }
  };

  const getCssCode = (): string => {
    const clipPath = getClipPathValue();
    return `.element {
  clip-path: ${clipPath};
}`;
  };

  const presets = {
    circle: () => {
      setClipPathType('circle');
      setCircleRadius('50%');
      setCircleX('50%');
      setCircleY('50%');
    },
    triangle: () => {
      setClipPathType('polygon');
      setPolygonPoints('50% 0%, 0% 100%, 100% 100%');
    },
    hexagon: () => {
      setClipPathType('polygon');
      setPolygonPoints('30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%');
    },
    star: () => {
      setClipPathType('polygon');
      setPolygonPoints(
        '50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%'
      );
    },
    heart: () => {
      setClipPathType('polygon');
      setPolygonPoints(
        '50% 100%, 38% 88%, 12% 64%, 12% 40%, 25% 20%, 38% 10%, 50% 20%, 62% 10%, 75% 20%, 88% 40%, 88% 64%, 62% 88%'
      );
    },
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-clip-path-generator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <select
          value={clipPathType}
          onChange={(e) => setClipPathType(e.target.value)}
          style={{ padding: '8px 12px', fontSize: 14 }}
        >
          <option value="polygon">Polygon</option>
          <option value="circle">Circle</option>
          <option value="ellipse">Ellipse</option>
          <option value="inset">Inset</option>
        </select>
        <div style={{ display: 'flex', gap: 6 }}>
          {Object.entries(presets).map(([name, preset]) => (
            <button
              key={name}
              onClick={preset}
              className="btn btn-secondary"
              style={{ fontSize: 12, padding: '6px 10px' }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {clipPathType === 'polygon' && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Polygon Points
          </label>
          <textarea
            value={polygonPoints}
            onChange={(e) => setPolygonPoints(e.target.value)}
            placeholder="0% 0%, 100% 0%, 100% 100%, 0% 100%"
            style={{ minHeight: 80, width: '100%' }}
          />
        </div>
      )}

      {clipPathType === 'circle' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Radius
            </label>
            <input
              type="text"
              value={circleRadius}
              onChange={(e) => setCircleRadius(e.target.value)}
              placeholder="50%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Center X
            </label>
            <input
              type="text"
              value={circleX}
              onChange={(e) => setCircleX(e.target.value)}
              placeholder="50%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Center Y
            </label>
            <input
              type="text"
              value={circleY}
              onChange={(e) => setCircleY(e.target.value)}
              placeholder="50%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
        </div>
      )}

      {clipPathType === 'ellipse' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Radius X
            </label>
            <input
              type="text"
              value={ellipseRadiusX}
              onChange={(e) => setEllipseRadiusX(e.target.value)}
              placeholder="50%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Radius Y
            </label>
            <input
              type="text"
              value={ellipseRadiusY}
              onChange={(e) => setEllipseRadiusY(e.target.value)}
              placeholder="30%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Center X
            </label>
            <input
              type="text"
              value={ellipseX}
              onChange={(e) => setEllipseX(e.target.value)}
              placeholder="50%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Center Y
            </label>
            <input
              type="text"
              value={ellipseY}
              onChange={(e) => setEllipseY(e.target.value)}
              placeholder="50%"
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
        </div>
      )}

      {clipPathType === 'inset' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Top
            </label>
            <input
              type="text"
              value={insetTop}
              onChange={(e) => setInsetTop(e.target.value)}
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Right
            </label>
            <input
              type="text"
              value={insetRight}
              onChange={(e) => setInsetRight(e.target.value)}
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Bottom
            </label>
            <input
              type="text"
              value={insetBottom}
              onChange={(e) => setInsetBottom(e.target.value)}
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Left
            </label>
            <input
              type="text"
              value={insetLeft}
              onChange={(e) => setInsetLeft(e.target.value)}
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Border Radius
            </label>
            <input
              type="text"
              value={insetRound}
              onChange={(e) => setInsetRound(e.target.value)}
              style={{ width: '100%', padding: '8px 12px' }}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Preview
          </label>
          <div
            style={{
              width: '100%',
              height: 300,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              clipPath: getClipPathValue(),
              borderRadius: 8,
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            CSS Code
          </label>
          <textarea
            value={getCssCode()}
            readOnly
            style={{ minHeight: 300, background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: 12 }}
          />
          <CopyButton text={getCssCode()} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {t.seoTitle || 'CSS Clip-Path Generator'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent ||
            'Create custom clip-path shapes for CSS with visual preview. Supports polygon, circle, ellipse, and inset shapes with real-time rendering.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          Features
        </h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Polygon shape with custom points</li>
          <li>Circle with configurable radius and center</li>
          <li>Ellipse with separate X/Y radii</li>
          <li>Inset rectangles with optional border radius</li>
          <li>Preset shapes: triangle, hexagon, star, heart</li>
          <li>Real-time visual preview</li>
          <li>Generate CSS code ready to use</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
