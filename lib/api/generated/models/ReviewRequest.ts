/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AiResponseStatusEnum } from './AiResponseStatusEnum';
import type { ReplyPublishStatusEnum } from './ReplyPublishStatusEnum';
/**
 * Serializer for the GMBReview model.
 */
export type ReviewRequest = {
    review_id: string;
    star_rating: number;
    comment?: string;
    update_time: string;
    reviewer_name?: string;
    reviewer_photo?: string;
    reply_comment?: string;
    reply_update_time?: string | null;
    draft_reply_comment?: string;
    ai_response_status?: AiResponseStatusEnum;
    /**
     * Status of reply publication to Google
     *
     * * `draft` - Draft
     * * `queued` - Queued for Publishing
     * * `deleting` - Queued for Deletion
     * * `publishing` - Publishing
     * * `published` - Published
     * * `failed` - Failed to Publish
     * * `archived` - Archived (Not on Google)
     */
    reply_publish_status?: ReplyPublishStatusEnum;
    /**
     * Error message if publishing failed
     */
    reply_publish_error?: string;
};

