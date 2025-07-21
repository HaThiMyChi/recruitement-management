import { call, CallEffect, PutEffect, put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { ListJobs } from "../types/job.type";
import { GetListJobs, GetListJobsComplete, GetListJobsError, GetListJobsSuccess } from "../slices/jobs.slice";

export default async function getListJobFunction(): Promise<ListJobs> {
    const respon = await axiosCustom.get(UserEnpoint.JOBS);
    return respon.data;
}

export function* handleGetJobs(): Generator<CallEffect<ListJobs> | PutEffect<any>, void, ListJobs> {
    try {
        const response: ListJobs = yield call(getListJobFunction);
        yield put(GetListJobsSuccess(response))
        console.log('handleGetJobs', response)
    } catch (e) {
        yield put(GetListJobsError(e))
    } finally {
        yield put(GetListJobsComplete())
    }
}

export function* getListJobs() {
    yield takeLatest(GetListJobs.type, handleGetJobs)
}