/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessLocation } from './BusinessLocation';
import type { UnifiedBusinessStatusEnum } from './UnifiedBusinessStatusEnum';
export type UnifiedBusiness = {
    readonly uuid: string;
    name?: string;
    /**
     * Business description for listings, SEO, and marketing
     */
    description?: string | null;
    readonly display_name: string;
    url?: string | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    place_id?: string | null;
    business_id?: string | null;
    cid?: string | null;
    readonly fid: string;
    status?: UnifiedBusinessStatusEnum;
    /**
     * Business name variations
     */
    variations?: null;
    phoneNumber?: string | null;
    readonly tags: string;
    readonly locations: Array<BusinessLocation>;
    readonly created_at: string;
    readonly updated_at: string;
};

