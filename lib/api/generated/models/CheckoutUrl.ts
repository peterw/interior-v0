/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Schema for each upgrade/downgrade Checkout link.
 */
export type CheckoutUrl = {
    /**
     * Stripe Price ID that the Checkout session targets
     */
    price_id: string;
    /**
     * Pre-signed Stripe Checkout URL for this price
     */
    url: string;
    /**
     * Human-readable price nickname in Stripe
     */
    price_nickname: string;
    /**
     * Unit amount in the smallest currency unit, e.g. cents
     */
    amount: number;
    /**
     * ISO currency code
     */
    currency: string;
    /**
     * Billing interval – month, year, none, etc.
     */
    interval: string;
    /**
     * Stripe Product ID this price belongs to
     */
    product_id: string;
    /**
     * Readable product name fetched from Stripe
     */
    product_name: string;
};

