/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for bulk operation status response.
 */
export type BulkStatusResponse = {
    success: boolean;
    monthly_usage: number;
    monthly_limit: number;
    remaining: number;
    draft_count: number;
    queued_count: number;
    publishing_count: number;
    failed_count: number;
    total_reviews: number;
    can_generate: boolean;
};

