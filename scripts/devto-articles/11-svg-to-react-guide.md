---
title: "How to Convert SVG to React Components: Complete Guide"
tags: react, svg, javascript, webdev
canonical_url: https://viadreams.cc/en/blog/svg-to-react-guide
published: true
---

Converting SVG icons and illustrations to React components lets you dynamically control colors, sizes, and animations through props. Here's a practical guide.

## Why Convert SVG to React?

Using SVG directly as React components instead of `<img>` tags gives you:

- **Dynamic props** - Change fill, stroke, width, height via props
- **Tree shaking** - Only bundle icons you actually use
- **TypeScript support** - Full type safety with `SVGProps`
- **Animation** - Animate with CSS or libraries like Framer Motion

## Manual Conversion Steps

### 1. Rename HTML attributes to JSX

```jsx
// HTML SVG
<svg class="icon" stroke-width="2" fill-rule="evenodd">

// React JSX
<svg className="icon" strokeWidth="2" fillRule="evenodd">
```

Key conversions:
- `class` → `className`
- `stroke-width` → `strokeWidth`
- `fill-rule` → `fillRule`
- `clip-path` → `clipPath`
- `stroke-linecap` → `strokeLinecap`

### 2. Remove xmlns

In JSX, `xmlns` is unnecessary:
```jsx
// Remove this
<svg xmlns="http://www.w3.org/2000/svg" ...>
// Keep just
<svg ...>
```

### 3. Wrap in a Component

```tsx
import React from 'react';

const MyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default MyIcon;
```

## Automated Conversion

For large SVG files, manual conversion is tedious. Use the free [SVG to React Converter](https://viadreams.cc/en/tools/svg-to-react) to instantly transform SVG markup into React components with:

- Automatic attribute conversion to camelCase
- `className` replacement
- TypeScript `SVGProps` typing
- Props spread for customization

## Related Tools

- [SVG to JSX Converter](https://viadreams.cc/en/tools/svg-to-jsx) - Convert SVG to JSX without component wrapping
- [HTML to React Converter](https://viadreams.cc/en/tools/html-to-react) - Convert full HTML to React components
- [HTML to JSX Converter](https://viadreams.cc/en/tools/html-to-jsx) - Transform HTML to JSX syntax
