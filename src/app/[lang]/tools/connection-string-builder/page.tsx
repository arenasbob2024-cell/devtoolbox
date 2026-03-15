'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const DB_CONFIGS: Record<string, { defaultPort: number; template: (c: any) => string; prisma?: (c: any) => string; }> = {
  postgresql: { defaultPort: 5432, template: (c) => 'postgresql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db + (c.ssl ? '?sslmode=require' : ''), prisma: (c) => 'postgresql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db + '?schema=public' },
  mysql: { defaultPort: 3306, template: (c) => 'mysql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db, prisma: (c) => 'mysql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db },
  mongodb: { defaultPort: 27017, template: (c) => 'mongodb://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db + (c.ssl ? '?ssl=true' : '') },
  redis: { defaultPort: 6379, template: (c) => 'redis://' + (c.user ? c.user + ':' : '') + c.pass + '@' + c.host + ':' + c.port + '/' + (c.dbNum || '0') },
  sqlserver: { defaultPort: 1433, template: (c) => 'Server=' + c.host + ',' + c.port + ';Database=' + c.db + ';User Id=' + c.user + ';Password=' + c.pass + ';' + (c.ssl ? 'Encrypt=true;' : '') },
};

export default function ConnectionStringBuilderPage() {
  const { dict, lang } = useLang();
  const [dbType, setDbType] = useState('postgresql');
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5432');
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('password');
  const [db, setDb] = useState('mydb');
  const [ssl, setSsl] = useState(false);

  const config = { host, port, user, pass, db, ssl, dbNum: '0' };
  const connStr = DB_CONFIGS[dbType]?.template(config) || '';
  const prismaStr = DB_CONFIGS[dbType]?.prisma?.(config) || '';

  const handleDbChange = (t: string) => {
    setDbType(t);
    setPort(String(DB_CONFIGS[t]?.defaultPort || 5432));
  };

  return (
    <ToolLayout toolId="connection-string-builder">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Database Type</label>
            <select value={dbType} onChange={e => handleDbChange(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
              <option value="postgresql">PostgreSQL</option><option value="mysql">MySQL</option><option value="mongodb">MongoDB</option><option value="redis">Redis</option><option value="sqlserver">SQL Server</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Host</label>
            <input value={host} onChange={e => setHost(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Port</label>
            <input value={port} onChange={e => setPort(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input value={user} onChange={e => setUser(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Database</label>
            <input value={db} onChange={e => setDb(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
        </div>
        <label className="flex items-center gap-2"><input type="checkbox" checked={ssl} onChange={e => setSsl(e.target.checked)} /> Enable SSL</label>
        <div>
          <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium">Connection String</label><CopyButton text={connStr} /></div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">{connStr}</pre>
        </div>
        {prismaStr && <div>
          <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium">Prisma DATABASE_URL</label><CopyButton text={prismaStr} /></div>
          <pre className="p-4 bg-gray-900 text-yellow-400 rounded-lg overflow-x-auto text-sm">{prismaStr}</pre>
        </div>}
      </div>
    </ToolLayout>
  );
}