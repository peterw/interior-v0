/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for sending a message to a thread
 */
export type ThreadMessageSendRequest = {
    /**
     * Message body content to send
     */
    body: string;
    /**
     * Optional objective ID for the reply
     */
    objective_id?: number;
};

