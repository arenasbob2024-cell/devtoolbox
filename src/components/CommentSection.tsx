'use client';

import { useState, useEffect, useCallback } from 'react';

interface Comment {
  id: number;
  tool_id: string;
  author_name: string;
  content: string;
  created_at: number;
  status: string;
  reply: string | null;
  replied_at: number | null;
}

interface CommentSectionProps {
  toolId: string;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function CommentSection({ toolId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?toolId=${encodeURIComponent(toolId)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch {
      // silent
    }
  }, [toolId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId, authorName: name.trim(), content: content.trim() }),
      });
      if (res.ok) {
        setSubmitted(true);
        setName('');
        setContent('');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit');
      }
    } catch {
      setError('Network error, please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginTop: 40 }}>
      <div style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: 32,
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)' }}>
          💬 User Feedback
        </h2>

        {/* Existing comments */}
        {comments.length > 0 && (
          <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {comments.map((c) => (
              <div key={c.id} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 10,
                padding: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                    {c.author_name}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {formatDate(c.created_at)}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                  {c.content}
                </p>

                {/* Admin reply */}
                {c.reply && (
                  <div style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border-color)',
                    paddingLeft: 12,
                    borderLeft: '3px solid var(--accent-blue)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--accent-blue)' }}>
                        DevToolBox Reply
                      </span>
                      {c.replied_at && (
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {formatDate(c.replied_at)}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                      {c.reply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit form */}
        {submitted ? (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 10,
            padding: '16px 20px',
            color: 'var(--accent-emerald)',
            fontSize: 14,
          }}>
            ✓ Thanks for your feedback! We&apos;ll review it shortly.{' '}
            <button
              onClick={() => setSubmitted(false)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', textDecoration: 'underline', fontSize: 14 }}
            >
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
              Have suggestions or found a bug? Leave a message and we&apos;ll get back to you.
            </div>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={50}
              required
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: 14,
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />

            <textarea
              placeholder="Your feedback, suggestion, or bug report…"
              value={content}
              onChange={e => setContent(e.target.value)}
              maxLength={2000}
              required
              rows={4}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: 14,
                outline: 'none',
                resize: 'vertical',
                minHeight: 100,
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />

            {error && (
              <div style={{ color: 'var(--accent-rose)', fontSize: 13 }}>✕ {error}</div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {content.length}/2000
              </span>
              <button
                type="submit"
                disabled={submitting || !name.trim() || !content.trim()}
                className="btn btn-primary"
                style={{ minWidth: 120 }}
              >
                {submitting ? 'Sending…' : 'Send Feedback'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
