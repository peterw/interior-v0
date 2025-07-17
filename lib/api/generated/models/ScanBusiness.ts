/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for business data within scan responses.
 */
export type ScanBusiness = {
    /**
     * Business UUID
     */
    uuid: string;
    /**
     * Business name
     */
    name: string;
    /**
     * Business website URL
     */
    url: string;
    /**
     * Business address
     */
    address: string;
    /**
     * Business latitude
     */
    latitude: number;
    /**
     * Business longitude
     */
    longitude: number;
    /**
     * Google CID
     */
    cid?: string | null;
    /**
     * Google Place ID
     */
    place_id?: string | null;
    /**
     * When the business was created
     */
    created_at: string;
    /**
     * Google Business ID
     */
    business_id?: string | null;
    /**
     * Business name variations
     */
    variations: Array<string>;
    /**
     * Business tags
     */
    tags: Array<string>;
};

