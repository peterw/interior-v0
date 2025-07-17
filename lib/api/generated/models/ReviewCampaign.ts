/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewCampaignStatusEnum } from './ReviewCampaignStatusEnum';
export type ReviewCampaign = {
    readonly id: string;
    name: string;
    /**
     * Google/Facebook/Yelp review link
     */
    review_url: string;
    status?: ReviewCampaignStatusEnum;
    business_name?: string;
    business_address?: string;
    place_id?: string | null;
    business_phone?: string;
    business_website?: string;
    latitude?: string | null;
    longitude?: string | null;
    readonly unique_token: string;
    readonly collection_url: string | null;
    readonly qr_code_url: string | null;
    readonly opt_in_count: number;
    readonly review_click_count: number;
    readonly total_requests: number;
    readonly created_at: string;
    readonly updated_at: string;
};

