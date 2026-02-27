'use client';

const translations = {
  en: {
    title: 'CSS Architecture Guide: BEM, CSS Modules, CSS-in-JS, Tailwind, Cascade Layers, and Large-Scale Patterns — 2026',
    description:
      'Master CSS architecture: BEM vs SMACSS vs OOCSS methodologies, CSS Modules in React/Next.js, styled-components and emotion CSS-in-JS, Tailwind utility-first approach, CSS custom properties for theming, Grid vs Flexbox decision guide, responsive design with container queries, CSS animations and performance, cascade layers (@layer), PostCSS, dark mode, and comparison tables for every approach.',
  },
  zh: {
    title: 'CSS 架构指南：BEM、CSS Modules、CSS-in-JS、Tailwind、Cascade Layers 与大规模应用模式 — 2026',
    description:
      '深入掌握 CSS 架构：BEM vs SMACSS vs OOCSS 方法论，React/Next.js 中的 CSS Modules，styled-components 和 emotion CSS-in-JS，Tailwind 原子化方法，CSS 自定义属性主题化，Grid vs Flexbox 选择指南，容器查询响应式设计，CSS 动画性能优化，级联层（@layer），PostCSS，暗色模式实现，以及各方案对比表格。',
  },
};

export default function CssArchitectureGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is BEM and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BEM (Block Element Modifier) is a CSS naming methodology that structures class names as block__element--modifier. A block is a standalone component (e.g., .card), an element is a part of that component (.card__title), and a modifier represents a variant (.card--featured). BEM prevents naming collisions in global CSS, makes component ownership clear from the class name alone, and scales well in multi-developer teams. It is best suited for projects using plain CSS or preprocessors like Sass without component-scoping solutions. If you are using React with CSS Modules or CSS-in-JS, BEM is largely unnecessary because scoping is handled automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between CSS Modules and CSS-in-JS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CSS Modules are plain CSS files where class names are locally scoped by default at build time. The build tool transforms .card into something like .card_a1b2c3, preventing collisions. CSS-in-JS (styled-components, emotion) writes CSS directly in JavaScript using tagged template literals or object syntax, and injects styles at runtime or via static extraction. CSS Modules have zero runtime overhead and work well with static analysis and linters. CSS-in-JS enables dynamic styles based on props, colocated with component logic, and supports critical CSS extraction. For performance-sensitive apps, CSS Modules or vanilla-extract (zero-runtime CSS-in-JS) are generally preferred over runtime CSS-in-JS.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use CSS Grid vs Flexbox?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use CSS Grid for two-dimensional layouts where you need to control both rows and columns simultaneously — page layouts, card grids, dashboard panels, and any design with explicit grid structure. Use Flexbox for one-dimensional layouts — distributing items along a single axis, centering content, navigation bars, button groups, and component-level alignment. In practice, Grid handles macro layout (the page skeleton) while Flexbox handles micro layout (items within a component). The two are complementary and are often used together: a Grid page layout containing Flexbox-based header and nav components.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are CSS custom properties and how do they enable theming?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CSS custom properties (variables) are declared with -- prefix (e.g., --color-primary: #3b82f6) and accessed via var(--color-primary). Unlike Sass/Less variables which are compiled away, CSS variables are live in the browser, can be updated at runtime with JavaScript, and cascade like any other CSS property. For theming, define a set of semantic variables on :root (e.g., --bg-primary, --text-primary, --accent) and override them inside a [data-theme="dark"] selector or @media (prefers-color-scheme: dark). Components reference only the semantic tokens, so switching themes requires changing only the variable values, not touching any component CSS.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are CSS cascade layers (@layer) and why are they important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CSS cascade layers, introduced in 2022 (@layer), allow you to explicitly manage the order in which CSS rules are applied regardless of source order or specificity within a layer. Styles in a later-declared layer always win over earlier layers, making specificity battles predictable. A typical setup: @layer reset, base, components, utilities; — utilities always win. This is especially useful when integrating third-party styles (like a UI library) with your own overrides. Tailwind CSS v4 uses @layer internally. Cascade layers do not affect inline styles or !important declarations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the pros and cons of Tailwind CSS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tailwind CSS advantages: no context-switching between CSS and HTML files, no naming decisions, no dead CSS (PurgeCSS removes unused classes), rapid prototyping, consistent design system through the theme config, excellent with component frameworks. Disadvantages: HTML becomes verbose and harder to read at a glance, reusing style combinations requires component extraction or @apply, class names expose design details (less semantic), onboarding requires learning Tailwind class names, and customization requires understanding the tailwind.config. Tailwind is most productive in component-based frameworks (React, Vue) where repeated class combinations are extracted into components.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I implement dark mode in CSS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The recommended approach combines CSS custom properties with prefers-color-scheme. Define semantic tokens on :root for light mode and override them inside @media (prefers-color-scheme: dark). For user-toggleable dark mode, add a second override on [data-theme="dark"] applied to the html element via JavaScript. This two-pronged approach respects OS preferences by default but allows user override. Avoid duplicating entire component styles for each theme — only the token values change. Use color-scheme: light dark on :root to get correct browser chrome (scrollbars, form controls) in both themes. Test with the Chromium DevTools color-scheme emulator.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do CSS animations affect performance and what is will-change?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CSS animations are most performant when they animate only transform and opacity, which the browser can handle on the GPU compositor thread without triggering layout or paint. Animating properties like width, height, top, left, or background-color causes reflow/repaint on every frame, dropping frame rates on low-end devices. The will-change property (e.g., will-change: transform) hints to the browser to promote an element to its own compositor layer before the animation starts, eliminating janky first-frame compositing. However, overusing will-change consumes GPU memory — apply it only to elements that will actually animate, and remove it after the animation ends if possible. Use animation-fill-mode: both to maintain the final keyframe state.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/css-architecture-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Modern CSS architecture is about <strong>scoping, predictability, and maintainability</strong> at
          scale. Choose <strong>BEM</strong> for global CSS in multi-developer teams,{' '}
          <strong>CSS Modules</strong> for zero-runtime scoped styles in React/Next.js,{' '}
          <strong>CSS-in-JS</strong> when styles depend on runtime props, and{' '}
          <strong>Tailwind</strong> for utility-first rapid development. Use{' '}
          <strong>CSS custom properties</strong> for live theming and dark mode, <strong>@layer</strong>{' '}
          to manage specificity wars, <strong>Grid</strong> for 2D layouts, and{' '}
          <strong>Flexbox</strong> for 1D alignment. Animate only <strong>transform</strong> and{' '}
          <strong>opacity</strong> for 60 fps performance.
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>BEM = <code>block__element--modifier</code> — prevents naming collisions without build tooling</li>
          <li>CSS Modules auto-scope class names at build time with zero runtime cost</li>
          <li>CSS-in-JS enables prop-driven dynamic styles; prefer vanilla-extract for zero-runtime</li>
          <li>Tailwind removes naming decisions but requires component extraction to avoid class soup</li>
          <li>CSS custom properties cascade and update at runtime — the foundation of live theming</li>
          <li>Use Grid for page-level 2D layouts, Flexbox for component-level 1D alignment</li>
          <li><code>@layer</code> makes specificity predictable; layers defined later always win</li>
          <li>Only animate <code>transform</code> and <code>opacity</code> for GPU-composited 60 fps animations</li>
          <li>Container queries replace many breakpoint patterns for truly reusable components</li>
          <li>Dark mode: CSS variables on <code>:root</code> + <code>prefers-color-scheme</code> + <code>[data-theme]</code> override</li>
        </ul>
      </div>

      {/* Section 1: CSS Methodologies Overview */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Methodologies: BEM, SMACSS, and OOCSS
      </h2>
      <p>
        Before CSS Modules and CSS-in-JS existed, the web community developed naming conventions and
        architecture methodologies to tame global CSS at scale. These methodologies are still widely
        used in projects that rely on plain CSS or Sass without component-scoping build tools.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        BEM (Block Element Modifier)
      </h3>
      <p>
        BEM structures class names as <code>block__element--modifier</code>. A{' '}
        <strong>block</strong> is a standalone, reusable component. An <strong>element</strong> is
        a part of a block that has no standalone meaning. A <strong>modifier</strong> is a flag on a
        block or element that changes its appearance or behavior.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Block: the component itself */
.card { ... }

/* Elements: parts of the block */
.card__title { ... }
.card__body { ... }
.card__footer { ... }
.card__image { ... }

/* Modifiers: state/variant flags */
.card--featured { ... }          /* block modifier */
.card--size-large { ... }        /* block modifier */
.card__title--truncated { ... }  /* element modifier */

/* BEM in HTML */
<article class="card card--featured">
  <img class="card__image" src="..." alt="..." />
  <h2 class="card__title card__title--truncated">...</h2>
  <div class="card__body">...</div>
  <footer class="card__footer">...</footer>
</article>`}</code></pre>
      <p>
        BEM&#39;s double-underscore and double-hyphen syntax looks verbose, but it makes the
        relationship between classes immediately clear without reading the HTML structure. It
        completely eliminates specificity wars because you almost never need to nest selectors.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        SMACSS (Scalable and Modular Architecture for CSS)
      </h3>
      <p>
        SMACSS, created by Jonathan Snook, categorizes CSS rules into five types:{' '}
        <strong>Base</strong> (element defaults), <strong>Layout</strong> (page structure),{' '}
        <strong>Module</strong> (reusable components), <strong>State</strong> (JavaScript-driven
        states), and <strong>Theme</strong> (visual theming overrides).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Base rules — element defaults, no classes */
body { margin: 0; font-family: sans-serif; }
a { color: inherit; }

/* Layout rules — l- prefix */
.l-header { ... }
.l-sidebar { ... }
.l-main { ... }

/* Module rules — the component */
.nav { ... }
.nav-item { ... }

/* State rules — is- prefix, often applied via JS */
.is-active { ... }
.is-hidden { display: none; }
.is-loading { opacity: 0.5; }

/* Theme rules — override module styles */
.theme-ocean .nav { background: #0284c7; }
.theme-forest .nav { background: #15803d; }`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        OOCSS (Object-Oriented CSS)
      </h3>
      <p>
        OOCSS, introduced by Nicole Sullivan, has two core principles:{' '}
        <strong>separate structure from skin</strong> and{' '}
        <strong>separate container from content</strong>. Structure defines layout properties
        (width, height, padding, margin) while skin defines visual properties (background,
        border, color). This produces small, combinable classes instead of monolithic component
        classes.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Structure class — defines layout */
.media { display: flex; align-items: flex-start; gap: 16px; }
.media__body { flex: 1; }

/* Skin classes — define appearance */
.box-shadow { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.rounded { border-radius: 8px; }
.bg-white { background: #fff; }

/* Combine in HTML — similar to Tailwind's philosophy */
<div class="media box-shadow rounded bg-white">
  <img class="media__image" src="..." />
  <div class="media__body">...</div>
</div>

/* Avoid: container-dependent styles */
/* Bad — only works inside .sidebar */
.sidebar h3 { font-size: 14px; }
/* Good — reusable */
.widget-title { font-size: 14px; }`}</code></pre>

      {/* Section 2: CSS Modules */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Modules: Scoped Styles in React and Next.js
      </h2>
      <p>
        CSS Modules solve the global namespace problem at the build level, not through naming
        conventions. Every class name in a <code>.module.css</code> file is locally scoped by
        default. The build tool (webpack, Vite, Turbopack) replaces class names with unique
        hashes, preventing any collision even if two components define a class called{' '}
        <code>.title</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Card.module.css */
.card {
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: var(--bg-surface);
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.body {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Modifiers via composes or conditional className */
.featured {
  composes: card;           /* inherit all card styles */
  border: 2px solid var(--accent);
}`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginTop: 8 }}><code>{`// Card.tsx — React component with CSS Modules
import styles from './Card.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  featured?: boolean;
}

export function Card({ title, children, featured }: CardProps) {
  return (
    <article className={featured ? styles.featured : styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </article>
  );
}

// In the browser DOM, the class becomes something like:
// class="Card_card__a3f8x"  or  "Card_featured__b9d2e"`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        CSS Modules with clsx for Conditional Classes
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        styles['variant-' + variant],
        styles['size-' + size],
        disabled && styles.disabled
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Global Styles Within CSS Modules
      </h3>
      <p>
        CSS Modules scopes everything by default. When you need to target a global class (e.g.,
        from a third-party library), use the <code>:global()</code> pseudo-class.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Target a global class from within a CSS Module */
.wrapper :global(.ql-editor) {
  font-size: 1rem;
  line-height: 1.7;
}

/* Conversely, define a globally-scoped class from a module */
:global(.sr-only) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}`}</code></pre>

      {/* Section 3: CSS-in-JS */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS-in-JS: styled-components, emotion, and vanilla-extract
      </h2>
      <p>
        CSS-in-JS libraries colocate styles with component logic, enabling prop-driven dynamic
        styling, automatic critical CSS extraction, and type-safe theming. The trade-off is
        runtime overhead (for client-side injection libraries) and increased bundle size.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        styled-components
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import styled, { css } from 'styled-components';

// Basic styled component
const Card = styled.article\`
  border-radius: 8px;
  padding: 20px;
  background: \${({ theme }) => theme.colors.surface};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
\`;

// Conditional styles from props
const Button = styled.button<{ variant: 'primary' | 'secondary'; size?: 'sm' | 'lg' }>\`
  padding: \${({ size }) => size === 'sm' ? '6px 12px' : size === 'lg' ? '14px 28px' : '10px 20px'};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;

  \${({ variant, theme }) =>
    variant === 'primary'
      ? css\`
          background: \${theme.colors.primary};
          color: #fff;
          &:hover { background: \${theme.colors.primaryHover}; }
        \`
      : css\`
          background: transparent;
          color: \${theme.colors.primary};
          border: 2px solid \${theme.colors.primary};
          &:hover { background: \${theme.colors.primarySubtle}; }
        \`}
\`;

// Theme provider setup
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primarySubtle: '#eff6ff',
    surface: '#ffffff',
  },
};

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Button variant="primary" size="lg">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
      </Card>
    </ThemeProvider>
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        emotion
      </h3>
      <p>
        emotion offers both a <code>styled</code> API similar to styled-components and a{' '}
        <code>css</code> prop that can be added to any JSX element, giving more granular
        control without creating named components.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const cardStyle = css\`
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
\`;

const titleStyle = css\`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
\`;

// Use the css prop directly on JSX elements
export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article css={cardStyle}>
      <h2 css={titleStyle}>{title}</h2>
      <div>{children}</div>
    </article>
  );
}

// Dynamic styles with cx (class composition)
import { cx } from '@emotion/css';

const base = css\`color: #334155;\`;
const active = css\`color: #3b82f6; font-weight: 600;\`;

<span className={cx(base, isActive && active)}>Item</span>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        vanilla-extract: Zero-Runtime CSS-in-JS
      </h3>
      <p>
        vanilla-extract writes styles in TypeScript <code>.css.ts</code> files that are
        statically analyzed at build time and converted to real CSS classes — no runtime
        overhead. It combines the type-safety of CSS-in-JS with the performance of CSS Modules.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// button.css.ts — statically analyzed at build time
import { style, styleVariants } from '@vanilla-extract/css';

export const base = style({
  borderRadius: '6px',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  padding: '10px 20px',
  transition: 'background 0.15s ease',
});

export const variants = styleVariants({
  primary: {
    background: '#3b82f6',
    color: '#fff',
    ':hover': { background: '#2563eb' },
  },
  secondary: {
    background: 'transparent',
    color: '#3b82f6',
    border: '2px solid #3b82f6',
    ':hover': { background: '#eff6ff' },
  },
  ghost: {
    background: 'transparent',
    color: '#64748b',
    ':hover': { background: '#f1f5f9' },
  },
});

// button.tsx — no runtime CSS injection
import { base, variants } from './button.css';

export function Button({ variant = 'primary', children }: ButtonProps) {
  return <button className={base + ' ' + variants[variant]}>{children}</button>;
}`}</code></pre>

      {/* Section 4: Tailwind CSS */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Tailwind CSS: Utility-First Approach
      </h2>
      <p>
        Tailwind CSS provides a comprehensive set of single-purpose utility classes. Instead of
        writing custom CSS, you compose styles directly in the HTML/JSX using classes like{' '}
        <code>flex items-center gap-4 rounded-lg bg-blue-500 px-4 py-2 text-white</code>.
        Tailwind&#39;s build process (PurgeCSS / content scanning) removes all unused classes,
        resulting in very small production CSS files.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Basic Tailwind Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`{/* Card component using Tailwind */}
<article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
  <h2 className="mb-2 text-xl font-bold text-slate-900">Card Title</h2>
  <p className="text-slate-600 leading-relaxed">Card body content goes here.</p>
  <footer className="mt-4 flex items-center justify-between">
    <span className="text-sm text-slate-400">By Author</span>
    <a className="text-sm font-semibold text-blue-600 hover:text-blue-700">Read more</a>
  </footer>
</article>

{/* Responsive variants */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

{/* State variants: hover, focus, active, dark */}
<button className="
  bg-blue-600 text-white px-4 py-2 rounded-lg
  hover:bg-blue-700
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  active:scale-95
  dark:bg-blue-500 dark:hover:bg-blue-600
  transition-all duration-150
">
  Submit
</button>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Tailwind Configuration and Design Tokens
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',  // or 'media'
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Avoiding Class Soup with Component Extraction
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Instead of repeating long class strings everywhere:
// <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold ...">

// Extract to a variant-aware component using cva (class-variance-authority)
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes always applied
  'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}`}</code></pre>

      {/* Section 5: CSS Custom Properties */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Custom Properties for Theming
      </h2>
      <p>
        CSS custom properties (variables) are native CSS features that cascade through the DOM,
        can be updated at runtime with JavaScript, and enable component-level theming through
        inherited values. They are the foundation of any robust design token system.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Design token system with CSS custom properties */
:root {
  /* Primitive tokens — raw values */
  --color-blue-50:  #eff6ff;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-slate-50: #f8fafc;
  --color-slate-900: #0f172a;

  /* Semantic tokens — reference primitives */
  --bg-primary:   var(--color-slate-50);
  --bg-surface:   #ffffff;
  --text-primary: var(--color-slate-900);
  --text-muted:   #64748b;
  --accent:       var(--color-blue-500);
  --accent-hover: var(--color-blue-600);

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.125rem;
  --font-size-xl:   1.25rem;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.15);
}

/* Components reference semantic tokens, not primitive values */
.card {
  background: var(--bg-surface);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
}

.button-primary {
  background: var(--accent);
  color: #fff;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
}

.button-primary:hover {
  background: var(--accent-hover);
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Updating Variables at Runtime with JavaScript
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Read a CSS variable
const accent = getComputedStyle(document.documentElement)
  .getPropertyValue('--accent').trim();

// Write a CSS variable — all components using var(--accent) update instantly
document.documentElement.style.setProperty('--accent', '#8b5cf6');

// Brand color switcher
function setBrandColor(hue: number) {
  const root = document.documentElement;
  root.style.setProperty('--accent',       \`hsl(\${hue}, 82%, 55%)\`);
  root.style.setProperty('--accent-hover', \`hsl(\${hue}, 82%, 45%)\`);
  root.style.setProperty('--accent-subtle',\`hsl(\${hue}, 82%, 97%)\`);
}

// Apply to scoped element (not just :root)
const card = document.querySelector('.card') as HTMLElement;
card.style.setProperty('--card-bg', '#fefce8'); // only affects this card`}</code></pre>

      {/* Section 6: CSS Grid vs Flexbox */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Grid vs Flexbox: When to Use Which
      </h2>
      <p>
        Grid and Flexbox are both CSS layout systems, but they solve different problems. Knowing
        when to reach for each — and when to combine them — is a key skill for modern CSS
        architecture.
      </p>

      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Aspect</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>CSS Grid</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Flexbox</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Dimensions', '2D (rows + columns)', '1D (row OR column)'],
              ['Primary use', 'Page layouts, card grids, dashboards', 'Component-level alignment, navbars, button groups'],
              ['Placement', 'Place items at specific grid lines/areas', 'Items flow in sequence'],
              ['Overlap', 'Supported (grid-area, z-index)', 'Requires positioning hacks'],
              ['Alignment', 'align-items, justify-items, place-items', 'align-items, justify-content, gap'],
              ['Responsive', 'auto-fit + minmax — no media queries', 'flex-wrap + flex-grow/shrink'],
              ['Content-driven', 'Explicit rows/cols defined by author', 'Items dictate their own size'],
            ].map(([aspect, grid, flex], i) => (
              <tr key={aspect} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                <td style={{ padding: '10px 16px', fontWeight: 600, color: '#334155' }}>{aspect}</td>
                <td style={{ padding: '10px 16px', color: '#475569' }}>{grid}</td>
                <td style={{ padding: '10px 16px', color: '#475569' }}>{flex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Grid for Page Layout, Flexbox for Components
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Grid: macro page layout */
.app-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr 48px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsive card grid — no media query needed */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Flexbox: micro component layout */
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
}

.nav__logo { margin-right: auto; } /* push everything else right */

.button-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Centering — the #1 use case for Flexbox */
.center-both {
  display: flex;
  align-items: center;
  justify-content: center;
}`}</code></pre>

      {/* Section 7: Responsive Design */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Responsive Design: Mobile-First and Container Queries
      </h2>
      <p>
        Mobile-first responsive design means writing base styles for small screens and adding
        complexity for larger screens via <code>min-width</code> media queries. Container
        queries (2023) go further — components respond to their container&#39;s size, not the
        viewport, enabling truly reusable components.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Mobile-First Media Queries
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Mobile-first breakpoint system */
/* Tailwind's default breakpoints as reference */
/* sm:  640px  — small devices, large phones */
/* md:  768px  — tablets */
/* lg:  1024px — small laptops */
/* xl:  1280px — desktops */
/* 2xl: 1536px — large screens */

/* Card component — mobile-first */
.card {
  padding: 16px;          /* mobile: compact */
  font-size: 0.875rem;    /* mobile: smaller text */
}

@media (min-width: 768px) {
  .card {
    padding: 24px;        /* tablet+: more breathing room */
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 32px;        /* desktop: generous padding */
  }
}

/* Prefer min-width (mobile-first) over max-width (desktop-first)
   because it's easier to add complexity than remove it */`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Container Queries
      </h3>
      <p>
        Container queries allow a component to respond to its parent container&#39;s width,
        not the viewport width. This solves the classic problem where the same Card component
        needs to look different when placed in a narrow sidebar vs. a wide main column.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Step 1: Define the containment context on the parent */
.card-wrapper {
  container-type: inline-size;
  container-name: card;   /* optional: named container */
}

/* Step 2: Query the container size in the child */
.card {
  display: block;         /* stacked layout for narrow containers */
}

.card__image { width: 100%; }

@container card (min-width: 400px) {
  /* Side-by-side layout when container >= 400px */
  .card {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 16px;
    align-items: start;
  }
}

@container card (min-width: 600px) {
  /* Larger image and bigger text for wide containers */
  .card {
    grid-template-columns: 240px 1fr;
  }
  .card__title { font-size: 1.5rem; }
}

/* This same Card component now works correctly in
   both a narrow sidebar (stacked) and a wide main
   content area (side-by-side) WITHOUT any props! */`}</code></pre>

      {/* Section 8: CSS Animations and Performance */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Animations and Performance
      </h2>
      <p>
        CSS animations can run on the main thread (causing layout and paint) or on the
        compositor thread (GPU-accelerated, no layout/paint). Understanding the rendering
        pipeline is critical for 60 fps animations.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Rendering Pipeline
      </h3>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 20, margin: '16px 0' }}>
        <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#1e293b' }}>CSS Property Cost Tiers:</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#475569' }}>
          <li><strong style={{ color: '#15803d' }}>Free (compositor thread)</strong>: <code>transform</code>, <code>opacity</code>, <code>filter</code></li>
          <li><strong style={{ color: '#b45309' }}>Paint only</strong>: <code>color</code>, <code>background-color</code>, <code>box-shadow</code>, <code>border-color</code></li>
          <li><strong style={{ color: '#dc2626' }}>Layout + Paint (expensive)</strong>: <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code>, <code>padding</code>, <code>font-size</code></li>
        </ul>
      </div>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* GPU-composited animation — 60 fps on any device */
@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}

.drawer {
  animation: slide-in 300ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

/* Expensive animation — causes layout on every frame */
@keyframes expand-bad {
  from { width: 0; }
  to   { width: 300px; }
}

/* Better: simulate width change with transform */
@keyframes expand-good {
  from { transform: scaleX(0); transform-origin: left; }
  to   { transform: scaleX(1); transform-origin: left; }
}

/* will-change: promote to its own layer before animation */
.animated-card {
  will-change: transform;  /* hint browser to create GPU layer */
}

/* Remove will-change after animation to free GPU memory */
.animated-card.done {
  will-change: auto;
}

/* Respect prefers-reduced-motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Keyframe Animation Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Scale in from center */
@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}

/* Shake (for error feedback) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-10px); }
  40%       { transform: translateX(10px); }
  60%       { transform: translateX(-6px); }
  80%       { transform: translateX(6px); }
}

/* Pulse loading skeleton */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.skeleton {
  background: #e2e8f0;
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}

/* Spin for loading indicators */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 0.8s linear infinite;
  will-change: transform;
}

/* Staggered children animations */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }`}</code></pre>

      {/* Section 9: Cascade Layers */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Cascade Layers (@layer)
      </h2>
      <p>
        Cascade layers, standardized in 2022 and supported in all modern browsers, allow you to
        define explicit ordering for CSS rule priority. Styles in a layer declared later always
        override styles in earlier layers, regardless of specificity. This eliminates specificity
        wars when integrating third-party styles with your own.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Declare layer order first — later layers win */
@layer reset, base, third-party, components, utilities;

/* Fill each layer */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  img { max-width: 100%; }
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--text-primary);
    background: var(--bg-primary);
  }
  h1, h2, h3 { line-height: 1.25; }
}

@layer third-party {
  /* Import a UI library — its styles stay here */
  @import url('some-ui-library.css');
}

@layer components {
  .card {
    border-radius: 8px;
    padding: 20px;
    /* This wins over third-party .card because components > third-party */
  }
}

@layer utilities {
  /* Always-win utilities */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
  .truncate  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .visually-hidden { visibility: hidden; }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Layers vs !important
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* !important within a layer is still bounded by the layer order */
/* !important reverses the layer order for the cascade */

@layer base, components;

@layer base {
  .title { color: red !important; }   /* !important within base layer */
}

@layer components {
  .title { color: blue; }  /* no !important */
}

/* Result: blue — components layer wins over base layer
   because !important reverses priority between layers,
   making unlayered !important > higher layers' !important > lower layers' !important */

/* Practical rule: prefer proper layer ordering over !important */`}</code></pre>

      {/* Section 10: PostCSS and CSS Preprocessing */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        PostCSS and CSS Preprocessing
      </h2>
      <p>
        PostCSS is a tool for transforming CSS with JavaScript plugins. Unlike Sass or Less
        (which are separate languages that compile to CSS), PostCSS processes valid CSS and
        applies targeted transformations. Most modern build tools (Vite, Next.js, webpack) use
        PostCSS under the hood.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        PostCSS Configuration
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),            // Tailwind CSS
    require('autoprefixer'),           // Add vendor prefixes automatically
    require('postcss-nesting'),        // Enable CSS nesting (spec-compliant)
    require('postcss-custom-media'),   // Custom media query names
    require('cssnano')({               // Minify in production
      preset: 'default',
    }),
  ],
};`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sass / SCSS Still Relevant
      </h3>
      <p>
        Despite CSS Variables and native nesting, Sass/SCSS remains widely used for its
        mixins, functions, loops, and module system. It is especially valuable in large
        design systems that predate CSS-in-JS adoption.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// _tokens.scss — Sass module
$colors: (
  "blue-50":  #eff6ff,
  "blue-500": #3b82f6,
  "blue-600": #2563eb,
);

// _mixins.scss
@mixin respond-to($bp) {
  $breakpoints: ("sm": 640px, "md": 768px, "lg": 1024px, "xl": 1280px);
  @media (min-width: map-get($breakpoints, $bp)) { @content; }
}

@mixin visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

// _card.scss
@use 'tokens' as t;
@use 'mixins' as m;

.card {
  padding: 16px;
  background: white;
  border-radius: 8px;

  @include m.respond-to('md') {
    padding: 24px;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  &--featured {
    border: 2px solid map-get(t.$colors, "blue-500");
  }
}`}</code></pre>

      {/* Section 11: Dark Mode */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Dark Mode with prefers-color-scheme and CSS Variables
      </h2>
      <p>
        The recommended modern approach to dark mode uses CSS custom properties as semantic
        tokens combined with the <code>prefers-color-scheme</code> media query. A secondary
        <code>[data-theme]</code> attribute on <code>{'<html>'}</code> enables user-toggled
        dark mode that overrides the OS preference.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Complete dark mode token system */
:root {
  color-scheme: light dark;  /* browser chrome follows suit */

  /* Light mode tokens */
  --bg-base:     #f8fafc;
  --bg-surface:  #ffffff;
  --bg-elevated: #ffffff;
  --text-primary:   #0f172a;
  --text-secondary: #475569;
  --text-muted:     #94a3b8;
  --border:         #e2e8f0;
  --border-focus:   #3b82f6;
  --accent:         #3b82f6;
  --accent-hover:   #2563eb;
  --shadow:         rgba(0, 0, 0, 0.08);
}

/* System dark mode (automatic, respects OS) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-base:     #0f172a;
    --bg-surface:  #1e293b;
    --bg-elevated: #334155;
    --text-primary:   #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted:     #64748b;
    --border:         #334155;
    --border-focus:   #60a5fa;
    --accent:         #60a5fa;
    --accent-hover:   #93c5fd;
    --shadow:         rgba(0, 0, 0, 0.3);
  }
}

/* User toggle dark mode (overrides OS preference) */
[data-theme="dark"] {
  --bg-base:     #0f172a;
  --bg-surface:  #1e293b;
  --bg-elevated: #334155;
  --text-primary:   #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted:     #64748b;
  --border:         #334155;
  --border-focus:   #60a5fa;
  --accent:         #60a5fa;
  --accent-hover:   #93c5fd;
  --shadow:         rgba(0, 0, 0, 0.3);
}

[data-theme="light"] {
  /* Force light mode even on dark OS */
  color-scheme: light;
  --bg-base:    #f8fafc;
  /* ... repeat light values */
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Dark Mode Toggle in React
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`'use client';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as Theme) ?? 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? '☀ Light' : '⏾ Dark'}
    </button>
  );
}`}</code></pre>

      {/* Section 12: CSS Architecture for Large Apps */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Architecture for Large-Scale Applications
      </h2>
      <p>
        As applications grow, CSS architecture choices compound. Here are proven patterns for
        keeping styles maintainable across large codebases with multiple developers.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Design Token System
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* tokens/
 *   primitives.css   — raw color/spacing/size values
 *   semantic.css     — context-aware references to primitives
 *   component.css    — component-level tokens
 */

/* primitives.css */
:root {
  --primitive-blue-400: #60a5fa;
  --primitive-blue-500: #3b82f6;
  --primitive-red-500:  #ef4444;
  --primitive-space-4:  1rem;
  --primitive-space-6:  1.5rem;
}

/* semantic.css */
:root {
  --color-action:          var(--primitive-blue-500);
  --color-action-hover:    var(--primitive-blue-400);
  --color-danger:          var(--primitive-red-500);
  --spacing-content-gap:   var(--primitive-space-4);
  --spacing-section-gap:   var(--primitive-space-6);
}

/* component tokens — locally scoped to a component */
.button {
  --button-bg:       var(--color-action);
  --button-bg-hover: var(--color-action-hover);
  --button-padding:  0.5rem 1rem;

  background: var(--button-bg);
  padding: var(--button-padding);
}

.button:hover {
  background: var(--button-bg-hover);
}

/* Override component token for a specific context */
.hero .button {
  --button-bg: #fff;          /* white button in hero */
  --button-bg-hover: #f0f9ff;
  color: var(--color-action);
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        File Organization
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Recommended file structure for a large Next.js app */
src/
├── styles/
│   ├── globals.css          /* @layer reset; @layer base; tokens */
│   ├── tokens/
│   │   ├── primitives.css
│   │   ├── semantic.css
│   │   └── dark.css
│   └── utilities.css        /* @layer utilities; */
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── Button.test.tsx
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.module.css
│   └── Modal/
│       ├── Modal.tsx
│       └── Modal.module.css
└── app/
    ├── layout.tsx
    └── page.tsx`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        CSS Linting with Stylelint
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// .stylelintrc.json
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-css-modules"
  ],
  "plugins": [
    "stylelint-order"
  ],
  "rules": {
    "order/properties-order": [
      "content",
      "display",
      "position",
      "top", "right", "bottom", "left",
      "z-index",
      "flex", "flex-direction", "align-items", "justify-content",
      "grid", "grid-template-columns", "grid-template-rows",
      "width", "height", "min-width", "max-width",
      "margin", "padding",
      "background", "color",
      "font-size", "font-weight", "line-height",
      "border", "border-radius",
      "box-shadow",
      "transition", "animation"
    ],
    "custom-property-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
    "selector-class-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$",
    "no-descending-specificity": true
  }
}`}</code></pre>

      {/* Section 13: Comparison Table */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Comparison Table: BEM vs CSS Modules vs Tailwind vs CSS-in-JS
      </h2>
      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Criterion</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>BEM</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>CSS Modules</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Tailwind</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>CSS-in-JS</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Scoping', 'Naming convention', 'Build-time hash', 'Inline utility classes', 'Runtime hash / static extract'],
              ['Runtime cost', 'None', 'None', 'None (PurgeCSS)', 'Medium (runtime) / None (vanilla-extract)'],
              ['Dynamic styles', 'Via JS className toggle', 'Via className toggle', 'Via className toggle', 'Native via props'],
              ['TypeScript support', 'None', 'Type-safe via .d.ts', 'Partial (cva)', 'Full (prop types)'],
              ['Learning curve', 'Low', 'Low', 'Medium (class names)', 'Medium-High'],
              ['Best for', 'Multi-dev plain CSS / Sass', 'React/Next.js component styles', 'Rapid prototyping, design systems', 'Highly dynamic, prop-driven styles'],
              ['Debugging', 'Readable class names', 'Hashed names (source maps)', 'Long class lists', 'Auto-generated class names'],
              ['Code splitting', 'Manual (imports)', 'Automatic per module', 'Single CSS bundle', 'Component-level (runtime)'],
              ['Tree shaking', 'No', 'No (import all)', 'Yes (PurgeCSS)', 'Yes (only used components)'],
              ['DX (colocated)', 'No (separate CSS file)', 'Separate .module.css', 'Same file (JSX classes)', 'Same file (styled/css prop)'],
            ].map(([crit, bem, modules, tw, cij], i) => (
              <tr key={crit} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: '#334155' }}>{crit}</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{bem}</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{modules}</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{tw}</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{cij}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 14: FAQ */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        What is BEM and when should I use it?
      </h3>
      <p>
        BEM (Block Element Modifier) structures class names as <code>block__element--modifier</code>.
        Use it when your project uses global CSS without a build-time scoping solution. BEM
        prevents naming collisions through convention rather than tooling. If you are using React
        with CSS Modules or CSS-in-JS, BEM is largely redundant since scoping is automatic.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        What is the difference between CSS Modules and CSS-in-JS?
      </h3>
      <p>
        CSS Modules scope class names at build time with zero runtime cost. CSS-in-JS
        (styled-components, emotion) writes CSS in JavaScript, enabling prop-driven dynamic
        styles, but with runtime injection overhead. vanilla-extract is a zero-runtime alternative
        that gives CSS-in-JS type-safety without the performance penalty.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        When should I use CSS Grid vs Flexbox?
      </h3>
      <p>
        Use <strong>Grid</strong> for two-dimensional layouts (page skeleton, card grids,
        dashboards). Use <strong>Flexbox</strong> for one-dimensional layouts (navbars, button
        groups, centering, component-level alignment). They are complementary — a Grid page
        can contain Flexbox components.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        How do CSS custom properties enable theming?
      </h3>
      <p>
        Define semantic tokens (<code>--text-primary</code>, <code>--bg-surface</code>) on{' '}
        <code>:root</code> and override them in <code>@media (prefers-color-scheme: dark)</code>{' '}
        or <code>[data-theme=&quot;dark&quot;]</code>. Components reference only the semantic tokens,
        so the entire theme switches by changing token values — no component CSS needs to
        change.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        What are the pros and cons of Tailwind CSS?
      </h3>
      <p>
        <strong>Pros:</strong> no naming decisions, no dead CSS, rapid prototyping, consistent
        design system, excellent developer experience in component frameworks.
        <strong> Cons:</strong> verbose HTML, harder to read at a glance, reusing style
        combinations requires component extraction, steep initial learning curve for the class
        names.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        How do CSS animations affect performance?
      </h3>
      <p>
        Only <code>transform</code> and <code>opacity</code> are truly free — they run on
        the GPU compositor thread without layout or paint. Animating <code>width</code>,{' '}
        <code>height</code>, <code>top</code>, <code>left</code> triggers layout recalculation
        on every frame, causing drops below 60 fps on lower-end devices. Use{' '}
        <code>will-change: transform</code> to promote animated elements to their own GPU
        layer.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        What are cascade layers and why do they matter?
      </h3>
      <p>
        <code>@layer</code> defines explicit CSS priority tiers. Styles in a later-declared
        layer always win over earlier layers, regardless of specificity within each layer. This
        eliminates specificity wars when combining reset styles, base styles, third-party
        component libraries, your own components, and utility overrides.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        How do I implement dark mode in CSS?
      </h3>
      <p>
        Use semantic CSS custom properties on <code>:root</code> for light mode values.
        Override them inside <code>@media (prefers-color-scheme: dark)</code> for automatic
        OS-based dark mode. Add a second override on <code>[data-theme=&quot;dark&quot;]</code> for
        user-toggled dark mode. Set <code>color-scheme: light dark</code> on <code>:root</code>{' '}
        so browser chrome (scrollbars, form inputs) follows the theme.
      </p>
    </article>
  );
}
