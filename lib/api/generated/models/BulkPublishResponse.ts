/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BulkPublishResult } from './BulkPublishResult';
/**
 * Serializer for bulk publish draft replies response.
 */
export type BulkPublishResponse = {
    success: boolean;
    results: Array<BulkPublishResult>;
    queued_count: number;
    published_count?: number;
    failed_count: number;
    message?: string;
};

