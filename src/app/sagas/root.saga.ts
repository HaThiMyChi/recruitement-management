import {all, fork} from 'redux-saga/effects';
import {authLogin} from './auth.saga';
import { authRegister } from './register.saga';
import userSaga from './user.saga';
import { filterJobs, getListJobs } from './jobs.saga';
import applicationSaga from './application.saga';

export default function* rootSaga() {
    yield all([
        fork(authLogin), fork(authRegister), fork(userSaga), fork(getListJobs), 
        fork(applicationSaga), fork(filterJobs)
    ]);
}