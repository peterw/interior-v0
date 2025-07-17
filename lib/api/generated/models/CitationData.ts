/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Citation } from './Citation';
/**
 * Serializer for citation data in CID responses.
 */
export type CitationData = {
    /**
     * Number of citations found
     */
    count: number;
    /**
     * List of citation objects with full details
     */
    data: Array<Citation>;
    /**
     * UUID of the citation business
     */
    citation_business_uuid?: string;
    /**
     * Informational message
     */
    message?: string;
    /**
     * Error message if citations could not be retrieved
     */
    error?: string;
};

