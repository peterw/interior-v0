/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Simplified conversation serializer for use in nested contexts to avoid circular references.
 */
export type ConversationSummary = {
    readonly id: number;
    readonly campaign: number;
    contact_email: string;
    subject?: string | null;
    is_read?: boolean;
    is_starred?: boolean;
    is_archived?: boolean;
    readonly created_at: string;
    readonly updated_at: string;
};

