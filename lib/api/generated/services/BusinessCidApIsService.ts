/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FindBusinessDataByCIDResponse } from '../models/FindBusinessDataByCIDResponse';
import type { FindCitationsByCIDResponse } from '../models/FindCitationsByCIDResponse';
import type { FindScansByCIDResponse } from '../models/FindScansByCIDResponse';
import type { UnifiedBusiness } from '../models/UnifiedBusiness';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusinessCidApIsService {
    /**
     * Find all business data by Google Maps CID
     * Find all business data (both scans and citations) using a Google Maps CID URL
     * @param mapsUrl Google Maps URL containing CID (e.g., https://maps.google.com/maps?cid=12345678901234567890)
     * @returns FindBusinessDataByCIDResponse
     * @throws ApiError
     */
    public static businessApiBusinessesFindBusinessDataByCidRetrieve(
        mapsUrl: string,
    ): CancelablePromise<FindBusinessDataByCIDResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/find_business_data_by_cid/',
            query: {
                'maps_url': mapsUrl,
            },
        });
    }
    /**
     * Find citations by Google Maps CID
     * Find all citations for a business using a Google Maps CID URL
     * @param mapsUrl Google Maps URL containing CID (e.g., https://maps.google.com/maps?cid=12345678901234567890)
     * @returns FindCitationsByCIDResponse
     * @throws ApiError
     */
    public static businessApiBusinessesFindCitationsByCidRetrieve(
        mapsUrl: string,
    ): CancelablePromise<FindCitationsByCIDResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/find_citations_by_cid/',
            query: {
                'maps_url': mapsUrl,
            },
        });
    }
    /**
     * Find scans by Google Maps CID
     * Find all ranktracker scans for a business using a Google Maps CID URL
     * @param mapsUrl Google Maps URL containing CID (e.g., https://maps.google.com/maps?cid=12345678901234567890)
     * @returns FindScansByCIDResponse
     * @throws ApiError
     */
    public static businessApiBusinessesFindScansByCidRetrieve(
        mapsUrl: string,
    ): CancelablePromise<FindScansByCIDResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/find_scans_by_cid/',
            query: {
                'maps_url': mapsUrl,
            },
        });
    }
    /**
     * Get business by Google Maps URL
     * Retrieve business information using a Google Maps URL containing CID
     * @param mapsUrl Google Maps URL containing CID (e.g., https://maps.google.com/maps?cid=12345678901234567890)
     * @returns UnifiedBusiness
     * @throws ApiError
     */
    public static businessApiBusinessesGetByMapsUrlRetrieve(
        mapsUrl: string,
    ): CancelablePromise<UnifiedBusiness> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/business/api/businesses/get_by_maps_url/',
            query: {
                'maps_url': mapsUrl,
            },
        });
    }
}
