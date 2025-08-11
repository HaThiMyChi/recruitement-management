import { ApplicationStatus } from "../enums/ApplicationStatus";

export interface ApplicationSummary {
    id: number;
    jobId: number;
    jobTitle: string;
    userId: number;
    candidateName: string;
    status: ApplicationStatus;
    createdAt: string;
    updatedAt: string
}

export interface ApplicationDetail {
    id: number;
    jobId: number;
    jobTitle: string;
    userId: number;
    candidateName: string;
    status: ApplicationStatus;
    resumeUrl: string;
    coverLetter: string;
    answers: ApplicationAnswer[];
    candidateNote: string;
    recruiterNotes: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApplicationAnswer {
    questionId: number;
    question: string;
    answer: string;
}

export interface PaginationMeta {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface PaginatedApplicationsResponse {
    data: ApplicationSummary[];
    meta: PaginationMeta;
}

export interface FetchApplicationsParams {
    page?: number;
    limit?: number;
    jobId?: number | string;
    userId?: number | string;
    status?: string;
    fromDate?: string;
    toDate?: string;
}

export interface UpdateApplicationStatusParams {
    status: ApplicationStatus;
    recruiterNotes?: string;
}

export interface BulkDeleteResult {
    deleted: number;
    failed: number[];
}