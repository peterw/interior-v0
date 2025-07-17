/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewCampaignStatusEnum } from './ReviewCampaignStatusEnum';
export type ReviewCampaignRequest = {
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
};

