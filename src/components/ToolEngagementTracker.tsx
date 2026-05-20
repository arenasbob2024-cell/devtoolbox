'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLang } from '@/i18n/LangContext';
import {
  trackToolEngagementQualified,
  trackToolEngagementStart,
  trackToolWorkspaceSeen,
} from '@/lib/analytics';

const QUALIFIED_ACTION_COUNT = 2;
const QUALIFIED_ACTIVE_MS = 30000;

interface ToolEngagementTrackerProps {
  toolId: string;
  category?: string;
  children: ReactNode;
}

function isFormControl(target: EventTarget | null) {
  return target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement;
}

function isMeaningfulClick(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('button, [role="button"]'));
}

function actionFromEvent(event: Event) {
  if (event.type === 'click' && !isMeaningfulClick(event.target)) return '';
  if ((event.type === 'input' || event.type === 'change') && !isFormControl(event.target)) return '';

  return event.type;
}

export default function ToolEngagementTracker({
  toolId,
  category,
  children,
}: ToolEngagementTrackerProps) {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const seenRef = useRef(false);
  const startedRef = useRef(false);
  const qualifiedRef = useRef(false);
  const actionCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || seenRef.current) return;

    const trackSeen = () => {
      if (seenRef.current) return;
      seenRef.current = true;
      trackToolWorkspaceSeen({
        toolId,
        category,
        language: lang,
        placement: 'tool-workspace',
      });
    };

    if (!('IntersectionObserver' in window)) {
      trackSeen();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        trackSeen();
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [category, lang, toolId]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const trackQualified = () => {
      if (qualifiedRef.current || !startedRef.current) return;
      qualifiedRef.current = true;
      trackToolEngagementQualified({
        toolId,
        category,
        language: lang,
        placement: 'tool-workspace',
        actionCount: actionCountRef.current,
      });
    };

    const trackAction = (event: Event) => {
      const action = actionFromEvent(event);
      if (!action) return;

      actionCountRef.current += 1;

      if (!startedRef.current) {
        startedRef.current = true;
        trackToolEngagementStart({
          toolId,
          category,
          language: lang,
          placement: 'tool-workspace',
          action,
        });
        timerRef.current = window.setTimeout(trackQualified, QUALIFIED_ACTIVE_MS);
      }

      if (actionCountRef.current >= QUALIFIED_ACTION_COUNT) {
        trackQualified();
      }
    };

    const eventNames = ['input', 'change', 'paste', 'drop', 'click'];
    eventNames.forEach(eventName => element.addEventListener(eventName, trackAction, true));

    return () => {
      eventNames.forEach(eventName => element.removeEventListener(eventName, trackAction, true));
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [category, lang, toolId]);

  return (
    <div ref={containerRef} data-tool-workspace={toolId}>
      {children}
    </div>
  );
}
