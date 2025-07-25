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
    job_id?: number | string; // Allow string for input field, convert before sending
    user_id?: number | string; // Allow string for input field, convert before sending
    action?: JobLogAction | string; // Allow string for input field
}

export interface JobLogDetail {
    id: number;
    job_id: number;
    user_id: number;
    action: JobLogAction;
    details: string;
    created_at: string;
    user_name: string;
    job_title: string;
}