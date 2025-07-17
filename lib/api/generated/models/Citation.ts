/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitationStatusEnum } from './CitationStatusEnum';
/**
 * Detailed serializer for individual citation objects.
 */
export type Citation = {
    /**
     * Citation ID
     */
    id: number;
    /**
     * Location ID associated with this citation
     */
    location?: number | null;
    /**
     * Domain name for the citation
     */
    domain_name: string;
    /**
     * URL path for the citation
     */
    url_path: string;
    /**
     * Cloudflare Pages URL
     */
    pages_url: string;
    /**
     * Actual domain URL
     */
    domain_url: string;
    /**
     * Current status of the citation
     *
     * * `WAITING` - WAITING
     * * `DEPLOYED` - DEPLOYED
     * * `FAILED` - FAILED
     * * `NEW_DOMAIN_PENDING` - NEW_DOMAIN_PENDING
     */
    status: CitationStatusEnum;
    /**
     * Whether this is a test citation
     */
    test_mode: boolean;
    /**
     * Number of retry attempts
     */
    retry_count: number;
    /**
     * Additional metadata
     */
    meta?: Record<string, any>;
    /**
     * When the citation was created
     */
    created_at: string;
    /**
     * When the citation was last updated
     */
    updated_at: string;
};

