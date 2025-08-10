import { User } from "../../models/User"

export interface AdminRequest {
    page: number,
    limit: number,
    role: string,
    status: string,
    sortBy: string,
    sortOrder: string
}

export interface AdminPayload {
    data: User[],
    meta: {
        totalItems: number,
        itemsPerPage: number,
        totalPages: number,
        currentPage: number

    }
}

export interface MessageResponse {
    message: string
}