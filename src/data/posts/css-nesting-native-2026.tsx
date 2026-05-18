import Link from 'next/link';

export default function CssNestingNative2026() {
  return (
    <>
      <h2>Native CSS Nesting in 2026: No Preprocessor Needed</h2>
      <p>
        Native CSS nesting is now supported in all major browsers. You can nest selectors directly in
        your stylesheets without Sass, Less, or any build tool. The syntax is slightly different from
        preprocessor nesting but achieves the same goal: scoped, readable, maintainable styles. This
        guide covers the full specification, real-world patterns, migration tips, and edge cases.
      </p>

      <section style={{ margin: '2rem 0', padding: '1.25rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>Quick Answers: CSS Nesting Browser Support in 2026</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>Can I use native CSS nesting in production?</h3>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.7 }}>
              Yes, for modern evergreen browsers. Chrome, Edge, Firefox, Safari, and iOS Safari all support CSS nesting in current releases. If your audience includes older enterprise browsers or embedded WebViews, keep a PostCSS nesting fallback.
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>Which versions support the current relaxed syntax?</h3>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.7 }}>
              Use Chrome 120+, Edge 120+, Firefox 117+, and Safari 17.2+ as the practical baseline for the relaxed syntax where nested element selectors like <code>.card &#123; h2 &#123; ... &#125; &#125;</code> work directly.
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>Should I still write the <code>&amp;</code> selector?</h3>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.7 }}>
              Use <code>&amp;</code> for pseudo-classes, pseudo-elements, chained classes, and any place where you want the parent selector explicitly. For maximum compatibility with older nesting implementations, also use <code>&amp;</code> before bare element selectors or compile with PostCSS.
            </p>
          </div>
        </div>
      </section>

      <h2>Browser Support Matrix</h2>
      <table>
        <thead>
          <tr>
            <th>Browser</th>
            <th>Practical 2026 Baseline</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Chrome</td><td>120+</td><td>Relaxed syntax with lookahead nesting enabled</td></tr>
          <tr><td>Edge</td><td>120+</td><td>Chromium baseline matches Chrome</td></tr>
          <tr><td>Firefox</td><td>117+</td><td>Supports native CSS nesting in modern Firefox</td></tr>
          <tr><td>Safari</td><td>17.2+</td><td>Use as the safest baseline for current syntax</td></tr>
        </tbody>
      </table>
      <p>
        As of 2026, native CSS nesting is safe for modern-browser production sites. The main compatibility
        question is not whether nesting exists, but whether your minimum browser versions support the relaxed
        syntax. If in doubt, keep the <code>&amp;</code> selector explicit or compile with PostCSS.
      </p>

      <h2>Feature Detection with @supports</h2>
      <p>
        CSS nesting can be feature-detected with <code>@supports (selector(&amp;))</code>. Use it when you
        need a safe fallback for older browsers or long-lived embedded WebViews.
      </p>
      <pre><code className="language-css">{`/* Feature-detect native CSS nesting */
@supports (selector(&)) {
  .card {
    padding: 1rem;

    &:hover {
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    }
  }
}

/* Fallback for older browsers */
@supports not (selector(&)) {
  .card {
    padding: 1rem;
  }

  .card:hover {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }
}`}</code></pre>

      <h2>Basic Nesting Syntax</h2>
      <pre><code className="language-css">{`/* Native CSS nesting */
.card {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Nested child selector — & is optional for element and class selectors */
  .card-header {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.75rem;
  }

  .card-body {
    line-height: 1.6;
    color: #374151;
  }

  .card-footer {
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
}

/* Equivalent flat CSS */
/*
.card { ... }
.card .card-header { ... }
.card .card-body { ... }
.card .card-footer { ... }
*/`}</code></pre>

      <h2>The &amp; Nesting Selector</h2>
      <p>
        The <code>&amp;</code> represents the parent selector. It is required when combining selectors
        (like pseudo-classes, attribute selectors, or chaining class names) and optional for descendant
        selectors.
      </p>
      <pre><code className="language-css">{`/* & for pseudo-classes and pseudo-elements */
.button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.15s ease;

  /* Pseudo-classes require & */
  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Pseudo-elements */
  &::before {
    content: "";
    display: inline-block;
    width: 1em;
    height: 1em;
  }

  /* Chaining classes (no space — same element) */
  &.primary {
    background: #3b82f6;
  }

  &.danger {
    background: #ef4444;
  }

  &.outline {
    background: transparent;
    border: 2px solid #3b82f6;
    color: #3b82f6;

    &:hover {
      background: #3b82f6;
      color: white;
    }
  }
}`}</code></pre>

      <h3>Deep Nesting</h3>
      <pre><code className="language-css">{`/* You can nest multiple levels deep */
.nav {
  display: flex;
  align-items: center;

  .nav-list {
    display: flex;
    list-style: none;
    gap: 0.25rem;

    .nav-item {
      position: relative;

      .nav-link {
        display: block;
        padding: 0.5rem 1rem;
        color: #4b5563;
        text-decoration: none;
        border-radius: 0.375rem;

        &:hover {
          background: #f3f4f6;
          color: #111827;
        }

        &.active {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 500;
        }
      }

      /* Dropdown submenu */
      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }

      &:hover .dropdown {
        display: block;
      }
    }
  }
}

/*
  Best practice: Keep nesting to 3 levels max.
  Deeper nesting creates overly specific selectors.
*/`}</code></pre>

      <h2>Nesting Media Queries and Container Queries</h2>
      <pre><code className="language-css">{`/* Media queries can be nested inside selectors */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Container queries nested */
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  padding: 1rem;

  @container card (min-width: 400px) {
    display: flex;
    gap: 1rem;

    .card-image {
      width: 150px;
      flex-shrink: 0;
    }
  }

  @container card (min-width: 600px) {
    padding: 2rem;

    .card-image {
      width: 250px;
    }
  }
}

/* Supports query nested */
.backdrop {
  background: rgba(0, 0, 0, 0.5);

  @supports (backdrop-filter: blur(10px)) {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
  }
}`}</code></pre>

      <h2>Nesting with Combinators</h2>
      <pre><code className="language-css">{`/* Direct child combinator */
.list {
  > li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
      border-bottom: none;
    }

    > a {
      color: #2563eb;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

/* Adjacent sibling */
.heading {
  margin-bottom: 0.5rem;

  + p {
    margin-top: 0;
    color: #6b7280;
  }

  + .heading {
    margin-top: 2rem;
  }
}

/* General sibling */
.toggle-input {
  display: none;

  &:checked ~ .toggle-panel {
    display: block;
    animation: slideDown 0.2s ease;
  }
}

/* Attribute selectors */
.input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &[type="email"],
  &[type="password"] {
    padding-left: 2.5rem;
  }

  &[aria-invalid="true"] {
    border-color: #ef4444;
    background: #fef2f2;
  }

  &[disabled] {
    opacity: 0.5;
    background: #f9fafb;
  }
}`}</code></pre>

      <h2>CSS Nesting vs Sass Nesting</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Native CSS</th>
            <th>Sass/SCSS</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Basic nesting</td><td><code>.parent &#123; .child &#123;&#125; &#125;</code></td><td>Same</td></tr>
          <tr><td>Parent selector</td><td><code>&amp;</code></td><td><code>&amp;</code></td></tr>
          <tr><td>String concatenation</td><td>Not supported</td><td><code>&amp;__element</code></td></tr>
          <tr><td>@media nesting</td><td>Supported</td><td>Supported</td></tr>
          <tr><td>Variables</td><td><code>var(--custom)</code></td><td><code>$variable</code></td></tr>
          <tr><td>Mixins</td><td>Not available</td><td><code>@mixin</code> / <code>@include</code></td></tr>
          <tr><td>Functions</td><td>Limited (calc, min, max)</td><td>Full function system</td></tr>
          <tr><td>Build step required</td><td>No</td><td>Yes</td></tr>
        </tbody>
      </table>

      <h3>Migration from Sass</h3>
      <pre><code className="language-scss">{`/* Sass (won't work in native CSS) */
.block {
  &__element {    /* BEM concatenation — NOT supported natively */
    color: red;
  }
  &--modifier {   /* BEM concatenation — NOT supported natively */
    color: blue;
  }
}

/* Native CSS equivalent */
.block {
  .block__element {
    color: red;
  }
  .block--modifier {
    color: blue;
  }
}

/* Or better — drop BEM and use native nesting */
.block {
  .element {
    color: red;
  }
  &.modifier {
    color: blue;
  }
}`}</code></pre>

      <h2>Real-World Component Example</h2>
      <pre><code className="language-css">{`/* A complete dialog component with native nesting */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: 50;
  opacity: 0;
  transition: opacity 0.2s ease;

  &[data-open="true"] {
    opacity: 1;
  }

  .dialog {
    background: white;
    border-radius: 1rem;
    width: min(90vw, 500px);
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    transform: scale(0.95);
    transition: transform 0.2s ease;

    [data-open="true"] & {
      transform: scale(1);
    }

    .dialog-header {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e7eb;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
      }

      .close-btn {
        width: 2rem;
        height: 2rem;
        border: none;
        background: none;
        border-radius: 0.375rem;
        cursor: pointer;
        display: grid;
        place-items: center;

        &:hover {
          background: #f3f4f6;
        }
      }
    }

    .dialog-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;

      p {
        line-height: 1.6;
        color: #4b5563;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    .dialog-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    @media (max-width: 640px) {
      width: 100vw;
      max-height: 100vh;
      border-radius: 0;
      margin: 0;
    }
  }
}`}</code></pre>

      <h2>Dark Mode with Nesting</h2>
      <pre><code className="language-css">{`/* Combine nesting with CSS custom properties for dark mode */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border: #e5e7eb;

  @media (prefers-color-scheme: dark) {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #9ca3af;
    --border: #374151;
  }
}

.card {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;

  .subtitle {
    color: var(--text-secondary);
  }

  /* Explicit dark mode class override */
  .dark & {
    --bg-primary: #111827;
    --text-primary: #f9fafb;
    --border: #374151;
  }
}`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Limit nesting depth to 3 levels</strong> — deeper nesting creates specificity problems and fragile selectors</li>
        <li><strong>Use &amp; for pseudo-classes and chained selectors</strong> — it makes the relationship explicit</li>
        <li><strong>Nest media queries inside selectors</strong> — keeps responsive styles co-located with the component</li>
        <li><strong>Avoid nesting element selectors deeply</strong> — prefer class-based selectors for maintainability</li>
        <li><strong>Use CSS custom properties instead of Sass variables</strong> — they cascade and respond to context</li>
        <li><strong>PostCSS nesting plugin</strong> — if you need to support older browsers, use postcss-nesting as a fallback</li>
      </ul>

      <p>
        Experiment with CSS nesting patterns using our <Link href="/en/tools/css-formatter">CSS Formatter</Link> tool.
        For migrating from Tailwind utility classes to custom CSS nesting, read our{" "}
        <Link href="/en/blog/css-to-tailwind-migration">CSS to Tailwind Migration</Link> guide. If you are
        building responsive layouts with nesting, check out our{" "}
        <Link href="/en/blog/css-grid-layout-cheat-sheet">CSS Grid Layout Cheat Sheet</Link>.
      </p>
    </>
  );
}
