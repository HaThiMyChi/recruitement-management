import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobListResponse, RequestFilter } from "../types/job.type";

interface JobState {
    data: JobListResponse | null,
    loading: boolean,
    error: string | null
}

const initialState: JobState = {
    data: null,
    loading: false,
    error: null
}

export const JobSlice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        GetListJobs(state, action: PayloadAction<RequestFilter | null | undefined>) {
            state.loading = true;
            state.error = null;
        },
        GetListJobsSuccess(state, action: PayloadAction<JobListResponse>) {
            state.data = action.payload;
        },
        GetListJobsError(state, action) {
            state.error = action.payload;
        },
        GetListJobsComplete(state) {
            state.loading = false;
        },

        // get list job by id
        FilterJobs(state, action: PayloadAction<RequestFilter | null | undefined>) {
            state.loading = true;
            state.error = null;
        },
        FilterJobsSuccess(state, action: PayloadAction<JobListResponse>) {
            state.data = action.payload;
        },
        FilterJobsError(state, action) {
            state.error = action.payload;
        },
        FilterJobsComplete(state) {
            state.loading = false;
        },
        DeleteJob(state, action: PayloadAction<JobListResponse>) {
            state.data = action.payload;
            state.loading = true;
            state.error = null;
        }
    }
})

export const {
    GetListJobs, GetListJobsSuccess, GetListJobsError, GetListJobsComplete, 
    FilterJobs, FilterJobsComplete, FilterJobsError, FilterJobsSuccess, DeleteJob
} = JobSlice.actions;

export const jobsReducer = JobSlice.reducer;