import { PayloadAction } from "@reduxjs/toolkit";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { UserInfo } from "../../models/UserInfo";
import { CallEffect, put, PutEffect, call, takeLatest } from "redux-saga/effects";
import { getCurrentUser, getCurrentUserComplete, getCurrentUserError, getCurrentUserSuccess } from "../slices/user.slice";

export default async function getCurrentUserFunction(): Promise<UserInfo> {
    const res = await axiosCustom.get(UserEnpoint.ME);
    return res.data;
}

export function* handleGetCurrentUser(action: PayloadAction<UserInfo>): Generator<CallEffect<UserInfo> | PutEffect<any>, void, UserInfo> {
    try {
        const response: UserInfo = yield call(getCurrentUserFunction)
        yield put(getCurrentUserSuccess(response))
    } catch(e) {
        yield put(getCurrentUserError(e))
    } finally {
        yield put(getCurrentUserComplete())
    }
}

export function* userSaga() {
    yield takeLatest(getCurrentUser.type, handleGetCurrentUser)
}