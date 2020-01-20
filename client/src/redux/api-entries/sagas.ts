import {all, call, fork, takeEvery} from "redux-saga/effects";
import {ApiEntryActions} from "./actions";

function* fetchApis() {
    yield call(console.log, "Fetching API Entries")
}

function* watchFetchApis() {
    yield takeEvery(ApiEntryActions.FETCH_APIS, fetchApis);
}

export default function* () {
    yield all([fork(watchFetchApis)])
}