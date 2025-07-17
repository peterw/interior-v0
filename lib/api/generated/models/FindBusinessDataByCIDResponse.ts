/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitationData } from './CitationData';
import type { ScanData } from './ScanData';
import type { UnifiedBusiness } from './UnifiedBusiness';
/**
 * Response serializer for find_business_data_by_cid endpoint.
 */
export type FindBusinessDataByCIDResponse = {
    /**
     * Business information
     */
    business: UnifiedBusiness;
    /**
     * Extracted CID from the URL
     */
    cid: string;
    /**
     * Scan data and metadata
     */
    scans: ScanData;
    /**
     * Citation data and metadata
     */
    citations: CitationData;
};

