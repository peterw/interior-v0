/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Detailed serializer for lead results including raw data
 */
export type LeadResultDetail = {
    readonly id: string;
    /**
     * Contact person's full name
     */
    full_name?: string | null;
    /**
     * Company/Business name
     */
    company?: string;
    /**
     * Contact person's job title
     */
    job_title?: string | null;
    /**
     * Business address/location
     */
    location?: string;
    phone?: string | null;
    /**
     * Company website URL
     */
    url?: string;
    email?: string | null;
    /**
     * Business description
     */
    description?: string | null;
    business_name: string;
    address?: string | null;
    website?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    category?: string | null;
    rating?: string | null;
    reviews_count?: number;
    business_hours?: null;
    /**
     * Complete raw response from DataForSEO API
     */
    raw_data?: any;
    cid?: string;
    feature_id?: string;
    readonly created_at: string;
};

