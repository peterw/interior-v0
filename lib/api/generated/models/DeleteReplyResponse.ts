/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for reply deletion response.
 */
export type DeleteReplyResponse = {
    success: boolean;
    /**
     * Status of the deletion (e.g., 'queued')
     */
    status: string;
    /**
     * Descriptive message about the operation
     */
    message: string;
};

