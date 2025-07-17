/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditScore } from './AuditScore';
import type { BusinessInfo } from './BusinessInfo';
import type { RankingData } from './RankingData';
import type { RevenueImpact } from './RevenueImpact';
import type { ReviewStats } from './ReviewStats';
export type AuditResult = {
    audit_id: string;
    status: string;
    business_name: string;
    business_info?: BusinessInfo;
    audit_score?: AuditScore;
    review_stats?: ReviewStats;
    revenue_impact?: RevenueImpact;
    ranking_data?: RankingData;
    created_at?: string;
    expires_at?: string;
    issues_identified?: Array<string>;
    reviews_sample?: Array<any>;
    review_analysis?: Record<string, any>;
    audit_metadata?: Record<string, any>;
    reviews_fetched?: number;
    total_reviews?: number;
    citations_analysis?: Record<string, any>;
    citations_checked_at?: string;
};

