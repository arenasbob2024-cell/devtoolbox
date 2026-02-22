'use client';
import React from 'react';

export default function CssHasSelectorGuide({ lang }: { lang: string }) {
  return (
    <article>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        CSS :has() Selector: The Parent Selector You Always Wanted
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        For over two decades, CSS developers have wished for a parent selector — the ability to
        style a parent element based on its children. Workarounds involving JavaScript, extra
        classes, and convoluted DOM structures were the only options. The CSS <code style={{ fontFamily: 'monospace' }}>:has()</code> pseudo-class
        finally solves this problem. It is the most powerful CSS selector added in years, enabling
        patterns that were previously impossible without JavaScript.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <code style={{ fontFamily: 'monospace' }}>:has()</code> selector is now supported in all major browsers — Chrome, Firefox,
        Safari, and Edge — making it production-ready in 2026. This guide covers everything from
        basic syntax to advanced real-world patterns, performance considerations, and creative
        uses that go far beyond simple parent selection.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Basic Syntax and How :has() Works
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <code style={{ fontFamily: 'monospace' }}>:has()</code> pseudo-class takes a relative selector list as its argument. It
        matches an element if any of the relative selectors match at least one element when
        anchored against the element being tested. In simpler terms, <code style={{ fontFamily: 'monospace' }}>A:has(B)</code> selects
        element A if it contains (or is related to) element B.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Basic syntax */
selector:has(relative-selector) {
  /* styles applied to selector if relative-selector matches */
}

/* Select a <div> that contains an <img> */
div:has(img) {
  border: 2px solid #3b82f6;
}

/* Select a <form> that contains an invalid input */
form:has(input:invalid) {
  border-left: 4px solid #ef4444;
}

/* Select a <li> that contains a link */
li:has(a) {
  list-style: none;
}

/* Select an <article> that has an <h2> */
article:has(h2) {
  padding-top: 2rem;
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        :has() as a Parent Selector
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The most common use case for <code style={{ fontFamily: 'monospace' }}>:has()</code> is styling a parent based on its
        children. Before <code style={{ fontFamily: 'monospace' }}>:has()</code>, you would need JavaScript to add a class to the
        parent. Now this is pure CSS.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Card layout: adjust when card contains an image */
.card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Card WITH an image: remove top padding, adjust layout */
.card:has(img) {
  padding-top: 0;
  overflow: hidden;
}

.card:has(img) img {
  width: 100%;
  border-radius: 12px 12px 0 0;
  margin-bottom: 1rem;
}

/* Card WITHOUT an image: add an icon placeholder */
.card:not(:has(img)) {
  padding-left: 4rem;
  position: relative;
}

.card:not(:has(img))::before {
  content: '📄';
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
  font-size: 1.5rem;
}

/* Navigation: highlight menu item with active sub-item */
.nav-item:has(.sub-menu a.active) {
  background-color: #f0f7ff;
  border-left: 3px solid #3b82f6;
}

/* Table row styling based on cell content */
tr:has(td.status-error) {
  background-color: #fef2f2;
}
tr:has(td.status-success) {
  background-color: #f0fdf4;
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        :has() as a Previous Sibling Selector
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        CSS has always had the next-sibling selector (<code style={{ fontFamily: 'monospace' }}>+</code>) and the subsequent-sibling
        selector (<code style={{ fontFamily: 'monospace' }}>~</code>), but there was never a way to select the element before a
        sibling. The <code style={{ fontFamily: 'monospace' }}>:has()</code> selector solves this by combining with the sibling
        combinator.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Select an element that is immediately BEFORE another element */
/* "Select h2 that is immediately followed by h3" */
h2:has(+ h3) {
  margin-bottom: 0.5rem; /* Reduce gap since h3 follows */
}

/* Select a paragraph that comes before a code block */
p:has(+ pre) {
  margin-bottom: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Select a label that precedes a required input */
label:has(+ input[required]) {
  font-weight: 700;
}
label:has(+ input[required])::after {
  content: ' *';
  color: #ef4444;
}

/* Select any sibling before a specific element */
/* "Select li that has a .current sibling somewhere after it" */
li:has(~ li.current) {
  /* Style completed steps in a stepper */
  opacity: 0.6;
}
li:has(~ li.current)::before {
  content: '✓';
  color: #22c55e;
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Form Validation and State Management
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        One of the most practical applications of <code style={{ fontFamily: 'monospace' }}>:has()</code> is form validation
        and state-driven styling without JavaScript. You can style entire form sections based on
        the validation state of their inputs, create real-time visual feedback, and even show or
        hide elements based on form state.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Form-level validation styling */
.form-group {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

/* Highlight form group with invalid input */
.form-group:has(input:invalid:not(:placeholder-shown)) {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Highlight form group with valid input */
.form-group:has(input:valid:not(:placeholder-shown)) {
  border-color: #22c55e;
  background-color: #f0fdf4;
}

/* Show error message only when input is invalid */
.form-group .error-message {
  display: none;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-group:has(input:invalid:not(:placeholder-shown)) .error-message {
  display: block;
}

/* Disable submit button when form has invalid inputs */
form:has(input:invalid) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

/* Enable submit button when all inputs are valid */
form:not(:has(input:invalid)) button[type="submit"] {
  opacity: 1;
  pointer-events: auto;
  cursor: pointer;
  background-color: #3b82f6;
}

/* Show password strength indicator */
.password-field:has(input:valid) .strength-bar {
  width: 100%;
  background-color: #22c55e;
}

/* Style fieldset based on its checkbox */
fieldset:has(input[type="checkbox"]:checked) {
  background-color: #eff6ff;
  border-color: #3b82f6;
}

fieldset:has(input[type="checkbox"]:not(:checked)) .conditional-fields {
  display: none;
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Responsive and Adaptive Layouts
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <code style={{ fontFamily: 'monospace' }}>:has()</code> selector enables content-aware layouts that adapt based on
        what content is present, not just viewport size. This is a fundamentally different approach
        to responsive design.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Grid that adapts based on content */
.grid-container {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

/* 2-column layout when container has a sidebar */
.grid-container:has(.sidebar) {
  grid-template-columns: 1fr 300px;
}

/* Full-width layout when there is no sidebar */
.grid-container:not(:has(.sidebar)) .main-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Adjust header layout based on whether search is present */
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header:has(.search-bar) .logo {
  flex-shrink: 0;
}

.header:has(.search-bar) .nav {
  display: none; /* Hide nav when search is expanded */
}

/* Content-aware hero section */
.hero:has(video) {
  min-height: 80vh;
  position: relative;
}

.hero:has(video) .hero-text {
  position: absolute;
  bottom: 2rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.hero:not(:has(video)) {
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Dashboard panels: adjust grid based on widget count */
.dashboard:has(.widget:nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}

.dashboard:has(.widget:nth-child(7)) {
  grid-template-columns: repeat(3, 1fr);
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Theming and Dark Mode with :has()
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <code style={{ fontFamily: 'monospace' }}>:has()</code> selector combined with the checkbox hack enables pure CSS
        theming without JavaScript. You can create toggle switches that change the entire page
        theme, adjust color schemes based on user preferences, and create multi-theme systems.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Pure CSS dark mode toggle */

/* HTML structure:
<html>
  <body>
    <label class="theme-toggle">
      <input type="checkbox" id="dark-mode" />
      <span>Dark Mode</span>
    </label>
    ...content...
  </body>
</html>
*/

/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --accent: #3b82f6;
}

/* Dark theme: when the checkbox is checked */
html:has(#dark-mode:checked) {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border: #334155;
  --accent: #60a5fa;
}

/* Smooth transition between themes */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Toggle switch styling */
.theme-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.theme-toggle input {
  appearance: none;
  width: 48px;
  height: 24px;
  background: var(--border);
  border-radius: 24px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-toggle input::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.theme-toggle input:checked {
  background: var(--accent);
}

.theme-toggle input:checked::before {
  transform: translateX(24px);
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Advanced Selectors: Combining :has() with Other Pseudo-Classes
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The real power of <code style={{ fontFamily: 'monospace' }}>:has()</code> emerges when combined with other pseudo-classes
        like <code style={{ fontFamily: 'monospace' }}>:not()</code>, <code style={{ fontFamily: 'monospace' }}>:is()</code>, <code style={{ fontFamily: 'monospace' }}>:where()</code>,
        and <code style={{ fontFamily: 'monospace' }}>:nth-child()</code>. These combinations enable highly specific and powerful
        selections.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Combine :has() with :not() */
/* Select cards that have text but NO image */
.card:has(p):not(:has(img)) {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
}

/* Select sections that have neither images nor videos */
section:not(:has(img, video)) {
  padding: 3rem 1.5rem;
}

/* Combine :has() with :is() for multiple parent matches */
:is(article, section, div):has(> h2:first-child) {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

/* Quantity queries with :has() */
/* Style a list differently based on item count */

/* Lists with 1-3 items: horizontal layout */
ul:has(li:nth-child(1)):not(:has(li:nth-child(4))) {
  display: flex;
  gap: 1rem;
}

/* Lists with 4+ items: vertical layout */
ul:has(li:nth-child(4)) {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Combine with :focus-within for interactive states */
.search-container:has(input:focus) {
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.search-container:has(input:focus) .search-suggestions {
  display: block;
  opacity: 1;
}

/* Style based on empty/filled state */
.input-group:has(input:placeholder-shown) .clear-button {
  display: none;
}

.input-group:has(input:not(:placeholder-shown)) .clear-button {
  display: flex;
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Real-World Component Patterns
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Here are complete, production-ready component patterns that leverage <code style={{ fontFamily: 'monospace' }}>:has()</code> to
        replace JavaScript-driven class toggling with pure CSS state management.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Accordion / Collapsible component — pure CSS */
.accordion-item {
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.accordion-item input[type="checkbox"] {
  display: none;
}

.accordion-item label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.accordion-item label::after {
  content: '+';
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

/* When the checkbox inside is checked, expand the content */
.accordion-item:has(input:checked) label {
  background-color: var(--bg-secondary);
}

.accordion-item:has(input:checked) label::after {
  content: '−';
  transform: rotate(180deg);
}

.accordion-item .accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 1.5rem;
}

.accordion-item:has(input:checked) .accordion-content {
  max-height: 500px;
  padding: 1rem 1.5rem;
}

/* Tab component — pure CSS */
.tabs {
  border-bottom: 2px solid var(--border);
  display: flex;
  gap: 0;
}

.tabs input[type="radio"] {
  display: none;
}

.tabs label {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s ease;
  color: var(--text-secondary);
}

.tabs:has(#tab1:checked) label[for="tab1"],
.tabs:has(#tab2:checked) label[for="tab2"],
.tabs:has(#tab3:checked) label[for="tab3"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 600;
}

/* Show corresponding tab panel */
.tab-panels .panel { display: none; }
.tab-container:has(#tab1:checked) .panel-1 { display: block; }
.tab-container:has(#tab2:checked) .panel-2 { display: block; }
.tab-container:has(#tab3:checked) .panel-3 { display: block; }`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Performance Considerations
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <code style={{ fontFamily: 'monospace' }}>:has()</code> selector can be expensive for the browser to evaluate
        because it requires checking descendants, which reverses the normal CSS matching direction.
        Browsers have implemented optimizations, but you should still follow these guidelines for
        optimal performance.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Be specific with the subject element.</strong> Using <code style={{ fontFamily: 'monospace' }}>:has(img)</code> on the
        universal selector forces the browser to check every element in the DOM. Instead, use
        <code style={{ fontFamily: 'monospace' }}>.card:has(img)</code> to limit the search scope.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Use the direct child combinator when possible.</strong> Writing <code style={{ fontFamily: 'monospace' }}>.card:has(&gt; img)</code> is
        faster than <code style={{ fontFamily: 'monospace' }}>.card:has(img)</code> because the browser only needs to check
        direct children, not the entire subtree.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Avoid deeply nested :has() selectors.</strong> Nesting <code style={{ fontFamily: 'monospace' }}>:has()</code> inside
        <code style={{ fontFamily: 'monospace' }}>:has()</code> multiplies the matching cost. If you find yourself writing
        <code style={{ fontFamily: 'monospace' }}>.a:has(.b:has(.c))</code>, consider restructuring your HTML or using a class.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Performance: GOOD — specific subject, direct child */
.card:has(> img) { /* ... */ }
.form-group:has(> input:invalid) { /* ... */ }

/* Performance: ACCEPTABLE — specific subject, descendant */
.card:has(img) { /* ... */ }
article:has(.highlight) { /* ... */ }

/* Performance: AVOID — universal subject */
*:has(img) { /* ... */ }
:has(.error) { /* ... */ }

/* Performance: AVOID — deeply nested :has() */
.page:has(.section:has(.card:has(img))) { /* ... */ }

/* Performance: BETTER alternative — flatten the query */
.page:has(.card > img) { /* ... */ }`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Browser Support and Progressive Enhancement
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        As of 2026, <code style={{ fontFamily: 'monospace' }}>:has()</code> is supported in Chrome 105+, Safari 15.4+,
        Firefox 121+, and Edge 105+. This covers over 95% of global browser usage. For the rare
        cases where you need to support older browsers, use the <code style={{ fontFamily: 'monospace' }}>@supports</code> rule for
        progressive enhancement.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* Progressive enhancement with @supports */

/* Base styles (work everywhere) */
.card {
  padding: 1.5rem;
  border-radius: 12px;
}

/* Enhanced styles (only when :has() is supported) */
@supports selector(:has(*)) {
  .card:has(img) {
    padding-top: 0;
  }

  .card:has(img) img {
    border-radius: 12px 12px 0 0;
    width: 100%;
  }

  form:has(input:invalid) .submit-btn {
    opacity: 0.5;
    pointer-events: none;
  }
}

/* Feature detection in JavaScript */
const hasSupport = CSS.supports('selector(:has(*))');
if (!hasSupport) {
  // Apply JavaScript fallback for older browsers
  document.querySelectorAll('.card').forEach(card => {
    if (card.querySelector('img')) {
      card.classList.add('card--has-image');
    }
  });
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Replacing JavaScript with :has()
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Many common JavaScript patterns for managing UI state can now be replaced entirely with
        CSS <code style={{ fontFamily: 'monospace' }}>:has()</code>. This reduces JavaScript bundle size, eliminates
        re-render overhead in frameworks, and moves visual logic to where it belongs — the
        stylesheet.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`/* BEFORE: JavaScript approach */
// document.querySelector('.dropdown-trigger').addEventListener('click', () => {
//   document.querySelector('.dropdown').classList.toggle('open');
// });
// .dropdown.open .dropdown-menu { display: block; }

/* AFTER: Pure CSS with :has() + checkbox */
.dropdown:has(input[type="checkbox"]:checked) .dropdown-menu {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* BEFORE: JavaScript for empty state */
// if (container.children.length === 0) {
//   container.classList.add('empty');
// }

/* AFTER: Pure CSS */
.container:not(:has(*)) {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container:not(:has(*))::after {
  content: 'No items found';
  color: var(--text-secondary);
  font-style: italic;
}

/* BEFORE: JavaScript for conditional rendering */
// const hasMedia = article.querySelector('img, video');
// article.classList.toggle('text-only', !hasMedia);

/* AFTER: Pure CSS */
article:not(:has(img, video)) {
  /* Text-only article styles */
  max-width: 65ch;
  margin-inline: auto;
  font-size: 1.125rem;
  line-height: 1.9;
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Summary
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The CSS <code style={{ fontFamily: 'monospace' }}>:has()</code> pseudo-class is more than a parent selector. It is a
        relational selector that fundamentally changes what is possible in CSS. It enables
        content-aware layouts, pure CSS state management, form validation without JavaScript,
        previous sibling selection, and quantity-based styling. With full browser support in 2026,
        it is ready for production use. Start integrating <code style={{ fontFamily: 'monospace' }}>:has()</code> into your stylesheets
        today — you will find that many patterns you previously relied on JavaScript for can be
        expressed more elegantly and performantly in pure CSS.
      </p>
    </article>
  );
}
