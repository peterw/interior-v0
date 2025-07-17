/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandKitSettingsRequest } from './BrandKitSettingsRequest';
export type BrandKitRequest = {
    name?: string;
    settings?: BrandKitSettingsRequest;
    /**
     * Instructions for the brand kit
     */
    instructions?: string;
    is_public?: boolean;
    /**
     * List of SourceAsset IDs to associate as thumbnails for this BrandKit.
     */
    source_assets?: Array<string>;
};

