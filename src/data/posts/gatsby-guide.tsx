'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Gatsby.js Complete Guide 2026: Static Site Generator with GraphQL',
    description: 'Master Gatsby.js from basics to advanced topics. Learn the GraphQL data layer, plugins, image optimization, SSR/DSG, headless CMS integration, SEO, deployment, and how Gatsby compares to Next.js and Astro.',
  },
  zh: {
    title: 'Gatsby.js 完全指南 2026：基于 GraphQL 的静态站点生成器',
    description: '从基础到高级全面掌握 Gatsby.js。学习 GraphQL 数据层、插件系统、图片优化、SSR/DSG、无头 CMS 集成、SEO、部署，以及 Gatsby 与 Next.js 和 Astro 的对比。',
  },
};

export default function GatsbyGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Gatsby.js and what is it used for?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gatsby.js is a React-based static site generator that uses GraphQL as its data layer. It builds fast, SEO-friendly websites including blogs, marketing sites, e-commerce stores, and documentation sites by pre-rendering pages at build time.' },
      },
      {
        '@type': 'Question',
        name: 'How does Gatsby use GraphQL?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gatsby has a built-in GraphQL data layer that unifies all data sources into a single queryable schema. Source plugins pull data in at build time, and you query it using page queries or the useStaticQuery hook.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between SSG, SSR, and DSG in Gatsby?',
        acceptedAnswer: { '@type': 'Answer', text: 'SSG pre-renders all pages at build time (default). SSR generates pages on each request for dynamic content. DSG defers building certain pages until first request, then caches them as static HTML to reduce build times.' },
      },
      {
        '@type': 'Question',
        name: 'Is Gatsby still relevant in 2026?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gatsby remains solid for content-heavy sites with multiple data sources. However, Next.js and Astro have gained ground. Next.js offers more flexible rendering, while Astro delivers better performance for content sites with zero JS by default.' },
      },
      {
        '@type': 'Question',
        name: 'How do I optimize images in Gatsby?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use gatsby-plugin-image which generates multiple sizes, converts to WebP/AVIF, applies lazy loading, and creates blur-up placeholders. StaticImage handles fixed images; GatsbyImage handles dynamic images from GraphQL queries.' },
      },
      {
        '@type': 'Question',
        name: 'How does Gatsby compare to Next.js?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gatsby is static-first with a built-in GraphQL data layer and rich plugin ecosystem. Next.js is a full-stack React framework with SSG, SSR, ISR, and React Server Components. Next.js suits dynamic apps; Gatsby suits multi-source content sites.' },
      },
      {
        '@type': 'Question',
        name: 'What are the best Gatsby plugins?',
        acceptedAnswer: { '@type': 'Answer', text: 'Essential plugins include gatsby-source-filesystem, gatsby-transformer-remark, gatsby-plugin-image, gatsby-plugin-sharp, gatsby-plugin-sitemap, gatsby-plugin-manifest, and CMS source plugins like gatsby-source-contentful or gatsby-source-sanity.' },
      },
      {
        '@type': 'Question',
        name: 'How do I deploy a Gatsby site?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gatsby outputs static files deployable to any host: Netlify (with gatsby-adapter-netlify for SSR/DSG), Vercel, AWS S3 + CloudFront, Cloudflare Pages, or GitHub Pages. SSR and DSG require a platform supporting serverless functions.' },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.7' }}>
          Gatsby.js is a React-based static site generator powered by a GraphQL data layer that unifies content from any source. It excels at building high-performance content sites with its rich plugin ecosystem, automatic image optimization, and pre-rendering. While Next.js and Astro have overtaken it in popularity, Gatsby remains strong for projects needing unified data sourcing and mature tooling. This guide covers project setup, GraphQL queries, plugins, SSR/DSG, headless CMS integration, deployment, and framework comparisons.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>Gatsby uses a built-in GraphQL data layer to pull content from files, CMSs, APIs, and databases into a unified schema</li>
          <li>The plugin ecosystem includes 2,800+ plugins for sourcing data, transforming content, and optimizing output</li>
          <li>Automatic image optimization generates responsive sizes, modern formats (WebP/AVIF), and lazy loading</li>
          <li>SSR and DSG modes extend Gatsby beyond pure static generation for dynamic and large-scale sites</li>
          <li>Gatsby Head API provides per-page SEO metadata with zero runtime overhead</li>
          <li>Headless CMS integration (Contentful, Sanity, WordPress) works through dedicated source plugins</li>
          <li>Deploy to any static host; use Netlify or Vercel for SSR/DSG support</li>
        </ul>
      </div>

      {/* What is Gatsby */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>What Is Gatsby.js?</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby.js is an open-source framework built on React that generates static HTML pages at build time. Unlike server-rendered applications that build pages on every request, Gatsby pre-renders your entire site into optimized static files that load instantly and score high on Core Web Vitals.
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        What sets Gatsby apart is its GraphQL data layer. Every data source, whether local Markdown files, a headless CMS, or a REST API, gets pulled into a unified GraphQL schema at build time. You write GraphQL queries to fetch exactly the data you need for each page.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Project Setup and Structure</h3>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'# Install the Gatsby CLI and create a new project\n'
        + 'npm install -g gatsby-cli\n'
        + 'gatsby new my-gatsby-site\n'
        + 'cd my-gatsby-site\n'
        + '\n'
        + '# Development server at localhost:8000\n'
        + 'gatsby develop\n'
        + '\n'
        + '# Production build\n'
        + 'gatsby build\n'
        + 'gatsby serve\n'
        + '\n'
        + '# Project structure:\n'
        + '# my-gatsby-site/\n'
        + '# ├── src/\n'
        + '# │   ├── pages/          # File-based routing\n'
        + '# │   ├── components/     # Reusable React components\n'
        + '# │   ├── templates/      # Templates for programmatic pages\n'
        + '# │   └── images/         # Static images\n'
        + '# ├── static/             # Files copied to public/ as-is\n'
        + '# ├── gatsby-config.js    # Plugins and site metadata\n'
        + '# ├── gatsby-node.js      # Build-time APIs (createPages)\n'
        + '# ├── gatsby-browser.js   # Browser APIs\n'
        + '# └── gatsby-ssr.js       # SSR APIs'}</code></pre>

      {/* GraphQL Data Layer */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>The GraphQL Data Layer</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        At build time, Gatsby collects data from all configured source plugins and creates a unified GraphQL schema. You can explore this schema using the built-in GraphiQL IDE at localhost:8000/___graphql during development.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Page Queries and useStaticQuery</h3>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// src/pages/index.js - Page Query (top-level pages only)\n'
        + 'import React from "react"\n'
        + 'import { graphql } from "gatsby"\n'
        + '\n'
        + 'export default function HomePage({ data }) {\n'
        + '  const posts = data.allMarkdownRemark.nodes\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h1>My Blog</h1>\n'
        + '      {posts.map(post => (\n'
        + '        <article key={post.id}>\n'
        + '          <h2>{post.frontmatter.title}</h2>\n'
        + '          <p>{post.excerpt}</p>\n'
        + '        </article>\n'
        + '      ))}\n'
        + '    </div>\n'
        + '  )\n'
        + '}\n'
        + '\n'
        + 'export const query = graphql`\n'
        + '  query HomePageQuery {\n'
        + '    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {\n'
        + '      nodes {\n'
        + '        id\n'
        + '        excerpt(pruneLength: 200)\n'
        + '        frontmatter {\n'
        + '          title\n'
        + '          date(formatString: "MMMM DD, YYYY")\n'
        + '          slug\n'
        + '        }\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '`'}</code></pre>

      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// src/components/SiteHeader.js - useStaticQuery (any component)\n'
        + 'import React from "react"\n'
        + 'import { useStaticQuery, graphql } from "gatsby"\n'
        + '\n'
        + 'export default function SiteHeader() {\n'
        + '  const data = useStaticQuery(graphql`\n'
        + '    query {\n'
        + '      site {\n'
        + '        siteMetadata { title, description }\n'
        + '      }\n'
        + '    }\n'
        + '  `)\n'
        + '  return (\n'
        + '    <header>\n'
        + '      <h1>{data.site.siteMetadata.title}</h1>\n'
        + '      <p>{data.site.siteMetadata.description}</p>\n'
        + '    </header>\n'
        + '  )\n'
        + '}'}</code></pre>

      {/* Plugins */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>The Plugin Ecosystem</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby plugins are npm packages that implement Gatsby APIs. Source plugins bring data into GraphQL, transformer plugins convert data nodes into usable formats, and general plugins add capabilities like analytics or SEO.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Essential Plugins</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Plugin</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Type</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['gatsby-source-filesystem', 'Source', 'Read local files (Markdown, images, JSON)'],
              ['gatsby-source-contentful', 'Source', 'Pull content from Contentful CMS'],
              ['gatsby-source-wordpress', 'Source', 'Pull content from WordPress'],
              ['gatsby-source-sanity', 'Source', 'Pull content from Sanity.io'],
              ['gatsby-transformer-remark', 'Transformer', 'Parse Markdown to HTML with frontmatter'],
              ['gatsby-plugin-mdx', 'Transformer', 'MDX support (Markdown + JSX)'],
              ['gatsby-transformer-sharp', 'Transformer', 'Process images for optimization'],
              ['gatsby-plugin-image', 'General', 'Responsive image components'],
              ['gatsby-plugin-sharp', 'General', 'Image processing engine'],
              ['gatsby-plugin-sitemap', 'General', 'Auto-generate XML sitemap'],
              ['gatsby-plugin-manifest', 'General', 'PWA manifest file'],
              ['gatsby-plugin-offline', 'General', 'Service worker for offline support'],
            ].map(([plugin, type, purpose], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.8rem' }}>{plugin}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{type}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>gatsby-config.js Example</h3>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// gatsby-config.js\n'
        + 'module.exports = {\n'
        + '  siteMetadata: {\n'
        + '    title: "My Gatsby Site",\n'
        + '    description: "A blazing fast site built with Gatsby",\n'
        + '    siteUrl: "https://example.com",\n'
        + '  },\n'
        + '  plugins: [\n'
        + '    {\n'
        + '      resolve: "gatsby-source-filesystem",\n'
        + '      options: { name: "blog", path: "./content/blog" },\n'
        + '    },\n'
        + '    {\n'
        + '      resolve: "gatsby-source-filesystem",\n'
        + '      options: { name: "images", path: "./src/images" },\n'
        + '    },\n'
        + '    {\n'
        + '      resolve: "gatsby-transformer-remark",\n'
        + '      options: {\n'
        + '        plugins: [\n'
        + '          "gatsby-remark-prismjs",\n'
        + '          "gatsby-remark-images",\n'
        + '          "gatsby-remark-autolink-headers",\n'
        + '        ],\n'
        + '      },\n'
        + '    },\n'
        + '    "gatsby-plugin-image",\n'
        + '    "gatsby-plugin-sharp",\n'
        + '    "gatsby-transformer-sharp",\n'
        + '    "gatsby-plugin-sitemap",\n'
        + '    {\n'
        + '      resolve: "gatsby-plugin-manifest",\n'
        + '      options: {\n'
        + '        name: "My Gatsby Site",\n'
        + '        short_name: "GatsbySite",\n'
        + '        start_url: "/",\n'
        + '        icon: "src/images/icon.png",\n'
        + '      },\n'
        + '    },\n'
        + '  ],\n'
        + '}'}</code></pre>

      {/* Image Optimization */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Image Optimization</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        The gatsby-plugin-image package automatically generates responsive images at multiple sizes, converts to WebP and AVIF, and creates blur-up or traced SVG placeholders. StaticImage handles fixed paths; GatsbyImage handles dynamic images from GraphQL.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'import { StaticImage } from "gatsby-plugin-image"\n'
        + 'import { GatsbyImage, getImage } from "gatsby-plugin-image"\n'
        + '\n'
        + '// StaticImage: known path at build time\n'
        + 'function Hero() {\n'
        + '  return (\n'
        + '    <StaticImage\n'
        + '      src="../images/hero.jpg"\n'
        + '      alt="Hero banner"\n'
        + '      layout="fullWidth"\n'
        + '      placeholder="blurred"\n'
        + '      formats={["auto", "webp", "avif"]}\n'
        + '    />\n'
        + '  )\n'
        + '}\n'
        + '\n'
        + '// GatsbyImage: dynamic source from GraphQL\n'
        + 'function BlogPost({ data }) {\n'
        + '  const image = getImage(data.markdownRemark.frontmatter.cover)\n'
        + '  return <GatsbyImage image={image} alt="Post cover" />\n'
        + '}\n'
        + '\n'
        + '// GraphQL query for dynamic images\n'
        + '// export const query = graphql`\n'
        + '//   query($id: String!) {\n'
        + '//     markdownRemark(id: { eq: $id }) {\n'
        + '//       frontmatter {\n'
        + '//         cover {\n'
        + '//           childImageSharp {\n'
        + '//             gatsbyImageData(\n'
        + '//               width: 800\n'
        + '//               placeholder: BLURRED\n'
        + '//               formats: [AUTO, WEBP, AVIF]\n'
        + '//             )\n'
        + '//           }\n'
        + '//         }\n'
        + '//       }\n'
        + '//     }\n'
        + '//   }\n'
        + '// `'}</code></pre>

      {/* Routing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Routing and Page Creation</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby supports file-based routing (files in src/pages become routes) and programmatic page creation via the createPages API in gatsby-node.js for dynamic content like blog posts and category pages.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// gatsby-node.js - Programmatic page creation\n'
        + 'const path = require("path")\n'
        + '\n'
        + 'exports.createPages = async ({ graphql, actions }) => {\n'
        + '  const { createPage } = actions\n'
        + '  const template = path.resolve("src/templates/blog-post.js")\n'
        + '\n'
        + '  const result = await graphql(`\n'
        + '    query {\n'
        + '      allMarkdownRemark {\n'
        + '        nodes {\n'
        + '          id\n'
        + '          frontmatter { slug, tags }\n'
        + '        }\n'
        + '      }\n'
        + '    }\n'
        + '  `)\n'
        + '\n'
        + '  // Create a page for each blog post\n'
        + '  result.data.allMarkdownRemark.nodes.forEach(node => {\n'
        + '    createPage({\n'
        + '      path: "/blog/" + node.frontmatter.slug,\n'
        + '      component: template,\n'
        + '      context: { id: node.id },\n'
        + '    })\n'
        + '  })\n'
        + '\n'
        + '  // Create tag archive pages\n'
        + '  const tags = new Set()\n'
        + '  result.data.allMarkdownRemark.nodes.forEach(node => {\n'
        + '    if (node.frontmatter.tags) {\n'
        + '      node.frontmatter.tags.forEach(tag => tags.add(tag))\n'
        + '    }\n'
        + '  })\n'
        + '  tags.forEach(tag => {\n'
        + '    createPage({\n'
        + '      path: "/tags/" + tag.toLowerCase(),\n'
        + '      component: path.resolve("src/templates/tag-page.js"),\n'
        + '      context: { tag },\n'
        + '    })\n'
        + '  })\n'
        + '}'}</code></pre>

      {/* SEO */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>SEO in Gatsby</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby is inherently SEO-friendly because it pre-renders pages to static HTML. Gatsby 4.19+ introduced the Head API as a built-in replacement for react-helmet, providing simpler metadata management with zero runtime cost.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// Gatsby Head API - named export controls <head>\n'
        + 'export function Head({ data }) {\n'
        + '  const post = data.markdownRemark.frontmatter\n'
        + '  return (\n'
        + '    <>\n'
        + '      <title>{post.title + " | My Site"}</title>\n'
        + '      <meta name="description" content={post.excerpt} />\n'
        + '      <meta property="og:title" content={post.title} />\n'
        + '      <meta property="og:type" content="article" />\n'
        + '      <link rel="canonical" href={"https://example.com/blog/" + post.slug} />\n'
        + '    </>\n'
        + '  )\n'
        + '}\n'
        + '\n'
        + '// Reusable SEO component\n'
        + 'function Seo({ title, description, pathname }) {\n'
        + '  const { site } = useStaticQuery(graphql`\n'
        + '    query { site { siteMetadata { title, siteUrl } } }\n'
        + '  `)\n'
        + '  const fullTitle = title\n'
        + '    ? title + " | " + site.siteMetadata.title\n'
        + '    : site.siteMetadata.title\n'
        + '  const url = site.siteMetadata.siteUrl + (pathname || "")\n'
        + '\n'
        + '  return (\n'
        + '    <>\n'
        + '      <title>{fullTitle}</title>\n'
        + '      <meta name="description" content={description} />\n'
        + '      <meta property="og:title" content={fullTitle} />\n'
        + '      <link rel="canonical" href={url} />\n'
        + '    </>\n'
        + '  )\n'
        + '}'}</code></pre>

      {/* SSR and DSG */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>SSR and Deferred Static Generation (DSG)</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby 4 introduced SSR (pages rendered per request) and DSG (pages built on first request, then cached). SSR enables personalized content; DSG reduces build times for large sites by deferring low-traffic pages.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// SSR: Export getServerData to render per request\n'
        + '// src/pages/dashboard.js\n'
        + 'export default function Dashboard({ serverData }) {\n'
        + '  return <h1>Welcome, {serverData.user.name}</h1>\n'
        + '}\n'
        + '\n'
        + 'export async function getServerData({ headers }) {\n'
        + '  const res = await fetch("https://api.example.com/user", {\n'
        + '    headers: { Authorization: headers.get("cookie") },\n'
        + '  })\n'
        + '  return { props: { user: await res.json() } }\n'
        + '}\n'
        + '\n'
        + '// DSG: Set defer: true in createPages\n'
        + '// gatsby-node.js\n'
        + 'exports.createPages = async ({ graphql, actions }) => {\n'
        + '  const result = await graphql(`\n'
        + '    query { allMarkdownRemark {\n'
        + '      nodes { id, frontmatter { slug, date } }\n'
        + '    }}\n'
        + '  `)\n'
        + '\n'
        + '  const cutoff = new Date()\n'
        + '  cutoff.setMonth(cutoff.getMonth() - 1)\n'
        + '\n'
        + '  result.data.allMarkdownRemark.nodes.forEach(node => {\n'
        + '    const isOld = new Date(node.frontmatter.date) < cutoff\n'
        + '    actions.createPage({\n'
        + '      path: "/blog/" + node.frontmatter.slug,\n'
        + '      component: require.resolve("./src/templates/post.js"),\n'
        + '      context: { id: node.id },\n'
        + '      defer: isOld,  // Old posts built on first request\n'
        + '    })\n'
        + '  })\n'
        + '}'}</code></pre>

      {/* Headless CMS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Headless CMS Integration</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Source plugins pull CMS content into GraphQL, letting you query it like any other data source. Content editors work in the CMS while developers build with React.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// Contentful integration\n'
        + '// gatsby-config.js\n'
        + 'module.exports = {\n'
        + '  plugins: [{\n'
        + '    resolve: "gatsby-source-contentful",\n'
        + '    options: {\n'
        + '      spaceId: process.env.CONTENTFUL_SPACE_ID,\n'
        + '      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,\n'
        + '    },\n'
        + '  }],\n'
        + '}\n'
        + '\n'
        + '// Query Contentful data in templates\n'
        + 'import { renderRichText } from "gatsby-source-contentful/rich-text"\n'
        + '\n'
        + 'export default function Post({ data }) {\n'
        + '  const post = data.contentfulBlogPost\n'
        + '  return (\n'
        + '    <article>\n'
        + '      <h1>{post.title}</h1>\n'
        + '      <GatsbyImage image={getImage(post.heroImage)} alt={post.title} />\n'
        + '      <div>{renderRichText(post.body)}</div>\n'
        + '    </article>\n'
        + '  )\n'
        + '}\n'
        + '\n'
        + 'export const query = graphql`\n'
        + '  query($id: String!) {\n'
        + '    contentfulBlogPost(id: { eq: $id }) {\n'
        + '      title\n'
        + '      heroImage { gatsbyImageData(layout: FULL_WIDTH) }\n'
        + '      body { raw }\n'
        + '    }\n'
        + '  }\n'
        + '`'}</code></pre>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Performance Optimization</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby includes many optimizations out of the box: automatic code splitting per route, prefetching of linked pages, image optimization, and critical CSS inlining.
      </p>
      <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
        <li><strong>Code Splitting:</strong> Each page loads only its required JavaScript; shared code is extracted into common chunks</li>
        <li><strong>Prefetching:</strong> Resources for linked pages are prefetched when links enter the viewport</li>
        <li><strong>Image Pipeline:</strong> Responsive sizes, WebP/AVIF, lazy loading, and blur-up placeholders</li>
        <li><strong>Static HTML:</strong> Pre-rendered HTML means no server round trips and immediate content display</li>
        <li><strong>Asset Fingerprinting:</strong> Content hashes enable aggressive long-term caching</li>
      </ul>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// gatsby-config.js - Build performance flags\n'
        + 'module.exports = {\n'
        + '  flags: {\n'
        + '    PARALLEL_SOURCING: true,  // Parallel data sourcing\n'
        + '  },\n'
        + '  plugins: [{\n'
        + '    resolve: "gatsby-plugin-sharp",\n'
        + '    options: {\n'
        + '      defaults: {\n'
        + '        formats: ["auto", "webp"],\n'
        + '        placeholder: "dominantColor",\n'
        + '        quality: 80,\n'
        + '        breakpoints: [750, 1080, 1366, 1920],\n'
        + '      },\n'
        + '    },\n'
        + '  }],\n'
        + '}'}</code></pre>

      {/* Deployment */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Deployment</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby outputs static files that deploy to any host. SSR and DSG require serverless function support. Netlify acquired Gatsby in 2023 and integrated Gatsby Cloud features into their platform.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Platform</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>SSG</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>SSR/DSG</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Netlify', 'Yes', 'Yes', 'Best Gatsby support (acquired Gatsby)'],
              ['Vercel', 'Yes', 'Yes', 'Serverless functions for SSR/DSG'],
              ['AWS S3 + CloudFront', 'Yes', 'No', 'Low cost, static-only'],
              ['Cloudflare Pages', 'Yes', 'Partial', 'Global CDN, generous free tier'],
              ['GitHub Pages', 'Yes', 'No', 'Free for open source'],
            ].map(([platform, ssg, ssr, notes], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontWeight: 600 }}>{platform}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{ssg}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{ssr}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'# Netlify deployment with SSR/DSG support\n'
        + 'npm install gatsby-adapter-netlify\n'
        + '\n'
        + '// gatsby-config.js\n'
        + 'const { NetlifyAdapter } = require("gatsby-adapter-netlify")\n'
        + 'module.exports = {\n'
        + '  adapter: NetlifyAdapter(),\n'
        + '  // ... plugins\n'
        + '}\n'
        + '\n'
        + '# netlify.toml\n'
        + '[build]\n'
        + '  command = "gatsby build"\n'
        + '  publish = "public"\n'
        + '\n'
        + '[[headers]]\n'
        + '  for = "/static/*"\n'
        + '  [headers.values]\n'
        + '    Cache-Control = "public, max-age=31536000, immutable"'}</code></pre>

      {/* Gatsby vs Next.js vs Astro */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Gatsby vs Next.js vs Astro</h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Gatsby 5</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Next.js 15</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Astro 5</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Primary Use', 'Multi-source content sites', 'Full-stack web apps', 'Content-focused static sites'],
              ['Data Layer', 'Built-in GraphQL', 'Bring your own', 'Content Collections'],
              ['Rendering', 'SSG, SSR, DSG', 'SSG, SSR, ISR, RSC', 'SSG, SSR (on-demand)'],
              ['Client JS', '~80 KB (React)', '~85 KB (React)', '0 KB (zero JS default)'],
              ['UI Framework', 'React only', 'React only', 'Any (React, Vue, Svelte)'],
              ['Plugin Count', '2,800+ plugins', 'npm ecosystem', 'Growing integrations'],
              ['Image Handling', 'Excellent (built-in)', 'Good (next/image)', 'Good (astro:assets)'],
              ['Build Speed', 'Moderate (DSG helps)', 'Fast (ISR)', 'Very fast'],
              ['Learning Curve', 'Moderate (GraphQL)', 'Moderate', 'Low (HTML-first)'],
              ['Community', 'Large but declining', 'Very large', 'Rapidly growing'],
            ].map(([feature, gatsby, next, astro], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontWeight: 600 }}>{feature}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{gatsby}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{next}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{astro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>When to Choose Each Framework</h3>
      <p style={{ marginBottom: '0.5rem', lineHeight: '1.7' }}><strong>Choose Gatsby when:</strong> You aggregate data from multiple sources, want a mature plugin ecosystem, are comfortable with GraphQL, and are building content-heavy sites with automatic image optimization.</p>
      <p style={{ marginBottom: '0.5rem', lineHeight: '1.7' }}><strong>Choose Next.js when:</strong> You need dynamic web apps with authentication, real-time features, React Server Components, ISR, or prefer bringing your own data fetching strategy.</p>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}><strong>Choose Astro when:</strong> You want zero JS by default, need to mix UI frameworks, prefer an HTML-first approach, or are building blogs, docs, and marketing pages where interactivity is minimal.</p>

      {/* Gatsby 5 Slice API */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Gatsby 5: Slice API</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby 5 introduced the Slice API, allowing shared components (headers, footers, sidebars) to be built independently. When a navigation bar changes, only the slice rebuilds instead of every page that includes it.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// gatsby-node.js - Define slices\n'
        + 'exports.createSlices = async ({ actions }) => {\n'
        + '  actions.createSlice({\n'
        + '    id: "header",\n'
        + '    component: require.resolve("./src/components/Header.js"),\n'
        + '  })\n'
        + '  actions.createSlice({\n'
        + '    id: "footer",\n'
        + '    component: require.resolve("./src/components/Footer.js"),\n'
        + '  })\n'
        + '}\n'
        + '\n'
        + '// src/components/Layout.js - Use slices\n'
        + 'import { Slice } from "gatsby"\n'
        + '\n'
        + 'export default function Layout({ children }) {\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <Slice alias="header" />\n'
        + '      <main>{children}</main>\n'
        + '      <Slice alias="footer" />\n'
        + '    </div>\n'
        + '  )\n'
        + '}'}</code></pre>

      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby 5 also introduced Partial Hydration (beta), allowing you to mark components as server-only. Server components render at build time and ship zero JavaScript, similar to React Server Components in Next.js but using Gatsby's own implementation. This reduces the client-side bundle for pages that mix static and interactive content.
      </p>

      {/* Common Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Common Gatsby Patterns</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Sitemap and RSS Feed</h3>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// gatsby-config.js - Sitemap + RSS\n'
        + 'module.exports = {\n'
        + '  siteMetadata: { siteUrl: "https://example.com" },\n'
        + '  plugins: [\n'
        + '    "gatsby-plugin-sitemap",\n'
        + '    {\n'
        + '      resolve: "gatsby-plugin-feed",\n'
        + '      options: {\n'
        + '        feeds: [{\n'
        + '          serialize: ({ query: { site, allMarkdownRemark } }) => {\n'
        + '            return allMarkdownRemark.nodes.map(node => ({\n'
        + '              title: node.frontmatter.title,\n'
        + '              date: node.frontmatter.date,\n'
        + '              description: node.excerpt,\n'
        + '              url: site.siteMetadata.siteUrl + "/blog/" + node.frontmatter.slug,\n'
        + '              custom_elements: [{ "content:encoded": node.html }],\n'
        + '            }))\n'
        + '          },\n'
        + '          query: `{\n'
        + '            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {\n'
        + '              nodes {\n'
        + '                excerpt\n'
        + '                html\n'
        + '                frontmatter { title, date, slug }\n'
        + '              }\n'
        + '            }\n'
        + '          }`,\n'
        + '          output: "/rss.xml",\n'
        + '          title: "My Blog RSS Feed",\n'
        + '        }],\n'
        + '      },\n'
        + '    },\n'
        + '  ],\n'
        + '}'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Environment Variables</h3>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'# .env.development\n'
        + 'CONTENTFUL_SPACE_ID=your_space_id\n'
        + 'CONTENTFUL_ACCESS_TOKEN=your_token\n'
        + 'GATSBY_API_URL=https://api.dev.example.com\n'
        + '\n'
        + '# .env.production\n'
        + 'CONTENTFUL_SPACE_ID=your_space_id\n'
        + 'CONTENTFUL_ACCESS_TOKEN=your_prod_token\n'
        + 'GATSBY_API_URL=https://api.example.com\n'
        + '\n'
        + '# Only GATSBY_ prefixed vars are available in client code.\n'
        + '# Non-prefixed vars only work in gatsby-config.js,\n'
        + '# gatsby-node.js, and gatsby-ssr.js.'}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>TypeScript Support</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby has built-in TypeScript support since version 4.8. You can use .tsx files for pages and components without additional configuration. Type generation for GraphQL queries is available through the graphql-typegen option.
      </p>
      <pre style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' }}><code>{'// gatsby-config.ts (TypeScript config supported in Gatsby 5)\n'
        + 'import type { GatsbyConfig } from "gatsby"\n'
        + '\n'
        + 'const config: GatsbyConfig = {\n'
        + '  // Enable automatic GraphQL type generation\n'
        + '  graphqlTypegen: true,\n'
        + '  siteMetadata: {\n'
        + '    title: "My TypeScript Gatsby Site",\n'
        + '    siteUrl: "https://example.com",\n'
        + '  },\n'
        + '  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap"],\n'
        + '}\n'
        + '\n'
        + 'export default config\n'
        + '\n'
        + '// src/pages/index.tsx - Type-safe page component\n'
        + 'import React from "react"\n'
        + 'import type { PageProps, HeadFC } from "gatsby"\n'
        + '\n'
        + 'const IndexPage: React.FC<PageProps> = ({ data }) => {\n'
        + '  return <h1>Hello TypeScript</h1>\n'
        + '}\n'
        + '\n'
        + 'export default IndexPage\n'
        + 'export const Head: HeadFC = () => <title>Home</title>'}</code></pre>

      {/* Migration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Migration Paths</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Whether you are migrating to Gatsby or considering moving away from it, understanding the key mapping points between frameworks saves significant effort.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>WordPress to Gatsby (Headless)</h3>
      <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
        <li>Use gatsby-source-wordpress to pull content via the WordPress REST or WPGraphQL API</li>
        <li>Keep WordPress as a headless CMS; serve the frontend through Gatsby</li>
        <li>Map WordPress templates to Gatsby page templates in gatsby-node.js</li>
        <li>Replace WordPress media with gatsby-plugin-image for automatic optimization</li>
        <li>Migrate custom PHP functionality to React components or serverless functions</li>
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Gatsby to Next.js Migration Map</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Gatsby</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Next.js Equivalent</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['gatsby-config.js plugins', 'next.config.js + npm packages'],
              ['GraphQL page queries', 'getStaticProps / fetch in RSC'],
              ['useStaticQuery hook', 'Direct imports or fetch calls'],
              ['gatsby-node.js createPages', 'getStaticPaths + generateStaticParams'],
              ['gatsby-plugin-image', 'next/image component'],
              ['Gatsby Head API', 'metadata export / Head component'],
              ['gatsby-plugin-offline', 'next-pwa or Serwist'],
              ['DSG (defer: true)', 'ISR (revalidate option)'],
              ['Gatsby Cloud', 'Vercel or Netlify'],
            ].map(([gatsby, next], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{gatsby}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
      {[
        { q: 'What is Gatsby.js and what is it used for?', a: 'Gatsby.js is a React-based static site generator with a GraphQL data layer. It builds fast, SEO-friendly websites including blogs, marketing sites, e-commerce stores, and documentation by pre-rendering pages at build time into optimized static files.' },
        { q: 'How does Gatsby use GraphQL?', a: 'Gatsby has a built-in GraphQL schema that unifies all data sources. Source plugins pull data in at build time, and you query it using page queries (for pages) or the useStaticQuery hook (for any component).' },
        { q: 'What is the difference between SSG, SSR, and DSG?', a: 'SSG pre-renders all pages at build time (default). SSR generates pages per request for dynamic content. DSG defers building low-traffic pages until first request, then caches them as static HTML.' },
        { q: 'Is Gatsby still relevant in 2026?', a: 'Gatsby is solid for multi-source content sites. However, Next.js offers more flexibility for dynamic apps, and Astro delivers better performance for content sites. Choose based on your data sourcing needs and team expertise.' },
        { q: 'How do I optimize images in Gatsby?', a: 'Use gatsby-plugin-image with StaticImage (fixed paths) or GatsbyImage (dynamic GraphQL sources). It auto-generates responsive sizes, WebP/AVIF formats, lazy loading, and blur-up placeholders.' },
        { q: 'How does Gatsby compare to Next.js?', a: 'Gatsby has a built-in GraphQL data layer and rich plugin ecosystem for content sites. Next.js is a full-stack framework with SSR, ISR, and React Server Components for dynamic apps. They serve different primary use cases.' },
        { q: 'What are the best Gatsby plugins?', a: 'Essential ones: gatsby-source-filesystem, gatsby-transformer-remark, gatsby-plugin-image, gatsby-plugin-sharp, gatsby-plugin-sitemap, gatsby-plugin-manifest, and CMS source plugins (Contentful, Sanity, WordPress).' },
        { q: 'How do I deploy a Gatsby site?', a: 'Deploy static output to any host. Use Netlify (best Gatsby support after acquisition) or Vercel for SSR/DSG. AWS S3 + CloudFront, Cloudflare Pages, and GitHub Pages work for static-only sites.' },
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem' }}>{item.q}</h3>
          <p style={{ marginBottom: 0, lineHeight: '1.7' }}>{item.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Conclusion</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        Gatsby.js remains a capable static site generator with unique strengths in data aggregation and content management. Its GraphQL data layer provides a unified interface for pulling data from any source, and its plugin ecosystem offers pre-built solutions for common needs. SSR and DSG modes in Gatsby 4, along with the Slice API in Gatsby 5, addressed earlier limitations around build times and dynamic content.
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
        The landscape has shifted: Next.js offers more versatility for full-stack applications, and Astro delivers better performance for content-driven sites. Choose Gatsby when your project benefits from its data layer, plugin ecosystem, and the unified React foundation it provides. For new projects, evaluate all three frameworks against your specific requirements.
      </p>
    </article>
  );
}
