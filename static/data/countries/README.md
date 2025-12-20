# Country Map GeoJSON Files

## Overview

Individual country GeoJSON files for use with ECharts maps. These are low-resolution country outlines suitable for displaying datacenter locations.

## File Locations

```
static/data/
├── world.json              # World map (existing, for /datacenters/ main page)
├── world.geo.json          # Source file (can be deleted after splitting)
└── countries/              # Individual country files
    ├── NO.json             # Norway
    ├── SE.json             # Sweden
    ├── SG.json             # Singapore
    ├── US.json             # USA
    └── ... (57 files total)
```

## Usage in ECharts

Load a country map instead of the world map:

```javascript
// For a country page like /datacenters/norway/
const countryCode = 'NO'; // From page frontmatter or URL

fetch(`/data/countries/${countryCode}.json`)
  .then(res => res.json())
  .then(geoJson => {
    echarts.registerMap(countryCode, geoJson);
    
    const chart = echarts.init(document.getElementById('map'));
    chart.setOption({
      series: [{
        type: 'map',
        map: countryCode,  // Must match registerMap name
        roam: true,
        // ... other options
      }]
    });
  });
```

## File Format

Each file is a GeoJSON FeatureCollection:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Norway",
        "iso_a2": "NO",
        ...
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [...]
      }
    }
  ]
}
```

## Available Countries

57 countries matching `data/regions.json`:

NO, IS, SE, DK, FI, DE, FR, NL, PL, IE, AT, BE, BG, HR, CY, CZ, EE, GR, HU, LV, LT, LU, PT, RO, SK, SI, ES, IT, CH, US, GB, CN, RU, IL, IN, AU, CA, JP, KR, NZ, AE, BR, CL, CO, EG, ID, MX, MY, PH, QA, RS, SA, SG, TH, TR, TW, ZA

## Missing Countries

These are too small for the low-res source and were not needed:
- LI (Liechtenstein)
- MT (Malta)  
- BH (Bahrain)
- HK (Hong Kong)

If needed later, add them manually or use a higher-resolution source.

## Regenerating Files

If `data/regions.json` changes (new countries added):

```bash
node scripts/split-world-geojson.js
```

The script:
1. Reads `data/regions.json` for list of needed country codes
2. Reads `static/data/world.geo.json` as source
3. Extracts matching countries by ISO code
4. Writes to `static/data/countries/{ISO}.json`

## Bloc Files

Combined GeoJSON files for country blocs are in `static/data/blocs/`:

| File | Description | Countries |
|------|-------------|----------|
| `EU.json` | European Union members | 26 |
| `EEA.json` | European Economic Area | 28 |
| `five-eyes.json` | Five Eyes alliance | 5 |
| `adequacy.json` | EU adequacy decisions | 7 |

### Regenerating Bloc Files

```bash
node scripts/generate-bloc-geojson.js
```

The script:
1. Reads `data/regions.json` for bloc membership (eu_member, eea_member, blocs array)
2. Combines matching country files from `static/data/countries/`
3. Writes to `static/data/blocs/{bloc}.json`

### Usage in ECharts

```javascript
// For a bloc page like /datacenters/eu/
fetch('/data/blocs/EU.json')
  .then(res => res.json())
  .then(geoJson => {
    echarts.registerMap('EU', geoJson);
    
    const chart = echarts.init(document.getElementById('map'));
    chart.setOption({
      series: [{
        type: 'map',
        map: 'EU',
        roam: true,
      }]
    });
  });
```

## Source Data

- **world.geo.json**: Downloaded from [geojson-maps.kyd.au](https://geojson-maps.kyd.au/) (low resolution, all countries)
- **SG.json**: Manually created (Singapore not in low-res source)
- License: Natural Earth (public domain)
