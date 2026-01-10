#!/usr/bin/env node

/**
 * Generate datacenter country pages from countries.json
 * Creates content/datacenters/{slug}/index.md for each country with datacenters
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content/datacenters");

// Load data
const countriesData = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/countries/countries.json"), "utf8")
);
const countries = countriesData.itemListElement || [];

const datacentersData = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/datacenters/datacenters.json"), "utf8")
);

// Find countries that have datacenter regions
const countriesWithDC = new Set();
datacentersData.forEach((provider) => {
  (provider.regions || []).forEach((region) => {
    if (region.countryId) {
      countriesWithDC.add(region.countryId);
    }
  });
});

console.log(`Found ${countriesWithDC.size} countries with datacenters`);

// Generate pages
let created = 0;
let updated = 0;
let skipped = 0;

countries.forEach((country) => {
  if (!countriesWithDC.has(country.identifier)) {
    return; // Skip countries without datacenters
  }

  const slug = country.slug;
  if (!slug) {
    console.warn(`Skipping country ${country.identifier}: no slug`);
    return;
  }

  const dir = path.join(CONTENT_DIR, slug);
  const filePath = path.join(dir, "index.md");

  // Build frontmatter
  const frontmatter = {
    title: `${country.name} Datacenters`,
    countryId: country.identifier,
    layout: "country",
    echarts: true,
    showTableOfContents: true,
  };

  const yaml = Object.entries(frontmatter)
    .map(([k, v]) => {
      if (typeof v === "boolean") return `${k}: ${v}`;
      if (typeof v === "number") return `${k}: ${v}`;
      return `${k}: "${v}"`;
    })
    .join("\n");

  const content = `---
${yaml}
---
`;

  // Create directory if needed
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file exists and has custom content
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf8");
    // Check if it has custom content after frontmatter
    const parts = existing.split("---");
    if (parts.length >= 3 && parts[2].trim().length > 0) {
      // Has custom content, preserve it
      const customContent = parts.slice(2).join("---");
      const newContent = `---
${yaml}
---${customContent}`;
      fs.writeFileSync(filePath, newContent);
      updated++;
      console.log(`Updated: ${filePath} (preserved custom content)`);
    } else {
      // No custom content, overwrite with updated frontmatter
      fs.writeFileSync(filePath, content);
      updated++;
      console.log(`Updated: ${filePath}`);
    }
  } else {
    fs.writeFileSync(filePath, content);
    created++;
    console.log(`Created: ${filePath}`);
  }
});

console.log(`\nSummary: ${created} created, ${updated} updated, ${skipped} skipped`);
