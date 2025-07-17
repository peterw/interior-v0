/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessLocation } from './BusinessLocation';
import type { KeywordResult } from './KeywordResult';
import type { ScanBusiness } from './ScanBusiness';
import type { ScanFrequencyEnum } from './ScanFrequencyEnum';
import type { ScanStatusEnum } from './ScanStatusEnum';
import type { ScanTypeEnum } from './ScanTypeEnum';
/**
 * Detailed serializer for individual scan objects.
 */
export type Scan = {
    /**
     * Unique identifier for the scan
     */
    uuid: string;
    /**
     * Business URL
     */
    url: string;
    /**
     * Current status of the scan
     *
     * * `pending` - pending
     * * `scheduled` - scheduled
     * * `in_progress` - in_progress
     * * `completed` - completed
     * * `failed` - failed
     * * `paused` - paused
     * * `cancelled` - cancelled
     */
    status: ScanStatusEnum;
    /**
     * When the scan was created
     */
    created_at: string;
    /**
     * When the scan was completed
     */
    completed_at?: string | null;
    /**
     * Type of scan
     *
     * * `one-time` - one-time
     * * `repeating` - repeating
     */
    scanType: ScanTypeEnum;
    /**
     * Frequency for repeating scans
     *
     * * `daily` - daily
     * * `weekly` - weekly
     * * `monthly` - monthly
     * * `` -
     */
    frequency?: ScanFrequencyEnum;
    /**
     * Next scheduled scan date for repeating scans
     */
    nextScanDate?: string | null;
    /**
     * Search radius in miles
     */
    radius: number;
    /**
     * Results for each keyword
     */
    keyword_results: Array<KeywordResult>;
    /**
     * List of keywords searched
     */
    keywords: Array<string>;
    /**
     * Number of search pins
     */
    pinCount: number;
    /**
     * Business location coordinates
     */
    business_location?: BusinessLocation;
    /**
     * Business information
     */
    business: ScanBusiness;
    /**
     * Public share URL if enabled
     */
    share_url?: string | null;
    /**
     * Whether public sharing is enabled
     */
    public_share_enabled: boolean;
    /**
     * Tags associated with the scan
     */
    tags: Array<string>;
    /**
     * Average ranking across all keywords
     */
    avg_rank: number;
    /**
     * Whether the scan is archived
     */
    archived: boolean;
    /**
     * Whether the scan was run in test mode
     */
    test_mode: boolean;
};

