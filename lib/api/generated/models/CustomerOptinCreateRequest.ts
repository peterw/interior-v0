/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for creating customer opt-ins from the collection page
 */
export type CustomerOptinCreateRequest = {
    customer_name?: string;
    email?: string;
    phone_number?: string;
    email_consent?: boolean;
    sms_consent?: boolean;
    via_csv?: boolean;
};

