'use client';
import React from 'react';
const translations = {
  en: {
    title: 'D3.js Complete Guide: Data-Driven Visualizations for the Web',
    description:
      'Master D3.js from fundamentals to advanced techniques: selections, data binding, scales, axes, SVG, bar charts, line charts, pie charts, transitions, event handling, responsive design, D3 with React, GeoJSON maps, and force-directed graphs.',
  },
  zh: {
    title: 'D3.js 完全指南：Web 数据驱动可视化',
    description:
      '从基础到高级全面掌握 D3.js：选择集、数据绑定、比例尺、坐标轴、SVG、柱状图、折线图、饼图、过渡动画、事件处理、响应式设计、D3 与 React 集成、GeoJSON 地图和力导向图。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is D3.js and what is it used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D3.js (Data-Driven Documents) is a JavaScript library for creating dynamic, interactive data visualizations in the browser using SVG, HTML, and CSS. It binds data to DOM elements and applies data-driven transformations to create charts, maps, graphs, and dashboards. Unlike charting libraries like Chart.js, D3 gives you full control over every visual element.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install D3.js in my project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install D3 via npm with "npm install d3" and import it as "import * as d3 from \'d3\'". You can also import individual modules like d3-scale or d3-selection for smaller bundles. Alternatively, load it from a CDN with a script tag pointing to https://cdn.jsdelivr.net/npm/d3@7.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between d3.select and d3.selectAll?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'd3.select() selects the first matching DOM element, while d3.selectAll() selects all matching elements. Both accept CSS selectors. Selections are the foundation of D3 — they let you bind data, modify attributes, set styles, and append elements. You chain methods on selections like d3.selectAll("rect").attr("fill", "blue").',
      },
    },
    {
      '@type': 'Question',
      name: 'How does D3 data binding work with enter, update, and exit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D3 data binding connects data arrays to DOM elements. The enter() selection handles new data that needs new elements. The update selection handles existing elements with new data. The exit() selection handles elements that no longer have data and should be removed. In D3 v7, the join() method simplifies this pattern by handling enter, update, and exit in one call.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are D3 scales and why are they important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'D3 scales map data values (domain) to visual values (range) such as pixel positions, colors, or sizes. scaleLinear maps continuous numbers, scaleBand maps categories to equal-width bands, scaleTime maps dates, and scaleLog uses logarithmic mapping. Scales are essential for converting raw data into coordinates that fit your chart dimensions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use D3.js with React?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The recommended pattern is to use a React useRef to get a reference to an SVG or div element, then use useEffect to run D3 code that manipulates that element. React owns the component lifecycle while D3 handles the SVG rendering. Clear the container in useEffect before rendering to handle updates. For simple charts, you can also use React to render SVG directly and only use D3 for scales and utilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create responsive charts with D3.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the viewBox attribute on SVG elements instead of fixed width/height to make charts scale automatically. Set viewBox="0 0 width height" and use CSS to set the SVG width to 100%. Alternatively, use a ResizeObserver to detect container size changes and redraw the chart. Always calculate dimensions from the container rather than hardcoding pixel values.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can D3.js create maps and geographic visualizations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, D3 has powerful geographic capabilities. Use d3-geo projections (geoMercator, geoAlbersUsa, geoNaturalEarth1) to convert longitude/latitude to screen coordinates. Load GeoJSON or TopoJSON data, create a geoPath generator, and render country/region shapes as SVG paths. D3 supports choropleth maps, point maps, and custom projections for any geographic visualization.',
      },
    },
  ],
};

