'use client';

import { useState } from 'react';

export const COPY_SUCCESS_EVENT = 'devtoolbox:copy-success';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  placement?: string;
}

function dispatchCopySuccess(placement?: string) {
  window.dispatchEvent(
    new CustomEvent(COPY_SUCCESS_EVENT, {
      detail: { placement: placement || 'copy-button' },
    })
  );
}

export default function CopyButton({
  text,
  label = 'Copy',
  className,
  placement,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const markCopied = () => {
    setCopied(true);
    dispatchCopySuccess(placement);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      markCopied();
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      markCopied();
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={['btn btn-secondary', className].filter(Boolean).join(' ')}
      style={{ fontSize: 12, padding: '6px 12px' }}
    >
      {copied ? '✓ Copied!' : label}
    </button>
  );
}
