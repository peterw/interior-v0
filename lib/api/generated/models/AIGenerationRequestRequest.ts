/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for AI review reply generation requests.
 */
export type AIGenerationRequestRequest = {
    /**
     * List of review IDs to generate replies for (can be single ID or multiple IDs)
     */
    review_ids: Array<string>;
    /**
     * Whether to save generated replies as drafts (default: true)
     */
    save_as_draft?: boolean;
    /**
     * Optional overrides for review data used in generation
     */
    overrides?: Record<string, any>;
};

