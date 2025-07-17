/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormatEnum } from './FormatEnum';
/**
 * Serializer for exporting lead searches to CSV
 */
export type LeadSearchExportRequest = {
    /**
     * List of search IDs to export (maximum 50)
     */
    search_ids: Array<string>;
    /**
     * Whether to include column headers in the export
     */
    include_headers?: boolean;
    /**
     * Export format (csv or xlsx)
     *
     * * `csv` - csv
     * * `xlsx` - xlsx
     */
    format?: FormatEnum;
};

