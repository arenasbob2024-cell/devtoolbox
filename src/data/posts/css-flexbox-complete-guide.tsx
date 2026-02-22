'use client';

import Link from 'next/link';

export default function CssFlexboxCompleteGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is CSS Flexbox?</h2>
      <p>
        <strong>CSS Flexbox</strong> (Flexible Box Layout) is a one-dimensional layout model that distributes space among items in a container and aligns them efficiently, even when their sizes are dynamic or unknown. Introduced in CSS3, Flexbox has become the go-to layout method for building responsive navbars, card grids, form layouts, centering elements, and virtually any UI pattern that requires flexible alignment.
      </p>
      <p>
        Before Flexbox, developers relied on floats, inline-blocks, and positioning hacks to create layouts. Flexbox solves all of these problems with a clean, intuitive API. This complete guide covers every Flexbox property with visual examples and real-world layout patterns you can copy directly into your projects.
      </p>
      <p>
        <Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>Build Flexbox layouts visually with our free Flexbox Generator tool.</Link>
      </p>

      <h2>Flexbox Fundamentals: Container and Items</h2>
      <p>
        Flexbox works on two levels: the <strong>flex container</strong> (parent) and <strong>flex items</strong> (children). When you set <code>display: flex</code> on a container, all direct children become flex items that participate in the flex layout.
      </p>
      <pre><code className="language-css">{`/* Enable Flexbox on a container */
.container {
  display: flex;          /* block-level flex container */
}

/* Or inline flex container */
.container-inline {
  display: inline-flex;   /* inline-level flex container */
}`}</code></pre>
      <p>
        The flex container defines the <strong>main axis</strong> (direction items flow) and the <strong>cross axis</strong> (perpendicular to the main axis). By default, the main axis is horizontal (left to right) and the cross axis is vertical (top to bottom).
      </p>

      <h2>Container Properties</h2>

      <h3>flex-direction</h3>
      <p>
        The <code>flex-direction</code> property defines the main axis direction &mdash; how flex items are placed in the container.
      </p>
      <pre><code className="language-css">{`/* Row: items flow left to right (default) */
.container { display: flex; flex-direction: row; }

/* Row-reverse: items flow right to left */
.container { display: flex; flex-direction: row-reverse; }

/* Column: items flow top to bottom */
.container { display: flex; flex-direction: column; }

/* Column-reverse: items flow bottom to top */
.container { display: flex; flex-direction: column-reverse; }`}</code></pre>

      <div style={{
        display: 'flex', flexDirection: 'row', gap: 8, padding: 16,
        background: 'var(--bg-secondary)', borderRadius: 8, marginBottom: 16
      }}>
        <div style={{ padding: '12px 20px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 6, fontWeight: 600 }}>1</div>
        <div style={{ padding: '12px 20px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 6, fontWeight: 600 }}>2</div>
        <div style={{ padding: '12px 20px', background: 'var(--accent-blue)', color: '#fff', borderRadius: 6, fontWeight: 600 }}>3</div>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', alignSelf: 'center', marginLeft: 8 }}>flex-direction: row</span>
      </div>

      <h3>justify-content</h3>
      <p>
        The <code>justify-content</code> property aligns items along the <strong>main axis</strong>. It controls how extra space is distributed when items do not fill the entire container.
      </p>
      <pre><code className="language-css">{`/* Pack items to the start (default) */
.container { justify-content: flex-start; }

/* Pack items to the end */
.container { justify-content: flex-end; }

/* Center items */
.container { justify-content: center; }

/* Equal space between items */
.container { justify-content: space-between; }

/* Equal space around items */
.container { justify-content: space-around; }

/* Equal space between and around items */
.container { justify-content: space-evenly; }`}</code></pre>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'flex-start', jc: 'flex-start' as const },
          { label: 'center', jc: 'center' as const },
          { label: 'space-between', jc: 'space-between' as const },
          { label: 'space-evenly', jc: 'space-evenly' as const },
        ].map(({ label, jc }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: jc, gap: 8, padding: 12,
            background: 'var(--bg-secondary)', borderRadius: 8
          }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ padding: '8px 16px', background: '#6366f1', color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>{n}</div>
            ))}
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', alignSelf: 'center', marginLeft: 'auto' }}>{label}</span>
          </div>
        ))}
      </div>

      <h3>align-items</h3>
      <p>
        The <code>align-items</code> property aligns items along the <strong>cross axis</strong>. In a row layout, it controls vertical alignment; in a column layout, horizontal alignment.
      </p>
      <pre><code className="language-css">{`/* Stretch items to fill container (default) */
.container { align-items: stretch; }

/* Align items to the start of the cross axis */
.container { align-items: flex-start; }

/* Align items to the end of the cross axis */
.container { align-items: flex-end; }

/* Center items on the cross axis */
.container { align-items: center; }

/* Align items along their text baselines */
.container { align-items: baseline; }`}</code></pre>

      <h3>flex-wrap</h3>
      <p>
        By default, flex items try to fit on one line. The <code>flex-wrap</code> property controls whether items wrap to new lines when there is not enough space.
      </p>
      <pre><code className="language-css">{`/* Do not wrap - all items on one line (default) */
.container { flex-wrap: nowrap; }

/* Wrap items to new lines */
.container { flex-wrap: wrap; }

/* Wrap items in reverse order */
.container { flex-wrap: wrap-reverse; }

/* Shorthand: flex-direction + flex-wrap */
.container { flex-flow: row wrap; }
.container { flex-flow: column nowrap; }`}</code></pre>

      <h3>gap</h3>
      <p>
        The <code>gap</code> property (formerly <code>grid-gap</code>) sets spacing between flex items without adding margins. It is the recommended way to add gutters in modern Flexbox layouts.
      </p>
      <pre><code className="language-css">{`/* Same gap in both directions */
.container { display: flex; gap: 16px; }

/* Different row and column gaps */
.container { display: flex; gap: 16px 24px; }
/* row-gap: 16px, column-gap: 24px */

/* Individual properties */
.container {
  display: flex;
  row-gap: 16px;
  column-gap: 24px;
}`}</code></pre>

      <h3>align-content</h3>
      <p>
        The <code>align-content</code> property aligns <strong>wrapped lines</strong> within the container along the cross axis. It only has an effect when <code>flex-wrap: wrap</code> is set and there are multiple lines of items.
      </p>
      <pre><code className="language-css">{`/* Values same as justify-content */
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;    /* pack lines to start */
  align-content: flex-end;      /* pack lines to end */
  align-content: center;        /* center lines */
  align-content: space-between; /* equal space between lines */
  align-content: space-around;  /* equal space around lines */
  align-content: stretch;       /* stretch lines to fill (default) */
}`}</code></pre>

      <h2>Item Properties</h2>

      <h3>flex-grow, flex-shrink, flex-basis</h3>
      <p>
        These three properties control how flex items grow, shrink, and their initial size. They are most commonly set via the <code>flex</code> shorthand.
      </p>
      <pre><code className="language-css">{`/* flex-grow: how much an item should grow relative to others */
.item { flex-grow: 1; }   /* take up available space equally */
.item { flex-grow: 0; }   /* do not grow (default) */
.item-big { flex-grow: 2; } /* grow twice as much */

/* flex-shrink: how much an item should shrink */
.item { flex-shrink: 1; } /* shrink equally (default) */
.item { flex-shrink: 0; } /* do not shrink */

/* flex-basis: initial size before growing/shrinking */
.item { flex-basis: 200px; }  /* start at 200px */
.item { flex-basis: 25%; }    /* start at 25% of container */
.item { flex-basis: auto; }   /* use content size (default) */

/* flex shorthand (recommended) */
.item { flex: 1; }           /* flex: 1 1 0% */
.item { flex: auto; }        /* flex: 1 1 auto */
.item { flex: none; }        /* flex: 0 0 auto */
.item { flex: 0 0 200px; }   /* fixed 200px, no grow, no shrink */
.item { flex: 1 0 300px; }   /* at least 300px, can grow */`}</code></pre>

      <h3>order</h3>
      <p>
        The <code>order</code> property controls the visual order of flex items without changing the HTML source order. Items with lower order values appear first.
      </p>
      <pre><code className="language-css">{`/* Default order is 0 for all items */
.item-first  { order: -1; }  /* appears first */
.item-normal { order: 0; }   /* default position */
.item-last   { order: 1; }   /* appears last */`}</code></pre>

      <h3>align-self</h3>
      <p>
        The <code>align-self</code> property overrides the container&apos;s <code>align-items</code> for a single item, allowing individual cross-axis alignment.
      </p>
      <pre><code className="language-css">{`/* Override container alignment for one item */
.container { display: flex; align-items: flex-start; }

.item-centered { align-self: center; }
.item-end      { align-self: flex-end; }
.item-stretch  { align-self: stretch; }
.item-auto     { align-self: auto; }  /* inherit from container */`}</code></pre>

      <h2>Common Flexbox Layout Patterns</h2>

      <h3>1. Centering an Element (Horizontally and Vertically)</h3>
      <p>
        The classic centering problem that was notoriously difficult before Flexbox. Now it takes just three lines:
      </p>
      <pre><code className="language-css">{`/* Perfect centering */
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}</code></pre>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: 120, background: 'var(--bg-secondary)', borderRadius: 8, marginBottom: 16
      }}>
        <div style={{ padding: '16px 32px', background: '#6366f1', color: '#fff', borderRadius: 8, fontWeight: 700 }}>Centered!</div>
      </div>

      <h3>2. Navigation Bar</h3>
      <p>
        A responsive navbar with a logo on the left and navigation links on the right:
      </p>
      <pre><code className="language-css">{`/* Navbar layout */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background: #1a1a2e;
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}`}</code></pre>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 24px', height: 56, background: '#1e1e2e', borderRadius: 8, marginBottom: 16
      }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>Logo</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ color: '#a5b4fc', fontSize: 14 }}>Home</span>
          <span style={{ color: '#a5b4fc', fontSize: 14 }}>About</span>
          <span style={{ color: '#a5b4fc', fontSize: 14 }}>Contact</span>
        </div>
      </div>

      <h3>3. Responsive Card Grid</h3>
      <p>
        A card grid that wraps responsively using <code>flex-wrap</code> and <code>flex-basis</code>:
      </p>
      <pre><code className="language-css">{`/* Card grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 300px;     /* min 300px, grow to fill space */
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}`}</code></pre>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16
      }}>
        {['Card 1', 'Card 2', 'Card 3'].map(c => (
          <div key={c} style={{
            flex: '1 1 150px', padding: 16,
            background: 'var(--bg-secondary)', borderRadius: 8,
            border: '1px solid var(--border-color)', textAlign: 'center', fontWeight: 600
          }}>{c}</div>
        ))}
      </div>

      <h3>4. Holy Grail Layout</h3>
      <p>
        The classic three-column layout with header and footer, achieved easily with nested Flexbox:
      </p>
      <pre><code className="language-css">{`/* Holy Grail Layout */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  flex: 0 0 auto;        /* fixed height */
  padding: 16px;
}

