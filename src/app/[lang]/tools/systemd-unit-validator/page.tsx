'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const SAMPLE = `[Unit]
Description=My Application Service
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=app
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target`;

interface Issue { level: 'error' | 'warning' | 'info'; message: string; }

function validate(content: string): Issue[] {
  const issues: Issue[] = [];
  const lines = content.split('\n');
  const sections: string[] = [];
  const hasField = (f: string) => lines.some(l => l.trim().startsWith(f + '='));

  for (const line of lines) {
    const m = line.match(/^\[(.+?)\]/);
    if (m) sections.push(m[1]);
  }

  if (!sections.includes('Unit')) issues.push({ level: 'error', message: '[Unit] section is missing' });
  if (!sections.includes('Service') && !sections.includes('Timer') && !sections.includes('Socket'))
    issues.push({ level: 'error', message: 'No [Service], [Timer], or [Socket] section found' });
  if (!sections.includes('Install')) issues.push({ level: 'warning', message: '[Install] section is missing - unit cannot be enabled' });
  if (!hasField('Description')) issues.push({ level: 'warning', message: 'Missing Description field in [Unit]' });
  if (sections.includes('Service')) {
    if (!hasField('ExecStart')) issues.push({ level: 'error', message: 'Missing ExecStart in [Service]' });
    if (!hasField('Type')) issues.push({ level: 'info', message: 'No Type specified, defaults to "simple"' });
    if (!hasField('Restart')) issues.push({ level: 'warning', message: 'No Restart policy set - service won\'t restart on failure' });
    if (!hasField('User')) issues.push({ level: 'warning', message: 'No User specified - will run as root' });
  }
  if (hasField('WantedBy') && !sections.includes('Install'))
    issues.push({ level: 'error', message: 'WantedBy outside [Install] section' });

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l && !l.startsWith('#') && !l.startsWith(';') && !l.startsWith('[') && !l.includes('='))
      issues.push({ level: 'error', message: 'Line ' + (i + 1) + ': Invalid syntax - "' + l.substring(0, 40) + '"' });
  }

  if (issues.length === 0) issues.push({ level: 'info', message: 'Unit file looks valid!' });
  return issues;
}

export default function SystemdValidatorPage() {
  const { dict, lang } = useLang();
  const [input, setInput] = useState(SAMPLE);
  const issues = validate(input);
  const errors = issues.filter(i => i.level === 'error').length;
  const warnings = issues.filter(i => i.level === 'warning').length;

  return (
    <ToolLayout toolId="systemd-unit-validator">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Unit File</label>
            <button onClick={() => setInput(SAMPLE)} className="text-sm text-blue-600 hover:underline">Load Example</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={20} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Validation Results</label>
            <span className="text-sm">{errors > 0 ? errors + ' errors' : 'No errors'}{warnings > 0 ? ', ' + warnings + ' warnings' : ''}</span>
          </div>
          <div className="space-y-2">
            {issues.map((issue, i) => (
              <div key={i} className={'p-3 rounded-lg text-sm ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800')}>
                <span className="font-semibold">{issue.level === 'error' ? '✗' : issue.level === 'warning' ? '⚠' : 'ℹ'}</span> {issue.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}