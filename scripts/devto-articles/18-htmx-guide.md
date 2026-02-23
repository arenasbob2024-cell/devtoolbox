---
title: "HTMX in 2026: The Anti-SPA That's Taking Over"
tags: htmx, html, javascript, webdev
canonical_url: https://viadreams.cc/en/blog/htmx-guide-2026
published: true
---

HTMX lets you build interactive web apps using HTML attributes instead of JavaScript frameworks. No build step, no virtual DOM, no npm. Just HTML.

## The Core Idea

Every HTMX interaction is an HTTP request that returns HTML:

```html
<!-- This button makes an AJAX GET request and replaces #result with the response -->
<button hx-get="/api/data" hx-target="#result">
  Load Data
</button>
<div id="result"></div>
```

Your server returns HTML fragments, not JSON. HTMX swaps them into the DOM.

## The Four Core Attributes

```html
<!-- hx-get / hx-post / hx-put / hx-delete: HTTP method -->
<form hx-post="/api/users" hx-target="#users-list">

<!-- hx-target: where to put the response -->
<div hx-get="/search" hx-target="#results">

<!-- hx-trigger: what triggers the request -->
<input hx-get="/search" hx-trigger="keyup changed delay:300ms">

<!-- hx-swap: how to insert the response -->
<ul hx-get="/items" hx-swap="beforeend">
```

## Real-World Pattern: Infinite Scroll

```html
<div id="items">
  {% for item in items %}
    <div>{{ item.name }}</div>
  {% endfor %}
  
  <!-- Last item triggers next page load -->
  <div hx-get="/items?page=2"
       hx-trigger="revealed"
       hx-target="#items"
       hx-swap="beforeend">
    Loading...
  </div>
</div>
```

No JavaScript. Truly zero.

## Click-to-Edit Pattern

```html
<!-- Show mode -->
<div id="username-display">
  John Doe
  <button hx-get="/user/edit" hx-target="#username-display">Edit</button>
</div>

<!-- Server returns this on GET /user/edit -->
<form hx-put="/user" hx-target="#username-display">
  <input name="name" value="John Doe">
  <button type="submit">Save</button>
  <button hx-get="/user/display" hx-target="#username-display">Cancel</button>
</form>
```

## When HTMX Shines

- **Admin dashboards** with lots of CRUD operations
- **Internal tools** where a full SPA is overkill
- **Existing server-rendered apps** (Rails, Django, Laravel) adding interactivity
- **Simple landing pages** with forms

## When HTMX Struggles

- Apps needing complex client-side state
- Real-time collaboration (use WebSockets instead)
- Mobile apps
- When you need fine-grained control over rendering

## The Stack

HTMX pairs beautifully with:
- **Go + Templ** for type-safe HTML templates
- **Python + FastAPI/Jinja2** for rapid development  
- **Rails** (the spiritual home of HTMX)

Use the [HTML Beautifier](https://viadreams.cc/en/tools/html-beautifier) to clean up your HTMX templates before committing.

---

*Full HTMX guide at [viadreams.cc/en/blog/htmx-guide-2026](https://viadreams.cc/en/blog/htmx-guide-2026)*
