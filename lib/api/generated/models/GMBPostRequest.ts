/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for GMB posts including drafts and queued posts.
 */
export type GMBPostRequest = {
    /**
     * The location ID (e.g., '456' from 'accounts/123/locations/456')
     */
    location_id?: string;
    /**
     * The full resource name (e.g., 'accounts/123/locations/456')
     */
    resource_name?: string;
    summary?: string;
    image_url?: string;
    cta_type?: string;
    cta_url?: string;
    scheduled_for?: string | null;
    event_title?: string;
    language_code?: string;
};

