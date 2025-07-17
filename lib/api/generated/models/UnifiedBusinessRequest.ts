/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnifiedBusinessStatusEnum } from './UnifiedBusinessStatusEnum';
export type UnifiedBusinessRequest = {
    name?: string;
    /**
     * Business description for listings, SEO, and marketing
     */
    description?: string | null;
    url?: string | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    place_id?: string | null;
    business_id?: string | null;
    cid?: string | null;
    status?: UnifiedBusinessStatusEnum;
    /**
     * Business name variations
     */
    variations?: null;
    phoneNumber?: string | null;
};

