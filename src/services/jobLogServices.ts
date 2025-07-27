import axiosCustom from "../api/axiosCustom";
import { FetchJobLogsParams, JobLogDetail, PaginatedJobLogsResponse } from "../app/types/jobLogTypes";
import { UserRole } from "../enums/UserRole";
import { getCurrentUserRole } from "./authService";

export const fetchJobLogs = async (
    params: FetchJobLogsParams = {}
): Promise<PaginatedJobLogsResponse> => {
    // Clean up params: remove empty strings, convert to number where needed

    const userRole = getCurrentUserRole();

    // Block candidates from acessing job logs
    if (userRole === UserRole.CANDIDATE) {
       throw new Error('Access denied: Candidates cannot view job logs') ;
    }

    const cleanParams: Record<string, string | number> = {};
    if (params.page) cleanParams.page = params.page;
    if (params.limit) cleanParams.limit = params.limit;
    if (params.jobId && String(params.jobId).trim() !== '') cleanParams.jobId = params.jobId;
    if (params.userId && String(params.userId).trim() !== '') cleanParams.userId = params.userId;
    if (params.action && String(params.action).trim() !== '') cleanParams.action = params.action;

    try {
        const response = await axiosCustom.get('/job-logs', {params: cleanParams});
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch job logs';
        throw new Error(`Error fetching job logs: ${errorMessage}`);
    }
};

export const fetchJobLogById = async(id: number): Promise<JobLogDetail> => {
    try {
        const response = await axiosCustom.get(`/job-logs/${id}`);
        return response.data;
    } catch(error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch job log details';
        throw new Error(`Error fetching job log details: ${errorMessage}`);
    }
}

/**
 * Delete a single job log by ID
 */

export const deleteJobLog = async(id: number): Promise<void> => {
    try {
        await axiosCustom.delete(`/job-logs/${id}`);
    } catch(error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Unauthorized: You need admin privileges to delete job logs');
            }
            if (error.response.status === 403) {
                throw new Error('Forbidden: You do not have permission to delete job logs');
            }
            const errorMessage = error.response.data?.message || `Failed to delete job log: ${error.response.statusText}`;
            throw new Error(errorMessage);
        }
        throw new Error(`Error deleting job log: ${error.message || 'An unexpected error occurred'}`);
    }
};

export const deleteMultipleJobLogs = async (ids: number[]): Promise<{deleted: number, failed: number[] }> => {
    try {
        const response = await axiosCustom.delete('/job-logs', {
            data: {ids} // For DELETE requests with a body, use 'data' property
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Unauthorized: You need admin privileges to delete job logs');
            }
            if (error.response.status === 403) {
                throw new Error('Forbidden: You do not have permission to delete job logs');
            }
            const errorMessage = error.response.data?.message || `Failed to delete job logs: ${error.response.statusText}`;
            throw new Error(errorMessage);
        }
        throw new Error(`Error deleting job logs: ${error.message || 'An unexpected error occurred'}`);

    }
};