/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditResponse } from '../models/AuditResponse';
import type { AuditResult } from '../models/AuditResult';
import type { GMBAudit } from '../models/GMBAudit';
import type { RunAuditRequest } from '../models/RunAuditRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GmbAuditService {
    /**
     * @param auditId
     * @returns AuditResult
     * @throws ApiError
     */
    public static apiGmbAuditRetrieve(
        auditId: string,
    ): CancelablePromise<AuditResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gmb/audit/{auditId}/',
            path: {
                'auditId': auditId,
            },
        });
    }
    /**
     * Get all audits for a specific business by UUID or business_id
     * @param businessIdentifier
     * @returns GMBAudit
     * @throws ApiError
     */
    public static apiGmbAuditBusinessList(
        businessIdentifier: string,
    ): CancelablePromise<Array<GMBAudit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gmb/audit/business/{businessIdentifier}/',
            path: {
                'businessIdentifier': businessIdentifier,
            },
        });
    }
    /**
     * Get all audits, optionally filtered by gmb_url.
     * @param gmbUrl Filter audits by GMB URL
     * @returns GMBAudit
     * @throws ApiError
     */
    public static apiGmbAuditListList(
        gmbUrl?: string,
    ): CancelablePromise<Array<GMBAudit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gmb/audit/list/',
            query: {
                'gmb_url': gmbUrl,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AuditResponse
     * @throws ApiError
     */
    public static apiGmbAuditRunCreate(
        requestBody?: RunAuditRequest,
    ): CancelablePromise<AuditResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gmb/audit/run/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get audit results by public share token (no authentication required)
     * @param shareToken
     * @returns AuditResult
     * @throws ApiError
     */
    public static apiGmbAuditShareRetrieve(
        shareToken: string,
    ): CancelablePromise<AuditResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gmb/audit/share/{shareToken}/',
            path: {
                'shareToken': shareToken,
            },
        });
    }
    /**
     * @param auditId
     * @returns AuditResult
     * @throws ApiError
     */
    public static gmbAuditRetrieve(
        auditId: string,
    ): CancelablePromise<AuditResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/audit/{auditId}/',
            path: {
                'auditId': auditId,
            },
        });
    }
    /**
     * Get all audits for a specific business by UUID or business_id
     * @param businessIdentifier
     * @returns GMBAudit
     * @throws ApiError
     */
    public static gmbAuditBusinessList(
        businessIdentifier: string,
    ): CancelablePromise<Array<GMBAudit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/audit/business/{businessIdentifier}/',
            path: {
                'businessIdentifier': businessIdentifier,
            },
        });
    }
    /**
     * Get all audits, optionally filtered by gmb_url.
     * @param gmbUrl Filter audits by GMB URL
     * @returns GMBAudit
     * @throws ApiError
     */
    public static gmbAuditListList(
        gmbUrl?: string,
    ): CancelablePromise<Array<GMBAudit>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/audit/list/',
            query: {
                'gmb_url': gmbUrl,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AuditResponse
     * @throws ApiError
     */
    public static gmbAuditRunCreate(
        requestBody?: RunAuditRequest,
    ): CancelablePromise<AuditResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gmb/audit/run/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get audit results by public share token (no authentication required)
     * @param shareToken
     * @returns AuditResult
     * @throws ApiError
     */
    public static gmbAuditShareRetrieve(
        shareToken: string,
    ): CancelablePromise<AuditResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/audit/share/{shareToken}/',
            path: {
                'shareToken': shareToken,
            },
        });
    }
}
