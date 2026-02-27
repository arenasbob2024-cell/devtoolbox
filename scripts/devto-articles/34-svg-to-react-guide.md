---
title: "SVG to React Component: Complete Conversion Guide with SVGR"
tags: react, svg, javascript, frontend
canonical_url: https://viadreams.cc/en/blog/svg-to-react-online-guide
published: true
---

Converting SVG files to React components is a daily task for frontend developers. Here's the complete guide.

## Why Convert SVG to React Components?

- **Props control**: Pass fill, size, and className dynamically
- **Bundle optimization**: Tree-shaking removes unused icons
- **Accessibility**: Add title, aria-label directly in JSX
- **Animations**: Use React state to animate SVG properties
- **No img flicker**: SVG renders inline, no network request

## The SVGR Transformation

SVGR converts this:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#000" d="M12 2L2 7l10 5 10-5-10-5z"/>
  <path fill="#000" d="M2 17l10 5 10-5"/>
</svg>
```

Into this:

```jsx
const LayersIcon = ({ fill = 'currentColor', size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={fill} d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path fill={fill} d="M2 17l10 5 10-5"/>
  </svg>
);

export default LayersIcon;
```

## Key Transformations

### HTML attributes → JSX attributes

| SVG/HTML | JSX |
|----------|-----|
| `class` | `className` |
| `fill-rule` | `fillRule` |
| `stroke-width` | `strokeWidth` |
| `clip-path` | `clipPath` |
| `stop-color` | `stopColor` |
| `xmlns:xlink` | `xmlnsXlink` |

### Hardcoded colors → dynamic props

```jsx
// Before: hardcoded
<path fill="#3B82F6" />

// After: dynamic via currentColor
<path fill="currentColor" />
// Now controlled by CSS color property
```

## Making Reusable Icon Components

The real power is creating a consistent icon interface:

```tsx
interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  'aria-label'?: string;
}

const ChevronDownIcon = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  'aria-label': ariaLabel,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role={ariaLabel ? 'img' : undefined}
    aria-label={ariaLabel}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
```

## SVGO Optimization

Before converting, optimize your SVG with SVGO:

```bash
# Install SVGO
npm install -g svgo

# Optimize a single file
svgo input.svg -o output.svg

# Optimize entire directory
svgo -f ./icons -o ./optimized
```

Typical SVGO gains: 40-70% size reduction.

## Animating SVG in React

```tsx
import { useState } from 'react';

const AnimatedArrow = () => {
  const [rotated, setRotated] = useState(false);
  
  return (
    <svg
      onClick={() => setRotated(!rotated)}
      style={{
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
      }}
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" strokeWidth="2"/>
    </svg>
  );
};
```

## Quick Conversions

For one-off SVG conversions without setting up SVGR, use **[DevToolBox's SVG to React converter](https://viadreams.cc/en/tools/svg-to-react)** — paste your SVG and get production-ready React/JSX component code instantly.

## Accessibility Best Practices

```tsx
// Decorative icon (hidden from screen readers)
<CheckIcon aria-hidden="true" />

// Meaningful icon (needs label)
<button>
  <SearchIcon aria-hidden="true" />
  <span className="sr-only">Search</span>
</button>

// Standalone icon with role
<StarIcon role="img" aria-label="Rating: 4 out of 5 stars" />
```

## Tree-Shaking Icons

```tsx
// ✓ Good: named imports, tree-shakeable
import { ChevronDown, Search, X } from './icons';

// ✗ Bad: barrel import, can't tree-shake
import * as Icons from './icons';
```

---

*Convert SVG to React components instantly with [DevToolBox's free SVG to React tool](https://viadreams.cc/en/tools/svg-to-react) — no setup required.*
