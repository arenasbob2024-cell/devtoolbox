export default function CssGridLayoutGuide() {
  return (
    <>
      <h2>CSS Grid Layout: The Complete Tutorial for 2026</h2>
      <p>
        CSS Grid is the most powerful two-dimensional layout system available in CSS. Unlike Flexbox which handles
        one dimension at a time, Grid lets you control <strong>rows and columns simultaneously</strong>, making
        it ideal for page layouts, dashboards, galleries, and complex component structures. This tutorial covers
        every Grid property with practical examples you can use immediately.
      </p>

      <h2>Getting Started with Grid</h2>
      <p>
        To create a grid container, set <code>display: grid</code> on a parent element. Its direct children
        automatically become grid items. From there, you define the row and column structure.
      </p>
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}

/* inline-grid for inline-level containers */
.inline-container {
  display: inline-grid;
  grid-template-columns: 100px 100px;
}`}</code></pre>

      <h2>Defining Columns and Rows</h2>
      <p>
        The <code>grid-template-columns</code> and <code>grid-template-rows</code> properties define the track
        sizes. You can mix fixed sizes, flexible units, percentages, and content-based sizing.
      </p>

      <h3>Fixed and Flexible Sizes</h3>
      <pre><code>{`/* Fixed pixel widths */
grid-template-columns: 100px 200px 100px;

/* Flexible fr units — divide available space proportionally */
grid-template-columns: 1fr 2fr 1fr;
/* First and third columns get 1 share each, middle gets 2 shares */

/* Mix fixed and flexible */
grid-template-columns: 250px 1fr;
/* Sidebar at 250px, main content fills remaining space */

/* Percentage-based */
grid-template-columns: 25% 50% 25%;

/* Content-based sizing */
grid-template-columns: auto 1fr auto;
/* auto = sized to fit content */`}</code></pre>

      <h3>repeat() Function</h3>
      <p>
        The <code>repeat()</code> function avoids writing the same track size multiple times.
      </p>
      <pre><code>{`/* 4 equal columns */
grid-template-columns: repeat(4, 1fr);

/* Pattern repetition */
grid-template-columns: repeat(3, 100px 1fr);
/* Expands to: 100px 1fr 100px 1fr 100px 1fr */

/* auto-fill: create as many tracks as fit */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* auto-fit: same as auto-fill but collapses empty tracks */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`}</code></pre>

      <h3>minmax() Function</h3>
      <p>
        The <code>minmax()</code> function sets a minimum and maximum size for a track, enabling responsive
        layouts without media queries.
      </p>
      <pre><code>{`/* Columns at least 200px, at most 1fr */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* Rows at least 100px tall, grow with content */
grid-template-rows: minmax(100px, auto);

/* Combine with fixed tracks */
grid-template-columns: 250px minmax(300px, 1fr) 250px;`}</code></pre>

      <h2>Grid Gap (Spacing)</h2>
      <p>
        The <code>gap</code> property controls spacing between grid tracks. Unlike margins, gaps only apply
        between items and not on the outer edges.
      </p>
      <pre><code>{`/* Equal row and column gaps */
gap: 16px;

/* Different row and column gaps */
gap: 20px 16px;  /* row-gap column-gap */

/* Individual properties */
row-gap: 20px;
column-gap: 16px;`}</code></pre>

      <h2>Placing Items on the Grid</h2>
      <p>
        Grid items can be explicitly placed using line numbers, named lines, or named areas. By default,
        items flow automatically into the next available cell.
      </p>

      <h3>Line-Based Placement</h3>
      <pre><code>{`/* Grid lines are numbered starting at 1 */
.item {
  grid-column-start: 1;
  grid-column-end: 3;   /* spans columns 1-2 */
  grid-row-start: 1;
  grid-row-end: 2;
}

/* Shorthand */
.item {
  grid-column: 1 / 3;   /* start / end */
  grid-row: 1 / 2;
}

/* Span syntax */
.item {
  grid-column: 1 / span 2;  /* start at 1, span 2 columns */
  grid-row: span 3;         /* span 3 rows from current position */
}

/* Negative lines count from the end */
.full-width {
  grid-column: 1 / -1;  /* spans entire row */
}`}</code></pre>

      <h3>grid-area Shorthand</h3>
      <pre><code>{`/* grid-area: row-start / col-start / row-end / col-end */
.header {
  grid-area: 1 / 1 / 2 / -1;  /* full width, first row */
}

.sidebar {
  grid-area: 2 / 1 / 4 / 2;   /* rows 2-3, first column */
}

.main {
  grid-area: 2 / 2 / 3 / 3;   /* row 2, second column */
}`}</code></pre>

      <h2>Named Grid Areas</h2>
      <p>
        Named grid areas provide a visual, intuitive way to define layouts. Each string represents a row,
        and each word represents a cell. This is one of the most readable ways to define page layouts.
      </p>
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header  header"
    "sidebar main    aside"
    "footer  footer  footer";
  gap: 16px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.aside   { grid-area: aside; }
.footer  { grid-area: footer; }

/* Use . for empty cells */
grid-template-areas:
  "header header header"
  "sidebar main ."
  "footer footer footer";`}</code></pre>

      <h2>Alignment and Justification</h2>
      <p>
        Grid provides six alignment properties that control how items are positioned within their cells
        and how tracks are distributed within the container.
      </p>

      <h3>Container Alignment</h3>
      <pre><code>{`/* Align all items within their cells */
.container {
  /* Horizontal alignment of items within cells */
  justify-items: start | end | center | stretch;

  /* Vertical alignment of items within cells */
  align-items: start | end | center | stretch;

  /* Shorthand for both */
  place-items: center center;
}

/* Distribute tracks within the container */
.container {
  /* Horizontal distribution of columns */
  justify-content: start | end | center | space-between | space-around | space-evenly;

  /* Vertical distribution of rows */
  align-content: start | end | center | space-between | space-around | space-evenly;

  /* Shorthand */
  place-content: center space-between;
}`}</code></pre>

      <h3>Item Self-Alignment</h3>
      <pre><code>{`/* Override container alignment for individual items */
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: center end;  /* shorthand */
}`}</code></pre>

      <h2>Implicit Grid and Auto Flow</h2>
      <p>
        When items are placed outside the explicit grid or there are more items than defined cells, the
        implicit grid creates additional tracks automatically.
      </p>
      <pre><code>{`.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Only 3 columns defined, but 9 items exist */

  /* Control implicit row sizing */
  grid-auto-rows: minmax(100px, auto);

  /* Control implicit column sizing */
  grid-auto-columns: 200px;

  /* Control auto-placement direction */
  grid-auto-flow: row;         /* default — fill rows first */
  grid-auto-flow: column;      /* fill columns first */
  grid-auto-flow: row dense;   /* fill gaps with smaller items */
}`}</code></pre>

      <h2>Common Layout Patterns</h2>

      <h3>Responsive Card Grid (No Media Queries)</h3>
      <pre><code>{`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Cards automatically wrap to new rows as viewport shrinks.
   Each card is at least 280px wide and stretches equally. */`}</code></pre>

      <h3>Holy Grail Layout</h3>
      <pre><code>{`.holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 16px;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .holy-grail {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "nav"
      "main"
      "aside"
      "footer";
  }
}`}</code></pre>

      <h3>Dashboard Layout</h3>
      <pre><code>{`.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 16px;
}

/* Widgets span different numbers of columns */
.widget-wide    { grid-column: span 2; }
.widget-tall    { grid-row: span 2; }
.widget-full    { grid-column: 1 / -1; }
.widget-feature { grid-column: span 2; grid-row: span 2; }`}</code></pre>

      <h3>Masonry-Like Layout</h3>
      <pre><code>{`.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 16px;
}

/* Each item spans a different number of row tracks */
.masonry-item-small  { grid-row: span 15; }
.masonry-item-medium { grid-row: span 25; }
.masonry-item-large  { grid-row: span 35; }`}</code></pre>

      <h3>Image Gallery</h3>
      <pre><code>{`.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 8px;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Feature image spans 2x2 */
.gallery .featured {
  grid-column: span 2;
  grid-row: span 2;
}`}</code></pre>

      <h2>Grid vs Flexbox: When to Use Each</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>CSS Grid</th>
            <th>Flexbox</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Dimensions</td><td>Two-dimensional (rows + columns)</td><td>One-dimensional (row OR column)</td></tr>
          <tr><td>Layout approach</td><td>Layout-first (define structure, place items)</td><td>Content-first (items determine layout)</td></tr>
          <tr><td>Best for</td><td>Page layouts, dashboards, galleries</td><td>Navigation bars, card internals, centering</td></tr>
          <tr><td>Item sizing</td><td>Container controls sizing</td><td>Items control sizing</td></tr>
          <tr><td>Gap support</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Overlap</td><td>Items can overlap with z-index</td><td>No overlap support</td></tr>
          <tr><td>Named areas</td><td>Yes (grid-template-areas)</td><td>No</td></tr>
        </tbody>
      </table>
      <p>
        <strong>Rule of thumb:</strong> Use Grid for the overall page layout and Flexbox for component internals.
        They work best together, not as alternatives.
      </p>

      <h2>Browser Support</h2>
      <p>
        CSS Grid is supported in all modern browsers with over 97% global coverage. Features like
        <code>gap</code>, <code>minmax()</code>, <code>auto-fit</code>, and <code>auto-fill</code> have
        universal support. The <code>subgrid</code> feature is supported in Firefox 71+, Chrome 117+, Safari 16+,
        and Edge 117+.
      </p>

      <h2>Subgrid</h2>
      <p>
        Subgrid allows a grid item that is also a grid container to inherit the track sizing from its parent grid.
        This is essential for aligning nested grids to the parent layout.
      </p>
      <pre><code>{`.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.child {
  display: grid;
  grid-column: span 3;
  /* Inherit parent column tracks */
  grid-template-columns: subgrid;
  /* Define own rows */
  grid-template-rows: auto auto;
}

/* Now child's items align perfectly to parent's columns */`}</code></pre>

      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between auto-fill and auto-fit?</h3>
      <p>
        Both create as many tracks as fit in the container. The difference appears when there are fewer items
        than tracks: <code>auto-fill</code> keeps the empty tracks (preserving their space), while
        <code>auto-fit</code> collapses empty tracks to zero, allowing existing items to stretch and fill
        the available space.
      </p>

      <h3>Can I use CSS Grid for responsive design without media queries?</h3>
      <p>
        Yes. The combination of <code>repeat(auto-fit, minmax(min, 1fr))</code> creates fully responsive
        grids. Items automatically wrap to new rows as the viewport shrinks, and each item maintains a minimum
        width. This is one of the most powerful CSS Grid patterns.
      </p>

      <h3>How do I center an item in CSS Grid?</h3>
      <p>
        The simplest way is to use <code>place-items: center</code> on the container, which centers all items
        both horizontally and vertically. For a single item, use <code>place-self: center</code>.
      </p>

      <h3>Can Grid items overlap?</h3>
      <p>
        Yes. When you place multiple items in the same grid area, they overlap. Use <code>z-index</code> to
        control the stacking order. This is useful for creating overlay effects, feature cards, and layered
        layouts.
      </p>

      <h3>Should I use Grid or Flexbox?</h3>
      <p>
        Use Grid when you need to control layout in two dimensions (both rows and columns). Use Flexbox when
        you are working with a single row or column of items. In practice, most pages use both: Grid for the
        overall page structure and Flexbox within individual components.
      </p>

      <h3>What is subgrid and when should I use it?</h3>
      <p>
        Subgrid lets a nested grid inherit track sizes from its parent. Use it when you need children of a grid
        item to align with the outer grid, such as card layouts where headings, content, and buttons should
        align across cards in different columns.
      </p>
    </>
  );
}
