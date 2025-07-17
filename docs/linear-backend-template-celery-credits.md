# Linear Template: Backend Required Changes

## Title
[FEATURE/TASK NAME] - Backend Implementation Required

## Description

### Overview
Brief description of the feature/task and its business value.

### Current State
- What exists in the frontend
- What mock data/functionality is in place
- Current user experience

### Required Backend Changes

#### 1. Database Models
```python
# Example model changes needed
class ModelName(models.Model):
    field_name = models.FieldType()
    # Add specific fields required
```

#### 2. API Endpoints
```
METHOD /api/path/
Request: { field: type }
Response: { field: type }
```

#### 3. Business Logic
- [ ] Core logic description
- [ ] Validation rules
- [ ] Error handling requirements

#### 4. Background Tasks (if applicable)
```python
# Celery task example
@celery_task
def task_name():
    # Task logic description
```

### Frontend Context
- **Location**: `/path/to/frontend/component`
- **Current Implementation**: Mock/real data status
- **Integration Points**: Where frontend expects to call API

### Technical Requirements
- [ ] Authentication required: Yes/No
- [ ] Rate limiting: Specify limits
- [ ] Permissions: User roles/permissions needed
- [ ] Performance: Expected response times

### Testing Requirements
- [ ] Unit tests for models
- [ ] API endpoint tests
- [ ] Integration tests
- [ ] Edge cases to handle

### Acceptance Criteria
- [ ] API returns expected data format
- [ ] Error responses follow standard format
- [ ] Frontend integration works end-to-end
- [ ] Performance meets requirements

### Dependencies
- External services needed
- Other features that must be completed first
- Third-party APIs or libraries

### Implementation Notes
- Special considerations
- Potential gotchas
- Recommended approach

---

## Example: Celery Credit Management System

### Overview
Implement automated credit allocation for yearly plans and daily credit removal for users on the lowest plan.

### Current State
- Frontend displays credit balance in sidebar (`CreditsCard` component)
- Credits manually added via admin endpoint
- No automated allocation or expiration
- UI shows "Credits reset on 1st of month" but not implemented

### Required Backend Changes

#### 1. Database Models
```python
# Update existing models
class Subscription(models.Model):
    # Add fields
    next_credit_allocation = models.DateTimeField(null=True)
    credit_allocation_amount = models.IntegerField(default=0)
    
class LeadCredit(models.Model):
    # Add credit expiration
    expires_at = models.DateTimeField(null=True)
    
class CreditTransaction(models.Model):
    # New model for tracking allocations
    user = models.ForeignKey(User)
    amount = models.IntegerField()
    transaction_type = models.CharField(choices=['allocation', 'expiration', 'usage', 'manual'])
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
```

#### 2. API Endpoints
```
GET /api/credits/allocation-schedule/
Response: {
    next_allocation_date: "2025-07-01",
    allocation_amount: 100,
    current_balance: 50,
    expiring_credits: [
        {amount: 10, expires_at: "2025-06-17"}
    ]
}

POST /api/credits/allocate/
Request: { user_id: int, amount: int, reason: string }
Response: { success: boolean, new_balance: int }
```

#### 3. Celery Tasks
```python
# Monthly credit allocation for yearly plans
@periodic_task(run_every=crontab(day_of_month=1, hour=0, minute=0))
def allocate_monthly_credits():
    """
    - Query all active yearly subscriptions
    - Calculate credits based on plan
    - Add credits to user balance
    - Log transaction
    - Send notification email
    """
    
# Daily credit expiration for lowest plan
@periodic_task(run_every=crontab(hour=0, minute=0))
def expire_daily_credits():
    """
    - Query users on lowest plan
    - Find credits older than X days
    - Mark as expired
    - Update balance
    - Log expiration
    """
```

#### 4. Business Logic
- [ ] Yearly plans get monthly credit allocation on 1st of month
- [ ] Credit amounts based on subscription tier
- [ ] Lowest plan credits expire after 30 days
- [ ] Credits used FIFO (oldest first)
- [ ] Email notifications for allocations/expirations
- [ ] Admin override capabilities

### Frontend Context
- **Credit Display**: `/app/(protected-views)/components/CreditsCard.tsx`
- **Credit History**: `/app/(protected-views)/profile/components/CreditsHistory.tsx`
- **API Service**: `/lib/api/generated/services/LeadsService.ts`

### Technical Requirements
- [ ] Celery + Redis setup required
- [ ] Timezone handling (allocate at user's midnight)
- [ ] Idempotent tasks (prevent double allocation)
- [ ] Monitoring/alerting for failed tasks
- [ ] Rate limit: N/A (background tasks)

### Testing Requirements
- [ ] Test monthly allocation logic
- [ ] Test credit expiration
- [ ] Test timezone handling
- [ ] Test failure recovery
- [ ] Test concurrent allocations

### Acceptance Criteria
- [ ] Credits automatically allocated on 1st of month
- [ ] Yearly plan users receive correct credit amount
- [ ] Lowest plan credits expire after 30 days
- [ ] Credit history shows allocations/expirations
- [ ] Email notifications sent
- [ ] Admin can manually trigger allocation

### Dependencies
- Celery + Redis infrastructure
- Email service configuration
- Subscription plan definitions
- User timezone data

### Implementation Notes
- Use Celery beat for scheduling
- Implement retry logic for failed allocations
- Consider bulk operations for performance
- Add monitoring dashboard
- Document credit lifecycle

---

## Usage Instructions

1. Copy this template for each backend feature
2. Fill in all sections with specific details
3. Include actual code examples where possible
4. Link to frontend code/designs
5. Add to Linear with appropriate labels
6. Tag backend team members
7. Set priority and sprint