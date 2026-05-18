'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { trackMonetizationClick, trackMonetizationImpression } from '@/lib/analytics';
import { getAdsterraDirectLink } from '@/lib/adsterra-direct-link';
import { useLang } from '@/i18n/LangContext';

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
  category?: string;
}

const successCopy: Record<string, {
  thanks: string;
  detail: string;
  another: string;
  support: string;
  sponsor: string;
  direct: string;
}> = {
  en: {
    thanks: 'Thanks for your feedback. We will review it shortly.',
    detail: 'Helpful reports keep these tools free and useful.',
    another: 'Submit another',
    support: 'Support free tools',
    sponsor: 'Sponsor this tool',
    direct: 'Sponsored offer',
  },
  zh: {
    thanks: '\u611f\u8c22\u4f60\u7684\u53cd\u9988\uff0c\u6211\u4eec\u4f1a\u5c3d\u5feb\u5ba1\u6838\u3002',
    detail: '\u6709\u7528\u7684\u53cd\u9988\u80fd\u8ba9\u8fd9\u4e9b\u5de5\u5177\u6301\u7eed\u514d\u8d39\u5e76\u66f4\u597d\u7528\u3002',
    another: '\u518d\u63d0\u4ea4\u4e00\u6761',
    support: '\u652f\u6301\u514d\u8d39\u5de5\u5177',
    sponsor: '\u8d5e\u52a9\u8fd9\u4e2a\u5de5\u5177',
    direct: '\u8d5e\u52a9\u63a8\u8350',
  },
  ru: {
    thanks: '\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u043e\u0442\u0437\u044b\u0432. \u041c\u044b \u0441\u043a\u043e\u0440\u043e \u0435\u0433\u043e \u043f\u0440\u043e\u0432\u0435\u0440\u0438\u043c.',
    detail: '\u041f\u043e\u043b\u0435\u0437\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043f\u043e\u043c\u043e\u0433\u0430\u044e\u0442 \u0434\u0435\u0440\u0436\u0430\u0442\u044c \u044d\u0442\u0438 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u043c\u0438.',
    another: '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435',
    support: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u0442\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b',
    sponsor: '\u0421\u0442\u0430\u0442\u044c \u0441\u043f\u043e\u043d\u0441\u043e\u0440\u043e\u043c',
    direct: 'Sponsored offer',
  },
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function CommentSection({ toolId, category }: CommentSectionProps) {
  const { lang } = useLang();
  const copy = successCopy[lang] || successCopy.en;
  const trackingCategory = category || toolId;
  const sponsorHref = `/${lang}/advertise/?source=comment-success-nudge&category=${encodeURIComponent(toolId)}`;
  const supportHref = process.env.NEXT_PUBLIC_SUPPORT_URL || 'https://buymeacoffee.com/devtoolbox';
  const directLink = useMemo(
    () => getAdsterraDirectLink({
      placement: 'comment-success-nudge',
      category: trackingCategory,
      lang,
    }),
    [lang, trackingCategory]
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const successTrackedRef = useRef(false);

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

  useEffect(() => {
    if (!submitted || successTrackedRef.current) return;
    successTrackedRef.current = true;
    trackMonetizationImpression({
      type: 'support',
      id: 'comment-success-nudge',
      category: trackingCategory,
      placement: 'comment-success-nudge',
    });
    if (directLink) {
      trackMonetizationImpression({
        type: 'adsterra',
        id: directLink.id,
        category: trackingCategory,
        placement: 'comment-success-nudge',
      });
    }
  }, [directLink, submitted, trackingCategory]);

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
            <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: 6 }}>
              {copy.thanks}
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
              {copy.detail}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href={supportHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackMonetizationClick({
                  type: 'support',
                  id: 'buy-me-a-coffee',
                  category: trackingCategory,
                  placement: 'comment-success-nudge',
                })}
                style={{
                  color: '#fff',
                  background: 'linear-gradient(135deg, #FF813F, #FF5F5F)',
                  borderRadius: 6,
                  padding: '7px 12px',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {copy.support}
              </a>
              <a
                href={sponsorHref}
                onClick={() => trackMonetizationClick({
                  type: 'sponsor',
                  id: 'comment-success-sponsor',
                  category: trackingCategory,
                  placement: 'comment-success-nudge',
                })}
                style={{
                  color: 'var(--accent-blue)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: '7px 12px',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {copy.sponsor}
              </a>
              {directLink && (
                <a
                  href={directLink.url}
                  target="_blank"
                  rel="noopener sponsored nofollow"
                  onClick={() => trackMonetizationClick({
                    type: 'adsterra',
                    id: directLink.id,
                    category: trackingCategory,
                    placement: 'comment-success-nudge',
                  })}
                  style={{
                    color: 'var(--accent-blue)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    padding: '7px 12px',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {copy.direct}
                </a>
              )}
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-blue)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: 13,
                  padding: '7px 0',
                }}
              >
                {copy.another}
              </button>
            </div>
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
