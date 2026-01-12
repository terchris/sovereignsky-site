#!/usr/bin/env node

/**
 * Generate /sovereignsky/{project-id}/ pages from data/sovereignsky/projects.json
 *
 * Creates:
 * - content/sovereignsky/_index.md (list page)
 * - content/sovereignsky/{identifier}/index.md (single project page)
 *
 * Image handling:
 * - Copies from images/projects/{filename} to content/sovereignsky/{id}/featured.{ext}
 *
 * Usage: node scripts/generate-sovereignsky-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'data', 'sovereignsky', 'projects.json');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'sovereignsky');
const IMAGES_DIR = path.join(ROOT_DIR, 'images', 'projects');

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
 * - Saves as featured.{ext} in content folder
 */
function handleImage(project, projectDir) {
  if (!project.image) return false;

  // Determine destination filename (keep original extension)
  const ext = path.extname(project.image);
  const destPath = path.join(projectDir, `featured${ext}`);

  // Copy from images folder
  const srcPath = path.join(IMAGES_DIR, project.image);
  if (copyImage(srcPath, destPath)) {
    return true;
  } else {
    console.warn(`  Warning: Image not found for ${project.identifier}: ${srcPath}`);
    return false;
  }
}

function yamlEscape(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/"/g, '\\"');
}

/**
 * Render shortcodes array to Hugo shortcode syntax
 * Each shortcode becomes: {{< name id="id" >}}\n{json config}\n{{< /name >}}
 */
function renderShortcodes(shortcodes) {
  if (!shortcodes || shortcodes.length === 0) return '';

  const parts = [];
  for (const sc of shortcodes) {
    const configJson = JSON.stringify(sc.config, null, 2);
    parts.push(`{{< ${sc.name} id="${sc.id}" >}}`);
    parts.push(configJson);
    parts.push(`{{< /${sc.name} >}}`);
  }
  return parts.join('\n');
}

function generateFrontmatter(project) {
  const lines = ['---'];

  // Title
  lines.push(`title: "${yamlEscape(project.name)}"`);

  // Identifier
  lines.push(`identifier: "${project.identifier}"`);

  // Weight for sorting
  if (project.weight !== undefined) {
    lines.push(`weight: ${project.weight}`);
  }

  // Date from project-specific fields
  if (project.project?.dateStarted) {
    lines.push(`date: ${project.project.dateStarted}`);
  }

  // Description
  if (project.description) {
    lines.push(`description: "${yamlEscape(project.description)}"`);
  }

  // Abstract (used as summary in Hugo)
  if (project.abstract) {
    lines.push(`summary: "${yamlEscape(project.abstract)}"`);
  }

  // Status from project-specific fields
  if (project.project?.status) {
    lines.push(`status: "${project.project.status}"`);
  }

  // Maturity from project-specific fields
  if (project.project?.maturity) {
    lines.push(`maturity: "${project.project.maturity}"`);
  }

  // Repository from project-specific fields
  if (project.project?.repository) {
    lines.push(`repository: "${project.project.repository}"`);
  }

  // Documentation from project-specific fields
  if (project.project?.documentation) {
    lines.push(`documentation: "${project.project.documentation}"`);
  }

  // External URL
  if (project.url) {
    lines.push(`externalUrl: "${project.url}"`);
  }

  // Topics
  if (project.topics && project.topics.length > 0) {
    lines.push(`topics:`);
    for (const topic of project.topics) {
      lines.push(`  - "${topic}"`);
    }
  }

  // Tags
  if (project.tags && project.tags.length > 0) {
    lines.push(`tags:`);
    for (const tag of project.tags) {
      lines.push(`  - "${tag}"`);
    }
  }

  // Audience
  if (project.audience && project.audience.length > 0) {
    lines.push(`audience:`);
    for (const aud of project.audience) {
      lines.push(`  - "${aud}"`);
    }
  }

  // Hero settings
  lines.push(`showHero: true`);
  lines.push(`heroStyle: "big"`);

  // Layout and type
  lines.push(`layout: "single"`);
  lines.push(`type: "sovereignsky"`);

  lines.push('---');
  return lines.join('\n');
}

