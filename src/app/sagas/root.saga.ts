import {all, fork} from 'redux-saga/effects';
import {authLogin} from './auth.saga';
import { authRegister } from './register.saga';
import userSaga from './user.saga';

export default function* rootSaga() {
    yield all([fork(authLogin), fork(authRegister), fork(userSaga)]);
}