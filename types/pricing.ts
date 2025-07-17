export interface PricingTableConfig {
  id: string;
  publishable_key: string;
  portal_url: string;
  is_trial: boolean;
  is_premium: boolean;
  stripe_customer_id?: string;
  churnkey_hash?: string;
}
