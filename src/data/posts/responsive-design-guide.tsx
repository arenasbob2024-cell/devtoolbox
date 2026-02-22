'use client';

import Link from 'next/link';

export default function ResponsiveDesignGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is Responsive Web Design?</h2>
      <p>
        <strong>Responsive Web Design (RWD)</strong> is an approach to web design that makes web pages render well on a variety of devices and screen sizes. Rather than creating separate designs for desktop, tablet, and mobile, responsive design uses flexible grids, fluid images, and CSS media queries to automatically adapt the layout to the viewing environment.
      </p>
      <p>
        In 2026, over 60% of global web traffic comes from mobile devices. Google uses mobile-first indexing, meaning it primarily uses the mobile version of your content for ranking. Responsive design is not optional -- it is a fundamental requirement for modern web development and SEO.
      </p>

      <h2>The Mobile-First Approach</h2>
      <p>
        Mobile-first design means starting with the smallest screen and progressively enhancing the layout for larger screens. This approach forces you to prioritize content and functionality, resulting in cleaner, faster experiences for all users.
      </p>
      <pre><code className="language-css">{`/* Mobile-first: Base styles for small screens */
.container {
  padding: 16px;
  width: 100%;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    max-width: 768px;
    margin: 0 auto;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 32px;
  }

  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }

  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}`}</code></pre>

      <h2>CSS Container Queries</h2>
      <p>
        Container queries are a game-changer for responsive design. Unlike media queries that respond to the viewport size, container queries let components respond to their parent container's size. This makes components truly reusable across different layouts.
      </p>
      <pre><code className="language-css">{`/* Define a containment context */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

/* When sidebar is at least 400px wide */
@container sidebar (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: 16px;
  }

  .card-image {
    width: 150px;
    flex-shrink: 0;
  }
}

/* Container query with aspect-ratio */
@container (min-width: 600px) {
  .hero {
    aspect-ratio: 16 / 9;
    background-size: cover;
  }
}

/* Container query units */
.card-title {
  /* 5% of container width, clamped between 16px and 24px */
  font-size: clamp(16px, 5cqi, 24px);
}`}</code></pre>

      <h2>Modern CSS Layout: Flexbox</h2>
      <p>
        Flexbox is ideal for one-dimensional layouts (rows or columns). It excels at distributing space and aligning items within a container.
      </p>
      <pre><code className="language-css">{`/* Responsive navigation with Flexbox */
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
}

.nav-link {
  flex: 1 1 auto;
  min-width: 120px;
  text-align: center;
  padding: 12px 16px;
}

/* Responsive card layout with Flexbox */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* Grow, shrink, min 300px */
  max-width: 100%;
}

/* Holy grail layout */
.page {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
}

.page-header,
.page-footer {
  flex: 1 1 100%;
}

.page-sidebar {
  flex: 0 0 250px;
}

.page-main {
  flex: 1 1 0;
  min-width: 0;  /* Prevent overflow */
}

@media (max-width: 768px) {
  .page-sidebar {
    flex: 1 1 100%;
    order: 2;  /* Move sidebar below main on mobile */
  }
}`}</code></pre>

      <h2>Modern CSS Layout: Grid</h2>
      <p>
        CSS Grid is perfect for two-dimensional layouts. It provides powerful tools for creating complex, responsive page layouts without media queries.
      </p>
      <pre><code className="language-css">{`/* Auto-responsive grid (no media queries needed!) */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Dashboard layout */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto 1fr 40px;
    grid-template-areas:
      "header"
      "sidebar"
      "main"
      "footer";
  }
}

.dash-header  { grid-area: header; }
.dash-sidebar { grid-area: sidebar; }
.dash-main    { grid-area: main; }
.dash-footer  { grid-area: footer; }

/* Responsive magazine layout */
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.featured {
  grid-column: span 12;
}

.article {
  grid-column: span 6;
}

.sidebar-widget {
  grid-column: span 4;
}

@media (max-width: 768px) {
  .featured,
  .article,
  .sidebar-widget {
    grid-column: span 12;
  }
}

/* Subgrid for consistent alignment */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;  /* title, content, footer */
}`}</code></pre>

      <h2>Fluid Typography with clamp()</h2>
      <p>
        The <code>clamp()</code> function creates fluid typography that scales smoothly between minimum and maximum sizes without media queries. This eliminates the need for breakpoint-specific font sizes.
      </p>
      <pre><code className="language-css">{`/* Fluid typography scale */
:root {
  /* clamp(minimum, preferred, maximum) */
  --font-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-lg: clamp(1.125rem, 1rem + 0.625vw, 1.375rem);
  --font-xl: clamp(1.25rem, 1rem + 1.25vw, 2rem);
  --font-2xl: clamp(1.5rem, 1rem + 2.5vw, 3rem);
  --font-3xl: clamp(2rem, 1.2rem + 4vw, 4.5rem);

  /* Fluid spacing */
  --space-sm: clamp(8px, 1vw, 16px);
  --space-md: clamp(16px, 2vw, 32px);
  --space-lg: clamp(24px, 4vw, 64px);
  --space-xl: clamp(48px, 8vw, 128px);
}

h1 { font-size: var(--font-3xl); }
h2 { font-size: var(--font-2xl); }
h3 { font-size: var(--font-xl); }
p  { font-size: var(--font-base); }

/* Section spacing */
section {
  padding: var(--space-lg) var(--space-md);
}

.hero-title {
  font-size: var(--font-3xl);
  line-height: 1.1;
  letter-spacing: -0.02em;
}`}</code></pre>

      <h2>Responsive Images</h2>
      <p>
        Images often account for the majority of page weight. Responsive images ensure the right image size is delivered to each device, saving bandwidth and improving load times.
      </p>
      <pre><code className="language-html">{`<!-- Art direction with <picture> -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="hero-desktop.webp 1200w, hero-desktop-2x.webp 2400w"
    sizes="100vw"
  />
  <source
    media="(min-width: 768px)"
    srcset="hero-tablet.webp 768w, hero-tablet-2x.webp 1536w"
    sizes="100vw"
  />
  <img
    src="hero-mobile.webp"
    srcset="hero-mobile.webp 400w, hero-mobile-2x.webp 800w"
    sizes="100vw"
    alt="Hero image"
    loading="lazy"
    width="400"
    height="300"
  />
</picture>

<!-- Responsive image with srcset and sizes -->
<img
  srcset="
    photo-400.webp 400w,
    photo-800.webp 800w,
    photo-1200.webp 1200w,
    photo-1600.webp 1600w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="photo-800.webp"
  alt="Responsive photo"
  loading="lazy"
  decoding="async"
/>`}</code></pre>
      <pre><code className="language-css">{`/* Fluid images with CSS */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Object-fit for consistent aspect ratios */
.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
}

/* Background images */
.hero {
  background-image: url('hero-mobile.webp');
  background-size: cover;
  background-position: center;
  min-height: 50vh;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-desktop.webp');
    min-height: 60vh;
  }
}

/* Modern image-set() */
.hero {
  background-image: image-set(
    url('hero.webp') type('image/webp'),
    url('hero.jpg') type('image/jpeg')
  );
}`}</code></pre>

      <h2>Responsive Navigation Patterns</h2>
      <pre><code className="language-css">{`/* Responsive hamburger navigation */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.nav-links {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
}

.nav-links.active {
  display: flex;
}

.hamburger {
  display: block;
  cursor: pointer;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    flex-direction: row;
    position: static;
    background: none;
    box-shadow: none;
    padding: 0;
    gap: 24px;
  }

  .hamburger {
    display: none;
  }
}

/* Priority+ navigation pattern */
.nav-priority {
  display: flex;
  overflow: hidden;
}

.nav-priority-item {
  flex-shrink: 0;
  white-space: nowrap;
}

.nav-more {
  flex-shrink: 0;
  margin-left: auto;
}`}</code></pre>

      <h2>Viewport Units and Dynamic Viewport</h2>
      <pre><code className="language-css">{`/* Traditional viewport units */
.fullscreen {
  height: 100vh;  /* Problem: doesn't account for mobile browser chrome */
}

/* Dynamic viewport units (accounts for browser chrome) */
.fullscreen-modern {
  height: 100dvh;  /* Dynamic viewport height */
  min-height: 100svh;  /* Small viewport height (always visible) */
}

/* Use dvh for full-screen sections */
.hero {
  min-height: 100dvh;
  display: grid;
  place-items: center;
}

/* Use svh for elements that should always be visible */
.modal {
  max-height: 100svh;
  overflow-y: auto;
}

/* Viewport-relative sizing */
.sidebar {
  width: min(300px, 80vw);  /* Never wider than 80% of viewport */
}

.content {
  max-width: min(70ch, 90vw);  /* Optimal reading width */
  margin: 0 auto;
}`}</code></pre>

      <h2>CSS Logical Properties</h2>
      <p>
        Logical properties adapt automatically to different writing modes and text directions (LTR/RTL), making your responsive design truly international.
      </p>
      <pre><code className="language-css">{`/* Physical properties (old way) */
.card {
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-left: 3px solid blue;
}

/* Logical properties (new way - works with RTL) */
.card {
  margin-inline: 16px;        /* left + right in LTR */
  padding-block: 24px;        /* top + bottom */
  border-inline-start: 3px solid blue;  /* left in LTR, right in RTL */
}

/* More logical properties */
.element {
  inline-size: 100%;          /* width in horizontal writing mode */
  max-inline-size: 800px;     /* max-width */
  block-size: auto;           /* height */
  inset-block-start: 0;       /* top */
  inset-inline-end: 16px;     /* right in LTR */
  border-radius: 8px;
  margin-block-end: 24px;     /* margin-bottom */
}`}</code></pre>

      <h2>Responsive Spacing with CSS Custom Properties</h2>
      <pre><code className="language-css">{`/* Responsive design tokens */
:root {
  /* Fluid spacing scale */
  --space-1: clamp(4px, 0.5vw, 8px);
  --space-2: clamp(8px, 1vw, 16px);
  --space-3: clamp(12px, 1.5vw, 24px);
  --space-4: clamp(16px, 2vw, 32px);
  --space-5: clamp(24px, 3vw, 48px);
  --space-6: clamp(32px, 4vw, 64px);
  --space-7: clamp(48px, 6vw, 96px);
  --space-8: clamp(64px, 8vw, 128px);

  /* Fluid container widths */
  --container-sm: min(640px, 100% - 2 * var(--space-4));
  --container-md: min(768px, 100% - 2 * var(--space-4));
  --container-lg: min(1024px, 100% - 2 * var(--space-4));
  --container-xl: min(1280px, 100% - 2 * var(--space-4));

  /* Column gap that adjusts to screen */
  --grid-gap: clamp(16px, 2vw, 32px);
}

.section {
  padding: var(--space-7) var(--space-4);
}

.container {
  width: var(--container-lg);
  margin-inline: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--grid-gap);
}`}</code></pre>

      <h2>Accessibility in Responsive Design</h2>
      <ul>
        <li><strong>Touch targets:</strong> Ensure interactive elements are at least 44x44px on touch devices</li>
        <li><strong>Reduced motion:</strong> Respect <code>prefers-reduced-motion</code> for users who are sensitive to animation</li>
        <li><strong>Color scheme:</strong> Support dark mode with <code>prefers-color-scheme</code></li>
        <li><strong>Font scaling:</strong> Use relative units (rem, em) so text scales with user preferences</li>
        <li><strong>Focus indicators:</strong> Visible focus styles on all screen sizes</li>
      </ul>
      <pre><code className="language-css">{`/* Accessibility-aware responsive design */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a2e;
    --text: #e4e4e7;
    --border: #2a2a3e;
  }
}

/* Minimum touch target size */
button, a, input, select {
  min-height: 44px;
  min-width: 44px;
}

@media (pointer: coarse) {
  /* Larger targets for touch devices */
  .nav-link {
    padding: 12px 16px;
  }
}

@media (pointer: fine) {
  /* Smaller targets for mouse/trackpad */
  .nav-link {
    padding: 8px 12px;
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid currentColor;
  }
}`}</code></pre>

      <h2>Testing Responsive Designs</h2>
      <ul>
        <li><strong>Browser DevTools:</strong> Use Chrome/Firefox responsive design mode to test different viewports</li>
        <li><strong>Real devices:</strong> Always test on actual phones and tablets -- emulators miss touch-specific issues</li>
        <li><strong>Common breakpoints:</strong> 320px (small phone), 375px (iPhone), 768px (tablet), 1024px (small desktop), 1440px (desktop), 1920px (large desktop)</li>
        <li><strong>Landscape mode:</strong> Test both portrait and landscape orientations on mobile</li>
        <li><strong>Content testing:</strong> Test with real content of varying lengths, not just placeholder text</li>
      </ul>

      <h2>Summary</h2>
      <p>
        Modern responsive design goes far beyond simple media queries. Use CSS Grid and Flexbox for flexible layouts, container queries for component-level responsiveness, <code>clamp()</code> for fluid typography and spacing, and logical properties for international support. Start with a mobile-first approach, use fluid design tokens, and always test on real devices. These techniques create responsive experiences that work beautifully on every screen size without fighting the platform.
      </p>
    </>
  );
}
