/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FrequencyB06Enum } from './FrequencyB06Enum';
/**
 * Serializer for creating a new scan
 */
export type ScanCreate = {
    readonly uuid: string;
    scanType: string;
    frequency?: FrequencyB06Enum;
    keywords?: any;
    pinCount?: number;
    radius?: number;
    tags?: Array<string>;
};

