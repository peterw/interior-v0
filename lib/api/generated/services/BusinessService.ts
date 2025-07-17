/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessLocation } from '../models/BusinessLocation';
import type { BusinessLocationRequest } from '../models/BusinessLocationRequest';
import type { PaginatedBusinessLocationList } from '../models/PaginatedBusinessLocationList';
import type { PaginatedUnifiedBusinessList } from '../models/PaginatedUnifiedBusinessList';
import type { PatchedBusinessLocationRequest } from '../models/PatchedBusinessLocationRequest';
import type { PatchedUnifiedBusinessRequest } from '../models/PatchedUnifiedBusinessRequest';
import type { UnifiedBusiness } from '../models/UnifiedBusiness';
import type { UnifiedBusinessRequest } from '../models/UnifiedBusinessRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusinessService {
    /**
     * Mixin that limits queryset to the authenticated user and sets user on create.
     * @param page A page number within the paginated result set.
     * @returns PaginatedUnifiedBusinessList
     * @throws ApiError
     */
    public static businessApiBusinessesList(
        page?: number,
    ): CancelablePromise<PaginatedUnifiedBusinessList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Mixin that limits queryset to the authenticated user and sets user on create.
     * @param requestBody
     * @returns UnifiedBusiness
     * @throws ApiError
     */
    public static businessApiBusinessesCreate(
        requestBody?: UnifiedBusinessRequest,
    ): CancelablePromise<UnifiedBusiness> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/business/api/businesses/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mixin that limits queryset to the authenticated user and sets user on create.
     * @param uuid
     * @returns UnifiedBusiness
     * @throws ApiError
     */
    public static businessApiBusinessesRetrieve(
        uuid: string,
    ): CancelablePromise<UnifiedBusiness> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Mixin that limits queryset to the authenticated user and sets user on create.
     * @param uuid
     * @param requestBody
     * @returns UnifiedBusiness
     * @throws ApiError
     */
    public static businessApiBusinessesUpdate(
        uuid: string,
        requestBody?: UnifiedBusinessRequest,
    ): CancelablePromise<UnifiedBusiness> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/business/api/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mixin that limits queryset to the authenticated user and sets user on create.
     * @param uuid
     * @param requestBody
     * @returns UnifiedBusiness
     * @throws ApiError
     */
    public static businessApiBusinessesPartialUpdate(
        uuid: string,
        requestBody?: PatchedUnifiedBusinessRequest,
    ): CancelablePromise<UnifiedBusiness> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/business/api/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mixin that limits queryset to the authenticated user and sets user on create.
     * @param uuid
     * @returns void
     * @throws ApiError
     */
    public static businessApiBusinessesDestroy(
        uuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/business/api/businesses/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Get business statistics for the user.
     * @returns UnifiedBusiness
     * @throws ApiError
     */
    public static businessApiBusinessesStatsRetrieve(): CancelablePromise<UnifiedBusiness> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/stats/',
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @returns PaginatedBusinessLocationList
     * @throws ApiError
     */
    public static businessApiLocationsList(
        page?: number,
    ): CancelablePromise<PaginatedBusinessLocationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/locations/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @param requestBody
     * @returns BusinessLocation
     * @throws ApiError
     */
    public static businessApiLocationsCreate(
        requestBody?: BusinessLocationRequest,
    ): CancelablePromise<BusinessLocation> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/business/api/locations/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @returns BusinessLocation
     * @throws ApiError
     */
    public static businessApiLocationsRetrieve(
        uuid: string,
    ): CancelablePromise<BusinessLocation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/locations/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * @param uuid
     * @param requestBody
     * @returns BusinessLocation
     * @throws ApiError
     */
    public static businessApiLocationsUpdate(
        uuid: string,
        requestBody?: BusinessLocationRequest,
    ): CancelablePromise<BusinessLocation> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/business/api/locations/{uuid}/',
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
     * @returns BusinessLocation
     * @throws ApiError
     */
    public static businessApiLocationsPartialUpdate(
        uuid: string,
        requestBody?: PatchedBusinessLocationRequest,
    ): CancelablePromise<BusinessLocation> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/business/api/locations/{uuid}/',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @returns void
     * @throws ApiError
     */
    public static businessApiLocationsDestroy(
        uuid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/business/api/locations/{uuid}/',
            path: {
                'uuid': uuid,
            },
        });
    }
}
