/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Lightweight serializer for search status updates
 */
export type LeadSearchStatus = {
    /**
     * Unique identifier for the search
     */
    readonly id: string;
    /**
     * Current status of the search (pending, processing, completed, failed)
     */
    readonly status: string;
    /**
     * Progress percentage (0-100)
     */
    readonly progress_percentage: number;
    /**
     * Error message if the search failed
     */
    readonly error_message: string | null;
    /**
     * Number of results found
     */
    readonly results_count: number;
};

