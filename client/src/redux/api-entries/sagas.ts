import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {ApiEntryActions, setApiEntries, setLoadingApis} from "./actions";
import {HalApi} from "../../services/HalApi";
import ApiEntry from "../../model/ApiEntry";
import ListResp from "../../model/ListResp";

function* fetchApis() {
    yield put(setLoadingApis(true));
    const apiEntries: ListResp<ApiEntry[]> = yield call(HalApi.getApiEntries);

    yield put(setApiEntries(apiEntries.content));

    yield put(setLoadingApis(false));
}

function* watchFetchApis() {
    yield takeEvery(ApiEntryActions.FETCH_APIS, fetchApis);
}

export default function* () {
    yield all([fork(watchFetchApis)])
}