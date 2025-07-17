import { User } from '@/lib/auth'
import { dashboardMenuRoutes } from '@/config/routes'

/**
 * Checks if a user has any active subscription (rank tracker or citations)
 * @param user - The user object from auth context
 * @returns boolean indicating if user has active subscription
 */
export function hasActiveSubscription(user: User | null): boolean {
  if (!user) return false
  
  return Boolean(
    user.is_premium || 
    (user.subscription?.plan && user.subscription.plan.toLowerCase() !== 'free')
  )
}

/**
 * Determines the appropriate redirect path after login based on subscription status
 * @param user - The user object from auth context
 * @returns string path to redirect to
 */
export function getPostLoginRedirectPath(user: User | null): string {
  return hasActiveSubscription(user) ? dashboardMenuRoutes.dashboard.path : `/upgrade?tab=growth`
}
