import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/auth.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root.saga";
import { registerReducer } from "./slices/register.slice";
import { userReducer } from "./slices/user.slice";
import { jobsReducer } from "./slices/jobs.slice";
import { applicationReducer } from "./slices/application.slice";
import { adminReducer } from "./slices/admin.slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        user: userReducer,
        jobs: jobsReducer,
        application: applicationReducer,
        admin: adminReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

export const jobs = configureStore({
    reducer: {
        listJobs: jobsReducer
    }
})



sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type JobRootState = ReturnType<typeof jobs.getState>;
export type JobDispatch = typeof jobs.dispatch;
