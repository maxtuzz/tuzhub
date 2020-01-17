import {applyMiddleware, combineReducers, createStore} from "redux";
import apiEntriesReducer from "./api-entries/reducers";
import {all, fork} from "redux-saga/effects";
import helloSaga from "./api-entries/sagas"
import createSagaMiddleware from "redux-saga";


export type AppState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

function* rootSaga() {
    yield all([fork(helloSaga)])
}

const rootReducer = combineReducers({apiEntriesReducer},);

export const AppStore = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

