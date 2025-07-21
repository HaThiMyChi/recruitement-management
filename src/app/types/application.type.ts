import { JobApplication } from "../../models/JobApplication"

export interface ApplicationRequest {
    page: number,
    limit: number
}

export interface ApplicationPayload {
    data: JobApplication[],
    meta: {
        totalItems: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number
    }
}