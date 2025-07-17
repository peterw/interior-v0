/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for credit package information
 */
export type CreditPackage = {
    /**
     * Stripe price ID
     */
    price_id: string;
    /**
     * Price in dollars
     */
    amount: number;
    /**
     * Number of credits in this package
     */
    credits: number;
    /**
     * Number of leads (credits / 5)
     */
    leads: number;
    /**
     * Display name for the package
     */
    display_name: string;
    /**
     * Currency code (e.g., USD)
     */
    currency: string;
};

