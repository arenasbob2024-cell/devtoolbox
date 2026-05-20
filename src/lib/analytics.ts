'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface MonetizationClick {
  type: 'adsterra' | 'affiliate' | 'support' | 'sponsor';
  id: string;
  category?: string;
  placement?: string;
}

interface ToolShareEvent {
  method: 'x' | 'linkedin' | 'copy-link';
  toolId?: string;
  category?: string;
  placement?: string;
}

interface ContentFeedbackEvent {
  contentType: 'blog' | 'tool';
  id: string;
  value: 'up' | 'down' | 'cleared';
  placement?: string;
}

interface NewsletterSignupEvent {
  category?: string;
  placement?: string;
}

interface ToolSearchNoResultsEvent {
  queryLength: number;
  language?: string;
  placement?: string;
}

interface ToolUsageEvent {
  toolId: string;
  category?: string;
  language?: string;
  placement?: string;
  action?: string;
  actionCount?: number;
}

export function trackMonetizationClick({
  type,
  id,
  category,
  placement,
}: MonetizationClick) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'monetization_click', {
    monetization_type: type,
    monetization_id: id,
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackToolShare({
  method,
  toolId,
  category,
  placement,
}: ToolShareEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'tool_share', {
    share_method: method,
    tool_id: toolId || 'unknown',
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackContentFeedback({
  contentType,
  id,
  value,
  placement,
}: ContentFeedbackEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'content_feedback', {
    content_type: contentType,
    content_id: id,
    feedback_value: value,
    placement: placement || 'unknown',
  });
}

export function trackNewsletterSignup({
  category,
  placement,
}: NewsletterSignupEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'newsletter_signup', {
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackToolSearchNoResults({
  queryLength,
  language,
  placement,
}: ToolSearchNoResultsEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'tool_search_no_results', {
    query_length: queryLength,
    result_count: 0,
    language: language || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackToolWorkspaceSeen({
  toolId,
  category,
  language,
  placement,
}: ToolUsageEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'tool_workspace_seen', {
    tool_id: toolId,
    tool_category: category || 'unknown',
    language: language || 'unknown',
    placement: placement || 'unknown',
  });
}

export function trackToolEngagementStart({
  toolId,
  category,
  language,
  placement,
  action,
}: ToolUsageEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'tool_engagement_start', {
    tool_id: toolId,
    tool_category: category || 'unknown',
    language: language || 'unknown',
    placement: placement || 'unknown',
    action: action || 'unknown',
  });
}

export function trackToolEngagementQualified({
  toolId,
  category,
  language,
  placement,
  actionCount,
}: ToolUsageEvent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'tool_engagement_qualified', {
    tool_id: toolId,
    tool_category: category || 'unknown',
    language: language || 'unknown',
    placement: placement || 'unknown',
    action_count: actionCount || 0,
  });
}

export function trackMonetizationImpression({
  type,
  id,
  category,
  placement,
}: MonetizationClick) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'monetization_impression', {
    monetization_type: type,
    monetization_id: id,
    tool_category: category || 'unknown',
    placement: placement || 'unknown',
  });
}
