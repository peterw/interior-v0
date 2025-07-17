const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Path to the generated code directory
const apiDir = path.join(__dirname, 'lib', 'api', 'generated');

console.log('Applying post-generation fixes to API client code...');

// Fix 1: Fix any enum imports issues and malformed enums
const fixEnums = () => {
  // Directly fix the BlankEnum.ts file if it exists
  const blankEnumFile = path.join(apiDir, 'models', 'BlankEnum.ts');
  if (fs.existsSync(blankEnumFile)) {
    console.log('- Directly fixing BlankEnum.ts file');
    const blankEnumContent = `/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export enum BlankEnum {
    EMPTY = '',
}
`;
    fs.writeFileSync(blankEnumFile, blankEnumContent);
  }

  // Continue with the general regex-based fix for other files
  const files = glob.sync(`${apiDir}/models/**/*.ts`); // More specific glob for models
  files.forEach(file => {
    // Skip BlankEnum.ts as we've already directly fixed it
    if (file === blankEnumFile) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix for enums like: export enum BlankEnum { = '', }
    // Changes to: export enum BlankEnum { EMPTY = '', }
    const malformedEnumRegex = /export enum (\w+) {\s*=\s*('[^']*'|"[^"]*");?\s*}/g;
    content = content.replace(malformedEnumRegex, (match, enumName, enumValue) => {
      console.log(`- Fixing malformed enum in ${path.basename(file)}: ${enumName}`);
      changed = true;
      return `export enum ${enumName} { EMPTY = ${enumValue}, }`;
    });

    // Example: Replace incorrect import paths (if any specific rules are needed later)
    // content = content.replace(/from '\.\.\/\.\.\/models\/enums\/SomeEnum'/g, 'from \'../../models/SomeEnum\'');
    // if (content.includes('../../models/SomeEnum')) changed = true;

    if (changed) {
      fs.writeFileSync(file, content);
    }
  });
  console.log('- Applied fixes to enums');
};

// Fix 2: Add better error handling to request.ts
const fixErrorHandling = () => {
  const requestFile = path.join(apiDir, 'core', 'request.ts');
  if (fs.existsSync(requestFile)) {
    let content = fs.readFileSync(requestFile, 'utf8');
    
    // Add improved error handling
    content = content.replace(
      /throw new ApiError\(response, requestOptions, response\);/g,
      `const error = new ApiError(response, requestOptions, response);
      // Add additional error info
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;`
    );
    
    fs.writeFileSync(requestFile, content);
    console.log('- Enhanced error handling in request.ts');
  }
};

// Fix 3: Add authentication token configuration
const fixAuthentication = () => {
  const openApiFile = path.join(apiDir, 'core', 'OpenAPI.ts');
  if (fs.existsSync(openApiFile)) {
    let content = fs.readFileSync(openApiFile, 'utf8');
    
    // Check if the TOKEN property is already defined
    if (!content.includes('TOKEN')) {
      // Add TOKEN property for auth
      content = content.replace(
        'export const OpenAPI = {',
        `export const OpenAPI = {
    /**
     * Authentication token provider
     */
    TOKEN: undefined as TokenProvider | undefined,`
      );
      
      // Add TokenProvider type if not present
      if (!content.includes('TokenProvider')) {
        content = `import { ApiRequestOptions } from './ApiRequestOptions';\n\n` + 
                  `export type TokenProvider = (options: ApiRequestOptions) => Promise<string | null | undefined>;\n\n` + 
                  content;
      }
      
      fs.writeFileSync(openApiFile, content);
      console.log('- Added authentication token support to OpenAPI.ts');
    }
  }
};

// Run all fixes
try {
  fixEnums();
  fixErrorHandling();
  fixAuthentication();
  console.log('Post-generation fixes applied successfully');
} catch (error) {
  console.error('Error applying fixes:', error);
  process.exit(1);
} 