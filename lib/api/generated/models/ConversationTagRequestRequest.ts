/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request serializer for adding tags to a conversation
 */
export type ConversationTagRequestRequest = {
    /**
     * List of tag names to add to the conversation
     */
    tag_names: Array<string>;
    /**
     * Optional mapping of tag names to colors (e.g. {'tag1': '#3B82F6'})
     */
    colors?: Record<string, string>;
};

