'use client';

import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr: 'Tailwind CSS replaces hand-written CSS with composable utility classes, cutting stylesheet bloat and speeding up UI development. Common conversions: display: flex becomes flex, padding: 16px becomes p-4, and media queries become responsive prefixes like md: and lg:. For complex or legacy projects, migrate incrementally component by component. Use arbitrary values like p-[13px] when the default scale does not fit. Our free CSS to Tailwind converter automates the mapping so you can focus on building.',
    takeaway1: 'Tailwind is a utility-first CSS framework that replaces custom class names with pre-built, composable utilities.',
    takeaway2: 'The spacing scale uses a 4px base: p-1 = 4px, p-2 = 8px, p-4 = 16px, m-8 = 32px.',
    takeaway3: 'Responsive design uses mobile-first breakpoint prefixes: sm:, md:, lg:, xl:, 2xl: instead of @media queries.',
    takeaway4: 'Arbitrary values in square brackets like w-[calc(100%-2rem)] handle any value outside the default scale.',
    takeaway5: 'Dark mode is built in: prefix any utility with dark: and configure darkMode in tailwind.config.js.',
    takeaway6: 'Tailwind purges unused classes in production, resulting in CSS bundles under 10 KB for most projects.',
    takeaway7: 'Gradual migration is safer than a full rewrite: convert one component at a time and keep both systems running.',
    takeaway8: 'Tailwind is not ideal for every project: highly dynamic styles, third-party widget overrides, and email templates may be better served by traditional CSS.',

    h2_what: 'What Is Tailwind CSS and Why Should You Migrate?',
    what_p1: '<strong>Tailwind CSS</strong> is a utility-first CSS framework that provides low-level utility classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code>, and <code>rotate-90</code> directly in your HTML. Instead of writing custom CSS classes like <code>.card-header-title</code>, you compose styles from a set of constrained, single-purpose utilities.',
    what_p2: 'Traditional CSS tends to grow unbounded over time. Every new feature adds new classes, specificity battles emerge, dead CSS accumulates, and refactoring becomes risky because you cannot tell which styles are still used. Tailwind solves these problems by co-locating styles with markup and automatically purging unused utilities in production.',
    what_p3: 'Key benefits of migrating to Tailwind include: <strong>no naming fatigue</strong> (stop inventing names like <code>.sidebar-nav-item-active</code>), <strong>consistent design tokens</strong> (spacing, colors, and typography are constrained by the config), <strong>tiny production bundles</strong> (typically under 10 KB gzipped), <strong>rapid prototyping</strong> (style directly in HTML without switching files), and <strong>easy responsive design</strong> (breakpoint prefixes instead of media query blocks).',

    h2_mapping: 'CSS Property to Tailwind Class Mapping',
    mapping_p1: 'The core of any CSS-to-Tailwind conversion is understanding how CSS properties map to utility classes. Here are the most common conversions you will encounter:',
    mapping_p2: 'For display properties: <code>display: flex</code> becomes <code>flex</code>, <code>display: grid</code> becomes <code>grid</code>, <code>display: block</code> becomes <code>block</code>, <code>display: inline-block</code> becomes <code>inline-block</code>, <code>display: none</code> becomes <code>hidden</code>, and <code>display: inline-flex</code> becomes <code>inline-flex</code>.',
    mapping_p3: 'For positioning: <code>position: relative</code> becomes <code>relative</code>, <code>position: absolute</code> becomes <code>absolute</code>, <code>position: fixed</code> becomes <code>fixed</code>, <code>position: sticky</code> becomes <code>sticky</code>. Top, right, bottom, left values use <code>top-0</code>, <code>right-4</code>, <code>bottom-auto</code>, <code>left-1/2</code>.',
    mapping_p4: 'For sizing: <code>width: 100%</code> becomes <code>w-full</code>, <code>height: 100vh</code> becomes <code>h-screen</code>, <code>max-width: 640px</code> becomes <code>max-w-xl</code>, <code>min-height: 100%</code> becomes <code>min-h-full</code>.',
    mapping_p5: 'For box model: <code>padding: 16px</code> becomes <code>p-4</code>, <code>margin: 0 auto</code> becomes <code>mx-auto</code>, <code>border-radius: 8px</code> becomes <code>rounded-lg</code>, <code>box-shadow: 0 1px 3px rgba(0,0,0,0.1)</code> becomes <code>shadow-sm</code>.',
    mapping_p6: 'For text: <code>font-size: 14px</code> becomes <code>text-sm</code>, <code>font-weight: 700</code> becomes <code>font-bold</code>, <code>text-align: center</code> becomes <code>text-center</code>, <code>line-height: 1.5</code> becomes <code>leading-normal</code>, <code>letter-spacing: 0.05em</code> becomes <code>tracking-wide</code>.',

    h2_responsive: 'Responsive Design: Media Queries vs Tailwind Breakpoints',
    responsive_p1: 'One of Tailwind\'s most compelling features is how it handles responsive design. Instead of writing <code>@media (min-width: 768px) { ... }</code> blocks, you prefix any utility with a breakpoint modifier.',
    responsive_p2: 'Tailwind uses a <strong>mobile-first</strong> approach. Unprefixed utilities apply to all screen sizes. Breakpoint prefixes apply at that width <em>and above</em>. The default breakpoints are: <code>sm</code> (640px), <code>md</code> (768px), <code>lg</code> (1024px), <code>xl</code> (1280px), <code>2xl</code> (1536px).',
    responsive_p3: 'This means <code>text-sm md:text-base lg:text-lg</code> starts small on mobile, increases at the md breakpoint, and increases again at lg. You can customize these breakpoints in <code>tailwind.config.js</code> under the <code>screens</code> key.',

    h2_flexgrid: 'Flexbox and Grid: CSS vs Tailwind',
    flexgrid_p1: 'Flexbox and Grid layouts are where Tailwind truly shines, replacing multi-line CSS blocks with a handful of utility classes.',
    flexgrid_p2: 'For <strong>Flexbox</strong>: <code>flex-direction: row</code> becomes <code>flex-row</code>, <code>flex-direction: column</code> becomes <code>flex-col</code>, <code>justify-content: center</code> becomes <code>justify-center</code>, <code>align-items: center</code> becomes <code>items-center</code>, <code>flex-wrap: wrap</code> becomes <code>flex-wrap</code>, <code>gap: 16px</code> becomes <code>gap-4</code>.',
    flexgrid_p3: 'For <strong>CSS Grid</strong>: <code>grid-template-columns: repeat(3, 1fr)</code> becomes <code>grid-cols-3</code>, <code>grid-template-rows: auto 1fr auto</code> becomes <code>grid-rows-[auto_1fr_auto]</code>, <code>grid-column: span 2</code> becomes <code>col-span-2</code>, <code>gap: 24px</code> becomes <code>gap-6</code>.',
    flexgrid_p4: 'Complex layout patterns like a responsive card grid only need one line: <code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6</code>. In traditional CSS, this requires a media query block for each breakpoint.',

    h2_colors: 'Colors, Spacing, and Typography in Tailwind',
    colors_p1: '<strong>Spacing</strong> in Tailwind follows a 4px base unit scale. <code>p-1</code> equals 4px, <code>p-2</code> equals 8px, <code>p-4</code> equals 16px, <code>p-8</code> equals 32px, and so on. The same scale applies to margin (<code>m-</code>), gap (<code>gap-</code>), width (<code>w-</code>), and height (<code>h-</code>). Negative values use a dash prefix: <code>-mt-4</code> for <code>margin-top: -16px</code>.',
    colors_p2: '<strong>Colors</strong> use a shade-based naming convention: <code>text-blue-500</code>, <code>bg-gray-100</code>, <code>border-red-600</code>. Shades range from 50 (lightest) to 950 (darkest). Opacity modifiers work inline: <code>bg-black/50</code> for 50% opacity, <code>text-white/80</code> for 80% opacity.',
    colors_p3: '<strong>Typography</strong> classes cover font size (<code>text-xs</code> through <code>text-9xl</code>), font weight (<code>font-thin</code> through <code>font-black</code>), line height (<code>leading-none</code> through <code>leading-loose</code>), letter spacing (<code>tracking-tighter</code> through <code>tracking-widest</code>), and font family (<code>font-sans</code>, <code>font-serif</code>, <code>font-mono</code>).',

    h2_arbitrary: 'Custom Values with Arbitrary Value Syntax [...]',
    arbitrary_p1: 'Tailwind\'s design system covers most common values, but real projects often need exact pixel values, specific colors, or unusual calculations. The <strong>arbitrary value</strong> syntax handles these cases by wrapping any CSS value in square brackets.',
    arbitrary_p2: 'Examples: <code>w-[calc(100%-2rem)]</code> for calculated widths, <code>p-[13px]</code> for non-standard padding, <code>text-[#1a73e8]</code> for custom hex colors, <code>bg-[rgb(255,100,50)]</code> for RGB colors, <code>grid-cols-[200px_1fr_200px]</code> for custom grid columns (underscores replace spaces), <code>top-[var(--header-height)]</code> for CSS custom properties.',
    arbitrary_p3: 'You can also use arbitrary properties for CSS properties that Tailwind does not have utilities for: <code>[clip-path:circle(50%)]</code>, <code>[writing-mode:vertical-rl]</code>. This escape hatch means you never need to fall back to a separate stylesheet for one-off styles.',

    h2_config: 'Tailwind Config: Extending vs Overriding',
    config_p1: 'The <code>tailwind.config.js</code> file controls your design system. Understanding the difference between <code>extend</code> and direct configuration is crucial.',
    config_p2: 'When you add values under <code>theme.extend</code>, they are <strong>merged</strong> with the default theme. Your custom values are added alongside the defaults. When you add values directly under <code>theme</code> (not inside extend), the defaults for that category are <strong>completely replaced</strong>.',
    config_p3: 'For example, adding a custom color under <code>theme.extend.colors</code> keeps all default colors and adds yours. Adding colors directly under <code>theme.colors</code> removes all default colors and uses only yours. In most cases, you want to use <code>extend</code> to add to the defaults rather than replace them.',

    h2_dark: 'Dark Mode: CSS Media Queries vs Tailwind dark:',
    dark_p1: 'Tailwind provides a built-in dark mode system using the <code>dark:</code> prefix. Any utility can be conditionally applied in dark mode: <code>bg-white dark:bg-gray-900</code>, <code>text-gray-900 dark:text-gray-100</code>.',
    dark_p2: 'Tailwind supports two dark mode strategies. The <code>media</code> strategy uses the operating system\'s <code>prefers-color-scheme</code> preference automatically. The <code>class</code> strategy (also called <code>selector</code> in Tailwind v4) toggles dark mode based on a <code>.dark</code> class on a parent element, giving you manual control with JavaScript.',
    dark_p3: 'In traditional CSS, implementing dark mode requires duplicating nearly every color declaration inside a <code>@media (prefers-color-scheme: dark)</code> block or managing CSS custom properties. With Tailwind, you declare both modes inline: <code>bg-white dark:bg-slate-800 text-black dark:text-white</code>. No separate stylesheet, no specificity issues.',

    h2_animations: 'Animations and Transitions in Tailwind',
    anim_p1: 'Tailwind includes utility classes for common CSS transitions and animations, reducing the need for custom keyframe definitions.',
    anim_p2: 'For <strong>transitions</strong>: <code>transition</code> enables transitions on common properties (color, background, border, shadow, transform, opacity). <code>transition-colors</code>, <code>transition-opacity</code>, <code>transition-transform</code> target specific properties. Duration uses <code>duration-150</code>, <code>duration-300</code>, <code>duration-500</code> (in milliseconds). Easing uses <code>ease-in</code>, <code>ease-out</code>, <code>ease-in-out</code>, <code>ease-linear</code>. Delay uses <code>delay-100</code>, <code>delay-200</code>, etc.',
    anim_p3: 'For <strong>transforms</strong>: <code>scale-95</code>, <code>rotate-45</code>, <code>translate-x-4</code>, <code>skew-y-3</code> apply transforms directly. Combine with <code>hover:</code> for interactive effects: <code>hover:scale-105 transition-transform duration-200</code>.',
    anim_p4: 'For <strong>animations</strong>: Tailwind ships with <code>animate-spin</code>, <code>animate-ping</code>, <code>animate-pulse</code>, and <code>animate-bounce</code>. For custom keyframe animations, define them in <code>tailwind.config.js</code> under <code>theme.extend.keyframes</code> and <code>theme.extend.animation</code>, then use them as <code>animate-[yourName]</code>.',

    h2_not: 'When NOT to Use Tailwind',
    not_p1: 'Tailwind is powerful, but it is not the right choice for every situation. Recognizing when traditional CSS is better saves time and frustration.',
    not_list: '<ul><li><strong>Complex multi-step animations</strong> \u2014 Intricate <code>@keyframes</code> sequences with many steps are cleaner in a CSS file than as config entries.</li><li><strong>Highly dynamic styles</strong> \u2014 When style values come from JavaScript variables at runtime (e.g., user-chosen colors, drag positions), inline styles or CSS custom properties are simpler than constructing class names dynamically.</li><li><strong>Third-party component libraries</strong> \u2014 Overriding styles in Material UI, Ant Design, or other component libraries often requires targeting internal class names with traditional CSS selectors.</li><li><strong>Email HTML templates</strong> \u2014 Email clients have severely limited CSS support. Inline styles are required, and Tailwind\'s utility approach does not map well to email constraints.</li><li><strong>Very large legacy codebases</strong> \u2014 A big-bang migration is risky. Convert incrementally, component by component.</li><li><strong>Teams unfamiliar with Tailwind</strong> \u2014 The learning curve is real. A team that writes clean BEM CSS may not benefit from switching to Tailwind if the project is near completion.</li></ul>',

    h2_migration: 'Migration Strategies: Gradual vs Full Rewrite',
    migration_p1: 'There are two main approaches to migrating an existing project from CSS to Tailwind: gradual migration and full rewrite.',
    migration_p2: '<strong>Gradual migration</strong> (recommended for most projects): Install Tailwind alongside your existing CSS. Configure Tailwind to scan only the files you are actively converting. Migrate one component at a time, starting with the simplest leaf components. Once a component is fully converted, remove its old CSS. This approach is safe because both systems coexist, you can ship incrementally, and you can stop at any point.',
    migration_p3: '<strong>Full rewrite</strong> (suitable for small projects or complete redesigns): Replace all CSS files at once. This is faster for small projects but risky for large ones because you cannot ship partially. It works best when combined with a visual redesign, so you are rebuilding the UI anyway.',
    migration_p4: 'Regardless of approach, use automated tools to speed up the mechanical translation. Our CSS to Tailwind converter handles the property-to-utility mapping, letting you focus on component structure and responsive behavior.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the fastest way to convert CSS to Tailwind classes?',
    faq1_a: 'Use an automated converter tool that maps CSS properties to their Tailwind equivalents. Paste your CSS, get the Tailwind classes instantly. For large projects, combine automated conversion with manual review to handle edge cases like complex selectors and pseudo-elements.',
    faq2_q: 'Does Tailwind increase HTML file size?',
    faq2_a: 'Yes, HTML files are slightly larger because class attributes contain more text. However, CSS bundle size decreases dramatically because Tailwind purges unused utilities in production. The net result is typically a smaller total transfer size because CSS compression is less efficient than HTML compression with gzip or Brotli.',
    faq3_q: 'Can I use Tailwind with CSS Modules or Styled Components?',
    faq3_a: 'Yes. Tailwind works alongside CSS Modules, Styled Components, Emotion, and other CSS-in-JS solutions. You can use Tailwind for layout and utility styles while using CSS Modules for complex component-specific styles. The @apply directive lets you extract Tailwind utilities into CSS classes if needed.',
    faq4_q: 'How do I handle hover, focus, and other pseudo-classes in Tailwind?',
    faq4_a: 'Tailwind uses state modifiers as prefixes: hover:bg-blue-600, focus:ring-2, active:scale-95, disabled:opacity-50, group-hover:text-white, first:mt-0, odd:bg-gray-50. These replace CSS pseudo-class selectors and work with any utility class.',
    faq5_q: 'What is the Tailwind spacing scale and how does it work?',
    faq5_a: 'Tailwind uses a 4px base unit for spacing. The scale goes: 0 (0px), px (1px), 0.5 (2px), 1 (4px), 1.5 (6px), 2 (8px), 2.5 (10px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px). Use arbitrary values like p-[13px] for non-standard spacing.',
    faq6_q: 'How does Tailwind handle responsive images and aspect ratios?',
    faq6_a: 'Tailwind provides aspect-auto, aspect-square, and aspect-video utilities. For responsive images, combine w-full with h-auto. For object-fit behavior, use object-cover, object-contain, object-fill. The aspect-ratio plugin (now built-in since v3.0) handles custom ratios like aspect-[4/3].',
    faq7_q: 'Should I use @apply to extract repeated utility patterns?',
    faq7_a: 'Use @apply sparingly. The Tailwind team recommends using component abstractions (React components, Vue components, partials) to avoid repetition rather than @apply. Reserve @apply for cases where you cannot use a component, such as styling third-party HTML or CMS content. Overusing @apply defeats the purpose of utility-first CSS.',
    faq8_q: 'How do I migrate CSS custom properties (variables) to Tailwind?',
    faq8_a: 'You can reference CSS custom properties directly in Tailwind using arbitrary values: bg-[var(--brand-color)], text-[var(--heading-size)]. Alternatively, map your custom properties to Tailwind theme values in tailwind.config.js. Tailwind v4 natively uses CSS custom properties for its design tokens, making integration seamless.',

    conclusion: 'Migrating from CSS to Tailwind is a strategic investment that pays off with smaller bundles, faster development, and consistent design. Start with an automated converter for the mechanical translation, then refine component by component. For new components, write Tailwind from scratch. For legacy code, migrate gradually. The result is a codebase where styles are co-located with markup, dead CSS is eliminated automatically, and responsive design is expressed inline rather than in separate media query blocks.',
    linkToolBottom: 'Convert your CSS to Tailwind classes instantly with our free tool.',
  },
  zh: {
    tldr: 'Tailwind CSS \u7528\u53ef\u7ec4\u5408\u7684\u5de5\u5177\u7c7b\u66ff\u4ee3\u624b\u5199 CSS\uff0c\u51cf\u5c11\u6837\u5f0f\u8868\u81a8\u80c0\u5e76\u52a0\u901f UI \u5f00\u53d1\u3002\u5e38\u89c1\u8f6c\u6362\uff1adisplay: flex \u53d8\u4e3a flex\uff0cpadding: 16px \u53d8\u4e3a p-4\uff0c\u5a92\u4f53\u67e5\u8be2\u53d8\u4e3a\u54cd\u5e94\u5f0f\u524d\u7f00\u5982 md: \u548c lg:\u3002\u5bf9\u4e8e\u590d\u6742\u6216\u9057\u7559\u9879\u76ee\uff0c\u5efa\u8bae\u9010\u7ec4\u4ef6\u589e\u91cf\u8fc1\u79fb\u3002\u9ed8\u8ba4\u523b\u5ea6\u4e0d\u9002\u7528\u65f6\u53ef\u7528\u4efb\u610f\u503c\u5982 p-[13px]\u3002\u6211\u4eec\u7684\u514d\u8d39 CSS \u8f6c Tailwind \u8f6c\u6362\u5668\u53ef\u81ea\u52a8\u5b8c\u6210\u6620\u5c04\u3002',
    takeaway1: 'Tailwind \u662f\u4e00\u4e2a\u5b9e\u7528\u4f18\u5148\u7684 CSS \u6846\u67b6\uff0c\u7528\u9884\u5efa\u7684\u53ef\u7ec4\u5408\u5de5\u5177\u7c7b\u66ff\u4ee3\u81ea\u5b9a\u4e49\u7c7b\u540d\u3002',
    takeaway2: '\u95f4\u8ddd\u523b\u5ea6\u4f7f\u7528 4px \u57fa\u7840\u5355\u4f4d\uff1ap-1 = 4px\uff0cp-2 = 8px\uff0cp-4 = 16px\uff0cm-8 = 32px\u3002',
    takeaway3: '\u54cd\u5e94\u5f0f\u8bbe\u8ba1\u4f7f\u7528\u79fb\u52a8\u4f18\u5148\u65ad\u70b9\u524d\u7f00\uff1asm:\u3001md:\u3001lg:\u3001xl:\u30012xl:\uff0c\u66ff\u4ee3 @media \u67e5\u8be2\u3002',
    takeaway4: '\u65b9\u62ec\u53f7\u5185\u7684\u4efb\u610f\u503c\u5982 w-[calc(100%-2rem)] \u53ef\u5904\u7406\u9ed8\u8ba4\u523b\u5ea6\u4e4b\u5916\u7684\u4efb\u4f55\u503c\u3002',
    takeaway5: '\u6df1\u8272\u6a21\u5f0f\u5185\u7f6e\uff1a\u4efb\u4f55\u5de5\u5177\u7c7b\u52a0 dark: \u524d\u7f00\uff0c\u5e76\u5728 tailwind.config.js \u4e2d\u914d\u7f6e darkMode\u3002',
    takeaway6: 'Tailwind \u5728\u751f\u4ea7\u73af\u5883\u6e05\u9664\u672a\u4f7f\u7528\u7684\u7c7b\uff0c\u5927\u591a\u6570\u9879\u76ee\u7684 CSS \u5305\u4f53\u79ef\u4e0d\u8d85\u8fc7 10 KB\u3002',
    takeaway7: '\u6e10\u8fdb\u5f0f\u8fc1\u79fb\u6bd4\u5b8c\u5168\u91cd\u5199\u66f4\u5b89\u5168\uff1a\u9010\u4e2a\u7ec4\u4ef6\u8f6c\u6362\uff0c\u4fdd\u6301\u4e24\u4e2a\u7cfb\u7edf\u5e76\u884c\u8fd0\u884c\u3002',
    takeaway8: 'Tailwind \u5e76\u975e\u9002\u5408\u6240\u6709\u9879\u76ee\uff1a\u9ad8\u5ea6\u52a8\u6001\u7684\u6837\u5f0f\u3001\u7b2c\u4e09\u65b9\u7ec4\u4ef6\u8986\u76d6\u548c\u90ae\u4ef6\u6a21\u677f\u53ef\u80fd\u66f4\u9002\u5408\u4f20\u7edf CSS\u3002',

    h2_what: '\u4ec0\u4e48\u662f Tailwind CSS\uff1f\u4e3a\u4ec0\u4e48\u8981\u8fc1\u79fb\uff1f',
    what_p1: '<strong>Tailwind CSS</strong> \u662f\u4e00\u4e2a\u5b9e\u7528\u4f18\u5148\u7684 CSS \u6846\u67b6\uff0c\u63d0\u4f9b\u4e86\u4f4e\u7ea7\u522b\u7684\u5de5\u5177\u7c7b\uff0c\u5982 <code>flex</code>\u3001<code>pt-4</code>\u3001<code>text-center</code> \u548c <code>rotate-90</code>\uff0c\u76f4\u63a5\u5728 HTML \u4e2d\u4f7f\u7528\u3002\u65e0\u9700\u7f16\u5199\u81ea\u5b9a\u4e49\u7684 CSS \u7c7b\u540d\uff0c\u800c\u662f\u4ece\u4e00\u7ec4\u7ea6\u675f\u7684\u3001\u5355\u4e00\u7528\u9014\u7684\u5de5\u5177\u7c7b\u4e2d\u7ec4\u5408\u6837\u5f0f\u3002',
    what_p2: '\u4f20\u7edf CSS \u5f80\u5f80\u968f\u65f6\u95f4\u65e0\u9650\u589e\u957f\u3002\u6bcf\u4e2a\u65b0\u529f\u80fd\u90fd\u6dfb\u52a0\u65b0\u7c7b\uff0c\u51fa\u73b0\u4f18\u5148\u7ea7\u51b2\u7a81\uff0c\u6b7b\u4ee3\u7801\u4e0d\u65ad\u79ef\u7d2f\uff0c\u91cd\u6784\u53d8\u5f97\u5371\u9669\u3002Tailwind \u901a\u8fc7\u5c06\u6837\u5f0f\u4e0e\u6807\u8bb0\u5171\u7f6e\uff0c\u5e76\u5728\u751f\u4ea7\u73af\u5883\u4e2d\u81ea\u52a8\u6e05\u9664\u672a\u4f7f\u7528\u7684\u5de5\u5177\u7c7b\u6765\u89e3\u51b3\u8fd9\u4e9b\u95ee\u9898\u3002',
    what_p3: '\u8fc1\u79fb\u5230 Tailwind \u7684\u4e3b\u8981\u4f18\u52bf\u5305\u62ec\uff1a<strong>\u544a\u522b\u547d\u540d\u75b2\u52b3</strong>\uff08\u4e0d\u518d\u53d1\u660e\u50cf <code>.sidebar-nav-item-active</code> \u8fd9\u6837\u7684\u540d\u79f0\uff09\u3001<strong>\u4e00\u81f4\u7684\u8bbe\u8ba1\u4ee4\u724c</strong>\uff08\u95f4\u8ddd\u3001\u989c\u8272\u548c\u5b57\u4f53\u53d7\u914d\u7f6e\u7ea6\u675f\uff09\u3001<strong>\u5fae\u5c0f\u7684\u751f\u4ea7\u5305</strong>\uff08gzip \u540e\u901a\u5e38\u4e0d\u8d85\u8fc7 10 KB\uff09\u3001<strong>\u5feb\u901f\u539f\u578b\u5f00\u53d1</strong>\uff08\u76f4\u63a5\u5728 HTML \u4e2d\u6dfb\u52a0\u6837\u5f0f\uff09\u4ee5\u53ca<strong>\u8f7b\u677e\u7684\u54cd\u5e94\u5f0f\u8bbe\u8ba1</strong>\uff08\u65ad\u70b9\u524d\u7f00\u800c\u975e\u5a92\u4f53\u67e5\u8be2\u5757\uff09\u3002',

    h2_mapping: 'CSS \u5c5e\u6027\u5230 Tailwind \u7c7b\u7684\u6620\u5c04',
    mapping_p1: '\u4efb\u4f55 CSS \u8f6c Tailwind \u7684\u6838\u5fc3\u662f\u7406\u89e3 CSS \u5c5e\u6027\u5982\u4f55\u6620\u5c04\u5230\u5de5\u5177\u7c7b\u3002\u4ee5\u4e0b\u662f\u6700\u5e38\u89c1\u7684\u8f6c\u6362\uff1a',
    mapping_p2: '\u663e\u793a\u5c5e\u6027\uff1a<code>display: flex</code> \u53d8\u4e3a <code>flex</code>\uff0c<code>display: grid</code> \u53d8\u4e3a <code>grid</code>\uff0c<code>display: block</code> \u53d8\u4e3a <code>block</code>\uff0c<code>display: none</code> \u53d8\u4e3a <code>hidden</code>\u3002',
    mapping_p3: '\u5b9a\u4f4d\u5c5e\u6027\uff1a<code>position: relative</code> \u53d8\u4e3a <code>relative</code>\uff0c<code>position: absolute</code> \u53d8\u4e3a <code>absolute</code>\uff0c<code>position: fixed</code> \u53d8\u4e3a <code>fixed</code>\uff0c<code>position: sticky</code> \u53d8\u4e3a <code>sticky</code>\u3002',
    mapping_p4: '\u5c3a\u5bf8\u5c5e\u6027\uff1a<code>width: 100%</code> \u53d8\u4e3a <code>w-full</code>\uff0c<code>height: 100vh</code> \u53d8\u4e3a <code>h-screen</code>\uff0c<code>max-width: 640px</code> \u53d8\u4e3a <code>max-w-xl</code>\u3002',
    mapping_p5: '\u76d2\u6a21\u578b\uff1a<code>padding: 16px</code> \u53d8\u4e3a <code>p-4</code>\uff0c<code>margin: 0 auto</code> \u53d8\u4e3a <code>mx-auto</code>\uff0c<code>border-radius: 8px</code> \u53d8\u4e3a <code>rounded-lg</code>\u3002',
    mapping_p6: '\u6587\u672c\uff1a<code>font-size: 14px</code> \u53d8\u4e3a <code>text-sm</code>\uff0c<code>font-weight: 700</code> \u53d8\u4e3a <code>font-bold</code>\uff0c<code>text-align: center</code> \u53d8\u4e3a <code>text-center</code>\u3002',

    h2_responsive: '\u54cd\u5e94\u5f0f\u8bbe\u8ba1\uff1a\u5a92\u4f53\u67e5\u8be2 vs Tailwind \u65ad\u70b9',
    responsive_p1: 'Tailwind \u6700\u5f15\u4eba\u6ce8\u76ee\u7684\u7279\u6027\u4e4b\u4e00\u662f\u5b83\u5904\u7406\u54cd\u5e94\u5f0f\u8bbe\u8ba1\u7684\u65b9\u5f0f\u3002\u65e0\u9700\u7f16\u5199 <code>@media (min-width: 768px) { ... }</code> \u5757\uff0c\u53ea\u9700\u4e3a\u4efb\u4f55\u5de5\u5177\u7c7b\u6dfb\u52a0\u65ad\u70b9\u4fee\u9970\u7b26\u524d\u7f00\u3002',
    responsive_p2: 'Tailwind \u91c7\u7528<strong>\u79fb\u52a8\u4f18\u5148</strong>\u7b56\u7565\u3002\u65e0\u524d\u7f00\u7684\u5de5\u5177\u7c7b\u5e94\u7528\u4e8e\u6240\u6709\u5c4f\u5e55\u5c3a\u5bf8\u3002\u65ad\u70b9\u524d\u7f00\u5728\u8be5\u5bbd\u5ea6<em>\u53ca\u4ee5\u4e0a</em>\u751f\u6548\u3002\u9ed8\u8ba4\u65ad\u70b9\uff1a<code>sm</code> (640px)\u3001<code>md</code> (768px)\u3001<code>lg</code> (1024px)\u3001<code>xl</code> (1280px)\u3001<code>2xl</code> (1536px)\u3002',
    responsive_p3: '\u8fd9\u610f\u5473\u7740 <code>text-sm md:text-base lg:text-lg</code> \u5728\u79fb\u52a8\u7aef\u4ece\u5c0f\u5b57\u53f7\u5f00\u59cb\uff0c\u5728 md \u65ad\u70b9\u589e\u5927\uff0c\u5728 lg \u65ad\u70b9\u518d\u6b21\u589e\u5927\u3002\u60a8\u53ef\u4ee5\u5728 <code>tailwind.config.js</code> \u7684 <code>screens</code> \u4e2d\u81ea\u5b9a\u4e49\u8fd9\u4e9b\u65ad\u70b9\u3002',

    h2_flexgrid: 'Flexbox \u548c Grid\uff1aCSS vs Tailwind',
    flexgrid_p1: 'Flexbox \u548c Grid \u5e03\u5c40\u662f Tailwind \u771f\u6b63\u53d1\u5149\u7684\u5730\u65b9\uff0c\u7528\u51e0\u4e2a\u5de5\u5177\u7c7b\u5c31\u80fd\u66ff\u4ee3\u591a\u884c CSS \u5757\u3002',
    flexgrid_p2: '<strong>Flexbox</strong>\uff1a<code>flex-direction: row</code> \u53d8\u4e3a <code>flex-row</code>\uff0c<code>justify-content: center</code> \u53d8\u4e3a <code>justify-center</code>\uff0c<code>align-items: center</code> \u53d8\u4e3a <code>items-center</code>\uff0c<code>gap: 16px</code> \u53d8\u4e3a <code>gap-4</code>\u3002',
    flexgrid_p3: '<strong>CSS Grid</strong>\uff1a<code>grid-template-columns: repeat(3, 1fr)</code> \u53d8\u4e3a <code>grid-cols-3</code>\uff0c<code>grid-column: span 2</code> \u53d8\u4e3a <code>col-span-2</code>\uff0c<code>gap: 24px</code> \u53d8\u4e3a <code>gap-6</code>\u3002',
    flexgrid_p4: '\u590d\u6742\u7684\u54cd\u5e94\u5f0f\u5361\u7247\u7f51\u683c\u53ea\u9700\u4e00\u884c\uff1a<code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6</code>\u3002\u4f20\u7edf CSS \u9700\u8981\u4e3a\u6bcf\u4e2a\u65ad\u70b9\u7f16\u5199\u5a92\u4f53\u67e5\u8be2\u5757\u3002',

    h2_colors: 'Tailwind \u4e2d\u7684\u989c\u8272\u3001\u95f4\u8ddd\u548c\u6392\u7248',
    colors_p1: 'Tailwind \u7684<strong>\u95f4\u8ddd</strong>\u9075\u5faa 4px \u57fa\u7840\u5355\u4f4d\u523b\u5ea6\u3002<code>p-1</code> = 4px\uff0c<code>p-2</code> = 8px\uff0c<code>p-4</code> = 16px\uff0c<code>p-8</code> = 32px\u3002\u8d1f\u503c\u4f7f\u7528\u7834\u6298\u53f7\u524d\u7f00\uff1a<code>-mt-4</code> \u8868\u793a <code>margin-top: -16px</code>\u3002',
    colors_p2: '<strong>\u989c\u8272</strong>\u4f7f\u7528\u8272\u9636\u547d\u540d\uff1a<code>text-blue-500</code>\u3001<code>bg-gray-100</code>\u3001<code>border-red-600</code>\u3002\u8272\u9636\u4ece 50\uff08\u6700\u6d45\uff09\u5230 950\uff08\u6700\u6df1\uff09\u3002\u900f\u660e\u5ea6\u4fee\u9970\u7b26\uff1a<code>bg-black/50</code> \u8868\u793a 50% \u900f\u660e\u5ea6\u3002',
    colors_p3: '<strong>\u6392\u7248</strong>\u7c7b\u8986\u76d6\u5b57\u4f53\u5927\u5c0f\uff08<code>text-xs</code> \u5230 <code>text-9xl</code>\uff09\u3001\u5b57\u4f53\u7c97\u7ec6\uff08<code>font-thin</code> \u5230 <code>font-black</code>\uff09\u3001\u884c\u9ad8\uff08<code>leading-none</code> \u5230 <code>leading-loose</code>\uff09\u548c\u5b57\u6bcd\u95f4\u8ddd\uff08<code>tracking-tighter</code> \u5230 <code>tracking-widest</code>\uff09\u3002',

    h2_arbitrary: '\u4efb\u610f\u503c\u8bed\u6cd5 [...]',
    arbitrary_p1: 'Tailwind \u7684\u8bbe\u8ba1\u7cfb\u7edf\u8986\u76d6\u4e86\u5927\u591a\u6570\u5e38\u89c1\u503c\uff0c\u4f46\u5b9e\u9645\u9879\u76ee\u5e38\u9700\u8981\u7cbe\u786e\u7684\u50cf\u7d20\u503c\u3001\u7279\u5b9a\u989c\u8272\u6216\u7279\u6b8a\u8ba1\u7b97\u3002<strong>\u4efb\u610f\u503c</strong>\u8bed\u6cd5\u901a\u8fc7\u65b9\u62ec\u53f7\u5305\u88f9\u4efb\u4f55 CSS \u503c\u6765\u5904\u7406\u8fd9\u4e9b\u60c5\u51b5\u3002',
    arbitrary_p2: '\u793a\u4f8b\uff1a<code>w-[calc(100%-2rem)]</code> \u7528\u4e8e\u8ba1\u7b97\u5bbd\u5ea6\uff0c<code>p-[13px]</code> \u7528\u4e8e\u975e\u6807\u51c6\u5185\u8fb9\u8ddd\uff0c<code>text-[#1a73e8]</code> \u7528\u4e8e\u81ea\u5b9a\u4e49\u5341\u516d\u8fdb\u5236\u989c\u8272\uff0c<code>grid-cols-[200px_1fr_200px]</code> \u7528\u4e8e\u81ea\u5b9a\u4e49\u7f51\u683c\u5217\u3002',
    arbitrary_p3: '\u4f60\u8fd8\u53ef\u4ee5\u4f7f\u7528\u4efb\u610f\u5c5e\u6027\u8bed\u6cd5\u5904\u7406 Tailwind \u6ca1\u6709\u5de5\u5177\u7c7b\u7684 CSS \u5c5e\u6027\uff1a<code>[clip-path:circle(50%)]</code>\u3001<code>[writing-mode:vertical-rl]</code>\u3002\u8fd9\u4e2a\u9003\u751f\u8231\u610f\u5473\u7740\u4f60\u6c38\u8fdc\u4e0d\u9700\u8981\u4e3a\u4e00\u6b21\u6027\u6837\u5f0f\u56de\u9000\u5230\u5355\u72ec\u7684\u6837\u5f0f\u8868\u3002',

    h2_config: 'Tailwind \u914d\u7f6e\uff1a\u6269\u5c55 vs \u8986\u76d6',
    config_p1: '<code>tailwind.config.js</code> \u6587\u4ef6\u63a7\u5236\u4f60\u7684\u8bbe\u8ba1\u7cfb\u7edf\u3002\u7406\u89e3 <code>extend</code> \u548c\u76f4\u63a5\u914d\u7f6e\u7684\u533a\u522b\u81f3\u5173\u91cd\u8981\u3002',
    config_p2: '\u5728 <code>theme.extend</code> \u4e0b\u6dfb\u52a0\u503c\u4f1a\u4e0e\u9ed8\u8ba4\u4e3b\u9898<strong>\u5408\u5e76</strong>\u3002\u76f4\u63a5\u5728 <code>theme</code> \u4e0b\u6dfb\u52a0\u503c\u4f1a<strong>\u5b8c\u5168\u66ff\u6362</strong>\u8be5\u7c7b\u522b\u7684\u9ed8\u8ba4\u503c\u3002',
    config_p3: '\u5927\u591a\u6570\u60c5\u51b5\u4e0b\uff0c\u4f60\u5e94\u8be5\u4f7f\u7528 <code>extend</code> \u6765\u6dfb\u52a0\u5230\u9ed8\u8ba4\u503c\u800c\u4e0d\u662f\u66ff\u6362\u5b83\u4eec\u3002',

    h2_dark: '\u6df1\u8272\u6a21\u5f0f\uff1aCSS \u5a92\u4f53\u67e5\u8be2 vs Tailwind dark:',
    dark_p1: 'Tailwind \u63d0\u4f9b\u4e86\u5185\u7f6e\u7684\u6df1\u8272\u6a21\u5f0f\u7cfb\u7edf\uff0c\u4f7f\u7528 <code>dark:</code> \u524d\u7f00\u3002\u4efb\u4f55\u5de5\u5177\u7c7b\u90fd\u53ef\u4ee5\u6709\u6761\u4ef6\u5730\u5e94\u7528\u4e8e\u6df1\u8272\u6a21\u5f0f\uff1a<code>bg-white dark:bg-gray-900</code>\u3002',
    dark_p2: 'Tailwind \u652f\u6301\u4e24\u79cd\u6df1\u8272\u6a21\u5f0f\u7b56\u7565\u3002<code>media</code> \u7b56\u7565\u81ea\u52a8\u4f7f\u7528\u64cd\u4f5c\u7cfb\u7edf\u7684\u504f\u597d\u8bbe\u7f6e\u3002<code>class</code> \u7b56\u7565\u901a\u8fc7\u7236\u5143\u7d20\u4e0a\u7684 <code>.dark</code> \u7c7b\u624b\u52a8\u63a7\u5236\u3002',
    dark_p3: '\u4f20\u7edf CSS \u5b9e\u73b0\u6df1\u8272\u6a21\u5f0f\u9700\u8981\u5728 <code>@media (prefers-color-scheme: dark)</code> \u5757\u5185\u590d\u5236\u6bcf\u4e2a\u989c\u8272\u58f0\u660e\u3002\u4f7f\u7528 Tailwind\uff0c\u4f60\u53ef\u4ee5\u5185\u8054\u58f0\u660e\u4e24\u79cd\u6a21\u5f0f\uff1a<code>bg-white dark:bg-slate-800 text-black dark:text-white</code>\u3002',

    h2_animations: 'Tailwind \u4e2d\u7684\u52a8\u753b\u548c\u8fc7\u6e21',
    anim_p1: 'Tailwind \u5305\u542b\u5e38\u89c1 CSS \u8fc7\u6e21\u548c\u52a8\u753b\u7684\u5de5\u5177\u7c7b\uff0c\u51cf\u5c11\u4e86\u81ea\u5b9a\u4e49\u5173\u952e\u5e27\u5b9a\u4e49\u7684\u9700\u8981\u3002',
    anim_p2: '<strong>\u8fc7\u6e21</strong>\uff1a<code>transition</code> \u542f\u7528\u5e38\u89c1\u5c5e\u6027\u7684\u8fc7\u6e21\u3002<code>duration-300</code> \u8bbe\u7f6e\u6301\u7eed\u65f6\u95f4\u3002<code>ease-in-out</code> \u8bbe\u7f6e\u7f13\u52a8\u3002',
    anim_p3: '<strong>\u53d8\u6362</strong>\uff1a<code>scale-95</code>\u3001<code>rotate-45</code>\u3001<code>translate-x-4</code> \u76f4\u63a5\u5e94\u7528\u53d8\u6362\u3002\u4e0e <code>hover:</code> \u7ec4\u5408\u5b9e\u73b0\u4ea4\u4e92\u6548\u679c\u3002',
    anim_p4: '<strong>\u52a8\u753b</strong>\uff1aTailwind \u81ea\u5e26 <code>animate-spin</code>\u3001<code>animate-ping</code>\u3001<code>animate-pulse</code> \u548c <code>animate-bounce</code>\u3002\u81ea\u5b9a\u4e49\u52a8\u753b\u53ef\u5728 <code>tailwind.config.js</code> \u4e2d\u5b9a\u4e49\u3002',

    h2_not: '\u4f55\u65f6\u4e0d\u5e94\u4f7f\u7528 Tailwind',
    not_list: '<ul><li><strong>\u590d\u6742\u7684\u591a\u6b65\u52a8\u753b</strong>\u2014\u2014\u590d\u6742\u7684 <code>@keyframes</code> \u5e8f\u5217\u5728 CSS \u6587\u4ef6\u4e2d\u66f4\u6e05\u6670\u3002</li><li><strong>\u9ad8\u5ea6\u52a8\u6001\u7684\u6837\u5f0f</strong>\u2014\u2014\u5f53\u6837\u5f0f\u503c\u6765\u81ea\u8fd0\u884c\u65f6 JavaScript \u53d8\u91cf\u65f6\uff0c\u5185\u8054\u6837\u5f0f\u66f4\u7b80\u5355\u3002</li><li><strong>\u7b2c\u4e09\u65b9\u7ec4\u4ef6\u5e93</strong>\u2014\u2014\u8986\u76d6 Material UI \u7b49\u5e93\u7684\u6837\u5f0f\u901a\u5e38\u9700\u8981\u4f20\u7edf CSS \u9009\u62e9\u5668\u3002</li><li><strong>\u90ae\u4ef6 HTML \u6a21\u677f</strong>\u2014\u2014\u90ae\u4ef6\u5ba2\u6237\u7aef CSS \u652f\u6301\u53d7\u9650\uff0c\u9700\u8981\u5185\u8054\u6837\u5f0f\u3002</li><li><strong>\u5927\u578b\u9057\u7559\u4ee3\u7801\u5e93</strong>\u2014\u2014\u4e00\u6b21\u6027\u8fc1\u79fb\u98ce\u9669\u5927\uff0c\u5e94\u9010\u7ec4\u4ef6\u589e\u91cf\u8f6c\u6362\u3002</li><li><strong>\u4e0d\u719f\u6089 Tailwind \u7684\u56e2\u961f</strong>\u2014\u2014\u5b66\u4e60\u66f2\u7ebf\u662f\u771f\u5b9e\u7684\uff0c\u5982\u679c\u9879\u76ee\u5373\u5c06\u5b8c\u6210\u53ef\u80fd\u4e0d\u503c\u5f97\u5207\u6362\u3002</li></ul>',
    not_p1: 'Tailwind \u5f88\u5f3a\u5927\uff0c\u4f46\u5e76\u975e\u9002\u5408\u6240\u6709\u60c5\u51b5\u3002\u8bc6\u522b\u4f55\u65f6\u4f20\u7edf CSS \u66f4\u597d\u53ef\u4ee5\u8282\u7701\u65f6\u95f4\u3002',

    h2_migration: '\u8fc1\u79fb\u7b56\u7565\uff1a\u6e10\u8fdb\u5f0f vs \u5b8c\u5168\u91cd\u5199',
    migration_p1: '\u5c06\u73b0\u6709\u9879\u76ee\u4ece CSS \u8fc1\u79fb\u5230 Tailwind \u6709\u4e24\u79cd\u4e3b\u8981\u65b9\u6cd5\uff1a\u6e10\u8fdb\u5f0f\u8fc1\u79fb\u548c\u5b8c\u5168\u91cd\u5199\u3002',
    migration_p2: '<strong>\u6e10\u8fdb\u5f0f\u8fc1\u79fb</strong>\uff08\u63a8\u8350\uff09\uff1a\u5728\u73b0\u6709 CSS \u65c1\u8fb9\u5b89\u88c5 Tailwind\u3002\u9010\u4e2a\u7ec4\u4ef6\u8fc1\u79fb\uff0c\u4ece\u6700\u7b80\u5355\u7684\u53f6\u5b50\u7ec4\u4ef6\u5f00\u59cb\u3002\u8f6c\u6362\u5b8c\u6210\u540e\u5220\u9664\u65e7 CSS\u3002',
    migration_p3: '<strong>\u5b8c\u5168\u91cd\u5199</strong>\uff08\u9002\u5408\u5c0f\u9879\u76ee\uff09\uff1a\u4e00\u6b21\u6027\u66ff\u6362\u6240\u6709 CSS \u6587\u4ef6\u3002\u5bf9\u5c0f\u9879\u76ee\u66f4\u5feb\uff0c\u4f46\u5bf9\u5927\u9879\u76ee\u98ce\u9669\u5927\u3002',
    migration_p4: '\u65e0\u8bba\u54ea\u79cd\u65b9\u6cd5\uff0c\u4f7f\u7528\u81ea\u52a8\u5316\u5de5\u5177\u52a0\u901f\u673a\u68b0\u7ffb\u8bd1\u3002\u6211\u4eec\u7684 CSS \u8f6c Tailwind \u8f6c\u6362\u5668\u5904\u7406\u5c5e\u6027\u5230\u5de5\u5177\u7c7b\u7684\u6620\u5c04\u3002',

    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: '\u5c06 CSS \u8f6c\u6362\u4e3a Tailwind \u7c7b\u7684\u6700\u5feb\u65b9\u6cd5\u662f\u4ec0\u4e48\uff1f',
    faq1_a: '\u4f7f\u7528\u81ea\u52a8\u8f6c\u6362\u5668\u5de5\u5177\u5c06 CSS \u5c5e\u6027\u6620\u5c04\u5230\u5bf9\u5e94\u7684 Tailwind \u7c7b\u3002\u7c98\u8d34 CSS\uff0c\u5373\u65f6\u83b7\u5f97 Tailwind \u7c7b\u3002\u5bf9\u4e8e\u5927\u578b\u9879\u76ee\uff0c\u5c06\u81ea\u52a8\u8f6c\u6362\u4e0e\u624b\u52a8\u5ba1\u67e5\u76f8\u7ed3\u5408\u3002',
    faq2_q: 'Tailwind \u4f1a\u589e\u52a0 HTML \u6587\u4ef6\u5927\u5c0f\u5417\uff1f',
    faq2_a: '\u662f\u7684\uff0cHTML \u6587\u4ef6\u7a0d\u5fae\u589e\u5927\uff0c\u4f46 CSS \u5305\u5927\u5c0f\u663e\u8457\u51cf\u5c11\u3002\u603b\u4f53\u4f20\u8f93\u5927\u5c0f\u901a\u5e38\u66f4\u5c0f\u3002',
    faq3_q: '\u53ef\u4ee5\u5c06 Tailwind \u4e0e CSS Modules \u6216 Styled Components \u4e00\u8d77\u4f7f\u7528\u5417\uff1f',
    faq3_a: '\u53ef\u4ee5\u3002Tailwind \u53ef\u4ee5\u4e0e CSS Modules\u3001Styled Components\u3001Emotion \u7b49\u5171\u5b58\u3002\u53ef\u4ee5\u7528 Tailwind \u5904\u7406\u5e03\u5c40\uff0c\u7528 CSS Modules \u5904\u7406\u590d\u6742\u7ec4\u4ef6\u7279\u5b9a\u6837\u5f0f\u3002',
    faq4_q: '\u5982\u4f55\u5728 Tailwind \u4e2d\u5904\u7406 hover\u3001focus \u7b49\u4f2a\u7c7b\uff1f',
    faq4_a: 'Tailwind \u4f7f\u7528\u72b6\u6001\u4fee\u9970\u7b26\u4f5c\u4e3a\u524d\u7f00\uff1ahover:bg-blue-600\u3001focus:ring-2\u3001active:scale-95\u3001disabled:opacity-50\u3002\u8fd9\u4e9b\u66ff\u4ee3\u4e86 CSS \u4f2a\u7c7b\u9009\u62e9\u5668\u3002',
    faq5_q: 'Tailwind \u7684\u95f4\u8ddd\u523b\u5ea6\u662f\u5982\u4f55\u5de5\u4f5c\u7684\uff1f',
    faq5_a: 'Tailwind \u4f7f\u7528 4px \u57fa\u7840\u5355\u4f4d\u3002\u523b\u5ea6\uff1a0 (0px)\u3001px (1px)\u30011 (4px)\u30012 (8px)\u30014 (16px)\u30018 (32px)\u300112 (48px)\u300116 (64px)\u300120 (80px)\u300124 (96px)\u3002\u4f7f\u7528 p-[13px] \u8bbe\u7f6e\u975e\u6807\u51c6\u95f4\u8ddd\u3002',
    faq6_q: 'Tailwind \u5982\u4f55\u5904\u7406\u54cd\u5e94\u5f0f\u56fe\u7247\u548c\u5bbd\u9ad8\u6bd4\uff1f',
    faq6_a: 'Tailwind \u63d0\u4f9b aspect-auto\u3001aspect-square \u548c aspect-video \u5de5\u5177\u7c7b\u3002\u54cd\u5e94\u5f0f\u56fe\u7247\u7ec4\u5408 w-full \u548c h-auto\u3002object-cover\u3001object-contain \u63a7\u5236\u586b\u5145\u884c\u4e3a\u3002',
    faq7_q: '\u5e94\u8be5\u4f7f\u7528 @apply \u63d0\u53d6\u91cd\u590d\u7684\u5de5\u5177\u6a21\u5f0f\u5417\uff1f',
    faq7_a: '\u5efa\u8bae\u5c11\u7528 @apply\u3002Tailwind \u56e2\u961f\u63a8\u8350\u4f7f\u7528\u7ec4\u4ef6\u62bd\u8c61\u6765\u907f\u514d\u91cd\u590d\u3002\u4ec5\u5728\u65e0\u6cd5\u4f7f\u7528\u7ec4\u4ef6\u65f6\u4f7f\u7528 @apply\u3002\u8fc7\u5ea6\u4f7f\u7528\u4f1a\u8fdd\u80cc\u5b9e\u7528\u4f18\u5148 CSS \u7684\u521d\u8877\u3002',
    faq8_q: '\u5982\u4f55\u5c06 CSS \u81ea\u5b9a\u4e49\u5c5e\u6027\uff08\u53d8\u91cf\uff09\u8fc1\u79fb\u5230 Tailwind\uff1f',
    faq8_a: '\u53ef\u4ee5\u5728 Tailwind \u4e2d\u76f4\u63a5\u5f15\u7528 CSS \u81ea\u5b9a\u4e49\u5c5e\u6027\uff1abg-[var(--brand-color)]\u3001text-[var(--heading-size)]\u3002\u6216\u8005\u5728 tailwind.config.js \u4e2d\u5c06\u81ea\u5b9a\u4e49\u5c5e\u6027\u6620\u5c04\u5230\u4e3b\u9898\u503c\u3002Tailwind v4 \u539f\u751f\u4f7f\u7528 CSS \u81ea\u5b9a\u4e49\u5c5e\u6027\u4f5c\u4e3a\u8bbe\u8ba1\u4ee4\u724c\u3002',

    conclusion: '\u4ece CSS \u8fc1\u79fb\u5230 Tailwind \u662f\u4e00\u9879\u6218\u7565\u6027\u6295\u8d44\uff0c\u56de\u62a5\u662f\u66f4\u5c0f\u7684\u5305\u4f53\u79ef\u3001\u66f4\u5feb\u7684\u5f00\u53d1\u901f\u5ea6\u548c\u4e00\u81f4\u7684\u8bbe\u8ba1\u3002\u5148\u4f7f\u7528\u81ea\u52a8\u8f6c\u6362\u5668\u8fdb\u884c\u673a\u68b0\u7ffb\u8bd1\uff0c\u7136\u540e\u9010\u7ec4\u4ef6\u4f18\u5316\u3002\u65b0\u7ec4\u4ef6\u76f4\u63a5\u7528 Tailwind \u7f16\u5199\uff0c\u9057\u7559\u4ee3\u7801\u9010\u6b65\u8fc1\u79fb\u3002',
    linkToolBottom: '\u4f7f\u7528\u6211\u4eec\u7684\u514d\u8d39\u5de5\u5177\u5373\u65f6\u5c06 CSS \u8f6c\u6362\u4e3a Tailwind \u7c7b\u3002',
  },
};

