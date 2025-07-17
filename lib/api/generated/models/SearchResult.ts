/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScanPin } from './ScanPin';
/**
 * Serializer for SearchResult model.
 */
export type SearchResult = {
    readonly id: number;
    readonly scan: number;
    readonly pin: ScanPin;
    keyword: string;
    rank?: number | null;
    found?: boolean;
    all_results?: any;
    error?: string | null;
    readonly created_at: string;
};

