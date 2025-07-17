/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutomatedReplySchedule } from './AutomatedReplySchedule';
import type { Conversation } from './Conversation';
/**
 * Response serializer for automated reply operations
 */
export type ConversationAutomatedReplyResponse = {
    message: string;
    conversation: Conversation;
    schedule?: AutomatedReplySchedule;
};

