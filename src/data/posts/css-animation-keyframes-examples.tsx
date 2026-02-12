'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS animations bring web pages to life without JavaScript. Using <strong>@keyframes</strong> and the <strong>animation</strong> shorthand, you can create everything from subtle fade-ins to complex multi-step sequences. This <strong>complete CSS animation and @keyframes guide</strong> covers syntax, timing functions, performance optimization, accessibility, and dozens of copy-paste examples you can use today.',
    linkGradient: 'Create gradient animations with our CSS Gradient Generator ->',
    linkShadow: 'Animate shadows with our Box Shadow Generator ->',

    h2_keyframes: '1. @keyframes Syntax',
    keyframesDesc: 'The <code>@keyframes</code> at-rule defines the stages of an animation. You give it a name, then describe what CSS properties should apply at each point in the animation timeline. Browsers interpolate smoothly between each defined step.',
    keyframesNaming: 'Naming conventions: use lowercase-kebab-case (e.g., <code>fade-in</code>, <code>slide-up</code>). Avoid generic names like <code>animation1</code>. Names are case-sensitive and must not conflict with CSS keywords like <code>none</code>, <code>inherit</code>, or <code>initial</code>.',

    h2_shorthand: '2. The animation Shorthand',
    shorthandDesc: 'The <code>animation</code> shorthand property combines all animation sub-properties into one declaration. The order matters for disambiguation between duration and delay (the first time value is duration, the second is delay), but otherwise the order is flexible.',
    shorthandProperties: 'The individual sub-properties are: <code>animation-name</code>, <code>animation-duration</code>, <code>animation-timing-function</code>, <code>animation-delay</code>, <code>animation-iteration-count</code>, <code>animation-direction</code>, <code>animation-fill-mode</code>, and <code>animation-play-state</code>.',

    h2_timing: '3. Timing Functions',
    timingDesc: 'Timing functions control the acceleration curve of an animation. They determine how intermediate values are calculated between keyframes, giving animations their character and feel.',
    timingCubic: '<strong>cubic-bezier()</strong> takes four values (x1, y1, x2, y2) defining control points of a cubic Bezier curve. Values outside 0-1 on the y-axis create overshoot/bounce effects. Use browser DevTools or online tools to visualize curves.',
    timingSteps: '<strong>steps()</strong> creates a staircase function, jumping between states instead of interpolating smoothly. The optional second parameter (<code>jump-start</code>, <code>jump-end</code>, <code>jump-both</code>, <code>jump-none</code>) controls when the jump happens. This is essential for sprite sheet animations.',

    h2_common: '4. Common Animations (Copy-Paste)',
    commonDesc: 'These are the most frequently used animations in web development. Each example is production-ready -- just copy the CSS and apply the class to your element.',

    h2_transform: '5. Transform Animations',
    transformDesc: 'The <code>transform</code> property is ideal for animations because it is GPU-accelerated and does not trigger layout recalculations. You can combine multiple transform functions in a single declaration for complex movements.',

    h2_events: '6. Animation Events in JavaScript',
    eventsDesc: 'CSS animations fire three events that you can listen to with JavaScript: <code>animationstart</code>, <code>animationend</code>, and <code>animationiteration</code>. These allow you to synchronize JavaScript logic with CSS animation states.',
    eventsNote: 'Note: The <code>animationend</code> event does not fire if the animation is removed before it completes (e.g., by removing the class). The <code>animationiteration</code> event fires at the end of each iteration except the last one.',

    h2_transition_vs: '7. Transition vs Animation',
    transitionDesc: 'CSS transitions and animations both create movement, but they serve different purposes and have different capabilities. Understanding when to use each is crucial for clean, maintainable CSS.',
    transitionRule: '<strong>Rule of thumb:</strong> Use <code>transition</code> for simple state changes triggered by user interaction (hover, focus, class toggle). Use <code>animation</code> for complex, autonomous, multi-step, or looping movements.',

    h2_performance: '8. Performance Optimization',
    perfDesc: 'Not all CSS properties animate equally. Some trigger expensive layout recalculations, while others are handled entirely by the GPU compositor. Understanding this distinction is key to smooth 60fps animations.',
    perfGpu: '<strong>GPU-accelerated properties:</strong> <code>transform</code> and <code>opacity</code> are composited on the GPU and skip layout and paint. Always prefer these for animations.',
    perfWillChange: '<strong>will-change:</strong> This property hints to the browser that an element will be animated, allowing it to optimize ahead of time. Use it sparingly -- applying <code>will-change</code> to too many elements wastes GPU memory.',
    perfAvoid: '<strong>Avoid animating:</strong> <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code>, <code>padding</code>, <code>border-width</code>, <code>font-size</code>. These trigger layout (reflow), which is the most expensive rendering operation. Use <code>transform: translate()</code> instead of <code>top/left</code>, and <code>transform: scale()</code> instead of <code>width/height</code>.',

    h2_a11y: '9. prefers-reduced-motion (Accessibility)',
    a11yDesc: 'Some users experience motion sickness, seizures, or discomfort from animations. The <code>prefers-reduced-motion</code> media query lets you respect their system preference. This is not optional -- it is an accessibility requirement under WCAG 2.1 (Success Criterion 2.3.3).',
    a11yApproach: 'There are two approaches: (1) <strong>Remove animations</strong> for users who prefer reduced motion, or (2) <strong>Only add animations</strong> for users who have no preference. The second approach (progressive enhancement) is considered safer.',

    h2_spinners: '10. Loading Spinners (Pure CSS)',
    spinnersDesc: 'Loading spinners are one of the most common uses of CSS animation. Here are 5 different styles, all using pure CSS with no JavaScript or images required.',

    h2_scroll: '11. Scroll-Triggered Animations',
    scrollDesc: 'Scroll-triggered animations reveal content as the user scrolls down the page. The modern approach uses the <strong>Intersection Observer API</strong> to add CSS classes when elements enter the viewport, keeping the animation logic in CSS and the trigger logic in minimal JavaScript.',
    scrollNote: 'For a pure-CSS approach, the new <code>animation-timeline: scroll()</code> and <code>animation-timeline: view()</code> properties are supported in Chrome and Edge. They allow scroll-driven animations without any JavaScript.',

    h2_faq: '12. Frequently Asked Questions',
    faq1_q: 'What is the difference between CSS transition and CSS animation?',
    faq1_a: 'CSS transitions require a trigger (like :hover or a class change) and animate between exactly two states (start and end). CSS animations using @keyframes can run automatically, loop infinitely, define multiple intermediate steps, play in reverse, and pause/resume. Use transitions for simple interactive state changes; use animations for complex, autonomous, or multi-step effects.',
    faq2_q: 'How do I make a CSS animation loop forever?',
    faq2_a: 'Set <code>animation-iteration-count: infinite</code> or use the shorthand: <code>animation: spin 1s linear infinite</code>. The animation will repeat indefinitely until the element is removed or the animation property is changed. You can also use <code>animationiteration</code> events in JavaScript to perform actions on each loop.',
    faq3_q: 'Why is my CSS animation janky or stuttering?',
    faq3_a: 'Animation jank is usually caused by animating properties that trigger layout (width, height, top, left, margin) or paint (background-color, box-shadow, border-radius). Instead, use <code>transform</code> and <code>opacity</code>, which are composited on the GPU. Also add <code>will-change: transform</code> to the animated element and ensure you are not animating too many elements simultaneously.',
    faq4_q: 'How do I pause and resume a CSS animation?',
    faq4_a: 'Use the <code>animation-play-state</code> property. Set it to <code>paused</code> to freeze the animation at its current position, and <code>running</code> to resume. Example: <code>.paused { animation-play-state: paused; }</code>. You can toggle this with JavaScript by adding/removing a class. This works for both single and infinite animations.',
    faq5_q: 'How do I trigger a CSS animation when an element scrolls into view?',
    faq5_a: 'Use the Intersection Observer API in JavaScript to detect when an element enters the viewport, then add a CSS class that starts the animation. Define the animation on the class (e.g., <code>.animate-in { animation: fadeIn 0.6s ease forwards; }</code>) and add it when observed. For modern browsers (Chrome/Edge), you can also use the native CSS <code>animation-timeline: view()</code> property for a pure-CSS solution.',

    conclusion: 'CSS animations are a powerful, performant way to enhance user experience. Combined with accessible practices and GPU-optimized properties, they can make any web application feel polished and professional.',
  },
  zh: {
    intro: 'CSS 动画无需 JavaScript 即可让网页焕发生机。使用 <strong>@keyframes</strong> 和 <strong>animation</strong> 简写属性，你可以创建从微妙的淡入到复杂多步骤序列的各种效果。本<strong>完整 CSS 动画与 @keyframes 指南</strong>涵盖语法、时间函数、性能优化、无障碍访问以及数十个可直接复制使用的示例。',
    linkGradient: '使用我们的 CSS 渐变生成器创建渐变动画 ->',
    linkShadow: '使用我们的盒阴影生成器制作阴影动画 ->',

    h2_keyframes: '1. @keyframes 语法',
    keyframesDesc: '<code>@keyframes</code> 规则定义动画的各个阶段。你为它指定一个名称，然后描述在动画时间线的每个点上应该应用什么 CSS 属性。浏览器会在每个定义的步骤之间平滑插值。',
    keyframesNaming: '命名约定：使用小写连字符命名法（例如 <code>fade-in</code>、<code>slide-up</code>）。避免使用 <code>animation1</code> 这样的通用名称。名称区分大小写，且不能与 CSS 关键字（如 <code>none</code>、<code>inherit</code> 或 <code>initial</code>）冲突。',

    h2_shorthand: '2. animation 简写属性',
    shorthandDesc: '<code>animation</code> 简写属性将所有动画子属性合并为一个声明。持续时间和延迟之间的区分取决于顺序（第一个时间值是持续时间，第二个是延迟），其他属性顺序灵活。',
    shorthandProperties: '各个子属性包括：<code>animation-name</code>（名称）、<code>animation-duration</code>（持续时间）、<code>animation-timing-function</code>（时间函数）、<code>animation-delay</code>（延迟）、<code>animation-iteration-count</code>（迭代次数）、<code>animation-direction</code>（方向）、<code>animation-fill-mode</code>（填充模式）和 <code>animation-play-state</code>（播放状态）。',

    h2_timing: '3. 时间函数（Timing Functions）',
    timingDesc: '时间函数控制动画的加速曲线，决定关键帧之间中间值的计算方式，赋予动画独特的节奏和感觉。',
    timingCubic: '<strong>cubic-bezier()</strong> 接受四个值（x1, y1, x2, y2）定义三次贝塞尔曲线的控制点。y 轴超出 0-1 范围的值会产生过冲/弹跳效果。使用浏览器开发者工具或在线工具可视化曲线。',
    timingSteps: '<strong>steps()</strong> 创建阶梯函数，在状态之间跳跃而非平滑插值。可选的第二个参数（<code>jump-start</code>、<code>jump-end</code>、<code>jump-both</code>、<code>jump-none</code>）控制跳跃发生的时机。这对精灵图动画至关重要。',

    h2_common: '4. 常用动画（复制即用）',
    commonDesc: '这些是 Web 开发中最常用的动画效果。每个示例都可以直接用于生产环境——只需复制 CSS 并将类名应用到你的元素上。',

    h2_transform: '5. Transform 变换动画',
    transformDesc: '<code>transform</code> 属性非常适合做动画，因为它由 GPU 加速且不会触发布局重新计算。你可以在一个声明中组合多个变换函数来实现复杂的运动效果。',

    h2_events: '6. JavaScript 中的动画事件',
    eventsDesc: 'CSS 动画触发三个可以用 JavaScript 监听的事件：<code>animationstart</code>（开始）、<code>animationend</code>（结束）和 <code>animationiteration</code>（每次迭代）。这些事件让你可以将 JavaScript 逻辑与 CSS 动画状态同步。',
    eventsNote: '注意：如果动画在完成前被移除（例如移除了类名），<code>animationend</code> 事件不会触发。<code>animationiteration</code> 事件在每次迭代结束时触发，但最后一次迭代除外。',

    h2_transition_vs: '7. Transition 与 Animation 对比',
    transitionDesc: 'CSS 过渡和动画都能创建运动效果，但它们有不同的用途和能力。理解何时使用哪个对于编写整洁、可维护的 CSS 至关重要。',
    transitionRule: '<strong>经验法则：</strong>对用户交互触发的简单状态变化（hover、focus、class 切换）使用 <code>transition</code>。对复杂的、自主的、多步骤的或循环的运动使用 <code>animation</code>。',

    h2_performance: '8. 性能优化',
    perfDesc: '并非所有 CSS 属性动画的性能都相同。有些会触发昂贵的布局重新计算，而有些完全由 GPU 合成器处理。理解这个区别是实现流畅 60fps 动画的关键。',
    perfGpu: '<strong>GPU 加速属性：</strong><code>transform</code> 和 <code>opacity</code> 在 GPU 上合成，跳过布局和绘制阶段。动画应始终优先使用这两个属性。',
    perfWillChange: '<strong>will-change：</strong>此属性向浏览器提示元素将被动画化，使其可以提前优化。但要谨慎使用——对过多元素应用 <code>will-change</code> 会浪费 GPU 内存。',
    perfAvoid: '<strong>避免动画化：</strong><code>width</code>、<code>height</code>、<code>top</code>、<code>left</code>、<code>margin</code>、<code>padding</code>、<code>border-width</code>、<code>font-size</code>。这些会触发布局（回流），是最昂贵的渲染操作。用 <code>transform: translate()</code> 代替 <code>top/left</code>，用 <code>transform: scale()</code> 代替 <code>width/height</code>。',

    h2_a11y: '9. prefers-reduced-motion（无障碍访问）',
    a11yDesc: '部分用户会因动画而感到眩晕、癫痫发作或不适。<code>prefers-reduced-motion</code> 媒体查询让你可以尊重他们的系统偏好设置。这不是可选的——它是 WCAG 2.1（成功标准 2.3.3）下的无障碍要求。',
    a11yApproach: '有两种方法：（1）<strong>为偏好减少动效的用户移除动画</strong>，或（2）<strong>仅为没有偏好的用户添加动画</strong>。第二种方法（渐进增强）被认为更安全。',

    h2_spinners: '10. 加载旋转器（纯 CSS）',
    spinnersDesc: '加载旋转器是 CSS 动画最常见的应用之一。以下是 5 种不同风格，全部使用纯 CSS 实现，无需 JavaScript 或图片。',

    h2_scroll: '11. 滚动触发动画',
    scrollDesc: '滚动触发动画在用户向下滚动页面时逐步展示内容。现代方法使用 <strong>Intersection Observer API</strong> 在元素进入视口时添加 CSS 类，将动画逻辑保留在 CSS 中，触发逻辑使用最少的 JavaScript。',
    scrollNote: '纯 CSS 方案：新的 <code>animation-timeline: scroll()</code> 和 <code>animation-timeline: view()</code> 属性已在 Chrome 和 Edge 中支持，允许无需任何 JavaScript 实现滚动驱动动画。',

    h2_faq: '12. 常见问题',
    faq1_q: 'CSS transition 和 CSS animation 有什么区别？',
    faq1_a: 'CSS 过渡需要触发器（如 :hover 或类名变化），且只能在两个状态（起始和结束）之间动画。CSS 动画使用 @keyframes 可以自动运行、无限循环、定义多个中间步骤、反向播放以及暂停/恢复。简单的交互状态变化用 transition；复杂的、自主的或多步骤效果用 animation。',
    faq2_q: '如何让 CSS 动画无限循环？',
    faq2_a: '设置 <code>animation-iteration-count: infinite</code> 或使用简写：<code>animation: spin 1s linear infinite</code>。动画将无限期重复，直到元素被移除或 animation 属性被更改。你还可以使用 JavaScript 的 <code>animationiteration</code> 事件在每次循环时执行操作。',
    faq3_q: '为什么我的 CSS 动画卡顿或不流畅？',
    faq3_a: '动画卡顿通常是因为对触发布局的属性（width、height、top、left、margin）或绘制的属性（background-color、box-shadow、border-radius）做了动画。应改用 <code>transform</code> 和 <code>opacity</code>，它们在 GPU 上合成。同时给动画元素添加 <code>will-change: transform</code>，并确保不要同时动画化太多元素。',
    faq4_q: '如何暂停和恢复 CSS 动画？',
    faq4_a: '使用 <code>animation-play-state</code> 属性。设为 <code>paused</code> 可在当前位置冻结动画，设为 <code>running</code> 可恢复播放。示例：<code>.paused { animation-play-state: paused; }</code>。你可以用 JavaScript 通过添加/移除类来切换。',
    faq5_q: '如何在元素滚动到视口时触发 CSS 动画？',
    faq5_a: '使用 JavaScript 的 Intersection Observer API 检测元素何时进入视口，然后添加一个启动动画的 CSS 类。在类上定义动画（例如 <code>.animate-in { animation: fadeIn 0.6s ease forwards; }</code>），并在观察到元素时添加该类。对于现代浏览器（Chrome/Edge），还可以使用原生 CSS <code>animation-timeline: view()</code> 属性实现纯 CSS 方案。',

    conclusion: 'CSS 动画是增强用户体验的强大、高性能方式。结合无障碍实践和 GPU 优化属性，它们可以让任何 Web 应用看起来精致而专业。',
  },
};

