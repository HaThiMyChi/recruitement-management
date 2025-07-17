import { PayloadAction } from "@reduxjs/toolkit";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { RegisterPayload, RegisterRequest } from "../types/register.type";
import { call, CallEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { register, registerComplete, registerError, registerSuccess } from "../slices/register.slice";

export default async function registerFuction(email: string, password: string, phone: string, fullName: string, role: string): Promise<RegisterPayload> {
    const res = await axiosCustom.post(UserEnpoint.REGISTER, {email, password, phone, fullName, role});
    return {
        user: res.data,
        status: res.status
    };
}

export function* handleRegister(action: PayloadAction<RegisterRequest>): Generator<CallEffect<RegisterPayload> | PutEffect<any>, void, RegisterPayload> {
    try {
        const {email, password, phone, fullName, role} = action.payload;
        const response: RegisterPayload = yield call(registerFuction, email, password, phone, fullName, role)
        yield put(registerSuccess(response));
    } catch(e) {
        yield put(registerError(e))
    } finally {
        yield put(registerComplete())
    }
}

export function* authRegister() {
    yield takeLatest(register.type, handleRegister)
}