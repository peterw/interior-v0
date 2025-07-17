/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArticlesService {
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static articlesApiCreditBalanceRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/articles/api/credit/balance/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static articlesApiCreditDeductCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/articles/api/credit/deduct/',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static articlesCreditRedirectRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/articles/credit/redirect/',
        });
    }
}