export default function CssAnimationKeyframesExamples({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />
      <p><Link href={`/${lang}/tools/css-gradient`} style={{ fontWeight: 600 }}>{t.linkGradient}</Link></p>
      <p><Link href={`/${lang}/tools/box-shadow`} style={{ fontWeight: 600 }}>{t.linkShadow}</Link></p>

      {/* Section 1: @keyframes Syntax */}
      <h2>{t.h2_keyframes}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.keyframesDesc }} />

      <h3>from / to (Two-Step)</h3>
      <pre><code>{`/* Simple two-step animation using from/to */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* from = 0%, to = 100% */
.element {
  animation: fade-in 0.5s ease;
}`}</code></pre>

      <h3>Percentage Steps (Multi-Step)</h3>
      <pre><code>{`/* Multi-step animation with percentage keyframes */
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}

/* You can combine from/to with percentages */
@keyframes color-shift {
  0%, 100% { background-color: #3b82f6; }
  25%      { background-color: #8b5cf6; }
  50%      { background-color: #ec4899; }
  75%      { background-color: #f59e0b; }
}`}</code></pre>

      <h3>Multiple Properties in Keyframes</h3>
      <pre><code>{`@keyframes slide-in-fade {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  60% {
    opacity: 1;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.keyframesNaming }} />

      {/* Section 2: animation Shorthand */}
      <h2>{t.h2_shorthand}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.shorthandDesc }} />
      <p dangerouslySetInnerHTML={{ __html: t.shorthandProperties }} />

      <pre><code>{`/* animation shorthand syntax */
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

/* Examples */
animation: fade-in 0.3s ease;
animation: slide-up 0.5s ease-out 0.2s;
animation: spin 1s linear infinite;
animation: bounce 0.6s ease-in-out 0s infinite alternate;
animation: fade-in 0.5s ease forwards;

/* Individual properties (equivalent to above) */
.element {
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

/* Multiple animations on one element */
.element {
  animation:
    fade-in 0.5s ease,
    slide-up 0.5s ease 0.1s,
    color-shift 3s linear infinite;
}

/* fill-mode values */
animation-fill-mode: none;      /* default: no styles applied outside animation */
animation-fill-mode: forwards;  /* retains the final keyframe styles */
animation-fill-mode: backwards; /* applies first keyframe styles during delay */
animation-fill-mode: both;      /* combines forwards + backwards */

/* direction values */
animation-direction: normal;            /* 0% -> 100% */
animation-direction: reverse;           /* 100% -> 0% */
animation-direction: alternate;         /* 0% -> 100% -> 0% -> ... */
animation-direction: alternate-reverse; /* 100% -> 0% -> 100% -> ... */`}</code></pre>

      {/* Section 3: Timing Functions */}
      <h2>{t.h2_timing}</h2>
      <p>{t.timingDesc}</p>

      <pre><code>{`/* Built-in keyword timing functions */
animation-timing-function: ease;        /* default: slow start, fast, slow end */
animation-timing-function: linear;      /* constant speed */
animation-timing-function: ease-in;     /* slow start, fast end */
animation-timing-function: ease-out;    /* fast start, slow end */
animation-timing-function: ease-in-out; /* slow start and end */

/* Equivalent cubic-bezier() values */
ease:        cubic-bezier(0.25, 0.1, 0.25, 1.0)
linear:      cubic-bezier(0.0,  0.0, 1.0,  1.0)
ease-in:     cubic-bezier(0.42, 0.0, 1.0,  1.0)
ease-out:    cubic-bezier(0.0,  0.0, 0.58, 1.0)
ease-in-out: cubic-bezier(0.42, 0.0, 0.58, 1.0)

/* Custom cubic-bezier examples */
animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* back-in-out */
animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);       /* overshoot */
animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);       /* ease-out-cubic */`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.timingCubic }} />

      <pre><code>{`/* steps() function for frame-by-frame animations */
