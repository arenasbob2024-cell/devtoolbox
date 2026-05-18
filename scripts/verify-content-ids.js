#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    } else {
      seen.add(value);
    }
  }

  return [...duplicates].sort();
}

function extractMatches(source, pattern) {
  return [...source.matchAll(pattern)].map(match => match[1]);
}

const toolsSource = readProjectFile('src/lib/tools.ts');
const blogSource = readProjectFile('src/data/blog-posts.ts');

const toolPaths = extractMatches(toolsSource, /path:\s*['"]\/tools\/([^'"]+)['"]/g);
const blogSlugs = extractMatches(blogSource, /slug:\s*['"]([^'"]+)['"]/g);

const duplicateToolPaths = findDuplicates(toolPaths);
const duplicateBlogSlugs = findDuplicates(blogSlugs);

console.log(`Tool paths: ${toolPaths.length} total, ${new Set(toolPaths).size} unique`);
console.log(`Blog slugs: ${blogSlugs.length} total, ${new Set(blogSlugs).size} unique`);

if (duplicateToolPaths.length > 0) {
  console.error(`Duplicate tool paths: ${duplicateToolPaths.join(', ')}`);
}

if (duplicateBlogSlugs.length > 0) {
  console.error(`Duplicate blog slugs: ${duplicateBlogSlugs.join(', ')}`);
}

if (duplicateToolPaths.length > 0 || duplicateBlogSlugs.length > 0) {
  process.exit(1);
}
