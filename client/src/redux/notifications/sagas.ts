import {all, delay, fork, put, takeEvery} from "redux-saga/effects";
import {dismissNotification, NotificationActions, PushAction} from "./actions";

function* popDelay(action: PushAction) {
    const notification = action.notification;

    console.log(`Notification recieved of type {${notification.type}}, message: ${notification.message}`)
    yield delay(5000);

    console.log("Dismissing notification: " + notification.message);

    // Remove specific notification after a delay
    yield put(dismissNotification(notification.message));
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