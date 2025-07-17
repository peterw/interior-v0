/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIGenerationRequestRequest } from '../models/AIGenerationRequestRequest';
import type { AIGenerationResponse } from '../models/AIGenerationResponse';
import type { BulkPublishRequestRequest } from '../models/BulkPublishRequestRequest';
import type { BulkPublishResponse } from '../models/BulkPublishResponse';
import type { BulkStatusResponse } from '../models/BulkStatusResponse';
import type { DeleteReplyResponse } from '../models/DeleteReplyResponse';
import type { GMBAccountsListResponse } from '../models/GMBAccountsListResponse';
import type { GMBPost } from '../models/GMBPost';
import type { GMBPostRequest } from '../models/GMBPostRequest';
import type { Location } from '../models/Location';
import type { MerchantCredential } from '../models/MerchantCredential';
import type { MerchantCredentialRequest } from '../models/MerchantCredentialRequest';
import type { PaginatedGMBPostList } from '../models/PaginatedGMBPostList';
import type { PaginatedLocationList } from '../models/PaginatedLocationList';
import type { PaginatedMerchantCredentialList } from '../models/PaginatedMerchantCredentialList';
import type { PaginatedReviewList } from '../models/PaginatedReviewList';
import type { PatchedGMBPostRequest } from '../models/PatchedGMBPostRequest';
import type { PatchedLocationRequest } from '../models/PatchedLocationRequest';
import type { PatchedMerchantCredentialRequest } from '../models/PatchedMerchantCredentialRequest';
import type { PatchedReviewRequest } from '../models/PatchedReviewRequest';
import type { ReplyRequestRequest } from '../models/ReplyRequestRequest';
import type { ReplyResponse } from '../models/ReplyResponse';
import type { Review } from '../models/Review';
import type { ReviewRequest } from '../models/ReviewRequest';
import type { SyncResponse } from '../models/SyncResponse';
import type { ToggleWeeklyPostsRequestRequest } from '../models/ToggleWeeklyPostsRequestRequest';
import type { ToggleWeeklyPostsResponse } from '../models/ToggleWeeklyPostsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GmbService {
    /**
     * API view for business operations.
     * GET: List all businesses for the current user
     * POST: Create a new business
     * @returns any No response body
     * @throws ApiError
     */
    public static gmbBusinessesRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/businesses/',
        });
    }
    /**
     * API view for business operations.
     * GET: List all businesses for the current user
     * POST: Create a new business
     * @returns any No response body
     * @throws ApiError
     */
    public static gmbBusinessesCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gmb/businesses/',
        });
    }
    /**
     * API view for business operations.
     * GET: List all businesses for the current user
     * POST: Create a new business
     * @returns any No response body
     * @throws ApiError
     */
    public static gmbBusinessesUpdate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/gmb/businesses/',
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
    public static gmbBusinessesRetrieve2(
        businessId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/businesses/{businessId}/',
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
    public static gmbBusinessesCreate2(
        businessId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gmb/businesses/{businessId}/',
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
    public static gmbBusinessesUpdate2(
        businessId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/gmb/businesses/{businessId}/',
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
    public static gmbCredentialsList(
        page?: number,
    ): CancelablePromise<PaginatedMerchantCredentialList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/credentials/',
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
    public static gmbCredentialsCreate(
        requestBody: MerchantCredentialRequest,
    ): CancelablePromise<MerchantCredential> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/gmb/credentials/',
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
    public static gmbCredentialsAccountsRetrieve(
        credentialId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/credentials/{credentialId}/accounts/',
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
    public static gmbCredentialsTokenRetrieve(
        credentialId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/credentials/{credentialId}/token/',
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
    public static gmbCredentialsRetrieve(
        id: string,
    ): CancelablePromise<MerchantCredential> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/credentials/{id}/',
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
    public static gmbCredentialsUpdate(
        id: string,
        requestBody: MerchantCredentialRequest,
    ): CancelablePromise<MerchantCredential> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/gmb/credentials/{id}/',
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
    public static gmbCredentialsPartialUpdate(
        id: string,
        requestBody?: PatchedMerchantCredentialRequest,
    ): CancelablePromise<MerchantCredential> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/gmb/credentials/{id}/',
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
    public static gmbCredentialsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/gmb/credentials/{id}/',
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
    public static gmbGoogleAccountsList(
        page?: number,
    ): CancelablePromise<PaginatedMerchantCredentialList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/google-accounts/',
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
    public static gmbGoogleAccountsRetrieve(
        id: string,
    ): CancelablePromise<MerchantCredential> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gmb/google-accounts/{id}/',
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
            public static gmbGoogleAccountsEnableLocationCreate(
                id: string,
                requestBody: MerchantCredentialRequest,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'POST',
                    url: '/gmb/google-accounts/{id}/enable_location/',
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
            public static gmbGoogleAccountsLocationsRetrieve(
                id: string,
            ): CancelablePromise<MerchantCredential> {
                return __request(OpenAPI, {
                    method: 'GET',
                    url: '/gmb/google-accounts/{id}/locations/',
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
                                public static gmbGoogleAccountsAccountsWithLocationsRetrieve(): CancelablePromise<GMBAccountsListResponse> {
                                    return __request(OpenAPI, {
                                        method: 'GET',
                                        url: '/gmb/google-accounts/accounts_with_locations/',
                                    });
                                }
                                /**
                                 * List all enabled locations across all credentials.
                                 * @param page A page number within the paginated result set.
                                 * @returns PaginatedLocationList
                                 * @throws ApiError
                                 */
                                public static gmbLocationsList(
                                    page?: number,
                                ): CancelablePromise<PaginatedLocationList> {
                                    return __request(OpenAPI, {
                                        method: 'GET',
                                        url: '/gmb/locations/',
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
                                public static gmbLocationsToggleWeeklyPostsCreate(
                                    id: string,
                                    requestBody: ToggleWeeklyPostsRequestRequest,
                                ): CancelablePromise<ToggleWeeklyPostsResponse> {
                                    return __request(OpenAPI, {
                                        method: 'POST',
                                        url: '/gmb/locations/{id}/toggle-weekly-posts/',
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
                                    public static gmbLocationsUpdateDetailsPartialUpdate(
                                        id: string,
                                        requestBody?: PatchedLocationRequest,
                                    ): CancelablePromise<Location> {
                                        return __request(OpenAPI, {
                                            method: 'PATCH',
                                            url: '/gmb/locations/{id}/update_details/',
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
                                    public static gmbPostsList(
                                        page?: number,
                                    ): CancelablePromise<PaginatedGMBPostList> {
                                        return __request(OpenAPI, {
                                            method: 'GET',
                                            url: '/gmb/posts/',
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
                                    public static gmbPostsCreate(
                                        requestBody?: GMBPostRequest,
                                    ): CancelablePromise<GMBPost> {
                                        return __request(OpenAPI, {
                                            method: 'POST',
                                            url: '/gmb/posts/',
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
                                    public static gmbPostsRetrieve(
                                        id: string,
                                    ): CancelablePromise<GMBPost> {
                                        return __request(OpenAPI, {
                                            method: 'GET',
                                            url: '/gmb/posts/{id}/',
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
                                    public static gmbPostsUpdate(
                                        id: string,
                                        requestBody?: GMBPostRequest,
                                    ): CancelablePromise<GMBPost> {
                                        return __request(OpenAPI, {
                                            method: 'PUT',
                                            url: '/gmb/posts/{id}/',
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
                                    public static gmbPostsPartialUpdate(
                                        id: string,
                                        requestBody?: PatchedGMBPostRequest,
                                    ): CancelablePromise<GMBPost> {
                                        return __request(OpenAPI, {
                                            method: 'PATCH',
                                            url: '/gmb/posts/{id}/',
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
                                    public static gmbPostsDestroy(
                                        id: string,
                                    ): CancelablePromise<void> {
                                        return __request(OpenAPI, {
                                            method: 'DELETE',
                                            url: '/gmb/posts/{id}/',
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
                                    public static gmbPostsAutosaveCreate(
                                        id: string,
                                        requestBody?: GMBPostRequest,
                                    ): CancelablePromise<GMBPost> {
                                        return __request(OpenAPI, {
                                            method: 'POST',
                                            url: '/gmb/posts/{id}/autosave/',
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
                                            public static gmbPostsGenerateContentForPostCreate(
                                                id: string,
                                                requestBody?: GMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/posts/{id}/generate_content_for_post/',
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
                                            public static gmbPostsPublishCreate(
                                                id: string,
                                                requestBody?: GMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/posts/{id}/publish/',
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
                                            public static gmbPostsQueueCreate(
                                                id: string,
                                                requestBody?: GMBPostRequest,
                                            ): CancelablePromise<GMBPost> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/posts/{id}/queue/',
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
                                            public static gmbPostsSyncCreate(): CancelablePromise<any> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/posts/sync/',
                                                });
                                            }
                                            /**
                                             * Refresh access tokens for merchant credentials.
                                             * @returns any No response body
                                             * @throws ApiError
                                             */
                                            public static gmbRefreshTokenCreate(): CancelablePromise<any> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/refresh_token/',
                                                });
                                            }
                                            /**
                                             * Override list to support both paginated and non-paginated responses
                                             * @param page A page number within the paginated result set.
                                             * @param pageSize Number of results to return per page.
                                             * @returns PaginatedReviewList
                                             * @throws ApiError
                                             */
                                            public static gmbReviewsList(
                                                page?: number,
                                                pageSize?: number,
                                            ): CancelablePromise<PaginatedReviewList> {
                                                return __request(OpenAPI, {
                                                    method: 'GET',
                                                    url: '/gmb/reviews/',
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
                                            public static gmbReviewsCreate(
                                                requestBody: ReviewRequest,
                                            ): CancelablePromise<Review> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/reviews/',
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
                                            public static gmbReviewsRetrieve(
                                                id: string,
                                            ): CancelablePromise<Review> {
                                                return __request(OpenAPI, {
                                                    method: 'GET',
                                                    url: '/gmb/reviews/{id}/',
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
                                            public static gmbReviewsUpdate(
                                                id: string,
                                                requestBody: ReviewRequest,
                                            ): CancelablePromise<Review> {
                                                return __request(OpenAPI, {
                                                    method: 'PUT',
                                                    url: '/gmb/reviews/{id}/',
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
                                            public static gmbReviewsPartialUpdate(
                                                id: string,
                                                requestBody?: PatchedReviewRequest,
                                            ): CancelablePromise<Review> {
                                                return __request(OpenAPI, {
                                                    method: 'PATCH',
                                                    url: '/gmb/reviews/{id}/',
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
                                            public static gmbReviewsDestroy(
                                                id: string,
                                            ): CancelablePromise<void> {
                                                return __request(OpenAPI, {
                                                    method: 'DELETE',
                                                    url: '/gmb/reviews/{id}/',
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
                                            public static gmbReviewsDeleteReplyDestroy(
                                                id: string,
                                            ): CancelablePromise<DeleteReplyResponse> {
                                                return __request(OpenAPI, {
                                                    method: 'DELETE',
                                                    url: '/gmb/reviews/{id}/delete_reply/',
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
                                            public static gmbReviewsReplyCreate(
                                                id: string,
                                                requestBody: ReplyRequestRequest,
                                            ): CancelablePromise<ReplyResponse> {
                                                return __request(OpenAPI, {
                                                    method: 'POST',
                                                    url: '/gmb/reviews/{id}/reply/',
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
                                                        public static gmbReviewsSaveDraftCreate(
                                                            id: string,
                                                            requestBody: ReviewRequest,
                                                        ): CancelablePromise<Review> {
                                                            return __request(OpenAPI, {
                                                                method: 'POST',
                                                                url: '/gmb/reviews/{id}/save_draft/',
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
                                                        public static gmbReviewsAiGenerateCreate(
                                                            requestBody: AIGenerationRequestRequest,
                                                        ): CancelablePromise<AIGenerationResponse> {
                                                            return __request(OpenAPI, {
                                                                method: 'POST',
                                                                url: '/gmb/reviews/ai_generate/',
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
                                                        public static gmbReviewsBulkPublishDraftsCreate(
                                                            requestBody: BulkPublishRequestRequest,
                                                        ): CancelablePromise<BulkPublishResponse> {
                                                            return __request(OpenAPI, {
                                                                method: 'POST',
                                                                url: '/gmb/reviews/bulk_publish_drafts/',
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
                                                        public static gmbReviewsBulkStatusRetrieve(): CancelablePromise<BulkStatusResponse> {
                                                            return __request(OpenAPI, {
                                                                method: 'GET',
                                                                url: '/gmb/reviews/bulk_status/',
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
                                                            public static gmbReviewsSyncCreate(): CancelablePromise<SyncResponse> {
                                                                return __request(OpenAPI, {
                                                                    method: 'POST',
                                                                    url: '/gmb/reviews/sync/',
                                                                });
                                                            }
                                                            /**
                                                             * Check AI generation task status
                                                             * Check the status of a background AI generation task
                                                             * @param taskId
                                                             * @returns Review
                                                             * @throws ApiError
                                                             */
                                                            public static gmbReviewsTaskStatusRetrieve(
                                                                taskId: string,
                                                            ): CancelablePromise<Review> {
                                                                return __request(OpenAPI, {
                                                                    method: 'GET',
                                                                    url: '/gmb/reviews/task_status/{taskId}/',
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
                                                            public static gmbStatusRetrieve(): CancelablePromise<any> {
                                                                return __request(OpenAPI, {
                                                                    method: 'GET',
                                                                    url: '/gmb/status/',
                                                                });
                                                            }
                                                        }
