# Automated Credit Management System - Backend Implementation Required

## Description

### Overview
Implement automated credit allocation for yearly subscription plans and daily credit expiration for users on the lowest tier plan. Currently, credits are managed manually through admin endpoints with no scheduled automation.

### Current State
- Credits displayed in frontend sidebar (CreditsCard component)
- Manual credit addition via admin endpoint only
- UI incorrectly states "Credits reset on 1st of month" (not implemented)
- No expiration logic exists
- Basic credit tracking with LeadCredit and LeadCreditLog models

### Required Backend Changes

#### 1. Database Models
```python
# Extend existing Subscription model
class Subscription(models.Model):
    # Existing fields...
    next_credit_allocation = models.DateTimeField(null=True, blank=True)
    monthly_credit_amount = models.IntegerField(default=0)
    auto_allocate_credits = models.BooleanField(default=True)

# Extend LeadCredit model
class LeadCredit(models.Model):
    # Existing fields...
    allocated_credits = models.IntegerField(default=0)  # Track monthly allocations
    
# Add new model for credit batches
class CreditBatch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    allocated_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    credits_remaining = models.IntegerField()
    batch_type = models.CharField(max_length=20, choices=[
        ('monthly', 'Monthly Allocation'),
        ('manual', 'Manual Addition'),
        ('bonus', 'Bonus Credits')
    ])
    
# Update CreditLog for allocation tracking
class CreditLog(models.Model):
    # Existing fields...
    batch = models.ForeignKey(CreditBatch, null=True, on_delete=models.SET_NULL)
    log_type = models.CharField(max_length=20, choices=[
        ('allocation', 'Credit Allocation'),
        ('usage', 'Credit Usage'),
        ('expiration', 'Credit Expiration'),
        ('manual', 'Manual Adjustment')
    ])
```

#### 2. API Endpoints
```
# Get credit allocation info
GET /api/credits/allocation-info/
Response: {
    "current_balance": 150,
    "next_allocation": {
        "date": "2025-07-01T00:00:00Z",
        "amount": 100
    },
    "credit_batches": [
        {
            "id": 1,
            "amount": 100,
            "allocated_at": "2025-06-01T00:00:00Z",
            "expires_at": null,
            "credits_remaining": 50
        }
    ],
    "expiring_soon": []  // Credits expiring in next 7 days
}

# Manual credit allocation (admin)
POST /api/credits/allocate-manual/
Request: {
    "user_id": 123,
    "amount": 50,
    "reason": "Customer service adjustment",
    "expires_in_days": null  // Optional expiration
}

# Trigger allocation for specific user (admin)
POST /api/credits/trigger-allocation/{user_id}/
Response: {
    "success": true,
    "credits_allocated": 100,
    "new_balance": 250
}
```

#### 3. Celery Tasks
```python
# celery_tasks/credit_management.py

from celery import shared_task
from celery.schedules import crontab
from django.utils import timezone
from datetime import timedelta

@shared_task
def allocate_monthly_credits():
    """
    Run on 1st of each month at 00:00 UTC
    Allocate credits to all yearly subscription users
    """
    # Get all active yearly subscriptions due for allocation
    subscriptions = Subscription.objects.filter(
        subscription_status='active',
        plan__billing_period='yearly',
        auto_allocate_credits=True,
        next_credit_allocation__lte=timezone.now()
    )
    
    for subscription in subscriptions:
        # Calculate credits based on plan
        credit_amount = subscription.plan.monthly_credit_allowance
        
        # Create credit batch
        batch = CreditBatch.objects.create(
            user=subscription.user,
            amount=credit_amount,
            batch_type='monthly',
            credits_remaining=credit_amount,
            expires_at=None  # Yearly plan credits don't expire
        )
        
        # Update user's credit balance
        lead_credit, _ = LeadCredit.objects.get_or_create(user=subscription.user)
        lead_credit.balance += credit_amount
        lead_credit.total_earned += credit_amount
        lead_credit.allocated_credits += credit_amount
        lead_credit.save()
        
        # Log the allocation
        CreditLog.objects.create(
            user=subscription.user,
            amount=credit_amount,
            log_type='allocation',
            description=f'Monthly credit allocation for {subscription.plan.name}',
            batch=batch
        )
        
        # Update next allocation date
        subscription.next_credit_allocation = timezone.now() + timedelta(days=30)
        subscription.save()
        
        # Send email notification
        send_credit_allocation_email.delay(subscription.user.id, credit_amount)
    
    return f"Allocated credits to {subscriptions.count()} users"

@shared_task
def expire_daily_credits():
    """
    Run daily at 00:00 UTC
    Expire credits for users on lowest plan (30-day expiration)
    """
    # Get credit batches that have expired
    expired_batches = CreditBatch.objects.filter(
        expires_at__lte=timezone.now(),
        credits_remaining__gt=0
    )
    
    for batch in expired_batches:
        expired_amount = batch.credits_remaining
        
        # Update user's balance
        lead_credit = LeadCredit.objects.get(user=batch.user)
        lead_credit.balance -= expired_amount
        lead_credit.save()
        
        # Log expiration
        CreditLog.objects.create(
            user=batch.user,
            amount=-expired_amount,
            log_type='expiration',
            description=f'Credits expired from batch allocated on {batch.allocated_at}',
            batch=batch
        )
        
        # Mark batch as fully expired
        batch.credits_remaining = 0
        batch.save()
        
        # Send notification if significant amount
        if expired_amount >= 10:
            send_credit_expiration_email.delay(batch.user.id, expired_amount)
    
    return f"Expired {expired_batches.count()} credit batches"

@shared_task
def send_credit_allocation_email(user_id, amount):
    """Send email notification for credit allocation"""
    # Implementation here
    pass

@shared_task
def send_credit_expiration_email(user_id, amount):
    """Send email notification for credit expiration"""
    # Implementation here
    pass

# Celery beat schedule
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'allocate-monthly-credits': {
        'task': 'credit_management.allocate_monthly_credits',
        'schedule': crontab(day_of_month=1, hour=0, minute=0),
    },
    'expire-daily-credits': {
        'task': 'credit_management.expire_daily_credits',
        'schedule': crontab(hour=0, minute=0),
    },
}
```

