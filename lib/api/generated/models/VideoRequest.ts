/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for videos including status and download information
 */
export type VideoRequest = {
    title?: string;
    description?: string | null;
    /**
     * Detailed prompt for the AI to generate the video
     */
    prompt?: string | null;
    /**
     * Style or theme for the video
     */
    style?: string | null;
    /**
     * Requested duration in seconds
     */
    duration?: number;
    /**
     * Video resolution
     */
    resolution?: string;
    /**
     * If True, this video can be shown as a default example
     */
    is_default?: boolean;
};

