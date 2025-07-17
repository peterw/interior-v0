/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutomatedReplyScheduleCreateRequest } from './AutomatedReplyScheduleCreateRequest';
/**
 * Serializer for enabling/disabling automated replies on conversations
 */
export type ConversationAutomatedReplyRequest = {
    /**
     * True to enable automated replies, False to disable
     */
    enable: boolean;
    /**
     * Optional configuration for the automated reply schedule
     */
    schedule_config?: AutomatedReplyScheduleCreateRequest;
};

