/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Subscription } from './Subscription';
/**
 * Enhanced serializer for CustomUser that handles user creation and validation.
 */
export type CustomUser = {
    readonly id: number;
    email: string;
    first_name?: string;
    last_name?: string;
    readonly is_premium: boolean;
    readonly is_trial: boolean;
    readonly is_burner_account: boolean;
    readonly fingerprint_visitor_id: string;
    readonly subscription: Subscription;
    readonly metadata: any;
    readonly date_joined: string;
};

