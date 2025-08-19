import { call, CallEffect, PutEffect, put, takeLatest, take } from "redux-saga/effects";
import axiosCustom from "../../api/axiosCustom";
import { GetListJobs, GetListJobsComplete, GetListJobsError, GetListJobsSuccess, FilterJobs, FilterJobsComplete, FilterJobsError, FilterJobsSuccess } from "../slices/jobs.slice";
import { JobListResponse, RequestFilter } from "../types/job.type";
import { PayloadAction } from "@reduxjs/toolkit";


export async function GetListJobFunction(filterCondition?: RequestFilter | null): Promise<JobListResponse> {
    const paramRequest: RequestFilter = {page: 1}

    if (filterCondition !== null) {
        if (filterCondition?.location) paramRequest.location = filterCondition.location
        if (filterCondition?.jobType) paramRequest.jobType = filterCondition.jobType
        if (filterCondition?.q) paramRequest.q = filterCondition.q
        if (filterCondition?.minSalary) paramRequest.minSalary = filterCondition.minSalary
        if (filterCondition?.maxSalary) paramRequest.maxSalary = filterCondition.maxSalary
        if (filterCondition?.sortBy) paramRequest.sortBy = filterCondition.sortBy
        if (filterCondition?.sortOrder) paramRequest.sortOrder = filterCondition.sortOrder

        paramRequest.page = filterCondition?.page ?? 1
    }

    if (filterCondition !== null) {
        const respon = await axiosCustom.get('api/jobs', {
            params: paramRequest
        });
        return respon.data;
    } else {
        const respon = await axiosCustom.get('api/jobs');
        return respon.data;
    }
}

export async function FilterJobsFunction(filterCondition: RequestFilter): Promise<JobListResponse> {
    let apiUrl = 'api/jobs';
    // if (filterCondition.id) apiUrl = `${apiUrl}?id=${filterCondition.id}`
    // if (filterCondition.jobType) apiUrl = `${apiUrl}?jobType=${filterCondition.jobType}`
    // if (filterCondition.status) apiUrl = `${apiUrl}?status=${filterCondition.status}`

    const respon = await axiosCustom.get(apiUrl);
    return respon.data;
}

export function* handleGetJobs(action: PayloadAction<RequestFilter>): Generator<CallEffect<JobListResponse> | PutEffect<any>, void, JobListResponse> {
    try {
        if (action.payload !== null) {
            const response: JobListResponse = yield call(GetListJobFunction, action.payload);
            yield put(GetListJobsSuccess(response));
            console.log('handleGetJobs without filter', response)
        } else {
            const response: JobListResponse = yield call(GetListJobFunction, null);
            yield put(GetListJobsSuccess(response));
            console.log('handleGetJobs do not filter', response)
        }
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