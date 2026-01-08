#!/usr/bin/env node
/**
 * generate-events-pages.js
 *
 * Generates /events/{event-id}/ pages from data/events/events.json
 *
 * Creates stub pages for each event. If a page already exists with content,
 * it preserves the content and only updates the frontmatter.
 *
 * Usage: node scripts/generate-events-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const EVENTS_JSON_PATH = path.join(ROOT_DIR, 'data/events/events.json');
const EVENTS_CONTENT_DIR = path.join(ROOT_DIR, 'content/events');

// Load events data
const events = JSON.parse(fs.readFileSync(EVENTS_JSON_PATH, 'utf8'));

console.log('Generating /events/ pages from data/events/events.json...\n');
console.log(`Found ${events.length} events to process\n`);

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

// Build frontmatter from event data
function buildFrontmatter(event) {
    const lines = [
        `title: "${yamlEscapeString(event.name)}"`,
    ];

    // Original title if different
    if (event.nameOriginal && event.nameOriginal !== event.name) {
        lines.push(`titleOriginal: "${yamlEscapeString(event.nameOriginal)}"`);
    }

    lines.push(`description: "${yamlEscapeString(event.description)}"`);
    lines.push(`date: "${event.startDate}"`);

    if (event.endDate) {
        lines.push(`endDate: "${event.endDate}"`);
    }

    lines.push(`status: "${event.status}"`);
    lines.push(`attendanceMode: "${event.attendanceMode}"`);

    // Location
    if (event.location) {
        if (event.location.name) lines.push(`locationName: "${yamlEscapeString(event.location.name)}"`);
        if (event.location.city) lines.push(`locationCity: "${event.location.city}"`);
        if (event.location.country) lines.push(`locationCountry: "${event.location.country}"`);
    }

    // Organizer
    if (event.organizer) {
        if (event.organizer.name) lines.push(`organizerName: "${yamlEscapeString(event.organizer.name)}"`);
        if (event.organizer.url) lines.push(`organizerUrl: "${event.organizer.url}"`);
    }

    // External URL
    if (event.url) {
        lines.push(`externalUrl: "${event.url}"`);
    }

    // Topics taxonomy
    if (event.topics && event.topics.length > 0) {
        lines.push(`topics:`);
        event.topics.forEach(topic => lines.push(`  - "${topic}"`));
    }

    // Audiences taxonomy (was "audience" in JSON)
    if (event.audience && event.audience.length > 0) {
        lines.push(`audiences:`);
        event.audience.forEach(aud => lines.push(`  - "${aud}"`));
    }

    // Metadata
    if (event.itRelevance) {
        lines.push(`itRelevance: "${event.itRelevance}"`);
    }

    if (event.featured) {
        lines.push(`featured: true`);
    }

    // Display options
    lines.push(`showHero: false`);
    lines.push(`showDate: true`);
    lines.push(`showAuthor: false`);
    lines.push(`showReadingTime: false`);
    lines.push(`showTableOfContents: false`);
    lines.push(`showPagination: true`);

    return lines.join('\n');
}

// Build default body content for new pages
// Keep it minimal - description and link are already shown by the template
function buildDefaultBody(event) {
    return '';
}

// Ensure directory exists
function ensureDir(p) {
    fs.mkdirSync(p, { recursive: true });
}

// Main
ensureDir(EVENTS_CONTENT_DIR);

let created = 0;
let updated = 0;

events.forEach(event => {
    const eventDir = path.join(EVENTS_CONTENT_DIR, event.identifier);
    const indexPath = path.join(eventDir, 'index.md');

    ensureDir(eventDir);

    let body = buildDefaultBody(event);

    // Check if file exists and has custom content
    if (fs.existsSync(indexPath)) {
        const existing = fs.readFileSync(indexPath, 'utf8');
        const parsed = parseMarkdown(existing);

        // If there's custom body content (not just the default), preserve it
        if (parsed.body && !parsed.body.includes('No additional commentary yet')) {
            body = parsed.body;
        }
        updated++;
    } else {
        created++;
    }

    const frontmatter = buildFrontmatter(event);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
});

// Generate _index.md for the list page
const listIndexPath = path.join(EVENTS_CONTENT_DIR, '_index.md');
const listIndexContent = `---
title: "Events"
description: "Conferences, exercises, and gatherings focused on digital sovereignty, cybersecurity, and national preparedness."
date: ${new Date().toISOString().split('T')[0]}
showHero: false
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
showPagination: false

cascade:
  showDate: false
  showAuthor: false
---

{{< events >}}
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

console.log(`\nCreated: ${created} new event pages`);
console.log(`Updated: ${updated} existing event pages`);
console.log(`Total: ${events.length} events in /events/{id}/index.md`);
