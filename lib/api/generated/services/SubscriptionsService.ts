/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrentSubscriptionResponse } from '../models/CurrentSubscriptionResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionsService {
    /**
     * Return the authenticated user's current subscription plan for RankTracker, Citations, and LocalLeads products as well as checkout URLs for every other active price in the same Stripe products.
     * @returns CurrentSubscriptionResponse
     * @throws ApiError
     */
    public static currentSubscription(): CancelablePromise<CurrentSubscriptionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/subscriptions/current/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static activeProductsList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscriptions/api/active-products/',
        });
    }
    /**
     * Retrieve a 20% off promotion code that is available to the authenticated user **every other week starting with the week they signed up**.  If an active promotion code already exists in the current window it is returned instead of creating a new one.  Optional `product_ids` query-string parameter can be provided (comma-separated list of Stripe product IDs) to limit the coupon to specific products.
     * @returns any No response body
     * @throws ApiError
     */
    public static biweeklyCoupon(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscriptions/api/biweekly-coupon/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static createPortalSession(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/subscriptions/stripe/api/create-portal-session/',
        });
    }
}
