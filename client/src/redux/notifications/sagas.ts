import {all, delay, fork, put, takeEvery} from "redux-saga/effects";
import {NotificationActions, popNotification, PushAction} from "./actions";

function* popDelay(action: PushAction) {
    console.log(`Notification recieved of type {${action.notification.type}}, message: ${action.notification.message}`)
    yield delay(7000);
    yield put(popNotification());
}

/**
 * Every time a notification is shown, fork a process that waits x seconds before dismissing it
 */
function* watchNotificationPush() {
    yield takeEvery(NotificationActions.PUSH, popDelay);
}

export default function* () {
    yield all([fork(watchNotificationPush)])
}