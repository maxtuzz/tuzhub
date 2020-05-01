import {NotificationActions, TNotificationActions} from "./actions";
import Notification from "../../model/Notification";

interface INotificationState {
    readonly notifications: Map<string, Notification>;
}

const initialState: INotificationState = {
    notifications: new Map<string, Notification>()
};

/**
 * Redux state store for managing pushing/popping notifications
 * @param state
 * @param action
 */
export default function (state: INotificationState = initialState, action: TNotificationActions) {
    switch (action.type) {
        case NotificationActions.CLEAR:
            return initialState;
        case NotificationActions.PUSH:
            const notifications = state.notifications.set(action.notification.message, action.notification);
            console.log("HELLO THERE!");
            console.log(notifications);
            return {...state, notifications: notifications};
        case NotificationActions.DISMISS:
            state.notifications.delete(action.key);
            return state;
        default:
            return state;
    }
}