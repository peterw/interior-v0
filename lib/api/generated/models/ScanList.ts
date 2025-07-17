/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Business } from './Business';
import type { FrequencyB06Enum } from './FrequencyB06Enum';
import type { Status60bEnum } from './Status60bEnum';
/**
 * Serializer for listing scans with minimal info
 */
export type ScanList = {
    readonly uuid: string;
    readonly business: Business;
    readonly status: Status60bEnum;
    readonly created_at: string;
    readonly completed_at: string | null;
    scanType: string;
    frequency?: FrequencyB06Enum;
    readonly nextScanDate: string;
    keywords?: any;
    pinCount: number;
    radius?: number;
    readonly share_url: string;
    readonly public_share_enabled: boolean;
    readonly avg_rank: string;
    readonly archived: boolean;
    readonly is_paused: string;
    readonly test_mode: boolean;
};

