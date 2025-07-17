/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GMBPostStatusEnum } from './GMBPostStatusEnum';
/**
 * Serializer for GMB posts including drafts and queued posts.
 */
export type GMBPost = {
    readonly id: number;
    summary?: string;
    image_url?: string;
    cta_type?: string;
    cta_url?: string;
    readonly google_post_id: string;
    readonly status: GMBPostStatusEnum;
    scheduled_for?: string | null;
    readonly created_at: string;
    readonly updated_at: string;
    readonly published_at: string;
    readonly error_message: string;
    readonly location_resource_name: string;
};

