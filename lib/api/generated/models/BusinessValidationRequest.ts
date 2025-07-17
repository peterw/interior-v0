/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Serializer for validating and creating a business from a URL
 */
export type BusinessValidationRequest = {
    url: string;
    place_id?: string;
    /**
     * Optional JSON object containing business details. If provided, these values will be used instead of scraping from the URL. Keys can include: name, place_id, cid, address, latitude/longitude, variations, business_id
     */
    business_details?: Record<string, any>;
    /**
     * If true, only validates and returns business information without creating a database record
     */
    validation_only?: boolean;
};

