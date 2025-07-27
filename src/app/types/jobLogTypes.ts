import { JobLogAction } from "../../enums/JobLogAction";

export interface JobLogSummary {
    id: number;
    jobId: number;
    action: JobLogAction;
    createdAt: string; // ISO date string
    userName: string;
    jobTitle: string;
}

export interface PaginationMeta {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface PaginatedJobLogsResponse {
    data: JobLogSummary[];
    meta: PaginationMeta;
}

export interface FetchJobLogsParams {
    page?: number;
    limit?: number;
    jobId?: number | string; // Allow string for input field, convert before sending
    userId?: number | string; // Allow string for input field, convert before sending
    action?: JobLogAction | string; // Allow string for input field
}

export interface JobLogDetail {
    id: number;
    jobId: number;
    userId: number;
    action: JobLogAction;
    details: string;
    createdAt: string;
    userName: string;
    jobTitle: string;
}