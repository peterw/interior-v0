/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LeadSearch } from './LeadSearch';
/**
 * Serializer for lead credit logs
 */
export type LeadCreditLog = {
    readonly id: string;
    /**
     * User who used the credits
     */
    readonly user: string;
    /**
     * Lead search that consumed the credits
     */
    readonly search: LeadSearch;
    credits_deducted: number;
    balance_before: number;
    balance_after: number;
    readonly created_at: string;
};

