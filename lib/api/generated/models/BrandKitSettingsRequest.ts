/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FontSettingsRequest } from './FontSettingsRequest';
import type { PaletteSettingsRequest } from './PaletteSettingsRequest';
export type BrandKitSettingsRequest = {
    palette?: PaletteSettingsRequest;
    fonts?: FontSettingsRequest;
    /**
     * URL to the brand logo
     */
    logoUrl?: string;
};

