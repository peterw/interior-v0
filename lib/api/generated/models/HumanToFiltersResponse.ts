/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for the response from convertHumanToFilters API
 */
export type HumanToFiltersResponse = {
    /**
     * DataForSEO API filters extracted from the query
     */
    filters: any;
    /**
     * Estimated credit cost for the search
     */
    estimated_credits: number;
    /**
     * Number of leads requested for estimation
     */
    requested_count: number;
    /**
     * Extracted locations from the query
     */
    location: Array<string>;
    /**
     * Extracted industries/categories from the query
     */
    industries: Array<string>;
    /**
     * Whether phone numbers are available for results
     */
    phone_available: boolean;
    /**
     * Whether email addresses are available for results
     */
    email_available: boolean;
};

