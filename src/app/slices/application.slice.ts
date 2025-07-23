import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationPayload, ApplicationRequest } from "../types/application.type";
import { JobApplication } from "../../models/JobApplication";

interface ApplicationState {
    data: ApplicationPayload | null,
    application: JobApplication | null,
    loading: boolean,
    error: string | null
}

const initialState: ApplicationState = {
    data: null,
    application: null,
    loading: false,
    error: null
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        getApplications(state, action: PayloadAction<ApplicationRequest>) {
            state.loading = true
            state.error = null
        },
        getApplicationsSuccess(state, action: PayloadAction<ApplicationPayload>) {
            state.data = action.payload
            state.error = null
        },
        getApplicationsError(state, action) {
            state.error = action.payload
        },
        getApplicationsComplete(state) {
            state.loading = false
        },

        getApplicationById(state, action: PayloadAction<number>) {
            state.loading = true
            state.error = null
        },
        getApplicationByIdSuccess(state, action: PayloadAction<JobApplication>) {
            state.application = action.payload
        },
        getApplicationByIdError(state, action) {
            state.error = action.payload
        },
        getApplicationByIdComplete(state) {
            state.loading = false
        }
    }
})

export const {
    getApplications, getApplicationsSuccess, getApplicationsError, getApplicationsComplete,
    getApplicationById, getApplicationByIdSuccess, getApplicationByIdError, getApplicationByIdComplete
} = applicationSlice.actions

export const applicationReducer = applicationSlice.reducer