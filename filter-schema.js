const fs = require('fs');
const yaml = require('js-yaml');

// Read the original schema
const schemaContent = fs.readFileSync('./schema.yaml', 'utf8');
const schema = yaml.load(schemaContent);

// Filter out /palette/ APIs
if (schema.paths) {
  Object.keys(schema.paths).forEach(path => {
    if (path.includes('/palette/')) {
      delete schema.paths[path];
    }
  });
}

// Also filter any palette-related tags
if (schema.tags) {
  schema.tags = schema.tags.filter(tag => !tag.name.toLowerCase().includes('palette'));
}

// DO NOT REMOVE BlankEnum or NullEnum if they are referenced elsewhere.
// The fix-codegen.js script will handle syntax issues in the generated files.
// if (schema.components && schema.components.schemas) {
//   const schemasToRemove = ['BlankEnum', 'NullEnum'];
//   schemasToRemove.forEach(schemaName => {
//     if (schema.components.schemas[schemaName]) {
//       delete schema.components.schemas[schemaName];
//       console.log(`- Removed schema: ${schemaName}`);
//     }
//   });
// }

// Write the filtered schema
fs.writeFileSync('./filtered_schema.yaml', yaml.dump(schema));
console.log('Schema filtered successfully (retained BlankEnum/NullEnum for $ref consistency).'); 