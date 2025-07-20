import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, UserPayload, UserRequestUpdate } from '../types/user.type';

interface UserState {
    data: UserInfo | null,
    loading: boolean,
    error: string | null,
    status?: number
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
    status: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentUser(state) {
            state.loading = true;
            state.error = null;
        },
        getCurrentUserSuccess(state, action: PayloadAction<UserInfo>) {
            state.data = action.payload;
        },
        getCurrentUserError(state, action) {
            state.error = action.payload;
        },
        getCurrentUserComplete(state) {
            state.loading = false;
        },

        // Update User
        updateUser(state, action: PayloadAction<UserRequestUpdate | null | undefined>) {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess(state, action: PayloadAction<UserPayload>) {
            state.data = action.payload.user;
            state.status = action.payload.status
        },
        updateUserError(state, action) {
            state.error = action.payload;
        },
        updateUserComplete(state) {
            state.loading = false;
        },
        resetUpdateUserState(state, action: PayloadAction<UserInfo | null>) {
            state.data = action.payload;
            state.error = null;
            state.status = undefined;
            state.loading = false;
        }
    }
})

export const {
    getCurrentUser, getCurrentUserSuccess, getCurrentUserError, getCurrentUserComplete,
    updateUser, updateUserSuccess, updateUserError, updateUserComplete, resetUpdateUserState
} = userSlice.actions;
export const userReducer = userSlice.reducer;