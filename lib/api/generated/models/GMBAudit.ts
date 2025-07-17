/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Status316Enum } from './Status316Enum';
/**
 * Simple ModelSerializer for GMBAudit model.
 */
export type GMBAudit = {
    readonly id: string;
    gmb_url: string;
    status?: Status316Enum;
    result?: any;
    readonly created_at: string;
    /**
     * Unique token to publicly share this audit without login
     */
    readonly public_share_token: string | null;
    /**
     * Number of reviews fetched so far
     */
    readonly reviews_fetched: number;
    /**
     * Total reviews available (if known)
     */
    readonly total_reviews: number | null;
    /**
     * Last time the audit was updated
     */
    readonly last_updated: string;
};

