import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {ApiEntryActions, LoadApiAction, setApiEntries, setLoadingApis, setViewableApi} from "./actions";
import ApiEntry from "../../model/ApiEntry";
import {AppState} from "../AppStore";
import {HalApi} from "../../services/HalApi";
import ListResp from "../../model/ListResp";
import Notification from "../../model/Notification";
import NotificationType from "../../model/NotificationType";
import {resetSpecPage} from "./api-specs/actions";
import {pushNotification} from "../notifications/actions";
import {push} from "connected-react-router";
import Env from "../../services/Env";
import ApiEntryUtils from "../../util/ApiEntryUtils";

function* getApiList() {
    const apis: ApiEntry[] = yield select((state: AppState) => state.apiEntriesReducer.apiEntries);
    return apis;
}

function* fetchApis() {
    // Reset any specs that are currently being stored in state
    yield put(resetSpecPage());

    // Remove selected api
    yield put(setViewableApi(undefined));

    // Start loading
    yield put(setLoadingApis(true));

    try {
        const {content}: ListResp<ApiEntry> = yield call(HalApi.getApiEntries);

        yield put(setApiEntries(content));
    } catch (e) {
        const alert = new Notification(NotificationType.ERROR, "There was an error connecting to the Tuzzy backend, unable to retrieve APIs");
        yield put(pushNotification(alert));
    }

    yield put(setLoadingApis(false));
}

function* loadApi(action: LoadApiAction) {
    console.log("called");
    let apiList: ApiEntry[] = yield call(getApiList);

    console.log("called1");
    let apiEntry = apiList.find((e: ApiEntry) => e.name === action.apiName);
    console.log("called2");

    // If api doesn't exist in state, fetch it
    if (!apiEntry) {
        const fetchedEntry = yield call(HalApi.get, `${Env.getBaseApiUrl()}/${action.apiName}`);

        if (!ApiEntryUtils.isApiEntry(fetchedEntry)) {
            const alert = new Notification(NotificationType.ERROR, "An API with that name cannot be found. Performing search ...");
            yield put(pushNotification(alert));
            yield put(push(`/apis?search=${action.apiName}`));

            return;
        }

        apiEntry = fetchedEntry;
    }

    yield put(setViewableApi(apiEntry))
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