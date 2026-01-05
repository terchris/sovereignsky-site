#!/usr/bin/env node

/**
 * Split ICRC Data Protection Handbook PDF into chapter markdown files
 *
 * Usage: node scripts/split-icrc-handbook.js
 *
 * This script:
 * 1. Reads the full PDF
 * 2. Extracts text page by page
 * 3. Uses known chapter page numbers for accurate splitting
 * 4. Creates numbered markdown files for each chapter
 */

const fs = require('fs');
const path = require('path');

// pdfjs-dist for Node.js
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

const PDF_PATH = path.join(__dirname, '..', 'content', 'publications', 'icrc-data-protection-handbook', 'full-Handbook_on_Data_Protection_in_Humanitarian_Action.pdf');
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'publications', 'icrc-data-protection-handbook', 'chapters');

// Known chapters from the ICRC handbook (3rd edition) with exact page numbers
// Discovered by scanning for uppercase "CHAPTER X" patterns
const CHAPTERS = [
  { num: 0, startPage: 7, title: 'Contents', slug: 'contents' },
  { num: 0.5, startPage: 16, title: 'Contributors', slug: 'contributors' },
  { num: 0.6, startPage: 20, title: 'Foreword', slug: 'foreword' },
  { num: 0.7, startPage: 23, title: 'Acknowledgements', slug: 'acknowledgements' },
  { num: 1, startPage: 33, title: 'Introduction', slug: 'introduction' },
  { num: 2, startPage: 43, title: 'Basic Principles of Data Protection', slug: 'basic-principles' },
  { num: 3, startPage: 73, title: 'Legal Bases for Personal Data Processing', slug: 'legal-bases' },
  { num: 4, startPage: 87, title: 'International Data Sharing', slug: 'international-data-sharing' },
  { num: 5, startPage: 95, title: 'Data Protection Impact Assessments', slug: 'impact-assessments' },
  { num: 6, startPage: 107, title: 'Designing for Data Protection', slug: 'designing-for-data-protection' },
  { num: 7, startPage: 127, title: 'Drones', slug: 'drones' },
  { num: 8, startPage: 143, title: 'Biometrics', slug: 'biometrics' },
  { num: 9, startPage: 159, title: 'Cash and Voucher Assistance', slug: 'cash-voucher-assistance' },
  { num: 10, startPage: 177, title: 'Cloud Services', slug: 'cloud-services' },
  { num: 11, startPage: 201, title: 'Cloud and Government Access', slug: 'cloud-government-access' },
  { num: 12, startPage: 221, title: 'Mobile Messaging Apps', slug: 'mobile-messaging' },
  { num: 13, startPage: 243, title: 'Digital Identity', slug: 'digital-identity' },
  { num: 14, startPage: 261, title: 'Social Media', slug: 'social-media' },
  { num: 15, startPage: 279, title: 'Blockchain', slug: 'blockchain' },
  { num: 16, startPage: 305, title: 'Connectivity as Aid', slug: 'connectivity-as-aid' },
  { num: 17, startPage: 319, title: 'Artificial Intelligence', slug: 'artificial-intelligence' },
];

async function extractTextFromPDF(pdfPath) {
  console.log('Loading PDF...');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  console.log(`PDF has ${pdf.numPages} pages`);

  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items
      .map(item => item.str)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    pages.push({ pageNum: i, text });

    if (i % 50 === 0) {
      console.log(`  Extracted ${i}/${pdf.numPages} pages...`);
    }
  }

  return { pages, numPages: pdf.numPages };
}

function calculateEndPages(chapters, totalPages) {
  // Sort by start page and calculate end pages
  const sorted = [...chapters].sort((a, b) => a.startPage - b.startPage);
  for (let i = 0; i < sorted.length; i++) {
    if (i < sorted.length - 1) {
      sorted[i].endPage = sorted[i + 1].startPage - 1;
    } else {
      sorted[i].endPage = totalPages;
    }
  }
  return sorted;
}

function extractChapterContent(pages, chapter) {
  const content = [];
  for (let i = chapter.startPage - 1; i < chapter.endPage; i++) {
    if (pages[i]) {
      content.push(pages[i].text);
    }
  }
  return content.join('\n\n');
}

function convertToMarkdown(text, chapterTitle) {
  // Basic text cleanup and markdown conversion
  let md = text;

  // Clean up common PDF artifacts
  md = md.replace(/\s+/g, ' ');

  // Add paragraph breaks at sentence endings followed by capital letters
  md = md.replace(/\. ([A-Z])/g, '.\n\n$1');

  // Try to identify section headers (numbered patterns like "1.1", "1.2.3")
  md = md.replace(/(\d+\.\d+(?:\.\d+)?)\s+([A-Z][A-Za-z\s]+)(?=\s)/g, '\n\n### $1 $2\n\n');

  return md;
}

function generateFrontmatter(chapter, index) {
  const isMainChapter = Number.isInteger(chapter.num) && chapter.num >= 1;
  const displayNum = isMainChapter ? chapter.num : '';
  const titlePrefix = isMainChapter ? `Chapter ${chapter.num}: ` : '';

  return `---
title: "${titlePrefix}${chapter.title}"
description: "ICRC Handbook on Data Protection in Humanitarian Action - ${chapter.title}"
weight: ${index + 1}
---

`;
}

async function main() {
  console.log('ICRC Data Protection Handbook - Chapter Splitter\n');

  // Create output directory (clean it first if exists)
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
    console.log('Cleaned existing chapters directory');
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created output directory: ${OUTPUT_DIR}\n`);

  // Extract text from PDF
  const { pages, numPages } = await extractTextFromPDF(PDF_PATH);

  // Calculate end pages for each chapter
  const chapters = calculateEndPages(CHAPTERS, numPages);

  console.log(`\nProcessing ${chapters.length} chapters\n`);

  // Generate markdown files for each chapter
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    // Create numbered filename for proper ordering
    const indexNum = String(i + 1).padStart(2, '0');
    const filename = `${indexNum}-${chapter.slug}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);

    console.log(`Writing: ${filename} (pages ${chapter.startPage}-${chapter.endPage})`);

    const content = extractChapterContent(pages, chapter);
    const markdown = convertToMarkdown(content, chapter.title);
    const frontmatter = generateFrontmatter(chapter, i);

    fs.writeFileSync(filepath, frontmatter + markdown);
  }

  // Create _index.md for the chapters section
  const chapterList = chapters.map((ch, i) => {
    const isMain = Number.isInteger(ch.num) && ch.num >= 1;
    const prefix = isMain ? `Chapter ${ch.num}: ` : '';
    const num = String(i + 1).padStart(2, '0');
    return `- [${prefix}${ch.title}](${num}-${ch.slug}/)`;
  }).join('\n');

  const indexContent = `---
title: "Chapters"
description: "Individual chapters from the ICRC Handbook on Data Protection in Humanitarian Action"
---

This section contains individual chapters extracted from the ICRC Handbook on Data Protection in Humanitarian Action (3rd Edition, 2024).

## Chapters

${chapterList}

For the complete handbook, see the [main publication page](../).
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, '_index.md'), indexContent);
  console.log('\nCreated _index.md');

  console.log('\nDone! Generated', chapters.length, 'markdown files in:', OUTPUT_DIR);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