export default function CssToTailwindOnlineGuide({ lang }: { lang: string }) {
  const s = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          {s.tldr}{' '}
          <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>
            {lang === 'zh' ? 'CSS \u8f6c Tailwind \u5de5\u5177' : 'CSS to Tailwind Tool'}
          </Link>
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>
          {lang === 'zh' ? '\u5173\u952e\u8981\u70b9' : 'Key Takeaways'}
        </p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>{s.takeaway1}</strong></li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6} &mdash; <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>{lang === 'zh' ? '\u514d\u8d39\u8bd5\u7528' : 'Try it free'}</Link>.</li>
          <li>{s.takeaway7}</li>
          <li>{s.takeaway8}</li>
        </ul>
      </div>

      {/* Section 1: What is Tailwind CSS */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p3 }} />

      <p>
        <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>
          {lang === 'zh' ? '\u2192 \u7acb\u5373\u4f7f\u7528\u6211\u4eec\u7684\u514d\u8d39 CSS \u8f6c Tailwind \u5de5\u5177' : '\u2192 Try our free CSS to Tailwind converter now'}
        </Link>
      </p>

      {/* Section 2: Property Mapping */}
      <h2>{s.h2_mapping}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.mapping_p1 }} />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>CSS</th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>Tailwind</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['display: flex', 'flex'],
            ['display: grid', 'grid'],
            ['display: none', 'hidden'],
            ['position: relative', 'relative'],
            ['position: absolute', 'absolute'],
            ['position: sticky', 'sticky'],
            ['margin: 0 auto', 'mx-auto'],
            ['padding: 16px', 'p-4'],
            ['padding: 8px 16px', 'px-4 py-2'],
            ['width: 100%', 'w-full'],
            ['height: 100vh', 'h-screen'],
            ['max-width: 640px', 'max-w-xl'],
            ['font-size: 14px', 'text-sm'],
            ['font-weight: 700', 'font-bold'],
            ['text-align: center', 'text-center'],
            ['line-height: 1.5', 'leading-normal'],
            ['border-radius: 8px', 'rounded-lg'],
            ['cursor: pointer', 'cursor-pointer'],
            ['overflow: hidden', 'overflow-hidden'],
            ['opacity: 0.5', 'opacity-50'],
          ].map(([css, tw], i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>{css}</code></td>
              <td style={{ padding: '8px 12px' }}><code>{tw}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: s.mapping_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mapping_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mapping_p4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mapping_p5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.mapping_p6 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* Traditional CSS */
.card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 auto;
  max-width: 640px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.card-body {
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

<!-- Tailwind equivalent -->
<div class="flex flex-col p-4 mx-auto max-w-xl bg-white rounded-lg shadow-sm">
  <h3 class="text-lg font-bold mb-2">Title</h3>
  <p class="text-sm leading-relaxed text-gray-700">Body text</p>
</div>`}</code>
      </pre>

      {/* Section 3: Responsive Design */}
      <h2>{s.h2_responsive}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.responsive_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.responsive_p2 }} />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
              {lang === 'zh' ? '\u524d\u7f00' : 'Prefix'}
            </th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
              {lang === 'zh' ? '\u6700\u5c0f\u5bbd\u5ea6' : 'Min Width'}
            </th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
              CSS
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ['sm:', '640px', '@media (min-width: 640px)'],
            ['md:', '768px', '@media (min-width: 768px)'],
            ['lg:', '1024px', '@media (min-width: 1024px)'],
            ['xl:', '1280px', '@media (min-width: 1280px)'],
            ['2xl:', '1536px', '@media (min-width: 1536px)'],
          ].map(([prefix, width, css], i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>{prefix}</code></td>
              <td style={{ padding: '8px 12px' }}>{width}</td>
              <td style={{ padding: '8px 12px' }}><code>{css}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* Traditional CSS: responsive container */
.container {
  padding: 8px;
  font-size: 14px;
}

@media (min-width: 768px) {
  .container {
    padding: 16px;
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 24px;
    font-size: 18px;
    max-width: 1024px;
    margin: 0 auto;
  }
}

<!-- Tailwind equivalent (one line) -->
<div class="p-2 text-sm md:p-4 md:text-base lg:p-6 lg:text-lg lg:max-w-screen-lg lg:mx-auto">
  ...
</div>`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.responsive_p3 }} />

      {/* Section 4: Flexbox and Grid */}
      <h2>{s.h2_flexgrid}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.flexgrid_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.flexgrid_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* CSS: Centered flex container */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

<!-- Tailwind -->
<div class="flex justify-center items-center gap-4 flex-wrap">

/* CSS: Sidebar layout */
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar { width: 256px; flex-shrink: 0; }
.main { flex: 1; }

<!-- Tailwind -->
<div class="flex min-h-screen">
  <aside class="w-64 shrink-0">...</aside>
  <main class="flex-1">...</main>
</div>`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.flexgrid_p3 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* CSS: Responsive card grid */
.card-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}

<!-- Tailwind (one line) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

/* CSS: Dashboard grid */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  min-height: 100vh;
}

<!-- Tailwind -->
<div class="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto] gap-4 min-h-screen">`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.flexgrid_p4 }} />

      {/* Section 5: Colors, Spacing, Typography */}
      <h2>{s.h2_colors}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.colors_p1 }} />

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
              {lang === 'zh' ? 'Tailwind \u7c7b' : 'Tailwind Class'}
            </th>
            <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>
              {lang === 'zh' ? '\u503c' : 'Value'}
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ['p-0, m-0', '0px'],
            ['p-px, m-px', '1px'],
            ['p-0.5, m-0.5', '2px'],
            ['p-1, m-1', '4px'],
            ['p-2, m-2', '8px'],
            ['p-3, m-3', '12px'],
            ['p-4, m-4', '16px'],
            ['p-6, m-6', '24px'],
            ['p-8, m-8', '32px'],
            ['p-12, m-12', '48px'],
            ['p-16, m-16', '64px'],
            ['p-24, m-24', '96px'],
          ].map(([cls, val], i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '8px 12px' }}><code>{cls}</code></td>
              <td style={{ padding: '8px 12px' }}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: s.colors_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* CSS: Custom colors and opacity */