animation-timing-function: steps(4);            /* 4 equal jumps, default jump-end */
animation-timing-function: steps(4, jump-start); /* jump at start of each interval */
animation-timing-function: steps(4, jump-end);   /* jump at end of each interval */
animation-timing-function: steps(4, jump-both);   /* jump at start and end */
animation-timing-function: steps(4, jump-none);   /* no jump at start or end */
animation-timing-function: step-start;           /* = steps(1, jump-start) */
animation-timing-function: step-end;             /* = steps(1, jump-end) */

/* Sprite sheet animation example */
.sprite {
  width: 64px;
  height: 64px;
  background: url('spritesheet.png') 0 0;
  animation: walk 0.8s steps(8) infinite;
}

@keyframes walk {
  to { background-position: -512px 0; } /* 64px * 8 frames = 512px */
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.timingSteps }} />

      {/* Section 4: Common Animations */}
      <h2>{t.h2_common}</h2>
      <p>{t.commonDesc}</p>

      <h3>Fade In</h3>
      <pre><code>{`@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fade-in {
  animation: fadeIn 0.5s ease forwards;
}`}</code></pre>

      <h3>Fade Out</h3>
      <pre><code>{`@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}
.fade-out {
  animation: fadeOut 0.5s ease forwards;
}`}</code></pre>

      <h3>Slide In from Left</h3>
      <pre><code>{`@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.slide-in-left {
  animation: slideInLeft 0.5s ease-out forwards;
}`}</code></pre>

      <h3>Slide In from Bottom</h3>
      <pre><code>{`@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.slide-in-up {
  animation: slideInUp 0.5s ease-out forwards;
}`}</code></pre>

      <h3>Bounce</h3>
      <pre><code>{`@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
.bounce {
  animation: bounce 1s ease infinite;
}`}</code></pre>

      <h3>Pulse</h3>
      <pre><code>{`@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}
.pulse {
  animation: pulse 2s ease-in-out infinite;
}`}</code></pre>

      <h3>Spin</h3>
      <pre><code>{`@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spin {
  animation: spin 1s linear infinite;
}`}</code></pre>

      <h3>Shake</h3>
      <pre><code>{`@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
.shake {
  animation: shake 0.6s ease-in-out;
}

/* Trigger shake on invalid input */
input:invalid:focus {
  animation: shake 0.4s ease-in-out;
}`}</code></pre>

      {/* Section 5: Transform Animations */}
      <h2>{t.h2_transform}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.transformDesc }} />

      <h3>Rotate</h3>
      <pre><code>{`@keyframes rotate360 {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Pendulum swing */
@keyframes pendulum {
  0%   { transform: rotate(-30deg); }
  50%  { transform: rotate(30deg); }
  100% { transform: rotate(-30deg); }
}
.pendulum {
  transform-origin: top center;
  animation: pendulum 2s ease-in-out infinite;
}`}</code></pre>

      <h3>Scale</h3>
      <pre><code>{`/* Pop-in effect */
@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
.pop-in {
  animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

/* Heartbeat */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%      { transform: scale(1.3); }
  28%      { transform: scale(1); }
  42%      { transform: scale(1.3); }
  70%      { transform: scale(1); }
}
.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}`}</code></pre>

      <h3>Translate</h3>
      <pre><code>{`/* Floating effect */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}
.float {
  animation: float 3s ease-in-out infinite;
}

/* Marquee scroll */
@keyframes marquee {
  from { transform: translateX(100%); }
  to   { transform: translateX(-100%); }
}
.marquee {
  animation: marquee 10s linear infinite;
}`}</code></pre>

      <h3>Skew</h3>
      <pre><code>{`@keyframes skewShake {
  0%, 100% { transform: skewX(0deg); }
  25%      { transform: skewX(5deg); }
  75%      { transform: skewX(-5deg); }
}
.skew-shake {
  animation: skewShake 0.5s ease-in-out;
}`}</code></pre>

      <h3>Combined Transforms</h3>
      <pre><code>{`/* Rotate + Scale + Translate combined */
@keyframes complexEntry {
  0% {
    transform: translateY(50px) rotate(-10deg) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 1;
  }
}
.complex-entry {
  animation: complexEntry 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

/* 3D flip */
@keyframes flip {
  0%   { transform: perspective(600px) rotateY(0deg); }
  100% { transform: perspective(600px) rotateY(360deg); }
}
.flip {
  animation: flip 1s ease-in-out;
}`}</code></pre>

      {/* Section 6: Animation Events */}
      <h2>{t.h2_events}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.eventsDesc }} />

      <pre><code>{`const element = document.querySelector('.animated');

// Fires when the animation starts (after any delay)
element.addEventListener('animationstart', (e) => {
  console.log(\`Animation "\${e.animationName}" started\`);
  console.log(\`Duration: \${e.elapsedTime}s\`);
});

// Fires when the animation completes
element.addEventListener('animationend', (e) => {
  console.log(\`Animation "\${e.animationName}" ended\`);
  // Common pattern: remove the animation class after completion
  element.classList.remove('animate');
});

// Fires at the end of each iteration (except the last)
element.addEventListener('animationiteration', (e) => {
  console.log(\`Animation "\${e.animationName}" completed iteration\`);
  console.log(\`Elapsed time: \${e.elapsedTime}s\`);
});`}</code></pre>

      <h3>Practical Example: One-Shot Animation</h3>
      <pre><code>{`/* CSS */
.notification-enter {
  animation: slideInRight 0.4s ease-out forwards;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* JavaScript: remove class after animation so it can replay */
document.querySelectorAll('.notification').forEach(el => {
  el.addEventListener('animationend', () => {
    el.classList.remove('notification-enter');
  });
});

/* Re-trigger: remove and re-add class with a reflow in between */
function triggerAnimation(el) {
  el.classList.remove('notification-enter');
  // Force reflow to restart animation
  void el.offsetWidth;
  el.classList.add('notification-enter');
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.eventsNote }} />

      {/* Section 7: Transition vs Animation */}
      <h2>{t.h2_transition_vs}</h2>
      <p>{t.transitionDesc}</p>

      <div dangerouslySetInnerHTML={{ __html: `
<table style="width:100%;border-collapse:collapse;margin:16px 0">
<thead><tr style="border-bottom:2px solid #334155">
<th style="text-align:left;padding:8px">Feature</th>
<th style="text-align:left;padding:8px">transition</th>
<th style="text-align:left;padding:8px">animation</th>
</tr></thead>
<tbody>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">Trigger required</td><td style="padding:8px">Yes (:hover, :focus, class change)</td><td style="padding:8px">No (auto-plays)</td></tr>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">Number of states</td><td style="padding:8px">2 (start + end)</td><td style="padding:8px">Unlimited (@keyframes)</td></tr>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">Looping</td><td style="padding:8px">No</td><td style="padding:8px">Yes (infinite)</td></tr>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">Direction control</td><td style="padding:8px">Auto-reverses on state change</td><td style="padding:8px">normal, reverse, alternate</td></tr>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">Play state</td><td style="padding:8px">No pause/resume</td><td style="padding:8px">paused / running</td></tr>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">Fill mode</td><td style="padding:8px">Implicit (stays in end state)</td><td style="padding:8px">none, forwards, backwards, both</td></tr>
<tr style="border-bottom:1px solid #1e293b"><td style="padding:8px">JS Events</td><td style="padding:8px">transitionend</td><td style="padding:8px">animationstart, animationend, animationiteration</td></tr>
<tr><td style="padding:8px">Best for</td><td style="padding:8px">Hover effects, toggles, interactive UI</td><td style="padding:8px">Loading states, attention seekers, complex sequences</td></tr>
</tbody></table>
` }} />

      <pre><code>{`/* TRANSITION: hover color change */
.button {
  background: #3b82f6;
  transition: background 0.3s ease, transform 0.2s ease;
}
.button:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* ANIMATION: autonomous pulsing glow */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px #3b82f6; }
  50%      { box-shadow: 0 0 20px #3b82f6, 0 0 40px #3b82f680; }
}
.notification-badge {
  animation: glow 2s ease-in-out infinite;
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.transitionRule }} />

      {/* Section 8: Performance */}
      <h2>{t.h2_performance}</h2>
      <p>{t.perfDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: t.perfGpu }} />

      <pre><code>{`/* GOOD: GPU-accelerated, no layout or paint */
@keyframes slide {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* BAD: triggers layout on every frame */
@keyframes slide-bad {
  from { left: -100%; opacity: 0; }
  to   { left: 0; opacity: 1; }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.perfWillChange }} />

      <pre><code>{`/* Apply will-change before animation starts */
.card {
  will-change: transform;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}

/* Remove will-change after animation completes */
.animated-element {
  will-change: transform, opacity;
}
.animated-element.done {
  will-change: auto; /* release GPU memory */
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.perfAvoid }} />

      <pre><code>{`/* INSTEAD OF animating width: */
/* Bad */
@keyframes expand-bad {
  from { width: 0; }
  to   { width: 200px; }
}

/* Good: use scaleX */
@keyframes expand-good {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
.expand {
  transform-origin: left center;
  animation: expand-good 0.5s ease forwards;
}

/* INSTEAD OF animating top/left: */
/* Bad */
@keyframes move-bad {
  from { top: 0; left: 0; }
  to   { top: 100px; left: 200px; }
}

/* Good: use translate */
@keyframes move-good {
  from { transform: translate(0, 0); }
  to   { transform: translate(200px, 100px); }
}`}</code></pre>

      {/* Section 9: prefers-reduced-motion */}
      <h2>{t.h2_a11y}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.a11yDesc }} />
      <p dangerouslySetInnerHTML={{ __html: t.a11yApproach }} />

      <h3>Approach 1: Remove Animations</h3>
      <pre><code>{`/* Remove all animations and transitions for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</code></pre>

      <h3>Approach 2: Progressive Enhancement (Recommended)</h3>
      <pre><code>{`/* Default: no animation */
.card {
  opacity: 1;
  transform: none;
}

/* Only animate if user has no motion preference */
@media (prefers-reduced-motion: no-preference) {
  .card {
    animation: fadeInUp 0.5s ease forwards;
  }

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
}`}</code></pre>

      <h3>JavaScript Detection</h3>
      <pre><code>{`// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Skip animation, show content immediately
  element.style.opacity = '1';
} else {
  element.classList.add('animate-in');
}

