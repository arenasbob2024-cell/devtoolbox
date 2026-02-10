'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type DbProvider = 'postgresql' | 'mysql' | 'sqlite' | 'sqlserver';

interface ColumnDef {
  name: string;
  type: string;
  rawType: string;
  isPrimary: boolean;
  isUnique: boolean;
  isNullable: boolean;
  isAutoIncrement: boolean;
  defaultValue: string | null;
  referencesTable: string | null;
  referencesColumn: string | null;
}

interface TableDef {
  name: string;
  columns: ColumnDef[];
  compositePrimaryKeys: string[];
  compositeIndexes: { name: string; columns: string[]; unique: boolean }[];
}

function toPascalCase(str: string): string {
  return str
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function singularize(name: string): string {
  if (name.endsWith('ies')) return name.slice(0, -3) + 'y';
  if (name.endsWith('ses') || name.endsWith('xes') || name.endsWith('zes')) return name.slice(0, -2);
  if (name.endsWith('s') && !name.endsWith('ss') && !name.endsWith('us')) return name.slice(0, -1);
  return name;
}

function mapSqlTypeToPrisma(sqlType: string, provider: DbProvider): { prismaType: string; dbAnnotation: string | null } {
  const upper = sqlType.toUpperCase().replace(/\(.*\)/, '').trim();

  switch (upper) {
    case 'SERIAL':
    case 'SMALLSERIAL':
      return { prismaType: 'Int', dbAnnotation: null };
    case 'BIGSERIAL':
      return { prismaType: 'BigInt', dbAnnotation: null };

    case 'INT':
    case 'INTEGER':
    case 'INT4':
    case 'MEDIUMINT':
    case 'TINYINT':
    case 'SMALLINT':
    case 'INT2':
      return { prismaType: 'Int', dbAnnotation: null };

    case 'BIGINT':
    case 'INT8':
      return { prismaType: 'BigInt', dbAnnotation: null };

    case 'FLOAT':
    case 'FLOAT4':
    case 'REAL':
      return { prismaType: 'Float', dbAnnotation: null };

    case 'DOUBLE':
    case 'DOUBLE PRECISION':
    case 'FLOAT8':
      return { prismaType: 'Float', dbAnnotation: null };

    case 'DECIMAL':
    case 'NUMERIC':
    case 'MONEY':
      return { prismaType: 'Decimal', dbAnnotation: null };

    case 'BOOLEAN':
    case 'BOOL':
    case 'BIT':
      return { prismaType: 'Boolean', dbAnnotation: null };

    case 'VARCHAR':
    case 'NVARCHAR':
    case 'CHARACTER VARYING':
      return { prismaType: 'String', dbAnnotation: null };

    case 'TEXT':
    case 'MEDIUMTEXT':
    case 'LONGTEXT':
    case 'TINYTEXT':
    case 'CLOB':
      return { prismaType: 'String', dbAnnotation: null };

    case 'CHAR':
    case 'NCHAR':
    case 'CHARACTER':
      return { prismaType: 'String', dbAnnotation: null };

    case 'UUID':
      return { prismaType: 'String', dbAnnotation: '@db.Uuid' };

    case 'DATE':
      return { prismaType: 'DateTime', dbAnnotation: provider === 'postgresql' ? '@db.Date' : null };

    case 'DATETIME':
    case 'DATETIME2':
      return { prismaType: 'DateTime', dbAnnotation: null };

    case 'TIMESTAMP':
    case 'TIMESTAMPTZ':
    case 'TIMESTAMP WITH TIME ZONE':
    case 'TIMESTAMP WITHOUT TIME ZONE':
      return { prismaType: 'DateTime', dbAnnotation: null };

    case 'TIME':
    case 'TIMETZ':
      return { prismaType: 'DateTime', dbAnnotation: provider === 'postgresql' ? '@db.Time' : null };

    case 'JSON':
      return { prismaType: 'Json', dbAnnotation: null };

    case 'JSONB':
      return { prismaType: 'Json', dbAnnotation: provider === 'postgresql' ? '@db.JsonB' : null };

    case 'BYTEA':
    case 'BLOB':
    case 'BINARY':
    case 'VARBINARY':
    case 'IMAGE':
      return { prismaType: 'Bytes', dbAnnotation: null };

    case 'XML':
      return { prismaType: 'String', dbAnnotation: provider === 'postgresql' ? '@db.Xml' : null };

    case 'ENUM':
      return { prismaType: 'String', dbAnnotation: null };

    default:
      return { prismaType: 'String', dbAnnotation: null };
  }
}

function parseSql(sql: string): TableDef[] {
  const tables: TableDef[] = [];

  // Remove single-line comments
  let cleaned = sql.replace(/--.*$/gm, '');
  // Remove multi-line comments
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match CREATE TABLE statements
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:`|"|(?:\w+\.))?(\w+)(?:`|")?\s*\(([\s\S]*?)\)\s*;/gi;
  let tableMatch;

  while ((tableMatch = tableRegex.exec(cleaned)) !== null) {
    const tableName = tableMatch[1];
    const body = tableMatch[2];

    const columns: ColumnDef[] = [];
    const compositePrimaryKeys: string[] = [];
    const compositeIndexes: { name: string; columns: string[]; unique: boolean }[] = [];

    // Split body by commas, but respect parentheses
    const parts: string[] = [];
    let depth = 0;
    let current = '';
    for (const char of body) {
      if (char === '(') depth++;
      if (char === ')') depth--;
      if (char === ',' && depth === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) parts.push(current.trim());

    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      // Composite PRIMARY KEY
      const pkMatch = trimmed.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)/i);
      if (pkMatch) {
        const cols = pkMatch[1].split(',').map(c => c.trim().replace(/[`"]/g, ''));
        compositePrimaryKeys.push(...cols);
        continue;
      }

      // UNIQUE constraint
      const uniqueConstraintMatch = trimmed.match(/^(?:CONSTRAINT\s+\w+\s+)?UNIQUE\s*(?:INDEX|KEY)?\s*(?:\w+)?\s*\(([^)]+)\)/i);
      if (uniqueConstraintMatch) {
        const cols = uniqueConstraintMatch[1].split(',').map(c => c.trim().replace(/[`"]/g, ''));
        compositeIndexes.push({ name: '', columns: cols, unique: true });
        continue;
      }

      // INDEX / KEY
      const indexMatch = trimmed.match(/^(?:CONSTRAINT\s+\w+\s+)?(?:INDEX|KEY)\s+(?:`|")?(\w+)(?:`|")?\s*\(([^)]+)\)/i);
      if (indexMatch) {
        const cols = indexMatch[2].split(',').map(c => c.trim().replace(/[`"]/g, ''));
        compositeIndexes.push({ name: indexMatch[1], columns: cols, unique: false });
        continue;
      }

      // FOREIGN KEY constraint at table level
      const fkMatch = trimmed.match(/^(?:CONSTRAINT\s+\w+\s+)?FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+(?:`|")?(\w+)(?:`|")?\s*\(([^)]+)\)/i);
      if (fkMatch) {
        const localCol = fkMatch[1].trim().replace(/[`"]/g, '');
        const refTable = fkMatch[2];
        const refCol = fkMatch[3].trim().replace(/[`"]/g, '');
        const existing = columns.find(c => c.name === localCol);
        if (existing) {
          existing.referencesTable = refTable;
          existing.referencesColumn = refCol;
        }
        continue;
      }

      // CHECK constraint
      if (/^(?:CONSTRAINT\s+\w+\s+)?CHECK\s*\(/i.test(trimmed)) continue;

      // Column definition
      const colMatch = trimmed.match(/^(?:`|")?(\w+)(?:`|")?\s+(.+)$/i);
      if (colMatch) {
        const colName = colMatch[1];
        const rest = colMatch[2];

        // Extract type (first word or word with parens)
        const typeMatch = rest.match(/^(\w+(?:\s+\w+)?(?:\([^)]*\))?)/i);
        if (!typeMatch) continue;

        const rawType = typeMatch[1];
        const constraints = rest.slice(typeMatch[0].length).trim();
        const upperConstraints = constraints.toUpperCase();
        const upperType = rawType.toUpperCase().replace(/\(.*\)/, '').trim();

        const isSerial = upperType === 'SERIAL' || upperType === 'BIGSERIAL' || upperType === 'SMALLSERIAL';
        const isPrimary = /PRIMARY\s+KEY/i.test(constraints) || isSerial;
        const isAutoIncrement = isSerial || /AUTO_INCREMENT/i.test(constraints) || /AUTOINCREMENT/i.test(constraints) || /IDENTITY/i.test(constraints);
        const isUnique = /\bUNIQUE\b/i.test(constraints);
        const isNotNull = /NOT\s+NULL/i.test(constraints) || isPrimary;
        const isNullable = !isNotNull;

        // Parse DEFAULT value
        let defaultValue: string | null = null;
        const defaultMatch = constraints.match(/DEFAULT\s+('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\S+)/i);
        if (defaultMatch) {
          defaultValue = defaultMatch[1].replace(/^['"]|['"]$/g, '');
        }

        // Parse inline REFERENCES
        let referencesTable: string | null = null;
        let referencesColumn: string | null = null;
        const refMatch = constraints.match(/REFERENCES\s+(?:`|")?(\w+)(?:`|")?\s*\((?:`|")?(\w+)(?:`|")?\)/i);
        if (refMatch) {
          referencesTable = refMatch[1];
          referencesColumn = refMatch[2];
        }

        columns.push({
          name: colName,
          type: rawType,
          rawType: upperType,
          isPrimary,
          isUnique,
          isNullable,
          isAutoIncrement,
          defaultValue,
          referencesTable,
          referencesColumn,
        });
      }
    }

    // Apply composite primary keys to columns
    if (compositePrimaryKeys.length > 0 && compositePrimaryKeys.length === 1) {
      const col = columns.find(c => c.name === compositePrimaryKeys[0]);
      if (col) {
        col.isPrimary = true;
        col.isNullable = false;
      }
    } else if (compositePrimaryKeys.length > 1) {
      for (const pk of compositePrimaryKeys) {
        const col = columns.find(c => c.name === pk);
        if (col) col.isNullable = false;
      }
    }

    tables.push({ name: tableName, columns, compositePrimaryKeys: compositePrimaryKeys.length > 1 ? compositePrimaryKeys : [], compositeIndexes });
  }

  return tables;
}

function generatePrismaSchema(
  tables: TableDef[],
  provider: DbProvider,
  generateDatasource: boolean,
  addMapAnnotations: boolean,
): string {
  const lines: string[] = [];

  if (generateDatasource) {
    lines.push('datasource db {');
    lines.push(`  provider = "${provider}"`);
    lines.push('  url      = env("DATABASE_URL")');
    lines.push('}');
    lines.push('');
    lines.push('generator client {');
    lines.push('  provider = "prisma-client-js"');
    lines.push('}');
    lines.push('');
  }

  // Build a lookup of table names for relation generation
  const tableNames = new Set(tables.map(t => t.name.toLowerCase()));

  for (let ti = 0; ti < tables.length; ti++) {
    const table = tables[ti];
    const modelName = toPascalCase(singularize(table.name));
    const needsMap = addMapAnnotations && modelName.toLowerCase() !== table.name.toLowerCase();

    lines.push(`model ${modelName} {`);

    for (const col of table.columns) {
      const { prismaType, dbAnnotation } = mapSqlTypeToPrisma(col.type, provider);
      const fieldParts: string[] = [];

      // Field name
      const fieldName = col.name;
      fieldParts.push(`  ${fieldName}`);

      // If it references another table, use relation type
      if (col.referencesTable) {
        const relModelName = toPascalCase(singularize(col.referencesTable));
        const relFieldName = singularize(col.referencesTable).toLowerCase();

        // Add the scalar field
        const scalarParts: string[] = [`  ${fieldName}`];
        scalarParts.push(prismaType + (col.isNullable ? '?' : ''));
        if (col.isUnique) scalarParts.push('@unique');
        if (addMapAnnotations && dbAnnotation) scalarParts.push(dbAnnotation);
        lines.push(scalarParts.join(' '));

        // Add the relation field
        const relParts: string[] = [`  ${relFieldName}`];
        relParts.push(relModelName + (col.isNullable ? '?' : ''));
        relParts.push(`@relation(fields: [${fieldName}], references: [${col.referencesColumn || 'id'}])`);
        lines.push(relParts.join(' '));
        continue;
      }

      // Type with nullable
      fieldParts.push(prismaType + (col.isNullable ? '?' : ''));

      // Annotations
      if (col.isPrimary) fieldParts.push('@id');
      if (col.isAutoIncrement) fieldParts.push('@default(autoincrement())');
      if (col.isUnique && !col.isPrimary) fieldParts.push('@unique');

      // Default values (skip if autoincrement already added)
      if (col.defaultValue !== null && !col.isAutoIncrement) {
        const dv = col.defaultValue;
        const upperDv = dv.toUpperCase();
        if (upperDv === 'NOW()' || upperDv === 'CURRENT_TIMESTAMP' || upperDv === 'CURRENT_DATE') {
          fieldParts.push('@default(now())');
        } else if (upperDv === 'TRUE' || upperDv === 'FALSE') {
          fieldParts.push(`@default(${dv.toLowerCase()})`);
        } else if (upperDv === 'GEN_RANDOM_UUID()' || upperDv === 'UUID_GENERATE_V4()' || upperDv === 'UUID()') {
          fieldParts.push('@default(uuid())');
        } else if (/^\d+$/.test(dv)) {
          fieldParts.push(`@default(${dv})`);
        } else if (/^\d+\.\d+$/.test(dv)) {
          fieldParts.push(`@default(${dv})`);
        } else {
          fieldParts.push(`@default("${dv}")`);
        }
      }

      // Special default for UUID type with no explicit default
      if (col.rawType === 'UUID' && col.isPrimary && col.defaultValue === null && !col.isAutoIncrement) {
        fieldParts.push('@default(uuid())');
      }

      // DB annotations
      if (addMapAnnotations && dbAnnotation) fieldParts.push(dbAnnotation);

      // Map annotation for column name
      if (addMapAnnotations && fieldName !== col.name) {
        fieldParts.push(`@map("${col.name}")`);
      }

      lines.push(fieldParts.join(' '));
    }

    // Composite primary key
    if (table.compositePrimaryKeys.length > 1) {
      lines.push('');
      lines.push(`  @@id([${table.compositePrimaryKeys.join(', ')}])`);
    }

    // Composite unique indexes
    for (const idx of table.compositeIndexes) {
      if (idx.unique) {
        lines.push(`  @@unique([${idx.columns.join(', ')}])`);
      } else {
        lines.push(`  @@index([${idx.columns.join(', ')}])`);
      }
    }

    // Map table name
    if (needsMap) {
      lines.push(`  @@map("${table.name}")`);
    }

    lines.push('}');

    if (ti < tables.length - 1) {
      lines.push('');
    }
  }

  return lines.join('\n');
}

function convertSqlToPrisma(
  sql: string,
  provider: DbProvider,
  generateDatasource: boolean,
  addMapAnnotations: boolean,
): string {
  const tables = parseSql(sql);
  if (tables.length === 0) {
    throw new Error('No CREATE TABLE statements found. Please enter valid SQL DDL.');
  }
  return generatePrismaSchema(tables, provider, generateDatasource, addMapAnnotations);
}

const SAMPLE_SQL = `-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(200),
  avatar_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  content TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  author_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE
);

-- Post-Tag junction table
CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);

-- Comments table
CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  body TEXT NOT NULL,
  post_id UUID NOT NULL REFERENCES posts(id),
  author_id INTEGER NOT NULL REFERENCES users(id),
  parent_id BIGINT REFERENCES comments(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

export default function SqlToPrisma() {
  const { dict } = useLang();
  const t = dict.tools['sql-to-prisma'] as Record<string, unknown>;
  const common = dict.common;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [provider, setProvider] = useState<DbProvider>('postgresql');
  const [generateDatasource, setGenerateDatasource] = useState(true);
  const [addMapAnnotations, setAddMapAnnotations] = useState(true);

  const convert = () => {
    try {
      if (!input.trim()) {
        setError('Please enter SQL CREATE TABLE statements');
        setOutput('');
        return;
      }
      const result = convertSqlToPrisma(input, provider, generateDatasource, addMapAnnotations);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to parse SQL');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(SAMPLE_SQL);
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'SQL to Prisma Schema Converter'}
      description={(t.pageDescription as string) || 'Convert SQL CREATE TABLE statements to Prisma schema models'}
      toolId="sql-to-prisma"
    >
      {/* Action buttons and options */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Database provider selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Provider:</label>
            <select
              value={provider}
              onChange={e => setProvider(e.target.value as DbProvider)}
              style={{
                padding: '4px 8px',
                fontSize: 12,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
              <option value="sqlserver">SQL Server</option>
            </select>
          </div>

          {/* Datasource toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={generateDatasource}
              onChange={e => setGenerateDatasource(e.target.checked)}
            />
            datasource
          </label>

          {/* Map annotations toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={addMapAnnotations}
              onChange={e => setAddMapAnnotations(e.target.checked)}
            />
            @map / @db
          </label>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {common.error}: {error}
        </div>
      )}

      {/* Two-panel layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* SQL input panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>SQL {common.input}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) UNIQUE\n);'}
            style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>

        {/* Prisma output panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Prisma Schema</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={common.resultPlaceholder}
            style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* SEO section */}
      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
