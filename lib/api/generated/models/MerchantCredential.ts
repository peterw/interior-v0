/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for the MerchantCredential model.
 */
export type MerchantCredential = {
    readonly id: number;
    user: number;
    business?: number | null;
    readonly business_name: string;
    readonly account_resource_name: string;
    expires_at: string;
    project_number: string;
    readonly created_at: string;
    readonly updated_at: string;
};

