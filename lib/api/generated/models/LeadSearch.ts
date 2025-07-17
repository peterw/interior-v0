/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Status316Enum } from './Status316Enum';
/**
 * Serializer for viewing lead searches
 */
export type LeadSearch = {
    readonly id: string;
    /**
     * User who created this search
     */
    readonly user: string;
    /**
     * Natural language description of what leads the user wants
     */
    human_query: string;
    /**
     * DataForSEO API filters generated from human query
     */
    readonly processed_filters: any;
    /**
     * Location for the search (city, state, etc.)
     */
    location: string;
    /**
     * Number of leads requested
     */
    requested_count?: number;
    /**
     * Number of credits this search will cost
     */
    readonly credits_cost: number;
    /**
     * If true, no credits are used and relevant test data is returned
     */
    is_test_mode?: boolean;
    readonly status: Status316Enum;
    readonly progress_percentage: number;
    readonly error_message: string | null;
    /**
     * Number of lead results found for this search
     */
    readonly results_count: string;
    /**
     * Number of lead results with valid email addresses
     */
    readonly valid_emails_count: string;
    readonly created_at: string;
    readonly updated_at: string;
    readonly completed_at: string | null;
};