export default function D3Guide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '1.05rem' }}>
          TL;DR
        </strong>
        {isZh
          ? 'D3.js 是最强大的 Web 数据可视化库，通过将数据绑定到 DOM 元素来创建动态交互式图表。使用 select/selectAll 选择元素，用 data/enter/exit/join 绑定数据，用 scaleLinear/scaleBand/scaleTime 映射数据到像素，用 transition 添加动画。在 React 中通过 useRef + useEffect 集成 D3。支持 SVG 柱状图、折线图、饼图、地图和力导向图。'
          : 'D3.js is the most powerful web data visualization library, creating dynamic interactive charts by binding data to DOM elements. Use select/selectAll for element selection, data/enter/exit/join for data binding, scaleLinear/scaleBand/scaleTime for mapping data to pixels, and transition for animations. Integrate D3 in React via useRef + useEffect. Supports SVG bar charts, line charts, pie charts, maps, and force-directed graphs.'}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.05rem' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ ...ulStyle, marginBottom: '0' }}>
          <li>{isZh ? 'D3 通过 select/selectAll 操作 DOM，用 data() 将数组绑定到元素' : 'D3 manipulates the DOM via select/selectAll and binds arrays to elements with data()'}</li>
          <li>{isZh ? 'enter/exit/join 模式处理新增、更新和删除的数据元素' : 'The enter/exit/join pattern handles new, updated, and removed data elements'}</li>
          <li>{isZh ? '比例尺（scales）是核心：scaleLinear 用于连续数据，scaleBand 用于类别' : 'Scales are core: scaleLinear for continuous data, scaleBand for categories'}</li>
          <li>{isZh ? '使用 transition() 和 duration() 添加平滑动画效果' : 'Add smooth animations with transition() and duration()'}</li>
          <li>{isZh ? '在 React 中使用 useRef 获取容器引用，useEffect 中运行 D3 代码' : 'In React, use useRef for the container reference and run D3 code in useEffect'}</li>
          <li>{isZh ? 'SVG viewBox 属性实现响应式图表，配合 ResizeObserver 动态调整' : 'SVG viewBox enables responsive charts, combine with ResizeObserver for dynamic sizing'}</li>
          <li>{isZh ? 'D3-geo 支持 GeoJSON 地图，d3-force 支持力导向网络图' : 'D3-geo supports GeoJSON maps, d3-force supports force-directed network graphs'}</li>
        </ul>
      </div>

      {/* 1. What is D3.js */}
      <h2 style={h2Style}>{isZh ? '1. 什么是 D3.js' : '1. What Is D3.js'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'D3.js（Data-Driven Documents）是一个用于创建数据驱动的交互式可视化的 JavaScript 库。由 Mike Bostock 于 2011 年创建，它不是一个图表库——而是一个低级别的可视化工具集，让你完全控制从数据到像素的每一步转换。D3 使用 SVG、HTML 和 CSS 渲染可视化，在所有现代浏览器中都能运行。'
          : 'D3.js (Data-Driven Documents) is a JavaScript library for creating data-driven interactive visualizations. Created by Mike Bostock in 2011, it is not a charting library — it is a low-level visualization toolkit that gives you complete control over every step from data to pixels. D3 renders visualizations using SVG, HTML, and CSS, running in all modern browsers.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '与 Chart.js 或 Recharts 等高级图表库不同，D3 不提供预制的图表组件。它提供的是构建任何可视化所需的基本工具：DOM 操作、数据绑定、比例尺、形状生成器、布局算法和过渡动画。这种灵活性使 D3 成为 New York Times、Observable 和数千个数据可视化项目的首选。'
          : 'Unlike high-level charting libraries such as Chart.js or Recharts, D3 does not provide pre-built chart components. Instead, it provides the fundamental tools to build any visualization: DOM manipulation, data binding, scales, shape generators, layout algorithms, and transitions. This flexibility makes D3 the choice of the New York Times, Observable, and thousands of data visualization projects.'}
      </p>

      {/* 2. Installation & Setup */}
      <h2 style={h2Style}>{isZh ? '2. 安装与设置' : '2. Installation and Setup'}</h2>
      <h3 style={h3Style}>{isZh ? '通过 npm 安装' : 'Install via npm'}</h3>
      <pre style={preStyle}><code>{'npm install d3\n' +
'# or\n' +
'yarn add d3\n\n' +
'# TypeScript types\n' +
'npm install @types/d3 --save-dev'}</code></pre>

      <h3 style={h3Style}>{isZh ? '导入方式' : 'Import Options'}</h3>
      <pre style={preStyle}><code>{'// Import everything\n' +
'import * as d3 from "d3";\n\n' +
'// Import only what you need (smaller bundle)\n' +
'import { select, selectAll } from "d3-selection";\n' +
'import { scaleLinear, scaleBand } from "d3-scale";\n' +
'import { axisBottom, axisLeft } from "d3-axis";\n' +
'import { line, area, pie, arc } from "d3-shape";\n' +
'import { transition } from "d3-transition";'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'CDN 方式' : 'CDN Script Tag'}</h3>
      <pre style={preStyle}><code>{'<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>\n' +
'<script>\n' +
'  // d3 is available as a global\n' +
'  d3.select("body").append("h1").text("Hello D3!");\n' +
'</script>'}</code></pre>

      {/* 3. Selections */}
      <h2 style={h2Style}>{isZh ? '3. 选择集：select 与 selectAll' : '3. Selections: select and selectAll'}</h2>
      <p style={pStyle}>
        {isZh
          ? '选择集是 D3 的核心。d3.select() 选择第一个匹配的 DOM 元素，d3.selectAll() 选择所有匹配元素。选择集支持链式调用来修改属性、样式和内容。'
          : 'Selections are the core of D3. d3.select() picks the first matching DOM element, d3.selectAll() picks all matching elements. Selections support method chaining to modify attributes, styles, and content.'}
      </p>
      <pre style={preStyle}><code>{'// Select a single element\n' +
'const svg = d3.select("#chart");\n\n' +
'// Select all matching elements\n' +
'const circles = d3.selectAll("circle");\n\n' +
'// Chain attribute and style modifications\n' +
'd3.selectAll("rect")\n' +
'  .attr("width", 50)\n' +
'  .attr("height", 30)\n' +
'  .attr("fill", "#3b82f6")\n' +
'  .style("opacity", 0.8);\n\n' +
'// Append new elements\n' +
'd3.select("#chart")\n' +
'  .append("svg")\n' +
'  .attr("width", 600)\n' +
'  .attr("height", 400)\n' +
'  .append("circle")\n' +
'  .attr("cx", 100)\n' +
'  .attr("cy", 100)\n' +
'  .attr("r", 40)\n' +
'  .attr("fill", "tomato");'}</code></pre>

      {/* 4. Data Binding */}
      <h2 style={h2Style}>{isZh ? '4. 数据绑定：data / enter / exit / join' : '4. Data Binding: data / enter / exit / join'}</h2>
      <p style={pStyle}>
        {isZh
          ? '数据绑定是 D3 最强大的特性。data() 方法将数组与 DOM 元素关联。当数据项多于元素时，enter() 处理新增项；当元素多于数据时，exit() 处理删除项；update 选择集处理已有元素的更新。'
          : 'Data binding is the most powerful feature of D3. The data() method associates an array with DOM elements. When there are more data items than elements, enter() handles new items. When there are more elements than data, exit() handles removals. The update selection handles existing elements.'}
      </p>

      <h3 style={h3Style}>{isZh ? '经典 enter/exit 模式' : 'Classic enter/exit Pattern'}</h3>
      <pre style={preStyle}><code>{'const data = [10, 20, 35, 50, 25];\n\n' +
'// Select all rects (initially none exist)\n' +
'const bars = svg.selectAll("rect")\n' +
'  .data(data);\n\n' +
'// Enter: create new elements for new data\n' +
'bars.enter()\n' +
'  .append("rect")\n' +
'  .attr("x", (d, i) => i * 60)\n' +
'  .attr("y", (d) => 200 - d * 3)\n' +
'  .attr("width", 50)\n' +
'  .attr("height", (d) => d * 3)\n' +
'  .attr("fill", "#3b82f6");\n\n' +
'// Exit: remove elements without data\n' +
'bars.exit().remove();'}</code></pre>

      <h3 style={h3Style}>{isZh ? '现代 join 方法（D3 v5+）' : 'Modern join Method (D3 v5+)'}</h3>
      <pre style={preStyle}><code>{'const data = [10, 20, 35, 50, 25];\n\n' +
'// join() handles enter, update, and exit in one call\n' +
'svg.selectAll("rect")\n' +
'  .data(data)\n' +
'  .join("rect")\n' +
'  .attr("x", (d, i) => i * 60)\n' +
'  .attr("y", (d) => 200 - d * 3)\n' +
'  .attr("width", 50)\n' +
'  .attr("height", (d) => d * 3)\n' +
'  .attr("fill", "#3b82f6");\n\n' +
'// join() with enter/update/exit callbacks\n' +
'svg.selectAll("rect")\n' +
'  .data(data)\n' +
'  .join(\n' +
'    (enter) => enter.append("rect")\n' +
'      .attr("fill", "green"),\n' +
'    (update) => update\n' +
'      .attr("fill", "blue"),\n' +
'    (exit) => exit\n' +
'      .attr("fill", "red")\n' +
'      .transition().duration(500)\n' +
'      .attr("opacity", 0)\n' +
'      .remove()\n' +
'  );'}</code></pre>

      {/* 5. Scales */}
      <h2 style={h2Style}>{isZh ? '5. 比例尺（Scales）' : '5. Scales'}</h2>
      <p style={pStyle}>
        {isZh
          ? '比例尺将数据值（domain）映射到视觉值（range），如像素位置、颜色或大小。它们是构建图表的核心工具。'
          : 'Scales map data values (domain) to visual values (range) such as pixel positions, colors, or sizes. They are the core tool for building charts.'}
      </p>

      <h3 style={h3Style}>{isZh ? '线性比例尺 (scaleLinear)' : 'Linear Scale (scaleLinear)'}</h3>
      <pre style={preStyle}><code>{'// Map data 0-100 to pixels 0-500\n' +
'const xScale = d3.scaleLinear()\n' +
'  .domain([0, 100])     // data range\n' +
'  .range([0, 500]);     // pixel range\n\n' +
'xScale(50);   // 250\n' +
'xScale(100);  // 500\n' +
'xScale.invert(250);  // 50 (reverse lookup)'}</code></pre>

      <h3 style={h3Style}>{isZh ? '序数比例尺 (scaleBand)' : 'Band Scale (scaleBand)'}</h3>
      <pre style={preStyle}><code>{'// Map categories to equal-width bands\n' +
'const xScale = d3.scaleBand()\n' +
'  .domain(["Mon", "Tue", "Wed", "Thu", "Fri"])\n' +
'  .range([0, 500])\n' +
'  .padding(0.2);  // gap between bands\n\n' +
'xScale("Wed");           // 200 (pixel position)\n' +
'xScale.bandwidth();      // 80 (width of each band)'}</code></pre>

      <h3 style={h3Style}>{isZh ? '时间比例尺与对数比例尺' : 'Time Scale and Log Scale'}</h3>
      <pre style={preStyle}><code>{'// Time scale\n' +
'const timeScale = d3.scaleTime()\n' +
'  .domain([new Date("2025-01-01"), new Date("2025-12-31")])\n' +
'  .range([0, 800]);\n\n' +
'// Log scale (useful for data spanning orders of magnitude)\n' +
'const logScale = d3.scaleLog()\n' +
'  .domain([1, 10000])\n' +
'  .range([0, 500]);\n\n' +
'// Color scale\n' +
'const colorScale = d3.scaleOrdinal(d3.schemeCategory10)\n' +
'  .domain(["A", "B", "C", "D"]);'}</code></pre>

      {/* 6. Axes */}
      <h2 style={h2Style}>{isZh ? '6. 坐标轴' : '6. Axes'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'D3 坐标轴生成器自动从比例尺创建 SVG 刻度线、标签和参考线。使用 axisBottom、axisLeft、axisTop 和 axisRight 设置方向。'
          : 'D3 axis generators automatically create SVG tick marks, labels, and reference lines from a scale. Use axisBottom, axisLeft, axisTop, and axisRight to set direction.'}
      </p>
      <pre style={preStyle}><code>{'const margin = { top: 20, right: 20, bottom: 40, left: 50 };\n' +
'const width = 600 - margin.left - margin.right;\n' +
'const height = 400 - margin.top - margin.bottom;\n\n' +
'const svg = d3.select("#chart")\n' +
'  .append("svg")\n' +
'  .attr("width", width + margin.left + margin.right)\n' +
'  .attr("height", height + margin.top + margin.bottom)\n' +
'  .append("g")\n' +
'  .attr("transform",\n' +
'    "translate(" + margin.left + "," + margin.top + ")");\n\n' +
'const xScale = d3.scaleLinear()\n' +
'  .domain([0, 100]).range([0, width]);\n' +
'const yScale = d3.scaleLinear()\n' +
'  .domain([0, 500]).range([height, 0]);\n\n' +
'// Add bottom axis\n' +
'svg.append("g")\n' +
'  .attr("transform", "translate(0," + height + ")")\n' +
'  .call(d3.axisBottom(xScale).ticks(10));\n\n' +
'// Add left axis\n' +
'svg.append("g")\n' +
'  .call(d3.axisLeft(yScale)\n' +
'    .ticks(5)\n' +
'    .tickFormat(d => "\\$" + d));'}</code></pre>

      {/* 7. SVG Basics */}
      <h2 style={h2Style}>{isZh ? '7. SVG 基础' : '7. SVG Basics for D3'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'D3 主要使用 SVG 进行渲染。理解核心 SVG 元素对于使用 D3 至关重要。SVG 坐标系原点在左上角，y 轴向下递增。'
          : 'D3 primarily uses SVG for rendering. Understanding core SVG elements is essential for working with D3. The SVG coordinate system has its origin at the top-left, with y increasing downward.'}
      </p>
      <pre style={preStyle}><code>{'<!-- Core SVG elements used in D3 -->\n' +
'<svg width="400" height="300">\n' +
'  <!-- Rectangle: x, y, width, height -->\n' +
'  <rect x="10" y="10" width="80" height="50"\n' +
'    fill="#3b82f6" rx="4" />\n\n' +
'  <!-- Circle: cx, cy, r -->\n' +
'  <circle cx="200" cy="100" r="30"\n' +
'    fill="#ef4444" stroke="#000" stroke-width="2" />\n\n' +
'  <!-- Line: x1, y1, x2, y2 -->\n' +
'  <line x1="10" y1="200" x2="390" y2="200"\n' +
'    stroke="#94a3b8" stroke-width="1" />\n\n' +
'  <!-- Path: the most powerful SVG element -->\n' +
'  <path d="M10 250 L100 200 L200 230 L300 180"\n' +
'    fill="none" stroke="#10b981" stroke-width="2" />\n\n' +
'  <!-- Text -->\n' +
'  <text x="200" y="290" text-anchor="middle"\n' +
'    font-size="14">Label</text>\n' +
'  <!-- Group: transform applies to all children -->\n' +
'  <g transform="translate(50, 50)">\n' +
'    <rect width="20" height="20" fill="#8b5cf6" />\n' +
'  </g>\n' +
'</svg>'}</code></pre>

      {/* 8. Bar Chart */}
      <h2 style={h2Style}>{isZh ? '8. 柱状图' : '8. Bar Chart'}</h2>
      <p style={pStyle}>
        {isZh
          ? '柱状图是最常见的 D3 图表类型。下面是一个完整的垂直柱状图示例，包含比例尺、坐标轴和数据标签。'
          : 'Bar charts are the most common D3 chart type. Below is a complete vertical bar chart example with scales, axes, and data labels.'}
      </p>
      <pre style={preStyle}><code>{'const data = [\n' +
'  { label: "React", value: 42 },\n' +
'  { label: "Vue", value: 30 },\n' +
'  { label: "Angular", value: 22 },\n' +
'  { label: "Svelte", value: 18 },\n' +
'  { label: "Solid", value: 12 },\n' +
'];\n\n' +
'const margin = { top: 20, right: 20, bottom: 40, left: 50 };\n' +
'const width = 500 - margin.left - margin.right;\n' +
'const height = 300 - margin.top - margin.bottom;\n\n' +
'const svg = d3.select("#bar-chart")\n' +
'  .append("svg")\n' +
'  .attr("width", width + margin.left + margin.right)\n' +
'  .attr("height", height + margin.top + margin.bottom)\n' +
'  .append("g")\n' +
'  .attr("transform",\n' +
'    "translate(" + margin.left + "," + margin.top + ")");\n\n' +
'const x = d3.scaleBand()\n' +
'  .domain(data.map((d) => d.label))\n' +
'  .range([0, width])\n' +
'  .padding(0.2);\n\n' +
'const y = d3.scaleLinear()\n' +
'  .domain([0, d3.max(data, (d) => d.value)])\n' +
'  .range([height, 0]);\n\n' +
'// Axes\n' +
'svg.append("g")\n' +
'  .attr("transform", "translate(0," + height + ")")\n' +
'  .call(d3.axisBottom(x));\n' +
'svg.append("g").call(d3.axisLeft(y));\n\n' +
'// Bars\n' +
'svg.selectAll("rect")\n' +
'  .data(data)\n' +
'  .join("rect")\n' +
'  .attr("x", (d) => x(d.label))\n' +
'  .attr("y", (d) => y(d.value))\n' +
'  .attr("width", x.bandwidth())\n' +
'  .attr("height", (d) => height - y(d.value))\n' +
'  .attr("fill", "#3b82f6")\n' +
'  .attr("rx", 4);'}</code></pre>

      {/* 9. Line Chart */}
      <h2 style={h2Style}>{isZh ? '9. 折线图' : '9. Line Chart'}</h2>
      <p style={pStyle}>
        {isZh
          ? '折线图使用 d3.line() 生成器将数据点转换为 SVG 路径。适合展示随时间变化的趋势数据。'
          : 'Line charts use the d3.line() generator to convert data points into SVG paths. They are ideal for showing trends over time.'}
      </p>
      <pre style={preStyle}><code>{'const data = [\n' +
'  { date: new Date("2025-01"), value: 120 },\n' +
'  { date: new Date("2025-02"), value: 180 },\n' +
'  { date: new Date("2025-03"), value: 150 },\n' +
'  { date: new Date("2025-04"), value: 220 },\n' +
'  { date: new Date("2025-05"), value: 280 },\n' +
'  { date: new Date("2025-06"), value: 250 },\n' +
'];\n\n' +
'const x = d3.scaleTime()\n' +
'  .domain(d3.extent(data, (d) => d.date))\n' +
'  .range([0, width]);\n\n' +
'const y = d3.scaleLinear()\n' +
'  .domain([0, d3.max(data, (d) => d.value)])\n' +
'  .range([height, 0]);\n\n' +
'// Line generator\n' +
'const lineGen = d3.line()\n' +
'  .x((d) => x(d.date))\n' +
'  .y((d) => y(d.value))\n' +
'  .curve(d3.curveMonotoneX);  // smooth curve\n\n' +
'// Draw the line\n' +
'svg.append("path")\n' +
'  .datum(data)\n' +
'  .attr("fill", "none")\n' +
'  .attr("stroke", "#3b82f6")\n' +
'  .attr("stroke-width", 2.5)\n' +
'  .attr("d", lineGen);\n\n' +
'// Add data points\n' +
'svg.selectAll("circle")\n' +
'  .data(data)\n' +
'  .join("circle")\n' +
'  .attr("cx", (d) => x(d.date))\n' +
'  .attr("cy", (d) => y(d.value))\n' +
'  .attr("r", 4)\n' +
'  .attr("fill", "#3b82f6");'}</code></pre>

      {/* 10. Pie / Donut Chart */}
      <h2 style={h2Style}>{isZh ? '10. 饼图和环形图' : '10. Pie and Donut Charts'}</h2>
      <p style={pStyle}>
        {isZh
          ? '饼图使用 d3.pie() 计算角度，d3.arc() 生成弧形路径。设置 innerRadius > 0 即可变为环形图。'
          : 'Pie charts use d3.pie() to compute angles and d3.arc() to generate arc paths. Set innerRadius > 0 to create a donut chart.'}
      </p>
      <pre style={preStyle}><code>{'const data = [\n' +
'  { label: "Desktop", value: 55 },\n' +
'  { label: "Mobile", value: 35 },\n' +
'  { label: "Tablet", value: 10 },\n' +
'];\n\n' +
'const radius = 150;\n' +
'const color = d3.scaleOrdinal(d3.schemeCategory10);\n\n' +
'// Pie layout computes start/end angles\n' +
'const pieLayout = d3.pie()\n' +
'  .value((d) => d.value)\n' +
'  .sort(null);\n\n' +
'// Arc generator\n' +
'const arcGen = d3.arc()\n' +
'  .innerRadius(60)    // 0 for pie, >0 for donut\n' +
'  .outerRadius(radius);\n\n' +
'const g = svg.append("g")\n' +
'  .attr("transform",\n' +
'    "translate(" + (width / 2) + "," + (height / 2) + ")");\n\n' +
'// Draw arcs\n' +
'g.selectAll("path")\n' +
'  .data(pieLayout(data))\n' +
'  .join("path")\n' +
'  .attr("d", arcGen)\n' +
'  .attr("fill", (d, i) => color(i))\n' +
'  .attr("stroke", "#fff")\n' +
'  .attr("stroke-width", 2);\n\n' +
'// Add labels\n' +
'g.selectAll("text")\n' +
'  .data(pieLayout(data))\n' +
'  .join("text")\n' +
'  .attr("transform", (d) =>\n' +
'    "translate(" + arcGen.centroid(d) + ")")\n' +
'  .attr("text-anchor", "middle")\n' +
'  .attr("font-size", "12px")\n' +
'  .text((d) => d.data.label);'}</code></pre>

      {/* 11. Transitions & Animations */}
      <h2 style={h2Style}>{isZh ? '11. 过渡与动画' : '11. Transitions and Animations'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'D3 的 transition() 方法在属性变化之间创建平滑的动画效果。支持自定义持续时间、延迟、缓动函数和链式过渡。'
          : 'The D3 transition() method creates smooth animations between attribute changes. It supports custom duration, delay, easing functions, and chained transitions.'}
      </p>
      <pre style={preStyle}><code>{'// Basic transition\n' +
'svg.selectAll("rect")\n' +
'  .data(data)\n' +
'  .join("rect")\n' +
'  .attr("x", (d) => x(d.label))\n' +
'  .attr("y", height)              // start from bottom\n' +
'  .attr("width", x.bandwidth())\n' +
'  .attr("height", 0)              // start with zero height\n' +
'  .attr("fill", "#3b82f6")\n' +
'  .transition()                   // begin transition\n' +
'  .duration(800)                  // 800ms\n' +
'  .delay((d, i) => i * 100)       // stagger bars\n' +
'  .ease(d3.easeCubicOut)          // easing function\n' +
'  .attr("y", (d) => y(d.value))   // animate to final y\n' +
'  .attr("height", (d) => height - y(d.value));\n\n' +
'// Chained transitions\n' +
'd3.select("circle")\n' +
'  .transition()\n' +
'  .duration(500)\n' +
'  .attr("r", 50)\n' +
'  .attr("fill", "red")\n' +
'  .transition()                   // chain another\n' +
'  .duration(500)\n' +
'  .attr("r", 20)\n' +
'  .attr("fill", "blue");'}</code></pre>

      {/* 12. Event Handling */}
      <h2 style={h2Style}>{isZh ? '12. 事件处理' : '12. Event Handling'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'D3 使用 .on() 方法监听 DOM 事件。回调函数接收事件对象和绑定的数据，可以创建悬停高亮、工具提示和点击交互。'
          : 'D3 uses the .on() method to listen to DOM events. Callback functions receive the event object and bound data, enabling hover highlights, tooltips, and click interactions.'}
      </p>
      <pre style={preStyle}><code>{'// Hover highlight\n' +
'svg.selectAll("rect")\n' +
'  .on("mouseenter", function (event, d) {\n' +
'    d3.select(this)\n' +
'      .attr("fill", "#2563eb")\n' +
'      .attr("opacity", 0.8);\n' +
'  })\n' +
'  .on("mouseleave", function (event, d) {\n' +
'    d3.select(this)\n' +
'      .attr("fill", "#3b82f6")\n' +
'      .attr("opacity", 1);\n' +
'  });\n\n' +
'// Tooltip\n' +
'const tooltip = d3.select("body")\n' +
'  .append("div")\n' +
'  .style("position", "absolute")\n' +
'  .style("background", "#1e293b")\n' +
'  .style("color", "#f1f5f9")\n' +
'  .style("padding", "8px 12px")\n' +
'  .style("border-radius", "6px")\n' +
'  .style("font-size", "13px")\n' +
'  .style("pointer-events", "none")\n' +
'  .style("opacity", 0);\n\n' +
'svg.selectAll("circle")\n' +
'  .on("mouseover", function (event, d) {\n' +
'    tooltip\n' +
'      .style("opacity", 1)\n' +
'      .html("Value: " + d.value)\n' +
'      .style("left", (event.pageX + 10) + "px")\n' +
'      .style("top", (event.pageY - 10) + "px");\n' +
'  })\n' +
'  .on("mouseout", function () {\n' +
'    tooltip.style("opacity", 0);\n' +
'  });'}</code></pre>

      {/* 13. Responsive Charts */}
      <h2 style={h2Style}>{isZh ? '13. 响应式图表' : '13. Responsive Charts'}</h2>
      <p style={pStyle}>
        {isZh
          ? '使用 SVG 的 viewBox 属性让图表自动缩放，配合 ResizeObserver 实现真正的响应式设计。'
          : 'Use the SVG viewBox attribute to make charts scale automatically, and combine with ResizeObserver for truly responsive designs.'}
      </p>
      <pre style={preStyle}><code>{'// Method 1: viewBox (simplest)\n' +
'const svg = d3.select("#chart")\n' +
'  .append("svg")\n' +
'  .attr("viewBox", "0 0 600 400")\n' +
'  .style("width", "100%")\n' +
'  .style("height", "auto");\n' +
'// Chart scales to container automatically\n\n' +
'// Method 2: ResizeObserver (dynamic redraw)\n' +
'function createChart(container) {\n' +
'  const observer = new ResizeObserver((entries) => {\n' +
'    const { width } = entries[0].contentRect;\n' +
'    const height = width * 0.6;  // aspect ratio\n\n' +
'    // Clear and redraw\n' +
'    d3.select(container).selectAll("*").remove();\n' +
'    const svg = d3.select(container)\n' +
'      .append("svg")\n' +
'      .attr("width", width)\n' +
'      .attr("height", height);\n\n' +
'    // Recalculate scales with new dimensions\n' +
'    const x = d3.scaleLinear()\n' +
'      .domain([0, 100])\n' +
'      .range([40, width - 20]);\n' +
'    // ... draw chart with new dimensions\n' +
'  });\n' +
'  observer.observe(container);\n' +
'}'}</code></pre>

      {/* 14. D3 with React */}
      <h2 style={h2Style}>{isZh ? '14. D3 与 React 集成' : '14. D3 with React'}</h2>
      <p style={pStyle}>
        {isZh
          ? '在 React 中使用 D3 的推荐方式是用 useRef 获取容器引用，在 useEffect 中运行 D3 代码。React 管理组件生命周期，D3 负责 SVG 渲染。'
          : 'The recommended way to use D3 in React is to get a container reference with useRef and run D3 code inside useEffect. React manages the component lifecycle while D3 handles SVG rendering.'}
      </p>
      <pre style={preStyle}><code>{'import React, { useRef, useEffect } from "react";\n' +
'import * as d3 from "d3";\n\n' +
'function BarChart({ data }) {\n' +
'  const svgRef = useRef(null);\n\n' +
'  useEffect(() => {\n' +
'    if (!data || !svgRef.current) return;\n\n' +
'    const svg = d3.select(svgRef.current);\n' +
'    svg.selectAll("*").remove();  // clear previous\n\n' +
'    const width = 500, height = 300;\n' +
'    const margin = { top: 20, right: 20,\n' +
'      bottom: 30, left: 40 };\n' +
'    const innerW = width - margin.left - margin.right;\n' +
'    const innerH = height - margin.top - margin.bottom;\n\n' +
'    const g = svg\n' +
'      .attr("width", width)\n' +
'      .attr("height", height)\n' +
'      .append("g")\n' +
'      .attr("transform",\n' +
'        "translate(" + margin.left + ","\n' +
'        + margin.top + ")");\n\n' +
'    const x = d3.scaleBand()\n' +
'      .domain(data.map((d) => d.name))\n' +
'      .range([0, innerW]).padding(0.2);\n\n' +
'    const y = d3.scaleLinear()\n' +
'      .domain([0, d3.max(data, (d) => d.val)])\n' +
'      .range([innerH, 0]);\n\n' +
'    g.append("g")\n' +
'      .attr("transform", "translate(0," + innerH + ")")\n' +
'      .call(d3.axisBottom(x));\n' +
'    g.append("g").call(d3.axisLeft(y));\n\n' +
'    g.selectAll("rect")\n' +
'      .data(data)\n' +
'      .join("rect")\n' +
'      .attr("x", (d) => x(d.name))\n' +
'      .attr("y", (d) => y(d.val))\n' +
'      .attr("width", x.bandwidth())\n' +
'      .attr("height", (d) => innerH - y(d.val))\n' +
'      .attr("fill", "#3b82f6");\n' +
'  }, [data]);\n\n' +
'  return <svg ref={svgRef} />;\n' +
'}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '方法二：React 渲染 SVG + D3 工具' : 'Approach 2: React Renders SVG, D3 for Math'}</h3>
      <pre style={preStyle}><code>{'function BarChartReact({ data }) {\n' +
'  const width = 500, height = 300;\n' +
'  const margin = { top: 20, right: 20,\n' +
'    bottom: 30, left: 40 };\n\n' +
'  const x = d3.scaleBand()\n' +
'    .domain(data.map((d) => d.name))\n' +
'    .range([margin.left, width - margin.right])\n' +
'    .padding(0.2);\n\n' +
'  const y = d3.scaleLinear()\n' +
'    .domain([0, d3.max(data, (d) => d.val)])\n' +
'    .range([height - margin.bottom, margin.top]);\n\n' +
'  return (\n' +
'    <svg width={width} height={height}>\n' +
'      {data.map((d, i) => (\n' +
'        <rect\n' +
'          key={i}\n' +
'          x={x(d.name)}\n' +
'          y={y(d.val)}\n' +
'          width={x.bandwidth()}\n' +
'          height={y(0) - y(d.val)}\n' +
'          fill="#3b82f6"\n' +
'        />\n' +
'      ))}\n' +
'    </svg>\n' +
'  );\n' +
'}'}</code></pre>

      {/* 15. GeoJSON & Maps */}
      <h2 style={h2Style}>{isZh ? '15. GeoJSON 与地图' : '15. GeoJSON and Maps'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'D3 内置强大的地理投影和路径生成器，可以将 GeoJSON/TopoJSON 数据渲染为交互式地图。支持数十种投影方式。'
          : 'D3 includes powerful geographic projections and path generators that render GeoJSON/TopoJSON data as interactive maps. It supports dozens of projection types.'}
      </p>
      <pre style={preStyle}><code>{'// Load and render a world map\n' +
'const projection = d3.geoNaturalEarth1()\n' +
'  .scale(150)\n' +
'  .translate([width / 2, height / 2]);\n\n' +
'const pathGen = d3.geoPath().projection(projection);\n\n' +
'// Load GeoJSON data\n' +
'd3.json("https://unpkg.com/world-atlas@2"\n' +
'  + "/countries-110m.json")\n' +
'  .then((world) => {\n' +
'    const countries = topojson.feature(\n' +
'      world, world.objects.countries\n' +
'    );\n\n' +
'    svg.selectAll("path")\n' +
'      .data(countries.features)\n' +
'      .join("path")\n' +
'      .attr("d", pathGen)\n' +
'      .attr("fill", "#cbd5e1")\n' +
'      .attr("stroke", "#64748b")\n' +
'      .attr("stroke-width", 0.5);\n' +
'  });\n\n' +
'// Choropleth: color by data value\n' +
'const colorScale = d3.scaleSequential()\n' +
'  .domain([0, 100])\n' +
'  .interpolator(d3.interpolateBlues);\n\n' +
'svg.selectAll("path")\n' +
'  .attr("fill", (d) =>\n' +
'    colorScale(dataMap.get(d.id) || 0));'}</code></pre>

      {/* 16. Force-Directed Graphs */}
      <h2 style={h2Style}>{isZh ? '16. 力导向图' : '16. Force-Directed Graphs'}</h2>
      <p style={pStyle}>
        {isZh
          ? '力导向图使用物理模拟来布局网络节点。d3-force 模块提供多种力：链接力、电荷力、中心力和碰撞力。'
          : 'Force-directed graphs use physics simulation to lay out network nodes. The d3-force module provides several forces: link force, charge force, center force, and collision force.'}
      </p>
      <pre style={preStyle}><code>{'const nodes = [\n' +
'  { id: "A" }, { id: "B" }, { id: "C" },\n' +
'  { id: "D" }, { id: "E" },\n' +
'];\n' +
'const links = [\n' +
'  { source: "A", target: "B" },\n' +
'  { source: "A", target: "C" },\n' +
'  { source: "B", target: "D" },\n' +
'  { source: "C", target: "E" },\n' +
'];\n\n' +
'const simulation = d3.forceSimulation(nodes)\n' +
'  .force("link", d3.forceLink(links)\n' +
'    .id((d) => d.id).distance(100))\n' +
'  .force("charge", d3.forceManyBody()\n' +
'    .strength(-200))\n' +
'  .force("center", d3.forceCenter(\n' +
'    width / 2, height / 2))\n' +
'  .force("collision", d3.forceCollide(20));\n\n' +
'// Draw links\n' +
'const link = svg.selectAll("line")\n' +
'  .data(links)\n' +
'  .join("line")\n' +
'  .attr("stroke", "#94a3b8")\n' +
'  .attr("stroke-width", 2);\n\n' +
'// Draw nodes\n' +
'const node = svg.selectAll("circle")\n' +
'  .data(nodes)\n' +
'  .join("circle")\n' +
'  .attr("r", 15)\n' +
'  .attr("fill", "#3b82f6")\n' +
'  .call(d3.drag()\n' +
'    .on("start", dragStart)\n' +
'    .on("drag", dragging)\n' +
'    .on("end", dragEnd));\n\n' +
'// Update positions on each tick\n' +
'simulation.on("tick", () => {\n' +
'  link\n' +
'    .attr("x1", (d) => d.source.x)\n' +
'    .attr("y1", (d) => d.source.y)\n' +
'    .attr("x2", (d) => d.target.x)\n' +
'    .attr("y2", (d) => d.target.y);\n' +
'  node\n' +
'    .attr("cx", (d) => d.x)\n' +
'    .attr("cy", (d) => d.y);\n' +
'});\n\n' +
'function dragStart(event, d) {\n' +
'  if (!event.active)\n' +
'    simulation.alphaTarget(0.3).restart();\n' +
'  d.fx = d.x; d.fy = d.y;\n' +
'}\n' +
'function dragging(event, d) {\n' +
'  d.fx = event.x; d.fy = event.y;\n' +
'}\n' +
'function dragEnd(event, d) {\n' +
'  if (!event.active)\n' +
'    simulation.alphaTarget(0);\n' +
'  d.fx = null; d.fy = null;\n' +
'}'}</code></pre>

      {/* 17. Best Practices */}
      <h2 style={h2Style}>{isZh ? '17. D3.js 最佳实践' : '17. D3.js Best Practices'}</h2>
      <ul style={ulStyle}>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '使用 margin 约定' : 'Use the margin convention'}</strong>
          {isZh
            ? '：定义 margin 对象（top/right/bottom/left），从 SVG 尺寸中减去 margin 计算内部绘图区域。所有图表都应遵循此模式。'
            : ': Define a margin object (top/right/bottom/left) and subtract margins from SVG dimensions to calculate the inner drawing area. Every chart should follow this pattern.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '优先使用 join() 而非 enter/exit' : 'Prefer join() over enter/exit'}</strong>
          {isZh
            ? '：D3 v5+ 的 join() 方法更简洁，自动处理进入、更新和退出选择集，减少样板代码。'
            : ': The D3 v5+ join() method is cleaner, automatically handles enter, update, and exit selections, and reduces boilerplate.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '按需导入模块' : 'Import modules selectively'}</strong>
          {isZh
            ? '：不要导入整个 d3 库。只导入你需要的模块（如 d3-scale、d3-selection），可以显著减小打包体积。'
            : ': Do not import the entire d3 library. Import only the modules you need (d3-scale, d3-selection, etc.) to significantly reduce bundle size.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '使用 viewBox 实现响应式' : 'Use viewBox for responsiveness'}</strong>
          {isZh
            ? '：设置 SVG 的 viewBox 属性而非固定 width/height，让图表自动适应容器大小。'
            : ': Set the SVG viewBox attribute instead of fixed width/height to let charts adapt automatically to container size.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '为 key 使用数据标识' : 'Use data keys for stable binding'}</strong>
          {isZh
            ? '：在 data() 中传入 key 函数（如 d => d.id），确保数据更新时元素正确匹配，而不是依赖索引。'
            : ': Pass a key function to data() (e.g., d => d.id) to ensure elements match correctly during data updates instead of relying on index.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '清理定时器和事件监听' : 'Clean up timers and event listeners'}</strong>
          {isZh
            ? '：在 React useEffect 的清理函数中停止 simulation、取消 transition 和移除事件监听，防止内存泄漏。'
            : ': In the React useEffect cleanup function, stop simulations, cancel transitions, and remove event listeners to prevent memory leaks.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '合理使用过渡动画' : 'Use transitions judiciously'}</strong>
          {isZh
            ? '：动画应增强理解而非分散注意力。持续时间保持在 200-800ms 之间，避免在大量元素上同时触发复杂动画。'
            : ': Animations should enhance understanding, not distract. Keep durations between 200-800ms and avoid triggering complex animations on many elements simultaneously.'}
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong style={{ color: '#0f172a' }}>{isZh ? '为可访问性添加 ARIA 属性' : 'Add ARIA attributes for accessibility'}</strong>
          {isZh
            ? '：为 SVG 添加 role="img"、aria-label 描述，为数据点添加 title 元素，确保屏幕阅读器可以理解图表内容。'
            : ': Add role="img" and aria-label to SVG, add title elements to data points, ensuring screen readers can understand chart content.'}
        </li>
      </ul>

      {/* Common D3 Modules Reference Table */}
      <h2 style={h2Style}>{isZh ? '18. 常用 D3 模块速查' : '18. Common D3 Modules Reference'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>
                {isZh ? '模块' : 'Module'}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>
                {isZh ? '用途' : 'Purpose'}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', color: '#f1f5f9', fontWeight: '600' }}>
                {isZh ? '关键 API' : 'Key APIs'}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['d3-selection', isZh ? '选择和操作 DOM 元素' : 'Select and manipulate DOM elements', 'select, selectAll, append, attr, style, on'],
              ['d3-scale', isZh ? '将数据映射到视觉通道' : 'Map data to visual channels', 'scaleLinear, scaleBand, scaleTime, scaleOrdinal, scaleLog'],
              ['d3-axis', isZh ? '生成坐标轴' : 'Generate axes', 'axisBottom, axisLeft, axisTop, axisRight'],
              ['d3-shape', isZh ? '形状生成器' : 'Shape generators', 'line, area, arc, pie, stack, symbol'],
              ['d3-transition', isZh ? '动画过渡' : 'Animated transitions', 'transition, duration, delay, ease'],
              ['d3-array', isZh ? '数组统计工具' : 'Array statistics utilities', 'min, max, extent, mean, sum, group, rollup'],
              ['d3-fetch', isZh ? '数据加载' : 'Data loading', 'json, csv, tsv, text, xml'],
              ['d3-geo', isZh ? '地理投影和路径' : 'Geographic projections and paths', 'geoPath, geoMercator, geoNaturalEarth1, geoAlbersUsa'],
              ['d3-force', isZh ? '力导向模拟' : 'Force-directed simulation', 'forceSimulation, forceLink, forceManyBody, forceCenter'],
              ['d3-zoom', isZh ? '缩放和平移' : 'Zoom and pan', 'zoom, zoomTransform, zoomIdentity'],
              ['d3-drag', isZh ? '拖拽交互' : 'Drag interaction', 'drag, dragDisable, dragEnable'],
              ['d3-color', isZh ? '颜色操作' : 'Color manipulation', 'rgb, hsl, lab, interpolateRgb, schemeCategory10'],
            ].map(([mod, purpose, apis], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '0.85rem' }}>{mod}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>{purpose}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '0.82rem' }}>{apis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>

      <h3 style={h3Style}>{isZh ? 'D3.js 是什么？用来做什么？' : 'What is D3.js and what is it used for?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'D3.js（Data-Driven Documents）是一个 JavaScript 可视化库，用于在浏览器中使用 SVG、HTML 和 CSS 创建动态交互式数据可视化。它将数据绑定到 DOM 元素并应用数据驱动的变换，用于创建图表、地图、图形和仪表板。'
          : 'D3.js (Data-Driven Documents) is a JavaScript visualization library for creating dynamic, interactive data visualizations in the browser using SVG, HTML, and CSS. It binds data to DOM elements and applies data-driven transformations to create charts, maps, graphs, and dashboards.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何安装 D3.js？' : 'How do I install D3.js?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '通过 npm install d3 安装并使用 import * as d3 from "d3" 导入。也可以按需导入单独模块如 d3-scale 或 d3-selection。或者从 CDN 加载 script 标签。'
          : 'Install via npm with "npm install d3" and import with "import * as d3 from \'d3\'". You can also import individual modules like d3-scale or d3-selection. Alternatively, load from a CDN with a script tag.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'D3 的 select 和 selectAll 有什么区别？' : 'What is the difference between select and selectAll?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'd3.select() 选择第一个匹配的 DOM 元素，d3.selectAll() 选择所有匹配元素。两者都接受 CSS 选择器，返回的选择集支持链式调用来修改属性、样式和绑定数据。'
          : 'd3.select() selects the first matching DOM element while d3.selectAll() selects all matching elements. Both accept CSS selectors and return selections that support method chaining for modifying attributes, styles, and binding data.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'D3 数据绑定的 enter/update/exit 是什么？' : 'How does enter/update/exit work in D3?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'enter() 处理新数据项（需要创建新元素），update 选择集处理已有元素的数据更新，exit() 处理不再有对应数据的元素（需要移除）。D3 v7 的 join() 方法将三者合一，简化了代码。'
          : 'enter() handles new data items that need new elements created. The update selection handles existing elements with new data. exit() handles elements that no longer have corresponding data and should be removed. The D3 v7 join() method combines all three in one call.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'D3 比例尺是什么？为什么重要？' : 'What are D3 scales and why are they important?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '比例尺将数据值（domain）映射到视觉值（range）。scaleLinear 映射连续数值，scaleBand 映射类别，scaleTime 映射日期，scaleLog 使用对数映射。它们是将原始数据转换为适配图表尺寸的坐标的核心工具。'
          : 'Scales map data values (domain) to visual values (range). scaleLinear maps continuous numbers, scaleBand maps categories, scaleTime maps dates, and scaleLog uses logarithmic mapping. They are the core tool for converting raw data into coordinates that fit your chart dimensions.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何在 React 中使用 D3？' : 'How do I use D3 with React?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '推荐使用 useRef 获取 SVG 或 div 容器的引用，然后在 useEffect 中运行 D3 代码操作该容器。React 管理组件生命周期，D3 负责 SVG 渲染。对于简单图表，也可以只用 D3 的比例尺工具，由 React 直接渲染 SVG 元素。'
          : 'Use useRef to get a reference to an SVG or div container, then run D3 code in useEffect to manipulate it. React manages the component lifecycle while D3 handles SVG rendering. For simple charts, you can also use only D3 scales and let React render SVG elements directly.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何创建响应式 D3 图表？' : 'How do I create responsive D3 charts?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用 SVG viewBox 属性代替固定 width/height，设置 viewBox="0 0 width height" 并用 CSS 设置宽度 100%。或用 ResizeObserver 检测容器大小变化并重绘。'
          : 'Use SVG viewBox instead of fixed width/height. Set viewBox="0 0 width height" and CSS width to 100%. Or use ResizeObserver to detect size changes and redraw.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'D3 能创建地图吗？' : 'Can D3 create maps and geographic visualizations?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '是的。使用 d3-geo 投影（geoMercator、geoNaturalEarth1 等）将经纬度转换为屏幕坐标，加载 GeoJSON/TopoJSON 数据，用 geoPath 渲染为 SVG 路径。支持等值线地图、点地图和自定义投影。'
          : 'Yes. Use d3-geo projections (geoMercator, geoNaturalEarth1, etc.) to convert longitude/latitude to screen coordinates. Load GeoJSON/TopoJSON data and use geoPath to render as SVG paths. Supports choropleth maps, point maps, and custom projections.'}
      </p>

      {/* Conclusion */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px 24px', borderRadius: '8px', marginTop: '32px' }}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.1rem' }}>
          {isZh ? '总结' : 'Conclusion'}
        </strong>
        <p style={{ ...pStyle, marginBottom: '0' }}>
          {isZh
            ? 'D3.js 是 Web 数据可视化的黄金标准。掌握选择集、数据绑定、比例尺和过渡动画四个核心概念后，你就能构建任何类型的可视化。从柱状图开始，逐步挑战折线图、饼图、地图和力导向图。在 React 中使用 useRef + useEffect 模式集成。'
            : 'D3.js is the gold standard for web data visualization. Master four core concepts — selections, data binding, scales, and transitions — and you can build any visualization. Start with bar charts, then progress to line charts, pie charts, maps, and force-directed graphs. In React, use the useRef + useEffect pattern.'}
        </p>
      </div>
    </>
  );
}
