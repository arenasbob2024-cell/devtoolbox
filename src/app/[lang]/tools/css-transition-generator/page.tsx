'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssTransitionGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-transition-generator'];
  const [property, setProperty] = useState('all');
  const [duration, setDuration] = useState('0.3');
  const [timingFunction, setTimingFunction] = useState('ease');
  const [delay, setDelay] = useState('0');
  const [cssCode, setCssCode] = useState('');

  const generateCss = () => {
    const css = `transition: ${property} ${duration}s ${timingFunction} ${delay}s;`;
    setCssCode(css);
  };

  const cssOutput = `
.transition-element {
  ${cssCode}
}

.transition-element:hover {
  /* Add your hover styles here */
  transform: scale(1.1);
  color: #3b82f6;
}
`;

  return (
    <ToolLayout toolId="css-transition-generator" title={t.pageTitle} description={t.pageDescription}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property</label>
              <select
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              >
                <option value="all">All Properties</option>
                <option value="opacity">Opacity</option>
                <option value="color">Color</option>
                <option value="background-color">Background Color</option>
                <option value="transform">Transform</option>
                <option value="width">Width</option>
                <option value="height">Height</option>
                <option value="margin">Margin</option>
                <option value="padding">Padding</option>
                <option value="border-radius">Border Radius</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              />
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timing Function</label>
              <select
                value={timingFunction}
                onChange={(e) => setTimingFunction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              >
                <option value="ease">Ease</option>
                <option value="linear">Linear</option>
                <option value="ease-in">Ease In</option>
                <option value="ease-out">Ease Out</option>
                <option value="ease-in-out">Ease In Out</option>
                <option value="cubic-bezier(0.25, 0.1, 0.25, 1)">Custom Smooth</option>
                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">Bounce</option>
                <option value="cubic-bezier(0.175, 0.885, 0.32, 1.275)">Elastic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Delay (seconds)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
              />
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="w-full mt-2"
              />
            </div>

            <button
              onClick={generateCss}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Generate CSS
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Preview & Code</h3>

          <div className="mb-6 p-6 border-2 border-gray-300 rounded bg-gray-50 flex items-center justify-center h-48">
            <div
              className="w-24 h-24 bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
              style={{
                transition: `${property} ${duration}s ${timingFunction} ${delay}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'scale(1.2)';
                el.style.backgroundColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'scale(1)';
                el.style.backgroundColor = '#3b82f6';
              }}
            />
          </div>

          {cssCode && (
            <>
              <label className="block text-sm font-medium mb-2">CSS Code</label>
              <textarea
                value={cssOutput}
                readOnly
                className="w-full h-40 p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 font-mono text-sm"
              />
              <CopyButton text={cssCode} className="mt-2" />
            </>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold">{t.pageTitle}</h2>
        <p>{t.pageDescription}</p>
      </div>
    </ToolLayout>
  );
}
