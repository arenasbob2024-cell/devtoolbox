export default function WebAccessibilityChecklist() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1>Web Accessibility (a11y) Checklist: WCAG 2.2 Compliance Guide</h1>
      <p className="lead">
        Web accessibility ensures that people with disabilities can use your website effectively. Beyond
        being a legal requirement in many jurisdictions (ADA, EN 301 549, EAA), accessible sites rank
        better in search engines, reach more users, and are simply better products. This checklist covers
        WCAG 2.2 success criteria organized by category, with concrete code examples for each requirement.
      </p>

      <h2>The Four Principles of WCAG (POUR)</h2>
      <p>
        WCAG 2.2 is organized around four principles. All success criteria fall under one of these:
      </p>
      <ul>
        <li><strong>Perceivable</strong> — Information must be presentable in ways users can perceive (not invisible to all senses)</li>
        <li><strong>Operable</strong> — UI components and navigation must be operable (keyboard, pointer, or assistive technology)</li>
        <li><strong>Understandable</strong> — Information and UI operation must be understandable</li>
        <li><strong>Robust</strong> — Content must be robust enough to be interpreted by assistive technologies</li>
      </ul>
      <p>
        Criteria are rated at three levels: <strong>A</strong> (minimum), <strong>AA</strong> (standard —
        legally required in most contexts), and <strong>AAA</strong> (enhanced). Most organizations target
        WCAG 2.2 Level AA.
      </p>

      <h2>1. Perceivable</h2>

      <h3>1.1 Text Alternatives (Level A)</h3>
      <p>Provide text alternatives for non-text content so it can be changed into other forms (large print, braille, speech, symbols).</p>
      <pre><code className="language-html">{`<!-- Good: Meaningful alt text describing the image -->
<img src="revenue-chart.png" alt="Q4 2025 revenue: $2.4M, up 34% year over year" />

<!-- Good: Decorative image — empty alt hides from screen readers -->
<img src="decorative-divider.png" alt="" />

<!-- Good: Icon button with accessible label -->
<button aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Bad: Missing alt -->
<img src="product.jpg" />

<!-- Bad: Meaningless alt -->
<img src="chart.png" alt="image" />`}</code></pre>

      <h3>1.2 Captions and Transcripts (Level A/AA)</h3>
      <pre><code className="language-html">{`<!-- Video with captions (Level A) -->
<video controls>
  <source src="intro.mp4" type="video/mp4" />
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" default />
  <track kind="captions" src="captions-es.vtt" srclang="es" label="Español" />
</video>

<!-- Audio-only: provide transcript link (Level A) -->
<audio controls src="podcast.mp3"></audio>
<p><a href="/transcript-ep42.txt">Read transcript for Episode 42</a></p>`}</code></pre>

      <h3>1.3 Adaptable Content (Level A)</h3>
      <pre><code className="language-html">{`<!-- Use semantic HTML — don't rely on visual-only presentation for structure -->

<!-- Bad: Visual-only heading -->
<div style="font-size: 24px; font-weight: bold;">My Section</div>

<!-- Good: Semantic heading -->
<h2>My Section</h2>

<!-- Use landmark roles / elements -->
<header role="banner">...</header>
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<aside aria-label="Related articles">...</aside>
<footer>...</footer>

<!-- Correct reading order in DOM (not just visual order via CSS) -->
<!-- Table headers for data tables -->
<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget</td>
      <td>$9.99</td>
    </tr>
  </tbody>
</table>`}</code></pre>

      <h3>1.4 Distinguishable (Level A/AA)</h3>
      <pre><code className="language-css">{`/* 1.4.1 Color is not the only way to convey information */
/* Bad: red = error, green = success — only color */
/* Good: color + icon + text label */

/* 1.4.3 Contrast ratio (Level AA) */
/* Normal text: minimum 4.5:1 */
/* Large text (18pt / 14pt bold): minimum 3:1 */
/* Use tools: WebAIM Contrast Checker, browser DevTools */

body {
  color: #1a1a1a;       /* On white: ratio 16.1:1 — passes AAA */
  background: #ffffff;
}

.secondary-text {
  color: #595959;       /* On white: ratio 7:1 — passes AA */
}

/* Avoid this: */
.bad-contrast {
  color: #aaaaaa;       /* On white: ratio 2.3:1 — FAILS */
}

/* 1.4.4 Resize text: use relative units */
body {
  font-size: 1rem;      /* Not px — lets users zoom text independently */
  line-height: 1.5;
}

/* 1.4.10 Reflow (Level AA) — no horizontal scroll at 320px width */
@media (max-width: 320px) {
  .content {
    width: 100%;
    padding: 0 1rem;
  }
}

/* 1.4.11 Non-text contrast (Level AA) */
/* UI components and graphics need 3:1 contrast against adjacent colors */
input {
  border: 2px solid #767676; /* 4.5:1 against white */
}
input:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}`}</code></pre>

      <h2>2. Operable</h2>

      <h3>2.1 Keyboard Accessible (Level A)</h3>
      <pre><code className="language-html">{`<!-- All interactive elements must be reachable via keyboard -->

<!-- Custom button: use <button>, not <div> with click handler -->
<!-- Bad -->
<div onclick="submit()" style="cursor: pointer">Submit</div>

<!-- Good: native button, focusable by default, fires on Enter/Space -->
<button type="button" onclick="submit()">Submit</button>

<!-- If you MUST use a non-semantic element: -->
<div
  role="button"
  tabindex="0"
  onkeydown="handleKey(event)"
  onclick="submit()">
  Submit
</div>

<script>
function handleKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    submit();
  }
}
</script>

<!-- Skip navigation link for keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">...</main>`}</code></pre>
      <pre><code className="language-css">{`/* Skip link — visible on focus, hidden otherwise */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 9999;
  text-decoration: none;
}
.skip-link:focus {
  top: 0;
}`}</code></pre>

      <h3>2.2 Enough Time (Level A)</h3>
      <pre><code className="language-javascript">{`// If your site has session timeouts, warn users before expiry
function warnBeforeTimeout(remainingMs) {
  if (remainingMs <= 2 * 60 * 1000) { // 2 minutes remaining
    showTimeoutWarning({
      message: 'Your session expires in 2 minutes.',
      actions: [
        { label: 'Extend session', action: extendSession },
        { label: 'Log out', action: logout },
      ],
    });
  }
}

// For auto-updating content, provide pause controls
// <button aria-pressed="false" id="pause-updates">Pause live updates</button>`}</code></pre>

      <h3>2.4 Navigable (Level A/AA)</h3>
      <pre><code className="language-html">{`<!-- 2.4.1 Bypass blocks (Level A): skip links already covered above -->

<!-- 2.4.2 Page titled (Level A) -->
<title>Contact Us | DevToolBox</title>

<!-- 2.4.4 Link purpose (Level A) -->
<!-- Bad: ambiguous link text -->
<a href="/report.pdf">Click here</a>

<!-- Good: descriptive link text -->
<a href="/report.pdf">Download Q4 2025 Annual Report (PDF, 2.1 MB)</a>

<!-- When visual context provides meaning, use aria-label -->
<a href="/blog/redis-caching" aria-label="Read more about Redis caching strategies">
  Read more
</a>

<!-- 2.4.7 Focus visible (Level AA) -->
<!-- Never do this: -->
* { outline: none; }

<!-- Do this instead: style the focus indicator -->
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 2px;
}

<!-- 2.4.11 Focus not obscured (WCAG 2.2 Level AA) -->
<!-- Sticky headers must not fully cover focused elements -->
:target {
  scroll-margin-top: 80px; /* Height of sticky header */
}`}</code></pre>

      <h3>2.5 Input Modalities (WCAG 2.2 Level A/AA)</h3>
      <pre><code className="language-css">{`/* 2.5.3 Label in name (Level A): visible label text must be in accessible name */
/* If button says "Search", aria-label cannot say "Find" */

/* 2.5.8 Target size (WCAG 2.2 Level AA) */
/* Interactive targets must be at least 24x24 CSS pixels */
button, a, input[type="checkbox"], input[type="radio"] {
  min-width: 24px;
  min-height: 24px;
}

/* Better: 44x44px for comfortable touch targets (WCAG AAA / Apple HIG) */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}`}</code></pre>

      <h2>3. Understandable</h2>

      <h3>3.1 Readable (Level A)</h3>
      <pre><code className="language-html">{`<!-- 3.1.1 Language of page (Level A) -->
<html lang="en">

<!-- 3.1.2 Language of parts (Level AA) -->
<p>The French term <span lang="fr">mise en place</span> refers to preparation.</p>

<!-- For multilingual sites -->
<html lang="fr">
  <body>
    <p>Bonjour le monde</p>
    <blockquote lang="en">Hello World</blockquote>
  </body>
</html>`}</code></pre>

      <h3>3.2 Predictable (Level A/AA)</h3>
      <pre><code className="language-html">{`<!-- 3.2.2 On input (Level A): don't change context on focus/input without warning -->

<!-- Bad: navigates immediately on select change -->
<select onchange="window.location = this.value">
  <option value="/en">English</option>
  <option value="/fr">Français</option>
</select>

<!-- Good: require explicit submit action -->
<form action="/set-language" method="post">
  <label for="lang">Language:</label>
  <select id="lang" name="lang">
    <option value="en">English</option>
    <option value="fr">Français</option>
  </select>
  <button type="submit">Change language</button>
</form>`}</code></pre>

      <h3>3.3 Input Assistance (Level A/AA)</h3>
      <pre><code className="language-html">{`<!-- 3.3.1 Error identification (Level A) -->
<div role="alert" aria-live="assertive">
  <p id="email-error" class="error">
    Please enter a valid email address (example: name@domain.com).
  </p>
</div>

<!-- 3.3.2 Labels or instructions (Level A) -->
<label for="phone">
  Phone number
  <span class="hint">(Format: 555-123-4567)</span>
</label>
<input
  id="phone"
  type="tel"
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
  aria-describedby="phone-hint phone-error"
  autocomplete="tel"
/>
<p id="phone-hint">Enter your 10-digit US phone number</p>

<!-- 3.3.3 Error suggestion (Level AA) -->
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" role="alert">
  Invalid email. Did you mean <button onclick="fixEmail()">user@example.com</button>?
</p>`}</code></pre>

      <h2>4. Robust</h2>

      <h3>4.1 Compatible (Level A/AA)</h3>
      <pre><code className="language-html">{`<!-- 4.1.2 Name, role, value (Level A): use ARIA correctly -->

<!-- Native HTML is best — it has built-in ARIA semantics -->
<button>Submit</button>        <!-- role=button, name="Submit" -->
<input type="checkbox" />      <!-- role=checkbox, state: checked/unchecked -->
<a href="/about">About</a>    <!-- role=link, name="About" -->

<!-- Custom components: provide all three -->
<div
  role="switch"
  aria-checked="false"
  aria-label="Enable notifications"
  tabindex="0">
</div>

<!-- 4.1.3 Status messages (Level AA): announce dynamic content -->
<!-- Success message: role="status" (polite) -->
<div role="status" aria-live="polite">
  Your changes have been saved.
</div>

<!-- Error: role="alert" (assertive — interrupts) -->
<div role="alert" aria-live="assertive">
  Error: Failed to save changes. Please try again.
</div>

<!-- Loading state -->
<div role="status" aria-live="polite" aria-label="Loading search results">
  <span aria-hidden="true">Loading...</span>
</div>`}</code></pre>

      <h2>ARIA Roles and Landmarks Cheat Sheet</h2>
      <table>
        <thead>
          <tr>
            <th>HTML Element</th>
            <th>Implicit ARIA Role</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>&lt;header&gt;</code></td><td><code>banner</code></td><td>Site header (once per page)</td></tr>
          <tr><td><code>&lt;nav&gt;</code></td><td><code>navigation</code></td><td>Navigation menus</td></tr>
          <tr><td><code>&lt;main&gt;</code></td><td><code>main</code></td><td>Primary content (once per page)</td></tr>
          <tr><td><code>&lt;aside&gt;</code></td><td><code>complementary</code></td><td>Sidebar, related content</td></tr>
          <tr><td><code>&lt;footer&gt;</code></td><td><code>contentinfo</code></td><td>Site footer (once per page)</td></tr>
          <tr><td><code>&lt;section&gt;</code></td><td><code>region</code> (with label)</td><td>Thematic sections</td></tr>
          <tr><td><code>&lt;form&gt;</code></td><td><code>form</code></td><td>Forms with accessible name</td></tr>
          <tr><td><code>&lt;button&gt;</code></td><td><code>button</code></td><td>Actions (not navigation)</td></tr>
          <tr><td><code>&lt;a href&gt;</code></td><td><code>link</code></td><td>Navigation to URLs</td></tr>
        </tbody>
      </table>

      <h2>Accessibility Testing Tools</h2>
      <ul>
        <li><strong>axe DevTools</strong> — Browser extension for automated accessibility testing (catches ~57% of issues)</li>
        <li><strong>WAVE</strong> — Visual feedback overlay for accessibility errors</li>
        <li><strong>Lighthouse</strong> — Built into Chrome DevTools; includes an Accessibility audit</li>
        <li><strong>NVDA</strong> (Windows) / <strong>VoiceOver</strong> (Mac/iOS) / <strong>TalkBack</strong> (Android) — Manual screen reader testing</li>
        <li><strong>Keyboard navigation</strong> — Tab through every interactive element manually</li>
        <li><strong>Color contrast analyzers</strong> — WebAIM Contrast Checker, Colour Contrast Analyser desktop app</li>
      </ul>

      <h2>Quick Wins: The Highest-Impact Fixes</h2>
      <p>If you are just starting out, these fixes will resolve the most common WCAG violations:</p>
      <ol>
        <li>Add descriptive <code>alt</code> text to all images (or <code>alt=""</code> for decorative ones)</li>
        <li>Add <code>lang</code> attribute to the <code>&lt;html&gt;</code> element</li>
        <li>Associate every form input with a <code>&lt;label&gt;</code> using matching <code>id</code>/<code>for</code></li>
        <li>Never remove <code>:focus</code> styles without replacing them with a visible alternative</li>
        <li>Ensure color contrast meets 4.5:1 for normal text and 3:1 for large text</li>
        <li>Use semantic heading hierarchy (<code>h1</code> → <code>h2</code> → <code>h3</code>) — don't skip levels</li>
        <li>Add <code>&lt;title&gt;</code> to every page</li>
        <li>Make all interactive elements keyboard-operable (use native HTML elements where possible)</li>
      </ol>

      <p>
        For validating your HTML structure and semantic markup, use our{' '}
        <a href="/en/tools/html-minifier-online">HTML Minifier</a> which also highlights structural issues.
        To check color contrast ratios, try our <a href="/en/tools/color-picker-online">Color Picker</a>{' '}
        which displays hex, RGB, and HSL values you can verify against WCAG thresholds.
      </p>
    </article>
  );
}
