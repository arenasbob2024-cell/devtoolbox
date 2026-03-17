'use client';

import { useState, useEffect, useCallback } from 'react';

interface Comment {
  id: number;
  tool_id: string;
  author_name: string;
  content: string;
  created_at: number;
  status: 'pending' | 'approved';
  reply: string | null;
  replied_at: number | null;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString();
}

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadComments = useCallback(async (sk: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/comments', {
        headers: { 'x-admin-secret': sk },
      });
      if (res.status === 401) {
        setAuthed(false);
        setError('Invalid secret');
        return;
      }
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleApprove = async (id: number) => {
    await fetch(`/api/admin/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ action: 'approve' }),
    });
    loadComments(secret);
  };

  const handleReply = async (id: number) => {
    if (!replyText.trim()) return;
    await fetch(`/api/admin/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
      body: JSON.stringify({ action: 'reply', reply: replyText }),
    });
    setReplyingTo(null);
    setReplyText('');
    loadComments(secret);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this comment?')) return;
    await fetch(`/api/admin/comments/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': secret },
    });
    loadComments(secret);
  };

  const filtered = comments.filter(c => filter === 'all' || c.status === filter);
  const pendingCount = comments.filter(c => c.status === 'pending').length;

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_secret');
    if (saved) {
      setSecret(saved);
      setAuthed(true);
      loadComments(saved);
    }
  }, [loadComments]);

  const handleLoginWithSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) return;
    sessionStorage.setItem('admin_secret', secret);
    setAuthed(true);
    setError('');
    loadComments(secret);
  };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 360, padding: 32, background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Admin Panel</h1>
          <form onSubmit={handleLoginWithSave} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="password"
              placeholder="Admin secret key"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              autoFocus
              style={{
                padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)',
                background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 14,
              }}
            />
            {error && <div style={{ color: 'var(--accent-rose)', fontSize: 13 }}>{error}</div>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>
          Comments Admin
          {pendingCount > 0 && (
            <span style={{
              marginLeft: 10, fontSize: 12, background: 'var(--accent-rose)', color: 'white',
              borderRadius: 999, padding: '2px 8px', fontWeight: 600,
            }}>
              {pendingCount} pending
            </span>
          )}
        </h1>
        <button
          onClick={() => loadComments(secret)}
          className="btn btn-secondary"
          disabled={loading}
          style={{ fontSize: 13 }}
        >
          {loading ? 'Loading…' : '↻ Refresh'}
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['pending', 'approved', 'all'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px', borderRadius: 6, border: '1px solid var(--border-color)',
              background: filter === f ? 'var(--accent-blue)' : 'var(--bg-input)',
              color: filter === f ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer', fontSize: 13, fontWeight: 500, textTransform: 'capitalize',
            }}
          >
            {f} ({f === 'all' ? comments.length : comments.filter(c => c.status === f).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
          No comments
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(c => (
          <div key={c.id} style={{
            background: 'var(--bg-secondary)', border: `1px solid ${c.status === 'pending' ? 'rgba(251,191,36,0.3)' : 'var(--border-color)'}`,
            borderRadius: 10, padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{c.author_name}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', background: 'var(--bg-input)', padding: '2px 8px', borderRadius: 4 }}>
                  {c.tool_id}
                </span>
                <span style={{
                  fontSize: 11, padding: '2px 8px', borderRadius: 4,
                  background: c.status === 'pending' ? 'rgba(251,191,36,0.15)' : 'rgba(16,185,129,0.15)',
                  color: c.status === 'pending' ? '#fbbf24' : 'var(--accent-emerald)',
                }}>
                  {c.status}
                </span>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{formatDate(c.created_at)}</span>
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px', whiteSpace: 'pre-wrap' }}>
              {c.content}
            </p>

            {c.reply && (
              <div style={{ padding: '10px 14px', background: 'rgba(59,130,246,0.1)', borderRadius: 8, borderLeft: '3px solid var(--accent-blue)', marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 4 }}>Your reply</div>
                <p style={{ fontSize: 13, margin: 0, whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>{c.reply}</p>
              </div>
            )}

            {/* Reply form */}
            {replyingTo === c.id && (
              <div style={{ marginBottom: 12 }}>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write your reply…"
                  rows={3}
                  autoFocus
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8,
                    border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                    color: 'var(--text-primary)', fontSize: 14, resize: 'vertical',
                    boxSizing: 'border-box', fontFamily: 'inherit',
                  }}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button onClick={() => handleReply(c.id)} className="btn btn-primary" style={{ fontSize: 13 }}>
                    Send Reply
                  </button>
                  <button onClick={() => { setReplyingTo(null); setReplyText(''); }} className="btn btn-secondary" style={{ fontSize: 13 }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              {c.status === 'pending' && (
                <button onClick={() => handleApprove(c.id)} className="btn btn-primary" style={{ fontSize: 12, padding: '4px 14px' }}>
                  ✓ Approve
                </button>
              )}
              <button
                onClick={() => { setReplyingTo(replyingTo === c.id ? null : c.id); setReplyText(c.reply || ''); }}
                className="btn btn-secondary"
                style={{ fontSize: 12, padding: '4px 14px' }}
              >
                {c.reply ? '✏ Edit Reply' : '↩ Reply'}
              </button>
              <button onClick={() => handleDelete(c.id)} style={{
                fontSize: 12, padding: '4px 14px', borderRadius: 6, border: '1px solid rgba(244,63,94,0.3)',
                background: 'rgba(244,63,94,0.1)', color: 'var(--accent-rose)', cursor: 'pointer',
              }}>
                ✕ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
