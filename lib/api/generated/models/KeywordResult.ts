/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScanPin } from './ScanPin';
/**
 * Serializer for keyword search results.
 */
export type KeywordResult = {
    /**
     * Search keyword/term
     */
    term: string;
    /**
     * Average rank for this keyword
     */
    avg_rank: number;
    /**
     * List of pins/locations searched for this keyword
     */
    pins: Array<ScanPin>;
};

