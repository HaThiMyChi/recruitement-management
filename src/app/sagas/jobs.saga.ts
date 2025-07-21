import { call, CallEffect, PutEffect, put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { GetListJobs, GetListJobsComplete, GetListJobsError, GetListJobsSuccess } from "../slices/jobs.slice";
import { Job } from "../../models/Job";

export default async function getListJobFunction(): Promise<Job[]> {
    const respon = await axiosCustom.get(UserEnpoint.JOBS);
    return respon.data;
}

export function* handleGetJobs(): Generator<CallEffect<Job[]> | PutEffect<any>, void, Job[]> {
    try {
        const response: Job[] = yield call(getListJobFunction);
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