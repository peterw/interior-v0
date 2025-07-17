/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FingerprintService {
    /**
     * Update the fingerprint visitor ID for the authenticated user
     * @returns any No response body
     * @throws ApiError
     */
    public static usersFingerprintSetCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/fingerprint/set/',
        });
    }
    /**
     * Get the fingerprint data for the authenticated user based on the request ID
     * @returns any No response body
     * @throws ApiError
     */
    public static usersFingerprintVisitsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/fingerprint/visits/',
        });
    }
}
