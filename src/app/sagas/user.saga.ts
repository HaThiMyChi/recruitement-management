import { PayloadAction } from "@reduxjs/toolkit";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { UserInfo,  UserPayload, UserRequestUpdate } from '../types/user.type';
import { CallEffect, put, PutEffect, call, takeLatest } from "redux-saga/effects";
import { getCurrentUser, getCurrentUserComplete, getCurrentUserError, getCurrentUserSuccess, updateUser, updateUserComplete, updateUserError, updateUserSuccess} from "../slices/user.slice";

export async function getCurrentUserFunction(): Promise<UserInfo> {
    const res = await axiosCustom.get(UserEnpoint.ME);
    return res.data;
}

export async function updateUserFunction(userUpdate: UserRequestUpdate): Promise<UserPayload> {
    const res = await axiosCustom.put(`${UserEnpoint.USERS}/${userUpdate.id}`, userUpdate)
    return {
        user: res.data,
        status: res.status
    }
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

export function* handleUpdateUser(action: PayloadAction<UserRequestUpdate>): Generator<CallEffect<UserPayload> | PutEffect<any>, void, UserPayload> {
    try {
        const userUpdate: UserRequestUpdate = action.payload
        const response: UserPayload = yield call(updateUserFunction, userUpdate)
        yield put(updateUserSuccess(response))
    } catch (e) {
        yield put(updateUserError(e))
    } finally {
        yield put(updateUserComplete())
    }
}



export function* userSaga() {
    yield takeLatest(getCurrentUser.type, handleGetCurrentUser)
    yield takeLatest(updateUser.type, handleUpdateUser)
}