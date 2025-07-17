/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Status316Enum } from './Status316Enum';
/**
 * Serializer for videos including status and download information
 */
export type Video = {
    readonly uuid: string;
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
    readonly status: Status316Enum;
    /**
     * If True, this video can be shown as a default example
     */
    is_default?: boolean;
    readonly file_url: string | null;
    readonly download_url: string;
    readonly download_count: number;
    /**
     * File size in bytes
     */
    readonly file_size: number | null;
    /**
     * ID from the external AI video service
     */
    readonly external_request_id: string | null;
    readonly file_path: string | null;
    /**
     * Additional metadata from the AI service
     */
    readonly metadata: null;
    readonly created_at: string;
    readonly updated_at: string;
    readonly completed_at: string | null;
};

