/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FrequencyB06Enum } from './FrequencyB06Enum';
/**
 * Serializer for creating a new scan
 */
export type ScanCreateRequest = {
    url?: string;
    business_uuid?: string;
    scanType: string;
    frequency?: FrequencyB06Enum;
    keywords?: any;
    pinCount?: number;
    radius?: number;
    test_mode?: boolean;
    tags?: Array<string>;
    place_id?: string | null;
    /**
     * Optional JSON object containing business details. If provided, these values will be used instead of scraping from the URL. Keys can include: name, place_id, cid, address, latitude/longitude, variations, business_id
     */
    business_details?: Record<string, any>;
};