function buildBody(project) {
  const parts = [];

  // Add summary if defined (longer detailed summary)
  if (project.summary) {
    parts.push(project.summary);
  }

  // Add body content if defined
  if (project.body) {
    if (parts.length > 0) parts.push('');
    parts.push(project.body);
  }

  // Add shortcodes after body content
  if (project.shortcodes && project.shortcodes.length > 0) {
    if (parts.length > 0) parts.push('');
    parts.push(renderShortcodes(project.shortcodes));
  }

  return parts.join('\n');
}

/**
 * Generate frontmatter for a subpage
 */
function generateSubpageFrontmatter(subpage, parentProject) {
  const lines = ['---'];

  lines.push(`title: "${yamlEscape(subpage.title)}"`);

  if (subpage.weight !== undefined) {
    lines.push(`weight: ${subpage.weight}`);
  }

  if (subpage.description) {
    lines.push(`description: "${yamlEscape(subpage.description)}"`);
  }

  if (subpage.summary) {
    lines.push(`summary: "${yamlEscape(subpage.summary)}"`);
  }

  // Inherit topics and audience from parent if not specified
  const topics = subpage.topics || parentProject.topics;
  if (topics && topics.length > 0) {
    lines.push(`topics:`);
    for (const topic of topics) {
      lines.push(`  - "${topic}"`);
    }
  }

  const audience = subpage.audience || parentProject.audience;
  if (audience && audience.length > 0) {
    lines.push(`audience:`);
    for (const aud of audience) {
      lines.push(`  - "${aud}"`);
    }
  }

  lines.push('---');
  return lines.join('\n');
}

/**
 * Build body content for a subpage
 */
function buildSubpageBody(subpage) {
  const parts = [];

  if (subpage.body) {
    parts.push(subpage.body);
  }

  // Add shortcodes after body content
  if (subpage.shortcodes && subpage.shortcodes.length > 0) {
    if (parts.length > 0) parts.push('');
    parts.push(renderShortcodes(subpage.shortcodes));
  }

  return parts.join('\n');
}

/**
 * Generate subpages for a project
 * Creates flat .md files (not folders) since subpages share parent's image
 */
function generateSubpages(project, projectDir, stats) {
  if (!project.subpages || project.subpages.length === 0) return;

  for (const subpage of project.subpages) {
    // Create flat .md file instead of folder
    const subpagePath = path.join(projectDir, `${subpage.identifier}.md`);

    // Clean up old folder structure if it exists
    const oldFolderPath = path.join(projectDir, subpage.identifier);
    if (fs.existsSync(oldFolderPath) && fs.statSync(oldFolderPath).isDirectory()) {
      fs.rmSync(oldFolderPath, { recursive: true });
      console.log(`  Cleaned up old folder: ${project.identifier}/${subpage.identifier}/`);
    }

    const frontmatter = generateSubpageFrontmatter(subpage, project);
    const body = buildSubpageBody(subpage);
    const content = `${frontmatter}\n\n${body}\n`;

    const existed = fs.existsSync(subpagePath);
    const existingContent = existed ? fs.readFileSync(subpagePath, 'utf8') : '';

    if (content !== existingContent) {
      fs.writeFileSync(subpagePath, content);
      if (existed) {
        stats.updated++;
        console.log(`  ✓ Updated subpage: ${project.identifier}/${subpage.identifier}.md`);
      } else {
        stats.created++;
        console.log(`  ✓ Created subpage: ${project.identifier}/${subpage.identifier}.md`);
      }
    } else {
      console.log(`    Unchanged subpage: ${project.identifier}/${subpage.identifier}.md`);
    }
  }
}

