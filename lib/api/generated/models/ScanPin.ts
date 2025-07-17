/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for ScanPin model.
 */
export type ScanPin = {
    readonly id: number;
    readonly scan: number;
    latitude: number;
    longitude: number;
    is_center?: boolean;
    maps_link?: string | null;
    readonly created_at: string;
};

