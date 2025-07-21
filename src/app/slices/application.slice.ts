import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationPayload, ApplicationRequest } from "../types/application.type";

interface ApplicationState {
    data: ApplicationPayload | null,
    loading: boolean,
    error: string | null
}

const initialState: ApplicationState = {
    data: null,
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
        }
    }
})

export const {
    getApplications, getApplicationsSuccess, getApplicationsError, getApplicationsComplete
} = applicationSlice.actions

export const applicationReducer = applicationSlice.reducer