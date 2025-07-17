/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for lead credits
 */
export type LeadCredit = {
    /**
     * Current available lead credits
     */
    readonly balance: number;
    /**
     * Total credits earned by the user
     */
    readonly total_earned: number;
    /**
     * Total credits spent by the user
     */
    readonly total_spent: number;
    /**
     * When the credit account was created
     */
    readonly created_at: string;
    /**
     * When the credit account was last updated
     */
    readonly updated_at: string;
};

