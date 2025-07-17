/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DepartmentEnum } from './DepartmentEnum';
export type Employee = {
    readonly id: number;
    readonly user: number;
    /**
     * Your employee's name.
     */
    name: string;
    department: DepartmentEnum;
    /**
     * Your employee's annual salary.
     */
    salary: number;
    readonly created_at: string;
    readonly updated_at: string;
};

