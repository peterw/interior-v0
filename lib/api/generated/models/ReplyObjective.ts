/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReplyObjective = {
    readonly id: number;
    name: string;
    data?: null;
    /**
     * Get campaigns that are using this objective as their default
     */
    readonly campaigns_using: Record<string, any>;
};

