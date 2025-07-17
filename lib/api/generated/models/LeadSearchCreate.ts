/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for creating lead searches
 */
export type LeadSearchCreate = {
    /**
     * Natural language description of the type of businesses you're looking for
     */
    human_query: string;
    /**
     * Geographic location to search for businesses (e.g., 'New York, NY' or 'London, UK')
     */
    location: string;
    /**
     * Optional country code (e.g., 'US', 'CA', 'GB'). If provided, will be used to filter results.
     */
    country?: string;
    /**
     * Number of business leads to retrieve (1-100,000)
     */
    requested_count: number;
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
    /**
     * Run in test mode - no credits used, returns relevant test data
     */
    is_test_mode?: boolean;
    /**
     * Search the entire country instead of using location-based search
     */
    country_wide_search?: boolean;
};

