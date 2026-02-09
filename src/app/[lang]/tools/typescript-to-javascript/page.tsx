'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function tsToJs(ts: string): string {
  let js = ts;

  // Remove interface declarations
  js = js.replace(/^(export\s+)?interface\s+\w+(\s+extends\s+[^{]+)?\s*\{[^}]*\}\s*$/gm, '');

  // Remove type alias declarations
  js = js.replace(/^(export\s+)?type\s+\w+(\s*<[^>]*>)?\s*=\s*[^;]+;\s*$/gm, '');

  // Remove generic type parameters from functions/classes
  js = js.replace(/<[A-Z][A-Za-z0-9,\s]*(?:extends\s+[^>]*)?>/g, '');

  // Remove type annotations from function parameters: (param: Type) → (param)
  js = js.replace(/(\w+)\s*:\s*(?:readonly\s+)?(?:[\w.[\]|&<>,\s]+)(?=[,)])/g, '$1');

  // Remove return type annotations: ): Type { → ) {
  js = js.replace(/\)\s*:\s*(?:[\w.[\]|&<>,\s]+)\s*(?=[{=])/g, ') ');

  // Remove variable type annotations: const x: Type = → const x =
  js = js.replace(/((?:const|let|var)\s+\w+)\s*:\s*(?:[\w.[\]|&<>,\s{}]+)\s*=/g, '$1 =');

  // Remove 'as' type assertions: value as Type → value
  js = js.replace(/\s+as\s+[\w.[\]<>,\s]+/g, '');

  // Remove non-null assertions: value! → value
  js = js.replace(/(\w)!/g, '$1');

  // Remove access modifiers
  js = js.replace(/\b(public|private|protected|readonly)\s+/g, '');

  // Remove 'declare' keyword
  js = js.replace(/\bdeclare\s+/g, '');

  // Clean up empty lines
  js = js.replace(/\n{3,}/g, '\n\n');

  return js.trim();
}

export default function TypeScriptToJavaScript() {
  const { dict } = useLang();
  const t = dict.tools['typescript-to-javascript'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => { try { setOutput(tsToJs(input)); } catch { setOutput('Error converting TypeScript'); } };

  const loadSample = () => {
    setInput(`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type UserRole = "admin" | "user" | "guest";

export function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(res => res.json() as Promise<User>);
}

const formatName = (user: User): string => {
  return \`\${user.name} (\${user.email})\`;
};

class UserService {
  private baseUrl: string;
  public readonly version: number;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.version = 1;
  }

  async getUsers(): Promise<User[]> {
    const response: Response = await fetch(this.baseUrl);
    const data = await response.json() as User[];
    return data!;
  }
}`);
  };

  return (
    <ToolLayout title={(t.pageTitle as string) || 'TypeScript to JavaScript'} description={(t.pageDescription as string) || 'Convert TypeScript to JavaScript'} toolId="typescript-to-javascript">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>TypeScript</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="const x: string = 'hello';" style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JavaScript</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      {typeof t.seoTitle === 'string' && (<div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}><h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2><p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p></div>)}
    </ToolLayout>
  );
}
