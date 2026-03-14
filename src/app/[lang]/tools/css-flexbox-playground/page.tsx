'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssFlexboxPlayground() {
  const { dict } = useLang();
  const t = dict.tools['css-flexbox-playground'];
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [gap, setGap] = useState(10);
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [itemGrow, setItemGrow] = useState(0);
  const [itemShrink, setItemShrink] = useState(1);
  const [itemBasis, setItemBasis] = useState('auto');
  const [itemOrder, setItemOrder] = useState(0);
  const [itemAlignSelf, setItemAlignSelf] = useState('auto');

  const cssCode = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  gap: ${gap}px;
  flex-wrap: ${flexWrap};
}

.flex-item {
  flex-grow: ${itemGrow};
  flex-shrink: ${itemShrink};
  flex-basis: ${itemBasis};
  order: ${itemOrder};
  align-self: ${itemAlignSelf};
}`;

  const containerStyle = {
    display: 'flex',
    flexDirection: flexDirection as any,
    justifyContent,
    alignItems,
    gap: gap,
    flexWrap: flexWrap as any,
    border: '2px dashed var(--border-color)',
    padding: 20,
    borderRadius: 8,
    minHeight: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  };

  const itemStyle = {
    padding: 12,
    backgroundColor: 'var(--primary)',
    color: 'white',
    borderRadius: 6,
    fontWeight: 600,
    minWidth: 80,
    textAlign: 'center' as const,
    flexGrow: itemGrow,
    flexShrink: itemShrink,
    flexBasis: itemBasis,
    order: itemOrder,
    alignSelf: itemAlignSelf as any,
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-flexbox-playground">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Controls */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{t.containerLabel}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.flexDirectionLabel}
              </label>
              <select value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)} style={{ width: '100%' }}>
                <option value="row">row</option>
                <option value="column">column</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.justifyContentLabel}
              </label>
              <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} style={{ width: '100%' }}>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.alignItemsLabel}
              </label>
              <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)} style={{ width: '100%' }}>
                <option value="stretch">stretch</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="baseline">baseline</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.gapLabel}: {gap}px
              </label>
              <input type="range" min="0" max="50" value={gap} onChange={(e) => setGap(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.flexWrapLabel}
              </label>
              <select value={flexWrap} onChange={(e) => setFlexWrap(e.target.value)} style={{ width: '100%' }}>
                <option value="nowrap">nowrap</option>
                <option value="wrap">wrap</option>
                <option value="wrap-reverse">wrap-reverse</option>
              </select>
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, marginTop: 20 }}>{t.itemLabel}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.flexGrowLabel}: {itemGrow}
              </label>
              <input type="range" min="0" max="5" value={itemGrow} onChange={(e) => setItemGrow(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.flexShrinkLabel}: {itemShrink}
              </label>
              <input type="range" min="0" max="5" value={itemShrink} onChange={(e) => setItemShrink(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.flexBasisLabel}
              </label>
              <input type="text" value={itemBasis} onChange={(e) => setItemBasis(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.orderLabel}: {itemOrder}
              </label>
              <input type="range" min="-5" max="5" value={itemOrder} onChange={(e) => setItemOrder(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.alignSelfLabel}
              </label>
              <select value={itemAlignSelf} onChange={(e) => setItemAlignSelf(e.target.value)} style={{ width: '100%' }}>
                <option value="auto">auto</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="baseline">baseline</option>
                <option value="stretch">stretch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{t.previewLabel}</h3>
          <div style={containerStyle}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={itemStyle}>
                Item {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Code */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>{t.cssCodeLabel}</h3>
          <CopyButton text={cssCode} />
        </div>
        <textarea
          value={cssCode}
          readOnly
          style={{
            width: '100%',
            minHeight: 200,
            fontFamily: 'monospace',
            fontSize: 12,
            padding: 12,
            borderRadius: 6,
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        />
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
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