// Listen for changes (user toggles setting)
window.matchMedia('(prefers-reduced-motion: reduce)')
  .addEventListener('change', (e) => {
    if (e.matches) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  });`}</code></pre>

      {/* Section 10: Loading Spinners */}
      <h2>{t.h2_spinners}</h2>
      <p>{t.spinnersDesc}</p>

      <h3>1. Classic Border Spinner</h3>
      <pre><code>{`.spinner-border {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`}</code></pre>

      <h3>2. Dual Ring Spinner</h3>
      <pre><code>{`.spinner-dual {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top-color: #3b82f6;
  border-bottom-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}`}</code></pre>

      <h3>3. Pulsing Dot</h3>
      <pre><code>{`.spinner-pulse {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  animation: pulse-spinner 1.2s ease-in-out infinite;
}

@keyframes pulse-spinner {
  0%, 100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}`}</code></pre>

      <h3>4. Three Bouncing Dots</h3>
      <pre><code>{`.spinner-dots {
  display: flex;
  gap: 6px;
}
.spinner-dots span {
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border-radius: 50%;
  animation: dot-bounce 1.4s ease-in-out infinite;
}
.spinner-dots span:nth-child(1) { animation-delay: 0s; }
.spinner-dots span:nth-child(2) { animation-delay: 0.2s; }
.spinner-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* HTML: <div class="spinner-dots"><span></span><span></span><span></span></div> */`}</code></pre>

      <h3>5. Rotating Squares</h3>
      <pre><code>{`.spinner-squares {
  width: 40px;
  height: 40px;
  position: relative;
}
.spinner-squares::before,
.spinner-squares::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background: #3b82f6;
}
.spinner-squares::before {
  animation: square-rotate 2s ease infinite;
}
.spinner-squares::after {
  animation: square-rotate 2s ease infinite 1s;
  opacity: 0.5;
}

