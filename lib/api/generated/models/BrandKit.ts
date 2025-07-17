/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandKitSettings } from './BrandKitSettings';
import type { SimpleUser } from './SimpleUser';
export type BrandKit = {
    readonly id: string;
    readonly user: SimpleUser;
    name?: string;
    settings?: BrandKitSettings;
    /**
     * Instructions for the brand kit
     */
    instructions?: string;
    is_public?: boolean;
    readonly created_at: string;
    readonly updated_at: string;
    /**
     * List of SourceAsset IDs to associate as thumbnails for this BrandKit.
     */
    source_assets?: Array<string>;
};

