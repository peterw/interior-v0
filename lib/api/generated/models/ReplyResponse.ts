/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for reply posting response.
 */
export type ReplyResponse = {
    success: boolean;
    /**
     * Status of the reply (e.g., 'queued')
     */
    status: string;
    /**
     * Descriptive message about the operation
     */
    message: string;
    /**
     * Reply details including comment and status
     */
    reply: Record<string, any>;
};