@keyframes square-rotate {
  0%   { transform: rotate(0deg) scale(1); }
  25%  { transform: rotate(90deg) scale(0.6); }
  50%  { transform: rotate(180deg) scale(1); }
  75%  { transform: rotate(270deg) scale(0.6); }
  100% { transform: rotate(360deg) scale(1); }
}`}</code></pre>

      {/* Section 11: Scroll-Triggered Animations */}
      <h2>{t.h2_scroll}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.scrollDesc }} />

      <h3>Intersection Observer + CSS Classes</h3>
      <pre><code>{`/* CSS: define the animation and the initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.reveal.visible .child:nth-child(1) { transition-delay: 0s; }
.reveal.visible .child:nth-child(2) { transition-delay: 0.1s; }
.reveal.visible .child:nth-child(3) { transition-delay: 0.2s; }`}</code></pre>

      <pre><code>{`// JavaScript: Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing after first trigger
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,     // Trigger when 10% visible
    rootMargin: '0px 0px -50px 0px' // Offset trigger point
  }
);

// Observe all elements with the .reveal class
document.querySelectorAll('.reveal').forEach((el) => {
  observer.observe(el);
});`}</code></pre>

      <h3>CSS Scroll-Driven Animations (Chrome / Edge)</h3>
      <pre><code>{`/* Pure CSS scroll-triggered animation (no JavaScript!) */
/* Supported in Chrome 115+ and Edge 115+ */

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

/* Scroll progress bar at top of page */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transform-origin: left;
  animation: scaleProgress linear;
  animation-timeline: scroll();
}

@keyframes scaleProgress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.scrollNote }} />

      {/* Section 12: FAQ */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />
      <h3>{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />
      <h3>{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />
      <h3>{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />
      <h3>{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      <p style={{ marginTop: 32 }}>{t.conclusion}</p>
      <p><Link href={`/${lang}/tools/css-gradient`} style={{ fontWeight: 600 }}>{t.linkGradient}</Link></p>
      <p><Link href={`/${lang}/tools/box-shadow`} style={{ fontWeight: 600 }}>{t.linkShadow}</Link></p>
    </>
  );
}
