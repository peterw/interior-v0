/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Scan } from './Scan';
/**
 * Serializer for scan data in CID responses.
 */
export type ScanData = {
    /**
     * Number of scans found
     */
    count: number;
    /**
     * List of scan objects with full details
     */
    data: Array<Scan>;
    /**
     * Error message if scans could not be retrieved
     */
    error?: string;
};

