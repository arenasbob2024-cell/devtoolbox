---
title: "Converting HTML to React Components: A Practical Guide"
tags: react, html, javascript, webdev
canonical_url: https://viadreams.cc/en/tools/html-to-react
published: true
---

Migrating HTML templates to React? Here's what you need to know about converting HTML to React components.

## Key Differences: HTML vs JSX

### 1. class → className

```jsx
// HTML
<div class="container">

// React JSX
<div className="container">
```

### 2. for → htmlFor

```jsx
// HTML
<label for="email">Email</label>

// React JSX
<label htmlFor="email">Email</label>
```

### 3. Inline styles become objects

```jsx
// HTML
<div style="background-color: red; font-size: 14px;">

// React JSX
<div style={{ backgroundColor: 'red', fontSize: '14px' }}>
```

### 4. Self-closing tags

```jsx
// HTML (optional closing)
<img src="photo.jpg">
<br>
<input type="text">

// React JSX (required self-closing)
<img src="photo.jpg" />
<br />
<input type="text" />
```

### 5. Event handlers

```jsx
// HTML
<button onclick="handleClick()">

// React JSX
<button onClick={handleClick}>
```

## Automated Conversion

For large HTML files, use the free [HTML to React Converter](https://viadreams.cc/en/tools/html-to-react) to automatically:

- Convert `class` to `className`
- Convert `for` to `htmlFor`
- Transform inline styles to React objects
- Fix self-closing tags
- Rename event handlers to camelCase
- Wrap output in a functional component

## When to Use

- Migrating legacy HTML templates to React
- Converting HTML from design tools (Figma HTML export)
- Porting server-rendered templates to client-side React
- Converting email templates to React Email components

## Related Tools

- [HTML to JSX](https://viadreams.cc/en/tools/html-to-jsx) - Convert without component wrapping
- [SVG to React](https://viadreams.cc/en/tools/svg-to-react) - Convert SVG to React components
- [CSS to Tailwind](https://viadreams.cc/en/tools/css-to-tailwind) - Convert CSS to Tailwind classes
