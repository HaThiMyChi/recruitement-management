import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, LoginRequest } from "../types/auth.type";

interface LoginState {
    data: LoginPayload | null,
    loading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    data: null,
    loading: false,
    error: null
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginRequest>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<LoginPayload>) {
            state.data = action.payload;
            state.error = null;
        },
        loginError(state, action) {
            state.error = action.payload;
        },
        loginComplete(state) {
            state.loading = false;
        },
        logout(state) {
            state.data = null
        }
    }
});

export const {
    login, loginSuccess,loginError, loginComplete, logout
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;