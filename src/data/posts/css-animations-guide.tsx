'use client';

import Link from 'next/link';

export default function CssAnimationsGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why CSS Animations Matter</h2>
      <p>
        <strong>CSS animations</strong> bring user interfaces to life. They provide visual feedback, guide attention, improve perceived performance, and make interactions feel smooth and natural. Unlike JavaScript-driven animations, CSS animations are handled by the browser's compositor thread, which means they can run at 60fps without blocking the main thread.
      </p>
      <p>
        This guide takes you from basic transitions through keyframe animations to advanced techniques like staggered animations, scroll-driven animations, and performance optimization. Every example is pure CSS -- no JavaScript animation libraries required.
      </p>

      <h2>CSS Transitions: The Foundation</h2>
      <p>
        Transitions are the simplest form of CSS animation. They smoothly interpolate a property from one value to another when a state change occurs (like hover, focus, or a class toggle).
      </p>

      <h3>Transition Syntax</h3>
      <pre><code className="language-css">{`/* Shorthand */
.element {
  transition: property duration timing-function delay;
}

/* Individual properties */
.element {
  transition-property: transform, opacity, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

/* Common pattern: button hover */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}`}</code></pre>

      <h3>Timing Functions Explained</h3>
      <pre><code className="language-css">{`/* Built-in timing functions */
.ease        { transition-timing-function: ease; }        /* slow start, fast, slow end */
.linear      { transition-timing-function: linear; }      /* constant speed */
.ease-in     { transition-timing-function: ease-in; }     /* slow start */
.ease-out    { transition-timing-function: ease-out; }    /* slow end */
.ease-in-out { transition-timing-function: ease-in-out; } /* slow start and end */

/* Custom cubic-bezier curves */
.snappy      { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
.bounce-out  { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
.smooth      { transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); }

/* Step functions */
.typewriter  { transition-timing-function: steps(20, end); }
.flip        { transition-timing-function: steps(1, end); }`}</code></pre>

      <h3>Transition Examples</h3>
      <pre><code className="language-css">{`/* Card hover lift effect */
.card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* Link underline animation */
.link {
  position: relative;
  text-decoration: none;
}
.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}
.link:hover::after {
  width: 100%;
}

/* Input focus effect */
.input {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 16px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}`}</code></pre>

      <h2>CSS Keyframe Animations</h2>
      <p>
        Keyframe animations offer much more control than transitions. You define named animation sequences with <code>@keyframes</code> and apply them to elements. Keyframes can animate through multiple states, run infinitely, and start automatically without user interaction.
      </p>

      <h3>Keyframe Syntax</h3>
      <pre><code className="language-css">{`/* Define the animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Apply the animation */
.element {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

/* Shorthand */
.element {
  animation: slideIn 0.5s ease-out forwards;
}`}</code></pre>

      <h3>Multi-Step Animations</h3>
      <pre><code className="language-css">{`/* Bounce animation with multiple keyframes */
@keyframes bounce {
  0%   { transform: translateY(0); }
  20%  { transform: translateY(-30px); }
  40%  { transform: translateY(0); }
  60%  { transform: translateY(-15px); }
  80%  { transform: translateY(0); }
  100% { transform: translateY(-5px); }
}

.bounce {
  animation: bounce 1s ease-in-out;
}

/* Pulse effect */
@keyframes pulse {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Rotate with color change */
@keyframes spinColor {
  0%   { transform: rotate(0deg); background-color: #ef4444; }
  25%  { transform: rotate(90deg); background-color: #eab308; }
  50%  { transform: rotate(180deg); background-color: #22c55e; }
  75%  { transform: rotate(270deg); background-color: #3b82f6; }
  100% { transform: rotate(360deg); background-color: #ef4444; }
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  animation: spinColor 2s linear infinite;
}`}</code></pre>

      <h2>Loading Animations</h2>
      <p>
        Loading indicators are one of the most common uses of CSS animations. Here are production-ready examples you can copy directly into your projects.
      </p>
      <pre><code className="language-css">{`/* Spinning loader */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Three dots loader */
@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(0); opacity: 0; }
  40% { transform: scale(1); opacity: 1; }
}

.dots-loader {
  display: flex;
  gap: 8px;
}
.dots-loader span {
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  animation: dotPulse 1.4s ease-in-out infinite;
}
.dots-loader span:nth-child(1) { animation-delay: 0s; }
.dots-loader span:nth-child(2) { animation-delay: 0.2s; }
.dots-loader span:nth-child(3) { animation-delay: 0.4s; }

/* Skeleton loading shimmer */
@keyframes shimmer {
  0%   { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* Progress bar */
@keyframes progressBar {
  0%   { width: 0%; }
  100% { width: 100%; }
}

.progress-bar {
  height: 4px;
  background: #3b82f6;
  border-radius: 2px;
  animation: progressBar 2s ease-in-out;
  animation-fill-mode: forwards;
}`}</code></pre>

      <h2>Entrance and Exit Animations</h2>
      <pre><code className="language-css">{`/* Fade in from bottom */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* Fade in from left */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale in (zoom) */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide down (for dropdowns) */
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
}

/* Modal overlay */
@keyframes overlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-overlay {
  animation: overlayIn 0.2s ease-out;
}
.modal-content {
  animation: modalIn 0.3s ease-out;
}`}</code></pre>

      <h2>Staggered Animations</h2>
      <p>
        Staggered animations apply the same animation to multiple elements with increasing delays, creating a cascading effect. This technique is especially effective for lists, grids, and navigation menus.
      </p>
      <pre><code className="language-css">{`/* Staggered list items */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-list li {
  opacity: 0;
  animation: fadeInUp 0.4s ease-out forwards;
}

.stagger-list li:nth-child(1)  { animation-delay: 0.0s; }
.stagger-list li:nth-child(2)  { animation-delay: 0.1s; }
.stagger-list li:nth-child(3)  { animation-delay: 0.2s; }
.stagger-list li:nth-child(4)  { animation-delay: 0.3s; }
.stagger-list li:nth-child(5)  { animation-delay: 0.4s; }
.stagger-list li:nth-child(6)  { animation-delay: 0.5s; }

/* Using CSS custom properties for dynamic stagger */
.stagger-grid > * {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: calc(var(--i, 0) * 0.1s);
}

/* In HTML: style="--i: 0", style="--i: 1", etc. */`}</code></pre>

      <h2>Advanced Techniques</h2>

      <h3>Scroll-Driven Animations (CSS 2026)</h3>
      <pre><code className="language-css">{`/* Modern scroll-driven animation (Chrome 115+) */
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

/* Progress bar linked to scroll position */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #3b82f6;
  transform-origin: left;
  animation: scaleX linear;
  animation-timeline: scroll();
}

@keyframes scaleX {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`}</code></pre>

      <h3>Reduced Motion Accessibility</h3>
      <pre><code className="language-css">{`/* IMPORTANT: Always respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Alternative: provide subtle animations only */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* For elements that MUST animate (e.g., loading indicators) */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 3s; /* Slow down instead of removing */
  }
}`}</code></pre>

      <h3>CSS Animation with Container Queries</h3>
      <pre><code className="language-css">{`/* Adapt animations based on container size */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    animation: slideInRight 0.5s ease-out;
  }
}

@container (max-width: 399px) {
  .card {
    animation: fadeIn 0.3s ease-out;
  }
}`}</code></pre>

      <h2>Performance Optimization</h2>
      <p>
        Not all CSS properties animate equally well. For smooth 60fps animations, stick to properties that trigger only compositing -- <code>transform</code> and <code>opacity</code>. Avoid animating properties that trigger layout (width, height, top, left) or paint (background-color, box-shadow).
      </p>

      <h3>Performance Tiers</h3>
      <table>
        <thead>
          <tr><th>Tier</th><th>Properties</th><th>Performance</th></tr>
        </thead>
        <tbody>
          <tr><td>Best (Composite only)</td><td>transform, opacity</td><td>60fps, GPU-accelerated</td></tr>
          <tr><td>Good (Paint only)</td><td>color, background-color, box-shadow</td><td>Usually smooth</td></tr>
          <tr><td>Avoid (Layout trigger)</td><td>width, height, top, left, margin, padding</td><td>Causes reflow, janky</td></tr>
        </tbody>
      </table>

      <h3>Performance Best Practices</h3>
      <pre><code className="language-css">{`/* GOOD: Use transform instead of top/left */
.good {
  transition: transform 0.3s ease;
}
.good:hover {
  transform: translateX(100px);
}

/* BAD: Animating left triggers layout */
.bad {
  transition: left 0.3s ease;
  position: relative;
}
.bad:hover {
  left: 100px;
}

/* Promote to GPU layer for complex animations */
.gpu-accelerated {
  will-change: transform;
  /* or */
  transform: translateZ(0); /* hack for older browsers */
}

/* Remove will-change after animation completes */
.element {
  will-change: transform, opacity;
  animation: fadeInUp 0.5s ease-out forwards;
}
.element.animation-done {
  will-change: auto;
}

/* Use contain for isolated animations */
.animated-card {
  contain: layout style paint;
}`}</code></pre>

      <h2>Common Animation Patterns Reference</h2>
      <table>
        <thead>
          <tr><th>Pattern</th><th>Properties to Animate</th><th>Duration</th></tr>
        </thead>
        <tbody>
          <tr><td>Button hover</td><td>transform, box-shadow</td><td>0.15-0.25s</td></tr>
          <tr><td>Page transitions</td><td>opacity, transform</td><td>0.3-0.5s</td></tr>
          <tr><td>Modal open/close</td><td>opacity, transform (scale)</td><td>0.2-0.3s</td></tr>
          <tr><td>Dropdown menu</td><td>opacity, transform (translateY)</td><td>0.15-0.2s</td></tr>
          <tr><td>Toast notification</td><td>transform (translateX), opacity</td><td>0.3-0.5s</td></tr>
          <tr><td>Loading spinner</td><td>transform (rotate)</td><td>0.6-1.2s</td></tr>
          <tr><td>Skeleton shimmer</td><td>background-position</td><td>1-2s</td></tr>
          <tr><td>Scroll reveal</td><td>opacity, transform (translateY)</td><td>0.4-0.6s</td></tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>
        CSS animations are an essential skill for modern web development. Start with transitions for interactive feedback (hover, focus), move to keyframe animations for loading states and entrance effects, and apply advanced techniques like staggered and scroll-driven animations as your UI matures. Always prioritize performance by animating <code>transform</code> and <code>opacity</code>, and always respect <code>prefers-reduced-motion</code> for accessibility.
      </p>
      <p>
        Create gradient backgrounds with our <Link href={`/${lang}/tools/css-gradient`}>CSS Gradient Generator</Link>, explore <Link href={`/${lang}/blog/css-flexbox-cheat-sheet`}>CSS Flexbox Cheat Sheet</Link>, or try the <Link href={`/${lang}/blog/css-grid-layout-cheat-sheet`}>CSS Grid Cheat Sheet</Link> for layout techniques that pair perfectly with animations.
      </p>
    </>
  );
}
