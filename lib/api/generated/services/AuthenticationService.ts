/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomUser } from '../models/CustomUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Handle Google authentication
     * @returns any No response body
     * @throws ApiError
     */
    public static usersAuthGoogleCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/auth/google/',
        });
    }
    /**
     * Login user and return tokens
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static usersAuthLoginCreate(
        requestBody?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/auth/login/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Logout user by blacklisting the refresh token
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static usersAuthLogoutCreate(
        requestBody?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/auth/logout/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Verify if user's token is valid and return user data
     * @returns any No response body
     * @throws ApiError
     */
    public static usersAuthMeRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/auth/me/',
        });
    }
    /**
     * Get user metadata
     * @returns any
     * @throws ApiError
     */
    public static usersAuthMetadataRetrieve(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/auth/metadata/',
        });
    }
    /**
     * Register a new user
     * @param requestBody
     * @returns CustomUser
     * @throws ApiError
     */
    public static usersAuthRegisterCreate(
        requestBody?: any,
    ): CancelablePromise<CustomUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/auth/register/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update user metadata
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static usersAuthUpdateMetadataCreate(
        requestBody?: any,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/auth/update_metadata/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
