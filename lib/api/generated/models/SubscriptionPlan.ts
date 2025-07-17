/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CheckoutUrl } from './CheckoutUrl';
/**
 * Schema for the active or free-tier plan returned by CurrentSubscriptionAPI.
 */
export type SubscriptionPlan = {
    price_id: string;
    price_nickname: string;
    amount: number;
    currency: string;
    interval: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
    cancel_at: number;
    status: string;
    product_name: string;
    /**
     * Current plan name (e.g., STARTER, BALLER, LOCAL, etc.) or FREE
     */
    current_plan: string;
    checkout_urls: Array<CheckoutUrl>;
};

