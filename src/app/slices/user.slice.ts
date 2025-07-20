import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/UserInfo";

interface UserState {
    data: UserInfo | null,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'getCurrentUser',
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
        }
    }
})

export const {getCurrentUser, getCurrentUserSuccess, getCurrentUserError, getCurrentUserComplete} = userSlice.actions;
export const userReducer = userSlice.reducer;