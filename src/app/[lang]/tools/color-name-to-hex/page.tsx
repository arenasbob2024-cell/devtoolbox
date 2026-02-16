'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface NamedColor {
  name: string;
  hex: string;
  category: string;
}

const CSS_NAMED_COLORS: NamedColor[] = [
  // Reds
  { name: 'IndianRed', hex: '#CD5C5C', category: 'reds' },
  { name: 'LightCoral', hex: '#F08080', category: 'reds' },
  { name: 'Salmon', hex: '#FA8072', category: 'reds' },
  { name: 'DarkSalmon', hex: '#E9967A', category: 'reds' },
  { name: 'LightSalmon', hex: '#FFA07A', category: 'reds' },
  { name: 'Crimson', hex: '#DC143C', category: 'reds' },
  { name: 'Red', hex: '#FF0000', category: 'reds' },
  { name: 'FireBrick', hex: '#B22222', category: 'reds' },
  { name: 'DarkRed', hex: '#8B0000', category: 'reds' },
  // Pinks
  { name: 'Pink', hex: '#FFC0CB', category: 'pinks' },
  { name: 'LightPink', hex: '#FFB6C1', category: 'pinks' },
  { name: 'HotPink', hex: '#FF69B4', category: 'pinks' },
  { name: 'DeepPink', hex: '#FF1493', category: 'pinks' },
  { name: 'MediumVioletRed', hex: '#C71585', category: 'pinks' },
  { name: 'PaleVioletRed', hex: '#DB7093', category: 'pinks' },
  // Oranges
  { name: 'Coral', hex: '#FF7F50', category: 'oranges' },
  { name: 'Tomato', hex: '#FF6347', category: 'oranges' },
  { name: 'OrangeRed', hex: '#FF4500', category: 'oranges' },
  { name: 'DarkOrange', hex: '#FF8C00', category: 'oranges' },
  { name: 'Orange', hex: '#FFA500', category: 'oranges' },
  // Yellows
  { name: 'Gold', hex: '#FFD700', category: 'yellows' },
  { name: 'Yellow', hex: '#FFFF00', category: 'yellows' },
  { name: 'LightYellow', hex: '#FFFFE0', category: 'yellows' },
  { name: 'LemonChiffon', hex: '#FFFACD', category: 'yellows' },
  { name: 'LightGoldenrodYellow', hex: '#FAFAD2', category: 'yellows' },
  { name: 'PapayaWhip', hex: '#FFEFD5', category: 'yellows' },
  { name: 'Moccasin', hex: '#FFE4B5', category: 'yellows' },
  { name: 'PeachPuff', hex: '#FFDAB9', category: 'yellows' },
  { name: 'PaleGoldenrod', hex: '#EEE8AA', category: 'yellows' },
  { name: 'Khaki', hex: '#F0E68C', category: 'yellows' },
  { name: 'DarkKhaki', hex: '#BDB76B', category: 'yellows' },
  // Purples
  { name: 'Lavender', hex: '#E6E6FA', category: 'purples' },
  { name: 'Thistle', hex: '#D8BFD8', category: 'purples' },
  { name: 'Plum', hex: '#DDA0DD', category: 'purples' },
  { name: 'Violet', hex: '#EE82EE', category: 'purples' },
  { name: 'Orchid', hex: '#DA70D6', category: 'purples' },
  { name: 'Fuchsia', hex: '#FF00FF', category: 'purples' },
  { name: 'Magenta', hex: '#FF00FF', category: 'purples' },
  { name: 'MediumOrchid', hex: '#BA55D3', category: 'purples' },
  { name: 'MediumPurple', hex: '#9370DB', category: 'purples' },
  { name: 'RebeccaPurple', hex: '#663399', category: 'purples' },
  { name: 'BlueViolet', hex: '#8A2BE2', category: 'purples' },
  { name: 'DarkViolet', hex: '#9400D3', category: 'purples' },
  { name: 'DarkOrchid', hex: '#9932CC', category: 'purples' },
  { name: 'DarkMagenta', hex: '#8B008B', category: 'purples' },
  { name: 'Purple', hex: '#800080', category: 'purples' },
  { name: 'Indigo', hex: '#4B0082', category: 'purples' },
  { name: 'SlateBlue', hex: '#6A5ACD', category: 'purples' },
  { name: 'DarkSlateBlue', hex: '#483D8B', category: 'purples' },
  { name: 'MediumSlateBlue', hex: '#7B68EE', category: 'purples' },
  // Greens
  { name: 'GreenYellow', hex: '#ADFF2F', category: 'greens' },
  { name: 'Chartreuse', hex: '#7FFF00', category: 'greens' },
  { name: 'LawnGreen', hex: '#7CFC00', category: 'greens' },
  { name: 'Lime', hex: '#00FF00', category: 'greens' },
  { name: 'LimeGreen', hex: '#32CD32', category: 'greens' },
  { name: 'PaleGreen', hex: '#98FB98', category: 'greens' },
  { name: 'LightGreen', hex: '#90EE90', category: 'greens' },
  { name: 'MediumSpringGreen', hex: '#00FA9A', category: 'greens' },
  { name: 'SpringGreen', hex: '#00FF7F', category: 'greens' },
  { name: 'MediumSeaGreen', hex: '#3CB371', category: 'greens' },
  { name: 'SeaGreen', hex: '#2E8B57', category: 'greens' },
  { name: 'ForestGreen', hex: '#228B22', category: 'greens' },
  { name: 'Green', hex: '#008000', category: 'greens' },
  { name: 'DarkGreen', hex: '#006400', category: 'greens' },
  { name: 'YellowGreen', hex: '#9ACD32', category: 'greens' },
  { name: 'OliveDrab', hex: '#6B8E23', category: 'greens' },
  { name: 'Olive', hex: '#808000', category: 'greens' },
  { name: 'DarkOliveGreen', hex: '#556B2F', category: 'greens' },
  { name: 'MediumAquamarine', hex: '#66CDAA', category: 'greens' },
  { name: 'DarkSeaGreen', hex: '#8FBC8B', category: 'greens' },
  { name: 'LightSeaGreen', hex: '#20B2AA', category: 'greens' },
  { name: 'DarkCyan', hex: '#008B8B', category: 'greens' },
  { name: 'Teal', hex: '#008080', category: 'greens' },
  // Blues
  { name: 'Aqua', hex: '#00FFFF', category: 'blues' },
  { name: 'Cyan', hex: '#00FFFF', category: 'blues' },
  { name: 'LightCyan', hex: '#E0FFFF', category: 'blues' },
  { name: 'PaleTurquoise', hex: '#AFEEEE', category: 'blues' },
  { name: 'Aquamarine', hex: '#7FFFD4', category: 'blues' },
  { name: 'Turquoise', hex: '#40E0D0', category: 'blues' },
  { name: 'MediumTurquoise', hex: '#48D1CC', category: 'blues' },
  { name: 'DarkTurquoise', hex: '#00CED1', category: 'blues' },
  { name: 'CadetBlue', hex: '#5F9EA0', category: 'blues' },
  { name: 'SteelBlue', hex: '#4682B4', category: 'blues' },
  { name: 'LightSteelBlue', hex: '#B0C4DE', category: 'blues' },
  { name: 'PowderBlue', hex: '#B0E0E6', category: 'blues' },
  { name: 'LightBlue', hex: '#ADD8E6', category: 'blues' },
  { name: 'SkyBlue', hex: '#87CEEB', category: 'blues' },
  { name: 'LightSkyBlue', hex: '#87CEFA', category: 'blues' },
  { name: 'DeepSkyBlue', hex: '#00BFFF', category: 'blues' },
  { name: 'DodgerBlue', hex: '#1E90FF', category: 'blues' },
  { name: 'CornflowerBlue', hex: '#6495ED', category: 'blues' },
  { name: 'RoyalBlue', hex: '#4169E1', category: 'blues' },
  { name: 'Blue', hex: '#0000FF', category: 'blues' },
  { name: 'MediumBlue', hex: '#0000CD', category: 'blues' },
  { name: 'DarkBlue', hex: '#00008B', category: 'blues' },
  { name: 'Navy', hex: '#000080', category: 'blues' },
  { name: 'MidnightBlue', hex: '#191970', category: 'blues' },
  // Whites
  { name: 'White', hex: '#FFFFFF', category: 'whites' },
  { name: 'Snow', hex: '#FFFAFA', category: 'whites' },
  { name: 'Honeydew', hex: '#F0FFF0', category: 'whites' },
  { name: 'MintCream', hex: '#F5FFFA', category: 'whites' },
  { name: 'Azure', hex: '#F0FFFF', category: 'whites' },
  { name: 'AliceBlue', hex: '#F0F8FF', category: 'whites' },
  { name: 'GhostWhite', hex: '#F8F8FF', category: 'whites' },
  { name: 'WhiteSmoke', hex: '#F5F5F5', category: 'whites' },
  { name: 'Seashell', hex: '#FFF5EE', category: 'whites' },
  { name: 'Beige', hex: '#F5F5DC', category: 'whites' },
  { name: 'OldLace', hex: '#FDF5E6', category: 'whites' },
  { name: 'FloralWhite', hex: '#FFFAF0', category: 'whites' },
  { name: 'Ivory', hex: '#FFFFF0', category: 'whites' },
  { name: 'AntiqueWhite', hex: '#FAEBD7', category: 'whites' },
  { name: 'Linen', hex: '#FAF0E6', category: 'whites' },
  { name: 'LavenderBlush', hex: '#FFF0F5', category: 'whites' },
  { name: 'MistyRose', hex: '#FFE4E1', category: 'whites' },
  // Grays
  { name: 'Gainsboro', hex: '#DCDCDC', category: 'grays' },
  { name: 'LightGray', hex: '#D3D3D3', category: 'grays' },
  { name: 'Silver', hex: '#C0C0C0', category: 'grays' },
  { name: 'DarkGray', hex: '#A9A9A9', category: 'grays' },
  { name: 'Gray', hex: '#808080', category: 'grays' },
  { name: 'DimGray', hex: '#696969', category: 'grays' },
  { name: 'LightSlateGray', hex: '#778899', category: 'grays' },
  { name: 'SlateGray', hex: '#708090', category: 'grays' },
  { name: 'DarkSlateGray', hex: '#2F4F4F', category: 'grays' },
  { name: 'Black', hex: '#000000', category: 'grays' },
  // Browns (in oranges)
  { name: 'Cornsilk', hex: '#FFF8DC', category: 'yellows' },
  { name: 'BlanchedAlmond', hex: '#FFEBCD', category: 'yellows' },
  { name: 'Bisque', hex: '#FFE4C4', category: 'oranges' },
  { name: 'NavajoWhite', hex: '#FFDEAD', category: 'oranges' },
  { name: 'Wheat', hex: '#F5DEB3', category: 'yellows' },
  { name: 'BurlyWood', hex: '#DEB887', category: 'oranges' },
  { name: 'Tan', hex: '#D2B48C', category: 'oranges' },
  { name: 'RosyBrown', hex: '#BC8F8F', category: 'reds' },
  { name: 'SandyBrown', hex: '#F4A460', category: 'oranges' },
  { name: 'Goldenrod', hex: '#DAA520', category: 'yellows' },
  { name: 'DarkGoldenrod', hex: '#B8860B', category: 'yellows' },
  { name: 'Peru', hex: '#CD853F', category: 'oranges' },
  { name: 'Chocolate', hex: '#D2691E', category: 'oranges' },
  { name: 'SaddleBrown', hex: '#8B4513', category: 'oranges' },
  { name: 'Sienna', hex: '#A0522D', category: 'oranges' },
  { name: 'Brown', hex: '#A52A2A', category: 'reds' },
  { name: 'Maroon', hex: '#800000', category: 'reds' },
];