async function main() {
  console.log('Generating /sovereignsky/ pages from data/sovereignsky/projects.json...\n');

  // Read data file
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Error: ${DATA_FILE} not found`);
    process.exit(1);
  }

  const data = readJson(DATA_FILE);
  const projects = data.itemListElement || [];

  console.log(`Processing ${projects.length} projects...\n`);

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;

  // Generate section _index.md (list page) from wrapper metadata
  const listConfig = data.listConfig || {};
  const sorting = listConfig.sorting || {};
  const display = listConfig.display || {};

  const listLines = ['---'];
  listLines.push(`title: "${yamlEscape(data.name || 'Projects')}"`);
  listLines.push(`description: "${yamlEscape(data.description || '')}"`);
  if (data.abstract) {
    listLines.push(`summary: "${yamlEscape(data.abstract)}"`);
  }
  listLines.push(`layout: "list"`);

  // Sorting config
  listLines.push(`sorting:`);
  listLines.push(`  field: "${sorting.field || 'date'}"`);
  listLines.push(`  direction: "${sorting.direction || 'desc'}"`);
  listLines.push(`  fallback: "${sorting.fallback || 'title'}"`);

  // Display config
  listLines.push(`display:`);
  listLines.push(`  cardStyle: "${display.cardStyle || 'default'}"`);
  listLines.push(`  gridColumns: ${display.gridColumns || 2}`);
  listLines.push(`  showAudienceFilter: ${display.showAudienceFilter !== false}`);
  listLines.push(`  showTopicFilter: ${display.showTopicFilter !== false}`);
  listLines.push(`  showStats: ${display.showStats !== false}`);

  listLines.push('---');
  listLines.push('');
  listLines.push(data.summary || data.description || '');
  listLines.push('');

  const listIndexContent = listLines.join('\n');
  const listIndexPath = path.join(CONTENT_DIR, '_index.md');
  const listIsNew = !fs.existsSync(listIndexPath);
  const existingListContent = listIsNew ? '' : fs.readFileSync(listIndexPath, 'utf8');

  if (listIndexContent !== existingListContent) {
    fs.writeFileSync(listIndexPath, listIndexContent);
    if (listIsNew) {
      console.log(`✓ Created: _index.md`);
      created++;
    } else {
      console.log(`✓ Updated: _index.md`);
      updated++;
    }
  } else {
    console.log(`  Unchanged: _index.md`);
  }

  // Stats object for tracking subpage changes
  const stats = { created, updated };

  // Generate each project page
  for (const project of projects) {
    const projectDir = path.join(CONTENT_DIR, project.identifier);

    // Use _index.md (branch bundle) if project has subpages, index.md (leaf bundle) otherwise
    const hasSubpages = project.subpages && project.subpages.length > 0;
    const indexFilename = hasSubpages ? '_index.md' : 'index.md';
    const indexPath = path.join(projectDir, indexFilename);

    // If switching from leaf to branch bundle (or vice versa), remove the old file
    const oldLeafPath = path.join(projectDir, 'index.md');
    const oldBranchPath = path.join(projectDir, '_index.md');
    if (hasSubpages && fs.existsSync(oldLeafPath)) {
      fs.unlinkSync(oldLeafPath);
      console.log(`  Converted to branch bundle: ${project.identifier}`);
    } else if (!hasSubpages && fs.existsSync(oldBranchPath)) {
      fs.unlinkSync(oldBranchPath);
      console.log(`  Converted to leaf bundle: ${project.identifier}`);
    }

    ensureDir(projectDir);

    // Handle image (copy from images folder)
    const hasImage = handleImage(project, projectDir);
    if (hasImage) {
      console.log(`  Copied image for: ${project.identifier}`);
    }

    // Generate frontmatter and body
    const frontmatter = generateFrontmatter(project);
    const body = buildBody(project);

    // Combine frontmatter and body
    const content = `${frontmatter}\n\n${body}\n`;

    // Check if file exists and content differs
    const existed = fs.existsSync(indexPath);
    const existingContent = existed ? fs.readFileSync(indexPath, 'utf8') : '';

    if (content !== existingContent) {
      fs.writeFileSync(indexPath, content);
      if (existed) {
        stats.updated++;
        console.log(`✓ Updated: ${project.identifier}`);
      } else {
        stats.created++;
        console.log(`✓ Created: ${project.identifier}`);
      }
    } else {
      console.log(`  Unchanged: ${project.identifier}`);
    }

    // Generate subpages if defined
    generateSubpages(project, projectDir, stats);
  }

  console.log(`\n✓ Done: ${stats.created} created, ${stats.updated} updated`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