.main-content {
  display: flex;
  flex: 1;               /* take remaining space */
}

.sidebar-left {
  flex: 0 0 200px;       /* fixed 200px sidebar */
}

.content {
  flex: 1;               /* fill remaining width */
  padding: 24px;
}

.sidebar-right {
  flex: 0 0 200px;       /* fixed 200px sidebar */
}`}</code></pre>
      <div style={{
        display: 'flex', flexDirection: 'column', height: 200,
        border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', marginBottom: 16
      }}>
        <div style={{ padding: 8, background: '#6366f1', color: '#fff', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>Header</div>
        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: '0 0 80px', background: '#e0e7ff', padding: 8, fontSize: 11, color: '#4338ca' }}>Sidebar</div>
          <div style={{ flex: 1, padding: 8, fontSize: 11, color: 'var(--text-secondary)' }}>Main Content</div>
          <div style={{ flex: '0 0 80px', background: '#e0e7ff', padding: 8, fontSize: 11, color: '#4338ca' }}>Sidebar</div>
        </div>
        <div style={{ padding: 8, background: '#6366f1', color: '#fff', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>Footer</div>
      </div>

      <h3>5. Sticky Footer</h3>
      <p>
        A footer that sticks to the bottom of the viewport even when content is short:
      </p>
      <pre><code className="language-css">{`/* Sticky footer */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;       /* main content fills available space */
}

