// generate-blog-pages.js
// Generates content/blog pages from data/blog/blog.json
// Usage: node scripts/generate-blog-pages.js
//
// Image handling:
// - If image field is set, copies from images/blogs/{filename} to content/blog/{id}/featured.png
// - If image starts with http, downloads from URL
// - Images are named by identifier (e.g., 2025-12-01-norway-exit-strategy.png)

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_FILE = path.join(__dirname, '..', 'data', 'blog', 'blog.json');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const IMAGES_DIR = path.join(__dirname, '..', 'images', 'blogs');

// Copy image from source to destination
function copyImage(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

// Download image from URL
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol.get(url, (response) => {
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

// Handle image for a blog post
async function handleImage(post, postDir) {
  if (!post.image) return false;

  const destPath = path.join(postDir, 'featured.png');

  // Check if it's a URL
  if (post.image.startsWith('http://') || post.image.startsWith('https://')) {
    try {
      await downloadImage(post.image, destPath);
      console.log(`  Downloaded image for: ${post.identifier}`);
      return true;
    } catch (err) {
      console.warn(`  Warning: Failed to download image for ${post.identifier}: ${err.message}`);
      return false;
    }
  }

  // It's a local filename - copy from images folder
  const srcPath = path.join(IMAGES_DIR, post.image);
  if (copyImage(srcPath, destPath)) {
    return true;
  } else {
    console.warn(`  Warning: Image not found for ${post.identifier}: ${srcPath}`);
    return false;
  }
}

function generateFrontmatter(post) {
  const lines = ['---'];

  // Title
  lines.push(`title: "${post.name.replace(/"/g, '\\"')}"`);

  // Identifier
  lines.push(`identifier: "${post.identifier}"`);

  // Date
  if (post.datePublished) {
    lines.push(`date: ${post.datePublished}`);
  }

  // Description
  if (post.description) {
    lines.push(`description: "${post.description.replace(/"/g, '\\"')}"`);
  }

  // Abstract/Summary
  if (post.abstract) {
    lines.push(`summary: "${post.abstract.replace(/"/g, '\\"')}"`);
  }

  // Show hero
  if (post.showHero !== undefined) {
    lines.push(`showHero: ${post.showHero}`);
  }

  // Draft
  if (post.draft) {
    lines.push(`draft: true`);
  }

  // External URL
  if (post.url) {
    lines.push(`externalUrl: "${post.url}"`);
  }

  // Topics (structured, from topics.json)
  if (post.topics && post.topics.length > 0) {
    lines.push(`topics:`);
    for (const topic of post.topics) {
      lines.push(`  - "${topic}"`);
    }
  }

  // Tags (free-form keywords)
  if (post.tags && post.tags.length > 0) {
    lines.push(`tags:`);
    for (const tag of post.tags) {
      lines.push(`  - "${tag}"`);
    }
  }

  // Audience (personas)
  if (post.audience && post.audience.length > 0) {
    lines.push(`audiences:`);
    for (const aud of post.audience) {
      lines.push(`  - "${aud}"`);
    }
  }

  // Authors
  if (post.author && post.author.length > 0) {
    lines.push(`authors:`);
    for (const auth of post.author) {
      lines.push(`  - "${auth}"`);
    }
  }

  // Related laws (if specified)
  if (post.relatedLaws && post.relatedLaws.length > 0) {
    lines.push(`relatedLaws:`);
    for (const law of post.relatedLaws) {
      lines.push(`  - "${law}"`);
    }
  }

  // Related posts (if specified)
  if (post.relatedPosts && post.relatedPosts.length > 0) {
    lines.push(`relatedPosts:`);
    for (const p of post.relatedPosts) {
      lines.push(`  - "${p}"`);
    }
  }

  // Layout and type
  lines.push(`layout: "single"`);
  lines.push(`type: "blog"`);

  lines.push('---');
  return lines.join('\n');
}

async function generateBlogPages() {
  // Read blog data
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Error: ${DATA_FILE} not found`);
    console.log('Run: node scripts/migrate-blog-to-json.js first');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const posts = data.itemListElement || [];

  console.log(`Processing ${posts.length} blog posts...\n`);

  let created = 0;
  let updated = 0;

  for (const post of posts) {
    const postDir = path.join(CONTENT_DIR, post.identifier);
    const indexPath = path.join(postDir, 'index.md');

    // Create directory if needed
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
      console.log(`  Created directory: ${post.identifier}/`);
    }

    // Handle image (copy or download)
    await handleImage(post, postDir);

    // Generate frontmatter
    const frontmatter = generateFrontmatter(post);

    // Get body content
    const body = post.body || '';

    // Combine frontmatter and body
    const content = `${frontmatter}\n\n${body}\n`;

    // Check if file exists and content differs
    const existed = fs.existsSync(indexPath);
    const existingContent = existed ? fs.readFileSync(indexPath, 'utf8') : '';

    if (content !== existingContent) {
      fs.writeFileSync(indexPath, content);
      if (existed) {
        updated++;
        console.log(`✓ Updated: ${post.identifier}`);
      } else {
        created++;
        console.log(`✓ Created: ${post.identifier}`);
      }
    } else {
      console.log(`  Unchanged: ${post.identifier}`);
    }
  }

  // Generate _index.md for the blog list page
  const indexContent = `---
title: "Blog"
description: "Articles on digital sovereignty, cloud independence, and data protection for Norwegian and European organizations."
layout: "list"
---

Insights and analysis on digital sovereignty, cloud independence, and data protection.
`;

  const listIndexPath = path.join(CONTENT_DIR, '_index.md');
  if (!fs.existsSync(listIndexPath)) {
    fs.writeFileSync(listIndexPath, indexContent);
    console.log(`\n✓ Created: _index.md`);
  }

  console.log(`\n✓ Done: ${created} created, ${updated} updated, ${posts.length - created - updated} unchanged`);
}

generateBlogPages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
