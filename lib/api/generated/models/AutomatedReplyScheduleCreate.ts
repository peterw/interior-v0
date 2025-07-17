/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for creating automated reply schedules.
 */
export type AutomatedReplyScheduleCreate = {
    /**
     * Maximum number of automated replies
     */
    max_replies?: number;
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
};

