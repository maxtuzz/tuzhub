import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {alertSpec, loadSpec, setSpecLoading, SpecActions} from "./actions";
import {AppState} from "../../AppStore";
import ApiEntry from "../../../model/ApiEntry";
import ApiSpec from "../../../model/ApiSpec";
import {HalApi} from "../../../services/HalApi";
import Alert from "../../../model/Alert";
import AlertType from "../../../model/AlertType";

function* fetchActive() {
    yield put(setSpecLoading(true));

    // todo: Hmm this gets called before selected api is set so it fails
    const api: ApiEntry = yield select((state: AppState) => state.apiEntriesReducer.selectedApi);

    if (!api) {
        const alert: Alert = {
            message: "Requested spec cannot be retrieved as the API it belongs to cannot be found",
            type: AlertType.ERROR
        };

        yield put(alertSpec(alert));

        return;
    }

    const spec: ApiSpec = yield call(HalApi.get, api._links.activeSpec.href);

    yield put(loadSpec(spec));

    yield put(setSpecLoading(false));
}

function* watchFetchActive() {
    yield takeEvery(SpecActions.FETCH_ACTIVE_SPEC, fetchActive);
}

export default function* () {
    yield all([fork(watchFetchActive)])
}