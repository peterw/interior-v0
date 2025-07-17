/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for validating and creating a business from a URL
 */
export type BusinessValidation = {
    url: string;
    place_id?: string;
    /**
     * If true, only validates and returns business information without creating a database record
     */
    validation_only?: boolean;
};

