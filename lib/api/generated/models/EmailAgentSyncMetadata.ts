/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for the sync metadata used in email agent responses.
 */
export type EmailAgentSyncMetadata = {
    background_sync_enabled?: boolean;
    sync_interval_minutes?: number;
    last_synced_at: string | null;
    sync_triggered?: boolean;
    pagination_disabled?: boolean;
};