#### 4. Business Logic
- [x] Yearly subscriptions receive monthly credit allocations on 1st
- [x] Credit amount determined by subscription plan
- [x] Lowest tier credits expire after 30 days
- [x] FIFO usage - oldest credits used first
- [x] Email notifications for allocations and expirations
- [x] Admin can manually allocate credits
- [x] Track credit batches for better accounting
- [ ] Handle timezone considerations (future enhancement)
- [ ] Prorate first month allocation (future enhancement)

### Frontend Context
- **Credit Display**: `/app/(protected-views)/components/CreditsCard.tsx` - Shows balance
- **Credit History**: `/app/(protected-views)/profile/components/CreditsHistory.tsx` - Shows transactions
- **API Service**: `/lib/api/generated/services/LeadsService.ts` - Credit endpoints
- **Models**: `/lib/api/generated/models/` - Credit-related TypeScript interfaces

### Technical Requirements
- [x] Celery + Redis/RabbitMQ setup required
- [x] Django celery beat for scheduling
- [x] Idempotent task design (prevent double allocation)
- [x] Error handling and retry logic
- [x] Monitoring for failed tasks
- [x] Audit trail for all credit changes

### Testing Requirements
- [ ] Unit tests for allocation logic
- [ ] Unit tests for expiration logic  
- [ ] Integration tests for Celery tasks
- [ ] Test double allocation prevention
- [ ] Test credit usage with batches (FIFO)
- [ ] Test email notifications
- [ ] Load test for bulk allocations

### Acceptance Criteria
- [ ] Credits automatically allocated on 1st of each month for yearly plans
- [ ] Correct credit amounts based on subscription tier
- [ ] Lowest plan credits expire after exactly 30 days
- [ ] Credit history shows allocation and expiration events
- [ ] Email notifications sent for both events
- [ ] Admin can manually trigger allocation for specific users
- [ ] No double allocations possible
- [ ] Frontend displays next allocation date
- [ ] Credit batches tracked for accounting

### Dependencies
- Celery infrastructure setup
- Redis or RabbitMQ message broker
- Email service configuration (SendGrid/SES)
- Subscription plan definitions with credit amounts
- Django celery beat for scheduling

### Implementation Notes
1. **Start with**: Basic Celery setup and monthly allocation
2. **Phase 2**: Add expiration logic for lowest tier
3. **Phase 3**: Email notifications and admin tools
4. **Monitoring**: Add Celery Flower for task monitoring
5. **Performance**: Bulk operations for large user bases
6. **Rollback plan**: Manual allocation fallback if automation fails

### Estimated Effort
- Backend implementation: 3-4 days
- Testing: 2 days
- Deployment and monitoring: 1 day
- **Total: 1 week**

### Priority
**HIGH** - Revenue impacting feature, users expecting automated credits

### Labels
- backend
- celery
- billing
- credits
- automation