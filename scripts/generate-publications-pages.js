#!/usr/bin/env node

/**
 * Generate /publications/{publication-id}/ pages from data/publications/publications.json
 *
 * JSON Structure (schema.org-aligned):
 * - identifier, name, description, datePublished, url, author, publisher, topics, audience, tags
 * - abstract (short), summary (longer) for generated headings
 * - image (filename or URL) for hero image
 *
 * Field Mappings (JSON → Frontmatter):
 * - datePublished → date (schema.org → Hugo)
 * - name → title
 * - url → external_url
 * - topics → topics (direct mapping)
 * - author → authors
 *
 * Creates stub pages for each publication. If a page already exists with content,
 * it preserves the content AFTER the Summary section and only updates frontmatter
 * and the Abstract/Summary headings from JSON.
 *
 * Image handling:
 * - If image starts with http, downloads from URL
 * - Otherwise, copies from images/publications/{filename}
 * - Saves as featured.png in content folder
 *
 * Usage: node scripts/generate-publications-pages.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data', 'publications');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'publications');
const IMAGES_DIR = path.join(ROOT_DIR, 'images', 'publications');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

/**
 * Copy image from source to destination
 */
function copyImage(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

/**
 * Download image from URL to destination
 * Returns a promise
 */
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

/**
 * Handle image for a publication
 * - Downloads from URL or copies from images folder
 * - Saves as featured.png in content folder
 */
async function handleImage(pub, pubDir) {
  if (!pub.image) return false;

  const destPath = path.join(pubDir, 'featured.png');

  // Check if it's a URL
  if (pub.image.startsWith('http://') || pub.image.startsWith('https://')) {
    try {
      await downloadImage(pub.image, destPath);
      console.log(`  Downloaded image for: ${pub.identifier}`);
      return true;
    } catch (err) {
      console.warn(`  Warning: Failed to download image for ${pub.identifier}: ${err.message}`);
      return false;
    }
  }

  // It's a local filename - copy from images folder
  const srcPath = path.join(IMAGES_DIR, pub.image);
  if (copyImage(srcPath, destPath)) {
    console.log(`  Copied image for: ${pub.identifier}`);
    return true;
  } else {
    console.warn(`  Warning: Image not found for ${pub.identifier}: ${srcPath}`);
    return false;
  }
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

/**
 * Extract body content AFTER the Summary section
 * Looks for content after the first "---" divider that follows "## Summary"
 */
function extractBodyAfterSummary(body) {
  if (!body) return '';

  // Find ## Summary section
  const summaryMatch = body.match(/^## Summary\s*\n/m);
  if (!summaryMatch) {
    // No Summary section found - might be custom format, preserve as-is
    // But check if it starts with ## Abstract (already processed)
    if (body.startsWith('## Abstract')) {
      // Already processed - extract content after ## Summary section
      const afterAbstract = body.replace(/^## Abstract[\s\S]*?(?=## |$)/, '');
      const afterSummary = afterAbstract.replace(/^## Summary[\s\S]*?(?=---\s*\n|## |$)/, '');
      return afterSummary.replace(/^---\s*\n/, '').trim();
    }
    return body;
  }

  // Find the first "---" divider after ## Summary
  const afterSummaryStart = summaryMatch.index + summaryMatch[0].length;
  const restOfBody = body.slice(afterSummaryStart);

  // Look for the divider "---" that ends the summary section
  const dividerMatch = restOfBody.match(/\n---\s*\n/);
  if (dividerMatch) {
    const contentAfterDivider = restOfBody.slice(dividerMatch.index + dividerMatch[0].length).trim();
    return contentAfterDivider;
  }

  // No divider found - check for next ## heading
  const nextHeadingMatch = restOfBody.match(/\n## /);
  if (nextHeadingMatch) {
    return restOfBody.slice(nextHeadingMatch.index + 1).trim();
  }

  // No clear boundary - return empty (summary was all the content)
  return '';
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

// Build frontmatter from publication data
// Maps schema.org field names to Hugo field names (see Field Mappings in header)
function buildFrontmatter(pub) {
  const lines = [
    `title: ${yamlString(pub.name)}`,           // name → title
    `description: ${yamlString(pub.description)}`,
    `date: ${pub.datePublished}`,               // datePublished → date
    `external_url: ${yamlString(pub.url)}`,     // url → external_url
    `publisher: ${yamlString(pub.publisher)}`
  ];

  // Authors (optional - some reports don't have named authors)
  if (pub.author && pub.author.length > 0) {
    lines.push(...yamlStringList('authors', pub.author));
  }

  // Topics
  if (pub.topics && pub.topics.length > 0) {
    lines.push(...yamlStringList('topics', pub.topics));
  }

  // Audience (for persona filtering)
  if (pub.audience && pub.audience.length > 0) {
    lines.push(...yamlStringList('audience', pub.audience));
  }

  // Tags
  if (pub.tags && pub.tags.length > 0) {
    lines.push(...yamlStringList('tags', pub.tags));
  }

  // Hugo type
  lines.push(`type: publications`);

  return lines.join('\n');
}

// Build the abstract and summary sections from JSON
function buildAbstractAndSummary(pub) {
  const parts = [];

  if (pub.abstract) {
    parts.push(`## Abstract\n\n${pub.abstract}`);
  }

  if (pub.summary) {
    parts.push(`## Summary\n\n${pub.summary}`);
  }

  return parts.join('\n\n');
}

// Build default body content for new pages (no custom content)
function buildDefaultBody(pub) {
  const abstractSummary = buildAbstractAndSummary(pub);
  if (abstractSummary) {
    return abstractSummary;
  }
  // Fallback if no abstract/summary in JSON
  return `## Summary\n\n*Content from ${pub.publisher}.*`;
}

async function main() {
  console.log('Generating /publications/ pages from data/publications/publications.json...\n');

  const publications = readJson(path.join(DATA_DIR, 'publications.json'));

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;

  for (const pub of publications) {
    const pubDir = path.join(CONTENT_DIR, pub.identifier);
    const indexPath = path.join(pubDir, 'index.md');

    ensureDir(pubDir);

    // Handle image (copy or download)
    await handleImage(pub, pubDir);

    // Start with abstract and summary from JSON
    const abstractSummary = buildAbstractAndSummary(pub);
    let customBody = '';

    // Check if file exists and has custom content after the summary
    if (fs.existsSync(indexPath)) {
      const existing = fs.readFileSync(indexPath, 'utf8');
      const parsed = parseMarkdown(existing);

      // Extract content after the Summary section
      customBody = extractBodyAfterSummary(parsed.body);

      if (customBody && !customBody.includes('No additional commentary yet')) {
        console.log(`  Preserving custom content for: ${pub.identifier}`);
      } else {
        customBody = '';
      }
      updated++;
    } else {
      created++;
    }

    // Build full body: Abstract + Summary from JSON, then custom content
    let body = abstractSummary;
    if (customBody) {
      body += '\n\n---\n\n' + customBody;
    }

    const frontmatter = buildFrontmatter(pub);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
  }

  // Generate _index.md for the list page
  const listIndexPath = path.join(CONTENT_DIR, '_index.md');
  const listIndexContent = `---
title: "Publications"
description: "Curated references to authoritative sources on digital sovereignty, data protection, and humanitarian technology"
---

{{< page-stats section="publications" >}}
`;

  const listIndexIsNew = !fs.existsSync(listIndexPath);
  fs.writeFileSync(listIndexPath, listIndexContent);
  if (listIndexIsNew) {
    console.log(`CREATE: _index.md`);
    created++;
  } else {
    console.log(`UPDATE: _index.md`);
    updated++;
  }

  console.log(`\nCreated: ${created} new publication pages`);
  console.log(`Updated: ${updated} existing publication pages`);
  console.log(`Total: ${publications.length} publications in /publications/{id}/index.md`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
