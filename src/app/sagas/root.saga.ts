import {all, fork} from 'redux-saga/effects';
import {authLogin} from './auth.saga';
import { authRegister } from './register.saga';
import userSaga from './user.saga';
import { filterJobs, getJobById, getListJobs } from './jobs.saga';
import applicationSaga from './application.saga';
import adminSaga from './admin.saga';

export default function* rootSaga() {
    yield all([
        fork(authLogin), fork(authRegister), fork(userSaga), fork(getListJobs), 
        fork(applicationSaga), fork(filterJobs), fork(adminSaga), fork(getJobById)
    ]);
}