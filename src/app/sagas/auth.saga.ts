import {call, CallEffect, put, PutEffect, takeLatest} from 'redux-saga/effects';
import {login, loginSuccess, loginError, loginComplete} from '../slices/auth.slice';
import {LoginRequest, LoginPayload} from '../types/auth.type';
import { UserEnpoint } from '../../enums/UserEnpoint';
import { PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from '../../utils/jwtHelper';
import axiosCustom from '../../api/axiosCustom';

export default async function loginFunction(emailOrPhone: string, password:string): Promise<LoginPayload> {
    const res = await axiosCustom.post(UserEnpoint.LOGIN, {emailOrPhone, password});
    return res.data;
}

export function* handleLogin(action: PayloadAction<LoginRequest>): Generator<CallEffect<LoginPayload> | PutEffect<any>, void, LoginPayload> {
    try {
        const {emailOrPhone, password} = action.payload;
        
        const response: LoginPayload = yield call(loginFunction, emailOrPhone, password);
        
        const user = decodeToken(response.token);
        if (user !== null) {
            response.user =  user;
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        yield put(loginSuccess(response));
    } catch(e) {
        yield put(loginError(e));
    } finally {
        yield put(loginComplete());
    }
}

export function* authLogin() {
    yield takeLatest(login.type, handleLogin);
}