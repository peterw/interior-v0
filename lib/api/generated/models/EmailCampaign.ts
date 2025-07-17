/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProviderEnum } from './ProviderEnum';
import type { ReplyObjective } from './ReplyObjective';
export type EmailCampaign = {
    readonly id: number;
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
    readonly default_objective: ReplyObjective;
    readonly created_at: string;
    readonly updated_at: string;
};

