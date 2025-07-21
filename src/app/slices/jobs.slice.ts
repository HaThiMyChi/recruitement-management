import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../../models/Job";
import { ListJobs } from "../types/job.type";

interface JobState {
    data: Job[],
    loading: boolean,
    error: string | null
}

const initialState: JobState = {
    data: [],
    loading: false,
    error: null
}

export const JobSlice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        GetListJobs(state) {
            state.loading = true;
            state.error = null;
        },
        GetListJobsSuccess(state, action: PayloadAction<ListJobs>) {
            state.data = action.payload.jobs;
        },
        GetListJobsError(state, action) {
            state.error = action.payload;
        },
        GetListJobsComplete(state) {
            state.loading = false;
        },

        // get list job by id
        GetListJobByID(state) {
            state.loading = true;
            state.error = null;
        },
        GetListJobByIDSuccess(state, action: PayloadAction<ListJobs>) {
            state.data = action.payload.jobs;
        },
        GetListJobByIDError(state, action) {
            state.error = action.payload;
        },
        GetListJobByIDComplete(state) {
            state.loading = false;
        },
        GetListJobByStatus(state, action: PayloadAction<ListJobs>) {
            state.data = action.payload.jobs;
            state.loading = true;
            state.error = null;
        },
        DeleteJob(state, action: PayloadAction<ListJobs>) {
            state.data = action.payload.jobs;
            state.loading = true;
            state.error = null;
        }
    }
})

export const {
    GetListJobs, GetListJobsSuccess, GetListJobsError, GetListJobsComplete, GetListJobByID, GetListJobByStatus, DeleteJob
} = JobSlice.actions;

export const jobsReducer = JobSlice.reducer;