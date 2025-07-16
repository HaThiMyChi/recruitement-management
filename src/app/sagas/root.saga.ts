import {all, fork} from 'redux-saga/effects';
import {authLogin} from './auth.saga';

export default function* rootSaga() {
    yield all([fork(authLogin)]);
}