.element {
  color: #1a73e8;
  background-color: rgba(0, 0, 0, 0.5);
  border-color: #dc2626;
}

<!-- Tailwind -->
<div class="text-[#1a73e8] bg-black/50 border-red-600">

/* CSS: Standard palette colors */
.success { color: #16a34a; }        /* text-green-600 */
.warning { color: #ca8a04; }        /* text-yellow-600 */
.error   { color: #dc2626; }        /* text-red-600 */
.info    { color: #2563eb; }        /* text-blue-600 */
.muted   { color: #6b7280; }        /* text-gray-500 */`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.colors_p3 }} />

      {/* Section 6: Arbitrary Values */}
      <h2>{s.h2_arbitrary}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.arbitrary_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.arbitrary_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`<!-- Arbitrary values in Tailwind -->

<!-- Exact pixel values -->
<div class="w-[327px] h-[200px] p-[13px] m-[7px]">

<!-- Calculated values -->
<div class="w-[calc(100%-2rem)] h-[calc(100vh-64px)]">

<!-- Custom colors -->
<div class="text-[#1a73e8] bg-[rgb(255,100,50)] border-[hsl(220,90%,56%)]">

<!-- CSS custom properties -->
<div class="bg-[var(--brand-color)] top-[var(--header-height)]">

<!-- Custom grid columns (underscores = spaces) -->
<div class="grid grid-cols-[200px_1fr_200px]">

<!-- Arbitrary properties (no utility exists) -->
<div class="[clip-path:circle(50%)] [writing-mode:vertical-rl]">

<!-- Arbitrary variants -->
<div class="[&>*:first-child]:mt-0 [&_p]:text-gray-700">`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.arbitrary_p3 }} />

      {/* Section 7: Tailwind Config */}
      <h2>{s.h2_config}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.config_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.config_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media'
  theme: {
    // EXTEND: adds to defaults (recommended)
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a5f',
        },
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',     // 352px
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        '3xl': '1920px',  // extra-large breakpoint
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },
    },

    // OVERRIDE: replaces defaults entirely (use with caution)
    // colors: { ... }  <-- this would REMOVE all default colors
  },
  plugins: [],
};`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.config_p3 }} />

      {/* Section 8: Dark Mode */}
      <h2>{s.h2_dark}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.dark_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.dark_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* Traditional CSS: dark mode */
.card {
  background-color: white;
  color: #111827;
  border: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .card {
    background-color: #1f2937;
    color: #f9fafb;
    border-color: #374151;
  }
}

<!-- Tailwind equivalent (inline, no media query needed) -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-700">

<!-- Toggle dark mode with JavaScript (class strategy) -->
<script>
  // Add 'dark' class to <html> element
  document.documentElement.classList.toggle('dark');
</script>

<!-- Common dark mode patterns -->
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
  <nav class="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
  <button class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.dark_p3 }} />

      {/* Section 9: Animations and Transitions */}
      <h2>{s.h2_animations}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.anim_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.anim_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`/* CSS: Button hover transition */
