import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {ApiEntryActions, LoadApiAction, setApiEntries, setLoadingApis, setSelectedApi} from "./actions";
import ApiEntry from "../../model/ApiEntry";
import {AppState} from "../AppStore";
import {HalApi} from "../../services/HalApi";
import ListResp from "../../model/ListResp";
import Notification from "../../model/Notification";
import NotificationType from "../../model/NotificationType";
import {resetSpecPage} from "./api-specs/actions";
import {pushNotification} from "../notifications/actions";

function* getApiList() {
    const apis: ApiEntry[] = yield select((state: AppState) => state.apiEntriesReducer.apiEntries);
    return apis;
}

function* fetchApis() {
    yield put(pushNotification(new Notification("Fetching APIs", NotificationType.INFO)));

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
        const alert = new Notification(
            "There was an error connecting to the Tuzzy backend, unable to retrieve APIs",
            NotificationType.ERROR
        );
        yield put(pushNotification(alert));
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
        const alert = new Notification("An API with that name doesn't exist for your organisation/team",
            NotificationType.ERROR
        );
        yield put(pushNotification(alert));

        return;
    }

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