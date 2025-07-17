/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for converting human query to DataForSEO filters
 */
export type HumanToFiltersRequest = {
    /**
     * Natural language description of the businesses you want to find (include location in the query)
     */
    human_query: string;
    /**
     * Number of business leads to retrieve (1-100,000), used for credit estimation
     */
    requested_count?: number;
    /**
     * Filter to only include businesses with phone numbers
     */
    require_phone?: boolean;
    /**
     * Filter to only include businesses with email addresses
     */
    require_email?: boolean;
    /**
     * Optional list of specific industries to filter by
     */
    industries_filter?: Array<string>;
};

