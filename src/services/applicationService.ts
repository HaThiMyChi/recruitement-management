import { ApplicationDetail, BulkDeleteResult, FetchApplicationsParams, PaginatedApplicationsResponse, UpdateApplicationStatusParams } from "../types/applicationTypes";
import axiosCustom from "../api/axiosCustom";

/**
 * Fetch applications with optional filtering and pagination
 */
export const fetchApplications = async (
    params: FetchApplicationsParams = {}
): Promise<PaginatedApplicationsResponse> => {
    // Clean up params: remove empty values
    const cleanParams: Record<string, any> = {};

    if (params.page !== undefined) cleanParams.page = params.page;
    if (params.limit !== undefined) cleanParams.limit = params.limit;

    if (params.jobId && String(params.jobId).trim() !== '') {
        cleanParams.jobId = Number(params.jobId);
    }

    if (params.userId && String(params.userId).trim() !== '') {
        cleanParams.userId = Number(params.userId);
    }

    if (params.status && params.status.trim() !== '') {
        cleanParams.status = params.status;
    }

    if (params.fromDate && params.fromDate.trim() !== '') {
        cleanParams.fromDate = params.fromDate;
    }
    
    if (params.toDate && params.toDate.trim() !== '') {
        cleanParams.toDate = params.toDate;
    }

    try {
        const response = await axiosCustom.get('api/applications', {params: cleanParams});
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch applications';
        throw new Error(`Error fetching applications: ${errorMessage}`); 
    }
};

/**
 * Fetch a single application by ID
 */
export const fetchApplicationById = async (id: number): Promise<ApplicationDetail> => {
    try {
        const response = await axiosCustom.get(`api/applications/${id}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch application details';
        throw new Error(`Error fetching application details: ${errorMessage}`);
    }
};

/**
 * Update application status and optiona recruiter notes
 */
export const updateApplicationStatus = async (
    id: number,
    statusData: UpdateApplicationStatusParams
): Promise<ApplicationDetail> => {
    try {
        const response = await axiosCustom.patch(`api/applications/${id}/status`, statusData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message ||  error.message || 'Failed to update application status';
        throw new Error(`Error updating application status: ${errorMessage}`);
    }
}

/**
 * Delete an application (admin only)
 */
export const deleteApplication = async (id: number): Promise<void> => {
    try {
        await axiosCustom.delete(`api/applications/${id}`);
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete application';
        throw new Error (`Error deleting application: ${errorMessage}`);
    }
}

/**
 * Delete multiple applications (admin only)
 */
export const deleteMultipleApplications = async (ids: number[]): Promise<BulkDeleteResult> => {
    try {
        const response = await axiosCustom.delete('api/applications', {
            data: {ids}
        });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to delete applications';
        throw new Error(`Error deleting applications: ${errorMessage}`) ;
    }
}

