'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const SAMPLE = 'FROM ubuntu:latest\nRUN apt-get update && apt-get install -y python3\nADD . /app\nWORKDIR /app\nEXPOSE 8080\nCMD python3 app.py';

const RULES = [
  { pattern: /^FROM\s+\S+:latest/m, level: 'warning', msg: 'Avoid using :latest tag - pin to a specific version for reproducibility' },
  { pattern: /^FROM\s+ubuntu/m, level: 'info', msg: 'Consider using a minimal base image like alpine for smaller image size' },
  { pattern: /^RUN\s+apt-get\s+install(?!.*--no-install-recommends)/m, level: 'warning', msg: 'Use --no-install-recommends with apt-get install to reduce image size' },
  { pattern: /^RUN\s+apt-get\s+update(?!.*&&)/m, level: 'error', msg: 'Combine apt-get update with apt-get install in a single RUN to avoid caching issues' },
  { pattern: /^ADD\s+[^h]/m, level: 'warning', msg: 'Use COPY instead of ADD unless you need tar extraction or URL download' },
  { pattern: /^RUN\s+pip\s+install(?!.*--no-cache-dir)/m, level: 'info', msg: 'Use --no-cache-dir with pip install to reduce image size' },
  { pattern: /^EXPOSE\s+\d/m, level: 'info', msg: 'EXPOSE is documentation only - ensure you also publish ports at runtime' },
  { pattern: /^CMD\s+(?!\[)/m, level: 'warning', msg: 'Use exec form CMD ["executable", "param"] instead of shell form for proper signal handling' },
  { pattern: /^RUN.*curl.*\|.*sh/m, level: 'error', msg: 'Piping curl to shell is a security risk - download and verify scripts first' },
  { pattern: /^USER\s+root/m, level: 'warning', msg: 'Avoid running as root - create a non-root user' },
];

function lint(content) {
  const issues = [];
  const lines = content.split('\n');
  
  if (!lines.some(l => l.trim().startsWith('FROM'))) {
    issues.push({ level: 'error', msg: 'Missing FROM instruction - every Dockerfile must start with FROM' });
  }
  
  for (const rule of RULES) {
    if (rule.pattern.test(content)) {
      issues.push({ level: rule.level, msg: rule.msg });
    }
  }

  if (!lines.some(l => l.trim().startsWith('USER'))) {
    issues.push({ level: 'info', msg: 'No USER instruction found - container will run as root by default' });
  }
  if (!lines.some(l => l.trim().startsWith('HEALTHCHECK'))) {
    issues.push({ level: 'info', msg: 'No HEALTHCHECK instruction - consider adding one for production' });
  }
  
  if (issues.length === 0) issues.push({ level: 'info', msg: 'Dockerfile looks good!' });
  return issues;
}

export default function DockerfileLinterPage() {
  const { dict, lang } = useLang();
  const [input, setInput] = useState(SAMPLE);
  const issues = lint(input);
  const errs = issues.filter(i => i.level === 'error').length;
  const warns = issues.filter(i => i.level === 'warning').length;

  return (
    <ToolLayout toolId="dockerfile-linter">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-2"><label className="font-medium">Dockerfile</label><button onClick={() => setInput(SAMPLE)} className="text-sm text-blue-600 hover:underline">Example</button></div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={20} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium">Lint Results</label>
            <span className="text-sm">{errs} errors, {warns} warnings</span>
          </div>
          <div className="space-y-2">
            {issues.map((issue, i) => (
              <div key={i} className={'p-3 rounded-lg text-sm border ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800')}>
                {issue.level === 'error' ? '✗' : issue.level === 'warning' ? '⚠' : 'ℹ'} {issue.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
