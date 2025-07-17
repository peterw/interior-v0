/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartmentEnum } from './DepartmentEnum';
export type PatchedEmployeeRequest = {
    /**
     * Your employee's name.
     */
    name?: string;
    department?: DepartmentEnum;
    /**
     * Your employee's annual salary.
     */
    salary?: number;
};

