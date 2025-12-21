#!/usr/bin/env node

/**
 * Generate /laws/{law-id}/ pages from data/laws.json
 *
 * Creates stub pages for each law. If a page already exists with content,
 * it preserves the content and only updates the frontmatter.
 *
 * Usage: node scripts/generate-laws-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'laws');

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

// Build frontmatter from law data, using definitions for human-readable descriptions
function buildFrontmatter(law, definitions) {
  // Get human-readable descriptions from definitions
  const typeDesc = definitions.type?.values?.[law.type] || '';
  const govAccessDesc = definitions.government_access?.values?.[law.government_access] || '';
  const dataProtDesc = definitions.data_protection?.values?.[law.data_protection] || '';

  const lines = [
    `title: "${law.name}"`,
    `law_id: "${law.id}"`,
    `full_name: "${law.full_name.replace(/"/g, '\\"')}"`,
    `year: ${law.year}`,
    `scope: "${law.scope}"`,
    `applies_to:`,
    ...law.applies_to.map(a => `  - "${a}"`),
    `source_url: "${law.url}"`,
    // Multi-dimensional classification fields with descriptions
    `law_type: "${law.type}"`,
    `law_type_description: "${typeDesc.replace(/"/g, '\\"')}"`,
    `government_access: "${law.government_access}"`,
    `government_access_description: "${govAccessDesc.replace(/"/g, '\\"')}"`,
    `data_protection: "${law.data_protection}"`,
    `data_protection_description: "${dataProtDesc.replace(/"/g, '\\"')}"`,
    `extraterritorial: ${law.extraterritorial}`,
    `requires_localization: ${law.requires_localization}`,
    `requires_backdoor: ${law.requires_backdoor}`,
    `layout: "single"`,
    `type: "laws"`
  ];
  return lines.join('\n');
}

// Build default body content for new pages
function buildDefaultBody(law) {
  return `${law.summary}

---

*No additional commentary yet. [Contribute on GitHub](https://github.com/norwegianredcross/sovereignsky-site).*
`;
}

function main() {
  console.log('Generating /laws/ pages from data/laws.json...\n');

  const lawsData = readJson(path.join(DATA_DIR, 'laws.json'));
  const laws = lawsData.laws || [];
  const definitions = lawsData.definitions || {};

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;

  laws.forEach(law => {
    const lawDir = path.join(CONTENT_DIR, law.id);
    const indexPath = path.join(lawDir, 'index.md');

    ensureDir(lawDir);

    let body = buildDefaultBody(law);

    // Check if file exists and has custom content
    if (fs.existsSync(indexPath)) {
      const existing = fs.readFileSync(indexPath, 'utf8');
      const parsed = parseMarkdown(existing);

      // If there's custom body content (not just the default), preserve it
      if (parsed.body && !parsed.body.includes('No additional commentary yet')) {
        body = parsed.body;
        updated++;
      } else {
        updated++;
      }
    } else {
      created++;
    }

    const frontmatter = buildFrontmatter(law, definitions);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
  });

  console.log(`Created: ${created} new law pages`);
  console.log(`Updated: ${updated} existing law pages`);
  console.log(`Total: ${laws.length} laws in /laws/{id}/index.md`);
}

main();
