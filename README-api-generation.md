# API Client Generation

This project includes a system to automatically generate TypeScript API client code from an OpenAPI schema. The generated code provides type-safe access to all backend API endpoints.

## Setup

Before using the API generation system, install the required dependencies:

```bash
npm install --save-dev openapi-typescript-codegen js-yaml glob
```

## Generating the API Client

To generate the API client, run:

```bash
npm run generate:api
```

This script:
1. Fetches the OpenAPI schema from your backend server
2. Filters out "/palette/" APIs (customize this in filter-schema.js)
3. Generates TypeScript code using openapi-typescript-codegen
4. Applies post-generation fixes
5. Cleans up temporary files

## Configuration

### Backend URL

By default, the script fetches the schema from `http://localhost:8000/api/schema/`. Update this URL in the `package.json` script to match your backend:

```json
"generate:api": "curl -o schema.yaml https://your-backend-url/api/schema/ && ..."
```

### Filtering

Edit `filter-schema.js` to customize which parts of the API schema are included or excluded.

### Post-Generation Fixes

Edit `fix-codegen.js` to apply custom fixes to the generated code. The default fixes include:
- Fixing enum imports
- Adding better error handling
- Adding authentication token support

## Using the Generated API Client

Import and use the API client in your code:

```typescript
import { ApiService, OpenAPI } from '@/lib/api';
import { isApiError, getApiErrorMessage } from '@/lib/api';

// Configure the API base URL (defaults to the NEXT_PUBLIC_API_URL environment variable)
// This is already set up in the lib/api/index.ts file

// Make API calls
try {
  const response = await ApiService.someEndpointGet();
  console.log(response);
} catch (error) {
  if (isApiError(error)) {
    console.error('API error:', getApiErrorMessage(error));
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Authentication

To use authentication with the API client:

```typescript
import { OpenAPI } from '@/lib/api';

// Set the token provider function
OpenAPI.TOKEN = async () => {
  return 'your-auth-token'; // Return your auth token from storage or context
};
```

## Generated Code Structure

The API client is generated in `lib/api/generated/` with the following structure:

```
lib/api/generated/
├── core/                 # Core functionality
│   ├── ApiError.ts       # Error handling
│   ├── OpenAPI.ts        # Configuration
│   └── request.ts        # HTTP request handling
├── models/               # Data models (types/interfaces)
├── services/             # API services with endpoint methods
└── index.ts              # Main exports
```

## Troubleshooting

If you encounter issues with the generated code:

1. Check the backend schema for correctness
2. Modify the filter-schema.js to handle specific schema issues
3. Add custom fixes in fix-codegen.js
4. Review the openapi-typescript-codegen documentation for advanced options 