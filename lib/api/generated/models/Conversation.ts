/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AiResponseStatusEnum } from './AiResponseStatusEnum';
import type { Tag } from './Tag';
export type Conversation = {
    readonly id: number;
    readonly campaign: number;
    contact_email: string;
    subject?: string | null;
    is_read?: boolean;
    is_starred?: boolean;
    is_archived?: boolean;
    ai_response_draft?: string | null;
    ai_response_status?: AiResponseStatusEnum;
    readonly preview: string;
    readonly sender_name: string;
    readonly tags: Array<Tag>;
    readonly waiting_for_reply: boolean;
    readonly latest_message_timestamp: string;
    /**
     * Whether this conversation has automated replies enabled
     */
    has_automated_replies?: boolean;
    readonly automated_schedule_info: string;
    readonly created_at: string;
    readonly updated_at: string;
};

