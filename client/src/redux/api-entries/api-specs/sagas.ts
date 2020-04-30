import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {alertSpec, loadSpec, setSpecLoading, SpecActions} from "./actions";
import {AppState} from "../../AppStore";
import ApiEntry from "../../../model/ApiEntry";
import ApiSpec from "../../../model/ApiSpec";
import {HalApi} from "../../../services/HalApi";
import Notification from "../../../model/Notification";
import NotificationType from "../../../model/NotificationType";
import {OpenAPI} from "../../../services/OpenAPI";

function* fetchActive() {
    yield put(setSpecLoading(true));

    const api: ApiEntry = yield select((state: AppState) => state.apiEntriesReducer.selectedApi);

    if (!api) {
        const alert: Notification = {
            message: "Requested spec cannot be retrieved as the API it belongs to cannot be found",
            type: NotificationType.ERROR
        };

        yield put(alertSpec(alert));

        return;
    }

    const apiSpec: ApiSpec = yield call(HalApi.get, api._links.activeSpec.href);

    const validation = yield call(OpenAPI.validate, apiSpec.spec);
    console.log(validation);

    apiSpec.document = yield call(OpenAPI.dereference, apiSpec.spec);

    yield put(loadSpec(apiSpec));

    yield put(setSpecLoading(false));
}

function* watchFetchActive() {
    yield takeEvery(SpecActions.FETCH_ACTIVE_SPEC, fetchActive);
}

export default function* () {
    yield all([fork(watchFetchActive)])
}