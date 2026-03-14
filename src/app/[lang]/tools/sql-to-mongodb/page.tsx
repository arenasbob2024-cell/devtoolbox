'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function SqlToMongodb() {
  const { dict } = useLang();
  const t = dict.tools['sql-to-mongodb'] as Record<string, unknown>;
  const common = dict.common;

  const [sqlInput, setSqlInput] = useState('');
  const [mongoOutput, setMongoOutput] = useState('');
  const [outputError, setOutputError] = useState('');
  const [outputFormat, setOutputFormat] = useState<'javascript' | 'json'>('javascript');

  const trimQuery = (q: string) => q.trim();

  const convertSqlToMongodb = () => {
    setMongoOutput('');
    setOutputError('');

    const sql = trimQuery(sqlInput);
    if (!sql) {
      setOutputError('SQL query is required');
      return;
    }

    try {
      const upperSql = sql.toUpperCase();

      if (upperSql.startsWith('SELECT')) {
        handleSelectQuery(sql);
      } else if (upperSql.startsWith('INSERT')) {
        handleInsertQuery(sql);
      } else if (upperSql.startsWith('UPDATE')) {
        handleUpdateQuery(sql);
      } else if (upperSql.startsWith('DELETE')) {
        handleDeleteQuery(sql);
      } else {
        setOutputError('Unsupported SQL statement. Supported: SELECT, INSERT, UPDATE, DELETE');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Conversion error';
      setOutputError(msg);
    }
  };

  const handleSelectQuery = (sql: string) => {
    const upperSql = sql.toUpperCase();

    let match = sql.match(/FROM\s+(\w+)/i);
    const collection = match ? match[1] : 'collection';

    let filter: Record<string, unknown> = {};
    let projection: Record<string, number> = {};
    let sort: Record<string, number> = {};
    let limit = 0;

    match = sql.match(/WHERE\s+(.+?)(?:ORDER BY|GROUP BY|LIMIT|$)/i);
    if (match) {
      filter = parseWhereClause(match[1]);
    }

    match = sql.match(/SELECT\s+(.+?)\s+FROM/i);
    if (match) {
      const selectPart = match[1];
      if (selectPart !== '*') {
        const columns = selectPart.split(',').map(c => c.trim());
        columns.forEach(col => {
          const colName = col.split(/\s+as\s+/i)[0].trim();
          projection[colName] = 1;
        });
      }
    }

    match = sql.match(/ORDER BY\s+(.+?)(?:LIMIT|GROUP BY|$)/i);
    if (match) {
      const orderPart = match[1];
      const orderClauses = orderPart.split(',');
      orderClauses.forEach(clause => {
        const parts = clause.trim().split(/\s+/);
        const col = parts[0];
        const dir = parts[1] && parts[1].toUpperCase() === 'DESC' ? -1 : 1;
        sort[col] = dir;
      });
    }

    match = sql.match(/LIMIT\s+(\d+)/i);
    if (match) {
      limit = parseInt(match[1], 10);
    }

    let mongoQuery = `db.${collection}.find(`;

    if (Object.keys(filter).length > 0) {
      mongoQuery += JSON.stringify(filter);
    } else {
      mongoQuery += '{}';
    }

    if (Object.keys(projection).length > 0) {
      mongoQuery += `, ${JSON.stringify(projection)}`;
    }

    mongoQuery += ')';

    if (Object.keys(sort).length > 0) {
      mongoQuery += `.sort(${JSON.stringify(sort)})`;
    }

    if (limit > 0) {
      mongoQuery += `.limit(${limit})`;
    }

    mongoQuery += ';';

    const output = outputFormat === 'json'
      ? JSON.stringify({ find: collection, filter, projection, sort, limit }, null, 2)
      : mongoQuery;

    setMongoOutput(output);
  };

  const handleInsertQuery = (sql: string) => {
    const match = sql.match(/INSERT INTO\s+(\w+)\s*\((.*?)\)\s*VALUES\s*\((.*?)\)/i);
    if (!match) {
      setOutputError('Invalid INSERT statement');
      return;
    }

    const collection = match[1];
    const columns = match[2].split(',').map(c => c.trim());
    const values = match[3].split(',').map(v => {
      const val = v.trim();
      if (val === 'NULL') return null;
      if (val === 'true' || val === 'false') return val === 'true';
      if (!isNaN(Number(val)) && val !== '') return Number(val);
      return val.replace(/^['"]|['"]$/g, '');
    });

    const doc: Record<string, unknown> = {};
    columns.forEach((col, idx) => {
      doc[col] = values[idx];
    });

    const mongoQuery = `db.${collection}.insertOne(${JSON.stringify(doc, null, 2)});`;
    const output = outputFormat === 'json'
      ? JSON.stringify({ insertOne: doc }, null, 2)
      : mongoQuery;

    setMongoOutput(output);
  };

  const handleUpdateQuery = (sql: string) => {
    const match = sql.match(/UPDATE\s+(\w+)\s+SET\s+(.+?)(?:WHERE\s+(.+?))?$/i);
    if (!match) {
      setOutputError('Invalid UPDATE statement');
      return;
    }

    const collection = match[1];
    const setClause = match[2];
    const whereClause = match[3] || '';

    const update: Record<string, unknown> = {};
    const setPairs = setClause.split(',');
    setPairs.forEach(pair => {
      const [col, val] = pair.split('=').map(s => s.trim());
      let parsedVal: unknown = val;
      if (val === 'NULL') parsedVal = null;
      else if (val === 'true' || val === 'false') parsedVal = val === 'true';
      else if (!isNaN(Number(val)) && val !== '') parsedVal = Number(val);
      else parsedVal = val.replace(/^['"]|['"]$/g, '');

      update[col] = parsedVal;
    });

    const filter = whereClause ? parseWhereClause(whereClause) : {};

    const mongoQuery = `db.${collection}.updateOne(${JSON.stringify(filter)}, { $set: ${JSON.stringify(update)} });`;
    const output = outputFormat === 'json'
      ? JSON.stringify({ updateOne: { filter, update: { $set: update } } }, null, 2)
      : mongoQuery;

    setMongoOutput(output);
  };

  const handleDeleteQuery = (sql: string) => {
    const match = sql.match(/DELETE FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?$/i);
    if (!match) {
      setOutputError('Invalid DELETE statement');
      return;
    }

    const collection = match[1];
    const whereClause = match[2] || '';
    const filter = whereClause ? parseWhereClause(whereClause) : {};

    const mongoQuery = `db.${collection}.deleteOne(${JSON.stringify(filter)});`;
    const output = outputFormat === 'json'
      ? JSON.stringify({ deleteOne: { filter } }, null, 2)
      : mongoQuery;

    setMongoOutput(output);
  };

  const parseWhereClause = (whereStr: string): Record<string, unknown> => {
    const filter: Record<string, unknown> = {};

    const andParts = whereStr.split(/\s+AND\s+/i);

    if (andParts.length > 1) {
      const conditions: Record<string, unknown>[] = [];
      andParts.forEach(part => {
        const cond = parseSingleCondition(part.trim());
        if (cond) conditions.push(cond);
      });
      filter.$and = conditions;
    } else {
      const orParts = whereStr.split(/\s+OR\s+/i);
      if (orParts.length > 1) {
        const conditions: Record<string, unknown>[] = [];
        orParts.forEach(part => {
          const cond = parseSingleCondition(part.trim());
          if (cond) conditions.push(cond);
        });
        filter.$or = conditions;
      } else {
        const cond = parseSingleCondition(whereStr.trim());
        return cond || {};
      }
    }

    return filter;
  };

  const parseSingleCondition = (condStr: string): Record<string, unknown> | null => {
    const res: Record<string, unknown> = {};

    let match = condStr.match(/(\w+)\s*LIKE\s*['"](.+?)['"]/i);
    if (match) {
      const col = match[1];
      const pattern = match[2];
      const regex = pattern.replace(/%/g, '.*');
      res[col] = { $regex: regex, $options: 'i' };
      return res;
    }

    match = condStr.match(/(\w+)\s*>=\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $gte: val };
      return res;
    }

    match = condStr.match(/(\w+)\s*<=\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $lte: val };
      return res;
    }

    match = condStr.match(/(\w+)\s*>\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $gt: val };
      return res;
    }

    match = condStr.match(/(\w+)\s*<\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $lt: val };
      return res;
    }

    match = condStr.match(/(\w+)\s*!=\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $ne: val };
      return res;
    }

    match = condStr.match(/(\w+)\s*<>\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $ne: val };
      return res;
    }

    match = condStr.match(/(\w+)\s*=\s*(.+)/i);
    if (match) {
      const col = match[1];
      const val = parseValue(match[2]);
      res[col] = { $eq: val };
      return res;
    }

    match = condStr.match(/(\w+)\s+IN\s+\((.+?)\)/i);
    if (match) {
      const col = match[1];
      const values = match[2].split(',').map(v => parseValue(v.trim()));
      res[col] = { $in: values };
      return res;
    }

    return null;
  };

  const parseValue = (val: string): unknown => {
    const v = val.trim();
    if (v === 'NULL') return null;
    if (v === 'true' || v === 'false') return v === 'true';
    if (!isNaN(Number(v)) && v !== '') return Number(v);
    return v.replace(/^['"]|['"]$/g, '');
  };

  const loadSampleQuery = () => {
    const sample = `SELECT id, name, email, age FROM users WHERE age > 18 AND status = 'active' ORDER BY name ASC LIMIT 10`;
    setSqlInput(sample);
  };

  const clearAll = () => {
    setSqlInput('');
    setMongoOutput('');
    setOutputError('');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="sql-to-mongodb"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertSqlToMongodb} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={loadSampleQuery} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={clearAll} className="btn btn-secondary">{common.clear}</button>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value as 'javascript' | 'json')}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <option value="javascript">{t.jsFormatLabel}</option>
          <option value="json">{t.jsonFormatLabel}</option>
        </select>
      </div>

      {outputError && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {common.error}: {outputError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.sqlInputLabel}</label>
          </div>
          <textarea
            value={sqlInput}
            onChange={e => setSqlInput(e.target.value)}
            placeholder={t.sqlInputPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.mongoOutputLabel}</label>
          </div>
          <textarea
            value={mongoOutput}
            readOnly
            placeholder={t.mongoOutputPlaceholder}
            style={{ minHeight: 350 }}
          />
          {mongoOutput && <CopyButton text={mongoOutput} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
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
