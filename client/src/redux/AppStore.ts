import {applyMiddleware, combineReducers, createStore} from "redux";
import apiEntriesReducer from "./api-entries/reducers";
import apiSpecReducer from "./api-entries/api-specs/reducers";
import {all, fork} from "redux-saga/effects";
import apiEntrySaga from "./api-entries/sagas"
import apiSpecSaga from "./api-entries/api-specs/sagas"
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

function* rootSaga() {
    yield all([fork(apiEntrySaga), fork(apiSpecSaga)])
}

const rootReducer = combineReducers({
    apiEntriesReducer,
    apiSpecReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const AppStore = createStore(
    rootReducer,
    composeWithDevTools(middleware)
);

sagaMiddleware.run(rootSaga);

