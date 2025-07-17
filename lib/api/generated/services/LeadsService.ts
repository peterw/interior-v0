/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailableFiltersResponse } from '../models/AvailableFiltersResponse';
import type { BusinessEstimateResponse } from '../models/BusinessEstimateResponse';
import type { CountriesResponse } from '../models/CountriesResponse';
import type { CreditPackagesResponse } from '../models/CreditPackagesResponse';
import type { DemoLeadsResponse } from '../models/DemoLeadsResponse';
import type { EmailStatsResponse } from '../models/EmailStatsResponse';
import type { FreeEstimateResponse } from '../models/FreeEstimateResponse';
import type { HumanToFiltersRequest } from '../models/HumanToFiltersRequest';
import type { HumanToFiltersResponse } from '../models/HumanToFiltersResponse';
import type { LeadCredit } from '../models/LeadCredit';
import type { LeadCreditCheckout } from '../models/LeadCreditCheckout';
import type { LeadCreditCheckoutRequest } from '../models/LeadCreditCheckoutRequest';
import type { LeadCreditLog } from '../models/LeadCreditLog';
import type { LeadResultDetail } from '../models/LeadResultDetail';
import type { LeadSearch } from '../models/LeadSearch';
import type { LeadSearchCreate } from '../models/LeadSearchCreate';
import type { LeadSearchCreateRequest } from '../models/LeadSearchCreateRequest';
import type { LeadSearchExportRequest } from '../models/LeadSearchExportRequest';
import type { LeadSearchRequest } from '../models/LeadSearchRequest';
import type { LeadSearchStatus } from '../models/LeadSearchStatus';
import type { PaginatedLeadCreditList } from '../models/PaginatedLeadCreditList';
import type { PaginatedLeadCreditLogList } from '../models/PaginatedLeadCreditLogList';
import type { PaginatedLeadResultList } from '../models/PaginatedLeadResultList';
import type { PaginatedLeadSearchList } from '../models/PaginatedLeadSearchList';
import type { PatchedLeadSearchRequest } from '../models/PatchedLeadSearchRequest';
import type { RegionsResponse } from '../models/RegionsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LeadsService {
    /**
     * List available countries
     * Get all countries supported by DataForSEO for lead searches
     * @returns CountriesResponse
     * @throws ApiError
     */
    public static listAvailableCountries(): CancelablePromise<CountriesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/countries/',
        });
    }
    /**
     * List credit usage logs
     * Get a paginated list of credit usage logs for the authenticated user
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedLeadCreditLogList
     * @throws ApiError
     */
    public static listLeadCreditLogs(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedLeadCreditLogList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/credit-logs/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * Get credit log details
     * Get detailed information about a specific credit usage log
     * @param id
     * @returns LeadCreditLog
     * @throws ApiError
     */
    public static getLeadCreditLog(
        id: string,
    ): CancelablePromise<LeadCreditLog> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/credit-logs/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get user lead credits
     * Get the current lead credit information for the authenticated user
     * @param page A page number within the paginated result set.
     * @returns PaginatedLeadCreditList
     * @throws ApiError
     */
    public static getLeadCredits(
        page?: number,
    ): CancelablePromise<PaginatedLeadCreditList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/credits/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * ViewSet for managing lead credits
     * @param id
     * @returns LeadCredit
     * @throws ApiError
     */
    public static leadsApiCreditsRetrieve(
        id: string,
    ): CancelablePromise<LeadCredit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/credits/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Add credits to user account
     * Admin endpoint to add lead credits to a user's account
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static addLeadCredits(
        requestBody?: Record<string, any>,
    ): CancelablePromise<{
        balance?: number;
        total_earned?: number;
        total_spent?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leads/api/credits/add_credits/',
            body: requestBody,
            mediaType: 'type',
        });
    }
    /**
     * Get user lead credit balance
     * Returns the current lead credit balance for the authenticated user
     * @returns LeadCredit
     * @throws ApiError
     */
    public static getUserLeadCreditBalance(): CancelablePromise<LeadCredit> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/credits/balance/',
        });
    }
    /**
     * Create a Stripe Checkout-Session for purchasing lead-credits.
     * @param requestBody
     * @returns LeadCreditCheckout
     * @throws ApiError
     */
    public static createLeadCreditCheckoutSession(
        requestBody: LeadCreditCheckoutRequest,
    ): CancelablePromise<LeadCreditCheckout> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leads/api/credits/checkout/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List available credit packages
     * Get all available lead credit packages with pricing
     * @returns CreditPackagesResponse
     * @throws ApiError
     */
    public static listCreditPackages(): CancelablePromise<CreditPackagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/credits/packages/',
        });
    }
    /**
     * Get demo lead data
     * Returns fake demo lead data for preview purposes
     * @param location Location for demo leads
     * @param count Number of demo leads to return (max 50)
     * @returns DemoLeadsResponse
     * @throws ApiError
     */
    public static getDemoLeads(
        location: string,
        count?: number,
    ): CancelablePromise<DemoLeadsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/demo/',
            query: {
                'count': count,
                'location': location,
            },
        });
    }
    /**
     * Get business count estimate
     * Get estimated number of businesses for search parameters before running a paid search
     * @param location Location to search (e.g., "New York, NY", "Los Angeles, CA")
     * @param query Search query (e.g., "dentist", "lawyer", "restaurant")
     * @param countryCode Country code filter (e.g., "US", "CA")
     * @param region Region/state filter (e.g., "California", "Texas")
     * @returns BusinessEstimateResponse
     * @throws ApiError
     */
    public static getBusinessCountEstimate(
        location: string,
        query: string,
        countryCode?: string,
        region?: string,
    ): CancelablePromise<BusinessEstimateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/estimate/',
            query: {
                'country_code': countryCode,
                'location': location,
                'query': query,
                'region': region,
            },
        });
    }
    /**
     * Get free business count estimate
     * Get estimated business count using cached location data - no API costs
     * @param query Search query (e.g., "dentist", "lawyer", "restaurant")
     * @param countryCode Country code filter (e.g., "US", "CA")
     * @param location Location to search (e.g., "New York, NY", "Los Angeles, CA")
     * @param region Region/state filter (e.g., "California", "Texas")
     * @returns FreeEstimateResponse
     * @throws ApiError
     */
    public static getFreeBusinessEstimate(
        query: string,
        countryCode?: string,
        location?: string,
        region?: string,
    ): CancelablePromise<FreeEstimateResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/estimate/free/',
            query: {
                'country_code': countryCode,
                'location': location,
                'query': query,
                'region': region,
            },
        });
    }
    /**
     * Export previous searches to CSV
     * Export search history and results to CSV format
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static exportPreviousSearches(
        requestBody: LeadSearchExportRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leads/api/export/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get available DataForSEO filters
     * Returns all available filters that can be used for lead searches from a hardcoded JSON file
     * @returns AvailableFiltersResponse
     * @throws ApiError
     */
    public static getAvailableFilters(): CancelablePromise<AvailableFiltersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/filters/',
        });
    }
    /**
     * Convert human query to DataForSEO filters
     * Uses OpenAI to convert natural language queries into structured DataForSEO API filters with extracted location and industry information
     * @param requestBody
     * @returns HumanToFiltersResponse
     * @throws ApiError
     */
    public static convertHumanToFilters(
        requestBody: HumanToFiltersRequest,
    ): CancelablePromise<HumanToFiltersResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leads/api/human-to-filters/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get previous searches
     * Returns all previous lead searches for the authenticated user
     * @returns LeadSearch
     * @throws ApiError
     */
    public static getPreviousSearches(): CancelablePromise<Array<LeadSearch>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/previous-searches/',
        });
    }
    /**
     * List available regions
     * Get all regions/states for a specific country supported by DataForSEO
     * @param countryCode Two-letter country code (e.g., US, CA, GB)
     * @returns RegionsResponse
     * @throws ApiError
     */
    public static listAvailableRegions(
        countryCode: string,
    ): CancelablePromise<RegionsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/regions/',
            query: {
                'country_code': countryCode,
            },
        });
    }
    /**
     * List lead results
     * Get a paginated list of lead results for the authenticated user
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedLeadResultList
     * @throws ApiError
     */
    public static listLeadResults(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedLeadResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/results/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * Get lead result details
     * Get detailed information about a specific lead result
     * @param id
     * @returns LeadResultDetail
     * @throws ApiError
     */
    public static getLeadResult(
        id: string,
    ): CancelablePromise<LeadResultDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/results/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * List lead searches
     * Get a paginated list of lead searches for the authenticated user
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedLeadSearchList
     * @throws ApiError
     */
    public static listLeadSearches(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedLeadSearchList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/searches/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * Create a new lead search
     * Creates a new lead search request. Will convert human query to filters and estimate credit cost.
     * @param requestBody
     * @returns LeadSearchCreate
     * @throws ApiError
     */
    public static createLeadSearch(
        requestBody: LeadSearchCreateRequest,
    ): CancelablePromise<LeadSearchCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/leads/api/searches/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get lead search details
     * Get detailed information about a specific lead search
     * @param id
     * @returns LeadSearch
     * @throws ApiError
     */
    public static getLeadSearch(
        id: string,
    ): CancelablePromise<LeadSearch> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/searches/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * ViewSet for managing lead searches
     * @param id
     * @param requestBody
     * @returns LeadSearch
     * @throws ApiError
     */
    public static leadsApiSearchesUpdate(
        id: string,
        requestBody: LeadSearchRequest,
    ): CancelablePromise<LeadSearch> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/leads/api/searches/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing lead searches
     * @param id
     * @param requestBody
     * @returns LeadSearch
     * @throws ApiError
     */
    public static leadsApiSearchesPartialUpdate(
        id: string,
        requestBody?: PatchedLeadSearchRequest,
    ): CancelablePromise<LeadSearch> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/leads/api/searches/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ViewSet for managing lead searches
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static leadsApiSearchesDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/leads/api/searches/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get email discovery statistics
     * Get email counts by source for this search using credit log analysis
     * @param id
     * @returns EmailStatsResponse
     * @throws ApiError
     */
    public static getSearchEmailStats(
        id: string,
    ): CancelablePromise<EmailStatsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/searches/{id}/email_stats/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Export search results to CSV
     * Download search results as CSV file
     * @param id
     * @returns LeadSearch
     * @throws ApiError
     */
    public static exportSearchCsv(
        id: string,
    ): CancelablePromise<LeadSearch> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/searches/{id}/export_csv/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get search results
     * Get the lead results for a completed search
     * @param id
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedLeadResultList
     * @throws ApiError
     */
    public static getSearchResults(
        id: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedLeadResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/searches/{id}/results/',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * Get search status
     * Get the current status and progress of a lead search
     * @param id
     * @returns LeadSearchStatus
     * @throws ApiError
     */
    public static getSearchStatus(
        id: string,
    ): CancelablePromise<LeadSearchStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/leads/api/searches/{id}/status/',
            path: {
                'id': id,
            },
        });
    }
}
