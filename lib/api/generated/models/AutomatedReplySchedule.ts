/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutomatedReplyScheduleStatusEnum } from './AutomatedReplyScheduleStatusEnum';
/**
 * Serializer for automated reply schedules.
 */
export type AutomatedReplySchedule = {
    readonly id: number;
    status?: AutomatedReplyScheduleStatusEnum;
    /**
     * Current step in the sequence
     */
    current_step?: number;
    /**
     * Maximum number of automated replies
     */
    max_replies?: number;
    /**
     * When the next reply should be sent
     */
    next_reply_at?: string | null;
    readonly total_replies_sent: number;
    is_paused_by_user?: boolean;
    pause_reason?: string | null;
    /**
     * Base delay in hours
     */
    base_delay_hours?: number;
    /**
     * Exponential backoff factor
     */
    exponential_factor?: number;
    /**
     * List of reply templates with delays
     */
    reply_templates?: any;
    readonly next_reply_in_hours: string;
    readonly progress_percentage: string;
    readonly created_at: string;
    readonly updated_at: string;
};

