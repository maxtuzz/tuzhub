import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {
    alertEntries,
    ApiEntryActions,
    LoadApiAction,
    NewApiSubmitAction,
    setApiEntries,
    setLoadingApis,
    setSelectedApi
} from "./actions";
import ApiEntry from "../../model/ApiEntry";
import {AppState} from "../AppStore";
import {HalApi} from "../../services/HalApi";
import ListResp from "../../model/ListResp";
import Alert from "../../model/Alert";
import AlertType from "../../model/AlertType";
import {resetSpecPage} from "./api-specs/actions";
import Env from "../../services/Env";

function* getApiList() {
    const apis: ApiEntry[] = yield select((state: AppState) => state.apiEntriesReducer.apiEntries);
    return apis;
}

function* fetchApis() {
    // Reset any specs that are currently being stored in state
    yield put(resetSpecPage());

    // Remove selected api
    yield put(setSelectedApi(undefined));

    // Start loading
    yield put(setLoadingApis(true));

    try {
        const {content}: ListResp<ApiEntry> = yield call(HalApi.getApiEntries);

        yield put(setApiEntries(content));
    } catch (e) {
        const alert: Alert = {
            message: "There was an error connecting to the Tuzzy backend, unable to retrieve APIs",
            type: AlertType.ERROR
        };

        yield put(alertEntries(alert));
    }

    yield put(setLoadingApis(false));
}

function* loadApi(action: LoadApiAction) {
    console.log("Loading api: " + action.apiName);
    let apiList: ApiEntry[] = yield call(getApiList);

    // If there are no apis stored in state, we should fetch them
    if (apiList.length === 0) {
        yield call(fetchApis);
        apiList = yield call(getApiList);
    }

    const apiEntry = apiList.find((e: ApiEntry) => e.name === action.apiName);

    if (!apiEntry) {
        // throw an error here
        console.error("404 api not found");
        return;
    }

    console.log(apiEntry);

    yield put(setSelectedApi(apiEntry))
}

function* createApiEntry(action: NewApiSubmitAction) {
    let {apiEntry} = action;

    // Default to auth enabled false
    apiEntry.authEnabled = false;

    // Flag checking
    if (apiEntry.fullSpec && apiEntry.fullSpec.length > 20) {
        apiEntry.dynamicConf = false;
    }

    if (apiEntry.displayName.includes("-")) {
        const alert: Alert = {
            message: `Illegal character found "-", in new api entry display name`,
            type: AlertType.ERROR
        };

        yield put(alertEntries(alert));

        return;
    }

    yield call(HalApi.post, Env.getBaseApiUrl(), apiEntry);
}

function* watchNewApiSubmit() {
    yield takeEvery(ApiEntryActions.NEW_API_SUBMIT, createApiEntry);
}

function* watchFetchApis() {
    yield takeEvery(ApiEntryActions.FETCH_APIS, fetchApis);
}

function* watchLoadApi() {
    yield takeEvery(ApiEntryActions.LOAD_API, loadApi);
}

export default function* () {
    yield all([fork(watchFetchApis), fork(watchLoadApi), fork(watchNewApiSubmit)])
}