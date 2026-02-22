'use client';

import Link from 'next/link';

export default function TailwindV4NewFeatures({ lang }: { lang: string }) {
  return (
    <>
      <h2>Tailwind CSS v4: New Features and Migration Guide</h2>
      <p>
        Tailwind CSS v4 represents the most significant rewrite in the framework's history. Built on a completely new engine called Oxide, Tailwind v4 delivers dramatically faster build times, a CSS-first configuration approach, native cascade layers, and a host of new utilities. This guide covers every major new feature, explains the breaking changes, and provides a step-by-step migration path from Tailwind v3.
      </p>
      <p>
        Whether you are starting a new project with Tailwind v4 or planning to migrate an existing v3 codebase, this comprehensive guide will help you understand and leverage everything the new version has to offer.
      </p>

      <h2>The Oxide Engine: A Complete Rewrite</h2>
      <p>
        Tailwind v4's new engine, called Oxide, is written in Rust and replaces the previous Node.js-based architecture. This is not just a performance optimization -- it fundamentally changes how Tailwind works under the hood.
      </p>

      <h3>Performance Improvements</h3>
      <table>
        <thead>
          <tr><th>Metric</th><th>Tailwind v3</th><th>Tailwind v4</th><th>Improvement</th></tr>
        </thead>
        <tbody>
          <tr><td>Full Build</td><td>~350ms</td><td>~35ms</td><td>10x faster</td></tr>
          <tr><td>Incremental Build</td><td>~120ms</td><td>~5ms</td><td>24x faster</td></tr>
          <tr><td>CSS Output Size</td><td>Baseline</td><td>~20% smaller</td><td>Better tree-shaking</td></tr>
          <tr><td>Memory Usage</td><td>~150MB</td><td>~25MB</td><td>6x less</td></tr>
        </tbody>
      </table>

      <p>
        These performance gains come from the Rust-based scanner that parses your source files for class names. The new scanner is not only faster but also more accurate, reducing false positives and producing smaller CSS output.
      </p>

      <h2>CSS-First Configuration</h2>
      <p>
        The most visible change in Tailwind v4 is the move from JavaScript configuration (<code>tailwind.config.js</code>) to CSS-first configuration. Instead of a separate config file, you configure Tailwind directly in your CSS using the new <code>@theme</code> directive.
      </p>

      <h3>Before (Tailwind v3)</h3>
      <pre><code className="language-javascript">{`// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
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
};`}</code></pre>

      <h3>After (Tailwind v4)</h3>
      <pre><code className="language-css">{`/* app.css */
@import "tailwindcss";

/* CSS-first configuration with @theme */
@theme {
  /* Colors */
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;
  --color-brand-900: #1e3a5f;

  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;

  /* Border radius */
  --radius-4xl: 2rem;

  /* Custom breakpoints */
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;
}

/* Plugins are now CSS imports */
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";`}</code></pre>

      <p>
        The CSS-first approach has several advantages: it works with any build tool without special configuration, it is easier to understand for developers who know CSS, and it enables better IDE support with native CSS autocompletion for your theme values.
      </p>

      <h2>Native CSS Cascade Layers</h2>
      <p>
        Tailwind v4 uses native CSS <code>@layer</code> rules to organize its output. This replaces the previous custom layer system and gives you full control over specificity.
      </p>
      <pre><code className="language-css">{`/* Tailwind v4 output structure */
@layer theme, base, components, utilities;

@layer theme {
  :root {
    --color-brand-500: #3b82f6;
    --font-sans: 'Inter', system-ui, sans-serif;
    /* ... all theme variables */
  }
}

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: var(--font-sans);
  }
}

@layer components {
  /* Your component classes */
}

@layer utilities {
  /* All Tailwind utility classes */
}

/* Custom styles outside @layer always win over layered styles */
.custom-override {
  color: red; /* This beats any utility class */
}`}</code></pre>

      <h2>New Utility Classes</h2>
      <p>
        Tailwind v4 introduces many new utility classes that address common patterns previously requiring custom CSS.
      </p>

      <h3>Container Queries</h3>
      <pre><code className="language-html">{`<!-- Container queries - responsive to parent, not viewport -->
<div class="@container">
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3">
    <div class="@sm:p-4 @md:p-6">
      Responsive to container width
    </div>
  </div>
</div>

<!-- Named containers -->
<div class="@container/sidebar">
  <div class="@md/sidebar:flex-row">
    Responsive to sidebar container
  </div>
</div>`}</code></pre>

      <h3>Field Sizing</h3>
      <pre><code className="language-html">{`<!-- Auto-growing textarea -->
<textarea class="field-sizing-content">
  This textarea grows with its content
</textarea>

<!-- Fixed sizing (default) -->
<textarea class="field-sizing-fixed">
  This textarea has a fixed size
</textarea>`}</code></pre>

      <h3>Color Mix Utilities</h3>
      <pre><code className="language-html">{`<!-- Mix colors with opacity -->
<div class="bg-brand-500/50">50% opacity brand color</div>

<!-- Mix two colors -->
<div class="bg-mix-brand-500-white-20">Brand + 20% white</div>

<!-- Dynamic color mixing with CSS variables -->
<div style="--mix-amount: 30%" class="bg-mix-blue-500-red-500-[--mix-amount]">
  Dynamic color mix
</div>`}</code></pre>

      <h3>Anchor Positioning</h3>
      <pre><code className="language-html">{`<!-- CSS Anchor Positioning (native popover/tooltip positioning) -->
<button class="anchor-[--trigger]" popovertarget="menu">
  Open Menu
</button>

<div id="menu" popover class="
  anchor-target-[--trigger]
  top-anchor-bottom
  left-anchor-left
  m-1
">
  Positioned relative to the button
</div>`}</code></pre>

      <h3>Starting Style</h3>
      <pre><code className="language-html">{`<!-- @starting-style for entry animations -->
<dialog class="
  open:opacity-100
  open:translate-y-0
  starting:opacity-0
  starting:translate-y-4
  transition-all
  duration-300
">
  <p>This dialog animates in from below</p>
</dialog>`}</code></pre>

      <h2>Variant Improvements</h2>
      <p>
        Tailwind v4 improves several existing variants and introduces new ones for better conditional styling.
      </p>

      <h3>New and Improved Variants</h3>
      <pre><code className="language-html">{`<!-- @starting-style variant for entry animations -->
<div class="opacity-100 starting:opacity-0 transition-opacity">
  Fades in on mount
</div>

<!-- not-* variants (inverse of existing variants) -->
<div class="not-hover:opacity-75 hover:opacity-100">
  Dimmed when not hovered
</div>

<input class="not-focus:border-gray-300 focus:border-blue-500" />

<!-- inert variant -->
<div class="inert:opacity-50 inert:pointer-events-none" inert>
  Disabled section
</div>

<!-- nth-child variants -->
<ul>
  <li class="nth-[3n]:bg-gray-100">Every 3rd item</li>
  <li class="nth-last-[2]:font-bold">Second from last</li>
</ul>

<!-- has-* for parent selection based on children -->
<label class="has-[:invalid]:border-red-500 has-[:focus]:border-blue-500">
  <input type="email" required />
</label>

<!-- in-* for selection based on parent state -->
<div class="group">
  <span class="in-[.group:hover]:text-blue-500">
    Blue when parent group is hovered
  </span>
</div>`}</code></pre>

      <h2>Composable Variants</h2>
      <p>
        Tailwind v4 makes it possible to compose variants more naturally, enabling complex conditional styles without custom plugins.
      </p>
      <pre><code className="language-html">{`<!-- Compose multiple conditions -->
<button class="
  bg-blue-500
  hover:bg-blue-600
  active:bg-blue-700
  disabled:bg-gray-300
  disabled:hover:bg-gray-300
  dark:bg-blue-600
  dark:hover:bg-blue-700
  sm:text-lg
  sm:hover:underline
">
  Composable variants
</button>

<!-- Group variants compose naturally -->
<div class="group">
  <button class="group-hover:group-focus:ring-2">
    Ring on group hover AND focus
  </button>
</div>`}</code></pre>

      <h2>Zero-Configuration Content Detection</h2>
      <p>
        Tailwind v4 no longer requires you to configure content paths. The new engine automatically detects your source files by analyzing your project structure and imports.
      </p>
      <pre><code className="language-css">{`/* Tailwind v3: Required content configuration */
/* tailwind.config.js: content: ['./src/**/*.{tsx,jsx}'] */

/* Tailwind v4: Automatic detection - no config needed! */
@import "tailwindcss";

/* If you need to explicitly include/exclude paths: */
@source "./src/**/*.tsx";
@source "./components/**/*.vue";

/* Exclude paths */
@source not "./src/legacy/**";`}</code></pre>

      <h2>Migration from Tailwind v3 to v4</h2>
      <p>
        Migrating from Tailwind v3 to v4 requires changes to your build configuration, CSS imports, and some utility class names. Here is a step-by-step migration guide.
      </p>

      <h3>Step 1: Update Dependencies</h3>
      <pre><code className="language-bash">{`# Remove v3 and related packages
npm uninstall tailwindcss postcss autoprefixer @tailwindcss/typography @tailwindcss/forms

# Install v4
npm install tailwindcss@latest

# Install any v4 plugins you need
npm install @tailwindcss/typography@latest @tailwindcss/forms@latest`}</code></pre>

      <h3>Step 2: Update CSS Imports</h3>
      <pre><code className="language-css">{`/* Before (Tailwind v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (Tailwind v4) */
@import "tailwindcss";`}</code></pre>

      <h3>Step 3: Migrate Configuration</h3>
      <pre><code className="language-css">{`/* Move tailwind.config.js theme values to @theme in your CSS */
@import "tailwindcss";

@theme {
  /* Move your custom colors */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  /* Move custom fonts */
  --font-display: 'Cal Sans', sans-serif;

  /* Move custom spacing */
  --spacing-128: 32rem;

  /* Move custom animations */
  --animate-fade-in: fade-in 0.3s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}`}</code></pre>

      <h3>Step 4: Update Changed Utility Names</h3>
      <table>
        <thead>
          <tr><th>Tailwind v3</th><th>Tailwind v4</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>bg-opacity-50</td><td>bg-black/50</td><td>Opacity modifier syntax</td></tr>
          <tr><td>text-opacity-75</td><td>text-white/75</td><td>Opacity modifier syntax</td></tr>
          <tr><td>decoration-slice</td><td>box-decoration-slice</td><td>Renamed for clarity</td></tr>
          <tr><td>decoration-clone</td><td>box-decoration-clone</td><td>Renamed for clarity</td></tr>
          <tr><td>flex-grow-0</td><td>grow-0</td><td>Shortened</td></tr>
          <tr><td>flex-shrink-0</td><td>shrink-0</td><td>Shortened</td></tr>
          <tr><td>overflow-ellipsis</td><td>text-ellipsis</td><td>Renamed for clarity</td></tr>
          <tr><td>ring (3px default)</td><td>ring-3</td><td>Explicit width required</td></tr>
          <tr><td>shadow (default)</td><td>shadow-sm</td><td>Renamed default shadow</td></tr>
        </tbody>
      </table>

      <h3>Step 5: Run the Automated Migration Tool</h3>
      <pre><code className="language-bash">{`# Tailwind provides an automated upgrade tool
npx @tailwindcss/upgrade

# This will:
# 1. Update your CSS files to use @import "tailwindcss"
# 2. Convert tailwind.config.js to @theme directives
# 3. Rename changed utility classes in your templates
# 4. Update plugin imports

# Always review changes after running the tool
git diff`}</code></pre>

      <h2>Build Tool Integration</h2>
      <p>
        Tailwind v4 simplifies build tool integration significantly. In many cases, no separate PostCSS configuration is needed.
      </p>

      <h3>Vite (Recommended)</h3>
      <pre><code className="language-typescript">{`// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    // No postcss.config.js needed!
  ],
});`}</code></pre>

      <h3>Next.js</h3>
      <pre><code className="language-typescript">{`// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Tailwind v4 works with Next.js out of the box
  // Just import your CSS file in layout.tsx
};

export default config;

// app/layout.tsx
import './globals.css'; // Contains @import "tailwindcss"`}</code></pre>

      <h3>PostCSS (Universal)</h3>
      <pre><code className="language-javascript">{`// postcss.config.js (if not using Vite plugin)
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    // autoprefixer is no longer needed - Tailwind v4 handles it
  },
};`}</code></pre>

      <h2>Dark Mode in v4</h2>
      <p>
        Dark mode works the same way conceptually but benefits from the new CSS variable-based theme system.
      </p>
      <pre><code className="language-css">{`@import "tailwindcss";

@theme {
  /* Light mode colors (default) */
  --color-surface: #ffffff;
  --color-surface-secondary: #f3f4f6;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
}

/* Dark mode overrides using @media or class strategy */
@variant dark (&:where(.dark, .dark *));

@theme dark {
  --color-surface: #111827;
  --color-surface-secondary: #1f2937;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #9ca3af;
  --color-border: #374151;
}`}</code></pre>

      <pre><code className="language-html">{`<!-- Usage is the same as v3 -->
<div class="bg-surface text-text-primary dark:bg-surface dark:text-text-primary">
  <p class="text-text-secondary">
    Colors automatically switch between light and dark mode
  </p>
</div>`}</code></pre>

      <h2>Custom Utilities and Plugins</h2>
      <pre><code className="language-css">{`@import "tailwindcss";

/* Custom utilities using @utility */
@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

@utility text-balance {
  text-wrap: balance;
}

@utility animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

/* Custom variants using @variant */
@variant hocus (&:hover, &:focus);
@variant scrolled (.scrolled &);

/* Usage: */
/* <div class="hocus:text-blue-500 scrolled:shadow-lg"> */`}</code></pre>

      <h2>Practical Examples</h2>

      <h3>Responsive Card Component</h3>
      <pre><code className="language-html">{`<div class="@container">
  <article class="
    flex flex-col @md:flex-row
    gap-4 @lg:gap-6
    p-4 @md:p-6
    bg-surface
    rounded-2xl
    shadow-sm hover:shadow-md
    transition-shadow
    border border-border
  ">
    <img
      src="/image.jpg"
      alt="Article thumbnail"
      class="
        w-full @md:w-48 @lg:w-64
        h-48 @md:h-auto
        object-cover rounded-xl
      "
    />
    <div class="flex flex-col gap-2">
      <h3 class="text-lg @lg:text-xl font-semibold text-text-primary">
        Article Title
      </h3>
      <p class="text-text-secondary text-sm @md:text-base line-clamp-3">
        Article description that gets clamped to three lines
        on smaller containers and expands on larger ones.
      </p>
      <div class="mt-auto pt-4 flex items-center gap-2">
        <span class="text-xs text-text-secondary">5 min read</span>
      </div>
    </div>
  </article>
</div>`}</code></pre>

      <h2>IDE and Tooling Support</h2>
      <p>
        Tailwind v4's CSS-first approach brings significant improvements to IDE support. Because your theme configuration is now native CSS, editors can provide autocompletion for your custom theme values without any special plugins. The official Tailwind CSS IntelliSense extension for VS Code has been updated to understand v4's <code>@theme</code> directives, <code>@utility</code> rules, and new variant syntax, providing real-time class suggestions as you type.
      </p>
      <p>
        The Prettier plugin for Tailwind CSS has also been updated for v4, ensuring consistent class ordering across your codebase. Additionally, ESLint rules for Tailwind have been updated to flag deprecated v3 class names and suggest their v4 equivalents, making the migration process easier for teams adopting incremental upgrades. The combination of CSS-native configuration, improved IntelliSense, and automated formatting means that Tailwind v4 provides a noticeably smoother development experience than previous versions, especially for developers who rely heavily on IDE tooling.
      </p>
      <p>
        For teams using design tokens, Tailwind v4's CSS variable-based theme is particularly powerful. Design tools like Figma can export CSS variables directly, which can be dropped into your <code>@theme</code> block with minimal transformation. This creates a seamless bridge between design and development that was harder to achieve with the JavaScript configuration format of v3.
      </p>

      <h2>Should You Upgrade Now?</h2>
      <ul>
        <li><strong>New projects</strong>: Absolutely use Tailwind v4. The improved DX, performance, and CSS-first configuration are significant wins.</li>
        <li><strong>Active projects (small-medium)</strong>: Migration is straightforward with the automated tool. Plan a half-day to full day for migration and testing.</li>
        <li><strong>Large projects with custom plugins</strong>: Test thoroughly. Custom plugins may need rewriting for the v4 plugin API. Budget a week for migration.</li>
        <li><strong>Legacy projects in maintenance mode</strong>: Stay on v3 unless there is a compelling reason to upgrade. Tailwind v3 will continue to receive security patches.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Tailwind CSS v4 is a major step forward for the framework. The Oxide engine delivers transformative performance improvements, the CSS-first configuration approach is more intuitive and tool-friendly, and the new utility classes address common patterns that previously required custom CSS. The migration path from v3 is well-supported with automated tooling.
      </p>
      <p>
        The shift to CSS-first configuration is perhaps the most significant philosophical change. By making your Tailwind configuration native CSS, your entire styling pipeline becomes more transparent, debuggable, and compatible with the broader CSS ecosystem. Combined with native cascade layers and modern CSS features like container queries and anchor positioning, Tailwind v4 feels less like a framework and more like an accelerated way to write modern CSS.
      </p>
      <p>
        Try out CSS utilities with our <Link href={`/${lang}/tools/css-gradient-generator`}>CSS Gradient Generator</Link>, or explore our <Link href={`/${lang}/blog/css-flexbox-complete-guide`}>CSS Flexbox Complete Guide</Link> for layout fundamentals.
      </p>
    </>
  );
}
