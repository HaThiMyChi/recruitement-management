import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/auth.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root.saga";
import { registerReducer } from "./slices/register.slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;