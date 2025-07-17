/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProviderEnum } from './ProviderEnum';
export type EmailCampaignRequest = {
    provider_id: string;
    name: string;
    provider?: ProviderEnum;
    /**
     * Campaign status from external provider
     */
    external_status?: number | null;
    is_evergreen?: boolean;
    daily_limit?: number | null;
    last_synced_at?: string | null;
    is_active?: boolean;
};

