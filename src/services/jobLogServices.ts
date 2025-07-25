import axiosCustom from "../api/axiosCustom";
import { FetchJobLogsParams, PaginatedJobLogsResponse } from "../app/types/jobLogTypes";
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
    if (params.job_id && String(params.job_id).trim() !== '') cleanParams.job_id = params.job_id;
    if (params.user_id && String(params.user_id).trim() !== '') cleanParams.user_id = params.user_id;
    if (params.action && String(params.action).trim() !== '') cleanParams.action = params.action;

    try {
        const response = await axiosCustom.get('/job-logs', {params: cleanParams});
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch job logs';
        throw new Error(`Error fetching job logs: ${errorMessage}`);
    }
};

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