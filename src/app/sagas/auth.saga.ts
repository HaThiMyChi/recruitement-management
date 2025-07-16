import {call, CallEffect, put, PutEffect, takeLatest} from 'redux-saga/effects';
import {login, loginSuccess, loginError, loginComplete} from '../slices/auth.slice';
import {LoginRequest, LoginPayload} from '../auth.type';
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
        const data: LoginPayload = {
            token: '',
            user: {
                email: '',
                role: '',
                exp: 0,
                iat: 0,
                sub: 0
            }
        }
        const response: LoginPayload = yield call(loginFunction, emailOrPhone, password);
        data.token = response?.token;
        const user = decodeToken(data.token);
        if (user !== null) {
            data.user =  user;
        }
        yield put(loginSuccess(data));
    } catch(e) {
        yield put(loginError('Login have been Error!!!'));
    } finally {
        yield put(loginComplete());
    }
}

export function* authLogin() {
    yield takeLatest(login.type, handleLogin);
}