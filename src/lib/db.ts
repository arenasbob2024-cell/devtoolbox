import path from 'path';
import fs from 'fs';

// Lazy-loaded db instance (only on server)
let _db: import('better-sqlite3').Database | null = null;

function getDb() {
  if (_db) return _db;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3');

  const dbPath = process.env.COMMENTS_DB_PATH
    || path.join(process.cwd(), 'data', 'comments.db');

  // Ensure directory exists
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  _db = new Database(dbPath) as import('better-sqlite3').Database;

  // Create table if not exists
  _db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tool_id TEXT NOT NULL,
      author_name TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      reply TEXT,
      replied_at INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_comments_tool_id ON comments(tool_id);
    CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
  `);

  return _db;
}

export interface Comment {
  id: number;
  tool_id: string;
  author_name: string;
  content: string;
  created_at: number;
  status: 'pending' | 'approved';
  reply: string | null;
  replied_at: number | null;
}

export function getApprovedComments(toolId: string): Comment[] {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM comments WHERE tool_id = ? AND status = ? ORDER BY created_at DESC'
  ).all(toolId, 'approved') as Comment[];
}

export function getAllComments(): Comment[] {
  const db = getDb();
  return db.prepare(
    'SELECT * FROM comments ORDER BY created_at DESC'
  ).all() as Comment[];
}

export function addComment(toolId: string, authorName: string, content: string): Comment {
  const db = getDb();
  const now = Date.now();
  const result = db.prepare(
    'INSERT INTO comments (tool_id, author_name, content, created_at, status) VALUES (?, ?, ?, ?, ?)'
  ).run(toolId, authorName, content, now, 'pending');
  return db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid) as Comment;
}

export function approveComment(id: number): boolean {
  const db = getDb();
  const result = db.prepare("UPDATE comments SET status = 'approved' WHERE id = ?").run(id);
  return result.changes > 0;
}

export function replyToComment(id: number, reply: string): boolean {
  const db = getDb();
  const now = Date.now();
  const result = db.prepare(
    "UPDATE comments SET reply = ?, replied_at = ?, status = 'approved' WHERE id = ?"
  ).run(reply, now, id);
  return result.changes > 0;
}

export function deleteComment(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM comments WHERE id = ?').run(id);
  return result.changes > 0;
}
