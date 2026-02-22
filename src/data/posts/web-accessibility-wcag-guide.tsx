'use client';

import Link from 'next/link';

export default function WebAccessibilityWcagGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Web Accessibility and WCAG 2.2: A Complete Developer Guide</h2>
      <p>
        Web accessibility ensures that websites and applications are usable by everyone, including people with visual, auditory, motor, and cognitive disabilities. The Web Content Accessibility Guidelines (WCAG) 2.2, published by the W3C, provide the definitive standards that developers should follow. Beyond being an ethical responsibility, accessibility is a legal requirement in many jurisdictions -- the European Accessibility Act, the Americans with Disabilities Act (ADA), and Section 508 all mandate accessible digital experiences.
      </p>
      <p>
        This guide covers the practical implementation of WCAG 2.2 conformance, focusing on what developers need to know: semantic HTML, ARIA attributes, keyboard navigation, color and contrast, form accessibility, and testing strategies. Each section includes code examples that you can apply directly to your projects.
      </p>

      <h2>WCAG 2.2 Principles: POUR</h2>
      <p>
        WCAG is organized around four principles, often referred to by the acronym POUR. Every guideline falls under one of these categories, and understanding them helps you reason about accessibility even in situations not explicitly covered by the specification.
      </p>
      <table>
        <thead>
          <tr><th>Principle</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>Perceivable</td><td>Information must be presentable in ways users can perceive</td><td>Alt text for images, captions for video</td></tr>
          <tr><td>Operable</td><td>UI components must be operable by all users</td><td>Keyboard navigation, sufficient time limits</td></tr>
          <tr><td>Understandable</td><td>Information and UI operation must be understandable</td><td>Clear labels, predictable navigation</td></tr>
          <tr><td>Robust</td><td>Content must work with current and future technologies</td><td>Valid HTML, proper ARIA usage</td></tr>
        </tbody>
      </table>

      <h3>Conformance Levels</h3>
      <p>
        WCAG defines three conformance levels. Level A covers the most basic requirements, Level AA is the standard most organizations target (and most laws require), and Level AAA represents the highest level of accessibility. New in WCAG 2.2 are nine additional success criteria, including focus appearance requirements, dragging alternatives, and accessible authentication.
      </p>

      <h2>Semantic HTML: The Foundation of Accessibility</h2>
      <p>
        Semantic HTML is the single most important accessibility practice. Screen readers, braille displays, and other assistive technologies rely on the document structure communicated through HTML elements. Using the correct element for the correct purpose provides accessibility for free, without any ARIA attributes or JavaScript.
      </p>

      <h3>Document Structure</h3>
      <pre><code className="language-html">{`<!-- GOOD: Semantic structure that assistive technologies can navigate -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Product Overview</h1>
    <p>Introduction paragraph...</p>

    <section aria-labelledby="features-heading">
      <h2 id="features-heading">Features</h2>
      <p>Feature description...</p>

      <h3>Performance</h3>
      <p>Performance details...</p>
    </section>

    <section aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">Pricing</h2>
      <p>Pricing information...</p>
    </section>
  </article>

  <aside aria-label="Related articles">
    <h2>Related Articles</h2>
    <ul>
      <li><a href="/blog/post-1">Related Post 1</a></li>
    </ul>
  </aside>
</main>

<footer>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
</footer>

<!-- BAD: Div soup with no semantic meaning -->
<div class="header">
  <div class="nav">
    <div class="nav-item" onclick="navigate('/')">Home</div>
  </div>
</div>
<div class="content">
  <div class="title">Product Overview</div>
  <div class="text">Introduction...</div>
</div>`}</code></pre>

      <h3>Headings Hierarchy</h3>
      <p>
        Screen reader users frequently navigate pages by heading level. A proper heading hierarchy (h1 through h6, without skipping levels) creates a navigable outline of your content. Every page should have exactly one h1, and headings should be nested logically.
      </p>
      <pre><code className="language-html">{`<!-- CORRECT heading hierarchy -->
<h1>PostgreSQL Performance Guide</h1>
  <h2>Indexing Strategies</h2>
    <h3>B-Tree Indexes</h3>
    <h3>GIN Indexes</h3>
  <h2>Query Optimization</h2>
    <h3>Reading EXPLAIN Plans</h3>
    <h3>Common Anti-Patterns</h3>

<!-- INCORRECT: Skipped heading levels -->
<h1>Guide Title</h1>
  <h3>Section One</h3>  <!-- Skipped h2! -->
  <h4>Subsection</h4>`}</code></pre>

      <h2>ARIA: Enhancing Accessibility When HTML Is Not Enough</h2>
      <p>
        Accessible Rich Internet Applications (ARIA) attributes provide additional semantics for dynamic content and custom components that cannot be fully described by HTML alone. However, the first rule of ARIA is: do not use ARIA if a native HTML element can do the job. ARIA should supplement, not replace, semantic HTML.
      </p>

      <h3>ARIA Roles, States, and Properties</h3>
      <pre><code className="language-html">{`<!-- Custom tab component with proper ARIA -->
<div role="tablist" aria-label="Product information">
  <button
    role="tab"
    id="tab-description"
    aria-selected="true"
    aria-controls="panel-description"
    tabindex="0"
  >
    Description
  </button>
  <button
    role="tab"
    id="tab-reviews"
    aria-selected="false"
    aria-controls="panel-reviews"
    tabindex="-1"
  >
    Reviews
  </button>
  <button
    role="tab"
    id="tab-specs"
    aria-selected="false"
    aria-controls="panel-specs"
    tabindex="-1"
  >
    Specifications
  </button>
</div>

<div
  role="tabpanel"
  id="panel-description"
  aria-labelledby="tab-description"
  tabindex="0"
>
  <p>Product description content...</p>
</div>

<div
  role="tabpanel"
  id="panel-reviews"
  aria-labelledby="tab-reviews"
  tabindex="0"
  hidden
>
  <p>Customer reviews...</p>
</div>

<!-- Live region for dynamic updates (e.g., notifications, search results) -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  <!-- Screen reader announces changes to this region -->
</div>

<!-- Alert for important messages -->
<div role="alert">
  Your session will expire in 5 minutes.
</div>

<!-- Status for non-urgent updates -->
<div role="status">
  3 results found
</div>`}</code></pre>

      <h3>Common ARIA Patterns</h3>
      <pre><code className="language-html">{`<!-- Modal dialog -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirm Deletion</h2>
  <p id="dialog-desc">
    Are you sure you want to delete this item? This action cannot be undone.
  </p>
  <button>Cancel</button>
  <button>Delete</button>
</div>

<!-- Expandable accordion -->
<h3>
  <button
    aria-expanded="false"
    aria-controls="section1-content"
  >
    Section 1: Getting Started
  </button>
</h3>
<div id="section1-content" hidden>
  <p>Content for section 1...</p>
</div>

<!-- Progress indicator -->
<div
  role="progressbar"
  aria-valuenow="65"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Upload progress"
>
  65%
</div>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/products/widget" aria-current="page">Widget</a></li>
  </ol>
</nav>`}</code></pre>

      <h2>Keyboard Navigation</h2>
      <p>
        All interactive elements must be operable using only a keyboard. This is critical for users who cannot use a mouse due to motor disabilities, as well as power users who prefer keyboard navigation. WCAG 2.1 Success Criterion 2.1.1 requires that all functionality is available from a keyboard, and WCAG 2.2 adds stricter requirements for focus visibility.
      </p>

      <h3>Focus Management</h3>
      <pre><code className="language-css">{`/* WCAG 2.2 requires visible focus indicators
   Level AA: Focus indicator must have a minimum area and contrast */

/* Custom focus style that meets WCAG 2.2 requirements */
:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default outline only when using :focus-visible */
:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast focus for dark backgrounds */
.dark-section :focus-visible {
  outline: 3px solid #fbbf24;
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 1000;
  padding: 1rem;
  background: #1e293b;
  color: #ffffff;
}

.skip-link:focus {
  top: 0;
}`}</code></pre>

      <pre><code className="language-typescript">{`// Keyboard navigation for custom components
function TabList({ tabs }: { tabs: TabItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return; // Don't prevent default for other keys
    }

    e.preventDefault();
    setActiveIndex(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div role="tablist">
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          ref={(el) => { tabRefs.current[i] = el; }}
          role="tab"
          aria-selected={i === activeIndex}
          tabIndex={i === activeIndex ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onClick={() => setActiveIndex(i)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Focus trap for modals
function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableElements[0] as HTMLElement;
    const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return containerRef;
}`}</code></pre>

      <h2>Color, Contrast, and Visual Design</h2>
      <p>
        Color alone must never be the only means of conveying information. Approximately 8% of men and 0.5% of women have some form of color vision deficiency. WCAG 2.2 requires specific contrast ratios between text and its background.
      </p>

      <table>
        <thead>
          <tr><th>Element</th><th>Level AA</th><th>Level AAA</th></tr>
        </thead>
        <tbody>
          <tr><td>Normal text (below 18pt)</td><td>4.5:1 contrast ratio</td><td>7:1 contrast ratio</td></tr>
          <tr><td>Large text (18pt+ or 14pt bold)</td><td>3:1 contrast ratio</td><td>4.5:1 contrast ratio</td></tr>
          <tr><td>UI components and graphics</td><td>3:1 contrast ratio</td><td>3:1 contrast ratio</td></tr>
          <tr><td>Focus indicators (WCAG 2.2)</td><td>3:1 contrast ratio</td><td>3:1 contrast ratio</td></tr>
        </tbody>
      </table>

      <pre><code className="language-css">{`/* Accessible color palette with sufficient contrast */
:root {
  /* Text colors - all meet 4.5:1 on white background */
  --text-primary: #1e293b;     /* 13.5:1 ratio */
  --text-secondary: #475569;   /* 7.1:1 ratio */
  --text-muted: #64748b;       /* 4.6:1 ratio - minimum for AA */

  /* Interactive elements - meet 3:1 minimum for UI components */
  --link-color: #2563eb;       /* 4.6:1 ratio */
  --error-color: #dc2626;      /* 4.5:1 ratio */
  --success-color: #15803d;    /* 4.8:1 ratio */

  /* AVOID: Colors that fail contrast requirements */
  /* --bad-gray: #94a3b8;      2.8:1 - FAILS AA */
  /* --bad-yellow: #facc15;    1.9:1 - FAILS AA */
}

/* Status indicators: never rely on color alone */
.status-error {
  color: var(--error-color);
  /* Add icon AND text in addition to color */
}

.status-error::before {
  content: "\\26A0";  /* Warning triangle */
  margin-right: 0.5em;
}

/* Prefer prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Prefer prefers-contrast */
@media (prefers-contrast: high) {
  :root {
    --text-secondary: #1e293b;
    --border-color: #000000;
  }
}`}</code></pre>

      <h2>Forms and Input Accessibility</h2>
      <p>
        Forms are one of the most common sources of accessibility failures. Every input needs a visible label, error messages must be programmatically associated with their inputs, and the form must be navigable and submittable by keyboard alone.
      </p>
      <pre><code className="language-html">{`<!-- Accessible form with proper labels, descriptions, and error handling -->
<form novalidate aria-label="Registration form">
  <!-- Text input with visible label and description -->
  <div class="form-group">
    <label for="email">Email address <span aria-hidden="true">*</span></label>
    <input
      type="email"
      id="email"
      name="email"
      required
      autocomplete="email"
      aria-required="true"
      aria-describedby="email-hint email-error"
      aria-invalid="false"
    />
    <p id="email-hint" class="hint">We will never share your email.</p>
    <p id="email-error" class="error" role="alert" hidden>
      Please enter a valid email address.
    </p>
  </div>

  <!-- Password with strength requirements -->
  <div class="form-group">
    <label for="password">Password <span aria-hidden="true">*</span></label>
    <input
      type="password"
      id="password"
      name="password"
      required
      autocomplete="new-password"
      aria-required="true"
      aria-describedby="password-requirements"
    />
    <div id="password-requirements">
      <p>Password must contain:</p>
      <ul>
        <li aria-live="polite">At least 8 characters</li>
        <li aria-live="polite">One uppercase letter</li>
        <li aria-live="polite">One number</li>
      </ul>
    </div>
  </div>

  <!-- Radio group -->
  <fieldset>
    <legend>Notification preferences</legend>
    <div>
      <input type="radio" id="notify-email" name="notify" value="email" />
      <label for="notify-email">Email</label>
    </div>
    <div>
      <input type="radio" id="notify-sms" name="notify" value="sms" />
      <label for="notify-sms">SMS</label>
    </div>
    <div>
      <input type="radio" id="notify-none" name="notify" value="none" />
      <label for="notify-none">None</label>
    </div>
  </fieldset>

  <button type="submit">Create Account</button>
</form>`}</code></pre>

      <h2>Images, Media, and Alternative Text</h2>
      <p>
        Every non-decorative image must have alternative text that conveys the same information as the image. Decorative images should have an empty alt attribute to be ignored by screen readers. Videos need captions and audio descriptions.
      </p>
      <pre><code className="language-html">{`<!-- Informative image: alt describes the content -->
<img
  src="/chart-revenue-q4.png"
  alt="Bar chart showing Q4 revenue: $2.1M in October, $2.4M in November, $3.1M in December"
/>

<!-- Decorative image: empty alt so screen readers skip it -->
<img src="/decorative-divider.svg" alt="" role="presentation" />

<!-- Complex image with extended description -->
<figure>
  <img
    src="/architecture-diagram.png"
    alt="System architecture diagram"
    aria-describedby="arch-desc"
  />
  <figcaption id="arch-desc">
    The architecture consists of three tiers: a React frontend communicating
    via GraphQL with a Node.js API layer, which connects to PostgreSQL for
    persistent storage and Redis for caching.
  </figcaption>
</figure>

<!-- Video with captions and description -->
<video controls>
  <source src="/tutorial.mp4" type="video/mp4" />
  <track kind="captions" src="/captions-en.vtt" srclang="en" label="English captions" default />
  <track kind="descriptions" src="/descriptions-en.vtt" srclang="en" label="Audio descriptions" />
  Your browser does not support the video element.
</video>`}</code></pre>

      <h2>Testing Tools and Strategies</h2>
      <p>
        Automated testing can catch approximately 30-40% of accessibility issues. The remaining issues require manual testing, including keyboard-only navigation, screen reader testing, and cognitive walkthrough. A comprehensive testing strategy combines automated checks in CI/CD with regular manual audits.
      </p>

      <h3>Automated Testing</h3>
      <pre><code className="language-typescript">{`// Jest + Testing Library: Accessible component testing
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('LoginForm', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    // Tab to email input
    await user.tab();
    expect(screen.getByLabelText(/email/i)).toHaveFocus();

    // Tab to password input
    await user.tab();
    expect(screen.getByLabelText(/password/i)).toHaveFocus();

    // Tab to submit button
    await user.tab();
    expect(screen.getByRole('button', { name: /sign in/i })).toHaveFocus();
  });

  it('should announce errors to screen readers', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    // Submit empty form
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    // Error messages should be present and associated
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent(/email is required/i);
  });
});`}</code></pre>

      <h3>CI/CD Integration</h3>
      <pre><code className="language-yaml">{`# .github/workflows/accessibility.yml
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npm ci
      - run: npm run build

      # axe-core automated checks
      - name: Run axe accessibility tests
        run: npx @axe-core/cli http://localhost:3000 --exit

      # Lighthouse accessibility audit
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/products
          budgetPath: ./lighthouse-budget.json`}</code></pre>

      <h3>Manual Testing Checklist</h3>
      <ul>
        <li><strong>Keyboard-only navigation</strong>: Can you complete all tasks without a mouse? Is focus always visible? Can you escape modals and menus?</li>
        <li><strong>Screen reader testing</strong>: Test with VoiceOver (macOS), NVDA (Windows), and TalkBack (Android). Verify headings, landmarks, form labels, and dynamic content announcements.</li>
        <li><strong>Zoom testing</strong>: Zoom to 200% and verify all content is readable and functional without horizontal scrolling.</li>
        <li><strong>Color and contrast</strong>: Use a browser extension like the WAVE evaluation tool or axe DevTools to check contrast ratios across the entire page.</li>
        <li><strong>Motion sensitivity</strong>: Verify animations respect prefers-reduced-motion and that no content flashes more than three times per second.</li>
        <li><strong>Touch targets</strong>: WCAG 2.2 requires minimum 24x24 CSS pixel touch targets (Level AA). Verify on mobile devices.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Web accessibility is not a feature to add at the end of development -- it is a foundational practice that should be integrated from the start. Using semantic HTML, proper ARIA where needed, visible focus indicators, sufficient color contrast, and accessible forms will address the majority of accessibility barriers. Combine automated testing in your CI/CD pipeline with regular manual testing using screen readers and keyboard-only navigation to maintain conformance as your application evolves.
      </p>
      <p>
        For HTML best practices, see our <Link href={`/${lang}/blog/html-input-types-attributes-guide`}>HTML Input Types Guide</Link>. Use our <Link href={`/${lang}/tools/color-converter`}>Color Converter</Link> to verify accessible color values, and check our <Link href={`/${lang}/tools/meta-tag-generator`}>Meta Tag Generator</Link> for accessible metadata.
      </p>
    </>
  );
}
