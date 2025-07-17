/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DirectionEnum } from './DirectionEnum';
export type MessageRequest = {
    direction: DirectionEnum;
    body: string;
    provider_message_id: string;
    timestamp: string;
    is_read?: boolean;
    sender_name?: string | null;
    /**
     * Whether this message was sent as an automated reply
     */
    is_automated_reply?: boolean;
    /**
     * Which step in the automated sequence this reply represents
     */
    automated_reply_step?: number | null;
};

