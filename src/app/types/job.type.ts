import { Job } from "../../models/Job"

export interface JobListResponse {
    data: Job[];
    meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface RequestFilter {
    term?: string;
    page?: number;
    limit?: number;
    q?: string;
    status?: string;
    jobType?: string;
    location?: string;
    minSalary?: number | string;
    maxSalary?: number | string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export interface UpdateJobRequest {
    id?: number;
    title?: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    jobType?: string;
    minSalary?: number;
    maxSalary?: number;
    expiredAt?: string;
}

export interface RegistJobRequest {
    title?: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    jobType?: string;
    minSalary?: number;
    maxSalary?: number;
    expiredAt?: string;
}

export interface JobPayload {
    jobInfo: Job;
    status?: number;
}