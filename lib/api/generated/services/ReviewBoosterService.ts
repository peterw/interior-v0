/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerOptin } from '../models/CustomerOptin';
import type { CustomerOptinCreateRequest } from '../models/CustomerOptinCreateRequest';
import type { CustomerOptinRequest } from '../models/CustomerOptinRequest';
import type { PaginatedCustomerOptinList } from '../models/PaginatedCustomerOptinList';
import type { PaginatedReviewCampaignList } from '../models/PaginatedReviewCampaignList';
import type { PaginatedReviewRequestList } from '../models/PaginatedReviewRequestList';
import type { PatchedCustomerOptinRequest } from '../models/PatchedCustomerOptinRequest';
import type { PatchedReviewCampaignRequest } from '../models/PatchedReviewCampaignRequest';
import type { ReviewCampaign } from '../models/ReviewCampaign';
import type { ReviewCampaignRequest } from '../models/ReviewCampaignRequest';
import type { ReviewRequest } from '../models/ReviewRequest';
import type { ReviewSubmissionRequest } from '../models/ReviewSubmissionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReviewBoosterService {
    /**
     * @param page A page number within the paginated result set.
     * @returns PaginatedReviewCampaignList
     * @throws ApiError
     */
    public static reviewBoosterCampaignsList(
        page?: number,
    ): CancelablePromise<PaginatedReviewCampaignList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/campaigns/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsCreate(
        requestBody: ReviewCampaignRequest,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/campaigns/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get analytics data for a specific campaign
     * @param campaignId
     * @returns any No response body
     * @throws ApiError
     */
    public static reviewBoosterCampaignsAnalyticsRetrieve(
        campaignId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/campaigns/{campaignId}/analytics/',
            path: {
                'campaignId': campaignId,
            },
        });
    }
    /**
     * @param id
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsRetrieve(
        id: string,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/campaigns/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsUpdate(
        id: string,
        requestBody: ReviewCampaignRequest,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/review-booster/campaigns/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsPartialUpdate(
        id: string,
        requestBody?: PatchedReviewCampaignRequest,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/review-booster/campaigns/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static reviewBoosterCampaignsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/review-booster/campaigns/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsActivateCreate(
        id: string,
        requestBody: ReviewCampaignRequest,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/campaigns/{id}/activate/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsPauseCreate(
        id: string,
        requestBody: ReviewCampaignRequest,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/campaigns/{id}/pause/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ReviewCampaign
     * @throws ApiError
     */
    public static reviewBoosterCampaignsStatsRetrieve(
        id: string,
    ): CancelablePromise<ReviewCampaign> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/campaigns/{id}/stats/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Collect customer opt-in information
     * @param campaignId
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static reviewBoosterCollectCreate(
        campaignId: string,
        requestBody?: CustomerOptinCreateRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/collect/{campaignId}/',
            path: {
                'campaignId': campaignId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @returns PaginatedCustomerOptinList
     * @throws ApiError
     */
    public static reviewBoosterContactsList(
        page?: number,
    ): CancelablePromise<PaginatedCustomerOptinList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/contacts/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CustomerOptin
     * @throws ApiError
     */
    public static reviewBoosterContactsCreate(
        requestBody: CustomerOptinRequest,
    ): CancelablePromise<CustomerOptin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/contacts/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns CustomerOptin
     * @throws ApiError
     */
    public static reviewBoosterContactsRetrieve(
        id: string,
    ): CancelablePromise<CustomerOptin> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/contacts/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns CustomerOptin
     * @throws ApiError
     */
    public static reviewBoosterContactsUpdate(
        id: string,
        requestBody: CustomerOptinRequest,
    ): CancelablePromise<CustomerOptin> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/review-booster/contacts/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns CustomerOptin
     * @throws ApiError
     */
    public static reviewBoosterContactsPartialUpdate(
        id: string,
        requestBody?: PatchedCustomerOptinRequest,
    ): CancelablePromise<CustomerOptin> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/review-booster/contacts/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static reviewBoosterContactsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/review-booster/contacts/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Send email/SMS reminder to a specific contact
     * @param id
     * @param requestBody
     * @returns CustomerOptin
     * @throws ApiError
     */
    public static reviewBoosterContactsSendReminderCreate(
        id: string,
        requestBody: CustomerOptinRequest,
    ): CancelablePromise<CustomerOptin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/contacts/{id}/send_reminder/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Send email/SMS reminders to multiple contacts
     * @param requestBody
     * @returns CustomerOptin
     * @throws ApiError
     */
    public static reviewBoosterContactsBulkSendRemindersCreate(
        requestBody: CustomerOptinRequest,
    ): CancelablePromise<CustomerOptin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/contacts/bulk_send_reminders/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uniqueToken
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static reviewBoosterRCreate(
        uniqueToken: string,
        requestBody: ReviewSubmissionRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/review-booster/r/{uniqueToken}/',
            path: {
                'uniqueToken': uniqueToken,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @returns PaginatedReviewRequestList
     * @throws ApiError
     */
    public static reviewBoosterRequestsList(
        page?: number,
    ): CancelablePromise<PaginatedReviewRequestList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/requests/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @param id
     * @returns ReviewRequest
     * @throws ApiError
     */
    public static reviewBoosterRequestsRetrieve(
        id: string,
    ): CancelablePromise<ReviewRequest> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/review-booster/requests/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
