import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {alertEntries, ApiEntryActions, LoadApiAction, setApiEntries, setLoadingApis, setSelectedApi} from "./actions";
import ApiEntry from "../../model/ApiEntry";
import {AppState} from "../AppStore";
import {HalApi} from "../../services/HalApi";
import ListResp from "../../model/ListResp";
import Alert from "../../model/Alert";
import AlertType from "../../model/AlertType";

function* getApiList() {
    const apis: ApiEntry[] = yield select((state: AppState) => state.apiEntriesReducer.apiEntries);
    return apis;
}

function* fetchApis() {
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

function* watchFetchApis() {
    yield takeEvery(ApiEntryActions.FETCH_APIS, fetchApis);
}

function* watchLoadApi() {
    yield takeEvery(ApiEntryActions.LOAD_API, loadApi);
}

export default function* () {
    yield all([fork(watchFetchApis), fork(watchLoadApi)])
}