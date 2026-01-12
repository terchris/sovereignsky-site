#!/usr/bin/env node

/**
 * Validate data files against JSON schemas and cross-file references
 *
 * Validates:
 * 1. JSON Schema compliance (structure, types, required fields)
 * 2. Cross-file references via x-validates-against annotations in schemas
 *
 * Usage: node scripts/validate.js
 */

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");
const { ReferenceValidator } = require("./lib/reference-validator");

// Initialize AJV with options
const ajv = new Ajv({
  allErrors: true,    // Report all errors, not just first
  strict: false       // Allow additional keywords (like x-validates-against)
});
addFormats(ajv);      // Enable format validation (uri, date-time, etc.)

const ROOT = process.cwd();

// Initialize reference validator
const refValidator = new ReferenceValidator(ROOT);

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
  {
    schema: "data/schemas/sovereignsky-projects.schema.json",
    data: "data/sovereignsky/projects.json",
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

// Format schema validation errors for readable output
function formatSchemaErrors(errors) {
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

  // Schema validation
  const validate = ajv.compile(schemaResult.data);
  const schemaValid = validate(dataResult.data);

  if (!schemaValid) {
    results.push({
      file: data,
      status: "FAIL",
      errors: formatSchemaErrors(validate.errors),
    });
    hasErrors = true;
    continue;
  }

  // Cross-file reference validation (reads x-validates-against from schema)
  const refErrors = refValidator.validateReferences(schema, data, dataResult.data);

  if (refErrors.length > 0) {
    results.push({
      file: data,
      status: "FAIL",
      errors: `Schema valid, but invalid references:\n${refValidator.formatErrors(refErrors)}`,
    });
    hasErrors = true;
  } else {
    results.push({ file: data, status: "PASS" });
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
