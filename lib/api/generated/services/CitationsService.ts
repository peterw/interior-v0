/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityLog } from '../models/ActivityLog';
import type { BonusCitation } from '../models/BonusCitation';
import type { BonusCitationRequest } from '../models/BonusCitationRequest';
import type { Business } from '../models/Business';
import type { BusinessRequest } from '../models/BusinessRequest';
import type { Citation } from '../models/Citation';
import type { CitationRequest } from '../models/CitationRequest';
import type { PaginatedActivityLogList } from '../models/PaginatedActivityLogList';
import type { PaginatedBonusCitationList } from '../models/PaginatedBonusCitationList';
import type { PaginatedBusinessList } from '../models/PaginatedBusinessList';
import type { PaginatedCitationList } from '../models/PaginatedCitationList';
import type { PaginatedTagList } from '../models/PaginatedTagList';
import type { PatchedBonusCitationRequest } from '../models/PatchedBonusCitationRequest';
import type { PatchedBusinessRequest } from '../models/PatchedBusinessRequest';
import type { PatchedCitationRequest } from '../models/PatchedCitationRequest';
import type { PatchedTagRequest } from '../models/PatchedTagRequest';
import type { Tag } from '../models/Tag';
import type { TagRequest } from '../models/TagRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CitationsService {
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static citationsActivateFreeLocalboostCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/activate-free-localboost/',
        });
    }
    /**
     * @param businessUuid
     * @param citationId
     * @param createdAtGte
     * @param createdAtLte
     * @param eventType
     * @param eventTypeContains
     * @param locationId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param search A search term.
     * @returns PaginatedActivityLogList
     * @throws ApiError
     */
    public static citationsActivityLogsList(
        businessUuid?: string,
        citationId?: number,
        createdAtGte?: string,
        createdAtLte?: string,
        eventType?: string,
        eventTypeContains?: string,
        locationId?: number,
        page?: number,
        pageSize?: number,
        search?: string,
    ): CancelablePromise<PaginatedActivityLogList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/activity-logs/',
            query: {
                'business__uuid': businessUuid,
                'citation__id': citationId,
                'created_at__gte': createdAtGte,
                'created_at__lte': createdAtLte,
                'event_type': eventType,
                'event_type__contains': eventTypeContains,
                'location__id': locationId,
                'page': page,
                'page_size': pageSize,
                'search': search,
            },
        });
    }
    /**
     * @param id
     * @returns ActivityLog
     * @throws ApiError
     */
    public static citationsActivityLogsRetrieve(
        id: string,
    ): CancelablePromise<ActivityLog> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/activity-logs/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Admin-only endpoint to manually trigger the retry_failed_citation_tasks job.
     * This allows administrators to run the retry job on-demand without waiting for the scheduled run.
     * @returns any No response body
     * @throws ApiError
     */
    public static citationsAdminRetryCitationsCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/admin/retry-citations/',
        });
    }
    /**
     * API endpoint to retrieve business data needed for generating
     * a citation page, based on domain and URL path.
     * Requires 'domain' and 'path' query parameters.
     * @returns any No response body
     * @throws ApiError
     */
    public static citationsApiBusinessDataByPathRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/api/business-data-by-path/',
        });
    }
    /**
     * Creates a Stripe Checkout Session for a one-time purchase.
     * We do NOT create a DB record yet. Instead, we store needed info in session metadata.
     *
     * The product is automatically determined based on the user's current CitationPlan.
     *
     * Request data:
     * - business_uuid: UUID of the business to associate with this purchase
     * @returns any No response body
     * @throws ApiError
     */
    public static citationsApiCreateCheckoutSessionCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/api/create-checkout-session/',
        });
    }
    /**
     * API View to trigger a sync task for a business's citations with GitHub,
     * subject to GitHub API rate limiting.
     * Supports POST request via Browsable API form with 'uuid' field.
     * @returns any No response body
     * @throws ApiError
     */
    public static citationsApiSyncGithubCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/api/sync-github',
        });
    }
    /**
     * @param businessUuid
     * @param createdAtGte
     * @param createdAtLte
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param search A search term.
     * @returns PaginatedBonusCitationList
     * @throws ApiError
     */
    public static citationsBonusCitationsList(
        businessUuid?: string,
        createdAtGte?: string,
        createdAtLte?: string,
        page?: number,
        pageSize?: number,
        search?: string,
    ): CancelablePromise<PaginatedBonusCitationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/bonus-citations/',
            query: {
                'business__uuid': businessUuid,
                'created_at__gte': createdAtGte,
                'created_at__lte': createdAtLte,
                'page': page,
                'page_size': pageSize,
                'search': search,
            },
        });
    }
    /**
     * Custom create to handle business_id parameter
     * @param requestBody
     * @returns BonusCitation
     * @throws ApiError
     */
    public static citationsBonusCitationsCreate(
        requestBody: BonusCitationRequest,
    ): CancelablePromise<BonusCitation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/bonus-citations/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this Bonus Citation.
     * @returns BonusCitation
     * @throws ApiError
     */
    public static citationsBonusCitationsRetrieve(
        id: number,
    ): CancelablePromise<BonusCitation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/bonus-citations/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this Bonus Citation.
     * @param requestBody
     * @returns BonusCitation
     * @throws ApiError
     */
    public static citationsBonusCitationsUpdate(
        id: number,
        requestBody: BonusCitationRequest,
    ): CancelablePromise<BonusCitation> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/citations/bonus-citations/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this Bonus Citation.
     * @param requestBody
     * @returns BonusCitation
     * @throws ApiError
     */
    public static citationsBonusCitationsPartialUpdate(
        id: number,
        requestBody?: PatchedBonusCitationRequest,
    ): CancelablePromise<BonusCitation> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/citations/bonus-citations/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this Bonus Citation.
     * @returns void
     * @throws ApiError
     */
    public static citationsBonusCitationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/citations/bonus-citations/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param createdAtGte
     * @param createdAtLte
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param search A search term.
     * @param status * `ACTIVE` - ACTIVE
     * * `PAUSED` - PAUSED
     * * `DELETED` - DELETED
     * @param tagsName
     * @returns PaginatedBusinessList
     * @throws ApiError
     */
    public static citationsBusinessList(
        createdAtGte?: string,
        createdAtLte?: string,
        page?: number,
        pageSize?: number,
        search?: string,
        status?: 'ACTIVE' | 'DELETED' | 'PAUSED',
        tagsName?: string,
    ): CancelablePromise<PaginatedBusinessList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/business/',
            query: {
                'created_at__gte': createdAtGte,
                'created_at__lte': createdAtLte,
                'page': page,
                'page_size': pageSize,
                'search': search,
                'status': status,
                'tags__name': tagsName,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessCreate(
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/business/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessUpdate(
        uuid: string,
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/citations/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessPartialUpdate(
        uuid: string,
        requestBody?: PatchedBusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/citations/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mark business as deleted instead of removing from database
     * @param uuid
     * @returns void
     * @throws ApiError
     */
    public static citationsBusinessDestroy(
        uuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/citations/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Get activity logs for this business.
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessActivityLogsRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/business/{uuid}/activity_logs/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Trigger link building for this business.
     * This will create citations across various domains.
     *
     * Optional parameters:
     * - test_mode: Boolean - if True, only creates a citation for localrank.pages.dev
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessBuildLinksCreate(
        uuid: string,
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/business/{uuid}/build_links/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List all citations for this business.
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessGetCitationsRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/business/{uuid}/get_citations/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * @param createdAtGte
     * @param createdAtLte
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param search A search term.
     * @param status * `ACTIVE` - ACTIVE
     * * `PAUSED` - PAUSED
     * * `DELETED` - DELETED
     * @param tagsName
     * @returns PaginatedBusinessList
     * @throws ApiError
     */
    public static citationsBusinessesList(
        createdAtGte?: string,
        createdAtLte?: string,
        page?: number,
        pageSize?: number,
        search?: string,
        status?: 'ACTIVE' | 'DELETED' | 'PAUSED',
        tagsName?: string,
    ): CancelablePromise<PaginatedBusinessList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/businesses/',
            query: {
                'created_at__gte': createdAtGte,
                'created_at__lte': createdAtLte,
                'page': page,
                'page_size': pageSize,
                'search': search,
                'status': status,
                'tags__name': tagsName,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesCreate(
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/businesses/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesUpdate(
        uuid: string,
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/citations/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesPartialUpdate(
        uuid: string,
        requestBody?: PatchedBusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/citations/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mark business as deleted instead of removing from database
     * @param uuid
     * @returns void
     * @throws ApiError
     */
    public static citationsBusinessesDestroy(
        uuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/citations/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Get activity logs for this business.
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesActivityLogsRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/businesses/{uuid}/activity_logs/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Trigger link building for this business.
     * This will create citations across various domains.
     *
     * Optional parameters:
     * - test_mode: Boolean - if True, only creates a citation for localrank.pages.dev
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesBuildLinksCreate(
        uuid: string,
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/businesses/{uuid}/build_links/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List all citations for this business.
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static citationsBusinessesGetCitationsRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/businesses/{uuid}/get_citations/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Check if authentication is working correctly.
     * @returns any No response body
     * @throws ApiError
     */
    public static citationsCheckAuthRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/check-auth/',
        });
    }
    /**
     * @param createdAtGte
     * @param createdAtLte
     * @param domainName
     * @param domainNameContains
     * @param locationBusinessUuid
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param search A search term.
     * @param status * `WAITING` - WAITING
     * * `DEPLOYED` - DEPLOYED
     * * `FAILED` - FAILED
     * * `NEW_DOMAIN_PENDING` - NEW_DOMAIN_PENDING
     * @returns PaginatedCitationList
     * @throws ApiError
     */
    public static citationsCreateList(
        createdAtGte?: string,
        createdAtLte?: string,
        domainName?: string,
        domainNameContains?: string,
        locationBusinessUuid?: string,
        page?: number,
        pageSize?: number,
        search?: string,
        status?: 'DEPLOYED' | 'FAILED' | 'NEW_DOMAIN_PENDING' | 'WAITING',
    ): CancelablePromise<PaginatedCitationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/citations/create/',
            query: {
                'created_at__gte': createdAtGte,
                'created_at__lte': createdAtLte,
                'domain_name': domainName,
                'domain_name__contains': domainNameContains,
                'location__business__uuid': locationBusinessUuid,
                'page': page,
                'page_size': pageSize,
                'search': search,
                'status': status,
            },
        });
    }
    /**
     * Custom create to handle business_id parameter instead of location
     * @param requestBody
     * @returns Citation
     * @throws ApiError
     */
    public static citationsCreateCreate(
        requestBody?: CitationRequest,
    ): CancelablePromise<Citation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/citations/create/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API to create missing domains for businesses with PRO and UNLIMITED plans.
     * Only processes businesses with more than 50 existing citations.
     * Creates citations with status NEW_DOMAIN_PENDING instead of triggering tasks.
     *
     * Expects a JSON payload with:
     * {
         * "preview_first": true  # Optional, if true will just return preview data without executing
         * }
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsCreateMissingDomainsCreate(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/create-missing-domains/',
            });
        }
        /**
         * @param id A unique integer value identifying this citation.
         * @returns Citation
         * @throws ApiError
         */
        public static citationsCreateRetrieve(
            id: number,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/create/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * @param id A unique integer value identifying this citation.
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsCreateUpdate(
            id: number,
            requestBody?: CitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'PUT',
                url: '/citations/create/{id}/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * @param id A unique integer value identifying this citation.
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsCreatePartialUpdate(
            id: number,
            requestBody?: PatchedCitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'PATCH',
                url: '/citations/create/{id}/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * Custom delete to log the activity and trigger deletion tasks
         * @param id A unique integer value identifying this citation.
         * @returns void
         * @throws ApiError
         */
        public static citationsCreateDestroy(
            id: number,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'DELETE',
                url: '/citations/create/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Get activity logs for this citation.
         * @param id A unique integer value identifying this citation.
         * @returns Citation
         * @throws ApiError
         */
        public static citationsCreateActivityLogsRetrieve(
            id: number,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/create/{id}/activity_logs/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Create a subpage for this citation.
         * @param id A unique integer value identifying this citation.
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsCreateCreateSubpageCreate(
            id: number,
            requestBody?: CitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/create/{id}/create_subpage/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * Delete all citations for a business.
         * Limited to 3 business deletions per day per user.
         *
         * Query parameters:
         * - business_uuid: The UUID of the business
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDeleteAllCitationsCreate(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/delete-all-citations/',
            });
        }
        /**
         * Get the deployment status for a citation.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDeploymentStatusRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/deployment-status/',
            });
        }
        /**
         * Get all directory URLs for a domain with pagination support.
         * This API endpoint is used for:
         * 1. Creating sitemaps
         * 2. Populating the directory grid on the index page
         *
         * Query parameters:
         * - domain: The domain name to filter by (e.g. bizlocator.com)
         * - page: Page number for pagination
         * - page_size: Number of items per page (default 20, max 100)
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDirectoryUrlsRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/directory-urls/',
            });
        }
        /**
         * List all domains from the JSON config file.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDomainsRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/domains/',
            });
        }
        /**
         * Not implemented - use management command instead.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDomainsCreate(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/domains/',
            });
        }
        /**
         * Get a domain by name from the JSON config file.
         * @param id
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDomainsRetrieve2(
            id: string,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/domains/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Not implemented - use management command instead.
         * @param id
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsDomainsUpdate(
            id: string,
        ): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'PUT',
                url: '/citations/domains/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Not implemented - use management command instead.
         * @param id
         * @returns void
         * @throws ApiError
         */
        public static citationsDomainsDestroy(
            id: string,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'DELETE',
                url: '/citations/domains/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsFreeLocalboostStatusRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/free-localboost-status/',
            });
        }
        /**
         * @param createdAtGte
         * @param createdAtLte
         * @param domainName
         * @param domainNameContains
         * @param locationBusinessUuid
         * @param page A page number within the paginated result set.
         * @param pageSize Number of results to return per page.
         * @param search A search term.
         * @param status * `WAITING` - WAITING
         * * `DEPLOYED` - DEPLOYED
         * * `FAILED` - FAILED
         * * `NEW_DOMAIN_PENDING` - NEW_DOMAIN_PENDING
         * @returns PaginatedCitationList
         * @throws ApiError
         */
        public static citationsListList(
            createdAtGte?: string,
            createdAtLte?: string,
            domainName?: string,
            domainNameContains?: string,
            locationBusinessUuid?: string,
            page?: number,
            pageSize?: number,
            search?: string,
            status?: 'DEPLOYED' | 'FAILED' | 'NEW_DOMAIN_PENDING' | 'WAITING',
        ): CancelablePromise<PaginatedCitationList> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/list/',
                query: {
                    'created_at__gte': createdAtGte,
                    'created_at__lte': createdAtLte,
                    'domain_name': domainName,
                    'domain_name__contains': domainNameContains,
                    'location__business__uuid': locationBusinessUuid,
                    'page': page,
                    'page_size': pageSize,
                    'search': search,
                    'status': status,
                },
            });
        }
        /**
         * Custom create to handle business_id parameter instead of location
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsListCreate(
            requestBody?: CitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/list/',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * @param id A unique integer value identifying this citation.
         * @returns Citation
         * @throws ApiError
         */
        public static citationsListRetrieve(
            id: number,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/list/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * @param id A unique integer value identifying this citation.
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsListUpdate(
            id: number,
            requestBody?: CitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'PUT',
                url: '/citations/list/{id}/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * @param id A unique integer value identifying this citation.
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsListPartialUpdate(
            id: number,
            requestBody?: PatchedCitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'PATCH',
                url: '/citations/list/{id}/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * Custom delete to log the activity and trigger deletion tasks
         * @param id A unique integer value identifying this citation.
         * @returns void
         * @throws ApiError
         */
        public static citationsListDestroy(
            id: number,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'DELETE',
                url: '/citations/list/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Get activity logs for this citation.
         * @param id A unique integer value identifying this citation.
         * @returns Citation
         * @throws ApiError
         */
        public static citationsListActivityLogsRetrieve(
            id: number,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/list/{id}/activity_logs/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Create a subpage for this citation.
         * @param id A unique integer value identifying this citation.
         * @param requestBody
         * @returns Citation
         * @throws ApiError
         */
        public static citationsListCreateSubpageCreate(
            id: number,
            requestBody?: CitationRequest,
        ): CancelablePromise<Citation> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/list/{id}/create_subpage/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * List all one-time purchases for the current user.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsOneTimePurchasesRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/one-time-purchases/',
            });
        }
        /**
         * Simple ping endpoint to check if API is accessible.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsPingRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/ping/',
            });
        }
        /**
         * Preview API that shows all businesses for PRO and UNLIMITED users and what domains would be added.
         * Returns a structured response with businesses and their missing domains.
         * Only includes businesses with more than 50 existing citations.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsPreviewMissingDomainsRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/preview-missing-domains/',
            });
        }
        /**
         * Return the user's current subscription status and limits for citations.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsSubscriptionStatusRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/subscription-status/',
            });
        }
        /**
         * @param page A page number within the paginated result set.
         * @param pageSize Number of results to return per page.
         * @param search A search term.
         * @returns PaginatedTagList
         * @throws ApiError
         */
        public static citationsTagsList(
            page?: number,
            pageSize?: number,
            search?: string,
        ): CancelablePromise<PaginatedTagList> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/tags/',
                query: {
                    'page': page,
                    'page_size': pageSize,
                    'search': search,
                },
            });
        }
        /**
         * @param requestBody
         * @returns Tag
         * @throws ApiError
         */
        public static citationsTagsCreate(
            requestBody: TagRequest,
        ): CancelablePromise<Tag> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/tags/',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * @param id A unique integer value identifying this tag.
         * @returns Tag
         * @throws ApiError
         */
        public static citationsTagsRetrieve(
            id: number,
        ): CancelablePromise<Tag> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/tags/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * @param id A unique integer value identifying this tag.
         * @param requestBody
         * @returns Tag
         * @throws ApiError
         */
        public static citationsTagsUpdate(
            id: number,
            requestBody: TagRequest,
        ): CancelablePromise<Tag> {
            return __request(OpenAPI, {
                method: 'PUT',
                url: '/citations/tags/{id}/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * @param id A unique integer value identifying this tag.
         * @param requestBody
         * @returns Tag
         * @throws ApiError
         */
        public static citationsTagsPartialUpdate(
            id: number,
            requestBody?: PatchedTagRequest,
        ): CancelablePromise<Tag> {
            return __request(OpenAPI, {
                method: 'PATCH',
                url: '/citations/tags/{id}/',
                path: {
                    'id': id,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * @param id A unique integer value identifying this tag.
         * @returns void
         * @throws ApiError
         */
        public static citationsTagsDestroy(
            id: number,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'DELETE',
                url: '/citations/tags/{id}/',
                path: {
                    'id': id,
                },
            });
        }
        /**
         * Get the total number of citations across all businesses.
         * Returns a simple response with just the total count.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsTotalCitationsRetrieve(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/citations/total-citations/',
            });
        }
        /**
         * Webhook endpoint for Stripe citation subscription events.
         * @returns any No response body
         * @throws ApiError
         */
        public static citationsWebhookCreate(): CancelablePromise<any> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/citations/webhook/',
            });
        }
    }
