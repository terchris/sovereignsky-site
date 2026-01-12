/**
 * Cross-file reference validation utility
 *
 * Validates that field values in data files reference valid identifiers
 * from other data files. Reads validation rules from x-validates-against
 * annotations in JSON schemas.
 *
 * Usage:
 *   const { ReferenceValidator } = require('./lib/reference-validator');
 *   const validator = new ReferenceValidator(rootDir);
 *   const errors = validator.validateReferences(schemaPath, dataPath, data);
 */

const fs = require('fs');
const path = require('path');

/**
 * Reference file configurations
 * Maps file paths to how to extract identifiers from them
 */
const REFERENCE_EXTRACTORS = {
  // ItemList format (schema.org style)
  'data/topics/topics.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/audience/audience.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/countries/countries.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/laws/law_types.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/laws/relationship_types.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/blocs/risk-levels.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/blocs/blocs.json': (data) => (data.itemListElement || []).map(item => item.identifier),
  'data/sources/sources.json': (data) => (data.itemListElement || []).map(item => item.identifier),

  // Plain array format
  'data/networks/networks-actors.json': (data) => (Array.isArray(data) ? data : []).map(item => item.identifier),
  'data/networks/networks-places.json': (data) => (Array.isArray(data) ? data : []).map(item => item.identifier),
};

class ReferenceValidator {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.identifierCache = {};
    this.schemaCache = {};
  }

  /**
   * Load and cache valid identifiers from a reference file
   */
  loadReferenceIdentifiers(refPath) {
    if (this.identifierCache[refPath]) {
      return this.identifierCache[refPath];
    }

    const extractor = REFERENCE_EXTRACTORS[refPath];
    if (!extractor) {
      console.warn(`Warning: No extractor defined for reference file "${refPath}"`);
      return null;
    }

    const filePath = path.join(this.rootDir, refPath);
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: Reference file not found: ${refPath}`);
      return null;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      const identifiers = extractor(data);
      this.identifierCache[refPath] = identifiers;
      return identifiers;
    } catch (e) {
      console.warn(`Warning: Could not load reference file ${refPath}: ${e.message}`);
      return null;
    }
  }

  /**
   * Load and parse a schema file
   */
  loadSchema(schemaPath) {
    if (this.schemaCache[schemaPath]) {
      return this.schemaCache[schemaPath];
    }

    const filePath = path.join(this.rootDir, schemaPath);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const schema = JSON.parse(content);
      this.schemaCache[schemaPath] = schema;
      return schema;
    } catch (e) {
      return null;
    }
  }

  /**
   * Extract x-validates-against annotations from a schema
   * Returns: { fieldName: refPath, ... }
   */
  extractValidationRules(schema, prefix = '') {
    const rules = {};

    if (!schema || typeof schema !== 'object') {
      return rules;
    }

    // Check for x-validates-against at current level
    if (schema['x-validates-against']) {
      return { [prefix || 'value']: schema['x-validates-against'] };
    }

    // Check properties
    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        if (propSchema['x-validates-against']) {
          rules[propName] = propSchema['x-validates-against'];
        }
        // Recurse into nested objects (but not too deep)
        if (propSchema.properties) {
          const nested = this.extractValidationRules(propSchema, propName);
          Object.assign(rules, nested);
        }
      }
    }

    // Check items (for arrays)
    if (schema.items) {
      if (schema.items['$ref']) {
        // Resolve $ref
        const refPath = schema.items['$ref'];
        if (refPath.startsWith('#/$defs/')) {
          const defName = refPath.replace('#/$defs/', '');
          if (schema.$defs && schema.$defs[defName]) {
            const nestedRules = this.extractValidationRules(schema.$defs[defName]);
            Object.assign(rules, nestedRules);
          }
        }
      } else {
        const nestedRules = this.extractValidationRules(schema.items);
        Object.assign(rules, nestedRules);
      }
    }

    // Check $defs
    if (schema.$defs) {
      for (const [defName, defSchema] of Object.entries(schema.$defs)) {
        const nestedRules = this.extractValidationRules(defSchema);
        Object.assign(rules, nestedRules);
      }
    }

    // Check allOf, anyOf, oneOf
    for (const keyword of ['allOf', 'anyOf', 'oneOf']) {
      if (Array.isArray(schema[keyword])) {
        for (const subSchema of schema[keyword]) {
          const nestedRules = this.extractValidationRules(subSchema);
          Object.assign(rules, nestedRules);
        }
      }
    }

    return rules;
  }

  /**
   * Detect data format (array or itemList)
   */
  getDataFormat(data) {
    if (Array.isArray(data)) {
      return 'array';
    }
    if (data && data.itemListElement) {
      return 'itemList';
    }
    return 'unknown';
  }

  /**
   * Get items array from data
   */
  getItems(data) {
    const format = this.getDataFormat(data);
    if (format === 'array') {
      return data;
    }
    if (format === 'itemList') {
      return data.itemListElement || [];
    }
    return [];
  }

  /**
   * Validate a single field value against reference identifiers
   */
  validateFieldValue(value, validIdentifiers, fieldName, itemIdentifier, index) {
    const errors = [];

    if (Array.isArray(value)) {
      value.forEach(v => {
        if (!validIdentifiers.includes(v)) {
          errors.push({
            field: fieldName,
            value: v,
            item: itemIdentifier || `[${index}]`,
            message: `Invalid ${fieldName} "${v}" in item "${itemIdentifier || index}"`
          });
        }
      });
    } else if (value && !validIdentifiers.includes(value)) {
      errors.push({
        field: fieldName,
        value: value,
        item: itemIdentifier || `[${index}]`,
        message: `Invalid ${fieldName} "${value}" in item "${itemIdentifier || index}"`
      });
    }

    return errors;
  }

  /**
   * Validate references in a data file using schema annotations
   *
   * @param {string} schemaPath - Path to the schema file (relative to root)
   * @param {string} dataPath - Path to the data file (relative to root)
   * @param {object} data - Parsed JSON data
   * @returns {Array} Array of error objects
   */
  validateReferences(schemaPath, dataPath, data) {
    const errors = [];

    // Load schema and extract validation rules
    const schema = this.loadSchema(schemaPath);
    if (!schema) {
      return errors; // No schema found
    }

    const rules = this.extractValidationRules(schema);
    if (Object.keys(rules).length === 0) {
      return errors; // No validation rules in schema
    }

    // Get items from data
    const items = this.getItems(data);

    // Validate each field with rules
    for (const [fieldName, refPath] of Object.entries(rules)) {
      const validIdentifiers = this.loadReferenceIdentifiers(refPath);
      if (!validIdentifiers) continue;

      items.forEach((item, index) => {
        const value = item[fieldName];
        if (value !== undefined && value !== null) {
          const fieldErrors = this.validateFieldValue(
            value,
            validIdentifiers,
            fieldName,
            item.identifier || item.name,
            index
          );
          errors.push(...fieldErrors);
        }
      });
    }

    return errors;
  }

  /**
   * Format errors for display
   */
  formatErrors(errors) {
    if (errors.length === 0) return '';
    return errors.map(e => `  ${e.message}`).join('\n');
  }

  /**
   * Add a custom reference extractor
   */
  static addExtractor(refPath, extractor) {
    REFERENCE_EXTRACTORS[refPath] = extractor;
  }
}

module.exports = {
  ReferenceValidator,
  REFERENCE_EXTRACTORS
};
