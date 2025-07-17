/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for viewing lead searches
 */
export type PatchedLeadSearchRequest = {
    /**
     * Natural language description of what leads the user wants
     */
    human_query?: string;
    /**
     * Location for the search (city, state, etc.)
     */
    location?: string;
    /**
     * Number of leads requested
     */
    requested_count?: number;
    /**
     * If true, no credits are used and relevant test data is returned
     */
    is_test_mode?: boolean;
};

