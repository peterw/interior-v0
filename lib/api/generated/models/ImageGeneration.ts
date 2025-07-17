/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageGenerationStatusEnum } from './ImageGenerationStatusEnum';
import type { SimpleUser } from './SimpleUser';
export type ImageGeneration = {
    readonly id: string;
    readonly user: SimpleUser;
    brand_kit?: string | null;
    source_asset?: string | null;
    prompt?: string;
    readonly output_url: string;
    readonly status: ImageGenerationStatusEnum;
    readonly created_at: string;
    video_url?: string | null;
};

