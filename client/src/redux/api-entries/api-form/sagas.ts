import {all, call, delay, fork, put, takeEvery} from "redux-saga/effects";
import NotificationType from "../../../model/NotificationType";
import {safeLoad} from "js-yaml";
import Notification from "../../../model/Notification";
import {HalApi} from "../../../services/HalApi";
import Env from "../../../services/Env";
import {ApiFormActions, NewApiSubmitAction, setApiSubmitLoading} from "./actions";
import {push} from "connected-react-router";
import {pushNotification} from "../../notifications/actions";

function* createApiEntry(action: NewApiSubmitAction) {
    let {apiEntry} = action;

    yield put(setApiSubmitLoading(true));

    // Default to auth enabled false
    // Todo: Make this configurable once authenticated APIs are a thing
    apiEntry.authEnabled = false;

    const fullSpec = apiEntry.fullSpec as string;

    // Flag checking
    // Todo: Think about creating a builder pattern to handle api entry payload construction
    if (fullSpec && fullSpec.length > 20) {
        apiEntry.dynamicConf = false;
        apiEntry.specUrl = undefined;

        const isJson = fullSpec.trim().startsWith("{");

        if (isJson) {
            try {
                apiEntry.fullSpec = JSON.parse(fullSpec);
            } catch (e) {
                yield put(pushNotification({
                    message: `Problem when parsing supplied JSON`,
                    type: NotificationType.ERROR
                }));

                return;
            }
        } else {
            try {
                // Convert yaml to string
                apiEntry.fullSpec = safeLoad(fullSpec);
            } catch (e) {
                yield put(pushNotification({
                    message: `Incompatible yaml file supplied. Please check syntax`,
                    type: NotificationType.ERROR
                }));

                return;
            }
        }
    }

    if (apiEntry.displayName.includes("-")) {
        const alert: Notification = {
            message: `Illegal character found "-", in new api entry display name`,
            type: NotificationType.ERROR
        };

        yield put(pushNotification(alert));

        return;
    }

    yield call(HalApi.post, Env.getBaseApiUrl(), apiEntry);

    // Give some time
    yield delay(800);

    // Navigate to newly created API screen
    const name = apiEntry.displayName
        .trimStart()
        .trimEnd()
        .replace(" ", "-")
        .toLowerCase();

    yield put(push(`/apis/${name}`))
    yield put(pushNotification(new Notification(`API ${name} created successfully ...`, NotificationType.INFO)))

    yield put(setApiSubmitLoading(false));
}

function* watchNewApiSubmit() {
    yield takeEvery(ApiFormActions.API_SUBMIT, createApiEntry);
}

export default function* () {
    yield all([fork(watchNewApiSubmit)])
}