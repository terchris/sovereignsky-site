#!/usr/bin/env node

/**
 * Update jurisdictions.json blocs with abstract, summary, body, and image fields
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'jurisdictions.json');

// Abstracts and summaries for each bloc based on data sovereignty perspective
const blocContent = {
  eu: {
    abstract: "Comprehensive data protection framework through GDPR covering 27 member states.",
    summary: "The European Union provides the world's most comprehensive data protection framework through GDPR. All 27 member states share common legal standards for privacy, data handling, and cross-border transfers within the bloc.",
  },
  eea: {
    abstract: "Extends EU single market and GDPR to Norway, Iceland, and Liechtenstein.",
    summary: "The European Economic Area extends the EU single market to Norway, Iceland, and Liechtenstein through the EEA Agreement. These countries adopt EU regulations including GDPR, providing equivalent data protection to EU member states.",
  },
  EU_EEA: {
    abstract: "Combined EU and EEA region for data residency classification purposes.",
    summary: "The EU/EEA region combines all 27 EU member states plus Norway, Iceland, and Liechtenstein. This classification is used when vendors offer 'EU data residency' without specifying exact countries, ensuring data remains within European jurisdiction.",
  },
  "five-eyes": {
    abstract: "Intelligence alliance with extensive surveillance cooperation and data sharing.",
    summary: "The Five Eyes alliance (US, UK, Canada, Australia, New Zealand) shares signals intelligence and has mutual legal assistance treaties enabling cross-border data access. Membership indicates elevated data sovereignty risk due to surveillance cooperation.",
  },
  adequacy: {
    abstract: "Countries recognized by the EU as providing adequate data protection levels.",
    summary: "EU Adequacy Decisions recognize countries as providing data protection equivalent to EU standards, allowing free flow of personal data from the EU without additional safeguards. Decisions can be challenged or revoked, as demonstrated by Schrems II.",
  },
};

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  let updated = 0;
  data.blocs = data.blocs.map(bloc => {
    const content = blocContent[bloc.identifier];

    const result = {
      ...bloc,
      abstract: content?.abstract || `${bloc.name} jurisdictional bloc.`,
      summary: content?.summary || bloc.description,
      body: "", // Set body to empty
      image: "", // Empty for now
    };

    updated++;
    return result;
  });

  // Write back with nice formatting
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');

  console.log(`Updated ${updated} blocs with abstract, summary, body, and image fields`);
}

main();
