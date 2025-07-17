/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomUser } from './CustomUser';
export type CreditLog = {
    readonly id: number;
    readonly user: CustomUser;
    scan?: number | null;
    /**
     * Positive for credit addition, negative for deduction.
     */
    change: number;
    readonly balance_after: number;
    /**
     * Reason for the credit change (e.g., Scan execution, Manual adjustment).
     */
    reason?: string;
    readonly timestamp: string;
};

