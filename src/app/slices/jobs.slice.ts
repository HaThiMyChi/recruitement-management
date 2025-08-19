import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobListResponse, RequestFilter } from "../types/job.type";
import { Job } from "../../models/Job";
import { stat } from "fs";

interface JobsState {
    jobs: Job[];
    selectedJob: Job | null;
    isLoading: boolean;
    error: any;
    meta: {
        totalItems: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    
    } | null;
    filters: RequestFilter;
}

const initialState: JobsState = {
    jobs: [],
    selectedJob: null,
    isLoading: false,
    error: null,
    meta: null,
    filters: {
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    }
};

export const JobSlice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        GetListJobs: (state, action: PayloadAction<RequestFilter>) => {
            state.isLoading = true;
            state.error = null;
            state.filters = {...state.filters, ...action.payload}
        },
        GetListJobsSuccess: (state, action: PayloadAction<JobListResponse>) => {
           state.jobs = action.payload.data;
           state.meta = action.payload.meta;
           state.error = null;
        },
        GetListJobsError: (state, action: PayloadAction<any>) =>  {
            state.error = action.payload;
        },
        GetListJobsComplete: (state) => {
            state.isLoading = false;
        },

        ClearFilters: (state) => {
            state.filters = {
                page: 1,
                limit: 10,
                sortBy: "createdAt",
                sortOrder: "desc"
            }
        },

        // get list job by id
        FilterJobs(state, action: PayloadAction<RequestFilter | null | undefined>) {
            
        },
        FilterJobsSuccess(state, action: PayloadAction<JobListResponse>) {
           
        },
        FilterJobsError(state, action) {
            
        },
        FilterJobsComplete(state) {
            
        },
        DeleteJob(state, action: PayloadAction<JobListResponse>) {
            
        }
    }
})

export const {
    GetListJobs, GetListJobsSuccess, GetListJobsError, GetListJobsComplete, ClearFilters,
    FilterJobs, FilterJobsComplete, FilterJobsError, FilterJobsSuccess, DeleteJob
} = JobSlice.actions;

export const jobsReducer = JobSlice.reducer;