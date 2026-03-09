'use client';
import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import ToolLayout from '@/components/ToolLayout';
const sample = `version: "3.8"\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n    restart: always\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - db_data:/var/lib/postgresql/data\nvolumes:\n  db_data:`;
function validate(yaml: string) {
  const errors:string[]=[], warnings:string[]=[], info:string[]=[];
  if (!yaml.trim()) { errors.push('Empty input'); return {valid:false,errors,warnings,info}; }
  let hasServices=false;
  for (const line of yaml.split('\n')) {
    if (line.match(/^services:/)) hasServices=true;
    if (line.includes('\t')) warnings.push('Tab characters detected');
  }
  if (!hasServices) errors.push('Missing required "services" key');
  if (yaml.includes('password:') || yaml.includes('PASSWORD')) warnings.push('Hardcoded passwords detected');
  if (yaml.includes('ports:')) info.push('Port mappings detected');
  if (yaml.includes('volumes:')) info.push('Volume mounts configured');
  const valid = errors.length === 0;
  if (valid) info.unshift('Basic structure looks valid');
  return {valid,errors,warnings,info};
}
export default function DockerComposeValidator() {
  const { t } = useLang();
  const [input, setInput] = useState(sample);
  const result = validate(input);
  return (
    <ToolLayout toolId="docker-compose-validator">
      <div className="space-y-4">
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14} placeholder="Paste docker-compose.yml..."
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 font-mono text-sm" />
        <div className={`p-4 rounded-lg border ${result.valid ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
          <h3 className={`font-bold mb-2 ${result.valid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {result.valid ? 'Valid' : 'Invalid'}
          </h3>
          {result.errors.map((e,i)=><p key={i} className="text-red-600 text-sm">{e}</p>)}
          {result.warnings.map((w,i)=><p key={i} className="text-yellow-600 text-sm">{w}</p>)}
          {result.info.map((n,i)=><p key={i} className="text-blue-600 text-sm">{n}</p>)}
        </div>
      </div>
    </ToolLayout>
  );
}
