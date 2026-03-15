'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const MODELS = [
  { name: 'GPT-4o', inputCost: 2.5, outputCost: 10, rpmLimit: 500, tpmLimit: 30000 },
  { name: 'GPT-4o-mini', inputCost: 0.15, outputCost: 0.6, rpmLimit: 500, tpmLimit: 200000 },
  { name: 'Claude Opus 4', inputCost: 15, outputCost: 75, rpmLimit: 1000, tpmLimit: 80000 },
  { name: 'Claude Sonnet 4', inputCost: 3, outputCost: 15, rpmLimit: 1000, tpmLimit: 80000 },
  { name: 'Claude Haiku 3.5', inputCost: 0.8, outputCost: 4, rpmLimit: 1000, tpmLimit: 100000 },
  { name: 'Gemini 2.5 Pro', inputCost: 1.25, outputCost: 10, rpmLimit: 360, tpmLimit: 4000000 },
];

function formatDollar(n: number): string {
  return '$' + n.toFixed(2);
}

export default function APIRateLimitPage() {
  const { dict, lang } = useLang();
  const [reqPerDay, setReqPerDay] = useState(1000);
  const [avgInputTokens, setAvgInputTokens] = useState(500);
  const [avgOutputTokens, setAvgOutputTokens] = useState(200);

  const calcCost = (m: typeof MODELS[0]) => {
    const inputCost = (reqPerDay * avgInputTokens / 1_000_000) * m.inputCost;
    const outputCost = (reqPerDay * avgOutputTokens / 1_000_000) * m.outputCost;
    const daily = inputCost + outputCost;
    const monthly = daily * 30;
    const rpmNeeded = Math.ceil(reqPerDay / 1440);
    const withinLimits = rpmNeeded <= m.rpmLimit;
    return { daily, monthly, rpmNeeded, withinLimits };
  };

  return (
    <ToolLayout toolId="api-rate-limit-calculator">
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Requests per Day</label>
            <input type="number" value={reqPerDay} onChange={e => setReqPerDay(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avg Input Tokens</label>
            <input type="number" value={avgInputTokens} onChange={e => setAvgInputTokens(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avg Output Tokens</label>
            <input type="number" value={avgOutputTokens} onChange={e => setAvgOutputTokens(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-3">Model</th>
                <th className="text-right p-3">Input $/1M</th>
                <th className="text-right p-3">Output $/1M</th>
                <th className="text-right p-3">Daily Cost</th>
                <th className="text-right p-3">Monthly Cost</th>
                <th className="text-right p-3">RPM Needed</th>
                <th className="text-center p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => {
                const c = calcCost(m);
                const rpmLabel = c.rpmNeeded + '/' + m.rpmLimit;
                const statusIcon = c.withinLimits ? String.fromCodePoint(0x2705) : String.fromCodePoint(0x26A0, 0xFE0F);
                return (
                  <tr key={m.name} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-3 font-medium">{m.name}</td>
                    <td className="p-3 text-right">{'$'}{m.inputCost}</td>
                    <td className="p-3 text-right">{'$'}{m.outputCost}</td>
                    <td className="p-3 text-right font-mono">{formatDollar(c.daily)}</td>
                    <td className="p-3 text-right font-mono font-bold">{formatDollar(c.monthly)}</td>
                    <td className="p-3 text-right">{rpmLabel}</td>
                    <td className="p-3 text-center">{statusIcon}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Pricing as of March 2026. Actual costs may vary.</p>
      </div>
    </ToolLayout>
  );
}