import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminPayload, AdminRequest, MessageResponse } from "../types/admin.type";
import { error } from "console";
import { User } from "../../models/User";

interface AdminState {
    data: AdminPayload,
    loading: boolean,
    error: string,
    status?: number,
    message?: MessageResponse | null
}

const initialState: AdminState = {
    data: {
        data: [],
        meta: {
            totalItems: 0,
            itemsPerPage: 0,
            totalPages: 0,
            currentPage: 0
        }
    },
    loading: false,
    error: '',
    status: undefined
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        getUsers(state, action: PayloadAction<AdminRequest>) {
            state.loading = true;
            state.error =  '';
        },
        getUsersSuccess(state, action: PayloadAction<AdminPayload>) {
            state.data = action.payload;

        },
        getUsersError(state, action) {
            state.error = action.payload;
        },
        getUsersComplete(state) {
            state.loading = false;
        },

        actionUser(state, action: PayloadAction<User>) {
            state.loading = true;
            state.error = '';
        },
        actionUserSuccess(state, action: PayloadAction<MessageResponse>) {
            if (state) {
                state.message = action.payload;
            }
        },
        actionUserError(state, action) {
            state.error = action.payload;
        },
        actionUserComplete(state) {
            state.loading = false
        },
        resetMessage(state) {
            state.message = null;
        }
    }
})

export const {
    getUsers, getUsersSuccess, getUsersError, getUsersComplete,
    actionUser, actionUserSuccess, actionUserError, actionUserComplete, resetMessage
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;