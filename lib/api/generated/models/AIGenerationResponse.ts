/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIGenerationResult } from './AIGenerationResult';
/**
 * Serializer for AI review reply generation response.
 */
export type AIGenerationResponse = {
    success: boolean;
    results: Array<AIGenerationResult>;
    generated_count: number;
    failed_count: number;
    monthly_usage: number;
    monthly_limit: number;
};

