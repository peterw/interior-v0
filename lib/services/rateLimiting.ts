// Types for rate limiting and quotas
export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  keyPrefix?: string // Redis key prefix
}

export interface QuotaConfig {
  userId: string
  quotaType: 'email' | 'sms'
  limit: number // Monthly limit
  period: 'daily' | 'weekly' | 'monthly'
}

export interface QuotaUsage {
  used: number
  limit: number
  remaining: number
  resetDate: Date
  percentUsed: number
}

// Default rate limits
export const DEFAULT_RATE_LIMITS = {
  // API endpoints
  api: {
    collect: { windowMs: 60 * 60 * 1000, maxRequests: 10 }, // 10 per hour
    send: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 per minute
  },
  // Email/SMS sending
  sending: {
    email: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 emails per minute
    sms: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 SMS per minute
  }
}

// Default quotas based on plan
export const DEFAULT_QUOTAS = {
  free: {
    email: { monthly: 100, daily: 20 },
    sms: { monthly: 50, daily: 10 }
  },
  starter: {
    email: { monthly: 1000, daily: 100 },
    sms: { monthly: 500, daily: 50 }
  },
  professional: {
    email: { monthly: 5000, daily: 500 },
    sms: { monthly: 2000, daily: 200 }
  },
  enterprise: {
    email: { monthly: -1, daily: -1 }, // Unlimited
    sms: { monthly: -1, daily: -1 } // Unlimited
  }
}

// In-memory storage for development (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const quotaStore = new Map<string, { used: number; resetDate: Date }>()

// Check rate limit
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: Date } {
  const now = Date.now()
  const fullKey = `${config.keyPrefix || 'rate'}:${key}`
  const limit = rateLimitStore.get(fullKey)

  if (!limit || limit.resetTime < now) {
    rateLimitStore.set(fullKey, {
      count: 1,
      resetTime: now + config.windowMs
    })
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: new Date(now + config.windowMs)
    }
  }

  if (limit.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: new Date(limit.resetTime)
    }
  }

  limit.count++
  return {
    allowed: true,
    remaining: config.maxRequests - limit.count,
    resetTime: new Date(limit.resetTime)
  }
}

// Get quota usage
export async function getQuotaUsage(
  userId: string,
  quotaType: 'email' | 'sms',
  period: 'daily' | 'weekly' | 'monthly' = 'monthly'
): Promise<QuotaUsage> {
  const key = `quota:${userId}:${quotaType}:${period}`
  const usage = quotaStore.get(key)
  const now = new Date()
  
  // Calculate reset date based on period
  const resetDate = new Date()
  switch (period) {
    case 'daily':
      resetDate.setDate(resetDate.getDate() + 1)
      resetDate.setHours(0, 0, 0, 0)
      break
    case 'weekly':
      resetDate.setDate(resetDate.getDate() + (7 - resetDate.getDay()))
      resetDate.setHours(0, 0, 0, 0)
      break
    case 'monthly':
      resetDate.setMonth(resetDate.getMonth() + 1)
      resetDate.setDate(1)
      resetDate.setHours(0, 0, 0, 0)
      break
  }

  // Reset if period has passed
  if (!usage || usage.resetDate < now) {
    quotaStore.set(key, { used: 0, resetDate })
  }

  // TODO: Get user's plan and limits from database
  const userPlan = 'starter' // Mock value
  const limits = DEFAULT_QUOTAS[userPlan as keyof typeof DEFAULT_QUOTAS]
  const limit = period === 'daily' ? limits[quotaType].daily : limits[quotaType].monthly

  const currentUsage = quotaStore.get(key) || { used: 0, resetDate }
  const remaining = limit === -1 ? Infinity : Math.max(0, limit - currentUsage.used)
  const percentUsed = limit === -1 ? 0 : (currentUsage.used / limit) * 100

  return {
    used: currentUsage.used,
    limit: limit === -1 ? Infinity : limit,
    remaining,
    resetDate: currentUsage.resetDate,
    percentUsed
  }
}

