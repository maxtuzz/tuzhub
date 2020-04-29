import {applyMiddleware, combineReducers, createStore} from "redux";
import apiEntriesReducer from "./api-entries/reducers";
import apiSpecReducer from "./api-entries/api-specs/reducers";
import {all, fork} from "redux-saga/effects";
import apiEntrySaga from "./api-entries/sagas"
import apiFormSaga from "./api-entries/api-form/sagas"
import apiFormReducer from "./api-entries/api-form/reducers"
import apiSpecSaga from "./api-entries/api-specs/sagas"
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from 'remote-redux-devtools';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from "history";


function* rootSaga() {
    yield all([fork(apiEntrySaga), fork(apiFormSaga), fork(apiSpecSaga)])
}

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    apiEntriesReducer,
    apiFormReducer,
    apiSpecReducer
});

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
);

export type AppState = ReturnType<typeof rootReducer>;

export const AppStore = createStore(
    rootReducer,
    composeWithDevTools(middleware)
);

sagaMiddleware.run(rootSaga);

