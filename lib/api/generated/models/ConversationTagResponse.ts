/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conversation } from './Conversation';
import type { Tag } from './Tag';
/**
 * Response serializer for tag operations on conversations
 */
export type ConversationTagResponse = {
    message: string;
    added_tags: Array<Tag>;
    conversation: Conversation;
};

