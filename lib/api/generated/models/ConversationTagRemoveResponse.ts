/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conversation } from './Conversation';
/**
 * Response serializer for tag removal operations
 */
export type ConversationTagRemoveResponse = {
    message: string;
    removed_tags: Array<string>;
    conversation: Conversation;
    warning?: string;
};

