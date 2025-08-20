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

interface JobByIdState {
    data: Job | null;
    loading: boolean;
    error: string | null;
}

const initialJobByIdState: JobByIdState = {
    data: null,
    loading: false,
    error: null
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
    }
});

export const jobByIdSlice = createSlice({
    name: "job",
    initialState: initialJobByIdState,
    reducers: {
        // get job by id
        GetJobById(state, action: PayloadAction<number | undefined | null>) {
            state.loading = true;
            state.error = null;
        },
        GetJobByIdSuccess(state, action: PayloadAction<Job>) {
            state.data = action.payload;
        },
        GetJobByIdError(state, action) {
            state.error = action.payload;
        },
        GetJobByIdComplete(state) {
            state.loading = false;
        }
    }
});

export const {
    GetListJobs, GetListJobsSuccess, GetListJobsError, GetListJobsComplete, ClearFilters,
} = JobSlice.actions;

export const {
    GetJobById, GetJobByIdSuccess, GetJobByIdError, GetJobByIdComplete
} = jobByIdSlice.actions;

export const jobsReducer = JobSlice.reducer;
export const jobByIdReducer = jobByIdSlice.reducer;