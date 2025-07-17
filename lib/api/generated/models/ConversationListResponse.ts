/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conversation } from './Conversation';
import type { EmailAgentSyncMetadata } from './EmailAgentSyncMetadata';
/**
 * Response serializer for conversation list endpoint
 */
export type ConversationListResponse = {
    results: Array<Conversation>;
    count: number;
    sync_info: EmailAgentSyncMetadata;
};

