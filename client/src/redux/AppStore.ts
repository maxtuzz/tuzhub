import {applyMiddleware, combineReducers, createStore} from "redux";
import apiEntriesReducer from "./api-entries/reducers";
import apiSpecReducer from "./api-entries/api-specs/reducers";
import apiFormReducer from "./api-entries/api-form/reducers"
import notificationsReducer from "./notifications/reducers"
import {all, fork} from "redux-saga/effects";
import notificationsSaga from "./notifications/sagas"
import apiEntrySaga from "./api-entries/sagas"
import apiFormSaga from "./api-entries/api-form/sagas"
import apiSpecSaga from "./api-entries/api-specs/sagas"
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from 'remote-redux-devtools';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from "history";

function* rootSaga() {
    yield all([
        fork(notificationsSaga),
        fork(apiEntrySaga),
        fork(apiFormSaga),
        fork(apiSpecSaga)
    ])
}

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    notificationsReducer,
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

