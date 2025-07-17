/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnifiedBusiness } from './UnifiedBusiness';
/**
 * Response serializer for find_scans_by_cid endpoint.
 */
export type FindScansByCIDResponse = {
    /**
     * Business information
     */
    business: UnifiedBusiness;
    /**
     * Extracted CID from the URL
     */
    cid: string;
    /**
     * Number of scans found
     */
    scans_count: number;
    /**
     * List of scan objects with details
     */
    scans: Array<Record<string, any>>;
};

