#!/usr/bin/env node

/**
 * Generate /sovereignsky/{project-id}/ pages from data/sovereignsky/projects.json
 *
 * Creates:
 * - content/sovereignsky/_index.md (list page)
 * - content/sovereignsky/{identifier}/_index.md (project section page)
 *
 * Note: Subpages are manually created content, not generated.
 * The generator only creates the parent _index.md for each project.
 *
 * Usage: node scripts/generate-sovereignsky-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data', 'sovereignsky');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'sovereignsky');
const IMAGES_DIR = path.join(ROOT_DIR, 'images', 'sovereignsky');

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
 * Handle image for a project
 * - Copies from images/sovereignsky/ folder
 * - Saves as featured.png in content folder
 */
function handleImage(project, projectDir) {
  if (!project.image) return false;

  // Determine destination filename (keep original extension)
  const ext = path.extname(project.image);
  const destPath = path.join(projectDir, `featured${ext}`);

  // Copy from images folder
  const srcPath = path.join(IMAGES_DIR, project.image);
  if (copyImage(srcPath, destPath)) {
    console.log(`  Copied image for: ${project.identifier}`);
    return true;
  } else {
    console.warn(`  Warning: Image not found for ${project.identifier}: ${srcPath}`);
    return false;
  }
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

// Build frontmatter from project data
function buildFrontmatter(project) {
  const lines = [
    `title: ${yamlString(project.name)}`,
    `description: ${yamlString(project.description)}`,
  ];

  if (project.dateStarted) {
    lines.push(`date: ${project.dateStarted}`);
  }

  if (project.status) {
    lines.push(`status: ${yamlString(project.status)}`);
  }

  // Topics
  if (project.topics && project.topics.length > 0) {
    lines.push(...yamlStringList('topics', project.topics));
  }

  // Tags
  if (project.tags && project.tags.length > 0) {
    lines.push(...yamlStringList('tags', project.tags));
  }

  // Hero settings for section pages
  lines.push('showHero: true');
  lines.push('heroStyle: "big"');

  // Cascade settings for subpages
  lines.push('cascade:');
  lines.push('  showTableOfContents: true');
  lines.push('  showDate: false');
  lines.push('  showAuthor: false');

  return lines.join('\n');
}

// Build body content from project data
function buildBody(project) {
  const parts = [];

  if (project.summary) {
    parts.push(project.summary);
  }

  // Add body content if defined
  if (project.body) {
    parts.push('\n' + project.body);
  }

  // List subpages if defined
  if (project.subpages && project.subpages.length > 0) {
    parts.push('\n## Resources\n');
    project.subpages.forEach(sub => {
      const desc = sub.description ? ` - ${sub.description}` : '';
      parts.push(`- [${sub.name}](${sub.identifier}/)${desc}`);
    });
  }

  return parts.join('\n');
}

async function main() {
  console.log('Generating /sovereignsky/ pages from data/sovereignsky/projects.json...\n');

  const projects = readJson(path.join(DATA_DIR, 'projects.json'));

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;

  // Generate section _index.md
  const sectionIndexPath = path.join(CONTENT_DIR, '_index.md');
  const sectionIndexContent = `---
title: "SovereignSky Projects"
description: "Open source tools and frameworks for digital sovereignty"
---

Explore our projects focused on digital sovereignty assessment and improvement.
`;

  const sectionIsNew = !fs.existsSync(sectionIndexPath);
  fs.writeFileSync(sectionIndexPath, sectionIndexContent);
  if (sectionIsNew) {
    console.log(`CREATE: _index.md`);
    created++;
  } else {
    console.log(`UPDATE: _index.md`);
    updated++;
  }

  // Generate each project page
  for (const project of projects) {
    const projectDir = path.join(CONTENT_DIR, project.identifier);
    const indexPath = path.join(projectDir, '_index.md');

    ensureDir(projectDir);

    // Handle image (copy from images folder)
    handleImage(project, projectDir);

    const frontmatter = buildFrontmatter(project);
    const body = buildBody(project);

    const isNew = !fs.existsSync(indexPath);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);

    if (isNew) {
      console.log(`CREATE: ${project.identifier}/_index.md`);
      created++;
    } else {
      console.log(`UPDATE: ${project.identifier}/_index.md`);
      updated++;
    }
  }

  console.log(`\nCreated: ${created} pages`);
  console.log(`Updated: ${updated} pages`);
  console.log(`Total: ${projects.length} projects`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