footer {
  flex-shrink: 0; /* footer never shrinks */
}`}</code></pre>

      <h3>6. Sidebar Layout</h3>
      <p>
        A fixed-width sidebar with a fluid main content area:
      </p>
      <pre><code className="language-css">{`/* Sidebar + main content */
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 280px;    /* fixed 280px sidebar */
  background: #1e1e2e;
  padding: 24px;
}

.main {
  flex: 1;            /* fill remaining width */
  padding: 24px;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  .sidebar {
    flex: 0 0 auto;
  }
}`}</code></pre>

      <h3>7. Input Group with Button</h3>
      <pre><code className="language-css">{`/* Input group */
.input-group {
  display: flex;
}

.input-group input {
  flex: 1;           /* input takes available space */
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px 0 0 6px;
}

.input-group button {
  flex-shrink: 0;    /* button does not shrink */
  padding: 8px 16px;
  border-radius: 0 6px 6px 0;
}`}</code></pre>

      <h2>Flexbox vs CSS Grid: When to Use Each</h2>
      <p>
        Flexbox and CSS Grid are complementary, not competing, layout systems. Here is when to use each:
      </p>
      <ul>
        <li><strong>Flexbox</strong>: Best for <strong>one-dimensional</strong> layouts (a single row OR column). Use for navbars, toolbars, card rows, centering, and component-level layouts.</li>
        <li><strong>CSS Grid</strong>: Best for <strong>two-dimensional</strong> layouts (rows AND columns simultaneously). Use for full page layouts, complex grids, dashboards, and magazine-style layouts.</li>
        <li><strong>Both together</strong>: Use Grid for the overall page structure and Flexbox for individual components within grid cells.</li>
      </ul>

      <h2>Browser Support</h2>
      <p>
        Flexbox is supported in all modern browsers: Chrome 29+, Firefox 28+, Safari 9+, Edge 12+, and all mobile browsers. The <code>gap</code> property for Flexbox requires Chrome 84+, Firefox 63+, Safari 14.1+. For older browsers, use margins as a fallback.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>How do I center a div with Flexbox?</h3>
      <p>
        Set <code>display: flex; justify-content: center; align-items: center;</code> on the parent container. This centers the child both horizontally and vertically. Add <code>min-height: 100vh</code> if you want to center within the full viewport.
      </p>

      <h3>What is the difference between flex: 1 and flex: auto?</h3>
      <p>
        <code>flex: 1</code> is shorthand for <code>flex: 1 1 0%</code> &mdash; the item starts from zero width and distributes all available space equally among items. <code>flex: auto</code> is shorthand for <code>flex: 1 1 auto</code> &mdash; the item starts from its content size, then distributes remaining space. Use <code>flex: 1</code> for equal-width columns and <code>flex: auto</code> when items should be sized by their content first.
      </p>

      <h3>How do I make a responsive layout without media queries?</h3>
      <p>
        Use <code>flex-wrap: wrap</code> with a <code>flex-basis</code> minimum: <code>flex: 1 1 300px</code>. Items will be at least 300px wide and wrap to the next row when they cannot fit. This creates a fully responsive grid without any <code>@media</code> queries.
      </p>

      <h3>Why is my flex item not shrinking?</h3>
      <p>
        Common causes: (1) The item has <code>flex-shrink: 0</code>, (2) the item has a <code>min-width</code> (text content sets an implicit min-width), or (3) the item has <code>overflow</code> not set. Add <code>min-width: 0</code> or <code>overflow: hidden</code> to allow the item to shrink below its content size.
      </p>

      <h3>Can I use Flexbox and CSS Grid together?</h3>
      <p>
        Absolutely. They work perfectly together. A common pattern is to use CSS Grid for the overall page layout (header, sidebar, main, footer) and Flexbox for components within each grid area (navbar items, card content, form layouts). They complement each other rather than compete.
      </p>
    </>
  );
}
