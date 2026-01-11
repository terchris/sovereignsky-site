#!/usr/bin/env node

/**
 * Validate data files against JSON schemas
 *
 * Usage: node scripts/validate.js
 */

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

// Initialize AJV with options
const ajv = new Ajv({
  allErrors: true,    // Report all errors, not just first
  strict: false       // Allow additional keywords
});
addFormats(ajv);      // Enable format validation (uri, date-time, etc.)

const ROOT = process.cwd();

// Define schema-to-data mappings
const validations = [
  {
    schema: "data/schemas/networks.schema.json",
    data: "data/networks/networks.json",
  },
  {
    schema: "data/schemas/networks-actors.schema.json",
    data: "data/networks/networks-actors.json",
  },
  {
    schema: "data/schemas/networks-places.schema.json",
    data: "data/networks/networks-places.json",
  },
  {
    schema: "data/schemas/laws.schema.json",
    data: "data/laws/laws.json",
  },
  {
    schema: "data/schemas/law_types.schema.json",
    data: "data/laws/law_types.json",
  },
  {
    schema: "data/schemas/relationship_types.schema.json",
    data: "data/laws/relationship_types.json",
  },
  {
    schema: "data/schemas/blog.schema.json",
    data: "data/blog/blog.json",
  },
  {
    schema: "data/schemas/topics.schema.json",
    data: "data/topics/topics.json",
  },
  {
    schema: "data/schemas/audience.schema.json",
    data: "data/audience/audience.json",
  },
  {
    schema: "data/schemas/countries.schema.json",
    data: "data/countries/countries.json",
  },
  {
    schema: "data/schemas/events.schema.json",
    data: "data/events/events.json",
  },
];

// Load valid audience identifiers from audience.json
function loadValidAudiences() {
  const audiencePath = path.join(ROOT, "data/audience/audience.json");
  if (!fs.existsSync(audiencePath)) {
    console.warn("Warning: audience.json not found, skipping audience validation");
    return null;
  }
  try {
    const data = JSON.parse(fs.readFileSync(audiencePath, "utf8"));
    return (data.itemListElement || []).map(item => item.identifier);
  } catch (e) {
    console.warn(`Warning: Could not parse audience.json: ${e.message}`);
    return null;
  }
}

// Validate audience values in a data file against valid audiences
function validateAudiences(dataFile, data, validAudiences) {
  if (!validAudiences) return [];
  const errors = [];

  // Handle ItemList format (blog, laws, etc.)
  const items = data.itemListElement || data || [];
  const itemArray = Array.isArray(items) ? items : [];

  itemArray.forEach((item, index) => {
    if (item.audience && Array.isArray(item.audience)) {
      item.audience.forEach(aud => {
        if (!validAudiences.includes(aud)) {
          errors.push(`  Item[${index}] "${item.identifier || item.name}": invalid audience "${aud}"`);
        }
      });
    }
  });

  return errors;
}

// Load JSON file with error handling
function loadJson(filePath) {
  const fullPath = path.join(ROOT, filePath);
  if (!fs.existsSync(fullPath)) {
    return { error: `File not found: ${filePath}` };
  }
  try {
    const content = fs.readFileSync(fullPath, "utf8");
    return { data: JSON.parse(content) };
  } catch (e) {
    return { error: `JSON parse error in ${filePath}: ${e.message}` };
  }
}

// Format validation errors for readable output
function formatErrors(errors) {
  return errors
    .slice(0, 10)  // Limit output
    .map((err) => {
      const path = err.instancePath || "(root)";
      const message = err.message;
      const additionalInfo = err.params
        ? ` (${JSON.stringify(err.params)})`
        : "";
      return `    ${path}: ${message}${additionalInfo}`;
    })
    .join("\n");
}

// Run validations
console.log("Validating data files against schemas...\n");

let hasErrors = false;
const results = [];
const validAudiences = loadValidAudiences();

// Files that should have audience validation
const audienceValidatedFiles = [
  "data/blog/blog.json",
  "data/laws/laws.json",
  "data/publications/publications.json",
  "data/events/events.json",
];

for (const { schema, data } of validations) {
  const schemaResult = loadJson(schema);
  const dataResult = loadJson(data);

  if (schemaResult.error) {
    results.push({ file: data, status: "ERROR", message: schemaResult.error });
    hasErrors = true;
    continue;
  }

  if (dataResult.error) {
    results.push({ file: data, status: "ERROR", message: dataResult.error });
    hasErrors = true;
    continue;
  }

  const validate = ajv.compile(schemaResult.data);
  const valid = validate(dataResult.data);

  if (valid) {
    // Check audience values if this file should be validated
    if (audienceValidatedFiles.includes(data) && validAudiences) {
      const audienceErrors = validateAudiences(data, dataResult.data, validAudiences);
      if (audienceErrors.length > 0) {
        results.push({
          file: data,
          status: "FAIL",
          errors: `Schema valid, but invalid audience values:\n${audienceErrors.join("\n")}`,
        });
        hasErrors = true;
      } else {
        results.push({ file: data, status: "PASS" });
      }
    } else {
      results.push({ file: data, status: "PASS" });
    }
  } else {
    results.push({
      file: data,
      status: "FAIL",
      errors: formatErrors(validate.errors),
    });
    hasErrors = true;
  }
}

// Print results
for (const result of results) {
  if (result.status === "PASS") {
    console.log(`✓ ${result.file}`);
  } else if (result.status === "ERROR") {
    console.log(`✗ ${result.file}`);
    console.log(`    ${result.message}`);
  } else {
    console.log(`✗ ${result.file}`);
    console.log(result.errors);
  }
}

// Summary and exit code
console.log("\n" + "─".repeat(50));
const passed = results.filter((r) => r.status === "PASS").length;
const failed = results.filter((r) => r.status !== "PASS").length;
console.log(`Results: ${passed} passed, ${failed} failed`);

process.exit(hasErrors ? 1 : 0);
