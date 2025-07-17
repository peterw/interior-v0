/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AggregateEmployeeData } from '../models/AggregateEmployeeData';
import type { Employee } from '../models/Employee';
import type { EmployeeRequest } from '../models/EmployeeRequest';
import type { PaginatedEmployeeList } from '../models/PaginatedEmployeeList';
import type { PatchedEmployeeRequest } from '../models/PatchedEmployeeRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PegasusService {
    /**
     * @returns AggregateEmployeeData
     * @throws ApiError
     */
    public static employeesAggregateData(): CancelablePromise<AggregateEmployeeData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pegasus/employees/api/employee-data/',
        });
    }
    /**
     * @param page A page number within the paginated result set.
     * @returns PaginatedEmployeeList
     * @throws ApiError
     */
    public static employeesList(
        page?: number,
    ): CancelablePromise<PaginatedEmployeeList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pegasus/employees/api/employees/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Employee
     * @throws ApiError
     */
    public static employeesCreate(
        requestBody: EmployeeRequest,
    ): CancelablePromise<Employee> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pegasus/employees/api/employees/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this employee.
     * @returns Employee
     * @throws ApiError
     */
    public static employeesRetrieve(
        id: number,
    ): CancelablePromise<Employee> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pegasus/employees/api/employees/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this employee.
     * @param requestBody
     * @returns Employee
     * @throws ApiError
     */
    public static employeesUpdate(
        id: number,
        requestBody: EmployeeRequest,
    ): CancelablePromise<Employee> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/pegasus/employees/api/employees/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this employee.
     * @param requestBody
     * @returns Employee
     * @throws ApiError
     */
    public static employeesPartialUpdate(
        id: number,
        requestBody?: PatchedEmployeeRequest,
    ): CancelablePromise<Employee> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/pegasus/employees/api/employees/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this employee.
     * @returns void
     * @throws ApiError
     */
    public static employeesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/pegasus/employees/api/employees/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
