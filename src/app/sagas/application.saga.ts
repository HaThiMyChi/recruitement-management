import { wait } from "@testing-library/user-event/dist/utils";
import { ApplicationPayload, ApplicationRequest } from "../types/application.type";
import axiosCustom from "../../api/axiosCustom";
import { ApplicationEnpoint } from "../../enums/ApplicationEnpoint";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, CallEffect, put, PutEffect, takeLatest } from "redux-saga/effects";
import { getApplications, getApplicationsComplete, getApplicationsError, getApplicationsSuccess } from "../slices/application.slice";

export default async function getApplicationsFunction(action: ApplicationRequest): Promise<ApplicationPayload> {
    const res = await axiosCustom.get(`${ApplicationEnpoint.GET}?page=${action.page}&limit=${action.limit}`);
    return res.data
}

export function* handleGetApplications(action: PayloadAction<ApplicationRequest>): Generator<CallEffect<ApplicationPayload> | PutEffect<any>, void, ApplicationPayload> {
    try {
        const response: ApplicationPayload = yield call(getApplicationsFunction, action.payload)
        yield put(getApplicationsSuccess(response))
    } catch (e) {
        yield put(getApplicationsError(e))
    } finally {
        yield put(getApplicationsComplete())
    }
}

export function* applicationSaga() {
    yield takeLatest(getApplications.type, handleGetApplications)
}