import {applyMiddleware, combineReducers, createStore} from "redux";
import apiEntriesReducer from "./api-entries/reducers";
import {all, fork} from "redux-saga/effects";
import apiEntrySaga from "./api-entries/sagas"
import apiSpecSaga from "./api-entries/api-specs/sagas"
import createSagaMiddleware from "redux-saga";


const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

function* rootSaga() {
    yield all([fork(apiEntrySaga), fork(apiSpecSaga)])
}

const rootReducer = combineReducers({apiEntriesReducer});

export type AppState = ReturnType<typeof rootReducer>;

export const AppStore = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

