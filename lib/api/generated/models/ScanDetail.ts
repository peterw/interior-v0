/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Business } from './Business';
import type { FrequencyB06Enum } from './FrequencyB06Enum';
import type { Status60bEnum } from './Status60bEnum';
/**
 * Serializer for detailed scan view with results
 */
export type ScanDetail = {
    readonly uuid: string;
    readonly url: string;
    status?: Status60bEnum;
    readonly created_at: string;
    readonly completed_at: string | null;
    readonly scanType: string;
    frequency?: FrequencyB06Enum;
    readonly nextScanDate: string;
    readonly radius: number;
    readonly keyword_results: string;
    keywords?: any;
    readonly pinCount: number;
    readonly business_location: string;
    readonly business: Business;
    readonly share_url: string;
    readonly public_share_enabled: boolean;
    tags?: Array<string>;
    readonly avg_rank: string;
    readonly archived: boolean;
    readonly test_mode: boolean;
};