const CATEGORIES = ['all', 'reds', 'oranges', 'yellows', 'greens', 'blues', 'purples', 'pinks', 'whites', 'grays'] as const;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function getTextColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export default function ColorNameToHex() {
  const { dict } = useLang();
  const t = dict.tools['color-name-to-hex'];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filteredColors = useMemo(() => {
    return CSS_NAMED_COLORS.filter(c => {
      const matchesCategory = category === 'all' || c.category === category;
      const matchesSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const getCategoryLabel = (cat: string): string => {
    if (cat === 'all') return t.allColors;
    return (t as Record<string, string>)[cat] || cat;
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    borderRadius: 10,
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    transition: 'transform 0.15s, box-shadow 0.15s',
    cursor: 'default',
  };

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4px 10px',
    fontSize: 12,
    fontFamily: 'monospace',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="color-name-to-hex">
      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.searchPlaceholder}
          style={{
            flex: 1,
            minWidth: 200,
            padding: '10px 14px',
            fontSize: 14,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box' as const,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)' }}>
          {filteredColors.length} {t.totalColors}
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: category === cat ? 700 : 500,
              borderRadius: 20,
              border: '1px solid var(--border-color)',
              background: category === cat ? 'var(--accent)' : 'var(--bg-card)',
              color: category === cat ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Color Grid */}
      {filteredColors.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          {t.noResults}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 14,
        }}>
          {filteredColors.map(color => {
            const { r, g, b } = hexToRgb(color.hex);
            const { h, s, l } = rgbToHsl(r, g, b);
            const rgbStr = `rgb(${r}, ${g}, ${b})`;
            const hslStr = `hsl(${h}, ${s}%, ${l}%)`;
            const textColor = getTextColor(color.hex);

            return (
              <div key={color.name} style={cardStyle}>
                {/* Color Swatch */}
                <div style={{
                  background: color.hex,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    color: textColor,
                    fontSize: 14,
                    fontWeight: 700,
                    textShadow: textColor === '#FFFFFF' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
                  }}>
                    {color.name}
                  </span>
                </div>
                {/* Color Values */}
                <div style={{ padding: '8px 0' }}>
                  <div style={cellStyle}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{t.hexValue}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <code style={{ fontSize: 12 }}>{color.hex}</code>
                      <CopyButton text={color.hex} />
                    </div>
                  </div>
                  <div style={cellStyle}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{t.rgbValue}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <code style={{ fontSize: 11 }}>{rgbStr}</code>
                      <CopyButton text={rgbStr} />
                    </div>
                  </div>
                  <div style={cellStyle}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{t.hslValue}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <code style={{ fontSize: 11 }}>{hslStr}</code>
                      <CopyButton text={hslStr} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
