// migrate-laws-body.js
// Extracts body content from existing law markdown files and adds to laws.json
// Usage: node scripts/migrate-laws-body.js

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'laws', 'laws.json');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'laws');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };
  return {
    frontmatter: match[1],
    body: match[2].trim()
  };
}

function migrateLawsBody() {
  // Read laws data
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Error: ${DATA_FILE} not found`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const laws = data.itemListElement || [];

  console.log(`Processing ${laws.length} laws...\n`);

  let updated = 0;
  let withBody = 0;

  for (const law of laws) {
    const indexPath = path.join(CONTENT_DIR, law.identifier, 'index.md');

    if (!fs.existsSync(indexPath)) {
      console.log(`  Skipping ${law.identifier}: no markdown file`);
      continue;
    }

    const content = fs.readFileSync(indexPath, 'utf8');
    const { body } = parseFrontmatter(content);

    // Check if there's custom body content (not the default placeholder)
    if (body && !body.includes('No additional commentary yet')) {
      law.body = body;
      withBody++;
      console.log(`✓ ${law.identifier}: extracted custom body`);
    } else {
      // Set empty body for default content
      law.body = '';
      console.log(`  ${law.identifier}: no custom body`);
    }

    // Add image field (default to identifier.png)
    if (!law.image) {
      law.image = `${law.identifier}.png`;
    }

    updated++;
  }

  // Write updated JSON
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log(`\n✓ Done: ${updated} laws processed, ${withBody} with custom body content`);
  console.log(`\nJSON updated with body and image fields.`);
  console.log(`Images should be placed in: images/laws/{identifier}.png`);
}

migrateLawsBody();
