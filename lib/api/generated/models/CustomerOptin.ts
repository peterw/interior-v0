/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerOptinStatusEnum } from './CustomerOptinStatusEnum';
export type CustomerOptin = {
    readonly id: string;
    campaign: string;
    customer_name?: string;
    email?: string;
    phone_number?: string;
    readonly ip_address: string | null;
    readonly user_agent: string | null;
    email_consent?: boolean;
    sms_consent?: boolean;
    readonly status: CustomerOptinStatusEnum;
    review_submitted?: boolean;
    readonly review_reminder_sent_at: string | null;
    readonly scheduled_send_at: string | null;
    readonly sent_at: string | null;
    /**
     * True if this contact was imported via CSV
     */
    readonly via_csv: boolean;
    readonly created_at: string;
    readonly updated_at: string;
};

