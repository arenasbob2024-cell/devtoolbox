export default function CssGridCompleteGuide() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1>CSS Grid: The Complete Layout Guide</h1>
      <p className="lead">
        CSS Grid is the most powerful layout system available in CSS. Unlike Flexbox, which is one-dimensional
        (row or column), Grid is two-dimensional — it handles both rows and columns simultaneously. This guide
        covers every aspect of CSS Grid from basic track definitions to advanced placement, subgrid, and
        real-world layout patterns.
      </p>

      <h2>Grid vs. Flexbox: When to Use Each</h2>
      <p>
        A common question is when to use Grid versus Flexbox. The answer is straightforward: use Flexbox
        for one-dimensional layouts (a navigation bar, a row of cards, a button group) and use Grid for
        two-dimensional layouts (a page layout, a dashboard, a photo gallery). They are complementary —
        in practice, a Grid layout often contains Flexbox components inside its cells.
      </p>
      <table>
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Use Flexbox</th>
            <th>Use Grid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Axis</td>
            <td>One axis (row OR column)</td>
            <td>Two axes (rows AND columns)</td>
          </tr>
          <tr>
            <td>Item sizing</td>
            <td>Content-driven</td>
            <td>Container-driven</td>
          </tr>
          <tr>
            <td>Alignment</td>
            <td>Main/cross axis</td>
            <td>Row/column axis independently</td>
          </tr>
          <tr>
            <td>Item overlap</td>
            <td>Not possible</td>
            <td>Supported natively</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Navigation, cards, buttons</td>
            <td>Page layouts, dashboards, galleries</td>
          </tr>
        </tbody>
      </table>

      <h2>Grid Fundamentals</h2>

      <h3>Defining a Grid</h3>
      <p>
        Turn any element into a grid container with <code>display: grid</code>. Then define the track
        structure with <code>grid-template-columns</code> and <code>grid-template-rows</code>.
      </p>
      <pre><code className="language-css">{`.container {
  display: grid;

  /* 3 columns: 200px, 1fr, 1fr */
  grid-template-columns: 200px 1fr 1fr;

  /* 2 rows: auto height, then 100px */
  grid-template-rows: auto 100px;

  /* Gap between cells */
  gap: 1rem;            /* shorthand for row-gap + column-gap */
  row-gap: 1rem;        /* vertical gap */
  column-gap: 1.5rem;   /* horizontal gap */
}`}</code></pre>

      <h3>The fr Unit</h3>
      <p>
        The <code>fr</code> (fraction) unit is unique to Grid. It represents a fraction of the available
        space in the grid container after fixed-size tracks and gaps are accounted for. It is the key to
        flexible, responsive grids without media queries.
      </p>
      <pre><code className="language-css">{`/* 3 equal columns */
grid-template-columns: 1fr 1fr 1fr;

/* Sidebar + main + sidebar: 1:3:1 ratio */
grid-template-columns: 1fr 3fr 1fr;

/* Fixed sidebar, flexible main */
grid-template-columns: 250px 1fr;

/* Mix of units: fixed, content-sized, flexible */
grid-template-columns: 200px auto 1fr;`}</code></pre>

      <h3>repeat() and minmax()</h3>
      <p>
        The <code>repeat()</code> function avoids repetitive track definitions.
        The <code>minmax()</code> function sets a minimum and maximum size for a track, enabling
        intrinsically responsive grids.
      </p>
      <pre><code className="language-css">{`/* 12-column grid */
grid-template-columns: repeat(12, 1fr);

/* Responsive card grid: auto-fill columns, each 250-400px wide */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

/* Auto-fit: collapses empty tracks (stretches items to fill space) */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* Named sizes */
grid-template-rows: repeat(3, minmax(100px, auto));`}</code></pre>
      <p>
        The combination <code>repeat(auto-fill, minmax(250px, 1fr))</code> is one of the most powerful
        one-liners in CSS — it creates a fully responsive grid that adjusts the number of columns based
        on available space without any media queries.
      </p>

      <h2>Placing Items on the Grid</h2>

      <h3>Line-Based Placement</h3>
      <p>
        Grid lines are numbered starting at 1 from the start edge. You can place items precisely by
        specifying the start and end grid lines with <code>grid-column</code> and <code>grid-row</code>.
      </p>
      <pre><code className="language-css">{`.item {
  /* Span from column line 1 to column line 3 (occupies 2 columns) */
  grid-column: 1 / 3;

  /* Shorthand: start-line / end-line */
  grid-column: 2 / 4;

  /* Use span keyword: start at line 1, span 2 columns */
  grid-column: 1 / span 2;

  /* Extend to the last line */
  grid-column: 1 / -1;  /* -1 = last explicit line */

  /* Row placement */
  grid-row: 1 / 3;
}

/* Full shorthand: row-start / column-start / row-end / column-end */
.hero {
  grid-area: 1 / 1 / 3 / -1;
}`}</code></pre>

      <h3>Template Areas</h3>
      <p>
        Named template areas make complex layouts readable and maintainable. You assign a name to each
        cell in the grid, then assign items to those named areas.
      </p>
      <pre><code className="language-css">{`.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
  gap: 1rem;
}

.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.footer  { grid-area: footer;  }

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}`}</code></pre>

      <h2>Alignment and Justification</h2>
      <p>
        CSS Grid has two alignment axes: the inline axis (horizontal) and the block axis (vertical).
        Properties follow a consistent naming pattern: <code>justify-*</code> for the inline axis,
        <code>align-*</code> for the block axis.
      </p>
      <pre><code className="language-css">{`/* --- Container-level properties --- */

/* Align ALL items along the block axis (vertical) */
align-items: start | end | center | stretch;  /* stretch is default */

/* Justify ALL items along the inline axis (horizontal) */
justify-items: start | end | center | stretch;

/* Shorthand */
place-items: center;          /* align-items + justify-items */
place-items: start center;    /* align start, justify center */

/* Distribute tracks within the container */
align-content: start | end | center | stretch | space-between | space-around | space-evenly;
justify-content: start | end | center | stretch | space-between | space-around | space-evenly;
place-content: center;


/* --- Item-level properties (override container) --- */

.item {
  /* Override for a single item */
  align-self: end;      /* Push to bottom of cell */
  justify-self: center; /* Center horizontally in cell */
  place-self: end center;
}`}</code></pre>

      <h2>Implicit vs. Explicit Grids</h2>
      <p>
        The tracks you define with <code>grid-template-*</code> form the explicit grid. When items
        are placed outside the explicit grid (more items than defined cells), Grid automatically creates
        implicit tracks. You can size these with <code>grid-auto-rows</code> and <code>grid-auto-columns</code>.
      </p>
      <pre><code className="language-css">{`.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Explicit rows: none defined */
  /* But control the height of implicit rows */
  grid-auto-rows: 200px;

  /* Default flow is row — fill rows before starting a new one */
  grid-auto-flow: row;

  /* Dense packing: fill gaps when items have different sizes */
  grid-auto-flow: row dense;

  gap: 1rem;
}`}</code></pre>

      <h2>Subgrid</h2>
      <p>
        Subgrid, now supported in all major browsers, allows a grid item to participate in its parent
        grid's track sizing. This solves the classic problem of aligning content across cards that are
        in different grid cells.
      </p>
      <pre><code className="language-css">{`/* Parent grid */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto; /* heading, body, footer */
  gap: 1rem;
}

/* Each card spans 3 rows and uses the parent's row tracks */
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* Use parent's row tracks */
}

/* Now card headings, bodies, and footers align across all cards */
.card-heading { }  /* Aligns with row 1 across all cards */
.card-body    { }  /* Aligns with row 2 across all cards */
.card-footer  { }  /* Aligns with row 3 across all cards */`}</code></pre>

      <h2>Real-World Layout Patterns</h2>

      <h3>Holy Grail Layout</h3>
      <pre><code className="language-css">{`.holy-grail {
  display: grid;
  grid-template:
    "header" auto
    "nav main aside" 1fr
    "footer" auto
    / 200px 1fr 200px;
  min-height: 100vh;
}

.header { grid-area: header; }
.nav    { grid-area: nav; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }`}</code></pre>

      <h3>Responsive Card Grid</h3>
      <pre><code className="language-css">{`.card-grid {
  display: grid;
  /* 1 column on mobile → 2 on tablet → 3+ on desktop, auto-responsive */
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}

/* Featured card spans all columns */
.card-grid .featured {
  grid-column: 1 / -1;
}`}</code></pre>

      <h3>Masonry-Style Layout (CSS-native, 2025+)</h3>
      <pre><code className="language-css">{`/* Native CSS masonry — Chrome 131+ with flag, Firefox behind flag */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: masonry;
  gap: 1rem;
}

/* Fallback using column-count for unsupported browsers */
@supports not (grid-template-rows: masonry) {
  .masonry {
    display: block;
    column-count: 3;
    column-gap: 1rem;
  }
  .masonry > * {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
}`}</code></pre>

      <h2>Performance Tips</h2>
      <ul>
        <li><strong>Prefer <code>gap</code> over margins</strong> — Grid gap does not collapse and is more predictable than margin-based spacing.</li>
        <li><strong>Avoid overlapping items unnecessarily</strong> — Overlapping grid items trigger layout recalculation. Use only when needed for visual effects.</li>
        <li><strong>Use <code>auto-fill</code> vs <code>auto-fit</code> correctly</strong> — <code>auto-fill</code> preserves empty tracks; <code>auto-fit</code> collapses them and stretches existing items.</li>
        <li><strong>Limit explicit row definitions</strong> — Let Grid create implicit rows automatically for content-driven layouts like feeds and galleries.</li>
        <li><strong>Test in all browsers</strong> — Subgrid and masonry have varying support levels. Always provide fallbacks.</li>
      </ul>

      <h2>Browser Support</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Chrome</th>
            <th>Firefox</th>
            <th>Safari</th>
            <th>Edge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CSS Grid (Level 1)</td>
            <td>57+</td>
            <td>52+</td>
            <td>10.1+</td>
            <td>16+</td>
          </tr>
          <tr>
            <td>Subgrid</td>
            <td>117+</td>
            <td>71+</td>
            <td>16+</td>
            <td>117+</td>
          </tr>
          <tr>
            <td>Masonry</td>
            <td>131+ (flag)</td>
            <td>Behind flag</td>
            <td>Behind flag</td>
            <td>131+ (flag)</td>
          </tr>
          <tr>
            <td><code>grid-template</code> shorthand</td>
            <td>57+</td>
            <td>52+</td>
            <td>10.1+</td>
            <td>16+</td>
          </tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>

      <h3>Can I mix Grid and Flexbox?</h3>
      <p>
        Absolutely — and you should. Use Grid for the overall page layout and major section layouts.
        Inside each grid area, use Flexbox for aligning items within that area. A card component inside
        a Grid cell is a perfect candidate for internal Flexbox layout.
      </p>

      <h3>How do I center a single item in a grid?</h3>
      <p>
        The simplest centering method in CSS: set the container to <code>display: grid</code> and add
        <code>place-items: center</code>. This works for both horizontal and vertical centering in a single line.
      </p>
      <pre><code className="language-css">{`.center-container {
  display: grid;
  place-items: center;
  min-height: 100vh; /* or any height */
}`}</code></pre>

      <h3>What is the difference between auto-fill and auto-fit?</h3>
      <p>
        When there are fewer items than columns: <code>auto-fill</code> creates empty ghost tracks
        maintaining the original column count, while <code>auto-fit</code> collapses empty tracks and
        expands existing items to fill the space. For card grids where you want items to stretch,
        use <code>auto-fit</code>. For fixed-count grids, use <code>auto-fill</code>.
      </p>

      <p>
        To experiment with CSS values interactively, try our{' '}
        <a href="/en/tools/css-gradient-generator">CSS Gradient Generator</a>. For inspecting computed
        styles and layout, see our guide on{' '}
        <a href="/en/blog/web-performance-optimization">Web Performance Optimization</a>.
      </p>
    </article>
  );
}
