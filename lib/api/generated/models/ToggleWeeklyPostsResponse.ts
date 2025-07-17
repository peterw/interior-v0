/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for weekly posts toggle response.
 */
export type ToggleWeeklyPostsResponse = {
    success: boolean;
    /**
     * Current state of weekly posts for this location
     */
    enabled: boolean;
    /**
     * Descriptive message about the operation
     */
    message: string;
};

