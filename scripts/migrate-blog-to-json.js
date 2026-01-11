// migrate-blog-to-json.js
// Extracts existing blog posts from content/blog/*/index.md
// and creates data/blog/blog.json
// Usage: node scripts/migrate-blog-to-json.js

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'blog', 'blog.json');
const TOPICS_FILE = path.join(__dirname, '..', 'data', 'topics', 'topics.json');

// Load valid topics for reference
let validTopics = [];
try {
  const topicsData = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf8'));
  validTopics = topicsData.itemListElement.map(t => t.identifier);
  console.log(`Loaded ${validTopics.length} valid topics from topics.json`);
} catch (err) {
  console.warn('Could not load topics.json:', err.message);
}

// Tag to topic mapping (common mappings)
const TAG_TO_TOPIC = {
  'sovereignty': 'digital-sovereignty',
  'digital-sovereignty': 'digital-sovereignty',
  'infrastructure': 'critical-infrastructure',
  'critical-infrastructure': 'critical-infrastructure',
  'cloud-dependency': 'platform-dependency',
  'platform-dependency': 'platform-dependency',
  'vendor-lock-in': 'platform-dependency',
  'cybersecurity': 'cybersecurity',
  'security': 'cybersecurity',
  'privacy': 'privacy',
  'data-protection': 'data-protection',
  'gdpr': 'data-protection',
  'open-source': 'open-source',
  'encryption': 'encryption',
  'government-access': 'government-access',
  'surveillance': 'surveillance',
  'national-preparedness': 'national-preparedness',
  'total-defence': 'total-defence',
  'supply-chain': 'supply-chain',
  'digital-resilience': 'digital-resilience',
  'eu': 'digital-sovereignty',
  'public-sector': null, // This is an audience, not a topic
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = match[2].trim();

  // Simple YAML parser for our frontmatter
  const frontmatter = {};
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    // Array item
    if (line.match(/^\s+-\s+/)) {
      const value = line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, '');
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;

      // Check if it's starting an array
      if (value === '' || value === '[]') {
        currentKey = key;
        currentArray = [];
        frontmatter[key] = currentArray;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array like ["tag1", "tag2"]
        const arrayContent = value.slice(1, -1);
        const items = arrayContent.split(',').map(s =>
          s.trim().replace(/^["']|["']$/g, '')
        ).filter(s => s);
        frontmatter[key] = items;
        currentArray = null;
        currentKey = null;
      } else {
        // Simple value
        frontmatter[key] = value.replace(/^["']|["']$/g, '');
        currentArray = null;
        currentKey = null;
      }
    }
  }

  return { frontmatter, body };
}

function extractTopicsFromTags(tags) {
  const topics = new Set();
  const remainingTags = [];

  for (const tag of tags) {
    const mappedTopic = TAG_TO_TOPIC[tag.toLowerCase()];
    if (mappedTopic && validTopics.includes(mappedTopic)) {
      topics.add(mappedTopic);
    } else if (mappedTopic === null) {
      // Skip - it's an audience, not a tag or topic
    } else if (validTopics.includes(tag)) {
      topics.add(tag);
    } else {
      remainingTags.push(tag);
    }
  }

  return {
    topics: Array.from(topics),
    tags: remainingTags
  };
}

function inferAudience(frontmatter, body) {
  // Use existing audience if present
  if (frontmatter.audiences && frontmatter.audiences.length > 0) {
    return frontmatter.audiences;
  }

  // Infer from tags and content
  const audience = new Set();
  const tags = frontmatter.tags || [];
  const content = (frontmatter.title + ' ' + frontmatter.description + ' ' + body).toLowerCase();

  // Check tags for audience hints
  if (tags.includes('public-sector') || content.includes('government') || content.includes('public sector')) {
    audience.add('public-sector');
  }
  if (tags.includes('enterprise') || content.includes('enterprise') || content.includes('business')) {
    audience.add('enterprise');
  }
  if (content.includes('developer') || content.includes('code') || content.includes('api')) {
    audience.add('developer');
  }
  if (content.includes('it ') || content.includes('operations') || content.includes('infrastructure')) {
    audience.add('it-ops');
  }
  if (content.includes('security') || content.includes('defence') || content.includes('defense') || content.includes('military')) {
    audience.add('security');
  }

  // Default to general audiences if none inferred
  if (audience.size === 0) {
    audience.add('enterprise');
    audience.add('public-sector');
  }

  return Array.from(audience);
}

function migrateBlogPosts() {
  const blogPosts = [];

  // Get all blog directories
  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const blogDirs = entries
    .filter(e => e.isDirectory() && !e.name.startsWith('_'))
    .map(e => e.name)
    .sort();

  console.log(`Found ${blogDirs.length} blog posts to migrate\n`);

  for (const dir of blogDirs) {
    const indexPath = path.join(CONTENT_DIR, dir, 'index.md');

    if (!fs.existsSync(indexPath)) {
      console.warn(`Skipping ${dir}: no index.md found`);
      continue;
    }

    const content = fs.readFileSync(indexPath, 'utf8');
    const { frontmatter, body } = parseFrontmatter(content);

    // Extract topics from existing tags
    const { topics, tags } = extractTopicsFromTags(frontmatter.tags || []);

    // Infer audience
    const audience = inferAudience(frontmatter, body);

    const post = {
      "@type": "BlogPosting",
      "identifier": dir,
      "name": frontmatter.title || dir,
      "description": frontmatter.description || "",
      "abstract": frontmatter.summary || frontmatter.description || "",
      "datePublished": frontmatter.date || "",
      "author": frontmatter.authors || ["SovereignSky"],
      "image": "featured.jpg", // Assume featured image exists
      "topics": topics,
      "tags": tags,
      "audience": audience,
      "url": frontmatter.externalUrl || "",
      "showHero": frontmatter.showHero === 'true' || frontmatter.showHero === true,
      "draft": frontmatter.draft === 'true' || frontmatter.draft === true,
      "body": body
    };

    blogPosts.push(post);

    console.log(`✓ ${dir}`);
    console.log(`  Title: ${post.name.substring(0, 50)}...`);
    console.log(`  Topics: ${post.topics.join(', ') || '(none)'}`);
    console.log(`  Tags: ${post.tags.join(', ') || '(none)'}`);
    console.log(`  Audience: ${post.audience.join(', ')}`);
    console.log('');
  }

  // Create output structure
  const output = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SovereignSky Blog",
    "description": "Articles on digital sovereignty, cloud independence, and data protection",
    "itemListElement": blogPosts
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`\n✓ Wrote ${blogPosts.length} posts to ${OUTPUT_FILE}`);
  console.log('\nNext steps:');
  console.log('1. Review and edit data/blog/blog.json');
  console.log('2. Adjust topics and audience assignments');
  console.log('3. Run: node scripts/generate-blog-pages.js');
}

migrateBlogPosts();
