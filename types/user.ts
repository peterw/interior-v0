export interface User {
  id: string
  email: string
  name?: string
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
  role: 'USER' | 'ADMIN'
  is_premium?: boolean
  is_trial?: boolean
  is_burner_account?: boolean
  fingerprint_visitor_id?: string
  subscription?: {
    id: string
    credit_balance: number
    plan: string
    subscription_status: string
    stripe_customer_id: string
  }
}

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export interface UserSession {
  user: SafeUser | null
  expires: string
}
