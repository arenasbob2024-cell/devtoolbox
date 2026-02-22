'use client';

import Link from 'next/link';

export default function TailwindCssTips2026({ lang }: { lang: string }) {
  return (
    <>
      <h2>Tailwind CSS Tips and Tricks for 2026</h2>
      <p>
        <strong>Tailwind CSS</strong> has become the dominant utility-first CSS framework, powering
        millions of web applications. With Tailwind v4 now stable and widely adopted, there are many
        powerful patterns and techniques that can dramatically improve your development workflow. This
        guide covers the most impactful tips, tricks, and best practices for 2026 — from advanced
        configuration to component patterns and performance optimization.
      </p>
      <p>
        Whether you are new to Tailwind or have been using it for years, these techniques will help
        you write cleaner, more maintainable utility-first CSS. Check out our{' '}
        <Link href={`/${lang}/blog/tailwind-css-cheat-sheet`}>Tailwind CSS Cheat Sheet</Link> for a
        quick reference of the most common utilities.
      </p>

      <h2>1. Use the @layer Directive Strategically</h2>
      <p>
        The <code>@layer</code> directive lets you inject custom CSS into Tailwind's base, components,
        or utilities layers. Understanding how to use each layer prevents specificity conflicts and
        keeps your CSS organized.
      </p>
      <pre><code className="language-css">{`/* globals.css */

/* Base layer: resets, default HTML element styles */
@layer base {
  h1 { @apply text-3xl font-bold tracking-tight; }
  h2 { @apply text-2xl font-semibold; }
  a { @apply text-blue-600 hover:text-blue-800 underline; }
}

/* Components layer: reusable multi-utility patterns */
@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 px-4 py-2
           bg-blue-600 hover:bg-blue-700 text-white
           font-semibold rounded-lg transition-colors;
  }
  .card {
    @apply bg-white dark:bg-gray-800 rounded-xl shadow-sm
           border border-gray-200 dark:border-gray-700 p-6;
  }
}

/* Utilities layer: single-purpose custom utilities */
@layer utilities {
  .text-balance { text-wrap: balance; }
  .scrollbar-hide {
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}`}</code></pre>

      <h2>2. Arbitrary Values and Properties</h2>
      <p>
        Tailwind's arbitrary value syntax <code>[value]</code> lets you use one-off values without
        leaving the HTML. In v4, arbitrary property support is even more powerful:
      </p>
      <pre><code className="language-html">{`<!-- Arbitrary values for standard utilities -->
<div class="w-[342px] mt-[13px] text-[#1a2b3c]">...</div>

<!-- Arbitrary properties for anything CSS -->
<div class="[content-visibility:auto] [contain:layout]">...</div>

<!-- CSS variables as arbitrary values -->
<div class="bg-[--brand-color] text-[--font-size-lg]">...</div>

<!-- Arbitrary variants for pseudo-classes/elements -->
<div class="[&:nth-child(3)]:opacity-50">...</div>
<div class="[&_p]:mt-4 [&_h2]:text-blue-600">...</div>

<!-- Group modifiers with arbitrary selectors -->
<div class="group">
  <p class="group-[.is-active]:text-green-600">Active state</p>
</div>`}</code></pre>

      <h2>3. Responsive Design Patterns</h2>
      <p>
        Tailwind's mobile-first responsive system is powerful when combined with modern CSS features.
        Always design mobile-first and stack breakpoint modifiers from small to large:
      </p>
      <pre><code className="language-html">{`<!-- Mobile-first responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Cards -->
</div>

<!-- Responsive typography scale -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
  Responsive Heading
</h1>

<!-- Show/hide at breakpoints -->
<nav class="hidden md:flex items-center gap-6">...</nav>
<button class="md:hidden">Menu</button>

<!-- Responsive padding/spacing -->
<section class="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">...</section>

<!-- Container queries (Tailwind v3.3+) -->
<div class="@container">
  <div class="@sm:grid-cols-2 @lg:grid-cols-3 grid grid-cols-1">...</div>
</div>`}</code></pre>

      <h2>4. Dark Mode Mastery</h2>
      <p>
        Tailwind supports class-based and media-query dark mode. Class-based gives you more control
        over when dark mode activates:
      </p>
      <pre><code className="language-javascript">{`// tailwind.config.js (v3) or tailwind.config.ts
export default {
  darkMode: 'class', // or 'media' for system preference
  // darkMode: ['class', '[data-theme="dark"]'] // custom attribute
}

// Toggle dark mode with JavaScript
document.documentElement.classList.toggle('dark');

// Persist preference
const isDark = localStorage.getItem('theme') === 'dark';
document.documentElement.classList.toggle('dark', isDark);`}</code></pre>
      <pre><code className="language-html">{`<!-- Dark mode classes -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p class="text-gray-600 dark:text-gray-400">Secondary text</p>
  <button class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400
                 text-white px-4 py-2 rounded-lg">
    Click me
  </button>
</div>

<!-- Dark mode with opacity modifiers -->
<div class="bg-black/5 dark:bg-white/10 rounded-lg p-4">
  Semi-transparent card
</div>`}</code></pre>

      <h2>5. Component Patterns with CVA</h2>
      <p>
        <strong>Class Variance Authority (CVA)</strong> is the most popular library for building
        type-safe Tailwind component variants. It eliminates string concatenation bugs:
      </p>
      <pre><code className="language-typescript">{`import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  // Base classes applied always
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
        outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
        ghost: 'hover:bg-gray-100 text-gray-700',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-5 py-2.5',
        xl: 'text-base px-6 py-3',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    isLoading?: boolean;
  };

export function Button({ variant, size, fullWidth, isLoading, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(button({ variant, size, fullWidth }), className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner className="w-4 h-4" /> : null}
      {children}
    </button>
  );
}

// Usage
<Button variant="outline" size="lg">Click Me</Button>
<Button variant="danger" fullWidth>Delete Account</Button>`}</code></pre>

      <h2>6. The cn() Utility Function</h2>
      <p>
        The <code>cn()</code> function (combining <code>clsx</code> and <code>tailwind-merge</code>)
        is essential for any Tailwind project. It merges class names safely, resolving Tailwind
        conflicts:
      </p>
      <pre><code className="language-typescript">{`// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Without cn: conflicting classes don't resolve correctly
const bad = 'p-4 p-6'; // both classes applied, last wins in CSS order (fragile)

// With cn: tailwind-merge resolves conflicts deterministically
cn('p-4', 'p-6'); // → 'p-6' (correct!)
cn('text-red-500', 'text-blue-500'); // → 'text-blue-500'
cn('bg-red-500 text-white', { 'opacity-50': isDisabled }); // conditional

// Real-world usage in components
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white shadow-sm p-6',
        'dark:bg-gray-800 dark:border-gray-700',
        className // allows callers to override/extend
      )}
      {...props}
    />
  );
}`}</code></pre>

      <h2>7. Performance: PurgeCSS and Production Builds</h2>
      <p>
        Tailwind automatically removes unused styles in production using content scanning. Make sure
        your config covers all template files:
      </p>
      <pre><code className="language-javascript">{`// tailwind.config.ts (v3)
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    // Don't forget external component libraries
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}

// tailwind.css (v4 - no config file needed)
@import "tailwindcss";
@source "../components/**/*.tsx";
@source "../app/**/*.{ts,tsx}";`}</code></pre>
      <p>
        For dynamic class names that can't be statically analyzed, use the{' '}
        <code>safelist</code> option or ensure full class strings appear in your code (not
        concatenated):
      </p>
      <pre><code className="language-javascript">{`// BAD: Tailwind can't detect this
const color = 'red';
<div className={\`text-\${color}-500\`} />

// GOOD: Full class name present in source
const colorMap = { red: 'text-red-500', blue: 'text-blue-500' };
<div className={colorMap[color]} />

// GOOD: Safelist with patterns
export default {
  safelist: [
    { pattern: /^(text|bg|border)-(red|blue|green)-(400|500|600)$/ },
  ],
}`}</code></pre>

      <h2>8. Tailwind v4 Migration Highlights</h2>
      <p>
        Tailwind v4 introduces significant changes. Here are the most important things to know when
        migrating from v3:
      </p>
      <pre><code className="language-css">{`/* v4: Configuration moved to CSS, no JS config needed */
@import "tailwindcss";

/* Custom theme variables */
@theme {
  --color-brand: oklch(55% 0.2 260);
  --font-display: 'Inter', sans-serif;
  --radius-xl: 1.5rem;
  --spacing-18: 4.5rem;
}

/* Override default theme tokens */
@theme {
  --color-blue-500: oklch(60% 0.22 256); /* customize Tailwind's blue */
}

/* Plugins now use CSS */
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";

/* v4: New utilities */
/* starting-style: for enter animations */
/* field-sizing: for auto-resizing textareas */
/* color-mix() support for opacity */`}</code></pre>

      <h2>9. Animation and Transition Patterns</h2>
      <p>
        Tailwind has excellent built-in transition and animation utilities, but combining them with
        CSS custom properties unlocks more advanced effects:
      </p>
      <pre><code className="language-html">{`<!-- Smooth fade in/out with transition -->
<div class="transition-all duration-300 ease-in-out
            opacity-0 translate-y-4
            data-[visible]:opacity-100 data-[visible]:translate-y-0">
  Animated content
</div>

<!-- Hover effects -->
<button class="transform hover:scale-105 active:scale-95
               transition-transform duration-150">
  Press me
</button>

<!-- Skeleton loading animation -->
<div class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-4 w-3/4"></div>

<!-- Spin animation -->
<svg class="animate-spin h-5 w-5 text-blue-600" .../>

<!-- Custom keyframe animation with arbitrary values -->
<div class="animate-[wiggle_1s_ease-in-out_infinite]">...</div>`}</code></pre>
      <pre><code className="language-css">{`/* Define custom keyframes in CSS */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* Or extend theme (v3) */
/* tailwind.config.ts */
theme: {
  extend: {
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
  },
}`}</code></pre>

      <h2>10. Form Styling Tips</h2>
      <p>
        Styling forms with Tailwind requires some extra care. The{' '}
        <code>@tailwindcss/forms</code> plugin provides sensible defaults:
      </p>
      <pre><code className="language-html">{`<!-- Modern input styling -->
<input
  type="text"
  class="w-full px-3 py-2 rounded-lg border border-gray-300
         dark:border-gray-600 bg-white dark:bg-gray-800
         text-gray-900 dark:text-gray-100
         placeholder:text-gray-400
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
         disabled:opacity-50 disabled:cursor-not-allowed
         transition-colors"
  placeholder="Enter value..."
/>

<!-- Select with custom styling -->
<select class="appearance-none w-full px-3 py-2 pr-10 rounded-lg
               border border-gray-300 bg-white text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500
               bg-[url('/chevron.svg')] bg-no-repeat bg-right-3">
  <option>Option 1</option>
</select>

<!-- Checkbox styling -->
<label class="flex items-center gap-3 cursor-pointer group">
  <input type="checkbox"
    class="w-4 h-4 rounded border-gray-300 text-blue-600
           focus:ring-blue-500 cursor-pointer" />
  <span class="text-sm text-gray-700 dark:text-gray-300
               group-hover:text-gray-900 dark:group-hover:text-gray-100">
    Agree to terms
  </span>
</label>`}</code></pre>

      <h2>11. Grid and Layout Patterns</h2>
      <p>
        CSS Grid combined with Tailwind utilities enables sophisticated layouts with minimal code:
      </p>
      <pre><code className="language-html">{`<!-- Auto-fill responsive grid (no media queries needed) -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
  <!-- Cards auto-wrap to fit -->
</div>

<!-- Dashboard layout with named areas -->
<div class="grid grid-cols-[250px_1fr] grid-rows-[64px_1fr] min-h-screen">
  <header class="col-span-2 bg-white border-b flex items-center px-6">Header</header>
  <nav class="bg-gray-50 border-r overflow-y-auto">Sidebar</nav>
  <main class="overflow-y-auto p-6">Content</main>
</div>

<!-- Holy grail layout -->
<div class="flex flex-col min-h-screen">
  <header class="h-16 border-b">Header</header>
  <div class="flex flex-1">
    <aside class="w-64 border-r shrink-0">Sidebar</aside>
    <main class="flex-1 p-8">Content</main>
    <aside class="w-48 border-l shrink-0">Right rail</aside>
  </div>
  <footer class="h-16 border-t">Footer</footer>
</div>`}</code></pre>

      <h2>12. Useful Plugins and Ecosystem</h2>
      <p>
        The Tailwind ecosystem has excellent official plugins and popular community libraries:
      </p>
      <pre><code className="language-bash">{`# Official plugins
npm install @tailwindcss/typography   # Prose formatting
npm install @tailwindcss/forms        # Form element resets
npm install @tailwindcss/aspect-ratio # aspect-ratio utilities (built-in v3.3+)
npm install @tailwindcss/container-queries # @sm: @lg: etc.

# Popular component libraries
npm install @headlessui/react         # Unstyled accessible components
npm install @radix-ui/react-dialog    # Radix UI primitives
npm install shadcn-ui                 # Copy-paste component system
npm install class-variance-authority  # Type-safe variants
npm install tailwind-merge            # Merge classes without conflicts
npm install clsx                      # Conditional class names`}</code></pre>

      <h2>Quick Reference: Most Useful Utilities</h2>
      <pre><code className="language-text">{`Layout & Spacing
  flex items-center justify-between gap-4
  grid grid-cols-3 col-span-2
  p-4 px-6 py-3 pt-2 pb-8
  m-auto mx-4 -mt-2

Sizing
  w-full max-w-lg h-screen min-h-[200px]
  w-1/2 w-[342px] aspect-video

Typography
  text-sm/6 font-semibold tracking-tight
  text-gray-900 dark:text-gray-100 line-clamp-2

Borders & Shadows
  rounded-xl border border-gray-200
  shadow-sm shadow-lg ring-1 ring-black/5

Transitions
  transition-all duration-200 ease-in-out
  hover:scale-105 active:scale-95

Interactivity
  cursor-pointer select-none pointer-events-none
  focus:outline-none focus-visible:ring-2`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I use Tailwind v3 or v4 in 2026?</h3>
      <p>
        For new projects, use Tailwind v4. It is faster, has zero-config setup, and supports modern
        CSS features like <code>oklch()</code> colors and <code>@layer</code> cascade. For existing
        v3 projects, migration is straightforward but optional — v3 is still actively maintained.
      </p>

      <h3>How do I avoid long class strings in HTML?</h3>
      <p>
        Use the <code>@layer components</code> directive for repeated patterns, CVA for component
        variants, and template-level extraction in your framework (React components, Vue SFCs). Avoid
        premature extraction — duplicated utility groups in HTML is fine and expected.
      </p>

      <h3>Is Tailwind good for large teams?</h3>
      <p>
        Yes. Tailwind enforces consistency through a shared design system (spacing scale, colors,
        typography) while still allowing flexibility. Pair it with a component library like shadcn/ui
        or your own design system for best results in large codebases.
      </p>

      <h3>How does Tailwind compare to CSS Modules?</h3>
      <p>
        See our <Link href={`/${lang}/blog/tailwind-vs-css-modules`}>Tailwind vs CSS Modules</Link>{' '}
        guide for a detailed comparison. In short: Tailwind is faster to write and more consistent,
        CSS Modules give you more scoping isolation and are closer to vanilla CSS.
      </p>

      <p>
        Ready to apply these techniques? Try our{' '}
        <Link href={`/${lang}/tools/css-gradient-generator`}>CSS Gradient Generator</Link> to create
        beautiful gradients for your Tailwind projects, or use the{' '}
        <Link href={`/${lang}/tools/color-picker`}>Color Picker</Link> to find the perfect palette.
      </p>
    </>
  );
}
