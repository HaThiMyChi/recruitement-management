import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../../models/Job";

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
        GetListJobsSuccess(state, action: PayloadAction<Job[]>) {
            state.data = action.payload;
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
        GetListJobByIDSuccess(state, action: PayloadAction<Job[]>) {
            state.data = action.payload;
        },
        GetListJobByIDError(state, action) {
            state.error = action.payload;
        },
        GetListJobByIDComplete(state) {
            state.loading = false;
        },
        GetListJobByStatus(state, action: PayloadAction<Job[]>) {
            state.data = action.payload;
            state.loading = true;
            state.error = null;
        },
        DeleteJob(state, action: PayloadAction<Job[]>) {
            state.data = action.payload;
            state.loading = true;
            state.error = null;
        }
    }
})

export const {
    GetListJobs, GetListJobsSuccess, GetListJobsError, GetListJobsComplete, GetListJobByID, GetListJobByStatus, DeleteJob
} = JobSlice.actions;

export const jobsReducer = JobSlice.reducer;