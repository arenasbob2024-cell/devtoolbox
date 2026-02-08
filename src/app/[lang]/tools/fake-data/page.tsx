'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const FIRST = ['James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Daniel'];
const LAST = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez'];
const DOMAINS = ['example.com','test.org','demo.net','fake.co','mock.io'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function FakeData() {
  const { dict } = useLang();
  const t = dict.tools['fake-data'];
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(5);

  const generate = () => {
    const lines: string[] = [];
    for (let i = 0; i < count; i++) {
      const first = pick(FIRST);
      const last = pick(LAST);
      const email = `${first.toLowerCase()}.${last.toLowerCase()}@${pick(DOMAINS)}`;
      const phone = `+1-${randomNum(200,999)}-${randomNum(100,999)}-${randomNum(1000,9999)}`;
      const address = `${randomNum(1,9999)} ${pick(LAST)} St, City, ST ${randomNum(10000,99999)}`;
      lines.push(`Name: ${first} ${last}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`);
    }
    setOutput(lines.join('\n\n---\n\n'));
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="fake-data">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Count:</label>
        <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))} min={1} max={50} style={{ width: 70, padding: '8px 12px', fontSize: 13 }} />
        <button onClick={generate} className="btn btn-primary">{dict.common.generate}</button>
        {output && <CopyButton text={output} label={dict.common.copyAll} />}
      </div>
      <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 300, opacity: output ? 1 : 0.5 }} />
    </ToolLayout>
  );
}
