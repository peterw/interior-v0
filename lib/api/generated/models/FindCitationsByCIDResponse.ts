/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnifiedBusiness } from './UnifiedBusiness';
/**
 * Response serializer for find_citations_by_cid endpoint.
 */
export type FindCitationsByCIDResponse = {
    /**
     * Business information
     */
    business: UnifiedBusiness;
    /**
     * Extracted CID from the URL
     */
    cid: string;
    /**
     * Number of citations found
     */
    citations_count: number;
    /**
     * List of citation objects with details
     */
    citations: Array<Record<string, any>>;
    /**
     * UUID of the citation business
     */
    citation_business_uuid?: string;
    /**
     * Informational message if no citations business found
     */
    message?: string;
};

