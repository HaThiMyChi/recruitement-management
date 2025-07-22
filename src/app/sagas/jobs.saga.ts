import { call, CallEffect, PutEffect, put, takeLatest, take } from "redux-saga/effects";
import axiosCustom from "../../api/axiosCustom";
import { UserEnpoint } from "../../enums/UserEnpoint";
import { GetListJobs, GetListJobsComplete, GetListJobsError, GetListJobsSuccess, FilterJobs, FilterJobsComplete, FilterJobsError, FilterJobsSuccess } from "../slices/jobs.slice";
import { Job } from "../../models/Job";
import { JobListResponse, RequestFilter } from "../types/job.type";
import { PayloadAction } from "@reduxjs/toolkit";


export async function GetListJobFunction(): Promise<JobListResponse> {
    const respon = await axiosCustom.get(UserEnpoint.JOBS);
    return respon.data;
}

export async function FilterJobsFunction(filterCondition: RequestFilter): Promise<JobListResponse> {
    const filterParams: RequestFilter = {}
    if (filterCondition.id) {
        filterParams.id = filterCondition.id
    }
    if (filterCondition.jobType) {
        filterParams.jobType = filterCondition.jobType
    }
    if (filterCondition.status) {
        filterParams.status = filterCondition.status
    }

    const respon = await axiosCustom.get(UserEnpoint.JOBS, {params: filterParams});
    return respon.data
}

export function* handleGetJobs(): Generator<CallEffect<JobListResponse> | PutEffect<any>, void, JobListResponse> {
    try {
        const response: JobListResponse = yield call(GetListJobFunction);
        yield put(GetListJobsSuccess(response))
        console.log('handleGetJobs', response)
    } catch (e) {
        yield put(GetListJobsError(e))
    } finally {
        yield put(GetListJobsComplete())
    }
}

export function* handleFilterJobs(action: PayloadAction<RequestFilter>): Generator<CallEffect<JobListResponse> | PutEffect<any>, void, JobListResponse> {
    try {
        const param = action.payload
        const response: JobListResponse = yield call(FilterJobsFunction, param)
        yield put(FilterJobsSuccess(response))
    } catch (e) {
        yield put(FilterJobsError(e))
    } finally {
        yield put(FilterJobsComplete())
    }
}

export function* getListJobs() {
    yield takeLatest(GetListJobs.type, handleGetJobs)
}

export function* filterJobs() {
    yield takeLatest(FilterJobs.type, handleFilterJobs)
}