// Check if user has quota available
export async function checkQuota(
  userId: string,
  quotaType: 'email' | 'sms',
  required: number = 1
): Promise<{ hasQuota: boolean; usage: QuotaUsage }> {
  const dailyUsage = await getQuotaUsage(userId, quotaType, 'daily')
  const monthlyUsage = await getQuotaUsage(userId, quotaType, 'monthly')

  const hasQuota = 
    dailyUsage.remaining >= required && 
    monthlyUsage.remaining >= required

  return {
    hasQuota,
    usage: monthlyUsage // Return monthly usage as primary
  }
}

// Consume quota
export async function consumeQuota(
  userId: string,
  quotaType: 'email' | 'sms',
  amount: number = 1
): Promise<boolean> {
  // Check if quota is available
  const { hasQuota } = await checkQuota(userId, quotaType, amount)
  if (!hasQuota) {
    return false
  }

  // Update daily usage
  const dailyKey = `quota:${userId}:${quotaType}:daily`
  const dailyUsage = quotaStore.get(dailyKey)
  if (dailyUsage) {
    dailyUsage.used += amount
  }

  // Update monthly usage
  const monthlyKey = `quota:${userId}:${quotaType}:monthly`
  const monthlyUsage = quotaStore.get(monthlyKey)
  if (monthlyUsage) {
    monthlyUsage.used += amount
  }

  // TODO: Update database with new usage
  console.log(`Consumed ${amount} ${quotaType} credits for user ${userId}`)

  return true
}

// Get quota summary for user
export async function getQuotaSummary(userId: string): Promise<{
  email: { daily: QuotaUsage; monthly: QuotaUsage }
  sms: { daily: QuotaUsage; monthly: QuotaUsage }
  plan: string
  alerts: string[]
}> {
  const [emailDaily, emailMonthly, smsDaily, smsMonthly] = await Promise.all([
    getQuotaUsage(userId, 'email', 'daily'),
    getQuotaUsage(userId, 'email', 'monthly'),
    getQuotaUsage(userId, 'sms', 'daily'),
    getQuotaUsage(userId, 'sms', 'monthly')
  ])

  // Generate alerts
  const alerts: string[] = []
  
  if (emailMonthly.percentUsed >= 90) {
    alerts.push(`You've used ${emailMonthly.percentUsed.toFixed(0)}% of your monthly email quota`)
  }
  if (smsMonthly.percentUsed >= 90) {
    alerts.push(`You've used ${smsMonthly.percentUsed.toFixed(0)}% of your monthly SMS quota`)
  }
  if (emailDaily.remaining === 0) {
    alerts.push('Daily email limit reached')
  }
  if (smsDaily.remaining === 0) {
    alerts.push('Daily SMS limit reached')
  }

  return {
    email: { daily: emailDaily, monthly: emailMonthly },
    sms: { daily: smsDaily, monthly: smsMonthly },
    plan: 'starter', // TODO: Get from database
    alerts
  }
}

// Middleware helper for rate limiting
export function rateLimitMiddleware(config: RateLimitConfig) {
  return (req: Request, identifier: string) => {
    const result = checkRateLimit(identifier, config)
    
    if (!result.allowed) {
      throw new Error(`Rate limit exceeded. Try again at ${result.resetTime.toISOString()}`)
    }

    return result
  }
}

// Reset quotas (for testing or manual override)
export async function resetQuotas(userId: string, quotaType?: 'email' | 'sms') {
  const types = quotaType ? [quotaType] : ['email', 'sms'] as const
  const periods = ['daily', 'weekly', 'monthly'] as const

  for (const type of types) {
    for (const period of periods) {
      const key = `quota:${userId}:${type}:${period}`
      quotaStore.delete(key)
    }
  }

  console.log(`Reset quotas for user ${userId}`)
}