.btn {
  transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;
}
.btn:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}

<!-- Tailwind -->
<button class="transition-all duration-200 ease-in-out hover:bg-blue-600 hover:scale-105">

/* CSS: Fade-in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.3s ease-out; }

<!-- Tailwind (using config-defined animation) -->
<div class="animate-fadeIn">

<!-- Built-in animations -->
<svg class="animate-spin h-5 w-5">        <!-- Loading spinner -->
<span class="animate-ping absolute ...">  <!-- Notification dot -->
<div class="animate-pulse bg-gray-200">   <!-- Skeleton loader -->
<div class="animate-bounce">              <!-- Scroll indicator -->`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.anim_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.anim_p4 }} />

      {/* Section 10: When NOT to Use Tailwind */}
      <h2>{s.h2_not}</h2>
      <p>{s.not_p1}</p>
      <div dangerouslySetInnerHTML={{ __html: s.not_list }} />

      {/* Section 11: Migration Strategies */}
      <h2>{s.h2_migration}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.migration_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.migration_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`# Gradual migration: Step-by-step

# 1. Install Tailwind alongside existing CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Configure content paths (scan only files you are converting)
# tailwind.config.js
module.exports = {
  content: ['./src/components/new/**/*.{js,jsx,ts,tsx}'],
  // ...
};

# 3. Add Tailwind directives to your CSS entry point
# app.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your existing CSS continues to work below */
@import './legacy-styles.css';

# 4. Convert one component at a time
# Before:  <div class="card-header">
# After:   <div class="flex items-center p-4 border-b border-gray-200">

# 5. Remove old CSS after each component is fully converted
# 6. Expand content paths as you convert more components`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.migration_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.migration_p4 }} />

      <p>
        <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>
          {lang === 'zh' ? '\u2192 \u7acb\u5373\u8bd5\u7528 CSS \u8f6c Tailwind \u8f6c\u6362\u5668' : '\u2192 Try the CSS to Tailwind converter now'}
        </Link>
      </p>

      {/* FAQ Section */}
      <h2>{s.h2_faq}</h2>

      {[
        [s.faq1_q, s.faq1_a],
        [s.faq2_q, s.faq2_a],
        [s.faq3_q, s.faq3_a],
        [s.faq4_q, s.faq4_a],
        [s.faq5_q, s.faq5_a],
        [s.faq6_q, s.faq6_a],
        [s.faq7_q, s.faq7_a],
        [s.faq8_q, s.faq8_a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.05em', fontWeight: 600, marginBottom: '6px' }}>{q}</h3>
          <p style={{ margin: 0, color: '#374151' }}>{a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2>{lang === 'zh' ? '\u603b\u7ed3' : 'Conclusion'}</h2>
      <p>{s.conclusion}</p>
      <p>
        <Link href={`/${lang}/tools/css-to-tailwind`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
