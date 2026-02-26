'use client';

import Link from 'next/link';

export default function SvgToJsxReactGuide({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between SVG and JSX?',
        acceptedAnswer: { '@type': 'Answer', text: 'SVG uses HTML-like attributes (class, fill-rule, stroke-width) while JSX requires JavaScript-compatible equivalents (className, fillRule, strokeWidth). JSX also requires all tags to be explicitly closed, style attributes to be objects instead of strings, and does not support XML namespaces like xmlns or xlink:href.' },
      },
      {
        '@type': 'Question',
        name: 'How do I convert SVG to a React component?',
        acceptedAnswer: { '@type': 'Answer', text: 'Convert SVG to a React component by: 1) replacing class with className, 2) converting kebab-case attributes to camelCase (fill-rule to fillRule, stroke-width to strokeWidth), 3) converting inline style strings to JavaScript objects, 4) removing xmlns, 5) self-closing all void tags, and 6) wrapping in a function component. Use an automated SVG to JSX converter for faster results.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need to remove xmlns from SVG in React?',
        acceptedAnswer: { '@type': 'Answer', text: 'When using inline SVG inside JSX, the xmlns attribute is not required because the browser already knows the SVG namespace from the HTML5 parser. Removing it slightly reduces markup size. However, keeping xmlns will not cause errors in React.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use inline SVG or img tags for SVG in React?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use inline SVG components for icons and small graphics (under 5KB) that need dynamic styling, animation, or prop-based color changes. Use img tags for large, complex SVGs like maps or detailed illustrations that benefit from browser caching and do not need JavaScript interaction.' },
      },
      {
        '@type': 'Question',
        name: 'How do I make SVG accessible in React?',
        acceptedAnswer: { '@type': 'Answer', text: 'For decorative SVGs, add aria-hidden="true" and focusable="false". For meaningful SVGs that convey information, add role="img" and aria-label with a descriptive label. Include a <title> element inside the SVG as a fallback. Ensure icon color contrast meets WCAG 2.1 minimum of 3:1.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          SVG files cannot be dropped directly into React because JSX requires camelCase attributes, object-style inline styles, and self-closing tags. You need to convert <code>class</code> to <code>className</code>, kebab-case attributes like <code>stroke-width</code> to <code>strokeWidth</code>, and style strings to JavaScript objects. Use our free{' '}
          <Link href={`/${lang}/tools/svg-to-jsx`}>SVG to JSX converter</Link> to automate the entire process instantly.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>JSX requires camelCase attribute names: <code>fill-rule</code> becomes <code>fillRule</code>, <code>stroke-linecap</code> becomes <code>strokeLinecap</code></li>
          <li><code>class</code> must be renamed to <code>className</code> and <code>for</code> to <code>htmlFor</code></li>
          <li>Inline <code>style</code> attributes change from strings to JavaScript objects with camelCase property names</li>
          <li>All SVG tags must be explicitly self-closed in JSX (e.g., <code>&lt;path /&gt;</code> not <code>&lt;path&gt;</code>)</li>
          <li>Optimize SVG with SVGO before conversion to remove editor bloat and reduce file size by 30-60%</li>
          <li>Wrap converted SVG in React components with props for dynamic color, size, and accessibility</li>
        </ul>
      </div>

      <h2>Why SVG Needs Conversion for React</h2>
      <p>
        SVG (Scalable Vector Graphics) is the standard format for icons, logos, and illustrations on the modern web. Every design tool from Figma to Illustrator exports SVG, and developers use it everywhere because it scales perfectly to any screen resolution without quality loss.
      </p>
      <p>
        However, you cannot simply copy raw SVG markup into a React component and expect it to work. React uses <strong>JSX</strong>, a syntax extension for JavaScript that looks like HTML but follows different rules. JSX compiles to <code>React.createElement()</code> calls, and because it lives inside JavaScript, it must respect JavaScript naming conventions and reserved words.
      </p>
      <p>
        The result: attributes like <code>class</code>, <code>fill-rule</code>, and <code>stroke-width</code> that are perfectly valid in SVG will trigger React warnings or outright break your component. Inline style strings will throw compilation errors. Unclosed tags like <code>&lt;path&gt;</code> without a self-closing slash will fail to parse. Converting SVG to JSX solves all these issues and makes your graphics first-class React citizens.
      </p>

      <h2>Key Differences Between SVG and JSX Syntax</h2>
      <p>
        Understanding the specific differences between raw SVG attributes and their JSX equivalents is essential before you start converting. Here is the complete reference table:
      </p>
      <table>
        <thead>
          <tr><th>SVG / HTML Attribute</th><th>JSX Equivalent</th><th>Reason</th></tr>
        </thead>
        <tbody>
          <tr><td><code>class</code></td><td><code>className</code></td><td><code>class</code> is a reserved JavaScript keyword</td></tr>
          <tr><td><code>for</code></td><td><code>htmlFor</code></td><td><code>for</code> is a reserved JavaScript keyword</td></tr>
          <tr><td><code>fill-rule</code></td><td><code>fillRule</code></td><td>JSX uses camelCase for multi-word attributes</td></tr>
          <tr><td><code>clip-rule</code></td><td><code>clipRule</code></td><td>camelCase convention</td></tr>
          <tr><td><code>clip-path</code></td><td><code>clipPath</code></td><td>camelCase convention</td></tr>
          <tr><td><code>stroke-width</code></td><td><code>strokeWidth</code></td><td>camelCase convention</td></tr>
          <tr><td><code>stroke-linecap</code></td><td><code>strokeLinecap</code></td><td>camelCase convention</td></tr>
          <tr><td><code>stroke-linejoin</code></td><td><code>strokeLinejoin</code></td><td>camelCase convention</td></tr>
          <tr><td><code>stroke-dasharray</code></td><td><code>strokeDasharray</code></td><td>camelCase convention</td></tr>
          <tr><td><code>stroke-dashoffset</code></td><td><code>strokeDashoffset</code></td><td>camelCase convention</td></tr>
          <tr><td><code>font-size</code></td><td><code>fontSize</code></td><td>camelCase convention</td></tr>
          <tr><td><code>text-anchor</code></td><td><code>textAnchor</code></td><td>camelCase convention</td></tr>
          <tr><td><code>xlink:href</code></td><td><code>xlinkHref</code></td><td>Namespaced attributes use camelCase (or remove entirely for modern SVG)</td></tr>
          <tr><td><code>style=&quot;fill: red&quot;</code></td><td><code>{'style={{ fill: "red" }}'}</code></td><td>JSX style must be a JavaScript object, not a string</td></tr>
        </tbody>
      </table>
      <p>
        Missing even one of these conversions will produce a React console warning and may cause the SVG to render incorrectly. For a full HTML-to-JSX attribute reference, see our <Link href={`/${lang}/blog/html-to-jsx-react-migration`}>HTML to JSX migration guide</Link>.
      </p>

      <h2>Manual SVG to JSX Conversion: Step by Step</h2>
      <p>
        For a quick one-off conversion, you can manually transform SVG to JSX in six steps. Here is the process with a before-and-after example.
      </p>
      <p><strong>Step 1:</strong> Start with your raw SVG markup (exported from Figma, Illustrator, or downloaded from an icon library):</p>
      <pre><code className="language-html">{`<!-- Raw SVG from design tool -->
<svg xmlns="http://www.w3.org/2000/svg" class="icon-alert"
     width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="8" x2="12" y2="12"></line>
  <line x1="12" y1="16" x2="12.01" y2="16"></line>
</svg>`}</code></pre>
      <p><strong>Step 2-5:</strong> Apply all the required transformations:</p>
      <ul>
        <li>Remove <code>xmlns</code> (not needed for inline SVG in HTML5)</li>
        <li>Replace <code>class</code> with <code>className</code></li>
        <li>Convert <code>stroke-width</code> to <code>strokeWidth</code></li>
        <li>Convert <code>stroke-linecap</code> to <code>strokeLinecap</code></li>
        <li>Convert <code>stroke-linejoin</code> to <code>strokeLinejoin</code></li>
        <li>Self-close all tags: <code>&lt;circle ... /&gt;</code> instead of <code>&lt;circle ...&gt;&lt;/circle&gt;</code></li>
      </ul>
      <p><strong>Step 6:</strong> The converted JSX result:</p>
      <pre><code className="language-jsx">{`<svg className="icon-alert"
     width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" strokeWidth="2"
     strokeLinecap="round" strokeLinejoin="round">
  <circle cx="12" cy="12" r="10" />
  <line x1="12" y1="8" x2="12" y2="12" />
  <line x1="12" y1="16" x2="12.01" y2="16" />
</svg>`}</code></pre>
      <p>
        The converted output is valid JSX that React can render without any warnings. For SVG files with dozens of paths and attributes, manual conversion is tedious and error-prone, which is why automated tools exist.
      </p>

      <h2>Using an Automated SVG to JSX Converter</h2>
      <p>
        Manual conversion works for small icons, but real-world SVGs from design tools often contain hundreds of attributes, nested groups, gradients, and metadata. An automated converter handles everything in a single pass:
      </p>
      <ul>
        <li>Renames all HTML/SVG attributes to their camelCase JSX equivalents</li>
        <li>Converts inline <code>style</code> strings to JavaScript style objects</li>
        <li>Self-closes all void elements (<code>path</code>, <code>circle</code>, <code>rect</code>, <code>line</code>, <code>polyline</code>)</li>
        <li>Removes unnecessary <code>xmlns</code> declarations and editor metadata</li>
        <li>Preserves the <code>viewBox</code> and essential SVG structure</li>
      </ul>
      <p>
        Our free <Link href={`/${lang}/tools/svg-to-jsx`}><strong>SVG to JSX converter</strong></Link> does all of this instantly. Paste your raw SVG, get production-ready JSX. No sign-up, no installation, no external dependencies. If your SVG also contains HTML elements, our <Link href={`/${lang}/tools/html-to-jsx`}>HTML to JSX converter</Link> handles the full spectrum of HTML-to-JSX transformations.
      </p>

      <h2>SVG as React Components: Inline vs File Import</h2>
      <p>
        Once your SVG is converted to valid JSX, you have two approaches for using it in React: inline components and file imports. Each has distinct trade-offs.
      </p>
      <p><strong>Approach 1: Inline SVG Components</strong></p>
      <p>
        Define the SVG markup directly inside a React component function. This is the most common pattern for icons and small graphics:
      </p>
      <pre><code className="language-typescript">{`// components/icons/AlertIcon.tsx
interface AlertIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function AlertIcon({ size = 24, ...props }: AlertIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Full CSS and JS control, dynamic props, tree-shakeable, no extra HTTP requests, works with SSR.
        <br />
        <strong>Cons:</strong> Increases JavaScript bundle size, cannot be cached separately from your JS bundle.
        <br />
        <strong>Best for:</strong> Icons, logos, and small illustrations under 5KB each.
      </p>
      <p><strong>Approach 2: SVG File Imports (with build tool support)</strong></p>
      <p>
        Tools like SVGR (used by Create React App, Vite, and Next.js) let you import <code>.svg</code> files directly as React components:
      </p>
      <pre><code className="language-typescript">{`// With SVGR configured in your bundler
import { ReactComponent as AlertIcon } from './alert.svg';
// or with Next.js @svgr/webpack:
import AlertIcon from './alert.svg';

function App() {
  return <AlertIcon width={32} height={32} className="text-red-500" />;
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Keeps SVG files separate and editable, build tool handles conversion automatically, cleaner source code.
        <br />
        <strong>Cons:</strong> Requires build configuration, still inlines into JS bundle at build time.
      </p>

      <h2>Optimizing SVG Before Conversion with SVGO</h2>
      <p>
        SVG files exported from design tools are almost always larger than they need to be. Figma, Sketch, and Illustrator embed editor metadata, comments, empty groups, default attribute values, and unnecessary precision in coordinates. <strong>SVGO</strong> (SVG Optimizer) is the standard tool for cleaning this up.
      </p>
      <p>
        Running SVGO before converting to JSX typically reduces file size by <strong>30-60%</strong>. Here is what SVGO removes:
      </p>
      <ul>
        <li><code>xmlns</code> when not needed for inline SVG</li>
        <li>XML declarations and DOCTYPE</li>
        <li>Editor metadata (<code>data-name</code>, <code>sketch:type</code>, <code>inkscape:*</code>)</li>
        <li>HTML comments</li>
        <li>Empty <code>&lt;defs&gt;</code> and <code>&lt;g&gt;</code> groups</li>
        <li>Default attribute values that browsers already apply</li>
        <li>Unnecessary coordinate precision (e.g., <code>12.000000</code> to <code>12</code>)</li>
        <li>Redundant <code>fill</code> and <code>stroke</code> attributes that inherit from parent</li>
      </ul>
      <p>
        You can use SVGO via the CLI (<code>npx svgo input.svg -o output.svg</code>) or use our online <Link href={`/${lang}/tools/svg-optimizer`}><strong>SVG Optimizer tool</strong></Link> which runs SVGO in the browser with no installation needed. Always optimize first, then convert to JSX for the cleanest result.
      </p>

      <h2>Dynamic SVG with Props: Color, Size, and Animation</h2>
      <p>
        One of the biggest advantages of SVG-as-React-components over <code>&lt;img&gt;</code> tags is the ability to control SVG properties dynamically through React props. Here is a flexible icon component pattern:
      </p>
      <pre><code className="language-typescript">{`interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  title?: string;
}

function StarIcon({
  size = 24,
  color = "currentColor",
  title,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87
               1.18 6.88L12 17.77l-6.18 3.25L7 14.14
               2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}`}</code></pre>
      <p>Usage examples with dynamic props:</p>
      <pre><code className="language-jsx">{`{/* Default: 24px, inherits text color */}
<StarIcon />

{/* Custom size and explicit color */}
<StarIcon size={48} color="#f59e0b" />

{/* With accessibility label for screen readers */}
<StarIcon size={20} color="#ef4444" title="Favorite" />

{/* With CSS class for Tailwind styling */}
<StarIcon className="w-6 h-6 text-yellow-400 hover:text-yellow-500" />

{/* With click handler */}
<StarIcon onClick={() => toggleFavorite()} style={{ cursor: 'pointer' }} />`}</code></pre>
      <p>
        The <code>currentColor</code> technique is especially powerful: setting <code>fill=&quot;currentColor&quot;</code> or <code>stroke=&quot;currentColor&quot;</code> makes the SVG inherit the CSS <code>color</code> property from its parent element, enabling automatic theme switching (light/dark mode) without any prop changes.
      </p>

      <h2>SVG Accessibility: ARIA Labels and Roles</h2>
      <p>
        SVG icons are invisible to screen readers by default. Without proper ARIA attributes, assistive technology will either skip the icon entirely or read out meaningless path data. Here are the three scenarios you need to handle:
      </p>
      <p><strong>1. Decorative Icons (alongside text)</strong></p>
      <p>
        When the icon appears next to a text label that already conveys the meaning, the icon is purely decorative and should be hidden:
      </p>
      <pre><code className="language-jsx">{`<button>
  <TrashIcon aria-hidden="true" focusable="false" />
  <span>Delete</span>
</button>`}</code></pre>
      <p><strong>2. Meaningful Icons (standalone, no text)</strong></p>
      <p>
        When the icon is the only content and conveys meaning, it needs a label:
      </p>
      <pre><code className="language-jsx">{`<StarIcon role="img" aria-label="Rated 4 out of 5 stars" />`}</code></pre>
      <p><strong>3. Interactive Icons (inside buttons or links)</strong></p>
      <p>
        When the icon is inside an interactive element without visible text, label the interactive element itself:
      </p>
      <pre><code className="language-jsx">{`<button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" focusable="false" />
</button>`}</code></pre>
      <p>
        Additionally, include a <code>&lt;title&gt;</code> element as the first child inside the <code>&lt;svg&gt;</code> tag. This provides a tooltip on hover in most browsers and serves as a fallback description for older assistive technology. Ensure that SVG icon colors meet the WCAG 2.1 minimum contrast ratio of 3:1 against their background.
      </p>

      <h2>Common Pitfalls and Fixes</h2>
      <p>
        Even experienced React developers run into these SVG conversion issues. Here is a quick reference for the most common problems and their solutions:
      </p>
      <p><strong>Pitfall 1: Forgetting to convert <code>class</code> to <code>className</code></strong></p>
      <p>
        React will silently ignore the <code>class</code> attribute and your styles will not apply. Always search for <code>class=</code> and replace with <code>className=</code>.
      </p>
      <p><strong>Pitfall 2: Style attribute as a string</strong></p>
      <pre><code className="language-html">{`<!-- WRONG: will throw a compilation error -->
<svg style="fill: red; stroke-width: 2px">

<!-- CORRECT: JSX style object with camelCase -->
<svg style={{ fill: 'red', strokeWidth: '2px' }}>`}</code></pre>
      <p><strong>Pitfall 3: Unclosed SVG elements</strong></p>
      <p>
        Tags like <code>&lt;path&gt;</code>, <code>&lt;circle&gt;</code>, <code>&lt;rect&gt;</code>, and <code>&lt;line&gt;</code> must be self-closed in JSX with a trailing slash: <code>&lt;path d=&quot;...&quot; /&gt;</code>.
      </p>
      <p><strong>Pitfall 4: Namespace attributes</strong></p>
      <p>
        SVG attributes with colons like <code>xlink:href</code> and <code>xml:space</code> are not valid JSX. Convert <code>xlink:href</code> to <code>xlinkHref</code> (or replace with plain <code>href</code> for modern SVG) and remove <code>xml:space</code> entirely.
      </p>
      <p><strong>Pitfall 5: Duplicate <code>id</code> attributes</strong></p>
      <p>
        Design tools generate auto-incremented IDs (<code>id=&quot;Layer_1&quot;</code>, <code>id=&quot;SVGID_1_&quot;</code>). If you use the same SVG component multiple times, these duplicate IDs cause rendering glitches with gradients, clip paths, and filters. Either remove IDs or make them unique per instance with a prefix prop.
      </p>
      <p><strong>Pitfall 6: viewBox casing</strong></p>
      <p>
        The <code>viewBox</code> attribute is case-sensitive. Writing <code>viewbox</code> (lowercase b) will silently break SVG scaling. Always use <code>viewBox</code> with a capital B.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between SVG and JSX?</h3>
      <p>
        SVG uses standard HTML/XML attributes (<code>class</code>, <code>fill-rule</code>, <code>stroke-width</code>) while JSX requires JavaScript-compatible equivalents (<code>className</code>, <code>fillRule</code>, <code>strokeWidth</code>). JSX also requires all tags to be explicitly closed, style attributes to be objects instead of strings, and does not support XML namespaces like <code>xmlns</code> or <code>xlink:href</code> in the standard way.
      </p>

      <h3>How do I convert SVG to a React component?</h3>
      <p>
        Convert SVG to a React component by: (1) replacing <code>class</code> with <code>className</code>, (2) converting kebab-case attributes to camelCase, (3) converting inline style strings to JavaScript objects, (4) removing <code>xmlns</code>, (5) self-closing all void tags, and (6) wrapping in a function component. Use our <Link href={`/${lang}/tools/svg-to-jsx`}>SVG to JSX converter</Link> for instant automated results.
      </p>

      <h3>Do I need to remove xmlns from SVG in React?</h3>
      <p>
        When using inline SVG inside JSX, the <code>xmlns</code> attribute is not required because the browser already knows the SVG namespace from the HTML5 parser. Removing it slightly reduces markup size. However, keeping <code>xmlns</code> will not cause errors in React, so it is a minor optimization rather than a requirement.
      </p>

      <h3>Should I use inline SVG or img tags for SVG in React?</h3>
      <p>
        Use inline SVG components for icons and small graphics (under 5KB) that need dynamic styling, animation, or prop-based color changes. Use <code>&lt;img&gt;</code> tags for large, complex SVGs like maps or detailed illustrations that benefit from browser caching and do not need JavaScript interaction. For more details, see our <Link href={`/${lang}/blog/svg-to-react-component-guide`}>SVG to React component guide</Link>.
      </p>

      <h3>How do I make SVG accessible in React?</h3>
      <p>
        For decorative SVGs, add <code>aria-hidden=&quot;true&quot;</code> and <code>focusable=&quot;false&quot;</code>. For meaningful SVGs that convey information, add <code>role=&quot;img&quot;</code> and <code>aria-label</code> with a descriptive label. Include a <code>&lt;title&gt;</code> element inside the SVG as a fallback. Ensure icon color contrast meets the WCAG 2.1 minimum of 3:1 against the background.
      </p>

      {/* Related Tools and Guides */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/svg-to-jsx`}>SVG to JSX Converter</Link> - Convert SVG to React components instantly</li>
        <li><Link href={`/${lang}/tools/svg-optimizer`}>SVG Optimizer</Link> - Optimize and minify SVG files before conversion</li>
        <li><Link href={`/${lang}/tools/html-to-jsx`}>HTML to JSX Converter</Link> - Convert HTML templates to valid JSX</li>
        <li><Link href={`/${lang}/blog/html-to-jsx-react-migration`}>HTML to JSX: React Migration Guide</Link> - Complete attribute reference for HTML to JSX</li>
        <li><Link href={`/${lang}/blog/svg-to-react-component-guide`}>SVG to React Component Guide</Link> - In-depth guide to SVG components in React</li>
        <li><Link href={`/${lang}/blog/svg-viewbox-width-height-explained`}>SVG ViewBox Explained</Link> - Understanding SVG coordinate systems</li>
      </ul>
    </>
  );
}
