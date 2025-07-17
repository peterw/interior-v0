# Generate Socials Page URL Parameters

The `/generate-socials` page now supports URL parameters for programmatic map configuration.

## Common Parameters

- `tab` - Which tab to display: `social-post`, `before-after`, `generate-video` (default: `social-post`)
- `lat` - Latitude for the map center (e.g., `40.7128`)
- `lng` - Longitude for the map center (e.g., `-74.0060`)
- `businessName` - Business name to display (e.g., `Mountain Coffee Roasters`)
- `keyword` - Single keyword for the scan (e.g., `coffee shop`)
- `keywords` - Comma-separated list of keywords (e.g., `coffee,cafe,coffee shop`)
- `viewMode` - Controls UI display:
  - `single` - Shows only the map without controls
  - `before` - Shows only the "before" map
  - `after` - Shows only the "after" map
  - `comparison` - Shows before and after maps side by side

## Social Post Tab Parameters

- `pinCount` - Number of pins to display (5-50, default: 12)
- `radius` - Search radius in km (1-20, default: 5)
- `rankingType` - Ranking quality: `high`, `medium`, `low` (default: `medium`)

## Before/After Tab Parameters

### Before Map
- `beforePinCount` - Number of pins for before map (5-50, default: 12)
- `beforeRadius` - Search radius in km for before map (1-20, default: 5)
- `beforeRankingType` - Ranking quality for before: `high`, `medium`, `low` (default: `low`)

### After Map
- `afterPinCount` - Number of pins for after map (5-50, default: 12)
- `afterRadius` - Search radius in km for after map (1-20, default: 5)
- `afterRankingType` - Ranking quality for after: `high`, `medium`, `low` (default: `high`)

## Example URLs

### Single Map View
```
/generate-socials?viewMode=single&lat=40.7128&lng=-74.0060&businessName=Joe's Pizza&keyword=pizza&pinCount=20&radius=10&rankingType=high
```

### Before Map Only
```
/generate-socials?tab=before-after&viewMode=before&lat=34.0522&lng=-118.2437&businessName=LA Fitness&keyword=gym&beforePinCount=15&beforeRadius=8&beforeRankingType=low
```

### After Map Only
```
/generate-socials?tab=before-after&viewMode=after&lat=34.0522&lng=-118.2437&businessName=LA Fitness&keyword=gym&afterPinCount=15&afterRadius=8&afterRankingType=high
```

### Before/After Comparison
```
/generate-socials?tab=before-after&viewMode=comparison&lat=37.7749&lng=-122.4194&businessName=Tech Solutions&keyword=computer repair&beforeRankingType=low&afterRankingType=high
```

### Multiple Keywords
```
/generate-socials?lat=41.8781&lng=-87.6298&businessName=Chicago Dental&keywords=dentist,dental care,orthodontist&pinCount=25&radius=12
```

## Notes

- When `viewMode` is set, the UI controls are hidden for a cleaner screenshot
- The `keywords` parameter takes precedence over `keyword` if both are provided
- All parameters are optional and will use defaults if not specified
- The page will generate random data for the specified configuration