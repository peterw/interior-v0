/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FrequencyB06Enum } from './FrequencyB06Enum';
import type { Status60bEnum } from './Status60bEnum';
/**
 * Serializer for detailed scan view with results
 */
export type PatchedScanDetailRequest = {
    status?: Status60bEnum;
    frequency?: FrequencyB06Enum;
    keywords?: any;
    tags?: Array<string>;
};

