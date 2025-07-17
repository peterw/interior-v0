/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Employee } from './Employee';
export type PaginatedEmployeeList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<Employee>;
};

