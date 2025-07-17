/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PatchedBusinessRequest = {
    name?: string;
    url?: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    cid?: string | null;
    fid?: string | null;
    place_id?: string | null;
    business_id?: string | null;
    variations?: null;
    tags?: Array<string>;
    /**
     * If true, mock data is used for latitude, longitude, etc.
     */
    test_mode?: boolean;
};

