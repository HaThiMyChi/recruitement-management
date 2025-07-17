import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { RegisterPayload, RegisterRequest } from "../types/register.type";

interface RegisterState {
    data: User | null,
    loading: boolean,
    error: string | null,
    status?: number,
}

const initialState: RegisterState = {
    data: null,
    loading: false,
    error: null,
    status: undefined
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        register(state, action: PayloadAction<RegisterRequest>) {
            console.log('action', action)
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<RegisterPayload>) {
            state.data = action.payload.user;
            state.status = action.payload.status;
        },
        registerError(state, action) {
            state.error = action.payload;
            state.status = action.payload.status
        },
        registerComplete(state) {
            state.loading = false;
        }
    }
})

export const {register, registerSuccess, registerError, registerComplete} = registerSlice.actions;

export const registerReducer = registerSlice.reducer;