import { Job } from "../../models/Job"

export interface JobListResponse {
    data: Job[],
    meta: {
        currentPage: number
        itemsPerPage: number
        totalItems: number
        totalPages: number
    }
}

export interface RequestFilter {
    id?: number
    jobType?: string
    status?: string
}