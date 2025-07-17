import {all, fork} from 'redux-saga/effects';
import {authLogin} from './auth.saga';
import { authRegister } from './register.saga';

export default function* rootSaga() {
    yield all([fork(authLogin), fork(authRegister)]);
}