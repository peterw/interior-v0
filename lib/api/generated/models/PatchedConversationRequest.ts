/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AiResponseStatusEnum } from './AiResponseStatusEnum';
export type PatchedConversationRequest = {
    contact_email?: string;
    subject?: string | null;
    is_read?: boolean;
    is_starred?: boolean;
    is_archived?: boolean;
    ai_response_draft?: string | null;
    ai_response_status?: AiResponseStatusEnum;
    /**
     * Whether this conversation has automated replies enabled
     */
    has_automated_replies?: boolean;
};

