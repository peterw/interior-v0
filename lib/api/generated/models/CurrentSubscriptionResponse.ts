/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionPlan } from './SubscriptionPlan';
/**
 * Top-level response serializer for /api/v1/subscriptions/current/
 */
export type CurrentSubscriptionResponse = {
    ranktracker: SubscriptionPlan;
    citations: SubscriptionPlan;
    localleads: SubscriptionPlan;
    /**
     * Hosted URLs for any open/unpaid invoices on the customer's account.
     */
    unpaid_invoice_urls?: Array<string>;
};

