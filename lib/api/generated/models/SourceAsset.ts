/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleUser } from './SimpleUser';
export type SourceAsset = {
    readonly id: string;
    readonly user: SimpleUser;
    url?: string | null;
    /**
     * Stores original filename, content type, etc.
     */
    metadata?: any;
    brand_kits?: Array<string>;
    readonly created_at: string;
};

