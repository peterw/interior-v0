/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GMBLocationWithResource } from './GMBLocationWithResource';
/**
 * Serializer for account data with its locations.
 */
export type GMBAccountWithLocations = {
    account_name: string;
    account_id: string;
    credential_id: number;
    business_name?: string;
    locations: Array<GMBLocationWithResource>;
};

