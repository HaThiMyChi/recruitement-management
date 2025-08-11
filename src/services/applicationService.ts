import axios from "axios";
import { FetchApplicationsParams, PaginatedApplicationsResponse } from "../types/applicationTypes";
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