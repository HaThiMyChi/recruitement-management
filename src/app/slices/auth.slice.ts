import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, LoginRequest } from "../types/auth.type";
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: '',
        user: {
            email: '',
            role: '',
            exp: 0,
            iat: 0,
            sub: 0
        },
        loading: false,
        error: null
    },
    reducers: {
        login(state, action: PayloadAction<LoginRequest>) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<LoginPayload>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
        },
        loginError(state, action) {
            state.error = action.payload;
        },
        loginComplete(state) {
            state.loading = false;
        }
    }
});

export const {
    login, loginSuccess,loginError, loginComplete
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;