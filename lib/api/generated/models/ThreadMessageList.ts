/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ThreadMessage } from './ThreadMessage';
/**
 * Serializer for listing messages in a thread
 */
export type ThreadMessageList = {
    readonly messages: Array<ThreadMessage>;
    readonly thread_id: number;
    readonly contact_email: string;
    readonly subject: string;
};

