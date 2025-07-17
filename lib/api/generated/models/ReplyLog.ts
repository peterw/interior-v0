/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from './Message';
import type { ReplyLogStatusEnum } from './ReplyLogStatusEnum';
import type { ReplyObjective } from './ReplyObjective';
export type ReplyLog = {
    readonly id: number;
    readonly message: Message;
    readonly objective: ReplyObjective;
    status: ReplyLogStatusEnum;
    sent_at: string;
    meta?: null;
    readonly created_at: string;
    readonly updated_at: string;
};

