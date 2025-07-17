/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIGenerationRequestRequest } from '../models/AIGenerationRequestRequest';
import type { AIGenerationResponse } from '../models/AIGenerationResponse';
import type { BulkPublishRequestRequest } from '../models/BulkPublishRequestRequest';
import type { BulkPublishResponse } from '../models/BulkPublishResponse';
import type { BulkStatusResponse } from '../models/BulkStatusResponse';
import type { Business } from '../models/Business';
import type { BusinessRequest } from '../models/BusinessRequest';
import type { BusinessValidation } from '../models/BusinessValidation';
import type { BusinessValidationRequest } from '../models/BusinessValidationRequest';
import type { Checkout } from '../models/Checkout';
import type { CheckoutRequest } from '../models/CheckoutRequest';
import type { CreditLog } from '../models/CreditLog';
import type { CustomerOptin } from '../models/CustomerOptin';
import type { CustomerOptinCreateRequest } from '../models/CustomerOptinCreateRequest';
import type { CustomerOptinRequest } from '../models/CustomerOptinRequest';
import type { DeleteReplyResponse } from '../models/DeleteReplyResponse';
import type { DemoVid } from '../models/DemoVid';
import type { DemoVidRequest } from '../models/DemoVidRequest';
import type { GMBAccountsListResponse } from '../models/GMBAccountsListResponse';
import type { GMBPost } from '../models/GMBPost';
import type { GMBPostRequest } from '../models/GMBPostRequest';
import type { Location } from '../models/Location';
import type { MerchantCredential } from '../models/MerchantCredential';
import type { MerchantCredentialRequest } from '../models/MerchantCredentialRequest';
import type { PaginatedBusinessList } from '../models/PaginatedBusinessList';
import type { PaginatedCreditLogList } from '../models/PaginatedCreditLogList';
import type { PaginatedCustomerOptinList } from '../models/PaginatedCustomerOptinList';
import type { PaginatedDemoVidList } from '../models/PaginatedDemoVidList';
import type { PaginatedGMBPostList } from '../models/PaginatedGMBPostList';
import type { PaginatedLocationList } from '../models/PaginatedLocationList';
import type { PaginatedMerchantCredentialList } from '../models/PaginatedMerchantCredentialList';
import type { PaginatedReviewCampaignList } from '../models/PaginatedReviewCampaignList';
import type { PaginatedReviewList } from '../models/PaginatedReviewList';
import type { PaginatedReviewRequestList } from '../models/PaginatedReviewRequestList';
import type { PaginatedScanListList } from '../models/PaginatedScanListList';
import type { PaginatedSearchResultList } from '../models/PaginatedSearchResultList';
import type { PaginatedTagList } from '../models/PaginatedTagList';
import type { PaginatedVideoList } from '../models/PaginatedVideoList';
import type { PaginatedWordPressConnectionList } from '../models/PaginatedWordPressConnectionList';
import type { PatchedBusinessRequest } from '../models/PatchedBusinessRequest';
import type { PatchedCustomerOptinRequest } from '../models/PatchedCustomerOptinRequest';
import type { PatchedDemoVidRequest } from '../models/PatchedDemoVidRequest';
import type { PatchedGMBPostRequest } from '../models/PatchedGMBPostRequest';
import type { PatchedLocationRequest } from '../models/PatchedLocationRequest';
import type { PatchedMerchantCredentialRequest } from '../models/PatchedMerchantCredentialRequest';
import type { PatchedReviewCampaignRequest } from '../models/PatchedReviewCampaignRequest';
import type { PatchedReviewRequest } from '../models/PatchedReviewRequest';
import type { PatchedScanArchiveRequest } from '../models/PatchedScanArchiveRequest';
import type { PatchedScanDetailRequest } from '../models/PatchedScanDetailRequest';
import type { PatchedTagRequest } from '../models/PatchedTagRequest';
import type { PatchedVideoRequest } from '../models/PatchedVideoRequest';
import type { PatchedWordPressConnectionRequest } from '../models/PatchedWordPressConnectionRequest';
import type { ReplyRequestRequest } from '../models/ReplyRequestRequest';
import type { ReplyResponse } from '../models/ReplyResponse';
import type { Review } from '../models/Review';
import type { ReviewCampaign } from '../models/ReviewCampaign';
import type { ReviewCampaignRequest } from '../models/ReviewCampaignRequest';
import type { ReviewRequest } from '../models/ReviewRequest';
import type { ReviewSubmissionRequest } from '../models/ReviewSubmissionRequest';
import type { ScanArchive } from '../models/ScanArchive';
import type { ScanArchiveRequest } from '../models/ScanArchiveRequest';
import type { ScanCreate } from '../models/ScanCreate';
import type { ScanCreateRequest } from '../models/ScanCreateRequest';
import type { ScanDetail } from '../models/ScanDetail';
import type { ScanDetailRequest } from '../models/ScanDetailRequest';
import type { SearchResult } from '../models/SearchResult';
import type { SyncResponse } from '../models/SyncResponse';
import type { Tag } from '../models/Tag';
import type { TagRequest } from '../models/TagRequest';
import type { ToggleWeeklyPostsRequestRequest } from '../models/ToggleWeeklyPostsRequestRequest';
import type { ToggleWeeklyPostsResponse } from '../models/ToggleWeeklyPostsResponse';
import type { UserBalance } from '../models/UserBalance';
import type { Video } from '../models/Video';
import type { VideoCreate } from '../models/VideoCreate';
import type { VideoCreateRequest } from '../models/VideoCreateRequest';
import type { VideoRequest } from '../models/VideoRequest';
import type { WordPressConnection } from '../models/WordPressConnection';
import type { WordPressConnectionRequest } from '../models/WordPressConnectionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
    /**
     * ViewSet dedicated to archived scans. Allows listing archived scans and toggling the archived flag via PATCH/PUT.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedScanListList
     * @throws ApiError
     */
    public static apiArchivedScansList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedScanListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/archived-scans/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * ViewSet dedicated to archived scans. Allows listing archived scans and toggling the archived flag via PATCH/PUT.
     * @param uuid
     * @param requestBody
     * @returns ScanArchive
     * @throws ApiError
     */
    public static apiArchivedScansUpdate(
        uuid: string,
        requestBody?: ScanArchiveRequest,
    ): CancelablePromise<ScanArchive> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/archived-scans/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet dedicated to archived scans. Allows listing archived scans and toggling the archived flag via PATCH/PUT.
     * @param uuid
     * @param requestBody
     * @returns ScanArchive
     * @throws ApiError
     */
    public static apiArchivedScansPartialUpdate(
        uuid: string,
        requestBody?: PatchedScanArchiveRequest,
    ): CancelablePromise<ScanArchive> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/archived-scans/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static apiArticlesApiCreditBalanceRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/articles/api/credit/balance/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static apiArticlesApiCreditDeductCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/articles/api/credit/deduct/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static apiArticlesCreditRedirectRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/articles/credit/redirect/',
        });
    }
    /**
     * API View to deduct credits manually for a list of provided scan UUIDs.
     * Expects a POST request with a JSON body like: {"scan_uuids": ["uuid1", "uuid2", ...]}
     * @returns any No response body
     * @throws ApiError
     */
    public static apiBulkCreditDeductionCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bulk-credit-deduction/',
        });
    }
    /**
     * List businesses for the user, grouped by place_id.
     * Each group includes a representative business and all associated scans.
     * If place_id is not available, businesses may be grouped by name similarity.
     * @param page A page number within the paginated result set.
     * @returns PaginatedBusinessList
     * @throws ApiError
     */
    public static apiBusinessList(
        page?: number,
    ): CancelablePromise<PaginatedBusinessList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * ViewSet for business operations
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static apiBusinessCreate(
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/business/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for business operations
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static apiBusinessRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * ViewSet for business operations
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static apiBusinessUpdate(
        uuid: string,
        requestBody: BusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for business operations
     * @param uuid
     * @param requestBody
     * @returns Business
     * @throws ApiError
     */
    public static apiBusinessPartialUpdate(
        uuid: string,
        requestBody?: PatchedBusinessRequest,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for business operations
     * @param uuid
     * @returns void
     * @throws ApiError
     */
    public static apiBusinessDestroy(
        uuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/business/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Return activity logs for the specified Business.
     * @param uuid
     * @returns Business
     * @throws ApiError
     */
    public static apiBusinessActivityLogsRetrieve(
        uuid: string,
    ): CancelablePromise<Business> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/{uuid}/activity_logs/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Validate a Google Maps URL and extract or use provided business information.
     *
     * Input Parameters:
     * - url: Required. A valid Google Maps URL for the business
     * - place_id: Optional. The Google Place ID if already known
     * - business_details: Optional. JSON object with business details to use instead of scraping.
     * Example format:
     * {
         * "name": "Business Name",
         * "place_id": "ChIJ...",
         * "cid": "12345",
         * "address": "123 Main St, City, State",
         * "latitude": 37.7749,
         * "longitude": -122.4194,
         * "variations": ["Alt Name 1", "Alt Name 2"],
         * "business_id": "id123"
         * }
         *
         * Returns business information and validation status.
         * @param requestBody
         * @returns BusinessValidation
         * @throws ApiError
         */
        public static apiBusinessValidateCreate(
            requestBody: BusinessValidationRequest,
        ): CancelablePromise<BusinessValidation> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/api/business/validate/',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * List businesses for the user, grouped by place_id.
         * Each group includes a representative business and all associated scans.
         * If place_id is not available, businesses may be grouped by name similarity.
         * @param page A page number within the paginated result set.
         * @returns PaginatedBusinessList
         * @throws ApiError
         */
        public static apiBusinessesList(
            page?: number,
        ): CancelablePromise<PaginatedBusinessList> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/api/businesses/',
                query: {
                    'page': page,
                },
            });
        }
        /**
         * ViewSet for business operations
         * @param requestBody
         * @returns Business
         * @throws ApiError
         */
        public static apiBusinessesCreate(
            requestBody: BusinessRequest,
        ): CancelablePromise<Business> {
            return __request(OpenAPI, {
                method: 'POST',
                url: '/api/businesses/',
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * ViewSet for business operations
         * @param uuid
         * @returns Business
         * @throws ApiError
         */
        public static apiBusinessesRetrieve(
            uuid: string,
        ): CancelablePromise<Business> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/api/businesses/{uuid}/',
                path: {
                    'uuid': uuid,
                },
            });
        }
        /**
         * ViewSet for business operations
         * @param uuid
         * @param requestBody
         * @returns Business
         * @throws ApiError
         */
        public static apiBusinessesUpdate(
            uuid: string,
            requestBody: BusinessRequest,
        ): CancelablePromise<Business> {
            return __request(OpenAPI, {
                method: 'PUT',
                url: '/api/businesses/{uuid}/',
                path: {
                    'uuid': uuid,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * ViewSet for business operations
         * @param uuid
         * @param requestBody
         * @returns Business
         * @throws ApiError
         */
        public static apiBusinessesPartialUpdate(
            uuid: string,
            requestBody?: PatchedBusinessRequest,
        ): CancelablePromise<Business> {
            return __request(OpenAPI, {
                method: 'PATCH',
                url: '/api/businesses/{uuid}/',
                path: {
                    'uuid': uuid,
                },
                body: requestBody,
                mediaType: 'application/json',
            });
        }
        /**
         * ViewSet for business operations
         * @param uuid
         * @returns void
         * @throws ApiError
         */
        public static apiBusinessesDestroy(
            uuid: string,
        ): CancelablePromise<void> {
            return __request(OpenAPI, {
                method: 'DELETE',
                url: '/api/businesses/{uuid}/',
                path: {
                    'uuid': uuid,
                },
            });
        }
        /**
         * Return activity logs for the specified Business.
         * @param uuid
         * @returns Business
         * @throws ApiError
         */
        public static apiBusinessesActivityLogsRetrieve(
            uuid: string,
        ): CancelablePromise<Business> {
            return __request(OpenAPI, {
                method: 'GET',
                url: '/api/businesses/{uuid}/activity_logs/',
                path: {
                    'uuid': uuid,
                },
            });
        }
        /**
         * Validate a Google Maps URL and extract or use provided business information.
         *
         * Input Parameters:
         * - url: Required. A valid Google Maps URL for the business
         * - place_id: Optional. The Google Place ID if already known
         * - business_details: Optional. JSON object with business details to use instead of scraping.
         * Example format:
         * {
             * "name": "Business Name",
             * "place_id": "ChIJ...",
             * "cid": "12345",
             * "address": "123 Main St, City, State",
             * "latitude": 37.7749,
             * "longitude": -122.4194,
             * "variations": ["Alt Name 1", "Alt Name 2"],
             * "business_id": "id123"
             * }
             *
             * Returns business information and validation status.
             * @param requestBody
             * @returns BusinessValidation
             * @throws ApiError
             */
            public static apiBusinessesValidateCreate(
                requestBody: BusinessValidationRequest,
            ): CancelablePromise<BusinessValidation> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/businesses/validate/',
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * @param requestBody
             * @returns Checkout
             * @throws ApiError
             */
            public static createCreditCheckoutSession(
                requestBody: CheckoutRequest,
            ): CancelablePromise<Checkout> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/checkout/',
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * Display all code files in the specified app in a single HTML page or JSON.
             * Access restricted by API key.
             * Format options:
             * - HTML (default): /api/code-explorer/{app_name}/?api_key=xxx
             * - JSON: /api/code-explorer/{app_name}.json/?api_key=xxx or /api/code-explorer/{app_name}/?api_key=xxx&format=json
             *
             * Parameters:
             * - app_name: The name of the app to explore (e.g., 'ranktracker', 'video')
             * - prompt_text: Optional text to display in the prompt textarea (only used by some apps)
             * @param appName
             * @returns any No response body
             * @throws ApiError
             */
            public static apiCodeExplorerRetrieve(
                appName: string,
            ): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/code-explorer/{appName}/',
                    path: {
                        'appName': appName,
                    },
                });
            }
            /**
             * ViewSet for viewing Credit Logs.
             * @param ordering Which field to use when ordering the results.
             * @param page A page number within the paginated result set.
             * @param pageSize Number of results to return per page.
             * @returns PaginatedCreditLogList
             * @throws ApiError
             */
            public static apiCreditLogsList(
                ordering?: string,
                page?: number,
                pageSize?: number,
            ): CancelablePromise<PaginatedCreditLogList> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/credit-logs/',
                    query: {
                        'ordering': ordering,
                        'page': page,
                        'page_size': pageSize,
                    },
                });
            }
            /**
             * ViewSet for viewing Credit Logs.
             * @param id
             * @returns CreditLog
             * @throws ApiError
             */
            public static apiCreditLogsRetrieve(
                id: string,
            ): CancelablePromise<CreditLog> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/credit-logs/{id}/',
                    path: {
                        'id': id,
                    },
                });
            }
            /**
             * @returns any No response body
             * @throws ApiError
             */
            public static apiCreditsCreate(): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/credits',
                });
            }
            /**
             * @returns any No response body
             * @throws ApiError
             */
            public static apiCreditsCreate2(): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/credits/',
                });
            }
            /**
             * API view for business operations.
             * GET: List all businesses for the current user
             * POST: Create a new business
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbBusinessesRetrieve(): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/businesses/',
                });
            }
            /**
             * API view for business operations.
             * GET: List all businesses for the current user
             * POST: Create a new business
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbBusinessesCreate(): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/gmb/businesses/',
                });
            }
            /**
             * API view for business operations.
             * GET: List all businesses for the current user
             * POST: Create a new business
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbBusinessesUpdate(): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'PUT',
                    url: '/api/gmb/businesses/',
                });
            }
            /**
             * API view for business operations.
             * GET: List all businesses for the current user
             * POST: Create a new business
             * @param businessId
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbBusinessesRetrieve2(
                businessId: number,
            ): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/businesses/{businessId}/',
                    path: {
                        'businessId': businessId,
                    },
                });
            }
            /**
             * API view for business operations.
             * GET: List all businesses for the current user
             * POST: Create a new business
             * @param businessId
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbBusinessesCreate2(
                businessId: number,
            ): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/gmb/businesses/{businessId}/',
                    path: {
                        'businessId': businessId,
                    },
                });
            }
            /**
             * API view for business operations.
             * GET: List all businesses for the current user
             * POST: Create a new business
             * @param businessId
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbBusinessesUpdate2(
                businessId: number,
            ): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'PUT',
                    url: '/api/gmb/businesses/{businessId}/',
                    path: {
                        'businessId': businessId,
                    },
                });
            }
            /**
             * ViewSet for managing merchant credentials.
             *
             * Endpoints:
             * - GET /api/gmb/credentials/ - List all credentials
             * - POST /api/gmb/credentials/ - Create new credential
             * - GET /api/gmb/credentials/{id}/ - Get single credential
             * - DELETE /api/gmb/credentials/{id}/ - Delete credential
             * - DELETE /api/gmb/credentials/ - Delete all credentials
             * @param page A page number within the paginated result set.
             * @returns PaginatedMerchantCredentialList
             * @throws ApiError
             */
            public static apiGmbCredentialsList(
                page?: number,
            ): CancelablePromise<PaginatedMerchantCredentialList> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/credentials/',
                    query: {
                        'page': page,
                    },
                });
            }
            /**
             * ViewSet for managing merchant credentials.
             *
             * Endpoints:
             * - GET /api/gmb/credentials/ - List all credentials
             * - POST /api/gmb/credentials/ - Create new credential
             * - GET /api/gmb/credentials/{id}/ - Get single credential
             * - DELETE /api/gmb/credentials/{id}/ - Delete credential
             * - DELETE /api/gmb/credentials/ - Delete all credentials
             * @param requestBody
             * @returns MerchantCredential
             * @throws ApiError
             */
            public static apiGmbCredentialsCreate(
                requestBody: MerchantCredentialRequest,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/api/gmb/credentials/',
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * List GMB accounts for the specified merchant credential.
             * Demonstrates usage of the GMBService class.
             *
             * Note the rate limits:
             * - Read operations: 300 queries per minute (QPM)
             * - Write operations: 10 edits per minute per location
             * @param credentialId
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbCredentialsAccountsRetrieve(
                credentialId: number,
            ): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/credentials/{credentialId}/accounts/',
                    path: {
                        'credentialId': credentialId,
                    },
                });
            }
            /**
             * Get a valid access token for the specified merchant credential.
             * Automatically refreshes if the token is about to expire.
             * @param credentialId
             * @returns any No response body
             * @throws ApiError
             */
            public static apiGmbCredentialsTokenRetrieve(
                credentialId: number,
            ): CancelablePromise<any> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/credentials/{credentialId}/token/',
                    path: {
                        'credentialId': credentialId,
                    },
                });
            }
            /**
             * ViewSet for managing merchant credentials.
             *
             * Endpoints:
             * - GET /api/gmb/credentials/ - List all credentials
             * - POST /api/gmb/credentials/ - Create new credential
             * - GET /api/gmb/credentials/{id}/ - Get single credential
             * - DELETE /api/gmb/credentials/{id}/ - Delete credential
             * - DELETE /api/gmb/credentials/ - Delete all credentials
             * @param id
             * @returns MerchantCredential
             * @throws ApiError
             */
            public static apiGmbCredentialsRetrieve(
                id: string,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/credentials/{id}/',
                    path: {
                        'id': id,
                    },
                });
            }
            /**
             * ViewSet for managing merchant credentials.
             *
             * Endpoints:
             * - GET /api/gmb/credentials/ - List all credentials
             * - POST /api/gmb/credentials/ - Create new credential
             * - GET /api/gmb/credentials/{id}/ - Get single credential
             * - DELETE /api/gmb/credentials/{id}/ - Delete credential
             * - DELETE /api/gmb/credentials/ - Delete all credentials
             * @param id
             * @param requestBody
             * @returns MerchantCredential
             * @throws ApiError
             */
            public static apiGmbCredentialsUpdate(
                id: string,
                requestBody: MerchantCredentialRequest,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'PUT',
                    url: '/api/gmb/credentials/{id}/',
                    path: {
                        'id': id,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * ViewSet for managing merchant credentials.
             *
             * Endpoints:
             * - GET /api/gmb/credentials/ - List all credentials
             * - POST /api/gmb/credentials/ - Create new credential
             * - GET /api/gmb/credentials/{id}/ - Get single credential
             * - DELETE /api/gmb/credentials/{id}/ - Delete credential
             * - DELETE /api/gmb/credentials/ - Delete all credentials
             * @param id
             * @param requestBody
             * @returns MerchantCredential
             * @throws ApiError
             */
            public static apiGmbCredentialsPartialUpdate(
                id: string,
                requestBody?: PatchedMerchantCredentialRequest,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'PATCH',
                    url: '/api/gmb/credentials/{id}/',
                    path: {
                        'id': id,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                });
            }
            /**
             * ViewSet for managing merchant credentials.
             *
             * Endpoints:
             * - GET /api/gmb/credentials/ - List all credentials
             * - POST /api/gmb/credentials/ - Create new credential
             * - GET /api/gmb/credentials/{id}/ - Get single credential
             * - DELETE /api/gmb/credentials/{id}/ - Delete credential
             * - DELETE /api/gmb/credentials/ - Delete all credentials
             * @param id
             * @returns void
             * @throws ApiError
             */
            public static apiGmbCredentialsDestroy(
                id: string,
            ): CancelablePromise<void> {
                return __request(OpenAPI, {
                    method: 'DELETE',
                    url: '/api/gmb/credentials/{id}/',
                    path: {
                        'id': id,
                    },
                });
            }
            /**
             * ViewSet for managing Google My Business accounts.
             * @param page A page number within the paginated result set.
             * @returns PaginatedMerchantCredentialList
             * @throws ApiError
             */
            public static apiGmbGoogleAccountsList(
                page?: number,
            ): CancelablePromise<PaginatedMerchantCredentialList> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/google-accounts/',
                    query: {
                        'page': page,
                    },
                });
            }
            /**
             * ViewSet for managing Google My Business accounts.
             * @param id
             * @returns MerchantCredential
             * @throws ApiError
             */
            public static apiGmbGoogleAccountsRetrieve(
                id: string,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/api/gmb/google-accounts/{id}/',
                    path: {
                        'id': id,
                    },
                });
            }
            /**
             * Simple toggle to enable/disable a location.
             *
             * POST with:
             * {
                 * "location_id": "123456",
                 * "enabled": true/false
                 * }
                 *
                 * Or legacy format:
                 * {
                     * "location_resource_name": "accounts/123/locations/456",
                     * "is_enabled": true/false
                     * }
                     * @param id
                     * @param requestBody
                     * @returns MerchantCredential
                     * @throws ApiError
                     */
                    public static apiGmbGoogleAccountsEnableLocationCreate(
                        id: string,
                        requestBody: MerchantCredentialRequest,
                    ): CancelablePromise<MerchantCredential> {
                        return __request(OpenAPI, {
                            method: 'POST',
                            url: '/api/gmb/google-accounts/{id}/enable_location/',
                            path: {
                                'id': id,
                            },
                            body: requestBody,
                            mediaType: 'application/json',
                        });
                    }
                    /**
                     * List all locations for a specific Google account.
                     * @param id
                     * @returns MerchantCredential
                     * @throws ApiError
                     */
                    public static apiGmbGoogleAccountsLocationsRetrieve(
                        id: string,
                    ): CancelablePromise<MerchantCredential> {
                        return __request(OpenAPI, {
                            method: 'GET',
                            url: '/api/gmb/google-accounts/{id}/locations/',
                            path: {
                                'id': id,
                            },
                        });
                    }
                    /**
                     * Get all Google accounts with their associated locations in a single call.
                     *
                     * Returns:
                     * Response with schema:
                     * {
                         * "accounts": [
                             * {
                                 * "account_name": "string",
                                 * "account_id": "string",
                                 * "credential_id": "integer",
                                 * "locations": [
                                     * {
                                         * "resource_name": "string",
                                         * "location_id": "string",
                                         * "title": "string",
                                         * "address": "string",
                                         * "phone": "string",
                                         * "is_enabled": "boolean"
                                         * }
                                         * ]
                                         * }
                                         * ]
                                         * }
                                         * @returns GMBAccountsListResponse
                                         * @throws ApiError
                                         */
                                        public static apiGmbGoogleAccountsAccountsWithLocationsRetrieve(): CancelablePromise<GMBAccountsListResponse> {
                                            return __request(OpenAPI, {
                                                method: 'GET',
                                                url: '/api/gmb/google-accounts/accounts_with_locations/',
                                            });
                                        }
                                        /**
                                         * List all enabled locations across all credentials.
                                         * @param page A page number within the paginated result set.
                                         * @returns PaginatedLocationList
                                         * @throws ApiError
                                         */
                                        public static apiGmbLocationsList(
                                            page?: number,
                                        ): CancelablePromise<PaginatedLocationList> {
                                            return __request(OpenAPI, {
                                                method: 'GET',
                                                url: '/api/gmb/locations/',
                                                query: {
                                                    'page': page,
                                                },
                                            });
                                        }
                                        /**
                                         * Toggle weekly posts
                                         * Toggle weekly post generation for a location
                                         * @param id
                                         * @param requestBody
                                         * @returns ToggleWeeklyPostsResponse
                                         * @throws ApiError
                                         */
                                        public static apiGmbLocationsToggleWeeklyPostsCreate(
                                            id: string,
                                            requestBody: ToggleWeeklyPostsRequestRequest,
                                        ): CancelablePromise<ToggleWeeklyPostsResponse> {
                                            return __request(OpenAPI, {
                                                method: 'POST',
                                                url: '/api/gmb/locations/{id}/toggle-weekly-posts/',
                                                path: {
                                                    'id': id,
                                                },
                                                body: requestBody,
                                                mediaType: 'application/json',
                                            });
                                        }
                                        /**
                                         * Update location details like title, business description, and keywords in our local database.
                                         * Only updates fields that are explicitly provided and have non-blank values.
                                         *
                                         * PATCH /api/gmb/locations/{id}/update_details/
                                         *
                                         * Request body:
                                         * {
                                             * "title": "New Location Name",
                                             * "business_description": "Updated business description",
                                             * "keywords": "keyword1, keyword2, keyword3"
                                             * }
                                             * @param id
                                             * @param requestBody
                                             * @returns Location
                                             * @throws ApiError
                                             */
                                            public static apiGmbLocationsUpdateDetailsPartialUpdate(
                                                id: string,
                                                requestBody?: PatchedLocationRequest,
                                            ): CancelablePromise<Location> {
                                                return __request(OpenAPI, {
                                                    method: 'PATCH',
                                                    url: '/api/gmb/locations/{id}/update_details/',
                                                    path: {
                                                        'id': id,
                                                    },
                                                    body: requestBody,
                                                    mediaType: 'application/json',
                                                });
                                            }
                                            /**
                                             * ViewSet for managing GMB posts (drafts, queued, and published).
                                             *
                                             * Endpoints:
                                             * - POST /api/gmb/posts/ - Create a new draft post
                                             * - GET /api/gmb/posts/ - List all posts (filter by ?status=DRAFT)
                                             * - POST /api/gmb/posts/{id}/publish/ - Publish a draft post
                                             * - POST /api/gmb/posts/{id}/queue/ - Queue a draft post for later
                                             * - POST /api/gmb/posts/{id}/autosave/ - Autosave draft post changes
                                             * @param page A page number within the paginated result set.
                                             * @returns PaginatedGMBPostList
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsList(
                                                page?: number,
                                            ): CancelablePromise<PaginatedGMBPostList> {
                                                return __request(OpenAPI, {
                                                    method: 'GET',
                                                    url: '/api/gmb/posts/',
                                                    query: {
                                                        'page': page,
                                                    },
                                                });
                                            }
                                            /**
                                             * Enhanced create method with better error logging
                                             * @param requestBody
                                             * @returns GMBPost
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsCreate(
                                                requestBody?: GMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/api/gmb/posts/',
                                                    body: requestBody,
                                                    mediaType: 'application/json',
                                                });
                                            }
                                            /**
                                             * ViewSet for managing GMB posts (drafts, queued, and published).
                                             *
                                             * Endpoints:
                                             * - POST /api/gmb/posts/ - Create a new draft post
                                             * - GET /api/gmb/posts/ - List all posts (filter by ?status=DRAFT)
                                             * - POST /api/gmb/posts/{id}/publish/ - Publish a draft post
                                             * - POST /api/gmb/posts/{id}/queue/ - Queue a draft post for later
                                             * - POST /api/gmb/posts/{id}/autosave/ - Autosave draft post changes
                                             * @param id
                                             * @returns GMBPost
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsRetrieve(
                                                id: string,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'GET',
                                                    url: '/api/gmb/posts/{id}/',
                                                    path: {
                                                        'id': id,
                                                    },
                                                });
                                            }
                                            /**
                                             * ViewSet for managing GMB posts (drafts, queued, and published).
                                             *
                                             * Endpoints:
                                             * - POST /api/gmb/posts/ - Create a new draft post
                                             * - GET /api/gmb/posts/ - List all posts (filter by ?status=DRAFT)
                                             * - POST /api/gmb/posts/{id}/publish/ - Publish a draft post
                                             * - POST /api/gmb/posts/{id}/queue/ - Queue a draft post for later
                                             * - POST /api/gmb/posts/{id}/autosave/ - Autosave draft post changes
                                             * @param id
                                             * @param requestBody
                                             * @returns GMBPost
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsUpdate(
                                                id: string,
                                                requestBody?: GMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'PUT',
                                                    url: '/api/gmb/posts/{id}/',
                                                    path: {
                                                        'id': id,
                                                    },
                                                    body: requestBody,
                                                    mediaType: 'application/json',
                                                });
                                            }
                                            /**
                                             * ViewSet for managing GMB posts (drafts, queued, and published).
                                             *
                                             * Endpoints:
                                             * - POST /api/gmb/posts/ - Create a new draft post
                                             * - GET /api/gmb/posts/ - List all posts (filter by ?status=DRAFT)
                                             * - POST /api/gmb/posts/{id}/publish/ - Publish a draft post
                                             * - POST /api/gmb/posts/{id}/queue/ - Queue a draft post for later
                                             * - POST /api/gmb/posts/{id}/autosave/ - Autosave draft post changes
                                             * @param id
                                             * @param requestBody
                                             * @returns GMBPost
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsPartialUpdate(
                                                id: string,
                                                requestBody?: PatchedGMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'PATCH',
                                                    url: '/api/gmb/posts/{id}/',
                                                    path: {
                                                        'id': id,
                                                    },
                                                    body: requestBody,
                                                    mediaType: 'application/json',
                                                });
                                            }
                                            /**
                                             * ViewSet for managing GMB posts (drafts, queued, and published).
                                             *
                                             * Endpoints:
                                             * - POST /api/gmb/posts/ - Create a new draft post
                                             * - GET /api/gmb/posts/ - List all posts (filter by ?status=DRAFT)
                                             * - POST /api/gmb/posts/{id}/publish/ - Publish a draft post
                                             * - POST /api/gmb/posts/{id}/queue/ - Queue a draft post for later
                                             * - POST /api/gmb/posts/{id}/autosave/ - Autosave draft post changes
                                             * @param id
                                             * @returns void
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsDestroy(
                                                id: string,
                                            ): CancelablePromise<void> {
                                                return __request(OpenAPI, {
                                                    method: 'DELETE',
                                                    url: '/api/gmb/posts/{id}/',
                                                    path: {
                                                        'id': id,
                                                    },
                                                });
                                            }
                                            /**
                                             * Autosave a draft post. This endpoint is designed to be called frequently
                                             * (e.g., every 5 seconds) to save the user's current progress.
                                             *
                                             * Only updates the content (summary, image_url, cta fields) without changing status.
                                             * @param id
                                             * @param requestBody
                                             * @returns GMBPost
                                             * @throws ApiError
                                             */
                                            public static apiGmbPostsAutosaveCreate(
                                                id: string,
                                                requestBody?: GMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/api/gmb/posts/{id}/autosave/',
                                                    path: {
                                                        'id': id,
                                                    },
                                                    body: requestBody,
                                                    mediaType: 'application/json',
                                                });
                                            }
                                            /**
                                             * Generate AI content for a specific Google My Business post.
                                             *
                                             * This endpoint uses AI to generate engaging content for an existing post.
                                             * The generated content will update the post's summary.
                                             *
                                             * Request body:
                                             * ```json
                                             * {
                                                 * "business_type": "Restaurant",  // Type of business
                                                 * "post_type": "UPDATE",          // Type of post (UPDATE, OFFER, EVENT)
                                                 * "keywords": "weekend special, brunch", // Optional keywords to include
                                                 * "tone": "friendly",              // Optional tone (friendly, professional, casual, formal)
                                                 * "location_id": "123456"         // Optional location ID to use its metadata
                                                 * }
                                                 * ```
                                                 *
                                                 * Returns:
                                                 * ```json
                                                 * {
                                                     * "content": "The generated post content text",
                                                     * "post": { post data with updated summary },
                                                     * "success": true
                                                     * }
                                                     * ```
                                                     *
                                                     * Note: Rate limited to {MAX_AI_DRAFTS_PER_MONTH} requests per month per user.
                                                     * @param id
                                                     * @param requestBody
                                                     * @returns GMBPost
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbPostsGenerateContentForPostCreate(
                                                        id: string,
                                                        requestBody?: GMBPostRequest,
                                                    ): CancelablePromise<GMBPost> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/posts/{id}/generate_content_for_post/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * Immediately publish a post.
                                                     * @param id
                                                     * @param requestBody
                                                     * @returns GMBPost
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbPostsPublishCreate(
                                                        id: string,
                                                        requestBody?: GMBPostRequest,
                                                    ): CancelablePromise<GMBPost> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/posts/{id}/publish/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * Queue a draft post for publishing.
                                                     * @param id
                                                     * @param requestBody
                                                     * @returns GMBPost
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbPostsQueueCreate(
                                                        id: string,
                                                        requestBody?: GMBPostRequest,
                                                    ): CancelablePromise<GMBPost> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/posts/{id}/queue/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * Trigger asynchronous sync of published posts for the current user.
                                                     *
                                                     * Fires the ``sync_posts`` Celery task and returns 202 Accepted immediately.
                                                     * @returns any No response body
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbPostsSyncCreate(): CancelablePromise<any> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/posts/sync/',
                                                        });
                                                    }
                                                    /**
                                                     * Refresh access tokens for merchant credentials.
                                                     * @returns any No response body
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbRefreshTokenCreate(): CancelablePromise<any> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/refresh_token/',
                                                        });
                                                    }
                                                    /**
                                                     * Override list to support both paginated and non-paginated responses
                                                     * @param page A page number within the paginated result set.
                                                     * @param pageSize Number of results to return per page.
                                                     * @returns PaginatedReviewList
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsList(
                                                        page?: number,
                                                        pageSize?: number,
                                                    ): CancelablePromise<PaginatedReviewList> {
                                                        return __request(OpenAPI, {
                                                            method: 'GET',
                                                            url: '/api/gmb/reviews/',
                                                            query: {
                                                                'page': page,
                                                                'page_size': pageSize,
                                                            },
                                                        });
                                                    }
                                                    /**
                                                     * ViewSet for managing Google My Business reviews.
                                                     *
                                                     * Endpoints:
                                                     * - GET /api/gmb/reviews/ - List paginated reviews (with ?all=true for non-paginated)
                                                     * - GET /api/gmb/reviews/{id}/ - Get a single review
                                                     * - POST /api/gmb/reviews/{id}/reply/ - Reply to a review
                                                     * - DELETE /api/gmb/reviews/{id}/reply/ - Delete a reply
                                                     * - POST /api/gmb/reviews/ai_generate/ - Generate AI responses for single/multiple reviews
                                                     * - POST /api/gmb/reviews/{id}/save_draft/ - Save a draft reply
                                                     * - POST /api/gmb/reviews/bulk_publish_drafts/ - Publish multiple draft replies
                                                     * - GET /api/gmb/reviews/bulk_status/ - Get bulk operation status and usage info
                                                     * - POST /api/gmb/reviews/sync/ - Trigger manual sync of reviews
                                                     * @param requestBody
                                                     * @returns Review
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsCreate(
                                                        requestBody: ReviewRequest,
                                                    ): CancelablePromise<Review> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/reviews/',
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * Override retrieve to include draft data if it exists
                                                     * @param id
                                                     * @returns Review
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsRetrieve(
                                                        id: string,
                                                    ): CancelablePromise<Review> {
                                                        return __request(OpenAPI, {
                                                            method: 'GET',
                                                            url: '/api/gmb/reviews/{id}/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                        });
                                                    }
                                                    /**
                                                     * ViewSet for managing Google My Business reviews.
                                                     *
                                                     * Endpoints:
                                                     * - GET /api/gmb/reviews/ - List paginated reviews (with ?all=true for non-paginated)
                                                     * - GET /api/gmb/reviews/{id}/ - Get a single review
                                                     * - POST /api/gmb/reviews/{id}/reply/ - Reply to a review
                                                     * - DELETE /api/gmb/reviews/{id}/reply/ - Delete a reply
                                                     * - POST /api/gmb/reviews/ai_generate/ - Generate AI responses for single/multiple reviews
                                                     * - POST /api/gmb/reviews/{id}/save_draft/ - Save a draft reply
                                                     * - POST /api/gmb/reviews/bulk_publish_drafts/ - Publish multiple draft replies
                                                     * - GET /api/gmb/reviews/bulk_status/ - Get bulk operation status and usage info
                                                     * - POST /api/gmb/reviews/sync/ - Trigger manual sync of reviews
                                                     * @param id
                                                     * @param requestBody
                                                     * @returns Review
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsUpdate(
                                                        id: string,
                                                        requestBody: ReviewRequest,
                                                    ): CancelablePromise<Review> {
                                                        return __request(OpenAPI, {
                                                            method: 'PUT',
                                                            url: '/api/gmb/reviews/{id}/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * ViewSet for managing Google My Business reviews.
                                                     *
                                                     * Endpoints:
                                                     * - GET /api/gmb/reviews/ - List paginated reviews (with ?all=true for non-paginated)
                                                     * - GET /api/gmb/reviews/{id}/ - Get a single review
                                                     * - POST /api/gmb/reviews/{id}/reply/ - Reply to a review
                                                     * - DELETE /api/gmb/reviews/{id}/reply/ - Delete a reply
                                                     * - POST /api/gmb/reviews/ai_generate/ - Generate AI responses for single/multiple reviews
                                                     * - POST /api/gmb/reviews/{id}/save_draft/ - Save a draft reply
                                                     * - POST /api/gmb/reviews/bulk_publish_drafts/ - Publish multiple draft replies
                                                     * - GET /api/gmb/reviews/bulk_status/ - Get bulk operation status and usage info
                                                     * - POST /api/gmb/reviews/sync/ - Trigger manual sync of reviews
                                                     * @param id
                                                     * @param requestBody
                                                     * @returns Review
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsPartialUpdate(
                                                        id: string,
                                                        requestBody?: PatchedReviewRequest,
                                                    ): CancelablePromise<Review> {
                                                        return __request(OpenAPI, {
                                                            method: 'PATCH',
                                                            url: '/api/gmb/reviews/{id}/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * ViewSet for managing Google My Business reviews.
                                                     *
                                                     * Endpoints:
                                                     * - GET /api/gmb/reviews/ - List paginated reviews (with ?all=true for non-paginated)
                                                     * - GET /api/gmb/reviews/{id}/ - Get a single review
                                                     * - POST /api/gmb/reviews/{id}/reply/ - Reply to a review
                                                     * - DELETE /api/gmb/reviews/{id}/reply/ - Delete a reply
                                                     * - POST /api/gmb/reviews/ai_generate/ - Generate AI responses for single/multiple reviews
                                                     * - POST /api/gmb/reviews/{id}/save_draft/ - Save a draft reply
                                                     * - POST /api/gmb/reviews/bulk_publish_drafts/ - Publish multiple draft replies
                                                     * - GET /api/gmb/reviews/bulk_status/ - Get bulk operation status and usage info
                                                     * - POST /api/gmb/reviews/sync/ - Trigger manual sync of reviews
                                                     * @param id
                                                     * @returns void
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsDestroy(
                                                        id: string,
                                                    ): CancelablePromise<void> {
                                                        return __request(OpenAPI, {
                                                            method: 'DELETE',
                                                            url: '/api/gmb/reviews/{id}/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                        });
                                                    }
                                                    /**
                                                     * Delete a review reply
                                                     * Queue a reply deletion for a Google My Business review
                                                     * @param id
                                                     * @returns DeleteReplyResponse
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsDeleteReplyDestroy(
                                                        id: string,
                                                    ): CancelablePromise<DeleteReplyResponse> {
                                                        return __request(OpenAPI, {
                                                            method: 'DELETE',
                                                            url: '/api/gmb/reviews/{id}/delete_reply/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                        });
                                                    }
                                                    /**
                                                     * Reply to a review
                                                     * Queue a reply to a Google My Business review for publication
                                                     * @param id
                                                     * @param requestBody
                                                     * @returns ReplyResponse
                                                     * @throws ApiError
                                                     */
                                                    public static apiGmbReviewsReplyCreate(
                                                        id: string,
                                                        requestBody: ReplyRequestRequest,
                                                    ): CancelablePromise<ReplyResponse> {
                                                        return __request(OpenAPI, {
                                                            method: 'POST',
                                                            url: '/api/gmb/reviews/{id}/reply/',
                                                            path: {
                                                                'id': id,
                                                            },
                                                            body: requestBody,
                                                            mediaType: 'application/json',
                                                        });
                                                    }
                                                    /**
                                                     * Save a draft reply for a review without publishing it to Google.
                                                     *
                                                     * POST /api/gmb/reviews/{review_id}/save_draft/
                                                     *
                                                     * Request body:
                                                     * {
                                                         * "comment": "Draft reply text"
                                                         * }
                                                         *
                                                         * Returns:
                                                         * {
                                                             * "success": true,
                                                             * "draft": {
                                                                 * "comment": "Draft reply text",
                                                                 * "updated_at": "2024-03-21T10:00:00Z"
                                                                 * }
                                                                 * }
                                                                 * @param id
                                                                 * @param requestBody
                                                                 * @returns Review
                                                                 * @throws ApiError
                                                                 */
                                                                public static apiGmbReviewsSaveDraftCreate(
                                                                    id: string,
                                                                    requestBody: ReviewRequest,
                                                                ): CancelablePromise<Review> {
                                                                    return __request(OpenAPI, {
                                                                        method: 'POST',
                                                                        url: '/api/gmb/reviews/{id}/save_draft/',
                                                                        path: {
                                                                            'id': id,
                                                                        },
                                                                        body: requestBody,
                                                                        mediaType: 'application/json',
                                                                    });
                                                                }
                                                                /**
                                                                 * Generate AI review replies
                                                                 * Generate AI replies for one or multiple reviews
                                                                 * @param requestBody
                                                                 * @returns AIGenerationResponse
                                                                 * @throws ApiError
                                                                 */
                                                                public static apiGmbReviewsAiGenerateCreate(
                                                                    requestBody: AIGenerationRequestRequest,
                                                                ): CancelablePromise<AIGenerationResponse> {
                                                                    return __request(OpenAPI, {
                                                                        method: 'POST',
                                                                        url: '/api/gmb/reviews/ai_generate/',
                                                                        body: requestBody,
                                                                        mediaType: 'application/json',
                                                                    });
                                                                }
                                                                /**
                                                                 * Bulk publish draft replies
                                                                 * Publish multiple draft replies to Google My Business
                                                                 * @param requestBody
                                                                 * @returns BulkPublishResponse
                                                                 * @throws ApiError
                                                                 */
                                                                public static apiGmbReviewsBulkPublishDraftsCreate(
                                                                    requestBody: BulkPublishRequestRequest,
                                                                ): CancelablePromise<BulkPublishResponse> {
                                                                    return __request(OpenAPI, {
                                                                        method: 'POST',
                                                                        url: '/api/gmb/reviews/bulk_publish_drafts/',
                                                                        body: requestBody,
                                                                        mediaType: 'application/json',
                                                                    });
                                                                }
                                                                /**
                                                                 * Get bulk operation status
                                                                 * Get bulk operation status and monthly usage information
                                                                 * @returns BulkStatusResponse
                                                                 * @throws ApiError
                                                                 */
                                                                public static apiGmbReviewsBulkStatusRetrieve(): CancelablePromise<BulkStatusResponse> {
                                                                    return __request(OpenAPI, {
                                                                        method: 'GET',
                                                                        url: '/api/gmb/reviews/bulk_status/',
                                                                    });
                                                                }
                                                                /**
                                                                 * Trigger an asynchronous sync of reviews for the current user.
                                                                 *
                                                                 * The task will still iterate over *all* enabled locations, but the caller
                                                                 * might only be interested in their own. The backend therefore starts the
                                                                 * global sync task and immediately returns 202 Accepted. Front-end can poll
                                                                 * ``/reviews`` for fresh data.
                                                                 *
                                                                 * Returns:
                                                                 * Response with schema:
                                                                 * {
                                                                     * "success": true
                                                                     * }
                                                                     * @returns SyncResponse
                                                                     * @throws ApiError
                                                                     */
                                                                    public static apiGmbReviewsSyncCreate(): CancelablePromise<SyncResponse> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/gmb/reviews/sync/',
                                                                        });
                                                                    }
                                                                    /**
                                                                     * Check AI generation task status
                                                                     * Check the status of a background AI generation task
                                                                     * @param taskId
                                                                     * @returns Review
                                                                     * @throws ApiError
                                                                     */
                                                                    public static apiGmbReviewsTaskStatusRetrieve(
                                                                        taskId: string,
                                                                    ): CancelablePromise<Review> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/gmb/reviews/task_status/{taskId}/',
                                                                            path: {
                                                                                'taskId': taskId,
                                                                            },
                                                                        });
                                                                    }
                                                                    /**
                                                                     * Get status of merchant credentials for the current user.
                                                                     * @returns any No response body
                                                                     * @throws ApiError
                                                                     */
                                                                    public static apiGmbStatusRetrieve(): CancelablePromise<any> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/gmb/status/',
                                                                        });
                                                                    }
                                                                    /**
                                                                     * @param page A page number within the paginated result set.
                                                                     * @returns PaginatedReviewCampaignList
                                                                     * @throws ApiError
                                                                     */
                                                                    public static apiReviewBoosterCampaignsList(
                                                                        page?: number,
                                                                    ): CancelablePromise<PaginatedReviewCampaignList> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/campaigns/',
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
                                                                    public static apiReviewBoosterCampaignsCreate(
                                                                        requestBody: ReviewCampaignRequest,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/campaigns/',
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
                                                                    public static apiReviewBoosterCampaignsAnalyticsRetrieve(
                                                                        campaignId: string,
                                                                    ): CancelablePromise<any> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/campaigns/{campaignId}/analytics/',
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
                                                                    public static apiReviewBoosterCampaignsRetrieve(
                                                                        id: string,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/campaigns/{id}/',
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
                                                                    public static apiReviewBoosterCampaignsUpdate(
                                                                        id: string,
                                                                        requestBody: ReviewCampaignRequest,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'PUT',
                                                                            url: '/api/review-booster/campaigns/{id}/',
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
                                                                    public static apiReviewBoosterCampaignsPartialUpdate(
                                                                        id: string,
                                                                        requestBody?: PatchedReviewCampaignRequest,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'PATCH',
                                                                            url: '/api/review-booster/campaigns/{id}/',
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
                                                                    public static apiReviewBoosterCampaignsDestroy(
                                                                        id: string,
                                                                    ): CancelablePromise<void> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'DELETE',
                                                                            url: '/api/review-booster/campaigns/{id}/',
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
                                                                    public static apiReviewBoosterCampaignsActivateCreate(
                                                                        id: string,
                                                                        requestBody: ReviewCampaignRequest,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/campaigns/{id}/activate/',
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
                                                                    public static apiReviewBoosterCampaignsPauseCreate(
                                                                        id: string,
                                                                        requestBody: ReviewCampaignRequest,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/campaigns/{id}/pause/',
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
                                                                    public static apiReviewBoosterCampaignsStatsRetrieve(
                                                                        id: string,
                                                                    ): CancelablePromise<ReviewCampaign> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/campaigns/{id}/stats/',
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
                                                                    public static apiReviewBoosterCollectCreate(
                                                                        campaignId: string,
                                                                        requestBody?: CustomerOptinCreateRequest,
                                                                    ): CancelablePromise<any> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/collect/{campaignId}/',
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
                                                                    public static apiReviewBoosterContactsList(
                                                                        page?: number,
                                                                    ): CancelablePromise<PaginatedCustomerOptinList> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/contacts/',
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
                                                                    public static apiReviewBoosterContactsCreate(
                                                                        requestBody: CustomerOptinRequest,
                                                                    ): CancelablePromise<CustomerOptin> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/contacts/',
                                                                            body: requestBody,
                                                                            mediaType: 'application/json',
                                                                        });
                                                                    }
                                                                    /**
                                                                     * @param id
                                                                     * @returns CustomerOptin
                                                                     * @throws ApiError
                                                                     */
                                                                    public static apiReviewBoosterContactsRetrieve(
                                                                        id: string,
                                                                    ): CancelablePromise<CustomerOptin> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/contacts/{id}/',
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
                                                                    public static apiReviewBoosterContactsUpdate(
                                                                        id: string,
                                                                        requestBody: CustomerOptinRequest,
                                                                    ): CancelablePromise<CustomerOptin> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'PUT',
                                                                            url: '/api/review-booster/contacts/{id}/',
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
                                                                    public static apiReviewBoosterContactsPartialUpdate(
                                                                        id: string,
                                                                        requestBody?: PatchedCustomerOptinRequest,
                                                                    ): CancelablePromise<CustomerOptin> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'PATCH',
                                                                            url: '/api/review-booster/contacts/{id}/',
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
                                                                    public static apiReviewBoosterContactsDestroy(
                                                                        id: string,
                                                                    ): CancelablePromise<void> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'DELETE',
                                                                            url: '/api/review-booster/contacts/{id}/',
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
                                                                    public static apiReviewBoosterContactsSendReminderCreate(
                                                                        id: string,
                                                                        requestBody: CustomerOptinRequest,
                                                                    ): CancelablePromise<CustomerOptin> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/contacts/{id}/send_reminder/',
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
                                                                    public static apiReviewBoosterContactsBulkSendRemindersCreate(
                                                                        requestBody: CustomerOptinRequest,
                                                                    ): CancelablePromise<CustomerOptin> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/contacts/bulk_send_reminders/',
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
                                                                    public static apiReviewBoosterRCreate(
                                                                        uniqueToken: string,
                                                                        requestBody: ReviewSubmissionRequest,
                                                                    ): CancelablePromise<any> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'POST',
                                                                            url: '/api/review-booster/r/{uniqueToken}/',
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
                                                                    public static apiReviewBoosterRequestsList(
                                                                        page?: number,
                                                                    ): CancelablePromise<PaginatedReviewRequestList> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/requests/',
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
                                                                    public static apiReviewBoosterRequestsRetrieve(
                                                                        id: string,
                                                                    ): CancelablePromise<ReviewRequest> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/review-booster/requests/{id}/',
                                                                            path: {
                                                                                'id': id,
                                                                            },
                                                                        });
                                                                    }
                                                                    /**
                                                                     * List all scans for the current user
                                                                     * @param ordering Which field to use when ordering the results.
                                                                     * @param page A page number within the paginated result set.
                                                                     * @param pageSize Number of results to return per page.
                                                                     * @returns PaginatedScanListList
                                                                     * @throws ApiError
                                                                     */
                                                                    public static apiScansList(
                                                                        ordering?: string,
                                                                        page?: number,
                                                                        pageSize?: number,
                                                                    ): CancelablePromise<PaginatedScanListList> {
                                                                        return __request(OpenAPI, {
                                                                            method: 'GET',
                                                                            url: '/api/scans/',
                                                                            query: {
                                                                                'ordering': ordering,
                                                                                'page': page,
                                                                                'page_size': pageSize,
                                                                            },
                                                                        });
                                                                    }
                                                                    /**
                                                                     * Create a new scan with keywords.
                                                                     *
                                                                     * Input Parameters:
                                                                     * - url: URL for the business to scan (required if business_uuid not provided)
                                                                     * - business_uuid: UUID of an existing business (required if url not provided)
                                                                     * - scanType: Type of scan, either 'one-time' or 'repeating'
                                                                     * - frequency: Required for repeating scans, schedule frequency
                                                                     * - keywords: List of keywords to scan for (max 10)
                                                                     * - pinCount: Number of pins to generate (default: 35)
                                                                     * - radius: Radius in degrees to distribute pins (must be > 0)
                                                                     * - test_mode: Boolean to enable test mode without deducting credits
                                                                     * - tags: Optional list of tags to assign to the scan
                                                                     * - place_id: Optional Google Place ID to use for the business
                                                                     * - business_details: Optional JSON object with business details:
                                                                     * {
                                                                         * "name": "Business Name",
                                                                         * "place_id": "ChIJ...",
                                                                         * "cid": "12345",
                                                                         * "address": "123 Main St, City, State",
                                                                         * "latitude": 37.7749,
                                                                         * "longitude": -122.4194,
                                                                         * "variations": ["Alt Name 1", "Alt Name 2"],
                                                                         * "business_id": "id123"
                                                                         * }
                                                                         *
                                                                         * Returns the created scan data with status 201.
                                                                         * @param requestBody
                                                                         * @returns ScanCreate
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansCreate(
                                                                            requestBody: ScanCreateRequest,
                                                                        ): CancelablePromise<ScanCreate> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'POST',
                                                                                url: '/api/scans/',
                                                                                body: requestBody,
                                                                                mediaType: 'application/json',
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Retrieve a specific scan
                                                                         * @param uuid
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansRetrieve(
                                                                            uuid: string,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'GET',
                                                                                url: '/api/scans/{uuid}/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Update a scan
                                                                         * @param uuid
                                                                         * @param requestBody
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansUpdate(
                                                                            uuid: string,
                                                                            requestBody?: ScanDetailRequest,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'PUT',
                                                                                url: '/api/scans/{uuid}/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                                body: requestBody,
                                                                                mediaType: 'application/json',
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Partially update a scan
                                                                         * @param uuid
                                                                         * @param requestBody
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansPartialUpdate(
                                                                            uuid: string,
                                                                            requestBody?: PatchedScanDetailRequest,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'PATCH',
                                                                                url: '/api/scans/{uuid}/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                                body: requestBody,
                                                                                mediaType: 'application/json',
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Delete a scan
                                                                         * @param uuid
                                                                         * @returns void
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansDestroy(
                                                                            uuid: string,
                                                                        ): CancelablePromise<void> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'DELETE',
                                                                                url: '/api/scans/{uuid}/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Get the business details for a scan
                                                                         * @param uuid
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansBusinessRetrieve(
                                                                            uuid: string,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'GET',
                                                                                url: '/api/scans/{uuid}/business/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Enable or disable public sharing of this scan.
                                                                         * POST body can contain {"enable": true/false}.
                                                                         * The share token is auto-generated when the scan is created.
                                                                         * @param uuid
                                                                         * @param requestBody
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansEnablePublicShareCreate(
                                                                            uuid: string,
                                                                            requestBody?: ScanDetailRequest,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'POST',
                                                                                url: '/api/scans/{uuid}/enable_public_share/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                                body: requestBody,
                                                                                mediaType: 'application/json',
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Export scan results as a CSV file.
                                                                         *
                                                                         * This endpoint allows users to download their scan results in CSV format.
                                                                         * It includes business information, keyword details, and ranking results for each pin.
                                                                         *
                                                                         * Returns:
                                                                         * HTTP response with CSV content (attachment)
                                                                         * @param uuid
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansExportRetrieve(
                                                                            uuid: string,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'GET',
                                                                                url: '/api/scans/{uuid}/export/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Return scan logs in a simple text format for easy grepping.
                                                                         * This endpoint returns plain text instead of JSON for easier command-line processing.
                                                                         *
                                                                         * Query parameters:
                                                                         * - level: Filter logs by level (DEBUG, INFO, WARNING, ERROR)
                                                                         * - include_metadata: Set to 'true' to include metadata in the output
                                                                         * - start_date: Filter logs after this date (format: YYYY-MM-DD)
                                                                         * - end_date: Filter logs before this date (format: YYYY-MM-DD)
                                                                         * - search: Filter logs containing this text in the message
                                                                         * @param uuid
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansLogsRetrieve2(
                                                                            uuid: string,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'GET',
                                                                                url: '/api/scans/{uuid}/logs/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Pause a repeating scan
                                                                         * @param uuid
                                                                         * @param requestBody
                                                                         * @returns ScanDetail
                                                                         * @throws ApiError
                                                                         */
                                                                        public static apiScansPauseCreate(
                                                                            uuid: string,
                                                                            requestBody?: ScanDetailRequest,
                                                                        ): CancelablePromise<ScanDetail> {
                                                                            return __request(OpenAPI, {
                                                                                method: 'POST',
                                                                                url: '/api/scans/{uuid}/pause/',
                                                                                path: {
                                                                                    'uuid': uuid,
                                                                                },
                                                                                body: requestBody,
                                                                                mediaType: 'application/json',
                                                                            });
                                                                        }
                                                                        /**
                                                                         * Return all pin locations for this scan in a lightweight JSON payload.
                                                                         *
                                                                         * The response structure is optimised for the frontend timeline/map feature:
                                                                         * {
                                                                             * "scan_uuid": "<uuid>",
                                                                             * "pin_count": <int>,
                                                                             * "pins": [
                                                                                 * {
                                                                                     * "id": <int>,
                                                                                     * "latitude": <float>,
                                                                                     * "longitude": <float>,
                                                                                     * "is_center": <bool>,
                                                                                     * "maps_link": <str|null>
                                                                                     * },
                                                                                     * ...
                                                                                     * ]
                                                                                     * }
                                                                                     * @param uuid
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansPinsRetrieve(
                                                                                        uuid: string,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/{uuid}/pins/',
                                                                                            path: {
                                                                                                'uuid': uuid,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Resume a paused scan
                                                                                     * @param uuid
                                                                                     * @param requestBody
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansResumeCreate(
                                                                                        uuid: string,
                                                                                        requestBody?: ScanDetailRequest,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/scans/{uuid}/resume/',
                                                                                            path: {
                                                                                                'uuid': uuid,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Retry a failed scan
                                                                                     * @param uuid
                                                                                     * @param requestBody
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansRetryCreate(
                                                                                        uuid: string,
                                                                                        requestBody?: ScanDetailRequest,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/scans/{uuid}/retry/',
                                                                                            path: {
                                                                                                'uuid': uuid,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Get all search results (serpapi responses) for this scan.
                                                                                     *
                                                                                     * Query parameters:
                                                                                     * - keyword: Filter by specific keyword
                                                                                     * - found: Filter by found status (true/false)
                                                                                     * - pin: Filter by specific pin ID
                                                                                     * - format: 'raw' for individual results, 'grouped' for keyword grouping (default: raw)
                                                                                     * @param uuid
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansSearchResultsRetrieve(
                                                                                        uuid: string,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/{uuid}/search_results/',
                                                                                            path: {
                                                                                                'uuid': uuid,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Get the timeline of rankings for a specific scan.
                                                                                     *
                                                                                     * This endpoint retrieves historical ranking data for the business and keywords
                                                                                     * associated with the current scan, showing how rankings have changed over time.
                                                                                     *
                                                                                     * Query parameters:
                                                                                     * - date: ISO format date (YYYY-MM-DD) to get detailed results for a specific scan date
                                                                                     * When date is provided, returns all search results/pins for that specific date instead of aggregated timeline data.
                                                                                     * @param uuid
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansTimelineRetrieve(
                                                                                        uuid: string,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/{uuid}/timeline/',
                                                                                            path: {
                                                                                                'uuid': uuid,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Toggle the archived status of a scan.
                                                                                     * If the scan is archived, it will be unarchived, and vice versa.
                                                                                     * @param uuid
                                                                                     * @param requestBody
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansToggleArchiveCreate(
                                                                                        uuid: string,
                                                                                        requestBody?: ScanDetailRequest,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/scans/{uuid}/toggle_archive/',
                                                                                            path: {
                                                                                                'uuid': uuid,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Simple endpoint to confirm that a user is authenticated.
                                                                                     *
                                                                                     * Since the viewset uses IsAuthenticated permission, this endpoint
                                                                                     * will only be accessible if the user is logged in. Returns basic
                                                                                     * user information upon successful authentication.
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansCheckAuthRetrieve(): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/check_auth/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Display all code files in the ranktracker app in a single HTML page or JSON.
                                                                                     * Access restricted by API key.
                                                                                     * Format options:
                                                                                     * - HTML (default): /api/scans/code_explorer/?api_key=xxx
                                                                                     * - JSON: /api/scans/code_explorer.json/?api_key=xxx or /api/scans/code_explorer/?api_key=xxx&format=json
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansCodeExplorerRetrieve(): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/code_explorer/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Export all scans for the current user as a CSV file.
                                                                                     *
                                                                                     * This endpoint allows users to download all their scan results in CSV format.
                                                                                     * It includes business information, keyword details, and aggregated ranking results.
                                                                                     *
                                                                                     * Query parameters:
                                                                                     * status (str, optional): Filter scans by status
                                                                                     * keyword (str, optional): Filter scans by keyword
                                                                                     * days (int, optional): Only include scans from the last X days
                                                                                     *
                                                                                     * Returns:
                                                                                     * HTTP response with CSV content (attachment)
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansExportAllRetrieve(): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/export-all/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * List all available scan UUIDs using an API key without requiring authentication.
                                                                                     *
                                                                                     * Query parameters:
                                                                                     * - api_key: Required API key for access
                                                                                     * - status: Filter by scan status (optional)
                                                                                     * - days: Only show scans from the last X days (optional)
                                                                                     * - has_logs: Set to 'true' to only show scans that have logs (optional)
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansListScansRetrieve(): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/list-scans/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Return logs for any scan by UUID using an API key without requiring authentication.
                                                                                     *
                                                                                     * Query parameters:
                                                                                     * - api_key: Required API key for access
                                                                                     * - level: Filter logs by level (DEBUG, INFO, WARNING, ERROR)
                                                                                     * - include_metadata: Set to 'true' to include metadata in the output
                                                                                     * - start_date: Filter logs after this date (format: YYYY-MM-DD)
                                                                                     * - end_date: Filter logs before this date (format: YYYY-MM-DD)
                                                                                     * - search: Filter logs containing this text in the message
                                                                                     * @param scanUuid
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansLogsRetrieve(
                                                                                        scanUuid: string,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/logs/{scanUuid}/',
                                                                                            path: {
                                                                                                'scanUuid': scanUuid,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Preview pin locations without creating them in the database.
                                                                                     * Requires latitude, longitude, and pin_count in the request data.
                                                                                     * @param requestBody
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansPreviewPinsCreate(
                                                                                        requestBody?: ScanDetailRequest,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/scans/preview_pins/',
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Return a scan's detail data by its public_share_token,
                                                                                     * if 'public_share_enabled' is True.
                                                                                     * No login required.
                                                                                     * @param token
                                                                                     * @returns ScanDetail
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiScansPublicRetrieve(
                                                                                        token: string,
                                                                                    ): CancelablePromise<ScanDetail> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/scans/public/{token}/',
                                                                                            path: {
                                                                                                'token': token,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * OpenApi3 schema for this API. Format can be selected via content negotiation.
                                                                                     *
                                                                                     * - YAML: application/vnd.oai.openapi
                                                                                     * - JSON: application/vnd.oai.openapi+json
                                                                                     * @param format
                                                                                     * @param lang
                                                                                     * @returns any
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiSchemaRetrieve(
                                                                                        format?: 'json' | 'yaml',
                                                                                        lang?: 'af' | 'ar' | 'ar-dz' | 'ast' | 'az' | 'be' | 'bg' | 'bn' | 'br' | 'bs' | 'ca' | 'ckb' | 'cs' | 'cy' | 'da' | 'de' | 'dsb' | 'el' | 'en' | 'en-au' | 'en-gb' | 'eo' | 'es' | 'es-ar' | 'es-co' | 'es-mx' | 'es-ni' | 'es-ve' | 'et' | 'eu' | 'fa' | 'fi' | 'fr' | 'fy' | 'ga' | 'gd' | 'gl' | 'he' | 'hi' | 'hr' | 'hsb' | 'hu' | 'hy' | 'ia' | 'id' | 'ig' | 'io' | 'is' | 'it' | 'ja' | 'ka' | 'kab' | 'kk' | 'km' | 'kn' | 'ko' | 'ky' | 'lb' | 'lt' | 'lv' | 'mk' | 'ml' | 'mn' | 'mr' | 'ms' | 'my' | 'nb' | 'ne' | 'nl' | 'nn' | 'os' | 'pa' | 'pl' | 'pt' | 'pt-br' | 'ro' | 'ru' | 'sk' | 'sl' | 'sq' | 'sr' | 'sr-latn' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tk' | 'tr' | 'tt' | 'udm' | 'uk' | 'ur' | 'uz' | 'vi' | 'zh-hans' | 'zh-hant',
                                                                                    ): CancelablePromise<Record<string, any>> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/schema/',
                                                                                            query: {
                                                                                                'format': format,
                                                                                                'lang': lang,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for viewing Search Results.
                                                                                     * @param ordering Which field to use when ordering the results.
                                                                                     * @param page A page number within the paginated result set.
                                                                                     * @param pageSize Number of results to return per page.
                                                                                     * @returns PaginatedSearchResultList
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiSearchResultsList(
                                                                                        ordering?: string,
                                                                                        page?: number,
                                                                                        pageSize?: number,
                                                                                    ): CancelablePromise<PaginatedSearchResultList> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/search-results/',
                                                                                            query: {
                                                                                                'ordering': ordering,
                                                                                                'page': page,
                                                                                                'page_size': pageSize,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for viewing Search Results.
                                                                                     * @param id
                                                                                     * @returns SearchResult
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiSearchResultsRetrieve(
                                                                                        id: string,
                                                                                    ): CancelablePromise<SearchResult> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/search-results/{id}/',
                                                                                            path: {
                                                                                                'id': id,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Create a Stripe coupon that expires in 30 minutes.
                                                                                     *
                                                                                     * Request parameters:
                                                                                     * - amount_off: Amount in cents to discount (mutually exclusive with percent_off)
                                                                                     * - percent_off: Percentage to discount (mutually exclusive with amount_off)
                                                                                     * - currency: Currency code (required if amount_off is used)
                                                                                     * - duration: 'once', 'repeating', or 'forever' (default: 'once')
                                                                                     * - name: Optional display name for the coupon
                                                                                     *
                                                                                     * Returns:
                                                                                     * - id: The coupon ID to be used with Stripe
                                                                                     * - expires_at: When the coupon will expire (in 30 minutes)
                                                                                     * @returns any No response body
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiSubscriptionsCreateCouponCreate(): CancelablePromise<any> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/subscriptions/create-coupon/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Get subscription metrics including:
                                                                                     * - Total active subscriptions
                                                                                     * - Monthly Recurring Revenue (MRR)
                                                                                     * - Daily breakdown of revenue and subscriptions
                                                                                     * Supports pagination with 'page' and 'page_size' query parameters
                                                                                     * @returns any No response body
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiSubscriptionsMetricsRetrieve(): CancelablePromise<any> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/subscriptions/metrics/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for managing tags
                                                                                     * @param ordering Which field to use when ordering the results.
                                                                                     * @param page A page number within the paginated result set.
                                                                                     * @param search A search term.
                                                                                     * @returns PaginatedTagList
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiTagsList(
                                                                                        ordering?: string,
                                                                                        page?: number,
                                                                                        search?: string,
                                                                                    ): CancelablePromise<PaginatedTagList> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/tags/',
                                                                                            query: {
                                                                                                'ordering': ordering,
                                                                                                'page': page,
                                                                                                'search': search,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for managing tags
                                                                                     * @param requestBody
                                                                                     * @returns Tag
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiTagsCreate(
                                                                                        requestBody: TagRequest,
                                                                                    ): CancelablePromise<Tag> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/tags/',
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for managing tags
                                                                                     * @param name
                                                                                     * @returns Tag
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiTagsRetrieve(
                                                                                        name: string,
                                                                                    ): CancelablePromise<Tag> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/tags/{name}/',
                                                                                            path: {
                                                                                                'name': name,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for managing tags
                                                                                     * @param name
                                                                                     * @param requestBody
                                                                                     * @returns Tag
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiTagsUpdate(
                                                                                        name: string,
                                                                                        requestBody: TagRequest,
                                                                                    ): CancelablePromise<Tag> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'PUT',
                                                                                            url: '/api/tags/{name}/',
                                                                                            path: {
                                                                                                'name': name,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for managing tags
                                                                                     * @param name
                                                                                     * @param requestBody
                                                                                     * @returns Tag
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiTagsPartialUpdate(
                                                                                        name: string,
                                                                                        requestBody?: PatchedTagRequest,
                                                                                    ): CancelablePromise<Tag> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'PATCH',
                                                                                            url: '/api/tags/{name}/',
                                                                                            path: {
                                                                                                'name': name,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * ViewSet for managing tags
                                                                                     * @param name
                                                                                     * @returns void
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiTagsDestroy(
                                                                                        name: string,
                                                                                    ): CancelablePromise<void> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'DELETE',
                                                                                            url: '/api/tags/{name}/',
                                                                                            path: {
                                                                                                'name': name,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * @returns UserBalance
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiUsersCreditsRetrieve(): CancelablePromise<UserBalance> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/users/credits/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Return paginated list of avatar videos without using a model
                                                                                     * @returns any No response body
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoAvatarsRetrieve(): CancelablePromise<any> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/video/avatars/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Display all code files in the video app in a single HTML page or JSON.
                                                                                     * Access restricted by API key.
                                                                                     * Format options:
                                                                                     * - HTML (default): /api/scans/code_explorer/?api_key=xxx
                                                                                     * - JSON: /api/scans/code_explorer.json/?api_key=xxx or /api/scans/code_explorer/?api_key=xxx&format=json
                                                                                     * @returns any No response body
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoCodeExplorerRetrieve(): CancelablePromise<any> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/video/code-explorer/',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Lets authenticated users upload a video to Cloudflare R2 via `upload_video_to_r2`,
                                                                                     * then saves a DemoVid record with the final URL.
                                                                                     * @param page A page number within the paginated result set.
                                                                                     * @returns PaginatedDemoVidList
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoDemoVidsList(
                                                                                        page?: number,
                                                                                    ): CancelablePromise<PaginatedDemoVidList> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/video/demo-vids/',
                                                                                            query: {
                                                                                                'page': page,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Lets authenticated users upload a video to Cloudflare R2 via `upload_video_to_r2`,
                                                                                     * then saves a DemoVid record with the final URL.
                                                                                     * @param requestBody
                                                                                     * @returns DemoVid
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoDemoVidsCreate(
                                                                                        requestBody?: DemoVidRequest,
                                                                                    ): CancelablePromise<DemoVid> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/video/demo-vids/',
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Lets authenticated users upload a video to Cloudflare R2 via `upload_video_to_r2`,
                                                                                     * then saves a DemoVid record with the final URL.
                                                                                     * @param id
                                                                                     * @returns DemoVid
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoDemoVidsRetrieve(
                                                                                        id: string,
                                                                                    ): CancelablePromise<DemoVid> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'GET',
                                                                                            url: '/api/video/demo-vids/{id}/',
                                                                                            path: {
                                                                                                'id': id,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Lets authenticated users upload a video to Cloudflare R2 via `upload_video_to_r2`,
                                                                                     * then saves a DemoVid record with the final URL.
                                                                                     * @param id
                                                                                     * @param requestBody
                                                                                     * @returns DemoVid
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoDemoVidsUpdate(
                                                                                        id: string,
                                                                                        requestBody?: DemoVidRequest,
                                                                                    ): CancelablePromise<DemoVid> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'PUT',
                                                                                            url: '/api/video/demo-vids/{id}/',
                                                                                            path: {
                                                                                                'id': id,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Lets authenticated users upload a video to Cloudflare R2 via `upload_video_to_r2`,
                                                                                     * then saves a DemoVid record with the final URL.
                                                                                     * @param id
                                                                                     * @param requestBody
                                                                                     * @returns DemoVid
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoDemoVidsPartialUpdate(
                                                                                        id: string,
                                                                                        requestBody?: PatchedDemoVidRequest,
                                                                                    ): CancelablePromise<DemoVid> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'PATCH',
                                                                                            url: '/api/video/demo-vids/{id}/',
                                                                                            path: {
                                                                                                'id': id,
                                                                                            },
                                                                                            body: requestBody,
                                                                                            mediaType: 'application/json',
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Lets authenticated users upload a video to Cloudflare R2 via `upload_video_to_r2`,
                                                                                     * then saves a DemoVid record with the final URL.
                                                                                     * @param id
                                                                                     * @returns void
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoDemoVidsDestroy(
                                                                                        id: string,
                                                                                    ): CancelablePromise<void> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'DELETE',
                                                                                            url: '/api/video/demo-vids/{id}/',
                                                                                            path: {
                                                                                                'id': id,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Webhook endpoint for Remotion render completions
                                                                                     * This handler is deprecated since Generated_Video model has been removed.
                                                                                     * @param videoUuid
                                                                                     * @returns any No response body
                                                                                     * @throws ApiError
                                                                                     */
                                                                                    public static apiVideoRemotionWebhookCreate(
                                                                                        videoUuid: string,
                                                                                    ): CancelablePromise<any> {
                                                                                        return __request(OpenAPI, {
                                                                                            method: 'POST',
                                                                                            url: '/api/video/remotion-webhook/{videoUuid}/',
                                                                                            path: {
                                                                                                'videoUuid': videoUuid,
                                                                                            },
                                                                                        });
                                                                                    }
                                                                                    /**
                                                                                     * Public endpoint (no auth) to test UGC creation.
                                                                                     * JSON body example:
                                                                                     * {
                                                                                         * "first_url": "https://pub-abee3963fe854bbfa4f617b2b7c816fc.r2.dev/1.mp4",
                                                                                         * "second_url": "https://pub-abee3963fe854bbfa4f617b2b7c816fc.r2.dev/2.mp4",
                                                                                         * "overlay_text": "some text"
                                                                                         * }
                                                                                         * @returns any No response body
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoTestUgcCreate(): CancelablePromise<any> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/video/test-ugc/',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * API endpoint to upload a file directly to R2.
                                                                                         *
                                                                                         * Expects a multipart/form-data request with:
                                                                                         * - file: The file to upload
                                                                                         * - user_id: (optional) User ID to organize files (defaults to UUID if not provided)
                                                                                         * - folder: (optional) Folder name to organize files (defaults to 'uploads')
                                                                                         *
                                                                                         * Returns the public URL of the uploaded file.
                                                                                         * @returns any No response body
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoUploadToR2Create(): CancelablePromise<any> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/video/upload-to-r2/',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * ViewSet for video creation and management
                                                                                         * @param page A page number within the paginated result set.
                                                                                         * @returns PaginatedVideoList
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosList(
                                                                                            page?: number,
                                                                                        ): CancelablePromise<PaginatedVideoList> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'GET',
                                                                                                url: '/api/video/videos/',
                                                                                                query: {
                                                                                                    'page': page,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * Override create method to return immediately for frontend development
                                                                                         * @param requestBody
                                                                                         * @returns VideoCreate
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosCreate(
                                                                                            requestBody?: VideoCreateRequest,
                                                                                        ): CancelablePromise<VideoCreate> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/video/videos/',
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * ViewSet for video creation and management
                                                                                         * @param id
                                                                                         * @returns Video
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosRetrieve(
                                                                                            id: string,
                                                                                        ): CancelablePromise<Video> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'GET',
                                                                                                url: '/api/video/videos/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * ViewSet for video creation and management
                                                                                         * @param id
                                                                                         * @param requestBody
                                                                                         * @returns Video
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosUpdate(
                                                                                            id: string,
                                                                                            requestBody?: VideoRequest,
                                                                                        ): CancelablePromise<Video> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'PUT',
                                                                                                url: '/api/video/videos/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * ViewSet for video creation and management
                                                                                         * @param id
                                                                                         * @param requestBody
                                                                                         * @returns Video
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosPartialUpdate(
                                                                                            id: string,
                                                                                            requestBody?: PatchedVideoRequest,
                                                                                        ): CancelablePromise<Video> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'PATCH',
                                                                                                url: '/api/video/videos/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * ViewSet for video creation and management
                                                                                         * @param id
                                                                                         * @returns void
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosDestroy(
                                                                                            id: string,
                                                                                        ): CancelablePromise<void> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'DELETE',
                                                                                                url: '/api/video/videos/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * Cancel a pending video
                                                                                         * @param id
                                                                                         * @param requestBody
                                                                                         * @returns Video
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosCancelCreate(
                                                                                            id: string,
                                                                                            requestBody?: VideoRequest,
                                                                                        ): CancelablePromise<Video> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/video/videos/{id}/cancel/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * Increment download count and return download URL
                                                                                         * @param id
                                                                                         * @returns Video
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosDownloadRetrieve(
                                                                                            id: string,
                                                                                        ): CancelablePromise<Video> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'GET',
                                                                                                url: '/api/video/videos/{id}/download/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * Return paginated list of avatar videos without using a model
                                                                                         * @returns Video
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoVideosAvatarsRetrieve(): CancelablePromise<Video> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'GET',
                                                                                                url: '/api/video/videos/avatars/',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * Webhook endpoint for external video service callbacks
                                                                                         * @returns any No response body
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiVideoWebhookCreate(): CancelablePromise<any> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/video/webhook/',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * Consolidated webhook handler for Stripe events.
                                                                                         * Routes to the appropriate handler based on the product being subscribed to.
                                                                                         * @returns any No response body
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiWebhooksStripeCreate(): CancelablePromise<any> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/webhooks/stripe/',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * View for listing and creating WordPress connections.
                                                                                         * @param page A page number within the paginated result set.
                                                                                         * @returns PaginatedWordPressConnectionList
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiWordpressList(
                                                                                            page?: number,
                                                                                        ): CancelablePromise<PaginatedWordPressConnectionList> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'GET',
                                                                                                url: '/api/wordpress/',
                                                                                                query: {
                                                                                                    'page': page,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * View for listing and creating WordPress connections.
                                                                                         * @param requestBody
                                                                                         * @returns WordPressConnection
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiWordpressCreate(
                                                                                            requestBody: WordPressConnectionRequest,
                                                                                        ): CancelablePromise<WordPressConnection> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/api/wordpress/',
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * View for retrieving, updating, and deleting a WordPress connection.
                                                                                         * @param id
                                                                                         * @returns WordPressConnection
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiWordpressRetrieve(
                                                                                            id: string,
                                                                                        ): CancelablePromise<WordPressConnection> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'GET',
                                                                                                url: '/api/wordpress/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * View for retrieving, updating, and deleting a WordPress connection.
                                                                                         * @param id
                                                                                         * @param requestBody
                                                                                         * @returns WordPressConnection
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiWordpressPartialUpdate(
                                                                                            id: string,
                                                                                            requestBody?: PatchedWordPressConnectionRequest,
                                                                                        ): CancelablePromise<WordPressConnection> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'PATCH',
                                                                                                url: '/api/wordpress/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * View for retrieving, updating, and deleting a WordPress connection.
                                                                                         * @param id
                                                                                         * @returns void
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static apiWordpressDestroy(
                                                                                            id: string,
                                                                                        ): CancelablePromise<void> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'DELETE',
                                                                                                url: '/api/wordpress/{id}/',
                                                                                                path: {
                                                                                                    'id': id,
                                                                                                },
                                                                                            });
                                                                                        }
                                                                                        /**
                                                                                         * @param requestBody
                                                                                         * @returns Checkout
                                                                                         * @throws ApiError
                                                                                         */
                                                                                        public static createCreditCheckoutSession2(
                                                                                            requestBody: CheckoutRequest,
                                                                                        ): CancelablePromise<Checkout> {
                                                                                            return __request(OpenAPI, {
                                                                                                method: 'POST',
                                                                                                url: '/subscriptions/stripe/api/create-checkout-session/',
                                                                                                body: requestBody,
                                                                                                mediaType: 'application/json',
                                                                                            });
                                                                                        }
                                                                                    }
