import {all, call, fork, takeEvery} from "redux-saga/effects";
import {ApiEntriesActionType} from "./actions";

function* fetchApis() {
    yield call(console.log, "Fetching API Entries")
}

function* watchFetchApis() {
    yield takeEvery(ApiEntriesActionType.FETCH_APIS, fetchApis);
}

export default function* () {
    yield all([fork(watchFetchApis)])
}