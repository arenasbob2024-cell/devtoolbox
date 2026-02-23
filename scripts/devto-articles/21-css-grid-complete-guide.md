---
title: "CSS Grid Complete Guide: Template Areas, Auto-Fill, and Subgrid"
tags: css, webdev, programming, beginners
canonical_url: https://viadreams.cc/en/blog/css-grid-mastery
published: true
---

CSS Grid is the most powerful layout system in CSS. After years of float hacks and flexbox workarounds, Grid makes complex layouts trivial. Here's the complete guide.

## The Mental Model

Grid turns your container into a 2D coordinate system. You define rows and columns, then place items anywhere in that grid.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 columns, middle is twice as wide */
  grid-template-rows: auto 400px auto;
  gap: 20px;
}
```

## Template Areas: The Game Changer

Name your grid areas and place items visually:

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

The ASCII art in your CSS IS your layout. If you can draw it, you can build it.

## Auto-Fill vs Auto-Fit

The responsive grid pattern that replaces media queries:

```css
/* auto-fill: creates as many columns as fit, even empty ones */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

/* auto-fit: collapses empty columns, stretches items to fill */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

This single declaration creates a fully responsive grid — no media queries needed.

## Subgrid: Align Across Components

The newest Grid feature (2024+, now widely supported):

```css
/* Parent grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto; /* image, title, price */
}

/* Child participates in parent grid rows */
.product-card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* uses parent's row definitions */
}
```

Without subgrid: each card's image/title/price heights are independent.
With subgrid: ALL cards align their image/title/price rows across the entire grid.

## Named Lines

```css
.grid {
  grid-template-columns:
    [full-start] 1fr
    [content-start] minmax(0, 65ch)
    [content-end] 1fr
    [full-end];
}

/* Full-bleed element */
.hero { grid-column: full-start / full-end; }

/* Centered content */
.article { grid-column: content-start / content-end; }
```

## Practical: Magazine Layout

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 120px;
  gap: 8px;
}

.featured { grid-column: 1 / 4; grid-row: 1 / 3; }
.secondary { grid-column: 4 / 7; grid-row: 1 / 2; }
.tertiary  { grid-column: 4 / 7; grid-row: 2 / 3; }
.strip     { grid-column: 1 / -1; grid-row: 3 / 4; } /* -1 = last line */
```

## Grid vs Flexbox

Use Grid when:
- 2D layout (rows AND columns matter)
- You know the layout structure ahead of time
- Building page-level layouts

Use Flexbox when:
- 1D layout (row OR column)
- Content drives the size
- Components with unknown number of items

Use the [CSS Tools collection at DevToolBox](https://viadreams.cc/en/blog/css-tools-developers) to format and validate your Grid code.

---

*Full CSS Grid guide at [viadreams.cc/en/blog/css-grid-mastery](https://viadreams.cc/en/blog/css-grid-mastery)*
