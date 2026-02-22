'use client';

import Link from 'next/link';

export default function SvgOptimizationGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Optimize SVGs?</h2>
      <p>
        <strong>SVG (Scalable Vector Graphics)</strong> files are the preferred format for icons, logos, illustrations, and UI elements in modern web development. They scale perfectly to any resolution, can be styled with CSS, animated with JavaScript, and are accessible to screen readers. However, SVGs exported from design tools like Figma, Illustrator, or Sketch often contain unnecessary metadata, redundant attributes, and bloated path data that can increase file sizes by 50-80%.
      </p>
      <p>
        Optimizing SVGs reduces file size, improves page load times, and makes the markup cleaner for manipulation and animation. This guide covers manual optimization techniques, automated tools, best practices for different use cases, and how to achieve dramatic file size reductions without losing visual quality.
      </p>

      <h2>What Makes SVGs Bloated?</h2>
      <p>
        Design tools add substantial overhead to SVG exports. Understanding what can be safely removed is the first step to effective optimization.
      </p>
      <pre><code className="language-xml">{`<!-- Typical unoptimized SVG from a design tool -->
<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: Adobe Illustrator 28.0 -->
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     version="1.1"
     id="Layer_1"
     x="0px" y="0px"
     viewBox="0 0 24 24"
     style="enable-background:new 0 0 24 24;"
     xml:space="preserve"
     width="24px"
     height="24px">
  <metadata>
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
        xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title>icon-check</dc:title>
        <dc:creator>Designer Name</dc:creator>
      </rdf:Description>
    </rdf:RDF>
  </metadata>
  <g id="Layer_2">
    <g id="icon">
      <path fill="#000000" d="M9.000,16.170 L4.830,12.000
        L3.410,13.410 L9.000,19.000 L21.000,7.000
        L19.590,5.590 L9.000,16.170 Z"/>
    </g>
  </g>
</svg>`}</code></pre>

      <pre><code className="language-xml">{`<!-- Same SVG after optimization (80% smaller) -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
</svg>`}</code></pre>

      <h3>Common Bloat Sources</h3>
      <pre><code className="language-text">{`Source                          Can Remove?   Size Impact
──────────────────────────────────────────────────────────
XML declaration                 Yes           Small
Editor metadata/comments        Yes           Medium-Large
Unnecessary namespaces          Yes           Small
Empty/default attributes        Yes           Medium
Redundant group elements        Yes           Small
Excessive decimal precision     Yes           Large
Inline styles (convertible)     Convert       Medium
Unused definitions (defs)       Yes           Medium
Hidden elements                 Yes           Varies
Non-essential IDs/classes       Usually       Small
Whitespace and formatting       Yes           Medium`}</code></pre>

      <h2>Manual Optimization Techniques</h2>

      <h3>1. Remove Metadata and Comments</h3>
      <pre><code className="language-xml">{`<!-- REMOVE: XML declaration (not needed when inline or served as SVG) -->
<?xml version="1.0" encoding="UTF-8"?>

<!-- REMOVE: Editor comments -->
<!-- Generator: Sketch 99 (12345) -->
<!-- Created with Figma -->

<!-- REMOVE: Metadata blocks -->
<metadata>...</metadata>

<!-- REMOVE: Unnecessary namespaces -->
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"

<!-- KEEP: Only xmlns="http://www.w3.org/2000/svg" is required -->`}</code></pre>

      <h3>2. Simplify Path Data</h3>
      <p>
        Path data is often the largest part of an SVG. Reducing decimal precision and using relative commands can yield significant savings.
      </p>
      <pre><code className="language-text">{`Path Optimization Techniques:

1. Reduce decimal precision (biggest impact)
   Before: d="M9.00000,16.17000 L4.83000,12.00000"
   After:  d="M9 16.17L4.83 12"
   Rule:   1-2 decimal places is sufficient for most icons

2. Use relative commands
   Before: M10,10 L20,10 L20,20 L10,20 Z   (absolute)
   After:  M10,10 l10,0 l0,10 l-10,0 Z      (relative)

3. Remove redundant commands
   Before: M10,10 L20,10 L20,20 L10,20 L10,10 Z
   After:  M10,10 L20,10 L20,20 L10,20Z  (Z closes the path)

4. Merge overlapping paths when possible
   Before: <path d="M0,0h12v12h-12z"/><path d="M2,2h8v8h-8z"/>
   After:  <path d="M0,0h12v12h-12zM2,2h8v8h-8z"/>  (compound path)

5. Use shorthand commands
   H10 instead of L10,currentY
   V20 instead of LcurrentX,20
   S/T for smooth curves instead of full C/Q`}</code></pre>

      <h3>3. Remove Default Values</h3>
      <pre><code className="language-xml">{`<!-- Remove attributes that match SVG defaults -->

<!-- REMOVE: These are all default values -->
fill="black"           <!-- default fill is black -->
fill-opacity="1"       <!-- default opacity is 1 -->
stroke="none"          <!-- default stroke is none -->
stroke-width="1"       <!-- default stroke-width is 1 -->
font-size="medium"     <!-- rarely needed -->
x="0" y="0"           <!-- default position -->
display="inline"       <!-- default display -->
visibility="visible"   <!-- default visibility -->
overflow="visible"     <!-- default overflow for SVG -->

<!-- KEEP: Non-default values -->
fill="#ff6b6b"
stroke="#333"
stroke-width="2"
opacity="0.8"`}</code></pre>

      <h3>4. Flatten Unnecessary Groups</h3>
      <pre><code className="language-xml">{`<!-- Before: Unnecessary wrapper groups -->
<svg viewBox="0 0 24 24">
  <g>
    <g id="layer1">
      <g transform="translate(0,0)">
        <path d="M12 2L2 7v10l10 5 10-5V7z"/>
      </g>
    </g>
  </g>
</svg>

<!-- After: Flatten groups with no meaningful attributes -->
<svg viewBox="0 0 24 24">
  <path d="M12 2L2 7v10l10 5 10-5V7z"/>
</svg>

<!-- KEEP groups when they serve a purpose: -->
<g transform="rotate(45 12 12)">...</g>   <!-- Shared transform -->
<g fill="#333">...</g>                      <!-- Shared fill -->
<g opacity="0.5">...</g>                    <!-- Shared opacity -->`}</code></pre>

      <h2>Automated Optimization with SVGO</h2>
      <p>
        <strong>SVGO</strong> (SVG Optimizer) is the industry-standard tool for automated SVG optimization. It applies a series of configurable plugins to clean, minimize, and optimize SVG files.
      </p>
      <pre><code className="language-bash">{`# Install SVGO
npm install -g svgo

# Optimize a single file
svgo input.svg -o output.svg

# Optimize with precision setting
svgo --precision=2 input.svg -o output.svg

# Optimize an entire directory
svgo -f ./src/icons/ -o ./dist/icons/

# Show optimization statistics
svgo input.svg -o output.svg --pretty --indent=2

# Use a configuration file
svgo --config svgo.config.js input.svg`}</code></pre>

      <pre><code className="language-javascript">{`// svgo.config.js - Custom configuration
module.exports = {
  multipass: true,    // Run multiple optimization passes
  plugins: [
    // Built-in preset with overrides
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox (important for responsive SVGs)
          removeViewBox: false,
          // Keep IDs if you reference them in CSS/JS
          cleanupIds: false,
        },
      },
    },
    // Additional plugins
    'removeXMLNS',           // Remove xmlns when inlining
    'removeDimensions',      // Remove width/height, keep viewBox
    'sortAttrs',             // Sort attributes for consistency
    'removeOffCanvasPaths',  // Remove paths outside viewBox
    {
      name: 'removeAttrs',
      params: {
        attrs: ['data-name', 'class'],  // Remove specific attrs
      },
    },
  ],
};`}</code></pre>

      <h2>SVG Optimization for Different Use Cases</h2>

      <h3>Icons</h3>
      <pre><code className="language-xml">{`<!-- Optimized icon pattern -->
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M12 2v20M2 12h20"/>
</svg>

<!-- Tips for icons:
  - Use viewBox, not width/height (CSS handles sizing)
  - Use currentColor for fill/stroke (inherits text color)
  - Minimize path complexity
  - Target < 500 bytes per icon
  - Consider icon sprite sheets for many icons -->`}</code></pre>

      <h3>Illustrations</h3>
      <pre><code className="language-text">{`Illustration Optimization Checklist:

  1. Simplify paths
     - Reduce anchor points in curves
     - Use fewer decimal places (precision=1 for large art)
     - Merge overlapping shapes when possible

  2. Optimize colors
     - Use short hex (#fff instead of #ffffff)
     - Use named colors when shorter (red vs #ff0000)
     - Consolidate similar colors

  3. Use CSS classes instead of inline styles
     Before: <path style="fill:#ff6b6b;stroke:#333;stroke-width:2"/>
     After:  <path class="accent"/>
     .accent { fill: #ff6b6b; stroke: #333; stroke-width: 2 }

  4. Consider rasterizing complex areas
     - Photo-realistic gradients may be smaller as embedded PNG
     - Highly complex textures might benefit from hybrid approach

  5. Use <defs> and <use> for repeated elements
     <defs><circle id="dot" r="3"/></defs>
     <use href="#dot" x="10" y="10"/>
     <use href="#dot" x="20" y="10"/>
     <use href="#dot" x="30" y="10"/>`}</code></pre>

      <h3>Animated SVGs</h3>
      <pre><code className="language-xml">{`<!-- Keep structure needed for animation targets -->
<svg viewBox="0 0 100 100">
  <circle id="spinner" cx="50" cy="50" r="40"
          fill="none" stroke="#3b82f6" stroke-width="4">
    <!-- SMIL animation (works without JS) -->
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 50 50" to="360 50 50"
      dur="1s"
      repeatCount="indefinite"/>
  </circle>
</svg>

<!-- CSS animation alternative -->
<style>
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  #spinner {
    animation: spin 1s linear infinite;
    transform-origin: center;
  }
</style>`}</code></pre>

      <h2>Build Pipeline Integration</h2>
      <pre><code className="language-javascript">{`// Vite: vite-plugin-svgr (React) or vite-svg-loader (Vue)

// vite.config.ts
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            { name: 'preset-default',
              params: { overrides: { removeViewBox: false } } },
            'removeDimensions',
          ],
        },
      },
    }),
  ],
});

// Usage in React component
import Logo from './logo.svg?react';
// <Logo className="h-8 w-8" />`}</code></pre>

      <pre><code className="language-json">{`// package.json scripts for batch optimization
{
  "scripts": {
    "svg:optimize": "svgo -f src/assets/icons -o src/assets/icons --config svgo.config.js",
    "svg:report": "svgo -f src/assets/icons --dry-run",
    "prebuild": "npm run svg:optimize"
  }
}`}</code></pre>

      <h2>Measuring Optimization Results</h2>
      <pre><code className="language-text">{`Typical Optimization Results:

  File Type              Before      After       Reduction
  ──────────────────────────────────────────────────────────
  Simple icon            2.1 KB      0.3 KB      86%
  Complex icon           5.4 KB      1.2 KB      78%
  Logo                   12 KB       3.5 KB      71%
  Illustration           45 KB       12 KB       73%
  Map/diagram            200 KB      55 KB       72%
  Icon sprite (50 icons) 120 KB      28 KB       77%

  Performance Impact:
    - 50 optimized icons: ~15 KB (vs ~105 KB unoptimized)
    - Saves ~90 KB per page load
    - At 10K daily visitors: ~900 MB/day bandwidth saved
    - Faster First Contentful Paint (FCP)
    - Better Core Web Vitals scores`}</code></pre>

      <h2>SVG vs Other Formats</h2>
      <pre><code className="language-text">{`When to Use SVG:
  - Icons and logos (any size, crisp at all resolutions)
  - UI elements (buttons, dividers, decorations)
  - Simple illustrations and diagrams
  - Animated graphics
  - Interactive charts and data visualizations
  - Text that needs to be selectable/accessible

When NOT to Use SVG:
  - Photographs (use WebP/AVIF)
  - Highly detailed/complex artwork (use PNG/WebP)
  - Video content
  - Raster textures and patterns

Format Comparison for a 24x24 icon:
  SVG (optimized):  ~300 bytes  (scalable, styleable)
  PNG @1x:          ~800 bytes  (fixed resolution)
  PNG @2x:          ~2 KB       (retina support)
  WebP:             ~500 bytes  (good compression, not scalable)
  Icon font glyph:  ~200 bytes  (limited styling, a11y issues)`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I inline SVGs or use img tags?</h3>
      <p>
        Inline SVGs directly in your HTML when you need to style them with CSS, animate them, or interact with them via JavaScript. Use <code>&lt;img src="icon.svg"&gt;</code> when the SVG is purely decorative and does not need styling or interaction -- this allows browser caching. For icon systems with many icons, consider SVG sprites with <code>&lt;use&gt;</code> references for the best balance of caching and flexibility.
      </p>

      <h3>Does SVG optimization affect visual quality?</h3>
      <p>
        Properly configured optimization does not affect visual quality. The main risk is reducing path precision too aggressively. For most icons and UI elements, 1-2 decimal places of precision is sufficient. For detailed illustrations, use 2-3 decimal places. Always visually compare before and after optimization, especially for complex artwork. The <code>removeViewBox</code> plugin should be disabled to maintain responsive scaling.
      </p>

      <h3>How do I make SVGs accessible?</h3>
      <p>
        For meaningful SVGs, add <code>role="img"</code> and either a <code>&lt;title&gt;</code> element inside the SVG or an <code>aria-label</code> attribute. For decorative SVGs, use <code>aria-hidden="true"</code>. Ensure sufficient color contrast and avoid conveying information through color alone. Provide text alternatives for complex diagrams.
      </p>

      <h3>Can I animate optimized SVGs?</h3>
      <p>
        Yes, but you need to preserve the elements you want to animate. When using SVGO, disable plugins that would remove IDs, groups, or attributes needed for your animations. Use the <code>cleanupIds: false</code> override and avoid removing groups that serve as animation targets. Always test animations after optimization.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/svg-optimizer`}>SVG Optimizer</Link> - Optimize SVGs online with instant preview</li>
        <li><Link href={`/${lang}/tools/svg-to-react`}>SVG to React Converter</Link> - Convert SVGs to React components</li>
        <li><Link href={`/${lang}/blog/svg-viewbox-width-height-explained`}>SVG viewBox Explained</Link> - Understanding viewBox, width, and height</li>
        <li><Link href={`/${lang}/blog/svg-optimization-react`}>SVG Optimization for React</Link> - React-specific SVG patterns</li>
      </ul>
    </>
  );
}
