#!/usr/bin/env node

/**
 * Generate /publications/{publication-id}/ pages from data/publications/publications.json
 *
 * Uses schema.org-aligned structure:
 * - name, description, datePublished, url, author, publisher, about, audience
 *
 * Creates stub pages for each publication. If a page already exists with content,
 * it preserves the content and only updates the frontmatter.
 *
 * Usage: node scripts/generate-publications-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'publications');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'publications');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// Parse existing markdown to extract frontmatter and content
function parseMarkdown(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (match) {
    return {
      frontmatter: match[1],
      body: match[2].trim()
    };
  }
  return { frontmatter: '', body: content.trim() };
}

function yamlEscapeString(s) {
  return String(s ?? '').replace(/"/g, '\\"');
}

function yamlString(s) {
  return `"${yamlEscapeString(s)}"`;
}

function yamlStringList(key, arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const out = [`${key}:`];
  arr.forEach(item => {
    if (item === null || item === undefined) return;
    out.push(`  - ${yamlString(item)}`);
  });
  return out.length > 1 ? out : [];
}

// Build frontmatter from publication data (schema.org-aligned)
function buildFrontmatter(pub) {
  const lines = [
    `title: ${yamlString(pub.name)}`,
    `description: ${yamlString(pub.description)}`,
    `date: ${pub.datePublished}`,
    `external_url: ${yamlString(pub.url)}`,
    `publisher: ${yamlString(pub.publisher)}`
  ];

  // Authors (optional - some reports don't have named authors)
  if (pub.author && pub.author.length > 0) {
    lines.push(...yamlStringList('authors', pub.author));
  }

  // Topics (from schema.org 'about')
  if (pub.about && pub.about.length > 0) {
    lines.push(...yamlStringList('topics', pub.about));
  }

  // Audience (for persona filtering)
  if (pub.audience && pub.audience.length > 0) {
    lines.push(...yamlStringList('personas', pub.audience));
  }

  // Hugo type
  lines.push(`type: publications`);

  return lines.join('\n');
}

// Build default body content for new pages
function buildDefaultBody(pub) {
  return `## Summary

*Content from ${pub.publisher}.*

---

*No additional commentary yet. [Contribute on GitHub](https://github.com/helpers-no).*
`;
}

function main() {
  console.log('Generating /publications/ pages from data/publications/publications.json...\n');

  const publications = readJson(path.join(DATA_DIR, 'publications.json'));

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;

  publications.forEach(pub => {
    const pubDir = path.join(CONTENT_DIR, pub.id);
    const indexPath = path.join(pubDir, 'index.md');

    ensureDir(pubDir);

    let body = buildDefaultBody(pub);

    // Check if file exists and has custom content
    if (fs.existsSync(indexPath)) {
      const existing = fs.readFileSync(indexPath, 'utf8');
      const parsed = parseMarkdown(existing);

      // If there's custom body content (not just the default), preserve it
      if (parsed.body && !parsed.body.includes('No additional commentary yet')) {
        body = parsed.body;
        console.log(`  Preserving custom content for: ${pub.id}`);
      }
      updated++;
    } else {
      created++;
    }

    const frontmatter = buildFrontmatter(pub);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
  });

  console.log(`\nCreated: ${created} new publication pages`);
  console.log(`Updated: ${updated} existing publication pages`);
  console.log(`Total: ${publications.length} publications in /publications/{id}/index.md`);
}

main();
