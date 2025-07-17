# Update: GMB Auditor API Parameters Defined

I've completed the planning phase for the GMB Auditor API. Here are the clear request/response parameters we'll be implementing:

## Core API Endpoints

### 1. Run GMB Audit - `POST /api/gmb/audit/run/`
```typescript
// Request
{
  gmb_url: string;               // Required: Google Maps URL
  include_competitors?: boolean;  // Default: true
  competitor_radius?: number;     // Miles, default: 5
  max_competitors?: number;       // Default: 10
}

// Response
{
  audit_id: string;
  status: "processing";
  estimated_completion_time: number;  // seconds
  location: {
    name: string;
    address: string;
    resource_name: string;
  }
}
```

### 2. Get Audit Results - `GET /api/gmb/audit/{audit_id}/`

Returns comprehensive audit with:
- `overall_score`: 0-100
- `ranking_analysis`: Current vs potential ranking & visibility
- `revenue_impact`: Lead generation & revenue projections  
- `sections`: Detailed scores for basic_info, categories, media, reviews, posts, attributes
- `competitive_analysis`: Market position & competitor comparison
- `critical_issues`: Prioritized problems with impact & recommendations
- `action_plan`: Step-by-step improvement tasks

### 3. Quick Audit - `POST /api/gmb/audit/quick/`
```typescript
// Request
{
  gmb_url: string;              // Required
  email?: string;               // Optional, for sending results
}

// Response  
{
  audit_id: string;
  status: "processing";
  share_url: string;
  estimated_completion_time: number;
}
```

## Current Status

✅ **Completed:**
- Frontend UI fully implemented with mock data
- Comprehensive API specification document created
- All 15 endpoints documented with request/response schemas

🚧 **Next Steps:**
1. Implement API routes in `/app/api/gmb/audit/`
2. Create database models for audit storage
3. Set up background processing for audits
4. Integrate Google Business Profile API
5. Connect frontend to real API endpoints

## Key Technical Decisions:
- **Background job system**: Celery tasks for async processing
- **Caching strategy**: No caching - fresh audits on each request
- **Sharing**: Support public/private share links for audit results
- **PDF generation**: Implement PDF export functionality
- **Web scraping**: TBD for public URL audits

**Estimated Timeline:** ~2 weeks for full backend implementation

The frontend is ready and waiting for the API. Full specification details are in `/docs/gmb-auditor-api-specs.md`.