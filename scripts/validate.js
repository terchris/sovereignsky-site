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
];

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
    results.push({ file: data, status: "PASS" });
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
