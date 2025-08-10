import { PayloadAction } from "@reduxjs/toolkit";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { AdminPayload, AdminRequest, MessageResponse } from "../types/admin.type";
import { call, CallEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { actionUser, actionUserComplete, actionUserError, actionUserSuccess, getUsers, getUsersComplete, getUsersError, getUsersSuccess } from "../slices/admin.slice";
import { User } from "../../models/User";
import { UserStatus } from "../../enums/UserStatus";

export async function getUsersFunction(action: AdminRequest): Promise<AdminPayload> {
    const res = await axiosCustom.get(`${UserEnpoint.USERS}?
        page=${action.page}&limit=${action.limit}&role=${action.role}&status=${action.status}&sortBy=${action.sortBy}&sortOrder=${action.sortOrder}`);
    return res.data;
}

export function* handleGetUsers(action: PayloadAction<AdminRequest>): Generator<CallEffect<AdminPayload> | PutEffect<any>, void, AdminPayload> {
    try {
        const response: AdminPayload = yield call(getUsersFunction, action.payload);
        yield put(getUsersSuccess(response));
    } catch (e) {
        yield put(getUsersError(e))
    } finally {
        yield put(getUsersComplete())
    }
}

export async function actionUserFunction(action: User): Promise<MessageResponse> {
    const id = action.id;
    const status = action.status;
    const param = {
        userId: id
    }

    if (status === UserStatus.ACTIVE || status === UserStatus.PENDING) {
        // deactive user
        const res = await axiosCustom.post(`${UserEnpoint.USERS}/deactivate`, param);
        return res.data;
    } else {
        // activate user
        const res = await axiosCustom.post(`${UserEnpoint.USERS}/activate`, param);
        return res.data;
    }
}

export function* handleUser(action: PayloadAction<User>): Generator<CallEffect<MessageResponse> | PutEffect<any>, void, MessageResponse> {
    try {
        const messageResponse: MessageResponse = yield call(actionUserFunction, action.payload)
        yield put(actionUserSuccess(messageResponse));
    } catch (e) {
        yield put(actionUserError(e))
    } finally {
        yield put(actionUserComplete())
    }
}

export default function* adminSaga() {
    yield takeLatest(getUsers.type, handleGetUsers);
    yield takeLatest(actionUser.type, handleUser);
}